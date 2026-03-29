import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface BookNowModalProps {
  propertyName: string;
  phone: string;
}

export const BookNowModal: React.FC<BookNowModalProps> = ({ propertyName, phone }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSubmit = () => {
    const msg = encodeURIComponent(
      `Hi, I'd like to book ${propertyName}. Name: ${name}, Phone: ${phoneNum}, Guests: ${guests}`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    setOpen(false);
  };

  return (
    <>
      <div className="px-5 mt-8">
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-[#924a29] text-white rounded-full py-4 text-lg font-bold font-body hover:bg-[#7a3d22] transition-colors"
        >
          Book Now
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full relative animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-[#424842]" />
            </button>

            <h2 className="font-headline text-2xl text-[#17341e] mb-2">Book Your Stay</h2>
            <p className="font-headline italic text-[#924a29] text-sm mb-6">{propertyName}</p>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-[#f5f3f3] rounded-xl px-4 py-3 text-sm font-body text-[#424842] placeholder:text-[#424842]/50 border-none outline-none focus:ring-2 focus:ring-[#17341e]/20"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNum}
                onChange={e => setPhoneNum(e.target.value)}
                className="bg-[#f5f3f3] rounded-xl px-4 py-3 text-sm font-body text-[#424842] placeholder:text-[#424842]/50 border-none outline-none focus:ring-2 focus:ring-[#17341e]/20"
              />
              <div className="bg-[#f5f3f3] rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-body text-[#424842]/50">Number of Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(g => Math.max(1, g - 1))}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#17341e] font-bold shadow-sm"
                  >
                    −
                  </button>
                  <span className="font-body font-bold text-[#424842] w-6 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(g => g + 1)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#17341e] font-bold shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#25D366] text-white rounded-full py-4 font-bold font-body mt-6 flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle size={18} /> Book via WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  );
};
