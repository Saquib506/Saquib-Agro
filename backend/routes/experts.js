import express from 'express';
import db, { save, nextId } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  const rows = db.experts.slice().sort((a, b) => b.rating - a.rating);
  res.json({ experts: rows });
});

router.post('/:id/book', requireAuth, (req, res) => {
  const { topic, preferredDate } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic is required' });
  const expert = db.experts.find(e => e.id === Number(req.params.id));
  if (!expert) return res.status(404).json({ error: 'Expert not found' });
  const consultation = {
    id: nextId('consultations'),
    user_id: req.user.id,
    expert_id: expert.id,
    topic, preferred_date: preferredDate || null,
    status: 'pending',
    created_at: new Date().toISOString(),
  };
  db.consultations.push(consultation);
  save();
  res.status(201).json({ consultation });
});

router.get('/consultations/mine', requireAuth, (req, res) => {
  const rows = db.consultations
    .filter(c => c.user_id === req.user.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map(c => {
      const expert = db.experts.find(e => e.id === c.expert_id);
      return { ...c, expert_name: expert?.name, specialty: expert?.specialty, avatar_emoji: expert?.avatar_emoji };
    });
  res.json({ consultations: rows });
});

export default router;
