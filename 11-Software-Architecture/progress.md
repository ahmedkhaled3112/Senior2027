<!-- AUTO:START -->
# 11 — Software Architecture — Progress

> آخر تحديث: 2026-11-13 · شغّل `node _tools/update-progress.js` بعد أي تعديل.

**الإجمالي:** 0 / 146 بند · **0%**

`░░░░░░░░░░░░░░░░░░░░` 0%

| المستوى | خلصان | الإجمالي | % | |
| --- | ---: | ---: | ---: | --- |
| 🟢 الأساسيات | 0 | 29 | 0% | `░░░░░░░░░░░░` |
| 🟡 المتوسط | 0 | 60 | 0% | `░░░░░░░░░░░░` |
| 🔴 المتقدم | 0 | 57 | 0% | `░░░░░░░░░░░░` |

**Artifacts المطلوبة:** 7 · **أسئلة اختبار الخروج:** 10

## الدروس (`lessons/`)

| # | الدرس | المستوى | الوقت |
| --- | --- | --- | --- |
| 1 | [What Architecture Is: Hard Decisions, -ilities & Trade-offs](./lessons/01-what-architecture-is.html) | 🟢 Basic | 55 min |
| 2 | [Coupling, Cohesion & Connascence: Measuring What Makes Change Expensive](./lessons/02-coupling-cohesion-connascence.html) | 🟡 Intermediate | 60 min |
| 3 | [Modularity, Information Hiding & Who Depends on Whom](./lessons/03-modularity-information-hiding.html) | 🟡 Intermediate | 55 min |
| 4 | [DRY, KISS, YAGNI, Least Astonishment & Composition](./lessons/04-design-principles.html) | 🟢 Basic | 50 min |
| 5 | [SOLID Before & After, and When It Hurts](./lessons/05-solid.html) | 🟡 Intermediate | 60 min |
| 6 | [Code Organization: Folders, Layers, Barrels, Cycles & Names](./lessons/06-code-organization.html) | 🟢 Basic | 55 min |
| 7 | [Refactoring Safely: Smells, Small Steps & a Commit per Step](./lessons/07-refactoring-basics.html) | 🟢 Basic | 50 min |
| 8 | [Fowler's Catalog & Smells That Span Files](./lessons/08-refactoring-catalog-smells.html) | 🟡 Intermediate | 60 min |
| 9 | [Technical Debt & Legacy Code: Measure It, Pin It, Change It](./lessons/09-tech-debt-legacy.html) | 🟡 Intermediate | 60 min |
| 10 | [Functional Core, Imperative Shell & Immutability](./lessons/10-functional-core-immutability.html) | 🟡 Intermediate | 55 min |
| 11 | [Contracts at the Boundary: Fail Fast, Validation & Config](./lessons/11-contracts-fail-fast-validation.html) | 🟡 Intermediate | 55 min |
| 12 | [DIP vs DI vs Containers, and the Composition Root](./lessons/12-di-composition-root.html) | 🟡 Intermediate | 60 min |
| 13 | [From Layered to Hexagonal: Ports, Adapters & Testing the Core](./lessons/13-layered-hexagonal.html) | 🟡 Intermediate | 60 min |
| 14 | [Onion, Clean & Where Each Pattern Lives](./lessons/14-onion-clean-patterns-map.html) | 🟡 Intermediate | 55 min |
| 15 | [The Modular Monolith: Modules, Public APIs & Data Ownership](./lessons/15-modular-monolith.html) | 🟡 Intermediate | 60 min |
| 16 | [Enforcing Boundaries: Architecture Tests & Fitness Functions](./lessons/16-enforcing-boundaries-fitness.html) | 🔴 Advanced | 60 min |
| 17 | [Vertical Slices, Pipelines, In-Process Events, Plugins & Choosing a Style](./lessons/17-other-styles-choosing.html) | 🟡 Intermediate | 60 min |
| 18 | [DDD Tactical: Entities, Value Objects, Aggregates & Invariants](./lessons/18-ddd-entities-value-objects-aggregates.html) | 🟡 Intermediate | 60 min |
| 19 | [DDD Tactical: Repositories, Services, Factories & the Application Layer](./lessons/19-ddd-repositories-services-application.html) | 🟡 Intermediate | 60 min |
| 20 | [Domain Events, the Outbox Seam & When DDD Is Worth It](./lessons/20-ddd-events-when-worth-it.html) | 🟡 Intermediate | 55 min |
| 21 | [Errors & Observability as Part of the Design](./lessons/21-errors-observability-by-design.html) | 🟡 Intermediate | 55 min |
| 22 | [Security by Design, Feature Flags & Multi-Tenancy Architecture](./lessons/22-security-flags-multitenancy.html) | 🔴 Advanced | 60 min |
| 23 | [Caching, Concurrency & Idempotency as Architecture](./lessons/23-caching-concurrency-idempotency.html) | 🔴 Advanced | 60 min |
| 24 | [Money, Time & Locale as Design Decisions](./lessons/24-money-time-i18n.html) | 🟡 Intermediate | 50 min |
| 25 | [Strategic DDD: Subdomains, Bounded Contexts & Ubiquitous Language](./lessons/25-strategic-ddd.html) | 🔴 Advanced | 60 min |
| 26 | [Context Mapping, Anti-Corruption Layers & Event Storming](./lessons/26-context-mapping-event-storming-acl.html) | 🔴 Advanced | 60 min |
| 27 | [CQRS: Separate Reads, Real Read Models & Eventual Consistency](./lessons/27-cqrs-read-models.html) | 🔴 Advanced | 60 min |
| 28 | [Event Sourcing on Postgres: Streams, Replay, Snapshots & Projections](./lessons/28-event-sourcing-postgres.html) | 🔴 Advanced | 60 min |
| 29 | [Event Sourcing in Production: Upcasting, GDPR, Real Cost & Process Managers](./lessons/29-event-sourcing-production.html) | 🔴 Advanced | 60 min |
| 30 | [From Monolith to Services: When, How & the Distributed Monolith](./lessons/30-monolith-to-services.html) | 🔴 Advanced | 60 min |
| 31 | [Sync vs Async Integration, 2PC & Sagas](./lessons/31-sync-async-sagas.html) | 🔴 Advanced | 60 min |
| 32 | [APIs as Contracts: Evolution, Tolerant Readers & Pact](./lessons/32-contracts-between-services.html) | 🔴 Advanced | 60 min |
| 33 | [BFF, API Gateway, Shared Libraries & the Service Chassis](./lessons/33-gateways-bff-shared-code.html) | 🔴 Advanced | 60 min |
| 34 | [ADRs, Design Docs & Explaining Decisions to Two Audiences](./lessons/34-adrs-design-docs-communication.html) | 🔴 Advanced | 55 min |
| 35 | [C4, Sequence & State Diagrams as Code](./lessons/35-diagrams-c4-as-code.html) | 🔴 Advanced | 55 min |
| 36 | [Trade-off Analysis & Evolutionary Architecture](./lessons/36-tradeoffs-evolutionary.html) | 🔴 Advanced | 55 min |
| 37 | [Architecture Reviews & Technical Due Diligence](./lessons/37-reviews-due-diligence.html) | 🔴 Advanced | 55 min |
| 38 | [Concurrency Patterns & Reactive Programming at the Architecture Level](./lessons/38-concurrency-reactive.html) | 🔴 Advanced | 60 min |
| 39 | [State Machines & Durable Workflows](./lessons/39-state-machines-workflows.html) | 🔴 Advanced | 60 min |
| 40 | [The Architecture Bookshelf: 9 Books, One Runnable Idea Each](./lessons/40-architecture-bookshelf.html) | 🔴 Advanced | 55 min |

<!-- AUTO:END -->

## ملاحظاتي (يدوي — مش بيتمسح)

### بنود واقفة عندها / أسئلة معلّقة
-

### حاجات اتعلمتها وعايز أفتكرها
-

### الـ Artifacts
- [ ]
