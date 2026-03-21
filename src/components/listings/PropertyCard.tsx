import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { DISTRICT_LABELS, PROPERTY_TYPE_LABELS } from '@/lib/types';
import type { Property } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/property/${property.slug}`} className="group block">
      {/* Image */}
      <div className="relative rounded-xl overflow-hidden mb-4">
        <img
          src={property.cover_image ?? '/placeholder.svg'}
          alt={property.name}
          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Type badge */}
        <span className="absolute top-3 left-4 bg-hc-accent-light/90 backdrop-blur-sm text-[#360f00] text-[10px] font-bold uppercase tracking-tight px-3 py-1.5 rounded-full font-body">
          {PROPERTY_TYPE_LABELS[property.property_type]}
        </span>
        {/* Featured badge */}
        {property.is_featured && (
          <span className="absolute top-3 right-4 bg-hc-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full font-body">
            Estate Signature
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-headline text-hc-primary text-lg leading-snug">
          {property.name}
        </h3>
      </div>

      <p className="text-sm text-hc-text flex items-center gap-1.5 mb-0.5 font-body">
        <MapPin size={12} strokeWidth={1.5} />
        {DISTRICT_LABELS[property.district]}, Kerala
      </p>
      <p className="text-sm text-hc-text flex items-center gap-1.5 font-body">
        <Users size={12} strokeWidth={1.5} />
        Up to {property.max_guests} Guests
        {property.tagline ? ` · ${property.tagline}` : ''}
      </p>

      <div className="border-t border-hc-text-light/10 mt-4 pt-4 flex items-center justify-between">
        <span className="font-bold text-hc-primary tracking-tight font-body text-sm">
          Contact for Pricing
        </span>
        <ArrowRight size={16} className="text-hc-primary group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </Link>
  );
};
