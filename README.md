# 🌿 AgroNexus

An AI-powered agriculture platform — crop advisory, weather intelligence, a farmer marketplace, expert consultations, community forum and government scheme discovery. Full-stack internship project.

## Tech Stack
**Frontend:** React (Vite), React Router, Tailwind CSS — already built into `frontend/dist`
**Backend:** Node.js, Express, JSON-file database (no native dependencies, no build tools needed), JWT auth, bcrypt

## 🚀 Fastest way to run (single server, single command)

The repaired build includes a responsive navigation, site-wide language switching for the core UI, a resilient Farm Assistant fallback, improved weather animations, and safer API error handling.

The frontend is already built and included in `frontend/dist`. The backend serves it directly — you only need to run the backend.

```bash
cd backend
npm install
npm start
```

Then open your browser at:
```
http://localhost:5050
```

That's it — the whole site (all pages, signup, marketplace, forum, etc.) works from this one URL.

## If you want to edit the frontend code

If you change anything inside `frontend/src`, rebuild it so the backend picks up the changes:

```bash
cd frontend
npm install
npm run build
```
Then restart the backend (`npm start` in the `backend` folder).

For live-reloading during active frontend development, you can instead run:
```bash
cd frontend
npm install
npm run dev
```
This opens a separate dev server at `http://localhost:5173` (make sure the backend is also running at `:5050` in another terminal).

## Data storage
User accounts, listings, posts, etc. are stored in `backend/agronexus.json` — a plain JSON file, created automatically the first time you run the server. No database software to install. To reset all data, stop the server and delete this file.

## Features
- 🔐 Auth (JWT + bcrypt)
- 🛒 Marketplace — list/browse crops, seeds, equipment, fertilizer, livestock
- ☁️ Weather Intelligence — live conditions + 6-day forecast (Open-Meteo API, needs internet)
- 🤖 AI Crop Advisory — rule-based crop recommendation engine
- 💬 Community Forum — posts, replies, tags
- 👨‍🌾 Expert Consultation — browse experts, book consultations
- 🏛️ Government Schemes — PM-KISAN, crop insurance, KCC, etc.
- 📊 Dashboard — personal summary

## Notes
- `backend/agronexus.json` is your database — back it up before big changes.
- Weather page needs internet access on the machine running the backend.
- Default JWT secret is for local/dev use — set a `JWT_SECRET` environment variable for any real deployment.
- Farm Assistant uses OpenAI when `OPENAI_API_KEY` is configured, with a local agriculture fallback when it is not. The model is configurable through `ASSISTANT_MODEL`.
- In Vite development, `/api` is proxied to `http://localhost:5050`, so you no longer need a frontend API URL just to run the project locally.
