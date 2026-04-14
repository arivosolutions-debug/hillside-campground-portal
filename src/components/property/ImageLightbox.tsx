import React, { useCallback, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images, index, title, onClose, onNavigate,
}) => {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const prev = useCallback(() =>
    onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate]
  );
  const next = useCallback(() =>
    onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      className="fixed z-[9999] bg-black/95 flex flex-col"
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;
        touchStartX.current = null;
        touchStartY.current = null;
        // Only treat as swipe if horizontal movement dominates and is large enough
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
          dx < 0 ? next() : prev();
        }
      }}
    >
      {/* Top bar — stop click from closing */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-white font-body text-sm font-semibold leading-snug">
            {title}
          </p>
          <span className="text-white/50 font-body text-xs tabular-nums">
            {index + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full
                     flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X size={18} className="text-white" />
        </button>
      </div>

      {/* Image — centered, contained, stops backdrop click */}
      <div
        className="flex-1 flex items-center justify-center px-12"
        style={{ minHeight: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={images[index]}
          src={images[index]}
          alt={`${title} — ${index + 1} of ${images.length}`}
          className="select-none rounded-xl object-contain"
          style={{
            maxWidth: '100%',
            maxHeight: 'calc(100svh - 120px)',
            width: 'auto',
            height: 'auto',
          }}
          draggable={false}
        />
      </div>

      {/* Prev / Next arrows — stop backdrop click */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11
                       bg-white/10 hover:bg-white/20 rounded-full flex items-center
                       justify-center transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11
                       bg-white/10 hover:bg-white/20 rounded-full flex items-center
                       justify-center transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={22} className="text-white" />
          </button>
        </>
      )}
    </div>
  );
};