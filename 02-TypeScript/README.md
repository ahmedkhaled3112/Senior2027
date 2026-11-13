# 02 — TypeScript

> **ليه القسم ده:** TS مش "JS بـ annotations". السنيور بيستخدم الـ type system عشان يخلي الحالات الغلط مستحيلة تتكتب (make illegal states unrepresentable)، ويكتب types لـ libraries، ويعرف إمتى الـ types بتكلّف أكتر ما بتفيد.
>
> **الوقت التقريبي:** 2 أسبوع · **المصدر الأنسب:** [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) + Total TypeScript (Matt Pocock)

## إزاي تستخدم الملف ده

علّم كل بند: ✅ أعرفه وأقدر أشرحه · 🔄 محتاج مراجعة · ❌ متعلمتوش
لكل بند: جرّبه في [TS Playground](https://www.typescriptlang.org/play) وشوف الـ hover types.

---

## 🟢 المستوى 1 — الأساسيات (سهل)

### 1.1 ليه TypeScript
- [ ] Structural typing (duck typing): النوع بيتحدد بالشكل مش بالاسم — وده الفرق عن Java/C#
- [ ] Compile-time only: الـ types بتتشال (type erasure)، مفيش runtime checks — وليه ده مهم تفهمه (الـ API response ممكن يكون غلط رغم الـ type)
- [ ] الـ compiler (`tsc`) بيعمل إيه: type-check + transpile، وإنهم ممكن يتفصلوا

### 1.2 Basic types
- [ ] Primitives: `string`، `number`، `boolean`، `bigint`، `symbol`، `null`، `undefined`
- [ ] Arrays: `string[]` vs `Array<string>`، readonly arrays
- [ ] Tuples: `[string, number]`، named tuples، optional elements، rest في الـ tuple
- [ ] Objects: inline types، optional `?`، `readonly`
- [ ] `any` vs `unknown` vs `never` vs `void`: الفرق بالظبط وإمتى كل واحد — وليه `unknown` أحسن من `any` دايمًا
- [ ] Enums: numeric، string، `const enum` — وليه كتير بيتجنبوها لصالح `union of literals` أو `as const` object
- [ ] Literal types: `'GET' | 'POST'`، `42`، `true`
- [ ] Type annotations vs inference: إمتى تكتب النوع (function params، public API) وإمتى تسيبه (local variables، return types غالبًا)

### 1.3 Interfaces و Type aliases
- [ ] `interface` vs `type`: الفرق الحقيقي — declaration merging (interface بس)، `extends` vs intersection `&`، الـ error messages، الـ performance
- [ ] القاعدة العملية: interface للـ objects/classes اللي ممكن تتمد، type للـ unions وكل حاجة تانية
- [ ] Index signatures: `{ [key: string]: number }` و `Record<string, number>`
- [ ] Optional و readonly properties

### 1.4 Functions
- [ ] Parameter types، return types، optional/default params
- [ ] Function types: `(a: number) => string`، call signatures في interface
- [ ] `void` vs `undefined` return
- [ ] Function overloads: إمتى تحتاجهم وليه الـ union غالبًا أحسن
- [ ] `this` typing في functions

### 1.5 Union و Intersection
- [ ] Union `|`: القيمة واحدة من كذا نوع
- [ ] Intersection `&`: القيمة كل الأنواع مع بعض — وإيه اللي بيحصل لما تعمل intersection لـ primitives متعارضة (`never`)
- [ ] Discriminated unions الأساسي: `{ kind: 'circle', r: number } | { kind: 'square', s: number }`

### 1.6 Classes
- [ ] Access modifiers: `public`، `private`، `protected` — والفرق بين `private` و `#private` (الأول compile-time بس)
- [ ] `readonly` properties، parameter properties (`constructor(private x: number)`)
- [ ] `abstract` classes و methods
- [ ] `implements` interface
- [ ] Static members

### 1.7 الإعدادات الأساسية
- [ ] `tsconfig.json`: `strict: true` (وإيه اللي تحته)، `target`، `module`، `outDir`، `rootDir`، `include/exclude`
- [ ] `tsx` أو `ts-node` لتشغيل TS مباشرة في الـ dev
- [ ] `@types/*` packages: إيه هي وإمتى تحتاجها

---

## 🟡 المستوى 2 — المتوسط

### 2.1 Narrowing (أهم مهارة يومية)
- [ ] `typeof` و `instanceof` و `in` narrowing
- [ ] Equality narrowing و truthiness narrowing
- [ ] **Discriminated unions بعمق**: الـ discriminant property، `switch` عليه، وليه ده أحسن pattern في TS
- [ ] **Exhaustive check بـ `never`**: `const _exhaustive: never = x` أو `assertNever(x)` — عشان لو ضفت variant جديد الـ compiler يزعّق
- [ ] Type predicates: `function isFoo(x): x is Foo`، وإمتى تكتبهم
- [ ] Assertion functions: `function assert(x): asserts x is Foo`
- [ ] Control flow analysis: إزاي TS بيتابع الـ narrowing في الـ if/else والـ early return، وإمتى بيضيّعه (closures، callbacks)
- [ ] Non-null assertion `!` وليه تتجنبه، و optional chaining مع الـ types

### 2.2 Generics
- [ ] Generic functions: `function identity<T>(x: T): T`، الـ inference من الـ arguments
- [ ] Generic interfaces و types و classes
- [ ] Constraints: `<T extends { id: string }>`، `<K extends keyof T>`
- [ ] Default type parameters: `<T = string>`
- [ ] **Generic inference وليه ساعات بتفشل**: لما T مش بيتـ infer من الـ argument، وإزاي تساعده (explicit، `NoInfer`، inference sites)
- [ ] `keyof`: الـ union لكل الـ keys
- [ ] Indexed access types: `T[K]`، `T['prop']`، `T[number]` للـ arrays
- [ ] `typeof` على values: تطلع type من object أو function موجود
- [ ] Multiple type parameters وربطهم ببعض
- [ ] القاعدة: الـ generic لازم يظهر مرتين على الأقل (parameter و return)، وإلا مش محتاجه

### 2.3 Utility types المدمجة
- [ ] `Partial`، `Required`، `Readonly`
- [ ] `Pick`، `Omit`
- [ ] `Record<K, V>`
- [ ] `Exclude`، `Extract`، `NonNullable`
- [ ] `ReturnType`، `Parameters`، `ConstructorParameters`، `InstanceType`
- [ ] `Awaited` (type اللي الـ Promise بيرجعه)
- [ ] تعرف تكتب كل واحد منهم بإيدك (ده بيعلّمك mapped/conditional types)

### 2.4 Modules و Declarations
- [ ] Module resolution: `node16`/`nodenext` vs `bundler` — وإمتى كل واحد
- [ ] `paths` و `baseUrl` للـ aliases (وليه محتاج bundler/`tsconfig-paths` عشان يشتغلوا في runtime)
- [ ] Declaration files `.d.ts`: إيه هي، `declare`، `declare module 'x'` للـ packages من غير types
- [ ] Ambient declarations: `declare global`، `declare const`
- [ ] **Module augmentation**: تضيف property لـ Express `Request` أو لـ `process.env` أو لـ `Window`
- [ ] `export =` و `import x = require()` للـ CJS القديم
- [ ] `isolatedModules` و `verbatimModuleSyntax`: `import type` وليه مهم مع esbuild/SWC

### 2.5 Runtime validation
- [ ] المشكلة: الـ types مش موجودة في runtime، والـ API response أو الـ env vars ممكن يكونوا غلط
- [ ] Zod: schema → `z.infer<typeof schema>`، parse vs safeParse، transforms، refinements
- [ ] Valibot كبديل أخف
- [ ] القاعدة: validate على الحدود (API input، env، external responses)، وجوه الـ system اعتمد على الـ types
- [ ] Type-safe env: validate `process.env` عند الـ startup

### 2.6 TypeScript مع React
- [ ] Props typing: interface vs type، `children: React.ReactNode`
- [ ] `ReactNode` vs `ReactElement` vs `JSX.Element`
- [ ] Event types: `React.ChangeEvent<HTMLInputElement>`، `React.FormEvent`، `React.MouseEvent`
- [ ] Ref types: `useRef<HTMLDivElement>(null)`
- [ ] `ComponentProps<typeof Button>` و `ComponentPropsWithoutRef`
- [ ] Generic components: `<T,>(props: Props<T>) => ...`
- [ ] Discriminated union props: `{ variant: 'link', href: string } | { variant: 'button', onClick: () => void }`

### 2.7 TypeScript مع Node
- [ ] Express request typing: `Request<Params, ResBody, ReqBody, Query>`، augmentation للـ `req.user`
- [ ] Fastify: الـ generics للـ routes والـ JSON Schema → types (`@fastify/type-provider-typebox` أو zod provider)
- [ ] `process.env` typing
- [ ] Error handling: `catch (e: unknown)` وليه مش `any`، narrowing للـ Error

### 2.8 الأدوات
- [ ] typescript-eslint: الـ rules المهمة (`no-floating-promises`، `no-explicit-any`، `strict-boolean-expressions`، `switch-exhaustiveness-check`)
- [ ] `tsc --noEmit` كـ type-check في CI، وesbuild/SWC/tsx للـ transpile
- [ ] Project references للـ monorepos (`composite`، `references`)

---

## 🔴 المستوى 3 — المتقدم (اللي بيفرّق السنيور)

### 3.1 Conditional types
- [ ] Syntax: `T extends U ? X : Y`
- [ ] **`infer`**: تطلع type من جوه type تاني — `ReturnType` بإيدك، `UnwrapPromise`، `ElementType<T[]>`، `FirstArg`
- [ ] Distributive conditional types: ليه `Foo<'a' | 'b'>` بيتوزع، وإزاي توقف الـ distribution بـ `[T] extends [U]`
- [ ] Conditional types مع generics للـ API typing (مثلًا return type مختلف حسب option)

### 3.2 Mapped types
- [ ] Syntax: `{ [K in keyof T]: ... }`
- [ ] Modifiers: `readonly`، `?`، وإزالتهم بـ `-readonly` و `-?`
- [ ] **Key remapping بـ `as`**: `{ [K in keyof T as \`get${Capitalize<K>}\`]: () => T[K] }`
- [ ] Filtering keys: `as K extends string ? K : never`
- [ ] تكتب بإيدك: `DeepPartial<T>`، `DeepReadonly<T>`، `Mutable<T>`، `PickByValue<T, V>`، `OptionalKeys<T>`

### 3.3 Template literal types
- [ ] Syntax: `` `${Prefix}-${string}` ``
- [ ] مع unions بيتوزع: `` `${'top' | 'bottom'}-${'left' | 'right'}` `` → 4 أنواع
- [ ] Intrinsic string types: `Uppercase`، `Lowercase`، `Capitalize`، `Uncapitalize`
- [ ] مع `infer` للـ parsing: تطلع route params من `'/users/:id/posts/:postId'` كـ type
- [ ] Event names typing: `on${Capitalize<Event>}`

### 3.4 Type-level programming (بحدود)
- [ ] Recursive types: `type Json = string | number | boolean | null | Json[] | { [k: string]: Json }`
- [ ] Recursive conditional types و الـ depth limits
- [ ] Tuple manipulation: `Head`، `Tail`، `Push`، `Length`، variadic tuple types
- [ ] **Branded/Opaque types**: `type UserId = string & { __brand: 'UserId' }` — عشان متخلطش `UserId` بـ `OrderId` رغم إن الاتنين string
- [ ] `Result<T, E>` type وdiscriminated union للـ success/failure
- [ ] الحكم: إمتى الـ type gymnastics بتبقى أذى (compile time بطيء، error messages مش مفهومة، الفريق مش فاهم)

### 3.5 Variance و الـ edge cases
- [ ] Covariance و contravariance: ليه `(x: Dog) => void` مش assignable لـ `(x: Animal) => void` (مع `strictFunctionTypes`)
- [ ] Method bivariance: ليه الـ methods في interfaces bivariant (والـ hole اللي ده بيعمله)
- [ ] `readonly` arrays و covariance
- [ ] `in`/`out` variance annotations على الـ generics (TS 4.7+)
- [ ] Type widening و narrowing للـ literals: ليه `let x = 'a'` بيبقى `string` و `const x = 'a'` بيبقى `'a'`

### 3.6 `satisfies` و `as const` و `const` generics
- [ ] `as const`: readonly + literal types، للـ config objects والـ tuples
- [ ] **`satisfies`**: تتحقق من النوع من غير ما تضيّع الـ inference — الفرق عن الـ annotation والـ `as`
- [ ] `const` type parameters (`<const T>`) — عشان الـ caller مش محتاج يكتب `as const`
- [ ] `as` assertion: إمتى مقبول (narrowing من `unknown` بعد validation) وإمتى كذب على الـ compiler

### 3.7 Strict flags المتقدمة
- [ ] `noUncheckedIndexedAccess`: `arr[0]` بيبقى `T | undefined` — وليه ده بيمسك bugs حقيقية
- [ ] `exactOptionalPropertyTypes`: الفرق بين `prop?: string` و `prop: string | undefined`
- [ ] `noImplicitOverride`، `noPropertyAccessFromIndexSignature`، `noFallthroughCasesInSwitch`
- [ ] `useUnknownInCatchVariables` (جوه `strict`)
- [ ] إزاي تفعّلهم على codebase قديم تدريجيًا

### 3.8 Patterns عملية متقدمة
- [ ] **Typing للـ API layer**: DTOs منفصلة عن domain models، mapping بينهم، OpenAPI → types generation (`openapi-typescript`)
- [ ] Discriminated unions للـ state machines: `{ status: 'idle' } | { status: 'loading' } | { status: 'success', data } | { status: 'error', error }` — وليه ده أحسن من `isLoading` + `data?` + `error?`
- [ ] Builder pattern بـ generics: كل method بترجع type متراكم (type-safe query builder)
- [ ] Fluent APIs و method chaining typing
- [ ] Typed event emitters: `on<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void)`
- [ ] Typed config objects مع `as const satisfies Config`
- [ ] Function overloads vs conditional return types: إمتى كل واحد
- [ ] `Result` types بدل exceptions: إمتى يستاهلوا (domain errors متوقعة) وإمتى الـ exceptions أحسن (bugs)
- [ ] Error handling بـ discriminated unions: `{ ok: true, value } | { ok: false, error }`

### 3.9 Declarations و Library authoring
- [ ] تكتب types لـ library: `declare module`، generics للـ public API، overloads، JSDoc للـ docs
- [ ] Dual packages (ESM + CJS) والـ `types` في الـ `exports` field
- [ ] `declaration: true` و `declarationMap`
- [ ] Triple-slash directives (`/// <reference types="..." />`) — نادر، بس تعرفه

### 3.10 Performance للـ type checker
- [ ] ليه الـ `tsc` بطيء في المشاريع الكبيرة: deep conditional types، big unions، `--extendedDiagnostics`
- [ ] Project references و `incremental` للـ monorepos
- [ ] `skipLibCheck` وإمتى
- [ ] Interface vs type للـ performance (interfaces cached، intersections لأ)
- [ ] `--generateTrace` لتحليل الـ slow types

---

## 🛠️ الـ Artifact المطلوب من القسم ده

1. **ملف `utility-types.ts`**: implementation بإيدك لكل الـ built-in utility types + `DeepPartial`، `DeepReadonly`، `Brand`، `Result`، `PathParams<'/users/:id'>` — مع type tests (`expectTypeOf` من vitest أو `tsd`).
2. **Type-safe event emitter** و **type-safe query builder صغير** (fluent، كل method بتضيّق الـ type).
3. **API module** فيه: Zod schemas للـ input → inferred types → domain model منفصل → DTO للـ response، مع validation على الحدود بس.
4. ملف `tsconfig.json` strict بالكامل مع تعليق على كل flag ليه مفعّل.

## 📚 المصادر

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) — كامل، خاصة Narrowing و Generics و Type Manipulation
- [Total TypeScript — Matt Pocock](https://www.totaltypescript.com/) — الـ free tutorials و الكتاب
- [Type Challenges](https://github.com/type-challenges/type-challenges) — تمارين type-level (الـ easy و medium كفاية)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [typescript-eslint rules](https://typescript-eslint.io/rules/)

## ✅ اختبار الخروج

1. إيه الفرق بين `interface` و `type` بجد (مش "الاتنين زي بعض")؟
2. اكتب `DeepPartial<T>` و `ReturnType<T>` بإيدك.
3. ليه `unknown` أحسن من `any`؟ وإزاي تتعامل مع `catch (e)`؟
4. اشرح الـ distributive conditional types وإزاي توقفها.
5. إيه الفرق بين `satisfies` و `as` و الـ annotation العادية؟
6. ليه `(x: Dog) => void` مش بيتقبل مكان `(x: Animal) => void`؟
7. امتى تستخدم branded types؟ اديني مثال من مشروع حقيقي.
