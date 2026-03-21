import React, { useRef, useEffect } from 'react';
import { SectionLabel } from '@/components/shared/SectionLabel';

const STATS = [
  { value: '8',    label: 'Unique Retreats' },
  { value: '7',    label: 'Kerala Districts' },
  { value: '31+',  label: 'Years of Conservation' },
  { value: '100%', label: 'Locally Sourced Cuisine' },
];

export const PhilosophySection: React.FC = () => {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    [leftRef, rightRef].forEach((ref) => {
      if (ref.current) {
        ref.current.classList.add('section-fade-up');
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-surface-low py-32">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left: image stack */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80"
                alt="Kerala forest canopy"
                className="w-full h-full object-cover brightness-90"
              />
            </div>
            {/* Floating offset card */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 w-48 h-56 rounded-2xl overflow-hidden shadow-ambient">
              <img
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80"
                alt="Kerala backwaters"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: text + stats */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className="lg:col-span-7"
            style={{ transitionDelay: '150ms' }}
          >
            <SectionLabel className="mb-8">Our Philosophy</SectionLabel>

            <h2 className="font-headline text-4xl md:text-5xl text-on-surface leading-tight mb-8">
              Luxury and wildness<br />
              <em>are not opposites.</em>
            </h2>

            <p className="font-body text-on-surface-variant leading-relaxed mb-6 max-w-lg">
              Hills Camp was born from a simple conviction: that the most profound luxury is 
              not what you add to a landscape, but what you preserve within it. Every retreat 
              is designed to dissolve the boundary between shelter and wilderness.
            </p>

            <p className="font-body text-on-surface-variant leading-relaxed mb-12 max-w-lg">
              We work with local families, conservation biologists, and traditional craftspeople 
              to create stays that are acts of ecological stewardship — beautiful precisely 
              because they tread lightly.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="border-l-2 border-secondary/30 pl-4"
                  style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                >
                  <div className="font-headline text-3xl tabular-nums text-secondary font-bold leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="font-label text-[10px] text-on-surface-variant/60 tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
