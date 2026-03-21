import React, { useEffect, useRef } from 'react';
import { Trees, Leaf, Sparkles } from 'lucide-react';

const PILLARS = [
  {
    icon: Trees,
    iconBg: 'bg-hc-green-light',
    iconColor: 'text-hc-primary',
    title: 'Curated Wilderness',
    body: 'Each location is handpicked for its unique dialogue with nature, ensuring total seclusion and intimacy.',
  },
  {
    icon: Leaf,
    iconBg: 'bg-hc-accent-light',
    iconColor: 'text-hc-secondary',
    title: 'Sustainable Impact',
    body: 'Our camps are built with local materials and zero-waste policies, preserving the Kerala we love.',
  },
  {
    icon: Sparkles,
    iconBg: 'bg-hc-moss',
    iconColor: 'text-hc-primary',
    title: 'Authentic Luxury',
    body: "Experience luxury that doesn't scream; it whispers through fine linens, local cuisine, and refined service.",
  },
];

export const TrustStrip: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>('.trust-item');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.15 }
    );
    items.forEach((item, i) => {
      item.classList.add('section-fade-up');
      item.style.transitionDelay = `${i * 120}ms`;
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-hc-bg-alt px-8 py-20">
      <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        {PILLARS.map(({ icon: Icon, iconBg, iconColor, title, body }) => (
          <div key={title} className="trust-item">
            <div className={`${iconBg} w-12 h-12 rounded-full flex items-center justify-center mb-5`}>
              <Icon size={20} className={iconColor} strokeWidth={1.5} />
            </div>
            <h3 className="font-headline text-hc-primary text-2xl mb-4">{title}</h3>
            <p className="text-hc-text leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
