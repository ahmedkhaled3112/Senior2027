# 05 — الخوارزميات (Algorithms)

> **ليه القسم ده:** الـ algorithms مش مسائل interview وبس. الـ diff اللي بتشوفه في الـ PR، الـ topological sort في الـ build tool، الـ Dijkstra في توزيع الطلبات، والـ external sort لملف CSV أكبر من الـ RAM — كلها في شغلك. القسم ده بيعلّمك تتعرف على النوع، تكتب الحل صح من أول مرة، تثبت إنه صح، وتقيس تكلفته.
>
> **الوقت التقريبي:** 5 أسابيع · **المتطلبات:** 02 (TypeScript) و 03 (CS Fundamentals) و 04 (Data Structures) · **الهدف:** pattern recognition + حلول صح ومثبتة + ربطها بالـ production.

## إزاي تستخدم الملف ده

علّم كل بند بواحدة من دول:
- ✅ أعرفه وأقدر أشرحه لجونيور في دقيقتين من غير جوجل
- 🔄 أعرفه بس محتاج مراجعة
- ❌ متعلمتوش

البنود اللي 🔄 أو ❌ هي خطتك. لكل algorithm: اكتبه بإيدك (مش بالـ AI) → اكتب tests فيها الـ edge cases → قيس الـ complexity على أحجام مختلفة → حل 3 مسائل عليه.

**القاعدة في كل درس:** كل algorithm بيتكتب بـ TypeScript strict، معاه tests (ومعاه property-based test لو ينفع)، وفيه مسألة من شغل حقيقي (orders، payments، routing، scheduling) جنب المسألة الكلاسيكية.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 تحليل الـ complexity بعمق
- [ ] Recurrences و الـ Master theorem: تحسب T(n) لـ merge sort و binary search و recursion بفرعين
- [ ] Amortized analysis بالـ 3 طرق (aggregate، accounting، potential) على dynamic array و queue بـ two stacks
- [ ] Space complexity الحقيقية: الـ call stack في الـ recursion، والـ allocations المخفية (`slice`، `concat`، spread)
- [ ] قياس حقيقي: benchmark على 10³ و 10⁴ و 10⁵ و 10⁶ وتستنتج الـ complexity من الأرقام (log-log plot)، وفخاخ الـ microbenchmarks (JIT warmup، dead code elimination)

### 1.2 Recursion و backtracking
- [ ] Recursion → iteration بـ explicit stack، وليه Node بيرمي `RangeError: Maximum call stack size exceeded`
- [ ] Backtracking template: choose → explore → unchoose
- [ ] Subsets و permutations و combinations (بالـ duplicates وبدونها)
- [ ] Pruning: إزاي تقص فروع البحث بدري (N-Queens، combination sum)
- [ ] في الشغل: solver صغير لتوزيع shifts على موظفين بقيود (constraint satisfaction)

### 1.3 Sorting بعمق
- [ ] Merge sort و quicksort من الصفر: الـ pivot selection، 3-way partition للـ duplicates، وليه الـ worst case O(n²)
- [ ] Heapsort و introsort كمفهوم
- [ ] TimSort (Node 22–26) و PowerSort (V8 الأحدث) في `Array.prototype.sort`: الـ runs و الـ merge policy، وليه سريعين على data شبه مترتبة
- [ ] Stability: ليه مهمة في الترتيب بأكتر من مفتاح (orders حسب الحالة ثم التاريخ)
- [ ] Comparator bugs: comparator مش consistent، `(a, b) => a > b`، و `localeCompare` و `Intl.Collator` للعربي

### 1.4 Non-comparison و external sort
- [ ] Counting sort و radix sort و bucket sort، وحد الـ O(n log n) للـ comparison sorts
- [ ] Radix sort على أرقام كبيرة (order IDs، timestamps) في TypedArrays
- [ ] External merge sort: ترتيب ملف CSV فيه 50M سطر بذاكرة 256MB بـ streams و k-way merge
- [ ] Partial sort و quickselect: أول k من غير ما ترتب الكل

### 1.5 Binary search بكل أشكاله
- [ ] Lower bound و upper bound بـ template واحد صح من أول مرة (invariants بدل التخمين)
- [ ] Binary search على الإجابة: أقل capacity تخلّي كل الـ shipments توصل في D يوم
- [ ] Binary search على real numbers و على function monotonic
- [ ] Exponential search، و binary search في rotated array
- [ ] في الشغل: `git bisect` كـ binary search، و البحث في logs مترتبة بالوقت

### 1.6 Two pointers و sliding window و prefix sums
- [ ] Two pointers: على array مترتبة، و fast/slow (cycle detection)
- [ ] Sliding window بطول ثابت ومتغيّر: أطول فترة من غير طلبات فاشلة، و أقصر window مجموعها ≥ X
- [ ] Prefix sums و difference arrays: range sum في O(1)، و range updates في O(1)
- [ ] Hashing patterns: two-sum، subarray sum = k بـ prefix sum + hash map

---

## 🟡 المستوى 2 — المتوسط

### 2.1 Greedy
- [ ] Interval scheduling: أكبر عدد اجتماعات، و أقل عدد قاعات (meeting rooms)
- [ ] إثبات الـ greedy بالـ exchange argument، و إمتى الـ greedy بيفشل (coin change بعملات غريبة)
- [ ] Huffman coding: ضغط بسيط من الصفر
- [ ] في الشغل: توزيع الـ jobs على workers، و دمج الفواتير لأقل عدد شحنات

### 2.2 Divide & conquer
- [ ] النمط: قسّم → حل → اجمع، وتحليله بالـ Master theorem
- [ ] Quickselect (الـ median في O(n) متوقّع)، و median of medians كمفهوم
- [ ] Counting inversions بـ merge sort: كام order اتعالج بغير ترتيب وصوله
- [ ] Closest pair of points و Karatsuba كمفهوم

### 2.3 Dynamic programming — الجزء 1
- [ ] إزاي تتعرف إن المسألة DP: optimal substructure و overlapping subproblems
- [ ] تعريف الـ state والـ transition والـ base case بالكتابة قبل الكود
- [ ] Memoization (top-down) مقابل tabulation (bottom-up)، و تقليل الـ space لـ O(n) أو O(1)
- [ ] 1D DP: climbing stairs، house robber، و max profit من سهم
- [ ] Knapsack family: 0/1، unbounded، و coin change (أقل عدد عملات وعدد الطرق) — بأمثلة فكّة فلوس حقيقية بالقروش
- [ ] استرجاع الحل نفسه مش بس القيمة (إيه العناصر اللي اتاخدت)

### 2.4 Dynamic programming — الجزء 2
- [ ] DP على strings: LCS و edit distance، و ربطها بالـ diff و الـ fuzzy search على أسماء العملاء
- [ ] Interval DP: matrix chain و burst balloons كمفهوم
- [ ] DP على trees: max independent set (اختيار موظفين من غير مدير ومرؤوس مباشر)
- [ ] Bitmask DP: travelling salesman لـ 15 نقطة توصيل
- [ ] إزاي تحوّل backtracking بطيء لـ DP

### 2.5 Graph traversal
- [ ] BFS و DFS iterative على adjacency list، و BFS للـ shortest path في unweighted graph
- [ ] Topological sort بطريقتين (Kahn و DFS)، و cycle detection في directed graph
- [ ] في الشغل: ترتيب الـ migrations والـ build steps، و اكتشاف circular dependency بين الـ modules
- [ ] Connected components و bipartite check
- [ ] Strongly connected components (Tarjan أو Kosaraju)

### 2.6 Shortest paths
- [ ] Dijkstra بـ binary heap، و ليه مش بيشتغل مع negative weights
- [ ] Bellman-Ford و اكتشاف الـ negative cycles (arbitrage في أسعار العملات)
- [ ] 0-1 BFS و multi-source BFS
- [ ] A* و الـ heuristic المقبولة: routing على شبكة شوارع صغيرة
- [ ] Floyd-Warshall للـ all-pairs على graph صغير

### 2.7 MST و connectivity
- [ ] Kruskal (sort + Union-Find) و Prim (heap)
- [ ] في الشغل: أقل تكلفة لربط فروع بشبكة
- [ ] Bridges و articulation points: نقط الفشل الواحدة في شبكة services

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 String algorithms
- [ ] KMP و الـ prefix function، و Z-algorithm
- [ ] Rabin-Karp و rolling hash، و احتمال الـ collision
- [ ] Aho-Corasick كمفهوم: البحث عن آلاف الكلمات الممنوعة في نص واحد مرة واحدة
- [ ] Unicode في الـ strings: code points مقابل UTF-16 units مقابل graphemes (`Intl.Segmenter`) والعربي

### 3.2 Bit manipulation و math
- [ ] Bit tricks: masks، popcount، lowest set bit، و الـ permissions كـ bitmask
- [ ] GCD و LCM و extended Euclid، و modular arithmetic و fast exponentiation
- [ ] Sieve of Eratosthenes و الـ primality testing كمفهوم
- [ ] `BigInt` و الـ overflow: ليه `Number.MAX_SAFE_INTEGER` مهم للـ IDs و الفلوس
- [ ] Combinatorics أساسية: nCr mod p و عدّ الاحتمالات

### 3.3 Randomized و streaming algorithms
- [ ] Fisher-Yates shuffle صح، و ليه `sort(() => Math.random() - 0.5)` غلط (تقيس الانحياز)
- [ ] Reservoir sampling: عينة عادلة من stream مالوش آخر (sampling للـ traces)
- [ ] Randomized quickselect و الـ expected complexity
- [ ] Top-k و heavy hitters على stream (Misra-Gries)، و ربطها بالـ Count-Min Sketch من القسم 04
- [ ] `crypto.randomInt` مقابل `Math.random`: إمتى الفرق مهم

### 3.4 Network flow و matching
- [ ] Max flow بـ Ford-Fulkerson / Edmonds-Karp، و min cut كمفهوم
- [ ] Bipartite matching: توزيع الطلبات على المندوبين المتاحين
- [ ] Assignment problem (Hungarian) كمفهوم و إمتى تستخدم solver جاهز

### 3.5 Algorithms في production
- [ ] Myers diff algorithm: إزاي `git diff` بيطلع أقل تعديلات (تنفيذ مبسط)
- [ ] Scheduling: round-robin، weighted fair queuing، و earliest deadline first
- [ ] Rate limiting و consistent hashing كـ algorithms (ربط بالقسم 12)
- [ ] Caching eviction policies (LRU، LFU، ARC كمفهوم) و قياس الـ hit rate على trace حقيقي
- [ ] Geohash و الـ spatial indexing كمفهوم ("أقرب مندوب")

### 3.6 منهج حل المسائل
- [ ] Framework ثابت: افهم → أمثلة → brute force → حدد الـ bottleneck → حسّن → اختبر → حلل
- [ ] Pattern recognition: من شكل المسألة لنوع الحل (جدول قرار)
- [ ] Testing الحلول: edge cases و property-based tests بـ fast-check ضد الـ brute force
- [ ] سلّم تمارين بالترتيب (easy → medium → hard) مربوط بالقسم 16 (Interview Prep)

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **Repo `algorithms-ts`:** كل algorithm في القسم بـ TypeScript strict، tests، و property-based test ضد الـ brute force لكل واحد ينفع.
2. **3 algorithms مستخدمة في المشروع الجانبي:** topological sort لترتيب الـ jobs أو الـ migrations، external sort أو k-way merge لـ export كبير، و Dijkstra أو matching لميزة توزيع — كل واحد بـ ADR و benchmark.
3. **دفتر مسائل:** 60 مسألة محلولة بإيدك مقسّمة على الـ patterns، لكل مسألة: النمط، الـ complexity، والغلطة اللي وقعت فيها.

## 📚 المصادر

- Introduction to Algorithms (CLRS) — الفصول 2–4 و 6–9 و 15–16 و 22–26 و 32
- The Algorithm Design Manual (Skiena) — الجزء الأول، والـ "war stories"
- [Competitive Programmer's Handbook (Antti Laaksonen)](https://cses.fi/book/book.pdf) — مجاني ومختصر
- [CSES Problem Set](https://cses.fi/problemset/) و [NeetCode roadmap](https://neetcode.io/roadmap) — للتمرين بالترتيب
- [An O(ND) Difference Algorithm (Myers, 1986)](http://www.xmailserver.org/diff2.pdf)
- [V8 blog: Getting things sorted in V8](https://v8.dev/blog/array-sort)

## ✅ اختبار الخروج

تقدر تجاوب على دول بصوت عالي من غير ما تفتح حاجة؟
1. اكتب lower bound صح من أول مرة، واشرح الـ invariant اللي بيضمن إنه بيقف.
2. عندك ملف 20GB فيه orders عايز ترتبه بالتاريخ على جهاز فيه 2GB RAM. هتعمل إيه بالظبط؟
3. إزاي تعرف إن مسألة DP؟ عرّف الـ state والـ transition لـ coin change.
4. Build tool بيرتب 300 task بينهم dependencies. إيه الـ algorithm، وإيه اللي يحصل لو فيه cycle؟
5. ليه Dijkstra بيفشل مع negative weights، وإيه البديل؟
