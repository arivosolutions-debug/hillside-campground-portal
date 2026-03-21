import React from 'react';
import { PROPERTY_TYPE_LABELS, type PropertyType } from '@/lib/types';

const TYPE_COLORS: Record<PropertyType, string> = {
  tree_house:         'bg-[hsl(77_44%_68%/0.15)] text-[hsl(77_44%_55%)]',
  backwater_villa:    'bg-[hsl(200_60%_60%/0.15)] text-[hsl(200_50%_60%)]',
  mountain_lookout:   'bg-[hsl(20_100%_80%/0.15)] text-[hsl(20_100%_70%)]',
  tea_estate_cabin:   'bg-[hsl(137_32%_15%/0.4)] text-[hsl(125_21%_71%)]',
  heritage_bungalow:  'bg-[hsl(30_50%_60%/0.15)] text-[hsl(30_60%_70%)]',
  riverside_cottage:  'bg-[hsl(210_50%_60%/0.15)] text-[hsl(210_60%_70%)]',
};

interface HeritageBadgeProps {
  type: PropertyType;
  className?: string;
}

export const HeritageBadge: React.FC<HeritageBadgeProps> = ({ type, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-label tracking-widest ${TYPE_COLORS[type]} ${className}`}
    >
      {PROPERTY_TYPE_LABELS[type]}
    </span>
  );
};
