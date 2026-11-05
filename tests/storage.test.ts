import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadLearningProgress,
  saveLearningProgress,
  resetLearningProgress,
  exportProgressToJSON,
  importProgressFromJSON,
  DEFAULT_PROGRESS,
  STORAGE_KEY,
} from '@/lib/storage/progressStorage';
import { LearningProgress } from '@/types';

describe('Storage & Schema Migration Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default progress when storage is empty', () => {
    const progress = loadLearningProgress();
    expect(progress.completedLessons).toEqual([]);
    expect(progress.completedExercises).toEqual([]);
    expect(progress.schemaVersion).toBe(1);
  });

  it('saves and reloads progress correctly', () => {
    const mock: LearningProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['getting-started', 'variables-and-types'],
      completedExercises: ['ex-getting-started'],
      studentName: 'Alice Rustacean',
    };

    saveLearningProgress(mock);
    const loaded = loadLearningProgress();

    expect(loaded.completedLessons).toEqual(['getting-started', 'variables-and-types']);
    expect(loaded.completedExercises).toEqual(['ex-getting-started']);
    expect(loaded.studentName).toBe('Alice Rustacean');
  });

  it('safely recovers when corrupt JSON is stored in localStorage', () => {
    localStorage.setItem(STORAGE_KEY, '{ invalid corrupt json %$#');
    const recovered = loadLearningProgress();

    expect(recovered).toBeDefined();
    expect(recovered.completedLessons).toEqual([]);
    expect(recovered.schemaVersion).toBe(1);
  });

  it('migrates legacy or partial data safely', () => {
    const partialData = {
      completedLessons: ['getting-started'],
      // missing other fields
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(partialData));

    const loaded = loadLearningProgress();
    expect(loaded.completedLessons).toEqual(['getting-started']);
    expect(loaded.completedExercises).toEqual([]);
    expect(loaded.schemaVersion).toBe(1);
  });

  it('resets progress back to default and cleans storage keys', () => {
    const mock: LearningProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['getting-started'],
    };
    saveLearningProgress(mock);

    const reset = resetLearningProgress();
    expect(reset.completedLessons).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('exports and imports progress via JSON with validation', () => {
    const initial: LearningProgress = {
      ...DEFAULT_PROGRESS,
      completedLessons: ['ownership-and-borrowing'],
      studentName: 'Ferris',
    };

    const exported = exportProgressToJSON(initial);
    expect(exported).toContain('ownership-and-borrowing');
    expect(exported).toContain('Ferris');

    localStorage.clear();

    const importRes = importProgressFromJSON(exported);
    expect(importRes.success).toBe(true);
    expect(importRes.progress?.completedLessons).toEqual(['ownership-and-borrowing']);
    expect(importRes.progress?.studentName).toBe('Ferris');
  });

  it('rejects invalid JSON import strings', () => {
    const badRes = importProgressFromJSON('not json at all');
    expect(badRes.success).toBe(false);
    expect(badRes.error).toBeDefined();
  });
});
