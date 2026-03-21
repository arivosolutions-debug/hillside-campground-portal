import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { MistOverlay } from '@/components/shared/MistOverlay';
import { SectionLabel } from '@/components/shared/SectionLabel';

export const HeroSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Ken Burns background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=2000&q=85"
          alt="Kerala Western Ghats wilderness"
          className="w-full h-full object-cover animate-kenburns origin-center"
        />
        <div className="absolute inset-0 bg-background/40" />
        <MistOverlay intensity="medium" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col justify-end max-w-screen-2xl mx-auto px-8 pb-24 md:pb-32">
        <div className="max-w-4xl">
          <SectionLabel light className="mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
            Kerala — Western Ghats
          </SectionLabel>

          <h1
            className="text-display text-on-surface font-headline leading-[0.95] mb-8 animate-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            Where Nature
            <br />
            <em className="text-secondary not-italic">Meets</em> Comfort.
          </h1>

          <p
            className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed mb-12 animate-fade-up"
            style={{ animationDelay: '600ms' }}
          >
            Luxury wilderness retreats woven into Kerala's ancient forests, 
            misty highlands, and sun-burnished backwaters.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: '800ms' }}
          >
            <Link
              to="/stays"
              className="font-body font-bold bg-secondary-container text-on-secondary-container px-10 py-5 rounded-full text-base transition-all duration-300 hover:brightness-110 active:scale-[0.97] border border-white/10"
            >
              Explore Stays
            </Link>
            <Link
              to="/journal"
              className="font-body font-semibold text-on-surface border border-white/20 backdrop-blur-md bg-white/5 px-10 py-5 rounded-full text-base transition-all duration-300 hover:bg-white/10 active:scale-[0.97]"
            >
              View Journal
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScroll}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors duration-300 group"
        aria-label="Scroll down"
      >
        <span className="font-label text-[9px] tracking-widest rotate-90 mb-1">SCROLL</span>
        <ArrowDown size={16} className="animate-bounce group-hover:text-secondary" />
      </button>

      {/* Invisible scroll target */}
      <div ref={scrollRef} className="absolute bottom-0" />
    </section>
  );
};
