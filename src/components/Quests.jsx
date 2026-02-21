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
    <div className="flex flex-col items-center justify-center py-24 px-4 select-none bg-transparent">
      <h2 className="text-4xl font-pixel text-[#f5f5dc] mb-20 uppercase tracking-[0.5em] text-center opacity-90">
        Projets
      </h2>

      {/* Carrousel 3D avec effet Verre */}
      <div className="relative w-full max-w-4xl h-[480px] flex items-center justify-center" style={{ perspective: '1200px' }}>
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
                  opacity: isCenter ? 1 : 0.2,
                  scale: isCenter ? 1 : 0.7,
                  x: isLeft ? -280 : isRight ? 280 : 0,
                  rotateY: isLeft ? 40 : isRight ? -40 : 0,
                  zIndex: isCenter ? 30 : 10,
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="absolute w-72 h-[420px] cursor-pointer"
                onClick={() => setIndex(i)}
              >
                {/* LA DALLE DE VERRE */}
                <div className="
                  relative w-full h-full 
                  bg-white/5 backdrop-blur-2xl 
                  rounded-xl border border-white/20 
                  shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]
                  flex flex-col overflow-hidden
                  group transition-all duration-500
                  hover:border-white/40
                ">
                  {/* Reflet de brillance sur le verre */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Bordure interne lumineuse (tranche du verre) */}
                  <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"></div>

                  {/* Contenu de la carte */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header technique */}
                    <div className="p-6 border-b border-white/10 bg-white/5">
                      <div className="text-[9px] text-white/40 uppercase tracking-[0.3em] mb-1">Sector_Data</div>
                      <div className="text-[11px] text-[#f5f5dc] font-pixel uppercase truncate">
                        {project.type}
                      </div>
                    </div>

                    {/* Titre central */}
                    <div className="flex-1 flex items-center justify-center p-6 text-center">
                      <h3 className="text-2xl font-pixel text-[#f5f5dc] leading-none uppercase tracking-tighter drop-shadow-md">
                        {project.title}
                      </h3>
                    </div>

                    {/* Footer Carte */}
                    <div className="p-4 bg-black/20 flex justify-center gap-2">
                       <div className="w-1 h-1 bg-[#f5f5dc]/50"></div>
                       <div className="w-1 h-1 bg-[#f5f5dc]/30"></div>
                       <div className="w-1 h-1 bg-[#f5f5dc]/10"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Panneau de détails (L'écran de contrôle en verre) */}
      <div className="mt-16 w-full max-w-2xl 
        bg-black/60 backdrop-blur-[30px] 
        border border-white/10 p-10 
        shadow-[0_0_100px_rgba(0,0,0,0.5)] 
        rounded-2xl relative"
      >
        {/* Lueur d'ambiance derrière le verre */}
        <div className="absolute -inset-1 bg-[#f5f5dc]/5 blur-2xl rounded-2xl -z-10"></div>

        <div className="flex justify-between items-center mb-10">
          <button onClick={prevProject} className="text-[#f5f5dc]/60 hover:text-[#f5f5dc] transition-colors font-pixel text-[15px] uppercase tracking-widest border-b border-[#f5f5dc]/20 pb-1">
            Précédent
          </button>
          <span className="font-pixel text-[10px] text-[#f5f5dc]/30">LOG_{index + 1}</span>
          <button onClick={nextProject} className="text-[#f5f5dc]/60 hover:text-[#f5f5dc] transition-colors font-pixel text-[15px] uppercase tracking-widest border-b border-[#f5f5dc]/20 pb-1">
            Suivant
          </button>
        </div>

        <p className="text-xl font-sans italic text-[#f5f5dc]/80 mb-12 leading-relaxed text-center">
          "{projects[index].description}"
        </p>

        <div className="flex gap-8">
          <a href={projects[index].github} target="_blank" rel="noopener noreferrer" 
             className="flex-1 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-[#f5f5dc]/60 hover:text-[#f5f5dc] text-center font-pixel text-[15px] uppercase tracking-[0.3em] transition-all">
            [ SRC_CODE ]
          </a>
          {projects[index].live && (
            <a href={projects[index].live} target="_blank" rel="noopener noreferrer" 
               className="flex-1 py-4 bg-[#f5f5dc]/10 border border-[#f5f5dc]/30 hover:bg-[#f5f5dc]/20 text-[#f5f5dc] text-center font-pixel text-[15px] uppercase tracking-[0.3em] transition-all shadow-[0_0_30px_rgba(245,245,220,0.1)]">
              EXECUTE_SYS
            </a>
          )}
        </div>
      </div>
    </div>
  );
}