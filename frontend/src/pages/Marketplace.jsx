import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'crop', label: 'Crops' },
  { id: 'seed', label: 'Seeds' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'fertilizer', label: 'Fertilizer' },
  { id: 'livestock', label: 'Livestock' },
];

const EMPTY_FORM = { title: '', category: 'crop', price: '', unit: 'kg', quantity: '', location: '', description: '' };

export default function Marketplace() {
  const { user, token } = useAuth();
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (query) params.set('q', query);
      const data = await api.get(`/marketplace?${params.toString()}`);
      setListings(data.listings);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [category]);

  const handleSearch = (e) => { e.preventDefault(); load(); };

  const handleCreate = async (e) => {
    e.preventDefault();
    setPosting(true);
    setError('');
    try {
      await api.post('/marketplace', {
        ...form,
        price: parseFloat(form.price),
        quantity: parseFloat(form.quantity),
      }, token);
      setForm(EMPTY_FORM);
      setShowForm(false);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-leaf-700 text-xs font-semibold uppercase tracking-wide">Buy · Sell · Trade</span>
          <h1 className="font-display text-4xl font-semibold text-forest mt-2">Agri Marketplace</h1>
          <p className="text-ink-600 mt-2 max-w-xl">Browse crops, seeds and equipment listed directly by fellow farmers.</p>
        </div>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 rounded-full bg-forest text-cream font-semibold hover:bg-forest-600 transition-colors whitespace-nowrap"
          >
            {showForm ? 'Cancel' : '+ List an item'}
          </button>
        )}
      </div>

      {!user && (
        <div className="bg-sun-100 border border-sun/40 text-forest text-sm rounded-xl px-5 py-3 mb-8">
          Log in to list your own produce or equipment for sale.
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="bg-cream-100 border border-forest/10 rounded-2xl p-6 mb-10 grid md:grid-cols-2 gap-4">
          {error && <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Title</label>
            <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf" placeholder="e.g. Organic Wheat" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf">
              {CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Price (₹)</label>
            <input required type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf" placeholder="2500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-600 mb-1.5">Unit</label>
              <input required value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf" placeholder="kg / quintal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-600 mb-1.5">Quantity</label>
              <input required type="number" min="0" step="0.01" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf" placeholder="100" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Location</label>
            <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf" placeholder="Nagpur, Maharashtra" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf" placeholder="Details about quality, harvest date, etc." />
          </div>
          <button type="submit" disabled={posting} className="md:col-span-2 py-3 rounded-full bg-leaf-700 text-cream font-semibold hover:bg-forest transition-colors disabled:opacity-60">
            {posting ? 'Posting…' : 'Post listing'}
          </button>
        </form>
      )}

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search listings…"
          className="flex-1 px-4 py-2.5 rounded-lg border border-forest/20 bg-cream-100 focus:outline-none focus:ring-2 focus:ring-leaf"
        />
        <button type="submit" className="px-6 py-2.5 rounded-lg bg-forest/10 text-forest font-semibold hover:bg-forest/15">Search</button>
      </form>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === c.id ? 'bg-forest text-cream' : 'bg-cream-100 border border-forest/15 text-ink-600 hover:border-leaf'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-ink-600">Loading listings…</div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16 text-ink-600">No listings found. Be the first to list something!</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map(l => (
            <div key={l.id} className="bg-cream-100 border border-forest/10 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{l.image_emoji}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-leaf-700 bg-leaf-50 px-2.5 py-1 rounded-full">{l.category}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-forest mb-1">{l.title}</h3>
              <p className="text-sm text-ink-600 mb-3 line-clamp-2">{l.description || 'No description provided.'}</p>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-mono text-2xl font-bold text-forest">₹{l.price}</span>
                <span className="text-sm text-ink-600">/ {l.unit}</span>
              </div>
              <div className="text-xs text-ink-600 flex items-center justify-between border-t border-forest/10 pt-3">
                <span>📍 {l.location || 'Not specified'}</span>
                <span>{l.quantity} {l.unit} avail.</span>
              </div>
              <div className="text-xs text-ink-600 mt-2">Seller: {l.seller_name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
