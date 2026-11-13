# 14 — AI Engineering (للمهندس، مش للـ ML researcher)

> **ليه القسم ده:** مش هتبقى ML engineer، هتبقى **المهندس اللي بيبني بالـ AI وبيبني منتجات AI**. نوعين من المهارات والاتنين مطلوبين: (أ) تستخدم الـ AI عشان تبني أسرع وأحسن وتعرف إمتى بيغلط، و(ب) تبني features وأنظمة فيها LLMs بشكل production-grade. الوظايف اللي بتطلب مهارات AI بتدفع ~28% أكتر، وكـ Node developer إنت في موقع ممتاز لأن معظم الـ AI products في الآخر APIs و streams و queues و evals.
>
> **الوقت التقريبي:** 4 أسابيع · **المصدر الأنسب:** [Anthropic docs](https://docs.anthropic.com) + [Vercel AI SDK docs](https://sdk.vercel.ai) + [MCP spec](https://modelcontextprotocol.io) + [Chip Huyen — AI Engineering](https://www.oreilly.com/library/view/ai-engineering/9781098166298/) + [Hamel Husain — Evals](https://hamel.dev/blog/posts/evals/)

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
القسم ده بيتبني على backend ناضج (04، 07) — الـ AI feature هي في الآخر endpoint + stream + queue + DB. **كل بند هنا بيتعلم ببناء حاجة حقيقية** مش بقراءة.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 فهم أساسي للـ LLMs (مش عمق ML)
- [ ] **Tokens**: إيه هي، إزاي بتتحسب (tokenizer)، وليه التكلفة والـ limits بالـ tokens مش بالكلمات
- [ ] **Context window**: الحد الأقصى للـ input + output، وإيه اللي بيحصل لما تعدّيه، وإن الـ model مش بيـ "فتكر" حاجة بره الـ context
- [ ] **Transformers كمفهوم** (attention، next-token prediction) — على مستوى تقدر تشرحه في 3 دقايق، مش أكتر
- [ ] **Temperature و sampling** (top_p): deterministic (0) vs creative، وإمتى كل واحد
- [ ] **Embeddings**: vector بيمثّل المعنى، similarity (cosine)، وإنها أساس الـ semantic search والـ RAG
- [ ] الفرق بين: base model، instruct/chat model، reasoning model — وإمتى كل واحد
- [ ] **Model cards و benchmarks**: تقرأ model card وتفهم إيه اللي بيتقاس (MMLU، HumanEval، SWE-bench...) وإيه اللي مش بيتقاس
- [ ] Hallucination: ليه بتحصل (prediction مش lookup) وإن الحل هندسي (grounding، RAG، verification) مش "prompt أحسن"
- [ ] **Fine-tuning vs RAG vs prompting**: القاعدة — prompting الأول، RAG للمعرفة، fine-tuning للـ style/format (نادرًا للمعرفة)

### 1.2 أول LLM call من Node
- [ ] Anthropic SDK / OpenAI SDK من Node: messages API، system prompt، roles (system/user/assistant)، response structure
- [ ] `max_tokens`، `stop_sequences`، usage في الـ response (input/output tokens) — تطبعها من أول يوم
- [ ] API keys في env + secrets manager، مفيش keys في الـ client
- [ ] Error handling: rate limits (429)، overloaded (529)، timeouts، retries مع backoff — نفس قواعد أي external API
- [ ] **Streaming أساسي**: ليه (perceived latency)، الـ stream events، وتوصّله للـ client بـ SSE من Node/Next
- [ ] Multi-turn conversation: إنت اللي بتبعت الـ history كله كل مرة (stateless API)، وإدارة طوله

### 1.3 Prompt engineering الأساسي
- [ ] System prompt: الدور، القواعد، الـ output format، الـ constraints — وإنه جزء من الكود (في الـ repo، له version)
- [ ] Clear instructions، examples (few-shot)، delimiters للـ user input (XML tags)، "think step by step" وإمتى بيفيد
- [ ] الفرق بين prompt للـ chat وprompt للـ task (classification، extraction، summarization)
- [ ] Prompt injection كمفهوم: الـ user input ممكن يحتوي تعليمات — أول قاعدة أمان

### 1.4 AI-assisted engineering (إزاي تشتغل)
- [ ] **Agentic coding tools** (Claude Code، Cursor، Copilot agents): الفرق بين autocomplete وagent بيشتغل على task كامل (يقرأ الـ codebase، يعدّل ملفات، يشغّل tests)
- [ ] **Context files** (`CLAUDE.md` / `AGENTS.md` / `.cursorrules`): توصف الـ codebase، الـ conventions، الـ commands، الـ "don'ts" — **تكتب واحد لمشروعك**
- [ ] إمتى الـ AI بيفيد (boilerplate، tests، migrations، refactors ميكانيكية، docs، explaining code) وإمتى بيضر (codebase معقد مش فاهمه، security-sensitive code، architecture decisions)
- [ ] **القاعدة الذهبية: إنت المسؤول عن الكود** — الـ AI بيقترح، إنت بتراجع وبتفهم كل سطر قبل الـ commit

---

## 🟡 المستوى 2 — المتوسط

### 2.1 Structured outputs و Tool calling
- [ ] **Structured outputs**: JSON schema → response مضمون الشكل، Zod schema → JSON schema، validation بعد الـ response (الـ model ممكن يغلط برضه)، retry على invalid
- [ ] **Tool/function calling**: تعرّف tools بـ schema، الـ model بيطلب tool call، إنت بتنفّذه وترجّع النتيجة، الـ loop لحد ما يخلص — **تكتب الـ loop بإيدك مرة** قبل ما تستخدم SDK
- [ ] Tool design: descriptions واضحة (الـ model بيقرر منها)، parameters minimal، idempotent tools، error returns كـ text مش exceptions
- [ ] Parallel tool calls، tool choice (`auto`/`any`/specific)
- [ ] Use cases: extraction (invoice → JSON)، classification (ticket → category)، data enrichment، natural language → SQL/filters (بحذر)
- [ ] **Vercel AI SDK**: `generateText`/`streamText`/`generateObject`، tools، `useChat`/`useCompletion` في React، provider abstraction — الأكتر عملية في Node/Next
- [ ] Multimodal: images/PDFs في الـ input، وإمتى (document processing، receipts، screenshots)

### 2.2 Streaming في الـ production
- [ ] SSE من Node (Express/Fastify) و من Next route handler: headers، flush، keep-alive، client disconnect handling (abort الـ upstream call — متدفعش على tokens محدش بيقراها)
- [ ] Streaming مع tool calls (الـ UI بتعرض "searching..." ثم النتيجة)
- [ ] `useChat` في React: optimistic messages، stop generation، regenerate، error states
- [ ] Streaming structured data (partial JSON) و `streamObject`
- [ ] Proxies و load balancers بتعمل buffering للـ SSE — إزاي تعطّله (Nginx `proxy_buffering off`، `X-Accel-Buffering`)
- [ ] Timeouts: الـ LLM call ممكن يطوّل 60s+ — serverless limits، keep-alive، background job للـ long tasks

### 2.3 Prompt engineering كـ engineering
- [ ] **Prompts كـ code**: في الـ repo، versioned، templated (مش string concatenation)، مع tests
- [ ] Prompt structure: role → context → task → constraints → format → examples — وترتيبهم بيفرق (الـ instructions في الآخر لو الـ context طويل)
- [ ] Few-shot selection: examples متنوعة وممثّلة، dynamic few-shot (retrieve similar examples)
- [ ] Chain-of-thought و extended thinking: إمتى يستاهلوا (reasoning tasks) وتكلفتهم (tokens، latency)
- [ ] **Prompt chaining** vs single big prompt: تقسيم الـ task لخطوات (classify → extract → generate) أوضح وأسهل في الـ debug
- [ ] Prompt versioning و A/B testing، وإن تغيير model = regression testing لازم
- [ ] **Prompt caching** (Anthropic/OpenAI): الـ system prompt والـ context الكبير بيتـ cache → أرخص وأسرع، وإزاي ترتّب الـ prompt عشان الـ cache يشتغل (static الأول، dynamic الآخر)
- [ ] Output control: XML tags في الـ response للـ parsing، prefilling الـ assistant turn

### 2.4 RAG (Retrieval-Augmented Generation) بشكل صح
- [ ] المشكلة اللي بيحلها: المعرفة بره الـ training (docs بتاعتك، data المستخدم)، والفكرة: retrieve → augment prompt → generate
- [ ] **Ingestion pipeline**: load (PDF/HTML/MD/DB) → clean → **chunk** → embed → store — كـ background job (BullMQ) مع idempotency
- [ ] **Chunking strategies**: fixed size + overlap، by structure (headings، paragraphs)، semantic chunking، وإن الـ chunk size trade-off (context vs precision) — وتضيف metadata (source، section، date)
- [ ] **Embeddings**: models (OpenAI، Voyage، open-source)، dimensions، cost، وإن تغيير الـ model = re-embed كل حاجة
- [ ] **Vector DB**: **pgvector أول اختيار** (في Postgres اللي عندك أصلًا — HNSW index، `<=>` operator، filtering بالـ metadata في نفس الـ query)، Pinecone/Qdrant/Weaviate للـ scale أو الـ features
- [ ] **Hybrid search**: vector similarity + BM25/full-text (Postgres `tsvector`) → merge (RRF) — أحسن من vector بس في معظم الحالات
- [ ] **Reranking**: cross-encoder (Cohere Rerank، Voyage) على الـ top-50 → top-5 — تحسين كبير بتكلفة بسيطة
- [ ] Query transformation: HyDE، query expansion، multi-query، وإمتى يستاهلوا
- [ ] الـ prompt في RAG: citations (الـ model يقول من أنهي chunk)، "لو مش في الـ context قول مش عارف"، handling لما مفيش نتايج
- [ ] **قياس الـ retrieval quality** منفصل عن الـ generation: recall@k، precision، MRR على golden set — ده أول حاجة تتقاس
- [ ] RAG على data المستخدم (multi-tenant): tenant filter في كل query، access control قبل الـ retrieval (مش بعد)
- [ ] Freshness: re-indexing عند التغيير (CDC/outbox → embed job)، deletion

### 2.5 Evaluation (الفرق بين demo ومنتج)
- [ ] ليه الـ evals: "شغال في الـ demo" مش معيار، كل تغيير (prompt، model، chunking) محتاج قياس
- [ ] **Golden dataset**: 50–200 مثال حقيقي (input → expected output أو criteria) من production/users — تبنيه بإيدك، وتكبّره من الـ failures
- [ ] أنواع الـ evals: exact match/regex (للـ structured)، **code-based assertions** (schema valid، contains citation، length)، **LLM-as-judge** (rubric واضح، model مختلف، calibrate ضد human labels)، human review (sample)
- [ ] Evals كـ tests في الـ CI: regression على الـ golden set قبل أي prompt/model change، threshold للـ pass
- [ ] Error analysis: تبص على الـ failures بإيدك وتصنّفها (retrieval failure vs generation failure vs format) — **أهم خطوة وأكتر واحدة بتتساب**
- [ ] A/B testing في production، online metrics (thumbs up/down، task completion، regeneration rate)
- [ ] Tools: promptfoo، Braintrust، Langfuse evals، أو script بسيط بـ Vitest — ابدأ بسيط

### 2.6 Observability و Cost للـ LLM apps
- [ ] **Tracing كل call**: prompt، response، tokens، latency، model، cost، tool calls، retrieval results — Langfuse/LangSmith أو **OpenTelemetry GenAI semantic conventions** (يتكامل مع الـ tracing بتاعك الموجود)
- [ ] Cost per request / per user / per feature كـ metric، alerts على الـ spend
- [ ] Latency breakdown: TTFT (time to first token) vs total، retrieval time vs generation time
- [ ] Logging الـ prompts والـ responses مع PII redaction، retention policy
- [ ] **Cost engineering**: prompt caching، semantic cache (نفس السؤال → نفس الإجابة)، **model routing** (model صغير للـ simple، كبير للـ complex)، batching (Batch API بنص السعر للـ non-urgent)، تقليل الـ context، output length limits
- [ ] Rate limiting و quotas per user/tenant على الـ AI endpoints (أغلى endpoints عندك)

### 2.7 Security و Safety
- [ ] **Prompt injection**: direct (الـ user بيكتب "ignore previous instructions") و **indirect** (في document/web page/email الـ model بيقراها) — وإن مفيش حل كامل، بس defense in depth: separation بين instructions و data، least-privilege tools، human approval للـ actions الحساسة، output validation
- [ ] **Data leakage**: الـ system prompt ممكن يتسرّب (متحطش secrets فيه)، الـ model ممكن يطلّع data من الـ context لـ user ميستحقهاش (access control قبل الـ retrieval)
- [ ] PII redaction قبل ما الـ data تروح للـ LLM provider، data residency، الـ provider's data retention policy (zero retention options)
- [ ] Tool permissions: الـ agent ميقدرش يعمل حاجة الـ user نفسه ميقدرش يعملها (نفس الـ authZ)، read-only by default، confirm للـ writes
- [ ] Content moderation للـ input والـ output، guardrails (classifier قبل/بعد)
- [ ] Jailbreaks كمفهوم، وإن الـ safety مسؤوليتك مش مسؤولية الـ model بس
- [ ] Abuse: الـ AI endpoint هدف للـ abuse (free compute) — auth، rate limits، cost caps، anomaly detection

### 2.8 Code review لكود الـ AI (مهارة مستقلة)
- [ ] الدراسات: ~45% من الكود المولّد فيه ثغرة OWASP — الـ review إلزامي، و SAST في الـ CI
- [ ] Checklist للـ AI-generated code: security (injection، authZ على كل endpoint، secrets)، edge cases (empty، null، concurrent)، error handling (مش swallowed)، **over-engineering** (abstractions زيادة)، **تكرار** (الـ AI مش بيعرف الـ util الموجود)، dependencies جديدة من غير داعي، tests سطحية بتختبر الـ implementation
- [ ] الـ AI بيكتب كود "شكله صح": تشغّله، تختبره، تقرأه — مش تبص عليه
- [ ] **Spec-first workflow**: تكتب الـ spec والـ acceptance criteria والـ tests **قبل** ما الـ AI يكتب، وتراجع بالـ tests
- [ ] METR study: المهندسين الخبرة بيبقوا **أبطأ** بالـ AI على codebases معقدة لو ما عرفوش يديروه — المهارة هي الـ judgment: إمتى تستخدمه، إمتى تكتب بإيدك، إمتى ترفض اقتراحه

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Agents (وإمتى فكرة سيئة)
- [ ] **الـ agent loop**: LLM بيقرر → tool call → observe → يقرر تاني → ... لحد الهدف (ReAct) — تكتبه بإيدك بـ 100 سطر
- [ ] **Workflows vs agents** (Anthropic's "Building effective agents"): prompt chaining، routing، parallelization، orchestrator-workers، evaluator-optimizer — **الـ workflow الثابت أحسن من الـ agent في معظم الحالات** (predictable، cheaper، testable)؛ الـ agent لما الخطوات مش معروفة مسبقًا
- [ ] State management: conversation history، scratchpad، memory (short-term في الـ context، long-term في DB/vector)، context window management (summarization، truncation)
- [ ] **Guardrails**: max iterations، budget (tokens/$)، allowed tools per state، validation على كل tool input، kill switch
- [ ] **Human-in-the-loop**: approval للـ actions الحساسة (send email، payment، delete)، pause/resume (durable state في DB — Temporal/BullMQ)، UI للـ approval
- [ ] Error recovery: tool failed → الـ model بيحاول بديل، retries بحدود، fallback لـ human
- [ ] Multi-agent كمفهوم (orchestrator + specialists) وإمتى over-engineering (غالبًا)
- [ ] Evaluating agents: trajectory evals (الخطوات صح؟) مش بس الـ final output، cost per task، success rate
- [ ] Frameworks: LangGraph.js (state machine للـ agents)، Vercel AI SDK agents، Mastra — **اعرفهم ومتعتمدش عليهم في كل حاجة**؛ الـ loop بسيط كفاية تكتبه

### 3.2 MCP (Model Context Protocol) — skill مطلوب فعليًا
- [ ] إيه هو: standard بيخلي AI tools (Claude Desktop، Claude Code، Cursor، IDEs) تتكلم مع data/tools بتاعتك — "USB-C للـ AI"
- [ ] المفاهيم: **server** (إنت بتبنيه)، **client/host** (الـ AI tool)، primitives: **tools** (actions)، **resources** (data للقراءة)، **prompts** (templates)
- [ ] Transports: stdio (local) vs Streamable HTTP (remote)، وإمتى كل واحد
- [ ] **تبني MCP server بـ TypeScript** (`@modelcontextprotocol/sdk`): tool definitions بـ Zod، handlers، error handling، logging — يعرّض الـ API/DB بتاعتك
- [ ] Auth للـ remote MCP servers (OAuth 2.1)، scoping، per-user permissions
- [ ] Security: الـ MCP server بيدي الـ AI صلاحيات — least privilege، read-only tools default، confirmation للـ destructive، input validation، rate limits
- [ ] Testing MCP servers (MCP Inspector)، versioning الـ tools
- [ ] Use cases حقيقية: الـ AI يسأل الـ DB بتاعتك بأمان، يفتح tickets، يقرأ docs داخلية، يشغّل runbooks — **وده اللي الشركات بتدوّر عليه دلوقتي**

### 3.3 Advanced RAG و Knowledge systems
- [ ] GraphRAG و knowledge graphs كمفهوم (relationships مش بس similarity)
- [ ] Agentic RAG: الـ model بيقرر يبحث تاني، يعيد صياغة الـ query، يجمّع من مصادر
- [ ] Contextual retrieval (Anthropic): إضافة context لكل chunk قبل الـ embedding — تحسين كبير في الـ recall
- [ ] Long-context vs RAG: إمتى تحط الـ docs كلها في الـ context (مع prompt caching) بدل RAG — الـ trade-off (cost، latency، precision)
- [ ] Structured data + LLM: text-to-SQL بأمان (read-only user، allowlist tables، validate، limit)، semantic layer
- [ ] Evaluation متقدمة: RAGAS metrics (faithfulness، answer relevance، context precision)، synthetic test generation
- [ ] Multi-tenant RAG على scale: partitioning الـ vectors، per-tenant indexes vs shared مع filter، cost per tenant

### 3.4 Production architecture للـ AI features
- [ ] الـ AI feature كـ **bounded context**: module منفصل (prompts، tools، evals، retrieval) بـ public API للباقي
- [ ] **Async by default** للـ heavy tasks: request → job (BullMQ) → progress via SSE/polling → result في DB — مش LLM call جوه HTTP request بـ 60s timeout
- [ ] Idempotency للـ AI jobs (retry مش بيدفع مرتين)، dedup بالـ input hash
- [ ] **Provider abstraction**: interface بتاعك فوق الـ providers (AI SDK بيعملها) — model switching، fallback provider لما واحد يقع، multi-region
- [ ] Caching layers: exact cache (hash of prompt)، semantic cache (embedding similarity)، prompt caching من الـ provider
- [ ] Feature flags للـ prompts/models (gradual rollout لـ model جديد، instant rollback)
- [ ] **Cost model** قبل الـ launch: tokens per request × requests per user × users → $/month، وإيه اللي يحصل لو الـ usage ×10
- [ ] Latency budget: TTFT target (< 1s)، streaming إلزامي للـ chat، parallel tool calls
- [ ] Fine-tuning عمليًا (نادر): إمتى (style/format ثابت، latency/cost مع model صغير، classification بـ volume كبير)، data prep، eval قبل وبعد، وإنه مش بديل للـ RAG للمعرفة
- [ ] Open-source models و self-hosting كمفهوم (Ollama للـ dev، vLLM للـ prod) — إمتى (data privacy، cost على scale ضخم) وتكلفته الحقيقية (GPU ops)
- [ ] LLM Gateway pattern (LiteLLM، Portkey، أو بتاعك): routing، rate limits، cost tracking، keys management في مكان واحد

### 3.5 AI-assisted engineering متقدم
- [ ] **Context engineering للـ agentic tools**: `CLAUDE.md` محكم (architecture، conventions، commands، testing، "don'ts")، skills/commands مخصصة، hooks (lint/test أوتوماتيك بعد كل edit)
- [ ] Workflow ناضج: spec → plan (الـ AI يقترح، إنت توافق) → implement بـ tests → review → commit صغير — مش "اعمل الـ feature"
- [ ] تبني **automations للفريق** بالـ AI: migration scripts، test generation من الـ spec، docs generation من الكود، PR summaries، changelog، onboarding docs — كـ CLI tools أو CI steps
- [ ] AI في الـ CI: automated code review (مع human final)، test flakiness analysis، incident summarization
- [ ] تقيس أثر الـ AI على الفريق (cycle time، defect rate، review load) — مش "بنستخدم AI"
- [ ] **تعلّم الفريق**: تحدد للجونيور إمتى يستخدم الـ AI وإمتى يكتب بإيده (الأساسيات بإيده — مينفعش يتعلم closures من الـ AI)، review guidelines لكود الـ AI
- [ ] Evaluating AI tools: تجرّب tool جديد على task حقيقي بمعايير (correctness، time، كام مرة صححته) مش بالـ hype

### 3.6 الحكم (المهارة الحقيقية)
- [ ] تقدر تقول لأي feature مقترحة بـ AI: **محتاجة LLM فعلًا ولا regex/rules/classic ML كفاية؟** (أرخص وأدق وأسرع في كتير من الحالات)
- [ ] تقدر تقدّر cost و latency و failure modes قبل ما تبني
- [ ] تعرف إن "الـ model هيبقى أحسن" مش استراتيجية — الـ evals والـ architecture هما اللي بيفضلوا
- [ ] تعرف الفرق بين demo يبهر وproduct بيشتغل لـ 10K user: evals، observability، cost control، fallbacks، security

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **AI feature حقيقية في المشروع الجانبي** (مثلًا: مساعد بيجاوب على بيانات المستخدم — orders/invoices — بـ RAG على **pgvector** + hybrid search + reranking)، بـ: streaming (SSE)، tool calling (الـ model يسأل الـ DB بأمان)، multi-tenant access control قبل الـ retrieval، prompt caching، rate limiting و cost caps per user.
2. **Evals suite**: golden dataset 50+ مثال، code assertions + LLM-as-judge، بتتشغّل في الـ CI وبتـ block على regression — مع retrieval metrics (recall@k) منفصلة.
3. **Observability**: كل LLM call متـ trace (Langfuse أو OTel GenAI) مع tokens/cost/latency، dashboard للـ cost per user، alert على الـ spend.
4. **MCP server بـ TypeScript** بيعرّض الـ API بتاعك (3–5 tools: read-only + واحد write بـ confirmation) — تشغّله من Claude Code/Desktop، مع auth و tests.
5. **Agent loop بإيدك** (100–200 سطر): ReAct مع tools، max iterations، budget، human approval لـ action واحد — ثم نفس الحاجة بـ AI SDK وتقارن.
6. **`CLAUDE.md` محكم للمشروع** + hook واحد (tests بعد edit) + automation واحدة للفريق (مثلًا: migration generator أو PR summary).
7. **AI code review checklist** تستخدمها فعليًا + تقرير: راجع 5 PRs مولّدة بالـ AI واكتب إيه اللي لقيته.
8. **Design doc**: "AI feature X — architecture، cost model عند 1K/10K/100K user، failure modes، security، evals plan" — صفحة أو اتنين.

## 📚 المصادر

- [Anthropic — Building effective agents](https://www.anthropic.com/research/building-effective-agents) — **اقرأه الأول**، بيحدد workflows vs agents
- [Anthropic docs](https://docs.anthropic.com) — prompt engineering guide، tool use، prompt caching، extended thinking
- [Vercel AI SDK docs](https://sdk.vercel.ai/docs) — الأكتر عملية في Node/Next
- [Model Context Protocol](https://modelcontextprotocol.io) — spec + TypeScript SDK + examples
- [Hamel Husain — Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/) و [LLM-as-judge](https://hamel.dev/blog/posts/llm-judge/)
- [Chip Huyen — AI Engineering (كتاب)](https://www.oreilly.com/library/view/ai-engineering/9781098166298/) — الأشمل للمهندسين
- [Anthropic — Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
- [pgvector docs](https://github.com/pgvector/pgvector) و [Supabase — Hybrid search](https://supabase.com/docs/guides/ai/hybrid-search)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Simon Willison — Prompt injection](https://simonwillison.net/series/prompt-injection/)
- [OpenTelemetry GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
- [Langfuse docs](https://langfuse.com/docs) و [promptfoo](https://www.promptfoo.dev/)
- [METR — AI and experienced developers study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [Addy Osmani — The Next Two Years of Software Engineering](https://addyosmani.com/blog/next-two-years/)

## ✅ اختبار الخروج

1. اشرح tool calling loop واكتبه بإيدك في 10 دقايق.
2. RAG pipeline كامل: chunking → embedding → hybrid search → rerank → prompt — وإيه اللي تقيسه في كل مرحلة.
3. إمتى تعمل agent وإمتى workflow ثابت؟ اديني مثال لكل واحد.
4. Prompt injection indirect: سيناريو حقيقي في منتج بتاعك وإزاي تقلل أثره.
5. إيه هو LLM-as-judge وإزاي تتأكد إنه موثوق؟
6. الـ AI feature بتكلّف $5K/شهر — اديني 5 طرق تقللها من غير ما الجودة تقل.
7. إزاي تبني MCP server يعرّض DB بتاعتك بأمان؟
8. الـ user بيستنى 8 ثواني قبل أول كلمة — إيه الاحتمالات وإزاي تحلها؟
9. Fine-tuning vs RAG vs long context: قرار مبرر لـ "مساعد بيجاوب على docs داخلية بتتغير أسبوعيًا".
10. الـ AI كتب endpoint — إيه الـ 7 حاجات اللي هتراجعها قبل الـ merge؟
