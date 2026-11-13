# 17 — ERP & Odoo (الـ domain اللي شايل فلوس الشركات)

> **ليه القسم ده:** الـ ERP هو النظام اللي فلوس الشركة ومخزونها بيعدّوا منه. لما تفهم الـ double-entry والـ business processes وإزاي الأنظمة دي بتتبني وبتتربط، بتبقى المهندس اللي يقدر يضمن إن الفلوس صح عبر الأنظمة. القسم بيعلّمك ERP من أول المحاسبة لحد Odoo في production والـ e-invoicing، من غير ما يطلب منك تسيب Node.
>
> **الوقت التقريبي:** 6 أسابيع · **المصدر الأنسب:** [Odoo 20 docs](https://www.odoo.com/documentation/20.0/)

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش

القسم ده بيتبني على 04 (Node) و 07 (Databases) و 09 (Architecture). Odoo Community 20 متنزّل عندك في `D:\tools\odoo` عشان تحل التمارين عليه. **الهدف domain يتضاف لخبرتك كـ backend engineer، مش تغيير الـ title:** أسباب ده بالأرقام في الدرس الأخير.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 يعني إيه ERP ومين بيشتريه
- [ ] **ERP** يعني إيه: modules متكاملة فوق data model واحد، وليه ده مختلف عن Stripe + Shopify + CRM متوصلين بـ webhooks
- [ ] الـ modules الأساسية: Accounting، Sales، Purchase، Inventory، Manufacturing، HR/Payroll، CRM، POS
- [ ] ERP vs accounting software vs CRM: كل واحد بيحل إيه
- [ ] مين بيشتري ERP، وإيه اللي بيخلي شركة تحتاجه (Excel وقع، فروع، مخزون، audit)
- [ ] الـ landscape: SAP، Oracle Fusion و NetSuite، Dynamics 365، Odoo، ERPNext، Zoho، وكل واحد في أنهي شريحة
- [ ] الفلوس رايحة فين: license vs implementation services، وليه معظم الوظايف عند implementation partners
- [ ] Cloud vs on-premise vs hybrid و two-tier ERP

### 1.2 المحاسبة للمبرمجين
- [ ] **Double-entry**: كل حركة مدين ودائن متساويين، وليه ده invariant زي أي invariant في الكود
- [ ] أنواع الحسابات الخمسة: Assets، Liabilities، Equity، Income، Expenses، وقاعدة debit/credit لكل نوع
- [ ] **Chart of accounts** وإزاي بيتصمم
- [ ] Journal entries، journals، و general ledger
- [ ] Trial balance وليه بيتوازن
- [ ] **Balance sheet** و **Income statement (P&L)** و Cash flow statement: تقراهم وتفهم بيتطلعوا إزاي
- [ ] Accrual vs cash basis، و revenue recognition كمفهوم
- [ ] Receivables و payables و aging
- [ ] Fiscal periods، period closing، و lock dates
- [ ] VAT: input vs output tax، وإزاي بتتسجل
- [ ] الفلوس في الكود: decimal مش float، rounding per line vs per document، و multi-currency

### 1.3 الـ Business processes
- [ ] **Order-to-Cash**: quotation → sales order → delivery → invoice → payment
- [ ] **Procure-to-Pay**: RFQ → purchase order → receipt → vendor bill → payment، و 3-way matching
- [ ] Record-to-Report: من الحركات لحد القوايم المالية
- [ ] Hire-to-Retire و Plan-to-Produce كخريطة
- [ ] Master data vs transactional data، وليه جودة الـ master data بتحدد نجاح المشروع
- [ ] Document flow: كل document بيتولد من اللي قبله وبيطلّع قيود إيه

### 1.4 المشروع والأدوار
- [ ] مراحل الـ implementation: discovery، fit-gap، configuration، customization، data migration، UAT، go-live، hypercare
- [ ] **Configuration vs customization vs integration**، وليه الترتيب ده هو ترتيب التكلفة
- [ ] الأدوار: functional consultant، technical consultant / developer، implementer، solution architect، BA، PM، support
- [ ] Methodologies: SAP Activate، Success by Design، طريقة Odoo
- [ ] ليه مشاريع ERP بتفشل، وليه مفيش failure rate موثوق
- [ ] الـ go-live كـ cutover: mock cutovers، rollback، go/no-go

### 1.5 Python لمبرمج Node
- [ ] Syntax و types الأساسية مقارنة بـ TypeScript، و venv و pip مقارنة بـ npm
- [ ] Lists، dicts، tuples، sets، و comprehensions
- [ ] Classes، inheritance، `super()`، و dunder methods
- [ ] Decorators و context managers (الاتنين في Odoo كل يوم)
- [ ] Generators و iterators
- [ ] Exceptions، `Decimal`، و dates
- [ ] Sync بالـ processes و threads vs الـ event loop في Node، وليه Odoo مش async
- [ ] Type hints و pytest

### 1.6 أول خطوات في Odoo
- [ ] Odoo إيه: Community vs Enterprise، والرخص LGPL و Odoo Enterprise
- [ ] الـ hosting: Online vs Odoo.sh vs on-premise، وليه Online مابيقبلش custom modules
- [ ] تشغيل Odoo 20 عندك: `odoo-bin`، config file، database، وإزاي تدخل
- [ ] Developer mode وقراءة الـ technical menu
- [ ] إعداد شركة: currency، fiscal localization (`l10n_eg`، `l10n_sa`)، chart of accounts، و users
- [ ] Order-to-Cash كامل على Odoo بإيدك، وتشوف القيود اللي اتولدت
- [ ] Procure-to-Pay كامل وتشوف تأثيره على المخزون والحسابات
- [ ] الـ architecture: Python monolith، PostgreSQL، registry، workers، و addons

---

## 🟡 المستوى 2 — البناء (متوسط)

### 2.1 تشريح الـ module
- [ ] `__manifest__.py`: depends، data، assets، و version
- [ ] هيكل الفولدرات: models، views، security، data، controllers، static
- [ ] Install و upgrade، و `--addons-path`، و `-u`
- [ ] Data files، `noupdate`، و **External IDs**
- [ ] Demo data و hooks (`post_init_hook`)

### 2.2 الـ ORM
- [ ] Models و fields، وإزاي Odoo بيبني الـ schema
- [ ] Relational fields: Many2one، One2many، Many2many
- [ ] **Recordsets** و `self` و `env`، ومقارنتها بأي ORM في Node
- [ ] Domains و `search` و `read_group` و aggregates
- [ ] Computed fields، `@api.depends`، و stored vs non-stored
- [ ] Related fields و `@api.onchange`
- [ ] Constraints: Python و SQL
- [ ] Override لـ `create` و `write` و `unlink`
- [ ] **Inheritance**: `_inherit` الـ extension، و prototype، و `_inherits` delegation
- [ ] `sudo()` و `with_context()` و `with_company()`
- [ ] Prefetching، N+1، و batch operations، وقياس عدد الـ queries
- [ ] Raw SQL إمتى ومخاطرها مع الـ cache

### 2.3 الـ Views والـ Actions
- [ ] Views: list، form، kanban، search، pivot، graph، calendar
- [ ] View inheritance بـ XPath
- [ ] Window actions، menus، و server actions
- [ ] Widgets، conditional attributes، و `groups`
- [ ] TransientModel و wizards

### 2.4 الـ Frontend: OWL
- [ ] OWL مقارنة بـ React: components، hooks، reactivity، و templates
- [ ] Assets bundles و client actions
- [ ] Services و registries و `patch` لتعديل سلوك موجود
- [ ] Field widget مخصوص
- [ ] Website controllers و QWeb على الـ frontend

### 2.5 الـ Security
- [ ] Groups و access rights
- [ ] **`ir.access` في Odoo 20** بدل record rules، وإيه اللي اتغير
- [ ] Multi-company rules
- [ ] `sudo` traps وثغرات الـ custom modules
- [ ] Controllers: `auth`، CSRF، و input validation
- [ ] API keys وتسجيل دخول المستخدمين الخارجيين

### 2.6 Reports و Cron والـ Mail
- [ ] QWeb PDF reports (فاتورة بالعربي و RTL)
- [ ] Scheduled actions (`ir.cron`) وإزاي تخليها idempotent وبـ batches
- [ ] Mail thread، chatter، و activities
- [ ] Sequences وترقيم المستندات من غير فجوات
- [ ] Excel exports

### 2.7 Sales و Purchase و Inventory بالتفصيل
- [ ] Pricelists، discounts، و taxes على الـ line
- [ ] Stock moves، move lines، و quants
- [ ] Locations، warehouses، و routes
- [ ] Reservation وليه الـ stock race conditions صعبة
- [ ] Lots و serial numbers
- [ ] **Inventory valuation**: FIFO و AVCO، و perpetual vs periodic
- [ ] Landed costs
- [ ] Returns و scrap وتأثيرهم على القيود

### 2.8 Accounting جوه Odoo
- [ ] `account.move` و `account.move.line` من جوه
- [ ] Journals و Chart of accounts templates
- [ ] Taxes: price-included، groups، و fiscal positions
- [ ] Invoices، credit notes، و vendor bills
- [ ] Payments و **reconciliation**
- [ ] Bank statements و bank reconciliation
- [ ] Multi-currency و exchange differences
- [ ] Analytic accounting
- [ ] Lock dates و audit trail وليه القيد المنشور مابيتعدلش

### 2.9 Modules تانية
- [ ] Manufacturing: BoM، manufacturing orders، work centers
- [ ] CRM و Project و Timesheets
- [ ] HR و Payroll: وليه الـ payroll localization صعب
- [ ] POS: الشغل offline وربطه بالـ accounting
- [ ] Website و eCommerce

### 2.10 Testing و Debugging
- [ ] `TransactionCase` و `Form` و test tags
- [ ] `HttpCase` و tours
- [ ] `odoo-bin shell` و logging و `--dev`
- [ ] Profiler وقراءة الـ SQL اللي الـ ORM بيطلعه
- [ ] CI لـ module على Postgres حقيقية

### 2.11 الـ Integration من Node
- [ ] **JSON-2 API** و Bearer API keys، وخطة Custom
- [ ] XML-RPC و JSON-RPC deprecated والشيل في Odoo 22
- [ ] Odoo client بـ TypeScript و Zod
- [ ] كل JSON-2 call في transaction لوحده، وإزاي تضمن atomicity
- [ ] **Idempotency** و retries و external IDs
- [ ] Webhooks و polling على `write_date`
- [ ] مزامنة eCommerce أو payment gateway مع Odoo
- [ ] `queue_job` من OCA مقابل BullMQ

### 2.12 Data migration
- [ ] من Excel أو نظام قديم: mapping و cleaning
- [ ] Import بالـ CSV و external IDs
- [ ] Opening balances وإزاي تتأكد إنها مظبوطة
- [ ] Open invoices و stock الافتتاحي
- [ ] Reconciliation بعد الـ migration بـ scripts
- [ ] Cutover plan و rehearsal

### 2.13 ابني ledger بإيدك في Node
- [ ] Schema للـ double-entry في Postgres
- [ ] Invariant الـ balanced entry في الـ database نفسها
- [ ] Posting engine: من `Order` و `Payment` لقيود
- [ ] Idempotent posting و reversal بدل update
- [ ] Period lock و immutable audit trail
- [ ] Trial balance و P&L بـ SQL
- [ ] Reconciliation job بين الـ ledger والـ payment provider

---

## 🔴 المستوى 3 — المتقدم

### 3.1 الـ E-invoicing في مصر
- [ ] منظومة ETA: e-invoice و e-receipt، ومين ملزم
- [ ] Document structure، codes (GS1/EGS)، و validation
- [ ] التوقيع: USB token أو HSM، و canonicalization
- [ ] OAuth، submit، polling على الـ status، و rejection handling
- [ ] Connector بـ Node: idempotency، retry، و reconciliation

### 3.2 ZATCA والإمارات
- [ ] ZATCA Phase 2: clearance vs reporting، و waves
- [ ] UBL XML، hash chain، QR، و CSID
- [ ] Onboarding و device certificates
- [ ] الإمارات: PINT AE، Peppol 5-corner، و ASP، والمواعيد
- [ ] Build vs buy: packaged connector ولا تبني
- [ ] Architecture لنظام بيخدم أكتر من دولة

### 3.3 Odoo في production
- [ ] Workers، `limit_memory`، `limit_time`، و gevent websocket
- [ ] Reverse proxy و `proxy_mode` و TLS
- [ ] Filestore و backups و restore test
- [ ] Multi-database و `dbfilter`
- [ ] PostgreSQL tuning لـ Odoo
- [ ] Monitoring و logs و alerts
- [ ] Docker deploy
- [ ] إيه اللي بيكسر تحت الـ load: cron locks، long transactions، serialization failures

### 3.4 الـ Upgrades
- [ ] Upgrade cycle و support لكل version
- [ ] Odoo upgrade service مقابل OpenUpgrade
- [ ] Migration scripts: `pre`، `post`، `end`
- [ ] Porting لـ custom module (مثال `ir.rule` → `ir.access`)
- [ ] Strategy: test database، diff، rollback

### 3.5 قرارات الـ Customization
- [ ] إمتى تقول لأ للـ customization
- [ ] Extension vs modification، و clean core
- [ ] Module boundaries و dependency direction
- [ ] OCA: تستخدم إيه وتقيّمه إزاي
- [ ] الرخص: LGPL، OPL، وإيه اللي مسموح تعمله

### 3.6 Integration على scale
- [ ] ERP كـ system of record: مين بيملك أي data
- [ ] Outbox و CDC و event-driven مع ERP
- [ ] Canonical data model و anti-corruption layer
- [ ] iPaaS vs custom integration
- [ ] Reconciliation كـ first-class feature
- [ ] Failure scenarios: ERP وقع، duplicates، out-of-order

### 3.7 ERPs تانية للمبرمج
- [ ] SAP: S/4HANA، ABAP، clean core، وموعد ECC 2027/2030
- [ ] SAP CAP بـ Node.js
- [ ] NetSuite و SuiteScript (JavaScript)
- [ ] Dynamics 365: AL و X++
- [ ] ERPNext و Frappe مقارنة بـ Odoo
- [ ] تختار إزاي تتخصص أو لأ

### 3.8 الـ AI في ERP
- [ ] الـ AI في Odoo 20: agents، credits، و MCP
- [ ] OCR واستخراج بيانات الفواتير: cost و latency و failure mode و evals
- [ ] Agent بيقرا من ERP بأمان: permissions و human approval
- [ ] AI في كتابة modules: إيه اللي بيغلط فيه وتراجعه إزاي
- [ ] إيه اللي الـ AI ممكن يستبدله في شغل ERP وإيه لأ

### 3.9 شغل الـ Consulting
- [ ] Requirements workshop وإزاي تسأل صح
- [ ] Fit-gap document
- [ ] Scope، change requests، وتقدير الوقت
- [ ] UAT و sign-off
- [ ] Support و SLAs بعد الـ go-live

### 3.10 السوق والكارير
- [ ] الطلب: مصر، الخليج، و remote، وإيه اللي نعرفه وإيه اللي مش مقاس
- [ ] المرتبات: Odoo vs Node vs SAP بالأدلة وحدودها
- [ ] Career paths: developer → solution architect، partner، founder
- [ ] الـ hybrid: backend engineer عنده ERP domain
- [ ] قرار مبني على بيانات تجمعها بنفسك

---

## 🛠️ الـ Artifacts المطلوبة

1. **Ledger** double-entry بـ Node + Postgres في المشروع الجانبي، بـ tests على الـ invariants.
2. **Odoo module** كامل: models و views و security و tests و report.
3. **Odoo client** بـ TypeScript على JSON-2 API.
4. **Sync service** بين المشروع الجانبي و Odoo، بـ idempotency و reconciliation report.
5. **E-invoicing connector** (ETA أو ZATCA) على sandbox أو stand-in، بـ retry و failure handling.
6. **Migration script** بيدخّل opening balances ويثبت إنها متوازنة.
7. **Fit-gap document** لشركة خيالية.
8. **Upgrade report**: module اتنقل بين نسختين وإيه اللي اتكسر.
9. **Design doc**: "Integration بين منتجنا و ERP العميل".
10. **تقرير سوق بإيدك**: 30 posting و 5–10 مكالمات، والقرار بتاعك.

## 📚 المصادر

- [Odoo 20 documentation](https://www.odoo.com/documentation/20.0/) — developer و user docs
- [Odoo source على GitHub](https://github.com/odoo/odoo/tree/20.0)
- [OCA](https://odoo-community.org/) و [OpenUpgrade](https://github.com/OCA/OpenUpgrade)
- [Microsoft Dynamics 365 implementation guide](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/)
- [SAP CAP](https://cap.cloud.sap/docs/)
- [ERPNext](https://docs.frappe.io/erpnext) و [Frappe](https://github.com/frappe/frappe)
- [مصلحة الضرائب المصرية — e-invoicing SDK](https://sdk.invoicing.eta.gov.eg/)
- [ZATCA e-invoicing](https://zatca.gov.sa/en/E-Invoicing/Pages/default.aspx)
- [وزارة المالية الإماراتية — e-invoicing](https://mof.gov.ae/)

## ✅ اختبار الخروج

1. اشرح double-entry لمبرمج في دقيقتين، وإيه الـ invariant.
2. Sales order اتحول لفاتورة واندفعت: إيه القيود اللي اتولدت خطوة بخطوة؟
3. إيه الفرق بين configuration و customization و integration، وإيه تكلفة كل واحد عند الـ upgrade؟
4. اكتب Odoo model فيه computed stored field وconstraint و test.
5. Report بطيء في Odoo: هتعرف السبب إزاي؟
6. JSON-2 call فشل بعد ما الـ write نجح: تضمن عدم التكرار إزاي؟
7. صمّم ledger بيمنع قيد غير متوازن على مستوى الـ database.
8. ETA رفضت فاتورة بعد ما اتسلمت للعميل: إيه السلوك الصح؟
9. Custom module بيمنع الـ upgrade: تقيّم وتخطط إزاي؟
10. عميل طلب customization كبيرة: إمتى تقول لأ، وتقولها إزاي؟
11. Odoo vs SAP vs ERPNext لشركة 80 موظف في القاهرة: قرار مبرر.
12. تدخل ERP كـ career ولا كـ domain؟ بررها بأرقام جمعتها بنفسك.
