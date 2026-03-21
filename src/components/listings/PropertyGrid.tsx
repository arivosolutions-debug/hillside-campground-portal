import React from 'react';
import { PropertyCard } from './PropertyCard';
import type { Property } from '@/lib/types';

interface PropertyGridProps {
  properties: Property[];
  isLoading:  boolean;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-3xl bg-surface-high animate-pulse">
            <div className="aspect-[4/3] rounded-t-3xl bg-surface-highest" />
            <div className="p-6 space-y-3">
              <div className="h-3 bg-surface-highest rounded-full w-1/3" />
              <div className="h-5 bg-surface-highest rounded-full w-3/4" />
              <div className="h-3 bg-surface-highest rounded-full w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="font-headline text-6xl mb-6 opacity-20">⛰</div>
        <h3 className="font-headline text-2xl text-on-surface mb-3">No retreats found</h3>
        <p className="font-body text-sm text-on-surface-variant max-w-xs">
          Try adjusting your filters — the right wilderness retreat is waiting.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
