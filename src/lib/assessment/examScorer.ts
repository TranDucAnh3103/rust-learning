import {
  ActiveExamSession,
  CategoryScore,
  ExamAttempt,
  ExamQuestion,
} from '@/types';
import { CERTIFICATION_EXAM_QUESTIONS } from '@/content/questions/certificationExam';
import { EXAM_SESSION_KEY } from '@/lib/storage/progressStorage';

export const EXAM_DURATION_MINUTES = 40;
export const PASSING_THRESHOLD_PERCENT = 75;
export const PASSING_MIN_CORRECT = 23; // 23/30 = 76.67%

/**
 * Calculates score, pass/fail status, and category breakdown for exam submission.
 */
export function scoreExamAttempt(
  answers: Record<string, string | null>,
  startedAt: string,
  timeSpentSeconds: number,
  questions: ExamQuestion[] = CERTIFICATION_EXAM_QUESTIONS
): ExamAttempt {
  let correctCount = 0;
  const categoryMap: Record<string, { total: number; correct: number }> = {};

  for (const q of questions) {
    if (!categoryMap[q.category]) {
      categoryMap[q.category] = { total: 0, correct: 0 };
    }
    categoryMap[q.category].total += 1;

    const selected = answers[q.id];
    if (selected && selected === q.correctOptionId) {
      correctCount += 1;
      categoryMap[q.category].correct += 1;
    }
  }

  const totalQuestions = questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 1000) / 10; // e.g. 76.7%
  const passed = correctCount >= PASSING_MIN_CORRECT && percentage >= PASSING_THRESHOLD_PERCENT;

  const categoryBreakdown: CategoryScore[] = Object.entries(categoryMap).map(([category, stats]) => ({
    category,
    total: stats.total,
    correct: stats.correct,
    percentage: Math.round((stats.correct / stats.total) * 100),
  }));

  return {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `exam-${Date.now()}`,
    startedAt,
    submittedAt: new Date().toISOString(),
    timeSpentSeconds,
    score: correctCount,
    totalQuestions,
    percentage,
    passed,
    categoryBreakdown,
    answers,
  };
}

/**
 * Loads an active exam session from localStorage, ensuring deadline persistence across reloads.
 */
export function loadActiveExamSession(): ActiveExamSession | null {
  try {
    const raw = localStorage.getItem(EXAM_SESSION_KEY);
    if (!raw) return null;
    const session: ActiveExamSession = JSON.parse(raw);

    // Validate structure
    if (
      typeof session.deadlineTimestamp === 'number' &&
      typeof session.startedAt === 'number' &&
      typeof session.currentQuestionIndex === 'number' &&
      typeof session.answers === 'object'
    ) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Persists active exam session to localStorage.
 */
export function saveActiveExamSession(session: ActiveExamSession): void {
  try {
    localStorage.setItem(EXAM_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to persist active exam session:', e);
  }
}

/**
 * Clears active exam session from localStorage upon submission or cancel.
 */
export function clearActiveExamSession(): void {
  try {
    localStorage.removeItem(EXAM_SESSION_KEY);
  } catch {
    // ignore
  }
}

/**
 * Initializes a new exam session with an absolute deadline timestamp.
 */
export function createNewExamSession(durationMinutes: number = EXAM_DURATION_MINUTES): ActiveExamSession {
  const now = Date.now();
  const durationSeconds = durationMinutes * 60;
  const deadlineTimestamp = now + durationSeconds * 1000;

  const initialAnswers: Record<string, string | null> = {};
  for (const q of CERTIFICATION_EXAM_QUESTIONS) {
    initialAnswers[q.id] = null;
  }

  const session: ActiveExamSession = {
    attemptId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `att-${now}`,
    startedAt: now,
    deadlineTimestamp,
    durationSeconds,
    currentQuestionIndex: 0,
    answers: initialAnswers,
    flaggedQuestions: {},
  };

  saveActiveExamSession(session);
  return session;
}
