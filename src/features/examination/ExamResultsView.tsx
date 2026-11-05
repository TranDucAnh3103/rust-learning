import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Calendar,
} from 'lucide-react';
import { useProgress } from '@/app/providers/ProgressContext';
import { CERTIFICATION_EXAM_QUESTIONS } from '@/content/questions/certificationExam';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

export const ExamResultsView: React.FC = () => {
  const { stats, progress } = useProgress();
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const attempts = progress.examHistory;

  if (attempts.length === 0) {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto my-12 text-center">
        <GlassCard variant="elevated" className="p-8 border-white/15 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-white/5 flex items-center justify-center text-slate-400">
            <BarChart3 className="w-7 h-7 text-orange-400" />
          </div>
          <h2 className="text-xl font-bold text-white">No Examination History</h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            You haven't completed any certification attempts yet. Complete the 30-question certification exam to view your score breakdown.
          </p>
          <div className="pt-2">
            <Link to="/exam">
              <GlassButton variant="primary" size="md">
                Start Certification Exam
              </GlassButton>
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Active attempt to display (latest or selected from history)
  const activeAttempt =
    (selectedAttemptId && attempts.find((a) => a.id === selectedAttemptId)) ||
    attempts[0];

  const minutes = Math.floor(activeAttempt.timeSpentSeconds / 60);
  const seconds = activeAttempt.timeSpentSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  const incorrectCount = activeAttempt.totalQuestions - activeAttempt.score;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Top Banner: Score & Pass/Fail Status */}
      <GlassCard
        variant="elevated"
        className={`p-6 md:p-8 border-2 shadow-2xl ${
          activeAttempt.passed
            ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-transparent'
            : 'border-amber-500/40 bg-gradient-to-b from-amber-950/20 to-transparent'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                activeAttempt.passed
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
              }`}
            >
              {activeAttempt.passed ? (
                <CheckCircle2 className="w-9 h-9" />
              ) : (
                <XCircle className="w-9 h-9" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Examination Result
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(activeAttempt.submittedAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-0.5">
                {activeAttempt.passed ? 'Certification Achieved!' : 'Passing Threshold Not Met'}
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1">
                {activeAttempt.passed
                  ? 'Congratulations! You have satisfied the 75% passing requirement for Rust systems programming.'
                  : 'Minimum passing mark is 75% (23/30). Review your category breakdown below and retry.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center md:text-right">
              <span className="text-3xl md:text-4xl font-extrabold font-mono text-white block">
                {activeAttempt.percentage}%
              </span>
              <span className="text-xs font-semibold text-slate-400 block">
                {activeAttempt.score} / {activeAttempt.totalQuestions} Correct
              </span>
            </div>

            {activeAttempt.passed ? (
              <Link to="/certificate">
                <GlassButton
                  variant="primary"
                  size="md"
                  leftIcon={<Award className="w-4 h-4" />}
                >
                  View Certificate
                </GlassButton>
              </Link>
            ) : (
              <Link to="/exam">
                <GlassButton
                  variant="primary"
                  size="md"
                  leftIcon={<RotateCcw className="w-4 h-4" />}
                >
                  Retake Exam
                </GlassButton>
              </Link>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard className="p-4 border-white/10">
          <span className="text-xs text-slate-400 block">Correct Answers</span>
          <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
            {activeAttempt.score}
          </span>
          <span className="text-[11px] text-slate-500">Points earned</span>
        </GlassCard>

        <GlassCard className="p-4 border-white/10">
          <span className="text-xs text-slate-400 block">Incorrect / Missed</span>
          <span className="text-2xl font-bold font-mono text-rose-400 mt-1 block">
            {incorrectCount}
          </span>
          <span className="text-[11px] text-slate-500">Needs review</span>
        </GlassCard>

        <GlassCard className="p-4 border-white/10">
          <span className="text-xs text-slate-400 block">Time Consumed</span>
          <span className="text-2xl font-bold font-mono text-white mt-1 block">
            {timeFormatted}
          </span>
          <span className="text-[11px] text-slate-500">Out of 40m</span>
        </GlassCard>

        <GlassCard className="p-4 border-white/10">
          <span className="text-xs text-slate-400 block">Best Recorded</span>
          <span className="text-2xl font-bold font-mono text-orange-400 mt-1 block">
            {stats.bestExamAttempt?.percentage ?? activeAttempt.percentage}%
          </span>
          <span className="text-[11px] text-slate-500">
            {stats.bestExamAttempt?.score ?? activeAttempt.score}/30 Points
          </span>
        </GlassCard>
      </div>

      {/* Category Performance Breakdown */}
      <GlassCard variant="elevated" className="p-6 md:p-8 border-white/15 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-400" />
          <span>Category Performance Breakdown</span>
        </h3>
        <p className="text-xs text-slate-400">
          Targeted analysis across core Rust disciplines:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {activeAttempt.categoryBreakdown.map((cat) => (
            <div key={cat.category} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{cat.category}</span>
                <span className="font-mono text-slate-400">
                  {cat.correct} / {cat.total} ({cat.percentage}%)
                </span>
              </div>
              <ProgressBar
                value={cat.percentage}
                showPercent={false}
                size="sm"
                color={cat.percentage >= 75 ? 'emerald' : 'amber'}
              />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Historical Attempts Selector */}
      {attempts.length > 1 && (
        <GlassCard className="p-4 border-white/10 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-300">
            Select Past Attempt to Review:
          </span>
          <div className="flex flex-wrap gap-2">
            {attempts.map((att, idx) => (
              <button
                key={att.id}
                onClick={() => setSelectedAttemptId(att.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all ${
                  att.id === activeAttempt.id
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300 ring-1 ring-orange-500/30'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                Attempt #{attempts.length - idx} ({att.percentage}%)
              </button>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Question-By-Question Detailed Review */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Question-by-Question Pedagogic Review</h3>
          <span className="text-xs text-slate-400">Click any question to inspect explanation</span>
        </div>

        <div className="space-y-3">
          {CERTIFICATION_EXAM_QUESTIONS.map((q, idx) => {
            const userAnswer = activeAttempt.answers[q.id];
            const isCorrect = userAnswer === q.correctOptionId;
            const isExpanded = expandedQuestionId === q.id;

            return (
              <GlassCard
                key={q.id}
                className={`p-4 md:p-5 border transition-all cursor-pointer ${
                  isCorrect
                    ? 'border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-950/5'
                    : 'border-rose-500/20 hover:border-rose-500/40 bg-rose-950/5'
                }`}
                onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          Q{idx + 1}.
                        </span>
                        <Badge color="slate">{q.category}</Badge>
                        <span
                          className={`text-xs font-semibold ${
                            isCorrect ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isCorrect ? 'Correct (+1 pt)' : 'Incorrect (0 pt)'}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-100">{q.question}</p>
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-white p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Answer Analysis */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs animate-fade-in">
                    {q.codeSnippet && (
                      <pre className="p-3 rounded-lg bg-[#0a0e17] text-slate-200 font-mono overflow-x-auto border border-white/10">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    )}

                    <div className="space-y-1.5">
                      <p className="font-semibold text-slate-400">Options:</p>
                      {q.options.map((opt) => {
                        const isUserChoice = userAnswer === opt.id;
                        const isCorrectOption = q.correctOptionId === opt.id;

                        let rowStyle = 'text-slate-400 border-transparent';
                        if (isCorrectOption) {
                          rowStyle = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-semibold';
                        } else if (isUserChoice && !isCorrectOption) {
                          rowStyle = 'bg-rose-500/10 border-rose-500/30 text-rose-300 font-semibold';
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-lg border flex items-center justify-between ${rowStyle}`}
                          >
                            <span>
                              <strong>{opt.id.toUpperCase()}.</strong> {opt.text}
                            </span>
                            {isCorrectOption && (
                              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                                Correct Answer
                              </span>
                            )}
                            {isUserChoice && !isCorrectOption && (
                              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                                Your Selection
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 space-y-1">
                      <strong className="text-orange-400 block">Explanation:</strong>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};
