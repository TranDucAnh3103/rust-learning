import React from 'react';

export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && <div className="absolute left-3 text-slate-400 pointer-events-none">{leftIcon}</div>}
        <input
          id={inputId}
          className={`w-full bg-[#0f172a]/80 text-slate-100 placeholder-slate-500 rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-150 backdrop-blur-md focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-500/60 focus:ring-rose-500/30'
              : 'border-white/15 hover:border-white/25 focus:border-orange-500/60 focus:ring-orange-500/20'
          } ${leftIcon ? 'pl-9' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1.5 text-xs text-slate-400">{helperText}</p>}
    </div>
  );
};
