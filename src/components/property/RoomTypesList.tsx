import React from 'react';
import { BedDouble, Users, ArrowRight } from 'lucide-react';
import type { RoomType } from '@/lib/types';

interface RoomTypesListProps {
  rooms:      RoomType[];
  coverImage: string | null;
}

export const RoomTypesList: React.FC<RoomTypesListProps> = ({ rooms, coverImage }) => {
  if (!rooms.length) return null;

  return (
    <div className="mb-12">
      <h2 className="font-headline text-hc-primary text-3xl mb-8">Accommodation Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rooms.map(room => (
          <div
            key={room.id}
            className="bg-hc-bg-alt rounded-2xl overflow-hidden flex group hover:shadow-card transition-shadow duration-300"
          >
            {/* Room photo — left half */}
            <div className="w-[45%] shrink-0 relative overflow-hidden">
              <img
                src={coverImage ?? '/placeholder.svg'}
                alt={room.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              />
            </div>

            {/* Details — right half */}
            <div className="flex-1 p-5 flex flex-col justify-between min-h-[180px]">
              <div>
                <div className="flex items-start justify-between mb-1 gap-2">
                  <h3 className="font-headline text-hc-primary text-lg leading-snug">{room.name}</h3>
                  <BedDouble size={15} strokeWidth={1.5} className="text-hc-text-light mt-1 shrink-0" />
                </div>

                <div className="flex items-center gap-3 text-xs text-hc-secondary font-bold uppercase tracking-wider mb-3 font-body">
                  {room.bed_type && <span>{room.bed_type}</span>}
                  {room.bed_type && room.max_guests && <span>·</span>}
                  {room.max_guests && (
                    <span className="flex items-center gap-1">
                      <Users size={11} strokeWidth={2} />
                      {room.max_guests} Guest{room.max_guests !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {room.description && (
                  <p className="text-sm text-hc-text leading-relaxed font-body line-clamp-3">
                    {room.description}
                  </p>
                )}
              </div>

              <div className="border-t border-hc-text-light/10 mt-4 pt-3 flex items-center justify-between">
                <span className="font-bold text-hc-primary font-body text-xs uppercase tracking-wider">
                  Contact for Pricing
                </span>
                <ArrowRight size={14} className="text-hc-primary group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
