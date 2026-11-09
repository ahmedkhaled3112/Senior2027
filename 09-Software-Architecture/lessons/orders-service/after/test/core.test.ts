// The core runs with no database, no HTTP and no framework.
import assert from "node:assert/strict";
import { test } from "node:test";
import { Money } from "../src/shared/money.ts";
import { Order, OrderRuleViolation } from "../src/modules/orders/domain/order.ts";
import { makePlaceOrder } from "../src/modules/orders/application/place-order.ts";
import type { Catalog, ChargeResult } from "../src/modules/orders/application/ports.ts";
import { makeInMemoryOrderRepository } from "../src/modules/orders/infrastructure/in-memory-order-repository.ts";

const egp = (minor: number) => Money.of(minor, "EGP");
const now = new Date("2026-11-04T10:00:00Z");

const fixtures = (charge: ChargeResult) => {
  let stock = 1;
  const catalog: Catalog = {
    quote: async () => new Map([["SKU-LAMP", egp(120_000)]]),
    reserve: async (lines) => {
      const qty = lines.reduce((n, l) => n + l.qty, 0);
      if (qty > stock) return false;
      stock -= qty;
      return true;
    },
    release: async (lines) => {
      stock += lines.reduce((n, l) => n + l.qty, 0);
    },
  };
  const orders = makeInMemoryOrderRepository();
  let n = 0;
  const placeOrder = makePlaceOrder({
    orders,
    catalog,
    payments: { charge: async () => charge },
    clock: { now: () => now },
    ids: { next: () => `order-${++n}` },
  });
  return { placeOrder, orders, stock: () => stock };
};

test("totals: 14% VAT and free shipping above the threshold", () => {
  const { total, tax, shipping } = Order.place({ id: "o1", customerEmail: "a@b.co", lines: [{ sku: "S", qty: 1, unitPrice: egp(120_000) }], now }).state;
  assert.deepEqual([tax.minor, shipping.minor, total.minor], [16_800, 0, 136_800]);
});

test("invariant: a negative quantity never becomes an order", () => {
  assert.throws(() => Order.place({ id: "o1", customerEmail: "a@b.co", lines: [{ sku: "S", qty: -5, unitPrice: egp(100) }], now }), OrderRuleViolation);
});

test("invariant: a paid order cannot fail payment", () => {
  const order = Order.place({ id: "o1", customerEmail: "a@b.co", lines: [{ sku: "S", qty: 1, unitPrice: egp(100) }], now });
  order.markPaid("ch_1", now);
  assert.throws(() => order.markPaymentFailed("late", now), OrderRuleViolation);
});

test("use case: a declined card returns the stock and emits the failure", async () => {
  const f = fixtures({ ok: false, reason: "card_declined" });
  const result = await f.placeOrder({ customerEmail: "a@b.co", lines: [{ sku: "SKU-LAMP", qty: 1 }] });
  assert.equal(result.kind, "payment_failed");
  assert.equal(f.stock(), 1);
  assert.deepEqual(f.orders.published.map((e) => e.type), ["OrderPlaced", "OrderPaymentFailed"]);
});

test("use case: the second buyer of the last lamp gets out_of_stock", async () => {
  const f = fixtures({ ok: true, ref: "ch_1" });
  const [a, b] = await Promise.all([
    f.placeOrder({ customerEmail: "a@b.co", lines: [{ sku: "SKU-LAMP", qty: 1 }] }),
    f.placeOrder({ customerEmail: "c@d.co", lines: [{ sku: "SKU-LAMP", qty: 1 }] }),
  ]);
  assert.deepEqual([a?.kind, b?.kind].sort(), ["out_of_stock", "paid"]);
});
