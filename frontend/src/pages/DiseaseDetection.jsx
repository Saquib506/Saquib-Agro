import { useState } from 'react';
import { api } from '../api/client';

const CROPS = ['Rice', 'Wheat', 'Cotton', 'Tomato', 'Sugarcane', 'Maize', 'Chickpea', 'Soybean', 'Onion', 'Potato'];

const SYMPTOMS = [
  { id: 'yellow_leaves', label: 'Yellowing leaves' },
  { id: 'brown_spots', label: 'Brown/black spots on leaves' },
  { id: 'white_powder', label: 'White powdery coating' },
  { id: 'wilting', label: 'Wilting despite watering' },
  { id: 'holes_leaves', label: 'Holes in leaves' },
  { id: 'stunted_growth', label: 'Stunted growth' },
  { id: 'rotting_stem', label: 'Rotting stem/root' },
  { id: 'curling_leaves', label: 'Curling or twisted leaves' },
];

export default function DiseaseDetection() {
  const [crop, setCrop] = useState('Rice');
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggle = (id) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected.length === 0) {
      setError('Select at least one symptom.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await api.post('/disease/detect', { crop, symptoms: selected });
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-14">
      <span className="text-leaf-700 text-xs font-semibold uppercase tracking-wide">Field diagnosis</span>
      <h1 className="font-display text-4xl font-semibold text-forest mt-2 mb-2">Disease Detection</h1>
      <p className="text-ink-600 mb-10 max-w-xl">
        Select your crop and the symptoms you're seeing in the field — we'll match them against common
        disease and pest patterns and suggest next steps.
      </p>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-10">
        <form onSubmit={handleSubmit} className="bg-cream-100 border border-forest/10 rounded-2xl p-6 h-fit space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Crop</label>
            <select value={crop} onChange={e => setCrop(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf">
              {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-600 mb-2">Symptoms observed</label>
            <div className="space-y-2">
              {SYMPTOMS.map(s => (
                <label key={s.id} className="flex items-center gap-2.5 text-sm text-ink-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(s.id)}
                    onChange={() => toggle(s.id)}
                    className="w-4 h-4 accent-leaf-700"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 rounded-full bg-leaf-700 text-cream font-semibold hover:bg-forest transition-colors disabled:opacity-60">
            {loading ? 'Analyzing…' : 'Detect issue'}
          </button>
          {error && <div className="text-red-700 text-sm">{error}</div>}
        </form>

        <div>
          {!result && (
            <div className="h-full flex items-center justify-center text-center text-ink-600 border-2 border-dashed border-forest/15 rounded-2xl p-10">
              Select symptoms to see likely diagnoses and treatment tips.
            </div>
          )}
          {result && (
            <div className="space-y-4">
              {result.matches.length === 0 ? (
                <div className="bg-cream-100 border border-forest/10 rounded-2xl p-6 text-sm text-ink-600">
                  No strong match found for this symptom combination. Consider consulting an expert for an in-person diagnosis.
                </div>
              ) : result.matches.map((m, i) => (
                <div key={i} className="bg-cream-100 border border-forest/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-lg font-semibold text-forest">{m.name}</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sun-100 text-sun-600">{m.confidence}% match</span>
                  </div>
                  <p className="text-sm text-ink-600 mb-3">{m.description}</p>
                  <div className="bg-leaf-50 rounded-lg px-4 py-3 text-sm text-forest">
                    <strong>Suggested action:</strong> {m.treatment}
                  </div>
                </div>
              ))}
              <div className="bg-sun-100 border border-sun/30 rounded-2xl p-5 text-sm text-ink-600">
                This is a rule-based screening tool, not a lab diagnosis. For confirmed treatment, book a{' '}
                <a href="/experts" className="text-leaf-700 font-semibold hover:underline">pest &amp; disease expert</a>.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}