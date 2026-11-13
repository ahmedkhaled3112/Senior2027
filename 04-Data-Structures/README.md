# 04 — هياكل البيانات (Data Structures)

> **ليه القسم ده:** في القسم 03 عرفت كل structure كمفهوم. هنا هتبنيها بإيدك بـ TypeScript، تثبت الـ complexity بتاعتها بـ benchmark حقيقي، وتعرف جوّه Postgres و Redis و V8 و Node بيستخدموها إزاي. الفرق بين اللي "عارف الـ heap" واللي "يقدر يختار الـ structure الصح للـ scheduler بتاعه ويبرر الاختيار بالأرقام" هو الفرق بين mid و senior.
>
> **الوقت التقريبي:** 4 أسابيع · **المتطلبات:** 01 (JavaScript) و 02 (TypeScript) و 03 (CS Fundamentals) · **الهدف:** تبني، تقيس، وتختار.

## إزاي تستخدم الملف ده

علّم كل بند بواحدة من دول:
- ✅ أعرفه وأقدر أشرحه لجونيور في دقيقتين من غير جوجل
- 🔄 أعرفه بس محتاج مراجعة
- ❌ متعلمتوش

البنود اللي 🔄 أو ❌ هي خطتك. لكل structure: ابنيها بإيدك (مش بالـ AI) → اكتب لها tests بـ `node:test` → قيسها قدام الـ built-in → قول فين هتستخدمها في شغلك.

**القاعدة في كل درس:** كل structure بتتكتب generic بـ TypeScript strict، معاها tests، ومعاها benchmark بيثبت الـ complexity على أحجام مختلفة (10³ / 10⁵ / 10⁶)، مش بس بيقولها.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 الذاكرة والـ arrays
- [ ] Contiguous memory و cache locality: ليه loop على array أسرع بكتير من loop على linked list بنفس الـ Big-O (تقيسها بنفسك)
- [ ] الـ elements kinds في V8 (`PACKED_SMI` → `PACKED_DOUBLE` → `PACKED_ELEMENTS` → `HOLEY` → `DICTIONARY`): إيه اللي بيخلّي الـ array تبطأ، وليه `new Array(n)` و `delete arr[i]` بيضرّوا
- [ ] `TypedArray` و `ArrayBuffer` و `DataView`: إمتى تستخدمهم (أرقام كتير، binary protocols، buffers)، والفرق في الذاكرة عن الـ array العادية
- [ ] Struct-of-arrays مقابل array-of-objects: 1M order على شكلين، والفرق في الذاكرة والسرعة

### 1.2 Dynamic array و ring buffer
- [ ] Dynamic array من الصفر: الـ growth factor (×2 مقابل ×1.5)، الـ amortized O(1) للـ push بإثبات بالـ accounting method
- [ ] Shrinking: إمتى تصغّر وإزاي تتجنب الـ thrashing (تكبر وتصغر على نفس الحد)
- [ ] Ring buffer (circular queue) من الصفر: head/tail، الـ wrap-around، full vs empty
- [ ] Ring buffer في الشغل: sliding window للـ metrics (آخر 60 ثانية من الـ latency)، و log buffer بحجم ثابت

### 1.3 Linked lists
- [ ] Singly و doubly linked list من الصفر، مع sentinel nodes عشان تشيل الـ edge cases
- [ ] العمليات وتكلفتها الحقيقية: insert/delete بعد node معروفة O(1)، الوصول بالـ index O(n)
- [ ] Benchmark: linked list مقابل array في insert في النص و iteration — وليه الـ array بتكسب أغلب الأوقات
- [ ] Intrusive lists و الـ LRU: الـ doubly linked list كجزء من structure أكبر (ده اللي بتلاقيه في LRU caches)

### 1.4 Stack و queue و deque
- [ ] Stack و queue و deque من الصفر (array-backed و ring-buffer-backed)
- [ ] فخ `Array.prototype.shift()`: ليه O(n)، وإمتى الـ queue بتاعتك بتبقى O(n²) من غير ما تحس
- [ ] Queue بـ two stacks، و amortized O(1)
- [ ] Monotonic stack و monotonic queue: next greater element، sliding window max (أعلى سعر في آخر k دقيقة)
- [ ] Stacks في الشغل: undo/redo، matching brackets في parser، تحويل recursion لـ iteration

### 1.5 Hash table من الصفر
- [ ] Separate chaining من الصفر: buckets، الـ load factor، الـ resize وتكلفته
- [ ] Open addressing: linear probing، tombstones في الـ delete، وليه الـ load factor لازم يفضل أقل
- [ ] Robin Hood hashing كمفهوم: تقليل الـ variance في طول الـ probe
- [ ] `Map` و `Set` جوّه V8 (deterministic hash tables، insertion order)، و `Map` مقابل plain object (benchmark + الفرق في الـ semantics)
- [ ] Keys مركبة: إزاي تعمل key لـ `(tenantId, orderId)` من غير ما تعمل string concat غلط

---

## 🟡 المستوى 2 — المتوسط

### 2.1 الـ hashing بعمق
- [ ] Hash functions غير التشفيرية (FNV-1a، MurmurHash3، xxHash) مقابل التشفيرية (SHA-256)، وإمتى كل واحدة
- [ ] Avalanche و distribution: تختبر hash function بنفسك على 1M key وتشوف التوزيع على الـ buckets
- [ ] HashDoS: إزاي input متعمّد يخلّي الـ hash table O(n)، وليه اللغات بتستخدم seeded hashing
- [ ] Consistent hashing من الصفر: الـ ring، virtual nodes، كام key بيتنقل لما تضيف node (تقيسها)
- [ ] Rendezvous (HRW) hashing: البديل الأبسط، والمقارنة مع الـ ring

### 2.2 Trees و BST
- [ ] BST من الصفر: insert، search، delete (الحالات التلاتة)، min/max، successor
- [ ] Traversals: in/pre/post-order و level-order، بالـ recursion وبالـ iteration (explicit stack)
- [ ] Iterators بالـ generators: `for (const order of tree)` بـ `*[Symbol.iterator]` من غير ما تبني array كاملة
- [ ] ليه الـ BST العادي بيبوظ: sorted input بيحوّلها linked list (تقيس الـ height)

### 2.3 Balanced trees
- [ ] AVL tree من الصفر: الـ balance factor، الـ rotations الأربعة
- [ ] Red-black tree: القواعد الخمسة، وليه الـ rotations أقل من AVL (القراءة بالأساس، والتنفيذ اختياري)
- [ ] Ordered map فوق balanced tree: `floor`، `ceiling`، range query (الـ orders بين تاريخين)
- [ ] Treap كبديل أبسط: balance بالاحتمالات

### 2.4 Heaps و priority queues
- [ ] Binary heap من الصفر: sift-up، sift-down، heapify في O(n) (وليه مش O(n log n))
- [ ] D-ary heap: إمتى الـ 4-ary أسرع من الـ binary (cache)
- [ ] Indexed priority queue و decrease-key: الأساس اللي Dijkstra محتاجه
- [ ] Top-k بـ heap بحجم k: أعلى 10 عملاء إنفاقًا من stream من غير ما ترتّب الكل
- [ ] Merge k sorted streams: دمج logs مترتبة من k service

### 2.5 Tries و radix trees
- [ ] Trie من الصفر: insert، search، prefix search، delete
- [ ] Radix (compressed) trie: ليه أقل في الذاكرة، وإزاي `find-my-way` (router بتاع Fastify) بيستخدمها
- [ ] Autocomplete فوق trie مع ranking (أكتر منتجات اتباعت)
- [ ] الـ trade-off في الذاكرة: trie مقابل hash set مقابل sorted array + binary search

### 2.6 تمثيل الـ graphs
- [ ] Adjacency list و adjacency matrix و edge list: الذاكرة وتكلفة كل عملية
- [ ] CSR (Compressed Sparse Row): graph كبير في TypedArrays
- [ ] Implicit graphs: الـ graph مش متخزن، بيتولد من قاعدة (states في workflow، grid)
- [ ] Graphs في الشغل: dependency graph بين الـ services، الـ permissions inheritance، الـ referral tree

### 2.7 Union-Find
- [ ] Union-Find من الصفر: path compression و union by rank، والـ inverse Ackermann كمفهوم
- [ ] Union-Find في الشغل: تجميع حسابات العملاء المكررة (نفس الإيميل أو التليفون أو الكارت)
- [ ] Connected components و offline queries

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 B-tree و B+tree
- [ ] ليه الـ disk و الـ page size بيغيّروا الحسبة: fan-out عالي و height قليل
- [ ] B+tree صغيرة من الصفر: insert مع node split، و range scan على الـ leaf links
- [ ] إزاي Postgres B-tree index شغال (page 8KB، الـ fillfactor، الـ page splits)، وتربطها بـ `EXPLAIN` في القسم 09
- [ ] Clustered مقابل non-clustered (Postgres معندوش clustered index، و`CLUSTER` إعادة كتابة مرة واحدة؛ InnoDB عنده)، و covering index — من زاوية الـ structure نفسها

### 3.2 LSM tree و skip list
- [ ] Skip list من الصفر: الـ levels العشوائية، search/insert O(log n) متوقّع
- [ ] Redis sorted set جوّاه skip list + hash (فوق 128 عضو؛ تحتها listpack): leaderboard و rate limiting بـ `ZADD`/`ZRANGE … BYSCORE`
- [ ] LSM tree كمفهوم مع تنفيذ صغير: memtable، flush لـ SSTable، compaction، و bloom filter على كل SSTable
- [ ] Write amplification و read amplification: الـ trade-off بين B-tree و LSM

### 3.3 Segment tree و Fenwick tree
- [ ] Prefix sums وحدها مش كفاية لما فيه updates
- [ ] Fenwick tree (BIT) من الصفر: range sum مع point update
- [ ] Segment tree من الصفر: range min/max/sum، و lazy propagation كمفهوم
- [ ] في الشغل: إيراد أي فترة من أيام السنة مع تعديلات متأخرة، في O(log n)

### 3.4 Probabilistic data structures
- [ ] Bloom filter من الصفر: اختيار m و k، حساب الـ false positive rate وتقيسه
- [ ] Counting Bloom filter و Cuckoo filter: لما تحتاج delete
- [ ] Count-Min Sketch: أكتر المنتجات طلبًا في stream ضخم بذاكرة ثابتة
- [ ] HyperLogLog: عدد الزوار الفريدين، وإزاي `PFADD`/`PFCOUNT` في Redis بيعملوها في 12KB بحد أقصى

### 3.5 Immutable و persistent structures
- [ ] Structural sharing: تعدّل نسخة وتحتفظ بالقديمة من غير ما تنسخ كل حاجة
- [ ] Persistent list و persistent tree (path copying)
- [ ] HAMT كمفهوم: ليه Immutable.js و Clojure بيستخدموها
- [ ] ليه React و Immer معتمدين على الفكرة دي، وتكلفة الـ immutability في الذاكرة والسرعة (تقيسها)

### 3.6 اختيار الـ structure في production
- [ ] جدول قرار: العملية الأكتر تكرارًا → الـ structure → الـ complexity → البديل
- [ ] Case study: in-process cache (LRU مقابل LFU مقابل TTL)
- [ ] Case study: delayed job scheduler (heap مقابل timing wheel مقابل sorted set في Redis)
- [ ] Case study: leaderboard و "الـ N اللي حوالين ترتيبي" — in-memory مقابل Redis مقابل Postgres
- [ ] إمتى الـ structure الصح هو "خليها في الـ DB": الحدود بين الـ in-memory و الـ database

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **مكتبة `@side/ds`** في الـ monorepo بتاع المشروع الجانبي: كل structure في القسم بـ TypeScript strict، tests بـ `node:test` بتغطي الـ edge cases، و benchmark script بيطبع جدول مقارنة مع الـ built-ins.
2. **3 structures مستخدمة فعلًا في المشروع:** ring buffer للـ latency metrics، heap للـ scheduler، و Bloom filter أو Count-Min Sketch في مكان مناسب — كل واحدة بـ ADR قصير بيبرر الاختيار بالأرقام.
3. **Cheat sheet صفحة واحدة:** كل structure، عملياتها، الـ complexity، وأمتى تختارها.

## 📚 المصادر

- [Open Data Structures (Pat Morin)](https://opendatastructures.org/) — مجاني، وفيه تنفيذ كامل لكل structure
- Introduction to Algorithms (CLRS) — الفصول 10–14 و 18–19 و 21
- Database Internals (Alex Petrov) — الجزء الأول (B-trees و LSM)
- [V8 blog: Elements kinds](https://v8.dev/blog/elements-kinds) و [Fast properties](https://v8.dev/blog/fast-properties)
- [Redis docs: Sorted sets](https://redis.io/docs/latest/develop/data-types/sorted-sets/) و [HyperLogLog](https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/)
- [PostgreSQL: B-Tree indexes](https://www.postgresql.org/docs/current/btree.html)

## ✅ اختبار الخروج

تقدر تجاوب على دول بصوت عالي من غير ما تفتح حاجة؟
1. ليه loop على array أسرع من loop على linked list حتى لو الاتنين O(n)؟ وإمتى الـ linked list تكسب؟
2. الـ queue بتاعتك فيها `shift()` و فيها 200 ألف job. إيه اللي هيحصل، وهتصلحها إزاي؟
3. ليه الـ DB index B+tree مش hash table ومش binary tree؟
4. محتاج تعرف "المستخدم ده شاف الإعلان ده قبل كده؟" لـ 100M مستخدم بذاكرة قليلة. هتستخدم إيه، وإيه الـ trade-off؟
5. Scheduler عنده مليون job متأجلة بأوقات مختلفة. هتخزّنهم في إيه، وليه؟
