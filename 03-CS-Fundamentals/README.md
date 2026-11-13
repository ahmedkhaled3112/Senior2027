# 03 — أساسيات علوم الحاسب (CS Fundamentals)

> **ليه القسم ده:** دي الأرضية اللي كل حاجة بعدها بتقف عليها. الـ Big-O بيظهر في تحليل الـ queries، الـ OS بيظهر في فهم Node والـ event loop، والـ networking بيظهر في كل سؤال System Design.
>
> **الوقت التقريبي:** 3 أسابيع · **الهدف:** سد الفجوات مش التعلم من الصفر.

## إزاي تستخدم الملف ده

علّم كل بند بواحدة من دول:
- ✅ أعرفه وأقدر أشرحه لجونيور في دقيقتين من غير جوجل
- 🔄 أعرفه بس محتاج مراجعة
- ❌ متعلمتوش

البنود اللي 🔄 أو ❌ هي خطتك. لكل بند: اقرأ المصدر → اكتب مثال صغير بإيدك (مش بالـ AI) → اشرحه بصوت عالي.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 Programming fundamentals
- [ ] Variables، types، control flow، functions، recursion (base case + recursive case، والـ call stack اللي بيتبني)
- [ ] Paradigms: imperative vs object-oriented vs functional vs declarative — تقدر تكتب نفس المشكلة بالأربعة وتقول الفرق
- [ ] Memory model الأساسي: stack vs heap، references vs values، إيه اللي بيتنسخ وإيه اللي بيتشارك
- [ ] Garbage collection كمفهوم: إيه معنى "object مش reachable"
- [ ] Error handling: exceptions vs result types (ليه بعض اللغات بتفضّل `Result<T, E>`)

### 1.2 Data Structures الأساسية
- [ ] Arrays و dynamic arrays: ليه الـ push بيبقى O(1) amortized (الـ doubling strategy)
- [ ] Linked lists (singly، doubly): إمتى أحسن من array (insert/delete في النص) وإمتى أسوأ (random access، cache locality)
- [ ] Stacks و queues و deques: التطبيقات (undo، BFS، call stack، matching brackets)
- [ ] Hash tables كمفهوم: key → hash → bucket، وليه الـ lookup O(1)
- [ ] Sets: الفرق عن الـ array في الـ membership check

### 1.3 Algorithms الأساسية
- [ ] Big-O: time و space، best/average/worst case — تحسب الـ complexity لـ loop متداخل وrecursion بسيطة
- [ ] Sorting الأساسي: insertion/selection (للمفهوم)، quicksort و mergesort (تكتبهم بإيدك وتعرف الفرق في الـ space)
- [ ] Binary search: تكتبه صح من أول مرة (الـ off-by-one errors) وتعرف شرطه (sorted input)
- [ ] Recursion: تحوّل recursion لـ iteration والعكس

### 1.4 Operating Systems الأساسي
- [ ] Process vs thread: إيه اللي بيتشارك (memory) وإيه اللي مش بيتشارك (stack، registers)
- [ ] Linux shell مريح: navigation، `ls/cd/cat/less`، pipes `|`، redirection `> >> 2>&1`، `grep` الأساسي، `ps/kill/top`
- [ ] File permissions: `rwx`، `chmod`، `chown`، owner/group/others
- [ ] Environment variables و `PATH`

### 1.5 Networking الأساسي
- [ ] OSI و TCP/IP models: الطبقات كمفهوم (مش حفظ) وفين بيقع HTTP و TCP و IP
- [ ] IP addresses، ports، localhost، إيه معنى `0.0.0.0` vs `127.0.0.1`
- [ ] HTTP الأساسي: request/response structure، methods (GET/POST/PUT/PATCH/DELETE)، status codes families (2xx/3xx/4xx/5xx) والأشهر فيهم
- [ ] DNS كمفهوم: domain → IP
- [ ] URL anatomy: scheme، host، port، path، query، fragment

### 1.6 Databases theory (مقدمة)
- [ ] Relational model: tables، rows، columns، primary key، foreign key
- [ ] Relationships: 1:1، 1:N، M:N (والـ junction table)
- [ ] SQL الأساسي: `SELECT/WHERE/ORDER BY/LIMIT`، `INSERT/UPDATE/DELETE`
- [ ] Index كمفهوم: ليه بيسرّع القراءة وبيبطّئ الكتابة

### 1.7 Software engineering basics
- [ ] Git الأساسي: `init/clone/add/commit/push/pull`، branch، merge، conflict resolution
- [ ] Semantic versioning: `MAJOR.MINOR.PATCH` وإيه معنى `^` و `~`
- [ ] Clean code: naming معبّر، functions صغيرة بتعمل حاجة واحدة، DRY، KISS، YAGNI
- [ ] Debugging منهجي: reproduce → isolate → hypothesize → verify (مش trial and error)

---

## 🟡 المستوى 2 — المتوسط

### 2.1 Data Structures متقدمة
- [ ] Hash tables من جوه: hash functions، collisions (chaining vs open addressing)، load factor، resizing وتكلفته، ليه الـ worst case O(n)
- [ ] Trees: binary tree، BST (insert/search/delete)، traversals (in/pre/post-order، level-order)
- [ ] Heaps (min/max): الـ array representation، heapify، وبنستخدمها في إيه (priority queue، top-k، scheduling)
- [ ] Priority queues كـ abstraction فوق الـ heap
- [ ] Graphs: adjacency list vs adjacency matrix (الـ trade-off في الـ space والـ lookup)، directed/undirected، weighted
- [ ] Bitmaps و bit manipulation الأساسي (`& | ^ << >>`)، إمتى بتوفر memory

### 2.2 Algorithms متوسطة
- [ ] Amortized analysis: تفهمها على الـ dynamic array وعلى الـ hash table resize
- [ ] Sorting متقدم: heapsort، counting sort، radix sort، stability (وليه مهمة في الـ multi-key sort)
- [ ] Binary search variants: first/last occurrence، search in rotated array، binary search على الإجابة
- [ ] Dynamic programming: memoization (top-down) vs tabulation (bottom-up)، تحدد الـ state والـ transition، أمثلة كلاسيكية (fib، knapsack، LCS، coin change)
- [ ] Graph traversal: BFS (shortest path في unweighted)، DFS (cycle detection، connected components)
- [ ] Topological sort (dependency resolution — ده اللي بيحصل في الـ package managers والـ build tools)
- [ ] Patterns: two pointers، sliding window، prefix sums، greedy (وإمتى الـ greedy بيفشل)
- [ ] String algorithms الأساسية: palindromes، anagrams، string building efficiency

### 2.3 Operating Systems متوسط
- [ ] Context switching وتكلفته، scheduling كمفهوم (preemptive، time slices)
- [ ] Concurrency vs parallelism: الفرق بالظبط (واحد بيتعامل مع حاجات كتير، التاني بيعمل حاجات كتير في نفس الوقت)
- [ ] Race conditions، critical sections، mutex، semaphore — ومثال على race condition في JS رغم إنه single-threaded (بين الـ await)
- [ ] Deadlock: الشروط الأربعة، وإزاي تتجنبه (lock ordering)
- [ ] Virtual memory و paging كمفهوم، إيه معنى الـ process "بيستهلك 2GB"
- [ ] Memory leaks: إزاي بتحصل في لغات فيها GC (references اتنست)
- [ ] I/O: blocking vs non-blocking، sync vs async — الأربع combinations والفرق بينهم
- [ ] Signals: `SIGTERM` vs `SIGKILL` vs `SIGINT`، وإيه اللي بيحصل للـ process
- [ ] Shell متوسط: `grep -r`، `awk` و `sed` الأساسي، `find`، `xargs`، `curl`، `ss/netstat`، `systemd` (`systemctl`، `journalctl`)

### 2.4 Networking متوسط
- [ ] TCP vs UDP: reliability، ordering، overhead، وإمتى كل واحد (HTTP vs video streaming vs DNS)
- [ ] TCP three-way handshake، وإيه اللي بيحصل عند الإغلاق
- [ ] Sockets كمفهوم: الـ server بيعمل `listen`، الـ client بيعمل `connect`
- [ ] DNS الرحلة كاملة: browser cache → OS → resolver → root → TLD → authoritative، وإيه هي الـ records (A، AAAA، CNAME، MX، TXT)، TTL
- [ ] DHCP و NAT كمفهوم (ليه الـ IP بتاعك الداخلي مختلف عن الخارجي)
- [ ] HTTP/1.1: keep-alive، head-of-line blocking، pipelining
- [ ] HTTP/2: multiplexing، header compression، server push (ومات)
- [ ] HTTP/3 و QUIC: ليه فوق UDP، إيه اللي بيحلّه
- [ ] Headers المهمة: `Content-Type`، `Accept`، `Authorization`، `Cache-Control`، `ETag`، `Set-Cookie`
- [ ] Cookies: attributes (`HttpOnly`، `Secure`، `SameSite`)، session cookies vs persistent
- [ ] Caching headers: `Cache-Control` directives (`max-age`، `no-cache` vs `no-store`)، `ETag`/`If-None-Match`، `304`
- [ ] TLS/SSL: الـ handshake بشكل عام، certificates، CA chain، ليه HTTPS بيأمّن الـ content مش الـ domain
- [ ] WebSockets vs SSE vs long polling: إمتى كل واحد
- [ ] gRPC كمفهوم: HTTP/2 + Protobuf، إمتى أحسن من REST

### 2.5 Databases theory متوسط
- [ ] ACID: كل حرف بمثال عملي
- [ ] Transactions: `BEGIN/COMMIT/ROLLBACK`، وليه مهمة
- [ ] Normalization: 1NF → 2NF → 3NF بأمثلة، وإمتى تكسرها عمدًا
- [ ] SQL متوسط: `JOIN` بأنواعه، `GROUP BY/HAVING`، subqueries، aggregate functions

### 2.6 Software engineering متوسط
- [ ] Git: `rebase` vs `merge`، `stash`، `cherry-pick`، `revert` vs `reset`، `.gitignore`
- [ ] PR workflow: branch → PR → review → merge، وإزاي تكتب PR description مفيد
- [ ] Package managers: lockfiles وليه مهمة، dependencies vs devDependencies

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Data Structures اللي بتظهر في System Design
- [ ] Balanced trees: AVL و Red-Black كمفهوم (ليه بنوازن، والـ rotations بشكل عام) — مش مطلوب تكتبهم
- [ ] B-trees و B+ trees: ليه هما أساس الـ DB indexes (disk pages، fan-out عالي، range scans)
- [ ] Tries: autocomplete، prefix matching، الـ space trade-off
- [ ] Bloom filters: probabilistic membership، false positives بس مفيش false negatives، وبيتستخدموا فين (cache، DB، CDN)
- [ ] Union-Find (Disjoint Set): path compression، union by rank، التطبيقات (connected components، Kruskal)
- [ ] Skip lists كمفهوم (Redis sorted sets)
- [ ] LRU cache: إزاي تبنيها بـ hash map + doubly linked list في O(1)
- [ ] Consistent hashing: المشكلة اللي بتحلها (resharding)، الـ ring، virtual nodes — **ده بيظهر في كل system design**

### 3.2 Algorithms متقدمة
- [ ] Dijkstra (shortest path مع weights)، وليه مش بيشتغل مع negative weights
- [ ] Big-O على كود حقيقي: تحلل function في الـ codebase بتاعك فيها nested loops وDB calls وتقول التكلفة الحقيقية
- [ ] Hashing للـ distributed systems: hash functions (MD5/SHA/MurmurHash) والفرق بين cryptographic و non-cryptographic
- [ ] Rate limiting algorithms كـ algorithms: token bucket، leaky bucket، sliding window (هتتعمق فيهم في System Design)
- [ ] Reservoir sampling، HyperLogLog كمفهوم (counting unique على scale)

### 3.3 Operating Systems متقدم (أساس فهم Node)
- [ ] epoll (Linux) / kqueue (macOS) / IOCP (Windows): إزاي الـ OS بيقولك "الـ socket ده جاهز" من غير thread لكل connection — **ده أساس libuv والـ event loop**
- [ ] الـ C10K problem وليه الـ event-driven model حلّه
- [ ] Thread pools: ليه بعض العمليات (file I/O، DNS، crypto) لازم threads حتى في Node
- [ ] GC algorithms: mark-and-sweep، generational GC (young/old generation)، stop-the-world pauses — وعلاقتها بالـ latency spikes
- [ ] CPU cache و memory locality: ليه الـ array أسرع من الـ linked list فعليًا
- [ ] File descriptors و limits (`ulimit`)، "too many open files" في production
- [ ] Debug server بيعمل 100% CPU: `top/htop` → `strace`/`perf` → تحدد الـ process والسبب

### 3.4 Networking متقدم
- [ ] Load balancers: L4 vs L7 (إيه اللي كل واحد بيشوفه)، algorithms (round robin، least connections، IP hash)
- [ ] Reverse proxy (Nginx): إيه اللي بيعمله قدام Node (TLS termination، static files، buffering، compression)
- [ ] CDN: edge caching، cache keys، invalidation، origin
- [ ] Firewall و security groups كمفهوم، inbound vs outbound rules
- [ ] Latency vs bandwidth vs throughput: الفرق، وليه الـ bandwidth الأعلى مش دايمًا بيحل المشكلة
- [ ] **الأرقام اللي لازم تحفظها** (latency numbers every programmer should know):

| العملية | التقدير |
| --- | --- |
| L1 cache reference | ~1 ns |
| RAM access | ~100 ns |
| SSD random read | ~100 μs |
| HDD seek | ~10 ms |
| Round trip في نفس الـ datacenter | ~0.5 ms |
| Round trip بين قارات | ~100–150 ms |
| قراءة 1MB من RAM | ~10 μs |
| قراءة 1MB من SSD | ~1 ms |
| قراءة 1MB من network (1 Gbps) | ~10 ms |

- [ ] TCP congestion control و slow start كمفهوم (ليه أول request على connection جديدة أبطأ — وده سبب keep-alive)
- [ ] Head-of-line blocking على مستوى TCP (وليه HTTP/3 احتاج QUIC)
- [ ] MTU، packet fragmentation (كمفهوم فقط)

### 3.5 Software engineering متقدم
- [ ] Git متقدم: `bisect` (تلاقي الـ commit اللي كسر حاجة)، `reflog` (تنقذ حاجة اتمسحت)، interactive rebase (تنظف الـ history قبل الـ PR)
- [ ] Branching strategies: trunk-based vs GitFlow، وإمتى كل واحدة
- [ ] Conventional commits وربطها بالـ semantic release

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **Repo صغير** فيه implementation بإيدك لـ: hash map، min-heap، LRU cache، BFS/DFS، binary search variants، consistent hashing ring — مع tests.
2. **ملخص صفحة واحدة** عن رحلة الـ request من لما تكتب URL في المتصفح لحد ما الصفحة تظهر (DNS → TCP → TLS → HTTP → render). ده سؤال interview كلاسيكي.
3. **جدول الـ latency numbers** محفوظ.

## 📚 المصادر

- [CS50](https://cs50.harvard.edu/x/) — للفجوات في الأساسيات
- [OSTEP — Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/) — مجاني، الفصول عن concurrency و I/O بالذات
- Computer Networking: A Top-Down Approach (Kurose & Ross) — الفصول 1–3
- [NeetCode roadmap](https://neetcode.io/roadmap) — للـ DSA بترتيب منطقي
- [High Scalability — Latency numbers](https://gist.github.com/jboner/2841832)

## ✅ اختبار الخروج

تقدر تجاوب على دول بصوت عالي من غير ما تفتح حاجة؟
1. ليه الـ hash map lookup O(1) وإمتى بيبقى O(n)؟
2. إيه الفرق بين process و thread، وليه Node single-threaded بس بيعمل I/O كتير في نفس الوقت؟
3. اشرح رحلة request من المتصفح للسيرفر والرجوع بالتفصيل.
4. ليه الـ DB indexes بتستخدم B-tree مش hash table؟
5. إيه هو consistent hashing وإيه المشكلة اللي بيحلها؟
