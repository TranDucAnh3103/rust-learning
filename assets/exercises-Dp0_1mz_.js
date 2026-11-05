const e={"getting-started":{id:"ex-getting-started",lessonId:"getting-started",title:"Exercise 1: Standard Greeting Function",instructions:'Write a function named `greet` that takes a name parameter of type `&str` and prints "Hello, <name>!" using the `println!` macro. Then, in the `main` function, call `greet` with "Rustacean".',expectedOutcome:'The code should declare `fn greet(name: &str)`, use `println!("Hello, {}!", name);`, and call `greet("Rustacean");` inside `fn main()`.',starterCode:`// Write the greet function below
// fn greet(name: &str) { ... }

fn main() {
    // Call greet with "Rustacean" here
}
`,solutionExample:`fn greet(name: &str) {
    println!("Hello, {}!", name);
}

fn main() {
    greet("Rustacean");
}
`,hints:["Define the function signature: `fn greet(name: &str)`.",'Inside greet, use `println!("Hello, {}!", name);`.','In main(), call `greet("Rustacean");`.'],rules:[{id:"fn-greet-decl",description:"Function `greet` declaration with `&str` argument",type:"regex",pattern:/fn\s+greet\s*\(\s*\w+\s*:\s*&str\s*\)/,errorMessage:"Missing or incorrect function declaration `fn greet(name: &str)`."},{id:"println-macro",description:"Usage of `println!` macro inside greet",type:"regex",pattern:/println!\s*\(/,errorMessage:"Expected call to `println!` macro to print the greeting."},{id:"greet-invocation",description:'Invocation of `greet("Rustacean")` in `main`',type:"regex",pattern:/greet\s*\(\s*"Rustacean"\s*\)/,errorMessage:'Expected `greet("Rustacean")` to be invoked inside `main`.'}]},"variables-and-types":{id:"ex-variables-and-types",lessonId:"variables-and-types",title:"Exercise 2: Mutable Accumulator with Loop",instructions:"Declare a mutable variable `sum` initialized to 0. Using a `for` loop over the range `1..=5` (inclusive), add each number to `sum`. Finally, print the total using `println!`.",expectedOutcome:"Declare `let mut sum = 0;`, loop with `for i in 1..=5`, accumulate `sum += i;`, and print the result.",starterCode:`fn main() {
    // 1. Declare mutable variable sum initialized to 0

    // 2. Loop over 1..=5 and add each number to sum

    // 3. Print the accumulated sum using println!
}
`,solutionExample:`fn main() {
    let mut sum: i32 = 0;
    for i in 1..=5 {
        sum += i;
    }
    println!("Total sum: {}", sum);
}
`,hints:["In Rust, variables are immutable by default. Use `let mut sum = 0;`.","Use the inclusive range syntax `1..=5` with a for loop: `for i in 1..=5 { sum += i; }`.",'Print with `println!("Total: {}", sum);`.'],rules:[{id:"let-mut-sum",description:"Mutable variable declaration `let mut sum`",type:"regex",pattern:/let\s+mut\s+sum(\s*:\s*(i32|u32|i64|usize))?\s*=\s*0/,errorMessage:"Declare `let mut sum = 0;` (must be mutable)."},{id:"for-loop-range",description:"For loop over range `1..=5` or `1..6`",type:"regex",pattern:/for\s+\w+\s+in\s+1\.\.(=5|6)/,errorMessage:"Loop over the numbers 1 to 5 using `for n in 1..=5`."},{id:"accumulation",description:"Accumulate sum with `+=` or `sum = sum + ...`",type:"regex",pattern:/sum\s*(\+=|=.*sum\s*\+)/,errorMessage:"Accumulate each number into `sum`."},{id:"print-sum",description:"Print result with `println!`",type:"regex",pattern:/println!\s*\(.*sum.*\)/,errorMessage:"Output the final sum with `println!`."}]},"ownership-and-borrowing":{id:"ex-ownership-and-borrowing",lessonId:"ownership-and-borrowing",title:"Exercise 3: Borrowing and Slices",instructions:'Write a function named `calculate_length` that takes an immutable reference to a `String` (i.e. `&String`) and returns its length as `usize`. In `main`, create a `String` with `String::from("RustForge")`, borrow it to `calculate_length`, and verify the original string remains valid afterwards.',expectedOutcome:"`fn calculate_length(s: &String) -> usize { s.len() }` without taking ownership, allowing `main` to retain and print the original `String`.",starterCode:`// Define calculate_length here:
// fn calculate_length(s: &String) -> usize { ... }

fn main() {
    let message = String::from("RustForge");
    
    // Borrow message to calculate_length
    // let len = calculate_length(&message);

    // Print both message and length to prove ownership was preserved
}
`,solutionExample:`fn calculate_length(s: &String) -> usize {
    s.len()
}

fn main() {
    let message = String::from("RustForge");
    let len = calculate_length(&message);
    println!("'{}' has length {}", message, len);
}
`,hints:["Take an immutable reference: `s: &String` instead of `s: String` to prevent moving ownership.","Call `.len()` on the string slice or reference.","Pass `&message` into `calculate_length`."],rules:[{id:"borrow-fn-sig",description:"Function taking `&String` and returning `usize`",type:"regex",pattern:/fn\s+calculate_length\s*\(\s*\w+\s*:\s*&String\s*\)\s*->\s*usize/,errorMessage:"Declare `fn calculate_length(s: &String) -> usize`."},{id:"call-len-method",description:"Call `.len()` on the reference",type:"regex",pattern:/\w+\.len\s*\(\s*\)/,errorMessage:"Use `.len()` to retrieve string length."},{id:"borrow-argument",description:"Pass reference `&message` into `calculate_length`",type:"regex",pattern:/calculate_length\s*\(\s*&\w+\s*\)/,errorMessage:"Borrow the string with `&message` when calling `calculate_length`."}]},"structs-and-enums":{id:"ex-structs-and-enums",lessonId:"structs-and-enums",title:"Exercise 4: Rectangle Struct & Methods",instructions:"Define a struct `Rectangle` with fields `width: u32` and `height: u32`. Implement a method `area(&self) -> u32` inside an `impl Rectangle` block. In `main`, create an instance and print its area.",expectedOutcome:"Create `struct Rectangle`, `impl Rectangle` with `fn area(&self) -> u32`, instantiate a rectangle, and call `.area()`.",starterCode:`// 1. Declare struct Rectangle with width and height (u32)

// 2. Implement area method on Rectangle

fn main() {
    // 3. Create rectangle instance and calculate area
}
`,solutionExample:`struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("Area: {}", rect.area());
}
`,hints:["Declare `struct Rectangle { width: u32, height: u32 }`.","In `impl Rectangle`, declare `fn area(&self) -> u32`.","The formula is `self.width * self.height`."],rules:[{id:"struct-decl",description:"Struct Rectangle declaration",type:"regex",pattern:/struct\s+Rectangle\s*\{\s*width\s*:\s*u32\s*,\s*height\s*:\s*u32\s*,?\s*\}/,errorMessage:"Declare `struct Rectangle` with `width: u32` and `height: u32`."},{id:"impl-rect",description:"`impl Rectangle` block",type:"regex",pattern:/impl\s+Rectangle\s*\{/,errorMessage:"Create an `impl Rectangle` block."},{id:"method-area",description:"Method `fn area(&self) -> u32`",type:"regex",pattern:/fn\s+area\s*\(\s*&self\s*\)\s*->\s*u32/,errorMessage:"Define `fn area(&self) -> u32` with an immutable `&self` receiver."},{id:"call-area",description:"Call `.area()` method",type:"regex",pattern:/\w+\.area\s*\(\s*\)/,errorMessage:"Invoke `.area()` on your Rectangle instance."}]},"error-handling":{id:"ex-error-handling",lessonId:"error-handling",title:"Exercise 5: Safe Division with Result",instructions:'Write a function `safe_divide(numerator: f64, denominator: f64) -> Result<f64, String>`. If denominator is 0.0, return `Err("Cannot divide by zero".to_string())`; otherwise return `Ok(numerator / denominator)`. In `main`, handle the result using pattern matching (`match`).',expectedOutcome:"A safe division function returning `Result<f64, String>`, handled gracefully with `match` in `main`.",starterCode:`fn safe_divide(numerator: f64, denominator: f64) -> Result<f64, String> {
    // Return Err if denominator is 0.0, otherwise Ok(...)
}

fn main() {
    let result = safe_divide(10.0, 2.0);
    // Use match to handle Ok(val) and Err(e)
}
`,solutionExample:`fn safe_divide(numerator: f64, denominator: f64) -> Result<f64, String> {
    if denominator == 0.0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(numerator / denominator)
    }
}

fn main() {
    match safe_divide(10.0, 2.0) {
        Ok(val) => println!("Success: {}", val),
        Err(e) => println!("Error: {}", e),
    }
}
`,hints:["Check if `denominator == 0.0`.",'Return `Err("Cannot divide by zero".to_string())` or `Err(String::from(...))`.',"In main, match on `safe_divide(...)` with arms `Ok(val) => ...` and `Err(e) => ...`."],rules:[{id:"result-return-type",description:"Function signature returning `Result<f64, String>`",type:"regex",pattern:/fn\s+safe_divide\s*\(.*f64.*f64.*\)\s*->\s*Result<f64,\s*String>/,errorMessage:"Declare `fn safe_divide(...) -> Result<f64, String>`."},{id:"return-ok",description:"Return `Ok(numerator / denominator)`",type:"regex",pattern:/Ok\s*\(\s*\w+\s*\/\s*\w+\s*\)/,errorMessage:"Return division result wrapped in `Ok(...)`."},{id:"return-err",description:"Return `Err(...)` on zero division",type:"regex",pattern:/Err\s*\(.*zero.*\)/i,errorMessage:"Return an `Err(...)` describing division by zero."},{id:"match-handling",description:"Pattern match with `match` on Result",type:"regex",pattern:/match\s+.*\{[\s\S]*Ok\s*\(.*\)[\s\S]*Err\s*\(.*\)/,errorMessage:"Use `match` with `Ok` and `Err` branches in `main`."}]},"generics-and-traits":{id:"ex-generics-and-traits",lessonId:"generics-and-traits",title:"Exercise 6: Summary Trait & Implementation",instructions:"Define a trait named `Summary` with a required method `fn summarize(&self) -> String;`. Define a struct `NewsArticle` with fields `headline: String` and `author: String`. Implement `Summary` for `NewsArticle`. Write a generic function `print_summary<T: Summary>(item: &T)` that prints `item.summarize()`.",expectedOutcome:"Definition of `trait Summary`, `struct NewsArticle`, `impl Summary for NewsArticle`, and generic function with trait bound `T: Summary`.",starterCode:`// 1. Define trait Summary with summarize(&self) -> String

// 2. Define struct NewsArticle with headline and author

// 3. Implement Summary for NewsArticle

// 4. Generic function with trait bound
fn print_summary<T: Summary>(item: &T) {
    // print item.summarize()
}

fn main() {
    // Test your implementation
}
`,solutionExample:`trait Summary {
    fn summarize(&self) -> String;
}

struct NewsArticle {
    headline: String,
    author: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{} by {}", self.headline, self.author)
    }
}

fn print_summary<T: Summary>(item: &T) {
    println!("{}", item.summarize());
}

fn main() {
    let article = NewsArticle {
        headline: String::from("Rust 2024 Edition Released"),
        author: String::from("Ferris"),
    };
    print_summary(&article);
}
`,hints:["Trait definition: `trait Summary { fn summarize(&self) -> String; }`.","Implement trait: `impl Summary for NewsArticle { fn summarize(&self) -> String { ... } }`.","Trait bound syntax: `<T: Summary>(item: &T)`."],rules:[{id:"trait-summary",description:"Trait `Summary` definition with `summarize(&self) -> String`",type:"regex",pattern:/trait\s+Summary\s*\{[\s\S]*fn\s+summarize\s*\(\s*&self\s*\)\s*->\s*String;?[\s\S]*\}/,errorMessage:"Define `trait Summary { fn summarize(&self) -> String; }`."},{id:"impl-summary",description:"`impl Summary for NewsArticle` block",type:"regex",pattern:/impl\s+Summary\s+for\s+NewsArticle\s*\{/,errorMessage:"Implement `Summary` for `NewsArticle`."},{id:"trait-bound-fn",description:"Generic function with `T: Summary` bound",type:"regex",pattern:/fn\s+print_summary\s*<\s*T\s*:\s*Summary\s*>\s*\(\s*\w+\s*:\s*&T\s*\)/,errorMessage:"Declare generic function `fn print_summary<T: Summary>(item: &T)`."}]},"smart-pointers":{id:"ex-smart-pointers",lessonId:"smart-pointers",title:"Exercise 7: Heap Allocation with Box and Shared Rc",instructions:'Create a recursive enum `List` with variants `Cons(i32, Box<List>)` and `Nil`. In `main`, build a linked list `Cons(1, Box::new(Cons(2, Box::new(Nil))))`. Then, demonstrate shared ownership of a string using `Rc::new(String::from("Shared"))` and clone the pointer with `Rc::clone(&ptr)`.',expectedOutcome:"Recursive data structure using `Box<List>` and multiple owners with `std::rc::Rc` and `Rc::clone`.",starterCode:`use std::rc::Rc;

// 1. Define recursive List enum using Box
enum List {
    // Cons(i32, Box<List>),
    // Nil,
}

fn main() {
    // 2. Instantiate a boxed List: 1 -> 2 -> Nil

    // 3. Create shared Rc string and clone it with Rc::clone
}
`,solutionExample:`use std::rc::Rc;

enum List {
    Cons(i32, Box<List>),
    Nil,
}

fn main() {
    let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));

    let shared = Rc::new(String::from("Shared data"));
    let clone1 = Rc::clone(&shared);
    let clone2 = Rc::clone(&shared);

    println!("Strong count: {}", Rc::strong_count(&shared));
}
`,hints:["Rust types must have a known size at compile time; recursive enums require `Box<T>`.","`Box::new(...)` allocates the node on the heap.","Use `Rc::clone(&shared)` to increment the reference count without deep-cloning the data."],rules:[{id:"box-list-enum",description:"Recursive enum using `Box<List>`",type:"regex",pattern:/enum\s+List\s*\{[\s\S]*Cons\s*\(\s*i32\s*,\s*Box<List>\s*\)[\s\S]*Nil\s*,?\s*\}/,errorMessage:"Define `enum List { Cons(i32, Box<List>), Nil }`."},{id:"box-new-usage",description:"Heap allocation with `Box::new`",type:"regex",pattern:/Box::new\s*\(/,errorMessage:"Use `Box::new(...)` to allocate list nodes on the heap."},{id:"rc-clone-usage",description:"Reference counting with `Rc::new` and `Rc::clone`",type:"regex",pattern:/Rc::clone\s*\(/,errorMessage:"Use `Rc::clone(...)` to produce an additional reference-counted owner."}]},concurrency:{id:"ex-concurrency",lessonId:"concurrency",title:"Exercise 8: Thread Spawning with Arc and Mutex",instructions:"Use `std::sync::{Arc, Mutex}` and `std::thread` to safely increment a counter from 10 spawned threads. Wrap the counter in `Arc::new(Mutex::new(0))`. In a loop from 0 to 10, clone the Arc, spawn a thread with a `move` closure, lock the mutex, and increment the value. Join all threads and print the final count (which should be 10).",expectedOutcome:"Multi-threaded atomic increment using `Arc<Mutex<i32>>`, thread handles joined in `main`.",starterCode:`use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // 1. Initialize counter in Arc<Mutex<i32>>
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    // 2. Spawn 10 threads, each incrementing counter by 1

    // 3. Join all thread handles

    // 4. Print the final counter value
}
`,solutionExample:`use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter_clone = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
`,hints:["Clone the Arc before moving it into the closure: `let c = Arc::clone(&counter);`.","Spawn with a `move` closure: `thread::spawn(move || { ... })`.","Acquire lock: `let mut num = c.lock().unwrap(); *num += 1;`.","Store each handle and call `.join().unwrap()` on each."],rules:[{id:"arc-mutex-init",description:"Counter initialized in `Arc::new(Mutex::new(...))`",type:"regex",pattern:/Arc::new\s*\(\s*Mutex::new\s*\(/,errorMessage:"Initialize counter wrapped in `Arc::new(Mutex::new(0))`."},{id:"thread-spawn-move",description:"Thread spawned with `thread::spawn(move || ...)`",type:"regex",pattern:/thread::spawn\s*\(\s*move\s*\|/,errorMessage:"Spawn threads with `thread::spawn(move || ...)`."},{id:"mutex-lock",description:"Mutex lock acquired with `.lock().unwrap()`",type:"regex",pattern:/\.lock\s*\(\s*\)\.unwrap\s*\(\s*\)/,errorMessage:"Acquire lock on mutex with `.lock().unwrap()`."},{id:"thread-join",description:"Join thread handles with `.join()`",type:"regex",pattern:/\.join\s*\(\s*\)/,errorMessage:"Join thread handles before printing final result."}]}};export{e as L};
