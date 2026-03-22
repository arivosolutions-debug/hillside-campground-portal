import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    if (district) params.set('district', district.toLowerCase());
    if (type) params.set('type', type.toLowerCase().replace(' ', '_'));
    if (guests) params.set('guests', guests.replace(/\D/g, ''));
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative -mt-8 z-20 px-8 max-w-content mx-auto mb-20">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-[0_20px_25px_-5px_rgba(27,28,28,0.05),0_8px_10px_-6px_rgba(27,28,28,0.05)] p-2 flex items-center gap-2">
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* District */}
          <div className="px-6 py-3 rounded-xl">
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 mx-[4px] text-accent">
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
            <label className="block text-xs font-bold uppercase tracking-wider text-hc-text-light mb-1 mx-[4px] text-secondary">
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
            <label className="block text-xs font-bold uppercase tracking-wider text-hc-text-light mb-1 mx-[4px] text-secondary">
              Type
            </label>
            <select
              name="type"
              className="w-full bg-transparent border-none p-0 text-hc-primary font-semibold focus:ring-0 focus:outline-none text-sm cursor-pointer">
              
              <option value="">Any</option>
              <option value="tree_house">Treehouse</option>
              <option value="tea_estate_cabin">Cabin</option>
              <option value="backwater_villa">Villa</option>
              <option value="heritage_bungalow">Estate</option>
            </select>
          </div>
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="bg-hc-primary text-white rounded-xl p-5 hover:bg-hc-primary-deep transition-colors shrink-0 active:scale-[0.97] px-[20px] mx-[8px] bg-secondary"
          aria-label="Search">
          
          <Search size={20} strokeWidth={1.75} />
        </button>
      </form>
    </section>);

};