// Driven adapter: maps the aggregate to rows, writes events to the outbox in the same transaction.
import type { Pool } from "pg";
import { Money } from "../../../shared/money.ts";
import { Order } from "../domain/order.ts";
import type { OrderStatus } from "../domain/order.ts";
import type { OrderRepository } from "../application/ports.ts";

export class StaleOrderError extends Error {
  constructor(id: string) {
    super(`order ${id} was changed by someone else`);
    this.name = "StaleOrderError";
  }
}

export const makePgOrderRepository = (pool: Pool): OrderRepository => ({
  async save(order) {
    const s = order.state;
    const client = await pool.connect();
    try {
      await client.query("begin");
      if (s.version === 0) {
        await client.query(
          "insert into orders.orders (id, customer_email, status, currency, subtotal_minor, tax_minor, shipping_minor, total_minor, version, placed_at) values ($1,$2,$3,$4,$5,$6,$7,$8,1,$9)",
          [s.id, s.customerEmail, s.status, s.total.currency, s.subtotal.minor, s.tax.minor, s.shipping.minor, s.total.minor, s.placedAt],
        );
        for (const l of s.lines) {
          await client.query("insert into orders.order_lines values ($1,$2,$3,$4)", [s.id, l.sku, l.qty, l.unitPrice.minor]);
        }
      } else {
        const r = await client.query("update orders.orders set status = $2, version = version + 1 where id = $1 and version = $3", [s.id, s.status, s.version]);
        if (r.rowCount !== 1) throw new StaleOrderError(s.id);
      }
      for (const e of order.pendingEvents) {
        await client.query("insert into orders.outbox (type, payload, occurred_at) values ($1,$2,$3)", [e.type, JSON.stringify(e), e.at]);
      }
      await client.query("commit");
    } catch (err) {
      await client.query("rollback");
      throw err;
    } finally {
      client.release();
    }
    order.markSaved();
  },
  async findById(id) {
    const o = await pool.query("select * from orders.orders where id = $1", [id]);
    const row = o.rows[0];
    if (!row) return null;
    const lines = await pool.query("select sku, qty, unit_price_minor from orders.order_lines where order_id = $1", [id]);
    const money = (minor: number) => Money.of(minor, row.currency);
    return Order.rehydrate({
      id: row.id,
      customerEmail: row.customer_email,
      status: row.status as OrderStatus,
      lines: lines.rows.map((l) => ({ sku: l.sku, qty: l.qty, unitPrice: money(l.unit_price_minor) })),
      subtotal: money(row.subtotal_minor),
      tax: money(row.tax_minor),
      shipping: money(row.shipping_minor),
      total: money(row.total_minor),
      version: row.version,
      placedAt: row.placed_at,
    });
  },
});
