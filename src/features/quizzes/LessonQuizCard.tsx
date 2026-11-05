import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, Check, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '@/types';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/Badge';
import { useProgress } from '@/app/providers/ProgressContext';
import { useToast } from '@/components/ui/Toast';

interface LessonQuizProps {
  lessonId: string;
  quizzes: QuizQuestion[];
  onComplete?: () => void;
}

export const LessonQuizCard: React.FC<LessonQuizProps> = ({ lessonId, quizzes, onComplete }) => {
  const { progress, recordQuizAttempt } = useProgress();
  const toast = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuiz = quizzes[currentIndex];
  const totalQuestions = quizzes.length;

  const previousRecord = progress.quizAttempts[lessonId];

  const handleSelectOption = (optId: string) => {
    if (hasChecked) return; // locked once checked
    setSelectedOptionId(optId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;
    setHasChecked(true);

    const isCorrect = selectedOptionId === currentQuiz.correctOptionId;
    setSessionAnswers((prev) => ({ ...prev, [currentQuiz.id]: selectedOptionId }));

    if (isCorrect) {
      toast.success('Correct Answer!', 'Great job applying the concept.');
    } else {
      toast.error('Incorrect', 'Review the concept explanation below.');
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasChecked(false);
    } else {
      // Finalized quiz
      let correctCount = 0;
      for (const q of quizzes) {
        const chosen = sessionAnswers[q.id] || selectedOptionId;
        if (chosen === q.correctOptionId) {
          correctCount++;
        }
      }

      const scorePercent = Math.round((correctCount / totalQuestions) * 100);
      const passed = scorePercent >= 75;

      recordQuizAttempt(lessonId, scorePercent, passed);
      setIsCompleted(true);

      if (passed) {
        toast.success('Lesson Quiz Passed!', `You scored ${correctCount}/${totalQuestions} (${scorePercent}%).`);
      } else {
        toast.warning('Quiz Review Needed', `Score: ${correctCount}/${totalQuestions} (${scorePercent}%). You can retry.`);
      }

      if (onComplete) onComplete();
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasChecked(false);
    setSessionAnswers({});
    setIsCompleted(false);
  };

  if (isCompleted) {
    let correctCount = 0;
    for (const q of quizzes) {
      if (sessionAnswers[q.id] === q.correctOptionId) {
        correctCount++;
      }
    }
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercent >= 75;

    return (
      <GlassCard variant="elevated" className="p-6 md:p-8 my-8 border-white/15 text-center">
        <div
          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
            passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
          }`}
        >
          {passed ? <CheckCircle2 className="w-8 h-8" /> : <HelpCircle className="w-8 h-8" />}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {passed ? 'Lesson Quiz Mastered!' : 'Quiz Completed - Review Recommended'}
        </h3>
        <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
          You answered <strong className="text-white font-mono">{correctCount}</strong> out of{' '}
          <strong className="text-white font-mono">{totalQuestions}</strong> questions correctly ({scorePercent}%).
        </p>

        <div className="flex items-center justify-center gap-3">
          <GlassButton variant="outline" size="sm" onClick={handleRetry} leftIcon={<RotateCcw className="w-4 h-4" />}>
            Retry Quiz
          </GlassButton>
        </div>
      </GlassCard>
    );
  }

  const isCurrentCorrect = selectedOptionId === currentQuiz.correctOptionId;

  return (
    <GlassCard variant="elevated" className="p-6 md:p-8 my-8 border-white/15">
      {/* Quiz Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-2.5">
          <Badge color="orange">Lesson Quiz</Badge>
          <span className="text-xs font-semibold text-slate-400">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
        <Badge variant="difficulty" difficulty={currentQuiz.difficulty}>
          {currentQuiz.difficulty}
        </Badge>
      </div>

      {/* Question prompt */}
      <h3 className="text-base md:text-lg font-semibold text-slate-100 mb-4 leading-snug">
        {currentQuiz.question}
      </h3>

      {/* Code snippet if present */}
      {currentQuiz.codeSnippet && (
        <pre className="p-3.5 mb-5 rounded-xl bg-[#0a0e17] text-slate-200 border border-white/10 text-xs font-mono overflow-x-auto leading-relaxed">
          <code>{currentQuiz.codeSnippet}</code>
        </pre>
      )}

      {/* Multiple-choice options */}
      <div className="space-y-3 mb-6" role="radiogroup" aria-label="Quiz answer options">
        {currentQuiz.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.id === currentQuiz.correctOptionId;

          let optionStyle =
            'bg-[#0f172a]/70 hover:bg-white/5 border-white/10 text-slate-200';

          if (hasChecked) {
            if (isCorrect) {
              optionStyle = 'bg-emerald-500/15 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/40';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'bg-rose-500/15 border-rose-500/60 text-rose-200 ring-1 ring-rose-500/40';
            } else {
              optionStyle = 'opacity-40 border-white/5 text-slate-400';
            }
          } else if (isSelected) {
            optionStyle = 'bg-orange-500/15 border-orange-500/60 text-orange-200 ring-1 ring-orange-500/40';
          }

          return (
            <button
              key={option.id}
              role="radio"
              aria-checked={isSelected}
              disabled={hasChecked}
              onClick={() => handleSelectOption(option.id)}
              className={`w-full flex items-start gap-3.5 p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${optionStyle}`}
            >
              <div
                className={`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold transition-all ${
                  isSelected
                    ? hasChecked
                      ? isCorrect
                        ? 'border-emerald-400 bg-emerald-500 text-white'
                        : 'border-rose-400 bg-rose-500 text-white'
                      : 'border-orange-400 bg-orange-500 text-white'
                    : 'border-white/20 text-slate-400'
                }`}
              >
                {option.id.toUpperCase()}
              </div>
              <div className="flex-1 text-xs md:text-sm leading-relaxed">{option.text}</div>
              {hasChecked && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            </button>
          );
        })}
      </div>

      {/* Feedback & Explanation Box */}
      {hasChecked && (
        <div
          className={`p-4 rounded-xl border text-xs leading-relaxed mb-6 animate-fade-in ${
            isCurrentCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1.5">
            {isCurrentCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" />
                <span className="text-rose-300">Incorrect</span>
              </>
            )}
          </div>
          <p className="text-slate-300">{currentQuiz.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-xs text-slate-400">
          {previousRecord && (
            <span>
              Best score: <strong className="text-orange-400">{previousRecord.bestScore}%</strong>
            </span>
          )}
        </span>

        {!hasChecked ? (
          <GlassButton
            variant="primary"
            size="md"
            disabled={!selectedOptionId}
            onClick={handleCheckAnswer}
          >
            Check Answer
          </GlassButton>
        ) : (
          <GlassButton
            variant="primary"
            size="md"
            onClick={handleNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {currentIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
          </GlassButton>
        )}
      </div>
    </GlassCard>
  );
};
