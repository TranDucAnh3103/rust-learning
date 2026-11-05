import { LessonContent } from '@/types';
import { LESSON_EXERCISES } from './exercises';
import { LESSON_QUIZZES } from './quizzes';

export const LESSONS: Record<string, LessonContent> = {
  'getting-started': {
    id: 'getting-started',
    slug: 'getting-started',
    trackId: 'track-foundations',
    title: '01. Getting Started with Rust & Cargo',
    order: 1,
    difficulty: 'beginner',
    estimatedMinutes: 20,
    description:
      'Explore rustc, Cargo project layout, build commands, macro fundamentals, and expressions vs statements.',
    learningObjectives: [
      'Understand why Rust provides memory safety and concurrency without a garbage collector',
      'Master the standard Cargo workflow: cargo new, build, run, and check',
      'Understand the difference between the rustc compiler and the Cargo build system',
      'Distinguish between expressions that produce values and statements that perform actions',
    ],
    documentationLinks: [
      { title: 'The Rust Book - Getting Started', url: 'https://doc.rust-lang.org/book/ch01-00-getting-started.html' },
      { title: 'Cargo Guide', url: 'https://doc.rust-lang.org/cargo/' },
    ],
    interactiveExercise: LESSON_EXERCISES['getting-started'],
    quizzes: LESSON_QUIZZES['getting-started'],
    markdownContent: `
# Getting Started with Rust & Cargo

Welcome to **RustForge**. Rust is an open-source systems programming language developed to solve the classic dilemma of systems software: **how to achieve low-level performance and control without sacrificing memory safety, thread safety, and developer ergonomics**.

---

## 1. The Rust Philosophy: Zero-Cost Abstractions & Safety

Traditional systems programming languages like C and C++ grant bare-metal memory control with manual pointers (\`malloc\` / \`free\`), but leave software vulnerable to buffer overflows, use-after-free bugs, double frees, and data races. Managed languages like Go, Java, or C# solve safety through an automated runtime Garbage Collector (GC), but introduce non-deterministic latency spikes, heap allocations, and memory footprints unacceptable for kernel development, embedded microcontrollers, or game engines.

Rust achieves **both speed and mathematical safety** by shifting memory validation from runtime to **compile time**. The compiler (\`rustc\`) enforces strict ownership and borrowing rules. If your code compiles, it is guaranteed free of spatial memory errors and data races, with **zero runtime GC overhead**.

---

## 2. The Cargo Toolchain

Cargo is Rust's official build system and package manager. It handles compiling code, downloading libraries (crates), and managing dependencies.

### Key Cargo Commands

| Command | Purpose | When to use |
|---|---|---|
| \`cargo new <project_name>\` | Initializes a new binary or library crate | At project creation |
| \`cargo build\` | Compiles your crate and dependencies into \`target/debug/\` | When you need an executable |
| \`cargo run\` | Compiles and immediately executes the binary | Everyday development |
| \`cargo check\` | Rapidly runs compiler analysis without linking machine code | Continuous syntax & borrow checking |
| \`cargo test\` | Runs unit tests, integration tests, and documentation tests | Testing & CI/CD |

### Standard Project Layout

\`\`\`text
my-project/
├── Cargo.toml       # Manifest file: metadata and dependencies
├── Cargo.lock       # Pinned exact versions of resolved crates
└── src/
    └── main.rs      # Root binary entry point with fn main()
\`\`\`

---

## 3. Hello World: Deconstructing Rust Syntax

Here is the canonical Rust entry point:

\`\`\`rust
fn main() {
    println!("Hello, RustForge!");
}
\`\`\`

### Key Syntax Elements:
1. **\`fn\`**: Keyword used to declare a function.
2. **\`main()\`**: The entry point of every executable Rust binary.
3. **\`println!\`**: Note the exclamation point (\`!\`). This indicates a **macro invocation**, not a standard function call. Macros in Rust expand into code during compilation, allowing variable arguments and format string type-checking.

---

## 4. Code Examples

### Example 1.1: Formatted Output with Macros (Compiles)
\`\`\`rust
fn main() {
    let language = "Rust";
    let edition = 2024;
    println!("Welcome to {}, edition {}!", language, edition);
    // Positional and named arguments are supported:
    println!("{lang} is fast, safe, and modern.", lang = language);
}
\`\`\`

### Example 1.2: Expressions vs Statements (Compiles)
In Rust, almost everything is an **expression** that evaluates to a value. Statements perform actions and do not evaluate to values (they return \`()\`, the unit type).
\`\`\`rust
fn main() {
    // A statement declaring 'y'
    let y = {
        let x = 3;
        x + 1 // Note: NO semicolon here! This expression returns 4
    };

    println!("Value of y is: {}", y); // prints 4
}
\`\`\`

### Example 1.3: Accidentally Turning an Expression into a Statement (Fails to Compile)
\`\`\`rust
// [EXPECTED COMPILE FAILURE: E0308 - Mismatched types]
fn compute_value() -> i32 {
    let x = 10;
    x + 5; // Error! The semicolon turns this into a statement returning ()
}

fn main() {
    let _val = compute_value();
}
\`\`\`
*Explanation:* In Rust, omitting the trailing semicolon on the final line of a block makes it the implicit return value of the block. Adding \`;\` produces \`()\`, which does not match the declared return type \`i32\`.

---

## 5. Common Beginner Mistakes

1. **Confusing \`cargo build\` with \`cargo check\`:**
   Running \`cargo build\` repeatedly during code authoring wastes time linking binaries. Use \`cargo check\` for rapid feedback loops.
2. **Adding semicolons to return expressions:**
   When writing helper functions, remember that \`return x;\` is valid, but the idiomatic Rust style is simply \`x\` without a semicolon on the last line.
3. **Editing \`Cargo.lock\` manually:**
   Never edit \`Cargo.lock\` by hand; it is managed deterministically by Cargo.

---

## 6. Summary & Practical Checklist

- Rust compiles directly to native machine code using LLVM.
- Use \`cargo check\` for instant type and borrow checker feedback.
- Macro calls are denoted by \`!\` (e.g., \`println!\`, \`vec!\`, \`format!\`).
- Blocks and control flow structures evaluate to values if the trailing expression lacks a semicolon.
`,
  },

  'variables-and-types': {
    id: 'variables-and-types',
    slug: 'variables-and-types',
    trackId: 'track-foundations',
    title: '02. Variables, Types & Control Flow',
    order: 2,
    difficulty: 'beginner',
    estimatedMinutes: 25,
    description:
      'Deep dive into immutability by default, variable shadowing, primitive scalar/compound types, and expression-based control flow.',
    learningObjectives: [
      'Understand the reasoning and guarantees behind immutability by default',
      'Distinguish between variable mutability (`let mut`) and variable shadowing (`let`)',
      'Master scalar types (integers, floats, booleans, chars) and compound types (tuples, arrays)',
      'Write expression-oriented control flow with if, loop, while, and for',
    ],
    documentationLinks: [
      { title: 'The Rust Book - Common Programming Concepts', url: 'https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html' },
      { title: 'Rust By Example - Primitives', url: 'https://doc.rust-lang.org/rust-by-example/primitives.html' },
    ],
    interactiveExercise: LESSON_EXERCISES['variables-and-types'],
    quizzes: LESSON_QUIZZES['variables-and-types'],
    markdownContent: `
# Variables, Types & Control Flow

In Rust, variables are **immutable by default**. This foundational design choice nudges developers toward safer, highly concurrent code by preventing accidental mutations across functions.

---

## 1. Immutability vs Mutability vs Shadowing

When you declare a binding with \`let x = 5;\`, the value of \`x\` cannot be altered.

\`\`\`rust
// [EXPECTED COMPILE FAILURE: E0384 - Cannot assign twice to immutable variable]
let x = 5;
x = 6; // rustc refuses to compile this!
\`\`\`

To allow mutation, explicitly use the \`mut\` keyword:
\`\`\`rust
let mut counter = 0;
counter += 1; // Valid: explicitly opted into mutation
\`\`\`

### Variable Shadowing
Shadowing allows you to declare a *new* variable using an existing name with the \`let\` keyword. It has two major superpowers:
1. **Type Transformation:** You can reuse a clean variable name while changing its type (e.g., parsing a string input into a number).
2. **Immutable Re-binding:** After transforming data, the new variable remains immutable.

\`\`\`rust
let spaces = "   "; // &str
let spaces = spaces.len(); // usize - shadowed!
\`\`\`

---

## 2. Primitive Data Types

Rust is statically typed. The compiler can infer almost all local variable types, but explicit annotations are supported.

### Scalar Types
- **Integers:** Signed (\`i8\`, \`i16\`, \`i32\`, \`i64\`, \`i128\`, \`isize\`) and Unsigned (\`u8\`, \`u16\`, \`u32\`, \`u64\`, \`u128\`, \`usize\`). Default is \`i32\`.
- **Floating-Point:** \`f32\` and \`f64\` (IEEE-754). Default is \`f64\`.
- **Boolean:** \`bool\` with values \`true\` or \`false\`.
- **Character:** \`char\`, representing a four-byte Unicode Scalar Value (supports emojis, accented glyphs, Chinese/Japanese characters).

### Compound Types
- **Tuples:** Fixed-length heterogeneous groups: \`let tup: (i32, f64, u8) = (500, 6.4, 1);\`. Elements are accessed via \`tup.0\`, \`tup.1\`.
- **Arrays:** Fixed-length homogeneous groups stored contiguously on the stack: \`let arr: [i32; 5] = [1, 2, 3, 4, 5];\`. Access via \`arr[0]\`.

---

## 3. Control Flow as Expressions

Unlike C or Java where \`if\` is a statement, in Rust \`if\` is an **expression**. You can assign the result of an \`if\` directly to a variable:

\`\`\`rust
let condition = true;
let number = if condition { 42 } else { 0 };
\`\`\`

### Loops in Rust
- **\`loop\`**: Infinite loop. Can return a value with \`break value;\`.
- **\`while condition\`**: Evaluates condition before each iteration.
- **\`for item in collection\`**: Idiomatic iteration over ranges or slices (e.g. \`for i in 1..=10\`).

---

## 4. Code Examples

### Example 2.1: Returning Values from a Loop (Compiles)
\`\`\`rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2; // Returns 20 from the loop expression!
        }
    };

    println!("Loop evaluated to: {}", result); // 20
}
\`\`\`

### Example 2.2: Array Iteration with Range (Compiles)
\`\`\`rust
fn main() {
    let primes = [2, 3, 5, 7, 11];

    for (index, &prime) in primes.iter().enumerate() {
        println!("Prime index {}: {}", index, prime);
    }
}
\`\`\`

### Example 2.3: Mismatched Types in \`if\` Arms (Fails to Compile)
\`\`\`rust
// [EXPECTED COMPILE FAILURE: E0308 - \`if\` and \`else\` have incompatible types]
fn main() {
    let flag = true;
    let value = if flag {
        5      // evaluates to integer
    } else {
        "five" // evaluates to &str! Incompatible types!
    };
    println!("Value: {:?}", value);
}
\`\`\`
*Explanation:* Rust requires every branch of an expression to evaluate to the exact same type known at compile time.

---

## 5. Common Beginner Mistakes

1. **Attempting to modify array sizes:**
   \`[T; N]\` arrays cannot grow or shrink. For dynamic lists, use \`Vec<T>\`.
2. **Confusing \`char\` with strings:**
   \`'a'\` (single quotes) is a 4-byte Unicode \`char\`. \`"a"\` (double quotes) is a string slice \`&str\`.
3. **Integer overflow in release builds:**
   In debug mode, Rust checks for integer overflow and panics. In release mode (\`--release\`), Rust performs two's complement wrapping.
`,
  },

  'ownership-and-borrowing': {
    id: 'ownership-and-borrowing',
    slug: 'ownership-and-borrowing',
    trackId: 'track-ownership',
    title: '03. Ownership, Borrowing & Lifetimes',
    order: 3,
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    description:
      'Understand stack vs heap, move semantics, copy types, the Aliasing XOR Mutability rule, and lifetime parameters.',
    learningObjectives: [
      'Master the distinction between Stack and Heap memory allocations',
      'Explain the 3 Ownership Rules and describe move semantics vs Copy types',
      'Apply the Aliasing XOR Mutability rule (Data Race Free invariant)',
      'Interpret and write lifetime annotations to safely return references',
    ],
    documentationLinks: [
      { title: 'The Rust Book - Understanding Ownership', url: 'https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html' },
      { title: 'The Rustonomicon - Lifetimes', url: 'https://doc.rust-lang.org/nomicon/lifetimes.html' },
    ],
    interactiveExercise: LESSON_EXERCISES['ownership-and-borrowing'],
    quizzes: LESSON_QUIZZES['ownership-and-borrowing'],
    markdownContent: `
# Ownership, Borrowing & Lifetimes

**Ownership** is Rust's most distinctive feature. It enables deterministic memory safety without a garbage collector or manual deallocation.

---

## 1. Stack vs Heap Memory

Understanding ownership begins with system memory layout:

| Attribute | Stack Memory | Heap Memory |
|---|---|---|
| **Allocation speed** | Extremely fast (moves stack pointer) | Slower (allocator searches free memory) |
| **Size requirement** | Known, fixed size at compile time | Dynamic or variable size at runtime |
| **Data locality** | Cache-friendly contiguous memory | Pointer chasing through memory addresses |
| **Examples** | \`i32\`, \`bool\`, arrays \`[i32; 4]\`, pointer descriptors | \`String\` buffer, \`Vec<T>\`, \`Box<T>\` |

---

## 2. The Three Rules of Ownership

1. **Each value in Rust has an owner.**
2. **There can only be one owner at a time.**
3. **When the owner goes out of scope, the value is dropped.**

### Move Semantics vs Copy Types
When data implements the \`Copy\` trait (like primitive integers, floats, booleans), assigning \`let y = x;\` performs a bitwise copy on the stack. Both \`x\` and \`y\` remain valid.

When data owns heap memory (like \`String\`), assigning \`let s2 = s1;\` moves ownership. Rust copies the 24-byte stack descriptor (pointer, length, capacity) to \`s2\` and **invalidates \`s1\`**. This prevents **double-free errors** when variables leave scope!

\`\`\`text
STACK                                 HEAP
+-------+-----+-----+               +---+---+---+---+---+
| ptr   | len | cap | ------------> | R | u | s | t | ! |
+-------+-----+-----+               +---+---+---+---+---+
  s1 (Invalidated!)
  s2 (New Sole Owner)
\`\`\`

---

## 3. Borrowing: References and the Aliasing XOR Mutability Law

Rather than transferring ownership, functions can **borrow** values via references.

### The Golden Rule of References:
At any given moment, you may have **EITHER**:
- **Any number of immutable references (\`&T\`)**
- **OR exactly ONE mutable reference (\`&mut T\`)**
- **NEVER BOTH SIMULTANEOUSLY.**

This prevents **data races**, which require three concurrent conditions:
1. Two or more pointers accessing the same memory concurrently.
2. At least one of the accesses is a write.
3. No synchronization mechanisms in place.
Rust completely eliminates this at compile time!

---

## 4. Code Examples

### Example 3.1: Immutable Borrowing (Compiles)
\`\`\`rust
fn calculate_length(s: &String) -> usize {
    s.len() // Borrowed immutably; reading is safe
}

fn main() {
    let s1 = String::from("RustForge");
    let len = calculate_length(&s1); // Pass reference (&)
    // s1 is still valid here because calculate_length only borrowed it!
    println!("'{}' has length {}.", s1, len);
}
\`\`\`

### Example 3.2: Use After Move (Fails to Compile)
\`\`\`rust
// [EXPECTED COMPILE FAILURE: E0382 - Borrow of moved value \`s1\`]
fn main() {
    let s1 = String::from("Hello");
    let s2 = s1; // Ownership moved to s2! s1 is now invalidated.

    println!("Value of s1: {}", s1); // Error! s1 cannot be accessed.
}
\`\`\`
*Explanation:* Rust invalidates \`s1\` upon assignment to \`s2\`. Attempting to read \`s1\` yields compiler error E0382.

### Example 3.3: Violating Aliasing XOR Mutability (Fails to Compile)
\`\`\`rust
// [EXPECTED COMPILE FAILURE: E0502 - Cannot borrow \`data\` as mutable because it is also borrowed as immutable]
fn main() {
    let mut data = String::from("Rust");

    let ref1 = &data; // Immutable borrow
    let ref2 = &mut data; // ERROR! Cannot borrow mutably while ref1 exists

    println!("ref1: {}, ref2: {}", ref1, ref2);
}
\`\`\`
*Explanation:* Reading through \`ref1\` while \`ref2\` modifies \`data\` could invalidate \`ref1\`'s pointer if re-allocation occurs, causing undefined behavior.

---

## 5. Lifetimes Explained

Lifetimes ensure that **references never outlive the data they point to**, preventing dangling references.
Rust can infer most lifetimes through *Lifetime Elision Rules*. However, when a function accepts multiple reference arguments and returns a reference, you must specify their relationship:

\`\`\`rust
// The returned reference will live as long as the SHORTER of 'x' and 'y'
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`

---

## 6. Common Beginner Mistakes

1. **Attempting to modify through an immutable reference:**
   Passing \`&String\` only allows reading. You must pass \`&mut String\` and declare \`let mut s\` to modify it.
2. **Returning references to local stack variables:**
   Returning \`&String\` created inside a function causes E0106 ("returns a reference to data owned by the current function"). Return the owned \`String\` instead!
3. **Cloning everywhere to appease the borrow checker:**
   Calling \`.clone()\` is sometimes appropriate, but excessive cloning destroys performance. Learn to structure references and lifetimes properly.
`,
  },

  'structs-and-enums': {
    id: 'structs-and-enums',
    slug: 'structs-and-enums',
    trackId: 'track-ownership',
    title: '04. Structs, Enums & Pattern Matching',
    order: 4,
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    description:
      'Construct custom types, associated methods with &self/&mut self, algebraic data types, and exhaustive pattern matching.',
    learningObjectives: [
      'Define named structs, tuple structs, and unit-like structs',
      'Implement methods and associated functions inside impl blocks',
      'Model domain data using rich Enums with associated payloads',
      'Write exhaustive pattern matching using match, if let, and let else',
    ],
    documentationLinks: [
      { title: 'The Rust Book - Structs', url: 'https://doc.rust-lang.org/book/ch05-00-structs.html' },
      { title: 'The Rust Book - Enums and Pattern Matching', url: 'https://doc.rust-lang.org/book/ch06-00-enums.html' },
    ],
    interactiveExercise: LESSON_EXERCISES['structs-and-enums'],
    quizzes: LESSON_QUIZZES['structs-and-enums'],
    markdownContent: `
# Structs, Enums & Pattern Matching

Rust provides expressive algebraic data types: **Structs** for grouping related data, and **Enums** for representing values that can be one of several distinct variants.

---

## 1. Structs and Implementation Blocks

There are three flavors of structs in Rust:
1. **Named-Field Structs:** Clear field labels: \`struct User { username: String, active: bool }\`.
2. **Tuple Structs:** Positional fields without names: \`struct Color(i32, i32, i32);\`.
3. **Unit-Like Structs:** Zero fields: \`struct Marker;\` (useful for marker traits).

### Methods and Associated Functions
Methods are declared inside an \`impl\` block. The first parameter specifies how the method accesses the instance:
- **\`&self\`**: Borrows instance immutably (read-only inspection).
- **\`&mut self\`**: Borrows instance mutably (can mutate struct fields).
- **\`self\`**: Takes ownership of the instance (often used for transformations or builders).
- **No self (\`Self::new(...)\`)**: Associated function (constructor).

---

## 2. Enums: Tagged Unions with Associated Data

Unlike C or TypeScript enums which are simple integers or strings, Rust enums can embed distinct data structures inside each variant:

\`\`\`rust
enum WebEvent {
    PageLoad,
    KeyPress(char),
    Paste(String),
    Click { x: i64, y: i64 },
}
\`\`\`

---

## 3. Pattern Matching with \`match\`

Pattern matching is **exhaustive**: rustc verifies that every single possible variant is handled.

\`\`\`rust
fn inspect_event(event: WebEvent) {
    match event {
        WebEvent::PageLoad => println!("Page loaded"),
        WebEvent::KeyPress(c) => println!("Pressed: {}", c),
        WebEvent::Paste(s) => println!("Pasted: {}", s),
        WebEvent::Click { x, y } => println!("Clicked at ({}, {})", x, y),
    }
}
\`\`\`

### Compact Matching: \`if let\` and \`let else\`
When you only care about one variant:
\`\`\`rust
if let WebEvent::KeyPress(c) = event {
    println!("User typed: {}", c);
}
\`\`\`

---

## 4. Code Examples

### Example 4.1: Methods on Structs (Compiles)
\`\`\`rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Constructor (associated function)
    fn new(width: u32, height: u32) -> Self {
        Self { width, height }
    }

    // Instance method borrowing &self
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle::new(30, 50);
    println!("Rectangle area: {} px^2", rect.area());
}
\`\`\`

### Example 4.2: Non-Exhaustive Match (Fails to Compile)
\`\`\`rust
// [EXPECTED COMPILE FAILURE: E0004 - Non-exhaustive patterns: \`Option::None\` not covered]
fn print_number(val: Option<i32>) {
    match val {
        Some(n) => println!("Number: {}", n),
        // Missing None arm!
    }
}

fn main() {
    print_number(Some(42));
}
\`\`\`
*Explanation:* Rust requires all possibilities to be accounted for. Add \`None => println!("Empty")\` to fix this.

---

## 5. Common Beginner Mistakes

1. **Forgetting \`mut\` on struct instances:**
   If a struct instance is immutable, you cannot call \`&mut self\` methods on it or reassign fields.
2. **Missing \`#[derive(Debug)]\`:**
   To print a struct with \`println!("{:?}", my_struct);\`, you must annotate the struct definition with \`#[derive(Debug)]\`.
`,
  },

  'error-handling': {
    id: 'error-handling',
    slug: 'error-handling',
    trackId: 'track-idioms',
    title: '05. Error Handling: Result & Option',
    order: 5,
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    description:
      'Master recoverable errors with Result<T, E>, unrecoverable panics, the ? operator, and standard error conversions.',
    learningObjectives: [
      'Contrast recoverable errors (Result) with unrecoverable crashes (panic!)',
      'Safely unpack and transform values using Option<T> and Result<T, E>',
      'Eliminate unsafe unwrap() calls in production systems',
      'Propagate errors cleanly with the ? try operator and the From trait',
    ],
    documentationLinks: [
      { title: 'The Rust Book - Error Handling', url: 'https://doc.rust-lang.org/book/ch09-00-error-handling.html' },
      { title: 'Rust By Example - Error Handling', url: 'https://doc.rust-lang.org/rust-by-example/error.html' },
    ],
    interactiveExercise: LESSON_EXERCISES['error-handling'],
    quizzes: LESSON_QUIZZES['error-handling'],
    markdownContent: `
# Error Handling: Result & Option

Rust has **no exceptions** and **no null pointers**. Instead, failure is modeled directly in the type system using two core standard library enums: \`Option<T>\` and \`Result<T, E>\`.

---

## 1. Recoverable vs Unrecoverable Errors

- **Recoverable Errors:** Expected conditions (e.g. file not found, bad network response, invalid user input). Represented via \`Result<T, E>\`. Calling code can inspect, retry, or report the error.
- **Unrecoverable Errors:** Invariant violations, assertion failures, or out-of-bounds array access. Triggered with \`panic!\`. By default, panics unwind the stack and abort the thread.

---

## 2. Anatomy of \`Result\` and \`Option\`

\`\`\`rust
// Defined in std::result
enum Result<T, E> {
    Ok(T),
    Err(E),
}

// Defined in std::option
enum Option<T> {
    Some(T),
    None,
}
\`\`\`

Both types are imported automatically in the standard prelude.

---

## 3. The Dangerous Allure of \`.unwrap()\`

Calling \`.unwrap()\` extracts the value inside \`Ok\` or \`Some\`. If the value is \`Err\` or \`None\`, **it immediately crashes the program with a panic**.

In production code:
- Prefer \`.expect("custom context message")\` over \`.unwrap()\` when a panic is intentional or logically impossible.
- Better yet, use pattern matching, \`unwrap_or\`, \`unwrap_or_else\`, or the **\`?\` operator**.

---

## 4. The \`?\` Operator: Idiomatic Error Propagation

The question mark operator (\`?\`) replaces verbose \`match\` blocks. When placed after an expression returning \`Result\` or \`Option\`:
1. If the value is \`Ok(v)\`, it unwraps and evaluates to \`v\`.
2. If the value is \`Err(e)\`, it **returns early** from the enclosing function with \`Err(From::from(e))\`.

\`\`\`rust
fn read_username_from_file() -> Result<String, std::io::Error> {
    let mut username = String::new();
    std::fs::File::open("users.txt")?.read_to_string(&mut username)?;
    Ok(username)
}
\`\`\`

---

## 5. Code Examples

### Example 5.1: Safe Propagation with \`?\` (Compiles)
\`\`\`rust
use std::num::ParseIntError;

fn multiply_strings(a: &str, b: &str) -> Result<i32, ParseIntError> {
    let num_a = a.parse::<i32>()?;
    let num_b = b.parse::<i32>()?;
    Ok(num_a * num_b)
}

fn main() {
    match multiply_strings("10", "5") {
        Ok(product) => println!("Product: {}", product),
        Err(e) => println!("Parsing error: {}", e),
    }
}
\`\`\`

### Example 5.2: Using \`?\` in a Function That Does Not Return Result (Fails to Compile)
\`\`\`rust
// [EXPECTED COMPILE FAILURE: E0277 - The \`?\` operator can only be used in a function that returns \`Result\` or \`Option\`]
fn main() {
    let number = "42".parse::<i32>()?; // Error! main returns ()
    println!("Number: {}", number);
}
\`\`\`
*Explanation:* You cannot use \`?\` in a function whose return type cannot represent an error. Change \`fn main() -> Result<(), Box<dyn std::error::Error>>\` to allow \`?\` in main.

---

## 6. Common Beginner Mistakes

1. **Scattering \`.unwrap()\` throughout library code:**
   Libraries should almost never panic; always return a \`Result\` to let the consumer decide how to handle failure.
2. **Ignoring compiler warnings on unused Results:**
   Rust tags \`Result\` with \`#[must_use]\`. If you call a function returning \`Result\` without checking it, rustc issues a warning.
`,
  },

  'generics-and-traits': {
    id: 'generics-and-traits',
    slug: 'generics-and-traits',
    trackId: 'track-idioms',
    title: '06. Generics, Traits & Closures',
    order: 6,
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    description:
      'Learn monomorphization, trait bounds, impl Trait, dynamic dispatch, closure capture semantics, and lazy iterators.',
    learningObjectives: [
      'Write reusable algorithms with Generics and compile-time Monomorphization',
      'Define and implement Traits to establish shared interfaces and contracts',
      'Compare Static Dispatch (impl Trait) with Dynamic Dispatch (dyn Trait)',
      'Understand closure capture mechanisms (Fn, FnMut, FnOnce) and iterator pipelines',
    ],
    documentationLinks: [
      { title: 'The Rust Book - Generic Types, Traits, and Lifetimes', url: 'https://doc.rust-lang.org/book/ch10-00-generics.html' },
      { title: 'The Rust Book - Functional Language Features: Iterators and Closures', url: 'https://doc.rust-lang.org/book/ch13-00-functional-features.html' },
    ],
    interactiveExercise: LESSON_EXERCISES['generics-and-traits'],
    quizzes: LESSON_QUIZZES['generics-and-traits'],
    markdownContent: `
# Generics, Traits & Closures

Generics and Traits are how Rust enables **high-level polymorphism with zero runtime performance cost**.

---

## 1. Generics & Monomorphization

Generics allow functions and data structures to operate on multiple types without code duplication:

\`\`\`rust
fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
\`\`\`

### Zero-Cost Monomorphization
When compiling generic code, \`rustc\` performs **monomorphization**: it generates specialized native machine code copies for each concrete type used (e.g. \`largest_i32\`, \`largest_f64\`). There is no runtime dispatch penalty.

---

## 2. Traits: Defining Shared Behavior

A **trait** defines functionality a type can provide, similar to interfaces in other languages:

\`\`\`rust
pub trait Describable {
    fn describe(&self) -> String;
}
\`\`\`

### Trait Bounds and \`impl Trait\`
\`\`\`rust
// Shorthand syntax:
fn notify(item: &impl Describable) {
    println!("{}", item.describe());
}

// Where-clause syntax for complex constraints:
fn process<T, U>(t: &T, u: &U) -> i32
where
    T: Describable + Clone,
    U: std::fmt::Debug,
{
    // ...
    0
}
\`\`\`

---

## 3. Closures and the Three Closure Traits

Closures are anonymous functions that can capture values from their enclosing scope. Rust automatically implements one or more closure traits:
- **\`Fn\`**: Borrows captured values immutably (\`&T\`). Can be called multiple times concurrently.
- **\`FnMut\`**: Borrows captured values mutably (\`&mut T\`). Can modify state between calls.
- **\`FnOnce\`**: Takes ownership of captured values (\`T\`). Can only be called once because it consumes captured state.

---

## 4. Lazy Iterators

Iterators in Rust are **lazy**: chaining adapters like \`.map()\` and \`.filter()\` does zero work until consumed by a terminal method like \`.collect()\` or \`.sum()\`.

\`\`\`rust
let numbers = vec![1, 2, 3, 4, 5];
let evens_squared: Vec<i32> = numbers
    .into_iter()
    .filter(|&x| x % 2 == 0)
    .map(|x| x * x)
    .collect();
\`\`\`

---

## 5. Code Examples

### Example 6.1: Custom Trait Implementation (Compiles)
\`\`\`rust
trait Printable {
    fn format_display(&self) -> String;
}

struct Point {
    x: f64,
    y: f64,
}

impl Printable for Point {
    fn format_display(&self) -> String {
        format!("Point({}, {})", self.x, self.y)
    }
}

fn print_it(p: &impl Printable) {
    println!("{}", p.format_display());
}

fn main() {
    let pt = Point { x: 3.5, y: 7.2 };
    print_it(&pt);
}
\`\`\`

### Example 6.2: Calling a Closure That Violates FnMut Rules (Fails to Compile)
\`\`\`rust
// [EXPECTED COMPILE FAILURE: E0596 - Cannot borrow \`mut_closure\` as mutable, as it is not declared as mutable]
fn main() {
    let mut count = 0;
    let mut_closure = || {
        count += 1; // mutates captured variable 'count'
    };

    mut_closure(); // Error! mut_closure must be declared as \`let mut mut_closure\`
}
\`\`\`
*Explanation:* Closures that mutate captured state implement \`FnMut\`. The variable holding the closure must be declared with \`let mut\`.

---

## 6. Common Beginner Mistakes

1. **Attempting heterogeneous collections without \`dyn\`:**
   \`Vec<T: MyTrait>\` does not compile for mixed types. You must use trait objects: \`Vec<Box<dyn MyTrait>>\`.
2. **Forgetting that iterators are lazy:**
   Writing \`v.iter().map(...);\` without collecting or looping does nothing; rustc will warn that the unused iterator does not evaluate.
`,
  },

  'smart-pointers': {
    id: 'smart-pointers',
    slug: 'smart-pointers',
    trackId: 'track-advanced',
    title: '07. Smart Pointers & Memory Management',
    order: 7,
    difficulty: 'advanced',
    estimatedMinutes: 40,
    description:
      'Examine Box<T>, Rc<T>, Arc<T>, RefCell<T>, interior mutability, Deref/Drop traits, and breaking cycles with Weak<T>.',
    learningObjectives: [
      'Understand how Box<T> enables heap allocation and recursive data structures',
      'Use Rc<T> and Arc<T> for single-threaded and multi-threaded shared ownership',
      'Apply RefCell<T> for Interior Mutability and runtime borrow checking',
      'Recognize and prevent reference cycles and memory leaks using Weak<T>',
    ],
    documentationLinks: [
      { title: 'The Rust Book - Smart Pointers', url: 'https://doc.rust-lang.org/book/ch15-00-smart-pointers.html' },
      { title: 'Rust Standard Library - std::rc', url: 'https://doc.rust-lang.org/std/rc/' },
    ],
    interactiveExercise: LESSON_EXERCISES['smart-pointers'],
    quizzes: LESSON_QUIZZES['smart-pointers'],
    markdownContent: `
# Smart Pointers & Memory Management

In Rust, **pointers** are variables that contain memory addresses. While regular references (\`&T\`) only borrow data without overhead, **smart pointers** own the data they point to, manage metadata, and provide specialized capabilities like reference counting or interior mutability.

Smart pointers typically implement the \`Deref\` and \`Drop\` traits.

---

## 1. \`Box<T>\`: Heap Allocation

\`Box<T>\` stores data on the heap while keeping a fixed-size pointer (8 bytes on 64-bit systems) on the stack.

### Key Use Cases:
1. **Recursive data structures:** Types where the size cannot be known at compile time (e.g. linked lists, AST trees).
2. **Transferring large data structures:** Moving a Box transfers an 8-byte pointer without copying massive buffers.
3. **Trait Objects:** \`Box<dyn Trait>\` enables runtime dynamic dispatch.

\`\`\`rust
enum List {
    Cons(i32, Box<List>), // Recursive type requires Box!
    Nil,
}
\`\`\`

---

## 2. Shared Ownership: \`Rc<T>\` and \`Arc<T>\`

Sometimes a value genuinely needs multiple owners (e.g. graph nodes, UI element trees).

- **\`Rc<T>\` (Reference Counted):** Keeps count of references. Each call to \`Rc::clone(&ptr)\` increments the count. When a clone drops, count decrements. Data is deallocated when count reaches zero. **Single-threaded only** (non-atomic for speed).
- **\`Arc<T>\` (Atomically Reference Counted):** Uses atomic CPU operations for thread-safe reference counting. Safe to share across threads (\`Send + Sync\`).

---

## 3. Interior Mutability: \`RefCell<T>\`

The *interior mutability pattern* lets you mutate data even when you have an immutable reference to that data.

\`RefCell<T>\` enforces the borrowing rules **at runtime** instead of compile time:
- \`.borrow()\` returns \`Ref<T>\` (immutable reference).
- \`.borrow_mut()\` returns \`RefMut<T>\` (mutable reference).
- If you violate the Aliasing XOR Mutability rule at runtime (e.g. two \`borrow_mut()\` at once), **\`RefCell\` panics immediately**.

A common idiom for shared mutable state in single-threaded code is **\`Rc<RefCell<T>>\`**.

---

## 4. Code Examples

### Example 7.1: Shared State with \`Rc\` and \`RefCell\` (Compiles)
\`\`\`rust
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let value = Rc::new(RefCell::new(42));

    let a = Rc::clone(&value);
    let b = Rc::clone(&value);

    // Mutate via interior mutability
    *a.borrow_mut() += 10;

    println!("Value read from b: {}", *b.borrow()); // prints 52
    println!("Total strong owners: {}", Rc::strong_count(&value)); // 3
}
\`\`\`

### Example 7.2: Runtime Panic from Multiple Mutable Borrows (Fails at Runtime)
\`\`\`rust
// [RUNTIME PANIC: AlreadyMutablyBorrowed]
use std::cell::RefCell;

fn main() {
    let cell = RefCell::new(100);

    let _ref1 = cell.borrow_mut();
    let _ref2 = cell.borrow_mut(); // PANIC! Second mutable borrow in same scope!
}
\`\`\`
*Explanation:* Compile-time checks pass, but \`RefCell\` checks its internal borrow counter at runtime and aborts to prevent memory corruption.

---

## 5. Preventing Reference Cycles with \`Weak<T>\`

If two \`Rc\` instances point to each other, their \`strong_count\` will never reach 0, creating a **memory leak**.
To resolve cycles, use **\`Weak<T>\`** (via \`Rc::downgrade\`). Weak references do not express ownership and must be upgraded via \`.upgrade() -> Option<Rc<T>>\` before use.

---

## 6. Common Beginner Mistakes

1. **Using \`Rc\` across threads:**
   Passing \`Rc\` to another thread fails compilation because \`Rc\` does not implement \`Send\`. Use \`Arc\`.
2. **Deep cloning with \`clone()\` instead of \`Rc::clone(&ptr)\`:**
   While \`ptr.clone()\` works, writing \`Rc::clone(&ptr)\` explicitly clarifies that you are incrementing a reference count rather than duplicating heavy heap data.
`,
  },

  'concurrency': {
    id: 'concurrency',
    slug: 'concurrency',
    trackId: 'track-advanced',
    title: '08. Concurrency & Asynchronous Rust',
    order: 8,
    difficulty: 'advanced',
    estimatedMinutes: 45,
    description:
      'Build safe concurrent applications with OS threads, message-passing channels, Arc<Mutex<T>>, Send/Sync, and async/await.',
    learningObjectives: [
      'Spawn native OS threads using std::thread::spawn and move closures',
      'Implement thread communication using message-passing channels (mpsc)',
      'Manage shared mutable state safely across threads using Arc<Mutex<T>>',
      'Explain the Send and Sync marker traits and distinguish async futures from thread execution',
    ],
    documentationLinks: [
      { title: 'The Rust Book - Fearless Concurrency', url: 'https://doc.rust-lang.org/book/ch16-00-concurrency.html' },
      { title: 'Asynchronous Programming in Rust', url: 'https://rust-lang.github.io/async-book/' },
    ],
    interactiveExercise: LESSON_EXERCISES['concurrency'],
    quizzes: LESSON_QUIZZES['concurrency'],
    markdownContent: `
# Concurrency & Asynchronous Rust

Handling concurrent execution safely is notoriously difficult in C and C++, where data races and deadlocks corrupt memory. Rust offers **"Fearless Concurrency"**: the type system and borrow checker catch race conditions before your code ever runs.

---

## 1. OS Threads & Move Closures

Rust maps \`std::thread::spawn\` directly to 1:1 native operating system threads.

Because a spawned thread may execute after the current function stack frame is destroyed, closures passed to \`thread::spawn\` require the **\`move\` keyword** to transfer ownership of captured values into the thread:

\`\`\`rust
use std::thread;

let v = vec![1, 2, 3];
let handle = thread::spawn(move || {
    println!("Here's a vector: {:?}", v);
});
handle.join().unwrap();
\`\`\`

---

## 2. Message Passing: Channels

Rust adheres to the Go proverb: *"Do not communicate by sharing memory; instead, share memory by communicating."*

The standard library provides **MPSC (Multiple Producer, Single Consumer)** channels:

\`\`\`rust
use std::sync::mpsc;
use std::thread;

let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    tx.send(String::from("ping")).unwrap();
});

let msg = rx.recv().unwrap(); // Blocks until message arrives
println!("Received: {}", msg);
\`\`\`

---

## 3. Shared State Concurrency: \`Arc<Mutex<T>>\`

When threads genuinely need to share mutable state, you combine:
- **\`Arc<T>\`**: Atomic Reference Counting to allow multiple threads to hold ownership.
- **\`Mutex<T>\`**: Mutual exclusion lock to guarantee only one thread modifies the data at a time.

\`\`\`rust
use std::sync::{Arc, Mutex};
use std::thread;

let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..10 {
    let counter_clone = Arc::clone(&counter);
    let handle = thread::spawn(move || {
        let mut num = counter_clone.lock().unwrap();
        *num += 1; // MutexGuard dereferences mutably to inner integer
    }); // MutexGuard is dropped here, automatically releasing the lock!
    handles.push(handle);
}

for handle in handles {
    handle.join().unwrap();
}
\`\`\`

---

## 4. The \`Send\` and \`Sync\` Marker Traits

Concurreny safety is built into Rust's core type system through two auto-traits:
- **\`Send\`**: Indicates that ownership of a type can be transferred across thread boundaries. Most Rust types are \`Send\`. Notably, \`Rc<T>\` is **not** \`Send\`.
- **\`Sync\`**: Indicates that references to the type (\`&T\`) can be shared across multiple threads safely without data races. A type \`T\` is \`Sync\` if and only if \`&T\` is \`Send\`.

---

## 5. Async / Await: Futures and Executors

In asynchronous Rust:
- An \`async fn\` returns an un-evaluated **\`Future\`**.
- Futures in Rust are **inert**: they do not execute in the background automatically. They must be polled.
- The standard library defines the \`Future\` interface, but **deliberately does not provide a built-in runtime**. To execute asynchronous tasks, production applications use community runtimes like **Tokio** or **smol**.

---

## 6. Code Examples

### Example 8.1: Safe Multi-Producer Channel (Compiles)
\`\`\`rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    let tx1 = tx.clone();
    thread::spawn(move || {
        let messages = vec!["one", "two"];
        for msg in messages {
            tx1.send(msg).unwrap();
            thread::sleep(Duration::from_millis(10));
        }
    });

    thread::spawn(move || {
        let messages = vec!["alpha", "beta"];
        for msg in messages {
            tx.send(msg).unwrap();
            thread::sleep(Duration::from_millis(10));
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }
}
\`\`\`

### Example 8.2: Trying to Send \`Rc\` to Another Thread (Fails to Compile)
\`\`\`rust
// [EXPECTED COMPILE FAILURE: E0277 - \`Rc<i32>\` cannot be sent between threads safely]
use std::rc::Rc;
use std::thread;

fn main() {
    let value = Rc::new(42);

    thread::spawn(move || {
        println!("Value: {}", value);
    });
}
\`\`\`
*Explanation:* \`Rc<T>\` reference increments are not atomic. Passing an \`Rc\` to another thread violates the \`Send\` trait requirement of \`thread::spawn\`, so rustc stops the build before any data race could occur! Use \`Arc<T>\` instead.

---

## 7. Common Beginner Mistakes

1. **Forgetting to join thread handles:**
   When the main thread completes, all spawned threads are terminated immediately, regardless of whether their tasks finished. Store thread handles and call \`.join()\`.
2. **Holding a Mutex lock across an \`.await\` point in async code:**
   Standard \`std::sync::Mutex\` locks the OS thread and should not be held across async suspend points. Use an asynchronous mutex like \`tokio::sync::Mutex\` instead.
`,
  },
};
