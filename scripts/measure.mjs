/** Numeric alignment probe: logo, hero buttons, and section heads. */
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE || 'http://localhost:4173';
const OUT = 'shots/inspect';
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 4 });
await page.evaluateOnNewDocument(() => sessionStorage.setItem('su6osec:intro-seen', '1'));
await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 45000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1500));

const report = await page.evaluate(() => {
  const out = [];
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  };
  const fmt = (o) =>
    `x=${o.x.toFixed(1)} y=${o.y.toFixed(1)} w=${o.w.toFixed(1)} h=${o.h.toFixed(1)}`;
  const mid = (b) => b.y + b.h / 2;

  // --- logo ---
  const mark = document.querySelector('.nav__mark');
  const word = mark?.nextElementSibling;
  if (mark && word) {
    const bm = box(mark);
    const bw = box(word);
    out.push(`logo mark ${JSON.stringify(bm)} mid=${mid(bm)}`);
    out.push(`logo word ${JSON.stringify(bw)} mid=${mid(bw)}  deltaMid=${(mid(bm) - mid(bw)).toFixed(1)}`);
    out.push(`logo mark font-size=${getComputedStyle(mark).fontSize} word font-size=${getComputedStyle(word).fontSize}`);
    out.push(`gap=${getComputedStyle(mark.parentElement).gap}`);
    // mark glyph metrics
    const mr = document.createRange();
    mr.selectNodeContents(mark);
    const rg = mr.getBoundingClientRect();
    out.push(`mark glyph ${JSON.stringify({ y: +rg.y.toFixed(1), h: +rg.height.toFixed(1) })} glyphMid=${mid({ y: rg.y, h: rg.height })}`);
  }

  // --- buttons ---
  for (const sel of ['.hero__cta .btn--primary', '.hero__cta .btn--ghost']) {
    const btn = document.querySelector(sel);
    if (!btn) continue;
    const bb = box(btn);
    const icon = btn.querySelector('svg');
    const swap = btn.querySelector('.btn__swap') || btn.childNodes[btn.childNodes.length - 1];
    const ib = icon ? box(icon) : null;
    const sb = swap ? box(swap) : null;
    // text ink box of first line inside swap
    let tb = null;
    const textNode = swap?.querySelector('span') || null;
    if (textNode) {
      const r = document.createRange();
      r.selectNodeContents(textNode);
      const tr = r.getBoundingClientRect();
      tb = { y: tr.y, h: tr.height };
    }
    out.push(`${sel} btn=${JSON.stringify(bb)} mid=${mid(bb)}`);
    if (ib) out.push(`   icon ${JSON.stringify(ib)} mid=${mid(ib)} deltaFromBtn=${(mid(ib) - mid(bb)).toFixed(1)}`);
    if (sb) out.push(`   swap ${JSON.stringify(sb)} mid=${mid(sb)} deltaFromBtn=${(mid(sb) - mid(bb)).toFixed(1)}`);
    if (tb) out.push(`   text ${JSON.stringify(tb)} mid=${mid(tb)} deltaFromBtn=${(mid(tb) - mid(bb)).toFixed(1)}`);
    if (ib && tb) out.push(`   ICON-vs-TEXT mid delta = ${(mid(ib) - mid(tb)).toFixed(2)}px`);
    out.push(`   align-items=${getComputedStyle(btn).alignItems} gap=${getComputedStyle(btn).gap} font=${getComputedStyle(btn).fontSize}`);
    const inner = btn.querySelector('.btn__swap > span');
    if (inner) {
      const ic = getComputedStyle(inner);
      const ir = inner.getBoundingClientRect();
      out.push(
        `   span rect y=${ir.y.toFixed(2)} h=${ir.height.toFixed(2)} offsetH=${inner.offsetHeight} lineH=${ic.lineHeight} font=${ic.fontSize} fontFam=${ic.fontFamily.split(',')[0]}`
      );
      out.push(`   btn line-height=${getComputedStyle(btn).lineHeight} swap lineH=${swap ? getComputedStyle(swap).lineHeight : 'n/a'}`);
    }
  }

  // --- hero name ---
  const name = document.querySelector('.hero__title, .hero h1');
  if (name) out.push(`hero h1 font-family=${getComputedStyle(name).fontFamily}`);
  return out;
});

console.log(report.join('\n'));

// zoomed crops
await page.screenshot({ path: `${OUT}/zoom-logo.png`, clip: { x: 60, y: 8, width: 340, height: 64 } });
const btn = await page.$('.hero__cta .btn--primary');
const b = await btn.boundingBox();
await page.screenshot({
  path: `${OUT}/zoom-btn.png`,
  clip: { x: b.x - 40, y: b.y - 40, width: b.width + 400, height: b.height + 80 },
});

await browser.close();
console.log('wrote zoom-logo.png, zoom-btn.png');
