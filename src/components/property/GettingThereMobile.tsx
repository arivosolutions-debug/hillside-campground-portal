import React from 'react';
import { MapPin, Plane, Train } from 'lucide-react';

interface GettingThereMobileProps {
  latitude: number | null;
  longitude: number | null;
  district: string;
}

export const GettingThereMobile: React.FC<GettingThereMobileProps> = ({ latitude, longitude, district }) => {
  const lat = latitude ?? 11.7;
  const lng = longitude ?? 76.1;
  const bbox = `${(lng - 0.1).toFixed(4)}%2C${(lat - 0.1).toFixed(4)}%2C${(lng + 0.1).toFixed(4)}%2C${(lat + 0.1).toFixed(4)}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="md:hidden px-5 mt-10">
      <h2 className="font-headline text-[#17341e] text-2xl mb-4">Getting There</h2>
      <div className="flex flex-col gap-3">
        <div className="bg-[#f5f3f3] rounded-2xl h-40 overflow-hidden">
          <iframe
            src={mapSrc}
            title={`${district} property location`}
            className="w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
        <div className="bg-[#f5f3f3] rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-3">
            <MapPin size={16} strokeWidth={1.5} className="text-[#924a29] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-body font-semibold text-[#17341e]">{district}, Keralam</p>
              <p className="text-xs text-[#424842] font-body mt-0.5">{lat.toFixed(5)}° N, {lng.toFixed(5)}° E</p>
            </div>
          </div>
          <div className="flex items-start gap-3 mb-2">
            <Plane size={14} strokeWidth={1.5} className="text-[#424842] mt-0.5 shrink-0" />
            <p className="text-xs text-[#424842] font-body">Nearest Airport: ~2.5 hrs</p>
          </div>
          <div className="flex items-start gap-3">
            <Train size={14} strokeWidth={1.5} className="text-[#424842] mt-0.5 shrink-0" />
            <p className="text-xs text-[#424842] font-body">Nearest Railway: ~2.5 hrs</p>
          </div>
        </div>
      </div>
    </div>
  );
};
