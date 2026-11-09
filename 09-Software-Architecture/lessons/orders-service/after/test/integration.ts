// Run: node after/test/integration.ts . The same scenarios as before/smoke.ts, against real Postgres.
import { listen, startLab } from "../../lib/lab.ts";
import { compose } from "../src/composition-root.ts";

const lab = await startLab(new URL("../schema.sql", import.meta.url));
const sent: string[] = [];
const { app, drainOutbox } = compose({ pool: lab.pool, paymentsUrl: lab.paymentsUrl, send: (m) => sent.push(m) });
const srv = await listen(app);
const post = async (body: unknown) => {
  const r = await fetch(srv.url + "/orders", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  return { status: r.status, body: await r.json() };
};
const stock = async (sku: string): Promise<number> => (await lab.pool.query("select stock from catalog.products where sku = $1", [sku])).rows[0].stock;
try {
  console.log("happy path:", (await post({ customerEmail: "sara@example.com", lines: [{ sku: "SKU-MUG", qty: 2 }] })).status, "stock:", await stock("SKU-MUG"));
  lab.setDecline(true);
  console.log("declined:", (await post({ customerEmail: "omar@example.com", lines: [{ sku: "SKU-MUG", qty: 3 }] })).status, "stock still 8:", await stock("SKU-MUG"));
  lab.setDecline(false);
  await Promise.all([1, 2, 3, 4].map(() => post({ customerEmail: "bad", lines: [] })));
  const race = await Promise.all([1, 2, 3, 4].map((n) => post({ customerEmail: `u${n}@example.com`, lines: [{ sku: "SKU-LAMP", qty: 1 }] })));
  console.log("4 buyers, 1 lamp:", race.map((r) => r.status), "stock:", await stock("SKU-LAMP"));
  console.log("negative qty:", await post({ customerEmail: "x@example.com", lines: [{ sku: "SKU-MUG", qty: -5 }] }), "stock:", await stock("SKU-MUG"));
  console.log("outbox drained:", await drainOutbox(), "messages sent:", sent.length);
  console.log("charges made:", lab.charges());
} finally {
  await srv.close();
  await lab.stop();
}
