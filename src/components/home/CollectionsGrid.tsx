import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { HeritageBadge } from '@/components/shared/HeritageBadge';
import { MistOverlay } from '@/components/shared/MistOverlay';
import { useProperties } from '@/hooks/useProperties';

export const CollectionsGrid: React.FC = () => {
  const { data: properties, isLoading } = useProperties({ featured: true });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.grid-item');
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
      (item as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [properties]);

  const displayProperties = properties?.slice(0, 5) ?? [];

  return (
    <section ref={sectionRef} className="bg-background py-32">
      <div className="max-w-screen-2xl mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionLabel className="mb-6">Featured Collection</SectionLabel>
            <h2 className="font-headline text-4xl md:text-6xl text-on-surface leading-tight">
              Curated for the<br />
              <em>discerning few.</em>
            </h2>
          </div>
          <Link
            to="/stays"
            className="flex items-center gap-3 font-body text-sm font-bold text-secondary border-b-2 border-secondary/20 hover:border-secondary pb-1 transition-all duration-300 self-start md:self-end group"
          >
            All Properties
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`rounded-3xl bg-surface-high animate-pulse ${
                  i === 0 ? 'md:col-span-7 aspect-[4/3]'
                  : i === 1 ? 'md:col-span-5 aspect-[4/3]'
                  : 'md:col-span-4 aspect-[3/4]'
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {displayProperties.map((property, i) => {
              const spanClass = [
                'md:col-span-7 aspect-[4/3]',
                'md:col-span-5 aspect-[4/3]',
                'md:col-span-4 aspect-[3/4]',
                'md:col-span-4 aspect-[3/4]',
                'md:col-span-4 aspect-[3/4]',
              ][i] ?? 'md:col-span-4 aspect-square';

              return (
                <Link
                  key={property.id}
                  to={`/stays/${property.slug}`}
                  className={`grid-item group relative overflow-hidden rounded-3xl ${spanClass} block`}
                >
                  <img
                    src={property.cover_image ?? '/placeholder.svg'}
                    alt={property.name}
                    className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-1000 group-hover:scale-105"
                  />
                  <MistOverlay intensity="medium" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-7 flex flex-col justify-end">
                    <HeritageBadge type={property.property_type} className="mb-3 self-start" />
                    <h3 className="font-headline text-2xl text-on-surface leading-tight mb-1">
                      {property.name}
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      {property.tagline}
                    </p>
                    <div className="flex items-center gap-2 font-label text-[10px] text-on-surface-variant/70 tracking-widest">
                      <span>{property.district.charAt(0).toUpperCase() + property.district.slice(1)}</span>
                      <span>·</span>
                      <span>Up to {property.max_guests} guests</span>
                    </div>
                  </div>

                  {/* Price badge */}
                  {property.price_per_night && (
                    <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-sm text-on-surface border border-white/10 px-3 py-1.5 rounded-full">
                      <span className="font-label text-[10px] tracking-widest">FROM </span>
                      <span className="font-body font-bold text-sm text-secondary">
                        ₹{property.price_per_night.toLocaleString()}
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
