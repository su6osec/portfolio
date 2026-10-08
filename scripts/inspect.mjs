/**
 * Targeted close-ups for design review: header, hovered CTAs (to see the
 * cursor caption), and phone viewports. Usage: node scripts/inspect.mjs
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE || 'http://localhost:4173';
const OUT = 'shots/inspect';
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--font-render-hinting=none'] });
const errors = [];

/* ---------- Desktop: header + hovered CTA ---------- */
const page = await browser.newPage();
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.evaluateOnNewDocument(() => sessionStorage.setItem('su6osec:intro-seen', '1'));
await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 45000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1600));

await page.screenshot({ path: `${OUT}/header.png`, clip: { x: 0, y: 0, width: 1440, height: 84 } });
await page.screenshot({ path: `${OUT}/hero.png`, clip: { x: 0, y: 84, width: 1440, height: 780 } });

// Park the pointer on the hero primary CTA so the caption state renders.
const btn = await page.$('.hero__cta .btn--primary');
const box = await btn.boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({
  path: `${OUT}/cta-hover.png`,
  clip: { x: 110, y: Math.max(0, box.y - 60), width: 780, height: 240 },
});

// Icon-only button near the right edge: caption must mirror inboard.
const gh = await page.$('.hero__cta .btn--icon');
const gb = await gh.boundingBox();
await page.mouse.move(gb.x + gb.width / 2, gb.y + gb.height / 2, { steps: 10 });
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({
  path: `${OUT}/cta-hover-icon.png`,
  clip: { x: Math.max(0, gb.x - 260), y: Math.max(0, gb.y - 70), width: 420, height: 220 },
});

await page.close();

/* ---------- Phone ---------- */
const m = await browser.newPage();
m.on('console', (e) => e.type() === 'error' && errors.push(`[mobile] ${e.text()}`));
m.on('pageerror', (e) => errors.push(`[mobile] pageerror: ${e.message}`));
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await m.evaluateOnNewDocument(() => sessionStorage.setItem('su6osec:intro-seen', '1'));
await m.goto(BASE, { waitUntil: 'networkidle0', timeout: 45000 });
await m.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1600));

const phone = [
  ['phone-hero', null],
  ['phone-about', '#about'],
  ['phone-projects', '#projects'],
  ['phone-bounty', '#bounty'],
  ['phone-contact', '#contact'],
  ['phone-footer', '#footer'],
];

const health = await m.evaluate(() => ({
  scrollW: document.documentElement.scrollWidth,
  innerW: innerWidth,
  offenders: [...document.querySelectorAll('body *')]
    .filter((el) => el.getBoundingClientRect().right > innerWidth + 1)
    .filter((el) => !el.matches('.grain, .marquee__track, .hero__glow, .hero__canvas'))
    .slice(0, 8)
    .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} r=${Math.round(el.getBoundingClientRect().right)}`),
}));

for (const [name, sel] of phone) {
  if (sel) {
    await m.evaluate((s) => {
      document.querySelector(s)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.scrollBy(0, -76);
    }, sel);
    await new Promise((r) => setTimeout(r, 900));
  } else {
    await m.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 700));
  }
  await m.screenshot({ path: `${OUT}/${name}.png` });
}

// Mobile menu open.
await m.evaluate(() => window.scrollTo(0, 0));
await m.evaluate(() => document.querySelector('[aria-label="Open menu"]')?.click());
await new Promise((r) => setTimeout(r, 800));
await m.screenshot({ path: `${OUT}/phone-menu.png` });

await m.close();
console.log(
  `phone 390: scrollW=${health.scrollW} innerW=${health.innerW} ${
    health.scrollW > health.innerW ? 'H-OVERFLOW' : 'ok'
  }${health.offenders.length ? ` (${health.offenders.slice(0, 3).join(' | ')})` : ''}`
);

/* ---------- Overflow sweep across breakpoints ---------- */
const sweep = await browser.newPage();
await sweep.evaluateOnNewDocument(() => sessionStorage.setItem('su6osec:intro-seen', '1'));
const widths = [320, 360, 390, 414, 430, 600, 768, 1024, 1280, 1440, 1920];
const rows = [];
for (const w of widths) {
  await sweep.setViewport({ width: w, height: w < 700 ? 780 : 900, isMobile: w < 700, hasTouch: w < 700 });
  await sweep.goto(BASE, { waitUntil: 'networkidle0', timeout: 45000 });
  await new Promise((r) => setTimeout(r, 500));
  const res = await sweep.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    inner: window.innerWidth,
    bad: [...document.querySelectorAll('body *')]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .filter((el) => {
        const s = getComputedStyle(el);
        return s.position !== 'fixed' && !el.closest('.marquee, .ticker, .grain');
      })
      .slice(0, 4)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}`),
  }));
  rows.push(`${String(w).padStart(4)}px → scroll=${res.scroll} ${res.scroll > res.inner + 1 ? 'OVERFLOW ' + res.bad.join(',') : 'ok'}`);
}
await sweep.close();
await browser.close();

console.log(rows.join('\n'));
console.log(errors.length ? `ISSUES: ${[...new Set(errors)].join(' | ')}` : 'No console errors or page errors.');
