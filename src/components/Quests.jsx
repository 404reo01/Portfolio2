import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: 'Reo Bonnes Idées',
    type: 'Projet Perso',
    description: "Chatbot d'idées de projets avec analyse GitHub intégrée. L'IA au service de la créativité.",
    github: 'https://github.com/404reo01/reo-bonnes-idees',
    live: 'https://reobonneidees.netlify.app/',
  },
  {
    title: 'Live Cursor / Chat',
    type: 'Projet Perso',
    description: "Messagerie instantanée avec WebSocket et curseurs partagés. Projet qui a pour but d'explorer et apprendre le web en temps réel.",
    github: 'https://github.com/404reo01/Live-cursor_chatBox',
  },
  {
    title: 'TrackStar App',
    type: 'Projet Universitaire',
    description: "Application mobile de recommandation musicale.",
    github: 'https://github.com/YannMKD/sae-but3-eco-mobile',
  },
  {
    title: 'Bot Stage Scraper',
    type: 'Projet Perso',
    description: "Outil de scraping sur Welcome to the Jungle pour filtrage intelligent d'offres CSV.",
    github: 'https://github.com/404reo01/bot-recherche-stage',
  },
];

export default function Quests() {
  const [index, setIndex] = useState(0);

  const nextProject = () => setIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 overflow-hidden select-none bg-transparent">
      <h2 className="text-4xl font-pixel text-[#f5f5dc] mb-16 uppercase tracking-[0.2em] border-b-4 border-[#f5f5dc] pb-4 text-center">
        Mes projets 
      </h2>

      {/* Container du Carrousel */}
      <div className="relative w-full max-w-2xl h-[450px] flex items-center justify-center" style={{ perspective: '1200px' }}>
        <AnimatePresence mode="popLayout">
          {projects.map((project, i) => {
            const isCenter = i === index;
            const isLeft = i === (index - 1 + projects.length) % projects.length;
            const isRight = i === (index + 1) % projects.length;

            if (!isCenter && !isLeft && !isRight) return null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isCenter ? 1 : 0.4,
                  scale: isCenter ? 1.1 : 0.8,
                  x: isLeft ? -200 : isRight ? 200 : 0,
                  rotateY: isLeft ? 55 : isRight ? -55 : 0,
                  zIndex: isCenter ? 30 : 10,
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                className="absolute w-72 h-[400px] cursor-pointer"
                onClick={() => setIndex(i)}
              >
                {/* La Cartouche */}
                <div className="w-full h-full bg-[#f5f5dc] rounded-t-2xl border-x-[6px] border-t-[6px] border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden">
                  
                  {/* ZONE HAUTE (Le titre hors cadre) */}
                  <div className="w-full h-14 bg-[#d4d4aa] border-b-[4px] border-black flex flex-col items-center justify-center px-4 relative">
                    <span className="text-[10px] font-pixel text-black/60 uppercase tracking-tighter mb-1">
                      Rayan OS // 2026
                    </span>
                    <span className="text-[12px] font-pixel text-black uppercase font-bold text-center leading-none">
                      {project.type}
                    </span>
                    {/* Petites encoches décoratives sur les côtés */}
                    <div className="absolute left-2 w-1.5 h-6 bg-black/10 rounded-full" />
                    <div className="absolute right-2 w-1.5 h-6 bg-black/10 rounded-full" />
                  </div>

                  {/* ZONE ÉTIQUETTE (Le cadre principal) */}
                  <div className="flex-1 m-4 bg-[#202025] border-[4px] border-black flex flex-col items-center justify-center p-6 text-center shadow-inner">
                    <h3 className="text-xl font-pixel text-[#f5f5dc] leading-tight uppercase tracking-normal">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* ZONE BASSE (Grip tactile) */}
                  <div className="h-12 bg-[#d4d4aa] border-t-[4px] border-black flex gap-1.5 px-4 items-center">
                    {[...Array(8)].map((_, j) => (
                      <div key={j} className="flex-1 h-6 bg-black/10 rounded-full" />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Panneau de détails */}
      <div className="mt-12 w-full max-w-xl bg-[#202025] border-4 border-[#f5f5dc] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={prevProject} 
            className="bg-[#f5f5dc] text-black px-4 py-2 font-pixel text-sm hover:bg-[#d4d4aa] active:translate-y-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            &lt; PREV
          </button>
          <span className="font-pixel text-xs text-[#f5f5dc] opacity-60">ID: 0{index + 1}</span>
          <button 
            onClick={nextProject} 
            className="bg-[#f5f5dc] text-black px-4 py-2 font-pixel text-sm hover:bg-[#d4d4aa] active:translate-y-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            NEXT &gt;
          </button>
        </div>

        <p className="text-base font-pixel text-[#f5f5dc] mb-8 leading-relaxed min-h-[80px] text-center">
          {projects[index].description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={projects[index].github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 border-2 border-[#f5f5dc] text-[#f5f5dc] font-pixel text-sm hover:bg-[#f5f5dc] hover:text-[#202025] transition-all"
          >
            [ VIEW_CODE ]
          </a>
          {projects[index].live && (
            <a
              href={projects[index].live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3 bg-[#f5f5dc] text-[#202025] font-pixel text-sm hover:bg-[#d4d4aa] transition-all shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]"
            >
              START_GAME
            </a>
          )}
        </div>
      </div>
    </div>
  );
}