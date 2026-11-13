// Driving adapter: shape validation and HTTP mapping, nothing else.
import { Router } from "express";
import { z } from "zod";
import { OrderRuleViolation } from "../domain/order.ts";
import type { PlaceOrderCommand, PlaceOrderResult } from "../application/place-order.ts";

const PlaceOrderBody = z.object({
  customerEmail: z.email(),
  lines: z.array(z.object({ sku: z.string().min(1), qty: z.number() })).min(1),
});

const statusOf: Record<PlaceOrderResult["kind"], number> = { paid: 201, payment_failed: 402, unknown_sku: 404, out_of_stock: 409 };

export const makeOrdersRouter = (placeOrder: (cmd: PlaceOrderCommand) => Promise<PlaceOrderResult>): Router => {
  const router = Router();
  router.post("/orders", async (req, res) => {
    const parsed = PlaceOrderBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "bad_request", issues: parsed.error.issues.map((i) => i.path.join(".")) });
      return;
    }
    try {
      const result = await placeOrder(parsed.data);
      res.status(statusOf[result.kind]).json(result);
    } catch (err) {
      if (err instanceof OrderRuleViolation) {
        res.status(422).json({ error: err.rule, message: err.message });
        return;
      }
      throw err;
    }
  });
  return router;
};
