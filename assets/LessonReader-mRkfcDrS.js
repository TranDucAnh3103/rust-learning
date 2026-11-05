import{b as W,j as e,u as _,a as j,G as k,A as O,C as $}from"./index-BXhmaTvk.js";import{r as S,j as A,u as H,P as V,C as P,v as G,w as X,x as Q,n as U,B as Y,b as B,y as K,z as J,e as Z,A as ee}from"./vendor-icons-DKQNZ3Ue.js";import{c as D,d as te,L as N}from"./vendor-react-HP-Lxr5A.js";import{L as C}from"./exercises-Dp0_1mz_.js";import{B as z}from"./Badge-kaZ7n9ZA.js";const I={"getting-started":[{id:"q-gs-1",lessonId:"getting-started",difficulty:"beginner",question:"What is the primary role of the `cargo check` command in the standard Rust toolchain workflow?",options:[{id:"a",text:"It compiles and runs the executable with debug symbols"},{id:"b",text:"It quickly verifies that code compiles without producing an executable binary"},{id:"c",text:"It formats the source code according to Rust community conventions"},{id:"d",text:"It publishes the crate to crates.io package registry"}],correctOptionId:"b",explanation:"`cargo check` analyzes the codebase and runs the compiler front-end and borrow checker without performing code generation or linking, making it much faster during iterative development than `cargo build`."},{id:"q-gs-2",lessonId:"getting-started",difficulty:"beginner",question:"In Rust, what distinguishes an expression from a statement?",options:[{id:"a",text:"Statements return values, whereas expressions do not"},{id:"b",text:"Expressions evaluate to a value, whereas statements perform an action and do not return a value"},{id:"c",text:"Expressions always require a semicolon at the end"},{id:"d",text:"Statements can only be used inside the main function"}],correctOptionId:"b",explanation:"Expressions evaluate to a resulting value (e.g. `5 + 6` or a block `{ x + 1 }` without a semicolon). Statements are instructions that perform some action and do not return a value (e.g. `let x = 6;`). Adding a semicolon turns an expression into a statement."},{id:"q-gs-3",lessonId:"getting-started",difficulty:"beginner",question:'Why does the call `println!("Hello, world!");` include an exclamation mark (`!`)?',options:[{id:"a",text:"It denotes an unsafe function call"},{id:"b",text:"It calls a macro instead of a standard function"},{id:"c",text:"It tells the compiler to run the function concurrently"},{id:"d",text:"It is required for all functions returning unit type `()`"}],correctOptionId:"b",explanation:"In Rust, an exclamation point indicates a macro invocation. Macros can take variable numbers of arguments and perform compile-time code generation and format string validation, unlike regular functions."},{id:"q-gs-4",lessonId:"getting-started",difficulty:"intermediate",question:"Where is package metadata and third-party crate dependencies declared in a standard Cargo project?",options:[{id:"a",text:"Inside Cargo.lock"},{id:"b",text:"Inside src/main.rs headers"},{id:"c",text:"Inside Cargo.toml"},{id:"d",text:"Inside the rust-toolchain.toml file"}],correctOptionId:"c",explanation:"`Cargo.toml` is the manifest file where package configuration, compiler options, and dependency declarations are specified by the developer. `Cargo.lock` records exact resolved dependency versions."}],"variables-and-types":[{id:"q-vt-1",lessonId:"variables-and-types",difficulty:"beginner",question:"What happens when you try to reassign a variable declared with `let x = 5;` without the `mut` keyword?",options:[{id:"a",text:"The program crashes at runtime with a panic"},{id:"b",text:"The compiler issues a compile-time error: cannot assign twice to immutable variable"},{id:"c",text:"The variable is silently converted to a pointer"},{id:"d",text:"Rust implicitly shadows the variable"}],correctOptionId:"b",explanation:"In Rust, variables are immutable by default. Attempting to reassign to an immutable variable causes a compile-time error (E0384). To allow reassignment, you must explicitly declare it with `let mut x = 5;`."},{id:"q-vt-2",lessonId:"variables-and-types",difficulty:"beginner",question:"What is the primary difference between variable shadowing (`let x = x + 1;`) and mutability (`x = x + 1;`)?",options:[{id:"a",text:"Shadowing can change the variable type and remains immutable after re-declaration"},{id:"b",text:"Mutability allocates new heap memory, while shadowing is always on the stack"},{id:"c",text:"Shadowing is only allowed in root module scope"},{id:"d",text:"Shadowing is slower at runtime than mutating an in-place value"}],correctOptionId:"a",explanation:"By using `let`, variable shadowing creates an entirely new variable with the same name. This allows changing the type (e.g., from `&str` to `usize`) and guarantees the binding remains immutable after declaration unless marked `mut`."},{id:"q-vt-3",lessonId:"variables-and-types",difficulty:"intermediate",question:"In Rust, what does an `if` construct return?",options:[{id:"a",text:"Always boolean `true` or `false`"},{id:"b",text:"It is an expression, so each arm evaluates to a value of matching types"},{id:"c",text:"It can only evaluate to unit `()`"},{id:"d",text:"It is a statement and cannot return any value"}],correctOptionId:"b",explanation:"In Rust, `if` is an expression, meaning it can return values: `let number = if condition { 5 } else { 6 };`. Both the `if` arm and `else` arm must evaluate to compatible matching types."},{id:"q-vt-4",lessonId:"variables-and-types",difficulty:"intermediate",question:"Which of the following describes fixed-size compound types in Rust?",options:[{id:"a",text:"Vectors (`Vec<T>`) have fixed length allocated on the stack"},{id:"b",text:"Arrays (`[T; N]`) have a fixed compile-time size and are stored contiguously on the stack"},{id:"c",text:"Tuples can dynamically grow if marked with `mut`"},{id:"d",text:"Slices (`&[T]`) own the underlying data on the stack"}],correctOptionId:"b",explanation:"Arrays in Rust (`[T; N]`) have a fixed size known at compile time and allocate memory directly on the stack without heap indirection. Vectors (`Vec<T>`), by contrast, are dynamically resizable and store elements on the heap."}],"ownership-and-borrowing":[{id:"q-ob-1",lessonId:"ownership-and-borrowing",difficulty:"beginner",question:"What are the three fundamental rules of ownership in Rust?",options:[{id:"a",text:"1. Each value has an owner; 2. There can only be one owner at a time; 3. When the owner goes out of scope, the value is dropped"},{id:"b",text:"1. Every variable is mutable; 2. Memory is collected by a generational GC; 3. Pointers can be null"},{id:"c",text:"1. All data lives on the heap; 2. Multiple threads can mutate data concurrently; 3. Lifetimes must be declared on all variables"},{id:"d",text:"1. Values are copied by default; 2. Stack memory must be freed manually; 3. References can outlive owners"}],correctOptionId:"a",explanation:"Rust’s core memory safety guarantees are built on these three rules: each value has an owner, only one owner exists at any given moment, and when that owner exits scope, its memory is deterministically deallocated via `drop`."},{id:"q-ob-2",lessonId:"ownership-and-borrowing",difficulty:"intermediate",question:"What occurs during the assignment `let s2 = s1;` when `s1` is of type `String`?",options:[{id:"a",text:"A full deep copy of the heap buffer is executed"},{id:"b",text:"The ownership of the string is moved to `s2`, invalidating `s1`"},{id:"c",text:"`s2` becomes a reference pointing to `s1`"},{id:"d",text:"Both `s1` and `s2` share ownership via automatic reference counting"}],correctOptionId:"b",explanation:"`String` does not implement the `Copy` trait because it owns heap-allocated memory. The assignment copies the 24-byte pointer/len/cap stack metadata to `s2` and invalidates `s1` to prevent double-free errors. This is known as a move."},{id:"q-ob-3",lessonId:"ownership-and-borrowing",difficulty:"intermediate",question:"Which rule governs mutable and immutable borrows in the same scope?",options:[{id:"a",text:"You can have unlimited mutable references as long as there is only one immutable reference"},{id:"b",text:"You can have either any number of immutable references OR exactly one mutable reference, but never both simultaneously"},{id:"c",text:"Immutable references can be converted to mutable references anytime"},{id:"d",text:"Mutable references cannot be passed as function arguments"}],correctOptionId:"b",explanation:'The Borrow Checker enforces the "Aliasing XOR Mutability" law: at any given time in a scope, you may have any number of immutable references (`&T`), OR exactly one mutable reference (`&mut T`), preventing data races at compile time.'},{id:"q-ob-4",lessonId:"ownership-and-borrowing",difficulty:"advanced",question:"What is the purpose of generic lifetime annotations like `'a` in function signatures?",options:[{id:"a",text:"They instruct the compiler how long to keep values in memory before calling malloc"},{id:"b",text:"They describe the relationships between the lifetimes of multiple references so the borrow checker can prove safety"},{id:"c",text:"They extend the duration of variables so they live for the lifetime of the program"},{id:"d",text:"They enable garbage collection for circular reference graphs"}],correctOptionId:"b",explanation:"Lifetime annotations do not change how long references actually live. Instead, they specify how the lifetimes of different input references relate to each other and to the return value, enabling rustc to ensure references never outlive the data they borrow."}],"structs-and-enums":[{id:"q-se-1",lessonId:"structs-and-enums",difficulty:"beginner",question:"What is the first parameter of an instance method in an `impl` block that allows reading but not modifying the struct?",options:[{id:"a",text:"`&mut self`"},{id:"b",text:"`&self`"},{id:"c",text:"`self`"},{id:"d",text:"`this: &Self`"}],correctOptionId:"b",explanation:"`&self` is shorthand for `self: &Self`. It borrows the instance immutably, allowing read access to fields without taking ownership or modifying the struct."},{id:"q-se-2",lessonId:"structs-and-enums",difficulty:"intermediate",question:"How do Rust enums differ from typical enums in languages like C or Java?",options:[{id:"a",text:"Rust enums are restricted to consecutive integer values"},{id:"b",text:"Rust enum variants can store arbitrary associated data, including different types and structs per variant"},{id:"c",text:"Rust enums can only be instantiated on the heap"},{id:"d",text:"Rust enums cannot be used inside `match` expressions"}],correctOptionId:"b",explanation:"Rust enums are algebraic data types (tagged unions). Each variant can carry different payloads: tuples, structs, or no data at all (e.g. `enum Message { Quit, Move { x: i32, y: i32 }, Write(String) }`)."},{id:"q-se-3",lessonId:"structs-and-enums",difficulty:"intermediate",question:"What occurs if a `match` expression on an enum does not cover all possible variants and lacks a catch-all pattern (`_`)?",options:[{id:"a",text:"The program compiles with a warning and skips missing cases at runtime"},{id:"b",text:"The compiler refuses to build, reporting non-exhaustive pattern error"},{id:"c",text:"Rust automatically inserts a panic for uncovered arms"},{id:"d",text:"The function returns `None` implicitly"}],correctOptionId:"b",explanation:"Pattern matching in Rust is exhaustive. The compiler requires you to handle every conceivable case or provide a wildcard `_ => ...`, guaranteeing no unhandled enum states occur at runtime."},{id:"q-se-4",lessonId:"structs-and-enums",difficulty:"advanced",question:"When should you prefer `if let` over a full `match` expression?",options:[{id:"a",text:"When you want to handle only one specific variant and ignore all others"},{id:"b",text:"When you need to match across multiple enums simultaneously"},{id:"c",text:"When performance is critical because `if let` bypasses pattern compilation"},{id:"d",text:"Only when dealing with raw pointers"}],correctOptionId:"a",explanation:"`if let Some(val) = opt` is syntactic sugar for a `match` that runs code when a value matches one pattern and ignores everything else, eliminating boilerplate."}],"error-handling":[{id:"q-eh-1",lessonId:"error-handling",difficulty:"beginner",question:"What is the primary difference between a `panic!` and returning a `Result<T, E>` in Rust?",options:[{id:"a",text:"`panic!` handles expected network errors, while `Result` is only for fatal crashes"},{id:"b",text:"`panic!` represents unrecoverable faults that unwind or abort, while `Result` represents expected, recoverable errors"},{id:"c",text:"`Result` is handled by the CPU kernel directly"},{id:"d",text:"There is no difference; `panic!` is an alias for `Result::Err`"}],correctOptionId:"b",explanation:"In Rust, expected failures (like file not found or invalid user input) are represented as `Result<T, E>` so calling code can inspect and handle them. `panic!` indicates an unrecoverable bug or assertion violation (like indexing out of bounds)."},{id:"q-eh-2",lessonId:"error-handling",difficulty:"intermediate",question:"What does the question mark (`?`) operator do when applied to a `Result<T, E>` value?",options:[{id:"a",text:"It suppresses any error and replaces it with default values"},{id:"b",text:"If `Ok(v)`, it unpacks `v`; if `Err(e)`, it immediately returns `Err(From::from(e))` from the enclosing function"},{id:"c",text:"It causes the thread to sleep until the error resolves"},{id:"d",text:"It logs the error to stderr and proceeds with execution"}],correctOptionId:"b",explanation:"The `?` operator is idiomatic error propagation. If the expression evaluates to `Ok(val)`, `val` is returned as the value of the expression. If `Err(err)`, the enclosing function returns early with `Err(...)`, converting error types via `From::from`."},{id:"q-eh-3",lessonId:"error-handling",difficulty:"intermediate",question:'Why is using `.expect("descriptive message")` preferred over `.unwrap()` in production code where panics might be possible?',options:[{id:"a",text:"`.expect()` prevents the thread from terminating on failure"},{id:"b",text:"`.expect()` provides informative debugging context in the panic message explaining developer intent"},{id:"c",text:"`.expect()` automatically retries the operation three times"},{id:"d",text:"`.expect()` incurs zero binary size overhead compared to unwrap"}],correctOptionId:"b",explanation:'While both panic if the value is `None` or `Err`, `.expect("failed to open database config")` prints the specified descriptive message, clarifying what invariant was violated and making triage much faster.'},{id:"q-eh-4",lessonId:"error-handling",difficulty:"advanced",question:"Which standard trait allows heterogeneous error types to be converted into a common error type with the `?` operator?",options:[{id:"a",text:"`std::convert::From<E>`"},{id:"b",text:"`std::ops::Deref`"},{id:"c",text:"`std::borrow::Borrow`"},{id:"d",text:"`std::marker::Sync`"}],correctOptionId:"a",explanation:"The `?` operator automatically calls `From::from(err)` to convert the caught error into the return error type of the calling function, enabling seamless error chaining across I/O, parsing, and custom domain errors."}],"generics-and-traits":[{id:"q-gt-1",lessonId:"generics-and-traits",difficulty:"beginner",question:"How does Rust achieve zero runtime cost for generic functions?",options:[{id:"a",text:"Through runtime type reflection and JIT compilation"},{id:"b",text:"Through monomorphization: generating specialized machine code copies for each concrete type used at compile time"},{id:"c",text:"By boxing all generic parameters into heap pointers"},{id:"d",text:"By stripping generic parameters at runtime like Java type erasure"}],correctOptionId:"b",explanation:"Rust uses monomorphization. The compiler inspects everywhere a generic function is called and creates duplicate, specialized implementations for each concrete type, enabling aggressive inlining and optimization with zero dynamic dispatch overhead."},{id:"q-gt-2",lessonId:"generics-and-traits",difficulty:"intermediate",question:"What is the difference between static dispatch (`impl Trait`) and dynamic dispatch (`dyn Trait`) in Rust?",options:[{id:"a",text:"Static dispatch resolves calls at compile time with monomorphization; dynamic dispatch uses runtime vtables and fat pointers"},{id:"b",text:"`dyn Trait` is faster because it bypasses compiler type checks"},{id:"c",text:"Static dispatch can only be used with primitive numbers"},{id:"d",text:"Dynamic dispatch does not allow references"}],correctOptionId:"a",explanation:"Static dispatch (`impl Trait` / generics) determines the exact function address at compile time with zero overhead. Dynamic dispatch (`&dyn Trait` or `Box<dyn Trait>`) uses a vtable pointer inside a fat pointer to resolve methods at runtime, allowing heterogeneous collections."},{id:"q-gt-3",lessonId:"generics-and-traits",difficulty:"intermediate",question:"What are the three closure traits in Rust and how do they capture their environment?",options:[{id:"a",text:"`Fn` captures by immutable reference, `FnMut` captures by mutable reference, and `FnOnce` captures by value (ownership)"},{id:"b",text:"`Fn` is for multi-threaded closures, `FnMut` is for single-threaded, `FnOnce` is for macros"},{id:"c",text:"All closures in Rust must capture by reference"},{id:"d",text:"`FnOnce` can be invoked infinitely many times"}],correctOptionId:"a",explanation:"The closure traits categorize environmental capture: `Fn` borrows values immutably and can be called repeatedly; `FnMut` borrows values mutably and can modify captured state; `FnOnce` takes ownership of captured variables and can only be called once."},{id:"q-gt-4",lessonId:"generics-and-traits",difficulty:"advanced",question:'Why are iterator adapters such as `.map()` and `.filter()` referred to as "lazy" in Rust?',options:[{id:"a",text:"They execute on a background OS thread"},{id:"b",text:"They do nothing until a consuming terminal method like `.collect()` or `.next()` is called"},{id:"c",text:"They only evaluate the first 10 items in the iterator"},{id:"d",text:"They return pointers that cannot be mutated"}],correctOptionId:"b",explanation:"Iterator adapters produce new iterator structures that wrap the previous iterator without processing elements upfront. No actual computation occurs until a consumer like `.collect()`, `.for_each()`, or `.sum()` pulls values via `.next()`."}],"smart-pointers":[{id:"q-sp-1",lessonId:"smart-pointers",difficulty:"intermediate",question:"When should you use `Box<T>` instead of a normal stack variable?",options:[{id:"a",text:"When you need recursive data structures of unknown compile-time size, or want to transfer large data without copying"},{id:"b",text:"Whenever you want to share data across multiple threads concurrently"},{id:"c",text:"To perform garbage collection cycles"},{id:"d",text:"Only when calling C code"}],correctOptionId:"a",explanation:"`Box<T>` provides heap allocation with a fixed pointer size on the stack. This allows constructing recursive types (like trees or linked lists) whose full size cannot be known at compile time, and transfers ownership of large buffers cheaply without copying."},{id:"q-sp-2",lessonId:"smart-pointers",difficulty:"intermediate",question:"What is the primary difference between `Rc<T>` and `Arc<T>`?",options:[{id:"a",text:"`Rc<T>` is thread-safe using atomic operations, while `Arc<T>` is for single-threaded code"},{id:"b",text:"`Arc<T>` uses atomic operations for reference counting and is thread-safe (`Send + Sync`), whereas `Rc<T>` is non-atomic and single-threaded"},{id:"c",text:"`Arc<T>` allows interior mutability by default, while `Rc<T>` does not"},{id:"d",text:"`Rc<T>` stores data on the stack, whereas `Arc<T>` stores data on disk"}],correctOptionId:"b",explanation:"`Rc<T>` (Reference Counted) uses non-atomic arithmetic, making it fast but unsafe across threads. `Arc<T>` (Atomically Reference Counted) uses CPU atomic instructions, safely allowing multiple threads to share read-only ownership of the same heap data."},{id:"q-sp-3",lessonId:"smart-pointers",difficulty:"advanced",question:"How does `RefCell<T>` provide interior mutability?",options:[{id:"a",text:"By disabling the borrow checker entirely for the whole program"},{id:"b",text:"By enforcing the borrow checker rules dynamically at runtime rather than at compile time, panicking if violated"},{id:"c",text:"By encrypting memory addresses in RAM"},{id:"d",text:"By allocating memory inside kernel space"}],correctOptionId:"b",explanation:"`RefCell<T>` allows mutating data even when there is an immutable reference to the `RefCell`. It tracks active borrows at runtime (`.borrow()` and `.borrow_mut()`). If you break the borrowing rules at runtime, the program panics instead of failing to compile."},{id:"q-sp-4",lessonId:"smart-pointers",difficulty:"advanced",question:"What problem does `Weak<T>` solve when paired with `Rc<T>` or `Arc<T>`?",options:[{id:"a",text:"It creates non-owning pointers that prevent reference cycles and memory leaks"},{id:"b",text:"It allows pointers to outlive the operating system process"},{id:"c",text:"It speeds up pointer dereferencing on ARM architectures"},{id:"d",text:"It automatically fixes race conditions"}],correctOptionId:"a",explanation:"Cycles of `Rc<T>` pointers can cause memory leaks because the reference count never reaches zero. `Weak<T>` holds a non-owning weak reference: it increments `weak_count` rather than `strong_count`, breaking reference cycles."}],concurrency:[{id:"q-cc-1",lessonId:"concurrency",difficulty:"intermediate",question:"Why does spawning a thread with `std::thread::spawn` typically require a `move` closure?",options:[{id:"a",text:"Because threads must take ownership of captured variables since the compiler cannot guarantee how long the thread will run"},{id:"b",text:"Because closures without `move` are not supported in Rust"},{id:"c",text:"To convert stack memory to static variables"},{id:"d",text:"To prevent the thread from returning a value"}],correctOptionId:"a",explanation:"Spawned threads have a 'static lifetime bound by default because the main thread or creating scope could exit before the spawned thread finishes. Moving variables transfers ownership into the thread, ensuring references cannot dangle."},{id:"q-cc-2",lessonId:"concurrency",difficulty:"intermediate",question:"What combination of smart pointers is commonly used in Rust to achieve shared mutable state across threads?",options:[{id:"a",text:"`Rc<RefCell<T>>`"},{id:"b",text:"`Arc<Mutex<T>>`"},{id:"c",text:"`Box<Mutex<T>>`"},{id:"d",text:"`Arc<RefCell<T>>`"}],correctOptionId:"b",explanation:"`Arc<T>` provides safe multi-owner shared access across threads, and `Mutex<T>` (or `RwLock<T>`) provides mutually exclusive interior mutability. Together, `Arc<Mutex<T>>` enables safe concurrent read-write access without data races."},{id:"q-cc-3",lessonId:"concurrency",difficulty:"advanced",question:"What are the `Send` and `Sync` marker traits in the standard library?",options:[{id:"a",text:"`Send` indicates ownership of a type can be transferred to another thread; `Sync` indicates it is safe to share references across threads"},{id:"b",text:"`Send` is for networking sockets; `Sync` is for file writing"},{id:"c",text:"They are macros used to initiate async task loops"},{id:"d",text:"`Send` and `Sync` must be manually implemented for all structs"}],correctOptionId:"a",explanation:'`Send` and `Sync` are built-in marker traits that form the basis of Rust’s "Fearless Concurrency". A type is `Send` if ownership can move between threads. A type is `Sync` if `&T` can be safely accessed concurrently from multiple threads (`T: Sync` if and only if `&T: Send`).'},{id:"q-cc-4",lessonId:"concurrency",difficulty:"advanced",question:"What is required to execute an `async fn` in Rust?",options:[{id:"a",text:"The Rust standard library automatically executes async functions on a background thread pool"},{id:"b",text:"An async runtime or executor (such as Tokio or smol) is required to poll the returned Future to completion"},{id:"c",text:"Simply calling `my_async_fn()` executes it synchronously"},{id:"d",text:"Async functions can only be executed inside a WebAssembly container"}],correctOptionId:"b",explanation:"In Rust, calling an `async fn` does nothing until it is polled; it simply constructs a `Future`. The standard library provides the `Future` trait interface but deliberately does not provide a built-in asynchronous runtime or executor. You must use an executor (e.g. Tokio) to drive futures to completion."}]},ne={"getting-started":{id:"getting-started",slug:"getting-started",trackId:"track-foundations",title:"01. Getting Started with Rust & Cargo",order:1,difficulty:"beginner",estimatedMinutes:20,description:"Explore rustc, Cargo project layout, build commands, macro fundamentals, and expressions vs statements.",learningObjectives:["Understand why Rust provides memory safety and concurrency without a garbage collector","Master the standard Cargo workflow: cargo new, build, run, and check","Understand the difference between the rustc compiler and the Cargo build system","Distinguish between expressions that produce values and statements that perform actions"],documentationLinks:[{title:"The Rust Book - Getting Started",url:"https://doc.rust-lang.org/book/ch01-00-getting-started.html"},{title:"Cargo Guide",url:"https://doc.rust-lang.org/cargo/"}],interactiveExercise:C["getting-started"],quizzes:I["getting-started"],markdownContent:`
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
`},"variables-and-types":{id:"variables-and-types",slug:"variables-and-types",trackId:"track-foundations",title:"02. Variables, Types & Control Flow",order:2,difficulty:"beginner",estimatedMinutes:25,description:"Deep dive into immutability by default, variable shadowing, primitive scalar/compound types, and expression-based control flow.",learningObjectives:["Understand the reasoning and guarantees behind immutability by default","Distinguish between variable mutability (`let mut`) and variable shadowing (`let`)","Master scalar types (integers, floats, booleans, chars) and compound types (tuples, arrays)","Write expression-oriented control flow with if, loop, while, and for"],documentationLinks:[{title:"The Rust Book - Common Programming Concepts",url:"https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html"},{title:"Rust By Example - Primitives",url:"https://doc.rust-lang.org/rust-by-example/primitives.html"}],interactiveExercise:C["variables-and-types"],quizzes:I["variables-and-types"],markdownContent:'\n# Variables, Types & Control Flow\n\nIn Rust, variables are **immutable by default**. This foundational design choice nudges developers toward safer, highly concurrent code by preventing accidental mutations across functions.\n\n---\n\n## 1. Immutability vs Mutability vs Shadowing\n\nWhen you declare a binding with `let x = 5;`, the value of `x` cannot be altered.\n\n```rust\n// [EXPECTED COMPILE FAILURE: E0384 - Cannot assign twice to immutable variable]\nlet x = 5;\nx = 6; // rustc refuses to compile this!\n```\n\nTo allow mutation, explicitly use the `mut` keyword:\n```rust\nlet mut counter = 0;\ncounter += 1; // Valid: explicitly opted into mutation\n```\n\n### Variable Shadowing\nShadowing allows you to declare a *new* variable using an existing name with the `let` keyword. It has two major superpowers:\n1. **Type Transformation:** You can reuse a clean variable name while changing its type (e.g., parsing a string input into a number).\n2. **Immutable Re-binding:** After transforming data, the new variable remains immutable.\n\n```rust\nlet spaces = "   "; // &str\nlet spaces = spaces.len(); // usize - shadowed!\n```\n\n---\n\n## 2. Primitive Data Types\n\nRust is statically typed. The compiler can infer almost all local variable types, but explicit annotations are supported.\n\n### Scalar Types\n- **Integers:** Signed (`i8`, `i16`, `i32`, `i64`, `i128`, `isize`) and Unsigned (`u8`, `u16`, `u32`, `u64`, `u128`, `usize`). Default is `i32`.\n- **Floating-Point:** `f32` and `f64` (IEEE-754). Default is `f64`.\n- **Boolean:** `bool` with values `true` or `false`.\n- **Character:** `char`, representing a four-byte Unicode Scalar Value (supports emojis, accented glyphs, Chinese/Japanese characters).\n\n### Compound Types\n- **Tuples:** Fixed-length heterogeneous groups: `let tup: (i32, f64, u8) = (500, 6.4, 1);`. Elements are accessed via `tup.0`, `tup.1`.\n- **Arrays:** Fixed-length homogeneous groups stored contiguously on the stack: `let arr: [i32; 5] = [1, 2, 3, 4, 5];`. Access via `arr[0]`.\n\n---\n\n## 3. Control Flow as Expressions\n\nUnlike C or Java where `if` is a statement, in Rust `if` is an **expression**. You can assign the result of an `if` directly to a variable:\n\n```rust\nlet condition = true;\nlet number = if condition { 42 } else { 0 };\n```\n\n### Loops in Rust\n- **`loop`**: Infinite loop. Can return a value with `break value;`.\n- **`while condition`**: Evaluates condition before each iteration.\n- **`for item in collection`**: Idiomatic iteration over ranges or slices (e.g. `for i in 1..=10`).\n\n---\n\n## 4. Code Examples\n\n### Example 2.1: Returning Values from a Loop (Compiles)\n```rust\nfn main() {\n    let mut counter = 0;\n\n    let result = loop {\n        counter += 1;\n        if counter == 10 {\n            break counter * 2; // Returns 20 from the loop expression!\n        }\n    };\n\n    println!("Loop evaluated to: {}", result); // 20\n}\n```\n\n### Example 2.2: Array Iteration with Range (Compiles)\n```rust\nfn main() {\n    let primes = [2, 3, 5, 7, 11];\n\n    for (index, &prime) in primes.iter().enumerate() {\n        println!("Prime index {}: {}", index, prime);\n    }\n}\n```\n\n### Example 2.3: Mismatched Types in `if` Arms (Fails to Compile)\n```rust\n// [EXPECTED COMPILE FAILURE: E0308 - `if` and `else` have incompatible types]\nfn main() {\n    let flag = true;\n    let value = if flag {\n        5      // evaluates to integer\n    } else {\n        "five" // evaluates to &str! Incompatible types!\n    };\n    println!("Value: {:?}", value);\n}\n```\n*Explanation:* Rust requires every branch of an expression to evaluate to the exact same type known at compile time.\n\n---\n\n## 5. Common Beginner Mistakes\n\n1. **Attempting to modify array sizes:**\n   `[T; N]` arrays cannot grow or shrink. For dynamic lists, use `Vec<T>`.\n2. **Confusing `char` with strings:**\n   `\'a\'` (single quotes) is a 4-byte Unicode `char`. `"a"` (double quotes) is a string slice `&str`.\n3. **Integer overflow in release builds:**\n   In debug mode, Rust checks for integer overflow and panics. In release mode (`--release`), Rust performs two\'s complement wrapping.\n'},"ownership-and-borrowing":{id:"ownership-and-borrowing",slug:"ownership-and-borrowing",trackId:"track-ownership",title:"03. Ownership, Borrowing & Lifetimes",order:3,difficulty:"intermediate",estimatedMinutes:40,description:"Understand stack vs heap, move semantics, copy types, the Aliasing XOR Mutability rule, and lifetime parameters.",learningObjectives:["Master the distinction between Stack and Heap memory allocations","Explain the 3 Ownership Rules and describe move semantics vs Copy types","Apply the Aliasing XOR Mutability rule (Data Race Free invariant)","Interpret and write lifetime annotations to safely return references"],documentationLinks:[{title:"The Rust Book - Understanding Ownership",url:"https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html"},{title:"The Rustonomicon - Lifetimes",url:"https://doc.rust-lang.org/nomicon/lifetimes.html"}],interactiveExercise:C["ownership-and-borrowing"],quizzes:I["ownership-and-borrowing"],markdownContent:`
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
`},"structs-and-enums":{id:"structs-and-enums",slug:"structs-and-enums",trackId:"track-ownership",title:"04. Structs, Enums & Pattern Matching",order:4,difficulty:"intermediate",estimatedMinutes:30,description:"Construct custom types, associated methods with &self/&mut self, algebraic data types, and exhaustive pattern matching.",learningObjectives:["Define named structs, tuple structs, and unit-like structs","Implement methods and associated functions inside impl blocks","Model domain data using rich Enums with associated payloads","Write exhaustive pattern matching using match, if let, and let else"],documentationLinks:[{title:"The Rust Book - Structs",url:"https://doc.rust-lang.org/book/ch05-00-structs.html"},{title:"The Rust Book - Enums and Pattern Matching",url:"https://doc.rust-lang.org/book/ch06-00-enums.html"}],interactiveExercise:C["structs-and-enums"],quizzes:I["structs-and-enums"],markdownContent:`
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
`},"error-handling":{id:"error-handling",slug:"error-handling",trackId:"track-idioms",title:"05. Error Handling: Result & Option",order:5,difficulty:"intermediate",estimatedMinutes:30,description:"Master recoverable errors with Result<T, E>, unrecoverable panics, the ? operator, and standard error conversions.",learningObjectives:["Contrast recoverable errors (Result) with unrecoverable crashes (panic!)","Safely unpack and transform values using Option<T> and Result<T, E>","Eliminate unsafe unwrap() calls in production systems","Propagate errors cleanly with the ? try operator and the From trait"],documentationLinks:[{title:"The Rust Book - Error Handling",url:"https://doc.rust-lang.org/book/ch09-00-error-handling.html"},{title:"Rust By Example - Error Handling",url:"https://doc.rust-lang.org/rust-by-example/error.html"}],interactiveExercise:C["error-handling"],quizzes:I["error-handling"],markdownContent:'\n# Error Handling: Result & Option\n\nRust has **no exceptions** and **no null pointers**. Instead, failure is modeled directly in the type system using two core standard library enums: `Option<T>` and `Result<T, E>`.\n\n---\n\n## 1. Recoverable vs Unrecoverable Errors\n\n- **Recoverable Errors:** Expected conditions (e.g. file not found, bad network response, invalid user input). Represented via `Result<T, E>`. Calling code can inspect, retry, or report the error.\n- **Unrecoverable Errors:** Invariant violations, assertion failures, or out-of-bounds array access. Triggered with `panic!`. By default, panics unwind the stack and abort the thread.\n\n---\n\n## 2. Anatomy of `Result` and `Option`\n\n```rust\n// Defined in std::result\nenum Result<T, E> {\n    Ok(T),\n    Err(E),\n}\n\n// Defined in std::option\nenum Option<T> {\n    Some(T),\n    None,\n}\n```\n\nBoth types are imported automatically in the standard prelude.\n\n---\n\n## 3. The Dangerous Allure of `.unwrap()`\n\nCalling `.unwrap()` extracts the value inside `Ok` or `Some`. If the value is `Err` or `None`, **it immediately crashes the program with a panic**.\n\nIn production code:\n- Prefer `.expect("custom context message")` over `.unwrap()` when a panic is intentional or logically impossible.\n- Better yet, use pattern matching, `unwrap_or`, `unwrap_or_else`, or the **`?` operator**.\n\n---\n\n## 4. The `?` Operator: Idiomatic Error Propagation\n\nThe question mark operator (`?`) replaces verbose `match` blocks. When placed after an expression returning `Result` or `Option`:\n1. If the value is `Ok(v)`, it unwraps and evaluates to `v`.\n2. If the value is `Err(e)`, it **returns early** from the enclosing function with `Err(From::from(e))`.\n\n```rust\nfn read_username_from_file() -> Result<String, std::io::Error> {\n    let mut username = String::new();\n    std::fs::File::open("users.txt")?.read_to_string(&mut username)?;\n    Ok(username)\n}\n```\n\n---\n\n## 5. Code Examples\n\n### Example 5.1: Safe Propagation with `?` (Compiles)\n```rust\nuse std::num::ParseIntError;\n\nfn multiply_strings(a: &str, b: &str) -> Result<i32, ParseIntError> {\n    let num_a = a.parse::<i32>()?;\n    let num_b = b.parse::<i32>()?;\n    Ok(num_a * num_b)\n}\n\nfn main() {\n    match multiply_strings("10", "5") {\n        Ok(product) => println!("Product: {}", product),\n        Err(e) => println!("Parsing error: {}", e),\n    }\n}\n```\n\n### Example 5.2: Using `?` in a Function That Does Not Return Result (Fails to Compile)\n```rust\n// [EXPECTED COMPILE FAILURE: E0277 - The `?` operator can only be used in a function that returns `Result` or `Option`]\nfn main() {\n    let number = "42".parse::<i32>()?; // Error! main returns ()\n    println!("Number: {}", number);\n}\n```\n*Explanation:* You cannot use `?` in a function whose return type cannot represent an error. Change `fn main() -> Result<(), Box<dyn std::error::Error>>` to allow `?` in main.\n\n---\n\n## 6. Common Beginner Mistakes\n\n1. **Scattering `.unwrap()` throughout library code:**\n   Libraries should almost never panic; always return a `Result` to let the consumer decide how to handle failure.\n2. **Ignoring compiler warnings on unused Results:**\n   Rust tags `Result` with `#[must_use]`. If you call a function returning `Result` without checking it, rustc issues a warning.\n'},"generics-and-traits":{id:"generics-and-traits",slug:"generics-and-traits",trackId:"track-idioms",title:"06. Generics, Traits & Closures",order:6,difficulty:"intermediate",estimatedMinutes:35,description:"Learn monomorphization, trait bounds, impl Trait, dynamic dispatch, closure capture semantics, and lazy iterators.",learningObjectives:["Write reusable algorithms with Generics and compile-time Monomorphization","Define and implement Traits to establish shared interfaces and contracts","Compare Static Dispatch (impl Trait) with Dynamic Dispatch (dyn Trait)","Understand closure capture mechanisms (Fn, FnMut, FnOnce) and iterator pipelines"],documentationLinks:[{title:"The Rust Book - Generic Types, Traits, and Lifetimes",url:"https://doc.rust-lang.org/book/ch10-00-generics.html"},{title:"The Rust Book - Functional Language Features: Iterators and Closures",url:"https://doc.rust-lang.org/book/ch13-00-functional-features.html"}],interactiveExercise:C["generics-and-traits"],quizzes:I["generics-and-traits"],markdownContent:`
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
`},"smart-pointers":{id:"smart-pointers",slug:"smart-pointers",trackId:"track-advanced",title:"07. Smart Pointers & Memory Management",order:7,difficulty:"advanced",estimatedMinutes:40,description:"Examine Box<T>, Rc<T>, Arc<T>, RefCell<T>, interior mutability, Deref/Drop traits, and breaking cycles with Weak<T>.",learningObjectives:["Understand how Box<T> enables heap allocation and recursive data structures","Use Rc<T> and Arc<T> for single-threaded and multi-threaded shared ownership","Apply RefCell<T> for Interior Mutability and runtime borrow checking","Recognize and prevent reference cycles and memory leaks using Weak<T>"],documentationLinks:[{title:"The Rust Book - Smart Pointers",url:"https://doc.rust-lang.org/book/ch15-00-smart-pointers.html"},{title:"Rust Standard Library - std::rc",url:"https://doc.rust-lang.org/std/rc/"}],interactiveExercise:C["smart-pointers"],quizzes:I["smart-pointers"],markdownContent:`
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
`},concurrency:{id:"concurrency",slug:"concurrency",trackId:"track-advanced",title:"08. Concurrency & Asynchronous Rust",order:8,difficulty:"advanced",estimatedMinutes:45,description:"Build safe concurrent applications with OS threads, message-passing channels, Arc<Mutex<T>>, Send/Sync, and async/await.",learningObjectives:["Spawn native OS threads using std::thread::spawn and move closures","Implement thread communication using message-passing channels (mpsc)","Manage shared mutable state safely across threads using Arc<Mutex<T>>","Explain the Send and Sync marker traits and distinguish async futures from thread execution"],documentationLinks:[{title:"The Rust Book - Fearless Concurrency",url:"https://doc.rust-lang.org/book/ch16-00-concurrency.html"},{title:"Asynchronous Programming in Rust",url:"https://rust-lang.github.io/async-book/"}],interactiveExercise:C.concurrency,quizzes:I.concurrency,markdownContent:`
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
`}},se=({content:x})=>{const R=D(),y=W(),[M,E]=S.useState(null),T=(s,r)=>{navigator.clipboard.writeText(s),E(r),y.success("Code Copied","Rust code copied to your clipboard."),setTimeout(()=>E(null),2e3)},a=s=>{sessionStorage.setItem("rustforge_playground_custom_code",s),y.info("Loaded in Playground","Switching to interactive workspace..."),R("/playground")},b=()=>{var l,u;const s=x.split(`
`),r=[];let t=0,w=0;for(;t<s.length;){const i=s[t];if(i.trim().startsWith("```")){const n=i.trim().slice(3).trim()||"rust",c=[];for(t++;t<s.length&&!s[t].trim().startsWith("```");)c.push(s[t]),t++;t++;const m=c.join(`
`),p=w++,v=m.includes("EXPECTED COMPILE FAILURE")||m.includes("RUNTIME PANIC");r.push(e.jsxs("div",{className:"my-5 rounded-2xl overflow-hidden border border-white/10 shadow-glass",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2 bg-[#070a10] border-b border-white/10 text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-mono text-orange-400 font-semibold uppercase",children:n}),v&&e.jsx("span",{className:"px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30",children:"Expected Failure"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{onClick:()=>T(m,p),className:"flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors",title:"Copy code",children:M===p?e.jsxs(e.Fragment,{children:[e.jsx(A,{className:"w-3.5 h-3.5 text-emerald-400"}),e.jsx("span",{className:"text-[11px] text-emerald-400 font-medium",children:"Copied"})]}):e.jsxs(e.Fragment,{children:[e.jsx(H,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"text-[11px] font-medium",children:"Copy"})]})}),n==="rust"&&e.jsxs("button",{onClick:()=>a(m),className:"flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 transition-colors",title:"Send code to interactive playground",children:[e.jsx(V,{className:"w-3 h-3 fill-current"}),e.jsx("span",{className:"text-[11px] font-medium",children:"Try in Playground"})]})]})]}),e.jsx("pre",{className:"p-4 bg-[#0a0e17] text-slate-200 overflow-x-auto text-[13px] font-mono leading-relaxed selection:bg-orange-500/30",children:e.jsx("code",{children:m})})]},`code-${p}`));continue}if(i.startsWith("# ")){const n=i.replace("# ","");r.push(e.jsx("h1",{className:"text-2xl md:text-3xl font-extrabold text-white mt-8 mb-4 tracking-tight",children:n},`h1-${t}`)),t++;continue}if(i.startsWith("## ")){const n=i.replace("## ",""),c=n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");r.push(e.jsxs("h2",{id:c,className:"text-xl md:text-2xl font-bold text-slate-100 mt-8 mb-3 pt-2 border-b border-white/10 pb-2 tracking-tight flex items-center gap-2 group",children:[e.jsx("span",{children:n}),e.jsx("a",{href:`#${c}`,className:"text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity text-base",children:"#"})]},`h2-${t}`)),t++;continue}if(i.startsWith("### ")){const n=i.replace("### ","");r.push(e.jsx("h3",{className:"text-lg font-semibold text-orange-300 mt-6 mb-2",children:n},`h3-${t}`)),t++;continue}if(i.trim()==="---"){r.push(e.jsx("hr",{className:"my-6 border-white/10"},`hr-${t}`)),t++;continue}if(i.startsWith("> ")){const n=[];for(;t<s.length&&s[t].startsWith("> ");)n.push(s[t].replace(/^>\s?/,"")),t++;r.push(e.jsx("div",{className:"my-4 p-4 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 text-sm text-slate-200",children:n.join(" ")},`quote-${t}`));continue}if(i.includes("|")&&((l=s[t+1])!=null&&l.includes("|"))&&((u=s[t+1])!=null&&u.includes("---"))){const n=[];for(;t<s.length&&s[t].includes("|");)n.push(s[t]),t++;const c=n[0].split("|").slice(1,-1).map(p=>p.trim()),m=n.slice(2).map(p=>p.split("|").slice(1,-1).map(v=>v.trim()));r.push(e.jsx("div",{className:"my-5 overflow-x-auto rounded-xl border border-white/10",children:e.jsxs("table",{className:"w-full text-left text-xs border-collapse",children:[e.jsx("thead",{children:e.jsx("tr",{className:"bg-white/5 border-b border-white/10",children:c.map((p,v)=>e.jsx("th",{className:"p-3 font-semibold text-slate-200 uppercase tracking-wider",children:p},v))})}),e.jsx("tbody",{className:"divide-y divide-white/5",children:m.map((p,v)=>e.jsx("tr",{className:"hover:bg-white/[0.02]",children:p.map((q,L)=>e.jsx("td",{className:"p-3 text-slate-300 font-mono text-xs",children:q},L))},v))})]})},`table-${t}`));continue}if(i.trim().startsWith("- ")||i.trim().startsWith("* ")){const n=[];for(;t<s.length&&(s[t].trim().startsWith("- ")||s[t].trim().startsWith("* "));)n.push(s[t].trim().replace(/^[-*]\s+/,"")),t++;r.push(e.jsx("ul",{className:"my-3 space-y-1.5 list-disc list-inside text-sm text-slate-300",children:n.map((c,m)=>e.jsx("li",{className:"leading-relaxed",children:d(c)},m))},`ul-${t}`));continue}if(/^\d+\.\s/.test(i.trim())){const n=[];for(;t<s.length&&/^\d+\.\s/.test(s[t].trim());)n.push(s[t].trim().replace(/^\d+\.\s+/,"")),t++;r.push(e.jsx("ol",{className:"my-3 space-y-1.5 list-decimal list-inside text-sm text-slate-300",children:n.map((c,m)=>e.jsx("li",{className:"leading-relaxed",children:d(c)},m))},`ol-${t}`));continue}i.trim().length>0&&r.push(e.jsx("p",{className:"my-3 text-sm md:text-base leading-relaxed text-slate-300",children:d(i)},`p-${t}`)),t++}return r},d=s=>s.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((t,w)=>{if(t.startsWith("`")&&t.endsWith("`")){const l=t.slice(1,-1);return e.jsx("code",{className:"px-1.5 py-0.5 mx-0.5 rounded-md bg-white/10 text-orange-300 font-mono text-xs border border-white/10",children:l},w)}if(t.startsWith("**")&&t.endsWith("**")){const l=t.slice(2,-2);return e.jsx("strong",{className:"font-semibold text-slate-100",children:l},w)}return t});return e.jsx("article",{className:"prose prose-invert max-w-none",children:b()})},ae=({lessonId:x,quizzes:R,onComplete:y})=>{const{progress:M,recordQuizAttempt:E}=_(),T=W(),[a,b]=S.useState(0),[d,s]=S.useState(null),[r,t]=S.useState(!1),[w,l]=S.useState({}),[u,i]=S.useState(!1),n=R[a],c=R.length,m=M.quizAttempts[x],p=o=>{r||s(o)},v=()=>{if(!d)return;t(!0);const o=d===n.correctOptionId;l(h=>({...h,[n.id]:d})),o?T.success("Correct Answer!","Great job applying the concept."):T.error("Incorrect","Review the concept explanation below.")},q=()=>{if(a<c-1)b(o=>o+1),s(null),t(!1);else{let o=0;for(const f of R)(w[f.id]||d)===f.correctOptionId&&o++;const h=Math.round(o/c*100),g=h>=75;E(x,h,g),i(!0),g?T.success("Lesson Quiz Passed!",`You scored ${o}/${c} (${h}%).`):T.warning("Quiz Review Needed",`Score: ${o}/${c} (${h}%). You can retry.`),y&&y()}},L=()=>{b(0),s(null),t(!1),l({}),i(!1)};if(u){let o=0;for(const f of R)w[f.id]===f.correctOptionId&&o++;const h=Math.round(o/c*100),g=h>=75;return e.jsxs(j,{variant:"elevated",className:"p-6 md:p-8 my-8 border-white/15 text-center",children:[e.jsx("div",{className:`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${g?"bg-emerald-500/20 text-emerald-400 border border-emerald-500/40":"bg-amber-500/20 text-amber-400 border border-amber-500/40"}`,children:g?e.jsx(P,{className:"w-8 h-8"}):e.jsx(G,{className:"w-8 h-8"})}),e.jsx("h3",{className:"text-xl font-bold text-white mb-2",children:g?"Lesson Quiz Mastered!":"Quiz Completed - Review Recommended"}),e.jsxs("p",{className:"text-slate-300 text-sm max-w-md mx-auto mb-6",children:["You answered ",e.jsx("strong",{className:"text-white font-mono",children:o})," out of"," ",e.jsx("strong",{className:"text-white font-mono",children:c})," questions correctly (",h,"%)."]}),e.jsx("div",{className:"flex items-center justify-center gap-3",children:e.jsx(k,{variant:"outline",size:"sm",onClick:L,leftIcon:e.jsx(X,{className:"w-4 h-4"}),children:"Retry Quiz"})})]})}const F=d===n.correctOptionId;return e.jsxs(j,{variant:"elevated",className:"p-6 md:p-8 my-8 border-white/15",children:[e.jsxs("div",{className:"flex items-center justify-between pb-4 border-b border-white/10 mb-6",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx(z,{color:"orange",children:"Lesson Quiz"}),e.jsxs("span",{className:"text-xs font-semibold text-slate-400",children:["Question ",a+1," of ",c]})]}),e.jsx(z,{variant:"difficulty",difficulty:n.difficulty,children:n.difficulty})]}),e.jsx("h3",{className:"text-base md:text-lg font-semibold text-slate-100 mb-4 leading-snug",children:n.question}),n.codeSnippet&&e.jsx("pre",{className:"p-3.5 mb-5 rounded-xl bg-[#0a0e17] text-slate-200 border border-white/10 text-xs font-mono overflow-x-auto leading-relaxed",children:e.jsx("code",{children:n.codeSnippet})}),e.jsx("div",{className:"space-y-3 mb-6",role:"radiogroup","aria-label":"Quiz answer options",children:n.options.map(o=>{const h=d===o.id,g=o.id===n.correctOptionId;let f="bg-[#0f172a]/70 hover:bg-white/5 border-white/10 text-slate-200";return r?g?f="bg-emerald-500/15 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/40":h&&!g?f="bg-rose-500/15 border-rose-500/60 text-rose-200 ring-1 ring-rose-500/40":f="opacity-40 border-white/5 text-slate-400":h&&(f="bg-orange-500/15 border-orange-500/60 text-orange-200 ring-1 ring-orange-500/40"),e.jsxs("button",{role:"radio","aria-checked":h,disabled:r,onClick:()=>p(o.id),className:`w-full flex items-start gap-3.5 p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${f}`,children:[e.jsx("div",{className:`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold transition-all ${h?r?g?"border-emerald-400 bg-emerald-500 text-white":"border-rose-400 bg-rose-500 text-white":"border-orange-400 bg-orange-500 text-white":"border-white/20 text-slate-400"}`,children:o.id.toUpperCase()}),e.jsx("div",{className:"flex-1 text-xs md:text-sm leading-relaxed",children:o.text}),r&&g&&e.jsx(A,{className:"w-4 h-4 text-emerald-400 shrink-0 mt-0.5"})]},o.id)})}),r&&e.jsxs("div",{className:`p-4 rounded-xl border text-xs leading-relaxed mb-6 animate-fade-in ${F?"bg-emerald-500/10 border-emerald-500/30 text-emerald-200":"bg-rose-500/10 border-rose-500/30 text-rose-200"}`,children:[e.jsx("div",{className:"flex items-center gap-2 font-bold mb-1.5",children:F?e.jsxs(e.Fragment,{children:[e.jsx(P,{className:"w-4 h-4 text-emerald-400"}),e.jsx("span",{className:"text-emerald-300",children:"Correct!"})]}):e.jsxs(e.Fragment,{children:[e.jsx(Q,{className:"w-4 h-4 text-rose-400"}),e.jsx("span",{className:"text-rose-300",children:"Incorrect"})]})}),e.jsx("p",{className:"text-slate-300",children:n.explanation})]}),e.jsxs("div",{className:"flex items-center justify-between pt-4 border-t border-white/10",children:[e.jsx("span",{className:"text-xs text-slate-400",children:m&&e.jsxs("span",{children:["Best score: ",e.jsxs("strong",{className:"text-orange-400",children:[m.bestScore,"%"]})]})}),r?e.jsx(k,{variant:"primary",size:"md",onClick:q,rightIcon:e.jsx(U,{className:"w-4 h-4"}),children:a<c-1?"Next Question":"Finish Quiz"}):e.jsx(k,{variant:"primary",size:"md",disabled:!d,onClick:v,children:"Check Answer"})]})]})},ue=()=>{const{slug:x}=te(),R=D(),{progress:y,markLessonComplete:M,setLastVisitedLesson:E}=_(),T=W(),a=x?ne[x]:null;if(S.useEffect(()=>{x&&a&&E(x)},[x,a,E]),!a)return e.jsx("div",{className:"p-8 max-w-xl mx-auto my-12 text-center",children:e.jsxs(j,{className:"p-8 border-white/10 space-y-4",children:[e.jsx("h2",{className:"text-xl font-bold text-white",children:"Lesson Not Found"}),e.jsx("p",{className:"text-sm text-slate-400",children:"The requested curriculum lesson does not exist or may have been moved."}),e.jsx(N,{to:"/learn",children:e.jsx(k,{variant:"primary",children:"Return to Curriculum"})})]})});const b=O.findIndex(l=>l.slug===a.slug),d=b>0?O[b-1]:null,s=b<O.length-1?O[b+1]:null,r=y.completedLessons.includes(a.slug),t=()=>{M(a.slug),T.success("Progress Saved",`Marked "${a.title}" as completed!`)},w=()=>{sessionStorage.setItem("rustforge_playground_selected_exercise",a.interactiveExercise.id),R("/playground")};return e.jsx("div",{className:"max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[e.jsx("aside",{className:"hidden xl:block xl:col-span-3 sticky top-20 space-y-4",children:e.jsxs("div",{className:"p-4 rounded-2xl bg-[#0f172a]/80 border border-white/10 shadow-lg space-y-4",children:[e.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-slate-400",children:"Curriculum Modules"}),e.jsx("div",{className:"space-y-4",children:$.map(l=>e.jsxs("div",{className:"space-y-1",children:[e.jsx("span",{className:"text-[11px] font-semibold text-orange-400/90 block px-2",children:l.title}),e.jsx("div",{className:"space-y-0.5",children:l.lessons.map(u=>{const i=u.slug===a.slug,n=y.completedLessons.includes(u.slug);return e.jsxs(N,{to:`/learn/${u.slug}`,className:`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all ${i?"bg-orange-500/20 text-orange-300 font-bold border border-orange-500/40":"text-slate-400 hover:text-slate-200 hover:bg-white/5"}`,children:[e.jsxs("span",{className:"font-mono text-[10px] w-4",children:[u.order,"."]}),e.jsx("span",{className:"flex-1 truncate",children:u.title.replace(/^\d+\.\s*/,"")}),n&&e.jsx(A,{className:"w-3.5 h-3.5 text-emerald-400 shrink-0"})]},u.slug)})})]},l.id))})]})}),e.jsxs("div",{className:"lg:col-span-8 xl:col-span-6 space-y-8",children:[e.jsxs("div",{className:"space-y-3 pb-6 border-b border-white/10",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(N,{to:"/learn",className:"text-xs font-semibold text-orange-400 hover:underline",children:"Curriculum"}),e.jsx("span",{className:"text-xs text-slate-500",children:"/"}),e.jsxs("span",{className:"text-xs text-slate-400",children:["Module ",a.order]}),e.jsx("span",{className:"text-xs text-slate-500",children:"•"}),e.jsx(z,{variant:"difficulty",difficulty:a.difficulty,children:a.difficulty})]}),e.jsx("h1",{className:"text-2xl md:text-4xl font-extrabold text-white tracking-tight",children:a.title}),e.jsx("p",{className:"text-sm md:text-base text-slate-300 leading-relaxed",children:a.description})]}),e.jsxs(j,{variant:"elevated",className:"p-5 border-white/15 space-y-3 bg-gradient-to-r from-orange-950/10 to-transparent",children:[e.jsxs("h3",{className:"text-sm font-bold text-orange-400 flex items-center gap-2",children:[e.jsx(Y,{className:"w-4 h-4"}),e.jsx("span",{children:"Learning Objectives"})]}),e.jsx("ul",{className:"space-y-2 text-xs md:text-sm text-slate-200",children:a.learningObjectives.map((l,u)=>e.jsxs("li",{className:"flex items-start gap-2.5",children:[e.jsx(P,{className:"w-4 h-4 text-emerald-400 shrink-0 mt-0.5"}),e.jsx("span",{children:l})]},u))})]}),e.jsx(se,{content:a.markdownContent}),e.jsxs(j,{id:"interactive-exercise",variant:"elevated",className:"p-6 border-orange-500/30 bg-gradient-to-b from-orange-950/20 to-transparent space-y-4",children:[e.jsxs("div",{className:"flex items-start justify-between gap-4",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-xs font-bold text-orange-400 uppercase tracking-wider block",children:"Interactive Exercise"}),e.jsx("h3",{className:"text-lg font-bold text-white mt-1",children:a.interactiveExercise.title}),e.jsx("p",{className:"text-xs md:text-sm text-slate-300 mt-2 leading-relaxed",children:a.interactiveExercise.instructions})]}),e.jsx("div",{className:"w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/40",children:e.jsx(B,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"flex items-center justify-between pt-2",children:[e.jsx("span",{className:"text-xs text-slate-400 font-mono",children:y.completedExercises.includes(a.interactiveExercise.id)?"✓ Exercise completed":"Pending verification"}),e.jsx(k,{variant:"primary",size:"sm",onClick:w,rightIcon:e.jsx(U,{className:"w-4 h-4"}),children:"Open in Playground"})]})]}),e.jsx("div",{id:"lesson-quiz",children:e.jsx(ae,{lessonId:a.slug,quizzes:a.quizzes,onComplete:t})}),e.jsxs(j,{className:"p-5 border-white/10 space-y-3",children:[e.jsx("h3",{className:"text-sm font-bold text-slate-200",children:"Official Rust References"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2.5",children:a.documentationLinks.map((l,u)=>e.jsxs("a",{href:l.url,target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors",children:[e.jsx("span",{className:"truncate",children:l.title}),e.jsx(K,{className:"w-3.5 h-3.5 text-orange-400 shrink-0 ml-2"})]},u))})]}),e.jsxs("div",{className:"pt-6 border-t border-white/10 space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-xs text-slate-400",children:"Finished reading and practicing?"}),e.jsx(k,{variant:r?"outline":"primary",size:"md",onClick:t,leftIcon:r?e.jsx(A,{className:"w-4 h-4 text-emerald-400"}):void 0,children:r?"Lesson Completed":"Mark as Complete"})]}),e.jsxs("div",{className:"flex items-center justify-between gap-4 pt-2",children:[d?e.jsx(N,{to:`/learn/${d.slug}`,children:e.jsxs(k,{variant:"secondary",size:"sm",leftIcon:e.jsx(J,{className:"w-4 h-4"}),children:[e.jsx("span",{className:"hidden sm:inline",children:"Previous:"})," ",d.title.replace(/^\d+\.\s*/,"")]})}):e.jsx("div",{}),s?e.jsx(N,{to:`/learn/${s.slug}`,children:e.jsxs(k,{variant:"primary",size:"sm",rightIcon:e.jsx(Z,{className:"w-4 h-4"}),children:[e.jsx("span",{className:"hidden sm:inline",children:"Next:"})," ",s.title.replace(/^\d+\.\s*/,"")]})}):e.jsx(N,{to:"/exam",children:e.jsx(k,{variant:"primary",size:"sm",rightIcon:e.jsx(ee,{className:"w-4 h-4"}),children:"Take Certification Exam"})})]})]})]}),e.jsx("aside",{className:"hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-20 space-y-4",children:e.jsxs(j,{className:"p-4 border-white/10 space-y-3",children:[e.jsx("h4",{className:"text-xs font-bold uppercase tracking-wider text-slate-400",children:"On This Page"}),e.jsxs("nav",{className:"space-y-1.5 text-xs",children:[e.jsxs("a",{href:"#interactive-exercise",className:"flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors py-1",children:[e.jsx(B,{className:"w-3.5 h-3.5 text-orange-400 shrink-0"}),e.jsx("span",{children:"Coding Exercise"})]}),e.jsxs("a",{href:"#lesson-quiz",className:"flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors py-1",children:[e.jsx(P,{className:"w-3.5 h-3.5 text-emerald-400 shrink-0"}),e.jsxs("span",{children:["Lesson Quiz (",a.quizzes.length," Questions)"]})]})]}),e.jsxs("div",{className:"pt-3 border-t border-white/10 space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between text-xs",children:[e.jsx("span",{className:"text-slate-400",children:"Lesson Status"}),e.jsx("span",{className:r?"text-emerald-400 font-semibold":"text-slate-400",children:r?"Completed":"In Progress"})]}),e.jsxs("div",{className:"flex items-center justify-between text-xs",children:[e.jsx("span",{className:"text-slate-400",children:"Estimated Time"}),e.jsxs("span",{className:"font-mono text-slate-300",children:[a.estimatedMinutes," mins"]})]})]})]})})]})})};export{ue as LessonReader};
