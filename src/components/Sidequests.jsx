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
    <div className="flex flex-col items-center py-16 px-4 font-pixel select-none">
      <h2 className="text-3xl text-[#f5f5dc] mb-10 uppercase tracking-[0.2em] border-b-4 border-[#f5f5dc] pb-2 text-center">
        Quêtes Annexes
      </h2>

      {/* Le Journal - Taille ajustée pour éviter le vide */}
      <div className="w-full max-w-3xl bg-[#f5f5dc] border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)] flex flex-col md:flex-row min-h-[350px] overflow-hidden">
        
        {/* Navigation Gauche */}
        <div className="w-full md:w-[220px] bg-[#d4d4aa] border-b-[6px] md:border-b-0 md:border-r-[6px] border-black flex md:flex-col">
          {sideQuests.map((quest) => (
            <button
              key={quest.id}
              onClick={() => setActiveTab(quest)}
              className={`py-5 px-6 text-left transition-all relative ${
                activeTab.id === quest.id 
                ? 'bg-[#202025] text-[#f5f5dc]' 
                : 'bg-transparent text-black hover:bg-black/5'
              }`}
            >
              {activeTab.id === quest.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600 animate-pulse" />
              )}
              <span className="text-xl uppercase font-bold tracking-tighter">
                {quest.title}
              </span>
            </button>
          ))}
        </div>

        {/* Contenu Droite - L'ESPACE */}
        <div className="flex-1 bg-[#050505] p-8 relative overflow-hidden flex flex-col justify-center">
          
          {/* Fond Stellaire animé en CSS */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="stars-container">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute bg-white rounded-full animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: Math.random() * 3 + 'px',
                    height: Math.random() * 3 + 'px',
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="relative z-10"
            >
              <div className="text-[10px] text-red-500 mb-2 tracking-[0.3em] font-bold">
                LOG_TYPE: {activeTab.id.toUpperCase()}
              </div>
              
              <h3 className="text-2xl text-[#f5f5dc] uppercase mb-6 tracking-tight border-l-4 border-[#f5f5dc] pl-4">
                {activeTab.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-[#f5f5dc]/90 font-mono italic bg-black/40 p-4 border border-[#f5f5dc]/10 backdrop-blur-[2px]">
                "{activeTab.content}"
              </p>

              <div className="mt-8 flex items-center gap-2 opacity-30">
                <div className="h-[1px] flex-1 bg-[#f5f5dc]"></div>
                <div className="w-2 h-2 rounded-full bg-[#f5f5dc]"></div>
                <div className="h-[1px] flex-1 bg-[#f5f5dc]"></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Spotify Player */}
      <div className="mt-12 w-full max-w-xl flex flex-col items-center">
        <h4 className="text-[#f5f5dc] text-[10px] mb-4 opacity-50 uppercase tracking-[0.4em]">
           Sub-Quest Soundtrack
        </h4>
        <div className="w-full bg-[#121212] rounded-lg overflow-hidden border-2 border-[#f5f5dc]/30 shadow-2xl">
          <iframe
            src={activeTab.spotifyUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
            className="opacity-80 hover:opacity-100 transition-opacity"
          ></iframe>
        </div>
      </div>
    </div>
  );
}