import React, { useEffect, useRef } from 'react';

const STATS = [
{ value: '12', label: 'Estates' },
{ value: '100%', label: 'Sustainable' },
{ value: '0', label: 'Compromises' }];


export const PhilosophySection: React.FC = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('in-view');}),
      { threshold: 0.12 }
    );
    [leftRef, rightRef].forEach((r) => {
      if (r.current) {r.current.classList.add('section-fade-up');observer.observe(r.current);}
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-hc-bg py-32 px-8">
      <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

        {/* Left — portrait image + floating quote card */}
        <div ref={leftRef} className="lg:col-span-5 relative">
          <div className="rounded-[40px] overflow-hidden aspect-[3/4]">
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80"
              alt="Kerala forest philosophy"
              className="w-full h-full object-cover" />
            
          </div>

          {/* Floating quote card — offset bottom-right */}
          <div className="absolute -bottom-8 -right-4 md:-right-8 bg-hc-primary rounded-[1.5rem] p-6 w-56 shadow-card-lg">
            <p className="font-headline text-white/90 text-base italic leading-snug mb-4">
              "Luxury is not what you add. It is what you choose to keep."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-px bg-hc-accent" />
              <span className="font-label text-[9px] text-hc-accent-light/70 tracking-widest">
                HILLS CAMP
              </span>
            </div>
          </div>
        </div>

        {/* Right — text + stats */}
        <div
          ref={rightRef}
          className="lg:col-span-7 text-left mx-[50px]"
          style={{ transitionDelay: '120ms' }}>
          
          {/* Section label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-hc-secondary" />
            <span className="font-label text-xs tracking-[0.4em] text-hc-secondary">Our Philosophy</span>
          </div>

          <h2 className="font-headline text-hc-primary text-4xl md:text-5xl leading-tight mb-6">
            Where <em className="text-hc-secondary not-italic">Luxury</em><br />
            meets the wild.
          </h2>

          <p className="text-hc-text text-lg leading-relaxed mb-4 max-w-lg">
            Hills Camp was born from a simple conviction: that the most profound luxury is not
            what you add to a landscape, but what you preserve within it. Every retreat is designed
            to dissolve the boundary between shelter and wilderness.
          </p>

          <p className="text-hc-text leading-relaxed mb-12 max-w-lg">
            We work with local families, conservation biologists, and traditional craftspeople
            to create stays that are acts of ecological stewardship — beautiful precisely because
            they tread lightly on this ancient land.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-12">
            {STATS.map((stat, i) =>
            <div key={stat.label} className="border-l-2 border-hc-secondary/30 pl-5">
                <div className="font-headline text-4xl tabular-nums text-hc-primary-deep font-bold leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-label text-[10px] text-hc-text-light tracking-widest">
                  {stat.label}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};