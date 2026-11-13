# CLAUDE.md — تعليمات الشغل في الـ repo ده

## 1. مين أنا وإيه الهدف

- أنا Full-Stack Node.js developer بخبرة ~4 سنين، Mid-level، وهدفي أبقى **Senior بجد** (مش لقب): architecture، system design، production ownership، وأبقى **برنس في كل حاجة technical**.
- الـ repo ده هو المكان الوحيد اللي بسجّل فيه كل حاجة بتعلمها: https://github.com/ahmedkhaled3112/Senior2027.git
- المنهج الكامل في [README.md](./README.md)، و17 فولدر مرقّمين `01-` لـ `17-` كل واحد فيه `README.md` بالمواضيع على 3 مستويات (🟢 أساسيات · 🟡 متوسط · 🔴 متقدم). الترتيب: اللغة الأول (01 JavaScript، 02 TypeScript)، بعدها 03 CS Fundamentals و 04 Data Structures و 05 Algorithms، وبعدها الـ stack والـ architecture لحد 14 (AI). الأقسام 01–14 تقنية، 15 (Senior Skills) بيتمرن في الشغل، 16 (Interview Prep) للربع الأخير، 17 (ERP & Odoo) تخصص إضافي.
- الخيط اللي بيربط كل حاجة: **مشروع جانبي واحد** بيكبر مع كل قسم (backend Node → frontend Next → data layer → patterns → architecture → system design → tests/security/deploy → AI feature). الـ spec والـ roadmap والـ ADRs والـ design docs بتاعته في [project/](./project/README.md) — الكود في repo منفصل.
- لما أطلب "ADR" أو "design doc" استخدم الـ templates في `project/adr/0000-template.md` و `project/design-docs/0000-template.md`.

## 2. قواعد التعليم (الأهم — اقرأها قبل أي درس)

1. **عملي مش نظري.** كل مفهوم لازم يتشرح بمثال كود حقيقي يتشغّل. النظري ميزيدش عن 20% من الدرس. لو الجزء مفيهوش كود أو تمرين، يبقى ناقص.
2. **كل جزء بمثال.** مش الدرس كله بمثال واحد في الآخر — **كل sub-section** فيها مثال خاص بيها.
3. **اربطها بشغلي ومشاريعي.** بعد كل جزء، لازم تجاوب صراحةً على: *"أنا هستخدم ده فين وإزاي في مشاريعي؟"* — مثال من backend API حقيقي، من مشروع Next، من الـ data layer، من الـ production. مش أمثلة `Animal`/`Dog`/`Foo`/`Bar`؛ أمثلة `Order`، `Payment`، `User`، `Notification`، `Invoice`، queue، cache، API.
4. **اللغة: إنجليزي ثم عامية مصرية.** كل جزء بيتكتب مرتين:
   - أولًا **English**: الشرح التقني الكامل بالمصطلحات الصح (عشان أتعود على لغة الـ docs والـ interviews).
   - بعده مباشرة **بالعامية المصرية**: نفس الفكرة بشرح أبسط + المثال العملي + "فين هستخدمه في شغلي". المصطلحات التقنية تفضل بالإنجليزي جوه الكلام العربي (event loop، backpressure، aggregate) مش تتترجم.
   - **كل حاجة ليها شرحها بالعربي — مفيش أي نص إنجليزي من غير مقابل عربي**: عناوين الأجزاء (`.ar-sub`)، الـ callouts (trade-off / warn / interview)، التمارين، التلميحات والحلول، الرسومات، الجداول، والـ cheat sheet (`.ar-note` أو `section.ar`). والـ AR section لازم يغطي كل نقطة في الـ EN section مش ملخص.
   - **الكود نفسه ميتترجمش، بس الـ comments اللي جواه تبقى بالعامية** (المصطلحات بالإنجليزي). كل comment عربي يبقى line comment (`//` أو `#` أو `--`) و**يبدأ بكلمة عربي** — لو بدأ بكلمة إنجليزي الاتجاه بيتلخبط في العرض. الـ output اللي في الـ comments (`// → 42`) يفضل زي ما هو، وبلوكات `plaintext` (output الـ terminal) تفضل زي ما هي ويتحط شرحها في `.ar-note` تحتها.
5. **المستوى: عمق سنيور.** متشرحش الحاجة سطحي. لو فيه "ليه" وراها، اشرح الـ "ليه". لو فيه trade-off، اذكره. لو فيه غلطة شائعة، وريني إياها بالكود وإزاي تتصلح. لو فيه سؤال interview عليها، حطه.
6. **الـ "إيه اللي هيكسر" mindset.** في أي مثال: إيه اللي بيحصل تحت الضغط؟ على scale؟ لو الـ input غلط؟ لو الـ service التاني وقع؟
7. **تمارين "جرّب بنفسك".** كل درس ينتهي بـ 2–4 تمارين عملية صغيرة أعملها بإيدي (مش بالـ AI)، مرتبة من السهل للصعب، وواحدة منهم على الأقل مرتبطة بالمشروع الجانبي.
8. **متكررش اللي في الـ README.** الـ README فيه قايمة المواضيع؛ الدرس فيه الشرح والكود. الدرس بيغطي بنود محددة من الـ README ويقولها بالاسم في آخره عشان أعلّمهم.
9. **لما أسأل سؤال سريع** (مش درس)، جاوب مباشرة وبإيجاز بنفس القاعدة: مثال + فين أستخدمه — من غير ما تعمل ملف HTML إلا لو طلبت.
10. **القسم 15 (Senior Skills) مختلف**: الدرس فيه مش كود — هو سيناريو حقيقي من الشغل + إزاي تتصرف + template (RFC، postmortem، feedback) + تمرين تعمله في شغلك الأسبوع ده. نفس قاعدة EN ثم AR.
11. **القسم 16 (Interview Prep)**: الدرس = تمرين بتوقيت (مسألة، design، سؤال behavioral) + الحل النموذجي + إيه اللي الـ interviewer بيقيّمه + الغلطات الشائعة.
12. **القسم 14 (AI)**: كل درس لازم يحتوي على cost و latency و failure mode للحاجة اللي بتتشرح، وevals لو فيه LLM call — مش demo بس.

## 3. شكل الدرس (HTML)

- كل درس = ملف HTML واحد self-contained في فولدر القسم تحت `lessons/`:
  `NN-topic-name.html` → مثال: `06-NodeJS/lessons/03-streams-and-backpressure.html`
- **ابدأ دايمًا من** [`_template/lesson.html`](./_template/lesson.html) — انسخه واملاه. متغيّرش الـ CSS والـ structure إلا لو طلبت. الـ template فيه: light/dark، خطوط مريحة (Inter للإنجليزي، Cairo للعربي، JetBrains Mono للكود)، code highlighting، TOC، و"mark as done" بـ localStorage.
- التصميم لازم يفضل **واضح ومريح للعين للمذاكرة الطويلة**: عرض نص ≤ 800px، line-height ≥ 1.7، contrast عالي، مفيش ألوان صارخة، كود بخلفية هادية، مسافات واسعة بين الأجزاء.
- هيكل كل درس بالترتيب:
  1. **Header**: العنوان، القسم، المستوى (🟢/🟡/🔴)، الوقت المتوقع، البنود اللي بيغطيها من الـ README.
  2. **Why this matters** (EN) + **ليه ده مهم** (AR): 3–5 سطور — فين بيظهر في الشغل الحقيقي والـ interviews.
  3. **Parts** (3–7 أجزاء)، كل part فيه بالترتيب:
     - `section.en` → الشرح الإنجليزي الكامل
     - `pre > code` → مثال كود يتشغّل (TypeScript/Node/React حسب القسم) مع comments
     - `section.ar` → الشرح بالعامية + **"فين هستخدمه في شغلي"** (box مميز) + الغلطة الشائعة لو فيه
     - `.callout` للـ trade-offs أو الـ interview question أو الـ "what breaks at scale"
  4. **Common mistakes** (EN + AR) بالكود: الغلط → الصح.
  5. **Try it yourself**: 2–4 تمارين مرتبة.
  6. **Summary / Cheat sheet**: نقاط سريعة للمراجعة.
  7. **README items covered**: قايمة البنود بالنص عشان أعلّمها في README القسم.
  8. **Sources**: روابط الـ docs/المقالات اللي الدرس مبني عليها.
- الكود: TypeScript strict by default. Node 22+. React 19 / Next 15+ App Router. Postgres 16+. كل مثال لازم يكون كامل كفاية إنه يتشغّل (imports، types) مش snippets مقطوعة — إلا لو الجزء واضح إنه pseudo.
- الحجم: درس واحد = موضوع واحد متماسك (30–60 دقيقة مذاكرة). لو الموضوع أكبر، قسّمه لدرسين مش درس عملاق.

## 4. تتبّع التقدم (Progress)

- **مصدر الحقيقة** = الـ checkboxes في `README.md` بتاع كل قسم. لما أخلّص بند أعلّمه `- [x]`.
- كل فولدر فيه `progress.md` وفي `progress.md` عام في الـ root. الجزء اللي بين `<!-- AUTO:START -->` و `<!-- AUTO:END -->` **بيتولّد أوتوماتيك** من الـ checkboxes والدروس الموجودة؛ اللي بره الـ markers (notes، ملاحظات، أسئلة معلّقة) يدوي ومبيتمسحش.
- التحديث: `node _tools/update-progress.js` — شغّله (أو شغّله لي) بعد أي درس جديد أو أي تعليم checkbox. **بعد ما تعمل درس جديد، شغّل السكريبت دايمًا** عشان الدرس يظهر في جدول الدروس.
- في آخر كل درس، قولي بالظبط إيه البنود اللي أعلّمها في README (بالنص) — وأنا اللي بعلّمها بعد ما أتأكد إني فاهم (مش إنت).

## 5. Git والـ repo

- Branch رئيسي: `main`. Commit مباشر على main مقبول (repo شخصي).
- Commit messages بالإنجليزي، conventional: `lesson(06-node): streams and backpressure`، `progress: mark 01-js level 1 done`، `docs(10): add outbox pattern notes`.
- **متعملش commit أو push غير لما أقولك.** لما أقول "commit" اعمل `git add` للملفات المتعلقة بالشغل الحالي بس (مش `git add -A` على العمياني) و commit واحد بـ message واضح.
- متمسحش ولا تعدّل في الملفين الأصليين (`المنهج الكامل...md` و `خريطة الطريق...md`) — دول المرجع.
- متعدّلش في هيكل الفولدرات أو الترقيم من غير ما تسألني.

## 6. اللغة في الرد عليّ

- كلّمني بالعامية المصرية. المصطلحات التقنية بالإنجليزي.
- متطوّلش في المقدمات. ادخل في الموضوع.
- لو مش فاهم طلبي، اسأل سؤال واحد محدد — متفترضش.
- لو عملت ملف، قولي الـ path بتاعه كامل.

## 7. Checklist قبل ما تسلّم أي درس

- [ ] كل part فيها: EN → code → AR (+ فين هستخدمه) ؟
- [ ] مفيش نص إنجليزي من غير عربي: `.ar-sub` على كل part، `.ar-note` في كل callout وتمرين وتلميح وحل وتحت كل رسمة وجدول، و`section.ar` للـ cheat sheet؟
- [ ] الـ comments جوه الكود بالعامية وكل واحد بيبدأ بكلمة عربي؟
- [ ] الأمثلة من domain حقيقي (orders/payments/users/queues) مش foo/bar ؟
- [ ] فيه "common mistakes" بالكود؟
- [ ] فيه 2–4 تمارين، واحدة مرتبطة بالمشروع؟
- [ ] فيه "README items covered" بالنص؟
- [ ] الـ HTML من الـ template، بيفتح من غير internet (إلا الخطوط والـ highlighter من CDN)، ومريح في الـ dark و الـ light؟
- [ ] شغّلت `node _tools/update-progress.js` ؟
