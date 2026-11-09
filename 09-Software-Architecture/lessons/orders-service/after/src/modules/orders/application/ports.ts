// Driven ports: the core says what it needs, infrastructure provides it.
import type { Money } from "../../../shared/money.ts";
import type { Order } from "../domain/order.ts";

export interface OrderRepository {
  // writes the aggregate and its pending events in one transaction, with a version check
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
}

export type ChargeResult = { ok: true; ref: string } | { ok: false; reason: string };

export interface PaymentGateway {
  charge(orderId: string, amount: Money): Promise<ChargeResult>;
}

export interface Catalog {
  quote(skus: readonly string[]): Promise<ReadonlyMap<string, Money>>;
  // atomic, returns false when stock is short
  reserve(lines: readonly { sku: string; qty: number }[]): Promise<boolean>;
  release(lines: readonly { sku: string; qty: number }[]): Promise<void>;
}

export interface Clock {
  now(): Date;
}

export interface IdGenerator {
  next(): string;
}
