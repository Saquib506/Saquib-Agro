import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { usePremium, ADVISORY_FREE_LIMIT } from '../context/PremiumContext';

const SOILS = ['loamy', 'clay', 'sandy', 'black', 'red', 'alluvial'];
const SEASONS = ['kharif', 'rabi', 'summer', 'winter', 'monsoon'];
const WATER_LEVELS = ['low', 'medium', 'high'];

function formatResetTime(resetAt) {
  if (!resetAt) return '';
  const ms = resetAt - Date.now();
  if (ms <= 0) return 'now';
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const mins = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

export default function Advisory() {
  const [form, setForm] = useState({ soilType: 'loamy', season: 'kharif', region: '', waterAvailability: 'medium' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [limitHit, setLimitHit] = useState(null); // { resetAt } when blocked
  const { premium, useAdvisorySearch, getAdvisoryStatus } = usePremium();
  const status = getAdvisoryStatus();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLimitHit(null);

    const check = useAdvisorySearch();
    if (!check.allowed) {
      setLimitHit({ resetAt: check.resetAt });
      return;
    }

    setLoading(true);
    try {
      const data = await api.post('/advisory/recommend', form);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const suitColor = { High: 'bg-leaf-50 text-leaf-700', Medium: 'bg-sun-100 text-sun-600', Fair: 'bg-forest-50 text-forest-400' };

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-14">
      <span className="text-leaf-700 text-xs font-semibold uppercase tracking-wide">AI Farming Assistant</span>
      <h1 className="font-display text-4xl font-semibold text-forest mt-2 mb-2">Crop Recommendation</h1>
      <p className="text-ink-600 mb-4 max-w-xl">
        Tell us about your field conditions and get instant, ranked crop recommendations from our advisory engine.
      </p>

      {!premium && (
        <div className="mb-10 inline-flex items-center gap-2 text-xs font-medium bg-cream-100 border border-forest/10 rounded-full px-4 py-2 text-ink-600">
          <span>🔍</span>
          <span>
            {status.remaining} of {ADVISORY_FREE_LIMIT} free searches left
            {status.resetAt ? ` · resets in ${formatResetTime(status.resetAt)}` : ''}
          </span>
          <Link to="/premium" className="text-leaf-700 font-semibold hover:underline">Go unlimited →</Link>
        </div>
      )}
      {premium && (
        <div className="mb-10 inline-flex items-center gap-2 text-xs font-medium bg-leaf-50 border border-leaf/20 rounded-full px-4 py-2 text-leaf-700">
          ✨ Premium — unlimited Advisory searches
        </div>
      )}

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-10">
        <form onSubmit={handleSubmit} className="bg-cream-100 border border-forest/10 rounded-2xl p-6 h-fit space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Soil type</label>
            <select value={form.soilType} onChange={e => setForm({ ...form, soilType: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf capitalize">
              {SOILS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Season</label>
            <select value={form.season} onChange={e => setForm({ ...form, season: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf capitalize">
              {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Water availability</label>
            <div className="flex gap-2">
              {WATER_LEVELS.map(w => (
                <button
                  type="button" key={w}
                  onClick={() => setForm({ ...form, waterAvailability: w })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize border transition-colors ${
                    form.waterAvailability === w ? 'bg-forest text-cream border-forest' : 'border-forest/20 text-ink-600'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Region (optional)</label>
            <input value={form.region} onChange={e => setForm({ ...form, region: e.target.value })}
              placeholder="e.g. Vidarbha, Maharashtra"
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 rounded-full bg-leaf-700 text-cream font-semibold hover:bg-forest transition-colors disabled:opacity-60">
            {loading ? 'Analyzing…' : 'Get recommendations'}
          </button>
          {error && <div className="text-red-700 text-sm">{error}</div>}
        </form>

        <div>
          {limitHit && (
            <div className="h-full flex flex-col items-center justify-center text-center border-2 border-dashed border-sun/40 bg-sun-100/40 rounded-2xl p-10 gap-3">
              <div className="text-3xl">🔒</div>
              <h3 className="font-display text-lg font-semibold text-forest">Free limit reached</h3>
              <p className="text-sm text-ink-600 max-w-xs">
                You've used all {ADVISORY_FREE_LIMIT} free Advisory searches for now. They reset in{' '}
                {formatResetTime(limitHit.resetAt)}, or go Premium for unlimited searches — AI Assistant and
                Weather stay free either way.
              </p>
              <Link to="/premium" className="mt-2 px-6 py-2.5 rounded-full bg-leaf-700 text-cream text-sm font-semibold hover:bg-forest transition-colors">
                View Premium plans
              </Link>
            </div>
          )}
          {!result && !limitHit && (
            <div className="h-full flex items-center justify-center text-center text-ink-600 border-2 border-dashed border-forest/15 rounded-2xl p-10">
              Fill the form to see AI-ranked crop recommendations for your field.
            </div>
          )}
          {result && (
            <div className="space-y-4">
              {result.recommendations.map((r, i) => (
                <div key={i} className="bg-cream-100 border border-forest/10 rounded-2xl p-5 flex gap-4 items-start">
                  <div className="font-mono text-2xl text-forest/30 font-bold w-8">{String(i + 1).padStart(2, '0')}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-display text-lg font-semibold text-forest">{r.crop}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${suitColor[r.suitability]}`}>{r.suitability} fit</span>
                    </div>
                    <p className="text-sm text-ink-600">{r.tip}</p>
                    <div className="text-xs text-soil-600 mt-2">💧 Water need: {r.waterNeed}</div>
                  </div>
                </div>
              ))}

              <div className="bg-sun-100 border border-sun/30 rounded-2xl p-5 mt-6">
                <h3 className="font-display font-semibold text-forest mb-2">General tips</h3>
                <ul className="text-sm text-ink-600 space-y-1.5 list-disc list-inside">
                  {result.generalTips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
