import { describe, it, expect } from 'vitest';
import { CERTIFICATION_EXAM_QUESTIONS } from '@/content/questions/certificationExam';
import {
  scoreExamAttempt,
  createNewExamSession,
} from '@/lib/assessment/examScorer';

describe('Certification Examination Question Bank Integrity', () => {
  it('contains exactly 30 questions', () => {
    expect(CERTIFICATION_EXAM_QUESTIONS).toHaveLength(30);
  });

  it('matches required difficulty distribution (10 beginner, 12 intermediate, 8 advanced)', () => {
    const beginner = CERTIFICATION_EXAM_QUESTIONS.filter((q) => q.difficulty === 'beginner');
    const intermediate = CERTIFICATION_EXAM_QUESTIONS.filter((q) => q.difficulty === 'intermediate');
    const advanced = CERTIFICATION_EXAM_QUESTIONS.filter((q) => q.difficulty === 'advanced');

    expect(beginner).toHaveLength(10);
    expect(intermediate).toHaveLength(12);
    expect(advanced).toHaveLength(8);
  });

  it('has exactly 4 options per question and a valid correctOptionId', () => {
    for (const q of CERTIFICATION_EXAM_QUESTIONS) {
      expect(q.options.length).toBe(4);
      const optionIds = q.options.map((o) => o.id);
      expect(optionIds).toContain(q.correctOptionId);
      expect(q.explanation.trim().length).toBeGreaterThan(10);
      expect(q.question.trim().length).toBeGreaterThan(10);
    }
  });

  it('ensures all question IDs are unique', () => {
    const ids = CERTIFICATION_EXAM_QUESTIONS.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(30);
  });
});

describe('Examination Scoring Logic', () => {
  it('correctly calculates 22/30 as failed (< 75%)', () => {
    const answers: Record<string, string | null> = {};
    CERTIFICATION_EXAM_QUESTIONS.forEach((q, idx) => {
      // 22 correct answers, 8 wrong
      answers[q.id] = idx < 22 ? q.correctOptionId : 'wrong-option';
    });

    const result = scoreExamAttempt(answers, new Date().toISOString(), 1200);

    expect(result.score).toBe(22);
    expect(result.totalQuestions).toBe(30);
    expect(result.percentage).toBe(73.3);
    expect(result.passed).toBe(false);
  });

  it('correctly calculates 23/30 as passed (>= 75%)', () => {
    const answers: Record<string, string | null> = {};
    CERTIFICATION_EXAM_QUESTIONS.forEach((q, idx) => {
      // 23 correct answers, 7 wrong
      answers[q.id] = idx < 23 ? q.correctOptionId : 'wrong-option';
    });

    const result = scoreExamAttempt(answers, new Date().toISOString(), 1500);

    expect(result.score).toBe(23);
    expect(result.totalQuestions).toBe(30);
    expect(result.percentage).toBe(76.7);
    expect(result.passed).toBe(true);
  });

  it('awards 0 points for unanswered questions', () => {
    const answers: Record<string, string | null> = {};
    CERTIFICATION_EXAM_QUESTIONS.forEach((q) => {
      answers[q.id] = null;
    });

    const result = scoreExamAttempt(answers, new Date().toISOString(), 300);

    expect(result.score).toBe(0);
    expect(result.percentage).toBe(0);
    expect(result.passed).toBe(false);
  });

  it('creates an active exam session with absolute deadline timestamp', () => {
    const session = createNewExamSession(40);
    expect(session.durationSeconds).toBe(2400);
    expect(session.deadlineTimestamp).toBeGreaterThan(session.startedAt);
    expect(session.deadlineTimestamp - session.startedAt).toBe(2400 * 1000);
    expect(Object.keys(session.answers)).toHaveLength(30);
  });
});
