# Senior 2027 — المنهج الكامل مقسّم

المنهج التفصيلي من [المنهج الكامل من الصفر](./المنهج%20الكامل%20من%20الصفر%20—%20System%20Design،%20Software%20Architecture،%20Node.js،%20React،%20N.md) مقسّم 10 فولدرات، كل فولدر فيه `README.md` بالمواضيع الفرعية على 3 مستويات:

- 🟢 **المستوى 1 — الأساسيات** (لازم قبل أي حاجة)
- 🟡 **المستوى 2 — المتوسط**
- 🔴 **المستوى 3 — المتقدم** (اللي بيفرّق السنيور)

## الترتيب والوقت

| # | القسم | الوقت | الحجم |
| --- | --- | --- | --- |
| 01 | [CS Fundamentals](./01-CS-Fundamentals/README.md) | 3 أسابيع | متوسط |
| 02 | [JavaScript](./02-JavaScript/README.md) | 3 أسابيع | كبير |
| 03 | [TypeScript](./03-TypeScript/README.md) | 2 أسبوع | متوسط |
| 04 | [Node.js](./04-NodeJS/README.md) | 4 أسابيع | كبير جدًا |
| 05 | [React](./05-React/README.md) | 3 أسابيع | كبير |
| 06 | [Next.js](./06-NextJS/README.md) | 2 أسبوع | متوسط |
| 07 | [Databases](./07-Databases/README.md) | 4 أسابيع | كبير جدًا |
| 08 | [Design Patterns](./08-Design-Patterns/README.md) | 3 أسابيع | كبير |
| 09 | [Software Architecture](./09-Software-Architecture/README.md) | 5 أسابيع | الأكبر |
| 10 | [System Design](./10-System-Design/README.md) | 6 أسابيع | الأكبر |
| 11 | [Testing · Security · DevOps](./11-Testing-Security-DevOps/README.md) | 4 أسابيع | كبير جدًا |
| 12 | [AI Engineering](./12-AI-Engineering/README.md) | 4 أسابيع | كبير |
| 13 | [Senior Skills](./13-Senior-Skills/README.md) (غير تقني — بيتمرن في الشغل) | مستمر | متوسط |
| 14 | [Interview Prep](./14-Interview-Prep/README.md) | الربع الأخير | متوسط |

**الإجمالي:** ~12 شهر بإيقاع 10–12 ساعة أسبوعيًا (مراجعة مش تعلم من الصفر) — متوافق مع خطة الـ 4 أرباع في [project/roadmap.md](./project/roadmap.md).

ملحوظة على الترتيب: Design Patterns (08) قبل Architecture (09) لأنها الأدوات اللي الـ architecture بتتبني بيها، و Architecture قبل System Design (10) عمدًا — الأولى بتبني طريقة التفكير اللي التانية بتستخدمها على scale. React/Next في النص عشان تربط بيهم. AI Engineering (12) بعد الـ backend الناضج لأن الـ AI feature في الآخر API + stream + queue + evals. Senior Skills (13) بيتمرن في شغلك طول السنة، و Interview Prep (14) في الربع الأخير.

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
- 04 → الـ backend (Fastify/NestJS، auth، queues، observability)
- 05 + 06 → الـ frontend (React → Next.js App Router) في monorepo
- 07 → الـ data layer (Postgres tuning، Redis، outbox)
- 08 → تطبيق الـ patterns (Strategy، Adapter، Decorator، Outbox، circuit breaker) في المشروع
- 09 → إعادة الهيكلة كـ modular monolith بـ DDD على module واحد
- 10 → design docs للـ bottlenecks عند 10× و 100×
- 11 → tests + security scans + Terraform على AWS + canary deploy
- 12 → AI feature (RAG على pgvector + streaming + evals) + MCP server
- 13 → RFCs و postmortems و mentorship في شغلك الحقيقي
- 14 → المشروع كـ portfolio + مقالات + mock interviews

مشروع واحد عميق أقوى في الـ interviews من 5 مشاريع سطحية. التفاصيل والـ templates في [project/](./project/README.md).
