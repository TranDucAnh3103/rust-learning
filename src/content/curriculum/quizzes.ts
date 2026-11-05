import { QuizQuestion } from '@/types';

export const LESSON_QUIZZES: Record<string, QuizQuestion[]> = {
  'getting-started': [
    {
      id: 'q-gs-1',
      lessonId: 'getting-started',
      difficulty: 'beginner',
      question: 'What is the primary role of the `cargo check` command in the standard Rust toolchain workflow?',
      options: [
        { id: 'a', text: 'It compiles and runs the executable with debug symbols' },
        { id: 'b', text: 'It quickly verifies that code compiles without producing an executable binary' },
        { id: 'c', text: 'It formats the source code according to Rust community conventions' },
        { id: 'd', text: 'It publishes the crate to crates.io package registry' },
      ],
      correctOptionId: 'b',
      explanation:
        '`cargo check` analyzes the codebase and runs the compiler front-end and borrow checker without performing code generation or linking, making it much faster during iterative development than `cargo build`.',
    },
    {
      id: 'q-gs-2',
      lessonId: 'getting-started',
      difficulty: 'beginner',
      question: 'In Rust, what distinguishes an expression from a statement?',
      options: [
        { id: 'a', text: 'Statements return values, whereas expressions do not' },
        { id: 'b', text: 'Expressions evaluate to a value, whereas statements perform an action and do not return a value' },
        { id: 'c', text: 'Expressions always require a semicolon at the end' },
        { id: 'd', text: 'Statements can only be used inside the main function' },
      ],
      correctOptionId: 'b',
      explanation:
        'Expressions evaluate to a resulting value (e.g. `5 + 6` or a block `{ x + 1 }` without a semicolon). Statements are instructions that perform some action and do not return a value (e.g. `let x = 6;`). Adding a semicolon turns an expression into a statement.',
    },
    {
      id: 'q-gs-3',
      lessonId: 'getting-started',
      difficulty: 'beginner',
      question: 'Why does the call `println!("Hello, world!");` include an exclamation mark (`!`)?',
      options: [
        { id: 'a', text: 'It denotes an unsafe function call' },
        { id: 'b', text: 'It calls a macro instead of a standard function' },
        { id: 'c', text: 'It tells the compiler to run the function concurrently' },
        { id: 'd', text: 'It is required for all functions returning unit type `()`' },
      ],
      correctOptionId: 'b',
      explanation:
        'In Rust, an exclamation point indicates a macro invocation. Macros can take variable numbers of arguments and perform compile-time code generation and format string validation, unlike regular functions.',
    },
    {
      id: 'q-gs-4',
      lessonId: 'getting-started',
      difficulty: 'intermediate',
      question: 'Where is package metadata and third-party crate dependencies declared in a standard Cargo project?',
      options: [
        { id: 'a', text: 'Inside Cargo.lock' },
        { id: 'b', text: 'Inside src/main.rs headers' },
        { id: 'c', text: 'Inside Cargo.toml' },
        { id: 'd', text: 'Inside the rust-toolchain.toml file' },
      ],
      correctOptionId: 'c',
      explanation:
        '`Cargo.toml` is the manifest file where package configuration, compiler options, and dependency declarations are specified by the developer. `Cargo.lock` records exact resolved dependency versions.',
    },
  ],

  'variables-and-types': [
    {
      id: 'q-vt-1',
      lessonId: 'variables-and-types',
      difficulty: 'beginner',
      question: 'What happens when you try to reassign a variable declared with `let x = 5;` without the `mut` keyword?',
      options: [
        { id: 'a', text: 'The program crashes at runtime with a panic' },
        { id: 'b', text: 'The compiler issues a compile-time error: cannot assign twice to immutable variable' },
        { id: 'c', text: 'The variable is silently converted to a pointer' },
        { id: 'd', text: 'Rust implicitly shadows the variable' },
      ],
      correctOptionId: 'b',
      explanation:
        'In Rust, variables are immutable by default. Attempting to reassign to an immutable variable causes a compile-time error (E0384). To allow reassignment, you must explicitly declare it with `let mut x = 5;`.',
    },
    {
      id: 'q-vt-2',
      lessonId: 'variables-and-types',
      difficulty: 'beginner',
      question: 'What is the primary difference between variable shadowing (`let x = x + 1;`) and mutability (`x = x + 1;`)?',
      options: [
        { id: 'a', text: 'Shadowing can change the variable type and remains immutable after re-declaration' },
        { id: 'b', text: 'Mutability allocates new heap memory, while shadowing is always on the stack' },
        { id: 'c', text: 'Shadowing is only allowed in root module scope' },
        { id: 'd', text: 'Shadowing is slower at runtime than mutating an in-place value' },
      ],
      correctOptionId: 'a',
      explanation:
        'By using `let`, variable shadowing creates an entirely new variable with the same name. This allows changing the type (e.g., from `&str` to `usize`) and guarantees the binding remains immutable after declaration unless marked `mut`.',
    },
    {
      id: 'q-vt-3',
      lessonId: 'variables-and-types',
      difficulty: 'intermediate',
      question: 'In Rust, what does an `if` construct return?',
      options: [
        { id: 'a', text: 'Always boolean `true` or `false`' },
        { id: 'b', text: 'It is an expression, so each arm evaluates to a value of matching types' },
        { id: 'c', text: 'It can only evaluate to unit `()`' },
        { id: 'd', text: 'It is a statement and cannot return any value' },
      ],
      correctOptionId: 'b',
      explanation:
        'In Rust, `if` is an expression, meaning it can return values: `let number = if condition { 5 } else { 6 };`. Both the `if` arm and `else` arm must evaluate to compatible matching types.',
    },
    {
      id: 'q-vt-4',
      lessonId: 'variables-and-types',
      difficulty: 'intermediate',
      question: 'Which of the following describes fixed-size compound types in Rust?',
      options: [
        { id: 'a', text: 'Vectors (`Vec<T>`) have fixed length allocated on the stack' },
        { id: 'b', text: 'Arrays (`[T; N]`) have a fixed compile-time size and are stored contiguously on the stack' },
        { id: 'c', text: 'Tuples can dynamically grow if marked with `mut`' },
        { id: 'd', text: 'Slices (`&[T]`) own the underlying data on the stack' },
      ],
      correctOptionId: 'b',
      explanation:
        'Arrays in Rust (`[T; N]`) have a fixed size known at compile time and allocate memory directly on the stack without heap indirection. Vectors (`Vec<T>`), by contrast, are dynamically resizable and store elements on the heap.',
    },
  ],

  'ownership-and-borrowing': [
    {
      id: 'q-ob-1',
      lessonId: 'ownership-and-borrowing',
      difficulty: 'beginner',
      question: 'What are the three fundamental rules of ownership in Rust?',
      options: [
        { id: 'a', text: '1. Each value has an owner; 2. There can only be one owner at a time; 3. When the owner goes out of scope, the value is dropped' },
        { id: 'b', text: '1. Every variable is mutable; 2. Memory is collected by a generational GC; 3. Pointers can be null' },
        { id: 'c', text: '1. All data lives on the heap; 2. Multiple threads can mutate data concurrently; 3. Lifetimes must be declared on all variables' },
        { id: 'd', text: '1. Values are copied by default; 2. Stack memory must be freed manually; 3. References can outlive owners' },
      ],
      correctOptionId: 'a',
      explanation:
        'Rust’s core memory safety guarantees are built on these three rules: each value has an owner, only one owner exists at any given moment, and when that owner exits scope, its memory is deterministically deallocated via `drop`.',
    },
    {
      id: 'q-ob-2',
      lessonId: 'ownership-and-borrowing',
      difficulty: 'intermediate',
      question: 'What occurs during the assignment `let s2 = s1;` when `s1` is of type `String`?',
      options: [
        { id: 'a', text: 'A full deep copy of the heap buffer is executed' },
        { id: 'b', text: 'The ownership of the string is moved to `s2`, invalidating `s1`' },
        { id: 'c', text: '`s2` becomes a reference pointing to `s1`' },
        { id: 'd', text: 'Both `s1` and `s2` share ownership via automatic reference counting' },
      ],
      correctOptionId: 'b',
      explanation:
        '`String` does not implement the `Copy` trait because it owns heap-allocated memory. The assignment copies the 24-byte pointer/len/cap stack metadata to `s2` and invalidates `s1` to prevent double-free errors. This is known as a move.',
    },
    {
      id: 'q-ob-3',
      lessonId: 'ownership-and-borrowing',
      difficulty: 'intermediate',
      question: 'Which rule governs mutable and immutable borrows in the same scope?',
      options: [
        { id: 'a', text: 'You can have unlimited mutable references as long as there is only one immutable reference' },
        { id: 'b', text: 'You can have either any number of immutable references OR exactly one mutable reference, but never both simultaneously' },
        { id: 'c', text: 'Immutable references can be converted to mutable references anytime' },
        { id: 'd', text: 'Mutable references cannot be passed as function arguments' },
      ],
      correctOptionId: 'b',
      explanation:
        'The Borrow Checker enforces the "Aliasing XOR Mutability" law: at any given time in a scope, you may have any number of immutable references (`&T`), OR exactly one mutable reference (`&mut T`), preventing data races at compile time.',
    },
    {
      id: 'q-ob-4',
      lessonId: 'ownership-and-borrowing',
      difficulty: 'advanced',
      question: 'What is the purpose of generic lifetime annotations like `\'a` in function signatures?',
      options: [
        { id: 'a', text: 'They instruct the compiler how long to keep values in memory before calling malloc' },
        { id: 'b', text: 'They describe the relationships between the lifetimes of multiple references so the borrow checker can prove safety' },
        { id: 'c', text: 'They extend the duration of variables so they live for the lifetime of the program' },
        { id: 'd', text: 'They enable garbage collection for circular reference graphs' },
      ],
      correctOptionId: 'b',
      explanation:
        'Lifetime annotations do not change how long references actually live. Instead, they specify how the lifetimes of different input references relate to each other and to the return value, enabling rustc to ensure references never outlive the data they borrow.',
    },
  ],

  'structs-and-enums': [
    {
      id: 'q-se-1',
      lessonId: 'structs-and-enums',
      difficulty: 'beginner',
      question: 'What is the first parameter of an instance method in an `impl` block that allows reading but not modifying the struct?',
      options: [
        { id: 'a', text: '`&mut self`' },
        { id: 'b', text: '`&self`' },
        { id: 'c', text: '`self`' },
        { id: 'd', text: '`this: &Self`' },
      ],
      correctOptionId: 'b',
      explanation:
        '`&self` is shorthand for `self: &Self`. It borrows the instance immutably, allowing read access to fields without taking ownership or modifying the struct.',
    },
    {
      id: 'q-se-2',
      lessonId: 'structs-and-enums',
      difficulty: 'intermediate',
      question: 'How do Rust enums differ from typical enums in languages like C or Java?',
      options: [
        { id: 'a', text: 'Rust enums are restricted to consecutive integer values' },
        { id: 'b', text: 'Rust enum variants can store arbitrary associated data, including different types and structs per variant' },
        { id: 'c', text: 'Rust enums can only be instantiated on the heap' },
        { id: 'd', text: 'Rust enums cannot be used inside `match` expressions' },
      ],
      correctOptionId: 'b',
      explanation:
        'Rust enums are algebraic data types (tagged unions). Each variant can carry different payloads: tuples, structs, or no data at all (e.g. `enum Message { Quit, Move { x: i32, y: i32 }, Write(String) }`).',
    },
    {
      id: 'q-se-3',
      lessonId: 'structs-and-enums',
      difficulty: 'intermediate',
      question: 'What occurs if a `match` expression on an enum does not cover all possible variants and lacks a catch-all pattern (`_`)?',
      options: [
        { id: 'a', text: 'The program compiles with a warning and skips missing cases at runtime' },
        { id: 'b', text: 'The compiler refuses to build, reporting non-exhaustive pattern error' },
        { id: 'c', text: 'Rust automatically inserts a panic for uncovered arms' },
        { id: 'd', text: 'The function returns `None` implicitly' },
      ],
      correctOptionId: 'b',
      explanation:
        'Pattern matching in Rust is exhaustive. The compiler requires you to handle every conceivable case or provide a wildcard `_ => ...`, guaranteeing no unhandled enum states occur at runtime.',
    },
    {
      id: 'q-se-4',
      lessonId: 'structs-and-enums',
      difficulty: 'advanced',
      question: 'When should you prefer `if let` over a full `match` expression?',
      options: [
        { id: 'a', text: 'When you want to handle only one specific variant and ignore all others' },
        { id: 'b', text: 'When you need to match across multiple enums simultaneously' },
        { id: 'c', text: 'When performance is critical because `if let` bypasses pattern compilation' },
        { id: 'd', text: 'Only when dealing with raw pointers' },
      ],
      correctOptionId: 'a',
      explanation:
        '`if let Some(val) = opt` is syntactic sugar for a `match` that runs code when a value matches one pattern and ignores everything else, eliminating boilerplate.',
    },
  ],

  'error-handling': [
    {
      id: 'q-eh-1',
      lessonId: 'error-handling',
      difficulty: 'beginner',
      question: 'What is the primary difference between a `panic!` and returning a `Result<T, E>` in Rust?',
      options: [
        { id: 'a', text: '`panic!` handles expected network errors, while `Result` is only for fatal crashes' },
        { id: 'b', text: '`panic!` represents unrecoverable faults that unwind or abort, while `Result` represents expected, recoverable errors' },
        { id: 'c', text: '`Result` is handled by the CPU kernel directly' },
        { id: 'd', text: 'There is no difference; `panic!` is an alias for `Result::Err`' },
      ],
      correctOptionId: 'b',
      explanation:
        'In Rust, expected failures (like file not found or invalid user input) are represented as `Result<T, E>` so calling code can inspect and handle them. `panic!` indicates an unrecoverable bug or assertion violation (like indexing out of bounds).',
    },
    {
      id: 'q-eh-2',
      lessonId: 'error-handling',
      difficulty: 'intermediate',
      question: 'What does the question mark (`?`) operator do when applied to a `Result<T, E>` value?',
      options: [
        { id: 'a', text: 'It suppresses any error and replaces it with default values' },
        { id: 'b', text: 'If `Ok(v)`, it unpacks `v`; if `Err(e)`, it immediately returns `Err(From::from(e))` from the enclosing function' },
        { id: 'c', text: 'It causes the thread to sleep until the error resolves' },
        { id: 'd', text: 'It logs the error to stderr and proceeds with execution' },
      ],
      correctOptionId: 'b',
      explanation:
        'The `?` operator is idiomatic error propagation. If the expression evaluates to `Ok(val)`, `val` is returned as the value of the expression. If `Err(err)`, the enclosing function returns early with `Err(...)`, converting error types via `From::from`.',
    },
    {
      id: 'q-eh-3',
      lessonId: 'error-handling',
      difficulty: 'intermediate',
      question: 'Why is using `.expect("descriptive message")` preferred over `.unwrap()` in production code where panics might be possible?',
      options: [
        { id: 'a', text: '`.expect()` prevents the thread from terminating on failure' },
        { id: 'b', text: '`.expect()` provides informative debugging context in the panic message explaining developer intent' },
        { id: 'c', text: '`.expect()` automatically retries the operation three times' },
        { id: 'd', text: '`.expect()` incurs zero binary size overhead compared to unwrap' },
      ],
      correctOptionId: 'b',
      explanation:
        'While both panic if the value is `None` or `Err`, `.expect("failed to open database config")` prints the specified descriptive message, clarifying what invariant was violated and making triage much faster.',
    },
    {
      id: 'q-eh-4',
      lessonId: 'error-handling',
      difficulty: 'advanced',
      question: 'Which standard trait allows heterogeneous error types to be converted into a common error type with the `?` operator?',
      options: [
        { id: 'a', text: '`std::convert::From<E>`' },
        { id: 'b', text: '`std::ops::Deref`' },
        { id: 'c', text: '`std::borrow::Borrow`' },
        { id: 'd', text: '`std::marker::Sync`' },
      ],
      correctOptionId: 'a',
      explanation:
        'The `?` operator automatically calls `From::from(err)` to convert the caught error into the return error type of the calling function, enabling seamless error chaining across I/O, parsing, and custom domain errors.',
    },
  ],

  'generics-and-traits': [
    {
      id: 'q-gt-1',
      lessonId: 'generics-and-traits',
      difficulty: 'beginner',
      question: 'How does Rust achieve zero runtime cost for generic functions?',
      options: [
        { id: 'a', text: 'Through runtime type reflection and JIT compilation' },
        { id: 'b', text: 'Through monomorphization: generating specialized machine code copies for each concrete type used at compile time' },
        { id: 'c', text: 'By boxing all generic parameters into heap pointers' },
        { id: 'd', text: 'By stripping generic parameters at runtime like Java type erasure' },
      ],
      correctOptionId: 'b',
      explanation:
        'Rust uses monomorphization. The compiler inspects everywhere a generic function is called and creates duplicate, specialized implementations for each concrete type, enabling aggressive inlining and optimization with zero dynamic dispatch overhead.',
    },
    {
      id: 'q-gt-2',
      lessonId: 'generics-and-traits',
      difficulty: 'intermediate',
      question: 'What is the difference between static dispatch (`impl Trait`) and dynamic dispatch (`dyn Trait`) in Rust?',
      options: [
        { id: 'a', text: 'Static dispatch resolves calls at compile time with monomorphization; dynamic dispatch uses runtime vtables and fat pointers' },
        { id: 'b', text: '`dyn Trait` is faster because it bypasses compiler type checks' },
        { id: 'c', text: 'Static dispatch can only be used with primitive numbers' },
        { id: 'd', text: 'Dynamic dispatch does not allow references' },
      ],
      correctOptionId: 'a',
      explanation:
        'Static dispatch (`impl Trait` / generics) determines the exact function address at compile time with zero overhead. Dynamic dispatch (`&dyn Trait` or `Box<dyn Trait>`) uses a vtable pointer inside a fat pointer to resolve methods at runtime, allowing heterogeneous collections.',
    },
    {
      id: 'q-gt-3',
      lessonId: 'generics-and-traits',
      difficulty: 'intermediate',
      question: 'What are the three closure traits in Rust and how do they capture their environment?',
      options: [
        { id: 'a', text: '`Fn` captures by immutable reference, `FnMut` captures by mutable reference, and `FnOnce` captures by value (ownership)' },
        { id: 'b', text: '`Fn` is for multi-threaded closures, `FnMut` is for single-threaded, `FnOnce` is for macros' },
        { id: 'c', text: 'All closures in Rust must capture by reference' },
        { id: 'd', text: '`FnOnce` can be invoked infinitely many times' },
      ],
      correctOptionId: 'a',
      explanation:
        'The closure traits categorize environmental capture: `Fn` borrows values immutably and can be called repeatedly; `FnMut` borrows values mutably and can modify captured state; `FnOnce` takes ownership of captured variables and can only be called once.',
    },
    {
      id: 'q-gt-4',
      lessonId: 'generics-and-traits',
      difficulty: 'advanced',
      question: 'Why are iterator adapters such as `.map()` and `.filter()` referred to as "lazy" in Rust?',
      options: [
        { id: 'a', text: 'They execute on a background OS thread' },
        { id: 'b', text: 'They do nothing until a consuming terminal method like `.collect()` or `.next()` is called' },
        { id: 'c', text: 'They only evaluate the first 10 items in the iterator' },
        { id: 'd', text: 'They return pointers that cannot be mutated' },
      ],
      correctOptionId: 'b',
      explanation:
        'Iterator adapters produce new iterator structures that wrap the previous iterator without processing elements upfront. No actual computation occurs until a consumer like `.collect()`, `.for_each()`, or `.sum()` pulls values via `.next()`.',
    },
  ],

  'smart-pointers': [
    {
      id: 'q-sp-1',
      lessonId: 'smart-pointers',
      difficulty: 'intermediate',
      question: 'When should you use `Box<T>` instead of a normal stack variable?',
      options: [
        { id: 'a', text: 'When you need recursive data structures of unknown compile-time size, or want to transfer large data without copying' },
        { id: 'b', text: 'Whenever you want to share data across multiple threads concurrently' },
        { id: 'c', text: 'To perform garbage collection cycles' },
        { id: 'd', text: 'Only when calling C code' },
      ],
      correctOptionId: 'a',
      explanation:
        '`Box<T>` provides heap allocation with a fixed pointer size on the stack. This allows constructing recursive types (like trees or linked lists) whose full size cannot be known at compile time, and transfers ownership of large buffers cheaply without copying.',
    },
    {
      id: 'q-sp-2',
      lessonId: 'smart-pointers',
      difficulty: 'intermediate',
      question: 'What is the primary difference between `Rc<T>` and `Arc<T>`?',
      options: [
        { id: 'a', text: '`Rc<T>` is thread-safe using atomic operations, while `Arc<T>` is for single-threaded code' },
        { id: 'b', text: '`Arc<T>` uses atomic operations for reference counting and is thread-safe (`Send + Sync`), whereas `Rc<T>` is non-atomic and single-threaded' },
        { id: 'c', text: '`Arc<T>` allows interior mutability by default, while `Rc<T>` does not' },
        { id: 'd', text: '`Rc<T>` stores data on the stack, whereas `Arc<T>` stores data on disk' },
      ],
      correctOptionId: 'b',
      explanation:
        '`Rc<T>` (Reference Counted) uses non-atomic arithmetic, making it fast but unsafe across threads. `Arc<T>` (Atomically Reference Counted) uses CPU atomic instructions, safely allowing multiple threads to share read-only ownership of the same heap data.',
    },
    {
      id: 'q-sp-3',
      lessonId: 'smart-pointers',
      difficulty: 'advanced',
      question: 'How does `RefCell<T>` provide interior mutability?',
      options: [
        { id: 'a', text: 'By disabling the borrow checker entirely for the whole program' },
        { id: 'b', text: 'By enforcing the borrow checker rules dynamically at runtime rather than at compile time, panicking if violated' },
        { id: 'c', text: 'By encrypting memory addresses in RAM' },
        { id: 'd', text: 'By allocating memory inside kernel space' },
      ],
      correctOptionId: 'b',
      explanation:
        '`RefCell<T>` allows mutating data even when there is an immutable reference to the `RefCell`. It tracks active borrows at runtime (`.borrow()` and `.borrow_mut()`). If you break the borrowing rules at runtime, the program panics instead of failing to compile.',
    },
    {
      id: 'q-sp-4',
      lessonId: 'smart-pointers',
      difficulty: 'advanced',
      question: 'What problem does `Weak<T>` solve when paired with `Rc<T>` or `Arc<T>`?',
      options: [
        { id: 'a', text: 'It creates non-owning pointers that prevent reference cycles and memory leaks' },
        { id: 'b', text: 'It allows pointers to outlive the operating system process' },
        { id: 'c', text: 'It speeds up pointer dereferencing on ARM architectures' },
        { id: 'd', text: 'It automatically fixes race conditions' },
      ],
      correctOptionId: 'a',
      explanation:
        'Cycles of `Rc<T>` pointers can cause memory leaks because the reference count never reaches zero. `Weak<T>` holds a non-owning weak reference: it increments `weak_count` rather than `strong_count`, breaking reference cycles.',
    },
  ],

  'concurrency': [
    {
      id: 'q-cc-1',
      lessonId: 'concurrency',
      difficulty: 'intermediate',
      question: 'Why does spawning a thread with `std::thread::spawn` typically require a `move` closure?',
      options: [
        { id: 'a', text: 'Because threads must take ownership of captured variables since the compiler cannot guarantee how long the thread will run' },
        { id: 'b', text: 'Because closures without `move` are not supported in Rust' },
        { id: 'c', text: 'To convert stack memory to static variables' },
        { id: 'd', text: 'To prevent the thread from returning a value' },
      ],
      correctOptionId: 'a',
      explanation:
        "Spawned threads have a 'static lifetime bound by default because the main thread or creating scope could exit before the spawned thread finishes. Moving variables transfers ownership into the thread, ensuring references cannot dangle.",
    },
    {
      id: 'q-cc-2',
      lessonId: 'concurrency',
      difficulty: 'intermediate',
      question: 'What combination of smart pointers is commonly used in Rust to achieve shared mutable state across threads?',
      options: [
        { id: 'a', text: '`Rc<RefCell<T>>`' },
        { id: 'b', text: '`Arc<Mutex<T>>`' },
        { id: 'c', text: '`Box<Mutex<T>>`' },
        { id: 'd', text: '`Arc<RefCell<T>>`' },
      ],
      correctOptionId: 'b',
      explanation:
        '`Arc<T>` provides safe multi-owner shared access across threads, and `Mutex<T>` (or `RwLock<T>`) provides mutually exclusive interior mutability. Together, `Arc<Mutex<T>>` enables safe concurrent read-write access without data races.',
    },
    {
      id: 'q-cc-3',
      lessonId: 'concurrency',
      difficulty: 'advanced',
      question: 'What are the `Send` and `Sync` marker traits in the standard library?',
      options: [
        { id: 'a', text: '`Send` indicates ownership of a type can be transferred to another thread; `Sync` indicates it is safe to share references across threads' },
        { id: 'b', text: '`Send` is for networking sockets; `Sync` is for file writing' },
        { id: 'c', text: 'They are macros used to initiate async task loops' },
        { id: 'd', text: '`Send` and `Sync` must be manually implemented for all structs' },
      ],
      correctOptionId: 'a',
      explanation:
        '`Send` and `Sync` are built-in marker traits that form the basis of Rust’s "Fearless Concurrency". A type is `Send` if ownership can move between threads. A type is `Sync` if `&T` can be safely accessed concurrently from multiple threads (`T: Sync` if and only if `&T: Send`).',
    },
    {
      id: 'q-cc-4',
      lessonId: 'concurrency',
      difficulty: 'advanced',
      question: 'What is required to execute an `async fn` in Rust?',
      options: [
        { id: 'a', text: 'The Rust standard library automatically executes async functions on a background thread pool' },
        { id: 'b', text: 'An async runtime or executor (such as Tokio or smol) is required to poll the returned Future to completion' },
        { id: 'c', text: 'Simply calling `my_async_fn()` executes it synchronously' },
        { id: 'd', text: 'Async functions can only be executed inside a WebAssembly container' },
      ],
      correctOptionId: 'b',
      explanation:
        'In Rust, calling an `async fn` does nothing until it is polled; it simply constructs a `Future`. The standard library provides the `Future` trait interface but deliberately does not provide a built-in asynchronous runtime or executor. You must use an executor (e.g. Tokio) to drive futures to completion.',
    },
  ],
};
