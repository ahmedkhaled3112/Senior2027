# 13 — Senior Skills (غير التقني — اللي الترقية بتتوقف عليه)

> **ليه القسم ده:** في معظم الشركات الترقية لـ Senior بتتوقف على المحور ده **أكتر من أي حاجة تقنية**. الـ Mid بيحل مشكلة، السنيور بيخلي الفريق كله يحل مشاكل أحسن. ومع قلة الجونيور في السوق، الشركات بتدوّر على سنيور يقدر يرفع مستوى اللي حواليه، ياخد قرارات، ويتحمل الـ production.
>
> **الفرق عن باقي الأقسام:** ده مش بيتذاكر — **بيتمرن عليه في شغلك الحالي**. كل بند هنا له "تمرين في الشغل" مش "اقرأ المصدر". الـ artifacts هي حاجات حقيقية (RFC حقيقي، postmortem حقيقي، جونيور اتحسّن فعلًا).
>
> **الوقت:** مستمر طول الخطة، بتركيز في الربع الأخير · **المصدر الأنسب:** The Staff Engineer's Path (Tanya Reilly) + [StaffEng.com](https://staffeng.com) + An Elegant Puzzle (Will Larson) + The Manager's Path (Fournier — الفصول الأولى)

## إزاي تستخدم الملف ده

علّم كل بند: ✅ بعمله فعلًا في شغلي · 🔄 بعمله أحيانًا/مش بإتقان · ❌ مبعملوش
**القاعدة:** البند مش بيتعلّم ✅ لما تفهمه — بيتعلّم ✅ لما يكون فيه **دليل** (RFC اتكتب، postmortem اتقاد، زميل قال إنك ساعدته).

---

## 🟢 المستوى 1 — الأساسيات (السلوك اليومي)

### 1.1 Ownership
- [ ] **تقفل الـ loops**: لما تقول "هعمل كده" بتعمله أو بتقول إنك مش هتعمله — محدش بيحتاج يفكّرك
- [ ] تمتلك الـ task من الفكرة للـ production ولما بعد الإطلاق (بتتابع الـ metrics والـ bugs بعد الـ deploy مش بتعتبرها خلصت عند الـ merge)
- [ ] **تجيب الأخبار الوحشة بدري**: "ده هيتأخر يومين، والسبب X، والبديل Y" — قبل الـ deadline مش بعده
- [ ] بتسأل "ليه" قبل ما تبني: فاهم المشكلة اللي الـ feature بتحلها ومين المستخدم
- [ ] بتبلّغ عن المشاكل اللي شايفها حتى لو مش في الـ scope بتاعك (الـ bug ده مش بتاعي بس شفته)
- [ ] مبتقولش "ده مش شغلي" — بتقول "ده مش أولويتي دلوقتي، بس أقدر أساعد في X"

### 1.2 Technical communication الأساسي
- [ ] **PR descriptions** بتخلي الـ review سهل: إيه، ليه، إزاي تختبره، screenshots/logs، إيه اللي مش في الـ scope
- [ ] Commit messages واضحة (conventional commits)، commits صغيرة ومنطقية
- [ ] بتكتب قبل ما تتكلم في الحاجات المهمة (message/doc بدل meeting لما ينفع)
- [ ] بتلخّص القرار بعد أي نقاش: "اتفقنا على X، الخطوة الجاية Y، المسؤول Z"
- [ ] Async communication: messages كاملة (السياق + السؤال + إيه اللي جرّبته) بدل "عندك دقيقة؟"
- [ ] بتوثّق اللي بتعمله (README، runbook، comment على الـ "ليه" مش الـ "إيه")

### 1.3 Code review الأساسي
- [ ] بتعمل review في وقت معقول (نفس اليوم) — الـ review المتأخر بيبطّئ الفريق كله
- [ ] بتقرأ الكود فعلًا وبتشغّله لو لازم — مش "LGTM" على العمياني
- [ ] بتفرّق بين **blocking** (bug، security، design غلط) و **nit** (style، preference) وبتقولها صراحةً
- [ ] بتشرح "ليه" مش بس "إيه": "ده هيعمل N+1 لأن..." مش "غيّر ده"
- [ ] بتقول الحاجات الكويسة كمان مش بس الغلط
- [ ] لما بتستلم review: مبتاخدش الكلام شخصي، بتسأل لو مش فاهم، بتقول "لأ" بأسباب لو مش موافق

### 1.4 Scoping و Estimation الأساسي
- [ ] بتقسّم الـ task لـ subtasks قبل ما تبدأ (وبتكتبهم)
- [ ] بتقدّر بنطاق ("3–5 أيام") مش رقم واحد، وبتوضّح الافتراضات ("لو الـ API جاهزة")
- [ ] بتحدد الـ unknowns وبتعمل spike قصير قبل ما تقدّر لو فيه unknown كبير
- [ ] بتبلّغ لما التقدير يتغير (مش في آخر يوم)

### 1.5 Learning و Self-awareness
- [ ] بتعرف إيه اللي مش عارفه وبتقوله ("مش متأكد، هتأكد وأرجعلك")
- [ ] بتطلب feedback وبتاخده بجدية
- [ ] بتتعلم من كل incident/bug: إيه اللي كان ممكن يمنعه
- [ ] بتقرأ engineering blogs/docs بانتظام مش بس لما تحتاج

---

## 🟡 المستوى 2 — المتوسط (التأثير على الفريق)

### 2.1 Design docs و RFCs (أهم مهارة كتابة للسنيور)
- [ ] **تكتب RFC/design doc في صفحة أو اتنين**: المشكلة والسياق → الأهداف وغير الأهداف → الخيارات (3 على الأقل) مع الـ trade-offs → القرار والتبرير → المخاطر → خطة الـ rollout → open questions
- [ ] تكتبه **قبل** الكود للقرارات الكبيرة، وتطلب review عليه، وتقفله بقرار (مش يفضل مفتوح)
- [ ] **ADRs** للقرارات المعمارية عشان ما تضيعش (في الـ repo)
- [ ] تكتب للقارئ مش لنفسك: الـ TL;DR في أول 3 سطور، diagrams لما تفيد، مفيش jargon للجمهور الغلط
- [ ] تتعامل مع الـ feedback على الـ doc: تعدّل، تجاوب، أو تقول ليه لأ — وتقفل
- [ ] تعرف إمتى الـ doc over-engineering (task يومين مش محتاجة RFC)

### 2.2 التواصل مع غير التقنيين
- [ ] تشرح لـ product/business **بلغتهم**: الأثر (على المستخدم/الإيراد)، الوقت، المخاطر، البدائل — مش الـ implementation
- [ ] تترجم "محتاجين نعمل refactor" لـ "الـ feature الجاية هتاخد ضعف الوقت لو معملناش X، وده هيوفر Y"
- [ ] تقدّم خيارات بتكلفتها مش "ده مستحيل": "ممكن في أسبوع بدون X، أو 3 أسابيع كامل"
- [ ] تعرف تقول **"لأ"** أو **"مش دلوقتي"** بأسباب تقنية ومنتجية، وتقترح بديل أبسط
- [ ] Meetings: تيجي بـ agenda، تخرج بقرارات وowners، تقطع الـ meeting اللي مش محتاجه
- [ ] تكتب status updates مفيدة: إيه اتعمل، إيه جاي، إيه الـ blockers — بدون تفاصيل زيادة

### 2.3 Code review كقيادة
- [ ] بتراجع عشان **الـ design والـ edge cases والـ security والـ performance** — الـ formatting شغل الـ linter
- [ ] بتسأل أسئلة بدل ما تدي أوامر لما ينفع ("إيه اللي يحصل لو الـ list فاضية؟") — بيعلّم أكتر
- [ ] **بتعلّم في الـ review بدل ما تصلّح بنفسك** (حتى لو أسرع تعمله إنت)
- [ ] بتمسك المشاكل المعمارية بدري (في الـ design/draft PR) مش بعد 500 سطر
- [ ] بتحدد **review guidelines** للفريق (إيه blocking، إيه nit، SLA للـ review، حجم الـ PR)
- [ ] بتراجع كود الـ AI بمعايير أعلى (تفاصيله في 12)
- [ ] بتعرف تقفل نقاش review طويل: call 5 دقايق بدل 20 comment

### 2.4 Mentorship
- [ ] بتساعد الجونيور **يوصل للحل** مش بتديله الحل (أسئلة موجّهة، pair programming)
- [ ] Pair programming بانتظام (مش بس لما فيه مشكلة)
- [ ] بتكتب/تحدّث **onboarding docs** عشان الجديد يعمل أول PR في أول أسبوع
- [ ] بتدي feedback محدد وفي وقته (مش في الـ review السنوي): "في الـ PR ده كان ممكن X لأن Y"
- [ ] **بتحدد للجونيور إمتى يستخدم الـ AI وإمتى يكتب بإيده** (الأساسيات بإيده)
- [ ] بتوزّع tasks بتعلّم (stretch tasks) مش بس اللي الشخص عارفه
- [ ] بتشوف نقاط قوة الناس وبتخليهم يبرزوا فيها
- [ ] الدليل: **جونيور أو mid في فريقك اتحسّن بسببك بشكل واضح** — تقدر تقول مين وفي إيه

### 2.5 Scoping و Estimation بعمق
- [ ] **تقسّم مشروع غامض لـ milestones قابلة للتسليم**: كل milestone بيطلّع حاجة شغالة (مش "الـ backend خلص")
- [ ] تحدد **الـ MVP الحقيقي**: إيه أقل حاجة تثبت الفكرة وتتعلم منها — وتدافع عنه ضد الـ scope creep
- [ ] تقدّر بـ confidence levels وتوضّح إيه اللي يخلي التقدير يتغير
- [ ] تقسّم الـ unknowns: time-boxed spikes، prototypes للـ risky parts الأول
- [ ] تتابع الـ actual vs estimate وتتعلم من الفرق (مش تلوم)
- [ ] تعرف إمتى تقول "محتاج أسبوع عشان أقدّر" (مشروع كبير)
- [ ] Dependencies: تحددهم بدري (فريق تاني، API خارجية، قرار معلّق) وتتابعهم

### 2.6 Product و Business sense
- [ ] فاهم **ليه** الـ feature بتتبني، **مين** المستخدم، و**إيه الـ metric** اللي المفروض تتحرك
- [ ] بتقترح **حلول أبسط بتوصل لنفس الهدف بربع التكلفة** ("بدل ما نبني X كامل، نعمل Y يدوي الأول ونشوف")
- [ ] فاهم الـ business model والـ unit economics بشكل عام (الـ feature دي بتكلّف كام وبتجيب كام)
- [ ] بتسأل عن الـ data: "كام user بيستخدم ده؟" قبل ما تقترح تحسينه
- [ ] بتفرّق بين "المستخدم طلب X" و"المستخدم محتاج يحل مشكلة Y"
- [ ] بتشارك في الـ product discussions مش بس بتستلم tickets

### 2.7 Incident management
- [ ] **تقود incident بهدوء**: تحدد الـ severity، تعلن إنك الـ incident commander، تحدد مين بيعمل إيه
- [ ] **Mitigation أولًا، root cause بعدين**: rollback/feature flag/scale up — الأول رجّع الخدمة
- [ ] Communication أثناء الـ incident: updates منتظمة (كل 15–30 دقيقة) في channel واحد، status page، مفيش صمت
- [ ] تعرف إمتى تصعّد وإمتى تطلب مساعدة
- [ ] بعد الـ incident: timeline مكتوب، **blameless postmortem** (contributing factors مش "مين غلط")، action items حقيقية بـ owners و deadlines، وتتابع إنهم اتعملوا
- [ ] On-call بمسؤولية: runbooks، handoff واضح، alerts مظبوطة (مش noise)
- [ ] الدليل: **الفريق بيجيلك لما الـ production يقع**

### 2.8 Collaboration عبر الفرق
- [ ] بتبني علاقات مع الفرق التانية (product، design، data، infra، support) قبل ما تحتاجهم
- [ ] بتفهم constraints الفرق التانية ومبتعتبرهمش "بيعطّلونا"
- [ ] بتتفاوض على الـ interfaces/contracts بين الفرق بدري ومكتوبة
- [ ] بتشارك المعرفة: tech talks داخلية، docs، demos

---

## 🔴 المستوى 3 — المتقدم (التأثير على المنظمة — Senior+ / Staff)

### 3.1 Influence بدون سلطة
- [ ] **بتقنع بالـ data والـ prototypes مش بالصوت العالي**: "جرّبت X في branch، النتيجة Y" أقوى من 10 نقاشات
- [ ] **بتبني consensus قبل الاجتماع مش فيه**: تتكلم مع الأطراف المعنية فردي، تفهم اعتراضاتهم، تعدّل الاقتراح — الاجتماع للتأكيد
- [ ] بتعرف مين صاحب القرار الحقيقي ومين المتأثر، وبتتكلم مع كل واحد بلغته
- [ ] بتقبل إن اقتراحك يترفض وبتعرف إمتى تصرّ (disagree and commit)
- [ ] بتختار معاركك: مش كل حاجة تستاهل نقاش
- [ ] بتدي credit للناس علنًا وبتاخد المسؤولية عن الفشل

### 3.2 Technical leadership
- [ ] بتحدد **technical direction** لمجال/domain: فين إحنا، فين رايحين، إيه الخطوات — ومكتوب
- [ ] بتدير **technical debt** كـ portfolio: مش "كل حاجة وحشة"، بس "دول الـ 3 اللي بيكلّفونا أكتر، ودي الخطة"
- [ ] بتعرف تقول "مش محتاجين ده" للتكنولوجيا الجديدة (وتبرر) وتقول "محتاجين ده" لحاجة مملة (tests، observability)
- [ ] بتوازن بين الـ delivery والـ quality وبتقدر تشرح الـ trade-off للـ management
- [ ] بتعمل **architecture reviews** بشكل بنّاء (مش gatekeeper): أسئلة، مخاطر، بدائل
- [ ] بتحدد standards للفريق (coding guidelines، review process، definition of done) وبتخليهم automated لما ينفع
- [ ] بتشوف الـ big picture: إزاي الـ system بتاعنا بيتفاعل مع الباقي، إيه اللي هيكسر السنة الجاية

### 3.3 Hiring و Team building
- [ ] بتعمل interviews بشكل منظم: rubric واضح، نفس الأسئلة، تقييم السلوك مش الانطباع
- [ ] بتقيّم system design و coding interviews وتدي feedback مفيد
- [ ] بتشارك في تحديد "إيه اللي محتاجينه" في الـ hire الجاي
- [ ] Onboarding plan للجديد (أول يوم، أول أسبوع، أول شهر)

### 3.4 Strategy و Prioritization
- [ ] بتربط الشغل التقني بأهداف الشركة (OKRs) وبتقدر تقول ليه X أهم من Y دلوقتي
- [ ] بتعرف تقول "نوقف ده" لمشروع مش بيجيب قيمة
- [ ] بتفكر في الـ second-order effects: القرار ده هيعمل إيه بعد 6 شهور؟
- [ ] بتعمل **risk assessment** للمشاريع الكبيرة: إيه اللي ممكن يفشل، الاحتمال، الأثر، الـ mitigation
- [ ] بتفرّق بين urgent و important وبتحمي وقت الفريق للـ important

### 3.5 Writing و Visibility (للترقية وللسوق)
- [ ] **بتكتب technical articles** من اللي بتتعلمه (Postgres tuning، RAG evals، incident لessons) — 6–10 مقالات عميقة بتتفحص أكتر من أي شهادة
- [ ] بتعمل tech talks داخلية/خارجية
- [ ] **Open source**: PR مقبول في مكتبة بتستخدمها (bug fix، docs، feature صغيرة)
- [ ] بتوثّق إنجازاتك (brag document): إيه اللي عملته، الأثر بالأرقام، مين استفاد — للترقية والـ interviews
- [ ] بتبني profile (GitHub، LinkedIn، blog) بيعكس المستوى الحقيقي مش buzzwords

### 3.6 Self-management
- [ ] بتدير وقتك: deep work blocks، تقلل الـ context switching، تقول لأ للـ meetings اللي مش محتاجها
- [ ] بتتعامل مع الـ burnout بدري (علاماته، الحدود)
- [ ] بتطلب الترقية بشكل واضح: الـ expectations للمستوى الجاي، الفجوات، الخطة، الأدلة — مش بتستنى حد يلاحظ
- [ ] بتتعلم من السنيور/الـ staff اللي حواليك: إيه اللي بيعملوه مختلف
- [ ] بتحافظ على مستواك التقني وإنت بتعمل الحاجات دي (مبتبقاش "manager بالغلط")

---

## 🛠️ الـ Artifact المطلوب من القسم ده (كلها حقيقية في شغلك)

1. **RFC واحد حقيقي** لقرار تقني معلّق في شغلك الحالي — تكتبه، تقدّمه، تقفله بقرار. (أسرع طريقة تتشاف كسنيور قبل اللقب)
2. **اتطوّع تقود الـ incident/postmortem الجاي** — timeline، blameless analysis، action items، follow-up.
3. **3 ADRs** في الـ repo بتاع شغلك (أو المشروع الجانبي) لقرارات اتاخدت من غير توثيق.
4. **Mentorship موثّق**: جونيور/mid واحد بتساعده بانتظام لـ 3 شهور — اكتب إيه اللي اتحسّن فيه (بأمثلة).
5. **Review guidelines** للفريق (صفحة واحدة) — اقترحها وطبّقها.
6. **Scoping exercise**: خد feature غامضة من الـ backlog → milestones → MVP → تقدير بنطاق → قدّمه للـ product.
7. **"Simpler alternative" proposal**: feature كانت هتاخد 3 أسابيع → اقترح بديل بأسبوع بنفس الهدف.
8. **Brag document** محدّث كل شهر: الإنجازات بالأرقام والأثر.
9. **3 مقالات تقنية** منشورة (من الأقسام التقنية — مثلًا Postgres tuning، RAG evals، outbox pattern).
10. **PR واحد مقبول** في مكتبة open source بتستخدمها.
11. **Promotion packet**: الـ expectations للـ Senior في شركتك ↔ أدلتك لكل بند ↔ الفجوات والخطة — واتناقش فيه مع الـ manager.

## 📚 المصادر

- [StaffEng.com](https://staffeng.com) — guides + stories من staff engineers (مجاني)
- **The Staff Engineer's Path** (Tanya Reilly) — الكتاب الأهم للمرحلة دي
- **An Elegant Puzzle** (Will Larson) و [lethain.com](https://lethain.com)
- **The Manager's Path** (Camille Fournier) — الفصول عن Tech Lead
- [Google SRE — Postmortem culture](https://sre.google/sre-book/postmortem-culture/)
- [Writing design docs — Google style](https://www.industrialempathy.com/posts/design-docs-at-google/)
- [How to write a good PR description](https://github.blog/developer-skills/github/how-to-write-the-perfect-pull-request/)
- [Charity Majors — The Engineer/Manager Pendulum](https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/)
- [Julia Evans — Brag documents](https://jvns.ca/blog/brag-documents/)
- [Conventional Comments](https://conventionalcomments.org/) — للـ code review labels
- [Addy Osmani — The Next Two Years of Software Engineering](https://addyosmani.com/blog/next-two-years/)

## ✅ اختبار الخروج (مؤشرات إنك بقيت Senior — سلوك مش لقب)

- [ ] بتتسلّم مشكلة غامضة وبتطلّع منها design doc و milestones من غير ما حد يفصّل لك
- [ ] الفريق بيجيلك لما الـ production يقع، وإنت بتقود الـ incident بهدوء
- [ ] مراجعاتك للكود بتمسك design و security issues مش formatting
- [ ] بتقول "لأ" لتصميم بأسباب تقنية ومنتجية وبتقترح أبسط
- [ ] جونيور أو mid في فريقك اتحسّن بسببك بشكل واضح
- [ ] تقدر تشرح الـ trade-off في أي قرار تقني اتاخد في السيستم بتاعكم
- [ ] بتستخدم الـ AI كـ multiplier وبتعرف تمسك أغلاطه، وبتحدد للفريق إمتى يستخدمه
- [ ] كتبت RFC واحد على الأقل اتنفذ، وقدت postmortem واحد على الأقل
- [ ] الـ product بيسألك رأيك قبل ما يقرر، مش بعد
