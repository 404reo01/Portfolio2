import React from 'react';

const quests = [
  {
    title: 'BUT 1 GEII',
    status: 'COMPLETED',
    description: 'Electronique et systèmes embarqués. Les bases du hardware.',
  },
  {
    title: 'Licence Éco-Gestion',
    status: 'COMPLETED',
    description: 'Parcours langues renforcées (anglais, coréen). Vision business.',
  },
  {
    title: 'BUT Passerelle TI',
    status: 'COMPLETED',
    description: "Transition vers l'informatique et la data science.",
  },
  {
    title: 'BUT 3 Informatique',
    status: 'IN PROGRESS',
    description: "Développement d'applications web et data science.",
  },
];

export default function Lore() {
  return (
    <div className="text-white font-pixel px-4 py-12 flex flex-col items-center bg-transparent">
      {/* Header avec effet de texte clignotant type terminal */}
      <h2 className="text-3xl mb-10 text-center tracking-widest uppercase">
        
        Lore et parcours
      </h2>

      {/* Le Moniteur CRT */}
      <div className="relative w-full max-w-5xl bg-[#c0c0c0] p-4 md:p-8 rounded-lg border-t-[6px] border-l-[6px] border-[#e0e0e0] border-b-[6px] border-r-[6px] border-[#808080] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)]">
        
        {/* L'écran interne (La dalle) */}
        <div className="bg-[#1a1a1a] rounded-sm p-4 md:p-8 border-4 border-[#3a3a3a] relative overflow-hidden ring-offset-4 ring-offset-[#c0c0c0] ring-2 ring-[#808080]">
          
          {/* Effet Scanlines (Les lignes de l'écran rétro) */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>

          {/* Grille des dossiers/quêtes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
            {quests.map((quest, index) => (
              <div 
                key={index} 
                className="group relative bg-[#2a2a2a] border-2 border-[#4a4a4a] p-4 hover:border-beige-500 transition-colors"
              >
                {/* Barre de titre de la "fenêtre" */}
                <div className="flex justify-between items-center mb-3 border-b border-[#4a4a4a] pb-2">
                  <span className="text-[10px] text-gray-500">QUEST_0{index + 1}.EXE</span>
                  <div className={`text-[10px] px-2 py-0.5 rounded-sm ${quest.status === 'COMPLETED' ? 'bg-green-900 text-green-400' : 'bg-blue-900 text-blue-400 animate-pulse'}`}>
                    {quest.status}
                  </div>
                </div>

                <h3 className="text-lg text-[#d1d1b1] mb-2 uppercase tracking-tighter">
                  {quest.title}
                </h3>
                
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  {quest.description}
                </p>

                
              </div>
            ))}
          </div>

          {/* Footer de l'écran */}
          <div className="mt-8 pt-4 border-t border-[#3a3a3a] text-center text-[12px] text-green-500 opacity-70">
            [ SYSTEM OK  ]
          </div>
        </div>

        {/* Bouton de mise sous tension du moniteur (Décoratif) */}
        <div className="absolute -bottom-6 right-10 flex gap-4">
            <div className="w-8 h-2 bg-[#808080] rounded-full border-b-2 border-white"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_5px_green]"></div>
        </div>
      </div>

      {/* Description de bas de page */}
      <div className="mt-16 bg-[#e0e0d0] text-black border-4 border-black p-6 max-w-3xl text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <p className="leading-relaxed">
          Passionné par l'informatique, Rayan aime également les jeux vidéo (stratégie & aventure), les mangas et le sport. 
          De par son affinité avec ces domaines, on pourrait en parler des heures, mais tenons-nous en à l'essentiel !
        </p>
      </div>
    </div>
  );
}