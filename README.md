# RustForge

> **Production-Quality Interactive Rust Learning & Assessment Platform**
> *Master Rust. Understand the System.*

RustForge is an interactive, client-side educational platform designed to teach modern systems programming in Rust. It runs completely in the browser with **no backend server or database**, persists all learner state locally via versioned `localStorage`, and deploys as a static website on GitHub Pages.

---

## 1. Quick Start & Development Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (Vite + HMR)
npm run dev

# 3. Verify TypeScript type safety
npm run typecheck

# 4. Run automated test suites (Vitest + Testing Library)
npm run test

# 5. Build static production distribution
npm run build

# 6. Preview the production build locally
npm run preview
```

---

## 2. Platform Architecture & Tech Stack

| Layer | Technology | Architectural Role |
|---|---|---|
| **Framework** | React 18 + TypeScript | Component architecture with strict typing (`noUnusedLocals`, `strict: true`) |
| **Build Tool** | Vite 5 | Fast HMR, Rollup manual chunking, and code splitting |
| **Routing** | React Router (`HashRouter`) | Client-side routing with zero 404s on GitHub Pages refresh |
| **Styling** | Tailwind CSS + Custom Tokens | Dark glassmorphism, responsive breakpoints, WCAG contrast compliance |
| **Code Editor** | CodeMirror 6 | Rust syntax highlighting, One Dark theme, line numbers, bracket matching |
| **Persistence** | `localStorage` + Schema Migrations | Versioned storage (`v1`), corrupt data recovery, JSON import/export |
| **Validation** | Heuristic Rule Engine | Deterministic offline pattern checks with honest static-only labeling |
| **AI Review** | Fetch API + OpenAI-compatible API | In-memory key security, timeout control, runtime JSON schema validation |
| **Testing** | Vitest + React Testing Library | 22 unit tests covering examination, quizzes, storage, and heuristic rules |
| **Deployment** | GitHub Actions (`deploy.yml`) | Automated static deployment to GitHub Pages upon push to `main` |

---

## 3. Core Features

### 3.1 Eight Substantive Curriculum Modules
RustForge includes 8 in-depth, production-grade learning modules:
1. **01. Getting Started with Rust & Cargo:** Toolchain model, `cargo new/build/run/check`, expressions vs statements.
2. **02. Variables, Types & Control Flow:** Immutability by default, shadowing vs mutation, scalar/compound types, expression-based `if` and `loop`.
3. **03. Ownership, Borrowing & Lifetimes:** Stack vs heap, the 3 ownership rules, move semantics vs `Copy`, the Aliasing XOR Mutability rule, lifetime annotations (`'a`).
4. **04. Structs, Enums & Pattern Matching:** Named structs, tuple structs, `impl` blocks with `&self` and `&mut self`, algebraic data types, exhaustive `match`, `if let`.
5. **05. Error Handling: Result & Option:** Eliminating null/exceptions, `Result<T, E>` and `Option<T>`, the `?` try operator, error propagation with `From`.
6. **06. Generics, Traits & Closures:** Zero-cost monomorphization, trait bounds, `impl Trait` vs dynamic dispatch (`dyn Trait`), `Fn`/`FnMut`/`FnOnce`, lazy iterators.
7. **07. Smart Pointers & Memory Management:** `Box<T>` for recursive types, `Rc<T>` and `Arc<T>` reference counting, `RefCell<T>` interior mutability, breaking cycles with `Weak<T>`.
8. **08. Concurrency & Asynchronous Rust:** Native OS threads, `move` closures, `mpsc` message passing, `Arc<Mutex<T>>`, `Send` and `Sync` marker traits, async futures and executors.

### 3.2 Lesson Quiz Engine
- Every lesson features 3 to 5 multiple-choice questions (32 questions in total across the course).
- Immediate answer checking with detailed pedagogical explanations.
- Distinguishes questions attempted, questions answered correctly, and best recorded performance.
- Retrying a quiz updates the best score without duplicating completed lessons.

### 3.3 Interactive Playground & Offline Heuristic Validator
- Resizable, syntax-highlighted CodeMirror 6 workspace with dark theme.
- Pre-loaded with exercise starter code and solution examples for all 8 modules.
- **Deterministic Offline Validation:** Multi-rule static inspection verifying syntax presence, identifier contracts, and prohibited anti-patterns.
- **Honest Labeling:** Clearly marked as *"Static checks only. Compilation not performed."* No fabricated compiler output or simulated execution.
- Includes a 1-click shortcut to execute code directly in the official remote Rust Playground (`play.rust-lang.org`).

### 3.4 Optional AI-Powered Code Review
- Configure any OpenAI-compatible completions endpoint (e.g. OpenAI, DeepSeek, OpenRouter, Ollama, LocalAI).
- **Security Boundary:** Credentials are kept in-memory by default. An explicit opt-in checkbox allows optional `sessionStorage` (cleared when the browser tab closes).
- No keys are ever bundled, logged, or exposed in URLs.
- Graceful error handling for CORS restrictions, invalid keys (401), rate limits (429), timeouts, and network drops.

### 3.5 Complete Certification Examination System
- **Question Bank:** Exactly 30 distinct, technically rigorous questions (10 Beginner, 12 Intermediate, 8 Advanced) covering the entire Rust curriculum.
- **Timed Assessment:** 40-minute countdown timer backed by an absolute deadline timestamp in `localStorage`.
- **Reload Recovery:** Refreshing or navigating away preserves the active attempt and remaining countdown without resetting the timer.
- **Interactive Question Grid:** Direct navigation across questions 1 to 30, visual status tracking for Answered, Flagged, and Unanswered items.
- **Scoring:** 1 point per correct question (max 30). Passing threshold is **75% (minimum 23/30)**.
- **Pedagogic Review:** Complete question-by-question analysis with answer explanations is revealed only after submission.

### 3.6 Digital Certificate of Completion
- Automatically unlocked when achieving $\ge 75\%$ on the examination.
- Customizable student display name.
- Generates a unique credential ID (`crypto.randomUUID()`).
- Styled with dark frosted glass aesthetics and print-ready CSS (`@media print` for saving to PDF).
- **Transparency Statement:** Unobtrusively marked as a *self-assessed RustForge learning achievement*. No false claims of external accreditation or official Rust Foundation affiliation.

---

## 4. GitHub Pages Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Go to your repository settings on GitHub: **Settings → Pages**.
2. Under **Build and deployment**, select **Source: GitHub Actions**.
3. Push changes to the `main` branch or trigger manually via **Actions → Deploy RustForge to GitHub Pages → Run workflow**.
4. The site will be published at `https://<username>.github.io/<repo-name>/`.
5. Because the app uses `HashRouter` and relative asset base paths (`./`), page reloads and deep links will never encounter 404 errors.

---

## 5. Security & Browser Limitations

1. **Client-Side Secret Exposure:** Because RustForge is 100% static, AI requests originate directly from the user's browser. Do not supply high-privilege production credentials; use restricted API keys with spending caps.
2. **CORS Restrictions:** Some AI API providers disallow browser-origin requests. In such cases, use an OpenAI-compatible proxy with CORS enabled or run local providers like Ollama.
3. **Local State Non-Tamper-Proofing:** Local storage and client-side timers cannot guarantee cryptographic tamper-resistance. This platform is built for honest self-directed mastery.

---

## 6. License

MIT License. Designed and built with ❤️ for Rustaceans worldwide.
