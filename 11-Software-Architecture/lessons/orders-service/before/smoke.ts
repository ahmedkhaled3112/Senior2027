// Run: node before/smoke.ts . Shows real bugs of the BEFORE code.
import { startLab, listen } from "../lib/lab.ts";
import { createApp } from "./app.ts";

const lab = await startLab(new URL("./schema.sql", import.meta.url));
const srv = await listen(createApp(lab.pool, lab.paymentsUrl));
const post = async (body: unknown) => {
  const r = await fetch(srv.url + "/orders", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: r.status, body: await r.json() };
};
const stock = async (sku: string): Promise<number> =>
  (await lab.pool.query("select stock from products where sku = $1", [sku])).rows[0].stock;
try {
  console.log("happy path:", await post({ userEmail: "sara@example.com", lines: [{ sku: "SKU-MUG", qty: 2 }] }));
  console.log("mug stock after 2 sold:", await stock("SKU-MUG"));
  lab.setDecline(true);
  console.log("declined:", await post({ userEmail: "omar@example.com", lines: [{ sku: "SKU-MUG", qty: 3 }] }));
  console.log("BUG 1, stock not returned after decline (expected 8):", await stock("SKU-MUG"));
  lab.setDecline(false);
  // warm up keep-alive sockets and pool connections, or the first request finishes before the others start
  await Promise.all([1, 2, 3, 4].map(() => fetch(srv.url + "/orders/1").then((r) => r.text())));
  const race = await Promise.all(
    [1, 2, 3, 4].map((n) => post({ userEmail: `u${n}@example.com`, lines: [{ sku: "SKU-LAMP", qty: 1 }] })),
  );
  console.log("BUG 2, 4 buyers race for 1 lamp, statuses:", race.map((r) => r.status), "stock:", await stock("SKU-LAMP"));
  console.log(
    "BUG 3, negative qty accepted:",
    await post({ userEmail: "x@example.com", lines: [{ sku: "SKU-MUG", qty: -5 }] }),
    "stock:",
    await stock("SKU-MUG"),
  );
} finally {
  await srv.close();
  await lab.stop();
}
