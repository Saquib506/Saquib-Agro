import express from 'express';
import db, { save, nextId } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const CATEGORY_EMOJI = {
  crop: '🌾', seed: '🌱', equipment: '🚜', fertilizer: '🧪', livestock: '🐄', other: '📦'
};

function withSeller(listing) {
  const seller = db.users.find(u => u.id === listing.seller_id);
  return {
    ...listing,
    seller_name: seller?.name || 'Unknown',
    seller_location: seller?.location || null,
    seller_phone: seller?.phone || null,
  };
}

router.get('/', (req, res) => {
  const { category, q } = req.query;
  let rows = db.listings.filter(l => l.status === 'active');
  if (category && category !== 'all') rows = rows.filter(l => l.category === category);
  if (q) rows = rows.filter(l => l.title.toLowerCase().includes(q.toLowerCase()));
  rows = rows.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json({ listings: rows.map(withSeller) });
});

router.get('/mine/all', requireAuth, (req, res) => {
  const rows = db.listings.filter(l => l.seller_id === req.user.id)
    .slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json({ listings: rows });
});

router.get('/:id', (req, res) => {
  const listing = db.listings.find(l => l.id === Number(req.params.id));
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json({ listing: withSeller(listing) });
});

router.post('/', requireAuth, (req, res) => {
  const { title, category, price, unit, quantity, location, description } = req.body;
  if (!title || !category || !price || !unit || !quantity) {
    return res.status(400).json({ error: 'Title, category, price, unit and quantity are required' });
  }
  const listing = {
    id: nextId('listings'),
    seller_id: req.user.id,
    title, category,
    price: Number(price), unit, quantity: Number(quantity),
    location: location || null, description: description || null,
    image_emoji: CATEGORY_EMOJI[category] || '📦',
    status: 'active',
    created_at: new Date().toISOString(),
  };
  db.listings.push(listing);
  save();
  res.status(201).json({ listing });
});

router.delete('/:id', requireAuth, (req, res) => {
  const listing = db.listings.find(l => l.id === Number(req.params.id));
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  if (listing.seller_id !== req.user.id) return res.status(403).json({ error: 'Not your listing' });
  db.listings = db.listings.filter(l => l.id !== listing.id);
  save();
  res.json({ success: true });
});

export default router;
