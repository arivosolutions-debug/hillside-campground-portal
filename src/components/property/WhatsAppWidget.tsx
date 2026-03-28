import React, { useState, useEffect } from 'react';

const DEFAULT_PHONE = '919847012345';

interface WhatsAppWidgetProps {
  propertyName?: string;
  phone?: string;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  propertyName,
  phone = DEFAULT_PHONE,
}) => {
  const [pulsed, setPulsed] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setPulsed(false), 2500);
    return () => clearTimeout(t);
  }, []);

  const msg = encodeURIComponent(
    propertyName
      ? `Hi, I'm interested in ${propertyName} at Hills Camp Kerala. Could you share availability and pricing details?`
      : `Hi, I'd like to enquire about a stay`
  );
  const href = `https://wa.me/${phone}?text=${msg}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`lg:hidden fixed bottom-6 right-6 z-50 w-16 h-16 bg-hc-secondary rounded-full flex flex-col items-center justify-center shadow-[0_8px_24px_rgba(148,71,41,0.35)] hover:scale-110 active:scale-95 transition-transform ${pulsed ? 'animate-pulse' : ''}`}
      aria-label="Enquire via WhatsApp"
    >
      <span className="font-logo text-white text-[11px] leading-none">Enquire</span>
      <span className="font-logo text-white text-[10px] leading-none underline decoration-wavy decoration-white/60 underline-offset-2">Now</span>
    </a>
  );
};
