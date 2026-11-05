import { describe, it, expect } from 'vitest';
import { validateCodeLocally } from '@/lib/validation/heuristicValidator';
import { LESSON_EXERCISES } from '@/content/curriculum/exercises';

describe('Offline Heuristic Validator Engine', () => {
  const ex1 = LESSON_EXERCISES['getting-started'];
  const ex3 = LESSON_EXERCISES['ownership-and-borrowing'];

  it('rejects empty code submission with 0 score and clear feedback', () => {
    const res = validateCodeLocally(ex1, '');
    expect(res.passed).toBe(false);
    expect(res.score).toBe(0);
    expect(res.verifiedByCompiler).toBe(false);
    expect(res.feedback).toContain('No code submitted');
  });

  it('evaluates passing code when all exercise rules are met', () => {
    const solution = ex1.solutionExample;
    const res = validateCodeLocally(ex1, solution);

    expect(res.passed).toBe(true);
    expect(res.score).toBe(100);
    expect(res.verifiedByCompiler).toBe(false);
    expect(res.findings.every((f) => f.passed)).toBe(true);
  });

  it('identifies missing rules and provides rule-specific failure messages', () => {
    const incompleteCode = `
fn greet() {
    println!("Hi");
}
fn main() {}
`;
    const res = validateCodeLocally(ex1, incompleteCode);

    expect(res.passed).toBe(false);
    expect(res.score).toBeLessThan(100);
    expect(res.findings.some((f) => !f.passed)).toBe(true);
    expect(res.feedback).toContain('condition(s)');
    expect(res.verifiedByCompiler).toBe(false);
  });

  it('validates Exercise 3 (Ownership/Borrowing) rule requirements', () => {
    const solution = ex3.solutionExample;
    const res = validateCodeLocally(ex3, solution);

    expect(res.passed).toBe(true);
    expect(res.score).toBe(100);
    expect(res.verifiedByCompiler).toBe(false);
  });

  it('never claims to be a compiler or to verify compilation', () => {
    const res1 = validateCodeLocally(ex1, ex1.solutionExample);
    const res2 = validateCodeLocally(ex1, 'invalid syntax');

    expect(res1.verifiedByCompiler).toBe(false);
    expect(res2.verifiedByCompiler).toBe(false);
  });
});
