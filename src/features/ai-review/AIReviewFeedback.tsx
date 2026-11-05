import React from 'react';
import { AlertTriangle, Lightbulb, Code2, Bot, Sparkles } from 'lucide-react';
import { AIReviewResult } from '@/types';
import { GlassCard } from '@/components/ui/GlassCard';

interface AIReviewFeedbackProps {
  review: AIReviewResult;
}

export const AIReviewFeedback: React.FC<AIReviewFeedbackProps> = ({ review }) => {
  return (
    <GlassCard variant="elevated" className="p-5 md:p-6 border-white/20 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>AI Code Review</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h4>
            <p className="text-[11px] text-slate-400">Structured pedagogic code analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
              review.isCorrect
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
            }`}
          >
            Score: {review.score}/100
          </div>
        </div>
      </div>

      {/* Main feedback text */}
      <div className="text-sm text-slate-200 leading-relaxed bg-[#0a0e17] p-3.5 rounded-xl border border-white/10">
        {review.feedback}
      </div>

      {/* Conceptual Errors if any */}
      {review.conceptualErrors.length > 0 && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Detected Conceptual Pitfalls</span>
          </div>
          <ul className="list-disc list-inside text-xs text-rose-200 space-y-1 pl-1">
            {review.conceptualErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Fix */}
      {review.suggestedFix && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <Code2 className="w-4 h-4 text-orange-400" />
            <span>Suggested Idiomatic Fix</span>
          </div>
          <pre className="p-3 rounded-xl bg-[#070a10] text-slate-200 text-xs font-mono border border-white/10 overflow-x-auto">
            <code>{review.suggestedFix}</code>
          </pre>
        </div>
      )}

      {/* Improvement Tips */}
      {review.improvementTips.length > 0 && (
        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
            <Lightbulb className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Rustforge Idiomatic Tips</span>
          </div>
          <ul className="list-disc list-inside text-xs text-blue-200 space-y-1 pl-1">
            {review.improvementTips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Mandatory Trust & Security Disclosure */}
      <div className="pt-2 text-[11px] text-slate-500 border-t border-white/10 flex items-center justify-between">
        <span>Static browser AI integration</span>
        <span className="italic">Verified by compiler: No (LLM evaluation)</span>
      </div>
    </GlassCard>
  );
};
