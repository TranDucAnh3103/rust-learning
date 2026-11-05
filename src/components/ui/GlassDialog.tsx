import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { GlassCard } from './GlassCard';

export interface GlassDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const GlassDialog: React.FC<GlassDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }[maxWidth];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidthClasses} transform transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard variant="elevated" className="border-white/20 p-6 shadow-2xl">
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <h3 id="dialog-title" className="text-lg font-bold text-slate-100">
                {title}
              </h3>
              {description && (
                <p className="mt-1 text-sm text-slate-400">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 text-slate-200">{children}</div>

          {footer && (
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              {footer}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};
