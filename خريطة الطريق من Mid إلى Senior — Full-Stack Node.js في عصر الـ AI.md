# خريطة الطريق من Mid إلى Senior — Full-Stack Node.js في عصر الـ AI

Nov 1, 2026 · @ak

## الصورة الحقيقية: الـ AI قلّل فرص الجونيور، وزوّد الطلب على السنيور

الخلاصة: السوق مش بيتقفل، لكنه بيتقسم. الفرص بتقل عند مستوى الـ Junior والـ Mid اللي شغله "تنفيذ" بس، وبتزيد عند السنيور اللي بيمتلك القرار المعماري والمراجعة والمسؤولية عن الـ production. يعني الانتقال اللي إنت عايزه هو بالظبط الاتجاه الصح.

أرقام من مصادر أولية (تم فتحها بتاريخ 1 نوفمبر 2026):

| المؤشر | الرقم | المصدر |
| --- | --- | --- |
| نصيب الوظائف السنيور من ارتفاع إعلانات وظائف البرمجة (مايو 2025 – مايو 2026) | 71% | [Indeed Hiring Lab](https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/) |
| إعلانات السنيور منذ يناير 2025 | +13.5% (الـ Mid انخفض 6.7%، الـ Entry انخفض 6.3%) | [Indeed Hiring Lab](https://hiringlab.indeed.com/2026/07/23/the-labor-market-is-tilting-toward-seniority/) |
| توظيف الخريجين الجدد في شركات التك الكبرى مقارنة بـ 2019 | −65% | [SignalFire 2026](https://www.signalfire.com/blog/signalfire-state-of-talent-report-2026) |
| علاوة الراتب للوظائف اللي بتطلب مهارات AI | +28% (≈ $18K سنويًا) | [Lightcast](https://lightcast.io/resources/blog/beyond-the-buzz-press-release-2025-07-23) |
| كود مولّد بالـ AI فيه ثغرة من OWASP Top 10 | 45% | [Veracode 2025](https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/) |
| نمو وظائف مطوري البرمجيات المتوقع 2024–2034 (أمريكا) | +15% | [BLS](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm) |

الأرقام مجمّعة من [صفحة Uvik](https://uvik.net/blog/ai-job-displacement-statistics/) اللي بتربط كل رقم بمصدره.

**الفرق الحقيقي بين Mid و Senior** مش عدد السنين ولا عدد التكنولوجيات، لكن:

| البُعد | Mid-level | Senior |
| --- | --- | --- |
| نطاق الشغل | تاسك أو فيتشر محدد | نظام كامل أو مجال (domain) |
| المشكلة | بتتسلّم معرّفة وواضحة | غامضة، وإنت اللي بتعرّفها وتقسّمها |
| القرار | بتنفّذ قرارات غيرك | بتاخد قرارات معمارية وتتحمل نتيجتها |
| الجودة | كودك إنت شغال | كود الفريق كله شغال وآمن وقابل للصيانة |
| التأثير | إنتاجيتك الشخصية | إنتاجية الفريق (مراجعة، معايير، توجيه) |
| الـ Production | بتحل الباج لما يوصلك | بتمنع الباج بالـ design والـ observability وبتقود الـ incident |

**إزاي الـ AI غيّر المعادلة:** الـ AI بيكتب الكود الروتيني أسرع منك، فقيمة "إنت بتعرف تكتب كود" نزلت. القيمة اللي طلعت: تعرف إمتى الـ AI غلط، تراجع وتأمّن الكود المولّد، تصمم النظام اللي الـ AI هيشتغل جواه، وتتحمل مسؤولية الـ production. [Addy Osmani](https://addyosmani.com/blog/next-two-years/) بيلخصها إن السنيور لازم يكون "حارس الجودة والتعقيد": architecture، security، scaling، ومراجعة كود الـ AI. الخريطة دي مبنية على الفكرة دي: كل مرحلة فيها الأساس اللي لازم تتقنه، والمستوى المتقدم اللي بيفرّقك كسنيور.

## المرحلة 1 — الأساسيات اللي السنيور لازم يشرحها مش بس يستخدمها

الاختبار هنا: تقدر تشرح الحاجة دي لجونيور في 5 دقايق من غير ما تفتح جوجل؟ لو لأ، فيه فجوة.

**JavaScript العميق**

- Event loop بالتفصيل: call stack، microtasks (Promises، queueMicrotask) vs macrotasks (setTimeout، I/O)، وليه `process.nextTick` بيسبق الـ Promise في Node
- Closures، prototype chain، `this` binding، hoisting، TDZ
- Promises من جوه: إزاي تكتب Promise.all / allSettled / race بإيدك، وإيه الفرق في الـ error handling
- Async iterators و generators و streams في الـ async flow
- Memory: garbage collection، memory leaks الشائعة (closures بتمسك references، listeners مش بتتشال، global caches)
- Modules: ESM vs CommonJS والفرق في الـ loading والـ interop

**TypeScript الحقيقي (مش بس type annotations)**

- Generics متقدمة، conditional types، mapped types، template literal types
- `unknown` vs `any`، narrowing، discriminated unions، exhaustive checks
- Utility types وتكتب بتاعتك: `DeepPartial`، `Result<T, E>`
- `satisfies`، `as const`، declaration merging، وإزاي تكتب types لـ library
- Strict mode كامل و `noUncheckedIndexedAccess`، وتعرف إمتى الـ types بتكلّفك أكتر ما بتفيدك

**Node.js internals**

- libuv والـ thread pool: إيه اللي بيتعمل على الـ main thread وإيه اللي بيروح الـ pool (fs، crypto، dns)
- Streams (Readable، Writable، Transform، pipeline) و backpressure — ده اللي بيفرّق بين API يقع تحت الضغط وواحد يستحمل
- Buffers و binary data، encoding
- `worker_threads` vs `cluster` vs child processes: إمتى كل واحد
- Error handling: `uncaughtException`، `unhandledRejection`، graceful shutdown، signals (SIGTERM)
- Node 22+ features: native `fetch`، test runner المدمج، `--watch`، permission model، `node:sqlite`

**HTTP والشبكات**

- HTTP/1.1 vs HTTP/2 vs HTTP/3، keep-alive، connection pooling
- Headers المهمة: caching (ETag، Cache-Control)، CORS بالتفصيل، content negotiation
- TLS handshake بشكل عام، certificates، إزاي الـ reverse proxy (Nginx) بيشتغل قدام Node
- WebSockets vs SSE vs long polling، وإمتى تستخدم كل واحد
- DNS، load balancers (L4 vs L7)، CDN

**Git وأدوات العمل**

- Rebase vs merge، interactive rebase، bisect، reflog، cherry-pick
- Branching strategy (trunk-based vs GitFlow) وإمتى كل واحدة
- Conventional commits، semantic versioning، monorepo tooling (pnpm workspaces، Turborepo، Nx)

**CS fundamentals اللي بتظهر في السنيور interviews**

- Big-O بجد: تقدر تحلل كود حقيقي مش بس أمثلة
- Data structures: hash maps، trees، heaps، graphs (BFS/DFS)، tries
- Concurrency concepts: race conditions، deadlocks، idempotency، atomicity

## المرحلة 2 — Backend متقدم: من "API شغال" إلى "نظام مصمم"

السنيور مش بيتقاس بعدد الـ frameworks اللي يعرفها، لكن بقدرته يختار المناسب ويبرر الاختيار. اعرف Express و Fastify و NestJS و Hono كويس، واعرف الـ trade-offs بينهم (Fastify أسرع وأقل magic، NestJS بيفرض structure مفيد للفرق الكبيرة، Hono خفيف وبيشتغل على edge runtimes).

**تصميم الـ APIs**

- REST بشكل صح: resource modeling، status codes، pagination (cursor vs offset)، filtering، versioning، idempotency keys للـ POST
- OpenAPI/Swagger كمصدر الحقيقة: contract-first، توليد types وclients منه
- GraphQL: schema design، N+1 والـ DataLoader، إمتى يستاهل وإمتى لأ
- gRPC و Protobuf للـ service-to-service
- Rate limiting (token bucket، sliding window)، API gateways
- Error contracts موحّدة (RFC 9457 Problem Details)

**Architecture و Code organization**

- Layered / Clean / Hexagonal architecture: فصل الـ domain عن الـ framework عن الـ infrastructure
- Domain-Driven Design الأساسي: entities، value objects، aggregates، bounded contexts، ubiquitous language
- SOLID و design patterns بشكل عملي (Repository، Strategy، Factory، Observer، CQRS)
- Dependency injection من غير framework، وبيها
- Modular monolith قبل microservices: معظم المشاريع المفروض تبدأ monolith منظم، والسنيور بيعرف إمتى يفصل

**Auth و Identity**

- Sessions vs JWT: الفرق في الـ revocation والـ storage، وليه JWT في localStorage غلط
- OAuth 2.1 و OpenID Connect: authorization code + PKCE، refresh token rotation
- Passkeys / WebAuthn (الاتجاه الحالي لتقليل الـ passwords)
- RBAC vs ABAC، multi-tenancy isolation
- Password hashing: argon2id أو bcrypt، وليه مش SHA
- Secrets management (Vault، AWS Secrets Manager)، مش `.env` في الـ production

**Performance في Node**

- Profiling: `--cpu-prof`، `--heap-prof`، clinic.js، flame graphs — تعرف تقيس قبل ما تحسّن
- Event loop lag monitoring، وإزاي تكتشف CPU-bound code بيبلوك الـ loop
- Connection pooling للـ DB، keep-alive للـ outbound HTTP (undici)
- Caching layers (in-memory → Redis → CDN) وcache invalidation
- Load testing بـ k6 أو autocannon، وتقرأ p50/p95/p99 مش الـ average

**Background jobs و Real-time**

- Queues: BullMQ على Redis للبساطة، RabbitMQ أو Kafka للـ scale — وتعرف الفرق بين queue و log
- Retries مع exponential backoff، dead-letter queues، idempotent consumers
- Cron / scheduled jobs بشكل موزّع (مش setInterval في server واحد)
- WebSockets على scale (Socket.IO مع Redis adapter)، SSE للـ streaming

**عملي:** ابني مشروع جانبي واحد بالمواصفات دي كاملة: modular monolith بـ NestJS أو Fastify + TypeScript strict، OpenAPI، OAuth + PKCE، BullMQ، Redis cache، load test موثّق. ده اللي بيفرّق سيرتك الذاتية عن 100 سيرة تانية مكتوب فيها "Node.js, Express, MongoDB".

## المرحلة 3 — قواعد البيانات: أكتر مكان بيفضح الفرق بين Mid و Senior

معظم مشاكل الـ production الحقيقية مشاكل data مش كود. السنيور بيعرف يقرأ query plan ويصمم schema يستحمل سنتين نمو.

**SQL (PostgreSQL أساسًا)**

- Normalization وإمتى تكسرها عمدًا (denormalization للقراءة)
- Indexes بجد: B-tree vs GIN vs BRIN، composite index وترتيب الأعمدة، partial indexes، covering indexes
- `EXPLAIN ANALYZE`: تقرأ seq scan vs index scan، nested loop vs hash join، وتعرف ليه الـ planner اختار كده
- Transactions و isolation levels (read committed، repeatable read، serializable) والمشاكل: dirty read، phantom read، lost update
- Locking: row locks، `SELECT ... FOR UPDATE`، deadlocks وإزاي تتجنبها، advisory locks
- Migrations آمنة بدون downtime: expand/contract pattern، إضافة index بـ `CONCURRENTLY`، تغيير نوع عمود على جدول كبير
- Postgres advanced: JSONB، full-text search، window functions، CTEs، partitioning، `LISTEN/NOTIFY`، pgvector للـ AI
- Connection pooling (PgBouncer) وليه مهم مع Node وserverless
- Replication (primary/replica)، read replicas، وتفهم replication lag

**ORMs و Query builders**

- Prisma و Drizzle و TypeORM و Knex: الفرق، وإمتى الـ ORM بيكتب query سيئ وإنت لازم تنزل raw SQL
- N+1 detection وحلّه بالـ joins أو batching

**NoSQL (MongoDB وغيره)**

- Document modeling: embedding vs referencing، والقاعدة: البيانات اللي بتتقري مع بعض تتخزن مع بعض
- Aggregation pipeline، indexes، schema validation
- إمتى MongoDB اختيار صح (schema مرن، write-heavy، documents مستقلة) وإمتى غلط (علاقات كتير، transactions معقدة)
- Key-value و wide-column (DynamoDB، Cassandra) بشكل عام: single-table design وإمتى تحتاجه

**Caching (Redis)**

- Data structures: strings، hashes، sorted sets، streams، وبنستخدم كل واحدة في إيه
- Patterns: cache-aside، write-through، write-behind، TTL strategies
- Cache stampede والحل (locking، early refresh)، cache invalidation بالـ tags أو versioning
- Redis كـ pub/sub، rate limiter، distributed lock (Redlock ومحدوديته)

**Messaging و Event-driven**

- Kafka: topics، partitions، consumer groups، offsets، exactly-once vs at-least-once
- Outbox pattern عشان تضمن إن الـ DB write والـ event يحصلوا مع بعض
- Event sourcing و CQRS: الفكرة، التكلفة، وإمتى تستاهل (نادرًا)
- Saga pattern للـ distributed transactions

**Data engineering خفيف للـ Full-Stack**

- ETL/ELT بسيط، batch processing، وتفهم إيه الفرق بين OLTP و OLAP
- Analytics DBs (ClickHouse، BigQuery) ولو مجرد تعرف إمتى بتحوّل التقارير ليها بدل ما تقتل الـ Postgres

**عملي:** خد جدول فيه 10 مليون صف (ولّدهم بسكريبت)، اكتب 5 queries بطيئة، وحسّنها بالـ indexes والـ rewriting ووثّق الـ before/after من `EXPLAIN ANALYZE`. ده تمرين واحد بيعلّمك أكتر من 10 كورسات.

## المرحلة 4 — Frontend للـ Full-Stack: عمق كافي عشان تاخد قرارات، مش بس تنفّذ

كـ Full-Stack مش مطلوب منك تكون أعمق frontend engineer في الفريق، لكن مطلوب تفهم الـ rendering والـ performance والـ data flow عشان تصمم الـ API والـ architecture صح. React هو الأساس في السوق، و Next.js هو الـ framework الأكتر طلبًا معاه.

**React العميق**

- Rendering model: reconciliation، keys، إمتى الـ component بيعمل re-render فعلًا، و React Compiler (بيلغي معظم memo/useCallback اليدوي)
- Hooks من جوه: rules of hooks وليه، custom hooks كوحدة إعادة استخدام، `useEffect` vs `useLayoutEffect` vs `useSyncExternalStore`
- Server Components (RSC) vs Client Components: الحدود، الـ serialization، وإيه اللي بيروح للـ bundle
- Suspense، streaming، transitions، `use()` API، Server Actions / Server Functions
- Error boundaries وتصميم الـ loading/error states

**Next.js (App Router)**

- Rendering strategies: SSG، SSR، ISR، streaming، Partial Prerendering — وتختار لكل صفحة
- Caching layers في Next (fetch cache، data cache، router cache) — ده أكتر مكان الناس بتغلط فيه
- Route handlers، middleware، edge runtime vs Node runtime
- Monorepo بيجمع الـ backend والـ frontend بـ shared types (tRPC أو OpenAPI-generated client)

**State و Data fetching**

- Server state (TanStack Query، SWR) منفصل عن client state (Zustand، Jotai) — وليه Redux بقى نادر في المشاريع الجديدة
- Caching، invalidation، optimistic updates، infinite queries
- Forms: React Hook Form + Zod للـ validation المشتركة بين الـ frontend والـ backend

**Performance و Web Vitals**

- Core Web Vitals: LCP، INP، CLS — وتعرف تقيسها (Lighthouse، WebPageTest) وتحسّنها
- Code splitting، lazy loading، bundle analysis، tree shaking
- Images (next/image، formats، sizes)، fonts loading، third-party scripts
- Rendering performance: virtualization للـ lists الطويلة، avoiding layout thrashing

**CSS و Design systems**

- Tailwind كـ default في السوق، CSS Modules، وتفهم الـ cascade و specificity و container queries
- Component libraries: shadcn/ui (Radix)، وتعرف تبني design system صغير بـ tokens
- Accessibility (a11y): semantic HTML، ARIA الأساسي، keyboard navigation — ده بيتسأل في السنيور interviews

**Testing في الـ Frontend**

- Vitest + React Testing Library للـ components، Playwright للـ E2E
- Storybook للـ component documentation والـ visual testing

**Build tooling**

- Vite، esbuild، Turbopack: تفهم إيه اللي بيحصل في الـ build، وتقدر تعمل debug لمشكلة في الـ bundler

**عملي:** حوّل الـ frontend بتاع المشروع الجانبي بتاعك لـ Next.js App Router بـ RSC، وحقّق LCP تحت 2.5 ثانية على mobile في Lighthouse، ووثّق إزاي.

## المرحلة 5 — Testing و Observability و Security: اللي بيخلي الفريق يثق فيك على الـ production

التلاتة دول هما أكتر حاجة بتميّز السنيور في عصر الـ AI: الـ AI بيكتب كود كتير، وحد لازم يتأكد إنه صح وآمن ومراقَب.

**Testing كاستراتيجية مش كعدد tests**

- Testing trophy: integration tests هي الأغلى قيمة في الـ backend، unit tests للـ domain logic، E2E قليلة ومركزة على الـ critical flows
- Vitest أو Jest أو Node test runner المدمج؛ Supertest للـ API؛ Testcontainers عشان تختبر على Postgres/Redis حقيقي بدل mocks
- Mocking بحكمة: mock الحدود الخارجية (payment API) مش الـ DB
- Contract testing (Pact) بين الـ services، snapshot tests بحذر
- Test data builders / factories، deterministic tests (مفيش `Date.now()` مباشر)
- Property-based testing (fast-check) للـ logic المعقد
- Mutation testing (Stryker) عشان تعرف الـ tests بتاعتك بتمسك إيه فعلًا
- Flaky tests: تشخيصها وعلاجها بدل ما تعمل retry

**Observability (مش بس logging)**

- التلات أعمدة: logs (structured JSON بـ pino)، metrics (Prometheus format)، traces (OpenTelemetry)
- OpenTelemetry في Node: auto-instrumentation، context propagation عبر الـ services، exporters (Jaeger، Grafana Tempo، Datadog)
- RED metrics لكل service: Rate، Errors، Duration — و USE للـ resources
- SLIs/SLOs/error budgets: تعرّف "النظام شغال كويس" برقم
- Alerting على الأعراض (latency، error rate) مش على الأسباب (CPU)، وتجنّب alert fatigue
- Correlation IDs من الـ request لحد الـ DB query، وتعرف تعمل debug لـ incident من الـ traces
- Health checks (liveness vs readiness) و graceful shutdown
- Error tracking (Sentry) مع source maps وrelease tagging

**Security (OWASP وأبعد)**

- OWASP Top 10 بتطبيق عملي في Node: injection (SQL/NoSQL/command)، broken auth، SSRF، insecure deserialization، security misconfiguration
- Input validation على الحدود (Zod)، output encoding، CSP headers، helmet
- Supply chain: `npm audit`، lockfiles، Socket/Snyk، pinning، وتفهم إن npm packages هي أكبر مصدر خطر في مشاريع Node
- Secrets: مفيش secrets في الكود أو الـ Docker image، rotation، least privilege للـ IAM
- Rate limiting، brute-force protection، account lockout، CAPTCHA على الـ sensitive endpoints
- Data protection: encryption at rest/in transit، PII handling، GDPR أساسيات، audit logs
- Security في الكود المولّد بالـ AI: الدراسات بتقول حوالي 45% منه فيه ثغرة OWASP — اعمل review إلزامي وأضف SAST (Semgrep، CodeQL) في الـ CI
- Threat modeling بسيط لكل feature حساسة: مين ممكن يهاجم، إزاي، وإيه الأثر

**عملي:** على المشروع بتاعك: coverage مش أقل من 80% على الـ domain بـ Testcontainers، OpenTelemetry traces كاملة ظاهرة في Grafana، وتقرير Semgrep نظيف في الـ CI.

## المرحلة 6 — DevOps والـ Cloud: الكود اللي مش بيتنشر بأمان مش منتج

السنيور الـ Full-Stack مش DevOps engineer، لكنه بيقدر ينشر نظامه بنفسه ويفهم فاتورة الـ cloud ويعمل debug لمشكلة في الـ container. اختار cloud واحد (AWS هو الأكتر طلبًا) واتعمّق فيه، واعرف المقابل في الباقي بشكل عام.

**Docker بإتقان**

- Multi-stage builds لـ Node: image صغيرة (distroless أو alpine)، non-root user، `.dockerignore`، layer caching الصح (copy `package.json` قبل الكود)
- Docker Compose للـ local dev بكل الـ dependencies (Postgres، Redis، Kafka)
- Health checks، resource limits، signals و `tini` عشان الـ graceful shutdown يشتغل
- Image scanning (Trivy) و SBOM

**CI/CD**

- GitHub Actions (أو GitLab CI): pipelines بتعمل lint → typecheck → test → build → scan → deploy
- Caching في الـ CI، matrix builds، reusable workflows، secrets handling
- Deployment strategies: rolling، blue/green، canary، feature flags (LaunchDarkly أو Unleash أو بتاعك)
- Rollback plan دايمًا، و database migrations كخطوة منفصلة قبل الـ deploy
- Trunk-based development مع preview environments لكل PR

**Kubernetes (المستوى المطلوب للـ Full-Stack senior)**

- المفاهيم: Pod، Deployment، Service، Ingress، ConfigMap، Secret، HPA، liveness/readiness probes
- تكتب manifests أو Helm chart لتطبيقك، وتعمل debug بـ `kubectl logs/describe/exec`
- تفهم resource requests/limits وليه Node بيتقتل بـ OOM لو مظبطتش `--max-old-space-size`
- مش مطلوب تدير cluster، مطلوب تنشر عليه وتشخّص

**Cloud (AWS كمثال)**

- Compute: EC2 vs ECS/Fargate vs Lambda vs EKS — وتختار حسب الـ workload والتكلفة
- Networking: VPC، subnets، security groups، ALB/NLB، CloudFront، Route 53
- Data: RDS (Postgres)، ElastiCache، S3 (presigned URLs، lifecycle)، SQS/SNS
- IAM بالـ least privilege، وتقدر تكتب policy
- Cost awareness: تقرأ الـ bill وتعرف إيه اللي بيكلّف
- Serverless trade-offs: cold starts في Node، connection pooling مع Lambda، إمتى يستاهل

**Infrastructure as Code**

- Terraform (أو Pulumi بـ TypeScript، وده مناسب جدًا لـ Node developer): modules، state management، plan/apply workflow
- Environments (dev/staging/prod) متطابقة من نفس الكود

**Platforms الحديثة**

- Vercel، Railway، Fly.io، Cloudflare Workers: تعرف إمتى تستخدمهم بدل AWS المباشر، وإمتى الـ vendor lock-in بيكلّف
- Edge runtimes والفرق بينها وبين Node الكامل (مفيش `fs`، APIs محدودة)

**Linux أساسي**

- Shell مريح، `systemd`، `journalctl`، `ss/netstat`، `top/htop`، file permissions، SSH، تعمل debug لـ server بيعمل 100% CPU

**عملي:** انشر المشروع بتاعك على AWS بـ Terraform: ECS Fargate + RDS + ElastiCache + ALB + CloudFront، مع GitHub Actions بتعمل canary deploy. وثّق التكلفة الشهرية.

## المرحلة 7 — System Design و Distributed Systems: المهارة اللي بتتقاس في كل senior interview

دي المهارة اللي الـ AI مش بيعوّضها، وهي أهم فاصل في الـ interviews والترقيات. المطلوب مش تحفظ تصميم Twitter، لكن تمتلك طريقة تفكير: تعرّف المتطلبات، تقدّر الأرقام، تختار الـ trade-offs، وتبرر.

**طريقة التفكير**

1. Requirements: functional وnon-functional (latency، availability، consistency، scale)
2. Back-of-the-envelope estimation: QPS، storage، bandwidth — تعرف إن 1M user يومي ≈ 12 QPS متوسط و \~100 QPS peak
3. High-level design: الـ components والـ data flow
4. Deep dive على الأجزاء الحرجة والـ bottlenecks
5. Trade-offs صريحة: ليه ده مش ده، وإيه اللي هيكسر الأول

**المفاهيم الأساسية**

- CAP وPACELC بشكل عملي: إمتى تضحّي بالـ consistency وإمتى لأ
- Consistency models: strong، eventual، causal؛ read-your-writes
- Scaling: vertical vs horizontal، stateless services، sticky sessions وليه تتجنبها
- Load balancing algorithms، service discovery، health-based routing
- Database scaling: replication، sharding (key choice، hot partitions، resharding)، consistent hashing
- Caching على كل مستوى (client، CDN، app، DB) ومتى كل واحد بيخلّص
- Async processing: queues، event-driven، backpressure
- Idempotency و exactly-once semantics (وليه فعليًا at-least-once + idempotent)
- Distributed transactions: 2PC، Saga، outbox
- Consensus بشكل عام (Raft) وليه بتحتاجه في leader election
- Resilience patterns: timeouts، retries مع jitter، circuit breaker، bulkhead، rate limiting، graceful degradation
- Microservices vs modular monolith: التكلفة الحقيقية للـ microservices (network، observability، data ownership) وإمتى تستاهل
- API gateway، BFF pattern، service mesh (مفهوم)

**تصميمات لازم تعرف تعملها على السبورة**

| النظام | المفهوم اللي بيختبره |
| --- | --- |
| URL shortener | hashing، key generation، read-heavy caching |
| Rate limiter موزّع | Redis، sliding window، consistency |
| Notification system | queues، fan-out، retries، idempotency |
| Chat / real-time | WebSockets على scale، presence، message ordering |
| News feed | fan-out on write vs on read، caching، ranking |
| File storage / upload | presigned URLs، chunking، CDN، metadata DB |
| Payment system | idempotency، exactly-once، ledger، reconciliation |
| Search / autocomplete | inverted index، tries، Elasticsearch |
| Multi-tenant SaaS | isolation strategies، noisy neighbor، billing |

**مصادر** (كتب/مراجع ثابتة): Designing Data-Intensive Applications (Kleppmann) — الكتاب الأهم، System Design Interview (Alex Xu) ج1 و ج2، ومدونات engineering الشركات (Netflix، Uber، Stripe، Discord).

**عملي:** كل أسبوع صمّم نظام واحد من الجدول في 45 دقيقة بصوت عالي (سجّل نفسك)، واكتب design doc صفحة واحدة بالـ trade-offs. بعد 3 شهور هتلاقي طريقة تفكيرك اتغيرت.

## المرحلة 8 — مهارات الـ AI للمهندس: مش هتبقى ML engineer، هتبقى المهندس اللي بيبني بالـ AI وبيبني منتجات AI

فيه نوعين من المهارات، والاتنين مطلوبين: (1) تستخدم الـ AI عشان تبني أسرع وأحسن، و(2) تبني features وأنظمة فيها LLMs. الوظائف اللي بتطلب مهارات AI بتدفع حوالي 28% أكتر ([Lightcast](https://lightcast.io/resources/blog/beyond-the-buzz-press-release-2025-07-23))، وكـ Node developer إنت في موقع ممتاز لأن معظم الـ AI products هي في الآخر APIs وstreams وqueues.

**أ) AI-assisted engineering (إزاي تشتغل)**

- Agentic coding tools (Claude Code، Cursor، Copilot agents): تشتغل بيهم على tasks كاملة مش autocomplete، وتكتب context files (`CLAUDE.md` / `AGENTS.md`) بتوصف الـ codebase والـ conventions
- Spec-first workflow: تكتب الـ spec والـ acceptance criteria قبل ما الـ AI يكتب كود، وتراجع بالـ tests مش بالعين
- تعرف إمتى الـ AI غلط: الدراسات بتقول المهندسين الخبرة بيبقوا أبطأ بالـ AI على codebases معقدة لو ما عرفوش يديروه ([METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)) — فالمهارة هي الـ judgment مش الـ prompt
- Code review لكود الـ AI كمهارة مستقلة: security، edge cases، تكرار، over-engineering
- تبني سكريبتات وautomations صغيرة بالـ AI لشغل الفريق (migrations، test generation، docs)

**ب) بناء منتجات بالـ LLMs (إيه اللي تبنيه)**

- LLM APIs من Node: streaming responses (SSE)، tool/function calling، structured outputs (JSON schema + Zod)، token counting والتكلفة
- Prompt engineering كـ engineering: system prompts، few-shot، prompt versioning، وتعاملها كـ code له tests
- RAG بشكل صح: chunking strategies، embeddings، vector DB (pgvector أول اختيار، Pinecone/Qdrant للـ scale)، hybrid search (BM25 + vectors)، reranking، وتقيس الـ retrieval quality
- Agents: ReAct loop، tool use، state management، guardrails، human-in-the-loop، وإمتى الـ agent فكرة سيئة (workflow ثابت أحسن)
- MCP (Model Context Protocol): تبني MCP server بـ TypeScript يعرّض بيانات شركتك للـ AI tools — ده بقى skill مطلوب فعليًا
- Frameworks: Vercel AI SDK (الأكتر عملية في Node/Next)، LangChain.js و LangGraph (اعرفهم، ومتعتمدش عليهم في كل حاجة)
- Evaluation: evals datasets، LLM-as-judge، regression tests للـ prompts، A/B testing — ده الفرق بين demo ومنتج
- Observability للـ LLM apps: tracing الـ calls (Langfuse، LangSmith، OpenTelemetry GenAI conventions)، التكلفة لكل request، latency
- Safety وSecurity: prompt injection، data leakage، PII redaction، rate limiting على الـ AI endpoints، content moderation
- Cost engineering: caching (prompt caching، semantic cache)، model routing (نموذج صغير للـ simple، كبير للـ complex)، batching

**ج) فهم أساسي للـ ML (مش عمق)**

- إزاي الـ transformers بتشتغل على مستوى المفهوم، tokens، context window، temperature، embeddings
- Fine-tuning vs RAG vs prompting: إمتى كل واحد
- تقرأ model card وبنشمارك وتفهم إيه اللي بيتقاس

**عملي:** ضيف للمشروع بتاعك feature واحدة حقيقية بالـ AI (مثلًا: مساعد بيجاوب على بيانات المستخدم بـ RAG على pgvector) بـ streaming وtool calling وevals وtracing. وابني MCP server صغير بيعرّض الـ API بتاعك. دول اتنين من أقوى الحاجات تحطها في البورتفوليو في 2026.

## المرحلة 9 — المهارات غير التقنية: السنيور بيتقاس بأثره على الفريق مش بكوده

في معظم الشركات الترقية لـ Senior بتتوقف على المحور ده أكتر من أي حاجة تقنية. الـ Mid بيحل مشكلة، السنيور بيخلي الفريق كله يحل مشاكل أحسن.

**Ownership**

- تمتلك feature أو domain من الفكرة للـ production ولما بعد الإطلاق (metrics، bugs، on-call)
- تقول "أنا هتأكد إن ده هيخلص" وتقفل الـ loops بدل ما تستنى حد يفكّرك
- تجيب الأخبار الوحشة بدري: "ده هيتأخر، وده البديل"

**Technical communication**

- تكتب design docs / RFCs: المشكلة، الخيارات، الـ trade-offs، القرار، والمخاطر — في صفحة أو اتنين
- ADRs (Architecture Decision Records) عشان القرارات ما تضيعش
- تشرح لغير التقنيين (product، business) بلغتهم: الأثر والوقت والمخاطر، مش الـ implementation
- تكتب PR descriptions وcommit messages اللي بتخلي الـ review سهل

**Code review كقيادة**

- تراجع عشان الـ design والـ edge cases والـ security، مش الـ formatting (ده شغل الـ linter)
- تفرّق بين blocking وnit، وتشرح "ليه" مش بس "إيه"
- تعلّم في الـ review بدل ما تصلّح بنفسك

**Mentorship**

- مع قلة الجونيور في السوق، الشركات بتدوّر على سنيور يقدر يرفع مستوى اللي حواليه ([Addy Osmani](https://addyosmani.com/blog/next-two-years/) بيعتبر ده من أهم أدوار السنيور في السنتين الجايين)
- Pair programming، onboarding docs، تحدد للجونيور إمتى يستخدم الـ AI وإمتى يكتب بإيده

**Scoping و Estimation**

- تقسّم مشروع غامض لـ milestones قابلة للتسليم، وتحدد الـ MVP الحقيقي
- تقدّر بنطاق (3–5 أيام) مش رقم واحد، وتوضّح الافتراضات
- تقول "لأ" أو "مش دلوقتي" بأسباب تقنية ومنتجية

**Product و Business sense**

- تفهم ليه الـ feature بتتبني، ومين المستخدم، وإيه الـ metric اللي بتتحرك
- تقترح حلول أبسط بتوصل لنفس الهدف بربع التكلفة

**Incident management**

- تقود incident بهدوء: communication، mitigation أولًا، root cause بعدين
- تكتب blameless postmortem بـ action items حقيقية

**Influence بدون سلطة**

- تقنع بالـ data والـ prototypes مش بالصوت العالي
- تبني consensus قبل الاجتماع مش فيه

**عملي:** اكتب RFC واحد حقيقي في شغلك الحالي لقرار تقني معلّق، وقدّمه. واتطوّع تقود الـ postmortem الجاي. دول أسرع طريقتين تتشاف كسنيور قبل اللقب.

## خطة 12 شهر + مؤشرات إنك بقيت Senior

بـ 4 سنين خبرة إنت مش محتاج تتعلم كل اللي فوق من الصفر، محتاج تسد الفجوات وتثبّتها بأدلة ملموسة. الخطة دي مبنية على مشروع جانبي واحد بيكبر كل ربع، لأن مشروع واحد عميق أقوى في الـ interviews من 5 مشاريع سطحية.

&#91;embedded content: خطة 12 شهر · 4 أرباع، 3 بوابات\]

الترتيب مقصود: العمق الأول عشان الباقي يتبني عليه، والـ AI في الربع 3 عشان تبنيه على backend ناضج، والربع الأخير كله عن إثبات المستوى في الشغل الحقيقي.

**الإيقاع الأسبوعي المقترح (10–12 ساعة)**

- 4 ساعات: المشروع الجانبي (بناء + توثيق)
- 3 ساعات: دراسة موجّهة (كتاب / docs / كورس واحد في الوقت)
- 2 ساعة: تمرين system design أو قراءة engineering blog + كتابة ملخص
- 1–2 ساعة: مشاركة (مقال قصير، إجابة على سؤال، open source)

**مؤشرات إنك بقيت Senior (مش لقب، سلوك)**

- [ ] بتتسلّم مشكلة غامضة وبتطلّع منها design doc وmilestones من غير ما حد يفصّل لك
- [ ] الفريق بيجيلك لما الـ production يقع، وإنت بتقود الـ incident بهدوء
- [ ] مراجعاتك للكود بتمسك design وsecurity issues مش formatting
- [ ] بتقول "لأ" لتصميم بأسباب تقنية ومنتجية وبتقترح أبسط
- [ ] جونيور أو mid في فريقك اتحسّن بسببك بشكل واضح
- [ ] تقدر تشرح الـ trade-off في أي قرار تقني اتاخد في السيستم بتاعكم
- [ ] بتستخدم الـ AI كـ multiplier وبتعرف تمسك أغلاطه، وبتحدد للفريق إمتى يستخدمه
- [ ] بورتفوليو فيه نظام واحد منشور كامل: auth، queues، observability، IaC، وfeature AI

**لو عايز تثبت المستوى للسوق (مش بس لشغلك)**

- اكتب 6–10 مقالات تقنية عميقة من اللي اتعلمته (الـ Postgres tuning، الـ RAG evals) — بتتفحص أكتر من أي شهادة
- حضّر لـ senior interviews: coding (medium/hard بشكل مريح)، system design (الجدول في المرحلة 7)، behavioral (قصص STAR عن ownership وconflict وfailure)
- Open source: PR واحد مقبول في مكتبة بتستخدمها بيقول كتير

## المصادر

صفحات تم فتحها فعليًا بتاريخ 1 نوفمبر 2026:

- [AI Job Displacement Statistics 2026 — Uvik](https://uvik.net/blog/ai-job-displacement-statistics/): تجميع للأرقام مع روابط المصادر الأولية
- [Indeed Hiring Lab — AI and job postings: from destruction to creation](https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/)
- [Indeed Hiring Lab — The labor market is tilting toward seniority](https://hiringlab.indeed.com/2026/07/23/the-labor-market-is-tilting-toward-seniority/)
- [SignalFire State of Talent Report 2026](https://www.signalfire.com/blog/signalfire-state-of-talent-report-2026)
- [Lightcast — AI skills wage premium](https://lightcast.io/resources/blog/beyond-the-buzz-press-release-2025-07-23)
- [Veracode 2025 GenAI Code Security Report](https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/)
- [METR — AI tools and experienced developers (2025)](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [U.S. BLS — Software Developers Occupational Outlook](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm)
- [Addy Osmani — The Next Two Years of Software Engineering](https://addyosmani.com/blog/next-two-years/)

محتوى المراحل التقنية (1–9) مبني على الممارسات القياسية في الصناعة ووثائق الأدوات نفسها، مش على مصدر واحد؛ الكتب المذكورة في المرحلة 7 هي المرجع الأعمق للـ system design.
