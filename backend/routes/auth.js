import express from 'express';
import bcrypt from 'bcryptjs';
import db, { save, nextId } from '../db.js';
import { signToken, requireAuth } from '../middleware/auth.js';

const router = express.Router();

function publicUser(u) {
  return { id: u.id, name: u.name, email: u.email, role: u.role, location: u.location, phone: u.phone, created_at: u.created_at };
}

router.post('/register', (req, res) => {
  const { name, email, password, location, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  const emailLower = email.toLowerCase();
  const existing = db.users.find(u => u.email === emailLower);
  if (existing) return res.status(409).json({ error: 'An account with this email already exists' });

  const hash = bcrypt.hashSync(password, 10);
  const user = {
    id: nextId('users'),
    name, email: emailLower, password_hash: hash,
    role: 'farmer', location: location || null, phone: phone || null,
    created_at: new Date().toISOString(),
  };
  db.users.push(user);
  save();

  const token = signToken(user);
  res.status(201).json({ user: publicUser(user), token });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const user = db.users.find(u => u.email === email.toLowerCase());
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

  const token = signToken(user);
  res.json({ user: publicUser(user), token });
});

router.get('/me', requireAuth, (req, res) => {
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user: publicUser(user) });
});

export default router;
