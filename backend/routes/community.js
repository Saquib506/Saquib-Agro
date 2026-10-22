import express from 'express';
import db, { save, nextId } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function userName(id) {
  return db.users.find(u => u.id === id)?.name || 'Unknown';
}

router.get('/', (req, res) => {
  const rows = db.posts
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map(p => ({
      ...p,
      author_name: userName(p.author_id),
      comment_count: db.comments.filter(c => c.post_id === p.id).length,
    }));
  res.json({ posts: rows });
});

router.get('/:id', (req, res) => {
  const post = db.posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  const comments = db.comments
    .filter(c => c.post_id === post.id)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map(c => ({ ...c, author_name: userName(c.author_id) }));
  res.json({ post: { ...post, author_name: userName(post.author_id) }, comments });
});

router.post('/', requireAuth, (req, res) => {
  const { title, body, tag } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'Title and body are required' });
  const post = {
    id: nextId('posts'),
    author_id: req.user.id,
    title, body, tag: tag || 'General',
    created_at: new Date().toISOString(),
  };
  db.posts.push(post);
  save();
  res.status(201).json({ post });
});

router.post('/:id/comments', requireAuth, (req, res) => {
  const { body } = req.body;
  if (!body) return res.status(400).json({ error: 'Comment body is required' });
  const post = db.posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  const comment = {
    id: nextId('comments'),
    post_id: post.id,
    author_id: req.user.id,
    body,
    created_at: new Date().toISOString(),
  };
  db.comments.push(comment);
  save();
  res.status(201).json({ comment: { ...comment, author_name: userName(comment.author_id) } });
});

export default router;
