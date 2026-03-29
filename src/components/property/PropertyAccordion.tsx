import React, { useState } from 'react';
import { Leaf, Plus } from 'lucide-react';

interface PropertyAccordionProps {
  title: string;
  children: React.ReactNode;
}

export const PropertyAccordion: React.FC<PropertyAccordionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-[#c2c8bf]/20">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full px-5 py-4"
      >
        <span className="font-headline text-[#17341e] text-lg">{title}</span>
        <Plus
          size={20}
          className={`text-[#17341e] transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '600px' : '0px' }}
      >
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
};

interface HighlightsAccordionProps {
  highlights: string[] | null;
}

export const HighlightsAccordion: React.FC<HighlightsAccordionProps> = ({ highlights }) => {
  if (!highlights?.length) return null;
  return (
    <PropertyAccordion title="Highlights">
      <div className="space-y-3">
        {highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-3">
            <Leaf size={14} strokeWidth={1.5} className="text-[#924a29] mt-0.5 shrink-0" />
            <p className="text-sm text-[#424842] font-body">{h}</p>
          </div>
        ))}
      </div>
    </PropertyAccordion>
  );
};

export const TermsAccordion: React.FC = () => (
  <PropertyAccordion title="Terms & Conditions">
    <div className="space-y-3 text-sm text-[#424842] font-body">
      <p><strong>Check-in:</strong> 2:00 PM — <strong>Check-out:</strong> 11:00 AM</p>
      <p><strong>Cancellation:</strong> Free cancellation up to 7 days before check-in. 50% refund for cancellations within 3–7 days. No refund for cancellations within 3 days.</p>
      <p><strong>House Rules:</strong> No smoking indoors. Pets allowed on select properties only. Quiet hours from 10 PM to 7 AM. Guests are responsible for any damage to property.</p>
      <p><strong>Payment:</strong> A 30% advance is required to confirm your booking. Balance payable at check-in.</p>
    </div>
  </PropertyAccordion>
);
