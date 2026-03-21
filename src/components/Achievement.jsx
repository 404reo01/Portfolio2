import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ALL_SECTIONS = ['Accueil', 'Experiences', 'Lore', 'Projets', 'Sidequests', 'Contact'];

export default function Achievement({ accueilRef, experiencesRef, loreRef, projetsRef, sidequestsRef, contactRef }) {
  const [show, setShow]       = useState(false);
  const [fired, setFired]     = useState(false);
  const visitedRef            = useRef(new Set());

  const isAccueilVisible     = useIntersectionObserver(accueilRef,     { threshold: 0.3 });
  const isExperiencesVisible = useIntersectionObserver(experiencesRef, { threshold: 0.3 });
  const isLoreVisible        = useIntersectionObserver(loreRef,        { threshold: 0.3 });
  const isProjetsVisible     = useIntersectionObserver(projetsRef,     { threshold: 0.3 });
  const isSidequestsVisible  = useIntersectionObserver(sidequestsRef,  { threshold: 0.3 });
  const isContactVisible     = useIntersectionObserver(contactRef,     { threshold: 0.3 });

  /* Marquer les sections visitées */
  useEffect(() => {
    if (isAccueilVisible)     visitedRef.current.add('Accueil');
    if (isExperiencesVisible) visitedRef.current.add('Experiences');
    if (isLoreVisible)        visitedRef.current.add('Lore');
    if (isProjetsVisible)     visitedRef.current.add('Projets');
    if (isSidequestsVisible)  visitedRef.current.add('Sidequests');
    if (isContactVisible)     visitedRef.current.add('Contact');
  }, [isAccueilVisible, isExperiencesVisible, isLoreVisible, isProjetsVisible, isSidequestsVisible, isContactVisible]);

  /* Déclencher l'achievement quand Contact visible + tout vu */
  useEffect(() => {
    if (fired || !isContactVisible) return;
    const allVisited = ALL_SECTIONS.every(s => visitedRef.current.has(s));
    if (!allVisited) return;

    setFired(true);
    setShow(true);
    setTimeout(() => setShow(false), 4500);
  }, [isContactVisible, fired]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[900]
                     pointer-events-none select-none"
        >
          <div
            className="relative flex items-center gap-4
                       bg-black/90 backdrop-blur-md
                       border border-[#f5f5dc]/30
                       px-6 py-4 font-pixel"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,245,220,0.012) 2px, rgba(245,245,220,0.012) 4px)',
            }}
          >
            {/* Coins HUD manuels pour rester léger */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#f5f5dc]/50" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#f5f5dc]/50" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#f5f5dc]/50" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#f5f5dc]/50" />

            {/* Icône trophée */}
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
              className="text-2xl shrink-0"
              aria-hidden
            >
              ◈
            </motion.span>

            {/* Texte */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] tracking-[0.45em] uppercase text-[#f5f5dc]/45">
                Achievement Unlocked
              </span>
              <span className="text-base tracking-[0.12em] uppercase text-[#f5f5dc]">
                Aventurier
              </span>
              <span className="text-[10px] tracking-[0.15em] text-[#f5f5dc]/55 font-sans normal-case">
                A parcouru l'intégralité du portfolio
              </span>
            </div>

            {/* Barre de durée */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4.2, ease: 'linear', delay: 0.3 }}
              className="absolute bottom-0 left-0 h-[2px] w-full bg-[#f5f5dc]/40 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
