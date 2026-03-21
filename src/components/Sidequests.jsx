import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, GlassCard } from './ui';

const sideQuests = [
  {
    id: 'tech',
    title: 'Tech',
    symbol: '⌘',
    content: "En plus du développement, j'aime tout ce qui se rapporte à la tech. J'ai participé à des évenements tels que la nuit de l'info et fais plusieurs salons tech comme Vivatech.",
    spotifyUrl: 'https://open.spotify.com/embed/track/1fLEbwf9nT9yY5IjNtLYgy?utm_source=generator',
  },
  {
    id: 'mangas',
    title: 'Mangas & Anime',
    symbol: '✦',
    content: "Une source inépuisable d'inspiration. Top 3 : Kingdom, Fullmetal Alchemist, et Vinland Saga.",
    spotifyUrl: 'https://open.spotify.com/embed/track/7hzm68uGbxcvQY9FAtpk2s?utm_source=generator&theme=0',
  },
  {
    id: 'entrepreneur',
    title: 'Entrepreneuriat',
    symbol: '◆',
    content: "Je me suis toujours interessé à l'entrepreneuriat, les histoires de succès me motivent.",
    spotifyUrl: 'https://open.spotify.com/embed/track/3dgQqOiQ9fCKVhNOedd2lf?utm_source=generator',
  },
  {
    id: 'karate',
    title: 'Arts Martiaux',
    symbol: '⬡',
    content: "Ceinture Noire de Karaté, j'ai pratiqué plusieurs arts martiaux. L'esprit des arts martiaux m'a beaucoup appris.",
    spotifyUrl: 'https://open.spotify.com/embed/track/5cIlenIl5nRku8mmz9S5c8?utm_source=generator',
  },
];

export default function Journal() {
  const [activeTab, setActiveTab] = useState(sideQuests[0]);

  return (
    <div id="Sidequests" className="flex flex-col items-center py-24 px-4 font-pixel select-none bg-transparent">
      <SectionHeader
        title="Side_Quests"
        titleClassName="text-3xl tracking-[0.5em] opacity-80 text-center mb-16"
      />

      <div className="w-full max-w-4xl flex flex-col md:flex-row min-h-[450px] relative">
        {/* Lueur d'ambiance */}
        <div className="absolute -inset-2 bg-[#f5f5dc]/5 blur-3xl rounded-3xl -z-10 opacity-50" />

        {/* Onglets gauche */}
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
              {/* Fond glow actif */}
              {activeTab.id === quest.id && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-gradient-to-r from-[#f5f5dc]/10 to-transparent pointer-events-none"
                />
              )}

              {/* Barre latérale active */}
              {activeTab.id === quest.id && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute left-0 top-0 h-full w-[2px] bg-[#f5f5dc]/70"
                />
              )}

              <span className="relative z-10 text-sm uppercase tracking-widest font-bold flex items-center gap-3">
                <span className={`transition-all duration-300 ${activeTab.id === quest.id ? 'opacity-70' : 'opacity-20'}`}>
                  {quest.symbol}
                </span>
                {quest.title}
              </span>
            </button>
          ))}
        </div>

        {/* Panneau contenu */}
        <div className="flex-1 p-2 relative z-10">
          <GlassCard
            variant="dark"
            shine
            className="h-full w-full p-10 flex flex-col justify-center overflow-hidden shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, filter: 'blur(6px)', scale: 0.98 }}
                animate={{
                  opacity: [0, 0.6, 0.85, 1],
                  filter: 'blur(0px)',
                  scale: 1,
                }}
                exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.98 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative z-10"
              >
                {/* Titre */}
                <h3 className="text-2xl md:text-3xl text-[#f5f5dc] uppercase mb-8 tracking-tighter flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[#f5f5dc]/40" />
                  {activeTab.title}
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl leading-relaxed text-[#f5f5dc]/80 font-sans">
                  {activeTab.content}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Filigrane symbolique animé */}
            <AnimatePresence mode="wait">
              <motion.span
                key={activeTab.symbol}
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(12px)' }}
                animate={{ opacity: 0.04, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                aria-hidden
                className="absolute bottom-4 right-6 text-[#f5f5dc] select-none pointer-events-none leading-none"
                style={{ fontSize: 'clamp(90px, 14vw, 160px)' }}
              >
                {activeTab.symbol}
              </motion.span>
            </AnimatePresence>
          </GlassCard>
        </div>
      </div>

      {/* Spotify Player */}
      <div className="mt-20 w-full max-w-xl flex flex-col items-center">
        <p className="text-[#f5f5dc]/40 text-[9px] mb-6 uppercase tracking-[0.5em]">
          Playlist · {activeTab.title}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="w-full rounded-xl overflow-hidden shadow-2xl border border-white/10"
          >
            <iframe
              src={activeTab.spotifyUrl}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`Spotify · ${activeTab.title}`}
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
