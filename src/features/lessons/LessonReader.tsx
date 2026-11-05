import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Code2,
  Check,
  Award,
  ArrowRight,
} from 'lucide-react';
import { LESSONS } from '@/content/curriculum/lessons';
import { ALL_LESSON_SUMMARIES, CURRICULUM_TRACKS } from '@/content/curriculum/tracks';
import { MarkdownRenderer } from './MarkdownRenderer';
import { LessonQuizCard } from '@/features/quizzes/LessonQuizCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/Badge';
import { useProgress } from '@/app/providers/ProgressContext';
import { useToast } from '@/components/ui/Toast';

export const LessonReader: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { progress, markLessonComplete, setLastVisitedLesson } = useProgress();
  const toast = useToast();

  const lesson = slug ? LESSONS[slug] : null;

  // Track last visited lesson
  useEffect(() => {
    if (slug && lesson) {
      setLastVisitedLesson(slug);
    }
  }, [slug, lesson, setLastVisitedLesson]);

  if (!lesson) {
    return (
      <div className="p-8 max-w-xl mx-auto my-12 text-center">
        <GlassCard className="p-8 border-white/10 space-y-4">
          <h2 className="text-xl font-bold text-white">Lesson Not Found</h2>
          <p className="text-sm text-slate-400">
            The requested curriculum lesson does not exist or may have been moved.
          </p>
          <Link to="/learn">
            <GlassButton variant="primary">Return to Curriculum</GlassButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  // Find previous and next lessons
  const currentIndex = ALL_LESSON_SUMMARIES.findIndex((l) => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? ALL_LESSON_SUMMARIES[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < ALL_LESSON_SUMMARIES.length - 1
      ? ALL_LESSON_SUMMARIES[currentIndex + 1]
      : null;

  const isCompleted = progress.completedLessons.includes(lesson.slug);

  const handleToggleComplete = () => {
    markLessonComplete(lesson.slug);
    toast.success('Progress Saved', `Marked "${lesson.title}" as completed!`);
  };

  const handleOpenExercise = () => {
    sessionStorage.setItem('rustforge_playground_selected_exercise', lesson.interactiveExercise.id);
    navigate('/playground');
  };

  return (
    <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Curriculum Track Navigator (Desktop only) */}
        <aside className="hidden xl:block xl:col-span-3 sticky top-20 space-y-4">
          <div className="p-4 rounded-2xl bg-[#0f172a]/80 border border-white/10 shadow-lg space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Curriculum Modules
            </h3>
            <div className="space-y-4">
              {CURRICULUM_TRACKS.map((track) => (
                <div key={track.id} className="space-y-1">
                  <span className="text-[11px] font-semibold text-orange-400/90 block px-2">
                    {track.title}
                  </span>
                  <div className="space-y-0.5">
                    {track.lessons.map((l) => {
                      const isActive = l.slug === lesson.slug;
                      const done = progress.completedLessons.includes(l.slug);
                      return (
                        <Link
                          key={l.slug}
                          to={`/learn/${l.slug}`}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                            isActive
                              ? 'bg-orange-500/20 text-orange-300 font-bold border border-orange-500/40'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                          }`}
                        >
                          <span className="font-mono text-[10px] w-4">{l.order}.</span>
                          <span className="flex-1 truncate">{l.title.replace(/^\d+\.\s*/, '')}</span>
                          {done && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Column: Main Lesson Body */}
        <div className="lg:col-span-8 xl:col-span-6 space-y-8">
          {/* Breadcrumb & Metadata Header */}
          <div className="space-y-3 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Link to="/learn" className="text-xs font-semibold text-orange-400 hover:underline">
                Curriculum
              </Link>
              <span className="text-xs text-slate-500">/</span>
              <span className="text-xs text-slate-400">Module {lesson.order}</span>
              <span className="text-xs text-slate-500">•</span>
              <Badge variant="difficulty" difficulty={lesson.difficulty}>
                {lesson.difficulty}
              </Badge>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              {lesson.title}
            </h1>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              {lesson.description}
            </p>
          </div>

          {/* Learning Objectives Box */}
          <GlassCard variant="elevated" className="p-5 border-white/15 space-y-3 bg-gradient-to-r from-orange-950/10 to-transparent">
            <h3 className="text-sm font-bold text-orange-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Learning Objectives</span>
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-slate-200">
              {lesson.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Main Markdown Lesson Text & Code Blocks */}
          <MarkdownRenderer content={lesson.markdownContent} />

          {/* Interactive Coding Exercise Callout */}
          <GlassCard
            id="interactive-exercise"
            variant="elevated"
            className="p-6 border-orange-500/30 bg-gradient-to-b from-orange-950/20 to-transparent space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                  Interactive Exercise
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {lesson.interactiveExercise.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
                  {lesson.interactiveExercise.instructions}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/40">
                <Code2 className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-mono">
                {progress.completedExercises.includes(lesson.interactiveExercise.id)
                  ? '✓ Exercise completed'
                  : 'Pending verification'}
              </span>

              <GlassButton
                variant="primary"
                size="sm"
                onClick={handleOpenExercise}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Open in Playground
              </GlassButton>
            </div>
          </GlassCard>

          {/* Lesson Quiz Component */}
          <div id="lesson-quiz">
            <LessonQuizCard lessonId={lesson.slug} quizzes={lesson.quizzes} onComplete={handleToggleComplete} />
          </div>

          {/* References & Documentation */}
          <GlassCard className="p-5 border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-slate-200">Official Rust References</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {lesson.documentationLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <span className="truncate">{link.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-orange-400 shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </GlassCard>

          {/* Mark Complete & Footer Navigation */}
          <div className="pt-6 border-t border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Finished reading and practicing?
              </span>
              <GlassButton
                variant={isCompleted ? 'outline' : 'primary'}
                size="md"
                onClick={handleToggleComplete}
                leftIcon={isCompleted ? <Check className="w-4 h-4 text-emerald-400" /> : undefined}
              >
                {isCompleted ? 'Lesson Completed' : 'Mark as Complete'}
              </GlassButton>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              {prevLesson ? (
                <Link to={`/learn/${prevLesson.slug}`}>
                  <GlassButton variant="secondary" size="sm" leftIcon={<ChevronLeft className="w-4 h-4" />}>
                    <span className="hidden sm:inline">Previous:</span> {prevLesson.title.replace(/^\d+\.\s*/, '')}
                  </GlassButton>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link to={`/learn/${nextLesson.slug}`}>
                  <GlassButton variant="primary" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                    <span className="hidden sm:inline">Next:</span> {nextLesson.title.replace(/^\d+\.\s*/, '')}
                  </GlassButton>
                </Link>
              ) : (
                <Link to="/exam">
                  <GlassButton variant="primary" size="sm" rightIcon={<Award className="w-4 h-4" />}>
                    Take Certification Exam
                  </GlassButton>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: "On This Page" Table of Contents */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-20 space-y-4">
          <GlassCard className="p-4 border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              On This Page
            </h4>
            <nav className="space-y-1.5 text-xs">
              <a
                href="#interactive-exercise"
                className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors py-1"
              >
                <Code2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Coding Exercise</span>
              </a>
              <a
                href="#lesson-quiz"
                className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors py-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Lesson Quiz ({lesson.quizzes.length} Questions)</span>
              </a>
            </nav>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Lesson Status</span>
                <span className={isCompleted ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                  {isCompleted ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Estimated Time</span>
                <span className="font-mono text-slate-300">{lesson.estimatedMinutes} mins</span>
              </div>
            </div>
          </GlassCard>
        </aside>
      </div>
    </div>
  );
};
