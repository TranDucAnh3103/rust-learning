import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Loader2 } from 'lucide-react';

const DashboardOverview = lazy(() =>
  import('@/features/dashboard/DashboardOverview').then((m) => ({ default: m.DashboardOverview }))
);
const CurriculumLibrary = lazy(() =>
  import('@/features/curriculum/CurriculumLibrary').then((m) => ({ default: m.CurriculumLibrary }))
);
const LessonReader = lazy(() =>
  import('@/features/lessons/LessonReader').then((m) => ({ default: m.LessonReader }))
);
const PlaygroundWorkspace = lazy(() =>
  import('@/features/playground/PlaygroundWorkspace').then((m) => ({ default: m.PlaygroundWorkspace }))
);
const ExamWorkspace = lazy(() =>
  import('@/features/examination/ExamWorkspace').then((m) => ({ default: m.ExamWorkspace }))
);
const ExamResultsView = lazy(() =>
  import('@/features/examination/ExamResultsView').then((m) => ({ default: m.ExamResultsView }))
);
const CertificateView = lazy(() =>
  import('@/features/certificates/CertificateView').then((m) => ({ default: m.CertificateView }))
);

const PageLoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-slate-400">
    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
    <span className="text-xs font-mono uppercase tracking-wider">Loading Module...</span>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <AppShell>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/learn" element={<CurriculumLibrary />} />
            <Route path="/learn/:slug" element={<LessonReader />} />
            <Route path="/playground" element={<PlaygroundWorkspace />} />
            <Route path="/exam" element={<ExamWorkspace />} />
            <Route path="/results" element={<ExamResultsView />} />
            <Route path="/certificate" element={<CertificateView />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppShell>
    </HashRouter>
  );
};
