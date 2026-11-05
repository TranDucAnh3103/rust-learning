import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'rust' | 'emerald' | 'amber' | 'blue';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercent = true,
  size = 'md',
  color = 'rust',
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  const colorGradients = {
    rust: 'from-orange-500 to-amber-500',
    emerald: 'from-emerald-500 to-teal-400',
    amber: 'from-amber-500 to-yellow-400',
    blue: 'from-blue-500 to-cyan-400',
  }[color];

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
          {label && <span>{label}</span>}
          {showPercent && <span className="font-mono">{clamped}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/10 ${heightClasses}`}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorGradients} transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
