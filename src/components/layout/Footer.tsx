import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';

const EXPLORE_LINKS = [
  { label: 'Sustainability Charter', href: '#' },
  { label: 'Privacy Policy',         href: '#' },
  { label: 'Terms of Service',       href: '#' },
  { label: 'Join the Community',     href: '#' },
];

const LOCATION_LINKS = [
  { label: 'Wayanad Reserve',     href: '/stays?district=wayanad' },
  { label: 'Munnar Estates',      href: '/stays?district=munnar' },
  { label: 'Alleppey Backwaters', href: '/stays?district=alleppey' },
  { label: 'Idukki High Ranges',  href: '/stays?district=thekkady' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-hc-primary-dark rounded-t-[32px]">
      {/* Main grid */}
      <div className="max-w-content mx-auto px-12 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="font-headline text-emerald-50 text-3xl mb-6">Hills Camp</div>
          <p className="text-footer-link text-sm leading-relaxed mb-6">
            Crafting exclusive wilderness experiences across the emerald landscapes of Kerala since 2018.
          </p>
          <div className="flex gap-4">
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
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-headline text-emerald-50 text-lg mb-6">Explore</h4>
          <ul className="space-y-4">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-footer-link hover:text-emerald-50 transition-colors text-sm font-body"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="font-headline text-emerald-50 text-lg mb-6">Locations</h4>
          <ul className="space-y-4">
            {LOCATION_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-footer-link hover:text-emerald-50 transition-colors text-sm font-body"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-headline text-emerald-50 text-lg mb-4">Connect</h4>
          <p className="text-footer-link text-sm mb-4">
            Have questions or want to plan a custom itinerary?
          </p>
          <a
            href="https://wa.me/919847012345"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-hc-accent text-[#783616] px-6 py-4 rounded-xl font-semibold flex items-center gap-3 hover:brightness-110 transition-all mb-6 w-fit"
          >
            <MessageCircle size={18} />
            Contact via WhatsApp
          </a>
          <div className="border-t border-hc-primary-deep/50 pt-4 space-y-1">
            <p className="text-footer-muted text-xs font-body">Email: travel@hillscampkerala.com</p>
            <p className="text-footer-muted text-xs font-body">Phone: +91 98470 12345</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-hc-primary-deep/50 mx-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-footer-muted text-xs font-body">
          © {new Date().getFullYear()} Hills Camp Kerala. All rights reserved.
        </p>
        <div className="flex gap-8 text-footer-muted text-xs font-label">
          <a href="#" className="hover:text-emerald-50 transition-colors">Heritage</a>
          <a href="#" className="hover:text-emerald-50 transition-colors">Wildlife</a>
          <a href="#" className="hover:text-emerald-50 transition-colors">Wellness</a>
        </div>
      </div>
    </footer>
  );
};
