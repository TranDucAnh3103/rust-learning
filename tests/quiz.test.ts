import { describe, it, expect } from 'vitest';
import { LESSON_QUIZZES } from '@/content/curriculum/quizzes';
import { ALL_LESSON_SUMMARIES } from '@/content/curriculum/tracks';

describe('Lesson Quizzes Integrity', () => {
  it('provides between 3 and 5 questions for every single lesson module', () => {
    expect(ALL_LESSON_SUMMARIES).toHaveLength(8);

    for (const lesson of ALL_LESSON_SUMMARIES) {
      const quizzes = LESSON_QUIZZES[lesson.slug];
      expect(quizzes, `Quizzes missing for lesson: ${lesson.slug}`).toBeDefined();
      expect(quizzes.length).toBeGreaterThanOrEqual(3);
      expect(quizzes.length).toBeLessThanOrEqual(5);

      for (const q of quizzes) {
        expect(q.lessonId).toBe(lesson.slug);
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        const optionIds = q.options.map((o) => o.id);
        expect(optionIds).toContain(q.correctOptionId);
        expect(q.explanation.trim().length).toBeGreaterThan(15);
      }
    }
  });

  it('guarantees unique IDs across all lesson quizzes', () => {
    const allQuizIds = Object.values(LESSON_QUIZZES).flatMap((list) => list.map((q) => q.id));
    const uniqueIds = new Set(allQuizIds);
    expect(uniqueIds.size).toBe(allQuizIds.length);
  });
});
