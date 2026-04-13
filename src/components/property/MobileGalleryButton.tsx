import React, { useState, useEffect, useCallback } from 'react';
import { LayoutGrid, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import type { PropertyImage } from '@/lib/types';

interface MobileGalleryButtonProps {
  coverImage: string | null;
  images: PropertyImage[];
  propertyName: string;
}

// Tile size pattern that repeats for varied mosaic look
const TILE_PATTERNS = [
  'col-span-2 row-span-2', // large
  'col-span-1 row-span-1', // small
  'col-span-1 row-span-1', // small
  'col-span-1 row-span-2', // tall
  'col-span-1 row-span-1', // small
  'col-span-2 row-span-1', // wide
  'col-span-1 row-span-1', // small
  'col-span-1 row-span-1', // small
  'col-span-1 row-span-2', // tall
];

export const MobileGalleryButton: React.FC<MobileGalleryButtonProps> = ({
  coverImage, images, propertyName,
}) => {
  const allImages: string[] = [
    coverImage ?? '/placeholder.svg',
    ...images.map(i => i.image_url),
  ].filter(Boolean);

  const [open, setOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  const prev = useCallback(() =>
    setFullscreenIndex(i => (i === null ? 0 : (i - 1 + allImages.length) % allImages.length)),
    [allImages.length]
  );
  const next = useCallback(() =>
    setFullscreenIndex(i => (i === null ? 0 : (i + 1) % allImages.length)),
    [allImages.length]
  );

  useEffect(() => {
    if (fullscreenIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setFullscreenIndex(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [fullscreenIndex, prev, next]);

  // Lock body scroll when gallery is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Gallery icon button */}
      <div className="md:hidden flex justify-end px-5 relative z-10 -mt-5">
        <button
          onClick={() => { setOpen(true); setFullscreenIndex(null); }}
          className="w-10 h-10 rounded-full bg-hc-primary flex items-center justify-center shadow-lg"
          aria-label="View all photos"
        >
          <LayoutGrid size={18} className="text-white" />
        </button>
      </div>

      {/* ── Grid Gallery View ───────────────────────────────── */}
      {open && fullscreenIndex === null && (
        <div className="fixed inset-0 z-[200] bg-hc-bg flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-[calc(3.5rem+30px)] pb-3 bg-hc-bg/90 backdrop-blur-md sticky top-0 z-10">
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-hc-primary font-body text-sm"
              aria-label="Close gallery"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-hc-text-light font-body text-sm">
                {allImages.length} photos
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-hc-primary/10 flex items-center justify-center"
                aria-label="Close gallery"
              >
                <X size={16} className="text-hc-primary" />
              </button>
            </div>
          </div>

          {/* Mosaic Grid */}
          <div className="flex-1 overflow-y-auto px-2 pb-8">
            <div className="grid grid-cols-3 gap-1.5 auto-rows-[120px]">
              {allImages.map((src, i) => {
                const pattern = TILE_PATTERNS[i % TILE_PATTERNS.length];
                return (
                  <div
                    key={i}
                    className={`${pattern} relative overflow-hidden rounded-lg cursor-pointer group`}
                    onClick={() => setFullscreenIndex(i)}
                  >
                    <img
                      src={src}
                      alt={`${propertyName} — ${i + 1}`}
                      className="w-full h-full object-cover group-active:scale-95 transition-transform duration-200"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Fullscreen Scrollable Photo View ──────────────────── */}
      {fullscreenIndex !== null && (
        <div className="fixed inset-0 z-[210] bg-black/95 flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 pt-[calc(1.25rem+45px)] pb-3 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); setFullscreenIndex(null); }}
              className="flex items-center gap-2 text-white/80 font-body text-sm"
              aria-label="Back to grid"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
              <span>All photos</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setFullscreenIndex(null); setOpen(false); }}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
              aria-label="Close gallery"
            >
              <X size={18} className="text-white" />
            </button>
          </div>

          {/* Scrollable image list — min-height grows with photo count */}
          <div
            className="flex-1 overflow-y-auto px-4 pb-8 space-y-4"
            style={{ minHeight: `${Math.max(50, Math.min(allImages.length * 30, 100))}vh` }}
          >
            {allImages.map((src, i) => (
              <div key={i} className="flex justify-center">
                <img
                  src={src}
                  alt={`${propertyName} — ${i + 1} of ${allImages.length}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-xl select-none"
                  draggable={false}
                  loading={i > 2 ? 'lazy' : 'eager'}
                />
              </div>
            ))}
          </div>

          {/* Counter */}
          <div className="py-3 text-center shrink-0">
            <span className="text-white/60 font-body text-sm tabular-nums">
              {allImages.length} photos
            </span>
          </div>
        </div>
      )}
    </>
  );
};
