import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Wifi, Waves, Flame } from 'lucide-react';
import { useProperties } from '@/hooks/useProperties';

const FALLBACK_CARDS = [
  {
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    badge: 'Treehouse',
    district: 'Wayanad',
    name: 'Canopy at Vythiri',
    guests: '2 Guests',
    amenity: 'Jungle Canopy',
    slug: 'canopy-vythiri',
  },
  {
    image: 'https://images.unsplash.com/photo-1587922546307-776227941871?w=800&q=80',
    badge: 'Houseboat',
    district: 'Alleppey',
    name: 'Kettuvallam on the Backwaters',
    guests: '4 Guests',
    amenity: 'Private Deck',
    slug: 'kettuvallam-alleppey',
  },
  {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    badge: 'Tea Estate',
    district: 'Munnar',
    name: 'Silver Oak Estate',
    guests: '2 Guests',
    amenity: 'Tea Plantation',
    slug: 'silver-oak-munnar',
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    badge: 'Heritage',
    district: 'Kannur',
    name: 'Pallikkunnu Bungalow',
    guests: '6 Guests',
    amenity: 'Heritage Grounds',
    slug: 'pallikkunnu-kannur',
  },
];

export const FeaturedRetreats: React.FC = () => {
  const { data: properties } = useProperties({ featured: true });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>('.retreat-card');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.08 }
    );
    items.forEach((item, i) => {
      item.classList.add('section-fade-up');
      item.style.transitionDelay = `${i * 80}ms`;
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, [properties]);

  const cards =
    properties && properties.length > 0
      ? properties.slice(0, 4).map(p => ({
          image: p.cover_image ?? '/placeholder.svg',
          badge: p.property_type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          district: p.district.charAt(0).toUpperCase() + p.district.slice(1),
          name: p.name,
          guests: `${p.max_guests} Guests`,
          amenity: p.highlights?.[0] ?? 'Luxury Stay',
          slug: p.slug,
        }))
      : FALLBACK_CARDS;

  return (
    <section ref={ref} className="bg-hc-bg py-32 px-8">
      <div className="max-w-content mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <h2 className="font-headline text-hc-primary text-4xl md:text-5xl mb-4">
              Our Featured Retreats
            </h2>
            <p className="text-hc-text text-lg max-w-xl">
              From the heights of Wayanad to the tranquil backwaters, find your perfect escape.
            </p>
          </div>
          <Link
            to="/listings"
            className="text-hc-primary font-bold flex items-center gap-2 hover:gap-3 transition-all group shrink-0"
          >
            Explore all stays
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => (
            <Link
              key={card.slug}
              to={`/property/${card.slug}`}
              className="retreat-card bg-white rounded-2xl overflow-hidden card-hover group block"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-[350px] object-cover"
                />
                <span className="absolute top-3 left-4 bg-hc-bg/90 backdrop-blur-sm text-hc-primary text-xs font-bold uppercase tracking-tight px-3 py-1 rounded-full">
                  {card.badge}
                </span>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-hc-secondary text-sm font-bold uppercase tracking-wider mb-1">
                  {card.district}
                </p>
                <h3 className="font-headline text-hc-primary text-xl mb-3 group-hover:text-hc-secondary transition-colors duration-200">
                  {card.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-hc-text mb-4">
                  <span className="flex items-center gap-1">
                    <Users size={14} strokeWidth={1.75} />
                    {card.guests}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wifi size={14} strokeWidth={1.75} />
                    {card.amenity}
                  </span>
                </div>
                <div className="border-t border-hc-text-light/10 pt-4 flex items-center justify-between">
                  <span className="text-hc-primary font-bold tracking-tight text-sm">
                    Contact for Pricing
                  </span>
                  <ArrowRight size={14} className="text-hc-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
