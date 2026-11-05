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
  ChevronRight,
} from 'lucide-react';
import { useProgress } from '@/app/providers/ProgressContext';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface SidebarProps {
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenSettings }) => {
  const { stats, progress } = useProgress();

  const navItems = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard },
    { label: 'Curriculum', to: '/learn', icon: BookOpen },
    { label: 'Playground', to: '/playground', icon: Code2 },
    { label: 'Certification Exam', to: '/exam', icon: FileCheck2 },
    { label: 'Exam Results', to: '/results', icon: BarChart3 },
    { label: 'Certificate', to: '/certificate', icon: Award },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-[#080b12]/95 border-r border-white/10 h-screen sticky top-0 select-none z-40 no-print">
      {/* Brand logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-glow-rust">
          <Flame className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-base font-extrabold tracking-tight text-white block">
            RustForge
          </span>
          <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest block -mt-0.5">
            Systems Platform
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.to === '/certificate' && stats.hasPassedExam && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Progress Card */}
      <div className="p-3 m-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
          <span>Course Progress</span>
          <span className="text-orange-400 font-mono">{stats.courseCompletionPercent}%</span>
        </div>
        <ProgressBar
          value={stats.courseCompletionPercent}
          showPercent={false}
          size="sm"
          color="rust"
        />
        <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-400">
          <span>
            {stats.completedLessonsCount} of {stats.totalLessonsCount} Lessons
          </span>
          {progress.lastVisitedLesson && (
            <NavLink
              to={`/learn/${progress.lastVisitedLesson}`}
              className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center"
            >
              Resume <ChevronRight className="w-3 h-3" />
            </NavLink>
          )}
        </div>
      </div>

      {/* Settings Footer action */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={onOpenSettings}
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Settings & Keys</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500">v1.0</span>
        </button>
      </div>
    </aside>
  );
};
