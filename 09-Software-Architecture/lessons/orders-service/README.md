# orders-service

The small service that the code lessons in section 09 share, so you can watch the same code evolve.

ده الـ service الصغير اللي دروس الكود في القسم 09 بتستخدمه كلها، عشان تشوف نفس الكود وهو بيتطور.

- `before/`: the tangled start, one Express route holding SQL, tax rules, payment and email. · البداية المتلخبطة: route واحد فيه الـ SQL والضرايب والدفع والإيميل.
- `after/`: the same behaviour as a modular monolith with ports and adapters. · نفس السلوك بس modular monolith بـ ports و adapters.
- `lib/`: starts a throwaway Postgres and a fake payment provider on free ports. · بيشغّل Postgres مؤقت و payment provider وهمي على ports فاضية.
- `scripts/`: the architecture checks. · الـ checks بتاعة الـ architecture.

## Run it · إزاي تشغّله

Needs Node 22.18+ and Postgres 18 binaries installed. · محتاج Node 22.18+ وملفات Postgres 18 متسطبة.

```bash
npm i --ignore-scripts --legacy-peer-deps --no-audit --no-fund
npm test                        # after/ core tests, no database
npm run arch                    # architecture rules on after/src
node before/smoke.ts            # the tangled version on a throwaway Postgres
node after/test/integration.ts  # the modular version on a throwaway Postgres
```

If your binaries aren't in `C:/Program Files/PostgreSQL/18/bin`, set `PG_BIN` to their folder first.

لو الملفات مش في `C:/Program Files/PostgreSQL/18/bin`، حط مسار الفولدر بتاعها في `PG_BIN` الأول.

## Known gaps, on purpose · ثغرات معروفة وسايبينها عمدًا

`after/` is a teaching codebase, and the lessons use these gaps as things to find and fix, so they stay in the code. The number is the lesson that covers it.

`after/` كود للتعليم، والدروس بتستخدم الثغرات دي كحاجات تكتشفها وتصلّحها بإيدك، فهي فاضلة في الكود. الرقم هو الدرس اللي بيغطيها.

- `reserve` commits before `save`, so a failed save loses stock (15, 27, 37). · الـ `reserve` بيعمل commit قبل الـ `save`، فلو الـ save فشل الـ stock بيضيع.
- A repeated SKU returns 500 and leaks stock (11, 19). · الـ SKU المتكرر بيرجّع 500 وبيضيّع stock.
- `Order.place` keeps the caller's array and doesn't freeze its state (03, 18, 19). · الـ `Order.place` بيحتفظ بالـ array بتاع اللي نده عليه ومش بيجمّد الـ state.
- `Money.add` can produce an unsafe integer (18). · الـ `Money.add` ممكن يطلّع رقم مش safe integer.
- `StaleOrderError` lives in the Postgres adapter, so the use case can't catch it (13, 19, 21, 23). · الـ `StaleOrderError` جوه الـ adapter بتاع Postgres، فالـ use case مش بيقدر يمسكه.
- A provider failure leaves the order `placed` and stock held (13, 19, 37). · لو الـ provider وقع الأوردر بيفضل `placed` والـ stock محجوز.
- The HTTP gateway throws `SyntaxError` on an HTML 502, and treats a provider 500 as a decline (11, 21). · الـ gateway بيرمي `SyntaxError` لو الـ 502 رجعت HTML، وبيعتبر الـ 500 رفض للكارت.
- `reserve` doesn't roll back when a statement throws, and `qty` has no upper limit (21). · الـ `reserve` مش بيعمل rollback لو statement رمت error، والـ `qty` مالوش حد أقصى.
- The `_minor` columns are `int`, which caps an order at 21,474,836.47 (24). · أعمدة الـ `_minor` نوعها `int`، وده بيحدد الأوردر بـ 21,474,836.47.
- `lib/lab.ts` has no `pool.on("error")`, so a Postgres stop kills the process (37). · الـ `lib/lab.ts` مفيهوش `pool.on("error")`، فوقوع Postgres بيقفّل الـ process.

**Your own databases are safe:** `lib/` creates its own cluster in a `lib/pgdata-*` folder on a free port and deletes it afterwards. It refuses an empty port and the default ports, because an empty port makes a driver connect to the default service, which could be your real database.

**الداتابيز بتاعتك في أمان:** الـ `lib/` بيعمل cluster خاص بيه في فولدر `lib/pgdata-*` على port فاضي وبيمسحه في الآخر. وبيرفض الـ port الفاضي والـ ports الافتراضية، لأن الـ port الفاضي بيخلّي الـ driver يوصل للخدمة الافتراضية، ودي ممكن تكون الداتابيز الحقيقية بتاعتك.
