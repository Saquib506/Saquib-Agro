import express from 'express';

const router = express.Router();

const LANGUAGE_NAMES = {
  en: 'English', hi: 'Hindi (हिन्दी)', mr: 'Marathi (मराठी)', te: 'Telugu (తెలుగు)', bn: 'Bengali (বাংলা)',
};

const FALLBACKS = {
  en: {
    crop: 'For a useful crop recommendation, tell me your crop, soil type, season, irrigation availability and location.',
    weather: 'For farming decisions, share your location and crop. I can help interpret rain, temperature, humidity and wind.',
    disease: 'Tell me the crop and symptoms (leaf spots, yellowing, wilting, holes, insects, etc.). I can suggest likely causes and safe next steps.',
    default: 'I can help with crops, soil, irrigation, fertilizers, pests, diseases, weather, farm equipment, markets and government schemes. What are you growing?',
  },
  hi: {
    crop: 'अच्छी फसल सलाह के लिए अपनी फसल, मिट्टी, मौसम, सिंचाई की उपलब्धता और स्थान बताएं।',
    weather: 'कृषि निर्णय के लिए अपना स्थान और फसल बताएं। मैं बारिश, तापमान, नमी और हवा का असर समझाने में मदद कर सकता हूँ।',
    disease: 'फसल और लक्षण बताएं (पत्तियों पर दाग, पीलापन, मुरझाना, छेद, कीट आदि)। मैं संभावित कारण और सुरक्षित अगले कदम बता सकता हूँ।',
    default: 'मैं फसल, मिट्टी, सिंचाई, खाद, कीट, रोग, मौसम, कृषि उपकरण, मंडी और सरकारी योजनाओं में मदद कर सकता हूँ। आप क्या उगा रहे हैं?',
  },
  mr: {
    crop: 'पीक, मातीचा प्रकार, हंगाम, सिंचनाची उपलब्धता आणि ठिकाण सांगा; त्यानुसार पीक सल्ला देतो.',
    weather: 'कृषी निर्णयासाठी तुमचे ठिकाण आणि पीक सांगा. पाऊस, तापमान, आर्द्रता आणि वाऱ्याचा परिणाम समजावून सांगू शकतो.',
    disease: 'पीक आणि लक्षणे सांगा (पानांवर डाग, पिवळेपणा, कोमेजणे, छिद्रे, किडी इ.). संभाव्य कारणे आणि पुढील सुरक्षित उपाय सांगतो.',
    default: 'मी पीक, माती, सिंचन, खत, किडी, रोग, हवामान, शेती उपकरणे, बाजार आणि सरकारी योजनांबद्दल मदत करू शकतो.',
  },
  te: {
    crop: 'పంట, నేల రకం, కాలం, నీటి లభ్యత మరియు ప్రాంతం చెప్పండి; తగిన పంట సలహా ఇస్తాను.',
    weather: 'వ్యవసాయ నిర్ణయాల కోసం మీ ప్రాంతం మరియు పంట చెప్పండి. వర్షం, ఉష్ణోగ్రత, తేమ, గాలి ప్రభావాన్ని వివరించగలను.',
    disease: 'పంట మరియు లక్షణాలు చెప్పండి (ఆకుల మచ్చలు, పసుపు, వాడిపోవడం, రంధ్రాలు, పురుగులు). సాధ్యమైన కారణాలు, తదుపరి చర్యలు చెబుతాను.',
    default: 'పంటలు, నేల, నీరు, ఎరువులు, పురుగులు, వ్యాధులు, వాతావరణం, పరికరాలు, మార్కెట్లు మరియు ప్రభుత్వ పథకాలపై నేను సహాయం చేయగలను.',
  },
  bn: {
    crop: 'ফসল, মাটির ধরন, মৌসুম, সেচের সুযোগ ও অবস্থান জানান; আমি উপযুক্ত ফসলের পরামর্শ দেব।',
    weather: 'কৃষি সিদ্ধান্তের জন্য আপনার অবস্থান ও ফসল জানান। বৃষ্টি, তাপমাত্রা, আর্দ্রতা ও বাতাসের প্রভাব বুঝতে সাহায্য করব।',
    disease: 'ফসল ও লক্ষণ জানান (পাতায় দাগ, হলুদ হওয়া, শুকিয়ে যাওয়া, ছিদ্র, পোকা ইত্যাদি)। সম্ভাব্য কারণ ও নিরাপদ পরবর্তী পদক্ষেপ বলব।',
    default: 'ফসল, মাটি, সেচ, সার, পোকা, রোগ, আবহাওয়া, কৃষি যন্ত্র, বাজার ও সরকারি প্রকল্প নিয়ে আমি সাহায্য করতে পারি।',
  },
};

function buildSystemPrompt(languageName) {
  return `You are Farm Assistant for AgroNexus, serving Indian farmers. Reply only about agriculture and farming. If unrelated, politely redirect to farming. Reply in ${languageName}. Be practical, concise, and safety-conscious. Do not invent government benefits, pesticide doses, diagnoses, prices, or weather data. When a high-risk chemical treatment is discussed, recommend following the product label and local agricultural expert guidance.`;
}

function fallback(message, language) {
  const lower = message.toLowerCase();
  const set = FALLBACKS[language] || FALLBACKS.en;
  if (/crop|फसल|पीक|పంట|ফসল/.test(lower)) return set.crop;
  if (/weather|rain|मौसम|बारिश|हवामान|पाऊस|వాతావరణ|వర్ష|আবহাওয়া|বৃষ্টি/.test(lower)) return set.weather;
  if (/disease|pest|कीट|रोग|किड|रोग|వ్యాధి|పురుగు|রোগ|পোকা/.test(lower)) return set.disease;
  return set.default;
}

async function callOpenAI({ key, model, system, history, message }) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      instructions: system,
      input: [
        ...history.map((h) => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: [{ type: 'input_text', text: String(h.content || '') }] })),
        { role: 'user', content: [{ type: 'input_text', text: message }] },
      ],
      max_output_tokens: 700,
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'OpenAI request failed');
  return data.output_text?.trim() || '';
}

router.get('/status', (_req, res) => {
  res.json({ configured: Boolean(process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY), provider: process.env.OPENAI_API_KEY ? 'openai' : process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'local-fallback' });
});

router.post('/chat', async (req, res) => {
  const { message, language = 'en', history = [] } = req.body || {};
  if (typeof message !== 'string' || !message.trim()) return res.status(400).json({ error: 'Message is required' });

  const safeLanguage = LANGUAGE_NAMES[language] ? language : 'en';
  const trimmedHistory = Array.isArray(history) ? history.filter((h) => h && ['user','assistant'].includes(h.role)).slice(-10) : [];
  const system = buildSystemPrompt(LANGUAGE_NAMES[safeLanguage]);

  try {
    if (process.env.OPENAI_API_KEY) {
      const model = process.env.ASSISTANT_MODEL || 'gpt-5-mini';
      const reply = await callOpenAI({ key: process.env.OPENAI_API_KEY, model, system, history: trimmedHistory, message: message.trim() });
      if (reply) return res.json({ reply, provider: 'openai' });
    }

    // Keep Claude support optional; a valid Anthropic model must be supplied by env.
    if (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_MODEL) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL,
          max_tokens: 700,
          system,
          messages: [...trimmedHistory.map((h) => ({ role: h.role, content: String(h.content || '') })), { role: 'user', content: message.trim() }],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const reply = (data.content || []).map((b) => b.text || '').join('\n').trim();
        if (reply) return res.json({ reply, provider: 'anthropic' });
      }
      console.error('Anthropic API error:', data);
    }

    return res.json({ reply: fallback(message, safeLanguage), provider: 'local-fallback' });
  } catch (err) {
    console.error('Assistant provider error:', err.message);
    return res.json({ reply: fallback(message, safeLanguage), provider: 'local-fallback', warning: 'AI provider unavailable; local agriculture assistant used.' });
  }
});

export default router;
