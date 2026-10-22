import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/schemes').then(d => setSchemes(d.schemes)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-14">
      <span className="text-leaf-700 text-xs font-semibold uppercase tracking-wide">Support & subsidies</span>
      <h1 className="font-display text-4xl font-semibold text-forest mt-2 mb-2">Government Schemes</h1>
      <p className="text-ink-600 mb-10 max-w-xl">Explore central schemes for income support, insurance, credit and sustainable farming.</p>

      {loading ? (
        <div className="text-ink-600">Loading schemes…</div>
      ) : (
        <div className="space-y-4">
          {schemes.map(s => (
            <div key={s.id} className="bg-cream-100 border border-forest/10 rounded-2xl p-6 border-l-4 border-l-sun">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-soil-600 bg-soil-100 px-2.5 py-1 rounded-full">{s.category}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-forest mb-2">{s.name}</h3>
              <p className="text-sm text-ink-600 mb-4 leading-relaxed">{s.description}</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-leaf-50 rounded-lg px-4 py-3">
                  <div className="text-xs text-leaf-700 font-semibold uppercase mb-1">Benefit</div>
                  <div className="text-ink-600">{s.benefit}</div>
                </div>
                <div className="bg-forest/5 rounded-lg px-4 py-3">
                  <div className="text-xs text-forest font-semibold uppercase mb-1">Eligibility</div>
                  <div className="text-ink-600">{s.eligibility}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
