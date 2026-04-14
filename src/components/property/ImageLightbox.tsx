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

  const prev = useCallback(() =>
    onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate]
  );
  const next = useCallback(() =>
    onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/96 flex flex-col"
      style={{ height: '100dvh' }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 shrink-0">
        <div className="flex flex-col">
          <span className="text-white/80 font-headline text-sm leading-tight truncate max-w-[240px]">
            {title}
          </span>
          <span className="text-white/40 font-body text-xs tabular-nums mt-0.5">
            {index + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          aria-label="Close gallery"
        >
          <X size={18} className="text-white" />
        </button>
      </div>

      {/* Image — centered, contained */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8 overflow-hidden">
        <img
          src={images[index]}
          alt={`${title} — ${index + 1} of ${images.length}`}
          className="max-w-full max-h-full object-contain rounded-xl select-none"
          draggable={false}
        />
      </div>

      {/* Prev / Next arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors hidden md:flex"
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors hidden md:flex"
            aria-label="Next"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </>
      )}
    </div>
  );
};
