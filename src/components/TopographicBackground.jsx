import React, { useEffect, useRef } from 'react';

/* ── RNG déterministe (seed fixe → positions stables au refresh) ───────── */
function mkRng(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

/* ── Value Noise ───────────────────────────────────────────────────────── */
const N    = 256;
const PERM = new Uint16Array(N * 2);
const VALS = new Float32Array(N * N);

(function seed() {
  const rng = mkRng(42);
  for (let i = 0; i < N * N; i++) VALS[i] = rng();
  const p = Array.from({ length: N }, (_, i) => i).sort(() => rng() - 0.5);
  for (let i = 0; i < N; i++) PERM[i] = PERM[i + N] = p[i];
})();

function smoothstep(t) { return t * t * (3 - 2 * t); }
function lerp(a, b, t) { return a + (b - a) * t; }

function valueNoise(x, y) {
  const xi = Math.floor(x) & (N-1), yi = Math.floor(y) & (N-1);
  const xf = x - Math.floor(x),     yf = y - Math.floor(y);
  const u  = smoothstep(xf),        v  = smoothstep(yf);
  const aa = VALS[PERM[xi]            * N + PERM[yi]];
  const ba = VALS[PERM[(xi+1)&(N-1)] * N + PERM[yi]];
  const ab = VALS[PERM[xi]            * N + PERM[(yi+1)&(N-1)]];
  const bb = VALS[PERM[(xi+1)&(N-1)] * N + PERM[(yi+1)&(N-1)]];
  return lerp(lerp(aa, ba, u), lerp(ab, bb, u), v);
}

function fbm(x, y) {
  let v = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < 5; i++) { v += valueNoise(x*freq, y*freq)*amp; amp *= 0.5; freq *= 2.1; }
  return v * 2 - 1;
}

/* ── Marching Squares ──────────────────────────────────────────────────── */
function contourSegments(grid, cols, rows, level, cw, ch) {
  const segs = [];
  for (let r = 0; r < rows-1; r++) {
    for (let c = 0; c < cols-1; c++) {
      const tl=grid[r][c], tr=grid[r][c+1], bl=grid[r+1][c], br=grid[r+1][c+1];
      const x=c*cw, y=r*ch;
      const t_=(a,b)=>Math.abs(b-a)<1e-6?0.5:(level-a)/(b-a);
      const top    = (tl<level)!==(tr<level)?{x:x+cw*t_(tl,tr),y}        :null;
      const right  = (tr<level)!==(br<level)?{x:x+cw,y:y+ch*t_(tr,br)}  :null;
      const bottom = (bl<level)!==(br<level)?{x:x+cw*t_(bl,br),y:y+ch}  :null;
      const left   = (tl<level)!==(bl<level)?{x,y:y+ch*t_(tl,bl)}       :null;
      const pts=[top,right,bottom,left].filter(Boolean);
      if (pts.length===2) segs.push(pts);
      if (pts.length===4) {
        const mid=(tl+tr+br+bl)/4;
        mid<level?segs.push([pts[0],pts[3]],[pts[1],pts[2]]):segs.push([pts[0],pts[1]],[pts[2],pts[3]]);
      }
    }
  }
  return segs;
}

/* ── Icônes cartographiques ────────────────────────────────────────────── */
function drawMountain(ctx, x, y, size) {
  // Trois pics décalés — style carte de fantasy
  ctx.beginPath();
  ctx.moveTo(x - size, y + size * 0.6);
  ctx.lineTo(x,        y - size);
  ctx.lineTo(x + size, y + size * 0.6);
  ctx.stroke();
  // Pic secondaire gauche
  ctx.beginPath();
  ctx.moveTo(x - size * 1.5, y + size * 0.6);
  ctx.lineTo(x - size * 0.6, y - size * 0.5);
  ctx.lineTo(x - size * 0.1, y + size * 0.6);
  ctx.stroke();
}

function drawTemple(ctx, x, y, size) {
  const s = size * 0.55;
  // Socle
  ctx.beginPath();
  ctx.rect(x - s, y - s * 0.3, s * 2, s * 0.3);
  ctx.stroke();
  // Colonnes
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(x + i * s * 0.7, y - s * 0.3);
    ctx.lineTo(x + i * s * 0.7, y - s * 1.1);
    ctx.stroke();
  }
  // Fronton triangulaire
  ctx.beginPath();
  ctx.moveTo(x - s, y - s * 1.1);
  ctx.lineTo(x,     y - s * 1.8);
  ctx.lineTo(x + s, y - s * 1.1);
  ctx.closePath();
  ctx.stroke();
}

function drawRuins(ctx, x, y, size) {
  const s = size * 0.5;
  // Tour brisée
  ctx.beginPath();
  ctx.rect(x - s * 0.5, y - s, s, s * 1.4);
  ctx.stroke();
  // Créneaux irréguliers
  ctx.beginPath();
  ctx.moveTo(x - s * 0.5, y - s);
  ctx.lineTo(x - s * 0.5, y - s * 1.3);
  ctx.lineTo(x - s * 0.15,y - s * 1.3);
  ctx.lineTo(x - s * 0.15,y - s);
  ctx.stroke();
  // Décombres
  ctx.beginPath();
  ctx.moveTo(x + s * 0.5, y - s * 0.5);
  ctx.lineTo(x + s * 1.1, y + s * 0.4);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + s * 0.5, y - s * 0.1);
  ctx.lineTo(x + s * 1.3, y - s * 0.4);
  ctx.stroke();
}

function drawForest(ctx, x, y, size) {
  // 3 arbres stylisés (triangle pointu)
  const positions = [[-size*0.7, 0], [0, -size*0.25], [size*0.7, size*0.05]];
  positions.forEach(([dx, dy]) => {
    const s = size * 0.55;
    ctx.beginPath();
    ctx.moveTo(x+dx,       y+dy-s);
    ctx.lineTo(x+dx-s*0.6, y+dy+s*0.5);
    ctx.lineTo(x+dx+s*0.6, y+dy+s*0.5);
    ctx.closePath();
    ctx.stroke();
    // Tronc
    ctx.beginPath();
    ctx.moveTo(x+dx, y+dy+s*0.5);
    ctx.lineTo(x+dx, y+dy+s*0.9);
    ctx.stroke();
  });
}

function drawCity(ctx, x, y, size) {
  const s = size * 0.5;
  // Mur d'enceinte
  ctx.beginPath();
  ctx.arc(x, y, s * 1.1, 0, Math.PI * 2);
  ctx.stroke();
  // Donjon central
  ctx.beginPath();
  ctx.rect(x - s * 0.35, y - s * 0.35, s * 0.7, s * 0.7);
  ctx.stroke();
  // Tours aux coins
  [[-s*0.9,-s*0.6],[s*0.9,-s*0.6],[-s*0.9,s*0.6],[s*0.9,s*0.6]].forEach(([dx,dy]) => {
    ctx.beginPath();
    ctx.arc(x+dx, y+dy, s*0.22, 0, Math.PI*2);
    ctx.stroke();
  });
}

/* ── Génération des icônes (positions fixes, seeded) ──────────────────── */
const ICON_TYPES  = ['mountain', 'mountain', 'mountain', 'forest', 'forest', 'temple', 'ruins', 'city'];
const ICON_SCALES = { mountain: 20, forest: 16, temple: 14, ruins: 16, city: 15 };

function generateIcons(W, H) {
  const rng   = mkRng(1337);
  const count = 18;
  const icons = [];
  // Éviter les bords (marge 10%)
  const mx = W * 0.1, my = H * 0.1;
  for (let i = 0; i < count; i++) {
    icons.push({
      type:  ICON_TYPES[Math.floor(rng() * ICON_TYPES.length)],
      x:     mx + rng() * (W - mx * 2),
      y:     my + rng() * (H - my * 2),
    });
  }
  return icons;
}

/* ── Config courbes ────────────────────────────────────────────────────── */
const CELL = 20;
const LEVELS = [
  { v: -0.75, major: true  },
  { v: -0.55, major: false },
  { v: -0.38, major: false },
  { v: -0.20, major: true  },
  { v: -0.04, major: false },
  { v:  0.12, major: false },
  { v:  0.28, major: true  },
  { v:  0.44, major: false },
  { v:  0.60, major: false },
  { v:  0.76, major: true  },
];

/* ── Composant ─────────────────────────────────────────────────────────── */
export default function TopographicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext('2d');
    let drift = 0, raf = null;
    let icons = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      icons = generateIcons(canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function draw() {
      const W = canvas.width, H = canvas.height;
      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;
      const scale = 0.004;

      const grid = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) =>
          fbm((c*CELL)*scale + drift*0.012, (r*CELL)*scale + drift*0.008)
        )
      );

      ctx.clearRect(0, 0, W, H);

      /* Courbes de niveau */
      LEVELS.forEach(({ v, major }, i) => {
        const alpha = major
          ? 0.10 + (i / LEVELS.length) * 0.07
          : 0.04 + (i / LEVELS.length) * 0.04;
        ctx.strokeStyle = `rgba(205,172,108,${alpha.toFixed(3)})`;
        ctx.lineWidth   = major ? 1.0 : 0.55;
        ctx.beginPath();
        contourSegments(grid, cols, rows, v, CELL, CELL).forEach(([p1,p2]) => {
          ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
        });
        ctx.stroke();
      });

      /* Icônes cartographiques */
      ctx.strokeStyle = 'rgba(205,172,108,0.18)';
      ctx.fillStyle   = 'rgba(205,172,108,0)';
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';
      icons.forEach(({ type, x, y }) => {
        const size = ICON_SCALES[type];
        ctx.lineWidth = 0.75;
        if (type === 'mountain') drawMountain(ctx, x, y, size);
        if (type === 'temple')   drawTemple(ctx, x, y, size);
        if (type === 'ruins')    drawRuins(ctx, x, y, size);
        if (type === 'forest')   drawForest(ctx, x, y, size);
        if (type === 'city')     drawCity(ctx, x, y, size);
      });

      drift += 0.004;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="fixed inset-0 z-0 pointer-events-none" />;
}
