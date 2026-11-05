import React from 'react';
import { Loader2 } from 'lucide-react';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  }[size];

  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses =
        'bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold shadow-glow-rust hover:from-orange-600 hover:to-amber-700 hover:shadow-orange-500/40 border border-orange-400/30';
      break;
    case 'secondary':
      variantClasses =
        'bg-white/10 hover:bg-white/15 text-slate-100 border border-white/15 backdrop-blur-md shadow-sm';
      break;
    case 'outline':
      variantClasses =
        'bg-transparent hover:bg-white/5 text-slate-200 border border-white/20 hover:border-orange-500/50';
      break;
    case 'danger':
      variantClasses =
        'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40';
      break;
    case 'ghost':
      variantClasses =
        'bg-transparent hover:bg-white/10 text-slate-300 hover:text-white border-transparent';
      break;
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
