import React from 'react';
import {
  Waves, ChefHat, Flame, Sparkles, TreePine, Wifi,
  Dumbbell, Coffee, Car, Leaf, ShieldCheck, Star,
  Wind, Umbrella, Fish, Bike, Camera, Music,
  type LucideIcon,
} from 'lucide-react';
import type { Amenity } from '@/lib/types';

// Map common amenity names → Lucide icons
const ICON_MAP: Record<string, LucideIcon> = {
  pool:          Waves,
  'private chef': ChefHat,
  'chef':        ChefHat,
  'fire pit':    Flame,
  'fireplace':   Flame,
  spa:           Sparkles,
  'nature walks': TreePine,
  'hiking':      TreePine,
  wifi:          Wifi,
  'high-speed':  Wifi,
  'gym':         Dumbbell,
  'fitness':     Dumbbell,
  'coffee':      Coffee,
  'parking':     Car,
  'garden':      Leaf,
  'organic':     Leaf,
  'security':    ShieldCheck,
  'premium':     Star,
  'ac':          Wind,
  'pool deck':   Umbrella,
  'fishing':     Fish,
  'cycling':     Bike,
  'photography': Camera,
  'music':       Music,
};

function getIcon(name: string) {
  const key = name.toLowerCase();
  for (const [k, Icon] of Object.entries(ICON_MAP)) {
    if (key.includes(k)) return Icon;
  }
  return Leaf; // default
}

interface AmenitiesSidebarProps {
  amenities: Amenity[];
}

export const AmenitiesSidebar: React.FC<AmenitiesSidebarProps> = ({ amenities }) => {
  if (!amenities.length) return null;

  return (
    <div className="mb-8">
      <h3 className="text-xs font-bold uppercase tracking-wider text-hc-text-light mb-6 font-body">
        Estate Amenities
      </h3>
      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
        {amenities.slice(0, 8).map(a => {
          const Icon = getIcon(a.name);
          return (
            <div key={a.id} className="text-center">
              <div className="w-12 h-12 bg-hc-bg-alt rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon size={20} strokeWidth={1.5} className="text-hc-primary" />
              </div>
              <p className="text-sm text-hc-text font-body">{a.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
