import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/919847012345?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20Hills%20Camp%20Kerala%20retreat.';

const NAV_LINKS = [
  { label: 'Stays',        to: '/listings' },
  { label: 'Experiences',  to: '/listings?type=tree_house' },
  { label: 'Discover',     to: '/about' },
  { label: 'Journal',      to: '/blog' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = (to: string) => {
    if (to === '/listings') return location.pathname === '/listings' || location.pathname.startsWith('/property');
    if (to.includes('?')) return false; // query-link, never highlight as active
    return location.pathname === to || location.pathname.startsWith(to);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-hc-bg/90 backdrop-blur-xl shadow-float'
            : 'bg-hc-bg/70 backdrop-blur-md'
        }`}
      >
        <div className="flex justify-between items-center max-w-content mx-auto px-8 py-6">
          {/* Logo */}
          <Link to="/" className="font-headline italic text-hc-primary-deep text-2xl tracking-tight">
            Hills Camp
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-10 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body text-sm transition-colors duration-200 ${
                  isActive(link.to)
                    ? 'text-hc-primary-deep font-bold border-b-2 border-hc-secondary pb-0.5'
                    : 'text-hc-primary-deep/70 font-medium hover:text-hc-primary-deep'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <button
              className="text-hc-primary-deep hidden md:block hover:text-hc-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
            {/* "Book Now" → WhatsApp primary CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-hc-secondary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all active:scale-[0.97]"
            >
              <MessageCircle size={15} />
              Book Now
            </a>
            <button
              className="md:hidden text-hc-primary-deep p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-hc-bg/95 backdrop-blur-2xl"
          onClick={() => setMenuOpen(false)}
        />
        <nav className="absolute top-24 left-8 right-8 flex flex-col gap-7">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ transitionDelay: `${i * 55}ms` }}
              className="font-headline text-3xl text-hc-primary-deep hover:text-hc-secondary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-hc-secondary text-white px-8 py-4 rounded-xl font-bold text-base mt-2"
          >
            <MessageCircle size={18} />
            Book Now via WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
};
