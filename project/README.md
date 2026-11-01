# المشروع الجانبي — الخيط اللي بيربط كل الأقسام

> مشروع **واحد** عميق بيكبر مع كل قسم، أقوى في الـ interviews وفي الـ portfolio من 5 مشاريع سطحية. الفولدر ده مش للكود (الكود في repo منفصل) — ده للـ **spec والقرارات والـ design docs والتقارير**.

## الفكرة (املاها)

- **الاسم:** _____
- **الـ repo:** _____
- **الـ live URL:** _____
- **إيه هو في جملة:** _____
- **مين المستخدم:** _____
- **ليه ده بالذات:** domain فيه تعقيد كفاية (orders/payments/multi-tenant/real-time) عشان كل قسم يلاقي فيه مكان — مش todo app

> اقتراحات لو مش محدد: Multi-tenant SaaS (invoicing / booking / helpdesk) — لأنه بيغطي: auth + RBAC + tenancy + payments (idempotency) + notifications (queues) + reports (OLAP light) + real-time + AI assistant على بيانات المستخدم. وهو نفسه case study #20 في System Design.

## الهيكل

```
project/
├── README.md          ← ده (الفكرة + الحالة + الروابط)
├── spec.md            ← المتطلبات functional / non-functional + الـ MVP
├── roadmap.md         ← 4 أرباع، كل ربع مرتبط بأقسام المنهج
├── adr/               ← Architecture Decision Records (واحد لكل قرار)
│   └── 0000-template.md
├── design-docs/       ← design doc لكل feature كبيرة / system design للمشروع نفسه
│   └── 0000-template.md
└── reports/           ← load tests، profiling، EXPLAIN before/after، cost، Lighthouse
```

## الحالة الحالية

| المرحلة | الحالة | الرابط |
| --- | --- | --- |
| Spec + MVP محدد | ⬜ | [spec.md](./spec.md) |
| Backend (04) — Fastify/NestJS + auth + queues + observability | ⬜ | |
| Data layer (07) — Postgres tuning + Redis + outbox | ⬜ | |
| Frontend (05/06) — Next.js App Router + monorepo | ⬜ | |
| Patterns (08) — Strategy/Adapter/Decorator/Outbox/Circuit breaker | ⬜ | |
| Architecture (09) — modular monolith + DDD على module واحد | ⬜ | |
| System design (10) — design doc للـ bottlenecks عند 10×/100× | ⬜ | |
| Testing/Security/Deploy (11) — Testcontainers + Semgrep + Terraform + canary | ⬜ | |
| AI feature (12) — RAG على pgvector + MCP server | ⬜ | |
| منشور ومستخدم | ⬜ | |

## القواعد

1. كل قرار معماري = **ADR** في `adr/` (حتى لو صغير: "ليه Fastify مش NestJS").
2. كل feature كبيرة = **design doc** قبل الكود في `design-docs/`.
3. كل تحسين performance = **report** فيه before/after بالأرقام في `reports/`.
4. الـ README بتاع الـ code repo لازم يبقى بمستوى portfolio: screenshots، architecture diagram (C4 container)، إزاي تشغّله في 3 أوامر، الـ tech decisions بروابط للـ ADRs.
5. كل ربع في [roadmap.md](./roadmap.md) بينتهي بـ **demo** (فيديو دقيقتين) — ده اللي هتوريه في الـ interview.
