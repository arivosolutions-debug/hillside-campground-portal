import React, { useEffect, useRef } from 'react';

const STATS = [
  { value: '12', label: 'Estates' },
  { value: '100%', label: 'Sustainable' },
  { value: '0', label: 'Compromises' },
];

export const PhilosophySection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const content = section.querySelector<HTMLElement>('.philosophy-content');
    if (!content) return;
    content.classList.add('section-fade-up');
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) content.classList.add('in-view'); },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: '600px' }}>
      {/* Full-width background image */}
      <img
        src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=2000&q=80"
        alt="Kerala forest canopy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto px-8 py-32 philosophy-content">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-hc-accent" />
          <span className="font-label text-xs tracking-[0.4em] text-hc-accent-light">Our Philosophy</span>
        </div>

        <h2 className="font-headline text-white text-4xl md:text-6xl leading-tight mb-6 max-w-2xl">
          Where <em className="text-hc-accent-light not-italic">Luxury</em><br />
          meets the wild.
        </h2>

        <p className="text-white/80 text-lg leading-relaxed mb-4 max-w-xl">
          Hills Camp was born from a simple conviction: that the most profound luxury is not
          what you add to a landscape, but what you preserve within it. Every retreat is designed
          to dissolve the boundary between shelter and wilderness.
        </p>

        <p className="text-white/60 leading-relaxed mb-12 max-w-xl">
          We work with local families, conservation biologists, and traditional craftspeople
          to create stays that are acts of ecological stewardship — beautiful precisely because
          they tread lightly on this ancient land.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-l-2 border-hc-accent-light/40 pl-5">
              <div className="font-headline text-4xl tabular-nums text-white font-bold leading-none mb-1">
                {stat.value}
              </div>
              <div className="font-label text-[10px] text-white/50 tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
