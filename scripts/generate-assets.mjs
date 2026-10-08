/**
 * Generates the static brand assets that can't be hand-authored:
 *   public/favicon-32.png      32×32   round, transparent corners
 *   public/favicon-192.png     192×192 round (PWA)
 *   public/apple-touch-icon.png 180×180 round
 *   public/og.png              1200×630 social share card
 *
 * Usage: npm run og
 */
import puppeteer from 'puppeteer';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const pub = path.join(root, 'public');

const svg = await readFile(path.join(pub, 'favicon.svg'), 'utf8');

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--font-render-hinting=none'] });

/* ---------- 1. Round PNG icons ---------- */

const iconPage = await browser.newPage();

for (const [file, size] of [
  ['favicon-32.png', 32],
  ['favicon-192.png', 192],
  ['apple-touch-icon.png', 180],
]) {
  await iconPage.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await iconPage.setContent(
    `<!doctype html><html><head><style>
       html,body{margin:0;padding:0;width:${size}px;height:${size}px;overflow:hidden;background:transparent}
       svg{display:block;width:${size}px;height:${size}px}
     </style></head><body>${svg}</body></html>`,
    { waitUntil: 'load' }
  );
  await iconPage.screenshot({
    path: path.join(pub, file),
    omitBackground: true,
    clip: { x: 0, y: 0, width: size, height: size },
  });
  console.log(`✓ ${file} (${size}×${size})`);
}

await iconPage.close();

/* ---------- 2. Open Graph card ---------- */

const ogPage = await browser.newPage();
await ogPage.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

/* Inline the brand face as data URLs: the card then renders identically
   whether or not the network is up, and nothing is fetched mid-capture. */
const b64 = async (file) => (await readFile(path.join(pub, 'fonts', file))).toString('base64');
const ogHtml = (await readFile(path.join(here, 'og.html'), 'utf8'))
  .replace('__CLASH_600__', await b64('ClashDisplay-600.woff2'))
  .replace('__CLASH_700__', await b64('ClashDisplay-700.woff2'));

await ogPage.setContent(ogHtml, { waitUntil: 'networkidle0' });
await ogPage.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 800));
await ogPage.screenshot({ path: path.join(pub, 'og.png'), clip: { x: 0, y: 0, width: 1200, height: 630 } });
console.log('✓ og.png (1200×630 @2x)');

await ogPage.close();
await browser.close();
