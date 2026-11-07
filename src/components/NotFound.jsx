import React from 'react';
import { motion } from 'framer-motion';
import character from '../assets/rayan-character.png';
import TopographicBackground from './TopographicBackground';
import { DialogBox, HudCorners, PixelButton } from './ui';

/* ── Données ─────────────────────────────────────────────── */

const DIALOGUE = "Hmm... cette zone n'est sur aucune carte. On fait demi-tour ?";

/* ── Composant principal ─────────────────────────────────── */

export default function NotFound() {
  const path = window.location.pathname;

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#0e0c09' }}>
      <TopographicBackground />

      <main className="relative z-10 font-pixel min-h-screen px-4 py-16
                       flex flex-col items-center justify-center gap-10 text-center">

        {/* ── Code d'erreur monumental ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#f5f5dc]/35">
            ◈ zone inexplorée ◈
          </p>
          <h1
            className="text-[#f5f5dc] leading-none tracking-[0.15em]"
            style={{ fontSize: 'clamp(96px, 22vw, 200px)', lineHeight: 0.85 }}
          >
            404
          </h1>
        </motion.div>

        {/* ── Personnage perdu + bulle ── */}
        <div className="flex flex-col items-center gap-3">
          <DialogBox text={DIALOGUE} tail="down" />
          <motion.img
            src={character}
            alt="Rayan, perdu sur la carte"
            className="w-24 md:w-28 object-contain"
            style={{ imageRendering: 'pixelated' }}
            // Il cherche son chemin : va-et-vient en se retournant
            animate={{ x: [-40, 40, 40, -40, -40], scaleX: [1, 1, -1, -1, 1] }}
            transition={{ duration: 6, times: [0, 0.45, 0.5, 0.95, 1], repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* ── Ligne HUD : chemin demandé ── */}
        <div className="relative max-w-md w-full border border-[#f5f5dc]/15 bg-black/50 px-5 py-3">
          <HudCorners size="sm" color="border-[#f5f5dc]/30" />
          <p className="text-sm text-[#f5f5dc]/55 break-all">
            &gt; chemin introuvable : <span className="text-[#cdac6c]">{path}</span>
          </p>
        </div>

        {/* ── Sorties ── */}
        <nav aria-label="Retour" className="flex flex-col sm:flex-row gap-4">
          <PixelButton as="a" href="/" variant="primary" className="px-6 py-3 text-sm">
            Retour au village
          </PixelButton>
          <PixelButton as="a" href="/liens/" variant="ghost" className="px-6 py-3 text-sm">
            Mes liens
          </PixelButton>
        </nav>
      </main>
    </div>
  );
}
