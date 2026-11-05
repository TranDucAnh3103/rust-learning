import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setToasts((prev) => [...prev, { id, type, title, description }]);

      setTimeout(() => {
        removeToast(id);
      }, 4500);
    },
    [removeToast]
  );

  const success = useCallback((title: string, description?: string) => showToast({ type: 'success', title, description }), [showToast]);
  const error = useCallback((title: string, description?: string) => showToast({ type: 'error', title, description }), [showToast]);
  const info = useCallback((title: string, description?: string) => showToast({ type: 'info', title, description }), [showToast]);
  const warning = useCallback((title: string, description?: string) => showToast({ type: 'warning', title, description }), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          let borderCol = 'border-white/10';
          let icon = <Info className="w-5 h-5 text-blue-400" />;
          if (t.type === 'success') {
            borderCol = 'border-emerald-500/40';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
          } else if (t.type === 'error') {
            borderCol = 'border-rose-500/40';
            icon = <AlertCircle className="w-5 h-5 text-rose-400" />;
          } else if (t.type === 'warning') {
            borderCol = 'border-amber-500/40';
            icon = <AlertTriangle className="w-5 h-5 text-amber-400" />;
          }

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#0f172a]/95 backdrop-blur-xl border ${borderCol} shadow-2xl transition-all animate-slide-up`}
            >
              <div className="shrink-0 mt-0.5">{icon}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-100">{t.title}</p>
                {t.description && <p className="text-xs text-slate-300 mt-0.5">{t.description}</p>}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
