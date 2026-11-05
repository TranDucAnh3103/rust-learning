import { CodeExercise, LocalValidationFinding, LocalValidationResult } from '@/types';

/**
 * Evaluates student code against exercise-specific rules.
 * This is an honest static heuristic inspector, NOT a compiler simulator.
 */
export function validateCodeLocally(exercise: CodeExercise, code: string): LocalValidationResult {
  const trimmed = code.trim();

  if (!trimmed) {
    return {
      method: 'heuristic',
      passed: false,
      score: 0,
      findings: [
        {
          ruleId: 'non-empty',
          passed: false,
          description: 'Code presence',
          message: 'The editor is empty. Please provide your Rust implementation.',
        },
      ],
      feedback: 'No code submitted to inspect. Please write your solution before checking.',
      verifiedByCompiler: false,
    };
  }

  const findings: LocalValidationFinding[] = [];
  let passedCount = 0;

  for (const rule of exercise.rules) {
    let passed = false;

    try {
      if (rule.type === 'includes' && rule.pattern) {
        passed = code.includes(String(rule.pattern));
      } else if (rule.type === 'not_includes' && rule.pattern) {
        passed = !code.includes(String(rule.pattern));
      } else if (rule.type === 'regex' && rule.pattern) {
        const regex = typeof rule.pattern === 'string' ? new RegExp(rule.pattern, 'm') : rule.pattern;
        passed = regex.test(code);
      } else if (rule.type === 'custom' && rule.customCheck) {
        passed = rule.customCheck(code);
      }
    } catch {
      passed = false;
    }

    if (passed) {
      passedCount++;
      findings.push({
        ruleId: rule.id,
        passed: true,
        description: rule.description,
      });
    } else {
      findings.push({
        ruleId: rule.id,
        passed: false,
        description: rule.description,
        message: rule.errorMessage,
      });
    }
  }

  const totalRules = exercise.rules.length;
  const score = totalRules > 0 ? Math.round((passedCount / totalRules) * 100) : 100;
  const passed = passedCount === totalRules;

  let feedback = '';
  if (passed) {
    feedback = 'All heuristic static rules passed! Your code matches the expected structural and conceptual requirements for this exercise.';
  } else {
    const failedDescriptions = findings
      .filter((f) => !f.passed)
      .map((f) => f.message || f.description)
      .join('; ');
    feedback = `Heuristic check found ${totalRules - passedCount} unmet condition(s): ${failedDescriptions}`;
  }

  return {
    method: 'heuristic',
    passed,
    score,
    findings,
    feedback,
    suggestedFix: passed ? undefined : exercise.hints[0] || 'Review the exercise instructions and ensure required keywords/types are declared.',
    verifiedByCompiler: false,
  };
}
