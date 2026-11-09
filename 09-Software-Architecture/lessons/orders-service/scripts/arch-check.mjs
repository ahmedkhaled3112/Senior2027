// CI step. Fails on violations, and also fails when the tool saw nothing: on TS 7 alone dependency-cruiser
// reports a green check on 0 modules and exits 0.
import { spawnSync } from "node:child_process";

const target = process.argv[2] ?? "after/src";
const minModules = Number(process.argv[3] ?? 5);
const bin = "node_modules/dependency-cruiser/bin/dependency-cruiser.mjs";
const run = spawnSync(process.execPath, [bin, target, "--config", ".dependency-cruiser.cjs", "--output-type", "json"], { encoding: "utf8", maxBuffer: 1 << 28 });
const { summary } = JSON.parse(run.stdout);
for (const v of summary.violations) {
  console.log(`  ${v.rule.name}: ${v.from} -> ${v.to}`);
}
console.log(`cruised ${summary.totalCruised} modules, ${summary.totalDependenciesCruised} dependencies, ${summary.error} errors`);
if (summary.totalCruised < minModules) {
  console.error(`arch check is not checking anything: saw ${summary.totalCruised} modules, expected at least ${minModules}. Is a TypeScript 6 API installed?`);
  process.exit(2);
}
process.exit(summary.error > 0 ? 1 : 0);
