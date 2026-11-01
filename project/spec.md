# Spec — [اسم المشروع]

> صفحة أو اتنين. بتتحدّث لما الفهم يتغير. الـ MVP هو اللي بيتبني الأول — الباقي backlog.

## 1. المشكلة

- مين المستخدم: _____
- إيه المشكلة اللي عنده دلوقتي: _____
- إزاي بيحلها حاليًا (البديل): _____
- ليه الحل بتاعنا أحسن: _____

## 2. Functional requirements

### MVP (الربع الأول)
- [ ] FR-1: _____
- [ ] FR-2: _____
- [ ] FR-3: _____

### بعدين (backlog)
- FR-10: _____

### مش هنعمله (non-goals) — بنفس أهمية اللي هنعمله
- _____

## 3. Non-functional requirements (بأرقام)

| البُعد | الهدف | ليه |
| --- | --- | --- |
| Latency | p95 < 200ms للـ reads، < 500ms للـ writes | |
| Availability | 99.9% (8.7h downtime/year) | |
| Scale المستهدف | 1K tenants، 100 req/s peak | سنة أولى |
| Consistency | strong للـ payments/inventory، eventual للـ feeds/counters | |
| Security | multi-tenant isolation، OWASP top 10، audit log | |
| Cost | < $X/شهر عند الـ scale المستهدف | |
| Observability | traces لكل request، RED dashboard، SLO واحد مع alert | |

## 4. Users و Roles

| Role | يقدر يعمل | ميقدرش |
| --- | --- | --- |
| Owner | | |
| Admin | | |
| Member | | |

## 5. الـ Domain (أول رسمة)

- Bounded contexts المبدئية: _____ / _____ / _____
- Aggregates الرئيسية: _____
- Ubiquitous language (المصطلحات وتعريفها): _____

## 6. الـ APIs الرئيسية (شكل مبدئي)

```
POST   /api/v1/...
GET    /api/v1/...
```

## 7. المخاطر و الـ unknowns

| الخطر | الاحتمال | الأثر | الـ mitigation / spike |
| --- | --- | --- | --- |
| | | | |

## 8. Success metrics

- للمشروع كـ منتج: _____
- للمشروع كـ learning tool: كل قسم من المنهج له artifact فيه (شوف [roadmap.md](./roadmap.md))
