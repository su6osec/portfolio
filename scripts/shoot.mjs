import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE || 'http://localhost:4173';
const OUT = 'shots';
const sections = [
  ['hero', 0],
  ['about', '#about'],
  ['experience', '#experience'],
  ['skills', '#skills'],
  ['projects', '#projects'],
  ['bounty', '#bounty'],
  ['certs', '#certifications'],
  ['contact', '#contact'],
  ['footer', '#footer'],
];

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--font-render-hinting=none'] });
const errors = [];

async function shoot({ name, width, height, theme = 'dark', scale = 1 }) {
  const page = await browser.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[${name}] console: ${m.text()}`);
  });
  page.on('pageerror', (e) => errors.push(`[${name}] pageerror: ${e.message}`));
  page.on('requestfailed', (r) => errors.push(`[${name}] 404/fail: ${r.url()}`));

  await page.setViewport({ width, height, deviceScaleFactor: scale });
  await page.evaluateOnNewDocument((t) => {
    localStorage.setItem('su6osec:theme', t);
    sessionStorage.setItem('su6osec:intro-seen', '1');
  }, theme);

  await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 45000 });
  await page.evaluate(() => document.fonts.ready);
  // Let entrance animations settle
  await new Promise((r) => setTimeout(r, 1200));

  for (const [label, target] of sections) {
    if (target === 0) {
      await page.evaluate(() => window.scrollTo(0, 0));
    } else {
      await page.evaluate((sel) => {
        document.querySelector(sel)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, target);
      await page.evaluate(() => window.scrollBy(0, -90));
    }
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: `${OUT}/${name}-${label}.png` });
  }

  // Full page
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });

  await page.close();
}

await shoot({ name: 'desktop-dark', width: 1440, height: 900, theme: 'dark' });
await shoot({ name: 'desktop-light', width: 1440, height: 900, theme: 'light' });
await shoot({ name: 'mobile-dark', width: 390, height: 844, theme: 'dark', scale: 2 });

await browser.close();

if (errors.length) {
  console.log('--- ISSUES ---');
  [...new Set(errors)].forEach((e) => console.log(e));
} else {
  console.log('No console errors, page errors or failed requests.');
}
