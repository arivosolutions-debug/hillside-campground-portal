import React from 'react';

interface MistOverlayProps {
  intensity?: 'soft' | 'medium' | 'strong';
  className?: string;
}

export const MistOverlay: React.FC<MistOverlayProps> = ({
  intensity = 'medium',
  className = '',
}) => {
  const gradients = {
    soft:   'from-transparent via-transparent to-background/70',
    medium: 'from-transparent via-background/20 to-background/95',
    strong: 'from-background/10 via-background/50 to-background',
  };

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-b pointer-events-none ${gradients[intensity]} ${className}`}
    />
  );
};
