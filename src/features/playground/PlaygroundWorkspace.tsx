import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  ExternalLink,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Check,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { LESSON_EXERCISES } from '@/content/curriculum/exercises';
import { validateCodeLocally } from '@/lib/validation/heuristicValidator';
import { requestAICodeReview, getAISettings } from '@/lib/ai/aiReviewService';
import { AIReviewFeedback } from '@/features/ai-review/AIReviewFeedback';
import { AIReviewResult, LocalValidationResult } from '@/types';
import { useProgress } from '@/app/providers/ProgressContext';
import { useToast } from '@/components/ui/Toast';

export const PlaygroundWorkspace: React.FC = () => {
  const { progress, saveExerciseDraft, markExerciseComplete } = useProgress();
  const toast = useToast();

  const exerciseKeys = Object.keys(LESSON_EXERCISES);
  const [selectedKey, setSelectedKey] = useState<string>(exerciseKeys[0]);
  const currentExercise = LESSON_EXERCISES[selectedKey];

  // Load custom code from sessionStorage if sent from a lesson code block
  const [code, setCode] = useState<string>(() => {
    const customCode = sessionStorage.getItem('rustforge_playground_custom_code');
    if (customCode) {
      sessionStorage.removeItem('rustforge_playground_custom_code');
      return customCode;
    }
    return progress.exerciseDrafts[currentExercise.id] || currentExercise.starterCode;
  });

  const [localResult, setLocalResult] = useState<LocalValidationResult | null>(null);
  const [aiResult, setAiResult] = useState<AIReviewResult | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [copied, setCopied] = useState(false);

  // Switch exercise
  const handleSelectExercise = (key: string) => {
    setSelectedKey(key);
    const nextEx = LESSON_EXERCISES[key];
    const draft = progress.exerciseDrafts[nextEx.id] || nextEx.starterCode;
    setCode(draft);
    setLocalResult(null);
    setAiResult(null);
    setShowHints(false);
  };

  // Auto-save draft
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    saveExerciseDraft(currentExercise.id, newCode);
  };

  // Reset code to starter code
  const handleReset = () => {
    setCode(currentExercise.starterCode);
    saveExerciseDraft(currentExercise.id, currentExercise.starterCode);
    setLocalResult(null);
    setAiResult(null);
    toast.info('Code Reset', 'Restored original exercise starter code.');
  };

  // Load reference solution
  const handleLoadSolution = () => {
    setCode(currentExercise.solutionExample);
    saveExerciseDraft(currentExercise.id, currentExercise.solutionExample);
    setLocalResult(null);
    setAiResult(null);
    toast.info('Solution Loaded', 'Loaded canonical reference implementation.');
  };

  // Copy code
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Copied', 'Rust code copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  // Run offline heuristic validation
  const handleCheckLocally = () => {
    const res = validateCodeLocally(currentExercise, code);
    setLocalResult(res);
    setAiResult(null);

    if (res.passed) {
      markExerciseComplete(currentExercise.id, code);
      toast.success('Static Checks Passed!', 'Code satisfies all exercise constraints.');
    } else {
      toast.warning('Check Incomplete', `${res.findings.filter((f) => !f.passed).length} condition(s) unmet.`);
    }
  };

  // Review with AI
  const handleReviewWithAI = async () => {
    const settings = getAISettings();
    if (!settings.apiKey) {
      toast.error('AI Key Required', 'Open Settings to enter your OpenAI-compatible API key.');
      return;
    }

    setIsAiLoading(true);
    setAiResult(null);

    try {
      const res = await requestAICodeReview(currentExercise, code, settings);
      setAiResult(res);
      setLocalResult(null);

      if (res.isCorrect) {
        markExerciseComplete(currentExercise.id, code);
        toast.success('AI Review: Approved', 'AI confirmed solution correctness.');
      } else {
        toast.info('AI Review Complete', 'Review suggestions and conceptual errors.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to obtain AI review.';
      toast.error('AI Review Error', msg);
    } finally {
      setIsAiLoading(false);
    }
  };

  // External execution in official Rust Playground
  const handleOpenOfficialPlayground = () => {
    const encoded = encodeURIComponent(code);
    const url = `https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&code=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isCompleted = progress.completedExercises.includes(currentExercise.id);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Exercise Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              Rust Coding Workspace
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <Check className="w-3 h-3" /> Completed
              </span>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {currentExercise.title}
          </h2>
        </div>

        {/* Exercise Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="exercise-select" className="text-xs font-semibold text-slate-400">
            Exercise:
          </label>
          <select
            id="exercise-select"
            value={selectedKey}
            onChange={(e) => handleSelectExercise(e.target.value)}
            className="bg-[#0f172a] text-slate-200 text-xs font-medium rounded-xl border border-white/15 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer"
          >
            {exerciseKeys.map((key) => {
              const ex = LESSON_EXERCISES[key];
              const done = progress.completedExercises.includes(ex.id);
              return (
                <option key={key} value={key}>
                  {done ? '✓ ' : ''}
                  {ex.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Instructions & Task Overview */}
      <GlassCard variant="elevated" className="p-5 border-white/10 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-200">Task Instructions</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{currentExercise.instructions}</p>
          </div>
          <button
            onClick={() => setShowHints(!showHints)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-amber-300 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>{showHints ? 'Hide Hints' : 'View Hints'}</span>
          </button>
        </div>

        <div className="pt-2 border-t border-white/10 text-xs text-slate-400 flex items-center gap-1.5">
          <strong className="text-slate-300">Expected Outcome:</strong>
          <span>{currentExercise.expectedOutcome}</span>
        </div>

        {showHints && (
          <div className="mt-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 space-y-1.5">
            <p className="font-bold text-amber-300">Exercise Hints:</p>
            <ul className="list-disc list-inside space-y-1">
              {currentExercise.hints.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}
      </GlassCard>

      {/* Editor & Output Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Code Editor */}
        <div className="lg:col-span-7 space-y-3">
          {/* Editor Header Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-slate-400">main.rs</span>
              <span className="text-[10px] text-slate-500">Auto-saved</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-xs flex items-center gap-1"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">Copy</span>
              </button>

              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-xs flex items-center gap-1"
                title="Reset code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[11px]">Reset</span>
              </button>

              <button
                onClick={handleLoadSolution}
                className="p-1.5 rounded-lg text-slate-400 hover:text-orange-400 hover:bg-white/10 transition-colors text-xs flex items-center gap-1"
                title="Load reference solution"
              >
                <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-[11px]">Load Solution</span>
              </button>
            </div>
          </div>

          {/* CodeMirror 6 Editor Container */}
          <CodeEditor value={code} onChange={handleCodeChange} height="480px" />

          {/* Validation & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <GlassButton
                variant="primary"
                onClick={handleCheckLocally}
                leftIcon={<ShieldCheck className="w-4 h-4" />}
              >
                Check Locally
              </GlassButton>

              <GlassButton
                variant="secondary"
                onClick={handleReviewWithAI}
                isLoading={isAiLoading}
                leftIcon={<Sparkles className="w-4 h-4 text-amber-400" />}
              >
                Review with AI
              </GlassButton>
            </div>

            <GlassButton
              variant="outline"
              size="sm"
              onClick={handleOpenOfficialPlayground}
              rightIcon={<ExternalLink className="w-3.5 h-3.5 ml-1" />}
              title="Open in the official remote Rust Playground for real compilation"
            >
              Run in play.rust-lang.org
            </GlassButton>
          </div>
        </div>

        {/* Right Column: Validation Findings & Output */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Verification & Feedback
          </div>

          {/* AI Review Result */}
          {aiResult && <AIReviewFeedback review={aiResult} />}

          {/* Local Heuristic Validation Result */}
          {localResult && (
            <GlassCard variant="elevated" className="p-5 border-white/20 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-400" />
                  <h4 className="text-sm font-bold text-white">Deterministic Static Checks</h4>
                </div>
                <div
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${
                    localResult.passed
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  }`}
                >
                  Score: {localResult.score}%
                </div>
              </div>

              {/* Feedback description */}
              <p className="text-xs text-slate-300 leading-relaxed">{localResult.feedback}</p>

              {/* Individual Rules Checklist */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase text-slate-400">Rule Findings:</p>
                {localResult.findings.map((f) => (
                  <div
                    key={f.ruleId}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs ${
                      f.passed
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200'
                        : 'bg-rose-500/5 border-rose-500/20 text-rose-200'
                    }`}
                  >
                    {f.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-slate-200">{f.description}</p>
                      {f.message && <p className="text-rose-300 mt-0.5 text-[11px]">{f.message}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested fix hint if failed */}
              {!localResult.passed && localResult.suggestedFix && (
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200/90">
                  <strong className="text-orange-300">Suggestion: </strong>
                  {localResult.suggestedFix}
                </div>
              )}

              {/* Honest Compilation Limitation Warning */}
              <div className="pt-2 text-[11px] text-slate-500 border-t border-white/10 flex items-center justify-between">
                <span>Static heuristic validation</span>
                <span className="italic font-mono">Verified by compiler: false</span>
              </div>
            </GlassCard>
          )}

          {/* Initial state when no check has been run */}
          {!localResult && !aiResult && (
            <GlassCard variant="default" className="p-6 text-center border-white/10 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                <ShieldCheck className="w-6 h-6 text-orange-400" />
              </div>
              <h4 className="text-sm font-semibold text-slate-200">Awaiting Code Submission</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Click <strong>Check Locally</strong> for deterministic multi-rule static inspection, or configure an API key in Settings to receive an in-depth <strong>AI Code Review</strong>.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};
