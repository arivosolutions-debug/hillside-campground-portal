import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import type { PropertyImage } from '@/lib/types';

interface PhotoGalleryProps {
  coverImage:  string | null;
  images:      PropertyImage[];
  propertyName: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ coverImage, images, propertyName }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build a combined list: cover first, then extra images
  const allImages: string[] = [
    coverImage ?? '/placeholder.svg',
    ...images.map(i => i.image_url),
  ];

  // Show up to 5 in the mosaic; rest accessible via lightbox
  const mosaic = allImages.slice(0, 5);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => (i === null ? 0 : (i - 1 + allImages.length) % allImages.length));
  const next = () => setLightboxIndex(i => (i === null ? 0 : (i + 1) % allImages.length));

  return (
    <>
      {/* Bento mosaic */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[560px] md:h-[700px]">
        {/* Large left — col-span-2 row-span-2 */}
        <div
          className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          <img
            src={mosaic[0]}
            alt={propertyName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Top-right */}
        {mosaic[1] && (
          <div className="rounded-2xl overflow-hidden group cursor-pointer" onClick={() => openLightbox(1)}>
            <img src={mosaic[1]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        )}

        {/* Top-far-right */}
        {mosaic[2] && (
          <div className="rounded-2xl overflow-hidden group cursor-pointer" onClick={() => openLightbox(2)}>
            <img src={mosaic[2]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        )}

        {/* Bottom-right */}
        {mosaic[3] && (
          <div className="rounded-2xl overflow-hidden group cursor-pointer" onClick={() => openLightbox(3)}>
            <img src={mosaic[3]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        )}

        {/* Bottom-far-right (+ "view all" overlay) */}
        {mosaic[4] && (
          <div className="rounded-2xl overflow-hidden relative group cursor-pointer" onClick={() => openLightbox(4)}>
            <img src={mosaic[4]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            {allImages.length > 5 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-body font-medium flex items-center gap-2 text-sm">
                  <Images size={16} /> View all photos
                </span>
              </div>
            )}
          </div>
        )}

        {/* Fallback if fewer than 5 images — fill remaining slots */}
        {mosaic.length < 2 && (
          <div className="rounded-2xl bg-hc-bg-alt" />
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>

          <img
            src={allImages[lightboxIndex]}
            alt={`${propertyName} — ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight size={22} className="text-white" />
          </button>

          <span className="absolute bottom-6 text-white/50 font-body text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </span>
        </div>
      )}
    </>
  );
};
