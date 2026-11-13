// The BEFORE: one route knows HTTP, SQL, tax rules, payments and email. Lessons refactor this.
import express from "express";
import type { Express } from "express";
import type { Pool } from "pg";

export function createApp(pool: Pool, paymentsUrl: string): Express {
  const app = express();
  app.use(express.json());

  app.post("/orders", async (req, res) => {
    const { userEmail, lines } = req.body;
    if (!userEmail || !Array.isArray(lines) || lines.length === 0) {
      res.status(400).json({ error: "bad request" });
      return;
    }
    let subtotal = 0;
    for (const l of lines) {
      const r = await pool.query("select price_cents, stock from products where sku = $1", [l.sku]);
      if (r.rowCount === 0) {
        res.status(404).json({ error: "unknown sku " + l.sku });
        return;
      }
      if (r.rows[0].stock < l.qty) {
        res.status(409).json({ error: "out of stock " + l.sku });
        return;
      }
      subtotal += r.rows[0].price_cents * l.qty;
    }
    const tax = Math.round(subtotal * 0.14);
    const shipping = subtotal > 100000 ? 0 : 5000;
    const total = subtotal + tax + shipping;
    const o = await pool.query(
      "insert into orders(user_email, status, subtotal_cents, tax_cents, shipping_cents, total_cents) values ($1,'pending',$2,$3,$4,$5) returning id",
      [userEmail, subtotal, tax, shipping, total],
    );
    const id = o.rows[0].id;
    for (const l of lines) {
      const p = await pool.query("select price_cents from products where sku = $1", [l.sku]);
      await pool.query("insert into order_lines values ($1,$2,$3,$4)", [id, l.sku, l.qty, p.rows[0].price_cents]);
      await pool.query("update products set stock = stock - $1 where sku = $2", [l.qty, l.sku]);
    }
    const pay = await fetch(paymentsUrl + "/charge", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ orderId: id, amountCents: total }),
    });
    if (!pay.ok) {
      await pool.query("update orders set status = 'payment_failed' where id = $1", [id]);
      res.status(402).json({ error: "payment failed", id });
      return;
    }
    await pool.query("update orders set status = 'paid' where id = $1", [id]);
    console.log(`[email] to ${userEmail}: order ${id} confirmed, total ${total}`);
    res.status(201).json({ id, status: "paid", totalCents: total });
  });

  app.get("/orders/:id", async (req, res) => {
    const o = await pool.query("select * from orders where id = $1", [req.params.id]);
    if (o.rowCount === 0) {
      res.status(404).json({ error: "not found" });
      return;
    }
    const lines = await pool.query("select sku, qty, unit_price_cents from order_lines where order_id = $1", [req.params.id]);
    res.json({ ...o.rows[0], lines: lines.rows });
  });
  return app;
}
