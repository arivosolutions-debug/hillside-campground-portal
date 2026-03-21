import React from 'react';
import type { NearbyAttraction } from '@/lib/types';

interface NearbyAttractionsProps {
  attractions: NearbyAttraction[];
}

export const NearbyAttractions: React.FC<NearbyAttractionsProps> = ({ attractions }) => {
  if (!attractions.length) return null;

  return (
    <div className="mb-12">
      <h2 className="font-headline text-hc-primary text-3xl mb-6">Nearby Attractions</h2>
      <div className="space-y-4">
        {attractions.map(a => (
          <div
            key={a.id}
            className="border-l-2 border-hc-secondary/40 pl-5 py-1"
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-body font-semibold text-hc-primary text-sm">{a.name}</span>
              {a.distance_km && (
                <span className="font-body text-xs text-hc-secondary bg-hc-accent-light/40 px-2 py-0.5 rounded-full">
                  {a.distance_km} km
                </span>
              )}
            </div>
            {a.description && (
              <p className="text-sm text-hc-text-light font-body leading-relaxed">{a.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
