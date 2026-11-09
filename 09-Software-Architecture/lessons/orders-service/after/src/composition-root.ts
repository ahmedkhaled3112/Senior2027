// The one place that knows the concrete classes. Modules never import each other here-to-there.
import { randomUUID } from "node:crypto";
import express from "express";
import type { Express } from "express";
import type { Pool } from "pg";
import { makeCatalog } from "./modules/catalog/index.ts";
import { makeNotifications } from "./modules/notifications/index.ts";
import { makeHttpPaymentGateway, makeOrdersRouter, makePgOrderRepository, makePlaceOrder } from "./modules/orders/index.ts";

export function compose(deps: { pool: Pool; paymentsUrl: string; send: (message: string) => void }): {
  app: Express;
  drainOutbox: () => Promise<number>;
} {
  const placeOrder = makePlaceOrder({
    orders: makePgOrderRepository(deps.pool),
    payments: makeHttpPaymentGateway(deps.paymentsUrl),
    catalog: makeCatalog(deps.pool),
    clock: { now: () => new Date() },
    ids: { next: () => randomUUID() },
  });
  const notifications = makeNotifications(deps.send);
  const app = express();
  app.use(express.json());
  app.use(makeOrdersRouter(placeOrder));

  // polling relay: at-least-once, section 08 teaches the full outbox
  const drainOutbox = async (): Promise<number> => {
    const client = await deps.pool.connect();
    try {
      await client.query("begin");
      const r = await client.query(
        "select id, type, payload from orders.outbox where published_at is null order by id limit 100 for update skip locked",
      );
      for (const row of r.rows) notifications.handle({ type: row.type, orderId: row.payload.orderId });
      await client.query("update orders.outbox set published_at = now() where id = any($1)", [r.rows.map((x) => x.id)]);
      await client.query("commit");
      return r.rowCount ?? 0;
    } catch (err) {
      await client.query("rollback");
      throw err;
    } finally {
      client.release();
    }
  };
  return { app, drainOutbox };
}
