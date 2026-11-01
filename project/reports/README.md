# Reports — الأرقام اللي بتثبت المستوى

كل تحسين أو قياس بيتوثّق هنا بـ **before / after بالأرقام**. دي المادة بتاعة المقالات والـ interviews.

| الملف | إيه اللي فيه | القسم |
| --- | --- | --- |
| `explain-before-after.md` | 5 queries بطيئة على 10M rows → indexes/rewrite → `EXPLAIN ANALYZE` قبل وبعد | 07 |
| `load-test-q1.md` | autocannon/k6 على الـ API: p50/p95/p99 قبل وبعد (keep-alive، pool، cache) | 04 |
| `profiling.md` | flame graph لـ endpoint بطيء وإزاي اتحسّن | 04 |
| `lighthouse.md` | LCP/INP/CLS على mobile قبل وبعد (RSC، images، fonts) | 06 |
| `zero-downtime.md` | deploy تحت load test: error rate، latency أثناء الـ rollout | 11 |
| `aws-cost.md` | التكلفة الشهرية بالبنود + إيه اللي اتوفّر | 11 |
| `security-review.md` | threat model + نتائج Semgrep/ZAP/Trivy وإيه اللي اتصلّح | 11 |
| `ai-evals.md` | retrieval recall@k، LLM-judge scores، cost per request قبل وبعد (chunking، rerank، caching) | 12 |

## Template لأي report

```markdown
# [اسم التحسين]
- التاريخ: · القسم: · الـ commit/PR:
## المشكلة (بالأرقام)
## الفرضية
## إيه اللي اتعمل
## النتيجة (جدول before/after)
## الدرس
```
