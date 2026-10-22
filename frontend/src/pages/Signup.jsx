import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', location: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-12 bg-field-lines">
      <div className="w-full max-w-md bg-cream-100 border border-forest/10 rounded-2xl shadow-lg p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">🌱</div>
          <h1 className="font-display text-3xl font-semibold text-forest">Create your account</h1>
          <p className="text-ink-600 text-sm mt-2">Join AgroNexus and start growing smarter.</p>
        </div>

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Full name</label>
            <input
              required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="Ramesh Kumar"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Email</label>
            <input
              type="email" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Location</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="Nagpur, Maharashtra"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Password</label>
            <input
              type="password" required minLength={6} value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="At least 6 characters"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full py-3 rounded-full bg-forest text-cream font-semibold hover:bg-forest-600 transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-ink-600 mt-6">
          Already have an account? <Link to="/login" className="text-leaf-700 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
