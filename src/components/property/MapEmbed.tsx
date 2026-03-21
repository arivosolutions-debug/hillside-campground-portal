import React from 'react';
import { Plane, Train, MapPin } from 'lucide-react';

interface MapEmbedProps {
  latitude:  number | null;
  longitude: number | null;
  district:  string;
}

export const MapEmbed: React.FC<MapEmbedProps> = ({ latitude, longitude, district }) => {
  const lat  = latitude  ?? 11.7;
  const lng  = longitude ?? 76.1;
  const bbox = `${(lng - 0.1).toFixed(4)}%2C${(lat - 0.1).toFixed(4)}%2C${(lng + 0.1).toFixed(4)}%2C${(lat + 0.1).toFixed(4)}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="mb-12">
      {/* Heading */}
      <h2 className="font-headline text-hc-primary text-3xl mb-2">Getting There</h2>
      <p className="text-hc-text leading-relaxed mb-8 font-body max-w-xl">
        The property is nestled in the {district} highlands of Kerala's Western Ghats.
        Exact coordinates and a custom route map will be shared with your booking confirmation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Transport options */}
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 bg-hc-bg-alt rounded-2xl">
            <div className="w-11 h-11 bg-hc-bg rounded-full flex items-center justify-center shrink-0 shadow-card">
              <Plane size={18} strokeWidth={1.5} className="text-hc-primary" />
            </div>
            <div>
              <p className="font-body font-semibold text-hc-primary text-sm mb-0.5">Nearest Airport</p>
              <p className="text-sm text-hc-text font-body">Calicut International Airport (CCJ)</p>
              <p className="text-xs text-hc-secondary font-body mt-1">Approx. 2.5 – 3 hours drive</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-hc-bg-alt rounded-2xl">
            <div className="w-11 h-11 bg-hc-bg rounded-full flex items-center justify-center shrink-0 shadow-card">
              <Train size={18} strokeWidth={1.5} className="text-hc-primary" />
            </div>
            <div>
              <p className="font-body font-semibold text-hc-primary text-sm mb-0.5">Nearest Railway</p>
              <p className="text-sm text-hc-text font-body">Kozhikode Railway Station</p>
              <p className="text-xs text-hc-secondary font-body mt-1">Approx. 2.5 hours drive</p>
            </div>
          </div>

          {/* Coordinates card */}
          <div className="flex items-center gap-3 px-5 py-4 bg-hc-primary/5 rounded-2xl border border-hc-primary/10">
            <MapPin size={16} strokeWidth={1.5} className="text-hc-secondary shrink-0" />
            <p className="text-sm font-body text-hc-text tabular-nums">
              {lat.toFixed(5)}° N, {lng.toFixed(5)}° E
            </p>
          </div>
        </div>

        {/* Map embed */}
        <div className="bg-hc-bg-alt rounded-2xl overflow-hidden border border-hc-text-light/10">
          <iframe
            src={mapSrc}
            title={`${district} property location`}
            className="w-full h-[300px] md:h-[340px]"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
