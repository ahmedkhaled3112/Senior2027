# 05 — React.js

> **ليه القسم ده:** كـ Full-Stack مش مطلوب تكون أعمق frontend engineer في الفريق، لكن مطلوب تفهم الـ rendering model والـ data flow عشان تصمم الـ API والـ architecture صح، وتاخد قرارات (state management، data fetching، performance) مش بس تنفّذ.
>
> **الوقت التقريبي:** 3 أسابيع · **المصدر الأنسب:** [react.dev](https://react.dev) (كامل، خاصة Learn) + Epic React (Kent C. Dodds)

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
لكل بند: اعمل component صغير في Vite project وشوف الـ behavior في React DevTools.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 إيه هو React وليه
- [ ] Declarative UI: بتوصف الـ UI حسب الـ state، مش بتعدّل الـ DOM بإيدك
- [ ] Component model: UI = tree من components صغيرة قابلة لإعادة الاستخدام
- [ ] Virtual DOM كمفهوم (والمفهوم الأدق: **reconciliation** — React بيقارن الـ tree الجديدة بالقديمة ويطبّق الفرق)
- [ ] React vs React DOM vs React Native

### 1.2 JSX
- [ ] JSX بيتحوّل لـ `createElement` / `jsx()` calls — تشوف الـ output في Babel REPL
- [ ] Expressions جوه `{}`، attributes (`className`، `htmlFor`)، self-closing tags
- [ ] Conditional rendering: `&&` (والـ `0` bug)، ternary، early return
- [ ] Lists و **keys**: ليه الـ key لازم، وليه الـ index key غلط غالبًا (reordering، deletion)
- [ ] Fragments `<>...</>`

### 1.3 Components و Props
- [ ] Function components، props كـ object، destructuring، default values
- [ ] `children` prop والـ composition
- [ ] Composition vs inheritance (React بيفضّل composition)
- [ ] Props immutable: لا تعدّلهم

### 1.4 State الأساسي
- [ ] `useState`: initial value، setter، re-render
- [ ] **Immutability**: ليه `state.push()` غلط، spread للـ objects والـ arrays
- [ ] Functional updates `setCount(c => c + 1)` وإمتى لازم
- [ ] Batching: كذا `setState` في نفس الـ event = render واحد (و React 18 automatic batching في كل مكان)
- [ ] Lazy initial state `useState(() => expensive())`

### 1.5 Events و Forms
- [ ] Synthetic events، handlers، `e.preventDefault()`
- [ ] Controlled inputs (`value` + `onChange`) vs uncontrolled (`defaultValue` + ref)
- [ ] Form submission الأساسي

### 1.6 Rendering الأساسي
- [ ] Initial render → re-render triggers (state change، parent re-render، context change)
- [ ] Render phase (pure، بتحسب) vs commit phase (بتطبّق على الـ DOM)
- [ ] `StrictMode`: ليه بيعمل double render/double effect في dev (عشان يمسك impure code)

### 1.7 CSS fundamentals (الـ Full-Stack محتاج القد ده)
- [ ] **Box model** (content/padding/border/margin، `box-sizing: border-box`)، display (block/inline/inline-block/none)
- [ ] **Flexbox** بإتقان: main/cross axis، `justify-content`/`align-items`، `flex: 1`، `gap`، wrap — 90% من الـ layouts
- [ ] **Grid** الأساسي: `grid-template-columns`، `repeat(auto-fit, minmax())`، areas — للـ page layouts والـ dashboards
- [ ] **Cascade و specificity**: ليه الـ style مش بيتطبق، `!important` وليه تتجنبه، inheritance
- [ ] Positioning: static/relative/absolute/fixed/sticky، z-index و stacking contexts (الـ modal اللي بيظهر تحت)
- [ ] **Responsive**: mobile-first، media queries، `clamp()` للـ fluid typography، **container queries** (component-level responsive)
- [ ] Units: `rem` vs `px` vs `em` vs `%` vs `vh/vw/dvh`، وإمتى كل واحد
- [ ] CSS variables (custom properties) للـ theming والـ design tokens
- [ ] Transitions و transforms الأساسية، `prefers-reduced-motion`
- [ ] Modern CSS: `:has()`، nesting، logical properties (`margin-inline` للـ RTL)، `aspect-ratio`
- [ ] Styling في React: CSS Modules، **Tailwind** (الـ default في السوق — utility-first، `cn()`/clsx للـ conditional)، inline styles، CSS-in-JS (وليه بيقل مع RSC)
- [ ] RTL support (مهم لمنتجات عربية): `dir="rtl"`، logical properties، Tailwind `rtl:` variants

### 1.8 Tooling
- [ ] Vite لعمل project، React DevTools (Components و Profiler tabs)
- [ ] ESLint plugin `react-hooks` (rules-of-hooks، exhaustive-deps) وليه متعطّلهوش

---

## 🟡 المستوى 2 — المتوسط

### 2.1 Hooks بالتفصيل
- [ ] **Rules of hooks وليه**: الـ hooks متخزنة في linked list بالترتيب، فمينفعش جوه condition/loop
- [ ] `useReducer`: إمتى أحسن من `useState` (state معقد، transitions مترابطة)، reducer pure
- [ ] **`useEffect` بعمق**: dependency array بالظبط، cleanup function وإمتى بتتنفذ، الأخطاء الشائعة (fetch بدون cleanup → race condition، sync state من props → derived state بدل كده، object dependency → infinite loop)
- [ ] **"You might not need an effect"**: derived state في الـ render، event logic في الـ handler، الـ effect للـ external systems بس
- [ ] `useLayoutEffect`: قبل الـ paint (measurements)، `useInsertionEffect` (CSS-in-JS libraries)
- [ ] `useRef`: DOM refs، mutable value من غير re-render، "instance variable"، الفرق عن state
- [ ] `forwardRef` (ومش محتاجه في React 19 — `ref` as prop)، `useImperativeHandle`
- [ ] **`useMemo`، `useCallback`، `React.memo`**: إمتى بيفيدوا فعلًا (expensive computation، referential equality لـ child memoized)، وإمتى بيضروا (overhead من غير فايدة) — و**React Compiler** بيلغي معظمهم أوتوماتيك
- [ ] `useContext`: الـ provider/consumer، مشكلة الـ re-render لكل consumers لما الـ value يتغير، تقسيم الـ contexts (state vs dispatch)
- [ ] `useId` للـ accessibility IDs (SSR-safe)
- [ ] Custom hooks: extraction logic، naming `use*`، تصميم الـ API بتاعهم، testing

### 2.2 State management
- [ ] Local vs lifted vs global: القاعدة "ارفع الـ state لأقرب ancestor مشترك" ومش أعلى
- [ ] Context للـ dependency injection (theme، auth، locale) **مش** للـ high-frequency state
- [ ] **Server state منفصل عن client state** — ده أهم قرار في الـ frontend architecture
- [ ] **TanStack Query**: queries، `queryKey` design، mutations، caching و `staleTime`/`gcTime`، invalidation، optimistic updates، infinite queries، prefetching، dependent queries، error/loading states
- [ ] Zustand: store بسيط، selectors عشان re-render أقل، middleware (persist، devtools)
- [ ] Jotai (atomic)، Redux Toolkit (كمفهوم والـ trade-offs — وليه بقى نادر في المشاريع الجديدة)
- [ ] URL as state: search params للـ filters/pagination (shareable، back button شغال)
- [ ] Form state منفصل (React Hook Form)

### 2.3 Data fetching
- [ ] `fetch` في `useEffect` ومشاكله: race conditions، no caching، no dedup، loading/error boilerplate — وليه TanStack Query أو RSC أحسن
- [ ] `AbortController` في الـ cleanup
- [ ] **Race conditions في الـ fetching**: user بيكتب في search، الـ response القديم بيوصل بعد الجديد — الحل (ignore flag، abort، أو query library)
- [ ] Error boundaries: class component (أو `react-error-boundary`)، fallback UI، reset، فين تحطها (per-route، per-widget)
- [ ] Loading states: skeletons vs spinners، avoiding layout shift
- [ ] Empty states و error UX design

### 2.4 Forms و Validation
- [ ] Controlled forms performance مع forms كبيرة (re-render على كل keystroke)
- [ ] **React Hook Form**: uncontrolled by default، `register`، `handleSubmit`، `Controller` للـ custom inputs، field arrays
- [ ] Zod integration (`zodResolver`) و**مشاركة نفس الـ schema مع الـ backend**
- [ ] Server-side validation errors → form field errors

### 2.5 Routing
- [ ] React Router (v7 / data APIs): nested routes، `Outlet`، loaders (data قبل الـ render)، actions (mutations)، `errorElement`، `useNavigation`
- [ ] TanStack Router: type-safe routes و search params
- [ ] Route-based code splitting
- [ ] Protected routes pattern

### 2.6 Performance متوسط
- [ ] أسباب الـ re-renders وتشخيصها بـ React DevTools Profiler ("why did this render")
- [ ] Code splitting: `React.lazy` + `Suspense`، route-based splitting أولًا
- [ ] Lifting expensive children (children as props pattern عشان متتأثرش بالـ parent re-render)
- [ ] Context splitting و selectors
- [ ] Images: lazy loading، sizes، formats
- [ ] Web Vitals في SPA: LCP، INP (الأهم في React — long event handlers)، CLS

### 2.7 Component design و Patterns
- [ ] **Compound components**: `<Select><Select.Option/></Select>` مع context داخلي
- [ ] Render props (تاريخي بس بتظهر)، slots pattern
- [ ] Controlled vs uncontrolled component APIs (تدعم الاتنين)
- [ ] Container/presentational (تاريخي) → hooks-based separation (logic في custom hook، UI في component)
- [ ] Headless components: Radix، React Aria — الـ behavior من غير الـ styling
- [ ] Design systems: tokens، theming، variants بـ `cva`، shadcn/ui كنموذج
- [ ] Props API design: boolean props explosion، `variant` enum بدل كده، polymorphic `as` prop

### 2.8 Accessibility (بتتسأل في الـ senior interviews)
- [ ] Semantic HTML أولًا (`button` مش `div onClick`)
- [ ] ARIA الأساسي: roles، `aria-label`، `aria-describedby`، `aria-live`، `aria-expanded`
- [ ] Focus management: focus trap في الـ modal، return focus، skip links
- [ ] Keyboard navigation: tab order، Enter/Space/Escape/Arrows
- [ ] Screen readers testing (VoiceOver/NVDA) مرة واحدة على الأقل
- [ ] Color contrast، `prefers-reduced-motion`
- [ ] Tools: axe DevTools، eslint-plugin-jsx-a11y

### 2.9 TypeScript مع React
- [ ] Props typing، `ReactNode` vs `ReactElement`، `children`
- [ ] Generic components، discriminated union props
- [ ] Event types، ref types، `ComponentProps<typeof X>` و `ComponentPropsWithoutRef<'button'>`
- [ ] Typing custom hooks return (tuple `as const` vs object)

### 2.10 Testing
- [ ] **React Testing Library** philosophy: تختبر زي المستخدم (queries by role/label/text، مش by class/test-id إلا للضرورة)
- [ ] `user-event` بدل `fireEvent`، async utils (`findBy`، `waitFor`)
- [ ] Testing hooks (`renderHook`)
- [ ] Mocking: modules (`vi.mock`)، network بـ **msw** (الأفضل — بيمسك الـ fetch نفسه)
- [ ] Component tests في Storybook (interaction tests)، visual regression (Chromatic)
- [ ] E2E بـ Playwright للـ critical flows بس

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Rendering model بعمق
- [ ] **Reconciliation algorithm**: diffing heuristics — element type مختلف = unmount/mount الـ subtree كله، نفس النوع = update props، keys للـ lists
- [ ] ليه تغيير الـ component type (أو تعريف component جوه component) بيعمل remount وبيضيّع الـ state
- [ ] **Fiber** كمفهوم: work units، priority lanes، interruptible rendering، double buffering (current/workInProgress)
- [ ] Concurrent rendering: React ممكن يبدأ render ويوقفه ويرميه — وليه الـ render لازم يكون pure
- [ ] `useTransition` و `startTransition`: تعلّم update إنه non-urgent (filtering list كبيرة من غير ما الـ input يتهنّج)
- [ ] `useDeferredValue`: الـ debounce الذكي
- [ ] `useSyncExternalStore`: الـ API الصح للـ external stores (ده اللي Zustand و Redux بيستخدموه) و tearing
- [ ] `useOptimistic`، `useActionState`، `useFormStatus` (React 19)
- [ ] `use()` API: promises و context بشكل conditional

### 3.2 Suspense و Streaming
- [ ] Suspense for code splitting vs **Suspense for data fetching**: الـ component بيـ "throw" promise
- [ ] Suspense boundaries design: فين تحطها عشان الـ loading يكون granular مش شاشة كاملة
- [ ] Streaming SSR: الـ HTML بيوصل على مراحل، selective hydration
- [ ] Suspense مع TanStack Query (`useSuspenseQuery`) و error boundaries مع بعض
- [ ] Avoiding waterfalls: parallel fetching، prefetching، hoisting الـ data requirements

### 3.3 Server Components و SSR (مفاهيم React نفسها)
- [ ] **Client vs Server Components**: الـ boundary `'use client'`، إيه اللي بيتبعت للـ browser وإيه لأ، serialization (props لازم تكون serializable)
- [ ] Server Components مش بتعمل re-render ومفيهاش hooks/state/effects — وليه ده تحسين للـ bundle
- [ ] Composition pattern: Server Component بيمرر Server Component كـ children لـ Client Component
- [ ] **Server Functions / Actions**: `'use server'`، بتتنادى من الـ client كـ RPC، security implications
- [ ] SSR vs hydration: الـ HTML بيتعرض → JS بيتحمّل → React بيربط الـ event handlers
- [ ] **Hydration errors**: أسبابها (`Date.now()`، `window` في الـ render، HTML غير صالح، extension) وإزاي تحلها
- [ ] RSC payload كمفهوم (الـ format اللي بيتبعت من السيرفر)
- [ ] الـ mental model: "الـ server بيعمل render لـ tree، والـ client بيكمّل الـ interactive parts"

### 3.4 Performance متقدم
- [ ] **React Compiler**: إيه اللي بيعمله (auto-memoization)، شروطه (rules of React)، إزاي تفعّله وتتحقق
- [ ] **Virtualization**: TanStack Virtual / react-window للـ lists الطويلة، windowing للـ tables
- [ ] Profiling بجد: Profiler API، flame chart، ranked chart، commit timing
- [ ] Long tasks و INP: تقسيم الـ work بـ `startTransition` أو `scheduler.yield`
- [ ] Bundle analysis: `rollup-plugin-visualizer`، tree shaking الـ libraries (lodash-es، date-fns)، dynamic imports للـ heavy components (charts، editors)
- [ ] Avoiding layout thrashing في الـ effects
- [ ] Memory leaks في React: subscriptions من غير cleanup، closures ماسكة state قديم (stale closures)
- [ ] Web Workers من React للـ heavy computation

### 3.5 State machines و Complex flows
- [ ] XState / state machines للـ flows المعقدة (checkout، multi-step wizard، media player) — وليه أحسن من 10 booleans
- [ ] Statecharts: hierarchical states، parallel states، guards، actions
- [ ] Discriminated union state بدل الـ boolean soup (`{ status: 'idle' | 'loading' | 'success' | 'error' }`)

### 3.6 Architecture لمشروع React كبير
- [ ] Feature-based folder structure vs type-based
- [ ] Colocation: الـ test والـ styles والـ hook جنب الـ component
- [ ] Public API لكل feature (barrel file بحذر — circular deps و tree shaking)
- [ ] Dependency direction: features مش بتعتمد على بعض مباشرة (shared layer)
- [ ] Micro-frontends كمفهوم (Module Federation) ومتى تتجنبها (غالبًا)
- [ ] Design system كـ package منفصل في monorepo

### 3.7 Ecosystem
- [ ] i18n (react-i18next / `next-intl`)، pluralization، RTL
- [ ] Date handling (date-fns، Temporal polyfill)، timezones في الـ UI
- [ ] Charts (Recharts للبساطة، visx للتحكم)
- [ ] Animation (Framer Motion / Motion): layout animations، `AnimatePresence`، performance
- [ ] Drag and drop (dnd-kit)
- [ ] React Native كمقدمة فقط (لو هتحتاج): نفس React، renderer مختلف

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **Frontend للمشروع الجانبي** بـ React + TypeScript + TanStack Query + React Hook Form + Zod (نفس الـ schemas بتاعة الـ backend) + Zustand للـ client state.
2. **Component library صغيرة** (5–8 components) بـ Radix/headless + cva + tokens، فيها compound component واحد على الأقل، مع Storybook و a11y tests.
3. **تمرين performance موثّق**: صفحة فيها list من 10K عنصر → تقيس بالـ Profiler → virtualization + transitions → before/after.
4. **ملخص**: "إزاي الـ reconciliation بيشتغل" و "Server vs Client Components" برسمة.

## 📚 المصادر

- [react.dev](https://react.dev) — Learn section كامل (خاصة "Escape Hatches" و "You Might Not Need an Effect")
- [Epic React — Kent C. Dodds](https://www.epicreact.dev/)
- [TanStack Query docs](https://tanstack.com/query/latest) — و[Practical React Query](https://tkdodo.eu/blog/practical-react-query) (TkDodo)
- [React Compiler docs](https://react.dev/learn/react-compiler)
- [Testing Library docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Radix Primitives](https://www.radix-ui.com/primitives) و [shadcn/ui](https://ui.shadcn.com/) — كنموذج لـ design system
- [web.dev — INP](https://web.dev/articles/inp)

## ✅ اختبار الخروج

1. إمتى الـ component بيعمل re-render فعلًا؟ وإيه الفرق بين render و commit؟
2. ليه الـ hooks مينفعش تتنادى جوه condition؟ (الإجابة التقنية مش "القواعد")
3. اديني 3 حالات `useEffect` فيها غلط والبديل الصح.
4. إيه الفرق بين server state و client state وليه بنفصلهم؟
5. اشرح Suspense for data fetching: إزاي شغال تحت؟
6. Server Component vs Client Component: إيه اللي بيروح الـ bundle وإيه لأ؟ وإيه هو الـ hydration error؟
7. ليه الـ index key غلط؟ اديني مثال بيكسر.
8. إزاي تخلي list من 50K عنصر سلسة؟
