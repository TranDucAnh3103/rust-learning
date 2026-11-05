import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'elevated' | 'sunken';
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses = 'relative rounded-2xl transition-all duration-200';

  let variantClasses = '';
  switch (variant) {
    case 'interactive':
      variantClasses =
        'bg-[var(--glass-surface)] hover:bg-[var(--glass-surface-hover)] border border-[var(--glass-border)] hover:border-orange-500/40 shadow-glass hover:shadow-glass-hover hover:-translate-y-0.5';
      break;
    case 'elevated':
      variantClasses =
        'bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 shadow-2xl';
      break;
    case 'sunken':
      variantClasses =
        'bg-[#080b12]/90 border border-white/5 shadow-inner';
      break;
    default:
      variantClasses =
        'bg-[var(--glass-surface)] backdrop-blur-md border border-[var(--glass-border)] shadow-glass';
  }

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};
