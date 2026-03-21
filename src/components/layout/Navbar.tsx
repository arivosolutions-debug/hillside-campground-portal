import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Stays',     href: '/stays' },
  { label: 'Journal',   href: '/journal' },
  { label: 'About',     href: '/about' },
  { label: 'Contact',   href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 py-4'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-headline text-xl text-on-surface tracking-tight">
              Hills Camp
            </span>
            <span className="font-label text-[9px] tracking-[0.5em] text-secondary mt-0.5">
              KERALA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const active = location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-label text-xs tracking-[0.3em] uppercase transition-colors duration-300 ${
                    active ? 'text-secondary' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className="font-body font-bold text-sm bg-secondary-container text-on-secondary-container px-6 py-2.5 rounded-full transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
            >
              Enquire
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-on-surface p-2 rounded-full bg-white/10 backdrop-blur-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-background/90 backdrop-blur-2xl"
          onClick={() => setMenuOpen(false)}
        />
        <nav className="absolute top-24 left-8 right-8 flex flex-col gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-headline text-4xl text-on-surface hover:text-secondary transition-colors duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="font-body font-bold text-base bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full text-center mt-4 active:scale-[0.97]"
          >
            Enquire Now
          </Link>
        </nav>
      </div>
    </>
  );
};
