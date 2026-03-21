import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    label: 'Tree Houses',
    title: 'Canopy Retreats',
    subtitle: 'Sleep 40 feet above the forest floor.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
    href: '/listings?type=tree_house',
    cols: 'lg:col-span-8',
    aspect: 'aspect-[16/9]',
  },
  {
    label: 'Backwater Villas',
    title: 'Floating Sanctuaries',
    subtitle: 'Drift through liquid mirrors of Kerala.',
    image: 'https://images.unsplash.com/photo-1605538032404-d4d84ad3abf8?w=800&q=80',
    href: '/listings?type=backwater_villa',
    cols: 'lg:col-span-4',
    aspect: 'aspect-[16/9]',
  },
  {
    label: 'Mountain Lookouts',
    title: 'High-Altitude Perches',
    subtitle: 'Wake above the cloud line.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    href: '/stays?type=mountain_lookout',
    cols: 'lg:col-span-4',
    aspect: 'aspect-[16/9]',
  },
  {
    label: 'Tea Estate Cabins',
    title: 'Planter\'s Legacy',
    subtitle: 'A century of stories steeped in your cup.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    href: '/stays?type=tea_estate_cabin',
    cols: 'lg:col-span-8',
    aspect: 'aspect-[16/9]',
  },
];

export const CollectionsGrid: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>('.collection-card');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.08 }
    );
    items.forEach((item, i) => {
      item.classList.add('section-fade-up');
      item.style.transitionDelay = `${i * 90}ms`;
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-hc-bg-alt py-32 px-8">
      <div className="max-w-content mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-hc-secondary" />
              <span className="font-label text-xs tracking-[0.4em] text-hc-secondary">Curated for you</span>
            </div>
            <h2 className="font-headline text-hc-primary text-4xl md:text-5xl leading-tight">
              The Collections
            </h2>
          </div>
          <Link
            to="/stays"
            className="flex items-center gap-2 text-hc-primary font-bold hover:gap-3 transition-all group shrink-0 text-sm"
          >
            View All Categories
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric 12-col grid — 2 rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.label}
              to={c.href}
              className={`collection-card group relative overflow-hidden rounded-3xl ${c.cols} ${c.aspect} block`}
            >
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-90 group-hover:scale-[1.04] transition-all duration-1000"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-hc-primary-dark/80 via-transparent to-transparent" />

              {/* Labels */}
              <div className="absolute inset-0 p-7 flex flex-col justify-end">
                <span className="inline-block bg-hc-bg/90 backdrop-blur-sm text-hc-primary text-xs font-bold uppercase tracking-tight px-3 py-1 rounded-full mb-3 self-start">
                  {c.label}
                </span>
                <h3 className="font-headline text-white text-2xl md:text-3xl leading-tight mb-1">
                  {c.title}
                </h3>
                {/* Hover reveal subtitle */}
                <p className="font-body text-sm text-white/70 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {c.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
