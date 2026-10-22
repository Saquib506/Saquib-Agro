import express from 'express';

const router = express.Router();

// Rule-based crop knowledge base (lightweight stand-in for an ML model)
const CROP_RULES = [
  { crop: 'Rice', soils: ['clay', 'loamy'], seasons: ['kharif', 'monsoon'], water: 'high', tip: 'Requires standing water; ensure good levelling of fields.' },
  { crop: 'Wheat', soils: ['loamy', 'clay'], seasons: ['rabi', 'winter'], water: 'medium', tip: 'Sow by early November for best yield in northern plains.' },
  { crop: 'Cotton', soils: ['black', 'loamy'], seasons: ['kharif', 'summer'], water: 'medium', tip: 'Black soil retains moisture well, reducing irrigation frequency.' },
  { crop: 'Sugarcane', soils: ['loamy', 'clay', 'black'], seasons: ['kharif', 'monsoon'], water: 'high', tip: 'Long duration crop — plan 10-12 months of field occupation.' },
  { crop: 'Maize', soils: ['loamy', 'sandy'], seasons: ['kharif', 'rabi', 'summer'], water: 'medium', tip: 'Well-drained soil is critical; avoid waterlogging.' },
  { crop: 'Millets (Bajra/Jowar)', soils: ['sandy', 'loamy'], seasons: ['kharif', 'summer'], water: 'low', tip: 'Highly drought tolerant — ideal for water-scarce regions.' },
  { crop: 'Chickpea (Chana)', soils: ['loamy', 'black'], seasons: ['rabi', 'winter'], water: 'low', tip: 'Needs minimal irrigation; good soil-nitrogen fixer.' },
  { crop: 'Soybean', soils: ['black', 'loamy'], seasons: ['kharif', 'monsoon'], water: 'medium', tip: 'Rotate with wheat for improved soil fertility.' },
  { crop: 'Groundnut', soils: ['sandy', 'loamy'], seasons: ['kharif', 'summer'], water: 'low', tip: 'Light, well-drained sandy soils give best pod development.' },
  { crop: 'Mustard', soils: ['loamy', 'sandy'], seasons: ['rabi', 'winter'], water: 'low', tip: 'Cold-tolerant oilseed, ideal winter cash crop.' },
  { crop: 'Tomato', soils: ['loamy'], seasons: ['rabi', 'summer', 'winter'], water: 'medium', tip: 'Stake plants and mulch to conserve soil moisture.' },
  { crop: 'Onion', soils: ['loamy', 'sandy'], seasons: ['rabi', 'winter'], water: 'medium', tip: 'Avoid waterlogging; raised beds recommended.' },
];

router.post('/recommend', (req, res) => {
  const { soilType, season, region, waterAvailability } = req.body;
  if (!soilType || !season) {
    return res.status(400).json({ error: 'soilType and season are required' });
  }
  const soil = soilType.toLowerCase();
  const seas = season.toLowerCase();
  const water = (waterAvailability || 'medium').toLowerCase();

  let matches = CROP_RULES.filter(r => r.soils.includes(soil) && r.seasons.includes(seas));

  // Score by water availability match
  matches = matches.map(m => {
    let score = 1;
    if (m.water === water) score += 2;
    else if ((water === 'low' && m.water === 'medium') || (water === 'high' && m.water === 'medium')) score += 1;
    return { ...m, score };
  }).sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    matches = CROP_RULES.filter(r => r.seasons.includes(seas)).slice(0, 3);
  }

  const recommendations = matches.slice(0, 5).map(m => ({
    crop: m.crop,
    suitability: m.score >= 3 ? 'High' : m.score === 2 ? 'Medium' : 'Fair',
    waterNeed: m.water,
    tip: m.tip,
  }));

  res.json({
    input: { soilType, season, region: region || 'Not specified', waterAvailability: water },
    recommendations,
    generalTips: [
      'Get your soil tested every 2 years under the Soil Health Card Scheme.',
      'Rotate crops seasonally to maintain soil nutrient balance.',
      'Combine AI recommendations with local Krishi Vigyan Kendra advice for best results.',
    ],
  });
});

router.get('/soil-types', (req, res) => {
  res.json({ soilTypes: ['loamy', 'clay', 'sandy', 'black', 'red', 'alluvial'] });
});

export default router;
