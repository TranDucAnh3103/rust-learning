import React from 'react';
import { Menu, Settings, Award, BookOpen, Flame } from 'lucide-react';
import { useProgress } from '@/app/providers/ProgressContext';
import { useLocation, Link } from 'react-router-dom';

interface HeaderProps {
  onOpenMobileNav: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav, onOpenSettings }) => {
  const { stats } = useProgress();
  const location = useLocation();

  // Generate dynamic title & breadcrumb based on current path
  const path = location.pathname;
  let pageTitle = 'Dashboard';
  let category = 'Overview';

  if (path.startsWith('/learn/')) {
    pageTitle = 'Lesson Reader';
    category = 'Curriculum';
  } else if (path === '/learn') {
    pageTitle = 'Rust Curriculum';
    category = 'Learning Tracks';
  } else if (path === '/playground') {
    pageTitle = 'Interactive Rust Playground';
    category = 'Developer Workspace';
  } else if (path === '/exam') {
    pageTitle = 'Certification Examination';
    category = 'Assessment';
  } else if (path === '/results') {
    pageTitle = 'Exam Results & Analytics';
    category = 'Assessment';
  } else if (path === '/certificate') {
    pageTitle = 'Digital Certificate';
    category = 'Credentials';
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-[#080b12]/80 backdrop-blur-xl border-b border-white/10 no-print">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 md:hidden transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-glow-rust">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-100 text-base">RustForge</span>
          </Link>

          <div className="hidden md:block">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <span>RustForge</span>
              <span>/</span>
              <span className="text-orange-400">{category}</span>
            </div>
            <h1 className="text-sm font-semibold text-slate-100">{pageTitle}</h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Real learning progress metric pill */}
        <Link
          to="/learn"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-colors"
          title="Overall curriculum completion"
        >
          <BookOpen className="w-3.5 h-3.5 text-orange-400" />
          <span>Curriculum:</span>
          <span className="font-semibold text-orange-400 font-mono">
            {stats.completedLessonsCount}/{stats.totalLessonsCount} ({stats.courseCompletionPercent}%)
          </span>
        </Link>

        {stats.hasPassedExam && (
          <Link
            to="/certificate"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 transition-colors"
            title="View your unlocked certificate"
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xs:inline">Certified</span>
          </Link>
        )}

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors text-xs font-medium"
          title="Open platform and AI settings"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </header>
  );
};
