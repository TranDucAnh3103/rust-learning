import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  BookOpen,
  Code2,
  FileCheck2,
  Award,
  Terminal,
  ShieldCheck,
  Layers,
  Cpu,
} from 'lucide-react';
import { useProgress } from '@/app/providers/ProgressContext';
import { CURRICULUM_TRACKS, ALL_LESSON_SUMMARIES } from '@/content/curriculum/tracks';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

export const DashboardOverview: React.FC = () => {
  const { stats, progress } = useProgress();

  // Find the most recently accessed or next incomplete lesson
  const resumeLessonSlug =
    progress.lastVisitedLesson ||
    ALL_LESSON_SUMMARIES.find((l) => !progress.completedLessons.includes(l.slug))?.slug ||
    ALL_LESSON_SUMMARIES[0].slug;

  const resumeLesson = ALL_LESSON_SUMMARIES.find((l) => l.slug === resumeLessonSlug) || ALL_LESSON_SUMMARIES[0];

  // Helper for Track icons
  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-orange-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-10">
      {/* 1. Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-950/30 via-[#0f172a] to-[#080b12] border border-orange-500/20 p-6 md:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide">
            <Flame className="w-3.5 h-3.5" />
            <span>Interactive Systems Education</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Master Rust. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              Understand the System.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
            A production-quality platform for learning modern Rust. Dive into memory layout, ownership semantics, borrow checker constraints, and high-concurrency architecture.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to={`/learn/${resumeLesson.slug}`}>
              <GlassButton variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {progress.completedLessons.length > 0 ? 'Continue Learning' : 'Start Curriculum'}
              </GlassButton>
            </Link>

            <Link to="/learn">
              <GlassButton variant="outline" size="lg">
                Explore All 8 Modules
              </GlassButton>
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Real Metrics Overview (Derived directly from local progress) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-5 border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
            Lessons Completed
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">
              {stats.completedLessonsCount}
            </span>
            <span className="text-xs text-slate-500">/ {stats.totalLessonsCount}</span>
          </div>
          <ProgressBar value={stats.courseCompletionPercent} showPercent={false} size="sm" color="rust" />
        </GlassCard>

        <GlassCard className="p-5 border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
            Quizzes Passed
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono">
              {stats.quizzesPassedCount}
            </span>
            <span className="text-xs text-slate-500">/ 8</span>
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Immediate conceptual feedback
          </span>
        </GlassCard>

        <GlassCard className="p-5 border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
            Exercises Solved
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono">
              {stats.completedExercisesCount}
            </span>
            <span className="text-xs text-slate-500">/ {stats.totalExercisesCount}</span>
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Heuristic rule verified
          </span>
        </GlassCard>

        <GlassCard className="p-5 border-white/10 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
            Certification Exam
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">
              {stats.latestExamAttempt ? `${stats.latestExamAttempt.percentage}%` : '—'}
            </span>
            {stats.hasPassedExam && (
              <span className="text-xs text-emerald-400 font-semibold font-mono">PASSED</span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            {stats.hasPassedExam ? 'Credential Unlocked' : '30 Questions Timed'}
          </span>
        </GlassCard>
      </div>

      {/* 3. Continue Learning Spotlight */}
      <GlassCard variant="elevated" className="p-6 md:p-8 border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Continue Learning
            </span>
            <Badge variant="difficulty" difficulty={resumeLesson.difficulty}>
              {resumeLesson.difficulty}
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-white">
            {resumeLesson.title}
          </h3>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {resumeLesson.description}
          </p>
        </div>

        <Link to={`/learn/${resumeLesson.slug}`} className="shrink-0">
          <GlassButton variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Resume Lesson
          </GlassButton>
        </Link>
      </GlassCard>

      {/* 4. Curriculum Tracks Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white">Curriculum Tracks</h2>
            <p className="text-xs text-slate-400">Structured progression from basics to concurrent systems.</p>
          </div>
          <Link to="/learn" className="text-xs font-semibold text-orange-400 hover:text-orange-300">
            View All Lessons →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CURRICULUM_TRACKS.map((track) => {
            const completedInTrack = track.lessons.filter((l) =>
              progress.completedLessons.includes(l.slug)
            ).length;
            const percent = Math.round((completedInTrack / track.lessons.length) * 100);

            return (
              <GlassCard
                key={track.id}
                variant="interactive"
                className="p-6 border-white/10 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      {getTrackIcon(track.iconName)}
                    </div>
                    <Badge variant="difficulty" difficulty={track.difficulty}>
                      {track.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{track.title}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {track.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">
                      {completedInTrack} of {track.lessons.length} Completed
                    </span>
                    <span className="font-mono text-orange-400 font-bold">{percent}%</span>
                  </div>
                  <ProgressBar value={percent} showPercent={false} size="sm" color="rust" />

                  <div className="pt-2 flex justify-end">
                    <Link
                      to={`/learn/${track.lessons[0].slug}`}
                      className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                    >
                      <span>Explore Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* 5. Quick Actions Hub */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-white">Platform Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/playground">
            <GlassCard variant="interactive" className="p-5 border-white/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Interactive Playground</h4>
                <p className="text-xs text-slate-400">CodeMirror 6 + Static Heuristic Checks</p>
              </div>
            </GlassCard>
          </Link>

          <Link to="/exam">
            <GlassCard variant="interactive" className="p-5 border-white/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Certification Exam</h4>
                <p className="text-xs text-slate-400">30 Questions, 40-Min Countdown</p>
              </div>
            </GlassCard>
          </Link>

          <Link to={stats.hasPassedExam ? '/certificate' : '/results'}>
            <GlassCard variant="interactive" className="p-5 border-white/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Digital Certificate</h4>
                <p className="text-xs text-slate-400">Printable A4 / PDF Export</p>
              </div>
            </GlassCard>
          </Link>
        </div>
      </div>
    </div>
  );
};
