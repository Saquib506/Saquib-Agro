import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Experts() {
  const { user, token } = useAuth();
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/experts').then(d => setExperts(d.experts)).finally(() => setLoading(false));
  }, []);

  const handleBook = async (e, expertId) => {
    e.preventDefault();
    setError('');
    try {
      await api.post(`/experts/${expertId}/book`, { topic, preferredDate: date }, token);
      setStatus(expertId);
      setBookingId(null);
      setTopic('');
      setDate('');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
      <span className="text-leaf-700 text-xs font-semibold uppercase tracking-wide">Talk to a specialist</span>
      <h1 className="font-display text-4xl font-semibold text-forest mt-2 mb-2">Expert Consultation</h1>
      <p className="text-ink-600 mb-10 max-w-xl">Book time with agronomists and specialists across soil, irrigation, pest management and farm finance.</p>

      {loading ? (
        <div className="text-ink-600">Loading experts…</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {experts.map(ex => (
            <div key={ex.id} className="bg-cream-100 border border-forest/10 rounded-2xl p-6">
              <div className="text-4xl mb-3">{ex.avatar_emoji}</div>
              <h3 className="font-display text-lg font-semibold text-forest">{ex.name}</h3>
              <div className="text-sm text-leaf-700 font-medium mb-2">{ex.specialty}</div>
              <p className="text-sm text-ink-600 mb-3 leading-relaxed">{ex.bio}</p>
              <div className="flex items-center gap-3 text-xs text-ink-600 mb-4">
                <span>⭐ {ex.rating}</span>
                <span>· {ex.experience_years} yrs experience</span>
              </div>

              {status === ex.id ? (
                <div className="text-sm text-leaf-700 font-semibold bg-leaf-50 rounded-lg px-3 py-2">✓ Consultation requested</div>
              ) : bookingId === ex.id ? (
                <form onSubmit={(e) => handleBook(e, ex.id)} className="space-y-2">
                  <input required value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic (e.g. Wheat rust)"
                    className="w-full px-3 py-2 rounded-lg border border-forest/20 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-leaf" />
                  <input type="date" value={date} onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-forest/20 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-leaf" />
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 py-2 rounded-lg bg-forest text-cream text-sm font-semibold hover:bg-forest-600">Confirm</button>
                    <button type="button" onClick={() => setBookingId(null)} className="px-3 py-2 rounded-lg border border-forest/20 text-sm text-ink-600">Cancel</button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => user ? setBookingId(ex.id) : (window.location.href = '/login')}
                  className="w-full py-2.5 rounded-full bg-forest/10 text-forest font-semibold text-sm hover:bg-forest hover:text-cream transition-colors"
                >
                  Book consultation
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {error && <div className="text-red-700 text-sm mt-4">{error}</div>}
    </div>
  );
}
