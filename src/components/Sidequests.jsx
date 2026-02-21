import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sideQuests = [
  {
    id: 'tech',
    title: 'Tech',
    content: 'En plus du développement, j’aime tout ce qui se rapporte à la tech.',
    spotifyUrl: 'https://open.spotify.com/embed/track/1fLEbwf9nT9yY5IjNtLYgy?utm_source=generator" width="100%" height="352',
  },
  {
    id: 'mangas',
    title: 'Mangas & Anime',
    content: 'Une source inépuisable d’inspiration. Top 3 : Kingdom, Fullmetal Alchemist, et Vinland Saga.',
    spotifyUrl: 'https://open.spotify.com/embed/track/7hzm68uGbxcvQY9FAtpk2s?utm_source=generator&theme=0',
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneuriat',
    content: 'Je me suis toujours interessé à l’entrepreneuriat, les histoires de succès me motivent.',
    spotifyUrl: 'https://open.spotify.com/embed/track/3dgQqOiQ9fCKVhNOedd2lf?utm_source=generator" width="100%',
  },
  {
    id: 'karate',
    title: 'Arts Martiaux',
    content: 'Ceinture Noire de Karaté, j’ai pratiqué plusieurs arts martiaux. L’esprit des arts martiaux m’a beaucoup appris.',
    spotifyUrl: 'https://open.spotify.com/embed/track/5cIlenIl5nRku8mmz9S5c8?utm_source=generator" width="100%',
  },
];

export default function Journal() {
  const [activeTab, setActiveTab] = useState(sideQuests[0]);

  return (
    <div className="flex flex-col items-center py-24 px-4 font-pixel select-none bg-transparent">
      {/* Header épuré */}
      <h2 className="text-3xl text-[#f5f5dc] mb-16 uppercase tracking-[0.5em] opacity-80 text-center">
        Side_Quests
      </h2>

      {/* Le Container en Verre */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row min-h-[450px] relative">
        {/* Lueur d'ambiance en arrière-plan */}
        <div className="absolute -inset-2 bg-[#f5f5dc]/5 blur-3xl rounded-3xl -z-10 opacity-50"></div>

        {/* Navigation Gauche - Onglets en Verre */}
        <div className="w-full md:w-[240px] flex md:flex-col gap-2 p-2 relative z-20">
          {sideQuests.map((quest) => (
            <button
              key={quest.id}
              onClick={() => setActiveTab(quest)}
              className={`py-6 px-6 text-left transition-all duration-500 border relative overflow-hidden backdrop-blur-md ${
                activeTab.id === quest.id 
                ? 'bg-[#f5f5dc]/20 border-[#f5f5dc]/40 text-[#f5f5dc] shadow-[0_0_20px_rgba(245,245,220,0.1)]' 
                : 'bg-white/5 border-white/10 text-[#f5f5dc]/40 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {activeTab.id === quest.id && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-gradient-to-r from-[#f5f5dc]/10 to-transparent pointer-events-none" 
                />
              )}
              <span className="relative z-10 text-sm uppercase tracking-widest font-bold">
                {quest.title}
              </span>
            </button>
          ))}
        </div>

        {/* Contenu Droite - La Dalle de Données (Effet Verre) */}
        <div className="flex-1 p-2 relative z-10">
          <div className="h-full w-full bg-black/40 backdrop-blur-[40px] border border-white/10 p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl">
            
            {/* Reflet spéculaire sur le verre */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="text-[9px] text-[#f5f5dc]/40 mb-4 tracking-[0.4em] uppercase">
                  Data_Stream // {activeTab.id}
                </div>
                
                <h3 className="text-2xl md:text-3xl text-[#f5f5dc] uppercase mb-8 tracking-tighter flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[#f5f5dc]/40"></span>
                  {activeTab.title}
                </h3>
                
                <p className="text-lg md:text-xl leading-relaxed text-[#f5f5dc]/80 font-sans italic">
                  "{activeTab.content}"
                </p>

                <div className="mt-12 flex items-center gap-4 opacity-20">
                  <div className="h-[1px] w-full bg-[#f5f5dc]"></div>
                  <div className="text-[10px] whitespace-nowrap tracking-widest uppercase">End_Log</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Spotify Player - Sans filtres bizarres */}
      <div className="mt-20 w-full max-w-xl flex flex-col items-center">
        <h4 className="text-[#f5f5dc]/40 text-[9px] mb-6 uppercase tracking-[0.5em]">
            Atmospheric_Background
        </h4>
        <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <iframe
            src={activeTab.spotifyUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
            className="opacity-90 hover:opacity-100 transition-opacity"
          ></iframe>
        </div>
      </div>
    </div>
  );
}