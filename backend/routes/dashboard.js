import express from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const userId = req.user.id;
  const listings = db.listings.filter(l => l.seller_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const posts = db.posts.filter(p => p.author_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const consultations = db.consultations
    .filter(c => c.user_id === userId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map(c => ({ ...c, expert_name: db.experts.find(e => e.id === c.expert_id)?.name }));

  res.json({
    stats: {
      totalListings: listings.length,
      activeListings: listings.filter(l => l.status === 'active').length,
      totalPosts: posts.length,
      totalConsultations: consultations.length,
      pendingConsultations: consultations.filter(c => c.status === 'pending').length,
    },
    listings: listings.slice(0, 5),
    posts: posts.slice(0, 5),
    consultations: consultations.slice(0, 5),
  });
});

export default router;
