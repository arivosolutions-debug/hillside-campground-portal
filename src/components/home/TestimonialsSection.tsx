import React, { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: 'The Canopy at Vythiri converted me from a sceptic into a believer. I have stayed in luxury hotels on four continents. Nothing has come close to waking in a mist-shrouded treehouse with the forest alive around you.',
    name: 'Rohan Mehta',
    title: 'Architect, Mumbai',
    stayedAt: 'Canopy at Vythiri',
    initials: 'RM',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=200&q=80',
  },
  {
    quote: 'Meesapulimala is not a destination. It is a decision to stop rushing. The naturalist, the food, the silence — I left a different person and I say that without any irony.',
    name: 'Shreya Rao',
    title: 'Writer, Bangalore',
    stayedAt: 'Meesapulimala Lookout',
    initials: 'SR',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  },
];

export const TestimonialsSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>('.testimonial-card');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.1 }
    );
    items.forEach((item, i) => {
      item.classList.add('section-fade-up');
      item.style.transitionDelay = `${i * 150}ms`;
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <section ref={ref} className="relative py-16 md:py-32 px-5 md:px-8">
      {/* Mobile: mountain background */}
      <div className="md:hidden absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200&q=80"
          alt="Mountains"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 max-w-content mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-hc-secondary" />
          <span className="font-label text-xs tracking-[0.4em] text-hc-secondary">THE EXPERIENCE</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-16">
          <h2 className="font-headline text-3xl md:text-5xl leading-tight max-w-sm text-white md:text-hc-primary">
            Words from those<br /><em>who stayed.</em>
          </h2>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 gap-10">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card group bg-white rounded-[2rem] p-10 flex flex-col shadow-card">
              <div className="h-0.5 w-10 group-hover:w-20 bg-hc-secondary mb-8 transition-all duration-500 ease-out" />
              <Quote size={36} className="text-hc-secondary/20 mb-4 group-hover:text-hc-secondary/40 transition-colors duration-500" />
              <blockquote className="font-headline text-hc-primary text-xl italic leading-relaxed mb-10 flex-1">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div>
                  <div className="font-body font-bold text-hc-primary text-sm">{t.name}</div>
                  <div className="font-body text-xs text-hc-text-light">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden -mr-5">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="min-w-[85vw] snap-start" style={{ scrollSnapStop: 'always' }}>
                <div className="testimonial-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 relative">
                  {/* Avatar peeking from top-right */}
                  <img
                    src={t.image}
                    alt={t.name}
                    className="absolute -top-4 right-4 w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                  <Quote size={28} className="text-hc-secondary/30 mb-3" />
                  <blockquote className="font-headline text-hc-primary text-lg italic leading-relaxed mb-6">
                    "{t.quote}"
                  </blockquote>
                  <div className="font-body font-bold text-hc-primary text-sm">{t.name}</div>
                  <div className="font-body text-xs text-hc-secondary">stayed at {t.stayedAt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
