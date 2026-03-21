import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';
import { DISTRICT_LABELS, PROPERTY_TYPE_LABELS } from '@/lib/types';
import type { Property } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link
      to={`/stays/${property.slug}`}
      className="group bg-white rounded-2xl overflow-hidden card-hover shadow-card hover:shadow-card-lg transition-shadow duration-300 block"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.cover_image ?? '/placeholder.svg'}
          alt={property.name}
          className="w-full h-[280px] object-cover"
        />
        <span className="absolute top-3 left-4 bg-hc-bg/90 backdrop-blur-sm text-hc-primary text-xs font-bold uppercase tracking-tight px-3 py-1 rounded-full">
          {PROPERTY_TYPE_LABELS[property.property_type]}
        </span>
        {property.is_featured && (
          <span className="absolute top-3 right-4 bg-hc-secondary text-white text-xs font-bold uppercase tracking-tight px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-hc-secondary text-sm font-bold uppercase tracking-wider mb-1">
          {DISTRICT_LABELS[property.district]}
        </p>
        <h3 className="font-headline text-hc-primary text-xl mb-3 group-hover:text-hc-secondary transition-colors duration-200">
          {property.name}
        </h3>

        <div className="flex items-center gap-4 text-sm text-hc-text mb-4">
          <span className="flex items-center gap-1">
            <Users size={14} strokeWidth={1.75} />
            {property.max_guests} Guests
          </span>
          {property.price_per_night && (
            <span className="flex items-center gap-1 font-semibold text-hc-secondary">
              ₹{property.price_per_night.toLocaleString()}/night
            </span>
          )}
        </div>

        {property.tagline && (
          <p className="text-hc-text text-sm leading-relaxed line-clamp-2 italic mb-4">
            "{property.tagline}"
          </p>
        )}

        <div className="border-t border-hc-text-light/10 pt-4 flex items-center justify-between">
          <span className="text-hc-primary font-bold tracking-tight text-sm">
            {property.price_per_night ? `₹${property.price_per_night.toLocaleString()}/night` : 'Contact for Pricing'}
          </span>
          <span className="text-hc-primary text-sm font-bold group-hover:translate-x-1 transition-transform inline-block">→</span>
        </div>
      </div>
    </Link>
  );
};
