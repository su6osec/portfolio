/**
 * Local verification pass.
 *
 * Serves `dist/` over HTTP with the exact security headers from vercel.json so
 * the Content-Security-Policy is genuinely exercised — a plain `vite preview`
 * silently skips them, which is how a blocked JSON-LD block would slip through.
 *
 * Usage: npm run build && npm run verify
 */
import http from 'node:http';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const PORT = Number(process.env.PORT || 4179);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};

/* ---------- 1. Static server wearing vercel.json's headers ---------- */

const vercel = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
const globalHeaders = vercel.headers.find((h) => h.source === '/(.*)').headers;

const server = http.createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(dist, url === '/' ? 'index.html' : url);

  try {
    if (!file.startsWith(dist)) throw new Error('outside dist');
    await access(file);
  } catch {
    file = path.join(dist, 'index.html'); // SPA fallback
  }

  try {
    const body = await readFile(file);
    for (const h of globalHeaders) res.setHeader(h.key, h.value);
    res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
    res.end(body);
  } catch (e) {
    res.statusCode = 500;
    res.end(String(e));
  }
});

await new Promise((r) => server.listen(PORT, r));
const BASE = `http://localhost:${PORT}`;

/* ---------- 2. Crawl it the way a browser would ---------- */

const fail = [];
const ok = [];
const check = (cond, msg) => (cond ? ok : fail).push(msg);

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--font-render-hinting=none'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const consoleErrors = [];
const failedRequests = [];
const cspViolations = [];

page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
page.on('requestfailed', (r) => failedRequests.push(r.url()));
await page.evaluateOnNewDocument(() => {
  document.addEventListener('securitypolicyviolation', (e) => {
    window.__csp = [...(window.__csp || []), `${e.violatedDirective} → ${e.blockedURI}`];
  });
  sessionStorage.setItem('su6osec:intro-seen', '1');
});

await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 45000 });
await page.evaluate(() => document.fonts.ready);
// Issuer logos are loading="lazy" and sit several screens down, so they are
// not even requested until the section nears the viewport — scroll there
// first or the "logos painted" check would read a false negative.
await page.evaluate(() =>
  document.getElementById('certifications')?.scrollIntoView({ block: 'center' })
);
await new Promise((r) => setTimeout(r, 900));
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 2200));

const audit = await page.evaluate(() => {
  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')];
  let parsed = null;
  try {
    parsed = JSON.parse(jsonld[0]?.textContent || 'null');
  } catch (e) {
    parsed = `PARSE ERROR: ${e.message}`;
  }
  return {
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.content || '',
    canonical: document.querySelector('link[rel="canonical"]')?.href || '',
    ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
    ogImageVisible: !!document.querySelector('meta[property="og:image"]'),
    jsonldCount: jsonld.length,
    jsonldType: parsed?.['@graph']?.[0]?.['@type'] || parsed?.['@type'] || null,
    csp: window.__csp || [],
    backdrop: getComputedStyle(document.querySelector('.nav') || document.body).backdropFilter,
    projects: [...document.querySelectorAll('.project-card')].map(
      (c) => c.querySelector('h3, .project-card__title')?.textContent?.trim()
    ),
    // Deep-search the JSON-LD graph for the credential array rather than
    // hardcoding its nesting depth — restructuring the schema shouldn't
    // silently drop this from the audit.
    jsonldCreds: (() => {
      const walk = (node) => {
        if (!node || typeof node !== 'object') return null;
        if (Array.isArray(node.hasCredential)) return node.hasCredential;
        for (const v of Object.values(node)) {
          const hit = walk(v);
          if (hit) return hit;
        }
        return null;
      };
      return walk(parsed)?.length ?? 0;
    })(),
    certs: {
      cards: document.querySelectorAll('.cert-card').length,
      tiers: document.querySelectorAll('.cert-tier').length,
      emptyTiers: [...document.querySelectorAll('.cert-tier')].filter(
        (t) => !t.querySelector('.cert-card')
      ).length,
      // Every credential must advertise skills — that was the whole point
      // of researching the issuing platform's catalogue.
      skills: document.querySelectorAll('.cert-card__skills li').length,
      cardNoSkills: [...document.querySelectorAll('.cert-card')].filter(
        (c) => !c.querySelector('.cert-card__skills li')
      ).length,
      // Issuer logos must be bundled locally: CSP img-src is 'self' data:
      // blob:, so a hotlinked logo would silently fail to paint.
      logos: [...document.querySelectorAll('.cert-card__logo img')].map((i) => ({
        src: i.getAttribute('src') || '',
        painted: i.complete && i.naturalWidth > 0,
      })),
      links: [...document.querySelectorAll('.cert-card__foot a')].map((a) => ({
        href: a.href,
        target: a.getAttribute('target'),
        rel: a.getAttribute('rel') || '',
      })),
    },
    footerId: !!document.getElementById('footer'),
    railItems: document.querySelectorAll('.rail__item').length,
    sections: [...document.querySelectorAll('section.section')].length,
    h1: document.querySelectorAll('h1').length,
    // A decorative image correctly carries alt="" (empty, not absent) —
    // testing truthiness would fail those. What matters is the attribute
    // existing at all, so screen readers can decide what to skip.
    imgsNoAlt: [...document.querySelectorAll('img')].filter(
      (i) => !i.hasAttribute('alt')
    ).length,
    imgsDecoBad: [...document.querySelectorAll('img')]
      .filter((i) => i.alt === '')
      .filter((i) => {
        if (i.closest('[aria-hidden="true"]')) return false;
        const named = i.closest('[aria-label], [aria-labelledby]');
        if (named) return false;
        const wrapper = i.closest('a, button');
        if (wrapper && (wrapper.getAttribute('aria-label') || wrapper.textContent.trim()))
          return false;
        return true;
      }).length,
    lang: document.documentElement.lang,
    themeToggle: !!document.querySelector('[aria-label*="theme" i], [aria-label*="mode" i]'),
  };
});

check(consoleErrors.length === 0, `console/page errors: ${consoleErrors.join(' | ') || 'none'}`);
check(failedRequests.length === 0, `failed requests: ${failedRequests.join(' | ') || 'none'}`);
check(audit.csp.length === 0, `CSP violations: ${audit.csp.join(' | ') || 'none'}`);
check(audit.jsonldCount === 1, `JSON-LD blocks: ${audit.jsonldCount}`);
check(!String(audit.jsonldType).startsWith('PARSE'), `JSON-LD parses → ${audit.jsonldType}`);
check(!!audit.title, `title: "${audit.title}"`);
check(audit.desc.length > 50, `meta description: ${audit.desc.length} chars`);
check(/^https:\/\//.test(audit.canonical), `canonical: ${audit.canonical}`);
check(/^https:\/\//.test(audit.ogImage), `og:image: ${audit.ogImage}`);
check(audit.lang === 'en', `html lang: ${audit.lang}`);
check(audit.h1 === 1, `h1 count: ${audit.h1}`);
check(audit.imgsNoAlt === 0, `imgs missing alt attribute: ${audit.imgsNoAlt}`);
// alt="" is only safe when the image is genuinely hidden from AT — either
// aria-hidden itself/ancestor, or inside a link/button that carries the
// accessible name (like the nav portrait inside aria-label="… home").
check(
  audit.imgsDecoBad === 0,
  `decorative imgs exposed to screen readers: ${audit.imgsDecoBad}`
);
check(!!audit.footerId, 'footer has id="footer"');
check(audit.railItems === 7, `section rail items: ${audit.railItems}`);
check(audit.sections >= 7, `sections: ${audit.sections}`);

const bad = audit.projects.filter((p) => /portfolio|su6osec/i.test(p || ''));
check(audit.projects.length > 0, `projects rendered: ${audit.projects.length} → ${audit.projects.join(', ')}`);
check(bad.length === 0, `excluded repos absent: ${bad.length ? bad.join(', ') : 'ok'}`);

/* ---------- 2b. Certifications -------------------------------- */
{
  const c = audit.certs;
  check(c.cards === 8, `cert cards: ${c.cards} (expected 8)`);
  check(c.tiers === 3, `cert difficulty tiers: ${c.tiers} (expected 3)`);
  check(c.emptyTiers === 0, `empty tiers: ${c.emptyTiers}`);
  check(c.skills >= 50, `cert skills total: ${c.skills}`);
  check(c.cardNoSkills === 0, `cards missing skills: ${c.cardNoSkills}`);
  check(audit.jsonldCreds === 8, `JSON-LD hasCredential entries: ${audit.jsonldCreds} (expected 8)`);

  const unpainted = c.logos.filter((l) => !l.painted).length;
  check(unpainted === 0, `issuer logos painted: ${c.logos.length - unpainted}/${c.logos.length}`);

  const hotlinked = c.logos.map((l) => l.src).filter((s) => !s.startsWith('/logos/'));
  check(
    hotlinked.length === 0,
    `issuer logos local to /logos/: ${hotlinked.join(', ') || 'all bundled, none hotlinked'}`
  );

  const unsafe = c.links.filter((l) => l.target !== '_blank' || !/noopener/.test(l.rel));
  check(unsafe.length === 0, `credential links hardened (target=_blank + noopener): ${c.links.length} checked`);
  check(c.links.length === 5, `credential verify/program links: ${c.links.length} (expected 5, LTM certs have none)`);
}

/* ---------- 3. Interactive spot checks ---------- */

// Theme round-trip
const themed = await page.evaluate(async () => {
  const before = document.documentElement.dataset.theme;
  document.querySelector('[aria-label*="theme" i], [aria-label*="mode" i]')?.click();
  await new Promise((r) => setTimeout(r, 350));
  const after = document.documentElement.dataset.theme;
  document.querySelector('[aria-label*="theme" i], [aria-label*="mode" i]')?.click();
  await new Promise((r) => setTimeout(r, 350));
  return { before, after, restored: document.documentElement.dataset.theme };
});
check(themed.before !== themed.after, `theme toggles ${themed.before} → ${themed.after}`);

// Command palette
await page.keyboard.press('/');
await new Promise((r) => setTimeout(r, 400));
const paletteOpen = await page.evaluate(() => !!document.querySelector('.palette, [role="dialog"]'));
check(paletteOpen, 'command palette opens on "/"');
await page.keyboard.press('Escape');
await new Promise((r) => setTimeout(r, 300));

// Anchor navigation lands section headings clear of the fixed nav
const nav = await page.evaluate(async () => {
  document.querySelector('a[href="#projects"]')?.click();
  await new Promise((r) => setTimeout(r, 1400));
  const h = document.getElementById('projects')?.getBoundingClientRect();
  const rail = document.querySelector('.rail')?.getBoundingClientRect();
  const container = document.querySelector('#projects .container')?.getBoundingClientRect();
  const navEl = document.querySelector('.nav');
  return {
    top: Math.round(h?.top ?? -999),
    railLeft: Math.round(rail?.left ?? 0),
    right: Math.round(container?.right ?? 0),
    scrolled: navEl?.classList.contains('is-scrolled'),
    backdrop: getComputedStyle(navEl).backdropFilter,
  };
});
check(nav.top > 0 && nav.top < 200, `#projects anchor lands at y=${nav.top}`);
check(nav.railLeft >= nav.right, `rail clears container (${nav.railLeft} >= ${nav.right})`);
check(nav.scrolled && /blur\(/.test(nav.backdrop), `nav glass when scrolled: ${nav.backdrop}`);

/* ---------- 4. Static SEO files ---------- */

for (const [file, must] of [
  ['robots.txt', ['Sitemap:']],
  ['sitemap.xml', ['<urlset', '<loc>https://']],
  ['site.webmanifest', ['"icons"']],
  ['.well-known/security.txt', ['Contact:']],
]) {
  try {
    const body = await readFile(path.join(dist, file), 'utf8');
    const missing = must.filter((m) => !body.includes(m));
    check(missing.length === 0, `${file}: ${missing.length ? `missing ${missing.join(', ')}` : 'ok'}`);
  } catch {
    fail.push(`${file}: missing from dist/`);
  }
}

// Every sitemap URL must live on the same origin as the canonical page.
{
  const sm = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
  const origin = new URL(audit.canonical).origin;
  const foreign = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).origin)
    .filter((o) => o !== origin);
  check(foreign.length === 0, `sitemap origin matches canonical: ${foreign.length ? foreign.join(', ') : origin}`);
  check((sm.match(/<loc>/g) || []).length >= 8, `sitemap entries: ${(sm.match(/<loc>/g) || []).length}`);
}

/* ---------- 4b. Custom 404 ---------------------------------- */
/*
 * Vercel (and GitHub Pages, if this ever moves) serve dist/404.html for
 * unmatched routes. It must exist, must stay out of the index, must not need
 * JS to render (CSP blocks unhashed inline scripts), and must point home.
 */
{
  try {
    const body = await readFile(path.join(dist, '404.html'), 'utf8');
    check(/name="robots"[^>]*noindex/.test(body), '404.html: robots noindex');
    check(/href="\//.test(body), '404.html: links back home');
    check(
      !/<script(?![^>]*\bsrc=)/.test(body),
      '404.html: no inline script (CSP would block it)'
    );
    check(/@media \(prefers-color-scheme: light\)/.test(body), '404.html: light theme respected');
    check(/prefers-reduced-motion/.test(body), '404.html: reduced motion respected');
  } catch {
    fail.push('404.html: missing from dist/ — broken routes would hit the host default');
  }
}

await browser.close();
server.close();

/* ---------- Report ---------- */

console.log(`\n${'─'.repeat(64)}`);
ok.forEach((m) => console.log(`  ✓ ${m}`));
fail.forEach((m) => console.log(`  ✗ ${m}`));
console.log('─'.repeat(64));
console.log(fail.length ? `\n${fail.length} check(s) FAILED` : '\nAll checks passed.');
process.exit(fail.length ? 1 : 0);
