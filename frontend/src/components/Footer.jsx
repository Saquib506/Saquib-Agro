import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-forest text-cream mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-2xl font-semibold mb-3">🌿 AgroNexus</div>
          <p className="text-cream/70 text-sm leading-relaxed">
            One platform for the entire crop lifecycle — grown for the modern Indian farmer.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3 text-sun">Platform</div>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link to="/marketplace" className="hover:text-cream">Marketplace</Link></li>
            <li><Link to="/advisory" className="hover:text-cream">AI Advisory</Link></li>
            <li><Link to="/weather" className="hover:text-cream">Weather</Link></li>
            <li><Link to="/experts" className="hover:text-cream">Expert Consultation</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3 text-sun">Community</div>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link to="/community" className="hover:text-cream">Forum</Link></li>
            <li><Link to="/schemes" className="hover:text-cream">Govt Schemes</Link></li>
            <li><Link to="/dashboard" className="hover:text-cream">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3 text-sun">Project</div>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>Internship Project</li>
            <li>Built with React + Node.js</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} AgroNexus. Growing smarter, together.
      </div>
    </footer>
  );
}
