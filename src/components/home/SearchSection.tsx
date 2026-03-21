import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import type { District, PropertyType } from '@/lib/types';

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

export const SearchSection: React.FC = () => {
  const navigate = useNavigate();
  const [district,  setDistrict]  = useState<District | ''>('');
  const [propType,  setPropType]  = useState<PropertyType | ''>('');
  const [guests,    setGuests]    = useState<number>(2);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (district) params.set('district', district);
    if (propType) params.set('type',     propType);
    if (guests > 1) params.set('guests', String(guests));
    navigate(`/stays?${params.toString()}`);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=2000&q=80"
          alt="Kerala landscape search"
          className="w-full h-full object-cover brightness-30"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-8">
        <div className="max-w-2xl mb-12">
          <SectionLabel light className="mb-8">Find Your Retreat</SectionLabel>
          <h2 className="font-headline text-4xl md:text-5xl text-on-surface leading-tight">
            Every forest has<br />
            <em className="text-secondary">the right path.</em>
          </h2>
        </div>

        {/* Search bar */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-4xl p-2 flex flex-col md:flex-row gap-2 max-w-4xl">
          {/* District */}
          <div className="flex-1 flex items-center gap-3 bg-surface-high rounded-3xl px-5 py-4">
            <MapPin size={16} className="text-secondary shrink-0" />
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value as District | '')}
              className="bg-transparent font-body text-sm text-on-surface w-full outline-none cursor-pointer appearance-none"
            >
              <option value="">Any District</option>
              {DISTRICTS.map((d) => (
                <option key={d.value} value={d.value} className="bg-surface-highest">
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="flex-1 flex items-center gap-3 bg-surface-high rounded-3xl px-5 py-4">
            <Search size={16} className="text-secondary shrink-0" />
            <select
              value={propType}
              onChange={(e) => setPropType(e.target.value as PropertyType | '')}
              className="bg-transparent font-body text-sm text-on-surface w-full outline-none cursor-pointer appearance-none"
            >
              <option value="">Any Type</option>
              {TYPES.map((t) => (
                <option key={t.value} value={t.value} className="bg-surface-highest">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-3 bg-surface-high rounded-3xl px-5 py-4 min-w-[140px]">
            <Users size={16} className="text-secondary shrink-0" />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-6 h-6 rounded-full bg-outline-variant text-on-surface text-xs font-bold flex items-center justify-center hover:bg-secondary-container transition-colors active:scale-90"
              >
                −
              </button>
              <span className="font-body text-sm text-on-surface tabular-nums w-4 text-center">
                {guests}
              </span>
              <button
                onClick={() => setGuests(Math.min(10, guests + 1))}
                className="w-6 h-6 rounded-full bg-outline-variant text-on-surface text-xs font-bold flex items-center justify-center hover:bg-secondary-container transition-colors active:scale-90"
              >
                +
              </button>
            </div>
          </div>

          {/* Search CTA */}
          <button
            onClick={handleSearch}
            className="font-body font-bold bg-secondary-container text-on-secondary-container px-8 py-4 rounded-3xl text-sm transition-all duration-300 hover:brightness-110 active:scale-[0.97] whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};
