import { useEffect, useState } from 'react';
import WeatherIcon from '../components/WeatherIcon';
import { api } from '../api/client';

export default function Weather() {
  const [location, setLocation] = useState('New Delhi');
  const [input, setInput] = useState('New Delhi');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async (loc) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/weather?location=${encodeURIComponent(loc)}`);
      setData(res);
    } catch (e) {
      setError(e.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(location); }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(input);
  };

  const fmtDay = (d) => new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-14">
      <span className="text-leaf-700 text-xs font-semibold uppercase tracking-wide">Live conditions</span>
      <h1 className="font-display text-4xl font-semibold text-forest mt-2 mb-2">Weather Intelligence</h1>
      <p className="text-ink-600 mb-8 max-w-xl">Check live conditions and a 6-day outlook with farming-specific advisories for any location.</p>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-10 max-w-md">
        <input
          value={input} onChange={e => setInput(e.target.value)}
          placeholder="Enter city or village name"
          className="flex-1 px-4 py-2.5 rounded-lg border border-forest/20 bg-cream-100 focus:outline-none focus:ring-2 focus:ring-leaf"
        />
        <button type="submit" className="px-6 py-2.5 rounded-lg bg-forest text-cream font-semibold hover:bg-forest-600">Search</button>
      </form>

      {loading && <div className="text-ink-600">Fetching weather…</div>}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          Couldn't load weather: {error}. This page needs internet access to the Open-Meteo API when running locally.
        </div>
      )}

      {data && !loading && (
        <>
          <div className="bg-forest text-cream rounded-2xl p-8 mb-8">
            <div className="text-sun text-xs font-semibold uppercase tracking-wide mb-2">
              {data.location.name}{data.location.admin1 ? `, ${data.location.admin1}` : ''} · {data.location.country}
            </div>
            <div className="flex items-center gap-5 mb-6">
              <WeatherIcon icon={data.current.icon} size={72} />
              <div>
                <div className="text-4xl font-semibold font-mono">{Math.round(data.current.temperature)}°C</div>
                <div className="text-cream/70">{data.current.label}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-cream/10 rounded-xl p-3">
                <div className="text-cream/60 text-xs">Humidity</div>
                <div className="font-mono text-lg">{data.current.humidity}%</div>
              </div>
              <div className="bg-cream/10 rounded-xl p-3">
                <div className="text-cream/60 text-xs">Wind</div>
                <div className="font-mono text-lg">{data.current.windSpeed} km/h</div>
              </div>
              <div className="bg-cream/10 rounded-xl p-3">
                <div className="text-cream/60 text-xs">Rain</div>
                <div className="font-mono text-lg">{data.current.precipitation} mm</div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="font-display text-xl font-semibold text-forest mb-4">Farming advisories</h2>
            <ul className="space-y-2">
              {data.advisories.map((a, i) => (
                <li key={i} className="flex gap-3 bg-sun-100 border border-sun/30 rounded-xl px-4 py-3 text-sm text-forest">
                  <span>🌾</span><span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-forest mb-4">6-day outlook</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {data.daily.map((d) => (
                <div key={d.date} className="bg-cream-100 border border-forest/10 rounded-xl p-4 text-center">
                  <div className="text-xs text-ink-600 mb-2">{fmtDay(d.date)}</div>
                  <div className="mb-2 flex justify-center"><WeatherIcon icon={d.icon} size={36} /></div>
                  <div className="font-mono text-sm text-forest font-semibold">{Math.round(d.tempMax)}° / {Math.round(d.tempMin)}°</div>
                  <div className="text-xs text-leaf-700 mt-1">💧 {d.rainChance}%</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
