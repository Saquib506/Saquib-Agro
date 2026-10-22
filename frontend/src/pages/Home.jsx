import { Link } from 'react-router-dom';
import VineDivider from '../components/VineDivider';
import FarmAssistant from '../components/FarmAssistant';

const FEATURES = [
  { emoji: '🌱', title: 'Crop Recommendation', desc: 'AI-backed suggestions matched to your soil type, season and water availability.', to: '/advisory' },
  { emoji: '🔬', title: 'Disease Detection', desc: 'Match field symptoms against common crop diseases and get treatment tips.', to: '/disease-detection' },
  { emoji: '☁️', title: 'Weather Intelligence', desc: 'Live 6-day forecasts with farming-specific alerts for your exact location.', to: '/weather' },
  { emoji: '📈', title: 'Market Trends', desc: 'Track live listings and price signals across crops, seeds and equipment.', to: '/marketplace' },
  { emoji: '🛒', title: 'Agri Marketplace', desc: 'Buy and sell produce, seeds and equipment directly with other farmers.', to: '/marketplace' },
  { emoji: '👨‍🌾', title: 'Expert Consultation', desc: 'Book time with agronomists, irrigation and finance specialists.', to: '/experts' },
  { emoji: '💬', title: 'Farmer Community', desc: 'Ask questions, share field results and learn from your region\'s growers.', to: '/community' },
  { emoji: '🏛️', title: 'Govt Schemes', desc: 'Discover subsidies, credit and insurance schemes you may be eligible for.', to: '/schemes' },
];

const STEPS = [
  { n: '01', title: 'Tell us your field', desc: 'Soil type, season, location and water availability.' },
  { n: '02', title: 'Get grown-in insight', desc: 'Crop picks, weather alerts and market context, in one dashboard.' },
  { n: '03', title: 'Act with the community', desc: 'List produce, book experts and ask the forum — right from the same platform.' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden hero-dark text-cream">
        <div className="absolute inset-0 mesh-layer opacity-70 pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['🌿', '🍃', '🌱', '🌾', '🍃'].map((leaf, i) => (
            <span
              key={i}
              className="particle text-2xl"
              style={{
                left: `${10 + i * 20}%`,
                animationDuration: `${10 + i * 2}s`,
                animationDelay: `${i * 1.5}s`,
                '--drift-x': `${(i % 2 === 0 ? 1 : -1) * 40}px`,
              }}
            >
              {leaf}
            </span>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <span className="animate-fade-up delay-1 glow-badge inline-block bg-leaf-700/30 border border-leaf-400/40 text-leaf-400 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-6">
              For the entire crop lifecycle
            </span>
            <h1 className="animate-fade-up delay-2 font-display text-5xl md:text-6xl font-semibold text-cream leading-[1.05] inline-block">
              Farm smarter,<br /> harvest further.
              <span className="block h-1.5 w-16 mt-3 rounded-full shimmer-underline" />
            </h1>
            <p className="animate-fade-up delay-3 mt-8 text-lg text-cream/70 max-w-lg leading-relaxed">
              AgroNexus brings crop advisory, weather intelligence, a farmer marketplace and
              expert guidance into a single platform — built for productivity, profitability
              and sustainability.
            </p>
            <div className="animate-fade-up delay-4 mt-9 flex flex-wrap gap-4">
              <Link to="/signup" className="px-7 py-3.5 rounded-full bg-leaf-700 text-cream font-semibold hover:bg-leaf-600 hover:scale-105 hover:shadow-lg hover:shadow-leaf-700/40 transition-all">
                Get started free
              </Link>
              <Link to="/advisory" className="px-7 py-3.5 rounded-full border-2 border-cream/25 text-cream font-semibold hover:bg-cream/10 hover:scale-105 transition-all">
                Try crop advisory
              </Link>
            </div>
            <div className="animate-fade-up delay-5 mt-12 flex gap-10 font-mono text-cream">
              <div>
                <div className="text-3xl font-bold text-leaf-400">12+</div>
                <div className="text-xs text-cream/60 mt-1">Crop models</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-leaf-400">6-day</div>
                <div className="text-xs text-cream/60 mt-1">Weather outlook</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-leaf-400">24/7</div>
                <div className="text-xs text-cream/60 mt-1">Marketplace access</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up delay-3">
            <div className="rounded-[2rem] bg-forest-900/80 border border-leaf-400/20 backdrop-blur-sm text-cream p-8 shadow-2xl animate-float-card">
              <div className="text-sun font-mono text-xs uppercase tracking-widest mb-2">Today's field advisory</div>
              <div className="font-display text-2xl mb-4">Nagpur, Maharashtra</div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">⛅</span>
                <div>
                  <div className="text-3xl font-semibold">29°C</div>
                  <div className="text-cream/70 text-sm">Partly cloudy · 62% humidity</div>
                </div>
              </div>
              <div className="bg-cream/10 rounded-xl p-4 text-sm leading-relaxed">
                🌾 Conditions stable — good window for irrigation and field operations this week.
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-sun text-forest rounded-2xl px-5 py-4 shadow-xl animate-float-badge hidden sm:block">
              <div className="text-xs font-semibold uppercase tracking-wide">Recommended crop</div>
              <div className="font-display text-xl font-semibold">Chickpea (Chana)</div>
            </div>
          </div>
        </div>
        <VineDivider />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="max-w-2xl mb-14">
          <span className="text-leaf-700 text-xs font-semibold uppercase tracking-wide">What's inside</span>
          <h2 className="font-display text-4xl font-semibold text-forest mt-3 vine-underline inline-block">
            Everything grown into one platform
          </h2>
          <p className="text-ink-600 mt-8 leading-relaxed">
            From the seed you choose to the price you get, AgroNexus supports every stage of the season.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="group bg-cream-100 border border-forest/10 rounded-2xl p-6 hover:border-leaf hover:shadow-lg hover:-translate-y-1 transition-all border-t-4 border-t-soil/40 hover:border-t-leaf"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{f.emoji}</div>
              <h3 className="font-display text-lg font-semibold text-forest mb-2">{f.title}</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{f.desc}</p>
              <span className="inline-block mt-4 text-sm font-semibold text-leaf-700 group-hover:translate-x-1 transition-transform">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-forest-900 bg-forest text-cream py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <span className="text-sun text-xs font-semibold uppercase tracking-wide">How it works</span>
          <h2 className="font-display text-4xl font-semibold mt-3 mb-14">From soil to sale, in three steps</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div className="font-mono text-sun text-sm mb-3">{s.n}</div>
                <h3 className="font-display text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-cream/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium promo */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest text-cream p-10 md:p-14 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center shadow-2xl">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-sun/10 blur-3xl pointer-events-none" />
          <div className="relative">
            <span className="glow-badge inline-block bg-sun/20 border border-sun/40 text-sun text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-5">
              ✨ AgroNexus Premium
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 leading-tight">
              AI Assistant &amp; Weather are free — always.
            </h2>
            <p className="text-cream/70 leading-relaxed mb-7 max-w-lg">
              Go Premium only if you need unlimited Crop Advisory searches beyond the free daily limit, plus
              priority support and a few extra perks. Plans start at just ₹79.
            </p>
            <Link to="/premium" className="inline-block px-7 py-3.5 rounded-full bg-sun text-forest font-semibold hover:scale-105 hover:shadow-lg hover:shadow-sun/30 transition-all">
              See Premium plans →
            </Link>
          </div>
          <div className="relative bg-cream/5 border border-cream/10 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-cream/70">1 Year</span>
              <span className="font-mono font-bold text-sun">₹500</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-cream/70">Lifetime</span>
              <span className="font-mono font-bold text-sun">₹1499</span>
            </div>
            <div className="h-px bg-cream/10 my-2" />
            <p className="text-xs text-cream/60">Unlimited Advisory · Priority support · Premium badge</p>
          </div>
        </div>
      </section>

      {/* Thank You + Full Video Background */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/agronexus-demo.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-forest-900/70" />

        <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center py-20">
          <span className="animate-fade-up delay-1 inline-block text-leaf-400 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full border border-leaf-400/40 bg-cream/5 mb-6">
            With gratitude
          </span>
          <h2 className="animate-fade-up delay-2 font-display text-5xl md:text-6xl font-semibold text-cream mb-8">
            Thank You
          </h2>
          <p className="animate-fade-up delay-3 font-display italic text-xl md:text-2xl text-cream/90 leading-relaxed">
            "The farmer has to be an optimist or he wouldn't still be a farmer."
          </p>
          <span className="animate-fade-up delay-4 block text-sm not-italic text-cream/60 mt-4">
            — Will Rogers
          </span>
        </div>
      </section>

      <FarmAssistant />
    </div>
  );
}