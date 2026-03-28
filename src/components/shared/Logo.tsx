import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '' }) => {
  const color = variant === 'light' ? 'text-white' : 'text-hc-primary';

  return (
    <Link to="/" className={`flex flex-col items-start leading-none hover:opacity-80 transition-opacity ${className}`}>
      <span className={`font-logo text-3xl ${color}`} style={{ lineHeight: 0.9 }}>
        hills
      </span>
      <span className={`font-body font-bold text-[10px] tracking-[0.3em] uppercase ${color}`}>
        CAMP
      </span>
    </Link>
  );
};
