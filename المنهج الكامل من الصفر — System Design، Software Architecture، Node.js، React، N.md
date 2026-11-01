# المنهج الكامل من الصفر — System Design، Software Architecture، Node.js، React، Next.js

Nov 1, 2026 · @ak

## إزاي تستخدم المنهج ده

ده منهج مراجعة شامل: كل موضوع متقسّم لأجزاء، وكل جزء لعناصره، مرتبة من الأبسط للأعقد. الهدف إنك تمشي على كل بند وتقول: "أعرفه وأقدر أشرحه" أو "محتاج مراجعة" أو "متعلمتوش". البنود اللي هتقع في الفئتين الأخيرتين هي خطتك.

- كل قسم فيه عمود **الأساس** (لازم) و**المتقدم** (اللي بيفرّق السنيور)
- الأقسام 8 و9 (Software Architecture وSystem Design) هي الأكبر عمدًا لأنها محور طلبك
- الأقسام 4، 5، 6 (Node، React، Next) مفصّلة لآخر عنصر
- القسم الأخير فيه ترتيب الدراسة والمصدر الأنسب لكل موضوع

طريقة المراجعة المقترحة لكل بند: اقرأ المصدر، اكتب مثال صغير بإيدك (مش بالـ AI)، واشرحه بصوت عالي في دقيقتين. لو مقدرتش تشرحه، لسه متعلمتوش.

## 1. أساسيات علوم الحاسب

دي الأرضية اللي كل حاجة بعدها بتقف عليها، وبتظهر مباشرة في System Design (الـ Big-O، الـ networking، الـ concurrency).

**1.1 Programming fundamentals**

- Variables، types، control flow، functions، recursion
- Paradigms: imperative، object-oriented، functional، declarative — والفرق بينهم عمليًا
- Memory model: stack vs heap، references vs values، garbage collection
- Error handling: exceptions vs result types

**1.2 Data Structures**

- Arrays و dynamic arrays (amortized cost)
- Linked lists (singly، doubly)، إمتى أحسن من array
- Stacks، queues، deques، priority queues
- Hash tables: hashing، collisions (chaining، open addressing)، load factor، resizing
- Trees: binary trees، BST، balanced trees (AVL، Red-Black — المفهوم)، B-trees (أساس الـ DB indexes)
- Heaps (min/max)، وبنستخدمها في إيه
- Tries (autocomplete)، Graphs (adjacency list vs matrix)
- Sets، bitmaps، Bloom filters (بتظهر في System Design)

**1.3 Algorithms**

- Big-O: time وspace، best/average/worst، amortized — وتحلل كود حقيقي
- Sorting: quicksort، mergesort، heapsort، counting/radix، stability
- Searching: binary search وتنويعاته
- Recursion وdynamic programming (memoization vs tabulation)
- Graph algorithms: BFS، DFS، Dijkstra، topological sort، union-find
- Two pointers، sliding window، prefix sums، greedy
- String algorithms الأساسية
- Consistent hashing (System Design)

**1.4 Operating Systems**

- Processes vs threads، context switching، scheduling
- Concurrency vs parallelism، race conditions، mutex، semaphore، deadlock
- Memory: virtual memory، paging، memory leaks
- I/O: blocking vs non-blocking، sync vs async، epoll/kqueue (أساس Node)
- File systems، permissions، signals
- Linux shell: navigation، pipes، grep/awk/sed الأساسي، processes، systemd

**1.5 Networking**

- OSI و TCP/IP models (المفهوم)
- TCP vs UDP، three-way handshake، ports، sockets
- IP، DNS (كامل الرحلة من الاسم للـ IP)، DHCP، NAT
- HTTP/1.1، HTTP/2 (multiplexing)، HTTP/3 (QUIC)
- HTTP methods، status codes، headers، cookies، caching headers
- TLS/SSL: handshake، certificates، CA، HTTPS
- WebSockets، SSE، long polling، gRPC
- CDN، load balancers، reverse proxy، firewall
- Latency vs bandwidth vs throughput، والأرقام اللي لازم تحفظها (RAM \~100ns، SSD \~100μs، network round trip \~ms)

**1.6 Databases theory (مقدمة)**

- Relational model، keys، relationships، normalization
- ACID، transactions، indexes (المفهوم)
- SQL الأساسي: SELECT، JOIN، GROUP BY، subqueries

**1.7 Software engineering basics**

- Git: commit، branch، merge، rebase، conflict resolution، PRs
- Semantic versioning، package managers، dependencies
- Clean code: naming، functions صغيرة، DRY، KISS، YAGNI
- Debugging منهجي: reproduce → isolate → hypothesize → verify

## 2. JavaScript من الصفر للاحتراف

**2.1 الأساسيات**

- Syntax، statements vs expressions، comments
- `var` vs `let` vs `const`، scope (global، function، block)، hoisting، TDZ
- Types: primitives (string، number، bigint، boolean، null، undefined، symbol) و objects
- Type coercion، `==` vs `===`، truthy/falsy، `typeof`
- Operators: arithmetic، logical (`&&`، `||`، `??`)، optional chaining `?.`، spread/rest، ternary
- Control flow: if/switch، loops (for، for...of، for...in، while)، labels
- Strings و template literals، methods الأساسية
- Numbers: floating point precision، `Number` methods، `Math`، BigInt
- Dates (والمشاكل بتاعتها، و `Temporal` الجديد)

**2.2 Functions**

- Declaration vs expression vs arrow، الفرق في `this` و `arguments` و hoisting
- Parameters: default، rest، destructuring في الـ parameters
- First-class functions، higher-order functions، callbacks
- Closures: الـ lexical environment، وأمثلة (counters، private state، memoize، once)
- IIFE، currying، partial application، composition
- `call`، `apply`، `bind`
- Pure functions، side effects، immutability

**2.3 Objects و Prototypes**

- Object literals، property access، computed properties، getters/setters
- `Object.keys/values/entries/assign/freeze`، property descriptors
- `this` بكل حالاته: method call، plain call، arrow، constructor، explicit binding
- Prototype chain، `__proto__` vs `prototype`، `Object.create`
- Constructor functions و `new` (إيه اللي بيحصل بالتفصيل)
- Classes: fields، private `#fields`، static، getters، inheritance، `super`، mixins
- Symbols و well-known symbols (`Symbol.iterator`)
- Destructuring متقدم، shallow vs deep copy، `structuredClone`

**2.4 Arrays و Collections**

- Methods: map/filter/reduce/find/some/every/flat/flatMap/sort (والـ comparator)/at/with/toSorted
- Iteration protocols: iterables، iterators، generators (`function*`، `yield`، `yield*`)
- Map، Set، WeakMap، WeakSet، WeakRef — وإمتى كل واحدة
- Typed arrays و ArrayBuffer (مقدمة)

**2.5 Asynchronous JavaScript (الأهم)**

- Call stack، Web APIs / libuv، callback queue، event loop
- Microtasks (Promises، `queueMicrotask`) vs macrotasks (setTimeout، I/O) — الترتيب بالتفصيل
- Callbacks و callback hell، error-first callbacks
- Promises: states، chaining، error propagation، `then/catch/finally`
- `Promise.all/allSettled/race/any`، وتكتبهم بإيدك
- async/await: إزاي شغال فوق Promises، error handling، sequential vs parallel، top-level await
- Async iterators، `for await`، async generators
- Cancellation بـ `AbortController`
- Timers، debounce، throttle
- الأخطاء الشائعة: unhandled rejections، await في loop، floating promises

**2.6 Error handling**

- `try/catch/finally`، `throw`، Error object، stack traces
- Custom error classes، error cause، wrapping errors
- Errors في async code، global handlers

**2.7 Modules**

- ESM: `import/export`، default vs named، dynamic `import()`، live bindings
- CommonJS: `require`، `module.exports`، الفرق والـ interop
- Module resolution، bundlers (المفهوم)، tree shaking

**2.8 Browser JavaScript**

- DOM: selection، manipulation، traversal، creating elements
- Events: bubbling، capturing، delegation، `preventDefault`، custom events
- Browser APIs: fetch، localStorage/sessionStorage، IndexedDB، History، Intersection/Mutation/Resize Observer
- Web Workers، Service Workers (المفهوم)
- Rendering pipeline: parse → style → layout → paint → composite، reflow/repaint، `requestAnimationFrame`
- Critical rendering path، script loading (async/defer)

**2.9 Metaprogramming و Advanced**

- Proxy و Reflect (أساس reactivity في Vue وغيره)
- Tagged templates
- Regular expressions: syntax، groups، lookahead، flags، named groups، الأداء
- JSON: parse/stringify، replacer/reviver، edge cases
- Internationalization (`Intl`)
- Memory management: GC algorithms (mark-and-sweep)، memory leaks الشائعة، DevTools heap snapshots
- Performance: JIT (V8 المفهوم)، hidden classes، deoptimization، micro-benchmarks بحذر

**2.10 Tooling**

- npm/pnpm/yarn، `package.json`، lockfiles، semver ranges، scripts
- ESLint، Prettier، Biome
- Bundlers: Vite، esbuild، webpack (المفهوم)، source maps
- Babel/SWC والـ transpilation، polyfills، browserslist
- Testing: Vitest/Jest أساسيات

**2.11 Functional programming في JS**

- Immutability، pure functions، composition، point-free style
- Functors/monads بشكل عملي (Maybe، Result)، pipeline operator (مقترح)
- إمتى الـ FP بيوضّح الكود وإمتى بيعقّده

## 3. TypeScript

**3.1 الأساسيات**

- ليه TS: structural typing، compile-time only، الـ type erasure
- Basic types، arrays، tuples، enums (وليه كتير بيتجنبوها لصالح union of literals)، `any` vs `unknown` vs `never` vs `void`
- Type annotations vs inference، إمتى تكتب النوع وإمتى تسيبه
- Interfaces vs type aliases: الفرق الحقيقي (declaration merging، extends vs intersection)
- Optional، readonly، index signatures
- Functions: parameter types، return types، overloads، `this` typing
- Union و intersection types، literal types
- Narrowing: `typeof`، `instanceof`، `in`، equality، discriminated unions، type predicates (`is`)، assertion functions، exhaustive `never` check
- Classes في TS: access modifiers، abstract، implements، parameter properties

**3.2 Generics**

- Generic functions، interfaces، classes
- Constraints (`extends`)، default type parameters
- Generic inference وليه ساعات بتفشل
- `keyof`، indexed access types `T[K]`، `typeof` على values

**3.3 Advanced types**

- Conditional types و `infer`، distributive conditional types
- Mapped types، key remapping (`as`)، modifiers (`-readonly`، `+?`)
- Template literal types
- Utility types: Partial، Required، Readonly، Pick، Omit، Record، Exclude، Extract، NonNullable، ReturnType، Parameters، Awaited
- تكتب utility types بتاعتك: DeepPartial، DeepReadonly، Result، Brand/Opaque types
- Variance (covariance/contravariance) ومشكلة method bivariance
- `satisfies`، `as const`، `const` type parameters
- Recursive types، type-level programming (بحدود)

**3.4 Modules و Declarations**

- Module resolution strategies، `paths`، `baseUrl`
- Declaration files `.d.ts`، `declare`، ambient modules، `@types`
- Declaration merging، module augmentation (تضيف property لـ Express Request مثلًا)
- Triple-slash directives (نادر)

**3.5 الإعدادات والأدوات**

- `tsconfig.json` بالتفصيل: `strict` وكل اللي تحته، `noUncheckedIndexedAccess`، `exactOptionalPropertyTypes`، `target`، `module`، `moduleResolution`، `lib`، `paths`، project references
- Build: `tsc` vs esbuild/SWC/tsx، type-checking منفصل عن الـ transpile
- ESLint مع typescript-eslint، rules المهمة
- Runtime validation: Zod/Valibot وربطها بالـ types (`z.infer`)
- Performance للـ type checker في المشاريع الكبيرة

**3.6 Patterns عملية**

- Typing للـ API responses، DTOs، domain models
- Discriminated unions للـ state machines
- Builder pattern بـ generics، fluent APIs
- Typing للـ event emitters و config objects
- Error handling بـ Result types بدل exceptions (إمتى)
- Typing في React (props، children، generics components، refs، events) وفي Node (Express/Fastify request types)

## 4. Node.js

**4.1 الـ Runtime من جوه**

- إيه هو Node: V8 + libuv + core libs، single-threaded JS على event loop
- Event loop phases بالتفصيل: timers → pending callbacks → poll → check (`setImmediate`) → close، و `process.nextTick` و microtasks بينهم
- libuv thread pool: إيه اللي بيروحله (fs، dns.lookup، crypto، zlib)، `UV_THREADPOOL_SIZE`
- Blocking the event loop: أمثلة (JSON.parse لملف ضخم، regex سيئ، sync fs)، وإزاي تكتشفه وتعالجه
- `process`: argv، env، exit codes، signals، `process.on('uncaughtException' | 'unhandledRejection')`
- Globals: `globalThis`، `Buffer`، `__dirname` (في CJS) و `import.meta` (في ESM)
- Node versions، LTS schedule، `.nvmrc`/`engines`

**4.2 Core modules**

- `fs`: sync vs callback vs promises، streams للملفات الكبيرة، `fs.watch`
- `path`، `os`، `url` (WHATWG URL)، `querystring`
- `events`: EventEmitter، error event، once، memory leaks من listeners
- `stream`: Readable، Writable، Duplex، Transform، object mode، `pipeline`، backpressure (`highWaterMark`، `drain`)، Web Streams
- `buffer`: allocation، encodings، slicing، binary protocols
- `http`/`https`: server، request/response objects، keep-alive، agents، timeouts؛ `http2`
- `net` و `dgram` (TCP/UDP sockets)
- `child_process`: exec/spawn/fork، stdio، IPC
- `cluster` vs `worker_threads`: الفرق، SharedArrayBuffer، Atomics، إمتى كل واحد
- `crypto`: hashing، HMAC، random، encryption الأساسي، `timingSafeEqual`
- `zlib`، `dns`، `readline`، `util` (promisify، inspect، types)، `assert`
- `node:test` runner، `node:sqlite`، `--watch`، `--env-file`، permission model
- Diagnostics: `--inspect`، `--cpu-prof`، `--heap-prof`، `diagnostics_channel`، `perf_hooks`، `async_hooks` / `AsyncLocalStorage` (request context)

**4.3 Modules و Packages**

- CJS vs ESM في Node: `"type": "module"`، extensions، `exports` field، dual packages، interop
- `package.json` بالكامل: main/exports/imports، bin، files، peerDependencies، engines
- npm/pnpm: lockfiles، workspaces، `npx`، publishing، semver
- Monorepos: pnpm workspaces، Turborepo/Nx

**4.4 بناء HTTP servers و APIs**

- Server بـ `http` الخام (عشان تفهم إيه اللي الـ framework بيعمله)
- Express: middleware model، routing، error middleware، `express.Router`، async errors
- Fastify: plugins/encapsulation، schema validation (JSON Schema)، hooks، serialization، أسرع من Express وليه
- NestJS: modules، providers، DI، controllers، pipes، guards، interceptors، exception filters — framework يناسب الفرق الكبيرة
- Hono/Koa (المفهوم)، والفرق مع edge runtimes
- Request lifecycle: parsing (body، query، params)، validation (Zod/JSON Schema)، serialization
- REST design: resources، verbs، status codes، pagination، filtering، sorting، versioning، HATEOAS (المفهوم)
- OpenAPI: contract-first، توليد docs وclients وtypes
- GraphQL في Node: Apollo/Yoga/Mercurius، schema، resolvers، DataLoader، subscriptions
- gRPC بـ `@grpc/grpc-js` و Protobuf
- File uploads: multipart، streaming للـ S3، limits
- CORS، compression، static files، ETag
- Real-time: `ws`، Socket.IO (rooms، namespaces، Redis adapter)، SSE

**4.5 Authentication و Authorization**

- Sessions + cookies (express-session، stores)، cookie flags (HttpOnly، Secure، SameSite)
- JWT: structure، signing (HS256 vs RS256)، expiry، refresh tokens، rotation، revocation (وليه مش سهل)
- Password hashing: bcrypt/argon2، salting، pepper
- OAuth 2.0 / OIDC flows، PKCE، social login، Passport.js أو Auth.js أو Lucia
- API keys، HMAC-signed requests، mTLS (المفهوم)
- RBAC، ABAC، policy engines (Casbin، OPA — المفهوم)
- Multi-tenancy: tenant resolution، data isolation

**4.6 قواعد البيانات من Node**

- Drivers: `pg`، `mysql2`، `mongodb`؛ connection pooling وإعداداته
- Query builders و ORMs: Knex، Drizzle، Prisma، TypeORM، Mongoose — الفرق والـ trade-offs
- Transactions من الكود، retries على serialization failures
- Migrations tooling، seeding
- Redis client (ioredis)، patterns الاستخدام

**4.7 Background work و Messaging**

- BullMQ: queues، workers، repeatable jobs، priorities، rate limiting، flows
- RabbitMQ (amqplib): exchanges، queues، bindings، ack/nack، prefetch
- Kafka (kafkajs): producers، consumers، consumer groups، partitions
- Cron (node-cron) ومشكلته في multi-instance، والبديل (distributed locks أو queue-based scheduling)
- Idempotency، retries، dead-letter، outbox pattern

**4.8 Error handling و Resilience**

- Operational vs programmer errors، إمتى تعمل crash وrestart
- Centralized error handling، error classes، error codes، mapping للـ HTTP
- Graceful shutdown: SIGTERM → stop accepting → drain → close DB → exit
- Timeouts على كل شيء (request، DB، outbound)، retries مع backoff + jitter، circuit breaker (cockatiel/opossum)
- Health endpoints (liveness/readiness)

**4.9 Performance**

- Profiling (CPU/heap)، flame graphs، `clinic`، `0x`
- Event loop lag، `perf_hooks.monitorEventLoopDelay`
- Memory: heap limits (`--max-old-space-size`)، leaks detection، heap snapshots
- Caching (in-process LRU، Redis)، object pooling (نادر)
- Streaming responses، avoiding big JSON in memory
- Clustering/horizontal scaling، sticky sessions
- Load testing: autocannon، k6؛ percentiles
- undici و keep-alive للـ outbound HTTP، DNS caching

**4.10 Security**

- OWASP Top 10 في Node: injection (SQL/NoSQL/command/path)، XSS في SSR، CSRF، SSRF، prototype pollution، ReDoS
- Input validation على الحدود، output encoding، helmet، rate limiting، brute-force
- Secrets management، env handling، no secrets in images
- Dependency security: audit، lockfile، Socket/Snyk، supply-chain attacks
- Running as non-root، least privilege، file upload safety

**4.11 Testing في Node**

- Unit: Vitest/Jest/node:test، mocking (vi.mock، msw للـ HTTP)
- Integration: Supertest، Testcontainers (Postgres/Redis حقيقي)
- Contract tests، E2E للـ APIs
- Test structure، factories، deterministic time (fake timers)

**4.12 Observability و Production**

- Structured logging (pino)، log levels، correlation IDs، redaction
- Metrics (prom-client)، OpenTelemetry (traces، auto-instrumentation)
- Error tracking (Sentry)
- Config management (env، validation at startup)، 12-factor app
- Docker image لـ Node (multi-stage، distroless، non-root، signals)
- Deployment: PM2 (small)، containers (standard)، serverless (Lambda: cold start، bundling)، edge
- CI للـ Node projects

**4.13 Advanced**

- تكتب CLI tools (commander، prompts)، publish package
- Native addons (N-API) — المفهوم فقط
- Bun و Deno: الفرق، وإمتى يستاهلوا
- Node internals deeper: V8 GC، hidden classes، inline caching (للفضول وللـ performance debugging)

## 5. React.js

**5.1 الأساسيات**

- إيه هو React وليه: declarative UI، component model، virtual DOM (والمفهوم الأدق: reconciliation)
- JSX: إزاي بيتحوّل لـ `createElement`/`jsx()`، expressions، conditional rendering، lists و keys (وليه الـ index key غلط غالبًا)
- Components: function components، props، children، composition vs inheritance
- State: `useState`، immutability، functional updates، batching
- Events: synthetic events، handlers، forms (controlled vs uncontrolled)
- Rendering: initial render، re-render triggers، render phase vs commit phase
- Styling: CSS Modules، Tailwind، CSS-in-JS (وليه بيقل)، inline styles
- Fragments، portals، `StrictMode` (وليه بيعمل double render)

**5.2 Hooks بالتفصيل**

- Rules of hooks وليه (ترتيب الاستدعاء)
- `useState`، `useReducer` (وإمتى reducer أحسن)
- `useEffect`: dependencies بالضبط، cleanup، الأخطاء الشائعة (sync state، fetch بدون cleanup)، "You might not need an effect"
- `useLayoutEffect`، `useInsertionEffect`
- `useRef`: DOM refs، mutable values، `forwardRef` (ومش محتاجه في React 19)، `useImperativeHandle`
- `useMemo`، `useCallback`، `React.memo`: إمتى بيفيدوا فعلًا، وإزاي React Compiler بيلغي معظمهم
- `useContext` ومشكلة الـ re-render، تقسيم الـ contexts
- `useId`، `useTransition`، `useDeferredValue`، `useSyncExternalStore`
- `use()` (promises و context)، `useActionState`، `useOptimistic`، `useFormStatus`
- Custom hooks: التصميم، إعادة الاستخدام، testing

**5.3 Rendering model و Performance**

- Reconciliation algorithm: diffing، keys، element type changes
- Fiber (المفهوم): work units، priority، interruptible rendering
- Concurrent features: transitions، Suspense، streaming
- أسباب الـ re-renders وإزاي تشخّصها (React DevTools Profiler)
- Code splitting: `lazy` + `Suspense`، route-based splitting
- Virtualization (TanStack Virtual)، windowing
- Avoiding waterfalls، prefetching، optimistic UI
- Web Vitals في SPA: LCP، INP، CLS

**5.4 State management**

- Local vs lifted vs global state: القاعدة "ارفع الـ state لأقرب مكان مشترك"
- Context للـ dependency injection مش للـ high-frequency state
- Zustand، Jotai، Redux Toolkit (المفهوم والـ trade-offs)
- Server state منفصل: TanStack Query — queries، mutations، caching، invalidation، optimistic updates، infinite queries، prefetching، SSR hydration
- URL as state (search params)، form state
- State machines (XState) للـ flows المعقدة

**5.5 Data fetching و Side effects**

- fetch في effects ومشاكله، AbortController
- Suspense for data fetching، RSC كبديل (في Next)
- Error boundaries وتصميم error UX
- Race conditions في الـ fetching

**5.6 Forms و Validation**

- Controlled vs uncontrolled، performance مع forms كبيرة
- React Hook Form، Zod integration، server-side validation sharing
- Form actions في React 19، progressive enhancement

**5.7 Routing**

- React Router (v7/data APIs): loaders، actions، nested routes، error elements
- TanStack Router (type-safe)
- Routing في Next (القسم 6)

**5.8 Server Components و SSR (مفاهيم React نفسها)**

- Client vs Server Components: الحدود، `'use client'`، serialization
- Server Functions / Actions
- SSR، hydration، hydration errors، streaming SSR
- RSC payload (المفهوم)

**5.9 Component design و Patterns**

- Composition patterns: compound components، render props، slots
- Headless components (Radix، React Aria)
- Controlled/uncontrolled component APIs
- Container/presentational (تاريخي)، hooks-based separation
- Design systems: tokens، theming، variants (cva)
- Accessibility: semantic HTML، ARIA، focus management، keyboard، screen readers
- Error handling strategy، loading states (skeletons)، empty states

**5.10 Testing**

- React Testing Library: queries by role، user-event، async utils
- Testing hooks، mocking modules/network (msw)
- Component tests في Storybook، visual regression
- E2E بـ Playwright

**5.11 TypeScript مع React**

- Props typing، `ReactNode` vs `ReactElement`، children
- Generic components، discriminated union props
- Event types، ref types، `ComponentProps<typeof X>`

**5.12 Ecosystem و Tooling**

- Vite، React DevTools، React Compiler، ESLint plugins (react-hooks)
- i18n، date handling، charts (recharts/visx)، animation (Framer Motion)
- Micro-frontends (المفهوم ومتى تتجنبها)
- React Native (مقدمة فقط لو هتحتاج)

## 6. Next.js (App Router)

**6.1 الأساسيات**

- ليه Next فوق React: routing، rendering strategies، bundling، server integration
- App Router vs Pages Router: الفرق، وليه App Router هو الحالي
- Project structure: `app/`، `layout`، `page`، `loading`، `error`، `not-found`، `template`، route groups `(group)`، private folders `_x`
- File-based routing: dynamic `[id]`، catch-all `[...slug]`، optional `[[...slug]]`، parallel routes `@slot`، intercepting routes `(.)`
- Navigation: `Link`، `useRouter`، `usePathname`، `useSearchParams`، prefetching، `redirect`/`notFound`
- Metadata API (static و generateMetadata)، sitemap، robots، OG images

**6.2 Rendering**

- Server Components by default، `'use client'` boundary، إيه اللي بيتبعت للـ browser
- Static rendering (SSG) vs dynamic rendering (SSR) وإيه اللي بيحوّل الصفحة لـ dynamic (cookies، headers، searchParams، uncached fetch)
- ISR: `revalidate`، on-demand revalidation (`revalidatePath`/`revalidateTag`)
- Streaming و Suspense boundaries، `loading.tsx`، Partial Prerendering (PPR)
- `generateStaticParams`، `dynamicParams`
- Hydration وأخطاؤها، `useEffect` للـ client-only
- Edge runtime vs Node runtime لكل route

**6.3 Data fetching و Caching (أهم جزء وأكتر جزء بيتغير)**

- fetch في Server Components، `cache: 'force-cache' | 'no-store'`، `next: { revalidate, tags }`
- Caching layers: Request memoization، Data Cache، Full Route Cache، Router Cache — وتفهم كل واحدة إمتى بتتفعّل وإزاي تتعطّل
- `'use cache'` و `cacheLife`/`cacheTag` (الاتجاه الجديد في Next 15/16)
- Data fetching patterns: parallel vs sequential، preloading، server-only modules
- Client-side fetching: TanStack Query مع SSR hydration، SWR
- Database access مباشرة من Server Components (Drizzle/Prisma) ومتى تعمل API layer

**6.4 Mutations و Server Actions**

- Server Actions: `'use server'`، forms، `useActionState`، `useFormStatus`، `useOptimistic`
- Validation (Zod)، error handling، redirect بعد الـ action
- Security للـ Server Actions: auth check داخل كل action، input validation، closures encryption
- Revalidation بعد mutation

**6.5 Route Handlers و Middleware**

- `route.ts`: GET/POST، Request/Response (Web APIs)، streaming responses، webhooks
- Middleware (`middleware.ts` / proxy): matchers، auth redirects، rewrites، headers، i18n، حدوده (edge، no DB عادة)
- Headers/cookies APIs، `after()`

**6.6 Authentication**

- Auth.js (NextAuth) v5، Clerk، Lucia/custom — الفرق
- Session strategies في Next: cookies، JWT، DB sessions
- Protecting routes: middleware vs layout vs per-page checks (وليه الـ middleware لوحده مش كفاية)
- RBAC في Server Components و Actions

**6.7 Styling و UI**

- Tailwind + shadcn/ui، CSS Modules، `next/font`، `next/image` (sizes، priority، remote patterns)
- Dark mode، theming، responsive
- Third-party scripts (`next/script`)

**6.8 Performance**

- Bundle analysis (`@next/bundle-analyzer`)، dynamic imports، `optimizePackageImports`
- Images، fonts، scripts optimization
- Core Web Vitals في Next، `reportWebVitals`
- Streaming للـ slow data، avoiding client waterfalls
- Caching strategy مكتوبة لكل صفحة

**6.9 Internationalization، SEO، Accessibility**

- i18n routing، `next-intl`
- SEO: metadata، structured data، canonical، sitemaps
- a11y في Next (نفس React + focus على navigation)

**6.10 Testing و Quality**

- Unit/component tests (Vitest + RTL)، E2E (Playwright) للـ App Router
- Testing Server Components (الحدود الحالية)، Server Actions
- Type-safe env (`@t3-oss/env`)، ESLint config

**6.11 Deployment و Infrastructure**

- Vercel: edge network، ISR، preview deployments، limits
- Self-hosting: `output: 'standalone'`، Docker، Nginx، caching handlers (Redis cache handler للـ multi-instance)
- Serverless vs containers، cold starts، long-running jobs خارج Next
- Env vars (server vs `NEXT_PUBLIC_`)، secrets
- Observability: OpenTelemetry في Next، logging، error tracking (Sentry)

**6.12 Architecture لمشروع Next حقيقي**

- Feature-based folders، separating UI / data access / domain
- Next كـ full-stack vs Next كـ frontend لـ Node API منفصل — متى كل واحد
- Monorepo: `apps/web` + `apps/api` + `packages/shared` (types، validation)
- Migration من Pages Router، incremental adoption
- Common pitfalls: over-fetching في layouts، client components كبيرة، caching غير مفهوم، secrets leaking للـ client

## 7. قواعد البيانات و الـ Data layer

**7.1 Relational / SQL (PostgreSQL)**

- Data modeling: entities، relationships (1:1، 1:N، M:N)، ERD، normalization (1NF–3NF، BCNF) و denormalization المقصودة
- SQL كامل: DDL، DML، JOINs (inner/left/right/full/cross/lateral)، subqueries، CTEs (recursive كمان)، window functions، GROUP BY/HAVING، set operations، CASE، NULL semantics
- Data types: numeric precision، text، timestamp with/without tz، UUID، JSONB، arrays، enums
- Constraints: PK، FK (وON DELETE)، unique، check، exclusion
- Indexes: B-tree، hash، GIN (JSONB/full-text)، GiST، BRIN؛ composite وترتيب الأعمدة، partial، covering (INCLUDE)، expression indexes؛ إمتى الـ index بيضر
- Query planner: `EXPLAIN (ANALYZE, BUFFERS)`، scans، joins، estimates vs actuals، statistics (`ANALYZE`)، `work_mem`
- Transactions: ACID، isolation levels والـ anomalies، MVCC في Postgres، `VACUUM`، bloat
- Locking: row/table locks، `FOR UPDATE / SKIP LOCKED` (queue pattern)، deadlocks، advisory locks
- Schema migrations بدون downtime: expand/contract، backfills بالـ batches، `CREATE INDEX CONCURRENTLY`، تغيير أنواع على جداول كبيرة
- Partitioning (range/list/hash)، table inheritance
- Replication: streaming، logical، read replicas، replication lag، failover
- Connection pooling: PgBouncer modes، pool sizing
- Full-text search، `pg_trgm`، pgvector
- Security: roles، row-level security (multi-tenant)، encryption
- Backups: pg\_dump، PITR، testing restores
- Monitoring: slow query log، `pg_stat_statements`، bloat، cache hit ratio
- MySQL/MariaDB: الفروق المهمة (InnoDB، clustered index) للعلم

**7.2 NoSQL**

- التصنيفات: document، key-value، wide-column، graph، search، time-series — وإمتى كل واحد
- MongoDB: document modeling (embed vs reference)، indexes، aggregation pipeline، transactions، replica sets، sharding، schema validation، change streams
- DynamoDB: single-table design، partition/sort keys، GSIs، capacity modes
- Cassandra/ScyllaDB (المفهوم): write-optimized، partition design
- Elasticsearch/OpenSearch: inverted index، mappings، analyzers، relevance، aggregations
- Graph DBs (Neo4j — المفهوم)، Time-series (TimescaleDB/InfluxDB — المفهوم)
- CAP وconsistency models بالنسبة لكل نوع

**7.3 Redis**

- Data structures: strings، hashes، lists، sets، sorted sets، streams، HyperLogLog، bitmaps، geo
- Persistence (RDB/AOF)، eviction policies، memory management
- Patterns: caching (cache-aside، write-through)، TTLs، sessions، rate limiting، leaderboards، distributed locks (Redlock وحدوده)، pub/sub، queues، counters
- Cache invalidation strategies، cache stampede/penetration/avalanche والحلول
- Redis Cluster، Sentinel، replication
- Lua scripting للـ atomic operations

**7.4 Messaging و Streaming**

- Queue vs log vs pub/sub: الفرق الجوهري
- RabbitMQ: exchanges (direct/topic/fanout)، bindings، ack، prefetch، DLX
- Kafka: topics، partitions، offsets، consumer groups، retention، compaction، delivery semantics، ordering guarantees، schema registry
- Cloud equivalents: SQS/SNS، Pub/Sub، EventBridge
- Patterns: outbox، idempotent consumers، saga، event sourcing، CDC (Debezium)

**7.5 Data access من التطبيق**

- ORM vs query builder vs raw SQL: الـ trade-offs
- Repository pattern، unit of work، data mappers
- N+1، over-fetching، batching (DataLoader)
- Transactions من الـ application layer، retries
- Multi-tenancy strategies: shared schema + tenant\_id، schema per tenant، DB per tenant

**7.6 Analytics و Data pipelines (مقدمة)**

- OLTP vs OLAP، columnar storage، data warehouse vs data lake
- ETL/ELT، batch vs streaming
- ClickHouse/BigQuery/Snowflake (المفهوم)، dbt (المفهوم)

## 8. Software Architecture

الـ Software Architecture بتجاوب: إزاي أنظّم الكود جوه النظام الواحد عشان يفضل سهل التغيير والفهم والاختبار. (System Design في القسم 9 بتجاوب: إزاي أوزّع النظام على machines وخدمات عشان يستحمل الحمل والأعطال.) الاتنين مكمّلين.

**8.1 المفاهيم التأسيسية**

- إيه هي الـ architecture: القرارات الصعب تغييرها، و"architecture is about trade-offs"
- Coupling و cohesion بكل أنواعهم (afferent/efferent coupling، connascence)
- Abstraction، encapsulation، information hiding (Parnas)، separation of concerns
- Modularity: module boundaries، interfaces، dependency direction
- Technical debt: أنواعه، قياسه، إدارته
- Architecture characteristics ("-ilities"): scalability، availability، maintainability، testability، security، performance، observability — وتحدد الأهم للنظام بتاعك
- Conway's Law وعلاقة الـ architecture بهيكل الفريق

**8.2 Design principles**

- SOLID واحدة واحدة بأمثلة TypeScript حقيقية: SRP، OCP، LSP، ISP، DIP — وإمتى الالتزام الحرفي بيضر
- DRY vs WET، KISS، YAGNI، principle of least astonishment
- Composition over inheritance
- Law of Demeter، tell don't ask
- Dependency Inversion vs Dependency Injection vs IoC container
- Immutability، pure core / impure shell (functional core، imperative shell)
- Fail fast، defensive programming بحدود، design by contract

**8.3 Design patterns (GoF وما بعدها)**

- Creational: Factory Method، Abstract Factory، Builder، Singleton (ومشاكله)، Prototype، Object Pool
- Structural: Adapter، Facade، Decorator، Proxy، Composite، Bridge، Flyweight
- Behavioral: Strategy، Observer، Command، Chain of Responsibility، State، Template Method، Iterator، Mediator، Memento، Visitor
- Enterprise patterns (Fowler): Repository، Unit of Work، Data Mapper، Active Record، Service Layer، Domain Model vs Transaction Script، Specification، Gateway، DTO
- Concurrency patterns: producer/consumer، worker pool، pipeline، actor model (المفهوم)
- Anti-patterns: God object، anemic domain model (ومتى مش مشكلة)، spaghetti، golden hammer، premature abstraction
- لكل pattern: المشكلة اللي بيحلها، شكله في JS/TS (كتير منها بيبقى مجرد function)، ومتى بيبقى over-engineering

**8.4 Architectural styles (جوه التطبيق الواحد)**

- Layered (n-tier): presentation / application / domain / infrastructure، وقواعد الاعتماد
- Hexagonal (Ports & Adapters): الـ core معزول، ports كـ interfaces، adapters للـ DB/HTTP/queues
- Onion Architecture و Clean Architecture (Uncle Bob): الدوائر، the dependency rule، use cases/interactors، entities، interface adapters، frameworks كتفاصيل
- Vertical Slice Architecture: التنظيم بالـ feature مش بالـ layer، وإمتى أحسن من Clean
- Modular Monolith: modules بحدود واضحة، public APIs بين الـ modules، enforcing boundaries (ESLint boundaries، Nx)، وليه ده الـ default الصح لمعظم المشاريع
- Pipeline / middleware architecture (Express، Koa)
- Event-driven داخل التطبيق: domain events، in-process event bus
- Plugin architecture، microkernel
- المقارنة: إزاي تختار style لمشروع حسب حجم الفريق والـ domain complexity والعمر المتوقع

**8.5 Domain-Driven Design**

- Strategic DDD: domain، subdomains (core/supporting/generic)، bounded contexts، context mapping (shared kernel، customer-supplier، anti-corruption layer، conformist، open host service)، ubiquitous language، event storming كأداة
- Tactical DDD: entities، value objects، aggregates (وقواعد الـ aggregate boundaries، invariants، one transaction per aggregate)، repositories، domain services vs application services، domain events، factories
- Application layer: use cases، commands/queries، DTOs، validation vs invariants
- DDD في TypeScript/Node: شكل الـ folders، immutability للـ value objects، aggregate root enforcement، domain events dispatch مع الـ outbox
- إمتى DDD بيستاهل (domain معقد) وإمتى CRUD app عادي أحسن

**8.6 CQRS و Event Sourcing**

- CQRS: فصل الـ write model عن الـ read model، read models denormalized، eventual consistency
- Event Sourcing: events كمصدر الحقيقة، rebuilding state، snapshots، projections، versioning الـ events (upcasting)، GDPR وحذف البيانات
- التكلفة الحقيقية والـ cases اللي تستاهل (audit، finance، collaboration)؛ CQRS بدون event sourcing كخيار وسط

**8.7 Integration و Service boundaries**

- Monolith → modular monolith → microservices: متى ولماذا تنقل، strangler fig pattern
- Service boundaries بالـ bounded contexts، data ownership (database per service)
- Synchronous (REST/gRPC) vs asynchronous (events/messages) integration والـ trade-offs
- API design كـ contract: versioning، backward compatibility، consumer-driven contracts
- Distributed transactions: sagas (orchestration vs choreography)، compensation، outbox، idempotency
- Anti-corruption layers، BFF (backend-for-frontend)، API gateway
- Shared libraries vs duplication بين services
- Distributed monolith كـ anti-pattern، وعلاماته

**8.8 Cross-cutting concerns**

- Error handling strategy على مستوى النظام: error types، boundaries، mapping
- Logging/tracing/metrics كجزء من التصميم مش إضافة
- Validation: أين (الحدود) وكيف (schemas) وما الفرق عن الـ invariants
- Configuration، feature flags، secrets
- Security by design: authN/authZ placement، input boundaries، least privilege
- Caching كطبقة معمارية، consistency implications
- Concurrency: optimistic vs pessimistic locking، idempotency keys، versioning
- Internationalization، time zones، money handling (decimal، minor units)

**8.9 Code organization و Quality**

- Package/folder structure strategies (by layer، by feature، by domain) ومزايا كل واحدة
- Public API لكل module، barrel files ومشاكلها، circular dependencies
- Refactoring techniques (Fowler): extract، inline، move، rename، replace conditional with polymorphism، introduce parameter object
- Code smells وإزاي تمسكها
- Legacy code: characterization tests، seams، strangler
- Testing architecture: test pyramid/trophy، testability كنتيجة للـ design الجيد، hexagonal بيسهّل الـ testing
- Static analysis، architecture tests (dependency-cruiser، eslint-plugin-boundaries)

**8.10 Architecture practice (شغل الـ architect/السنيور)**

- Architecture Decision Records (ADRs): الشكل، متى تكتب واحدة
- Design docs / RFCs: المشكلة، السياق، الخيارات، القرار، المخاطر، خطة الـ rollout
- C4 model للرسم (context، container، component، code)، sequence diagrams، وتعمل diagrams مفيدة مش مزخرفة
- Trade-off analysis (ATAM مبسّط)، fitness functions (evolutionary architecture)
- Architecture review، technical due diligence
- Evolutionary architecture: تصميم للتغيير، incremental migration، reversible decisions
- التواصل: تشرح الـ architecture لجمهور تقني وغير تقني

**8.11 كتب ومراجع للقسم ده**

- Clean Architecture (Robert C. Martin)، Fundamentals of Software Architecture + Software Architecture: The Hard Parts (Richards & Ford)، Domain-Driven Design (Evans) و Implementing DDD (Vernon) أو Learning DDD (Khononov)، Patterns of Enterprise Application Architecture (Fowler)، Refactoring (Fowler)، Design Patterns (GoF) أو refactoring.guru كبديل عملي، A Philosophy of Software Design (Ousterhout)

## 9. System Design

**9.1 الأساسيات والمنهجية**

- Functional vs non-functional requirements، وتحديد الـ constraints (scale، latency، consistency، budget)
- Back-of-the-envelope estimation: QPS، storage، bandwidth، memory؛ powers of two؛ latency numbers every programmer should know
- خطوات الـ design interview/design doc: requirements → estimation → API → data model → high-level → deep dive → bottlenecks → trade-offs
- Scalability vs performance، vertical vs horizontal scaling، stateless vs stateful
- Availability (nines)، reliability، durability، fault tolerance، MTBF/MTTR
- Latency vs throughput، tail latency (p99) وليه مهمة
- SLA / SLO / SLI، error budgets
- Cost كبُعد تصميمي

**9.2 Networking و Delivery**

- DNS (TTL، records، GeoDNS)، anycast
- Load balancers: L4 vs L7، algorithms (round robin، least connections، consistent hashing)، health checks، sticky sessions، global vs regional
- Reverse proxies، API gateways (routing، auth، rate limiting، transformation)، service mesh (sidecar، mTLS — المفهوم)
- CDN: caching static/dynamic، edge compute، invalidation، origin shield
- Protocols للاختيار: REST، GraphQL، gRPC، WebSockets، SSE، webhooks، long polling
- TLS termination، HTTP/2/3 implications

**9.3 Data storage و Modeling على scale**

- SQL vs NoSQL decision framework (access patterns أولًا)
- Indexing على scale، denormalization، materialized views
- Replication: leader-follower، multi-leader، leaderless (Dynamo-style)، sync vs async، failover، split-brain
- Partitioning/sharding: by key، by range، by hash؛ consistent hashing، rebalancing، hot spots، cross-shard queries، secondary indexes في sharded DBs
- Consistency models: linearizability، sequential، causal، eventual، read-your-writes، monotonic reads
- CAP و PACELC بشكل عملي
- Transactions على scale: 2PC، sagas، distributed locks
- Storage engines: B-tree vs LSM-tree (write vs read optimized)، WAL، compaction
- Object storage (S3): semantics، presigned URLs، multipart، lifecycle
- Data retention، archival، backups على scale

**9.4 Caching**

- Cache levels: client، CDN، gateway، application (in-memory)، distributed (Redis)، DB cache
- Strategies: cache-aside، read-through، write-through، write-back، refresh-ahead
- Eviction: LRU، LFU، TTL
- Invalidation strategies، cache consistency، thundering herd/stampede، hot keys
- What not to cache، cache sizing

**9.5 Asynchronous processing و Messaging**

- Message queues vs event streams vs pub/sub
- Delivery guarantees: at-most-once، at-least-once، exactly-once (effectively-once بالـ idempotency)
- Ordering guarantees، partitioning للـ ordering
- Backpressure، rate limiting للـ consumers، dead-letter queues، retries
- Event-driven architecture على scale، event schemas و evolution
- Batch processing vs stream processing (Flink/Spark — المفهوم)
- Scheduling: distributed cron، delayed jobs، workflow engines (Temporal — المفهوم)

**9.6 Distributed systems fundamentals**

- Fallacies of distributed computing
- Time وclocks: clock skew، NTP، logical clocks (Lamport، vector)، hybrid clocks
- Consensus: Paxos/Raft (المفهوم)، leader election، quorums، ZooKeeper/etcd
- Failure detection، heartbeats، gossip protocols
- Idempotency، retries، exponential backoff، jitter
- Distributed locks، lease-based locks، fencing tokens
- Unique ID generation (UUID v4/v7، Snowflake، DB sequences، ticket servers)
- Distributed tracing والـ correlation
- Split-brain، network partitions، byzantine (المفهوم فقط)

**9.7 Resilience و Reliability patterns**

- Timeouts، retries، circuit breaker، bulkhead، fallback، graceful degradation، load shedding
- Rate limiting algorithms: token bucket، leaky bucket، fixed/sliding window، distributed rate limiting
- Redundancy، failover (active-active، active-passive)، multi-AZ/multi-region
- Disaster recovery: RPO/RTO، backup strategies
- Chaos engineering (المفهوم)، game days
- Deployment safety: canary، blue/green، feature flags، rollback

**9.8 Security على مستوى النظام**

- Auth على scale: token validation، session stores، SSO، API keys، mTLS
- Zero trust، network segmentation، WAF، DDoS mitigation
- Secrets، encryption at rest/in transit، key management (KMS)
- Data privacy، PII، compliance (GDPR basics)، audit logging
- Multi-tenancy isolation على مستوى النظام

**9.9 Observability و Operations**

- Logs، metrics، traces على scale؛ sampling، cardinality
- Alerting design، on-call، runbooks، incident response، postmortems
- Capacity planning، autoscaling (metrics-based، predictive)، cost monitoring
- Infrastructure: containers، orchestration (K8s)، IaC، service discovery، config management

**9.10 Building blocks لازم تعرف كل واحد منها (مدخلات، مخرجات، limits)**

- Load balancer، API gateway، CDN، reverse proxy
- Relational DB، document DB، key-value store، wide-column، search engine، graph DB، time-series DB
- Cache (Redis/Memcached)، message queue (RabbitMQ/SQS)، event stream (Kafka)، pub/sub
- Object storage (S3)، block storage، file storage
- Coordination service (ZooKeeper/etcd)، distributed lock
- Rate limiter، ID generator، scheduler، notification service
- Serverless functions، edge functions

**9.11 Case studies (صمّمها بإيدك، كل واحدة فيها المفاهيم اللي بتختبرها)**

1. URL shortener — hashing، ID generation، read-heavy caching، redirects
2. Rate limiter — algorithms، Redis، distributed consistency
3. Key-value store — replication، partitioning، consistency (Dynamo paper)
4. Unique ID generator — Snowflake
5. Web crawler — BFS على scale، politeness، dedup، storage
6. Notification system — fan-out، queues، retries، preferences، idempotency
7. News feed — fan-out on write vs read، hybrid، ranking، caching
8. Chat system (WhatsApp/Slack) — WebSockets، presence، message ordering، delivery receipts، storage
9. Search autocomplete — tries، top-k، data pipeline
10. Video streaming (YouTube) — upload pipeline، transcoding، CDN، adaptive bitrate
11. File storage (Dropbox/Google Drive) — chunking، dedup، sync، conflicts، metadata DB
12. Ride sharing / proximity service (Uber) — geospatial indexing (geohash، quadtree)، matching، real-time locations
13. Payment system — idempotency، exactly-once، ledger (double-entry)، reconciliation، PCI
14. Hotel/ticket booking — concurrency، overbooking prevention، locking، inventory
15. Distributed message queue — storage، replication، delivery semantics
16. Metrics/monitoring system — time-series storage، aggregation، alerting
17. Ad click aggregation / real-time analytics — streaming، exactly-once counting، late events
18. Email service (Gmail) — storage، search، spam، multi-device sync
19. Stock exchange / order matching — low latency، ordering، fairness
20. Multi-tenant SaaS (زي المنصة بتاعتك) — isolation، noisy neighbors، billing، per-tenant limits

**9.12 Design communication**

- ترسم diagrams واضحة (C4، data flow، sequence)
- تكتب design doc صفحة أو اتنين
- تقدّم التصميم في 30–45 دقيقة وتجاوب على "إيه اللي هيكسر الأول لو الحمل اتضاعف 10 مرات؟"

**9.13 كتب ومراجع للقسم ده**

- Designing Data-Intensive Applications (Kleppmann) — الأساس
- System Design Interview vol. 1 & 2 (Alex Xu)، Understanding Distributed Systems (Vitillo)
- Site Reliability Engineering (Google، مجاني)، Release It! (Nygard)
- Papers: Dynamo، Bigtable، Kafka، Raft (قراءة واحدة لكل واحدة تكفي)
- Engineering blogs: Netflix، Uber، Stripe، Discord، Cloudflare، Shopify

## 10. Testing، Security، DevOps

**10.1 Testing**

- أنواع الاختبارات: unit، integration، contract، E2E، smoke، load، security، mutation — والـ pyramid/trophy
- Test design: AAA، given/when/then، test doubles (stub، mock، spy، fake)، إمتى تعمل mock وإمتى لأ
- TDD/BDD (المفهوم والممارسة)، property-based testing
- Test data management، fixtures، factories، Testcontainers
- Flaky tests، test isolation، parallelism، speed
- Coverage: قراءته صح، branch coverage، وحدوده
- Testing في CI، test reporting

**10.2 Security**

- Security mindset: threat modeling (STRIDE مبسّط)، attack surface، defense in depth
- OWASP Top 10 (web) + OWASP API Security Top 10 — كل بند بمثال وحله
- Web vulnerabilities بالتفصيل: XSS (stored/reflected/DOM)، CSRF، SQLi/NoSQLi، SSRF، IDOR/BOLA، open redirect، clickjacking، prototype pollution، ReDoS، path traversal
- Browser security: same-origin policy، CORS، CSP، cookies flags، Subresource Integrity
- Crypto للمطور: hashing vs encryption vs signing، symmetric vs asymmetric، TLS، JWT signing، key rotation، لا تخترع crypto
- Secrets management، secure config، secure defaults
- Supply chain: dependencies، lockfiles، SCA، SBOM، typosquatting
- Security testing: SAST (Semgrep/CodeQL)، DAST (ZAP)، dependency scanning، pentest basics
- Logging للأمان: audit trails، no secrets/PII in logs
- Incident response للأمان، responsible disclosure

**10.3 DevOps و Cloud**

- Linux و shell، SSH، permissions، processes، networking tools
- Docker: images، layers، multi-stage، Compose، networking، volumes، security
- CI/CD: pipelines، stages، caching، artifacts، environments، approvals، GitOps (المفهوم)
- Deployment strategies: rolling، blue/green، canary، feature flags، rollback
- Kubernetes الأساسي: Pods، Deployments، Services، Ingress، ConfigMaps/Secrets، probes، HPA، Helm
- Cloud (AWS أساسًا): IAM، VPC، EC2، ECS/EKS/Lambda، S3، RDS، ElastiCache، SQS/SNS، CloudFront، Route 53، CloudWatch، cost basics
- Infrastructure as Code: Terraform (أو Pulumi)، state، modules، environments
- Observability stack: Prometheus/Grafana، OpenTelemetry، ELK/Loki، Sentry
- SRE basics: SLOs، error budgets، on-call، runbooks، postmortems
- Serverless و edge: متى ومتى لا

## ترتيب الدراسة المقترح والمصادر

الترتيب للمراجعة الشاملة (مش للتعلم من الصفر الحقيقي): ابدأ بالأساسيات بسرعة، ثم JS/TS/Node بعمق، ثم Architecture قبل System Design لأن الأولى بتبني طريقة التفكير اللي التانية بتستخدمها على scale، وReact/Next في النص عشان تربط بيهم.

| الترتيب | القسم | الوقت التقريبي للمراجعة | المصدر الأنسب (واحد لكل قسم) |
| --- | --- | --- | --- |
| 1 | أساسيات CS | 3 أسابيع | [CS50](https://cs50.harvard.edu/x/) للفجوات، \[Computer Networking: A Top-Down Approach\] للـ networking، [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) للـ OS (مجاني)، NeetCode roadmap للـ DSA |
| 2 | JavaScript | 3 أسابيع | [javascript.info](https://javascript.info) (الأكمل)، + كتب You Don't Know JS Yet |
| 3 | TypeScript | 2 أسبوع | [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) + Total TypeScript (Matt Pocock) |
| 4 | Node.js | 4 أسابيع | [Node.js docs](https://nodejs.org/docs/latest/api/) + [Node.js Design Patterns](https://www.nodejsdesignpatterns.com/) (Casciaro) + Node.js Best Practices repo على GitHub |
| 5 | قواعد البيانات | 4 أسابيع | [PostgreSQL docs](https://www.postgresql.org/docs/)، [Use The Index, Luke](https://use-the-index-luke.com/)، DDIA فصول 2–3، Redis University |
| 6 | Software Architecture | 5 أسابيع | Clean Architecture + Fundamentals of Software Architecture + [refactoring.guru](https://refactoring.guru) + Learning DDD (Khononov) |
| 7 | React | 3 أسابيع | [react.dev](https://react.dev) (كامل، خاصة Learn) + Epic React (Kent C. Dodds) |
| 8 | Next.js | 2 أسبوع | [Next.js docs](https://nextjs.org/docs) + Next.js Learn course الرسمي |
| 9 | System Design | 6 أسابيع | Designing Data-Intensive Applications + System Design Interview (Alex Xu) + [ByteByteGo](https://bytebytego.com) + [System Design Primer](https://github.com/donnemartin/system-design-primer) |
| 10 | Testing / Security / DevOps | 4 أسابيع | [Testing JavaScript](https://testingjavascript.com)، [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org)، PortSwigger Web Security Academy (مجاني)، Docker/K8s docs + Terraform tutorials |

الإجمالي حوالي 9 شهور بإيقاع 10–12 ساعة أسبوعيًا، وده متوافق مع خطة الـ 12 شهر في الدوك الأول. الأرقام تقديرية ومبنية على إنك بتراجع أغلب الحاجات مش بتتعلمها لأول مرة.

**قاعدة أخيرة:** لكل قسم لازم يطلع منه artifact ملموس (كود، design doc، مقال، أو diagram). القراءة من غير إنتاج بتتبخر في أسبوعين.
