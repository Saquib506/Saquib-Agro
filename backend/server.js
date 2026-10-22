import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import './db.js'; // initializes DB + seed data

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import authRoutes from './routes/auth.js';
import marketplaceRoutes from './routes/marketplace.js';
import weatherRoutes from './routes/weather.js';
import advisoryRoutes from './routes/advisory.js';
import diseaseRoutes from './routes/disease.js';
import communityRoutes from './routes/community.js';
import expertsRoutes from './routes/experts.js';
import schemesRoutes from './routes/schemes.js';
import dashboardRoutes from './routes/dashboard.js';
import assistantRoutes from './routes/assistant.js';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'AgroNexus API' }));

app.use('/api/auth', authRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/advisory', advisoryRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/experts', expertsRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/assistant', assistantRoutes);

// Serve the built frontend (frontend/dist) if it exists, so the whole
// app runs from a single server + single port.
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
}

app.listen(PORT, () => {
  console.log(`🌾 AgroNexus running at http://localhost:${PORT}`);
});