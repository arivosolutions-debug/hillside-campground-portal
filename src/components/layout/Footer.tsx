import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';

const STAYS_LINKS = [
  { label: 'Tree Houses',       href: '/stays?type=tree_house' },
  { label: 'Backwater Villas',  href: '/stays?type=backwater_villa' },
  { label: 'Mountain Lookouts', href: '/stays?type=mountain_lookout' },
  { label: 'Heritage Bungalows',href: '/stays?type=heritage_bungalow' },
  { label: 'All Properties',    href: '/stays' },
];

const EXPLORE_LINKS = [
  { label: 'Wayanad',   href: '/stays?district=wayanad' },
  { label: 'Munnar',    href: '/stays?district=munnar' },
  { label: 'Alleppey',  href: '/stays?district=alleppey' },
  { label: 'Thekkady',  href: '/stays?district=thekkady' },
  { label: 'Kannur',    href: '/stays?district=kannur' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-low border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-screen-2xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex flex-col leading-none mb-6">
              <span className="font-headline text-2xl text-on-surface">Hills Camp</span>
              <span className="font-label text-[9px] tracking-[0.5em] text-secondary mt-1">KERALA</span>
            </Link>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-8 max-w-xs">
              Luxury wilderness retreats woven into the fabric of Kerala's Western Ghats. 
              Where nature meets comfort.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-surface-high text-on-surface-variant hover:text-secondary hover:bg-surface-highest transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-surface-high text-on-surface-variant hover:text-secondary hover:bg-surface-highest transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="mailto:hello@hillscamp.in"
                className="p-2.5 rounded-full bg-surface-high text-on-surface-variant hover:text-secondary hover:bg-surface-highest transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Stays */}
          <div>
            <SectionLabel className="mb-6">Our Stays</SectionLabel>
            <ul className="space-y-3">
              {STAYS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <SectionLabel className="mb-6">By District</SectionLabel>
            <ul className="space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <SectionLabel className="mb-6">Contact</SectionLabel>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-secondary mt-1 shrink-0" />
                <span className="font-body text-sm text-on-surface-variant leading-relaxed">
                  Vythiri, Wayanad District,<br />Kerala 673 576
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-secondary shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-secondary shrink-0" />
                <a
                  href="mailto:hello@hillscamp.in"
                  className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors"
                >
                  hello@hillscamp.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-on-surface-variant">
            © {new Date().getFullYear()} Hills Camp Kerala. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="font-body text-xs text-on-surface-variant hover:text-on-surface transition-colors">About</Link>
            <Link to="/journal" className="font-body text-xs text-on-surface-variant hover:text-on-surface transition-colors">Journal</Link>
            <Link to="/contact" className="font-body text-xs text-on-surface-variant hover:text-on-surface transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
