// Aggregate root. No SQL, no HTTP, no imports from outside domain and shared.
import { Money } from "../../../shared/money.ts";

export type OrderStatus = "placed" | "paid" | "payment_failed" | "cancelled" | "shipped";

export interface OrderLine {
  readonly sku: string;
  readonly qty: number;
  readonly unitPrice: Money;
}

export type OrderEvent =
  | { readonly type: "OrderPlaced"; readonly orderId: string; readonly totalMinor: number; readonly currency: string; readonly at: string }
  | { readonly type: "OrderPaid"; readonly orderId: string; readonly paymentRef: string; readonly at: string }
  | { readonly type: "OrderPaymentFailed"; readonly orderId: string; readonly reason: string; readonly at: string };

export class OrderRuleViolation extends Error {
  readonly rule: string;
  constructor(rule: string, message: string) {
    super(message);
    this.name = "OrderRuleViolation";
    this.rule = rule;
  }
}

const VAT_PERCENT = 14;
const FREE_SHIPPING_FROM_MINOR = 100_000;
const SHIPPING_MINOR = 5_000;

export interface OrderState {
  readonly id: string;
  readonly customerEmail: string;
  readonly lines: readonly OrderLine[];
  readonly status: OrderStatus;
  readonly subtotal: Money;
  readonly tax: Money;
  readonly shipping: Money;
  readonly total: Money;
  readonly version: number;
  readonly placedAt: Date;
}

export class Order {
  #state: OrderState;
  #events: OrderEvent[] = [];

  private constructor(state: OrderState) {
    this.#state = state;
  }

  static place(input: { id: string; customerEmail: string; lines: readonly OrderLine[]; now: Date }): Order {
    const first = input.lines[0];
    if (!first) throw new OrderRuleViolation("at-least-one-line", "an order needs at least one line");
    let subtotal = Money.of(0, first.unitPrice.currency);
    for (const line of input.lines) {
      if (!Number.isInteger(line.qty) || line.qty <= 0) throw new OrderRuleViolation("positive-qty", `bad qty ${line.qty} for ${line.sku}`);
      subtotal = subtotal.add(line.unitPrice.times(line.qty));
    }
    const tax = subtotal.percent(VAT_PERCENT);
    const shipping = Money.of(subtotal.minor > FREE_SHIPPING_FROM_MINOR ? 0 : SHIPPING_MINOR, subtotal.currency);
    const total = subtotal.add(tax).add(shipping);
    const order = new Order({ id: input.id, customerEmail: input.customerEmail, lines: input.lines, status: "placed", subtotal, tax, shipping, total, version: 0, placedAt: input.now });
    order.#events.push({ type: "OrderPlaced", orderId: input.id, totalMinor: total.minor, currency: total.currency, at: input.now.toISOString() });
    return order;
  }

  static rehydrate(state: OrderState): Order {
    return new Order(state);
  }

  get state(): OrderState {
    return this.#state;
  }

  markPaid(paymentRef: string, now: Date): void {
    if (this.#state.status !== "placed") throw new OrderRuleViolation("pay-only-placed", `cannot pay an order in status ${this.#state.status}`);
    this.#state = { ...this.#state, status: "paid" };
    this.#events.push({ type: "OrderPaid", orderId: this.#state.id, paymentRef, at: now.toISOString() });
  }

  markPaymentFailed(reason: string, now: Date): void {
    if (this.#state.status !== "placed") throw new OrderRuleViolation("fail-only-placed", `cannot fail payment in status ${this.#state.status}`);
    this.#state = { ...this.#state, status: "payment_failed" };
    this.#events.push({ type: "OrderPaymentFailed", orderId: this.#state.id, reason, at: now.toISOString() });
  }

  get pendingEvents(): readonly OrderEvent[] {
    return this.#events;
  }

  // the repository calls this only after its transaction commits, so a failed save loses nothing
  markSaved(): void {
    this.#state = { ...this.#state, version: this.#state.version + 1 };
    this.#events = [];
  }
}
