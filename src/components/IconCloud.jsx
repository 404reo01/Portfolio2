import { useEffect, useRef, useState } from 'react';

/* ── Easing ──────────────────────────────────────────────── */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ── Icônes SimpleIcons (CDN, colorées en beige portfolio) ── */
const COLOR = 'cdc56c'; // beige sépia légèrement saturé

export const TECH_IMAGES = [
  `https://cdn.simpleicons.org/react/${COLOR}`,
  `https://cdn.simpleicons.org/nextdotjs/${COLOR}`,
  `https://cdn.simpleicons.org/vuedotjs/${COLOR}`,
  `https://cdn.simpleicons.org/nuxt/${COLOR}`,
  `https://cdn.simpleicons.org/tailwindcss/${COLOR}`,
  `https://cdn.simpleicons.org/nodedotjs/${COLOR}`,
  `https://cdn.simpleicons.org/nestjs/${COLOR}`,
  `https://cdn.simpleicons.org/fastify/${COLOR}`,
  `https://cdn.simpleicons.org/express/${COLOR}`,
  `https://cdn.simpleicons.org/php/${COLOR}`,
  `https://cdn.simpleicons.org/python/${COLOR}`,
  `https://cdn.simpleicons.org/supabase/${COLOR}`,
  `https://cdn.simpleicons.org/postgresql/${COLOR}`,
  `https://cdn.simpleicons.org/mysql/${COLOR}`,
  `https://cdn.simpleicons.org/prisma/${COLOR}`,
  `https://cdn.simpleicons.org/pandas/${COLOR}`,
  `https://cdn.simpleicons.org/scikitlearn/${COLOR}`,
  `https://cdn.simpleicons.org/docker/${COLOR}`,
];

/* ── Composant ───────────────────────────────────────────── */
export default function IconCloud({ images = TECH_IMAGES, size = 380 }) {
  const canvasRef        = useRef(null);
  const [positions, setPositions] = useState([]);
  const [isDragging, setIsDragging]   = useState(false);
  const [lastMouse, setLastMouse]     = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos]       = useState({ x: size / 2, y: size / 2 });
  const [targetRot, setTargetRot]     = useState(null);
  const rotationRef      = useRef({ x: 0.3, y: 0 });
  const iconCanvasesRef  = useRef([]);
  const loadedRef        = useRef([]);
  const rafRef           = useRef(null);

  /* Charger les images sur canvas offscreen */
  useEffect(() => {
    loadedRef.current = new Array(images.length).fill(false);

    iconCanvasesRef.current = images.map((src, i) => {
      const off    = document.createElement('canvas');
      off.width    = 40;
      off.height   = 40;
      const offCtx = off.getContext('2d');

      const img        = new Image();
      img.crossOrigin  = 'anonymous';
      img.src          = src;
      img.onload       = () => {
        offCtx.clearRect(0, 0, 40, 40);
        offCtx.beginPath();
        offCtx.arc(20, 20, 20, 0, Math.PI * 2);
        offCtx.closePath();
        offCtx.clip();
        offCtx.drawImage(img, 0, 0, 40, 40);
        loadedRef.current[i] = true;
      };

      return off;
    });
  }, [images]);

  /* Distribuer les icônes sur une sphère (Fibonacci sphere) */
  useEffect(() => {
    const n      = images.length;
    const offset = 2 / n;
    const incr   = Math.PI * (3 - Math.sqrt(5));
    const pts    = [];

    for (let i = 0; i < n; i++) {
      const y   = i * offset - 1 + offset / 2;
      const r   = Math.sqrt(1 - y * y);
      const phi = i * incr;
      pts.push({ x: Math.cos(phi) * r * 100, y: y * 100, z: Math.sin(phi) * r * 100, id: i });
    }
    setPositions(pts);
  }, [images]);

  /* Handlers souris */
  const onMouseDown = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Clic sur une icône → rotation animée vers elle
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let clicked = false;

    positions.forEach((icon) => {
      if (clicked) return;
      const { x: rx, y: ry, z: rz } = rotatePoint(icon, rotationRef.current);
      const sx = size / 2 + rx;
      const sy = size / 2 + ry;
      const sc = (rz + 200) / 300;
      const dx = mx - sx, dy = my - sy;
      if (dx * dx + dy * dy < (20 * sc) ** 2) {
        clicked = true;
        const tx = -Math.atan2(icon.y, Math.sqrt(icon.x ** 2 + icon.z ** 2));
        const ty = Math.atan2(icon.x, icon.z);
        const cx = rotationRef.current.x, cy = rotationRef.current.y;
        const dist = Math.hypot(tx - cx, ty - cy);
        setTargetRot({ x: tx, y: ty, startX: cx, startY: cy, startTime: performance.now(), duration: Math.min(2000, Math.max(800, dist * 1000)) });
      }
    });

    if (!clicked) {
      setIsDragging(true);
      setLastMouse({ x: e.clientX, y: e.clientY });
    }
  };

  const onMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (isDragging) {
      rotationRef.current = {
        x: rotationRef.current.x + (e.clientY - lastMouse.y) * 0.004,
        y: rotationRef.current.y + (e.clientX - lastMouse.x) * 0.004,
      };
      setLastMouse({ x: e.clientX, y: e.clientY });
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setMousePos({ x: size / 2, y: size / 2 });
  };

  /* Boucle d'animation */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2, cy = canvas.height / 2;
      const maxD = Math.hypot(cx, cy);
      const dx = mousePos.x - cx, dy = mousePos.y - cy;
      const speed = 0.002 + (Math.hypot(dx, dy) / maxD) * 0.008;

      if (targetRot) {
        const prog = Math.min(1, (performance.now() - targetRot.startTime) / targetRot.duration);
        const ep   = easeOutCubic(prog);
        rotationRef.current = {
          x: targetRot.startX + (targetRot.x - targetRot.startX) * ep,
          y: targetRot.startY + (targetRot.y - targetRot.startY) * ep,
        };
        if (prog >= 1) setTargetRot(null);
      } else if (!isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvas.height) * speed,
          y: rotationRef.current.y + (dx / canvas.width)  * speed,
        };
      }

      // Trier par Z pour le painter's algorithm
      const withZ = positions.map((icon) => {
        const r = rotatePoint(icon, rotationRef.current);
        return { ...icon, rx: r.x, ry: r.y, rz: r.z };
      }).sort((a, b) => a.rz - b.rz);

      withZ.forEach(({ rx, ry, rz, id }) => {
        const scale   = (rz + 200) / 300;
        const opacity = Math.max(0.15, Math.min(1, (rz + 150) / 200));

        ctx.save();
        ctx.translate(cx + rx, cy + ry);
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        if (iconCanvasesRef.current[id] && loadedRef.current[id]) {
          ctx.drawImage(iconCanvasesRef.current[id], -20, -20, 40, 40);
        }

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [positions, isDragging, mousePos, targetRot]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={onMouseLeave}
      className="cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'none' }}
      aria-label="Nuage de compétences 3D interactif"
    />
  );
}

/* ── Helper : rotation 3D ────────────────────────────────── */
function rotatePoint({ x, y, z }, { x: rx, y: ry }) {
  const cosX = Math.cos(rx), sinX = Math.sin(rx);
  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  const rotX = x * cosY - z * sinY;
  const rotZ = x * sinY + z * cosY;
  const rotY = y * cosX + rotZ * sinX;
  return { x: rotX, y: rotY, z: rotZ };
}
