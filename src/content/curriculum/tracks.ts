import { CurriculumTrack, LessonSummary } from '@/types';

export const CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    id: 'track-foundations',
    title: 'Track 1: Rust Core Foundations',
    description: 'Master the compiler model, Cargo tooling, variables, memory basics, and control flow.',
    difficulty: 'beginner',
    iconName: 'Terminal',
    lessonCount: 2,
    lessons: [
      {
        id: 'getting-started',
        slug: 'getting-started',
        trackId: 'track-foundations',
        title: '01. Getting Started with Rust & Cargo',
        order: 1,
        difficulty: 'beginner',
        estimatedMinutes: 20,
        description:
          'Explore rustc, Cargo project layout, build commands, macro fundamentals, and expressions vs statements.',
      },
      {
        id: 'variables-and-types',
        slug: 'variables-and-types',
        trackId: 'track-foundations',
        title: '02. Variables, Types & Control Flow',
        order: 2,
        difficulty: 'beginner',
        estimatedMinutes: 25,
        description:
          'Deep dive into immutability by default, variable shadowing, primitive scalar/compound types, and expression-based control flow.',
      },
    ],
  },
  {
    id: 'track-ownership',
    title: 'Track 2: Memory Safety & Ownership',
    description: 'The defining hallmark of Rust: Stack vs Heap, Move semantics, Borrowing, Lifetimes, and Structs.',
    difficulty: 'intermediate',
    iconName: 'ShieldCheck',
    lessonCount: 2,
    lessons: [
      {
        id: 'ownership-and-borrowing',
        slug: 'ownership-and-borrowing',
        trackId: 'track-ownership',
        title: '03. Ownership, Borrowing & Lifetimes',
        order: 3,
        difficulty: 'intermediate',
        estimatedMinutes: 40,
        description:
          'Understand stack vs heap, move semantics, copy types, the Aliasing XOR Mutability rule, and lifetime parameters.',
      },
      {
        id: 'structs-and-enums',
        slug: 'structs-and-enums',
        trackId: 'track-ownership',
        title: '04. Structs, Enums & Pattern Matching',
        order: 4,
        difficulty: 'intermediate',
        estimatedMinutes: 30,
        description:
          'Construct custom types, associated methods with &self/&mut self, algebraic data types, and exhaustive pattern matching.',
      },
    ],
  },
  {
    id: 'track-idioms',
    title: 'Track 3: Idiomatic Rust & Robust Systems',
    description: 'Idiomatic error handling without null/exceptions, Generics, Trait bounds, and functional iterators.',
    difficulty: 'intermediate',
    iconName: 'Layers',
    lessonCount: 2,
    lessons: [
      {
        id: 'error-handling',
        slug: 'error-handling',
        trackId: 'track-idioms',
        title: '05. Error Handling: Result & Option',
        order: 5,
        difficulty: 'intermediate',
        estimatedMinutes: 30,
        description:
          'Master recoverable errors with Result<T, E>, unrecoverable panics, the ? operator, and standard error conversions.',
      },
      {
        id: 'generics-and-traits',
        slug: 'generics-and-traits',
        trackId: 'track-idioms',
        title: '06. Generics, Traits & Closures',
        order: 6,
        difficulty: 'intermediate',
        estimatedMinutes: 35,
        description:
          'Learn monomorphization, trait bounds, impl Trait, dynamic dispatch, closure capture semantics, and lazy iterators.',
      },
    ],
  },
  {
    id: 'track-advanced',
    title: 'Track 4: Deep Systems & Concurrency',
    description: 'Smart pointers, heap memory allocation, interior mutability, multi-threading, and async fundamentals.',
    difficulty: 'advanced',
    iconName: 'Cpu',
    lessonCount: 2,
    lessons: [
      {
        id: 'smart-pointers',
        slug: 'smart-pointers',
        trackId: 'track-advanced',
        title: '07. Smart Pointers & Memory Management',
        order: 7,
        difficulty: 'advanced',
        estimatedMinutes: 40,
        description:
          'Examine Box<T>, Rc<T>, Arc<T>, RefCell<T>, interior mutability, Deref/Drop traits, and breaking cycles with Weak<T>.',
      },
      {
        id: 'concurrency',
        slug: 'concurrency',
        trackId: 'track-advanced',
        title: '08. Concurrency & Asynchronous Rust',
        order: 8,
        difficulty: 'advanced',
        estimatedMinutes: 45,
        description:
          'Build safe concurrent applications with OS threads, message-passing channels, Arc<Mutex<T>>, Send/Sync, and async/await.',
      },
    ],
  },
];

export const ALL_LESSON_SUMMARIES: LessonSummary[] = CURRICULUM_TRACKS.flatMap((track) => track.lessons);
