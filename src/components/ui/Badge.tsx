import React from 'react';
import { Difficulty } from '@/types';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'difficulty' | 'status' | 'outline' | 'default';
  difficulty?: Difficulty;
  color?: 'emerald' | 'amber' | 'orange' | 'rose' | 'blue' | 'purple' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  difficulty,
  color = 'slate',
  className = '',
}) => {
  let resolvedClasses = 'bg-slate-800 text-slate-300 border-slate-700';

  if (variant === 'difficulty' && difficulty) {
    switch (difficulty) {
      case 'beginner':
        resolvedClasses = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
        break;
      case 'intermediate':
        resolvedClasses = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
        break;
      case 'advanced':
        resolvedClasses = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
        break;
    }
  } else {
    switch (color) {
      case 'orange':
        resolvedClasses = 'bg-orange-500/15 text-orange-400 border-orange-500/30';
        break;
      case 'emerald':
        resolvedClasses = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
        break;
      case 'amber':
        resolvedClasses = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
        break;
      case 'rose':
        resolvedClasses = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
        break;
      case 'blue':
        resolvedClasses = 'bg-blue-500/15 text-blue-400 border-blue-500/30';
        break;
      case 'purple':
        resolvedClasses = 'bg-purple-500/15 text-purple-400 border-purple-500/30';
        break;
      case 'slate':
      default:
        resolvedClasses = 'bg-white/10 text-slate-300 border-white/15';
        break;
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide uppercase ${resolvedClasses} ${className}`}
    >
      {children}
    </span>
  );
};
