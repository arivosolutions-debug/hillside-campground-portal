import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import type { PropertyImage } from '@/lib/types';

interface PhotoGalleryProps {
  coverImage:   string | null;
  images:       PropertyImage[];
  propertyName: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ coverImage, images, propertyName }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combined list: cover first, then gallery images ordered by sort_order
  const allImages: string[] = [
    coverImage ?? '/placeholder.svg',
    ...images.map(i => i.image_url),
  ].filter(Boolean);

  // Mosaic uses up to 5 images
  const mosaic = allImages.slice(0, 5);
  // Pad to 5 with placeholder if fewer images
  while (mosaic.length < 5) mosaic.push('/placeholder.svg');

  const openLightbox  = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = useCallback(() =>
    setLightboxIndex(i => (i === null ? 0 : (i - 1 + allImages.length) % allImages.length)), [allImages.length]);
  const next = useCallback(() =>
    setLightboxIndex(i => (i === null ? 0 : (i + 1) % allImages.length)), [allImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, prev, next]);

  return (
    <>
      {/* ── Bento mosaic: 7/12 hero left + 5/12 2×2 right ─────────── */}
      <div className="grid grid-cols-12 gap-3 h-[480px] md:h-[580px] rounded-3xl overflow-hidden">

        {/* Hero — 7 cols, full height */}
        <div
          className="col-span-12 md:col-span-7 relative overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <img
            src={mosaic[0]}
            alt={propertyName}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        {/* 2×2 right — 5 cols */}
        <div className="hidden md:grid col-span-5 grid-cols-2 grid-rows-2 gap-3">

          {/* Top-left thumbnail */}
          <div
            className="relative overflow-hidden rounded-none cursor-pointer group"
            onClick={() => openLightbox(1)}
          >
            <img
              src={mosaic[1]}
              alt={`${propertyName} — photo 2`}
              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>

          {/* Top-right thumbnail */}
          <div
            className="relative overflow-hidden rounded-none cursor-pointer group"
            onClick={() => openLightbox(2)}
          >
            <img
              src={mosaic[2]}
              alt={`${propertyName} — photo 3`}
              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>

          {/* Bottom-left thumbnail */}
          <div
            className="relative overflow-hidden rounded-none cursor-pointer group"
            onClick={() => openLightbox(3)}
          >
            <img
              src={mosaic[3]}
              alt={`${propertyName} — photo 4`}
              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>

          {/* Bottom-right — "View all" overlay */}
          <div
            className="relative overflow-hidden rounded-none cursor-pointer group"
            onClick={() => openLightbox(4)}
          >
            <img
              src={mosaic[4]}
              alt={`${propertyName} — photo 5`}
              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
            />
            {/* Dark overlay always visible when there are more than 5 photos */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${allImages.length > 5 ? 'bg-hc-primary-dark/60' : 'bg-black/0 group-hover:bg-black/20'}`}>
              {allImages.length > 5 && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Images size={16} className="text-white" />
                  </div>
                  <span className="text-white font-body font-semibold text-sm tracking-wide">
                    View all {allImages.length} →
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: show 2nd image as strip below hero */}
        <div
          className="md:hidden col-span-12 h-32 relative overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(1)}
        >
          <img
            src={mosaic[1]}
            alt={`${propertyName} — photo 2`}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
          {allImages.length > 2 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-body font-semibold text-sm flex items-center gap-1.5">
                <Images size={15} /> View all {allImages.length} photos
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-5 right-5 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close gallery"
          >
            <X size={18} className="text-white" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-5 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>

          {/* Image */}
          <img
            src={allImages[lightboxIndex]}
            alt={`${propertyName} — ${lightboxIndex + 1} of ${allImages.length}`}
            className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl select-none"
            onClick={e => e.stopPropagation()}
            draggable={false}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-5 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight size={22} className="text-white" />
          </button>

          {/* Counter */}
          <span className="absolute bottom-5 text-white/50 font-body text-sm tabular-nums">
            {lightboxIndex + 1} / {allImages.length}
          </span>
        </div>
      )}
    </>
  );
};
