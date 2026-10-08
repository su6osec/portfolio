/**
 * art.js — procedural, deterministic "technical" artwork for project cards.
 *
 * Every repository gets a unique sci-fi plate generated from a hash of its
 * name. No images are shipped, nothing is fetched, and the same repo always
 * renders the same plate. Motifs are deliberately instrumentation-flavoured:
 * radar, oscilloscope, mesh, contours, spectrum, circuitry, hex lattice, reticle.
 */

const LANG_COLORS = {
  Go: '#00ADD8',
  Kotlin: '#7F52FF',
  Shell: '#89E051',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  Rust: '#DEA584',
  Java: '#B07219',
  'C++': '#F34B7D',
  C: '#555555',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Vue: '#41B883',
  Svelte: '#FF3E00',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Dockerfile: '#384D54',
  Makefile: '#427819',
  HCL: '#844FBA',
  Lua: '#000080',
  Vim: '#199F4B',
};

/** FNV-1a — small, fast, good enough distribution for visual variety. */
export function hash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Deterministic PRNG so a given repo always produces the same drawing. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

export function languageColor(language) {
  if (!language) return '#8b93a1';
  return LANG_COLORS[language] || '#8b93a1';
}

const MOTIFS = ['radar', 'wave', 'mesh', 'contour', 'spectrum', 'circuit', 'hex', 'reticle'];

export function motifFor(name) {
  return MOTIFS[hash(name) % MOTIFS.length];
}

function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* ------------------------------------------------------------------ */
/* Motifs                                                              */
/* ------------------------------------------------------------------ */

function drawRadar(ctx, w, h, r, accent) {
  const cx = w * 0.5;
  const cy = h * 0.55;
  const radius = Math.min(w, h) * 0.42;

  ctx.strokeStyle = hexToRgba(accent, 0.28);
  ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, (radius / 4) * i, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  for (let a = 0; a < 12; a++) {
    const ang = (a / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius);
    ctx.stroke();
  }

  // Sweep
  const sweep = r() * Math.PI * 2;
  const grad = ctx.createConicGradient
    ? ctx.createConicGradient(sweep, cx, cy)
    : ctx.createLinearGradient(cx, cy, cx + radius, cy);
  if (ctx.createConicGradient) {
    grad.addColorStop(0, hexToRgba(accent, 0.42));
    grad.addColorStop(0.16, hexToRgba(accent, 0.05));
    grad.addColorStop(1, 'rgba(0,0,0,0)');
  } else {
    grad.addColorStop(0, hexToRgba(accent, 0.3));
    grad.addColorStop(1, 'rgba(0,0,0,0)');
  }
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, sweep, sweep + 0.9);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Blips
  const blips = 5 + Math.floor(r() * 6);
  for (let i = 0; i < blips; i++) {
    const ang = r() * Math.PI * 2;
    const dist = radius * (0.15 + r() * 0.8);
    const x = cx + Math.cos(ang) * dist;
    const y = cy + Math.sin(ang) * dist;
    const size = 1.5 + r() * 2.5;
    ctx.fillStyle = hexToRgba(accent, 0.5 + r() * 0.5);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = hexToRgba(accent, 0.25);
    ctx.beginPath();
    ctx.arc(x, y, size + 4 + r() * 5, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawWave(ctx, w, h, r, accent) {
  const mid = h * 0.5;
  const f1 = 1.4 + r() * 2;
  const f2 = 3.5 + r() * 5;
  const ph = r() * Math.PI * 2;

  // Faint graticule
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  const step = h / 8;
  for (let y = step; y < h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  for (let x = step; x < w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  const draw = (amp, freq, alpha, width) => {
    ctx.beginPath();
    for (let x = 0; x <= w; x += 2) {
      const t = x / w;
      const y =
        mid +
        Math.sin(t * Math.PI * 2 * freq + ph) * amp * (0.55 + 0.45 * Math.sin(t * Math.PI)) +
        Math.sin(t * Math.PI * 2 * freq * 2.3) * amp * 0.22;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = hexToRgba(accent, alpha);
    ctx.lineWidth = width;
    ctx.shadowColor = hexToRgba(accent, alpha * 0.7);
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  draw(h * 0.16, f1 * 2.2, 0.2, 1);
  draw(h * 0.11, f2, 0.17, 1);
  draw(h * 0.1, f1, 0.95, 1.75);

  // Trigger marker
  const mx = w * (0.3 + r() * 0.4);
  ctx.strokeStyle = hexToRgba(accent, 0.5);
  ctx.setLineDash([3, 4]);
  ctx.beginPath();
  ctx.moveTo(mx, 0);
  ctx.lineTo(mx, h);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawMesh(ctx, w, h, r, accent) {
  const count = 22 + Math.floor(r() * 16);
  const nodes = Array.from({ length: count }, () => ({
    x: r() * w,
    y: r() * h,
    rad: 1.2 + r() * 2.4,
  }));

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.hypot(dx, dy);
      const max = Math.min(w, h) * 0.34;
      if (d < max) {
        ctx.strokeStyle = hexToRgba(accent, (1 - d / max) * 0.35);
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  nodes.forEach((n) => {
    ctx.fillStyle = hexToRgba(accent, 0.85);
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = hexToRgba(accent, 0.18);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.rad + 4, 0, Math.PI * 2);
    ctx.stroke();
  });
}

function drawContour(ctx, w, h, r, accent) {
  const peaks = Array.from({ length: 3 }, () => ({
    x: w * (0.15 + r() * 0.7),
    y: h * (0.2 + r() * 0.6),
    r: Math.min(w, h) * (0.18 + r() * 0.3),
  }));

  peaks.forEach((p) => {
    const rings = 9 + Math.floor(r() * 6);
    for (let i = 1; i <= rings; i++) {
      const t = i / rings;
      ctx.beginPath();
      const wob = 0.16 + r() * 0.1;
      for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.14) {
        const rr =
          p.r * t *
          (1 + Math.sin(a * 3 + i * 0.5) * wob + Math.cos(a * 5 - i * 0.3) * wob * 0.6);
        const x = p.x + Math.cos(a) * rr;
        const y = p.y + Math.sin(a) * rr * 0.78;
        a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = hexToRgba(accent, 0.12 + t * 0.45);
      ctx.lineWidth = i % 3 === 0 ? 1.4 : 0.8;
      ctx.stroke();
    }
  });
}

function drawSpectrum(ctx, w, h, r, accent) {
  const bars = Math.floor(w / 9);
  const base = h * 0.92;

  for (let i = 0; i < bars; i++) {
    const t = i / bars;
    const envelope = Math.sin(t * Math.PI) * 0.85 + 0.15;
    const noise = 0.35 + r() * 0.65;
    const bh = h * 0.68 * envelope * noise;
    const x = i * 9 + 2;

    const g = ctx.createLinearGradient(0, base - bh, 0, base);
    g.addColorStop(0, hexToRgba(accent, 0.95));
    g.addColorStop(1, hexToRgba(accent, 0.12));
    ctx.fillStyle = g;
    ctx.fillRect(x, base - bh, 5, bh);

    // Peak cap
    ctx.fillStyle = hexToRgba(accent, 1);
    ctx.fillRect(x, base - bh - 2, 5, 1.6);
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, base);
  ctx.lineTo(w, base);
  ctx.stroke();
}

function drawCircuit(ctx, w, h, r, accent) {
  const routes = 7 + Math.floor(r() * 6);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 0; i < routes; i++) {
    let x = r() * w;
    let y = r() * h;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const segs = 3 + Math.floor(r() * 4);
    for (let s = 0; s < segs; s++) {
      const horiz = r() > 0.5;
      const len = (30 + r() * 90) * (r() > 0.5 ? 1 : -1);
      if (horiz) x += len;
      else y += len;
      x = Math.max(6, Math.min(w - 6, x));
      y = Math.max(6, Math.min(h - 6, y));
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = hexToRgba(accent, 0.25 + r() * 0.55);
    ctx.lineWidth = 1 + r() * 1.4;
    ctx.shadowColor = hexToRgba(accent, 0.5);
    ctx.shadowBlur = 7;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Pad
    ctx.fillStyle = hexToRgba(accent, 0.95);
    ctx.beginPath();
    ctx.arc(x, y, 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = hexToRgba(accent, 0.3);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 5.5, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawHex(ctx, w, h, r, accent) {
  const size = 13 + r() * 8;
  const dx = size * Math.sqrt(3);
  const dy = size * 1.5;
  const hotCol = Math.floor(r() * Math.ceil(w / dx) + 2);
  const hotRow = Math.floor(r() * Math.ceil(h / dy) + 2);

  const corners = (cx, cy) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 180) * (60 * i - 30);
      const px = cx + size * Math.cos(a);
      const py = cy + size * Math.sin(a);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
  };

  let row = 0;
  for (let y = -size; y < h + size; y += dy, row++) {
    const offset = row % 2 ? dx / 2 : 0;
    let col = 0;
    for (let x = -size; x < w + size; x += dx, col++) {
      const cx = x + offset;
      const cy = y;
      const hot = col === hotCol && row === hotRow;
      const nearHot = Math.abs(col - hotCol) < 3 && Math.abs(row - hotRow) < 3;
      corners(cx, cy);
      if (hot) {
        ctx.fillStyle = hexToRgba(accent, 0.55);
        ctx.fill();
        ctx.strokeStyle = hexToRgba(accent, 1);
        ctx.lineWidth = 1.6;
        ctx.shadowColor = hexToRgba(accent, 0.9);
        ctx.shadowBlur = 16;
      } else if (nearHot) {
        ctx.strokeStyle = hexToRgba(accent, 0.35);
        ctx.lineWidth = 1;
      } else {
        ctx.strokeStyle = 'rgba(255,255,255,0.055)';
        ctx.lineWidth = 1;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }
}

function drawReticle(ctx, w, h, r, accent) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const R = Math.min(w, h) * 0.36;

  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    const t = i / 5;
    ctx.strokeRect(cx - R * t, cy - R * t, R * 2 * t, R * 2 * t);
  }

  ctx.strokeStyle = hexToRgba(accent, 0.6);
  ctx.lineWidth = 1.4;
  // Corner brackets
  const b = R * 0.4;
  const arm = R * 0.45;
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
    const x = cx + sx * b;
    const y = cy + sy * b;
    ctx.beginPath();
    ctx.moveTo(x, y - sy * arm);
    ctx.lineTo(x, y - sy * 8);
    ctx.lineTo(x - sx * 8, y);
    ctx.lineTo(x - sx * arm, y);
    ctx.stroke();
  });

  // Crosshair
  ctx.strokeStyle = hexToRgba(accent, 0.85);
  ctx.beginPath();
  ctx.moveTo(cx - R * 0.75, cy);
  ctx.lineTo(cx - R * 0.18, cy);
  ctx.moveTo(cx + R * 0.18, cy);
  ctx.lineTo(cx + R * 0.75, cy);
  ctx.moveTo(cx, cy - R * 0.75);
  ctx.lineTo(cx, cy - R * 0.18);
  ctx.moveTo(cx, cy + R * 0.18);
  ctx.lineTo(cx, cy + R * 0.75);
  ctx.stroke();

  // Lock box
  const lw = R * (0.5 + r() * 0.4);
  const lx = cx - lw / 2 + (r() - 0.5) * R * 0.4;
  const ly = cy - lw / 2 + (r() - 0.5) * R * 0.4;
  ctx.strokeStyle = hexToRgba(accent, 0.9);
  ctx.lineWidth = 1.2;
  ctx.strokeRect(lx, ly, lw, lw * 0.7);

  ctx.fillStyle = hexToRgba(accent, 1);
  ctx.fillRect(cx - 1.5, cy - 1.5, 3, 3);
}

const RENDERERS = {
  radar: drawRadar,
  wave: drawWave,
  mesh: drawMesh,
  contour: drawContour,
  spectrum: drawSpectrum,
  circuit: drawCircuit,
  hex: drawHex,
  reticle: drawReticle,
};

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

/**
 * Paint a plate onto a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {{name:string, language?:string}} repo
 */
export function paintPlate(canvas, repo) {
  if (!canvas || !repo?.name) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width || canvas.clientWidth || 480));
  const h = Math.max(1, Math.round(rect.height || canvas.clientHeight || 300));

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const seed = hash(repo.name + (repo.language || ''));
  const rand = rng(seed || 1);
  const accent = languageColor(repo.language);
  const motif = motifFor(repo.name);

  // Background
  ctx.fillStyle = '#080a0e';
  ctx.fillRect(0, 0, w, h);

  const bg = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
  bg.addColorStop(0, hexToRgba(accent, 0.13));
  bg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  RENDERERS[motif](ctx, w, h, rand, accent);
  ctx.restore();

  // Vignette
  const vig = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.75);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  // Corner readout
  ctx.font = '500 10px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillStyle = hexToRgba(accent, 0.85);
  ctx.fillText(motif.toUpperCase(), 12, h - 14);
  ctx.fillStyle = 'rgba(255,255,255,0.32)';
  ctx.textAlign = 'right';
  ctx.fillText(`SEED 0x${seed.toString(16).toUpperCase().padStart(8, '0')}`, w - 12, h - 14);
  ctx.textAlign = 'left';

  return () => {};
}

/** React-friendly wrapper: re-paints on resize via ResizeObserver. */
export function observePlate(canvas, repo) {
  if (!canvas) return () => {};
  const paint = () => paintPlate(canvas, repo);
  paint();

  let frame = 0;
  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(paint);
  });
  ro.observe(canvas);

  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
  };
}
