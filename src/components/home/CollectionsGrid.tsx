import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/* ── Row 1: 8-col wide + 4-col tall  ──────────────────────────────── */
const ROW_1 = [
  {
    label: 'Tree Houses',
    title: 'Canopy Retreats',
    subtitle: 'Sleep 40 feet above the forest floor.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=85',
    href: '/listings?type=tree_house',
    cols: 'lg:col-span-8',
    aspect: 'aspect-[16/9]',
  },
  {
    label: 'Backwater Villas',
    title: 'Floating Sanctuaries',
    subtitle: 'Drift through liquid mirrors of Kerala.',
    image: 'https://images.unsplash.com/photo-1587922546307-776227941871?w=900&q=85',
    href: '/listings?type=backwater_villa',
    cols: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
  },
];

/* ── Row 2: 4-col tall + 8-col wide  ──────────────────────────────── */
const ROW_2 = [
  {
    label: 'Mountain Lookouts',
    title: 'High-Altitude Perches',
    subtitle: 'Wake above the cloud line.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=900&q=85',
    href: '/listings?type=mountain_lookout',
    cols: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
  },
  {
    label: 'Tea Estate Cabins',
    title: "Planter's Legacy",
    subtitle: 'A century of stories steeped in your cup.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1400&q=85',
    href: '/listings?type=tea_estate_cabin',
    cols: 'lg:col-span-8',
    aspect: 'aspect-[16/9]',
  },
];

interface CollectionCardProps {
  label: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  cols: string;
  aspect: string;
  index: number;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  label, title, subtitle, image, href, cols, aspect, index,
}) => (
  <Link
    to={href}
    className={`collection-card group relative overflow-hidden rounded-3xl ${cols} ${aspect} block`}
    style={{ transitionDelay: `${index * 90}ms` }}
  >
    {/* Full-bleed image */}
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-90 group-hover:scale-[1.04] transition-all duration-1000"
    />

    {/* Gradient overlay — bottom to top */}
    <div className="absolute inset-0 bg-gradient-to-t from-hc-primary-dark/85 via-hc-primary-dark/20 to-transparent" />

    {/* Labels */}
    <div className="absolute inset-0 p-7 flex flex-col justify-end">
      <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 self-start font-label border border-white/20">
        {label}
      </span>
      <h3 className="font-headline text-white text-2xl md:text-3xl leading-tight mb-1">
        {title}
      </h3>
      {/* Hover reveal subtitle */}
      <p className="font-body text-sm text-white/80 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        {subtitle}
      </p>
    </div>
  </Link>
);

export const CollectionsGrid: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>('.collection-card');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.06 }
    );
    items.forEach(item => {
      item.classList.add('section-fade-up');
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-surface-low py-32 px-8">
      <div className="max-w-content mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-hc-secondary" />
              <span className="font-label text-xs tracking-[0.4em] text-hc-secondary uppercase">Curated for you</span>
            </div>
            <h2 className="font-headline text-hc-primary text-4xl md:text-5xl leading-tight">
              The Collections
            </h2>
          </div>
          <Link
            to="/listings"
            className="flex items-center gap-2 text-hc-primary font-bold hover:gap-3 transition-all group shrink-0 text-sm font-body"
          >
            View All Categories
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Row 1 — Tree Houses (8-col wide) + Backwater Villas (4-col tall) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          {ROW_1.map((c, i) => (
            <CollectionCard key={c.label} {...c} index={i} />
          ))}
        </div>

        {/* Row 2 — Mountain Lookouts (4-col tall) + Tea Estate Cabins (8-col wide) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {ROW_2.map((c, i) => (
            <CollectionCard key={c.label} {...c} index={i + 2} />
          ))}
        </div>

      </div>
    </section>
  );
};
