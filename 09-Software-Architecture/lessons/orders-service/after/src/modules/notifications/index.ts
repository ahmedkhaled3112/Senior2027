// Notifications module: reacts to integration events. It knows no other module's internals.
export interface IntegrationEvent {
  type: string;
  orderId: string;
}

export const makeNotifications = (send: (message: string) => void) => ({
  handle(event: IntegrationEvent): void {
    if (event.type === "OrderPaid") send(`order ${event.orderId} confirmed`);
  },
});
