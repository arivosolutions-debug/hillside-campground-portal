import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export const HeroSection: React.FC = () => {
  return (
    <header className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury balcony overlooking misty Kerala mountains"
          className="w-full h-full object-cover animate-kenburns origin-center" />
        
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-hc-bg" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto px-8 pt-32 w-full">
        <div className="max-w-3xl">
          {/* Headline */}
          <h1 className="font-headline text-white text-6xl md:text-8xl lg:text-[96px] leading-none mb-6 animate-fade-in-2 font-bold">
            Where Nature<br />Meets Comfort
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl leading-relaxed max-w-xl mb-10 animate-fade-in-3 text-primary">
            Experience the soul of Kerala through curated stays designed to vanish into the wilderness.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-in-4">
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 bg-hc-primary text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-hc-primary-deep transition-all active:scale-[0.97] group">
              Explore Properties
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 border bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-bold text-sm hover:bg-white/20 transition-all active:scale-[0.97] text-primary border-primary">
              View Journal
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <ChevronDown size={22} strokeWidth={1.5} />
      </div>
    </header>);

};