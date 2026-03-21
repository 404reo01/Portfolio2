import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HudCorners, PulsingDot } from './ui';
import IconCloud from './IconCloud';

const TYPEWRITER_TEXT = 'Développeur Full Stack · BUT Informatique 3e année';

// Générés une seule fois au module load pour éviter les re-renders
const BG_STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: Math.random() * 1.5 + 0.5,
  top: Math.random() * 100,
  left: Math.random() * 100,
  opacity: Math.random() * 0.35 + 0.08,
}));

const SHOOTING_STARS = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 2 + 1,
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 8,
  dx: Math.floor(Math.random() * 80 + 40),
  dy: Math.floor(Math.random() * 150 + 80),
}));

export default function LandingPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [showBadge, setShowBadge] = useState(false);
  const [showTech, setShowTech] = useState(false);

  useEffect(() => {
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= TYPEWRITER_TEXT.length) {
          setDisplayedText(TYPEWRITER_TEXT.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setShowBadge(true);
          setTimeout(() => setShowTech(true), 300);
        }
      }, 38);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div
      id="Accueil"
      className="hero-scanlines relative min-h-screen flex items-center justify-center font-pixel px-4 text-gray-200 overflow-hidden bg-transparent"
    >

      {/* COUCHE 1 : Étoiles de fond statiques */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {BG_STARS.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* COUCHE 2 : Étoiles filantes */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {SHOOTING_STARS.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              '--dx': `${star.dx}px`,
              '--dy': `${star.dy}px`,
              animation: `shoot ${star.duration}s linear ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center gap-5 w-full max-w-3xl mx-auto">

        {/* Bloc nom avec coins HUD */}
        <motion.div
          className="relative px-10 py-5"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <HudCorners color="border-[#f5f5dc]/50" thickness={2} />

          <h1 className="text-3xl md:text-5xl pixel-border text-amber-100 bg-black/50 px-6 py-3 rounded-lg backdrop-blur-sm shadow-2xl">
            Rayan EL OUAZZANI
          </h1>
        </motion.div>

        {/* Ligne HUD typewriter */}
        <motion.div
          className="flex items-center text-sm md:text-base text-[#f5f5dc]/75 tracking-[0.18em] uppercase min-h-[1.5em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <span className="text-[#f5f5dc]/35 mr-2 select-none">&gt;</span>
          <span>{displayedText}</span>
          <span className="cursor-blink ml-[2px] inline-block w-[2px] h-[1.1em] bg-[#f5f5dc]/70 align-middle" />
        </motion.div>

        {/* Bloc Alternance BUT 3 */}
        <AnimatePresence>
          {showBadge && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-black/40 backdrop-blur-xl border border-[#f5f5dc]/20 px-6 py-3"
            >
              {/* Badge alternance */}
              <div className="flex items-center gap-2">
                <PulsingDot className="bg-[#f5f5dc]" />
                <span className="text-[#f5f5dc] text-[10px] md:text-xs tracking-[0.22em] uppercase">
                  Alternance Open
                </span>
              </div>

              {/* Séparateur vertical */}
              <span className="hidden sm:block w-px h-4 bg-[#f5f5dc]/20" />

              {/* Info BUT 3 */}
              <div className="flex items-center gap-2">
                <span className="text-[#f5f5dc]/40 text-[10px] select-none">◈</span>
                <span className="text-[#f5f5dc]/70 text-[10px] md:text-xs tracking-[0.18em] uppercase">
                  BUT Informatique · 3e année
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon Cloud techno */}
        <AnimatePresence>
          {showTech && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <IconCloud size={200} />
            </motion.div>
          )}
        </AnimatePresence>


      </div>

      {/* Scroll indicator — ancré au hero, pas au flex container */}
      <AnimatePresence>
        {showTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[#f5f5dc]/25 text-[9px] tracking-[0.35em] uppercase">scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-6 bg-gradient-to-b from-[#f5f5dc]/30 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
