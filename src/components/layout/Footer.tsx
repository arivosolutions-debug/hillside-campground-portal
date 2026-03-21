import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MessageCircle, ArrowRight } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/919847012345?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20Hills%20Camp%20Kerala%20retreat.';

const EXPLORE_LINKS = [
  { label: 'All Stays',              to: '/listings' },
  { label: 'About Hills Camp',       to: '/about' },
  { label: 'The Journal',            to: '/blog' },
  { label: 'Contact Us',             to: '/contact' },
];

const LOCATION_LINKS = [
  { label: 'Wayanad Reserve',       to: '/listings?district=wayanad' },
  { label: 'Munnar Estates',        to: '/listings?district=munnar' },
  { label: 'Alleppey Backwaters',   to: '/listings?district=alleppey' },
  { label: 'Idukki High Ranges',    to: '/listings?district=thekkady' },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-hc-primary-dark rounded-t-[32px]">
      <div className="max-w-content mx-auto px-8 md:px-12 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <Link to="/" className="font-headline text-emerald-50 text-3xl mb-6 block hover:opacity-80 transition-opacity">
            Hills Camp
          </Link>
          <p className="text-footer-link text-sm leading-relaxed mb-6">
            An editorial retreat experience nestled in the verdant peaks of Kerala's high ranges.
          </p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Instagram size={16} className="text-emerald-50" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Linkedin size={16} className="text-emerald-50" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <MessageCircle size={16} className="text-emerald-50" />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-headline text-emerald-50 text-sm uppercase tracking-wider mb-6">Explore</h4>
          <ul className="space-y-3">
            {EXPLORE_LINKS.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-footer-link hover:text-emerald-50 transition-colors text-sm font-body"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="font-headline text-emerald-50 text-sm uppercase tracking-wider mb-6">Locations</h4>
          <ul className="space-y-3">
            {LOCATION_LINKS.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-footer-link hover:text-emerald-50 transition-colors text-sm font-body"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect / Newsletter */}
        <div>
          <h4 className="font-headline text-emerald-50 text-sm uppercase tracking-wider mb-4">Journal</h4>
          <p className="text-footer-link text-sm mb-4 leading-relaxed">
            Join our seasonal mailing list for mountain stories.
          </p>
          <div className="flex gap-2 mb-6">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 bg-white/5 border-none rounded-xl px-4 py-3 text-sm text-emerald-50 placeholder:text-emerald-50/30 focus:outline-none focus:ring-1 focus:ring-emerald-50/20"
            />
            <button
              className="bg-white/10 text-emerald-50 px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={16} />
            </button>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-hc-accent text-[#783616] px-5 py-3 rounded-xl font-semibold text-sm hover:brightness-110 transition-all"
          >
            <MessageCircle size={16} />
            Contact via WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 mx-8 md:mx-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-footer-muted text-xs font-body">
          © {new Date().getFullYear()} Hills Camp Kerala. A Curated Wilderness Experience.
        </p>
        <div className="flex gap-6">
          <Link to="/about" className="text-footer-muted text-xs hover:text-emerald-50 transition-colors">Privacy Policy</Link>
          <Link to="/about" className="text-footer-muted text-xs hover:text-emerald-50 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
