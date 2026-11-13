<!-- AUTO:START -->
# 09 — قواعد البيانات والـ Data Layer — Progress

> آخر تحديث: 2026-11-13 · شغّل `node _tools/update-progress.js` بعد أي تعديل.

**الإجمالي:** 0 / 175 بند · **0%**

`░░░░░░░░░░░░░░░░░░░░` 0%

| المستوى | خلصان | الإجمالي | % | |
| --- | ---: | ---: | ---: | --- |
| 🟢 الأساسيات | 0 | 28 | 0% | `░░░░░░░░░░░░` |
| 🟡 المتوسط | 0 | 89 | 0% | `░░░░░░░░░░░░` |
| 🔴 المتقدم | 0 | 58 | 0% | `░░░░░░░░░░░░` |

**Artifacts المطلوبة:** 6 · **أسئلة اختبار الخروج:** 10

## الدروس (`lessons/`)

| # | الدرس | المستوى | الوقت |
| --- | --- | --- | --- |
| 1 | [Your Database Lab: psql, Docker Compose & GUI Plan Viewers](./lessons/01-lab-psql-compose-gui.html) | 🟢 Basic | 45 min |
| 2 | [Data Modeling: ERDs, Relationships, Keys & Normalization](./lessons/02-data-modeling.html) | 🟢 → 🟡 | 60 min |
| 3 | [SQL Core: DDL, DML, Joins, Aggregates & NULL](./lessons/03-sql-core.html) | 🟢 Basic | 60 min |
| 4 | [Postgres Data Types & Constraints](./lessons/04-types-constraints.html) | 🟢 Basic | 60 min |
| 5 | [First Contact: Indexes & Transactions](./lessons/05-indexes-transactions-intro.html) | 🟢 Basic | 45 min |
| 6 | [CTEs, Window Functions & LATERAL](./lessons/06-ctes-windows-lateral.html) | 🟡 Intermediate | 60 min |
| 7 | [Upserts, Semi-Joins, Set Operations, JSONB & Arrays](./lessons/07-upserts-semijoins-jsonb-arrays.html) | 🟡 Intermediate | 60 min |
| 8 | [Reading EXPLAIN: Scans, Sorts, Aggregates & Limits](./lessons/08-explain-scans-nodes.html) | 🟡 Intermediate | 60 min |
| 9 | [Join Algorithms, Estimates & work_mem](./lessons/09-joins-estimates-work-mem.html) | 🟡 Intermediate | 60 min |
| 10 | [B-tree Mastery: Composite, Partial, Covering & Expression Indexes](./lessons/10-btree-composite-partial-covering.html) | 🟡 Intermediate | 60 min |
| 11 | [Hash, GIN, GiST, BRIN & When Indexes Hurt](./lessons/11-index-types-and-costs.html) | 🟡 Intermediate | 60 min |
| 12 | [Search: Postgres FTS, pg_trgm & When to Reach for Elasticsearch](./lessons/12-search-fts-trgm-elasticsearch.html) | 🟡 Intermediate | 60 min |
| 13 | [Isolation Levels, Anomalies & Serialization Retries](./lessons/13-isolation-anomalies-retries.html) | 🟡 Intermediate | 60 min |
| 14 | [MVCC, VACUUM & Long Transactions](./lessons/14-mvcc-vacuum-long-transactions.html) | 🟡 → 🔴 | 60 min |
| 15 | [Locks, Deadlocks & Advisory Locks](./lessons/15-locks-deadlocks-advisory.html) | 🟡 Intermediate | 55 min |
| 16 | [Concurrency Patterns: Lost Update 3 Ways, SKIP LOCKED Queues & LISTEN/NOTIFY](./lessons/16-concurrency-patterns-skip-locked.html) | 🟡 → 🔴 | 60 min |
| 17 | [Safe Schema Changes: Tooling, Lock Timeouts & Concurrent Indexes](./lessons/17-safe-migrations.html) | 🟡 Intermediate | 60 min |
| 18 | [Expand/Contract: Zero-Downtime Changes in Practice](./lessons/18-expand-contract.html) | 🟡 Intermediate | 60 min |
| 19 | [ORMs, Query Builders & Data Access in Practice](./lessons/19-orms-query-builders.html) | 🟡 Intermediate | 60 min |
| 20 | [Repository, Unit of Work & Query Objects from the Data Side](./lessons/20-repository-uow-query-objects.html) | 🟡 → 🔴 | 50 min |
| 21 | [Data Rules That Last: Soft Deletes, Audit Logs, Money, Time & GDPR](./lessons/21-soft-delete-audit-money-time-gdpr.html) | 🔴 Advanced | 60 min |
| 22 | [Connection Pooling, PgBouncer & Prepared Statements](./lessons/22-pooling-pgbouncer-prepared.html) | 🟡 → 🔴 | 60 min |
| 23 | [Replication, Read Replicas & Failover](./lessons/23-replication-read-replicas.html) | 🟡 Intermediate | 60 min |
| 24 | [Partitioning: Range, List, Hash & Retention](./lessons/24-partitioning.html) | 🔴 Advanced | 55 min |
| 25 | [Monitoring & Tuning Postgres](./lessons/25-monitoring-tuning.html) | 🔴 Advanced | 60 min |
| 26 | [Denormalization on Purpose: Materialized Views, Summary Tables & Read Models](./lessons/26-denormalization-read-models.html) | 🔴 Advanced | 55 min |
| 27 | [Backups, Point-in-Time Recovery & Major Upgrades](./lessons/27-backups-pitr-upgrades.html) | 🔴 Advanced | 60 min |
| 28 | [Multi-Tenancy: Strategies, Row-Level Security & Least Privilege](./lessons/28-multitenancy-rls-roles.html) | 🔴 Advanced | 60 min |
| 29 | [Beyond Plain Postgres: pgvector, Time Series, Graphs & MySQL](./lessons/29-pgvector-timescale-graph-mysql.html) | 🔴 Advanced | 60 min |
| 30 | [Sharding & Consistency Across Databases](./lessons/30-sharding-consistency.html) | 🔴 Advanced | 60 min |
| 31 | [The NoSQL Map & MongoDB Document Modeling](./lessons/31-nosql-map-mongodb-modeling.html) | 🟢 → 🟡 | 60 min |
| 32 | [MongoDB in Depth: Indexes, Aggregation, Transactions & Replica Sets](./lessons/32-mongodb-in-depth.html) | 🟡 Intermediate | 60 min |
| 33 | [DynamoDB: Access Patterns First](./lessons/33-dynamodb.html) | 🟡 Intermediate | 55 min |
| 34 | [Redis Foundations: Data Structures, TTLs, Keys & Pipelining](./lessons/34-redis-foundations.html) | 🟢 → 🟡 | 60 min |
| 35 | [Redis Atomicity & Distributed Locks](./lessons/35-redis-atomicity-locks.html) | 🟡 Intermediate | 60 min |
| 36 | [Caching Patterns, Sessions & Rate Limiters](./lessons/36-caching-sessions-rate-limits.html) | 🟡 → 🔴 | 60 min |
| 37 | [When Caches Fail: Stampede, Penetration, Avalanche, Invalidation & Hot Keys](./lessons/37-cache-failure-modes.html) | 🔴 Advanced | 60 min |
| 38 | [Running Redis: Persistence, Eviction, Memory, Big Keys & Cluster](./lessons/38-running-redis.html) | 🟡 → 🔴 | 60 min |
| 39 | [Queue, Log or Pub/Sub: Redis Streams, RabbitMQ & Cloud Queues](./lessons/39-queues-logs-streams-rabbitmq.html) | 🟡 → 🔴 | 60 min |
| 40 | [Kafka: Partitions, Delivery Semantics & Choosing a Broker](./lessons/40-kafka.html) | 🟡 → 🔴 | 60 min |
| 41 | [Outbox, CDC & Idempotent Consumers](./lessons/41-outbox-cdc-idempotency.html) | 🟡 → 🔴 | 60 min |
| 42 | [Saga & Event Sourcing from the Data Side](./lessons/42-saga-event-sourcing.html) | 🔴 Advanced | 50 min |
| 43 | [OLTP vs OLAP: Warehouses, Pipelines & ClickHouse](./lessons/43-analytics-olap-pipelines.html) | 🔴 Advanced | 60 min |

<!-- AUTO:END -->

## ملاحظاتي (يدوي — مش بيتمسح)

### بنود واقفة عندها / أسئلة معلّقة
-

### حاجات اتعلمتها وعايز أفتكرها
-

### الـ Artifacts
- [ ]
