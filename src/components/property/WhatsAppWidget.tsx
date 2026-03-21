import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppWidgetProps {
  propertyName: string;
  phone?:       string;
}

const DEFAULT_PHONE = '919847012345';

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  propertyName,
  phone = DEFAULT_PHONE,
}) => {
  const msg  = encodeURIComponent(`Hi, I'm interested in ${propertyName} at Hills Camp Kerala. Could you share availability and pricing details?`);
  const href = `https://wa.me/${phone}?text=${msg}`;

  return (
    /* Mobile sticky FAB — hidden on lg+ (desktop uses sidebar button) */
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:hidden fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:scale-110 active:scale-95 transition-transform"
      aria-label="Enquire via WhatsApp"
    >
      <MessageCircle size={28} className="text-white" strokeWidth={1.75} fill="white" fillOpacity={0.15} />
    </a>
  );
};
