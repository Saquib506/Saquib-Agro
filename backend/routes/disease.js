import express from 'express';

const router = express.Router();

const DISEASE_RULES = [
  {
    name: 'Powdery Mildew',
    symptoms: ['white_powder', 'yellow_leaves', 'stunted_growth'],
    description: 'A fungal disease that coats leaves in a white powdery layer, common in humid conditions.',
    treatment: 'Apply sulfur-based fungicide and improve air circulation between plants.',
  },
  {
    name: 'Leaf Blight',
    symptoms: ['brown_spots', 'yellow_leaves', 'wilting'],
    description: 'Fungal or bacterial infection causing browning and death of leaf tissue, spreading quickly in wet weather.',
    treatment: 'Remove and destroy infected leaves; apply copper-based fungicide; avoid overhead irrigation.',
  },
  {
    name: 'Root Rot',
    symptoms: ['wilting', 'rotting_stem', 'stunted_growth'],
    description: 'Caused by waterlogged soil and fungal pathogens attacking the root system.',
    treatment: 'Improve field drainage, reduce watering frequency, and apply a soil fungicide drench.',
  },
  {
    name: 'Aphid Infestation',
    symptoms: ['curling_leaves', 'stunted_growth', 'yellow_leaves'],
    description: 'Small sap-sucking insects that cluster under leaves, causing curling and weakened growth.',
    treatment: 'Spray neem oil or insecticidal soap; introduce natural predators like ladybugs.',
  },
  {
    name: 'Leaf-Eating Caterpillars',
    symptoms: ['holes_leaves', 'stunted_growth'],
    description: 'Larvae feeding directly on leaf tissue, leaving visible holes and ragged edges.',
    treatment: 'Handpick larvae where feasible; apply Bt (Bacillus thuringiensis) based biopesticide.',
  },
  {
    name: 'Bacterial Wilt',
    symptoms: ['wilting', 'rotting_stem', 'brown_spots'],
    description: 'Bacterial infection blocking water transport in the stem, causing sudden wilting.',
    treatment: 'Remove and destroy infected plants immediately to prevent spread; rotate crops next season.',
  },
  {
    name: 'Viral Mosaic Disease',
    symptoms: ['curling_leaves', 'yellow_leaves', 'stunted_growth'],
    description: 'Viral infection, often spread by insects, causing mottled yellow-green patterns and distorted growth.',
    treatment: 'No cure once infected — remove affected plants and control insect vectors (whiteflies/aphids) to prevent spread.',
  },
];

router.post('/detect', (req, res) => {
  const { crop, symptoms } = req.body;
  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({ error: 'At least one symptom is required' });
  }

  const matches = DISEASE_RULES
    .map(rule => {
      const overlap = rule.symptoms.filter(s => symptoms.includes(s)).length;
      const confidence = Math.round((overlap / rule.symptoms.length) * 100);
      return { ...rule, confidence, overlap };
    })
    .filter(m => m.overlap > 0)
    .sort((a, b) => b.confidence - a.confidence || b.overlap - a.overlap)
    .slice(0, 3)
    .map(({ name, description, treatment, confidence }) => ({ name, description, treatment, confidence }));

  res.json({ crop, matches });
});

export default router;