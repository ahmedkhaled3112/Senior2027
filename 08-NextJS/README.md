# 08 — Next.js (App Router)

> **ليه القسم ده:** Next.js هو الـ framework الأكتر طلبًا مع React، وهو المكان اللي الـ Full-Stack بيلتقي فيه الـ backend بالـ frontend. أكتر مكان الناس بتغلط فيه: الـ caching layers. السنيور بيعرف لكل صفحة إيه الـ rendering strategy وليه.
>
> **الوقت التقريبي:** 2 أسبوع · **المصدر الأنسب:** [Next.js docs](https://nextjs.org/docs) + [Next.js Learn](https://nextjs.org/learn) الرسمي

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
ملحوظة: Next بيتغير بسرعة (خاصة الـ caching). راجع الـ docs للإصدار اللي بتستخدمه، والمفاهيم هنا هي الثابت.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 ليه Next فوق React
- [ ] إيه اللي Next بيضيفه: routing، rendering strategies (SSR/SSG)، bundling، server integration، image/font optimization
- [ ] App Router vs Pages Router: الفرق الجوهري (RSC، layouts، nested routing)، وليه App Router هو الحالي — وتعرف تقرأ Pages Router code لو قابلته
- [ ] `create-next-app`، الـ dev server، `next build` و `next start`

### 1.2 Project structure و File conventions
- [ ] `app/` directory، `layout.tsx` (root layout لازم `html` و `body`)، `page.tsx`
- [ ] الملفات الخاصة: `loading.tsx`، `error.tsx` (client component)، `not-found.tsx`، `template.tsx` (vs layout)، `global-error.tsx`
- [ ] Route groups `(group)` للتنظيم من غير ما تأثر على الـ URL
- [ ] Private folders `_folder`، colocation (الملفات اللي مش routes جنب الـ route)
- [ ] `public/` للـ static assets

### 1.3 Routing الأساسي
- [ ] File-based routing: folder = segment
- [ ] Dynamic routes `[id]`، `params` prop (و إنه Promise في Next 15+)
- [ ] Catch-all `[...slug]`، optional catch-all `[[...slug]]`
- [ ] `Link` component و client-side navigation، prefetching الأوتوماتيك
- [ ] `useRouter` (`push/replace/back/refresh`)، `usePathname`، `useSearchParams` (client)
- [ ] `redirect()` و `notFound()` (server)
- [ ] Nested layouts: الـ layout مش بيعمل re-render عند الـ navigation بين children

### 1.4 Rendering الأساسي
- [ ] **Server Components by default**: كل component في `app/` server إلا لو كتبت `'use client'`
- [ ] إمتى تحتاج `'use client'`: hooks (state، effects)، event handlers، browser APIs
- [ ] الـ boundary: `'use client'` بيخلي الـ component **وكل اللي بيـ import** client
- [ ] Static vs dynamic rendering كمفهوم: الصفحة بتتبني وقت الـ build ولا على كل request

### 1.5 Data fetching الأساسي
- [ ] `async` Server Components و `await fetch()` مباشرة
- [ ] Database access مباشرة من Server Component (Drizzle/Prisma) — مفيش API layer لازم
- [ ] `loading.tsx` = Suspense boundary أوتوماتيك للـ route

### 1.6 Metadata و Styling
- [ ] Metadata API: static `export const metadata` و `generateMetadata` (dynamic)
- [ ] `next/font` (self-hosted، zero layout shift)، `next/image` الأساسي (`width/height` أو `fill`)
- [ ] Tailwind setup، CSS Modules، global CSS في الـ root layout

### 1.7 Environment
- [ ] `.env.local`، `NEXT_PUBLIC_` prefix (بيتبعت للـ browser!) vs server-only vars
- [ ] `server-only` package عشان تضمن module مش بيتـ import في client

---

## 🟡 المستوى 2 — المتوسط

### 2.1 Routing متقدم
- [ ] **Parallel routes** `@slot`: كذا page في نفس الـ layout (dashboards، modals)، `default.tsx`
- [ ] **Intercepting routes** `(.)`، `(..)`، `(...)`: modal بيفتح على نفس الـ URL (الـ Instagram photo pattern)
- [ ] Route handlers vs pages في نفس الـ segment
- [ ] `generateStaticParams` للـ dynamic routes الـ static، `dynamicParams`
- [ ] Linking مع `scroll={false}`، `replace`، active link pattern

### 2.2 Rendering بعمق
- [ ] **إيه اللي بيحوّل الصفحة لـ dynamic**: `cookies()`، `headers()`، `searchParams`، uncached `fetch`، `connection()`، `export const dynamic = 'force-dynamic'`
- [ ] **ISR**: `export const revalidate = 60`، on-demand revalidation (`revalidatePath`، `revalidateTag`)، stale-while-revalidate behavior
- [ ] **Streaming**: Suspense boundaries يدوية جوه الـ page (مش بس `loading.tsx`)، الـ slow data تتعرض بعدين من غير ما تأخر الـ page
- [ ] **Partial Prerendering (PPR)**: static shell + dynamic holes في نفس الصفحة — الاتجاه الحالي
- [ ] Hydration وأخطاؤها في Next: `typeof window`، `useEffect` للـ client-only، `dynamic(() => import(), { ssr: false })`
- [ ] **Edge runtime vs Node runtime** لكل route: `export const runtime = 'edge'`، إيه اللي مش متاح في edge (Node APIs، بعض الـ DB drivers)

### 2.3 Data fetching و Caching (أهم جزء وأكتر جزء بيتغير)
- [ ] `fetch` options: `cache: 'force-cache' | 'no-store'`، `next: { revalidate, tags }`
- [ ] **الـ 4 caching layers** — تفهم كل واحدة إمتى بتتفعّل وإزاي تتعطّل:
  1. **Request memoization**: نفس الـ `fetch` في نفس الـ render مرة واحدة (per request)
  2. **Data Cache**: الـ fetch results persistent عبر requests (server)
  3. **Full Route Cache**: الـ HTML و RSC payload للـ static routes (build time)
  4. **Router Cache**: client-side cache للـ RSC payload (navigation)
- [ ] الـ defaults اتغيرت بين Next 14 و 15 (`fetch` مش cached by default في 15) — تعرف الإصدار بتاعك
- [ ] **`'use cache'`** directive و `cacheLife`/`cacheTag` (Next 15/16 — الاتجاه الجديد لتوحيد الـ caching)
- [ ] `React.cache()` للـ dedup على non-fetch calls (DB queries) في نفس الـ request
- [ ] Data fetching patterns: parallel (`Promise.all`) vs sequential (waterfall)، preloading pattern، hoisting
- [ ] Client-side fetching: TanStack Query مع SSR hydration (`HydrationBoundary`)، SWR — إمتى تحتاجه مع RSC (polling، infinite scroll، realtime)
- [ ] إمتى تعمل API layer (route handlers) بدل الـ DB direct: mobile clients، third parties، webhooks

### 2.4 Mutations و Server Actions
- [ ] `'use server'` functions: في ملف منفصل أو inline، بتتنادى من client كـ POST
- [ ] Forms مع `action={serverAction}`، progressive enhancement (بتشتغل من غير JS)
- [ ] `useActionState` (pending، state، errors)، `useFormStatus`، `useOptimistic`
- [ ] Validation بـ Zod جوه الـ action، return errors بشكل serializable
- [ ] `revalidatePath`/`revalidateTag` بعد الـ mutation، `redirect` بعد الـ action
- [ ] **Security للـ Server Actions**: هي public endpoints — auth check جوه **كل** action، input validation، closures encryption (الـ captured variables بتتبعت للـ client مشفّرة)، action IDs
- [ ] Server Actions vs route handlers: إمتى كل واحد

### 2.5 Route Handlers و Middleware
- [ ] `route.ts`: `GET/POST/...` exports، Web `Request`/`Response` APIs، `NextRequest`/`NextResponse`
- [ ] Streaming responses من route handler (LLM streaming)، webhooks (raw body للـ signature)
- [ ] Caching behavior للـ route handlers (GET بس، وبيتعطل بـ dynamic APIs)
- [ ] **Middleware** (`middleware.ts` / `proxy.ts` في الإصدارات الأحدث): matchers، auth redirects، rewrites، headers، i18n routing، A/B testing
- [ ] حدود الـ middleware: بيشتغل على edge غالبًا، مفيش DB عادة، خفيف (بيشتغل على كل request)
- [ ] `headers()` و `cookies()` APIs (read في components، write في actions/handlers)
- [ ] `after()` للـ work بعد الـ response (logging، analytics)

### 2.6 Authentication
- [ ] **Auth.js (NextAuth) v5**: providers، adapters، callbacks، session strategy
- [ ] Clerk (managed)، Lucia/custom (تحكم كامل) — الفرق والـ trade-offs
- [ ] Session strategies: cookies + DB sessions vs JWT في cookie — إمتى كل واحد
- [ ] **Protecting routes**: middleware (optimistic check، redirect سريع) + layout/page check (الحقيقي) + per-action check — **وليه الـ middleware لوحده مش كفاية** (الـ data layer لازم يتحقق)
- [ ] Data Access Layer (DAL) pattern: كل DB access بيمر على `verifySession()`
- [ ] RBAC في Server Components و Actions
- [ ] Auth في Server Components (قراءة الـ session) vs Client Components (`useSession` أو تمرير props)

### 2.7 Styling و UI
- [ ] Tailwind + shadcn/ui setup، CSS variables للـ theming
- [ ] `next/image` بعمق: `sizes` (الأهم للـ performance)، `priority` للـ LCP image، `remotePatterns`، placeholders (blur)، formats (AVIF/WebP)
- [ ] `next/font` مع Google fonts و local fonts، `display: swap`، variable fonts
- [ ] Dark mode (`next-themes`)، avoiding flash
- [ ] `next/script` strategies (`beforeInteractive`، `afterInteractive`، `lazyOnload`) للـ third-party scripts

### 2.8 Testing
- [ ] Vitest + RTL للـ client components
- [ ] Testing Server Components: الحدود الحالية (async components مش supported كامل في RTL) → E2E أو test الـ logic منفصل
- [ ] Testing Server Actions: كـ functions عادية مع mocked DB
- [ ] Playwright للـ App Router: الـ critical flows، auth state reuse
- [ ] Type-safe env بـ `@t3-oss/env-nextjs`، ESLint config (`eslint-config-next`)

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Caching strategy مكتوبة لكل صفحة
- [ ] تعمل **جدول لكل route**: static / ISR (revalidate X) / dynamic / PPR، وليه، وإيه الـ tags اللي بتـ invalidate
- [ ] Cache invalidation design: tag naming convention (`user:123`، `posts`)، فين بتنادي `revalidateTag` (actions، webhooks، admin)
- [ ] Stale data bugs: الـ Router Cache بيعرض بيانات قديمة بعد mutation → `router.refresh()` أو `revalidatePath`
- [ ] Debugging الـ caching: `next build` output (○ static، ƒ dynamic)، logging (`logging.fetches` في config)، response headers (`x-nextjs-cache`)
- [ ] Self-hosted caching: الـ Data Cache على filesystem by default → مشكلة في multi-instance → **custom cache handler (Redis)** (`cacheHandler` في config)

### 3.2 Performance متقدم
- [ ] Bundle analysis بـ `@next/bundle-analyzer`: تلاقي إيه اللي بيكبّر الـ client bundle
- [ ] `optimizePackageImports` للـ barrel-heavy libraries (icons، UI libs)
- [ ] `dynamic()` imports للـ heavy client components، `ssr: false` للـ browser-only
- [ ] تقليل الـ `'use client'` surface: الـ interactive leaf بس client، مش الصفحة كلها
- [ ] Streaming للـ slow data و avoiding client waterfalls
- [ ] Core Web Vitals في Next: LCP (image `priority`، fonts، streaming)، INP (less client JS، transitions)، CLS (image dimensions، font fallback metrics)
- [ ] `reportWebVitals` / `useReportWebVitals` → analytics
- [ ] `next/image` CDN loader custom، image optimization على self-hosted (sharp)
- [ ] Partial Prerendering strategy للصفحات اللي فيها personalization

### 3.3 Architecture لمشروع Next حقيقي
- [ ] Feature-based folders مع `app/` كـ thin routing layer: `app/` فيها routes بس، الـ logic في `features/` أو `modules/`
- [ ] Separation: UI components / data access (DAL) / domain logic / server actions
- [ ] **Next كـ full-stack vs Next كـ frontend لـ Node API منفصل**: إمتى كل واحد — (full-stack: فريق صغير، product واحد؛ منفصل: mobile clients، services تانية بتستهلك الـ API، background jobs تقيلة، فريق backend منفصل)
- [ ] Long-running jobs خارج Next (BullMQ workers في service منفصل) — Next مش مكان الـ background work
- [ ] **Monorepo**: `apps/web` (Next) + `apps/api` (Node) + `packages/shared` (types، Zod schemas، utils) + `packages/ui` — بـ pnpm workspaces + Turborepo
- [ ] tRPC أو OpenAPI-generated client للـ type-safe API calls بين web و api
- [ ] Migration من Pages Router: incremental adoption (الاتنين بيشتغلوا مع بعض)، الترتيب
- [ ] **Common pitfalls**: over-fetching في layouts (الـ layout بيجيب data مش محتاجها كل الصفحات)، client components كبيرة، caching غير مفهوم، secrets leaking للـ client (`NEXT_PUBLIC_` غلط)، `'use client'` في الـ root، DB calls من client components

### 3.4 Deployment و Infrastructure
- [ ] **Vercel**: edge network، ISR على scale، preview deployments لكل PR، limits (function duration، bandwidth)، pricing awareness
- [ ] **Self-hosting**: `output: 'standalone'`، Dockerfile لـ Next (multi-stage)، Nginx قدامه، `sharp` للـ images، env vars في runtime vs build time
- [ ] Multi-instance self-hosting: Redis cache handler، shared image cache، sticky sessions مش لازم
- [ ] Serverless vs containers لـ Next: cold starts، الـ ISR behavior في كل واحد
- [ ] OpenTelemetry في Next (`instrumentation.ts`)، logging structured، Sentry integration (server + client + edge)
- [ ] CI: `next build` في الـ pipeline، type-check، lint، Playwright

### 3.5 Internationalization و SEO
- [ ] i18n routing (`[locale]` segment)، `next-intl` (server + client)، message loading per route
- [ ] SEO: metadata كامل، Open Graph images (`opengraph-image.tsx` — generated)، structured data (JSON-LD)، canonical، `sitemap.ts`، `robots.ts`
- [ ] a11y في Next: route announcer، focus بعد navigation
- [ ] Localized static generation (`generateStaticParams` مع locales)

### 3.6 Advanced patterns
- [ ] Multi-tenancy في Next: subdomain routing في middleware، tenant في الـ context، per-tenant caching tags
- [ ] Feature flags في Server Components (edge config / LaunchDarkly)
- [ ] Draft mode / preview للـ CMS content
- [ ] Streaming LLM responses من route handler → client (SSE / ReadableStream) مع Vercel AI SDK
- [ ] WebSockets مع Next: مش native → service منفصل أو managed (Pusher/Ably) أو custom server

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **حوّل الـ frontend بتاع المشروع الجانبي لـ Next.js App Router** بـ RSC: Server Components للـ data، client للـ interactivity بس، Server Actions للـ mutations، auth بـ DAL pattern.
2. **جدول caching strategy** لكل route في المشروع (static/ISR/dynamic/PPR + tags + ليه).
3. **LCP تحت 2.5 ثانية على mobile** في Lighthouse — موثّق before/after وإيه اللي اتعمل.
4. **Monorepo** (web + api + shared) بـ pnpm + Turborepo مع shared Zod schemas.
5. **Dockerfile standalone** للـ self-hosting مع Redis cache handler.

## 📚 المصادر

- [Next.js docs](https://nextjs.org/docs) — App Router section كامل، خاصة "Caching" و "Rendering"
- [Next.js Learn](https://nextjs.org/learn) — الكورس الرسمي
- [Next.js caching docs](https://nextjs.org/docs/app/building-your-application/caching) — اقراها مرتين
- [Vercel — Security in Next.js / Server Actions](https://nextjs.org/blog/security-nextjs-server-components-actions)
- [Next.js examples repo](https://github.com/vercel/next.js/tree/canary/examples)
- [TkDodo — React Query with Next.js App Router](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)

## ✅ اختبار الخروج

1. اشرح الـ 4 caching layers وإمتى كل واحدة بتتعطل.
2. إيه اللي بيحوّل صفحة من static لـ dynamic؟ اديني 5 أسباب.
3. ليه الـ middleware لوحده مش كفاية للـ auth؟ وإيه الـ DAL pattern؟
4. Server Action: إيه اللي ممكن يروح للـ client منه وإزاي تأمّنه؟
5. إمتى تخلي Next full-stack وإمتى تفصل API منفصل؟
6. الـ ISR page بتعرض بيانات قديمة بعد الـ update — إيه الاحتمالات وإزاي تـ debug؟
7. Self-hosting على 3 instances: إيه اللي هيتكسر في الـ caching وإزاي تحله؟
8. إزاي تحسّن LCP لصفحة فيها hero image و data من DB بطيئة؟
