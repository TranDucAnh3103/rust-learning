import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Layers,
  Cpu,
} from 'lucide-react';
import { ALL_LESSON_SUMMARIES } from '@/content/curriculum/tracks';
import { Difficulty } from '@/types';
import { useProgress } from '@/app/providers/ProgressContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';

export const CurriculumLibrary: React.FC = () => {
  const { progress, stats } = useProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | Difficulty>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [sortBy, setSortBy] = useState<'order' | 'difficulty'>('order');

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return ALL_LESSON_SUMMARIES.filter((lesson) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lesson.title.toLowerCase().includes(q) ||
        lesson.description.toLowerCase().includes(q);

      // Difficulty
      const matchesDifficulty =
        difficultyFilter === 'all' || lesson.difficulty === difficultyFilter;

      // Status
      const isCompleted = progress.completedLessons.includes(lesson.slug);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && isCompleted) ||
        (statusFilter === 'incomplete' && !isCompleted);

      return matchesSearch && matchesDifficulty && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'order') return a.order - b.order;
      // sort by difficulty weight
      const weights: Record<Difficulty, number> = { beginner: 1, intermediate: 2, advanced: 3 };
      return weights[a.difficulty] - weights[b.difficulty];
    });
  }, [searchQuery, difficultyFilter, statusFilter, sortBy, progress.completedLessons]);

  const getTrackIcon = (trackId: string) => {
    switch (trackId) {
      case 'track-foundations':
        return <Terminal className="w-4 h-4 text-orange-400" />;
      case 'track-ownership':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'track-idioms':
        return <Layers className="w-4 h-4 text-blue-400" />;
      case 'track-advanced':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-orange-400" />;
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Official Curriculum
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1">
            Rust Learning Library
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            8 comprehensive, production-grade modules covering systems programming from first principles.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Overall Mastery</span>
            <span className="text-base font-bold font-mono text-orange-400 block">
              {stats.completedLessonsCount}/{stats.totalLessonsCount} Lessons
            </span>
          </div>
          <div className="w-24">
            <ProgressBar value={stats.courseCompletionPercent} showPercent={false} size="sm" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons by topic, keyword, or concept..."
            className="w-full bg-[#0f172a] text-xs md:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-white/15 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty filter */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            className="bg-[#0f172a] text-xs text-slate-300 font-medium px-3 py-2 rounded-xl border border-white/15 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-[#0f172a] text-xs text-slate-300 font-medium px-3 py-2 rounded-xl border border-white/15 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed Only</option>
            <option value="incomplete">Incomplete Only</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0f172a] text-xs text-slate-300 font-medium px-3 py-2 rounded-xl border border-white/15 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
          >
            <option value="order">Curriculum Order</option>
            <option value="difficulty">Difficulty Order</option>
          </select>
        </div>
      </div>

      {/* Grid of Lesson Cards */}
      {filteredLessons.length === 0 ? (
        <GlassCard className="p-8 text-center border-white/10 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-semibold text-slate-200">No lessons matched your filter</h3>
          <p className="text-xs text-slate-400">Try clearing your search query or adjusting the difficulty filter.</p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredLessons.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.slug);
            const quizRecord = progress.quizAttempts[lesson.slug];

            return (
              <GlassCard
                key={lesson.id}
                variant="interactive"
                className="p-6 border-white/10 flex flex-col justify-between group"
              >
                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {getTrackIcon(lesson.trackId)}
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                        Lesson {lesson.order}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="difficulty" difficulty={lesson.difficulty}>
                        {lesson.difficulty}
                      </Badge>
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                {/* Card Footer with Time & CTA */}
                <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.estimatedMinutes} mins
                    </span>
                    {quizRecord && (
                      <span className="text-emerald-400 font-mono font-medium">
                        Quiz: {quizRecord.bestScore}%
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/learn/${lesson.slug}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
