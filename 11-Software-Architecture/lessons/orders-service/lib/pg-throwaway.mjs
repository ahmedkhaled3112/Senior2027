// Throwaway Postgres cluster from the Postgres binaries already installed on this machine.
// Lives in a pgdata-* folder next to this file, listens on a free port on 127.0.0.1, never touches a service on 5432.
// Set PG_BIN if your Postgres binaries aren't in the default Windows folder below.
// Usage: const pg = await startPg(); ...use pg.url...; await pg.stop();
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BIN = process.env.PG_BIN ?? 'C:/Program Files/PostgreSQL/18/bin';
const EXE = process.platform === 'win32' ? '.exe' : '';
const here = path.dirname(fileURLToPath(import.meta.url));

const freePort = () =>
  new Promise((res, rej) => {
    const s = net.createServer();
    s.once('error', rej);
    s.listen(0, '127.0.0.1', () => {
      const { port } = s.address();
      s.close(() => res(port));
    });
  });

export async function startPg({ extraConf = '' } = {}) {
  const dir = mkdtempSync(path.join(here, 'pgdata-'));
  const data = path.join(dir, 'data');
  execFileSync(`${BIN}/initdb${EXE}`, ['-D', data, '-U', 'app', '-A', 'trust', '-E', 'UTF8', '--no-locale'], { stdio: 'ignore' });
  const port = await freePort();
  writeFileSync(
    path.join(data, 'postgresql.auto.conf'),
    `port = ${port}\nlisten_addresses = '127.0.0.1'\nfsync = off\nsynchronous_commit = off\nfull_page_writes = off\nmax_connections = 60\n${extraConf}\n`,
  );
  const server = spawn(`${BIN}/postgres${EXE}`, ['-D', data], { stdio: ['ignore', 'pipe', 'pipe'] });
  let log = '';
  await new Promise((res, rej) => {
    const t = setTimeout(() => rej(new Error('pg did not start: ' + log)), 30000);
    const on = (d) => {
      log += d;
      if (/ready to accept connections/.test(log)) {
        clearTimeout(t);
        res();
      }
    };
    server.stdout.on('data', on);
    server.stderr.on('data', on);
    server.once('exit', (c) => {
      clearTimeout(t);
      rej(new Error('pg exited ' + c + ' ' + log));
    });
  });
  const stop = async () => {
    server.removeAllListeners('exit');
    const gone = new Promise((res) => server.once('exit', res));
    try {
      execFileSync(`${BIN}/pg_ctl${EXE}`, ['-D', data, 'stop', '-m', 'fast', '-w', '-t', '20'], { stdio: 'ignore' });
    } catch {
      server.kill();
    }
    await gone;
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  };
  return { port, url: `postgres://app@127.0.0.1:${port}/postgres`, stop };
}
