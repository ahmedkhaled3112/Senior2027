# 04 — Node.js

> **ليه القسم ده:** ده الـ core بتاعك كـ Full-Stack Node developer. الفرق بين Mid و Senior هنا: الـ Mid بيعرف Express، السنيور بيعرف إيه اللي بيحصل تحت Express (libuv، streams، backpressure)، وبيعرف ليه الـ API بيقع تحت الضغط وإزاي يمنعه.
>
> **الوقت التقريبي:** 4 أسابيع · **المصدر الأنسب:** [Node.js docs](https://nodejs.org/docs/latest/api/) + Node.js Design Patterns (Casciaro) + [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
القسم ده عملي جدًا: كل بند اكتب له سكريبت صغير وشغّله.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 إيه هو Node
- [ ] Node = V8 (JS engine) + libuv (event loop و async I/O) + core libs (C++ bindings) — ترسم الصورة
- [ ] Single-threaded JS على event loop، وليه ده مناسب للـ I/O-bound مش الـ CPU-bound
- [ ] الفرق عن المتصفح: مفيش DOM، فيه `fs` و `process`، globals مختلفة
- [ ] Node versions و LTS schedule (even = LTS)، `.nvmrc`/`.node-version`، `engines` في `package.json`
- [ ] `node`، `npm`، `npx`، REPL، تشغيل ملف، `--watch`

### 1.2 Globals و process
- [ ] `globalThis`، `process`، `Buffer`، `console`، timers، `URL`، `fetch` (native من Node 18)
- [ ] `__dirname`/`__filename` (CJS) vs `import.meta.url` + `fileURLToPath` (ESM)
- [ ] `process.argv`، `process.env`، `process.exit()` و exit codes، `process.cwd()`
- [ ] `--env-file` (Node 20+) بدل `dotenv`

### 1.3 Core modules الأساسية
- [ ] `fs`: الـ 3 أشكال (sync، callback، `fs/promises`) وليه الـ sync ممنوع في server code
- [ ] `path`: `join` vs `resolve`، `basename/dirname/extname`، cross-platform
- [ ] `os`: `cpus()`، `platform()`، `homedir()`
- [ ] `url`: WHATWG `URL` و `URLSearchParams`
- [ ] `events`: `EventEmitter` — `on/once/emit/off`، الـ `error` event وليه لازم listener له
- [ ] `util`: `promisify`، `inspect`، `format`، `util.types`
- [ ] `crypto` الأساسي: `randomUUID`، `randomBytes`، `createHash`

### 1.4 Modules و Packages
- [ ] CJS vs ESM في Node: `"type": "module"`، extensions `.mjs/.cjs`، `require` vs `import`
- [ ] `package.json` الأساسي: `name`، `version`، `main`، `scripts`، `dependencies`، `devDependencies`
- [ ] npm: `install`، lockfile (`package-lock.json`)، `npm ci` vs `npm install`، semver
- [ ] `node_modules` resolution algorithm كمفهوم

### 1.5 HTTP server أساسي
- [ ] Server بـ `http.createServer` الخام: `req` (stream)، `res.writeHead/end`، routing يدوي — **عشان تفهم إيه اللي الـ framework بيعمله**
- [ ] Express الأساسي: `app.get/post`، `req.params/query/body`، `express.json()`، `res.json/status/send`
- [ ] Middleware model: `(req, res, next)`، الترتيب بيفرق، `app.use`
- [ ] Error middleware: `(err, req, res, next)` بالأربع arguments
- [ ] Static files، CORS الأساسي (`cors` package)
- [ ] Environment config: dev vs prod، ports

### 1.6 Databases أساسي
- [ ] تتصل بـ Postgres بـ `pg` وتعمل query بـ parameterized queries (`$1`) — وليه الـ string concatenation = SQL injection
- [ ] تتصل بـ MongoDB بالـ driver أو Mongoose
- [ ] Redis بـ `ioredis`: `get/set/expire`

### 1.7 Error handling أساسي
- [ ] `try/catch` مع async/await في route handlers
- [ ] Async errors في Express 4 (لازم `next(err)` أو wrapper) vs Express 5 (بيمسكها)
- [ ] `unhandledRejection` و `uncaughtException`: إيه هما وليه بيوقّعوا الـ process

---

## 🟡 المستوى 2 — المتوسط

### 2.1 الـ Event loop بالتفصيل
- [ ] **Event loop phases**: timers → pending callbacks → poll → check (`setImmediate`) → close callbacks — ترسمها وتعرف إيه بيتنفذ في كل phase
- [ ] `process.nextTick` queue و microtask queue: بيتنفذوا بين كل phase والتانية، و `nextTick` قبل الـ Promises
- [ ] الترتيب الكامل: `nextTick` → microtasks → timers → ... → `setImmediate` — تمرين: `setTimeout(0)` vs `setImmediate` (الترتيب مش مضمون في الـ main module، مضمون جوه I/O callback — وليه)
- [ ] **libuv thread pool**: إيه اللي بيروحله (`fs`، `dns.lookup`، `crypto.pbkdf2/scrypt`، `zlib`) وإيه اللي مش بيروحله (network I/O بيستخدم epoll)
- [ ] `UV_THREADPOOL_SIZE` (default 4) وإمتى تزوّده
- [ ] **Blocking the event loop**: أمثلة حقيقية (`JSON.parse` لملف 50MB، regex سيئ، `fs.readFileSync`، loop على مليون عنصر، `bcrypt` sync) — وإزاي تكتشفه (event loop lag) وتعالجه (worker، chunking، streaming)

### 2.2 Streams (المهارة اللي بتفرّق)
- [ ] الأنواع الأربعة: `Readable`، `Writable`، `Duplex`، `Transform`
- [ ] ليه streams: معالجة ملف 2GB من غير ما تحمّله في الـ memory
- [ ] `pipe` vs **`pipeline`** (وليه `pipeline` أحسن: error handling و cleanup)
- [ ] **Backpressure**: `write()` بترجع `false`، الـ `drain` event، `highWaterMark` — تشرح إيه اللي بيحصل لو تجاهلتها (memory بتكبر لحد ما الـ process يقع)
- [ ] Object mode streams
- [ ] تكتب `Transform` stream بإيدك (مثلًا CSV → JSON line by line)
- [ ] Async iteration على streams: `for await (const chunk of stream)`
- [ ] `Readable.from()`، `stream/promises`
- [ ] Web Streams (`ReadableStream`) vs Node streams والتحويل بينهم (`Readable.toWeb/fromWeb`)
- [ ] HTTP request/response كـ streams: streaming response للـ client، streaming upload للـ S3

### 2.3 Buffers و Binary
- [ ] `Buffer.from/alloc/allocUnsafe` (وليه `allocUnsafe` خطر)
- [ ] Encodings: `utf8`، `base64`، `hex`، `binary`/`latin1`
- [ ] `buf.toString()`، slicing (shared memory!)، `Buffer.concat`
- [ ] Multi-byte characters والـ chunk boundaries (ليه `chunk.toString()` ممكن يكسر emoji) — و `StringDecoder`
- [ ] Binary protocols بسيطة: `readUInt32BE`، `writeInt16LE`

### 2.4 Core modules متوسطة
- [ ] `fs` متقدم: `createReadStream/createWriteStream`، `fs.watch` ومشاكله، `fs.stat`، atomic writes (write temp + rename)
- [ ] `http` متقدم: `http.Agent` و keep-alive، timeouts (`server.timeout`، `headersTimeout`، `requestTimeout`)، `server.close()` vs `closeAllConnections()`
- [ ] `https` و certificates في dev (self-signed، `mkcert`)
- [ ] `http2` كمفهوم وإمتى
- [ ] `child_process`: `exec` (shell، buffered — وخطر command injection) vs `execFile` vs `spawn` (stream) vs `fork` (Node + IPC)، `stdio` options
- [ ] `zlib`: gzip/brotli streams، compression middleware
- [ ] `dns`: `lookup` (thread pool، OS) vs `resolve` (network، c-ares)
- [ ] `readline` للـ line-by-line processing والـ CLI prompts
- [ ] `assert` و `node:test` runner المدمج (`describe/it/mock`)
- [ ] `node:sqlite` (Node 22+)

### 2.5 Frameworks
- [ ] **Express بعمق**: `express.Router` والـ mounting، `app.param`، `res.locals`، trust proxy، الـ order في الـ middleware stack، Express 5 changes
- [ ] **Fastify**: plugins و encapsulation (الـ scope tree)، `register`، decorators، hooks lifecycle (`onRequest` → `preHandler` → `onSend` ...)، schema validation بـ JSON Schema و serialization (fast-json-stringify) — **وليه أسرع من Express** (schema-based serialization، radix tree router، no middleware overhead)
- [ ] **NestJS**: modules، providers و DI container، controllers، pipes (validation)، guards (auth)، interceptors (logging/transform)، exception filters، middleware — وإمتى يستاهل (فريق كبير، structure مفروض) وإمتى over-engineering
- [ ] Hono و Koa كمفهوم: الـ `ctx` model، الـ edge compatibility
- [ ] القرار: تقدر تبرر اختيار framework لمشروع بالـ trade-offs مش بالـ hype

### 2.6 Request lifecycle و API design
- [ ] Parsing: body (JSON، urlencoded، multipart)، limits (`limit: '1mb'`) وليه لازم
- [ ] **Validation على الحدود**: Zod أو JSON Schema، وتفصل الـ validation error عن الـ server error
- [ ] Serialization: `res.json` و `JSON.stringify` cost، `toJSON` على الـ models
- [ ] REST design: resource naming (nouns، plural)، verbs صح، status codes صح (201 vs 200، 204، 400 vs 422، 401 vs 403، 409)
- [ ] Pagination: offset vs **cursor-based** (وليه cursor أحسن على scale)، filtering، sorting
- [ ] Versioning: URL (`/v1`) vs header، وإمتى تعمل version جديد
- [ ] HATEOAS كمفهوم (ونادر)
- [ ] Error contracts موحّدة: RFC 9457 Problem Details (`type`، `title`، `status`، `detail`، `instance`)
- [ ] Idempotency keys للـ POST (payments، orders)
- [ ] CORS بالتفصيل: preflight، `Access-Control-*` headers، credentials، وليه مش security feature للـ server
- [ ] Compression، ETag و conditional requests، static files caching

### 2.7 Authentication و Authorization
- [ ] **Sessions + cookies**: `express-session`، session store (Redis مش memory)، cookie flags (`HttpOnly`، `Secure`، `SameSite=Lax/Strict`)، session fixation
- [ ] **JWT**: structure (header.payload.signature)، HS256 (shared secret) vs RS256/ES256 (public key)، claims (`exp`، `iat`، `sub`، `aud`، `iss`)، الـ `alg: none` attack
- [ ] Access token قصير + refresh token طويل، refresh token rotation، reuse detection
- [ ] **Revocation**: ليه JWT صعب يتلغي، والحلول (short expiry، denylist في Redis، token versioning)
- [ ] Sessions vs JWT: الحكم (sessions للـ web app العادي، JWT للـ stateless/microservices/mobile) — وليه JWT في `localStorage` غلط (XSS)
- [ ] **Password hashing**: `argon2id` (الأفضل) أو `bcrypt`، salt (تلقائي)، pepper، cost factor — وليه مش SHA256
- [ ] `crypto.timingSafeEqual` للمقارنات (timing attacks)
- [ ] OAuth 2.0 / OIDC: authorization code flow + PKCE، الـ roles (resource owner، client، auth server)، scopes، `id_token` vs `access_token`
- [ ] Social login عمليًا: Passport.js أو Auth.js أو Lucia أو يدوي
- [ ] API keys: generation، hashing في الـ DB، scoping، rotation
- [ ] HMAC-signed requests (webhooks verification — Stripe style)
- [ ] mTLS كمفهوم للـ service-to-service
- [ ] RBAC (roles → permissions) vs ABAC (attributes/policies)، وتكتب middleware `requirePermission('orders:write')`
- [ ] Policy engines كمفهوم: Casbin، OPA
- [ ] Multi-tenancy: tenant resolution (subdomain، header، JWT claim)، data isolation في كل query، الـ "forgot the tenant filter" bug

### 2.8 Databases من Node
- [ ] Connection pooling: `pg.Pool` settings (`max`، `idleTimeoutMillis`)، pool exhaustion وأعراضه، pool size الصح (مش كبير = أحسن)
- [ ] Transactions من الكود: `BEGIN/COMMIT/ROLLBACK` على نفس الـ client من الـ pool (مش الـ pool)
- [ ] ORMs/query builders: Prisma (schema-first، DX ممتاز، raw escape hatch)، Drizzle (SQL-like، lightweight، type-safe)، TypeORM (decorators، ActiveRecord/DataMapper)، Knex (query builder بس)، Mongoose — الـ trade-offs وإمتى كل واحد
- [ ] إمتى الـ ORM بيكتب query سيئ وإنت لازم تنزل raw SQL
- [ ] N+1 detection في الـ logs وحلّه (joins، `include`، batching)
- [ ] Migrations tooling (Prisma Migrate، Drizzle Kit، Knex migrations)، seeding، migration في CI/CD
- [ ] Redis patterns من Node: cache-aside helper، TTL، `SETNX` للـ lock البسيط، pub/sub

### 2.9 Background work و Messaging
- [ ] ليه background jobs: أي حاجة أبطأ من 100ms أو ممكن تفشل (email، PDF، webhooks، image processing)
- [ ] **BullMQ**: queues، workers، job options (attempts، backoff، delay، priority)، repeatable jobs، rate limiting، flows (parent/child)، events، الـ UI (Bull Board)
- [ ] RabbitMQ بـ `amqplib`: exchanges (direct/topic/fanout)، queues، bindings، `ack/nack`، prefetch، DLX
- [ ] Kafka بـ `kafkajs`: producers، consumers، consumer groups، partitions و ordering، offsets commit
- [ ] Cron: `node-cron` ومشكلته في multi-instance (كل instance هيشغّله)، والبديل (distributed lock أو BullMQ repeatable أو external scheduler)
- [ ] **Idempotency** في الـ consumers (الـ job ممكن يتنفذ مرتين)، retries، dead-letter queue، poison messages
- [ ] Outbox pattern: تكتب الـ event في جدول في نفس الـ transaction، وprocess منفصل بيبعته

### 2.10 Error handling و Resilience
- [ ] **Operational errors** (DB down، invalid input، timeout) vs **programmer errors** (bug، `undefined is not a function`) — الأول تتعامل معاه، التاني crash و restart
- [ ] Centralized error handling: error classes hierarchy (`AppError` → `NotFoundError`، `ValidationError`...)، `isOperational` flag، error codes، mapping للـ HTTP status
- [ ] لا تـ swallow errors، لا تـ log وترمي تاني (double logging)
- [ ] **Graceful shutdown**: `SIGTERM` → stop accepting new connections → finish in-flight requests → close DB pools/queues → `process.exit(0)`، مع timeout للـ force exit
- [ ] Timeouts على كل حاجة: incoming request، DB query (`statement_timeout`)، outbound HTTP، queue jobs
- [ ] Retries مع exponential backoff + jitter، وإمتى متعملش retry (non-idempotent، 4xx)
- [ ] Circuit breaker (opossum، cockatiel): states (closed/open/half-open)، وإمتى
- [ ] Health endpoints: `/health/live` (الـ process شغال) vs `/health/ready` (جاهز يستقبل traffic: DB متصلة، queue متصلة)

### 2.11 Security أساسي ومتوسط
- [ ] `helmet` والـ headers اللي بيضيفها (وتعرف كل واحد بيعمل إيه)
- [ ] Rate limiting (`express-rate-limit` مع Redis store)، brute-force protection على الـ login
- [ ] Input validation على الحدود + output encoding
- [ ] SQL/NoSQL injection: parameterized queries، Mongo operators injection (`{ $gt: '' }`)
- [ ] Secrets: مفيش في الكود، `.env` في `.gitignore`، secrets manager في production
- [ ] `npm audit`، lockfile، Dependabot/Renovate
- [ ] File uploads: limits، type checking (magic bytes مش extension)، filename sanitization، مكان التخزين (مش public folder)

### 2.12 Testing في Node
- [ ] Unit: Vitest/Jest/`node:test`، `describe/it/expect`، `vi.mock`، fake timers (`vi.useFakeTimers`)
- [ ] Integration: Supertest على الـ app، **Testcontainers** لـ Postgres/Redis حقيقي بدل mocks
- [ ] `msw` لـ mocking الـ outbound HTTP
- [ ] Test structure: AAA، factories/builders للـ test data، isolation (كل test بـ DB نظيفة أو transaction rollback)
- [ ] Deterministic tests: مفيش `Date.now()` مباشر، مفيش random من غير seed

### 2.13 Observability و Production أساسي
- [ ] **Structured logging بـ pino**: JSON، levels، child loggers مع context، redaction للـ secrets، `pino-pretty` في dev بس
- [ ] Correlation/request IDs: تولّده في أول middleware وتمرره في كل log (بـ `AsyncLocalStorage`)
- [ ] 12-factor app: config من env، stateless processes، logs كـ stream، dev/prod parity
- [ ] Config validation عند الـ startup (Zod على `process.env`) — fail fast
- [ ] Docker image لـ Node: multi-stage، `node:22-slim` أو distroless، non-root user، `.dockerignore`، `COPY package*.json` قبل الكود (layer caching)، `tini` أو `--init` للـ signals
- [ ] PM2 للـ small deployments vs containers (standard)
- [ ] CI أساسي: lint → typecheck → test → build

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Concurrency و Parallelism
- [ ] **`worker_threads`**: للـ CPU-bound work، `postMessage`، `workerData`، transferable objects، `SharedArrayBuffer` + `Atomics`
- [ ] Worker pool pattern (piscina)
- [ ] **`cluster`**: forks بنفس الـ port، round-robin، وإمتى (multi-core على server واحد) — vs containers horizontal scaling (الأشهر دلوقتي)
- [ ] الحكم: `worker_threads` (CPU work، shared memory) vs `cluster` (scale HTTP على cores) vs `child_process` (external programs، isolation) vs queue + separate service (الأفضل غالبًا)
- [ ] `AsyncLocalStorage`: request context propagation (request ID، user، tenant) من غير ما تمرره في كل function — وتكلفته
- [ ] `async_hooks` كمفهوم (الأساس تحت `AsyncLocalStorage`)

### 3.2 Performance و Profiling
- [ ] **تقيس قبل ما تحسّن**: `--cpu-prof` → Chrome DevTools، `--heap-prof`، `clinic doctor/flame/bubbleprof`، `0x` flame graphs — تقرأ flame graph وتلاقي الـ hot path
- [ ] `--inspect` و Chrome DevTools للـ live debugging والـ profiling
- [ ] **Event loop lag**: `perf_hooks.monitorEventLoopDelay()`، تصدّره كـ metric، alert عليه
- [ ] Memory: heap snapshots في production (`v8.writeHeapSnapshot`)، `--max-old-space-size` في containers (وليه Node بيتقتل بـ OOM لو مظبطتوش مع الـ container limit)، leak detection بالـ snapshots المتتالية
- [ ] `--heapsnapshot-near-heap-limit`
- [ ] Caching: in-process LRU (`lru-cache`) vs Redis — التكلفة والـ consistency
- [ ] Streaming responses بدل الـ big JSON، `JSON.stringify` على objects كبيرة بيبلوك
- [ ] **undici**: الـ HTTP client اللي تحت `fetch`، keep-alive، connection pool، `Agent` settings، DNS caching للـ outbound
- [ ] Load testing: `autocannon` (سريع) أو `k6` (scenarios) — تقرأ p50/p95/p99 مش average، وتعرف الـ throughput vs latency curve
- [ ] Horizontal scaling و stateless: مفيش in-memory sessions، مفيش local file uploads، sticky sessions وليه تتجنبها
- [ ] `diagnostics_channel` و `perf_hooks` للـ custom instrumentation

### 3.3 Security متقدم
- [ ] **OWASP Top 10 في Node** بالتفصيل: injection بأنواعه (SQL/NoSQL/command/path traversal)، XSS في SSR، CSRF (وإمتى `SameSite` كفاية)، SSRF (user بيديك URL وإنت بتعمل fetch)، **prototype pollution** (`__proto__` في JSON merge)، **ReDoS**، insecure deserialization، mass assignment
- [ ] Security headers: CSP بالتفصيل، HSTS، `X-Content-Type-Options`
- [ ] Supply chain: typosquatting، lockfile integrity، `npm ci`، Socket/Snyk، `--ignore-scripts`، pinning، وليه npm packages أكبر مصدر خطر
- [ ] Running as non-root في Docker، read-only filesystem، least privilege
- [ ] Permission model في Node 22+ (`--experimental-permission`)
- [ ] Secrets rotation، مفيش secrets في Docker image layers أو logs
- [ ] SAST في الـ CI (Semgrep، CodeQL)
- [ ] Threat model بسيط لكل feature حساسة

### 3.4 Modules و Packages متقدم
- [ ] `package.json` بالكامل: **`exports` field** (subpath exports، conditions `import/require/types/default`)، `imports` (`#internal/*`)، `bin`، `files`، `peerDependencies` و `peerDependenciesMeta`، `sideEffects`
- [ ] Dual packages (ESM + CJS) والـ dual package hazard
- [ ] CJS/ESM interop بالتفصيل: `require(esm)` في Node 22+، `createRequire`، `import()` من CJS، الـ default export wrapping
- [ ] Monorepos: pnpm workspaces، Turborepo/Nx (caching، task graph)، `workspace:*` protocol، shared packages بين api و web
- [ ] Publishing: `npm publish`، `prepublishOnly`، provenance، semantic-release/changesets
- [ ] Bun و Deno: الفرق (runtime، bundler، test runner مدمجين)، التوافق، وإمتى يستاهلوا

### 3.5 Real-time على scale
- [ ] `ws` الخام: upgrade handshake، ping/pong heartbeat، message framing
- [ ] Socket.IO: rooms، namespaces، acknowledgements، reconnection، **Redis adapter** للـ multi-instance
- [ ] SSE: `text/event-stream`، reconnection بـ `Last-Event-ID`، إمتى أحسن من WebSocket (one-way، HTTP-friendly، LLM streaming)
- [ ] Presence، message ordering، backpressure على الـ socket (slow consumer)
- [ ] Load balancer config للـ WebSockets (sticky أو Redis adapter)

### 3.6 GraphQL و gRPC
- [ ] GraphQL في Node: Apollo Server / GraphQL Yoga / Mercurius (Fastify)، schema-first vs code-first، resolvers
- [ ] **N+1 و DataLoader** (batching + caching per request)
- [ ] Subscriptions (WebSocket)، query complexity limiting، depth limiting، persisted queries
- [ ] إمتى GraphQL يستاهل (clients متعددة بـ needs مختلفة) وإمتى لأ (CRUD بسيط، caching على HTTP)
- [ ] gRPC بـ `@grpc/grpc-js`: Protobuf definitions، unary vs streaming، code generation، إمتى (service-to-service، performance)

### 3.7 Observability متقدم
- [ ] **OpenTelemetry في Node**: SDK setup، auto-instrumentation (http، pg، redis، express)، manual spans، context propagation عبر الـ services (W3C traceparent)، exporters (OTLP → Jaeger/Tempo/Datadog)
- [ ] Metrics بـ `prom-client`: counters، gauges، histograms (للـ latency)، default metrics، `/metrics` endpoint، RED metrics لكل route
- [ ] Sentry: error tracking مع source maps، release tagging، breadcrumbs، performance monitoring
- [ ] Log sampling و cardinality control على scale
- [ ] ربط الـ 3 أعمدة: trace ID في الـ logs، exemplars في الـ metrics

### 3.8 Deployment متقدم
- [ ] Serverless (Lambda): cold start في Node (bundle size، top-level init)، connection pooling مشكلة (RDS Proxy، PgBouncer)، `esbuild` bundling، إمتى يستاهل
- [ ] Edge runtimes (Cloudflare Workers، Vercel Edge): مفيش `fs`، Web APIs بس، إيه الـ libraries اللي بتشتغل
- [ ] Container orchestration من منظور الـ app: readiness probes، `SIGTERM` handling، resource limits و `--max-old-space-size`
- [ ] Zero-downtime deploys: الـ app لازم يستحمل instance قديم وجديد شغالين مع بعض (backward-compatible migrations)

### 3.9 Advanced و Internals
- [ ] تكتب CLI tool: `commander`/`yargs`، `prompts`/`inquirer`، colors، `bin` في `package.json`، `npx` distribution
- [ ] Native addons (N-API / node-addon-api) كمفهوم، وليه بعض الـ packages بتحتاج compile (bcrypt vs bcryptjs)
- [ ] V8 internals للـ debugging: hidden classes، inline caching، deoptimization، `--trace-opt --trace-deopt`
- [ ] V8 GC: Scavenger (young)، Mark-Compact (old)، `--trace-gc`، وعلاقة الـ GC pauses بالـ p99 latency
- [ ] Node internals: `lib/` vs `src/`، إزاي الـ `fs.readFile` بيوصل لـ libuv

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **Backend مشروع جانبي كامل** (ده اللي هيكبر طول الخطة): Fastify أو NestJS + TypeScript strict، modular monolith، OpenAPI، OAuth + PKCE، RBAC، BullMQ، Redis cache، pino + OpenTelemetry، Testcontainers tests، Docker multi-stage، graceful shutdown.
2. **سكريبتات تجريبية** محفوظة: event loop order demo، stream مع backpressure (مع وبدون) وقياس الـ memory، `worker_threads` vs main thread لـ CPU task، pool exhaustion demo.
3. **Load test موثّق**: autocannon/k6 على الـ API قبل وبعد تحسين (keep-alive، pool size، caching) مع p50/p95/p99.
4. **تقرير profiling**: flame graph لـ endpoint بطيء وإزاي حسّنته.

## 📚 المصادر

- [Node.js docs](https://nodejs.org/docs/latest/api/) — الـ Stream و Events و HTTP و Worker threads بالذات
- [Node.js Design Patterns (Casciaro & Mammino)](https://www.nodejsdesignpatterns.com/) — الكتاب الأهم في Node
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices) — الـ repo الشهير
- [Don't Block the Event Loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop) — من الـ docs الرسمية
- [Fastify docs](https://fastify.dev/docs/latest/) و [NestJS docs](https://docs.nestjs.com/)
- [OWASP Node.js Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
- [OpenTelemetry JS](https://opentelemetry.io/docs/languages/js/)

## ✅ اختبار الخروج

1. ارسم الـ event loop phases واشرح فين `nextTick` والـ microtasks بيتنفذوا.
2. إيه هو backpressure؟ اشرح بالكود إيه اللي بيحصل لو تجاهلته.
3. ليه `fs.readFile` بيروح الـ thread pool و HTTP request لأ؟
4. Sessions vs JWT: إمتى كل واحد وليه JWT في localStorage غلط؟
5. اشرح graceful shutdown خطوة بخطوة.
6. إزاي تكتشف إن الـ event loop بيتبلوك في production؟ وإزاي تحله؟
7. ليه Fastify أسرع من Express؟ (مش "لأنه أحدث")
8. إيه الفرق بين `worker_threads` و `cluster` وإمتى كل واحد؟
