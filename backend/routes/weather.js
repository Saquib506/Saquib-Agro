import express from 'express';

const router = express.Router();

const WEATHER_CODES = {
  0: { label: 'Clear sky', icon: 'sun' }, 1: { label: 'Mainly clear', icon: 'sun-cloud' }, 2: { label: 'Partly cloudy', icon: 'sun-cloud' }, 3: { label: 'Overcast', icon: 'cloud' },
  45: { label: 'Fog', icon: 'fog' }, 48: { label: 'Depositing rime fog', icon: 'fog' },
  51: { label: 'Light drizzle', icon: 'drizzle' }, 53: { label: 'Moderate drizzle', icon: 'drizzle' }, 55: { label: 'Dense drizzle', icon: 'rain' },
  61: { label: 'Slight rain', icon: 'rain' }, 63: { label: 'Moderate rain', icon: 'rain' }, 65: { label: 'Heavy rain', icon: 'storm' },
  71: { label: 'Slight snow', icon: 'snow' }, 73: { label: 'Moderate snow', icon: 'snow' }, 75: { label: 'Heavy snow', icon: 'snow' },
  80: { label: 'Rain showers', icon: 'drizzle' }, 81: { label: 'Moderate showers', icon: 'rain' }, 82: { label: 'Violent showers', icon: 'storm' },
  95: { label: 'Thunderstorm', icon: 'storm' }, 96: { label: 'Thunderstorm with hail', icon: 'storm' }, 99: { label: 'Thunderstorm with heavy hail', icon: 'storm' },
};

function describe(code) { return WEATHER_CODES[code] || { label: 'Unknown', icon: 'sun-cloud' }; }

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
    const data = await response.json();
    if (!response.ok) throw new Error(data.reason || `Weather provider returned ${response.status}`);
    return data;
  } finally { clearTimeout(timeout); }
}

router.get('/', async (req, res) => {
  const location = String(req.query.location || 'New Delhi').trim().slice(0, 120);
  if (!location) return res.status(400).json({ error: 'Location is required' });

  try {
    const geoData = await fetchJson(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);
    if (!geoData.results?.length) return res.status(404).json({ error: `Could not find location "${location}"` });

    const { latitude, longitude, name, country, admin1 } = geoData.results[0];
    const wData = await fetchJson(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
      `&timezone=auto&forecast_days=6`
    );

    if (!wData.current || !wData.daily?.time) throw new Error('Incomplete weather response');

    const current = {
      temperature: wData.current.temperature_2m,
      humidity: wData.current.relative_humidity_2m,
      windSpeed: wData.current.wind_speed_10m,
      precipitation: wData.current.precipitation,
      ...describe(wData.current.weather_code),
    };

    const daily = wData.daily.time.map((date, i) => ({
      date, tempMax: wData.daily.temperature_2m_max?.[i], tempMin: wData.daily.temperature_2m_min?.[i],
      rainChance: wData.daily.precipitation_probability_max?.[i] ?? 0, ...describe(wData.daily.weather_code?.[i]),
    }));

    const advisories = [];
    if (current.precipitation > 0) advisories.push('Rain detected — delay pesticide/fertilizer spraying today.');
    if (current.humidity > 80) advisories.push('High humidity — monitor crops for fungal disease risk.');
    if (current.windSpeed > 25) advisories.push('Strong winds — avoid spraying operations and secure young plants.');
    if (daily.slice(0, 3).some((d) => d.rainChance > 60)) advisories.push('Rain expected in next 3 days — plan irrigation and harvesting accordingly.');
    if (!advisories.length) advisories.push('Conditions look stable — good window for regular field operations.');

    res.json({ location: { name, country, admin1 }, current, daily, advisories, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.error('Weather error:', err);
    res.status(err.name === 'AbortError' ? 504 : 502).json({ error: 'Weather service is temporarily unavailable. Please try again.' });
  }
});

export default router;
