import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HudCorners } from './ui';

const NAV_MAP = {
  accueil:     'Accueil',
  competences: 'CharacterIntro',
  skills:      'CharacterIntro',
  parcours:    'Lore',
  lore:        'Lore',
  projets:     'Quests',
  projects:    'Quests',
  hobbies:     'Sidequests',
  sidequests:  'Sidequests',
  contact:     'Contact',
};

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const HELP_LINES = [
  '┌─ Commandes disponibles ──────────────────────┐',
  '│  help              Afficher cette aide        │',
  '│  whoami            Infos sur le développeur   │',
  '│  cd <section>      Naviguer vers une section  │',
  '│    accueil · competences · parcours           │',
  '│    projets · hobbies · contact                │',
  '│  clear             Vider le terminal          │',
  '│  exit / q          Fermer                     │',
  '└──────────────────────────────────────────────┘',
];

const WHOAMI_LINES = [
  '> Rayan EL OUAZZANI',
  '> Développeur Full Stack — BUT Informatique 3e année',
  '> Stack : React · Next.js · Node.js · NestJS · Supabase',
  '> Président BDE · En recherche d\'alternance',
  '> Status : ● Disponible',
];

export default function Terminal({ onPhysics }) {
  const [isOpen, setIsOpen]   = useState(false);
  const [input, setInput]     = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'reo_terminal v1.0 — "help" pour la liste des commandes' },
  ]);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  /* Ouvrir avec '/', fermer avec Escape */
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (e.key === '/' && !isOpen && tag !== 'input' && tag !== 'textarea') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  /* Focus auto à l'ouverture */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 60);
  }, [isOpen]);

  /* Scroll bas à chaque nouvelle ligne */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  function push(lines) {
    setHistory(prev => [...prev, ...lines.map(text => ({ type: 'output', text }))]);
  }

  function run(raw) {
    const cmd = raw.trim();
    setHistory(prev => [...prev, { type: 'cmd', text: cmd }]);
    setInput('');
    if (!cmd) return;

    const lower = cmd.toLowerCase();

    if (lower === 'help') {
      push(HELP_LINES);

    } else if (lower === 'whoami') {
      push(WHOAMI_LINES);

    } else if (lower === 'clear') {
      setHistory([{ type: 'system', text: 'Terminal cleared.' }]);

    } else if (lower === 'exit' || lower === 'q') {
      setIsOpen(false);

    } else if (lower.startsWith('cd ')) {
      const target = lower.slice(3).trim();
      const sectionId = NAV_MAP[target];
      if (sectionId) {
        push([`→ Chargement de "${target}"...`]);
        setTimeout(() => { scrollToSection(sectionId); setIsOpen(false); }, 420);
      } else {
        push([
          `Erreur : section "${target}" inconnue.`,
          'Sections : accueil · competences · parcours · projets · hobbies · contact',
        ]);
      }

    } else if (lower === 'physics' || lower === 'run physics') {
      push(['⚠ Initialisation du moteur physique...', 'Appuyez sur Échap pour réinitialiser.']);
      setTimeout(() => { onPhysics?.(); setIsOpen(false); }, 600);

    } else {
      push([`Commande inconnue : "${cmd}". Tapez "help".`]);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[700] bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Fenêtre terminal */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       z-[701] w-full max-w-lg font-pixel"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="relative bg-black/95 backdrop-blur-xl border border-[#f5f5dc]/25 overflow-hidden"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,245,220,0.012) 2px, rgba(245,245,220,0.012) 4px)',
              }}
            >
              <HudCorners color="border-[#f5f5dc]/40" thickness={2} />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#f5f5dc]/10">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#f5f5dc]/45">
                  reo@portfolio:~
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[9px] tracking-[0.3em] text-[#f5f5dc]/25 hover:text-[#f5f5dc]/60 transition-colors uppercase"
                >
                  [esc]
                </button>
              </div>

              {/* Historique */}
              <div className="px-5 py-4 h-52 overflow-y-auto space-y-1 text-sm leading-relaxed">
                {history.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.type === 'cmd'    ? 'text-[#f5f5dc]/90' :
                      line.type === 'system' ? 'text-[#f5f5dc]/30 text-xs' :
                                               'text-[#f5f5dc]/60'
                    }
                  >
                    {line.type === 'cmd' && (
                      <span className="text-[#f5f5dc]/35 mr-2 select-none">$</span>
                    )}
                    {line.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-3 px-5 py-3 border-t border-[#f5f5dc]/10">
                <span className="text-[#f5f5dc]/35 text-sm select-none shrink-0">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') run(input); }}
                  className="flex-1 bg-transparent text-[#f5f5dc]/90 text-sm outline-none
                             caret-[#f5f5dc] placeholder:text-[#f5f5dc]/20"
                  placeholder="tapez une commande..."
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
