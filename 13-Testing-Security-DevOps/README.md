# 13 — Testing، Security، DevOps

> **ليه القسم ده:** التلاتة دول هما اللي بيخلّوا الفريق يثق فيك على الـ production. وفي عصر الـ AI هما أكتر حاجة بتميّز السنيور: الـ AI بيكتب كود كتير (و~45% منه فيه ثغرة OWASP حسب Veracode)، وحد لازم يتأكد إنه صح وآمن ومراقَب ومنشور بأمان. الكود اللي مش بيتنشر بأمان مش منتج.
>
> **الوقت التقريبي:** 4 أسابيع · **المصدر الأنسب:** [Testing JavaScript](https://testingjavascript.com) + [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org) + [PortSwigger Web Security Academy](https://portswigger.net/web-security) (مجاني) + Docker/K8s docs + Terraform tutorials

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
القسم ده 3 أجزاء مستقلة (A: Testing، B: Security، C: DevOps) — كل جزء فيه الـ 3 مستويات.

---

# A. Testing

## 🟢 المستوى 1 — الأساسيات

### A1.1 أنواع الاختبارات
- [ ] **Unit** (function/class معزولة، سريعة، كتير)، **Integration** (كذا جزء مع بعض — API + DB حقيقية)، **E2E** (المستخدم الحقيقي — browser)، smoke (هل النظام شغال أصلًا)
- [ ] **Test pyramid** (unit كتير، integration أقل، E2E قليل) vs **testing trophy** (Kent C. Dodds — integration هي الأغلى قيمة) — وليه الـ trophy أنسب للـ backend و frontend الحديث
- [ ] إيه اللي بيحدد نوع الـ test: السرعة، الثقة، تكلفة الصيانة

### A1.2 Test design الأساسي
- [ ] **AAA**: Arrange، Act، Assert — وكل test بيختبر حاجة واحدة
- [ ] Given/When/Then كطريقة تسمية وتفكير
- [ ] Naming: الـ test name بيقول السلوك (`returns 404 when user not found`) مش الـ implementation
- [ ] الـ test لازم يفشل الأول (تتأكد إنه بيختبر حاجة فعلًا)
- [ ] Vitest/Jest: `describe/it/expect`، matchers، `beforeEach/afterEach`، `test.each`، `only/skip`

### A1.3 Test doubles
- [ ] **Stub** (بيرجع قيمة ثابتة)، **Mock** (بيتحقق إنه اتنادى)، **Spy** (بيراقب الـ real)، **Fake** (implementation بسيطة شغالة — in-memory repo)، dummy
- [ ] `vi.fn()`، `vi.spyOn()`، `vi.mock()` — والفرق بينهم
- [ ] **إمتى تعمل mock وإمتى لأ**: mock الحدود الخارجية (payment API، email) — **مش** الـ DB ومش الـ code بتاعك (over-mocking = tests بتعدي والـ production واقع)

### A1.4 Coverage
- [ ] Line vs branch vs function coverage، وليه الـ branch أهم
- [ ] قراءته صح: 100% coverage مش معناه الكود صح، و80% على الـ domain أهم من 95% على كل حاجة
- [ ] Coverage كـ guide لإيه اللي مش متختبر، مش كـ target

## 🟡 المستوى 2 — المتوسط

### A2.1 Integration testing في Node
- [ ] Supertest على الـ app (مش على server شغال)، assertions على status/body/headers
- [ ] **Testcontainers**: Postgres/Redis/Kafka حقيقي في Docker للـ tests — وليه أحسن من mocks و من SQLite
- [ ] **Test isolation**: كل test بـ DB نظيفة — transaction rollback (أسرع) vs truncate vs schema per test file
- [ ] Database migrations في الـ test setup
- [ ] **Test data**: factories/builders (`createUser({ role: 'admin' })`) بدل fixtures ثابتة، faker بـ seed ثابت
- [ ] **Deterministic tests**: fake timers (`vi.useFakeTimers`)، injected clock بدل `Date.now()`، seeded random، مفيش network حقيقي
- [ ] `msw` لـ mocking الـ outbound HTTP على مستوى الـ network (الكود مش عارف إنه mocked)
- [ ] Testing async code: `await`، `resolves/rejects`، avoiding `done` callback

### A2.2 Frontend testing
- [ ] React Testing Library: queries by role أولًا، `user-event`، `findBy` للـ async، `within`
- [ ] Testing hooks بـ `renderHook`، testing context providers (custom render wrapper)
- [ ] Component tests في Storybook (play functions)، visual regression (Chromatic/Percy)
- [ ] Snapshot tests **بحذر**: للـ serialized output الصغير بس، مش للـ components كاملة (بتتكسر مع أي تغيير وبيتعمل update من غير قراءة)
- [ ] Accessibility tests: `jest-axe`

### A2.3 E2E
- [ ] **Playwright**: locators (role-based)، auto-waiting، fixtures، auth state reuse (login مرة واحدة)، parallelism، trace viewer للـ debugging
- [ ] E2E قليلة ومركزة على الـ **critical flows** بس (signup، checkout، core feature) — مش كل حاجة
- [ ] Page Object Model أو screenplay (كمفهوم) للـ maintainability
- [ ] E2E في الـ CI: headless، retries بحذر، video on failure

### A2.4 TDD/BDD و Strategy
- [ ] **TDD**: red → green → refactor، وإمتى بيفيد (logic معقد، API design) وإمتى لأ (exploration، UI)
- [ ] BDD كمفهوم (Cucumber/Gherkin) ومتى يستاهل (نادرًا — لما الـ business بيقرا الـ tests فعلًا)
- [ ] Testing strategy للمشروع مكتوبة: إيه اللي unit، إيه اللي integration، إيه اللي E2E، وإيه الـ coverage target لكل layer
- [ ] Testing الـ domain logic (hexagonal): الـ core بيتختبر بـ fakes على الـ ports من غير DB — سريع جدًا

### A2.5 Flaky tests و Speed
- [ ] أسباب الـ flakiness: shared state، timing (`setTimeout` في tests)، order dependency، real network، resource leaks
- [ ] تشخيصها (run 100 مرة، `--repeat`) وعلاجها — **مش retry**
- [ ] Parallelism: isolation لازمة، DB per worker
- [ ] Speed: الـ unit tests في ثواني، الـ integration في دقائق، watch mode، test sharding في الـ CI

## 🔴 المستوى 3 — المتقدم

### A3.1 Advanced techniques
- [ ] **Contract testing** (Pact): consumer-driven contracts بين services، الـ provider verification في الـ CI — بديل للـ E2E بين services
- [ ] **Property-based testing** (fast-check): بتولّد inputs عشوائية وتتحقق من properties (idempotent، reversible، invariants) — للـ parsers، serializers، business rules
- [ ] **Mutation testing** (Stryker): بيغيّر الكود ويشوف الـ tests هتمسك ولا لأ — بيقولك الـ tests بتاعتك بتمسك إيه فعلًا (mutation score أصدق من coverage)
- [ ] Approval/golden tests للـ outputs المعقدة (PDFs، reports)
- [ ] Load tests (k6/autocannon) كجزء من الـ test suite (performance regression)
- [ ] Security tests أوتوماتيكية (SAST في CI، dependency scanning — تفاصيلها في B)
- [ ] Chaos/fault injection tests: الـ DB وقعت، الـ API بطيئة، timeout — النظام بيعمل إيه؟
- [ ] Testing Server Components و Server Actions في Next (الحدود الحالية)
- [ ] Testing event-driven systems: outbox، consumers idempotency، ordering
- [ ] Test architecture: shared test utils package في monorepo، test categorization (`@slow`، `@integration`)، CI stages

### A3.2 Testing في عصر الـ AI
- [ ] الـ AI بيكتب tests كتير سطحية (بتختبر الـ implementation مش السلوك) — تعرف تراجعهم
- [ ] Spec-first: تكتب الـ acceptance criteria والـ tests قبل ما الـ AI يكتب الكود، وتراجع بالـ tests مش بالعين
- [ ] Mutation testing كأداة لتقييم الـ AI-generated tests

---

# B. Security

## 🟢 المستوى 1 — الأساسيات

### B1.1 Security mindset
- [ ] **Threat modeling مبسّط**: مين ممكن يهاجم؟ إزاي؟ إيه الأثر؟ — لكل feature حساسة (STRIDE: Spoofing، Tampering، Repudiation، Information disclosure، DoS، Elevation of privilege)
- [ ] Attack surface: كل input هو surface (HTTP، headers، files، env، queue messages، webhooks)
- [ ] **Defense in depth**: طبقات، مفيش حاجة واحدة بتحميك
- [ ] Least privilege: الـ app user في الـ DB، الـ IAM role، الـ container user
- [ ] Secure defaults: الـ default يكون الآمن (deny by default)

### B1.2 OWASP Top 10 (كل بند بمثال وحله في Node)
- [ ] **Injection**: SQL (parameterized queries)، NoSQL (`{ $gt: '' }` — sanitize operators)، command (`execFile` مش `exec`)، path traversal (`path.resolve` + check prefix)
- [ ] **Broken authentication**: weak passwords، no rate limit على login، session fixation، credential stuffing
- [ ] **Sensitive data exposure**: PII في logs، secrets في الكود، HTTP مش HTTPS، weak hashing
- [ ] **Broken access control / IDOR / BOLA**: `GET /orders/123` من غير ما تتأكد إنه بتاع الـ user ده — **الأشهر في الـ APIs**
- [ ] **Security misconfiguration**: debug mode في production، default credentials، verbose errors، CORS `*` مع credentials
- [ ] **XSS**: stored، reflected، DOM-based — output encoding، CSP، React بيحمي by default (إلا `dangerouslySetInnerHTML`)
- [ ] **CSRF**: إزاي بيشتغل، `SameSite` cookies، CSRF tokens، وإمتى محتاجهم (cookie-based auth)
- [ ] **SSRF**: user بيديك URL وإنت بتعمل fetch (cloud metadata endpoint!) — allowlist، block private IPs
- [ ] **Vulnerable components**: `npm audit`، outdated deps
- [ ] **Insufficient logging**: مفيش audit trail للـ security events

### B1.3 Crypto للمطور
- [ ] **Hashing vs encryption vs signing**: one-way / two-way / integrity+authenticity
- [ ] Password hashing: argon2id/bcrypt (slow by design)، مش SHA/MD5
- [ ] Symmetric (AES-GCM) vs asymmetric (RSA/ECDSA)، وإمتى كل واحد
- [ ] TLS: إيه اللي بيحميه وإيه لأ
- [ ] JWT signing: HS256 vs RS256، verify الـ signature والـ claims (`exp`، `aud`، `iss`)، الـ `alg: none` attack
- [ ] `crypto.randomBytes` مش `Math.random` للـ tokens
- [ ] **القاعدة: لا تخترع crypto** — استخدم libraries معروفة

### B1.4 Secrets و Config
- [ ] مفيش secrets في الكود أو الـ git history (و`git-secrets`/`gitleaks` في pre-commit)
- [ ] `.env` للـ local بس، secrets manager في production (Vault، AWS Secrets Manager، Doppler)
- [ ] مفيش secrets في Docker image layers أو logs أو error messages
- [ ] Rotation كمفهوم وإمتى

## 🟡 المستوى 2 — المتوسط

### B2.1 Web security بعمق
- [ ] **OWASP API Security Top 10** (مختلف عن الـ web): BOLA، broken authentication، excessive data exposure (الـ API بترجع أكتر من اللازم)، lack of rate limiting، BFLA (function-level)، mass assignment، security misconfiguration، injection، improper assets management، insufficient logging
- [ ] **Browser security model**: same-origin policy، CORS بالتفصيل (preflight، credentials، وليه مش بيحمي الـ server)، **CSP** (directives، nonces، report-only mode)، cookies flags، Subresource Integrity
- [ ] Open redirect، clickjacking (`X-Frame-Options`/`frame-ancestors`)، **prototype pollution** (JSON merge بـ `__proto__`)، **ReDoS** (regex backtracking)، HTTP parameter pollution
- [ ] File upload security: type check بالـ magic bytes، size limits، rename، store outside webroot أو في S3، scan، `Content-Disposition`
- [ ] Mass assignment: `User.update(req.body)` — allowlist الـ fields
- [ ] Rate limiting و brute-force protection: per IP + per account، account lockout بحذر (DoS vector)، CAPTCHA على الـ sensitive flows
- [ ] Security headers كاملة بـ helmet وتعرف كل واحد: HSTS، CSP، `X-Content-Type-Options`، `Referrer-Policy`، `Permissions-Policy`
- [ ] Session security: regeneration بعد login، absolute + idle timeout، logout بيمسح server-side
- [ ] Error handling آمن: مفيش stack traces للـ client، generic messages للـ auth failures (مش "user not found" vs "wrong password")

### B2.2 Supply chain
- [ ] npm packages أكبر مصدر خطر: typosquatting، dependency confusion، malicious postinstall scripts، maintainer account takeover
- [ ] Lockfiles و `npm ci`، `--ignore-scripts` في CI، pinning للـ critical deps
- [ ] SCA tools: `npm audit`، Snyk، Socket.dev (بيكشف behavior مش بس CVEs)، Dependabot/Renovate مع review
- [ ] **SBOM** (Software Bill of Materials) كمفهوم، provenance (npm provenance، Sigstore)
- [ ] Minimal dependencies policy: كل dependency = liability

### B2.3 Security testing
- [ ] **SAST** (Semgrep، CodeQL): static analysis في الـ CI، custom rules للـ patterns بتاعتك
- [ ] **DAST** (OWASP ZAP): بيهاجم الـ app الشغالة
- [ ] Dependency scanning في الـ CI (block على high/critical)
- [ ] Secret scanning (gitleaks، GitHub secret scanning)
- [ ] Container scanning (Trivy) — تفاصيله في C
- [ ] Pentest basics: تعرف تستخدم Burp/ZAP على الـ app بتاعك، وتقرأ pentest report وتـ prioritize

### B2.4 Logging للأمان و Data protection
- [ ] **Audit trails**: مين عمل إيه إمتى (auth events، permission changes، data access للـ sensitive)، immutable، retention
- [ ] **مفيش secrets/PII في الـ logs**: redaction في pino، log hygiene review
- [ ] PII classification، data minimization، encryption at rest للـ sensitive fields (application-level) vs disk encryption
- [ ] GDPR basics للمطور: lawful basis، right to access/deletion/portability، data residency، DPA مع الـ vendors، breach notification (72h)
- [ ] Anonymization vs pseudonymization

## 🔴 المستوى 3 — المتقدم

### B3.1 Security في الـ architecture
- [ ] Threat model كامل للمشروع: data flow diagram → trust boundaries → threats per boundary (STRIDE) → mitigations → residual risk
- [ ] Zero trust architecture: service-to-service auth (mTLS/JWT)، مفيش trusted network
- [ ] Multi-tenancy security: tenant isolation testing (user من tenant A يحاول يوصل لـ B)، RLS، per-tenant encryption keys كمفهوم
- [ ] Key management: KMS، envelope encryption (data key encrypted by master key)، rotation بدون re-encrypt كل حاجة
- [ ] Webhooks security: signature verification (HMAC + timestamp — replay protection)، idempotency
- [ ] OAuth security: PKCE، state parameter، redirect URI validation، token storage (httpOnly cookie vs memory)، refresh token rotation + reuse detection
- [ ] **AI/LLM security** (لو بتبني features بـ LLMs): prompt injection (direct/indirect)، data leakage عبر الـ prompt، PII redaction قبل الـ LLM، rate limiting و cost limits على الـ AI endpoints، output validation، tool-use permissions
- [ ] **Security review لكود الـ AI**: checklist (injection، authZ على كل endpoint، secrets، error handling، deps جديدة) — وSAST إلزامي في الـ CI

### B3.2 Incident response للأمان
- [ ] Playbook: detect → contain (revoke، rotate، isolate) → eradicate → recover → lessons learned
- [ ] Secrets leaked في git: rotate فورًا (الـ history cleanup مش كفاية)
- [ ] Responsible disclosure: `security.txt`، bug bounty كمفهوم، إزاي تتعامل مع تقرير من باحث
- [ ] Security postmortem بدون blame

---

# C. DevOps و Cloud

## 🟢 المستوى 1 — الأساسيات

### C1.1 Linux و Shell
- [ ] Shell مريح (من قسم CS): navigation، pipes، `grep/awk/sed`، `find`، permissions، `ssh`، `scp`
- [ ] Processes: `ps`، `top/htop`، `kill` و signals، `nohup`، background jobs
- [ ] `systemd`: `systemctl status/start/restart`، `journalctl -u service -f`، unit file بسيط
- [ ] Networking tools: `ss/netstat` (مين بيسمع على port إيه)، `curl -v`، `dig/nslookup`، `ping/traceroute`
- [ ] Disk: `df`، `du`، logs بتملا الـ disk
- [ ] **Debug server بيعمل 100% CPU أو memory**: `htop` → الـ process → `strace`/`--inspect` → السبب

### C1.2 Docker الأساسي
- [ ] Images vs containers، layers، registry
- [ ] Dockerfile أساسي لـ Node: `FROM`، `WORKDIR`، `COPY`، `RUN`، `CMD`، `EXPOSE`
- [ ] **Layer caching الصح**: `COPY package*.json` + `npm ci` **قبل** `COPY . .`
- [ ] `.dockerignore` (node_modules، .git، .env)
- [ ] `docker build/run/exec/logs/ps`، port mapping، env vars
- [ ] **Docker Compose** للـ local dev: app + Postgres + Redis + Kafka بـ `docker compose up`، volumes للـ data، `depends_on` + healthcheck
- [ ] Volumes vs bind mounts، networking بين containers (service name كـ hostname)

### C1.3 CI/CD الأساسي
- [ ] CI = كل push بيتعمل عليه lint → typecheck → test → build أوتوماتيك
- [ ] **GitHub Actions**: workflow file، triggers (push، PR)، jobs، steps، actions marketplace، secrets
- [ ] Caching الـ dependencies في الـ CI (`actions/cache` أو `setup-node` cache)
- [ ] Branch protection: PR لازم CI أخضر + review قبل الـ merge
- [ ] CD كمفهوم: deploy أوتوماتيك بعد الـ merge (staging ثم production)

### C1.4 Cloud الأساسي (AWS كمثال)
- [ ] الـ mental model: regions و availability zones، managed services vs self-managed
- [ ] **Compute**: EC2 (VM)، ECS/Fargate (containers managed)، Lambda (functions)، EKS (Kubernetes managed) — جملة عن كل واحد
- [ ] **Data**: RDS (Postgres managed)، ElastiCache (Redis managed)، S3 (objects)، SQS/SNS (queues/pub-sub)
- [ ] **Networking**: VPC، subnets (public/private)، security groups، ALB، Route 53، CloudFront — كمفاهيم
- [ ] IAM: users، roles، policies، وإن الـ app بياخد role مش access keys
- [ ] الـ console vs CLI vs IaC
- [ ] Cost basics: تعرف تفتح الـ billing dashboard وتفهم أكبر 3 بنود

### C1.5 Deployment الأساسي
- [ ] Platforms الحديثة: Vercel (Next)، Railway/Render/Fly.io (containers بسهولة) — deploy في 5 دقايق
- [ ] Environment variables في الـ platform، secrets
- [ ] Health check endpoint، logs في الـ platform
- [ ] Domain + TLS (Let's Encrypt أوتوماتيك)

## 🟡 المستوى 2 — المتوسط

### C2.1 Docker بإتقان
- [ ] **Multi-stage builds** لـ Node: build stage (deps + tsc) → runtime stage (prod deps بس + dist) — image أصغر بكتير
- [ ] Base images: `node:22-slim` vs `alpine` (musl issues مع بعض native deps) vs **distroless** (أأمن)
- [ ] **Non-root user**، read-only filesystem، `--cap-drop`
- [ ] **Signals و graceful shutdown**: PID 1 problem، `tini`/`--init`، `CMD ["node", "server.js"]` (exec form مش shell form)
- [ ] `HEALTHCHECK`، resource limits (`--memory`، `--cpus`) و `--max-old-space-size` متوافق معاهم
- [ ] Image scanning (**Trivy**)، SBOM generation، image signing كمفهوم
- [ ] BuildKit features: cache mounts (`--mount=type=cache`) للـ npm cache، secrets mounts (مش `ARG` للـ secrets)
- [ ] Image size optimization: `npm ci --omit=dev`، `.dockerignore`، layer squashing
- [ ] Registry: ECR/GHCR، tagging strategy (git SHA مش `latest`)، retention

### C2.2 CI/CD بعمق
- [ ] **Pipeline كامل**: lint → typecheck → unit tests → build → integration tests (Testcontainers/services) → security scan (SAST + deps + image) → E2E (على preview) → deploy staging → smoke → deploy production
- [ ] Matrix builds (Node versions)، reusable workflows، composite actions
- [ ] Caching استراتيجيات: deps، build artifacts، Docker layers (`cache-from`)، Turborepo remote cache
- [ ] Artifacts بين jobs، environments مع approvals (production requires approval)
- [ ] Secrets handling في CI: OIDC للـ cloud (مفيش long-lived keys)، masked logs، least-privilege tokens
- [ ] **Preview environments لكل PR** (Vercel، أو ephemeral namespaces)
- [ ] Monorepo CI: affected-only builds (Turborepo/Nx `--filter`)، path filters
- [ ] Pipeline speed: parallel jobs، test sharding، fail fast
- [ ] **Deployment strategies**: rolling (تدريجي، الاتنين شغالين)، **blue/green** (environment كامل جديد، switch، rollback فوري)، **canary** (1% → 10% → 100% مع metrics)، feature flags (deploy ≠ release)
- [ ] **Rollback plan دايمًا**: الـ image القديمة جاهزة، الـ DB migration backward-compatible (expand/contract) — **migrations كخطوة منفصلة قبل الـ deploy**
- [ ] Trunk-based development مع feature flags vs GitFlow، وليه الأول أسرع
- [ ] GitOps كمفهوم (ArgoCD/Flux: الـ git هو الـ source of truth للـ infra state)

### C2.3 Kubernetes (المستوى المطلوب للـ Full-Stack Senior)
- [ ] **المفاهيم**: Pod (أصغر وحدة)، Deployment (replicas + rolling updates)، Service (ClusterIP/NodePort/LoadBalancer — stable networking)، Ingress (HTTP routing + TLS)، ConfigMap/Secret، Namespace
- [ ] **Probes**: liveness (restart لو فشل) vs readiness (شيل من الـ load balancer لو فشل) vs startup — والفرق بيهم مهم جدًا (liveness غلط = restart loops)
- [ ] **Resource requests/limits**: CPU (throttling) و memory (**OOMKilled**) — وليه Node بيتقتل لو `--max-old-space-size` أكبر من الـ limit
- [ ] HPA (Horizontal Pod Autoscaler) على CPU/memory/custom metrics
- [ ] تكتب manifests (YAML) أو **Helm chart** لتطبيقك: values per environment، templates
- [ ] Kustomize كبديل
- [ ] **Debug**: `kubectl get/describe/logs/exec/port-forward`، `kubectl top`، events، CrashLoopBackOff و ImagePullBackOff و Pending (أسبابهم)
- [ ] Rolling update strategy (`maxSurge`، `maxUnavailable`)، `terminationGracePeriodSeconds` + `SIGTERM` handling + `preStop` hook
- [ ] PodDisruptionBudget، anti-affinity (replicas على nodes مختلفة)
- [ ] Jobs و CronJobs للـ scheduled work
- [ ] **مش مطلوب تدير cluster** (managed EKS/GKE)، مطلوب تنشر عليه وتشخّص

### C2.4 Cloud متوسط (AWS)
- [ ] **Compute decision**: EC2 (تحكم كامل، ops أكتر) vs ECS/Fargate (containers من غير cluster management — الـ sweet spot لمعظم Node apps) vs Lambda (event-driven، spiky، cold starts) vs EKS (لو محتاج K8s فعلًا) — تختار حسب الـ workload والتكلفة والفريق
- [ ] **Networking**: VPC design (public subnets للـ ALB، private للـ apps والـ DB)، NAT gateway (وتكلفته!)، security groups (stateful) vs NACLs، ALB (L7) vs NLB (L4)، CloudFront قدام الـ ALB/S3، Route 53 (routing policies، health checks)
- [ ] **Data services**: RDS (Multi-AZ، read replicas، parameter groups، backups/PITR، RDS Proxy للـ pooling)، ElastiCache (cluster mode)، S3 (presigned URLs، lifecycle، versioning، event notifications)، SQS (standard vs FIFO، visibility timeout، DLQ)، SNS (fan-out)، EventBridge
- [ ] **IAM بالـ least privilege**: تكتب policy بإيدك (actions، resources، conditions)، roles للـ services (task role في ECS)، مفيش `*`
- [ ] CloudWatch: logs، metrics، alarms، dashboards — والتكلفة (custom metrics، log ingestion)
- [ ] Secrets Manager / Parameter Store، KMS
- [ ] **Cost awareness**: تقرأ الـ bill (Cost Explorer)، أكبر البنود عادة (compute، NAT gateway، data transfer/egress، RDS)، reserved/savings plans، spot للـ workers، right-sizing، tagging للـ cost allocation
- [ ] **Serverless trade-offs**: cold starts في Node (bundle size، provisioned concurrency)، connection pooling مع Lambda (RDS Proxy)، 15-min limit، vendor lock-in، إمتى يستاهل (spiky، event-driven، low traffic)

### C2.5 Infrastructure as Code
- [ ] ليه IaC: reproducible، reviewable (PR)، versioned، مفيش click-ops drift
- [ ] **Terraform**: providers، resources، variables، outputs، **modules**، `plan` → `apply` workflow، **state** (remote في S3 + locking بـ DynamoDB)، `import` للموجود، workspaces
- [ ] **Pulumi بـ TypeScript**: نفس المفهوم بكود حقيقي — مناسب جدًا لـ Node developer
- [ ] Environments (dev/staging/prod) متطابقة من نفس الكود بـ variables مختلفة
- [ ] IaC في الـ CI: `plan` على الـ PR (كـ comment)، `apply` بعد الـ merge مع approval
- [ ] Drift detection، state secrets (الـ state فيه secrets — أمّنه)
- [ ] Terraform best practices: small modules، naming، tagging، `terraform fmt/validate`، tflint، checkov للـ security

### C2.6 Observability stack
- [ ] **Prometheus + Grafana**: scraping الـ `/metrics`، PromQL الأساسي (rate، histogram_quantile للـ p99)، dashboards (RED per service)، alerting rules → Alertmanager
- [ ] **OpenTelemetry** collector: pipeline (receivers → processors → exporters)، sampling، إلى Tempo/Jaeger (traces)، Loki/ELK (logs)، Prometheus (metrics)
- [ ] Grafana stack (Loki + Tempo + Prometheus) vs managed (Datadog، New Relic، Honeycomb) — التكلفة والـ trade-offs
- [ ] Sentry للـ errors مع releases و source maps
- [ ] Log aggregation: structured JSON → shipper (Fluent Bit/Vector) → store، retention policies، cost control (sampling، levels)
- [ ] Correlation عبر الـ 3 أعمدة: trace ID في الـ logs، exemplars
- [ ] Uptime monitoring خارجي (synthetic checks) و status page

### C2.7 Platforms الحديثة و Edge
- [ ] Vercel، Railway، Fly.io، Render، Cloudflare Workers/Pages: إمتى تستخدمهم بدل AWS المباشر (فريق صغير، سرعة، مفيش DevOps) وإمتى الـ vendor lock-in والتكلفة بيبقوا مشكلة (scale، compliance، custom networking)
- [ ] Edge runtimes: الفرق عن Node الكامل (مفيش `fs`، Web APIs بس، limits على CPU time)، إيه اللي ينفع يتحط على الـ edge (auth checks، redirects، personalization خفيفة، caching)
- [ ] Exit strategy: الـ app بتاعك يفضل portable (Docker) حتى لو على platform

## 🔴 المستوى 3 — المتقدم

### C3.1 SRE practices
- [ ] **SLOs بجد**: تختار SLIs (availability، latency p99، error rate)، تحدد SLO واقعي (مش 99.999%)، **error budget** وسياسته (لو الـ budget خلص → freeze features، شغل reliability)
- [ ] Alerting على الـ SLO: burn rate alerts (multi-window) بدل threshold alerts
- [ ] **On-call**: rotation، escalation، runbooks لكل alert (الـ alert من غير runbook = noise)، on-call health (pages per week)
- [ ] **Incident management**: roles (incident commander، comms، ops)، severity levels، communication (status page، internal updates)، **mitigation first** then root cause، timeline documentation
- [ ] **Blameless postmortem**: timeline، contributing factors (مش root cause واحد)، action items بـ owners و deadlines، وتتعمل review
- [ ] Toil reduction: automate الـ repetitive ops work
- [ ] Capacity planning: forecasting من الـ growth metrics، load tests قبل الـ events الكبيرة

### C3.2 Production-grade deployment
- [ ] **Zero-downtime deploy كامل**: readiness probe + graceful shutdown + connection draining + backward-compatible migrations + rolling/canary — وتختبره فعليًا (deploy تحت load test ومفيش errors)
- [ ] Canary analysis أوتوماتيكية: compare metrics (error rate، latency) canary vs baseline → auto-promote أو auto-rollback (Argo Rollouts، Flagger)
- [ ] Feature flags platform (LaunchDarkly، Unleash، أو بتاعك): targeting، gradual rollout، kill switches، flag cleanup (tech debt)
- [ ] Database deploys: migrations في job منفصل، online schema changes، rollback strategy للـ data
- [ ] Multi-region deployment كمفهوم: active-active vs active-passive، data replication، DNS failover، التكلفة
- [ ] Immutable infrastructure: مفيش SSH وتعديل، كل تغيير = image/deploy جديد
- [ ] Secrets rotation أوتوماتيكية بدون downtime

### C3.3 Security في الـ infrastructure
- [ ] Container security: distroless، non-root، read-only FS، no privileged، image scanning في الـ CI (block على critical)، runtime security كمفهوم (Falco)
- [ ] K8s security: RBAC، network policies، pod security standards، secrets encryption at rest، service accounts least privilege
- [ ] Cloud security: IAM least privilege audit، security groups minimal، private subnets للـ DB، encryption everywhere، CloudTrail/audit logs، GuardDuty كمفهوم
- [ ] Supply chain للـ infra: pinned action versions (SHA)، signed images، SBOM، policy as code (OPA/Kyverno) كمفهوم
- [ ] Compliance basics كمفهوم (SOC 2، ISO 27001): إيه اللي بيتطلب من الـ engineering (access control، audit logs، change management، backups)

### C3.4 Cost engineering
- [ ] FinOps mindset: الـ cost metric جنب الـ performance metrics
- [ ] Right-sizing بالـ data (utilization metrics)، autoscaling الصح (scale down كمان)
- [ ] أكبر الـ cost traps: NAT gateway data processing، cross-AZ/cross-region transfer، egress، idle resources، over-provisioned RDS، CloudWatch logs بدون retention، unattached volumes
- [ ] Spot/preemptible للـ workers والـ CI، reserved/savings plans للـ baseline
- [ ] Cost per tenant/per feature (unit economics) — تعرف الـ feature دي بتكلّف كام
- [ ] تقدّر التكلفة الشهرية لأي design قبل ما تبنيه (AWS pricing calculator)

### C3.5 Platform engineering (كمفهوم)
- [ ] Internal developer platform: golden paths، service templates، self-service environments
- [ ] Service catalog (Backstage) كمفهوم
- [ ] Developer experience كـ metric: time to first deploy، CI time، local setup time

---

## 🛠️ الـ Artifact المطلوب من القسم ده

**Testing:**
1. المشروع الجانبي بـ **coverage ≥ 80% على الـ domain** بـ Testcontainers للـ integration، Playwright لـ 3 critical flows، msw للـ external APIs، وproperty-based test واحد على الأقل.
2. **Mutation testing report** (Stryker) على module واحد — وتحسّن الـ tests بناءً عليه.
3. **Testing strategy doc** صفحة واحدة للمشروع.

**Security:**
4. **Threat model** للمشروع (DFD + STRIDE table + mitigations).
5. **تقرير Semgrep نظيف في الـ CI** + dependency scanning + secret scanning + Trivy على الـ image — كلهم بيـ block الـ merge.
6. **PortSwigger labs**: حل 15 lab على الأقل (XSS، SQLi، CSRF، SSRF، access control، JWT).
7. OWASP ZAP scan على المشروع وتصليح اللي يطلع.

**DevOps:**
8. **انشر المشروع على AWS بـ Terraform**: VPC + ECS Fargate + RDS (Multi-AZ) + ElastiCache + ALB + CloudFront + S3، مع IAM least privilege — **ووثّق التكلفة الشهرية**.
9. **GitHub Actions pipeline كامل**: lint → typecheck → test (Testcontainers) → scan → build image → push → migrate → **canary deploy** → smoke test، مع OIDC للـ AWS (مفيش keys).
10. **Helm chart** للمشروع + deploy على local cluster (kind/k3d) مع probes و HPA و graceful shutdown متجرّب.
11. **Observability كاملة**: OpenTelemetry traces في Grafana Tempo، RED dashboard في Grafana، SLO واحد مع burn-rate alert، Sentry مع releases.
12. **Zero-downtime deploy موثّق**: load test شغال أثناء الـ deploy ومفيش errors — سجّل الـ metrics.
13. **Runbook** لـ 3 alerts + **postmortem** لحادثة (حقيقية أو مفتعلة بـ chaos).

## 📚 المصادر

**Testing:**
- [Testing JavaScript — Kent C. Dodds](https://testingjavascript.com) و [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
- [Testcontainers for Node](https://node.testcontainers.org/)
- [Playwright docs](https://playwright.dev/docs/intro)
- [fast-check](https://fast-check.dev/) و [Stryker](https://stryker-mutator.io/)
- [Node.js Testing Best Practices — Goldberg](https://github.com/goldbergyoni/nodejs-testing-best-practices)

**Security:**
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org) — Node.js، Authentication، Session، Input Validation، REST Security
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — مجاني، labs عملية
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) و [OWASP API Security Top 10](https://owasp.org/API-Security/)
- [Semgrep](https://semgrep.dev/) و [Socket.dev](https://socket.dev/)
- [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling)

**DevOps:**
- [Docker docs — Node.js guide](https://docs.docker.com/language/nodejs/) و [Docker best practices](https://docs.docker.com/build/building/best-practices/)
- [GitHub Actions docs](https://docs.github.com/en/actions)
- [Kubernetes docs — Concepts](https://kubernetes.io/docs/concepts/) و [Kubernetes the Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way) (مرة واحدة للفهم)
- [Terraform tutorials — AWS](https://developer.hashicorp.com/terraform/tutorials/aws-get-started) و [Pulumi docs](https://www.pulumi.com/docs/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/) و [SRE Workbook](https://sre.google/workbook/table-of-contents/) — مجانيين
- [Grafana docs](https://grafana.com/docs/) و [Prometheus docs](https://prometheus.io/docs/introduction/overview/)
- [12-Factor App](https://12factor.net/)

## ✅ اختبار الخروج

**Testing:**
1. ليه الـ integration tests أغلى قيمة من الـ unit في الـ backend؟ وإمتى الـ unit أحسن؟
2. إمتى تعمل mock وإمتى لأ؟ اديني مثال على over-mocking.
3. الـ test ده flaky — إيه الـ 5 أسباب المحتملة وإزاي تشخّص كل واحد؟
4. إيه الفرق بين coverage و mutation score؟

**Security:**
5. اشرح IDOR بمثال وإزاي تمنعه معماريًا (مش في كل endpoint يدوي).
6. CSRF: إزاي بيشتغل، وإمتى `SameSite` كفاية وإمتى لأ؟
7. SSRF: اديني سيناريو خطير على AWS وإزاي تمنعه.
8. الـ AI كتب endpoint — إيه الـ 5 حاجات اللي هتراجعها أمنيًا؟
9. اعمل threat model لـ feature "upload profile picture" في 5 دقايق.

**DevOps:**
10. اكتب Dockerfile لـ Node production-ready من الذاكرة واشرح كل سطر.
11. Liveness vs readiness: إيه اللي بيحصل لو لخبطتهم؟
12. Node في K8s بيتقتل بـ OOMKilled — إيه الأسباب المحتملة؟
13. اشرح zero-downtime deploy خطوة بخطوة من الـ migration للـ traffic switch.
14. ECS Fargate vs Lambda vs EKS للـ API بتاعك — قرار مبرر بالتكلفة والـ workload.
15. إيه هو error budget وإزاي بيغيّر قرارات الفريق؟
16. فاتورة AWS زادت 40% الشهر ده — إزاي تحقق؟
