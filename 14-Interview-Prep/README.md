# 14 — Interview Prep و إثبات المستوى للسوق

> **ليه القسم ده:** كل الأقسام اللي فاتت بتبني المستوى. القسم ده بيحوّله لـ **أدلة السوق بتفهمها**: coding interviews بثقة، system design بمنهجية وتوقيت، behavioral بقصص حقيقية، CV/portfolio بيعكس المستوى، ومقالات/open source بتتفحص أكتر من أي شهادة. حتى لو مش هتغيّر شغلك، الـ mock interviews أفضل طريقة تكتشف الفجوات.
>
> **التوقيت:** الربع الأخير من الخطة (بعد ما الأقسام التقنية تتثبّت) — بس الـ coding practice ابدأه خفيف من بدري (ساعتين أسبوعيًا).
>
> **المصدر الأنسب:** [NeetCode 150](https://neetcode.io/practice) + System Design Interview (Alex Xu) + [Tech Interview Handbook](https://www.techinterviewhandbook.org/) + [Pramp/interviewing.io](https://interviewing.io) للـ mocks

## إزاي تستخدم الملف ده

علّم كل بند: ✅ جاهز · 🔄 محتاج تمرين · ❌ مبدأتش
القسم ده كله **تمرين بتوقيت** مش قراءة. سجّل نفسك. اطلب feedback.

---

## 🟢 المستوى 1 — الأساسيات (الاستعداد)

### 1.1 فهم الـ Senior interview loop
- [ ] الأنواع: phone screen → coding (1–2) → system design (1–2) → behavioral/leadership → (أحيانًا) take-home أو pair programming أو architecture deep-dive
- [ ] إيه اللي بيتقاس في كل واحد **للسنيور تحديدًا**: مش الحل بس — التواصل، الـ trade-offs، التعامل مع الغموض، الـ ownership
- [ ] الفرق بين Big Tech (DSA تقيلة + system design) و product companies (practical coding + design + behavioral) و startups (take-home + culture) — وتجهّز حسب الهدف
- [ ] تقرأ الـ job description وتطلّع منها إيه اللي هيتسأل
- [ ] تسأل الـ recruiter عن شكل الـ loop (مسموح ومطلوب)

### 1.2 CV و Profile
- [ ] **CV صفحة واحدة** (اتنين بالكتير): impact بالأرقام مش مهام ("قللت p99 من 800ms لـ 120ms بـ X" مش "شغلت على performance")
- [ ] كل bullet: **فعل + إيه + الأثر** — وتقدر تحكي قصة ورا كل واحد
- [ ] Tech stack واقعي (اللي تقدر تتسأل فيه)، مش قايمة buzzwords
- [ ] LinkedIn متطابق مع الـ CV، headline واضح، recommendations
- [ ] **GitHub profile**: README، الـ pinned repos هي المشروع الجانبي + patterns repo + MCP server — بـ README ممتاز لكل واحد (screenshots، architecture diagram، إزاي تشغّله)
- [ ] Portfolio = المشروع الجانبي المنشور (live URL + repo + design docs) — **نظام واحد كامل أقوى من 5 سطحيين**

### 1.3 Coding interview — الأساسيات
- [ ] الـ format: 45 دقيقة، سؤال أو اتنين، بتتكلم وإنت بتحل
- [ ] **المنهجية**: افهم السؤال (أسئلة توضيحية، أمثلة، edge cases) → فكّر بصوت عالي → brute force الأول → حسّن → اكتب → اختبر بإيدك على مثال → complexity
- [ ] Patterns الأساسية (من 01): two pointers، sliding window، hash map، BFS/DFS، binary search، sorting
- [ ] تكتب كود نظيف تحت ضغط: أسماء واضحة، functions صغيرة، مفيش off-by-one
- [ ] اللغة: TypeScript/JavaScript بإتقان في الـ interview (الـ built-ins: Map/Set، sort comparator، string methods، array methods)
- [ ] **NeetCode 150 — الـ Easy كلها** (أسبوعين، ساعتين يوميًا)

### 1.4 Behavioral — الأساسيات
- [ ] **STAR format**: Situation → Task → Action → Result (بأرقام) — والـ Action هو 60% من الإجابة، وبصيغة "أنا" مش "إحنا"
- [ ] تجهّز **8–10 قصص حقيقية** تغطي: ownership، conflict (مع زميل/manager/product)، failure وإيه اللي اتعلمته، influence بدون سلطة، mentoring، incident/pressure، trade-off صعب، قرار تقني غلط صححته، scope cut، deadline مستحيل
- [ ] كل قصة بتنفع لكذا سؤال (نفس القصة = ownership + conflict + result)
- [ ] تكتبهم (صفحة لكل قصة) وتتمرن عليهم بصوت عالي — دقيقتين لكل إجابة
- [ ] "Tell me about yourself" في 90 ثانية: الحاضر → الماضي المهم → ليه هنا

### 1.5 System design — الأساسيات
- [ ] الـ format: 45–60 دقيقة، سؤال مفتوح، السبورة (أو Excalidraw)
- [ ] **المنهجية** (من 10): requirements (5 دقايق) → estimation (5) → API + data model (5) → high-level (10) → deep dive (15) → trade-offs & bottlenecks (10)
- [ ] تسأل قبل ما تفترض، تقول الـ assumptions بصوت عالي، تبدأ بسيط
- [ ] تتمرن على **الـ 5 الأساسية** من case studies القسم 10 (URL shortener، rate limiter، notification، key-value store، ID generator) بتوقيت

---

## 🟡 المستوى 2 — المتوسط (التمرين الجاد)

### 2.1 Coding — Medium بثقة
- [ ] **NeetCode 150 — الـ Medium كلها** (6–8 أسابيع): arrays/hashing، two pointers، sliding window، stack، binary search، linked list، trees، tries، heap، backtracking، graphs، 1D/2D DP، greedy، intervals
- [ ] لكل pattern تقدر تشرح "إمتى أعرف إن السؤال ده pattern X" (الـ signals)
- [ ] تحل تحت توقيت: 25 دقيقة للـ medium، وتتكلم وإنت بتحل
- [ ] **Spaced repetition**: تعيد المسائل اللي غلطت فيها بعد 3 أيام، أسبوع، شهر
- [ ] Practical coding (الأشهر في product companies): implement LRU cache، rate limiter، event emitter، promise pool، debounce، deep clone، JSON parser، URL parser — **كلهم في TypeScript بـ tests**
- [ ] Debugging interview: يدّوك كود فيه bugs — منهجية (reproduce → isolate → fix → verify)
- [ ] Code review interview: يدّوك PR تراجعه — design، edge cases، security، naming
- [ ] Node-specific questions: event loop output prediction، streams، error handling، `async` pitfalls — كلها من قسم 04

### 2.2 System design — المستوى التاني
- [ ] **الـ 6 التانية** من القسم 10 بتوقيت: news feed، chat، autocomplete، web crawler، file storage، video streaming
- [ ] تتمرن على **الـ deep dive**: الـ interviewer بيقول "خش في الـ X" — تقدر تنزل 3 مستويات (الـ DB schema، الـ index، الـ failure mode)
- [ ] تتمرن على الـ **pushback**: "ليه مش Kafka؟" "إيه اللي يحصل لو الـ cache وقع؟" "الـ load ×10؟" — إجابة بـ trade-off مش دفاع
- [ ] **Mock interviews** (الأهم): مع زميل سنيور أو على interviewing.io/Pramp — 5 على الأقل، مسجّلة
- [ ] تسمع التسجيل وتكتب: فين سكتّ، فين افترضت من غير ما أسأل، فين نسيت الـ non-functional requirements
- [ ] Design docs من المشروع الجانبي كمادة: "صمّمت ده فعلًا، وده اللي اتعلمته"
- [ ] Low-level/OOP design (أحيانًا): parking lot، elevator، library — classes، interfaces، patterns (من 08)

### 2.3 Behavioral — المستوى التاني
- [ ] القصص متوافقة مع **Senior expectations**: scope كبير، تأثير على الفريق، قرارات، ownership للـ production
- [ ] أسئلة الـ Senior الصعبة: "قرار تقني اتخذته وطلع غلط"، "خلاف مع manager"، "إزاي بتتعامل مع زميل أداؤه ضعيف"، "feature رفضت تبنيها"، "إزاي بتوازن quality vs speed"
- [ ] أسئلة عن الـ AI (جديدة ومتوقعة): "إزاي بتستخدم AI في شغلك؟"، "إزاي بتراجع كود الـ AI؟"، "AI feature بنيتها؟" — إجابات من القسم 12 بأمثلة
- [ ] **أسئلتك إنت** للـ interviewer (بتتقيّم): عن الـ on-call، الـ tech debt، إزاي القرارات بتتاخد، الـ review culture، الـ growth path
- [ ] تتمرن مع حد بيسألك follow-ups مزعجة ("وإنت شخصيًا عملت إيه؟" "والنتيجة بالأرقام؟")

### 2.4 Take-home assignments
- [ ] تعامله كـ production code صغير: README ممتاز، tests، error handling، structure واضح، Docker، **قرارات موثّقة** (ADR صغير: ليه اخترت X)
- [ ] Scope: اعمل المطلوب كويس + حاجة واحدة زيادة تبيّن المستوى (observability، CI) — مش 10 حاجات نص-نص
- [ ] الوقت: التزم بالمقترح تقريبًا، وقول في الـ README إيه اللي كنت هتعمله لو فيه وقت
- [ ] جهّز للـ follow-up: هيسألوك "ليه كده؟" على كل قرار، و"إزاي تعمله scale؟"

### 2.5 Technical deep-dive / Architecture interview
- [ ] تشرح **نظام شغلت عليه** في 20 دقيقة: المشكلة، الـ constraints، التصميم، الـ trade-offs، إيه اللي كسر، إيه اللي هتغيره — جهّز 2 أنظمة (من شغلك + المشروع الجانبي)
- [ ] ترسم الـ architecture على السبورة من الذاكرة
- [ ] تجاوب "إيه أصعب bug حليته؟" بتفاصيل تقنية حقيقية (الأعراض، التشخيص، السبب، الحل، الدرس)
- [ ] تتكلم عن production: incidents، monitoring، deploys، on-call — بأمثلة

---

## 🔴 المستوى 3 — المتقدم (التميّز)

### 3.1 Coding — Hard و الثقة الكاملة
- [ ] الـ Hard المختارة من NeetCode (20–30 مسألة): الأشهر في الـ Senior loops (merge k lists، median of streams، word ladder، trapping rain water، LRU/LFU، serialize tree، course schedule II)
- [ ] تحل medium في 15–20 دقيقة بكود نظيف من أول مرة
- [ ] تقدر تحل بـ 2 approaches وتقارن
- [ ] Concurrency questions (Node): implement semaphore، producer/consumer، rate limiter بـ sliding window، retry with backoff — كلها بـ async/await صح
- [ ] Mock coding interviews: 5 على الأقل مع feedback

### 3.2 System design — المستوى التالت
- [ ] **الـ 9 الأصعب** من القسم 10: ride sharing، payment، booking، message queue، metrics، ad aggregation، email، stock exchange، multi-tenant SaaS
- [ ] تقدر تعمل **estimation دقيقة** بسرعة وتربطها بالقرارات ("12K writes/sec → Postgres واحدة مش كفاية → sharding by X")
- [ ] تتكلم عن **consistency و failure modes** تلقائيًا من غير ما يسألوك
- [ ] تعرف 2–3 أمثلة حقيقية من engineering blogs لكل design ("Discord عملوا كده لأن...")
- [ ] تقدر تصمم بـ cost awareness ("ده هيكلّف ~$X/شهر، البديل الأرخص Y")
- [ ] 10 mock system design interviews مسجّلة — مع تحسن واضح بين الأول والأخير

### 3.3 Negotiation و Offers
- [ ] تعرف الـ market rate للـ Senior في سوقك (levels.fyi، Glassdoor، شبكتك) — remote vs local
- [ ] تفاوض على الـ total comp مش الـ base بس (equity، bonus، signing، remote، learning budget)
- [ ] متقولش رقم الأول لو ينفع، ولو لازم قول range مبني على data
- [ ] تقيّم الـ offer بما بعد الفلوس: الفريق، الـ growth، الـ tech، الـ on-call، الـ culture (من أسئلتك في الـ interviews)
- [ ] تتعامل مع كذا offer باحترام وبشفافية

### 3.4 إثبات المستوى للسوق (بدون interview)
- [ ] **6–10 مقالات تقنية عميقة** من اللي اتعلمته: Postgres tuning بـ EXPLAIN حقيقي، RAG evals بأرقام، outbox pattern بالكود، zero-downtime migration قصة حقيقية، event loop internals — **مش tutorials سطحية**
- [ ] كل مقال: مشكلة حقيقية → تجربة → أرقام → الدرس. بينشر على blog بتاعك + dev.to/Medium
- [ ] **Open source**: 2–3 PRs مقبولة في مكتبات بتستخدمها (bug fix حقيقي أقوى من feature)
- [ ] **Talk** واحد (meetup محلي، أو داخلي في الشركة، أو فيديو) عن موضوع من المقالات
- [ ] المشروع الجانبي **منشور ومستخدم** (حتى لو 10 users) مع README بيحكي القصة والـ architecture
- [ ] Profile متسق: GitHub + blog + LinkedIn بيقولوا نفس القصة — "سنيور بيفهم production"

### 3.5 الترقية الداخلية (لو هتفضل في شغلك)
- [ ] تفهم الـ **leveling guide** في شركتك (لو موجود) أو تطلبه — إيه المتوقع من Senior بالظبط
- [ ] **Promotion packet**: لكل expectation → دليل (RFC، incident، mentee، feature owned) — من القسم 13
- [ ] تتكلم مع الـ manager بدري: "عايز Senior في X شهور، إيه الفجوات؟" — وتتابع كل شهر
- [ ] تعمل شغل الـ Senior **قبل** اللقب لـ 6 شهور على الأقل (ده اللي بيتقيّم)
- [ ] تطلب feedback من peers و seniors بشكل رسمي قبل الـ cycle
- [ ] لو الترقية مش جاية رغم الأدلة: تعرف إمتى تدوّر بره

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **CV صفحة واحدة** بـ impact bullets بالأرقام + LinkedIn + GitHub profile README — مراجَعين من سنيور.
2. **ملف `stories.md`**: 10 قصص STAR مكتوبة (صفحة لكل واحدة) مع الأسئلة اللي كل قصة بتجاوب عليها.
3. **NeetCode tracker**: 150 مسألة بحالة كل واحدة (solved/revisit) ووقت الحل — Easy كلها، Medium كلها، 20+ Hard.
4. **`practical-coding/`**: 10 implementations بـ TypeScript + tests (LRU، rate limiter، event emitter، promise pool، debounce، deep clone، JSON parser، semaphore، retry، LFU).
5. **15 mock interviews مسجّلة** (5 coding، 7 system design، 3 behavioral) مع ملاحظات التحسن.
6. **`system-design-interviews/`**: الـ 20 design docs من القسم 10 بصيغة interview (45 دقيقة، السبورة) + ملاحظات الـ mock.
7. **Take-home sample**: مشروع صغير production-grade (README، tests، Docker، ADR) تقدر تستخدمه كمرجع.
8. **6+ مقالات منشورة** + **2 PRs open source مقبولة** + **talk واحد**.
9. **Promotion packet** (لو داخلي) أو **target companies list** مع الـ loop بتاع كل واحدة (لو خارجي).

## 📚 المصادر

- [NeetCode 150](https://neetcode.io/practice) — الـ roadmap + الفيديوهات
- [Tech Interview Handbook](https://www.techinterviewhandbook.org/) — شامل ومجاني (coding + behavioral + negotiation)
- [System Design Interview vol. 1 & 2 — Alex Xu](https://bytebytego.com/)
- [interviewing.io](https://interviewing.io) — mock interviews مع مهندسين حقيقيين (+ [recordings مجانية](https://interviewing.io/recordings))
- [Pramp](https://www.pramp.com/) — peer mocks مجانية
- [Great Frontend / Big Frontend](https://www.greatfrontend.com/) — practical JS/TS coding questions
- [levels.fyi](https://www.levels.fyi/) — comp data
- [Haseeb Qureshi — Ten Rules for Negotiating a Job Offer](https://haseebq.com/my-ten-rules-for-negotiating-a-job-offer/)
- [Julia Evans — Brag documents](https://jvns.ca/blog/brag-documents/)
- [Gergely Orosz — The Pragmatic Engineer](https://blog.pragmaticengineer.com/) — hiring و leveling من الداخل
- [StaffEng — Promotion packets](https://staffeng.com/guides/promo-packets/)

## ✅ اختبار الخروج

1. حل medium عشوائي من NeetCode في 20 دقيقة وإنت بتتكلم — نظيف من أول مرة؟
2. صمّم payment system في 45 دقيقة مسجّل — غطيت idempotency و ledger و reconciliation و failure modes من غير ما يسألوك؟
3. احكي قصة failure حقيقية في دقيقتين بـ STAR — فيها أرقام ودرس؟
4. اشرح نظام شغلت عليه في 15 دقيقة على السبورة من الذاكرة.
5. "إزاي بتستخدم AI في شغلك وإزاي بتراجع كوده؟" — إجابة بأمثلة محددة؟
6. CV بتاعك: كل bullet فيه رقم أو أثر؟
7. عندك 3 أسئلة قوية تسألهم في آخر الـ interview؟
8. لو جالك offer بكرة — عارف الـ range بتاعك وإزاي تتفاوض؟
