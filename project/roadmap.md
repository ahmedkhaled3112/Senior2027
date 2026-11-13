# Roadmap — 4 أرباع، كل ربع بينتهي بـ demo

> الترتيب مقصود: العمق الأول عشان الباقي يتبني عليه، والـ AI في الربع 3 عشان تبنيه على backend ناضج، والربع الأخير كله إثبات المستوى. عدّل التواريخ حسب بدايتك.

## الربع 1 — الأساس العميق (الأقسام 01–06 + 09)

**الهدف:** backend production-grade تعرف كل سطر فيه ليه موجود.

| الأسبوع | الشغل | القسم | الـ artifact |
| --- | --- | --- | --- |
| 1–2 | Spec + MVP + ADR-0001 (stack) + repo setup (TS strict، ESLint، Vitest، Docker Compose) | 01–03 | spec.md، adr/0001 |
| 3–5 | Core API: Fastify/NestJS، modular structure، Zod validation، OpenAPI، error contract (RFC 9457) | 06 | API شغالة + OpenAPI |
| 6–7 | Auth: sessions أو JWT + refresh rotation، OAuth + PKCE، RBAC، multi-tenancy isolation | 06 | adr/0002 (auth strategy) |
| 8–9 | Data layer: schema + migrations، indexes، EXPLAIN على الـ hot queries، 10M rows exercise | 09 | reports/explain-before-after.md |
| 10–11 | Queues (BullMQ)، Redis cache-aside + stampede protection، outbox pattern، graceful shutdown | 06/09 | adr/0003 (queue choice) |
| 12 | pino + OpenTelemetry + Testcontainers tests + load test (autocannon) | 06/13 | reports/load-test-q1.md + **Demo 1** |

**بوابة الخروج:** API منشورة على Railway/Fly بـ Docker، p95 معروف، coverage ≥ 70% على الـ domain، 3 ADRs.

## الربع 2 — Frontend + Patterns + Architecture (07، 08، 10، 11)

**الهدف:** full-stack monorepo بـ architecture تقدر تدافع عنها.

| الأسبوع | الشغل | القسم | الـ artifact |
| --- | --- | --- | --- |
| 1–3 | React frontend: TanStack Query + RHF + Zod (shared schemas) + Zustand + component library صغيرة | 07 | Storybook |
| 4–5 | Next.js App Router: RSC، Server Actions، DAL auth pattern، caching strategy table لكل route، LCP < 2.5s | 08 | reports/lighthouse.md + caching table |
| 6 | Monorepo: apps/web + apps/api + packages/shared (pnpm + Turborepo) | 06/08 | adr/0004 |
| 7–8 | Patterns في المشروع: Strategy (notifications)، Adapter (payment)، Decorator (cache on repo)، circuit breaker على external call، Specification للـ filters | 10 | patterns/ docs |
| 9–11 | Refactor لـ modular monolith (hexagonal) + DDD على module واحد core (aggregates، VOs، domain events) + dependency-cruiser في CI | 11 | adr/0005 + C4 diagrams |
| 12 | CQRS light لصفحة dashboard + event storming doc + **Demo 2** | 11 | design-docs/ |

**بوابة الخروج:** monorepo منشور، architecture tests خضرا، 6+ ADRs، C4 diagrams في الـ repo.

## الربع 3 — System Design + AI + Production (12، 14، 13)

**الهدف:** النظام بيستحمل 10×، وفيه AI feature حقيقية، ومنشور على AWS بـ IaC.

| الأسبوع | الشغل | القسم | الـ artifact |
| --- | --- | --- | --- |
| 1–2 | Design doc للمشروع: bottlenecks عند 10×/100×، rate limiter موزّع، idempotency keys، SLO + alert | 12 | design-docs/scale-plan.md |
| 3–6 | AI feature: RAG على pgvector (hybrid + rerank) + streaming + tool calling + tenant-scoped retrieval + evals في CI + Langfuse/OTel tracing + cost caps | 14 | design-docs/ai-assistant.md + evals/ |
| 7 | MCP server بـ TypeScript يعرّض الـ API (3–5 tools) + agent loop بإيدك | 14 | repo منفصل أو package |
| 8–9 | Security: threat model، Semgrep + deps + secrets + Trivy في CI، ZAP scan، PortSwigger labs | 13 | reports/security-review.md |
| 10–11 | Terraform: VPC + ECS Fargate + RDS + ElastiCache + ALB + CloudFront، GitHub Actions بـ OIDC + canary deploy | 13 | adr/0006 + reports/aws-cost.md |
| 12 | Observability كاملة (Tempo + Grafana RED + SLO burn-rate alert + Sentry)، zero-downtime deploy تحت load test + **Demo 3** | 13 | reports/zero-downtime.md |

**بوابة الخروج:** على AWS بـ Terraform، التكلفة الشهرية موثّقة، AI feature بـ evals، security scans خضرا.

## الربع 4 — إثبات المستوى (15، 16 + مراجعة)

**الهدف:** الأدلة اللي السوق والشركة بيفهموها.

| الأسبوع | الشغل | القسم | الـ artifact |
| --- | --- | --- | --- |
| 1–2 | المشروع منشور ومستخدم (حتى 10 users)، README بمستوى portfolio، demo video | project | README + video |
| 3–6 | 20 system design docs (بتوقيت، مسجّلة) + mock interviews | 12/16 | system-design-interviews/ |
| 3–12 | NeetCode Medium كله + practical coding implementations (ساعتين يوميًا بالتوازي) | 16 | tracker |
| 7–9 | 6 مقالات تقنية من الأقسام (Postgres tuning، RAG evals، outbox، zero-downtime، event loop، modular monolith) + 2 PRs open source | 15/16 | المقالات منشورة |
| 10–11 | CV + stories.md (10 STAR) + 15 mock interviews | 16 | |
| 12 | Promotion packet أو target list + **Demo 4 (الـ portfolio كامل)** | 15/16 | |

**في الشغل طول السنة (15):** RFC واحد حقيقي (الربع 1–2)، قيادة postmortem (أي وقت)، mentorship موثّق، brag document شهري.

## الإيقاع الأسبوعي (10–12 ساعة)

- 4h المشروع (بناء + توثيق)
- 3h دراسة موجّهة (القسم الحالي — درس HTML واحد أو اتنين)
- 2h system design / engineering blog + ملخص
- 1–2h مشاركة (مقال، open source، إجابة سؤال)
