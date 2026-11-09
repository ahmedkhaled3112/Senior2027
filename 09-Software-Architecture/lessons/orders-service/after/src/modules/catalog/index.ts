// Catalog module: owns the catalog schema. Public API is this file.
import type { Pool } from "pg";
import { Money } from "../../shared/money.ts";

export const makeCatalog = (pool: Pool) => ({
  async quote(skus: readonly string[]): Promise<ReadonlyMap<string, Money>> {
    const r = await pool.query("select sku, price_minor, currency from catalog.products where sku = any($1)", [skus]);
    return new Map(r.rows.map((row) => [row.sku as string, Money.of(row.price_minor, row.currency)]));
  },
  // one transaction, one atomic update per line: the race in the BEFORE code cannot happen here
  async reserve(lines: readonly { sku: string; qty: number }[]): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query("begin");
      for (const l of lines) {
        const r = await client.query("update catalog.products set stock = stock - $2 where sku = $1 and stock >= $2", [l.sku, l.qty]);
        if (r.rowCount !== 1) {
          await client.query("rollback");
          return false;
        }
      }
      await client.query("commit");
      return true;
    } finally {
      client.release();
    }
  },
  async release(lines: readonly { sku: string; qty: number }[]): Promise<void> {
    for (const l of lines) await pool.query("update catalog.products set stock = stock + $2 where sku = $1", [l.sku, l.qty]);
  },
});
