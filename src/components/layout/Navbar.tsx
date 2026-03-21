import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Stays',       href: '/stays' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Discover',    href: '/about' },
  { label: 'Journal',     href: '/journal' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-hc-bg/90 backdrop-blur-xl shadow-float py-4'
            : 'bg-hc-bg/70 backdrop-blur-sm py-5'
        }`}
      >
        <div className="flex justify-between items-center max-w-content mx-auto px-8">
          {/* Logo */}
          <Link to="/" className="font-headline text-hc-primary-deep text-2xl tracking-tight leading-none">
            Hills Camp
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-10 items-center">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href ||
                (link.href === '/stays' && location.pathname.startsWith('/stays'));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-body text-sm transition-colors duration-200 ${
                    isActive
                      ? 'text-hc-primary-deep font-bold border-b-2 border-hc-primary-deep pb-0.5'
                      : 'text-hc-primary-deep/70 font-medium hover:text-hc-primary-deep'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <button
              className="text-hc-primary-deep hidden md:block hover:text-hc-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
            <Link
              to="/contact"
              className="bg-hc-secondary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all active:scale-[0.97]"
            >
              Book Now
            </Link>
            {/* Mobile toggle */}
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
        className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
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
              key={link.href}
              to={link.href}
              className="font-headline text-3xl text-hc-primary-deep hover:text-hc-secondary transition-colors duration-300"
              style={{ transitionDelay: `${i * 55}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-hc-secondary text-white px-8 py-4 rounded-xl font-bold text-base text-center mt-2 active:scale-[0.97] transition-transform"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </>
  );
};
