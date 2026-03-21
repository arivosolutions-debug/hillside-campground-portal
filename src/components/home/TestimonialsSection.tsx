import React, { useRef, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';

const TESTIMONIALS = [
  {
    quote: 'The Canopy at Vythiri converted me from a sceptic into a believer. I have stayed in luxury hotels on four continents. Nothing has come close to waking in a mist-shrouded treehouse at 6am with the forest alive around you.',
    name:   'Rohan Mehta',
    title:  'Architect, Mumbai',
    avatar: 'RM',
  },
  {
    quote: 'Meesapulimala is not a destination. It is a decision to stop rushing. The naturalist, the food, the silence — I left a different person and I say that without any irony.',
    name:   'Shreya Rao',
    title:  'Writer, Bangalore',
    avatar: 'SR',
  },
  {
    quote: 'We spent our anniversary at Pallikkunnu Heritage Bungalow and were looked after with a warmth and intelligence that is simply absent from most luxury hospitality. Hills Camp understands what guests actually need.',
    name:   'Arjun & Priya Nair',
    title:  'Founders, Kochi',
    avatar: 'AP',
  },
];

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.testimonial-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item, i) => {
      item.classList.add('section-fade-up');
      (item as HTMLElement).style.transitionDelay = `${i * 120}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface-low py-32">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionLabel className="mb-6">From Our Guests</SectionLabel>
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface leading-tight">
              Words from those<br />
              <em>who stayed.</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="testimonial-item bg-surface-high rounded-3xl p-8 md:p-10 flex flex-col group"
            >
              {/* Quote icon */}
              <Quote
                size={28}
                className="text-secondary/30 mb-6 group-hover:text-secondary/60 transition-colors duration-500"
              />

              {/* Quote text */}
              <blockquote className="font-headline text-lg text-on-surface leading-relaxed italic mb-8 flex-1">
                "{t.quote}"
              </blockquote>

              {/* Divider that grows on hover */}
              <div className="h-px w-16 group-hover:w-24 bg-secondary/40 group-hover:bg-secondary transition-all duration-500 mb-6" />

              {/* Attribution */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label text-xs font-bold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-body font-semibold text-sm text-on-surface">{t.name}</div>
                  <div className="font-body text-xs text-on-surface-variant">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
