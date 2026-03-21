import React from 'react';
import { SectionLabel } from '@/components/shared/SectionLabel';

export const ParallaxSection: React.FC = () => {
  return (
    <section className="relative py-0 overflow-hidden h-[65vh] min-h-[500px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=80"
          alt="Misty Western Ghats"
          className="w-full h-full object-cover brightness-50"
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/70" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
        <SectionLabel light className="mb-10 justify-center">The Western Ghats Promise</SectionLabel>
        <blockquote className="font-headline text-3xl md:text-5xl text-on-surface max-w-4xl leading-tight mb-8">
          <em>
            "The hills are not a backdrop to your stay.<br />
            They are the entire point of it."
          </em>
        </blockquote>
        <cite className="font-body text-sm text-on-surface-variant not-italic">
          — Ananya Krishnan, Founder
        </cite>
      </div>
    </section>
  );
};
