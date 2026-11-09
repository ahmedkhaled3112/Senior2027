// Public API of the orders module. Other modules and the composition root import only this file.
export { makePlaceOrder } from "./application/place-order.ts";
export type { PlaceOrderCommand, PlaceOrderResult } from "./application/place-order.ts";
export type { Catalog, Clock, IdGenerator, PaymentGateway, OrderRepository } from "./application/ports.ts";
export { makePgOrderRepository } from "./infrastructure/pg-order-repository.ts";
export { makeHttpPaymentGateway } from "./infrastructure/http-payment-gateway.ts";
export { makeOrdersRouter } from "./presentation/http.ts";
