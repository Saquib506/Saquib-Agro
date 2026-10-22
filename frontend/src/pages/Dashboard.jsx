import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard', token).then(setData).finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="max-w-6xl mx-auto px-5 py-14 text-ink-600">Loading dashboard…</div>;

  const stats = data?.stats || {};

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
      <span className="text-leaf-700 text-xs font-semibold uppercase tracking-wide">Your farm, at a glance</span>
      <h1 className="font-display text-4xl font-semibold text-forest mt-2 mb-2">Welcome, {user?.name.split(' ')[0]}</h1>
      <p className="text-ink-600 mb-10">{user?.location || 'Add your location to personalize weather alerts.'}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {[
          { label: 'Active listings', value: stats.activeListings ?? 0, emoji: '🛒' },
          { label: 'Total listings', value: stats.totalListings ?? 0, emoji: '📦' },
          { label: 'Forum posts', value: stats.totalPosts ?? 0, emoji: '💬' },
          { label: 'Consultations', value: stats.totalConsultations ?? 0, emoji: '👨‍🌾' },
        ].map(s => (
          <div key={s.label} className="bg-cream-100 border border-forest/10 rounded-2xl p-6">
            <div className="text-2xl mb-2">{s.emoji}</div>
            <div className="font-mono text-3xl font-bold text-forest">{s.value}</div>
            <div className="text-sm text-ink-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-forest">Your listings</h2>
            <Link to="/marketplace" className="text-sm text-leaf-700 font-semibold hover:underline">Manage →</Link>
          </div>
          {data.listings.length === 0 ? (
            <div className="text-sm text-ink-600 bg-cream-100 border border-dashed border-forest/15 rounded-xl p-5">
              No listings yet. <Link to="/marketplace" className="text-leaf-700 font-semibold">List your first item</Link>.
            </div>
          ) : (
            <div className="space-y-3">
              {data.listings.map(l => (
                <div key={l.id} className="bg-cream-100 border border-forest/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-forest text-sm">{l.image_emoji} {l.title}</div>
                    <div className="text-xs text-ink-600">₹{l.price} / {l.unit}</div>
                  </div>
                  <span className="text-xs font-semibold uppercase text-leaf-700 bg-leaf-50 px-2.5 py-1 rounded-full">{l.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold text-forest">Your consultations</h2>
            <Link to="/experts" className="text-sm text-leaf-700 font-semibold hover:underline">Book more →</Link>
          </div>
          {data.consultations.length === 0 ? (
            <div className="text-sm text-ink-600 bg-cream-100 border border-dashed border-forest/15 rounded-xl p-5">
              No consultations booked yet. <Link to="/experts" className="text-leaf-700 font-semibold">Find an expert</Link>.
            </div>
          ) : (
            <div className="space-y-3">
              {data.consultations.map(c => (
                <div key={c.id} className="bg-cream-100 border border-forest/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-forest text-sm">{c.topic}</div>
                    <div className="text-xs text-ink-600">with {c.expert_name}</div>
                  </div>
                  <span className="text-xs font-semibold uppercase text-sun-600 bg-sun-100 px-2.5 py-1 rounded-full">{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-forest">Your forum posts</h2>
          <Link to="/community" className="text-sm text-leaf-700 font-semibold hover:underline">Go to forum →</Link>
        </div>
        {data.posts.length === 0 ? (
          <div className="text-sm text-ink-600 bg-cream-100 border border-dashed border-forest/15 rounded-xl p-5">
            You haven't posted in the community yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {data.posts.map(p => (
              <Link key={p.id} to={`/community/${p.id}`} className="bg-cream-100 border border-forest/10 rounded-xl p-4 hover:border-leaf transition-colors">
                <div className="font-semibold text-forest text-sm">{p.title}</div>
                <div className="text-xs text-ink-600 mt-1">{p.tag}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
