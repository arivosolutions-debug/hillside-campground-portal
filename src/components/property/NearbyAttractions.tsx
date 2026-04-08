import React from 'react';
import { MapPin } from 'lucide-react';
import type { NearbyAttraction } from '@/lib/types';

interface NearbyAttractionsProps {
  attractions: NearbyAttraction[];
}

export const NearbyAttractions: React.FC<NearbyAttractionsProps> = ({ attractions }) => {
  if (!attractions.length) return null;

  return (
    <div className="px-5 md:px-0 mt-10 md:mt-0 md:mb-12">
      <h2 className="font-headline text-hc-primary text-2xl md:text-3xl mb-4 md:mb-6">
        Nearby Attractions
      </h2>
      <div className="bg-hc-bg-alt rounded-2xl p-6">
        <div className="space-y-4">
          {attractions.map(a => (
            <div
              key={a.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={16} strokeWidth={1.5} className="text-hc-secondary" />
                </div>
                <span className="font-body font-semibold text-hc-primary text-sm">{a.name}</span>
              </div>
              {a.distance_km && (
                <span className="font-body text-xs text-hc-secondary shrink-0">
                  {a.distance_km} km
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
