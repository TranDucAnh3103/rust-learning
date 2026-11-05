import React from 'react';
import { ProgressProvider } from './providers/ProgressContext';
import { ToastProvider } from '@/components/ui/Toast';
import { AppRouter } from './router';

export const App: React.FC = () => {
  return (
    <ProgressProvider>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </ProgressProvider>
  );
};
