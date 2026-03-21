import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  className = '',
  light = false,
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        className={`h-px w-12 ${light ? 'bg-white/40' : 'bg-secondary'}`}
      />
      <span className={`font-label text-xs tracking-[0.4em] uppercase ${light ? 'text-white/60' : 'text-secondary'}`}>
        {children}
      </span>
    </div>
  );
};
