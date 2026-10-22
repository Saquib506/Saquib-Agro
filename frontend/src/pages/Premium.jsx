import { useState } from 'react';
import { usePremium, PREMIUM_PLANS } from '../context/PremiumContext';

const PERKS = [
  { emoji: '🔍', title: 'Unlimited Advisory searches', desc: 'No 5-search cap — get crop recommendations as many times as you need.' },
  { emoji: '🤖', title: 'AI Assistant stays free', desc: 'The Farm Assistant chatbot is free for every user, premium or not.' },
  { emoji: '☁️', title: 'Weather stays free', desc: 'Live forecasts are free for everyone too — premium never touches it.' },
  { emoji: '⚡', title: 'Priority responses', desc: 'Your requests get priority during high-traffic advisory periods.' },
  { emoji: '🏅', title: 'Premium badge', desc: 'A gold badge on your dashboard and community posts.' },
  { emoji: '📞', title: 'Priority expert access', desc: 'Faster slot availability when booking agronomists and specialists.' },
];

export default function Premium() {
  const { premium, activatePlan, cancelPremium } = usePremium();
  const [confirmingPlan, setConfirmingPlan] = useState(null);
  const [justActivated, setJustActivated] = useState(false);

  const handleConfirm = () => {
    if (!confirmingPlan) return;
    activatePlan(confirmingPlan.id);
    setConfirmingPlan(null);
    setJustActivated(true);
    setTimeout(() => setJustActivated(false), 4000);
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="hero-dark text-cream relative overflow-hidden">
        <div className="absolute inset-0 mesh-layer opacity-70 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-14 text-center">
          <span className="glow-badge inline-block bg-leaf-700/30 border border-leaf-400/40 text-leaf-400 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-6">
            AgroNexus Premium
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-4">
            Unlock unlimited Advisory,<br className="hidden md:block" /> everything else stays free.
          </h1>
          <p className="text-cream/70 max-w-xl mx-auto leading-relaxed">
            The AI Farm Assistant and Weather tools are free forever for every farmer. Premium only removes
            the 5-search-per-10-hours limit on Crop Advisory, plus a few extra perks below.
          </p>
        </div>
      </section>

      {/* Current status */}
      {premium && (
        <div className="max-w-4xl mx-auto px-5 md:px-8 -mt-6 relative z-10">
          <div className="bg-leaf-50 border border-leaf/30 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div>
              <div className="text-sm font-semibold text-leaf-700">✅ Premium active — {premium.planName}</div>
              <div className="text-xs text-ink-600 mt-1">
                {premium.expiresAt
                  ? `Renews / expires on ${new Date(premium.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`
                  : 'Lifetime access — never expires'}
              </div>
            </div>
            <button
              onClick={cancelPremium}
              className="text-xs font-medium px-4 py-2 rounded-full border border-forest/20 text-ink-600 hover:bg-forest/5 transition-colors"
            >
              Cancel premium
            </button>
          </div>
        </div>
      )}

      {justActivated && (
        <div className="max-w-4xl mx-auto px-5 md:px-8 mt-6">
          <div className="bg-sun-100 border border-sun/40 rounded-2xl p-4 text-sm text-forest font-medium">
            🎉 Premium activated! Unlimited Advisory searches are unlocked now.
          </div>
        </div>
      )}

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PREMIUM_PLANS.map((plan) => {
            const isActive = premium?.planId === plan.id;
            const featured = plan.id === 'yearly';
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 flex flex-col border transition-all ${
                  featured
                    ? 'bg-forest text-cream border-leaf-400 shadow-xl scale-[1.03]'
                    : 'bg-cream-100 border-forest/10 hover:border-leaf hover:shadow-lg'
                }`}
              >
                {plan.tag && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                      featured ? 'bg-sun text-forest' : 'bg-leaf-700 text-cream'
                    }`}
                  >
                    {plan.tag}
                  </span>
                )}
                <h3 className={`font-display text-lg font-semibold mt-2 ${featured ? 'text-cream' : 'text-forest'}`}>
                  {plan.name}
                </h3>
                <div className="mt-3 mb-1">
                  <span className="font-mono text-3xl font-bold">₹{plan.price}</span>
                  {plan.days && <span className={`text-xs ${featured ? 'text-cream/60' : 'text-ink-600'}`}> /{plan.name.toLowerCase()}</span>}
                </div>
                <p className={`text-xs mb-6 ${featured ? 'text-cream/60' : 'text-ink-600'}`}>
                  {plan.days ? `Billed once, valid for ${plan.days} days` : 'One-time payment, forever'}
                </p>
                <button
                  onClick={() => setConfirmingPlan(plan)}
                  disabled={isActive}
                  className={`mt-auto w-full py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-cream/20 text-cream/60 cursor-default'
                      : featured
                        ? 'bg-sun text-forest hover:bg-sun/90'
                        : 'bg-leaf-700 text-cream hover:bg-forest'
                  }`}
                >
                  {isActive ? 'Current plan' : 'Choose plan'}
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-ink-600 mt-6">
          This is a demo checkout — it activates premium locally in your browser for testing. Connect a real
          gateway (Razorpay / UPI) in the backend to accept live payments.
        </p>
      </section>

      {/* Perks */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2 className="font-display text-3xl font-semibold mb-10 text-center">What you get</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map((p) => (
              <div key={p.title} className="bg-cream/5 border border-cream/10 rounded-2xl p-5">
                <div className="text-2xl mb-3">{p.emoji}</div>
                <h3 className="font-display font-semibold mb-1.5">{p.title}</h3>
                <p className="text-sm text-cream/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confirm modal */}
      {confirmingPlan && (
        <div className="fixed inset-0 z-[100] bg-forest-900/60 backdrop-blur-sm flex items-center justify-center px-5" onClick={() => setConfirmingPlan(null)}>
          <div className="bg-cream rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl font-semibold text-forest mb-2">Confirm {confirmingPlan.name}</h3>
            <p className="text-sm text-ink-600 mb-5">
              You're about to activate the <strong>{confirmingPlan.name}</strong> plan for{' '}
              <strong>₹{confirmingPlan.price}</strong>. This demo build skips real payment and unlocks premium
              immediately.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmingPlan(null)}
                className="flex-1 py-2.5 rounded-full border border-forest/20 text-ink-600 text-sm font-medium hover:bg-forest/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 rounded-full bg-leaf-700 text-cream text-sm font-semibold hover:bg-forest transition-colors"
              >
                Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
