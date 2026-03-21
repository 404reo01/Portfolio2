import { useEffect, useRef, useState } from 'react';

const TRAIL_MAX  = 22;   // pixels affichés
const SAMPLE_GAP = 3;    // positions brutes entre chaque pixel
const LIFETIME   = 500;  // ms avant qu'une position s'efface
const PIXEL_SIZE = 4;    // taille du premier pixel (px)

export default function PixelTrail() {
  const [enabled, setEnabled] = useState(true);
  const canvasRef  = useRef(null);
  const trailRef   = useRef([]);
  const enabledRef = useRef(true);
  const rafRef     = useRef(null);

  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e) => {
      if (!enabledRef.current) return;
      trailRef.current.unshift({ x: e.clientX, y: e.clientY, t: performance.now() });
      // Cap la taille brute
      if (trailRef.current.length > TRAIL_MAX * SAMPLE_GAP * 2) {
        trailRef.current.length = TRAIL_MAX * SAMPLE_GAP * 2;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (enabledRef.current) {
        const now = performance.now();

        // Purger les positions expirées
        trailRef.current = trailRef.current.filter(p => now - p.t < LIFETIME);

        // Échantillonner
        const sampled = trailRef.current
          .filter((_, i) => i % SAMPLE_GAP === 0)
          .slice(0, TRAIL_MAX);

        sampled.forEach((pos, i) => {
          const age   = (now - pos.t) / LIFETIME;          // 0=récent  1=expiré
          const alpha = (1 - age) * (1 - i / TRAIL_MAX) * 0.85;
          const size  = Math.max(1, Math.round(PIXEL_SIZE * (1 - i / TRAIL_MAX * 0.6)));

          ctx.fillStyle = `rgba(205,172,108,${alpha.toFixed(3)})`;
          ctx.fillRect(
            Math.round(pos.x - size / 2),
            Math.round(pos.y - size / 2),
            size,
            size,
          );
        });
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[50]"
      />

      <button
        onClick={() => setEnabled(e => !e)}
        className="fixed bottom-6 left-4 z-[600] font-pixel text-[11px] tracking-[0.18em]
                   uppercase text-[#f5f5dc]/70 hover:text-[#f5f5dc] transition-colors duration-300
                   flex items-center gap-2 select-none border border-[#f5f5dc]/20
                   hover:border-[#f5f5dc]/50 px-3 py-2 bg-black/50 backdrop-blur-sm"
        title={enabled ? 'Désactiver la traînée' : 'Activer la traînée'}
      >
        <span className="text-[14px] leading-none">{enabled ? '▪' : '▫'}</span>
        <span>trail</span>
      </button>
    </>
  );
}
