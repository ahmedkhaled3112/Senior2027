# Senior 2027 — المنهج الكامل مقسّم

المنهج التفصيلي من [المنهج الكامل من الصفر](./المنهج%20الكامل%20من%20الصفر%20—%20System%20Design،%20Software%20Architecture،%20Node.js،%20React،%20N.md) مقسّم 17 فولدر، كل فولدر فيه `README.md` بالمواضيع الفرعية على 3 مستويات:

- 🟢 **المستوى 1 — الأساسيات** (لازم قبل أي حاجة)
- 🟡 **المستوى 2 — المتوسط**
- 🔴 **المستوى 3 — المتقدم** (اللي بيفرّق السنيور)

## الترتيب والوقت

| # | القسم | الوقت | الحجم |
| --- | --- | --- | --- |
| 01 | [JavaScript](./01-JavaScript/README.md) | 3 أسابيع | كبير |
| 02 | [TypeScript](./02-TypeScript/README.md) | 2 أسبوع | متوسط |
| 03 | [CS Fundamentals](./03-CS-Fundamentals/README.md) | 3 أسابيع | متوسط |
| 04 | [Data Structures](./04-Data-Structures/README.md) | 4 أسابيع | كبير |
| 05 | [Algorithms](./05-Algorithms/README.md) | 5 أسابيع | كبير |
| 06 | [Node.js](./06-NodeJS/README.md) | 4 أسابيع | كبير جدًا |
| 07 | [React](./07-React/README.md) | 3 أسابيع | كبير |
| 08 | [Next.js](./08-NextJS/README.md) | 2 أسبوع | متوسط |
| 09 | [Databases](./09-Databases/README.md) | 4 أسابيع | كبير جدًا |
| 10 | [Design Patterns](./10-Design-Patterns/README.md) | 3 أسابيع | كبير |
| 11 | [Software Architecture](./11-Software-Architecture/README.md) | 5 أسابيع | الأكبر |
| 12 | [System Design](./12-System-Design/README.md) | 6 أسابيع | الأكبر |
| 13 | [Testing · Security · DevOps](./13-Testing-Security-DevOps/README.md) | 4 أسابيع | كبير جدًا |
| 14 | [AI Engineering](./14-AI-Engineering/README.md) | 4 أسابيع | كبير |
| 15 | [Senior Skills](./15-Senior-Skills/README.md) (غير تقني — بيتمرن في الشغل) | مستمر | متوسط |
| 16 | [Interview Prep](./16-Interview-Prep/README.md) | الربع الأخير | متوسط |
| 17 | [ERP & Odoo](./17-ERP/README.md) | 6 أسابيع | كبير |

**الإجمالي:** ~14 شهر بإيقاع 10–12 ساعة أسبوعيًا (مراجعة مش تعلم من الصفر). خطة المشروع الجانبي في [project/roadmap.md](./project/roadmap.md) بتمشي جنبها.

ملحوظة على الترتيب: اللغة الأول. JavaScript (01) ثم TypeScript (02)، لأن كل الكود في المنهج مكتوب بـ TypeScript strict، فلازم تكون متقنها قبل أي حاجة تانية. بعدها CS Fundamentals (03) بيدّيك المفاهيم والـ Big-O، و Data Structures (04) و Algorithms (05) بيكمّلوا عليه على طول: بتبني كل structure وكل algorithm بإيدك وتقيسه. Node (06) و React/Next (07، 08) و Databases (09) هم الـ stack نفسه. Design Patterns (10) قبل Architecture (11) لأنها الأدوات اللي الـ architecture بتتبني بيها، و Architecture قبل System Design (12) عمدًا: الأولى بتبني طريقة التفكير اللي التانية بتستخدمها على scale. AI Engineering (14) بعد الـ backend الناضج لأن الـ AI feature في الآخر API + stream + queue + evals. Senior Skills (15) بيتمرن في شغلك طول السنة، و Interview Prep (16) في الربع الأخير. ERP & Odoo (17) تخصص إضافي في الآخر.

## ملفات مهمة

- [CLAUDE.md](./CLAUDE.md) — قواعد التعليم والشغل في الـ repo (اقرأه الأول)
- [progress.md](./progress.md) — التقدم الإجمالي (بيتولّد بـ `node _tools/update-progress.js`)، وكل فولدر فيه `progress.md` بتاعه
- [_template/lesson.html](./_template/lesson.html) — الـ template اللي كل درس HTML بيتعمل منه
- الدروس بتتحط في `NN-Section/lessons/NN-topic.html`
- [project/](./project/README.md) — المشروع الجانبي: spec، roadmap بالأرباع، ADRs، design docs، reports (الكود في repo منفصل)

## إزاي تشتغل على كل فولدر

1. افتح الـ `README.md` وامشي على كل بند `- [ ]` وعلّمه: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
2. البنود 🔄 و ❌ هي خطتك للقسم ده — ابدأ بالمستوى 🟢 وماتنتقلش للي بعده قبل ما تقفله
3. لكل بند: اقرأ المصدر → اكتب مثال صغير **بإيدك مش بالـ AI** → اشرحه بصوت عالي في دقيقتين
4. اعمل الـ **🛠️ Artifact** المطلوب في آخر كل ملف — القراءة من غير إنتاج بتتبخر في أسبوعين
5. جاوب على **✅ اختبار الخروج** قبل ما تعتبر القسم خلصان

## الخيط اللي بيربط كل الأقسام

مشروع جانبي **واحد** بيكبر مع كل قسم:
- 04 + 05 → structures و algorithms حقيقية جوه المشروع (ring buffer للـ metrics، heap للـ scheduler، topological sort للـ jobs، external sort للـ exports)
- 06 → الـ backend (Fastify/NestJS، auth، queues، observability)
- 07 + 08 → الـ frontend (React → Next.js App Router) في monorepo
- 09 → الـ data layer (Postgres tuning، Redis، outbox)
- 10 → تطبيق الـ patterns (Strategy، Adapter، Decorator، Outbox، circuit breaker) في المشروع
- 11 → إعادة الهيكلة كـ modular monolith بـ DDD على module واحد
- 12 → design docs للـ bottlenecks عند 10× و 100×
- 13 → tests + security scans + Terraform على AWS + canary deploy
- 14 → AI feature (RAG على pgvector + streaming + evals) + MCP server
- 15 → RFCs و postmortems و mentorship في شغلك الحقيقي
- 16 → المشروع كـ portfolio + مقالات + mock interviews
- 17 → ربط المشروع بـ Odoo (JSON-2 API، webhooks، sync) كـ system of record للمحاسبة

مشروع واحد عميق أقوى في الـ interviews من 5 مشاريع سطحية. التفاصيل والـ templates في [project/](./project/README.md).
