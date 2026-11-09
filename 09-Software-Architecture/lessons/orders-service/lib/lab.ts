// Starts a throwaway Postgres and a fake payment provider on free ports. Always call stop().
import { readFileSync } from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { startPg } from "./pg-throwaway.mjs";

export interface Lab {
  pool: pg.Pool;
  pgUrl: string;
  paymentsUrl: string;
  setDecline(v: boolean): void;
  charges(): number;
  stop(): Promise<void>;
}

export async function startLab(schemaUrl: URL): Promise<Lab> {
  const s = await startPg();
  // An empty or default port would reach the machine's real service, so refuse it.
  const n = Number(s.port);
  if (!/^\d+$/.test(String(s.port)) || n < 1024 || n > 65535 || [27017, 5432, 6379].includes(n)) throw new Error("refusing port " + s.port);
  const pool = new pg.Pool({ connectionString: s.url, max: 10 });
  await pool.query(readFileSync(fileURLToPath(schemaUrl), "utf8"));
  let decline = false;
  let charges = 0;
  const payments = http.createServer((req, res) => {
    req.resume();
    req.on("end", () => {
      charges++;
      res.statusCode = decline ? 402 : 200;
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify(decline ? { error: "card_declined" } : { ref: "ch_" + charges }));
    });
  });
  await new Promise<void>((r) => payments.listen(0, "127.0.0.1", r));
  const paymentsUrl = `http://127.0.0.1:${(payments.address() as AddressInfo).port}`;
  return {
    pool,
    pgUrl: s.url,
    paymentsUrl,
    setDecline: (v) => {
      decline = v;
    },
    charges: () => charges,
    stop: async () => {
      payments.closeAllConnections();
      await new Promise((r) => payments.close(r));
      await pool.end();
      await s.stop();
    },
  };
}

export async function listen(app: {
  listen: (port: number, host: string, cb: () => void) => http.Server;
}): Promise<{ url: string; close(): Promise<void> }> {
  const server = await new Promise<http.Server>((res) => {
    const s = app.listen(0, "127.0.0.1", () => res(s));
  });
  return {
    url: `http://127.0.0.1:${(server.address() as AddressInfo).port}`,
    close: () =>
      new Promise((r) => {
        server.closeAllConnections();
        server.close(() => r());
      }),
  };
}
