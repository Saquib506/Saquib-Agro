import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

const LINKS = [
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/weather', label: 'Weather' },
  { to: '/advisory', label: 'Advisory' },
  { to: '/disease-detection', label: 'Disease Check' },
  { to: '/community', label: 'Community' },
  { to: '/experts', label: 'Experts' },
  { to: '/schemes', label: 'Schemes' },
];

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative shrink-0">
      <button onClick={() => setOpen((o) => !o)} aria-label="Change language"
        className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full border border-cream/20 text-cream/80 hover:bg-cream/10 transition-colors whitespace-nowrap">
        <span aria-hidden="true">🌐</span><span>{current.label}</span><span className="text-[10px] opacity-70">▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-cream rounded-xl shadow-2xl border border-forest/10 py-1.5 z-50 overflow-hidden">
            {LANGUAGES.map((l) => (
              <button key={l.code} onClick={() => { setLanguage(l.code); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-leaf-50 transition-colors ${l.code === language ? 'text-leaf-700 font-semibold' : 'text-ink-600'}`}>
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function MobileLanguagePicker({ onPick }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-cream/50 mb-2">🌐 Language</p>
      <div className="grid grid-cols-2 gap-2">
        {LANGUAGES.map((l) => (
          <button key={l.code} onClick={() => { setLanguage(l.code); onPick(); }}
            className={`text-sm px-3 py-2 rounded-xl border transition-colors ${l.code === language ? 'bg-leaf-700 border-leaf-700 text-cream' : 'border-cream/20 text-cream/70'}`}>
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-forest/95 backdrop-blur-md border-b border-leaf-700/40 shadow-lg shadow-forest-900/20">
      <nav className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-semibold text-cream shrink-0">
          <span className="text-leaf-400 glow-badge">🌿</span> AgroNexus
        </Link>

        <div className="hidden xl:flex flex-1 min-w-0 items-center justify-center">
          <div className="flex items-center gap-1 rounded-2xl bg-cream/5 border border-cream/10 p-1 max-w-full overflow-x-auto scrollbar-hide">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) => `shrink-0 whitespace-nowrap px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${isActive ? 'bg-leaf-700 text-cream' : 'text-cream/70 hover:bg-cream/10 hover:text-cream'}`}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-2 shrink-0">
          <Link to="/premium" className="text-sm font-semibold px-3.5 py-2 rounded-full bg-gradient-to-r from-sun to-sun-100 text-forest hover:scale-105 transition-all shadow-md shadow-sun/30 whitespace-nowrap">✨ Premium</Link>
          <LanguageSwitcher />
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-semibold text-leaf-400 hover:underline whitespace-nowrap">Hi, {user.name.split(' ')[0]}</Link>
              <button onClick={() => { logout(); navigate('/'); }} className="text-sm font-medium px-3.5 py-2 rounded-full border border-cream/20 text-cream/80 hover:bg-cream/10 transition-colors whitespace-nowrap">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium px-3.5 py-2 rounded-full text-cream/80 hover:bg-cream/10 transition-colors whitespace-nowrap">Log in</Link>
              <Link to="/signup" className="text-sm font-semibold px-3.5 py-2 rounded-full bg-leaf-700 text-cream hover:bg-leaf-600 transition-all shadow-md shadow-leaf-700/30 whitespace-nowrap">Get started</Link>
            </>
          )}
        </div>

        <div className="xl:hidden ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <button className="w-11 h-11 rounded-xl border border-cream/15 text-cream text-xl flex items-center justify-center hover:bg-cream/10"
            onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? '✕' : '☰'}</button>
        </div>
      </nav>

      {open && (
        <div className="xl:hidden absolute left-0 right-0 top-[72px] bg-forest-900/98 backdrop-blur-xl border-t border-cream/10 shadow-2xl">
          <div className="max-w-2xl mx-auto p-5 space-y-3 max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LINKS.map(l => (
                <Link key={l.to} to={l.to} onClick={close}
                  className="rounded-xl border border-cream/10 bg-cream/5 px-3 py-3 text-sm text-cream/85 hover:bg-leaf-700 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="h-px bg-cream/10" />
            <Link to="/premium" onClick={close} className="block rounded-xl bg-sun text-forest px-4 py-3 font-semibold">✨ Premium</Link>
            <MobileLanguagePicker onPick={close} />
            <div className="h-px bg-cream/10" />
            {user ? (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/dashboard" onClick={close} className="rounded-xl bg-leaf-700 text-cream px-4 py-3 font-semibold">Dashboard</Link>
                <button onClick={() => { logout(); close(); navigate('/'); }} className="rounded-xl border border-cream/10 text-cream/80 px-4 py-3 text-left">Log out</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={close} className="rounded-xl border border-cream/10 text-cream/80 px-4 py-3">Log in</Link>
                <Link to="/signup" onClick={close} className="rounded-xl bg-leaf-700 text-cream px-4 py-3 font-semibold">Get started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
