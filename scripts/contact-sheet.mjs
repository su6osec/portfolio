/**
 * Composes screenshots into contact sheets so a whole pass can be
 * reviewed in one image. Usage: node scripts/contact-sheet.mjs
 */
import puppeteer from 'puppeteer';
import { stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const shots = path.join(root, 'shots');
const out = path.join(shots, '_sheets');
await (await import('node:fs/promises')).mkdir(out, { recursive: true });

const groups = [
  { name: 'sheet-dark', files: ['hero', 'about', 'experience', 'skills', 'projects', 'bounty', 'certs', 'contact', 'footer'].map((s) => `desktop-dark-${s}.png`) },
  { name: 'sheet-light', files: ['hero', 'about', 'skills', 'projects', 'contact', 'footer'].map((s) => `desktop-light-${s}.png`) },
  { name: 'sheet-mobile', files: ['hero', 'about', 'projects', 'contact', 'footer'].map((s) => `mobile-dark-${s}.png`) },
];

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();

for (const group of groups) {
  const existing = [];
  for (const f of group.files) {
    try {
      await stat(path.join(shots, f));
      existing.push(f);
    } catch {
      /* skip missing */
    }
  }
  if (!existing.length) continue;

  const cols = 3;
  const cells = existing
    .map((f) => {
      const isMobile = f.startsWith('mobile');
      return `<figure class="${isMobile ? 'm' : ''}">
        <img src="file://${path.join(shots, f)}" />
        <figcaption>${f.replace(/\.png$/, '')}</figcaption>
      </figure>`;
    })
    .join('');

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const htmlPath = path.join(out, `${group.name}.html`);
  await writeFile(
    htmlPath,
    `<!doctype html><html><head><meta charset="utf-8"><style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{background:#0b0d11;padding:18px;font:600 13px/1.4 system-ui,sans-serif;color:#cbd5e1}
      .grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:14px}
      figure{border:1px solid rgba(255,255,255,.12);border-radius:8px;overflow:hidden;background:#000}
      img{width:100%;display:block;aspect-ratio:16/10;object-fit:cover;object-position:top}
      figure.m img{aspect-ratio:16/10;object-fit:contain;object-position:top;background:#05060a}
      figcaption{padding:7px 10px;background:#14171d;color:#7dd3a8;font:600 11px/1 ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase}
    </style></head><body><div class="grid">${cells}</div></body></html>`
  );
  await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });
  await page.waitForFunction(
    () => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
    { timeout: 20000 }
  );
  await new Promise((r) => setTimeout(r, 400));
  const file = path.join(out, `${group.name}.jpg`);
  await page.screenshot({ path: file, fullPage: true, type: 'jpeg', quality: 72 });
  console.log(`✓ ${group.name}.png (${existing.length} panels)`);
}

await browser.close();
