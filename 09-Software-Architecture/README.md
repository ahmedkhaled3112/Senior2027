# 09 — Software Architecture

> **ليه القسم ده:** الـ Software Architecture بتجاوب: إزاي أنظّم الكود **جوه النظام الواحد** عشان يفضل سهل التغيير والفهم والاختبار. (System Design في القسم 10 بتجاوب: إزاي أوزّع النظام على machines وخدمات.) الاتنين مكمّلين، والأول بيبني طريقة التفكير اللي التاني بيستخدمها على scale.
>
> **ملحوظة:** الـ Design Patterns (GoF، Enterprise، Node، React، Resilience، Messaging) ليهم قسم مستقل كامل في [08-Design-Patterns](../08-Design-Patterns/README.md) — القسم ده بيفترض إنك خلصته، وبيركّز على الحدود والـ styles والـ DDD والقرارات.
>
> ده واحد من أكبر قسمين عمدًا — لأنه محور الانتقال لـ Senior.
>
> **الوقت التقريبي:** 5 أسابيع · **المصدر الأنسب:** Clean Architecture + Fundamentals of Software Architecture + [refactoring.guru](https://refactoring.guru) + Learning DDD (Khononov)

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
القسم ده مش بيتعلم بالقراءة بس: لكل pattern اكتبه في TypeScript، ولكل style اعمل مثال صغير، ولكل مفهوم اسأل "فين ده في الـ codebase بتاعي دلوقتي؟"

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 المفاهيم التأسيسية
- [ ] **إيه هي الـ architecture**: القرارات اللي صعب تغييرها بعدين (structure، boundaries، dependencies، tech choices) — و"architecture is about trade-offs، مفيش best، فيه least worst"
- [ ] **Coupling**: الاعتماد بين modules — tight vs loose، وليه الـ tight coupling بيخلي التغيير غالي
- [ ] **Cohesion**: الحاجات المترابطة تبقى مع بعض — high cohesion = module بيعمل حاجة واحدة واضحة
- [ ] Abstraction و encapsulation و **information hiding** (Parnas: الـ module بيخبّي القرار اللي ممكن يتغير)
- [ ] Separation of concerns: كل جزء مسؤول عن حاجة واحدة (UI، business logic، data access)
- [ ] Modularity: module boundaries، interfaces، **dependency direction** (مين بيعتمد على مين)
- [ ] Technical debt: إيه هو، الأنواع (deliberate vs accidental، prudent vs reckless)، وإنه مش دايمًا وحش
- [ ] Architecture characteristics ("-ilities"): scalability، availability، maintainability، testability، security، performance، observability، deployability — وتعرف **تحدد الأهم 3 للنظام بتاعك** (مش كلهم)

### 1.2 Design principles الأساسية
- [ ] **DRY** (Don't Repeat Yourself) — وإمتى الـ duplication أحسن من الـ wrong abstraction (WET: write everything twice قبل ما تـ abstract)
- [ ] **KISS**، **YAGNI** (You Aren't Gonna Need It) — ضد الـ over-engineering
- [ ] Principle of least astonishment: الكود يعمل اللي متوقع منه
- [ ] **Composition over inheritance**: ليه، ومثال في TS
- [ ] Fail fast: validate بدري، crash على الـ programmer errors
- [ ] Separation of pure logic عن side effects (مقدمة للـ functional core / imperative shell)

### 1.3 SOLID (مقدمة)
- [ ] **S** — Single Responsibility: الـ class/module ليه سبب واحد للتغيير (actor واحد)
- [ ] **O** — Open/Closed: مفتوح للـ extension مقفول للـ modification (strategy بدل if/else متزايد)
- [ ] **L** — Liskov Substitution: الـ subtype لازم يشتغل مكان الـ base من غير مفاجآت
- [ ] **I** — Interface Segregation: interfaces صغيرة محددة بدل واحدة كبيرة
- [ ] **D** — Dependency Inversion: الـ high-level بيعتمد على abstractions مش على الـ low-level details
- [ ] تكتب مثال TypeScript لكل واحد: قبل وبعد

### 1.4 Code organization أساسي
- [ ] Folder structure: by layer (`controllers/`، `services/`، `repositories/`) vs by feature (`users/`، `orders/`) — الفرق وإمتى كل واحد
- [ ] Layered architecture الأساسي: presentation → application/service → data access، والقاعدة: الاعتماد لتحت بس
- [ ] Barrel files (`index.ts`) ومشاكلها (circular deps، tree shaking)
- [ ] Circular dependencies: إزاي بتحصل وإزاي تكسرها
- [ ] Naming: الكود يقرا زي الـ domain (ubiquitous language مقدمة)

### 1.5 Design patterns (مرجع)
- [ ] خلصت 🟢 المستوى 1 من [08-Design-Patterns](../08-Design-Patterns/README.md): Factory، Strategy، Observer، Singleton، Adapter، Decorator، Facade، Chain of Responsibility، Repository، DTO — وتعرف شكلهم كـ functions/closures في TS

### 1.6 Refactoring أساسي
- [ ] Code smells الأساسية: long function، long parameter list، duplicated code، magic numbers، deep nesting، god object
- [ ] Refactoring techniques: extract function، inline، rename، extract variable، introduce parameter object، replace magic number with constant
- [ ] القاعدة: refactor بـ tests موجودة، خطوات صغيرة، commit كل خطوة

---

## 🟡 المستوى 2 — المتوسط

### 2.1 المفاهيم بعمق
- [ ] **أنواع الـ coupling**: afferent (مين بيعتمد عليّ) vs efferent (أنا بعتمد على مين)، instability metric
- [ ] **Connascence**: static (name، type، meaning، position، algorithm) vs dynamic (execution، timing، value، identity) — وقوتها، وإزاي تقلّل الأقوى
- [ ] Temporal coupling (لازم تنادي A قبل B)، وإزاي تكسره بالـ design
- [ ] **Conway's Law**: النظام بيطلع على شكل الفريق — والـ inverse Conway maneuver
- [ ] Architecture quantum و الـ deployability
- [ ] قياس الـ technical debt وإدارته (debt register، 20% rule، boy scout rule)
- [ ] Architecture characteristics trade-offs: ليه مينفعش تاخد كلهم (performance vs security، flexibility vs simplicity)

### 2.2 Design principles بعمق
- [ ] SOLID بإتقان وبأمثلة من codebase حقيقي: **وإمتى الالتزام الحرفي بيضر** (SRP بتعمل 50 class لحاجة بسيطة، DIP بتعمل interface لكل حاجة)
- [ ] **Law of Demeter** (don't talk to strangers: `a.getB().getC().doX()` smell) و **Tell, Don't Ask**
- [ ] **Dependency Inversion vs Dependency Injection vs IoC container**: الفرق بين الثلاثة (مبدأ / technique / tool)
- [ ] DI بدون framework في TS: constructor injection، factory functions، composition root
- [ ] DI بـ framework (NestJS، tsyringe، InversifyJS): الـ trade-offs (magic، decorators، testability)
- [ ] **Functional core, imperative shell**: الـ domain logic pure functions، الـ I/O على الأطراف — وليه ده بيسهّل الـ testing جدًا
- [ ] Immutability كمبدأ معماري
- [ ] Design by contract: preconditions، postconditions، invariants (و Zod/assertions كتطبيق)
- [ ] Defensive programming بحدود: validate على الحدود، trust جوه

### 2.3 Design patterns و Enterprise patterns (مرجع)
- [ ] خلصت 🟡 المستوى 2 من [08-Design-Patterns](../08-Design-Patterns/README.md): GoF كاملة، Enterprise patterns (Repository، Unit of Work، Data Mapper vs Active Record، Service Layer، Specification، Gateway، DTO/Mapper)، Node patterns، React patterns، والـ anti-patterns
- [ ] تقدر تربط كل pattern بمكانه في الـ architecture: Repository/Gateway = ports & adapters، Service Layer = application layer، Specification = domain، Decorator = cross-cutting concerns

### 2.4 Patterns على مستوى الـ architecture
- [ ] **الـ pattern ↔ الـ layer**: فين كل pattern بيعيش في Hexagonal/Clean (adapters في infrastructure، use cases في application، specifications/VOs في domain)
- [ ] Cross-cutting بالـ decorators/interceptors بدل ما تتكرر في كل use case (logging، transaction، validation، caching، authorization)
- [ ] Composition root: المكان الواحد اللي بيركّب الـ dependencies (factories + DI) — وإنه الوحيد اللي بيعرف الـ concrete classes

### 2.5 Architectural styles (جوه التطبيق الواحد)
- [ ] **Layered (n-tier)** بعمق: presentation / application / domain / infrastructure، قواعد الاعتماد (strict vs relaxed)، ومشكلته الشهيرة (الـ domain بيعتمد على الـ DB)
- [ ] **Hexagonal (Ports & Adapters)**: الـ core معزول، **ports** = interfaces (driving: HTTP، CLI / driven: DB، email)، **adapters** = implementations — وليه ده بيخلي الـ framework تفصيلة قابلة للتبديل
- [ ] **Onion و Clean Architecture** (Uncle Bob): الدوائر (entities → use cases → interface adapters → frameworks)، **the dependency rule** (الاعتماد لجوه بس)، use cases/interactors، وإن الثلاثة (hexagonal/onion/clean) نفس الفكرة بتسميات مختلفة
- [ ] **Vertical Slice Architecture**: التنظيم بالـ feature/use case مش بالـ layer، كل slice فيها كل حاجتها، وإمتى أحسن من Clean (features مستقلة، فريق كبير، تقليل الـ ceremony)
- [ ] **Modular Monolith**: modules بحدود واضحة، كل module له public API، مفيش DB sharing بين modules (أو على الأقل مفيش cross-module joins)، **enforcing boundaries** (ESLint `no-restricted-imports`، `eslint-plugin-boundaries`، `dependency-cruiser`، Nx module boundaries) — **وليه ده الـ default الصح لمعظم المشاريع**
- [ ] Pipeline / middleware architecture (Express، Koa، Unix pipes)
- [ ] Event-driven داخل التطبيق: domain events، in-process event bus، decoupling الـ side effects (user registered → send email، update analytics)
- [ ] Plugin architecture / microkernel (VS Code، Fastify plugins، ESLint)
- [ ] **المقارنة والاختيار**: جدول بتختار فيه style حسب حجم الفريق، domain complexity، العمر المتوقع، معدل التغيير — وتبرر

### 2.6 Domain-Driven Design — Tactical
- [ ] **Entities** (identity مهمة) vs **Value Objects** (immutable، equality by value — `Money`، `Email`، `Address`)
- [ ] **Aggregates**: cluster من entities/VOs له root، **aggregate boundary** هي transaction boundary، قواعد: reference بالـ ID مش بالـ object، **one transaction per aggregate**، اعمله صغير
- [ ] **Invariants**: القواعد اللي الـ aggregate بيحميها (مش بتتكسر أبدًا) — vs validation على الحدود
- [ ] **Repositories** للـ aggregates بس (مش لكل entity)
- [ ] **Domain services** (logic مش بتنتمي لـ entity واحدة) vs **Application services** (orchestration: load aggregate → call method → save → publish event)
- [ ] **Domain events**: `OrderPlaced`، immutable، past tense، dispatch بعد الـ commit (مع outbox)
- [ ] **Factories** للـ aggregates المعقدة
- [ ] Application layer: use cases، commands/queries، DTOs in/out، validation (shape) vs invariants (business)
- [ ] DDD في TypeScript/Node: شكل الـ folders (`domain/`، `application/`، `infrastructure/`، `presentation/`)، immutable VOs بـ `readonly` + factory with validation، aggregate root enforcement، domain events dispatch
- [ ] **إمتى DDD بيستاهل** (domain معقد، rules كتير، فريق كبير) **وإمتى CRUD app عادي أحسن** (معظم الـ admin panels والـ simple APIs)

### 2.7 Integration و Service boundaries (مقدمة)
- [ ] Monolith → modular monolith → microservices: الرحلة، وإن معظم المشاريع المفروض تبدأ monolith منظم
- [ ] Sync (REST/gRPC) vs async (events/messages) integration: الـ trade-offs (coupling، latency، complexity، consistency)
- [ ] API as contract: versioning، backward compatibility rules (add optional fields ok، remove/rename not ok)
- [ ] Shared libraries vs duplication بين services (وليه الـ shared domain library بتعمل distributed monolith)

### 2.8 Cross-cutting concerns
- [ ] **Error handling strategy** على مستوى النظام: error types hierarchy، فين بتتمسك (boundaries)، mapping للـ HTTP/responses، logging مرة واحدة
- [ ] **Validation**: أين (على الحدود — HTTP، messages، env) وكيف (schemas — Zod) والفرق عن الـ domain invariants (جوه الـ aggregate)
- [ ] Logging/tracing/metrics **كجزء من التصميم** مش إضافة بعدين: correlation IDs في الـ context، structured logs، spans على الـ use cases
- [ ] Configuration: من env، validated at startup، typed، secrets منفصلة
- [ ] Feature flags كـ architectural tool (trunk-based، gradual rollout، kill switch)
- [ ] Security by design: فين الـ authN (الحدود) والـ authZ (الـ application layer / الـ domain)، input boundaries، least privilege
- [ ] Caching كطبقة معمارية: فين (decorator على الـ repository؟ على الـ use case؟) والـ consistency implications
- [ ] Concurrency: optimistic (version) vs pessimistic locking في الـ domain، idempotency keys للـ commands
- [ ] Internationalization، time zones (UTC جوه، local على الأطراف)، **money handling** (`Money` value object، minor units، currency، rounding)

### 2.9 Code quality و Refactoring متوسط
- [ ] **Refactoring (Fowler) techniques**: extract/inline function، move function/field، replace conditional with polymorphism، replace temp with query، decompose conditional، extract class، introduce parameter object، replace primitive with object، remove middle man
- [ ] Code smells بعمق: feature envy، data clumps، primitive obsession، shotgun surgery، divergent change، speculative generality، inappropriate intimacy
- [ ] **Legacy code**: characterization tests (tests بتوثّق السلوك الحالي)، **seams** (أماكن تقدر تغيّر السلوك من غير تعديل الكود)، strangler fig للـ rewrite التدريجي
- [ ] Testing architecture: test pyramid vs trophy، **testability كنتيجة للـ design الجيد** (hexagonal بيسهّل: الـ core بيتختبر بدون DB)، test doubles على الـ ports
- [ ] Public API لكل module، internal vs exported، `package.json` `exports` لـ enforcement
- [ ] Static analysis: ESLint rules معمارية، `dependency-cruiser` (rules للـ dependency direction)، `eslint-plugin-boundaries`، **architecture tests** في الـ CI
- [ ] Documentation as code: README لكل module، ADRs (الجزء الجاي)

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Domain-Driven Design — Strategic
- [ ] **Domain و subdomains**: core (الميزة التنافسية — استثمر فيه)، supporting (لازم بس مش مميز)، generic (اشتريه — auth، billing) — تصنّف الـ subdomains في مشروعك
- [ ] **Bounded contexts**: حدود اللغة والـ model — نفس الكلمة (`Customer`) معناها مختلف في Sales و Support، وكل context له model بتاعه
- [ ] **Ubiquitous language**: اللغة المشتركة بين الـ devs والـ domain experts، في الكود والـ docs والـ conversations
- [ ] **Context mapping** — العلاقات بين الـ contexts: shared kernel، customer-supplier، conformist، **anti-corruption layer** (ACL — تترجم model خارجي لـ model بتاعك)، open host service، published language، separate ways، partnership
- [ ] **Event storming** كأداة: workshop بالـ sticky notes (events → commands → aggregates → bounded contexts) — تعمله لمشروعك
- [ ] Bounded contexts → module boundaries (في monolith) أو service boundaries (في microservices)
- [ ] Domain model evolution، و"Learning DDD" (Khononov) approach: الـ business logic patterns حسب الـ subdomain type (transaction script للـ generic، domain model للـ core)

### 3.2 CQRS و Event Sourcing
- [ ] **CQRS**: فصل الـ write model (commands، aggregates، invariants) عن الـ read model (queries، denormalized views، DTOs مباشرة من SQL) — وإنه ممكن يكون بسيط جدًا (نفس الـ DB، handlers مختلفة)
- [ ] Read models denormalized: materialized views، projection tables، Elasticsearch — eventual consistency بينهم والـ write model، وإزاي الـ UI بتتعامل معاها
- [ ] Command handlers و query handlers، command bus/mediator pattern
- [ ] **Event Sourcing**: الـ events هي source of truth (مش الـ state)، rebuilding state بالـ replay، **snapshots** للـ performance، **projections** للـ read models، event store (EventStoreDB، Postgres table، Kafka بحذر)
- [ ] Event versioning و **upcasting** (الـ event القديم بيتحوّل للشكل الجديد)، schema evolution
- [ ] GDPR و event sourcing: حذف البيانات مشكلة (crypto-shredding، pseudonymization)
- [ ] **التكلفة الحقيقية**: complexity، eventual consistency في كل مكان، debugging، tooling — والـ cases اللي تستاهل (audit trail إلزامي، finance/ledger، collaboration/undo، temporal queries)
- [ ] **CQRS بدون event sourcing** كخيار وسط (الأشهر عمليًا)
- [ ] Sagas/process managers في الـ event-sourced systems

### 3.3 Integration و Service boundaries بعمق
- [ ] **متى ولماذا تنقل لـ microservices**: الأسباب الصح (فرق مستقلة بتحتاج deploy مستقل، scaling مختلف لأجزاء مختلفة، tech stack مختلف محتاج) والغلط (hype، "Netflix بتعمل كده")
- [ ] **Strangler fig pattern**: تحوّل تدريجي — route جديد → service جديد، القديم بيتآكل
- [ ] **Service boundaries بالـ bounded contexts**، data ownership (**database per service** — مفيش shared DB)، وإيه اللي بيحصل لما تغلط في الحدود (chatty services، distributed transactions في كل مكان)
- [ ] Sync vs async integration بعمق: request/response (REST/gRPC) للـ queries، events للـ state changes، commands عبر queues للـ async work — والـ temporal coupling
- [ ] **Distributed transactions**: مفيش 2PC عمليًا → **sagas** (orchestration: coordinator بيقول مين يعمل إيه / choreography: كل service بيسمع events) — compensation actions، outbox، idempotency في كل خطوة
- [ ] **Consumer-driven contracts** (Pact): الـ consumer بيعرّف اللي محتاجه، الـ provider بيتأكد إنه بيلبيه في الـ CI
- [ ] API evolution: versioning strategies، tolerant reader، expand/contract للـ APIs
- [ ] **Anti-corruption layers** بين services و legacy systems
- [ ] **BFF** (backend-for-frontend): API مفصّل لكل client (web، mobile)، إمتى يستاهل
- [ ] API gateway كـ pattern: routing، auth، rate limiting، aggregation — vs BFF
- [ ] **Distributed monolith** كـ anti-pattern: علاماته (deploy لازم يكون مع بعض، shared DB، sync calls chain، shared domain library) — وإنه أسوأ من الاتنين
- [ ] Shared libraries بين services: إيه اللي ينفع (utils، logging، contracts/types) وإيه اللي ميعنفعش (domain logic، DB models)
- [ ] Service templates / chassis pattern (logging، tracing، health جاهزين لكل service جديد)

### 3.4 Architecture practice (شغل الـ architect / السنيور)
- [ ] **ADRs (Architecture Decision Records)**: الشكل (context، decision، status، consequences)، متى تكتب واحدة (أي قرار صعب الرجوع فيه)، فين تحطها (في الـ repo)، وإنها immutable (قرار جديد = ADR جديد بيـ supersede)
- [ ] **Design docs / RFCs**: المشكلة، السياق والـ constraints، الخيارات (3 على الأقل) مع الـ trade-offs، القرار والتبرير، المخاطر، خطة الـ rollout، open questions — في صفحة أو اتنين، ويتعمل عليه review قبل الكود
- [ ] **C4 model**: context (النظام والعالم حواليه) → container (apps، DBs، services) → component (modules جوه container) → code (نادر) — وتعمل diagrams **مفيدة مش مزخرفة** (كل diagram بيجاوب على سؤال واحد)
- [ ] Sequence diagrams للـ flows المعقدة، data flow diagrams، state diagrams للـ lifecycles
- [ ] Diagrams as code: Mermaid، Structurizr، PlantUML — في الـ repo جنب الكود
- [ ] **Trade-off analysis** (ATAM مبسّط): تحدد الـ quality attributes المهمة → scenarios → تقيّم كل option ضدها → sensitivity points و risks
- [ ] **Fitness functions** (evolutionary architecture): tests أوتوماتيكية للـ architecture characteristics (dependency rules، performance budgets، bundle size، cyclomatic complexity thresholds) في الـ CI
- [ ] **Evolutionary architecture**: تصميم للتغيير مش للتوقع، incremental migration، **reversible vs irreversible decisions** (Bezos's one-way/two-way doors — اصرف وقت على الـ one-way بس)، last responsible moment
- [ ] Architecture review: checklist (boundaries، data ownership، failure modes، security، observability، cost)، وإزاي تعمل review من غير ما تكون gatekeeper
- [ ] Technical due diligence: تقيّم codebase/architecture غريبة في يوم (structure، tests، deps، debt، risks)
- [ ] **التواصل**: تشرح الـ architecture لجمهور تقني (diagrams، trade-offs) وغير تقني (الأثر، التكلفة، المخاطر، الوقت) — نفس القرار بلغتين
- [ ] Architecture governance خفيفة: principles مكتوبة، ADRs، automated checks — مش لجان

### 3.5 Advanced patterns و Concurrency
- [ ] **Concurrency patterns**: producer/consumer، worker pool، pipeline (stages)، fan-out/fan-in، **actor model** كمفهوم (Erlang، Akka، Orleans — state + mailbox)، reactive streams/backpressure
- [ ] Reactive programming كمفهوم (RxJS، observables، operators) وإمتى يستاهل (complex event streams في الـ UI) وإمتى over-engineering
- [ ] State machines كـ architectural tool للـ lifecycles (order status، subscription status) — explicit transitions، guards، وليه أحسن من booleans و if/else
- [ ] Idempotency design على مستوى النظام: idempotency key storage، response caching، TTL
- [ ] Temporal/workflow engines كمفهوم (Temporal.io): durable execution للـ long-running business processes
- [ ] Multi-tenancy architecture: tenant context propagation، isolation levels، per-tenant config/features
- [ ] Plugin/extension systems design: hooks، lifecycle، sandboxing

### 3.6 الكتب والمراجع للقسم ده
- [ ] **Clean Architecture** (Robert C. Martin) — الـ dependency rule والـ SOLID
- [ ] **Fundamentals of Software Architecture** + **Software Architecture: The Hard Parts** (Richards & Ford) — الـ styles والـ trade-offs والـ distributed decisions
- [ ] **Domain-Driven Design** (Evans — الأصل، تقيل) أو **Implementing DDD** (Vernon) أو **Learning DDD** (Khononov — الأسهل والأحدث، ابدأ بيه)
- [ ] **Patterns of Enterprise Application Architecture** (Fowler) — الـ enterprise patterns
- [ ] **Refactoring** (Fowler، 2nd ed بـ JS) — الـ techniques والـ smells
- [ ] **Design Patterns** (GoF) أو [refactoring.guru](https://refactoring.guru) كبديل عملي وأسهل
- [ ] **A Philosophy of Software Design** (Ousterhout) — deep modules، complexity، أفضل كتاب قصير عن الـ design
- [ ] **Building Evolutionary Architectures** (Ford، Parsons، Kua) — fitness functions
- [ ] **Monolith to Microservices** (Newman) — الـ migration patterns

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **أعد هيكلة المشروع الجانبي كـ Modular Monolith بـ Hexagonal/Clean**: `modules/<name>/{domain,application,infrastructure,presentation}`، public API لكل module، architecture tests بـ `dependency-cruiser` في الـ CI بتمنع الـ cross-module imports والـ domain → infrastructure.
2. **DDD على module واحد core** (مثلًا Orders): aggregates، value objects (`Money`، `OrderId`)، invariants، domain events مع outbox، application services، tests على الـ domain من غير DB.
3. **CQRS light**: read models منفصلة بـ SQL مباشر لصفحة dashboard واحدة.
4. **Patterns repo**: 10 patterns بإيدك في TypeScript، كل واحد فيه: المشكلة، الحل، إمتى over-engineering.
5. **3 ADRs حقيقية** للمشروع (مثلًا: ليه modular monolith، ليه Postgres، ليه BullMQ) + **RFC واحد** لقرار معلّق في شغلك الحالي وقدّمه.
6. **C4 diagrams** (context + container + component لـ module واحد) بـ Mermaid في الـ repo.
7. **Event storming** لمشروعك (حتى لو لوحدك) → bounded contexts → ترسم context map.

## 📚 المصادر

- [refactoring.guru](https://refactoring.guru) — Design patterns + Refactoring، الأسهل والأوضح
- [Clean Architecture — Uncle Bob (blog post)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture — Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Learning DDD — Vlad Khononov](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/)
- [DDD Reference — Evans (مجاني، ملخص)](https://www.domainlanguage.com/ddd/reference/)
- [Martin Fowler — Architecture guide](https://martinfowler.com/architecture/) و [Catalog of P of EAA](https://martinfowler.com/eaaCatalog/)
- [C4 model](https://c4model.com/) و [ADR GitHub org](https://adr.github.io/)
- [Khalil Stemmler — DDD in TypeScript](https://khalilstemmler.com/articles/categories/domain-driven-design/)
- [Software Architecture: The Hard Parts](https://www.oreilly.com/library/view/software-architecture-the/9781492086888/)
- [Connascence.io](https://connascence.io/)

## ✅ اختبار الخروج

1. اشرح الفرق بين coupling و cohesion، واديني مثال من الـ codebase بتاعك على tight coupling وإزاي تفكّه.
2. Hexagonal vs Clean vs Onion: إيه الفرق الحقيقي؟ (الإجابة: تقريبًا مفيش — اشرح ليه)
3. إيه هو الـ aggregate وليه "one transaction per aggregate"؟
4. إمتى تستخدم DDD وإمتى CRUD كفاية؟ اديني معيار واضح.
5. إمتى الـ modular monolith أحسن من microservices؟ وإيه علامات الـ distributed monolith؟
6. اشرح saga orchestration vs choreography بمثال order → payment → shipping.
7. Event sourcing: إمتى يستاهل وإيه تكلفته الحقيقية؟
8. اكتب ADR لقرار اتاخد في شغلك في 10 دقايق.
9. ارسم C4 container diagram لمشروعك على ورقة.
10. إيه الفرق بين Dependency Inversion و Dependency Injection؟
