import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  FileCheck2,
  BarChart3,
  Award,
  Settings,
  Flame,
  X,
} from 'lucide-react';
import { useProgress } from '@/app/providers/ProgressContext';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
}) => {
  const { stats } = useProgress();

  if (!isOpen) return null;

  const navItems = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard },
    { label: 'Curriculum', to: '/learn', icon: BookOpen },
    { label: 'Playground', to: '/playground', icon: Code2 },
    { label: 'Certification Exam', to: '/exam', icon: FileCheck2 },
    { label: 'Exam Results', to: '/results', icon: BarChart3 },
    { label: 'Certificate', to: '/certificate', icon: Award },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex md:hidden bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-72 max-w-[85vw] h-full bg-[#080b12] border-r border-white/10 flex flex-col p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-glow-rust">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-base">RustForge</span>
              <span className="text-[10px] text-orange-400 block -mt-0.5">Static Systems Hub</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 font-semibold'
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-3">
          <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1.5">
            <span>Progress</span>
            <span className="text-orange-400">{stats.courseCompletionPercent}%</span>
          </div>
          <ProgressBar value={stats.courseCompletionPercent} showPercent={false} size="sm" />
        </div>

        <button
          onClick={() => {
            onClose();
            onOpenSettings();
          }}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl border border-white/10 transition-colors"
        >
          <Settings className="w-4 h-4 text-orange-400" />
          <span>Platform Settings & API Keys</span>
        </button>
      </div>
    </div>
  );
};
