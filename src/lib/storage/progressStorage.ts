import { LearningProgress, ExamAttempt, CertificateData } from '@/types';

export const CURRENT_SCHEMA_VERSION = 1;
export const STORAGE_KEY = 'rustforge_learning_progress_v1';
export const EXAM_SESSION_KEY = 'rustforge_active_exam_session_v1';

export const DEFAULT_PROGRESS: LearningProgress = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  completedLessons: [],
  quizAttempts: {},
  completedExercises: [],
  exerciseDrafts: {},
  lastVisitedLesson: null,
  examHistory: [],
  certificates: [],
  studentName: 'Rust Learner',
  updatedAt: new Date().toISOString(),
};

/**
 * Validates whether an unknown object conforms to the LearningProgress contract.
 */
export function isValidLearningProgress(data: unknown): data is LearningProgress {
  if (!data || typeof data !== 'object') return false;
  const p = data as Record<string, unknown>;

  return (
    typeof p.schemaVersion === 'number' &&
    Array.isArray(p.completedLessons) &&
    typeof p.quizAttempts === 'object' &&
    p.quizAttempts !== null &&
    Array.isArray(p.completedExercises) &&
    typeof p.exerciseDrafts === 'object' &&
    p.exerciseDrafts !== null &&
    Array.isArray(p.examHistory) &&
    typeof p.updatedAt === 'string'
  );
}

/**
 * Migrates data from older schema versions if needed.
 */
export function migrateProgress(raw: Record<string, unknown>): LearningProgress {
  const version = typeof raw.schemaVersion === 'number' ? raw.schemaVersion : 0;

  let migrated: LearningProgress = {
    ...DEFAULT_PROGRESS,
    completedLessons: Array.isArray(raw.completedLessons) ? raw.completedLessons.map(String) : [],
    completedExercises: Array.isArray(raw.completedExercises) ? raw.completedExercises.map(String) : [],
    quizAttempts: typeof raw.quizAttempts === 'object' && raw.quizAttempts !== null
      ? (raw.quizAttempts as LearningProgress['quizAttempts'])
      : {},
    exerciseDrafts: typeof raw.exerciseDrafts === 'object' && raw.exerciseDrafts !== null
      ? (raw.exerciseDrafts as Record<string, string>)
      : {},
    lastVisitedLesson: typeof raw.lastVisitedLesson === 'string' ? raw.lastVisitedLesson : null,
    examHistory: Array.isArray(raw.examHistory) ? (raw.examHistory as ExamAttempt[]) : [],
    certificates: Array.isArray(raw.certificates) ? (raw.certificates as CertificateData[]) : [],
    studentName: typeof raw.studentName === 'string' && raw.studentName.trim() ? raw.studentName : 'Rust Learner',
    updatedAt: new Date().toISOString(),
    schemaVersion: CURRENT_SCHEMA_VERSION,
  };

  if (version < 1) {
    // Migration logic for future schema increments
    migrated.schemaVersion = CURRENT_SCHEMA_VERSION;
  }

  return migrated;
}

/**
 * Loads progress from localStorage with corrupt data protection and automatic migration.
 */
export function loadLearningProgress(): LearningProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_PROGRESS };
    }

    const parsed = JSON.parse(raw);
    if (isValidLearningProgress(parsed) && parsed.schemaVersion === CURRENT_SCHEMA_VERSION) {
      return parsed;
    }

    // Try migration if corrupt or older version
    if (parsed && typeof parsed === 'object') {
      const migrated = migrateProgress(parsed as Record<string, unknown>);
      saveLearningProgress(migrated);
      return migrated;
    }

    return { ...DEFAULT_PROGRESS };
  } catch (err) {
    console.warn('Failed to parse learning progress from localStorage, recovering default state:', err);
    return { ...DEFAULT_PROGRESS };
  }
}

/**
 * Saves progress safely to localStorage.
 */
export function saveLearningProgress(progress: LearningProgress): boolean {
  try {
    const payload: LearningProgress = {
      ...progress,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error('Failed to save learning progress to localStorage:', err);
    return false;
  }
}

/**
 * Resets all progress data back to pristine default.
 */
export function resetLearningProgress(): LearningProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXAM_SESSION_KEY);
  } catch (e) {
    console.error('Error clearing localStorage:', e);
  }
  return { ...DEFAULT_PROGRESS, updatedAt: new Date().toISOString() };
}

/**
 * Serializes progress to a downloadable JSON string.
 */
export function exportProgressToJSON(progress: LearningProgress): string {
  return JSON.stringify(progress, null, 2);
}

/**
 * Parses and validates an imported JSON string.
 */
export function importProgressFromJSON(jsonString: string): { success: boolean; progress?: LearningProgress; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Invalid JSON payload: root must be an object' };
    }

    const migrated = migrateProgress(parsed as Record<string, unknown>);
    saveLearningProgress(migrated);
    return { success: true, progress: migrated };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown parsing error' };
  }
}
