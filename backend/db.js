import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'agronexus.json');

const DEFAULT_EXPERTS = [
  { id: 1, name: 'Dr. Ramesh Patil', specialty: 'Soil Science', experience_years: 15, rating: 4.9, bio: 'Specialist in soil health, nutrient management and organic farming transitions.', avatar_emoji: '🧑‍🔬' },
  { id: 2, name: 'Anjali Verma', specialty: 'Pest & Disease Management', experience_years: 10, rating: 4.8, bio: 'Helps farmers identify and treat crop diseases early with integrated pest management.', avatar_emoji: '👩‍🌾' },
  { id: 3, name: 'Suresh Kumar', specialty: 'Irrigation Systems', experience_years: 12, rating: 4.7, bio: 'Expert in drip irrigation, water budgeting and micro-irrigation subsidies.', avatar_emoji: '👨‍🌾' },
  { id: 4, name: 'Dr. Meera Nair', specialty: 'Horticulture', experience_years: 18, rating: 4.9, bio: 'Focuses on fruit and vegetable crop planning for maximum yield.', avatar_emoji: '🧑‍🌾' },
  { id: 5, name: 'Vikram Singh', specialty: 'Farm Finance & Schemes', experience_years: 8, rating: 4.6, bio: 'Guides farmers through loans, subsidies and government scheme applications.', avatar_emoji: '👨‍💼' },
];

const DEFAULT_SCHEMES = [
  { id: 1, name: 'PM-KISAN', category: 'Income Support', description: 'Direct income support scheme for landholding farmer families across India.', benefit: '₹6,000 per year in three installments', eligibility: 'All landholding farmer families' },
  { id: 2, name: 'Pradhan Mantri Fasal Bima Yojana', category: 'Crop Insurance', description: 'Insurance cover against crop loss due to natural calamities, pests and diseases.', benefit: 'Low premium crop insurance', eligibility: 'Farmers growing notified crops' },
  { id: 3, name: 'Kisan Credit Card', category: 'Credit', description: 'Provides farmers with timely access to affordable credit for cultivation needs.', benefit: 'Short-term credit at low interest', eligibility: 'All farmers including tenant farmers' },
  { id: 4, name: 'Soil Health Card Scheme', category: 'Advisory', description: 'Provides soil nutrient status and fertilizer recommendations to farmers.', benefit: 'Free soil testing every 2 years', eligibility: 'All farmers' },
  { id: 5, name: 'Per Drop More Crop (Micro Irrigation)', category: 'Irrigation', description: 'Subsidy for drip and sprinkler irrigation systems to improve water use efficiency.', benefit: 'Up to 55% subsidy on equipment', eligibility: 'Farmers adopting micro-irrigation' },
  { id: 6, name: 'National Mission on Natural Farming', category: 'Sustainability', description: 'Promotes chemical-free natural farming practices across the country.', benefit: 'Training + input support', eligibility: 'Farmers willing to adopt natural farming' },
];

function defaultData() {
  return {
    users: [],
    listings: [],
    posts: [],
    comments: [],
    consultations: [],
    experts: DEFAULT_EXPERTS,
    schemes: DEFAULT_SCHEMES,
    _seq: { users: 0, listings: 0, posts: 0, comments: 0, consultations: 0 },
  };
}

function load() {
  if (!fs.existsSync(DB_FILE)) {
    const data = defaultData();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return data;
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    const data = defaultData();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return data;
  }
}

const data = load();

export function save() {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export function nextId(table) {
  data._seq[table] = (data._seq[table] || 0) + 1;
  return data._seq[table];
}

export default data;
