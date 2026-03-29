import React, { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { RoomType } from '@/lib/types';

interface BookNowModalProps {
  propertyName: string;
  phone: string;
  rooms?: RoomType[];
}

export const BookNowModal: React.FC<BookNowModalProps> = ({ propertyName, phone, rooms = [] }) => {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleSubmit = () => {
    const roomLabel = selectedRoom || 'Not specified';
    const msg = encodeURIComponent(
      `Hi, I'd like to book ${propertyName}.\nRoom: ${roomLabel}\nName: ${name}\nPhone: ${phoneNum}\nGuests: ${guests}`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    setExpanded(false);
  };

  return (
    <div className="px-5 mt-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-[#496C4D] text-white rounded-full py-4 text-lg font-bold font-body hover:bg-[#496C4D]/90 transition-colors flex items-center justify-center gap-2"
      >
        Book Now {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {expanded && (
        <div className="mt-4 bg-surface-low rounded-2xl p-6 animate-accordion-down">
          <h2 className="font-headline text-2xl text-hc-primary mb-1">Book Your Stay</h2>
          <p className="font-headline italic text-hc-secondary text-sm mb-5">{propertyName}</p>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-white rounded-xl px-4 py-3 text-sm font-body text-hc-text placeholder:text-hc-text/50 border-none outline-none focus:ring-2 focus:ring-hc-primary/20"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNum}
              onChange={e => setPhoneNum(e.target.value)}
              className="bg-white rounded-xl px-4 py-3 text-sm font-body text-hc-text placeholder:text-hc-text/50 border-none outline-none focus:ring-2 focus:ring-hc-primary/20"
            />

            {rooms.length > 0 && (
              <div className="relative">
                <select
                  value={selectedRoom}
                  onChange={e => setSelectedRoom(e.target.value)}
                  className="w-full bg-white rounded-xl px-4 py-3 text-sm font-body text-hc-text appearance-none border-none outline-none focus:ring-2 focus:ring-hc-primary/20 pr-10"
                >
                  <option value="">Select a Room</option>
                  {rooms.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-hc-text/50 pointer-events-none" />
              </div>
            )}

            <div className="bg-white rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-body text-hc-text/50">Number of Guests</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests(g => Math.max(1, g - 1))}
                  className="w-8 h-8 rounded-full bg-surface-low flex items-center justify-center text-hc-primary font-bold"
                >
                  −
                </button>
                <span className="font-body font-bold text-hc-text w-6 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(g => g + 1)}
                  className="w-8 h-8 rounded-full bg-surface-low flex items-center justify-center text-hc-primary font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#25D366] text-white rounded-full py-4 font-bold font-body mt-5 flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle size={18} /> Book via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};
