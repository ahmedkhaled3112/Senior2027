# 08 — Design Patterns

> **ليه القسم ده:** الـ patterns هي اللغة المشتركة اللي السنيور بيتكلم بيها عن الكود: "خلّيها Strategy"، "ده محتاج Outbox"، "اعمله Decorator". مش حفظ 23 pattern من GoF — لكن تعرف **المشكلة** اللي كل واحد بيحلها، **شكله في JavaScript/TypeScript** (كتير منهم بيبقى مجرد function أو closure)، و**إمتى بيبقى over-engineering**. القسم ده جسر بين اللغة (02–04) والـ Architecture (09): الـ Architecture بتقولك "فين الحدود"، والـ patterns بتقولك "إزاي تبني جوه الحدود".
>
> **الوقت التقريبي:** 3 أسابيع · **المصدر الأنسب:** [refactoring.guru](https://refactoring.guru/design-patterns) + [patterns.dev](https://www.patterns.dev) + Node.js Design Patterns (Casciaro) + Patterns of Enterprise Application Architecture (Fowler)

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
**القاعدة الذهبية للقسم ده:** لكل pattern اكتب 3 حاجات: (1) المشكلة قبل الـ pattern بكود سيئ، (2) الحل بالـ pattern في TypeScript، (3) جملة واحدة "إمتى ده over-engineering". لو مش عارف تكتب الـ 3، متعلمتوش.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 إيه هي الـ patterns وليه
- [ ] تعريف: حل متكرر لمشكلة متكررة في سياق معين — **مش** template تنسخه، لكن فكرة تطبّقها
- [ ] الفئات الثلاثة (GoF): **Creational** (إزاي تعمل objects)، **Structural** (إزاي تركّبهم)، **Behavioral** (إزاي بيتواصلوا)
- [ ] **الـ patterns في JS/TS مختلفة عن Java**: first-class functions و closures و modules بيخلّوا كتير من الـ patterns أبسط بكتير (Strategy = function، Singleton = module، Command = closure، Decorator = higher-order function) — تعرف الـ pattern والـ idiom
- [ ] **إمتى الـ pattern بيبقى ضرر**: pattern لمشكلة مش موجودة (speculative generality)، abstraction لحاجة بتتعمل مرة واحدة، الفريق مش فاهمه — القاعدة: اعمل الحاجة بسيطة، ولما التكرار/التعقيد يظهر **بعدين** طبّق الـ pattern (refactor toward patterns)
- [ ] Pattern vs idiom vs architecture style: الفرق في الـ scale

### 1.2 Creational الأساسية
- [ ] **Factory function**: function بترجع object حسب input (`createLogger(env)`) — بدل `new` في كل مكان، وبتخبّي الـ concrete class
- [ ] **Builder البسيط**: بناء object معقد خطوة خطوة (`QueryBuilder().where().orderBy().limit()`) — fluent interface، وإمتى object literal كفاية
- [ ] **Singleton**: instance واحد — في JS الـ **module نفسه singleton** (`export const db = createPool()`)، ومشاكله (hidden global state، testing صعب، coupling) — وإمتى مقبول (DB pool، config، logger)
- [ ] Object literal و `Object.create` كـ "prototype" البسيط

### 1.3 Structural الأساسية
- [ ] **Adapter**: تلبّس interface بتاعك على library خارجية (`PaymentAdapter` فوق Stripe SDK) — عشان لو غيّرت الـ library الكود بتاعك ميتغيرش
- [ ] **Decorator** (كـ higher-order function): تضيف behavior من غير تعديل الأصل — `withLogging(fn)`، `withRetry(fn)`، `withCache(fn)`، Express middleware wrapper
- [ ] **Facade**: واجهة بسيطة فوق subsystem معقد (`notificationService.send()` بتخبّي email + SMS + push + templates)
- [ ] **Proxy البسيط**: نفس الـ interface بس بيعمل حاجة قبل/بعد (lazy init، access check، caching)

### 1.4 Behavioral الأساسية
- [ ] **Strategy**: تبدّل الـ algorithm وقت التشغيل — `const strategies = { card: payByCard, paypal: payByPaypal }` بدل `if/else` بيكبر — **أكتر pattern هتستخدمه**
- [ ] **Observer**: subscribe/notify — `EventEmitter` في Node، `addEventListener`، React state subscriptions — decoupling الـ side effects
- [ ] **Command**: الـ action كـ object/closure (`{ execute, undo }`) — queues، undo/redo، scheduling، CQRS commands
- [ ] **Chain of Responsibility**: سلسلة handlers كل واحد يا بيعالج يا بيمرر — **Express/Koa middleware** هي بالظبط ده
- [ ] **Iterator**: الـ iteration protocol في JS (`Symbol.iterator`، generators) — تخلي أي collection بتاعتك تتعمل `for...of`
- [ ] **Template Method**: skeleton ثابت وخطوات بتتبدّل — في JS غالبًا function بتاخد callbacks بدل inheritance

### 1.5 JavaScript-specific الأساسية
- [ ] **Module pattern** (تاريخي: IIFE + closure) → ESM modules دلوقتي
- [ ] **Revealing module**: تصدّر الـ public API بس
- [ ] **Callback pattern** و error-first callbacks → Promises → async/await (الـ evolution)
- [ ] **Null Object**: object بيعمل "ولا حاجة" بدل `null` checks في كل مكان (`NoopLogger`)
- [ ] **Configuration object** بدل 6 parameters، مع defaults بالـ destructuring

---

## 🟡 المستوى 2 — المتوسط

### 2.1 Creational بالتفصيل (GoF)
- [ ] **Factory Method** (الـ subclass بتقرر النوع) vs **Simple Factory** (function واحدة) vs **Abstract Factory** (family من objects متوافقة — `createUIKit('dark')` بترجع Button + Input + Modal متناسقين) — ومتى كل واحد
- [ ] **Builder بعمق**: separation بين الـ construction والـ representation، director، builder بـ generics في TS (كل step بيضيّق الـ type)، immutable builder (كل method بترجع instance جديد)
- [ ] **Prototype**: cloning (`structuredClone`، `Object.create`) — وإمتى أحسن من الإنشاء من الصفر
- [ ] **Object Pool**: إعادة استخدام objects غالية (DB connections، worker threads، buffers) — `pg.Pool` هو الـ pattern ده
- [ ] **Dependency Injection** كـ creational pattern: constructor injection، factory injection، composition root — تفاصيله في Architecture
- [ ] **Lazy initialization**: الـ object بيتعمل أول مرة يتطلب (`get client() { return this._client ??= create() }`)

### 2.2 Structural بالتفصيل (GoF)
- [ ] **Proxy بعمق**: virtual (lazy)، protection (access control)، caching، logging، remote — و**JS `Proxy` object** كتطبيق native (reactivity في Vue/MobX، validation، mocking)
- [ ] **Composite**: tree structures بنفس الـ interface للـ leaf والـ container (file system، UI tree، AST، permissions tree، React component tree)
- [ ] **Bridge**: فصل الـ abstraction عن الـ implementation عشان الاتنين يتطوروا مستقلين (`Notification` × `Channel` بدل `EmailAlert`، `SmsAlert`، `EmailReport`، `SmsReport`...)
- [ ] **Flyweight**: مشاركة الـ state المشترك بين objects كتير (characters في editor، map markers) — نادر في الـ web backend، بس بيظهر في الـ performance work
- [ ] **Decorator بعمق**: stacking decorators (`withCache(withRetry(withLogging(fetchUser)))`)، TS decorators (NestJS style) vs function composition، الفرق بين Decorator و Proxy (الأول بيضيف، التاني بيتحكم)
- [ ] **Adapter بعمق**: class adapter vs object adapter، two-way adapter، و**Anti-Corruption Layer** كـ adapter على مستوى الـ bounded context

### 2.3 Behavioral بالتفصيل (GoF)
- [ ] **State**: الـ object بيغيّر behavior حسب الـ state الداخلي — بدل `switch(status)` في كل method، كل state class/object بيعرف transitions بتاعته (order lifecycle، connection state، UI modes) — و**state machines** (XState) كتطور ليه
- [ ] **Mediator**: الـ components بتتكلم عبر وسيط مش مع بعض (event bus، command bus، chat room، form coordinator) — وإمتى بيتحوّل لـ god object
- [ ] **Memento**: snapshot للـ state عشان ترجعله (undo، transactions، form draft)
- [ ] **Visitor**: عمليات جديدة على object structure من غير تعديلها (AST traversal، exporters لـ formats مختلفة) — وليه نادر في TS (discriminated unions + exhaustive switch أسهل غالبًا)
- [ ] **Interpreter** كمفهوم (expression parsers، rule engines، query DSLs)
- [ ] **Observer بعمق**: push vs pull، typed events في TS، unsubscribe و memory leaks، EventEmitter vs RxJS Observables vs signals
- [ ] **Command بعمق**: command + handler + bus (CQRS)، undo stack، macro commands، serializable commands (queues)
- [ ] **Strategy بعمق**: strategy registry (map)، strategy selection by config/feature flag، strategy + factory مع بعض، وإمتى plain function map كفاية
- [ ] **Chain of Responsibility بعمق**: Express middleware internals (تكتب `compose()` بإيدك زي Koa)، validation chains، approval workflows، interceptors (NestJS/Axios)

### 2.4 Enterprise patterns (Fowler — الـ data و الـ domain)
- [ ] **Repository**: interface في الـ domain (`UserRepository.findById`)، implementation في الـ infrastructure — generic repository ومشاكله (leaky، بيشجع anemic model) vs specific per aggregate
- [ ] **Unit of Work**: تجميع الـ changes وcommit واحد — الـ transaction wrapper، وإزاي الـ ORMs بتعمله (Prisma `$transaction`)
- [ ] **Data Mapper** (الـ domain object ميعرفش عن الـ DB — Prisma/Drizzle + mapping layer) vs **Active Record** (`user.save()` — Mongoose/TypeORM AR) — الـ trade-offs (بساطة vs testability/separation)
- [ ] **Identity Map** و **Lazy Load** (الـ ORM بيعملهم — تعرف إنهم موجودين عشان تفهم الـ N+1)
- [ ] **Service Layer** / Application Service: entry point للـ use case، orchestration مش business logic
- [ ] **Domain Model** (logic في objects غنية) vs **Transaction Script** (procedure لكل use case) — الحكم حسب تعقيد الـ domain
- [ ] **DTO** + **Mapper/Assembler**: الشكل اللي بيعدّي الحدود (API ↔ application ↔ domain ↔ DB) — وليه متستخدمش نفس الـ type في كل الطبقات
- [ ] **Specification**: business rule كـ object composable (`activeUsers.and(premiumUsers)`) للـ validation والـ queries
- [ ] **Gateway**: wrapper للـ external system (payment gateway، email gateway) — Adapter على مستوى الـ system
- [ ] **Value Object** و **Entity** كـ patterns (تفاصيل DDD في Architecture)
- [ ] **Registry** و **Plugin** patterns للـ extensibility

### 2.5 Node.js patterns (Casciaro)
- [ ] **Middleware pipeline**: تكتب `compose()` بإيدك (Koa-style: `(ctx, next) => Promise`)، وتفهم الـ onion model
- [ ] **Streams patterns**: pipeline، Transform كـ map/filter، fork/merge streams، backpressure handling
- [ ] **EventEmitter patterns**: typed events، `once` للـ one-shot، error event، combining with promises (`events.once`)
- [ ] **Async control flow patterns**: sequential iteration، parallel with limit (`pLimit` بإيدك)، race with timeout، batching، debounced queue
- [ ] **Callback → Promise → async iterator**: `promisify`، `Readable.from`، `for await`
- [ ] **Module patterns في Node**: substack pattern (export function واحدة)، named exports، `exports` field، dependency injection via module (مشاكله)
- [ ] **Plugin pattern**: Fastify plugins (encapsulation)، hooks registry، lifecycle
- [ ] **Task queue / Job pattern**: producer/consumer بـ BullMQ، job as command object
- [ ] **Singleton via module caching** وحدوده (monorepo duplicates، ESM/CJS dual instances)

### 2.6 React patterns
- [ ] **Compound components**: `<Tabs><Tabs.List/><Tabs.Panel/></Tabs>` مع context داخلي — الـ API الأنظف للـ UI libraries
- [ ] **Render props** (تاريخي) و **Higher-Order Components** (تاريخي) → **Custom hooks** كالبديل الحالي — تعرف الثلاثة وليه الـ hooks كسبوا
- [ ] **Provider pattern**: context + provider للـ DI (theme، auth، query client)
- [ ] **Controlled/uncontrolled** API pattern (component بيدعم الاتنين)
- [ ] **Container/Presentational** → hooks-based separation (logic في hook، UI pure)
- [ ] **Slots / children as props**، **polymorphic `as` prop**
- [ ] **State reducer pattern** (Kent C. Dodds — المستخدم بيتحكم في الـ reducer)
- [ ] **Headless component pattern** (Radix، TanStack Table — behavior من غير UI)
- [ ] **Optimistic UI pattern**، **skeleton pattern**

### 2.7 Functional patterns
- [ ] **Composition**: `pipe`/`compose` — تكتبهم بـ types صح
- [ ] **Currying و partial application** عمليًا (configuring functions: `createHandler(deps)(req)`)
- [ ] **Maybe/Option** و **Result/Either**: error handling بدون exceptions، `map`/`flatMap`/`match` — وإمتى يستاهلوا (domain errors متوقعة) وإمتى الـ exceptions أوضح
- [ ] **Immutability patterns**: structural sharing، `Readonly` types، Immer
- [ ] **Memoization** كـ pattern (`memoize`، `useMemo`، `React.cache`)
- [ ] **Lenses** كمفهوم (nested immutable updates)
- [ ] **Functional core, imperative shell** كـ pattern على مستوى الـ module

### 2.8 Anti-patterns (تعرف تمسكها في الـ code review)
- [ ] **God object / God module** (الـ `utils.ts` بـ 2000 سطر، الـ `UserService` بيعمل كل حاجة)
- [ ] **Anemic domain model** (objects من غير behavior — كل الـ logic في services) — **ومتى مش مشكلة** (CRUD apps)
- [ ] **Spaghetti code**، **lava flow** (كود محدش عارف بيعمل إيه ومحدش بيجرؤ يمسحه)
- [ ] **Golden hammer** (microservices لكل حاجة، Redux لكل state، Kafka لكل queue)
- [ ] **Premature abstraction** / speculative generality (interface بـ implementation واحدة "عشان ممكن نحتاج")
- [ ] **Copy-paste programming**، **magic numbers/strings**، **boolean parameters** (`save(user, true, false)`)
- [ ] **Callback hell** → promise hell (`.then` chains متداخلة) → `await` في loop غلط
- [ ] **Singleton abuse** و global mutable state
- [ ] **Leaky abstraction** (الـ repository بيرجع Prisma types للـ domain)
- [ ] **Distributed monolith** (تفاصيله في Architecture)

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Concurrency patterns
- [ ] **Producer/Consumer** مع bounded buffer (backpressure) — في Node: streams، BullMQ، channels
- [ ] **Worker pool**: pool من workers بياخدوا tasks من queue (`piscina`، تكتب واحد بـ `worker_threads`)
- [ ] **Pipeline**: stages متسلسلة كل واحدة بتعالج وتمرر (streams، ETL، CI stages)
- [ ] **Fan-out / Fan-in**: توزيع work على N workers وتجميع النتائج (`Promise.all` + chunking، map-reduce light)
- [ ] **Scatter-gather**: نفس الـ request لكذا service وتجميع (search aggregators، price comparison)
- [ ] **Actor model** كمفهوم: state + mailbox، مفيش shared memory (Erlang/Akka/Orleans، وفي JS: workers + postMessage، XState actors)
- [ ] **Reactive streams** (RxJS): observables، operators، backpressure — وإمتى يستاهل (complex event streams في UI، real-time dashboards) وإمتى over-engineering
- [ ] **Semaphore / mutex في JS**: `pLimit`، `async-mutex` — حماية الـ critical sections بين الـ `await`s
- [ ] **Debounce / throttle / batching** كـ concurrency patterns (DataLoader batching window)

### 3.2 Resilience patterns (كـ كود مش كمفهوم)
- [ ] **Retry مع exponential backoff + jitter**: تكتبه كـ decorator/wrapper بـ options (max attempts، retryable errors predicate، on-retry hook)
- [ ] **Circuit Breaker**: تكتبه بإيدك (closed/open/half-open، failure threshold، reset timeout، metrics) ثم تقارن بـ opossum/cockatiel
- [ ] **Bulkhead**: pool منفصل لكل dependency (concurrency limit per downstream)
- [ ] **Timeout** كـ pattern: `AbortSignal.timeout`، `Promise.race` مع cleanup، timeout budgets عبر الـ chain
- [ ] **Fallback / Graceful degradation**: cached value، default، degraded response — كـ decorator
- [ ] **Rate limiter** كـ pattern: token bucket و sliding window كـ classes، in-memory ثم Redis
- [ ] **Idempotent receiver**: idempotency key storage + response replay — كـ middleware
- [ ] **Composing resilience**: policy wrapping order (timeout → retry → circuit breaker → bulkhead) وليه الترتيب مهم (cockatiel `wrap`)

### 3.3 Messaging و Integration patterns (Enterprise Integration Patterns)
- [ ] **Message channel** أنواعه: point-to-point (queue)، publish-subscribe (topic)، dead-letter channel
- [ ] **Message router**: content-based router، message filter، splitter/aggregator، recipient list
- [ ] **Message translator** / **Canonical data model** (و ACL كـ translator)
- [ ] **Message endpoint patterns**: polling consumer، event-driven consumer، competing consumers، idempotent receiver، transactional client
- [ ] **Correlation identifier** و **Return address** (request/reply عبر queues)
- [ ] **Outbox pattern** كـ كود: جدول + relay (polling publisher) + idempotent consumer — تكتبه كامل
- [ ] **Saga** كـ كود: orchestrator بـ state machine + compensations، vs choreography بالـ events
- [ ] **Claim check**: الـ message فيها reference للـ payload الكبير (S3) مش الـ payload نفسه
- [ ] **Event-carried state transfer** vs **event notification** vs **event sourcing** (Fowler's three meanings of "event-driven")
- [ ] **Command bus / Query bus / Mediator** (CQRS light): handlers registry، pipeline behaviors (validation، logging، transaction) كـ decorators على الـ bus

### 3.4 Extensibility و Framework-level patterns
- [ ] **DI container بإيدك**: registration، resolution، lifetimes (singleton/scoped/transient)، constructor injection بـ tokens — عشان تفهم NestJS/tsyringe من جوه
- [ ] **Plugin architecture**: hooks registry (`beforeSave`، `afterSave`)، lifecycle، plugin isolation، ordering — زي Fastify/Vite/ESLint
- [ ] **Hooks pattern** (الـ concept العام): extension points محددة في flow ثابت — Git hooks، React hooks، webpack hooks (tapable)
- [ ] **Interceptor pattern**: around-advice على calls (NestJS interceptors، Axios interceptors، gRPC interceptors)
- [ ] **Strategy + Registry + Factory** مع بعض للـ pluggable systems (payment providers، storage backends، auth providers)
- [ ] **Policy pattern** (authorization policies كـ objects — Casbin/OPA style)
- [ ] **Fluent interface / Internal DSL**: type-safe builders بـ generics (zod، drizzle، knex كأمثلة — تقرأ source بتاعهم)
- [ ] **Type-level patterns**: branded types، builder بـ type accumulation، discriminated union state، `satisfies` configs

### 3.5 Refactoring toward patterns
- [ ] **Replace conditional with polymorphism / Strategy**: الـ `switch` اللي بيتكرر في 5 أماكن → strategy map
- [ ] **Replace type code with State**: `status` + ifs → state objects
- [ ] **Extract Adapter**: الـ SDK calls المنتشرة → adapter واحد
- [ ] **Introduce Null Object**: الـ `if (logger)` في كل مكان
- [ ] **Replace constructor with Factory**: لما الإنشاء بقى معقد
- [ ] **Decompose god service**: by responsibility → services صغيرة + facade لو لازم
- [ ] **Introduce Parameter Object / Config object**
- [ ] **Replace callback with Promise / Observable**
- [ ] القاعدة: الـ refactoring بيتعمل بـ tests موجودة، خطوات صغيرة، والـ pattern بيظهر من الكود مش بيتفرض عليه

### 3.6 قراءة الـ patterns في الـ open source (أفضل طريقة تتعلمهم)
- [ ] **Express**: middleware chain (`next`)، router as composite، `app.use` — اقرأ `lib/router`
- [ ] **Koa**: `compose()` الـ onion model — 50 سطر بيعلّموك Chain of Responsibility
- [ ] **Fastify**: plugin system (avvio)، encapsulation، hooks، decorators
- [ ] **NestJS**: DI container، modules، interceptors/guards/pipes كـ chain
- [ ] **React**: reconciler (Composite)، hooks (linked list)، context (Provider)، Suspense (throw promise)
- [ ] **TanStack Query**: observer pattern، cache، query client
- [ ] **Zod**: fluent builder + type inference
- [ ] **BullMQ**: producer/consumer، job as command، Lua scripts للـ atomicity
- [ ] لكل واحد: تلاقي 2–3 patterns وتكتب ملاحظة "فين الـ pattern وليه اتعمل كده"

### 3.7 الحكم (المهارة الحقيقية)
- [ ] تقدر تقول لأي pattern: **المشكلة اللي بيحلها، التكلفة اللي بيضيفها، والبديل الأبسط**
- [ ] تعرف تقول "مش محتاجين pattern هنا" في الـ code review وتبرر
- [ ] تعرف تسمّي الـ pattern اللي الزميل عمله من غير ما يعرف (وتقوله الاسم عشان الفريق يتكلم لغة واحدة)
- [ ] تعرف الـ patterns اللي بتتكرر في الـ codebase بتاعك دلوقتي، واللي ناقصة، واللي زيادة

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **Patterns repo** (`patterns/` في المشروع أو repo منفصل): لكل pattern من الـ 🟢 و 🟡 ملف فيه: المشكلة بكود سيئ → الحل بـ TypeScript → test → جملة "إمتى over-engineering". الهدف 25–30 pattern.
2. **بإيدك من الصفر** (كل واحد في ملف مع tests): `compose()` middleware (Koa-style)، `EventEmitter` typed، `pLimit`، `retry` مع backoff، `CircuitBreaker`، `TokenBucket`، DI container صغير، command bus بـ pipeline behaviors.
3. **طبّق في المشروع الجانبي**: Strategy للـ notification channels، Adapter للـ payment provider، Decorator للـ caching على الـ repository، Outbox pattern كامل، Specification للـ filters، compound component واحد في الـ frontend.
4. **Refactoring session موثّقة**: خد module من شغلك فيه `switch` متكرر أو god service → refactor toward pattern → before/after + ليه.
5. **5 ملاحظات open source**: اقرأ Koa compose، Express router، Fastify plugins، React context، Zod builder — واكتب الـ patterns اللي لقيتها.
6. **Anti-patterns checklist** للـ code review (10 بنود) تستخدمها فعليًا في شغلك.

## 📚 المصادر

- [refactoring.guru — Design Patterns](https://refactoring.guru/design-patterns) — الأوضح، بأمثلة TypeScript
- [patterns.dev](https://www.patterns.dev) — JS/React patterns الحديثة (مجاني)
- [Node.js Design Patterns — Casciaro & Mammino](https://www.nodejsdesignpatterns.com/) — الفصول 4–9 بالذات (async patterns، streams، creational/structural/behavioral في Node)
- [Patterns of Enterprise Application Architecture — Fowler](https://martinfowler.com/eaaCatalog/) — الـ catalog online
- [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/) — الـ messaging patterns
- [Kent C. Dodds — Advanced React Patterns](https://kentcdodds.com/blog/advanced-react-component-patterns) و [patterns.dev React section](https://www.patterns.dev/react)
- [Fowler — What do you mean by "Event-Driven"?](https://martinfowler.com/articles/201701-event-driven.html)
- [Koa compose source](https://github.com/koajs/compose/blob/master/index.js) — 50 سطر
- [cockatiel](https://github.com/connor4312/cockatiel) — resilience policies في TS (اقرأ الـ source)
- Design Patterns (GoF) — الأصل، للرجوع مش للقراءة من الأول للآخر

## ✅ اختبار الخروج

1. اكتب Strategy و Decorator و Chain of Responsibility في TypeScript في 10 دقايق — من غير classes.
2. إيه الفرق بين Proxy و Decorator و Adapter و Facade؟ (الأربعة "بيلفّوا" object — إيه اللي بيفرّقهم؟)
3. Data Mapper vs Active Record: إمتى كل واحد في مشروع Node؟
4. اكتب `compose()` بتاعة Koa من الذاكرة واشرح الـ onion model.
5. اشرح الـ Outbox pattern بالكود: الجدول، الـ relay، الـ consumer.
6. Circuit breaker: الـ 3 states والـ transitions — واكتبه.
7. اديني 3 patterns موجودين في Express/React من غير ما حد يسميهم.
8. الزميل عمل interface بـ implementation واحدة "عشان ممكن نحتاج" — إيه رأيك وليه؟
9. ترتيب الـ resilience policies (timeout/retry/circuit breaker) بيفرق؟ ليه؟
10. إمتى الـ Visitor مش محتاجه في TypeScript وإيه البديل؟
