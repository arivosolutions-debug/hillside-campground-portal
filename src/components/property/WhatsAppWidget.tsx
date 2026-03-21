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
  const msg  = encodeURIComponent(`Hi, I'm interested in ${propertyName} at Hills Camp Kerala.`);
  const href = `https://wa.me/${phone}?text=${msg}`;

  return (
    /* Mobile sticky FAB — hidden on md+ (desktop uses sidebar button) */
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Enquire via WhatsApp"
    >
      <MessageCircle size={28} className="text-white" strokeWidth={1.75} />
    </a>
  );
};
