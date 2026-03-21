import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, GlassCard, PixelButton } from './ui';

const projects = [
  {
    title: 'Reo Bonnes Idées',
    type: 'Projet Perso',
    stack: ['React', 'IA', 'GitHub API'],
    description: "Chatbot d'idées de projets avec analyse GitHub intégrée. L'IA au service de la créativité.",
    github: 'https://github.com/404reo01/reo-bonnes-idees',
    live: 'https://reobonneidees.netlify.app/',
  },
  {
    title: 'Live Cursor / Chat',
    type: 'Projet Perso',
    stack: ['WebSocket', 'Node.js', 'React'],
    description: "Messagerie instantanée avec WebSocket et curseurs partagés. Projet qui a pour but d'explorer et apprendre le web en temps réel.",
    github: 'https://github.com/404reo01/Live-cursor_chatBox',
  },
  {
    title: 'TrackStar App',
    type: 'Projet Universitaire',
    stack: ['React Native', 'API Spotify'],
    description: "Application mobile de recommandation musicale.",
    github: 'https://github.com/YannMKD/sae-but3-eco-mobile',
  },
  {
    title: 'Bot Stage Scraper',
    type: 'Projet Perso',
    stack: ['Python', 'Scraping', 'CSV'],
    description: "Outil de scraping sur Welcome to the Jungle pour filtrage intelligent d'offres CSV.",
    github: 'https://github.com/404reo01/bot-recherche-stage',
  },
];

const SWIPE_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 300;

export default function Quests() {
  const [index, setIndex] = useState(0);
  const [hasSwipedOnce, setHasSwipedOnce] = useState(false);

  const nextProject = () => setIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  function handleDragEnd(_, info) {
    const { offset, velocity } = info;
    const swipedFar  = Math.abs(offset.x) > SWIPE_THRESHOLD;
    const swipedFast = Math.abs(velocity.x) > VELOCITY_THRESHOLD;

    if (swipedFar || swipedFast) {
      setHasSwipedOnce(true);
      if (offset.x < 0) nextProject();
      else prevProject();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 select-none bg-transparent">
      <SectionHeader
        title="Projets"
        titleClassName="text-4xl font-pixel tracking-[0.5em] text-center opacity-90 mb-20"
      />

      {/* Zone swipable — wrapper draggable sur mobile */}
      <motion.div
        className="relative w-full max-w-4xl h-[480px] flex items-center justify-center touch-pan-y"
        style={{ perspective: '1200px' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project, i) => {
            const isCenter = i === index;
            const isLeft   = i === (index - 1 + projects.length) % projects.length;
            const isRight  = i === (index + 1) % projects.length;

            if (!isCenter && !isLeft && !isRight) return null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isCenter ? 1 : 0.2,
                  scale:   isCenter ? 1 : 0.7,
                  x:       isLeft ? -280 : isRight ? 280 : 0,
                  rotateY: isLeft ?  40  : isRight ? -40  : 0,
                  zIndex:  isCenter ? 30 : 10,
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="absolute w-72 h-[420px] cursor-pointer"
                onClick={() => setIndex(i)}
              >
                <GlassCard
                  variant="light"
                  shine
                  className="w-full h-full rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]
                             flex flex-col overflow-hidden group transition-all duration-500 hover:border-white/40"
                >
                  <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 bg-white/5">
                      <div className="text-[9px] text-white/40 uppercase tracking-[0.3em] mb-1">Sector_Data</div>
                      <div className="text-[11px] text-[#f5f5dc] font-pixel uppercase truncate">{project.type}</div>
                    </div>

                    {/* Titre central */}
                    <div className="flex-1 flex items-center justify-center p-6 text-center">
                      <h3 className="text-2xl font-pixel text-[#f5f5dc] leading-none uppercase tracking-tighter drop-shadow-md">
                        {project.title}
                      </h3>
                    </div>

                    {/* Stack badges */}
                    <div className="px-4 pb-3 flex flex-wrap justify-center gap-1.5">
                      {project.stack.map(s => (
                        <span key={s} className="text-[9px] font-pixel uppercase tracking-widest
                                                  px-2 py-0.5 border border-[#f5f5dc]/15
                                                  text-[#f5f5dc]/50 bg-black/20">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Dots pagination carte */}
                    <div className="p-4 bg-black/20 flex justify-center gap-2">
                      {projects.map((_, di) => (
                        <div key={di} className={`w-1 h-1 transition-all duration-300
                          ${di === i ? 'bg-[#f5f5dc]/80 scale-125' : 'bg-[#f5f5dc]/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Indicateur swipe — visible sur mobile, disparaît après le premier swipe */}
        <AnimatePresence>
          {!hasSwipedOnce && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 md:hidden
                         font-pixel text-[9px] text-[#f5f5dc]/35 tracking-[0.3em] uppercase
                         flex items-center gap-2 pointer-events-none"
            >
              <motion.span
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                ‹
              </motion.span>
              swipe
              <motion.span
                animate={{ x: [3, -3, 3] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                ›
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Panneau de détails */}
      <GlassCard
        variant="strong"
        className="mt-16 w-full max-w-2xl p-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-2xl"
      >
        <div className="absolute -inset-1 bg-[#f5f5dc]/5 blur-2xl rounded-2xl -z-10" />

        {/* Navigation desktop + dots */}
        <div className="flex justify-between items-center mb-10">
          <PixelButton variant="nav" onClick={prevProject} className="hidden md:block text-[15px] pb-1">
            ← Précédent
          </PixelButton>

          {/* Dots cliquables */}
          <div className="flex items-center gap-2 mx-auto md:mx-0">
            {projects.map((_, di) => (
              <button
                key={di}
                onClick={() => setIndex(di)}
                className={`transition-all duration-300 rounded-none
                  ${di === index
                    ? 'w-4 h-1.5 bg-[#f5f5dc]/80'
                    : 'w-1.5 h-1.5 bg-[#f5f5dc]/20 hover:bg-[#f5f5dc]/40'
                  }`}
              />
            ))}
          </div>

          <PixelButton variant="nav" onClick={nextProject} className="hidden md:block text-[15px] pb-1">
            Suivant →
          </PixelButton>
        </div>

        <p className="text-xl font-sans italic text-[#f5f5dc]/80 mb-12 leading-relaxed text-center">
          "{projects[index].description}"
        </p>

        <div className="flex gap-4">
          <PixelButton
            as="a"
            variant="ghost"
            href={projects[index].github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 text-center text-[13px] flex items-center justify-center gap-2"
          >
            <span className="text-[#f5f5dc]/50">⌥</span> Code Source
          </PixelButton>

          {projects[index].live && (
            <a
              href={projects[index].live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <motion.div
                animate={{ boxShadow: ['0 0 10px rgba(245,245,220,0.08)', '0 0 28px rgba(245,245,220,0.22)', '0 0 10px rgba(245,245,220,0.08)'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full py-4 text-center font-pixel uppercase text-[13px] tracking-[0.3em]
                           bg-[#f5f5dc]/10 border border-[#f5f5dc]/35
                           text-[#f5f5dc] hover:bg-[#f5f5dc]/20 transition-colors duration-200
                           flex items-center justify-center gap-2"
              >
                <span className="text-[#f5f5dc]/60">▶</span> Démo Live
              </motion.div>
            </a>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
