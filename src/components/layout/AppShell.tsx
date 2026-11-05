import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { SettingsModal } from '@/features/settings/SettingsModal';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080b12] text-[#f8fafc] relative">
      {/* Background ambient lighting gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle upper indigo glow */}
        <div className="absolute -top-[25vw] left-[15vw] w-[50vw] h-[50vw] rounded-full bg-indigo-950/20 blur-[130px]" />
        {/* Warm subtle rust/orange glow */}
        <div className="absolute top-[35vh] right-[-10vw] w-[40vw] h-[40vw] rounded-full bg-orange-950/15 blur-[150px]" />
        {/* Deep bottom slate foundation */}
        <div className="absolute -bottom-[20vw] left-[5vw] w-[45vw] h-[45vw] rounded-full bg-slate-900/30 blur-[140px]" />
      </div>

      {/* Desktop Sidebar */}
      <Sidebar onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 h-full relative z-10">
        <Header
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
        <main className="flex-1 overflow-y-auto min-h-0">
          {children}
        </main>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Global Settings & AI Config Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
