import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: 'The Canopy at Vythiri converted me from a sceptic into a believer. I have stayed in luxury hotels on four continents. Nothing has come close to waking in a mist-shrouded treehouse with the forest alive around you.',
    name: 'Rohan Mehta',
    title: 'Architect, Mumbai',
    initials: 'RM',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=200&q=80',
  },
  {
    quote: 'Meesapulimala is not a destination. It is a decision to stop rushing. The naturalist, the food, the silence — I left a different person and I say that without any irony.',
    name: 'Shreya Rao',
    title: 'Writer, Bangalore',
    initials: 'SR',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  },
];

export const TestimonialsSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

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

  return (
    <section ref={ref} className="bg-hc-bg-alt py-32 px-8">
      <div className="max-w-content mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-hc-secondary" />
          <span className="font-label text-xs tracking-[0.4em] text-hc-secondary">THE EXPERIENCE</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <h2 className="font-headline text-hc-primary text-4xl md:text-5xl leading-tight max-w-sm">
            Words from those<br /><em>who stayed.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card group bg-white rounded-[2rem] p-10 flex flex-col shadow-card">
              {/* Accent line that expands on hover */}
              <div className="h-0.5 w-10 group-hover:w-20 bg-hc-secondary mb-8 transition-all duration-500 ease-out" />

              {/* Large quote icon */}
              <Quote
                size={36}
                className="text-hc-secondary/20 mb-4 group-hover:text-hc-secondary/40 transition-colors duration-500"
              />

              {/* Quote */}
              <blockquote className="font-headline text-hc-primary text-xl italic leading-relaxed mb-10 flex-1">
                "{t.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div>
                  <div className="font-body font-bold text-hc-primary text-sm">{t.name}</div>
                  <div className="font-body text-xs text-hc-text-light">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
