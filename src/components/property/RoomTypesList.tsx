import React from 'react';
import { BedDouble } from 'lucide-react';
import type { RoomType } from '@/lib/types';

interface RoomTypesListProps {
  rooms: RoomType[];
  coverImage: string | null;
}

export const RoomTypesList: React.FC<RoomTypesListProps> = ({ rooms, coverImage }) => {
  if (!rooms.length) return null;

  return (
    <div className="mb-12">
      <h2 className="font-headline text-hc-primary text-3xl mb-8">Accommodation Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-2xl overflow-hidden flex">
            <div className="w-1/2 shrink-0">
              <img
                src={coverImage ?? '/placeholder.svg'}
                alt={room.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/2 p-6">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-headline text-hc-primary text-xl leading-snug">{room.name}</h3>
                <BedDouble size={16} strokeWidth={1.5} className="text-hc-text-light mt-1 shrink-0" />
              </div>
              <p className="text-sm text-hc-text mb-3 font-body">
                {room.bed_type ? `${room.bed_type} · ` : ''}{room.max_guests} Guest{room.max_guests !== 1 ? 's' : ''}
              </p>
              {room.description && (
                <p className="text-sm text-hc-text leading-relaxed font-body line-clamp-3">{room.description}</p>
              )}
              <div className="border-t border-hc-text-light/10 mt-4 pt-3 flex items-center justify-between text-sm">
                <span className="font-bold text-hc-primary font-body">Enquire</span>
                <span className="text-hc-text-light font-body">Contact for Pricing</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
