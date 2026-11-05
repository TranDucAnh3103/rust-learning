import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Send,
  ShieldAlert,
} from 'lucide-react';
import { CERTIFICATION_EXAM_QUESTIONS } from '@/content/questions/certificationExam';
import { ActiveExamSession } from '@/types';
import {
  loadActiveExamSession,
  saveActiveExamSession,
  createNewExamSession,
  clearActiveExamSession,
  scoreExamAttempt,
} from '@/lib/assessment/examScorer';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassDialog } from '@/components/ui/GlassDialog';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgress } from '@/app/providers/ProgressContext';
import { useToast } from '@/components/ui/Toast';

export const ExamWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const { recordExamAttempt } = useProgress();
  const toast = useToast();

  // Active exam session state
  const [session, setSession] = useState<ActiveExamSession | null>(() => loadActiveExamSession());
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    const s = loadActiveExamSession();
    if (!s) return 2400; // 40 minutes
    const now = Date.now();
    return Math.max(0, Math.floor((s.deadlineTimestamp - now) / 1000));
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(!session);

  // Auto-submit guard ref
  const isSubmittingRef = useRef(false);

  // Timer loop based on absolute deadline timestamp
  useEffect(() => {
    if (!session) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const left = Math.max(0, Math.floor((session.deadlineTimestamp - now) / 1000));
      setRemainingSeconds(left);

      if (left <= 0 && !isSubmittingRef.current) {
        clearInterval(interval);
        handleAutoSubmit();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  const handleStartNewExam = (durationMinutes: number = 40) => {
    const newSession = createNewExamSession(durationMinutes);
    setSession(newSession);
    const now = Date.now();
    setRemainingSeconds(Math.max(0, Math.floor((newSession.deadlineTimestamp - now) / 1000)));
    setShowStartModal(false);
    toast.info('Exam Started', `Timer initiated for ${durationMinutes} minutes. Good luck!`);
  };

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    if (!session) return;
    const updated = {
      ...session,
      answers: {
        ...session.answers,
        [questionId]: optionId,
      },
    };
    setSession(updated);
    saveActiveExamSession(updated);
  };

  const handleToggleFlag = (questionId: string) => {
    if (!session) return;
    const isFlagged = !session.flaggedQuestions[questionId];
    const updated = {
      ...session,
      flaggedQuestions: {
        ...session.flaggedQuestions,
        [questionId]: isFlagged,
      },
    };
    setSession(updated);
    saveActiveExamSession(updated);
  };

  const handleNavigateQuestion = (index: number) => {
    if (!session) return;
    const clamped = Math.max(0, Math.min(CERTIFICATION_EXAM_QUESTIONS.length - 1, index));
    const updated = { ...session, currentQuestionIndex: clamped };
    setSession(updated);
    saveActiveExamSession(updated);
  };

  const finalizeSubmission = () => {
    if (!session || isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const timeSpent = Math.max(0, Math.floor((Date.now() - session.startedAt) / 1000));
    const result = scoreExamAttempt(
      session.answers,
      new Date(session.startedAt).toISOString(),
      timeSpent
    );

    recordExamAttempt(result);
    clearActiveExamSession();
    setShowSubmitModal(false);

    toast.success('Exam Submitted', `Your score: ${result.score}/30 (${result.percentage}%).`);
    navigate('/results');
  };

  const handleAutoSubmit = () => {
    toast.warning('Time Expired', 'Exam time has expired. Submitting your current answers...');
    finalizeSubmission();
  };

  if (!session || showStartModal) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto my-12">
        <GlassCard variant="elevated" className="p-6 md:p-10 border-white/20 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-glow-rust">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              Standardized Assessment
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              RustForge Certification Examination
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
              Verify your mastery of Rust systems programming, memory safety, ownership, traits, smart pointers, and concurrency.
            </p>
          </div>

          {/* Exam specifications grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-slate-400 block">Questions</span>
              <span className="text-lg font-bold text-white font-mono">30 Items</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-slate-400 block">Duration</span>
              <span className="text-lg font-bold text-white font-mono">40 Minutes</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-slate-400 block">Passing Mark</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">75% (23/30)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-slate-400 block">Credential</span>
              <span className="text-lg font-bold text-orange-400">Certificate</span>
            </div>
          </div>

          {/* Trust disclosure */}
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-400 text-left flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Assessment Notice:</strong> This examination operates client-side in your browser. Timer state and answers persist across page reloads. Certificates issued upon passing represent self-assessed RustForge milestones.
            </p>
          </div>

          <div className="pt-2">
            <GlassButton
              variant="primary"
              size="lg"
              onClick={() => handleStartNewExam(40)}
              className="w-full sm:w-auto px-8"
            >
              Begin Certification Exam
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Timer formatted strings
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeCritical = remainingSeconds < 300; // under 5 minutes

  // Active question
  const currentIdx = session.currentQuestionIndex;
  const currentQuestion = CERTIFICATION_EXAM_QUESTIONS[currentIdx];
  const selectedOption = session.answers[currentQuestion.id];
  const isFlagged = Boolean(session.flaggedQuestions[currentQuestion.id]);

  // Statistics
  const answeredCount = Object.values(session.answers).filter(Boolean).length;
  const unansweredCount = CERTIFICATION_EXAM_QUESTIONS.length - answeredCount;
  const progressPercent = Math.round((answeredCount / CERTIFICATION_EXAM_QUESTIONS.length) * 100);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Exam Header: Timer & Status Bar */}
      <GlassCard variant="elevated" className="p-4 md:p-5 border-white/20 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block">
            RustForge Certification Exam
          </span>
          <span className="text-sm font-semibold text-white">
            Question {currentIdx + 1} of {CERTIFICATION_EXAM_QUESTIONS.length}
          </span>
        </div>

        {/* Center: Live Countdown Timer */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-base transition-colors ${
            isTimeCritical
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
              : 'bg-white/5 text-slate-100 border-white/10'
          }`}
          title="Remaining exam time"
        >
          <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-400' : 'text-orange-400'}`} />
          <span>{timeFormatted}</span>
        </div>

        {/* Right: Progress & Finish Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <span className="text-xs text-slate-400 block">
              Answered: <strong className="text-slate-200">{answeredCount}/30</strong>
            </span>
          </div>
          <GlassButton
            variant="primary"
            size="sm"
            onClick={() => setShowSubmitModal(true)}
            rightIcon={<Send className="w-3.5 h-3.5" />}
          >
            Submit Exam
          </GlassButton>
        </div>
      </GlassCard>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Question Area) */}
        <div className="lg:col-span-8 space-y-5">
          <GlassCard variant="elevated" className="p-6 md:p-8 border-white/15 space-y-6">
            {/* Question metadata banner */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Badge color="orange">{currentQuestion.category}</Badge>
                <Badge variant="difficulty" difficulty={currentQuestion.difficulty}>
                  {currentQuestion.difficulty}
                </Badge>
              </div>

              <button
                onClick={() => handleToggleFlag(currentQuestion.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isFlagged
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current' : ''}`} />
                <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
              </button>
            </div>

            {/* Question Text */}
            <h3 className="text-base md:text-lg font-semibold text-slate-100 leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Code Snippet if applicable */}
            {currentQuestion.codeSnippet && (
              <pre className="p-4 rounded-xl bg-[#0a0e17] text-slate-200 text-xs font-mono border border-white/10 overflow-x-auto leading-relaxed">
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            )}

            {/* Answer Options */}
            <div className="space-y-3" role="radiogroup">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectAnswer(currentQuestion.id, opt.id)}
                    className={`w-full flex items-start gap-3.5 p-4 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-500/15 border-orange-500/60 text-orange-200 ring-1 ring-orange-500/30'
                        : 'bg-[#0f172a]/70 hover:bg-white/5 border-white/10 text-slate-200'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold transition-all ${
                        isSelected
                          ? 'border-orange-400 bg-orange-500 text-white'
                          : 'border-white/20 text-slate-400'
                      }`}
                    >
                      {opt.id.toUpperCase()}
                    </div>
                    <span className="flex-1 text-xs md:text-sm leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Navigation Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <GlassButton
                variant="secondary"
                size="md"
                disabled={currentIdx === 0}
                onClick={() => handleNavigateQuestion(currentIdx - 1)}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Previous
              </GlassButton>

              <span className="text-xs text-slate-400 font-mono">
                {currentIdx + 1} / {CERTIFICATION_EXAM_QUESTIONS.length}
              </span>

              <GlassButton
                variant="secondary"
                size="md"
                disabled={currentIdx === CERTIFICATION_EXAM_QUESTIONS.length - 1}
                onClick={() => handleNavigateQuestion(currentIdx + 1)}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Next
              </GlassButton>
            </div>
          </GlassCard>
        </div>

        {/* Right Column (Question Grid Navigation) */}
        <div className="lg:col-span-4 space-y-4">
          <GlassCard variant="elevated" className="p-5 border-white/15 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 flex items-center justify-between">
              <span>Question Navigator</span>
              <span className="text-xs font-mono text-orange-400">{progressPercent}%</span>
            </h4>

            <ProgressBar value={progressPercent} showPercent={false} size="sm" color="rust" />

            {/* Grid of 30 questions */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {CERTIFICATION_EXAM_QUESTIONS.map((q, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = Boolean(session.answers[q.id]);
                const isFlaggedQ = Boolean(session.flaggedQuestions[q.id]);

                let style = 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30';
                if (isCurrent) {
                  style = 'ring-2 ring-orange-500 border-orange-500 text-white bg-orange-500/20 font-bold';
                } else if (isFlaggedQ) {
                  style = 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-semibold';
                } else if (isAnswered) {
                  style = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleNavigateQuestion(idx)}
                    className={`relative py-2 rounded-xl text-xs font-mono transition-all border flex items-center justify-center ${style}`}
                  >
                    <span>{String(idx + 1).padStart(2, '0')}</span>
                    {isFlaggedQ && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500/50" />
                <span>Flagged for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-white/5 border border-white/20" />
                <span>Unanswered ({unansweredCount})</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <GlassDialog
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Examination?"
        description="Are you sure you want to finish and submit your answers for evaluation?"
      >
        <div className="space-y-3">
          {unansweredCount > 0 ? (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-300">Warning: Unanswered Questions</p>
                <p className="mt-0.5">
                  You have <strong className="text-white font-mono">{unansweredCount}</strong> unanswered questions out of 30. Unanswered questions will receive 0 points.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-300">All 30 Questions Answered!</p>
                <p className="mt-0.5">You have provided an answer for every question in the exam.</p>
              </div>
            </div>
          )}

          <p className="text-xs text-slate-400">
            Once submitted, your responses will be scored immediately. Passing threshold is 75% (minimum 23 correct answers).
          </p>

          <div className="flex items-center justify-end gap-2 pt-3">
            <GlassButton variant="ghost" onClick={() => setShowSubmitModal(false)}>
              Keep Reviewing
            </GlassButton>
            <GlassButton variant="primary" onClick={finalizeSubmission}>
              Yes, Finalize & Submit
            </GlassButton>
          </div>
        </div>
      </GlassDialog>
    </div>
  );
};
