import React from 'react';
import { Plane, Train } from 'lucide-react';

interface MapEmbedProps {
  latitude:  number | null;
  longitude: number | null;
  district:  string;
}

export const MapEmbed: React.FC<MapEmbedProps> = ({ latitude, longitude, district }) => {
  // Build bbox: ±0.1 deg around the pin
  const lat  = latitude  ?? 11.7;
  const lng  = longitude ?? 76.1;
  const bbox = `${(lng - 0.1).toFixed(4)}%2C${(lat - 0.1).toFixed(4)}%2C${(lng + 0.1).toFixed(4)}%2C${(lat + 0.1).toFixed(4)}`;
  const src  = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="mb-12">
      <h2 className="font-headline text-hc-primary text-3xl mb-6">Getting There</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-hc-text leading-relaxed mb-6 font-body">
            The property is located in the {district} region of Kerala's Western Ghats.
            Our team will share exact directions upon booking confirmation.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-hc-bg-alt rounded-full flex items-center justify-center shrink-0">
                <Plane size={18} strokeWidth={1.5} className="text-hc-primary" />
              </div>
              <div>
                <p className="font-body font-medium text-hc-primary text-sm">Calicut International Airport</p>
                <p className="text-xs text-hc-text-light font-body">Approx. 2.5 hours drive</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-hc-bg-alt rounded-full flex items-center justify-center shrink-0">
                <Train size={18} strokeWidth={1.5} className="text-hc-primary" />
              </div>
              <div>
                <p className="font-body font-medium text-hc-primary text-sm">Kozhikode Railway Station</p>
                <p className="text-xs text-hc-text-light font-body">Approx. 2.5 hours drive</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-hc-bg-alt rounded-2xl border border-hc-text-light/10 p-2 overflow-hidden">
          <iframe
            src={src}
            title="Property location map"
            className="w-full h-[320px] rounded-xl"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
