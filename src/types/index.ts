export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  difficulty: Difficulty;
  question: string;
  codeSnippet?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface ValidationRule {
  id: string;
  description: string;
  type: 'regex' | 'includes' | 'not_includes' | 'custom';
  pattern?: RegExp | string;
  customCheck?: (code: string) => boolean;
  errorMessage: string;
}

export interface CodeExercise {
  id: string;
  lessonId: string;
  title: string;
  instructions: string;
  expectedOutcome: string;
  starterCode: string;
  solutionExample: string;
  rules: ValidationRule[];
  hints: string[];
}

export interface LocalValidationFinding {
  ruleId: string;
  passed: boolean;
  description: string;
  message?: string;
}

export interface LocalValidationResult {
  method: 'heuristic';
  passed: boolean;
  score: number; // percentage
  findings: LocalValidationFinding[];
  feedback: string;
  suggestedFix?: string;
  verifiedByCompiler: false;
}

export interface LessonSummary {
  id: string;
  title: string;
  slug: string;
  trackId: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  order: number;
  description: string;
}

export interface LessonContent extends LessonSummary {
  learningObjectives: string[];
  markdownContent: string;
  interactiveExercise: CodeExercise;
  quizzes: QuizQuestion[];
  documentationLinks: { title: string; url: string }[];
}

export interface CurriculumTrack {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  iconName: string;
  lessonCount: number;
  lessons: LessonSummary[];
}

export interface ExamQuestion {
  id: string;
  category: string;
  difficulty: Difficulty;
  question: string;
  codeSnippet?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface ExamAnswerRecord {
  questionId: string;
  selectedOptionId: string | null;
  isFlagged: boolean;
}

export interface CategoryScore {
  category: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface ExamAttempt {
  id: string;
  startedAt: string;
  submittedAt: string;
  timeSpentSeconds: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  categoryBreakdown: CategoryScore[];
  answers: Record<string, string | null>; // questionId -> selectedOptionId
}

export interface ActiveExamSession {
  attemptId: string;
  startedAt: number; // timestamp ms
  deadlineTimestamp: number; // absolute deadline timestamp ms
  durationSeconds: number;
  currentQuestionIndex: number;
  answers: Record<string, string | null>;
  flaggedQuestions: Record<string, boolean>;
}

export interface CertificateData {
  certificateId: string;
  studentName: string;
  issueDate: string;
  examAttemptId: string;
  score: number;
  percentage: number;
  programTitle: string;
}

export interface AISettings {
  apiBaseUrl: string;
  apiKey: string;
  model: string;
  requestTimeoutMs: number;
  persistToSession: boolean;
}

export interface AIReviewResult {
  isCorrect: boolean;
  score: number; // 0-100
  conceptualErrors: string[];
  feedback: string;
  suggestedFix: string;
  improvementTips: string[];
  compilerDiagnostics: string | null;
}

export interface LearningProgress {
  schemaVersion: number;
  completedLessons: string[];
  quizAttempts: Record<
    string,
    {
      attempts: number;
      bestScore: number;
      completed: boolean;
      lastAttemptedAt: string;
    }
  >;
  completedExercises: string[];
  exerciseDrafts: Record<string, string>; // exerciseId -> saved code
  lastVisitedLesson: string | null;
  examHistory: ExamAttempt[];
  certificates: CertificateData[];
  studentName: string;
  updatedAt: string;
}
