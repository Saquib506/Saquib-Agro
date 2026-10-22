import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ schemes: db.schemes });
});

export default router;
