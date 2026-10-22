import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(location.state?.from?.pathname || '/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 bg-field-lines">
      <div className="w-full max-w-md bg-cream-100 border border-forest/10 rounded-2xl shadow-lg p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">🌿</div>
          <h1 className="font-display text-3xl font-semibold text-forest">Welcome back</h1>
          <p className="text-ink-600 text-sm mt-2">Log in to manage your farm on AgroNexus.</p>
        </div>

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium text-ink-600 mb-1.5">Password</label>
            <input
              type="password" required value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-forest/20 bg-cream focus:outline-none focus:ring-2 focus:ring-leaf"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full py-3 rounded-full bg-forest text-cream font-semibold hover:bg-forest-600 transition-colors disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="text-center text-sm text-ink-600 mt-6">
          New to AgroNexus? <Link to="/signup" className="text-leaf-700 font-semibold hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
