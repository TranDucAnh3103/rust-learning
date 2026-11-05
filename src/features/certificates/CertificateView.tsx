import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Printer,
  Award,
  User,
  Lock,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProgress } from '@/app/providers/ProgressContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { useToast } from '@/components/ui/Toast';

export const CertificateView: React.FC = () => {
  const { stats, progress, setStudentName } = useProgress();
  const toast = useToast();

  const [name, setName] = useState(progress.studentName);
  const [isEditingName, setIsEditingName] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const bestAttempt = stats.bestExamAttempt;
  const isUnlocked = Boolean(bestAttempt && bestAttempt.passed);

  // Trigger celebration confetti on unlock
  useEffect(() => {
    if (isUnlocked) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#fb923c', '#34d399', '#f8fafc'],
      });
    }
  }, [isUnlocked]);

  const handleSaveName = () => {
    setStudentName(name);
    setIsEditingName(false);
    toast.success('Certificate Updated', `Name set to "${name}".`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isUnlocked) {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto my-12 text-center">
        <GlassCard variant="elevated" className="p-8 md:p-10 border-white/15 space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-400">
            <Lock className="w-8 h-8 text-orange-400" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Credential Locked
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Certificate of Completion
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
              Achieve a passing score of at least <strong>75% (23/30)</strong> on the RustForge Certification Examination to unlock your personalized digital credential.
            </p>
          </div>

          {bestAttempt && (
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 inline-block font-mono">
              Your highest score to date: <strong>{bestAttempt.score}/30 ({bestAttempt.percentage}%)</strong>
            </div>
          )}

          <div className="pt-2">
            <Link to="/exam">
              <GlassButton variant="primary" size="md">
                Take Certification Exam
              </GlassButton>
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Active certificate data
  const certificateId =
    progress.certificates[0]?.certificateId ||
    `RF-${bestAttempt?.id.slice(0, 8).toUpperCase() || 'RUST-2026'}`;
  const issueDate =
    progress.certificates[0]?.issueDate ||
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Action controls toolbar (hidden in print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 no-print">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold text-white">
            Official RustForge Digital Certificate
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Student Name"
                className="bg-[#0f172a] text-xs px-3 py-1.5 rounded-lg border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 font-medium"
              />
              <GlassButton variant="primary" size="sm" onClick={handleSaveName}>
                Save
              </GlassButton>
            </div>
          ) : (
            <GlassButton
              variant="outline"
              size="sm"
              onClick={() => setIsEditingName(true)}
              leftIcon={<User className="w-3.5 h-3.5 text-orange-400" />}
            >
              Edit Name ({name})
            </GlassButton>
          )}

          <GlassButton
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
          >
            Print / Save PDF
          </GlassButton>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div
        ref={certificateRef}
        className="certificate-container relative p-8 md:p-14 rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#080b12] border-4 border-orange-500/30 shadow-2xl overflow-hidden text-center text-slate-100"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-orange-400/60 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-orange-400/60 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-orange-400/60 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-orange-400/60 rounded-br-xl pointer-events-none" />

        {/* Ambient subtle glow background inside certificate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header & Emblem */}
        <div className="relative z-10 space-y-3 mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-glow-rust">
            <Flame className="w-8 h-8" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-orange-400 block">
            RustForge Systems Education
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-serif">
            Certificate of Completion
          </h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">
            Standardized Systems Programming Assessment
          </p>
        </div>

        {/* Body Text */}
        <div className="relative z-10 space-y-6 my-10 max-w-2xl mx-auto">
          <p className="text-sm text-slate-300 font-light">This is proudly presented to</p>

          <div className="border-b-2 border-orange-500/40 pb-2 inline-block px-8 min-w-[280px]">
            <span className="text-2xl md:text-4xl font-extrabold text-white tracking-wide font-sans">
              {progress.studentName}
            </span>
          </div>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
            for successfully passing the comprehensive 30-question examination covering Rust memory safety, stack & heap allocation, ownership rules, borrowing constraints, algebraic types, error propagation, smart pointers, and concurrent systems programming.
          </p>

          <div className="inline-flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
            <span>Score: <strong className="text-emerald-400 font-bold">{bestAttempt?.score}/30 ({bestAttempt?.percentage}%)</strong></span>
            <span className="text-slate-600">•</span>
            <span>Status: <strong className="text-emerald-400 font-bold">PASSED (Threshold: 75%)</strong></span>
          </div>
        </div>

        {/* Bottom Signatures & Verification ID */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 text-xs">
          <div className="text-left space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Date of Issuance</span>
            <span className="font-semibold text-slate-200 block">{issueDate}</span>
          </div>

          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Credential ID</span>
            <span className="font-mono text-slate-300 block text-[11px] truncate">{certificateId}</span>
          </div>

          <div className="text-right space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Verification Engine</span>
            <span className="font-semibold text-orange-400 block">RustForge v1.0 Client</span>
          </div>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="relative z-10 mt-8 pt-4 border-t border-white/5 text-[10px] text-slate-500 leading-relaxed max-w-xl mx-auto">
          Self-assessed RustForge learning achievement. RustForge is an independent interactive educational platform and is not officially affiliated with or endorsed by the Rust Foundation.
        </div>
      </div>
    </div>
  );
};
