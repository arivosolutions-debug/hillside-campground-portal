import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { District, PropertyType } from '@/lib/types';

interface FilterBarProps {
  district: District | '';
  propertyType: PropertyType | '';
  guests: number;
  onDistrict: (v: District | '') => void;
  onPropertyType: (v: PropertyType | '') => void;
  onGuests: (v: number) => void;
  totalCount?: number;
}

const DISTRICTS: {value: District;label: string;}[] = [
  { value: 'wayanad', label: 'Wayanad' },
  { value: 'munnar', label: 'Munnar' },
  { value: 'alleppey', label: 'Alleppey' },
  { value: 'thekkady', label: 'Thekkady' },
  { value: 'vagamon', label: 'Vagamon' },
  { value: 'kozhikode', label: 'Kozhikode' },
  { value: 'kannur', label: 'Kannur' },
];

const TYPES: {value: PropertyType;label: string;}[] = [
  { value: 'tree_house', label: 'Canopy Retreats' },
  { value: 'backwater_villa', label: 'Floating Villas' },
  { value: 'mountain_lookout', label: 'High Range' },
  { value: 'tea_estate_cabin', label: "Planter's Legacy" },
  { value: 'heritage_bungalow', label: 'Heritage Bungalows' },
  { value: 'riverside_cottage', label: 'Riverside Cottages' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  district, propertyType, guests,
  onDistrict, onPropertyType, onGuests,
  totalCount
}) => {
  return (
    <div className="flex flex-wrap gap-6 md:gap-8 items-end">
      {/* District */}
      <div className="w-full md:w-56">
        <label className="block text-xs font-bold uppercase tracking-wider text-hc-secondary mb-3 font-body">
          ​LOCATIONS
        </label>
        <div className="bg-hc-bg-alt rounded-xl">
          <select
            value={district}
            onChange={(e) => onDistrict(e.target.value as District | '')}
            className="w-full bg-transparent border-none px-5 py-3.5 text-hc-text rounded-xl focus:ring-0 font-body text-sm cursor-pointer">
            <option value="">All Kerala</option>
            {DISTRICTS.map((d) =>
              <option key={d.value} value={d.value}>{d.label}</option>
            )}
          </select>
        </div>
      </div>

      {/* Guests */}
      <div className="w-full md:w-44">
        <label className="block text-xs font-bold uppercase tracking-wider text-hc-secondary mb-3 font-body">
          Guests
        </label>
        <div className="bg-hc-bg-alt rounded-xl flex items-center px-2 py-1">
          <button
            onClick={() => onGuests(Math.max(1, guests - 1))}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-hc-text"
            aria-label="Decrease guests">
            <Minus size={14} />
          </button>
          <span className="flex-1 text-center font-bold text-hc-primary font-body text-sm">
            {guests}
          </span>
          <button
            onClick={() => onGuests(Math.min(12, guests + 1))}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-hc-text"
            aria-label="Increase guests">
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Property Type */}
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-bold uppercase tracking-wider text-hc-secondary mb-3 font-body">
          Property Type
        </label>
        <div className="flex flex-wrap gap-3 items-center">
          {TYPES.map((t) =>
            <label key={t.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={propertyType === t.value}
                onChange={(e) => onPropertyType(e.target.checked ? t.value : '')}
                className="rounded border-hc-text-light text-hc-primary focus:ring-hc-primary" />
              <span className="text-sm font-medium text-hc-text font-body group-hover:text-hc-primary transition-colors">
                {t.label}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* Count */}
      {totalCount !== undefined &&
        <div className="text-right shrink-0">
          <p className="font-headline italic text-sm text-hc-text">
            Showing {totalCount} {totalCount === 1 ? 'property' : 'properties'}
          </p>
        </div>
      }
    </div>
  );
};
