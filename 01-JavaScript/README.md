# 01 — JavaScript من الصفر للاحتراف

> **ليه القسم ده:** JS هي اللغة اللي كل حاجة بعدها (TS، Node، React، Next) مبنية عليها. السنيور مش بس بيستخدمها، بيعرف إزاي بتشتغل من جوه: الـ event loop، الـ closures، الـ prototype chain، والـ memory.
>
> **الوقت التقريبي:** 3 أسابيع · **المصدر الأنسب:** [javascript.info](https://javascript.info) + You Don't Know JS Yet

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
لكل بند: اقرأ → اكتب مثال بإيدك في Node REPL أو ملف → اشرحه بصوت عالي.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 Syntax والأنواع
- [ ] Statements vs expressions (وليه ده مهم في JSX بعدين)
- [ ] `var` vs `let` vs `const`: scope (global/function/block)، hoisting، TDZ (Temporal Dead Zone) — تقدر تتوقع ناتج كود فيه الثلاثة
- [ ] Primitives: string، number، bigint، boolean، null، undefined، symbol — وليه `typeof null === 'object'`
- [ ] Objects كـ reference types، والفرق في الـ assignment والمقارنة
- [ ] Type coercion: `==` vs `===`، truthy/falsy (الـ 8 falsy values)، `+` مع strings vs numbers
- [ ] Operators: arithmetic، comparison، logical (`&&`، `||`، `??` والفرق بين `||` و `??`)، optional chaining `?.`، spread/rest `...`، ternary
- [ ] Control flow: if/else، switch (والـ fall-through)، loops (`for`، `for...of`، `for...in` والفرق، `while`، `do...while`)، `break/continue` و labels
- [ ] Strings: template literals، الـ methods الأساسية (`slice/substring/split/trim/includes/replace/padStart`)، immutability
- [ ] Numbers: floating point (`0.1 + 0.2`)، `Number.isInteger`، `toFixed`، `parseInt/parseFloat` vs `Number()`، `NaN` و `Infinity`، `Math` methods
- [ ] BigInt: إمتى تحتاجه (IDs كبيرة، money في minor units كبيرة)
- [ ] Dates: `Date` object ومشاكله (months من 0، timezone)، ISO strings، وإيه هو `Temporal` الجديد

### 1.2 Functions الأساسي
- [ ] Function declaration vs expression vs arrow function
- [ ] Parameters: default values، rest parameters، destructuring في الـ parameters
- [ ] Return values، `undefined` الضمني
- [ ] Scope و lexical environment كمفهوم
- [ ] First-class functions: تمرّر function كـ argument وترجّعها كـ return
- [ ] Higher-order functions و callbacks

### 1.3 Objects و Arrays الأساسي
- [ ] Object literals، property access (dot vs bracket)، computed properties، shorthand
- [ ] `Object.keys/values/entries`، `Object.assign`، spread للنسخ
- [ ] Destructuring: objects و arrays، nested، defaults، renaming
- [ ] Array methods الأساسية: `push/pop/shift/unshift/slice/splice/indexOf/includes/join/concat`
- [ ] Iteration methods: `forEach/map/filter/reduce/find/findIndex/some/every`
- [ ] `sort` والـ comparator (وليه `[10, 9, 1].sort()` بيطلع غلط)
- [ ] Shallow copy vs deep copy، و `structuredClone`

### 1.4 Error handling الأساسي
- [ ] `try/catch/finally`، `throw`، الـ `Error` object (`message`، `name`، `stack`)
- [ ] Built-in errors: `TypeError`، `RangeError`، `SyntaxError`، `ReferenceError`

### 1.5 Modules الأساسي
- [ ] ESM: `import/export`، default vs named exports، `import * as`
- [ ] CommonJS: `require`، `module.exports` vs `exports`

### 1.6 Browser الأساسي
- [ ] DOM: `querySelector/querySelectorAll`، `createElement`، `appendChild`، `textContent` vs `innerHTML` (والـ XSS)
- [ ] Events: `addEventListener`، الـ event object، `preventDefault`
- [ ] `fetch` الأساسي، `localStorage`

### 1.7 Tooling الأساسي
- [ ] npm: `package.json`، `scripts`، `dependencies` vs `devDependencies`، `npx`
- [ ] Prettier و ESLint: إيه الفرق وليه الاتنين

---

## 🟡 المستوى 2 — المتوسط

### 2.1 Functions بعمق
- [ ] **Closures**: الـ lexical environment بالتفصيل، وأمثلة لازم تكتبها بإيدك: counter، private state، `memoize`، `once`، `debounce`، `throttle`
- [ ] الـ classic closure bug في الـ loop بـ `var` وليه `let` بيحله
- [ ] `this` بكل حالاته: method call، plain function call (undefined في strict)، arrow (lexical)، constructor (`new`)، explicit (`call/apply/bind`)، event handlers
- [ ] `call`، `apply`، `bind` — وتكتب `bind` بإيدك
- [ ] `arguments` object (وليه الـ arrow مفيهوش)
- [ ] IIFE وإمتى كان بيتستخدم (قبل الـ modules)
- [ ] Currying، partial application، function composition (`pipe`/`compose`) — تكتبهم بإيدك
- [ ] Pure functions، side effects، immutability — وليه مهمين في React

### 2.2 Objects و Prototypes بعمق
- [ ] Property descriptors: `writable`، `enumerable`، `configurable`، `Object.defineProperty`
- [ ] Getters/setters
- [ ] `Object.freeze` (shallow) vs `Object.seal` vs `Object.preventExtensions`
- [ ] **Prototype chain**: `__proto__` vs `prototype`، `Object.getPrototypeOf`، `Object.create`، إزاي الـ property lookup بيمشي في الـ chain
- [ ] Constructor functions و `new`: الأربع خطوات اللي بتحصل بالتفصيل — وتكتب `new` بإيدك كـ function
- [ ] `instanceof` إزاي شغال، و `hasOwnProperty` vs `in`
- [ ] Classes: syntax sugar فوق الـ prototypes، fields، private `#fields`، static، getters/setters، `extends` و `super`، method overriding
- [ ] Mixins وإمتى بتستخدمها بدل الـ inheritance
- [ ] Symbols: uniqueness، well-known symbols (`Symbol.iterator`، `Symbol.toPrimitive`، `Symbol.asyncIterator`)

### 2.3 Collections و Iteration
- [ ] Array methods متقدمة: `flat/flatMap`، `at`، `with`، `toSorted/toReversed/toSpliced` (الـ non-mutating الجديدة)، `Array.from` مع mapping، `Array.of`
- [ ] `reduce` بإتقان: group by، count، build object، pipeline
- [ ] **Iteration protocols**: iterable (`[Symbol.iterator]`) و iterator (`next()` → `{value, done}`) — تخلي object بتاعك يتعمله `for...of` و spread
- [ ] Generators: `function*`، `yield`، `yield*`، lazy evaluation، infinite sequences، `return`/`throw` على الـ generator
- [ ] `Map` vs object: إمتى (keys مش strings، insertion order، size، performance في الـ add/delete)
- [ ] `Set` والعمليات عليها (union/intersection/difference — والـ methods الجديدة)
- [ ] `WeakMap` و `WeakSet`: ليه "weak" وإمتى (metadata على objects من غير memory leak، private data)
- [ ] `WeakRef` و `FinalizationRegistry` (كمفهوم)
- [ ] Typed arrays و `ArrayBuffer` و `DataView` (مقدمة — هتحتاجها في Node Buffers)

### 2.4 Asynchronous JavaScript (الأهم في القسم كله)
- [ ] **Event loop بالتفصيل**: call stack، Web APIs (browser) / libuv (Node)، callback queue (macrotasks)، microtask queue — ترسمه على ورقة
- [ ] **Microtasks vs macrotasks**: Promises و `queueMicrotask` و `MutationObserver` (micro) vs `setTimeout/setInterval/setImmediate/I/O` (macro) — وترتيب التنفيذ بالظبط. تمرين: تتوقع ناتج كود فيه `setTimeout(0)` و `Promise.resolve().then` و `console.log` متداخلين
- [ ] Callbacks: الـ pattern، callback hell، error-first callbacks في Node
- [ ] **Promises**: الثلاث states، `then/catch/finally`، chaining، إيه اللي بيرجع من `then`، error propagation في الـ chain، الـ "swallowed error" bug
- [ ] `Promise.all` vs `allSettled` vs `race` vs `any`: الفرق في الـ error handling — **وتكتب كل واحد بإيدك**
- [ ] **async/await**: إزاي شغال فوق Promises، الـ `try/catch`، الـ return value دايمًا Promise
- [ ] Sequential vs parallel: الـ bug الشهير `for` مع `await` جواه لما المفروض يبقى `Promise.all`، وإمتى الـ sequential مقصود
- [ ] Top-level await في ESM
- [ ] الأخطاء الشائعة: floating promises (promise من غير await ولا catch)، `unhandledRejection`، `forEach` مع async (مش بيستنى)، mixing callbacks وpromises
- [ ] Timers: `setTimeout/setInterval/clearTimeout`، `setTimeout(0)` معناه إيه فعليًا، drift في `setInterval`
- [ ] `debounce` و `throttle`: تكتبهم وتعرف الفرق وإمتى كل واحد

### 2.5 Error handling بعمق
- [ ] Custom error classes (`class AppError extends Error`)، `name`، `instanceof` معاهم، `Error.captureStackTrace`
- [ ] Error `cause` (ES2022): wrapping errors من غير ما تضيّع الأصل
- [ ] Errors في async code: الـ `try/catch` مع `await`، الـ `.catch` مع promises، وليه الـ error في callback مش بيتمسك بـ `try/catch` بره
- [ ] Global handlers: `window.onerror`، `unhandledrejection` (browser)، `process.on('uncaughtException')` (Node — تفاصيله في قسم Node)

### 2.6 Modules بعمق
- [ ] ESM live bindings (الـ import بيشوف التغيير) vs CJS copy
- [ ] Dynamic `import()` والـ code splitting
- [ ] Circular dependencies: إزاي بتحصل وإزاي تكسرها
- [ ] Module resolution: relative، bare specifiers، `node_modules` lookup
- [ ] Tree shaking: ليه بيشتغل مع ESM بس (static analysis)

### 2.7 Browser JavaScript متوسط
- [ ] DOM traversal و manipulation بكفاءة (`DocumentFragment`، batch updates)
- [ ] **Events بعمق**: bubbling vs capturing (الـ 3 phases)، `stopPropagation` vs `stopImmediatePropagation`، event delegation (وليه أكفأ)، custom events (`CustomEvent`، `dispatchEvent`)
- [ ] `fetch` بعمق: الـ Response object، `ok` vs thrown errors (fetch مش بيـ throw على 404)، headers، `AbortController` للـ cancellation، streaming body
- [ ] Storage: `localStorage` vs `sessionStorage` vs cookies vs `IndexedDB` (كمفهوم) — الحجم والـ sync/async والـ scope
- [ ] History API و `pushState` (أساس الـ client-side routing)
- [ ] Observers: `IntersectionObserver` (lazy loading، infinite scroll)، `MutationObserver`، `ResizeObserver`
- [ ] Web Workers: offload CPU work، `postMessage`، إيه اللي مش متاح جواه (DOM)
- [ ] Service Workers كمفهوم (offline، caching، PWA)
- [ ] `requestAnimationFrame` و `requestIdleCallback`

### 2.8 Tooling متوسط
- [ ] pnpm vs npm vs yarn: الفرق (الـ store، الـ strictness)، lockfiles وليه بتتعمل commit
- [ ] semver ranges: `^`، `~`، exact، وإمتى تعمل pin
- [ ] Bundlers كمفهوم: إيه اللي Vite/esbuild/webpack بيعملوه (resolve → transform → bundle → minify)
- [ ] Source maps: إيه هي وليه مهمة في الـ production debugging
- [ ] Babel/SWC: transpilation، polyfills، `browserslist`
- [ ] Vitest/Jest أساسيات: `describe/it/expect`، mocking بسيط

### 2.9 Regular expressions
- [ ] Syntax: character classes، quantifiers (greedy vs lazy)، anchors، alternation
- [ ] Groups: capturing، non-capturing `(?:)`، named groups `(?<name>)`، backreferences
- [ ] Lookahead/lookbehind `(?=)`، `(?!)`، `(?<=)`، `(?<!)`
- [ ] Flags: `g`، `i`، `m`، `s`، `u`، `y`، `d`
- [ ] Methods: `test`، `match`، `matchAll`، `replace` مع function، `split`
- [ ] الأداء: catastrophic backtracking و ReDoS (هيظهر تاني في Security)

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Async متقدم
- [ ] Async iterators و `for await...of`، async generators — واستخدامهم مع streams و pagination
- [ ] `Symbol.asyncIterator` وتخلي object بتاعك async iterable
- [ ] Cancellation patterns بـ `AbortController` و `AbortSignal` (مع fetch، مع timers بـ `AbortSignal.timeout`، مع custom async operations)
- [ ] تكتب Promise بإيدك (مبسّط) عشان تفهم الـ `then` queue والـ resolution
- [ ] Promise concurrency control: تكتب `pLimit` بإيدك (تحدد عدد الـ promises اللي شغالة في نفس الوقت)
- [ ] Retry مع exponential backoff و jitter — تكتبها كـ utility
- [ ] Race conditions في JS: الـ "stale response" مشكلة لما user يعمل requests متتالية، وحلها (AbortController أو sequence number)
- [ ] `process.nextTick` vs `Promise.then` vs `setImmediate` vs `setTimeout(0)` في Node — الترتيب بالظبط (تفاصيله في قسم Node)

### 3.2 Metaprogramming
- [ ] `Proxy`: traps (`get`، `set`، `has`، `deleteProperty`، `apply`، `construct`)، وأمثلة: validation، logging، default values — **وده أساس الـ reactivity في Vue و MobX و Immer**
- [ ] `Reflect`: ليه موجود مع Proxy، وليه أحسن من `Object.*` في بعض الحالات
- [ ] Tagged template literals: إزاي شغالة، وأمثلة (styled-components، SQL tagging، i18n)
- [ ] `Symbol.toPrimitive` و `valueOf`/`toString` في الـ coercion
- [ ] Decorators (الـ proposal الحالي vs TS legacy decorators)
- [ ] `eval` و `new Function` وليه تتجنبهم

### 3.3 Memory management
- [ ] GC algorithms: mark-and-sweep، generational (young/old)، incremental، وإيه اللي بيعمله V8 (Scavenger، Mark-Compact)
- [ ] **Memory leaks الشائعة** وتعرف تلاقيها: closures ماسكة references كبيرة، event listeners مش بتتشال، timers مش بتتقفل، global caches بتكبر، detached DOM nodes، `Map` بدل `WeakMap`
- [ ] DevTools: heap snapshots، comparing snapshots، allocation timeline، تلاقي الـ retained objects
- [ ] Memory في Node: `process.memoryUsage()`، `--max-old-space-size`، heap out of memory

### 3.4 Performance و V8
- [ ] JIT كمفهوم: interpreter (Ignition) → optimizing compiler (TurboFan)، hot functions
- [ ] Hidden classes و inline caching: ليه الـ objects بنفس الـ shape أسرع، وليه تضيف properties بنفس الترتيب
- [ ] Deoptimization: إيه اللي بيكسر الـ optimization (تغيير أنواع، `arguments`، `try/catch` زمان، `delete`)
- [ ] Micro-benchmarks بحذر: ليه `performance.now()` loop بسيط بيضحك عليك، وأدوات زي `tinybench`
- [ ] الـ string concatenation والـ array preallocation وإمتى بتفرق فعليًا

### 3.5 Browser متقدم
- [ ] **Rendering pipeline**: parse HTML → DOM، parse CSS → CSSOM → render tree → layout → paint → composite
- [ ] Reflow vs repaint: إيه اللي بيسبب كل واحد، layout thrashing (قراءة وكتابة الـ layout في loop) وإزاي تتجنبه
- [ ] Critical rendering path: render-blocking CSS، parser-blocking JS، `async` vs `defer` vs `type="module"`
- [ ] `requestAnimationFrame` للـ animations والـ 16ms budget
- [ ] Compositor layers و `will-change`، `transform` و `opacity` ليه رخاص
- [ ] Long tasks و الـ main thread، وتقيسهم بـ Performance tab

### 3.6 JSON و Intl
- [ ] `JSON.parse/stringify` edge cases: `undefined`، functions، `Date` (بيبقى string)، `BigInt` (بيـ throw)، circular references، `NaN`
- [ ] `replacer` و `reviver` functions، `toJSON` method
- [ ] JSON parsing للملفات الكبيرة وليه بيبلوك (streaming parsers)
- [ ] `Intl`: `DateTimeFormat`، `NumberFormat` (currency)، `RelativeTimeFormat`، `Collator` للـ sorting الصح، `PluralRules`

### 3.7 Functional programming في JS
- [ ] Immutability بعمق: structural sharing، Immer وإزاي بتشتغل (Proxy)
- [ ] Composition و point-free style وإمتى بيوضّح وإمتى بيعقّد
- [ ] Functors و monads بشكل عملي: `Maybe`/`Option` و `Result`/`Either` — تكتبهم وتستخدمهم في error handling بدل الـ exceptions
- [ ] Pipeline operator (الـ proposal) و `pipe` كبديل حالي
- [ ] الحكم: إمتى الـ FP الكامل over-engineering في كود الفريق

### 3.8 Modules متقدم
- [ ] ESM/CJS interop بالتفصيل: `require` لـ ESM (Node 22+)، `import` لـ CJS والـ default export، `__dirname` vs `import.meta.url`
- [ ] Dual packages والـ `exports` field (تفاصيله في Node)
- [ ] Import maps في المتصفح، import attributes (`with { type: 'json' }`)

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **ملف `async-from-scratch.js`**: implementation بإيدك لـ `Promise.all/allSettled/race/any`، `pLimit`، `retry` مع backoff، `debounce`، `throttle`، `memoize` — مع tests.
2. **تمرين الـ event loop**: 10 أسئلة "إيه الـ output" تكتبها وتحلها، وتشرح كل واحدة بالـ microtask/macrotask.
3. **Reactive store صغير بـ Proxy** (زي Vue reactivity المبسّطة): `reactive()` و `watch()`.
4. **مقال/ملخص**: "إزاي الـ event loop بيشتغل" برسمة بإيدك.

## 📚 المصادر

- [javascript.info](https://javascript.info) — الأكمل، امشي عليه كله
- [You Don't Know JS Yet](https://github.com/getify/You-Dont-Know-JS) — Scope & Closures و Objects & Classes بالذات
- [What the heck is the event loop anyway? — Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ) — الفيديو الكلاسيكي
- [Jake Archibald — In The Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0) — microtasks بعمق
- [MDN](https://developer.mozilla.org/) — كمرجع مش كمنهج
- [V8 blog](https://v8.dev/blog) — للـ hidden classes والـ performance

## ✅ اختبار الخروج

1. اشرح ناتج الكود ده وليه: `setTimeout` + `Promise.then` + `queueMicrotask` + `console.log` متداخلين.
2. اكتب `Promise.allSettled` بإيدك في دقيقتين.
3. إيه الفرق بين `__proto__` و `prototype`؟ وإيه اللي بيحصل بالظبط لما تكتب `new Foo()`؟
4. اديني 4 أسباب لـ memory leak في JS وإزاي تلاقي كل واحد في DevTools.
5. ليه `[1, 2, 3].forEach(async ...)` مش بيستنى؟ وإيه البديل الصح؟
6. اشرح الفرق بين bubbling و capturing، وليه الـ event delegation أكفأ.
