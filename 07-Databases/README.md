# 07 — قواعد البيانات والـ Data Layer

> **ليه القسم ده:** أكتر مكان بيفضح الفرق بين Mid و Senior. معظم مشاكل الـ production الحقيقية مشاكل data مش كود: query بطيئة، lock، migration وقّعت السيرفر، replication lag. السنيور بيعرف يقرأ query plan ويصمم schema يستحمل سنتين نمو.
>
> **الوقت التقريبي:** 4 أسابيع · **المصدر الأنسب:** [PostgreSQL docs](https://www.postgresql.org/docs/) + [Use The Index, Luke](https://use-the-index-luke.com/) + DDIA فصول 2–3 + Redis University

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
القسم ده لازم Postgres شغالة عندك (Docker) وجدول فيه ملايين الصفوف تجرّب عليه.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 Data modeling
- [ ] Entities و attributes و relationships: 1:1، 1:N، M:N (junction table)
- [ ] ERD: ترسمه قبل ما تكتب أي `CREATE TABLE`
- [ ] Primary keys: serial/identity vs UUID (v4 vs **v7** — وليه v7 أحسن للـ B-tree)
- [ ] Foreign keys و `ON DELETE CASCADE / SET NULL / RESTRICT`
- [ ] Normalization: 1NF (atomic values)، 2NF (no partial dependency)، 3NF (no transitive dependency) — بأمثلة

### 1.2 SQL الأساسي
- [ ] DDL: `CREATE/ALTER/DROP TABLE`، data types، constraints
- [ ] DML: `INSERT`، `UPDATE`، `DELETE`، `SELECT` مع `WHERE/ORDER BY/LIMIT/OFFSET`
- [ ] JOINs: `INNER`، `LEFT`، `RIGHT`، `FULL`، `CROSS` — ترسم الـ Venn diagram وتعرف إمتى كل واحد
- [ ] `GROUP BY` و aggregate functions و `HAVING` (الفرق عن `WHERE`)
- [ ] Subqueries: في `WHERE`، في `FROM`، correlated
- [ ] `DISTINCT`، `UNION/UNION ALL`، `CASE`
- [ ] NULL semantics: `NULL = NULL` → `NULL`، `IS NULL`، `COALESCE`، الـ NULL في aggregates و `NOT IN`

### 1.3 Data types في Postgres
- [ ] Numeric: `integer/bigint`، `numeric/decimal` (للـ money — **مش** `float`)، `real/double`
- [ ] Text: `text` vs `varchar(n)` (في Postgres مفيش فرق في الأداء)
- [ ] `timestamp` vs **`timestamptz`** (استخدم الثانية دايمًا)، `date`، `interval`
- [ ] `boolean`، `uuid`، `jsonb` (vs `json`)، arrays، enums (ومشاكل تعديلها)

### 1.4 Constraints
- [ ] `PRIMARY KEY`، `UNIQUE`، `NOT NULL`، `CHECK`، `DEFAULT`
- [ ] Exclusion constraints كمفهوم (overlapping ranges — bookings)

### 1.5 Indexes و Transactions (مقدمة)
- [ ] Index كمفهوم: B-tree، ليه بيسرّع الـ `WHERE` و `ORDER BY` وبيبطّئ الـ writes
- [ ] `CREATE INDEX`، index على الـ FK columns (Postgres مش بيعملها أوتوماتيك)
- [ ] ACID بمثال عملي
- [ ] `BEGIN / COMMIT / ROLLBACK`

### 1.6 NoSQL و Redis (مقدمة)
- [ ] التصنيفات: document، key-value، wide-column، graph، search، time-series — جملة واحدة عن كل واحد وإمتى
- [ ] MongoDB الأساسي: documents، collections، CRUD، `_id`
- [ ] Redis الأساسي: `GET/SET/DEL/EXPIRE/TTL`، in-memory، إمتى تستخدمه (cache، sessions)

### 1.7 Tooling
- [ ] `psql` مريح: `\d`، `\dt`، `\di`، `\x`
- [ ] Docker Compose لـ Postgres + Redis للـ local dev
- [ ] GUI (DBeaver / TablePlus / pgAdmin) وتعرف تقرأ الـ explain plan visualization

---

## 🟡 المستوى 2 — المتوسط

### 2.1 SQL متقدم
- [ ] **CTEs** (`WITH`): للقراءة، recursive CTEs (trees، hierarchies)، `MATERIALIZED` vs not (optimization fence)
- [ ] **Window functions**: `ROW_NUMBER`، `RANK/DENSE_RANK`، `LAG/LEAD`، `SUM() OVER (PARTITION BY ... ORDER BY ...)`، running totals، top-N per group
- [ ] `LATERAL` joins (correlated subquery في `FROM` — top-N per group بكفاءة)
- [ ] Set operations: `INTERSECT`، `EXCEPT`
- [ ] `INSERT ... ON CONFLICT` (upsert)، `RETURNING`
- [ ] `EXISTS` vs `IN` vs `JOIN` للـ semi-joins
- [ ] JSONB: operators (`->`، `->>`، `@>`، `?`)، `jsonb_build_object`، `jsonb_agg`، indexing بـ GIN
- [ ] Arrays: `ANY`، `unnest`، `array_agg`
- [ ] Full-text search: `tsvector`، `tsquery`، `to_tsvector`، ranking، GIN index
- [ ] `pg_trgm` للـ fuzzy/LIKE search
- [ ] Generated columns، `DISTINCT ON`

### 2.2 Indexes بجد
- [ ] **B-tree**: الافتراضي، equality + range + `ORDER BY`، prefix matching لـ `LIKE 'abc%'` (مش `'%abc'`)
- [ ] **Hash**: equality بس (نادر الاستخدام)
- [ ] **GIN**: JSONB، arrays، full-text — inverted index
- [ ] **GiST**: geometric، ranges، nearest neighbor
- [ ] **BRIN**: جداول ضخمة مرتبة طبيعيًا (timestamps) — صغير جدًا
- [ ] **Composite indexes وترتيب الأعمدة**: الـ leftmost prefix rule، equality columns الأول ثم range، `(a, b)` بيخدم `WHERE a` و `WHERE a AND b` مش `WHERE b`
- [ ] **Partial indexes**: `WHERE status = 'active'` — أصغر وأسرع
- [ ] **Covering indexes** (`INCLUDE`): index-only scans
- [ ] **Expression indexes**: `lower(email)`، `(data->>'type')`
- [ ] Unique indexes vs unique constraints
- [ ] **إمتى الـ index بيضر**: write-heavy tables، low-selectivity columns (boolean)، indexes مش بتتستخدم (`pg_stat_user_indexes`)
- [ ] Index bloat و `REINDEX`

### 2.3 Query planner
- [ ] **`EXPLAIN (ANALYZE, BUFFERS)`** — تقرأه سطر سطر
- [ ] Scan types: Seq Scan، Index Scan، Index Only Scan، Bitmap Heap Scan — وإمتى الـ planner بيختار كل واحد (وليه Seq Scan ممكن يكون صح لجدول صغير)
- [ ] Join types: Nested Loop، Hash Join، Merge Join — وإمتى كل واحد
- [ ] **Estimates vs actuals**: لما الـ rows المتوقعة بعيدة عن الفعلية → statistics قديمة → `ANALYZE`
- [ ] `work_mem` والـ sort/hash اللي بيروح الـ disk (`external merge`)
- [ ] Sort، Aggregate، Limit nodes
- [ ] Tools: `explain.dalibo.com`، `pev2`
- [ ] الـ N+1 من منظور الـ DB: 1000 query صغيرة أسوأ من query واحدة بـ join

### 2.4 Transactions و Concurrency
- [ ] **Isolation levels**: Read Uncommitted (مش موجود فعليًا في PG)، **Read Committed** (الافتراضي)، **Repeatable Read**، **Serializable**
- [ ] **الـ anomalies**: dirty read، non-repeatable read، phantom read، **lost update** (الأخطر والأشهر)، write skew — ومثال عملي لكل واحدة
- [ ] **MVCC في Postgres**: كل row له versions (xmin/xmax)، readers مش بيبلوكوا writers، وليه ده بيعمل dead tuples
- [ ] `VACUUM` و `autovacuum`: ليه مهم، bloat، `VACUUM FULL` (lock!)، transaction ID wraparound (كمفهوم)
- [ ] Locking: row-level (`FOR UPDATE`، `FOR SHARE`، `FOR NO KEY UPDATE`)، table-level locks والـ `ALTER TABLE` اللي بيبلوك كل حاجة
- [ ] **`SELECT ... FOR UPDATE SKIP LOCKED`**: الـ queue pattern في Postgres (job queue من غير Redis)
- [ ] **Deadlocks**: إزاي بتحصل (lock ordering)، Postgres بيكتشفها ويقتل واحد، إزاي تتجنبها
- [ ] Advisory locks: application-level locks (distributed cron، migrations)
- [ ] Optimistic locking (`version` column) vs pessimistic (`FOR UPDATE`): إمتى كل واحد
- [ ] Serialization failures و retry logic من الكود
- [ ] Long transactions وليه خطر (locks، bloat، replication)

### 2.5 Schema migrations
- [ ] Migration tooling: versioned، forward-only غالبًا، في الـ CI/CD كخطوة منفصلة قبل الـ deploy
- [ ] **Zero-downtime migrations — expand/contract pattern**: ضيف العمود الجديد → اكتب في الاتنين → backfill → حوّل القراءة → شيل القديم
- [ ] **`CREATE INDEX CONCURRENTLY`** (مش بيبلوك الـ writes — بس مينفعش جوه transaction)
- [ ] إضافة عمود بـ `NOT NULL` + `DEFAULT` على جدول كبير (PG 11+ سريع للـ constant default)
- [ ] تغيير نوع عمود على جدول كبير: مش `ALTER COLUMN TYPE` مباشرة (rewrite + lock) → عمود جديد + backfill
- [ ] Backfills بالـ batches مع `sleep` (مش `UPDATE` واحد لـ 50M row)
- [ ] `lock_timeout` و `statement_timeout` في الـ migrations عشان متوقّعش production
- [ ] Renaming columns/tables بأمان (views أو expand/contract)
- [ ] إضافة FK على جدول كبير: `NOT VALID` ثم `VALIDATE CONSTRAINT`

### 2.6 ORMs و Data access
- [ ] ORM vs query builder vs raw SQL: الـ trade-offs (productivity vs control vs performance)
- [ ] Prisma: schema، migrate، `include`/`select`، raw queries، الـ N+1 والـ relation loading، connection pool (و Accelerate/PgBouncer مع serverless)
- [ ] Drizzle: SQL-like API، relational queries، migrations بـ drizzle-kit، إمتى أحسن من Prisma
- [ ] TypeORM/Knex/Mongoose كمفهوم
- [ ] **N+1**: تكتشفها في الـ query logs، تحلها بـ join/`include`/batching (DataLoader)
- [ ] Over-fetching: `SELECT *` vs columns محددة
- [ ] Transactions من الـ application layer (interactive transactions)، وpropagation عبر الـ services (`AsyncLocalStorage`)
- [ ] Repository pattern و Unit of Work: إمتى يستاهلوا وإمتى الـ ORM نفسه كفاية
- [ ] Seeding و test data

### 2.7 Connection pooling و Replication
- [ ] Connection pooling في الـ app (`pg.Pool`): sizing (formula: `cores * 2 + spindles` كبداية، مش 100)
- [ ] **PgBouncer**: session vs transaction vs statement modes، وإيه اللي بيتكسر في transaction mode (prepared statements، `SET`، advisory locks)
- [ ] ليه PgBouncer مهم مع Node (كذا instance × pool) ومع serverless (connection لكل invocation)
- [ ] Replication: streaming (physical)، logical (selective، cross-version)، primary/replica
- [ ] Read replicas: توجّه الـ reads لها، **replication lag** و read-your-writes problem (user بيعمل write ومش بيشوفه)، الحل (route الـ read بعد الـ write للـ primary)
- [ ] Failover كمفهوم (Patroni، managed RDS)

### 2.8 NoSQL متوسط
- [ ] **MongoDB document modeling**: embedding vs referencing — القاعدة "البيانات اللي بتتقري مع بعض تتخزن مع بعض"، الـ unbounded array anti-pattern
- [ ] Indexes في Mongo (compound، multikey، text، TTL)، `explain()`
- [ ] Aggregation pipeline: `$match`، `$group`، `$lookup`، `$project`، `$unwind`، الترتيب والـ performance
- [ ] Schema validation (JSON Schema)، transactions (multi-document — وتكلفتها)
- [ ] Replica sets، sharding كمفهوم، change streams (CDC)
- [ ] إمتى Mongo اختيار صح (schema مرن، documents مستقلة، write-heavy) وإمتى غلط (علاقات كتير، reporting معقد، transactions كتير)
- [ ] **DynamoDB**: partition key / sort key، access patterns أولًا، single-table design، GSIs، capacity modes، hot partitions
- [ ] Elasticsearch/OpenSearch: inverted index، mappings، analyzers، relevance scoring، aggregations، وليه مش primary DB

### 2.9 Redis متوسط
- [ ] **Data structures وبنستخدم كل واحدة في إيه**: strings (cache، counters)، hashes (objects)، lists (queues، recent items)، sets (tags، unique)، **sorted sets** (leaderboards، rate limiting، scheduling)، streams (event log)، HyperLogLog (unique counts)، bitmaps (flags)، geo
- [ ] **Caching patterns**: cache-aside (الأشهر)، read-through، write-through، write-behind — الـ trade-offs
- [ ] TTL strategies، key naming conventions (`user:123:profile`)
- [ ] Sessions store، rate limiter (sliding window بـ sorted set أو `INCR` + `EXPIRE`)
- [ ] Pub/sub (fire-and-forget) vs streams (persistent، consumer groups)
- [ ] Distributed lock: `SET NX PX`، release بـ Lua script، **Redlock وحدوده** (Kleppmann's critique — fencing tokens)
- [ ] Atomic operations: `INCR`، `MULTI/EXEC`، Lua scripting
- [ ] Persistence: RDB vs AOF، وإنك متعتمدش على Redis كـ source of truth
- [ ] Eviction policies (`allkeys-lru`، `volatile-ttl`)، `maxmemory`
- [ ] Pipelining لتقليل الـ round trips

### 2.10 Messaging أساسي ومتوسط
- [ ] **Queue vs log vs pub/sub**: الفرق الجوهري (الـ message بتتشال بعد الاستهلاك؟ كذا consumer يقدروا يقروا نفس الـ message؟)
- [ ] RabbitMQ: exchanges (direct/topic/fanout/headers)، queues، bindings، routing keys، `ack/nack/reject`، prefetch (QoS)، DLX، TTL
- [ ] Kafka: topics، partitions، offsets، consumer groups، retention، replication factor
- [ ] Cloud equivalents: SQS (standard vs FIFO)، SNS، Pub/Sub، EventBridge
- [ ] Idempotent consumers (الـ message ممكن توصل مرتين)، dead-letter queues، retries مع backoff

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Postgres على scale
- [ ] **Partitioning**: range (by date)، list، hash — partition pruning، إدارة الـ partitions (`pg_partman`)، إمتى يستاهل (100M+ rows، time-series، retention بالـ drop partition)
- [ ] Table inheritance (قديم — تعرفه بس)
- [ ] **Monitoring**: `pg_stat_statements` (أهم extension — top queries by time)، slow query log (`log_min_duration_statement`)، `pg_stat_activity` (الـ locks والـ long queries)، cache hit ratio، bloat queries، index usage
- [ ] Vacuum tuning على الجداول الكبيرة، `autovacuum` per-table settings
- [ ] `work_mem`، `shared_buffers`، `effective_cache_size`، `max_connections` — الأساسيات وليه (pgtune كبداية)
- [ ] Logical replication للـ zero-downtime major upgrades والـ CDC
- [ ] **Row-level security (RLS)** للـ multi-tenancy: policies، `SET app.tenant_id`، الـ trade-offs
- [ ] Roles و privileges: least privilege للـ app user (مش superuser)
- [ ] **Backups**: `pg_dump` (logical) vs base backup + WAL (PITR)، **اختبار الـ restore** (backup مش متجرّب = مفيش backup)
- [ ] `pgvector`: embeddings storage، HNSW vs IVFFlat indexes، similarity search — للـ AI features
- [ ] `LISTEN/NOTIFY` للـ lightweight pub/sub من الـ DB
- [ ] Prepared statements، `PREPARE`/`EXECUTE`، والـ plan caching (generic vs custom plans)
- [ ] Denormalization المقصودة: materialized views (و`REFRESH CONCURRENTLY`)، summary tables، counters cache
- [ ] MySQL/MariaDB للعلم: InnoDB، **clustered index** (الـ PK هو الجدول — وليه الـ UUID v4 PK كارثة هناك)، الفروق في الـ isolation defaults

### 3.2 Multi-tenancy strategies
- [ ] Shared schema + `tenant_id` column (الأشهر — + RLS أو filter في كل query): أرخص، noisy neighbor، الـ "forgot the filter" bug
- [ ] Schema per tenant: isolation أحسن، migrations × N، connection pooling مشكلة
- [ ] Database per tenant: أقوى isolation، أغلى، للـ enterprise tiers
- [ ] Hybrid: الـ tiers الكبيرة DB منفصلة، الصغيرة shared
- [ ] Tenant-aware indexes (`tenant_id` أول عمود في الـ composite)

### 3.3 Sharding و Distributed data
- [ ] إمتى تعمل sharding (آخر حل — بعد vertical scaling، read replicas، caching، partitioning)
- [ ] Shard key choice: cardinality، hot spots، query patterns (كل query لازم يكون معاها الـ shard key)
- [ ] Cross-shard queries والـ joins (تجنبها بالـ design)، resharding وتكلفته
- [ ] Citus كمثال على Postgres sharding، Vitess لـ MySQL
- [ ] Consistency models بالنسبة لكل DB: Postgres (strong في single node)، Mongo (tunable: write concern، read concern)، Cassandra (tunable quorum)، DynamoDB (eventual by default، strong optional)
- [ ] CAP بالنسبة للـ DBs اللي بتستخدمها (تفاصيله في System Design)

### 3.4 Event-driven data patterns
- [ ] **Outbox pattern** بالتفصيل: جدول `outbox` في نفس الـ transaction، relay process (polling أو CDC)، at-least-once delivery، ordering
- [ ] **CDC (Change Data Capture)** بـ Debezium: WAL → Kafka، use cases (cache invalidation، search indexing، analytics sync)
- [ ] Idempotent consumers بالتفصيل: idempotency key table، `INSERT ... ON CONFLICT DO NOTHING`
- [ ] Saga pattern للـ distributed transactions (orchestration vs choreography)، compensating actions
- [ ] Event sourcing كمفهوم: events كـ source of truth، projections، snapshots، التكلفة وإمتى يستاهل (نادرًا — audit، finance)
- [ ] Kafka متقدم: **delivery semantics** (at-most/at-least/exactly-once — والـ exactly-once فعليًا idempotent producer + transactions)، ordering guarantees (per partition بس)، partition key choice، compaction، schema registry (Avro/Protobuf) و schema evolution، consumer lag monitoring، rebalancing
- [ ] Kafka vs RabbitMQ vs SQS: قرار مبرر حسب (throughput، ordering، replay، ops cost)

### 3.5 Redis متقدم
- [ ] **Cache stampede / thundering herd**: الـ key بينتهي وألف request بيروحوا الـ DB — الحلول (lock، early/probabilistic refresh، stale-while-revalidate)
- [ ] Cache penetration (queries لـ keys مش موجودة — cache الـ null أو Bloom filter) و cache avalanche (كل الـ keys بتنتهي مع بعض — jitter في الـ TTL)
- [ ] Cache invalidation strategies: TTL، event-based (بعد الـ write)، tags/versioning (`user:123:v5`)، وليه "هناك مشكلتان صعبتان فقط"
- [ ] Hot keys: key واحد بياخد كل الـ traffic → local cache layer أو key replication
- [ ] Redis Cluster (hash slots، resharding، multi-key limitations) vs Sentinel (HA لـ single master) vs replication
- [ ] Big keys وليه خطر (blocking)، `SCAN` بدل `KEYS`
- [ ] Redis as rate limiter على scale: sliding window log vs sliding window counter، Lua للـ atomicity
- [ ] Redis streams كـ lightweight Kafka: consumer groups، `XACK`، pending entries، إمتى كفاية
- [ ] Memory analysis: `MEMORY USAGE`، `--bigkeys`، encoding optimizations

### 3.6 Analytics و Data pipelines
- [ ] **OLTP vs OLAP**: row-oriented vs **columnar storage**، وليه الـ analytical queries بتقتل Postgres
- [ ] Data warehouse (structured، BigQuery/Snowflake/Redshift) vs data lake (raw، S3 + query engine) vs lakehouse
- [ ] ETL vs ELT، batch vs streaming
- [ ] ClickHouse كمفهوم: إمتى تحوّل الـ reports/dashboards ليه (MergeTree، materialized views)
- [ ] dbt كمفهوم (transformations as SQL + tests)
- [ ] من Postgres للـ warehouse: CDC، scheduled exports، `pg_dump` للـ small
- [ ] TimescaleDB للـ time-series فوق Postgres، InfluxDB كمفهوم
- [ ] Graph DBs (Neo4j) كمفهوم: إمتى (deep relationships — recommendations، fraud) وإمتى recursive CTE كفاية

### 3.7 Data access architecture
- [ ] Repository pattern بإتقان: interface في الـ domain، implementation في الـ infrastructure، testability
- [ ] Unit of Work، data mappers vs active record (تفاصيله في Software Architecture)
- [ ] Query objects و specification pattern للـ complex filters
- [ ] Read models منفصلة (CQRS light): DTOs للقراءة مباشرة بـ SQL، domain models للكتابة
- [ ] Soft deletes وتكلفتها (كل query فيها `deleted_at IS NULL` + partial index)
- [ ] Audit logging: trigger-based vs application-based vs CDC
- [ ] Money handling: `numeric` أو integer minor units، currency column، rounding rules
- [ ] Time zones: `timestamptz` + UTC في الـ DB، تحويل في الـ presentation بس
- [ ] Data retention، archival (cold storage)، GDPR deletion design (hard delete vs crypto-shredding)

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **تمرين الـ 10 مليون صف**: ولّد جدول (أو 3 جداول مترابطة) بـ 10M rows بسكريبت، اكتب 5 queries بطيئة، وحسّنها بالـ indexes والـ rewriting — **وثّق الـ before/after من `EXPLAIN ANALYZE`** (ده تمرين واحد بيعلّمك أكتر من 10 كورسات).
2. **Migration بدون downtime** موثّقة: غيّر نوع عمود على الجدول الكبير بـ expand/contract، وقيس الـ locks بـ `pg_stat_activity`.
3. **Concurrency demo**: اكتب سكريبت يعمل lost update، وحلّه بـ 3 طرق (`FOR UPDATE`، optimistic version، serializable + retry).
4. **Redis cache layer** في المشروع بـ cache-aside + tags invalidation + stampede protection، مع تمرين على `SKIP LOCKED` queue في Postgres.
5. **Outbox + consumer** في المشروع: event من transaction → BullMQ/Kafka → idempotent consumer.
6. **Design doc صفحة واحدة**: الـ multi-tenancy strategy للمشروع والـ trade-offs.

## 📚 المصادر

- [PostgreSQL docs](https://www.postgresql.org/docs/current/) — الفصول: Indexes، Concurrency Control، Performance Tips
- [Use The Index, Luke](https://use-the-index-luke.com/) — أفضل مرجع للـ indexes، كامل
- Designing Data-Intensive Applications (Kleppmann) — الفصول 2 (data models)، 3 (storage engines)، 5 (replication)، 6 (partitioning)، 7 (transactions)
- [Redis University](https://university.redis.com/) — RU101
- [pganalyze blog](https://pganalyze.com/blog) و [Crunchy Data blog](https://www.crunchydata.com/blog) — Postgres بعمق
- [Postgres.fm podcast](https://postgres.fm/)
- [MongoDB University — Data Modeling](https://learn.mongodb.com/)
- [Martin Kleppmann — How to do distributed locking](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)
- [Braintree — Safe Operations for High Volume PostgreSQL](https://medium.com/paypal-tech/postgresql-at-scale-database-schema-changes-without-downtime-20d3749ed680)

## ✅ اختبار الخروج

1. اقرأ الـ `EXPLAIN ANALYZE` ده (query من مشروعك) واشرح ليه الـ planner اختار Hash Join وليه الـ estimate بعيد.
2. Composite index `(a, b, c)`: إيه الـ queries اللي بيخدمها وإيه اللي لأ؟
3. اشرح lost update بمثال وإزاي تمنعه بـ 3 طرق.
4. إزاي تضيف index على جدول فيه 100M row في production من غير downtime؟ وإزاي تغيّر نوع عمود؟
5. إيه هو MVCC وليه بيحتاج VACUUM؟
6. User عمل update ومش شايف التغيير — إيه الاحتمالات (replication lag، cache، router cache)؟
7. اشرح cache stampede و3 حلول.
8. Kafka exactly-once: موجودة فعلًا؟ إزاي بتتحقق عمليًا؟
9. إمتى تختار Mongo بدل Postgres؟ وإمتى DynamoDB؟
10. اشرح الـ outbox pattern وليه محتاجه.
