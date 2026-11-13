// A rule that never failed proves nothing. Plants one violation per rule, expects the check to fail on that rule, removes it.
import { spawnSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

const M = "after/src/modules";
const cases = [
  ["domain-stays-pure", `${M}/orders/domain/zz-plant.ts`, `import pg from "pg";\nexport const p = pg;\n`],
  ["application-not-to-outer-layers", `${M}/orders/application/zz-plant.ts`, `import { makePgOrderRepository } from "../infrastructure/pg-order-repository.ts";\nexport const p = makePgOrderRepository;\n`],
  ["no-reaching-into-other-modules", `${M}/notifications/zz-plant.ts`, `import { Order } from "../orders/domain/order.ts";\nexport const p = Order;\n`],
  ["shared-knows-no-module", `after/src/shared/zz-plant.ts`, `import { makeCatalog } from "../modules/catalog/index.ts";\nexport const p = makeCatalog;\n`],
  ["domain-has-no-path-to-infrastructure", `${M}/orders/domain/zz-plant.ts`, `import type { X } from "../../../shared/zz-launder.ts";\nexport type P = X;\n`, [`after/src/shared/zz-launder.ts`, `export type { StaleOrderError as X } from "../modules/orders/infrastructure/pg-order-repository.ts";\n`]],
  ["no-cycles", `${M}/orders/domain/zz-plant.ts`, `import { b } from "./zz-plant-b.ts";\nexport const a = () => b;\n`, [`${M}/orders/domain/zz-plant-b.ts`, `import { a } from "./zz-plant.ts";\nexport const b = () => a;\n`]],
];
let bad = 0;
for (const [rule, file, code, extra] of cases) {
  writeFileSync(file, code);
  if (extra) writeFileSync(extra[0], extra[1]);
  const r = spawnSync(process.execPath, ["scripts/arch-check.mjs", "after/src"], { encoding: "utf8" });
  rmSync(file);
  if (extra) rmSync(extra[0]);
  const caught = r.status === 1 && r.stdout.includes(rule);
  if (!caught) bad++;
  console.log(`${caught ? "caught" : "MISSED"}  ${rule}`);
}
process.exit(bad ? 1 : 0);
