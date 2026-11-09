// Use case: orchestration only. Rules live in the aggregate, I/O behind ports.
import { Order } from "../domain/order.ts";
import type { Catalog, Clock, IdGenerator, OrderRepository, PaymentGateway } from "./ports.ts";

export interface PlaceOrderCommand {
  customerEmail: string;
  lines: readonly { sku: string; qty: number }[];
}

export type PlaceOrderResult =
  | { kind: "paid"; orderId: string; totalMinor: number }
  | { kind: "payment_failed"; orderId: string; reason: string }
  | { kind: "unknown_sku"; sku: string }
  | { kind: "out_of_stock" };

export interface PlaceOrderDeps {
  orders: OrderRepository;
  payments: PaymentGateway;
  catalog: Catalog;
  clock: Clock;
  ids: IdGenerator;
}

export const makePlaceOrder =
  ({ orders, payments, catalog, clock, ids }: PlaceOrderDeps) =>
  async (cmd: PlaceOrderCommand): Promise<PlaceOrderResult> => {
    const prices = await catalog.quote(cmd.lines.map((l) => l.sku));
    const lines = [];
    for (const l of cmd.lines) {
      const unitPrice = prices.get(l.sku);
      if (!unitPrice) return { kind: "unknown_sku", sku: l.sku };
      lines.push({ sku: l.sku, qty: l.qty, unitPrice });
    }
    // invariants run before anything is written
    const order = Order.place({ id: ids.next(), customerEmail: cmd.customerEmail, lines, now: clock.now() });
    if (!(await catalog.reserve(cmd.lines))) return { kind: "out_of_stock" };
    await orders.save(order);

    const charge = await payments.charge(order.state.id, order.state.total);
    if (charge.ok) {
      order.markPaid(charge.ref, clock.now());
      await orders.save(order);
      return { kind: "paid", orderId: order.state.id, totalMinor: order.state.total.minor };
    }
    order.markPaymentFailed(charge.reason, clock.now());
    await orders.save(order);
    await catalog.release(cmd.lines);
    return { kind: "payment_failed", orderId: order.state.id, reason: charge.reason };
  };
