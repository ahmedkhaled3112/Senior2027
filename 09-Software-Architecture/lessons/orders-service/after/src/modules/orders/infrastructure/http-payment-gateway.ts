// Driven adapter: the only file that knows the payment provider's URL and wire format.
import type { PaymentGateway } from "../application/ports.ts";

export const makeHttpPaymentGateway = (baseUrl: string): PaymentGateway => ({
  async charge(orderId, amount) {
    const res = await fetch(baseUrl + "/charge", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ orderId, amountCents: amount.minor, currency: amount.currency }),
      signal: AbortSignal.timeout(2_000),
    });
    const body = (await res.json()) as { ref?: string; error?: string };
    return res.ok && body.ref ? { ok: true, ref: body.ref } : { ok: false, reason: body.error ?? `http_${res.status}` };
  },
});
