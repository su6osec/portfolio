/**
 * Keeps the Content-Security-Policy in vercel.json in sync with the inline
 * scripts actually present in the build.
 *
 * The JSON-LD block has to stay inline (search engines won't follow it from an
 * external file), and `script-src 'self'` alone would block it. Rather than
 * loosening the policy with 'unsafe-inline', we hash whatever Vite emitted and
 * write the digest straight back into vercel.json.
 *
 * Runs automatically via the `postbuild` npm script.
 */
import { readFile, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist', 'index.html');
const cspPath = path.join(root, 'vercel.json');

try {
  await access(htmlPath);
} catch {
  console.log('csp-hash: no dist/index.html yet — run `vite build` first.');
  process.exit(0);
}

const html = await readFile(htmlPath, 'utf8');

const digests = [];
for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
  const [, attrs, body] = m;
  if (/\bsrc\s*=/.test(attrs)) continue;
  if (!body.trim()) continue;
  digests.push(
    `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`
  );
}

if (!digests.length) {
  console.log('csp-hash: no inline scripts found.');
  process.exit(0);
}

const csp = JSON.parse(await readFile(cspPath, 'utf8'));
const rule = csp.headers
  .flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy');

if (!rule) {
  console.error('csp-hash: no Content-Security-Policy header in vercel.json');
  process.exit(1);
}

// Drop any digests from a previous build, then append the current ones.
const next = rule.value
  .replace(/ ?'sha256-[A-Za-z0-9+/=]+'/g, '')
  .replace(/(script-src [^;]*)/, (src) => `${src} ${digests.join(' ')}`)
  .replace(/  +/g, ' ')
  .trim();

rule.value = next;
await writeFile(cspPath, `${JSON.stringify(csp, null, 2)}\n`);

console.log(`csp-hash: allowed ${digests.length} inline script(s)`);
