# Kya Kya Change Hua Hai (Hinglish)

Sirf jo maanga tha wahi change kiya hai. Baaki pura code same hai.

## 1. AI Assistant (Farm Assistant)
- Purana AI code hata ke naya, working AI backend route rakha hai:
  `backend/routes/assistant.js` — ye Claude (Anthropic) ya ChatGPT (OpenAI) dono support karta hai.
- **AI kaam karne ke liye API key chahiye.** `backend/.env.example` ko copy karke `backend/.env` banao aur usme
  `ANTHROPIC_API_KEY=...` (ya `OPENAI_API_KEY=...`) daalo. Bina key ke AI kaam nahi karega — yahi wajह thi ki pehle
  wo "kaam nahi kar raha" tha.
- Assistant button ka **logo aur animation bilkul change nahi kiya** (🌾/💬 leaf-sway button, ring pulse — sab same hai).

## 2. Language selector — ab website ke top-right me
- Pehle language dropdown AI assistant ke andar tha — ab wahan se **hata diya** hai.
- Ab **Navbar ke top-right** me ek 🌐 language switcher hai jisme India ki top 5 bhashayein hain:
  English, हिन्दी, मराठी, తెలుగు, বাংলা.
- Ye language poori site pe apply hoti hai aur AI Assistant bhi usi bhasha me reply karta hai
  (`frontend/src/context/LanguageContext.jsx`).

## 3. Voice note + Text-to-Speech (AI Assistant ke andar)
- 🎤 **Mic button**: farmer bol sakta hai, uski awaaz automatically type ho jaati hai (browser ki built-in
  Speech Recognition use hoti hai — Chrome me best chalta hai).
- 🔊 **Listen button**: har AI reply ke saath speaker icon hai — jo padh nahi paate, wo button dabaake jawaab
  sun sakte hain.

## 4. Premium plans (homepage + naya /premium page)
- Homepage par ek premium banner add kiya hai jo `/premium` page pe le jaata hai.
- `/premium` page par 5 plans hain (aap in prices ko `frontend/src/context/PremiumContext.jsx` me kabhi bhi
  badal sakte ho):
  - 1 Month — ₹79
  - 3 Months — ₹199
  - 6 Months — ₹349
  - 1 Year — ₹500
  - Lifetime — ₹1499
- **Abhi ye demo checkout hai** (real payment gateway jaise Razorpay/UPI connect nahi kiya, kyunki uske liye
  aapki payment gateway keys chahiye). Button dabate hi premium locally activate ho jaata hai — jab aap real
  payment lagana chaho to bata dena, wo route bhi jod denge.

## 5. Advisory search limit (sirf Advisory/Crop Recommendation)
- **AI Assistant free hai, Weather bhi free hai — dono par koi limit nahi.**
- Sirf **Advisory (crop recommendation)** page par: free user ko **10 ghante me 5 search** milti hain.
- 5 se zyada search karne par "Free limit reached" message aata hai, jisme Premium page ka link hota hai.
- Premium le lene ke baad Advisory bhi unlimited ho jaata hai.

## Kaise chalayein (VS Code)
```
cd backend
npm install
cp .env.example .env   # phir .env me apni ANTHROPIC_API_KEY ya OPENAI_API_KEY daalo
npm run dev

cd ../frontend
npm install
npm run dev
```
Frontend `http://localhost:5173` par khulega, backend `http://localhost:5050` par.

## Bug fix (bonus)
`frontend/src/components/weatherIcon.jsx` file ka naam import se match nahi kar raha tha
(`WeatherIcon` import hota tha but file `weatherIcon.jsx` thi) — Mac/Linux par ye build fail kar deta.
File ka naam `WeatherIcon.jsx` kar diya hai taaki build har jagah chale. Isse koi feature change nahi hua,
sirf ek chhota naming bug fix hai.
