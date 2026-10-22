import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function PostDetail() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/community/${id}`);
      setPost(data.post);
      setComments(data.comments);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    setPosting(true);
    try {
      await api.post(`/community/${id}/comments`, { body: comment }, token);
      setComment('');
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setPosting(false);
    }
  };

  if (loading) return <div className="max-w-3xl mx-auto px-5 py-14 text-ink-600">Loading…</div>;
  if (!post) return <div className="max-w-3xl mx-auto px-5 py-14 text-ink-600">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-14">
      <Link to="/community" className="text-leaf-700 text-sm font-semibold hover:underline">← Back to forum</Link>

      <div className="mt-6 bg-cream-100 border border-forest/10 rounded-2xl p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-leaf-700 bg-leaf-50 px-2.5 py-1 rounded-full">{post.tag}</span>
        <h1 className="font-display text-3xl font-semibold text-forest mt-3 mb-3">{post.title}</h1>
        <p className="text-ink-600 whitespace-pre-wrap leading-relaxed">{post.body}</p>
        <div className="text-xs text-ink-600 mt-4 border-t border-forest/10 pt-3">by {post.author_name}</div>
      </div>

      <h2 className="font-display text-xl font-semibold text-forest mt-10 mb-4">{comments.length} Replies</h2>

      {user ? (
        <form onSubmit={handleComment} className="flex gap-3 mb-8">
          <input
            required value={comment} onChange={e => setComment(e.target.value)}
            placeholder="Write a reply…"
            className="flex-1 px-4 py-2.5 rounded-lg border border-forest/20 bg-cream-100 focus:outline-none focus:ring-2 focus:ring-leaf"
          />
          <button type="submit" disabled={posting} className="px-6 py-2.5 rounded-lg bg-forest text-cream font-semibold hover:bg-forest-600 disabled:opacity-60">
            {posting ? '…' : 'Reply'}
          </button>
        </form>
      ) : (
        <div className="bg-sun-100 border border-sun/40 text-forest text-sm rounded-xl px-5 py-3 mb-8">
          <Link to="/login" className="font-semibold hover:underline">Log in</Link> to join the discussion.
        </div>
      )}

      {error && <div className="text-red-700 text-sm mb-4">{error}</div>}

      <div className="space-y-3">
        {comments.map(c => (
          <div key={c.id} className="bg-cream-100 border border-forest/10 rounded-xl p-4">
            <div className="text-sm text-ink-600">{c.body}</div>
            <div className="text-xs text-leaf-700 font-semibold mt-2">{c.author_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
