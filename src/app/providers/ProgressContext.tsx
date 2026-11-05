import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  LearningProgress,
  ExamAttempt,
  CertificateData,
} from '@/types';
import {
  loadLearningProgress,
  saveLearningProgress,
  resetLearningProgress as resetStorage,
  exportProgressToJSON,
  importProgressFromJSON,
} from '@/lib/storage/progressStorage';
import { ALL_LESSON_SUMMARIES } from '@/content/curriculum/tracks';

interface ProgressStats {
  completedLessonsCount: number;
  totalLessonsCount: number;
  courseCompletionPercent: number;
  completedExercisesCount: number;
  totalExercisesCount: number;
  quizzesPassedCount: number;
  latestExamAttempt: ExamAttempt | null;
  bestExamAttempt: ExamAttempt | null;
  hasPassedExam: boolean;
  unlockedCertificate: CertificateData | null;
}

interface ProgressContextValue {
  progress: LearningProgress;
  stats: ProgressStats;
  markLessonComplete: (slug: string) => void;
  recordQuizAttempt: (lessonId: string, score: number, passed: boolean) => void;
  markExerciseComplete: (exerciseId: string, solutionCode?: string) => void;
  saveExerciseDraft: (exerciseId: string, code: string) => void;
  setStudentName: (name: string) => void;
  recordExamAttempt: (attempt: ExamAttempt) => void;
  issueCertificate: (studentName: string, attempt: ExamAttempt) => CertificateData;
  resetProgress: () => void;
  exportProgress: () => string;
  importProgress: (jsonStr: string) => { success: boolean; error?: string };
  setLastVisitedLesson: (slug: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<LearningProgress>(() => loadLearningProgress());

  // Keep localStorage synchronized when progress changes
  useEffect(() => {
    saveLearningProgress(progress);
  }, [progress]);

  const markLessonComplete = useCallback((slug: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(slug)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, slug],
      };
    });
  }, []);

  const recordQuizAttempt = useCallback((lessonId: string, score: number, passed: boolean) => {
    setProgress((prev) => {
      const existing = prev.quizAttempts[lessonId];
      const attempts = (existing?.attempts || 0) + 1;
      const bestScore = Math.max(existing?.bestScore || 0, score);
      const completed = existing?.completed || passed;

      return {
        ...prev,
        quizAttempts: {
          ...prev.quizAttempts,
          [lessonId]: {
            attempts,
            bestScore,
            completed,
            lastAttemptedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  const markExerciseComplete = useCallback((exerciseId: string, solutionCode?: string) => {
    setProgress((prev) => {
      const updatedExercises = prev.completedExercises.includes(exerciseId)
        ? prev.completedExercises
        : [...prev.completedExercises, exerciseId];

      const updatedDrafts = solutionCode
        ? { ...prev.exerciseDrafts, [exerciseId]: solutionCode }
        : prev.exerciseDrafts;

      return {
        ...prev,
        completedExercises: updatedExercises,
        exerciseDrafts: updatedDrafts,
      };
    });
  }, []);

  const saveExerciseDraft = useCallback((exerciseId: string, code: string) => {
    setProgress((prev) => ({
      ...prev,
      exerciseDrafts: {
        ...prev.exerciseDrafts,
        [exerciseId]: code,
      },
    }));
  }, []);

  const setStudentName = useCallback((name: string) => {
    setProgress((prev) => ({
      ...prev,
      studentName: name.trim() || 'Rust Learner',
    }));
  }, []);

  const recordExamAttempt = useCallback((attempt: ExamAttempt) => {
    setProgress((prev) => {
      const updatedHistory = [attempt, ...prev.examHistory];
      let updatedCertificates = [...prev.certificates];

      // Automatically issue local certificate if passed and not yet issued for this attempt
      if (attempt.passed && !updatedCertificates.some((c) => c.examAttemptId === attempt.id)) {
        const certId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `cert-${Date.now()}`;
        const newCert: CertificateData = {
          certificateId: certId,
          studentName: prev.studentName,
          issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          examAttemptId: attempt.id,
          score: attempt.score,
          percentage: attempt.percentage,
          programTitle: 'RustForge Certified Systems Associate',
        };
        updatedCertificates = [newCert, ...updatedCertificates];
      }

      return {
        ...prev,
        examHistory: updatedHistory,
        certificates: updatedCertificates,
      };
    });
  }, []);

  const issueCertificate = useCallback((studentName: string, attempt: ExamAttempt): CertificateData => {
    const certId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `cert-${Date.now()}`;
    const newCert: CertificateData = {
      certificateId: certId,
      studentName: studentName.trim() || 'Rust Learner',
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      examAttemptId: attempt.id,
      score: attempt.score,
      percentage: attempt.percentage,
      programTitle: 'RustForge Certified Systems Associate',
    };

    setProgress((prev) => ({
      ...prev,
      studentName: studentName.trim() || prev.studentName,
      certificates: [newCert, ...prev.certificates.filter((c) => c.examAttemptId !== attempt.id)],
    }));

    return newCert;
  }, []);

  const resetProgress = useCallback(() => {
    const pristine = resetStorage();
    setProgress(pristine);
  }, []);

  const exportProgress = useCallback(() => {
    return exportProgressToJSON(progress);
  }, [progress]);

  const importProgress = useCallback((jsonStr: string) => {
    const result = importProgressFromJSON(jsonStr);
    if (result.success && result.progress) {
      setProgress(result.progress);
      return { success: true };
    }
    return { success: false, error: result.error || 'Failed to import progress JSON' };
  }, []);

  const setLastVisitedLesson = useCallback((slug: string) => {
    setProgress((prev) => ({
      ...prev,
      lastVisitedLesson: slug,
    }));
  }, []);

  // Compute derived statistics from actual local user progress
  const totalLessonsCount = ALL_LESSON_SUMMARIES.length; // 8
  const completedLessonsCount = progress.completedLessons.length;
  const courseCompletionPercent =
    totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;
  const completedExercisesCount = progress.completedExercises.length;
  const totalExercisesCount = 8;
  const quizzesPassedCount = Object.values(progress.quizAttempts).filter((q) => q.completed).length;

  const latestExamAttempt = progress.examHistory.length > 0 ? progress.examHistory[0] : null;
  const bestExamAttempt =
    progress.examHistory.length > 0
      ? [...progress.examHistory].sort((a, b) => b.score - a.score)[0]
      : null;
  const hasPassedExam = progress.examHistory.some((e) => e.passed);
  const unlockedCertificate = progress.certificates.length > 0 ? progress.certificates[0] : null;

  const stats: ProgressStats = {
    completedLessonsCount,
    totalLessonsCount,
    courseCompletionPercent,
    completedExercisesCount,
    totalExercisesCount,
    quizzesPassedCount,
    latestExamAttempt,
    bestExamAttempt,
    hasPassedExam,
    unlockedCertificate,
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        stats,
        markLessonComplete,
        recordQuizAttempt,
        markExerciseComplete,
        saveExerciseDraft,
        setStudentName,
        recordExamAttempt,
        issueCertificate,
        resetProgress,
        exportProgress,
        importProgress,
        setLastVisitedLesson,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
