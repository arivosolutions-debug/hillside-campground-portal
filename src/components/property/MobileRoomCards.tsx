import React from 'react';
import { BedDouble, Users, DoorOpen } from 'lucide-react';
import type { RoomType } from '@/lib/types';

interface MobileRoomCardsProps {
  rooms: RoomType[];
  coverImage: string | null;
}

export const MobileRoomCards: React.FC<MobileRoomCardsProps> = ({ rooms, coverImage }) => {
  if (!rooms.length) return null;

  return (
    <div className="md:hidden px-5 mt-10">
      <h2 className="font-headline text-[#17341e] text-2xl mb-4">Rooms</h2>
      <div className="flex flex-col gap-4">
        {rooms.map(room => (
          <div key={room.id} className="relative rounded-2xl overflow-hidden aspect-[16/9]">
            <img
              src={coverImage ?? '/placeholder.svg'}
              alt={room.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
              <h3 className="font-headline text-xl text-white font-bold mb-1">{room.name}</h3>
              <div className="flex items-center gap-3 text-sm text-white/80">
                {room.bed_type && (
                  <span className="flex items-center gap-1">
                    <BedDouble size={13} strokeWidth={1.5} /> {room.bed_type}
                  </span>
                )}
                {room.max_guests && (
                  <span className="flex items-center gap-1">
                    <Users size={13} strokeWidth={1.5} /> {room.max_guests} Max
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
