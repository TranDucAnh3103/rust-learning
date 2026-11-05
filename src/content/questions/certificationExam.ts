import { ExamQuestion } from '@/types';

export const CERTIFICATION_EXAM_QUESTIONS: ExamQuestion[] = [
  // --- 10 BEGINNER QUESTIONS ---
  {
    id: 'exam-q01',
    category: 'Syntax & Tooling',
    difficulty: 'beginner',
    question: 'Which Cargo command compiles the crate, runs all checks and optimizations, and places the executable binary in target/release/?',
    options: [
      { id: 'a', text: 'cargo check --release' },
      { id: 'b', text: 'cargo build --release' },
      { id: 'c', text: 'cargo run --opt' },
      { id: 'd', text: 'cargo release --build' },
    ],
    correctOptionId: 'b',
    explanation: '`cargo build --release` compiles with high optimization levels (-O3 / opt-level = 3) and outputs the finalized binary into `target/release/`.',
  },
  {
    id: 'exam-q02',
    category: 'Variables & Mutability',
    difficulty: 'beginner',
    question: 'Consider the code below. What is the output when compiled and executed?',
    codeSnippet: `fn main() {
    let x = 5;
    let x = x + 1;
    {
        let x = x * 2;
        print!("{} ", x);
    }
    print!("{}", x);
}`,
    options: [
      { id: 'a', text: '12 6' },
      { id: 'b', text: '12 12' },
      { id: 'c', text: '10 5' },
      { id: 'd', text: 'Compilation error due to re-declaring variable x' },
    ],
    correctOptionId: 'a',
    explanation: 'Variable shadowing creates a new binding. In the outer scope, `x` is shadowed from 5 to 6. Inside the inner block, a third `x` shadows it to 12. When the block ends, the inner `x` goes out of scope, leaving outer `x` as 6. Output is `12 6`.',
  },
  {
    id: 'exam-q03',
    category: 'Types & Data',
    difficulty: 'beginner',
    question: 'Which of the following scalar types in Rust represents a 4-byte Unicode Scalar Value?',
    options: [
      { id: 'a', text: 'u8' },
      { id: 'b', text: '&str' },
      { id: 'c', text: 'char' },
      { id: 'd', text: 'byte' },
    ],
    correctOptionId: 'c',
    explanation: 'In Rust, `char` is four bytes (32 bits) in size and represents a Unicode Scalar Value, allowing it to store characters from Latin, Cyrillic, Chinese, emojis, and more.',
  },
  {
    id: 'exam-q04',
    category: 'Syntax & Expressions',
    difficulty: 'beginner',
    question: 'What is the return value of a block ending with a semicolon, such as `{ let a = 10; a + 5; }`?',
    options: [
      { id: 'a', text: '15' },
      { id: 'b', text: '10' },
      { id: 'c', text: 'The unit type ()' },
      { id: 'd', text: 'null' },
    ],
    correctOptionId: 'c',
    explanation: 'Statements in Rust do not return values. Placing a semicolon after `a + 5` turns the expression into a statement, causing the block to evaluate to the unit type `()`.',
  },
  {
    id: 'exam-q05',
    category: 'Ownership Fundamentals',
    difficulty: 'beginner',
    question: 'Which of the following types implements the `Copy` trait by default in Rust?',
    options: [
      { id: 'a', text: 'String' },
      { id: 'b', text: 'Vec<i32>' },
      { id: 'c', text: 'i64' },
      { id: 'd', text: 'Box<u8>' },
    ],
    correctOptionId: 'c',
    explanation: 'Primitive integer types like `i64` live entirely on the stack and implement `Copy`. Types that own heap memory (`String`, `Vec`, `Box`) do not implement `Copy` because copying requires heap allocation.',
  },
  {
    id: 'exam-q06',
    category: 'Control Flow',
    difficulty: 'beginner',
    question: 'How do you return a value from a `loop` expression in Rust?',
    options: [
      { id: 'a', text: 'return value;' },
      { id: 'b', text: 'break value;' },
      { id: 'c', text: 'yield value;' },
      { id: 'd', text: 'loop.return(value);' },
    ],
    correctOptionId: 'b',
    explanation: 'In Rust, `break <expression>;` stops the loop and returns the specified expression as the value of the loop expression.',
  },
  {
    id: 'exam-q07',
    category: 'Error Handling',
    difficulty: 'beginner',
    question: 'Which standard enum represents either a valid value or the total absence of a value?',
    options: [
      { id: 'a', text: 'Result<T, E>' },
      { id: 'b', text: 'Option<T>' },
      { id: 'c', text: 'Nullable<T>' },
      { id: 'd', text: 'Either<L, R>' },
    ],
    correctOptionId: 'b',
    explanation: '`Option<T>` has two variants: `Some(T)` and `None`. It replaces null references found in other languages.',
  },
  {
    id: 'exam-q08',
    category: 'Structs & Methods',
    difficulty: 'beginner',
    question: 'What is the idiomatic name for an associated constructor function on a struct in Rust?',
    options: [
      { id: 'a', text: 'init' },
      { id: 'b', text: 'construct' },
      { id: 'c', text: 'new' },
      { id: 'd', text: '__init__' },
    ],
    correctOptionId: 'c',
    explanation: 'By Rust community convention, associated functions that construct and return a new instance of a type are named `new` (e.g. `String::new()`, `Vec::new()`, `User::new()`).',
  },
  {
    id: 'exam-q09',
    category: 'Borrowing',
    difficulty: 'beginner',
    question: 'What symbol is used to create an immutable reference to a variable `x`?',
    options: [
      { id: 'a', text: '*x' },
      { id: 'b', text: '&x' },
      { id: 'c', text: 'ref x' },
      { id: 'd', text: 'mut &x' },
    ],
    correctOptionId: 'b',
    explanation: 'The ampersand `&` creates a reference, allowing you to borrow a value without taking ownership. `*` is the dereference operator.',
  },
  {
    id: 'exam-q10',
    category: 'Slices',
    difficulty: 'beginner',
    question: 'What is the type of a string slice referencing part of a String?',
    options: [
      { id: 'a', text: '&String' },
      { id: 'b', text: '&str' },
      { id: 'c', text: 'Slice<char>' },
      { id: 'd', text: 'str' },
    ],
    correctOptionId: 'b',
    explanation: '`&str` is a string slice: a fat pointer consisting of a pointer to a specific UTF-8 byte sequence and a length.',
  },

  // --- 12 INTERMEDIATE QUESTIONS ---
  {
    id: 'exam-q11',
    category: 'Ownership & Move Semantics',
    difficulty: 'intermediate',
    question: 'What will happen when compiling this snippet?',
    codeSnippet: `fn main() {
    let s1 = String::from("Rust");
    let s2 = s1;
    println!("Length: {}", s1.len());
}`,
    options: [
      { id: 'a', text: 'It prints "Length: 4"' },
      { id: 'b', text: 'It fails to compile with error E0382: borrow of moved value `s1`' },
      { id: 'c', text: 'It panics at runtime with a null pointer exception' },
      { id: 'd', text: 'It compiles and prints garbage memory' },
    ],
    correctOptionId: 'b',
    explanation: 'Because `String` does not implement `Copy`, assigning `s2 = s1` moves ownership of the heap memory to `s2` and invalidates `s1`. Attempting to access `s1` produces compile error E0382.',
  },
  {
    id: 'exam-q12',
    category: 'Borrow Checker Constraints',
    difficulty: 'intermediate',
    question: 'Why does the following code fail to compile?',
    codeSnippet: `fn main() {
    let mut vec = vec![1, 2, 3];
    let first = &vec[0];
    vec.push(4);
    println!("First element is: {}", first);
}`,
    options: [
      { id: 'a', text: 'Vector indexing cannot produce references' },
      { id: 'b', text: '`vec.push()` requires a mutable borrow `&mut vec`, which cannot coexist with the active immutable borrow `first`' },
      { id: 'c', text: 'Variables named `first` are reserved in Rust' },
      { id: 'd', text: 'Vectors must be sorted before printing' },
    ],
    correctOptionId: 'b',
    explanation: '`vec.push` may reallocate the vector’s heap buffer if capacity is exceeded. If this occurred while `first` pointed to the old memory, `first` would become a dangling pointer. Rust prevents this by disallowing `&mut` borrows while immutable borrows are active.',
  },
  {
    id: 'exam-q13',
    category: 'Pattern Matching',
    difficulty: 'intermediate',
    question: 'What does the `_` (underscore) pattern signify inside a `match` expression?',
    options: [
      { id: 'a', text: 'It matches only null or None values' },
      { id: 'b', text: 'It is a wildcard pattern that matches any value without binding it' },
      { id: 'c', text: 'It repeats the previous arm’s action' },
      { id: 'd', text: 'It throws a runtime exception' },
    ],
    correctOptionId: 'b',
    explanation: 'The `_` pattern matches any value, serving as a catch-all for remaining unhandled cases without binding the matched value to a variable.',
  },
  {
    id: 'exam-q14',
    category: 'Error Propagation',
    difficulty: 'intermediate',
    question: 'When using the `?` operator on a `Result<T, E1>` inside a function returning `Result<U, E2>`, what trait must be implemented for error conversion?',
    options: [
      { id: 'a', text: 'std::ops::Deref' },
      { id: 'b', text: 'std::convert::From<E1> for E2' },
      { id: 'c', text: 'std::clone::Clone' },
      { id: 'd', text: 'std::marker::Sync' },
    ],
    correctOptionId: 'b',
    explanation: 'The `?` operator calls `From::from(err)` behind the scenes, allowing automatic conversion of `E1` into the calling function’s expected error type `E2` whenever `E2: From<E1>` is implemented.',
  },
  {
    id: 'exam-q15',
    category: 'Generics & Monomorphization',
    difficulty: 'intermediate',
    question: 'What mechanism does rustc use to make generic code execute with zero dynamic dispatch overhead?',
    options: [
      { id: 'a', text: 'Dynamic lookup tables (vtables) in thread-local storage' },
      { id: 'b', text: 'Monomorphization: generating distinct, specialized machine code for each concrete type at compile time' },
      { id: 'c', text: 'Boxing all generic types into universal heap pointers' },
      { id: 'd', text: 'Just-In-Time (JIT) bytecode interpretation' },
    ],
    correctOptionId: 'b',
    explanation: 'Monomorphization analyzes all call sites of a generic function and generates duplicated, specialized implementations for each concrete type used, enabling compiler optimizations like inlining.',
  },
  {
    id: 'exam-q16',
    category: 'Traits & Interfaces',
    difficulty: 'intermediate',
    question: 'Which of the following method signatures represents dynamic dispatch using a trait object?',
    options: [
      { id: 'a', text: 'fn render(item: impl Drawable)' },
      { id: 'b', text: 'fn render<T: Drawable>(item: T)' },
      { id: 'c', text: 'fn render(item: &dyn Drawable)' },
      { id: 'd', text: 'fn render<T>(item: T) where T: Drawable' },
    ],
    correctOptionId: 'c',
    explanation: '`&dyn Drawable` creates a trait object (fat pointer containing data pointer + vtable pointer) which performs dynamic dispatch at runtime. `impl Drawable` and generic parameters use static dispatch.',
  },
  {
    id: 'exam-q17',
    category: 'Closures',
    difficulty: 'intermediate',
    question: 'What is the effect of prefixing a closure definition with the `move` keyword?',
    options: [
      { id: 'a', text: 'It forces the closure to capture all referenced external variables by value/ownership rather than by reference' },
      { id: 'b', text: 'It allows the closure to be executed on another CPU core automatically' },
      { id: 'c', text: 'It makes the closure mutable' },
      { id: 'd', text: 'It prevents the closure from being called more than once' },
    ],
    correctOptionId: 'a',
    explanation: 'The `move` keyword forces the closure to take ownership of values it uses from the surrounding scope, rather than inferring borrowing. This is crucial when passing closures into spawned threads.',
  },
  {
    id: 'exam-q18',
    category: 'Smart Pointers: Box',
    difficulty: 'intermediate',
    question: 'Why does the following recursive enum declaration require `Box<Node>` instead of bare `Node`?',
    codeSnippet: `enum Node {
    Leaf(i32),
    Branch(Box<Node>, Box<Node>),
}`,
    options: [
      { id: 'a', text: 'Because Rust enums cannot hold integer values directly' },
      { id: 'b', text: 'Because without an indirection like Box, the compiler cannot calculate a finite size for Node at compile time' },
      { id: 'c', text: 'To enable automatic thread safety for the tree' },
      { id: 'd', text: 'Because Box is required for all enum variants with two parameters' },
    ],
    correctOptionId: 'b',
    explanation: 'Rust must know the exact memory footprint of every type at compile time. A recursive type without indirection would have infinite size. A `Box<T>` is a pointer with a fixed size (8 bytes on 64-bit systems).',
  },
  {
    id: 'exam-q19',
    category: 'Smart Pointers: Rc',
    difficulty: 'intermediate',
    question: 'What is the purpose of `Rc<T>` in the standard library?',
    options: [
      { id: 'a', text: 'To provide thread-safe atomic reference counting across multiple CPU threads' },
      { id: 'b', text: 'To enable multiple ownership of data on the heap within a single thread' },
      { id: 'c', text: 'To compress data in memory' },
      { id: 'd', text: 'To bypass all borrow checking rules permanently' },
    ],
    correctOptionId: 'b',
    explanation: '`Rc<T>` (Reference Counted) allows single-threaded multiple ownership. It tracks the number of references and frees heap memory when the count reaches zero. For multi-threading, `Arc<T>` must be used instead.',
  },
  {
    id: 'exam-q20',
    category: 'Concurrency: Threads',
    difficulty: 'intermediate',
    question: 'What happens to spawned child threads if the main thread completes execution in a Rust binary?',
    options: [
      { id: 'a', text: 'Child threads continue running until their work completes' },
      { id: 'b', text: 'The program shuts down immediately, terminating all spawned threads regardless of progress' },
      { id: 'c', text: 'The operating system deadlocks' },
      { id: 'd', text: 'Rust throws an uncaught PanicException' },
    ],
    correctOptionId: 'b',
    explanation: 'When the main thread finishes, the process exits, abruptly shutting down all background child threads. To wait for threads to finish, you must call `.join()` on their `JoinHandle`s.',
  },
  {
    id: 'exam-q21',
    category: 'Concurrency: Channels',
    difficulty: 'intermediate',
    question: 'In `std::sync::mpsc`, what does `mpsc` stand for?',
    options: [
      { id: 'a', text: 'Multi-Process Shared Memory Channel' },
      { id: 'b', text: 'Multiple Producer, Single Consumer' },
      { id: 'c', text: 'Multi-Packet Stream Controller' },
      { id: 'd', text: 'Mutex-Protected State Container' },
    ],
    correctOptionId: 'b',
    explanation: '`mpsc` stands for Multiple Producer, Single Consumer. You can clone the sending end (`Sender`) to send messages from multiple threads to one receiving end (`Receiver`).',
  },
  {
    id: 'exam-q22',
    category: 'Iterators',
    difficulty: 'intermediate',
    question: 'What is the output of the following code snippet?',
    codeSnippet: `fn main() {
    let numbers = vec![1, 2, 3];
    let iter = numbers.iter().map(|x| x * 2);
    println!("Vector length: {}", numbers.len());
}`,
    options: [
      { id: 'a', text: 'Vector length: 3 (and map was evaluated for each item)' },
      { id: 'b', text: 'Vector length: 3 (and map was NOT evaluated because iterators are lazy)' },
      { id: 'c', text: 'Compilation error because numbers was moved' },
      { id: 'd', text: 'Vector length: 6' },
    ],
    correctOptionId: 'b',
    explanation: 'Rust iterators are lazy. Creating an iterator adapter like `.map(...)` does not perform any calculations until a consuming method (like `.collect()`, `.next()`, or a for loop) calls it. Also `numbers.iter()` borrows rather than moves.',
  },

  // --- 8 ADVANCED QUESTIONS ---
  {
    id: 'exam-q23',
    category: 'Lifetimes & Subtyping',
    difficulty: 'advanced',
    question: 'What does the lifetime parameter in the following signature guarantee to the compiler?',
    codeSnippet: `fn select<'a>(first: &'a str, second: &'a str) -> &'a str {
    if first.len() > second.len() { first } else { second }
}`,
    options: [
      { id: 'a', text: 'Both `first` and `second` will live forever in static memory' },
      { id: 'b', text: 'The returned reference will be valid for a lifetime equal to the shorter of the lifetimes of `first` and `second`' },
      { id: 'c', text: 'The function will allocate memory for both strings on the heap' },
      { id: 'd', text: '`first` and `second` must originate from the exact same memory address' },
    ],
    correctOptionId: 'b',
    explanation: "When multiple references share a generic lifetime 'a, 'a resolves to the intersection (overlap) of their lifetimes—i.e., the smaller lifetime. The returned reference is guaranteed not to outlive either input reference.",
  },
  {
    id: 'exam-q24',
    category: 'Interior Mutability: RefCell',
    difficulty: 'advanced',
    question: 'What occurs at runtime if code executes two `.borrow_mut()` calls on the same `RefCell<T>` in overlapping scopes?',
    options: [
      { id: 'a', text: 'It creates a compiler warning and safely queues the second write' },
      { id: 'b', text: 'The thread panics immediately due to an active borrow collision' },
      { id: 'c', text: 'The second borrow silently overwrites the first borrow’s data' },
      { id: 'd', text: 'The OS process deadlocks indefinitely' },
    ],
    correctOptionId: 'b',
    explanation: '`RefCell<T>` enforces Rust’s borrowing rules at runtime using internal counters. If a mutable borrow is requested while another borrow (mutable or immutable) is active, `RefCell` panics.',
  },
  {
    id: 'exam-q25',
    category: 'Reference Cycles & Leaks',
    difficulty: 'advanced',
    question: 'Why does Rust provide `Weak<T>` alongside `Rc<T>` and `Arc<T>`?',
    options: [
      { id: 'a', text: 'To break cyclic reference chains and avoid memory leaks by not preventing deallocation when strong count reaches zero' },
      { id: 'b', text: 'To allow pointers to be written to disk files' },
      { id: 'c', text: 'To create references that bypass CPU cache coherence' },
      { id: 'd', text: 'To allow uninitialized memory access' },
    ],
    correctOptionId: 'a',
    explanation: 'A cycle of `Rc` or `Arc` pointers keeps their `strong_count` above zero indefinitely, causing memory leaks. `Weak<T>` holds non-owning references that increment `weak_count`, allowing the contained value to be deallocated once `strong_count` drops to zero.',
  },
  {
    id: 'exam-q26',
    category: 'Concurrency: Arc & Mutex',
    difficulty: 'advanced',
    question: 'In the idiom `let state = Arc::new(Mutex::new(data));`, how is the Mutex lock released?',
    options: [
      { id: 'a', text: 'You must explicitly call `state.unlock()`' },
      { id: 'b', text: 'The lock is automatically released via RAII when the `MutexGuard` value returned by `.lock()` goes out of scope and drops' },
      { id: 'c', text: 'The lock is released only when the thread terminates' },
      { id: 'd', text: 'Locks in Rust are never released; they are re-used across iterations' },
    ],
    correctOptionId: 'b',
    explanation: 'Rust uses RAII (Resource Acquisition Is Initialization). Calling `.lock().unwrap()` returns a `MutexGuard<T>`. When the guard variable exits its scope, its `Drop` implementation automatically unlocks the mutex, preventing forgotten unlocks.',
  },
  {
    id: 'exam-q27',
    category: 'Marker Traits: Send & Sync',
    difficulty: 'advanced',
    question: 'Under what condition is a type `T` considered `Sync` in Rust?',
    options: [
      { id: 'a', text: 'Only if T implements the Copy trait' },
      { id: 'b', text: 'If and only if an immutable reference to T (`&T`) implements Send' },
      { id: 'c', text: 'Only if T is protected by an operating system semaphore' },
      { id: 'd', text: 'If T has no pointers' },
    ],
    correctOptionId: 'b',
    explanation: 'By definition: `T: Sync` if and only if `&T: Send`. This means it is safe to share references to `T` across threads because multiple threads reading `&T` cannot cause a data race.',
  },
  {
    id: 'exam-q28',
    category: 'Asynchronous Model',
    difficulty: 'advanced',
    question: 'Why does calling an `async fn` in Rust NOT execute its body immediately?',
    options: [
      { id: 'a', text: 'Because async functions require root administrator privileges to launch' },
      { id: 'b', text: 'Because an async fn in Rust compiles to a state machine implementing the Future trait, which does nothing until polled by an executor' },
      { id: 'c', text: 'Because Rust awaits the garbage collector before starting tasks' },
      { id: 'd', text: 'Because async in Rust is only a syntax macro for thread spawning' },
    ],
    correctOptionId: 'b',
    explanation: 'Rust futures are completely inert (pull-based). Calling an `async fn` constructs a state machine implementing `Future<Output = T>`. No computation occurs until an asynchronous runtime/executor explicitly polls the future via `.poll()`.',
  },
  {
    id: 'exam-q29',
    category: 'Deref Coercion',
    difficulty: 'advanced',
    question: 'What language feature allows a function expecting a string slice `&str` to directly accept a `&String` without manual conversion?',
    options: [
      { id: 'a', text: 'Implicit dynamic type casting' },
      { id: 'b', text: 'Deref coercion via the implementation of `std::ops::Deref<Target = str>` on String' },
      { id: 'c', text: 'Automatic heap reallocation' },
      { id: 'd', text: 'Macro substitution at the call site' },
    ],
    correctOptionId: 'b',
    explanation: 'Deref coercion automatically converts a reference to a type that implements `Deref` into a reference to its target type (e.g. `&String` -> `&str`, `&Vec<T>` -> `&[T]`), avoiding tedious `.as_str()` calls.',
  },
  {
    id: 'exam-q30',
    category: 'Advanced Ownership & Drop',
    difficulty: 'advanced',
    question: 'What is true regarding the relationship between the `Copy` trait and the `Drop` trait on a single type?',
    options: [
      { id: 'a', text: 'A type can implement both Copy and Drop without restriction' },
      { id: 'b', text: 'Rust forbids a type from implementing both Copy and Drop simultaneously' },
      { id: 'c', text: 'Drop is automatically derived for all Copy types' },
      { id: 'd', text: 'Copy types can only be dropped manually with std::mem::drop' },
    ],
    correctOptionId: 'b',
    explanation: 'In Rust, a type cannot implement both `Copy` and `Drop` (compiler error E0184). If a type requires custom deallocation logic in `Drop`, bitwise copying would lead to duplicate destruction of the same underlying resource.',
  },
];
