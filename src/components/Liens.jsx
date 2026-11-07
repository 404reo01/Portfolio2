import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import character from '../assets/rayan-character.png';
import TopographicBackground from './TopographicBackground';
import { DialogBox, HudCorners, PulsingDot, LinkCard } from './ui';
import { CONTACT_LINKS } from '../constants';

/* ── Données ─────────────────────────────────────────────── */

const DIALOGUE_DELAY = 6000;

// Répliques du PNJ, jouées une fois dans l'ordre puis la dernière reste affichée
const DIALOGUES = [
  "Salut ! Moi c'est Rayan.",
  "Tout ce qu'il faut pour me retrouver est juste au-dessus.",
  "Ajoute-moi à tes contacts, ça prend une seconde.",
];

const LINKS = [
  { label: 'Portfolio', symbol: '◈', value: 'Mon portfolio', href: '/' },
  ...CONTACT_LINKS,
  { label: 'Contact', symbol: '+', value: 'Ajouter à mes contacts', href: '/rayan-el-ouazzani.vcf', download: true },
];

/* ── PNJ : personnage fixe en bas à gauche qui parle ─────── */

function Npc() {
  const [dialogueIndex, setDialogueIndex] = useState(0);

  useEffect(() => {
    if (dialogueIndex >= DIALOGUES.length - 1) return;
    const timer = setTimeout(() => setDialogueIndex(i => i + 1), DIALOGUE_DELAY);
    return () => clearTimeout(timer);
  }, [dialogueIndex]);

  return (
    <div className="fixed bottom-5 left-4 md:bottom-8 md:left-8
                    flex flex-col items-start gap-2
                    z-[1000] pointer-events-none">

      <div className="pointer-events-auto">
        <DialogBox text={DIALOGUES[dialogueIndex]} tail="down" tailSide="left" />
      </div>

      <div className="w-[80px] md:w-[120px] pointer-events-auto">
        <img
          src={character}
          alt="Rayan"
          className="w-full object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}

/* ── QR code à faire scanner depuis l'écran ──────────────── */

function QrPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        aria-expanded={isOpen}
        className="font-pixel uppercase text-xs tracking-[0.3em] text-[#f5f5dc]/60 hover:text-[#f5f5dc]
                   border-b border-[#f5f5dc]/20 hover:border-[#f5f5dc]/50 pb-1 transition-colors duration-300"
      >
        {isOpen ? '▾ Masquer le QR code' : '▸ Afficher le QR code'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative p-3"
          >
            <HudCorners color="border-[#cdac6c]/70" thickness={2} />
            <img
              src="/qr-liens.png"
              alt="QR code vers cette page"
              className="w-56 h-56"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Composant principal ─────────────────────────────────── */

export default function Liens() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#0e0c09' }}>
      <TopographicBackground />

      {/* pb : laisse la fin de page visible au-dessus du PNJ fixe */}
      <main className="relative z-10 font-pixel mx-auto max-w-md px-4 pt-12 pb-64 flex flex-col gap-10">

        {/* ── Identité ── */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-3xl tracking-[0.2em] uppercase text-[#f5f5dc]">
              Rayan El Ouazzani
            </h1>
            <p className="text-sm tracking-[0.25em] uppercase text-[#f5f5dc]/60">
              DevOps & Software Engineer
            </p>
          </div>

          <div className="flex items-center gap-3 border border-[#f5f5dc]/15 bg-[#f5f5dc]/5 px-5 py-2">
            <PulsingDot />
            <span className="text-xs tracking-[0.25em] uppercase text-[#f5f5dc]/80">
              Ouvert aux échanges
            </span>
          </div>
        </motion.header>

        {/* ── Liens ── */}
        <nav aria-label="Liens" className="flex flex-col gap-4">
          {LINKS.map((link, i) => (
            <LinkCard key={link.label} {...link} delay={0.2 + i * 0.08} />
          ))}
        </nav>

        <QrPanel />

        <footer className="text-center text-[9px] tracking-[0.45em] uppercase text-[#f5f5dc]/30">
          ◈ rayan el ouazzani · reo ◈
        </footer>
      </main>

      <Npc />
    </div>
  );
}
