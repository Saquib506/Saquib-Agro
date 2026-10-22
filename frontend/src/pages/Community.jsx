import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const TAGS = ['General', 'Pest Control', 'Irrigation', 'Market Prices', 'Equipment', 'Success Story'];

export default function Community() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', tag: 'General' });
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const data = await api.get('/community');
    setPosts(data.posts);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setPosting(true);
    setError('');
    try {
      await api.post('/community', form, token);
      setForm({ title: '', body: '', tag: 'General' });
      setShowForm(false);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setPosting(false);
    }
  };

  const timeAgo = (date) => {
    const diff = (Date.now() - new Date(date + 'Z')) / 1000;
    if (diff < 3600) return `${Math.max(1, Math.round(diff / 60))}m ago`;
    if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
    return `${Math.round(diff / 86400)}d ago`;
  };

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-14">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-leaf-700 text-xs font-semibold uppercase tracking-wide">Farmer to farmer</span>
          <h1 className="font-display text-4xl font-semibold text-forest mt-2">Community Forum</h1>
        </div>
        {user && (
          <button onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 rounded-full bg-forest text-cream font-semibold hover:bg-forest-600 whitespace-nowrap">
            {showForm ? 'Cancel' : '+ New post'}
          </button>
        )}
      </div>

      {!user && (
        <div className="bg-sun-100 border border-sun/40 text-forest text-sm rounded-xl px-5 py-3 mb-8">
          Log in to start a discussion or reply to other farmers.
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="bg-cream-100 border border-forest/10 rounded-2xl p-6 mb-10 space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
          <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Post title" className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf" />
          <select value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf">
            {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <textarea required rows={4} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })}
            placeholder="Share details, ask a question, or post an update…"
            className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf" />
          <button type="submit" disabled={posting} className="px-6 py-2.5 rounded-full bg-leaf-700 text-cream font-semibold hover:bg-forest disabled:opacity-60">
            {posting ? 'Posting…' : 'Post to forum'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-ink-600">Loading discussions…</div>
      ) : (
        <div className="space-y-4">
          {posts.map(p => (
            <Link key={p.id} to={`/community/${p.id}`} className="block bg-cream-100 border border-forest/10 rounded-2xl p-5 hover:border-leaf hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-leaf-700 bg-leaf-50 px-2.5 py-1 rounded-full">{p.tag}</span>
                <span className="text-xs text-ink-600">{timeAgo(p.created_at)}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-forest mb-1">{p.title}</h3>
              <p className="text-sm text-ink-600 line-clamp-2 mb-3">{p.body}</p>
              <div className="text-xs text-ink-600 flex items-center justify-between">
                <span>by {p.author_name}</span>
                <span>💬 {p.comment_count} replies</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
