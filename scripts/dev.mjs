// `npm run dev` launcher: port comes from PORT in .env.local / .env (e.g. PORT=5173), otherwise 3000.
// Next.js itself does not read PORT from .env files, so it is resolved here and passed as -p.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

for (const f of ['.env.local', '.env']) {
  if (existsSync(f)) { try { process.loadEnvFile(f); } catch { /* ignore unreadable env file */ } }
}

const port = /^\d+$/.test(process.env.PORT ?? '') ? process.env.PORT : '3000';
const args = ['next', 'dev', '-p', port, ...process.argv.slice(2)];
const child = spawn('npx', args, { stdio: 'inherit', shell: true, env: { ...process.env, PORT: port } });
child.on('exit', (code) => process.exit(code ?? 0));
