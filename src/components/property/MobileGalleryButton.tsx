import React, { useState, useEffect, useCallback } from 'react';
import { LayoutGrid, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PropertyImage } from '@/lib/types';

interface MobileGalleryButtonProps {
  coverImage: string | null;
  images: PropertyImage[];
  propertyName: string;
}

export const MobileGalleryButton: React.FC<MobileGalleryButtonProps> = ({
  coverImage, images, propertyName,
}) => {
  const allImages: string[] = [
    coverImage ?? '/placeholder.svg',
    ...images.map(i => i.image_url),
  ].filter(Boolean);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => setIndex(i => (i - 1 + allImages.length) % allImages.length), [allImages.length]);
  const next = useCallback(() => setIndex(i => (i + 1) % allImages.length), [allImages.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, prev, next]);

  return (
    <>
      {/* Gallery icon button */}
      <div className="md:hidden flex justify-end px-5 relative z-10 -mt-5">
        <button
          onClick={() => { setIndex(0); setOpen(true); }}
          className="w-10 h-10 rounded-full bg-[#17341e] flex items-center justify-center shadow-lg"
          aria-label="View all photos"
        >
          <LayoutGrid size={18} className="text-white" />
        </button>
      </div>

      {/* Fullscreen lightbox */}
      {open && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center" style={{ maxHeight: '800px', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0 }}>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-[calc(1.25rem+45px)] right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center z-10"
            aria-label="Close gallery"
          >
            <X size={18} className="text-white" />
          </button>

          {/* Swipeable container */}
          <div
            className="w-full flex items-center overflow-x-auto snap-x snap-mandatory hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
            onScroll={(e) => {
              const el = e.currentTarget;
              const newIndex = Math.round(el.scrollLeft / el.clientWidth);
              if (newIndex !== index) setIndex(newIndex);
            }}
          >
            {allImages.map((src, i) => (
              <div key={i} className="w-full flex-shrink-0 snap-start snap-always flex items-center justify-center px-4" style={{ minWidth: '100%' }}>
                <img
                  src={src}
                  alt={`${propertyName} — ${i + 1}`}
                  className="max-h-[75vh] max-w-full object-contain rounded-xl"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Counter */}
          <span className="absolute bottom-6 text-white/60 font-body text-sm tabular-nums">
            {index + 1} / {allImages.length}
          </span>
        </div>
      )}
    </>
  );
};
