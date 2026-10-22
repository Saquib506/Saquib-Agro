import { createContext, useContext, useState, useCallback, useEffect } from 'react';

// AI Assistant and Weather are ALWAYS free — no limits, no premium gate.
// Only the Advisory (crop recommendation) engine is rate-limited for free users:
// 5 searches per rolling 10-hour window. Premium removes this limit entirely.
export const ADVISORY_FREE_LIMIT = 5;
export const ADVISORY_WINDOW_MS = 10 * 60 * 60 * 1000; // 10 hours

// Pricing plans — adjust anytime, this is the only place plan pricing lives.
export const PREMIUM_PLANS = [
  { id: 'monthly', name: '1 Month', price: 79, days: 30, tag: null },
  { id: 'quarterly', name: '3 Months', price: 199, days: 90, tag: 'Save 16%' },
  { id: 'half_yearly', name: '6 Months', price: 349, days: 182, tag: 'Save 27%' },
  { id: 'yearly', name: '1 Year', price: 500, days: 365, tag: 'Most popular' },
  { id: 'lifetime', name: 'Lifetime', price: 1499, days: null, tag: 'Best value' },
];

const PREMIUM_KEY = 'agronexus_premium';
const SEARCH_KEY = 'agronexus_advisory_searches';

function readPremium() {
  try {
    const raw = JSON.parse(localStorage.getItem(PREMIUM_KEY) || 'null');
    if (!raw) return null;
    if (raw.expiresAt && Date.now() > raw.expiresAt) return null; // expired
    return raw;
  } catch {
    return null;
  }
}

function readSearches() {
  try {
    const raw = JSON.parse(localStorage.getItem(SEARCH_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

const PremiumContext = createContext(null);

export function PremiumProvider({ children }) {
  const [premium, setPremium] = useState(readPremium);
  const [searches, setSearches] = useState(readSearches);

  // Re-check expiry periodically so UI updates once a plan lapses.
  useEffect(() => {
    const id = setInterval(() => setPremium(readPremium()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const activatePlan = useCallback((planId) => {
    const plan = PREMIUM_PLANS.find((p) => p.id === planId);
    if (!plan) return;
    const record = {
      planId: plan.id,
      planName: plan.name,
      startedAt: Date.now(),
      expiresAt: plan.days ? Date.now() + plan.days * 24 * 60 * 60 * 1000 : null,
    };
    localStorage.setItem(PREMIUM_KEY, JSON.stringify(record));
    setPremium(record);
  }, []);

  const cancelPremium = useCallback(() => {
    localStorage.removeItem(PREMIUM_KEY);
    setPremium(null);
  }, []);

  // Returns { allowed, remaining, resetAt }. Also records a search if allowed.
  const useAdvisorySearch = useCallback(() => {
    if (readPremium()) {
      return { allowed: true, remaining: Infinity, resetAt: null };
    }
    const now = Date.now();
    const recent = readSearches().filter((t) => now - t < ADVISORY_WINDOW_MS);

    if (recent.length >= ADVISORY_FREE_LIMIT) {
      const resetAt = recent[0] + ADVISORY_WINDOW_MS;
      setSearches(recent);
      return { allowed: false, remaining: 0, resetAt };
    }

    const updated = [...recent, now];
    localStorage.setItem(SEARCH_KEY, JSON.stringify(updated));
    setSearches(updated);
    return { allowed: true, remaining: ADVISORY_FREE_LIMIT - updated.length, resetAt: null };
  }, []);

  const getAdvisoryStatus = useCallback(() => {
    if (premium) return { remaining: Infinity, resetAt: null, limited: false };
    const now = Date.now();
    const recent = readSearches().filter((t) => now - t < ADVISORY_WINDOW_MS);
    const remaining = Math.max(0, ADVISORY_FREE_LIMIT - recent.length);
    const resetAt = recent.length > 0 ? recent[0] + ADVISORY_WINDOW_MS : null;
    return { remaining, resetAt, limited: true };
  }, [premium]);

  return (
    <PremiumContext.Provider
      value={{ premium, activatePlan, cancelPremium, useAdvisorySearch, getAdvisoryStatus }}
    >
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const ctx = useContext(PremiumContext);
  if (!ctx) throw new Error('usePremium must be used within PremiumProvider');
  return ctx;
}
