# 10 — System Design

> **ليه القسم ده:** دي المهارة اللي الـ AI مش بيعوّضها، وهي أهم فاصل في الـ senior interviews والترقيات. المطلوب مش تحفظ تصميم Twitter، لكن تمتلك **طريقة تفكير**: تعرّف المتطلبات، تقدّر الأرقام، تختار الـ trade-offs، وتبرر. System Design بتجاوب: إزاي أوزّع النظام على machines وخدمات عشان يستحمل الحمل والأعطال.
>
> ده أكبر قسم عمدًا — لأنه محور الانتقال لـ Senior.
>
> **الوقت التقريبي:** 6 أسابيع · **المصدر الأنسب:** Designing Data-Intensive Applications + System Design Interview (Alex Xu) + [ByteByteGo](https://bytebytego.com) + [System Design Primer](https://github.com/donnemartin/system-design-primer)

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
القسم ده بيتعلم بالتمرين: **كل أسبوع صمّم نظام واحد من الـ case studies في 45 دقيقة بصوت عالي (سجّل نفسك)، واكتب design doc صفحة واحدة بالـ trade-offs.**

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 المنهجية
- [ ] **Functional requirements** (النظام بيعمل إيه) vs **non-functional** (scale، latency، availability، consistency، durability، cost، security)
- [ ] تحديد الـ constraints والـ scope: "إيه اللي مش هنصممه" بنفس أهمية "إيه اللي هنصممه"
- [ ] **خطوات الـ design (interview أو design doc)**: requirements → estimation → API design → data model → high-level design → deep dive على الأجزاء الحرجة → bottlenecks → trade-offs
- [ ] **Back-of-the-envelope estimation**: QPS (users/day × actions ÷ 86400 ≈ users/day ÷ 100K per QPS)، peak = 2–3× average، storage (rows × size × years)، bandwidth، memory للـ cache (80/20 rule)
- [ ] **الأرقام اللي لازم تحفظها**: 1M users/day ≈ 12 QPS متوسط و ~100 QPS peak؛ 1 day ≈ 100K seconds؛ 1 million × 1KB = 1GB؛ powers of two (2^10 ≈ 1K، 2^20 ≈ 1M، 2^30 ≈ 1G)
- [ ] Latency numbers (من قسم CS Fundamentals) — RAM ~100ns، SSD ~100μs، datacenter RTT ~0.5ms، cross-continent ~150ms

### 1.2 المفاهيم الأساسية
- [ ] **Scalability**: vertical (أكبر machine — حدود وتكلفة) vs horizontal (machines أكتر — محتاج stateless)
- [ ] **Stateless vs stateful** services: ليه الـ stateless أسهل في الـ scale (أي instance يخدم أي request)
- [ ] **Availability** (nines: 99.9% = 8.7h downtime/year، 99.99% = 52min) وليه كل 9 بتكلّف أضعاف
- [ ] Reliability، durability (البيانات مش بتضيع)، fault tolerance (النظام بيشتغل رغم الأعطال)
- [ ] **Latency vs throughput**: الفرق، وليه تقدر تزوّد الـ throughput من غير ما تقلل الـ latency
- [ ] **Tail latency (p99)**: ليه الـ average بيكذب، وليه الـ p99 بيهم (user واحد من 100 بيشوف الأسوأ — وفي page بـ 100 request كل user بيشوفه)
- [ ] Single point of failure (SPOF) وإزاي تلاقيه في أي design
- [ ] Load balancer كمفهوم: بيوزّع على instances، health checks

### 1.3 Building blocks (المستوى الأول — تعرف كل واحد بيعمل إيه)
- [ ] Load balancer، reverse proxy، API gateway، CDN
- [ ] Relational DB، document DB، key-value store، cache
- [ ] Message queue، object storage (S3)
- [ ] DNS
- [ ] لكل واحد جملة: المدخلات، المخرجات، إمتى تستخدمه

### 1.4 Caching الأساسي
- [ ] ليه الـ cache: تقليل latency وتقليل load على الـ DB
- [ ] Cache levels: browser، CDN، application (in-memory)، distributed (Redis)
- [ ] Cache-aside pattern (الأشهر): read cache → miss → read DB → write cache
- [ ] TTL، eviction (LRU)
- [ ] Cache hit ratio كـ metric

### 1.5 Databases الأساسي في الـ design
- [ ] SQL vs NoSQL: الفرق الأساسي ومتى كل واحد (access patterns أولًا)
- [ ] Replication كمفهوم: primary/replica، reads من الـ replicas
- [ ] Indexing في الـ design: الـ queries بتحدد الـ indexes

### 1.6 Async processing الأساسي
- [ ] Message queue: producer → queue → consumer، decoupling
- [ ] إمتى تعمل حاجة async (email، video processing، أي حاجة أبطأ من الـ request budget)
- [ ] Retries و dead-letter queue كمفهوم

### 1.7 Design communication الأساسي
- [ ] ترسم high-level diagram (boxes and arrows) واضح: clients → LB → services → DBs/caches/queues
- [ ] تتكلم وإنت بترسم، تسأل clarifying questions قبل ما تبدأ

---

## 🟡 المستوى 2 — المتوسط

### 2.1 Networking و Delivery
- [ ] **DNS على scale**: TTL trade-offs، GeoDNS (routing حسب المكان)، anycast، DNS-based load balancing وحدوده
- [ ] **Load balancers بعمق**: L4 (TCP — أسرع، مش بيفهم HTTP) vs L7 (HTTP — routing بالـ path/header، TLS termination)، algorithms (round robin، weighted، least connections، least response time، IP hash، consistent hashing)، health checks (active/passive)، connection draining
- [ ] Sticky sessions وليه تتجنبها (stateless بدلها)، وإمتى مفيش بديل (WebSockets)
- [ ] Global vs regional load balancing، multi-region routing
- [ ] **Reverse proxy** (Nginx/Envoy): TLS termination، compression، caching، buffering، rate limiting
- [ ] **API gateway**: routing، auth/authZ، rate limiting، request transformation، aggregation، analytics — vs service mesh (sidecar per service، mTLS، retries/timeouts بره الكود — Istio/Linkerd كمفهوم)
- [ ] **CDN بعمق**: static vs dynamic content caching، cache keys، TTL، invalidation (purge)، origin shield، edge compute (Cloudflare Workers)، push vs pull CDN
- [ ] **Protocols للاختيار**: REST (الـ default)، GraphQL (clients متعددة)، gRPC (service-to-service، streaming)، WebSockets (bidirectional real-time)، SSE (server push، LLM streaming)، webhooks (server-to-server events)، long polling (fallback) — جدول بالـ trade-offs
- [ ] HTTP/2 و HTTP/3 implications على الـ design (multiplexing بيقلل الـ connections، QUIC للـ mobile)

### 2.2 Data storage و Modeling على scale
- [ ] **SQL vs NoSQL decision framework**: access patterns أولًا → consistency needs → scale pattern (read/write heavy) → schema flexibility → team familiarity — مش "NoSQL للـ scale"
- [ ] Indexing على scale، denormalization المقصودة، **materialized views** للـ read-heavy
- [ ] **Replication بعمق**: leader-follower (single-leader)، multi-leader (conflicts!)، leaderless (Dynamo-style quorums W + R > N)، sync vs async replication (durability vs latency)، failover وتحدياته (**split-brain**)
- [ ] **Partitioning/sharding**: by key range (hot spots لو sequential)، by hash (توزيع أحسن، range queries صعبة)، **consistent hashing** (rebalancing أقل، virtual nodes)، hot spots والحلول (key salting)، rebalancing strategies، cross-shard queries (scatter-gather)، secondary indexes في sharded DBs (local vs global)
- [ ] **Consistency models**: strong/linearizability، sequential، causal، **eventual**، read-your-writes، monotonic reads — ومثال من الـ product على كل واحد (الـ like count ممكن eventual، الرصيد لازم strong)
- [ ] **CAP** بشكل عملي (في الـ partition: اختار consistency ولا availability) و **PACELC** (وفي الحالة العادية: latency ولا consistency) — وليه CAP مبسّط زيادة
- [ ] Object storage (S3): semantics (eventual → strong consistency دلوقتي)، **presigned URLs** (upload مباشر من الـ client)، multipart upload، lifecycle policies (hot → cold → glacier)، versioning
- [ ] Data retention، archival، backups على scale (RPO/RTO)

### 2.3 Caching بعمق
- [ ] **Strategies**: cache-aside (lazy)، read-through (الـ cache بيقرا من الـ DB)، write-through (الكتابة بتعدّي على الـ cache)، write-back/write-behind (الـ cache بيكتب للـ DB بعدين — خطر)، refresh-ahead
- [ ] Eviction: LRU، LFU، FIFO، TTL-based — وإمتى كل واحد
- [ ] **Invalidation strategies**: TTL، event-driven، versioned keys، tag-based
- [ ] Cache consistency problems: stale reads، الـ race بين الـ DB write والـ cache invalidation (delete-then-write vs write-then-delete)
- [ ] **Thundering herd / stampede**: الحلول (request coalescing/locking، probabilistic early expiration، stale-while-revalidate)
- [ ] **Hot keys**: celebrity problem — local cache tier، key replication، client-side caching
- [ ] What not to cache (user-specific data بـ low hit ratio، data بيتغير كل ثانية)، cache sizing (working set estimation)
- [ ] Distributed cache topology: Redis Cluster، consistent hashing للـ cache nodes، cache node failure behavior
- [ ] CDN caching للـ API responses (`Cache-Control`، `Vary`، `stale-while-revalidate`)

### 2.4 Asynchronous processing و Messaging
- [ ] **Message queues vs event streams vs pub/sub**: queue (work distribution، message بتتشال)، stream/log (replay، multiple consumers، ordering — Kafka)، pub/sub (fan-out، fire-and-forget)
- [ ] **Delivery guarantees**: at-most-once (fire and forget)، **at-least-once** (الـ default العملي — retries + idempotent consumers)، exactly-once (فعليًا = at-least-once + idempotency/dedup)
- [ ] **Ordering guarantees**: global ordering غالي، per-key/per-partition ordering هو العملي (partition key = user ID)
- [ ] **Backpressure**: الـ consumer أبطأ من الـ producer — bounded queues، rate limiting للـ producers، load shedding، scaling consumers
- [ ] Consumer groups، scaling consumers (partitions = max parallelism في Kafka)
- [ ] Dead-letter queues، retries مع backoff، poison messages، message TTL
- [ ] **Event-driven architecture على scale**: event schemas (Avro/Protobuf/JSON Schema)، schema registry، **schema evolution** (backward/forward compatible)، event versioning
- [ ] Batch processing (MapReduce كمفهوم، Spark) vs stream processing (Flink، Kafka Streams — windowing، watermarks، late events) — كمفاهيم
- [ ] **Scheduling**: distributed cron (leader election أو lock)، delayed jobs (sorted set في Redis، delayed queues)، workflow engines (Temporal — durable execution) كمفهوم

### 2.5 Resilience و Reliability patterns
- [ ] **Timeouts** على كل call (وقيمها مبنية على الـ p99 للـ downstream مش رقم عشوائي)
- [ ] **Retries** مع exponential backoff + **jitter** (وليه الـ jitter — retry storms)، retry budgets، إمتى متعملش retry (non-idempotent، 4xx)
- [ ] **Circuit breaker**: closed → open (بعد N failures) → half-open (تجرب) — بيحمي الـ downstream وبيفشل بسرعة
- [ ] **Bulkhead**: عزل الـ resources (thread pools، connection pools) لكل dependency عشان واحد بيقع ميوقّعش الباقي
- [ ] **Fallback** و **graceful degradation**: الـ recommendations وقعت → اعرض popular items؛ الـ search وقع → اعرض cached results
- [ ] **Load shedding**: ارفض requests لما الـ load يعدّي الحد (503 بسرعة أحسن من timeout بطيء)، priority-based shedding
- [ ] **Rate limiting algorithms**: token bucket (bursts مسموحة)، leaky bucket (smooth)، fixed window (edge problem)، **sliding window log/counter** — و**distributed rate limiting** (Redis، الـ sync problem، local + global)
- [ ] Redundancy و failover: active-active (الاتنين شغالين) vs active-passive (standby)، multi-AZ (الـ default) vs multi-region (غالي ومعقد — data replication cross-region)
- [ ] **Disaster recovery**: RPO (كام data ممكن تضيع) و RTO (كام وقت للرجوع)، backup strategies (full/incremental، cross-region)، DR drills
- [ ] Deployment safety: canary (نسبة صغيرة)، blue/green (switch كامل)، feature flags، automated rollback على metrics
- [ ] Chaos engineering كمفهوم (Chaos Monkey)، game days

### 2.6 Distributed systems fundamentals
- [ ] **Fallacies of distributed computing** الـ 8 (الشبكة موثوقة، latency صفر، bandwidth لانهائي...) — وكل واحدة بتكسر إيه في الـ design
- [ ] **Time و clocks**: clock skew (الساعات مش متطابقة)، NTP، ليه `timestamp` مش كفاية للـ ordering، **logical clocks** (Lamport — happens-before)، vector clocks (concurrent detection)، hybrid logical clocks كمفهوم
- [ ] **Idempotency** بعمق: idempotency keys (client-generated)، storage والـ TTL، response replay، على مستوى الـ API والـ consumers
- [ ] **Unique ID generation**: auto-increment (مش distributed)، UUID v4 (random — B-tree fragmentation)، **UUID v7** (time-ordered)، **Snowflake** (timestamp + machine ID + sequence — 64-bit sortable)، ticket servers، ULID
- [ ] Failure detection: heartbeats، timeouts، phi accrual، **gossip protocols** كمفهوم
- [ ] Network partitions، split-brain، fencing
- [ ] **Distributed tracing** والـ correlation IDs عبر الـ services (context propagation)

### 2.7 Security على مستوى النظام
- [ ] Auth على scale: token validation (JWT stateless vs session lookup)، session stores (Redis)، SSO/OIDC، API keys management، mTLS بين services
- [ ] **Zero trust**: مفيش network داخلي موثوق، كل call بيتحقق
- [ ] Network segmentation: public/private subnets، security groups، bastion
- [ ] WAF، **DDoS mitigation** (CDN، rate limiting، anycast absorption)
- [ ] Secrets management (Vault، KMS)، encryption at rest/in transit، key rotation، envelope encryption كمفهوم
- [ ] Data privacy: PII classification، GDPR basics (right to deletion، data residency)، audit logging، data minimization
- [ ] Multi-tenancy isolation على مستوى النظام: noisy neighbor، per-tenant rate limits، tenant-aware routing

### 2.8 Observability و Operations
- [ ] الثلاث أعمدة على scale: logs (sampling، retention، cardinality)، metrics (RED: rate/errors/duration لكل service، USE: utilization/saturation/errors للـ resources)، traces (sampling strategies — head vs tail)
- [ ] **SLI / SLO / SLA / error budgets**: تعرّف "النظام شغال كويس" برقم، والـ error budget بيحدد سرعة الـ releases
- [ ] **Alerting design**: على الأعراض (latency، error rate، saturation) مش الأسباب (CPU)، alert fatigue، severity levels، runbooks لكل alert
- [ ] On-call، incident response (roles، communication، mitigation first)، **blameless postmortems** مع action items
- [ ] Capacity planning، autoscaling (metrics-based، scheduled، predictive)، cost monitoring
- [ ] Infrastructure من منظور الـ design: containers، orchestration (K8s)، IaC، service discovery، config management

### 2.9 Building blocks (المستوى التاني — المدخلات والمخرجات والـ limits)
- [ ] لكل واحد من دول تعرف: إيه اللي بيدخله، إيه اللي بيطلع منه، الـ limits (throughput، size، latency)، الـ failure modes، والتكلفة:
  - Load balancer، API gateway، CDN، reverse proxy
  - Relational DB، document DB، key-value store، wide-column (Cassandra)، search engine (Elasticsearch)، graph DB، time-series DB
  - Cache (Redis/Memcached)، message queue (RabbitMQ/SQS)، event stream (Kafka)، pub/sub
  - Object storage (S3)، block storage (EBS)، file storage (EFS)
  - Coordination service (ZooKeeper/etcd)، distributed lock
  - Rate limiter، ID generator، scheduler، notification service
  - Serverless functions، edge functions

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Distributed systems بعمق
- [ ] **Consensus**: المشكلة (الاتفاق على قيمة رغم الأعطال)، **Raft** (leader election، log replication، terms — تقرأ الـ paper أو الـ visualization)، Paxos كمفهوم، quorums (majority)
- [ ] ZooKeeper/etcd: إمتى تحتاج coordination service (leader election، config، service discovery، distributed locks)
- [ ] **Distributed locks بعمق**: lease-based locks (expire)، **fencing tokens** (الحل الحقيقي لمشكلة الـ lock اللي expired والـ holder لسه شغال)، Redlock وحدوده
- [ ] Linearizability vs serializability (الفرق — واحدة للـ single object، التانية للـ transactions)
- [ ] **Transactions على scale**: 2PC (coordinator، blocking، نادر عمليًا)، sagas (compensation)، TCC (try-confirm-cancel) كمفهوم
- [ ] **Storage engines**: B-tree (read-optimized، in-place updates) vs **LSM-tree** (write-optimized، SSTables، compaction، Bloom filters للـ reads) — Postgres/MySQL vs Cassandra/RocksDB، WAL في الاتنين
- [ ] Byzantine faults كمفهوم فقط (blockchain territory)
- [ ] Exactly-once في stream processing (checkpointing، idempotent sinks، transactional outbox)
- [ ] Geo-distribution: data locality، cross-region replication lag، conflict resolution (last-write-wins ومشاكله، CRDTs كمفهوم)، data residency laws

### 3.2 Case studies — صمّمها بإيدك (المفاهيم اللي كل واحدة بتختبرها)

لكل واحدة: 45 دقيقة بصوت عالي → design doc صفحة واحدة → قارن بحل مرجعي (Alex Xu / ByteByteGo) → اكتب إيه اللي فاتك.

**المستوى الأول (ابدأ بدول):**
- [ ] **1. URL shortener** — hashing vs ID generation (base62)، read-heavy caching، redirects (301 vs 302 والـ analytics)، collision handling
- [ ] **2. Rate limiter** — algorithms، Redis، distributed consistency، where to put it (gateway vs service)، response headers
- [ ] **3. Unique ID generator** — Snowflake، clock issues، multi-datacenter
- [ ] **4. Key-value store** — replication، partitioning (consistent hashing)، consistency (quorums)، Dynamo paper (vector clocks، hinted handoff، Merkle trees)
- [ ] **5. Notification system** — fan-out، queues per channel (push/SMS/email)، retries، preferences، rate limiting per user، idempotency، template rendering

**المستوى التاني:**
- [ ] **6. News feed** — fan-out on write (push) vs on read (pull) vs **hybrid** (celebrities pull)، timeline cache، ranking، pagination
- [ ] **7. Chat system (WhatsApp/Slack)** — WebSockets على scale، connection servers vs chat servers، presence (heartbeats)، message ordering (per conversation)، delivery receipts، storage (wide-column)، group fan-out، offline sync
- [ ] **8. Search autocomplete** — tries، top-k per prefix، data pipeline (aggregation → trie build)، sharding بالـ prefix، caching
- [ ] **9. Web crawler** — BFS على scale، URL frontier (priority + politeness)، dedup (Bloom filter، content hash)، DNS caching، robots.txt، storage، traps
- [ ] **10. File storage (Dropbox/Google Drive)** — chunking، dedup (content hash)، sync (delta)، conflicts resolution، metadata DB vs blob storage، presigned URLs، notifications للـ sync
- [ ] **11. Video streaming (YouTube)** — upload pipeline (presigned → S3)، **transcoding DAG** (resolutions، formats)، CDN، adaptive bitrate (HLS/DASH)، metadata، view counting (approximate)

**المستوى التالت (الأصعب — فيها consistency و money):**
- [ ] **12. Ride sharing / proximity (Uber)** — geospatial indexing (**geohash**، quadtree، S2)، driver location updates (high write)، matching، ETA، surge pricing، real-time via WebSockets
- [ ] **13. Payment system** — **idempotency** (مفيش double charge)، exactly-once effectively، **double-entry ledger** (immutable، debits = credits)، reconciliation مع الـ PSP، retries بحذر، PCI scope reduction (tokenization)، state machine للـ payment
- [ ] **14. Hotel/ticket booking** — concurrency (overbooking prevention)، locking (optimistic vs pessimistic vs reservation with TTL)، inventory model، idempotent booking، payment integration، double booking tests
- [ ] **15. Distributed message queue (Kafka-like)** — storage (append-only log، segments)، replication (ISR)، partitioning، consumer offsets، delivery semantics، retention
- [ ] **16. Metrics/monitoring system** — time-series storage (compression، downsampling)، pull vs push، aggregation، alerting pipeline، cardinality explosion، retention tiers
- [ ] **17. Ad click aggregation / real-time analytics** — streaming (Kafka → Flink)، exactly-once counting، late events و watermarks، lambda vs kappa architecture، reconciliation مع batch
- [ ] **18. Email service (Gmail)** — storage (metadata vs body)، search (inverted index)، spam pipeline، multi-device sync، attachments (object storage)، SMTP/IMAP كمفاهيم
- [ ] **19. Stock exchange / order matching** — low latency (in-memory matching engine)، order book data structure، ordering/fairness (sequencer)، durability (WAL)، market data fan-out
- [ ] **20. Multi-tenant SaaS (زي المنصة بتاعتك)** — isolation strategies (shared/schema/DB per tenant)، noisy neighbors (per-tenant rate limits، resource quotas)، billing/metering (usage events → aggregation)، per-tenant config/features، tenant onboarding/offboarding، data export

### 3.3 Trade-off thinking (المهارة الحقيقية)
- [ ] لكل قرار تقدر تقول **ليه ده مش ده**: SQL vs NoSQL، sync vs async، push vs pull، strong vs eventual، monolith vs services، cache vs no cache، build vs buy
- [ ] **"إيه اللي هيكسر الأول لو الحمل اتضاعف 10 مرات؟"** — تجاوب عليها لأي design (DB writes؟ cache memory؟ queue lag؟ connection count؟)
- [ ] تحدد الـ bottleneck بالأرقام مش بالإحساس (QPS × latency = concurrent connections؛ writes/sec vs DB capacity)
- [ ] Cost كبُعد تصميمي: تقدّر الـ monthly cost للـ design (compute، storage، egress — egress أغلى حاجة غالبًا)، وتقترح أرخص بنفس الـ requirements
- [ ] **Over-engineering detection**: النظام ده محتاج Kafka فعلًا ولا Postgres queue كفاية؟ محتاج microservices ولا modular monolith؟ محتاج multi-region ولا multi-AZ كفاية؟
- [ ] Evolution path: "نبدأ بكده، ولما نوصل X نعمل Y" — الـ design اللي بيكبر مش اللي بيبدأ ضخم
- [ ] Reading engineering blogs بشكل نقدي: ليه Discord نقلت من Mongo لـ Cassandra لـ ScyllaDB؟ ليه Shopify لسه monolith؟ ليه Stripe بتعمل idempotency كده؟

### 3.4 Design communication
- [ ] **Diagrams واضحة**: C4 context/container، data flow، sequence للـ critical paths — كل diagram بيجاوب سؤال واحد
- [ ] **Design doc صفحة أو اتنين**: problem، requirements (F/NF بأرقام)، options مع trade-offs، proposed design (diagram + data model + API)، failure modes، rollout plan، open questions
- [ ] **تقدّم التصميم في 30–45 دقيقة**: requirements (5) → estimation (5) → high-level (10) → deep dive (15) → trade-offs & bottlenecks (10) — وتدير الوقت
- [ ] تتعامل مع الـ pushback: "ليه مش X؟" → trade-off مش دفاع
- [ ] Interview-specific: تسأل قبل ما تفترض، تقول الـ assumptions بصوت عالي، تبدأ بسيط وتعقّد لما الـ interviewer يطلب، متحفظش حلول
- [ ] RFC process في الفريق: مين يراجع، إمتى تعمل meeting، إزاي تقفل القرار

### 3.5 الكتب والمراجع للقسم ده
- [ ] **Designing Data-Intensive Applications** (Kleppmann) — الأساس، كل الكتاب (الفصول 5–9 هي قلب الـ distributed systems)
- [ ] **System Design Interview vol. 1 & 2** (Alex Xu) — الـ case studies بمنهجية
- [ ] **Understanding Distributed Systems** (Vitillo) — أقصر وأعملي من DDIA للـ distributed
- [ ] **Site Reliability Engineering** (Google — مجاني online) — الفصول عن SLOs، monitoring، postmortems
- [ ] **Release It!** (Nygard) — الـ stability patterns (circuit breaker، bulkhead) من الـ production
- [ ] **Papers** (قراءة واحدة لكل واحدة تكفي): Dynamo (Amazon)، Bigtable (Google)، Kafka، **Raft** (In Search of an Understandable Consensus Algorithm)، MapReduce، Spanner (كمفهوم)
- [ ] **Engineering blogs**: Netflix، Uber، Stripe، Discord، Cloudflare، Shopify، Figma، Notion — اقرأ post واحد أسبوعيًا واكتب ملخص 5 سطور

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **20 design docs** (صفحة لكل case study) في folder في الـ repo، كل واحد: requirements بأرقام، estimation، diagram، data model، API، deep dive، trade-offs، "إيه اللي هيكسر الأول".
2. **تسجيلات صوتية/فيديو** لنفسك بتشرح 5 منهم على الأقل في 45 دقيقة — وتسمعهم وتكتب الملاحظات.
3. **Design doc حقيقي للمشروع الجانبي**: التصميم الحالي، الـ bottlenecks عند 10× و 100×، وخطة التطور.
4. **ملف `tradeoffs.md`**: جدول لكل قرار متكرر (SQL/NoSQL، sync/async، push/pull...) بالمعايير.
5. **ملخصات 10 engineering blog posts** (5 سطور لكل واحد: المشكلة، الحل، الـ trade-off، إيه اللي اتعلمته).
6. **طبّق في المشروع**: rate limiter موزّع بـ Redis، idempotency keys على الـ POST endpoints، circuit breaker على external call، SLO واحد مكتوب مع alert.

## 📚 المصادر

- [Designing Data-Intensive Applications](https://dataintensive.net/) — الكتاب الأهم
- [System Design Interview — Alex Xu](https://bytebytego.com/) و [ByteByteGo newsletter](https://blog.bytebytego.com/)
- [System Design Primer](https://github.com/donnemartin/system-design-primer) — مجاني وشامل
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/) — مجاني
- [Raft visualization](https://thesecretlivesofdata.com/raft/) و [Raft paper](https://raft.github.io/raft.pdf)
- [Dynamo paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)
- [Jepsen](https://jepsen.io/analyses) — consistency analyses للـ DBs الحقيقية
- [Martin Kleppmann — Distributed locking](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)
- [AWS Builders' Library](https://aws.amazon.com/builders-library/) — timeouts، retries، backoff بعمق من Amazon
- [Stripe — Idempotency](https://stripe.com/blog/idempotency) و [Designing robust and predictable APIs with idempotency](https://stripe.com/blog/idempotency)
- [High Scalability](http://highscalability.com/) — architecture case studies

## ✅ اختبار الخروج

1. 1M users يوميًا، كل واحد بيعمل 10 requests: QPS متوسط وpeak؟ لو كل request 2KB، الـ bandwidth؟ لو بنخزن 1KB لكل request لمدة 5 سنين، الـ storage؟
2. اشرح consistent hashing وليه الـ virtual nodes.
3. Fan-out on write vs on read للـ news feed: الـ trade-off وإمتى الـ hybrid.
4. ليه الـ exactly-once delivery مش موجودة فعليًا، وإزاي بتحققها عمليًا؟
5. اشرح circuit breaker و bulkhead و load shedding — وإمتى كل واحد.
6. إيه هو الـ fencing token وإيه المشكلة اللي بيحلها؟
7. B-tree vs LSM-tree: إمتى كل واحد؟
8. صمّم payment system في 20 دقيقة: إزاي تضمن مفيش double charge؟
9. الـ design بتاعك عليه 100 QPS دلوقتي — إيه اللي هيكسر الأول عند 1000 و 10000؟
10. CAP vs PACELC: اشرح بمثال من منتج بتعرفه.
11. اكتب SLO لـ API بتاعك وإيه الـ alert اللي هتعمله عليه.
