import React from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import type { District, PropertyType } from '@/lib/types';

interface FilterBarProps {
  district:       District | '';
  propertyType:   PropertyType | '';
  maxGuests:      number;
  onDistrict:     (v: District | '') => void;
  onPropertyType: (v: PropertyType | '') => void;
  onMaxGuests:    (v: number) => void;
}

const DISTRICTS: { value: District; label: string }[] = [
  { value: 'wayanad',   label: 'Wayanad' },
  { value: 'munnar',    label: 'Munnar' },
  { value: 'alleppey',  label: 'Alleppey' },
  { value: 'thekkady',  label: 'Thekkady' },
  { value: 'vagamon',   label: 'Vagamon' },
  { value: 'kozhikode', label: 'Kozhikode' },
  { value: 'kannur',    label: 'Kannur' },
];

const TYPES: { value: PropertyType; label: string }[] = [
  { value: 'tree_house',        label: 'Tree House' },
  { value: 'backwater_villa',   label: 'Backwater Villa' },
  { value: 'mountain_lookout',  label: 'Mountain Lookout' },
  { value: 'tea_estate_cabin',  label: 'Tea Estate Cabin' },
  { value: 'heritage_bungalow', label: 'Heritage Bungalow' },
  { value: 'riverside_cottage', label: 'Riverside Cottage' },
];

const GUEST_OPTIONS = [2, 4, 6, 8];

export const FilterBar: React.FC<FilterBarProps> = ({
  district, propertyType, maxGuests,
  onDistrict, onPropertyType, onMaxGuests,
}) => {
  const selectClass = `
    appearance-none bg-white text-hc-primary font-body font-semibold text-sm
    rounded-xl px-5 py-3 pr-9 outline-none cursor-pointer
    border border-hc-text-light/20 hover:border-hc-secondary/40 transition-colors duration-200
    focus:ring-1 focus:ring-hc-secondary/30
  `;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-hc-text-light">
        <SlidersHorizontal size={14} />
        <span className="font-label text-[10px] tracking-widest">FILTER</span>
      </div>

      {/* District */}
      <div className="relative">
        <select value={district} onChange={e => onDistrict(e.target.value as District | '')} className={selectClass}>
          <option value="">All Districts</option>
          {DISTRICTS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-hc-text-light pointer-events-none" />
      </div>

      {/* Type */}
      <div className="relative">
        <select value={propertyType} onChange={e => onPropertyType(e.target.value as PropertyType | '')} className={selectClass}>
          <option value="">All Types</option>
          {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-hc-text-light pointer-events-none" />
      </div>

      {/* Guests */}
      <div className="relative">
        <select value={maxGuests} onChange={e => onMaxGuests(Number(e.target.value))} className={selectClass}>
          <option value={1}>Any Guests</option>
          {GUEST_OPTIONS.map(g => <option key={g} value={g}>{g}+ Guests</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-hc-text-light pointer-events-none" />
      </div>

      {/* Clear */}
      {(district || propertyType || maxGuests > 1) && (
        <button
          onClick={() => { onDistrict(''); onPropertyType(''); onMaxGuests(1); }}
          className="font-body text-sm text-hc-text-light hover:text-hc-secondary border border-hc-text-light/20 px-4 py-2.5 rounded-xl transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};
