import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export const FloatingSearch: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const district = data.get('district') as string;
    const type = data.get('type') as string;
    const guests = data.get('guests') as string;
    const searchText = data.get('search') as string;
    if (district) params.set('district', district.toLowerCase());
    if (type) params.set('type', type.toLowerCase().replace(' ', '_'));
    if (guests) params.set('guests', guests.replace(/\D/g, ''));
    if (searchText) params.set('district', searchText.toLowerCase());
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative -mt-8 z-20 px-5 md:px-8 max-w-content mx-auto mb-16 md:mb-20">
      {/* Mobile: simplified search */}
      <form onSubmit={handleSearch} className="md:hidden bg-[#fef2ee] rounded-2xl p-5">
        <div className="relative">
          <input
            name="search"
            type="text"
            placeholder="Search for Wayanad..."
            className="w-full bg-white/80 rounded-full px-6 py-4 pr-12 text-sm text-hc-primary placeholder:text-hc-text-light border border-hc-text-light/20 focus:outline-none focus:ring-2 focus:ring-hc-secondary/30 font-body"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#944729] text-white p-2.5 rounded-full"
            aria-label="Search"
          >
            <Search size={16} strokeWidth={2} />
          </button>
        </div>
      </form>

      {/* Desktop: full search bar */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(27,28,28,0.05),0_8px_10px_-6px_rgba(27,28,28,0.05)] p-2 items-center gap-2">
        <div className="flex-1 grid grid-cols-3 gap-2">
          {/* District */}
          <div className="px-6 py-3 rounded-xl">
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 mx-[4px] text-[#944729]">
              District
            </label>
            <select
              name="district"
              className="w-full bg-transparent border-none p-0 text-hc-primary font-semibold focus:ring-0 focus:outline-none text-sm cursor-pointer">
              <option value="">Any</option>
              <option>Wayanad</option>
              <option>Munnar</option>
              <option>Alleppey</option>
              <option>Thekkady</option>
              <option>Vagamon</option>
              <option>Kozhikode</option>
              <option>Kannur</option>
            </select>
          </div>

          {/* Guests */}
          <div className="px-6 py-3 rounded-xl">
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 mx-[4px] text-[#944729]">
              Guests
            </label>
            <select
              name="guests"
              className="w-full bg-transparent border-none p-0 text-hc-primary font-semibold focus:ring-0 focus:outline-none text-sm cursor-pointer">
              <option value="2">2 Adults</option>
              <option value="4">4 Adults</option>
              <option value="6">6 Adults</option>
              <option value="8">8+ Adults</option>
            </select>
          </div>

          {/* Type */}
          <div className="px-6 py-3 rounded-xl">
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 mx-[4px] text-[#944729]">
              Type
            </label>
            <select
              name="type"
              className="w-full bg-transparent border-none p-0 text-hc-primary font-semibold focus:ring-0 focus:outline-none text-sm cursor-pointer">
              <option value="">Any</option>
              <option value="tree_house">Canopy Retreat</option>
              <option value="tea_estate_cabin">Planter's Legacy</option>
              <option value="backwater_villa">Floating Villa</option>
              <option value="heritage_bungalow">Heritage Bungalow</option>
            </select>
          </div>
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="bg-[#944729] text-white rounded-xl p-5 hover:brightness-110 transition-colors shrink-0 active:scale-[0.97] px-[20px] mx-[8px]"
          aria-label="Search">
          <Search size={20} strokeWidth={1.75} />
        </button>
      </form>
    </section>
  );
};
