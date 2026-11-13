// Driven adapter for tests. Same port, no database.
import { Order } from "../domain/order.ts";
import type { OrderEvent, OrderState } from "../domain/order.ts";
import type { OrderRepository } from "../application/ports.ts";

export const makeInMemoryOrderRepository = (): OrderRepository & { published: OrderEvent[] } => {
  const rows = new Map<string, OrderState>();
  const published: OrderEvent[] = [];
  return {
    published,
    async save(order) {
      const current = rows.get(order.state.id);
      if ((current?.version ?? 0) !== order.state.version) throw new Error(`stale order ${order.state.id}`);
      published.push(...order.pendingEvents);
      rows.set(order.state.id, { ...order.state, version: order.state.version + 1 });
      order.markSaved();
    },
    async findById(id) {
      const s = rows.get(id);
      return s ? Order.rehydrate(s) : null;
    },
  };
};
