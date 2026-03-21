import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin } from 'lucide-react';
import { HeritageBadge } from '@/components/shared/HeritageBadge';
import { MistOverlay } from '@/components/shared/MistOverlay';
import { DISTRICT_LABELS } from '@/lib/types';
import type { Property } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link
      to={`/stays/${property.slug}`}
      className="group block bg-surface-high rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-ambient"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.cover_image ?? '/placeholder.svg'}
          alt={property.name}
          className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-1000 group-hover:scale-105"
        />
        <MistOverlay intensity="soft" />

        {/* Price badge */}
        {property.price_per_night && (
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-on-surface border border-white/10 px-3 py-1.5 rounded-full">
            <span className="font-label text-[9px] tracking-widest">FROM </span>
            <span className="font-body font-bold text-sm text-secondary">
              ₹{property.price_per_night.toLocaleString()}
            </span>
            <span className="font-body text-xs text-on-surface-variant">/night</span>
          </div>
        )}

        {/* Featured badge */}
        {property.is_featured && (
          <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label text-[9px] tracking-widest">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <HeritageBadge type={property.property_type} />
          <div className="flex items-center gap-1.5 text-on-surface-variant shrink-0">
            <Users size={13} />
            <span className="font-body text-xs">{property.max_guests}</span>
          </div>
        </div>

        <h3 className="font-headline text-xl text-on-surface leading-snug mb-2 group-hover:text-secondary transition-colors duration-300">
          {property.name}
        </h3>

        <div className="flex items-center gap-1.5 text-on-surface-variant mb-3">
          <MapPin size={12} className="shrink-0" />
          <span className="font-body text-xs">{DISTRICT_LABELS[property.district]}, Kerala</span>
        </div>

        {property.tagline && (
          <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-2 italic">
            "{property.tagline}"
          </p>
        )}
      </div>
    </Link>
  );
};
