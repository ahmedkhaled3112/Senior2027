#!/usr/bin/env node
/**
 * Regenerates progress.md in every section folder and the root progress.md.
 *
 * Source of truth: the `- [ ]` / `- [x]` checkboxes in each section README.md,
 * grouped by level headings (🟢 / 🟡 / 🔴), plus the lesson HTML files in `lessons/`.
 *
 * Anything outside <!-- AUTO:START --> … <!-- AUTO:END --> in a progress.md is preserved.
 *
 * Usage:  node _tools/update-progress.js
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const AUTO_START = "<!-- AUTO:START -->";
const AUTO_END = "<!-- AUTO:END -->";
const LEVELS = [
  { key: "easy", emoji: "🟢", label: "الأساسيات" },
  { key: "mid", emoji: "🟡", label: "المتوسط" },
  { key: "hard", emoji: "🔴", label: "المتقدم" },
];

const today = new Date().toISOString().slice(0, 10);

function bar(pct, width = 20) {
  const filled = Math.round((pct / 100) * width);
  return "█".repeat(filled) + "░".repeat(width - filled);
}
function pctOf(done, total) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function parseReadme(md) {
  const lines = md.split(/\r?\n/);
  const title = (lines.find((l) => l.startsWith("# ")) || "# ?").slice(2).trim();
  const levels = Object.fromEntries(LEVELS.map((l) => [l.key, { done: 0, total: 0 }]));
  let current = null; // level key or null
  let zone = null; // "artifacts" | "exit" | null
  let artifacts = 0;
  let exit = 0;

  for (const line of lines) {
    if (/^##\s/.test(line) || /^#\s/.test(line)) {
      const lvl = LEVELS.find((l) => line.includes(l.emoji) && /المستوى/.test(line));
      current = lvl ? lvl.key : null;
      zone = line.includes("🛠️") ? "artifacts" : line.includes("✅") && /اختبار/.test(line) ? "exit" : null;
      continue;
    }
    const cb = line.match(/^\s*-\s\[([ xX])\]/);
    if (cb && current) {
      levels[current].total++;
      if (cb[1] !== " ") levels[current].done++;
      continue;
    }
    if (zone === "artifacts" && /^\d+\.\s/.test(line)) artifacts++;
    if (zone === "exit" && /^\d+\.\s/.test(line)) exit++;
  }
  const total = Object.values(levels).reduce((a, l) => a + l.total, 0);
  const done = Object.values(levels).reduce((a, l) => a + l.done, 0);
  return { title, levels, total, done, artifacts, exit };
}

function listLessons(dir) {
  const ldir = path.join(dir, "lessons");
  if (!fs.existsSync(ldir)) return [];
  return fs
    .readdirSync(ldir)
    .filter((f) => f.endsWith(".html"))
    .sort()
    .map((f) => {
      const html = fs.readFileSync(path.join(ldir, f), "utf8");
      const t = (html.match(/<title>([^<]*)<\/title>/i) || [, f])[1].trim();
      const level = (html.match(/<meta name="level" content="([^"]*)"/i) || [, ""])[1];
      const time = (html.match(/<meta name="time" content="([^"]*)"/i) || [, ""])[1];
      return { file: f, title: t, level, time };
    });
}

function replaceAuto(existing, autoBlock, fallbackTail) {
  if (existing && existing.includes(AUTO_START) && existing.includes(AUTO_END)) {
    const a = existing.indexOf(AUTO_START);
    const b = existing.indexOf(AUTO_END) + AUTO_END.length;
    return existing.slice(0, a) + autoBlock + existing.slice(b);
  }
  return autoBlock + "\n" + fallbackTail;
}

function sectionProgress(dirName, stats, lessons) {
  const pct = pctOf(stats.done, stats.total);
  let out = `${AUTO_START}\n`;
  out += `# ${stats.title} — Progress\n\n`;
  out += `> آخر تحديث: ${today} · شغّل \`node _tools/update-progress.js\` بعد أي تعديل.\n\n`;
  out += `**الإجمالي:** ${stats.done} / ${stats.total} بند · **${pct}%**\n\n`;
  out += "`" + bar(pct) + "` " + pct + "%\n\n";
  out += `| المستوى | خلصان | الإجمالي | % | |\n| --- | ---: | ---: | ---: | --- |\n`;
  for (const l of LEVELS) {
    const s = stats.levels[l.key];
    const p = pctOf(s.done, s.total);
    out += `| ${l.emoji} ${l.label} | ${s.done} | ${s.total} | ${p}% | \`${bar(p, 12)}\` |\n`;
  }
  out += `\n**Artifacts المطلوبة:** ${stats.artifacts} · **أسئلة اختبار الخروج:** ${stats.exit}\n\n`;
  out += `## الدروس (\`lessons/\`)\n\n`;
  if (lessons.length === 0) {
    out += `_لسه مفيش دروس. أول درس بيتعمل بـ \`_template/lesson.html\` ويتحط في \`${dirName}/lessons/\`._\n`;
  } else {
    out += `| # | الدرس | المستوى | الوقت |\n| --- | --- | --- | --- |\n`;
    lessons.forEach((l, i) => {
      out += `| ${i + 1} | [${l.title}](./lessons/${l.file}) | ${l.level} | ${l.time} |\n`;
    });
  }
  out += `\n${AUTO_END}\n`;
  return out;
}

const sectionManualTail = `
## ملاحظاتي (يدوي — مش بيتمسح)

### بنود واقفة عندها / أسئلة معلّقة
-

### حاجات اتعلمتها وعايز أفتكرها
-

### الـ Artifacts
- [ ]
`;

function rootProgress(sections) {
  const total = sections.reduce((a, s) => a + s.stats.total, 0);
  const done = sections.reduce((a, s) => a + s.stats.done, 0);
  const pct = pctOf(done, total);
  const lessonsCount = sections.reduce((a, s) => a + s.lessons.length, 0);
  let out = `${AUTO_START}\n`;
  out += `# Senior 2027 — Overall Progress\n\n`;
  out += `> آخر تحديث: ${today} · مصدر الحقيقة = الـ checkboxes في \`README.md\` بتاع كل قسم · التحديث بـ \`node _tools/update-progress.js\`\n\n`;
  out += `## الإجمالي\n\n`;
  out += `**${done} / ${total} بند · ${pct}%** · **${lessonsCount} درس** متعمل\n\n`;
  out += "`" + bar(pct, 40) + "` " + pct + "%\n\n";
  out += `| # | القسم | 🟢 | 🟡 | 🔴 | خلصان / الإجمالي | % | دروس |\n| --- | --- | --- | --- | --- | ---: | ---: | ---: |\n`;
  for (const s of sections) {
    const L = s.stats.levels;
    const cell = (k) => `${L[k].done}/${L[k].total}`;
    const p = pctOf(s.stats.done, s.stats.total);
    out += `| ${s.num} | [${s.name}](./${s.dir}/progress.md) | ${cell("easy")} | ${cell("mid")} | ${cell("hard")} | ${s.stats.done} / ${s.stats.total} | ${p}% \`${bar(p, 10)}\` | ${s.lessons.length} |\n`;
  }
  out += `\n## حسب المستوى (كل الأقسام)\n\n| المستوى | خلصان | الإجمالي | % |\n| --- | ---: | ---: | ---: |\n`;
  for (const l of LEVELS) {
    const d = sections.reduce((a, s) => a + s.stats.levels[l.key].done, 0);
    const t = sections.reduce((a, s) => a + s.stats.levels[l.key].total, 0);
    out += `| ${l.emoji} ${l.label} | ${d} | ${t} | ${pctOf(d, t)}% |\n`;
  }
  out += `\n${AUTO_END}\n`;
  return out;
}

const rootManualTail = `
## الخطة الزمنية (يدوي)

| القسم | بدأت | خلصت | ملاحظة |
| --- | --- | --- | --- |
| 01 CS Fundamentals | | | |
| 02 JavaScript | | | |
| 03 TypeScript | | | |
| 04 Node.js | | | |
| 05 React | | | |
| 06 Next.js | | | |
| 07 Databases | | | |
| 08 Design Patterns | | | |
| 09 Software Architecture | | | |
| 10 System Design | | | |
| 11 Testing · Security · DevOps | | | |
| 12 AI Engineering | | | |
| 13 Senior Skills | | | |
| 14 Interview Prep | | | |

## الإيقاع الأسبوعي المستهدف: 10–12 ساعة

- 4h المشروع الجانبي · 3h دراسة موجّهة · 2h system design / engineering blog · 1–2h مشاركة (مقال / open source)

## Log أسبوعي (يدوي)

| الأسبوع | إيه اللي اتعمل | ساعات | إيه اللي اتعلمته بجد |
| --- | --- | --- | --- |
| | | | |
`;

// ---- main ----
const sections = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^\d{2}-/.test(d.name))
  .map((d) => d.name)
  .sort()
  .map((dir) => {
    const readmePath = path.join(ROOT, dir, "README.md");
    if (!fs.existsSync(readmePath)) return null;
    const stats = parseReadme(fs.readFileSync(readmePath, "utf8"));
    const lessons = listLessons(path.join(ROOT, dir));
    const num = dir.slice(0, 2);
    const name = dir.slice(3).replace(/-/g, " ");
    const progressPath = path.join(ROOT, dir, "progress.md");
    const existing = fs.existsSync(progressPath) ? fs.readFileSync(progressPath, "utf8") : "";
    fs.writeFileSync(progressPath, replaceAuto(existing, sectionProgress(dir, stats, lessons), sectionManualTail));
    return { dir, num, name, stats, lessons };
  })
  .filter(Boolean);

const rootPath = path.join(ROOT, "progress.md");
const existingRoot = fs.existsSync(rootPath) ? fs.readFileSync(rootPath, "utf8") : "";
fs.writeFileSync(rootPath, replaceAuto(existingRoot, rootProgress(sections), rootManualTail));

const total = sections.reduce((a, s) => a + s.stats.total, 0);
const done = sections.reduce((a, s) => a + s.stats.done, 0);
console.log(`Updated ${sections.length} section progress files + root progress.md`);
console.log(`Overall: ${done}/${total} (${pctOf(done, total)}%)`);
for (const s of sections) console.log(`  ${s.dir}: ${s.stats.done}/${s.stats.total}, lessons: ${s.lessons.length}`);
