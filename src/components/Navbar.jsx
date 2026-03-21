import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Accueil',     target: 'Accueil' },
  { label: 'Compétences', target: 'CharacterIntro' },
  { label: 'Parcours',    target: 'Lore' },
  { label: 'Projets',     target: 'Quests' },
  { label: 'Hobbies',     target: 'Sidequests' },
  { label: 'Contact',     target: 'Contact' },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActive]    = useState('Accueil');
  const [menuOpen, setMenuOpen]       = useState(false);

  // Fond opaque dès 40px de scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section active via IntersectionObserver (même pattern que Avatar)
  useEffect(() => {
    const observers = NAV_ITEMS.map(({ target }) => {
      const el = document.getElementById(target);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(target); },
        { threshold: 0.35, rootMargin: '-56px 0px 0px 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  // Fermeture drawer au clavier
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* ── Barre principale ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] font-pixel transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-black/80 backdrop-blur-md border-b border-[#f5f5dc]/10'
            : 'bg-black/60 md:bg-black/20 md:backdrop-blur-none border-b border-[#f5f5dc]/5'
        }`}
      >
        <div className="w-full px-4 h-14 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => { scrollToSection('Accueil'); setMenuOpen(false); }}
            className="text-[#f5f5dc] text-lg tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
          >
            REO
          </button>

          {/* Nav desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, target }) => (
              <button
                key={target}
                onClick={() => scrollToSection(target)}
                className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  activeSection === target
                    ? 'text-[#f5f5dc]'
                    : 'text-[#f5f5dc]/35 hover:text-[#f5f5dc]/70'
                }`}
              >
                {label}
                {activeSection === target && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 bg-[#f5f5dc]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden flex flex-col justify-center gap-[6px] p-2 -mr-1 shrink-0"
            aria-label="Ouvrir le menu"
          >
            <div className={`w-6 h-[2px] bg-[#f5f5dc] rounded-sm transition-transform duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <div className={`w-6 h-[2px] bg-[#f5f5dc] rounded-sm transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-[2px] bg-[#f5f5dc] rounded-sm transition-transform duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>

        </div>
      </nav>

      {/* ── Drawer mobile ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="fixed top-14 left-0 right-0 z-[499] bg-black/90 backdrop-blur-xl border-b border-[#f5f5dc]/10 font-pixel"
          >
            {/* Coins HUD */}
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#f5f5dc]/25" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#f5f5dc]/25" />

            <div className="flex flex-col py-1">
              {NAV_ITEMS.map(({ label, target }, i) => (
                <motion.button
                  key={target}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                  onClick={() => { scrollToSection(target); setMenuOpen(false); }}
                  className={`flex items-center gap-3 px-6 py-4 text-left text-sm uppercase tracking-[0.2em]
                    border-b border-[#f5f5dc]/5 last:border-0 transition-colors ${
                    activeSection === target
                      ? 'text-[#f5f5dc] bg-[#f5f5dc]/5'
                      : 'text-[#f5f5dc]/40 hover:text-[#f5f5dc]/70'
                  }`}
                >
                  <span className="text-[#f5f5dc]/20 text-[9px] tracking-widest w-5 shrink-0">
                    0{i + 1}
                  </span>
                  {label}
                  {activeSection === target && (
                    <span className="ml-auto w-1 h-1 bg-[#f5f5dc] shrink-0" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
