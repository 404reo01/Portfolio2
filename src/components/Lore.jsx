import React from 'react';

const loreFiles = [
  { id: '01', title: 'BUT 1 GEII', desc: 'Hardware & Systèmes embarqués.', rotation: 'rotate-y-12 rotate-x-6', pos: 'md:-translate-x-20' },
  { id: '02', title: 'Licence Éco-Gestion', desc: 'Business, parcours langue renforcée anglais, coréen.', rotation: '-rotate-y-12 -rotate-x-6', pos: 'md:translate-x-16' },
  { id: '03', title: 'BUT Passerelle TI', desc: 'Transition Informatique & Data.', rotation: 'rotate-y-6 rotate-x-12', pos: 'md:-translate-x-10' },
  { id: '04', title: 'BUT 3 Informatique', desc: 'Full-stack & Ingénierie.', rotation: '-rotate-y-12 rotate-x-3', pos: 'md:translate-x-24' }
];


export default function Lore() {
  return (
    <div id="Lore" className="min-h-screen py-32 px-6 font-pixel relative flex flex-col items-center bg-transparent overflow-hidden" style={{ perspective: '2000px' }}>
      
      {/* Titre avec lueur holographique */}
      <h2 className="text-3xl md:text-5xl text-[#f5f5dc] mb-32 uppercase tracking-[0.5em] drop-shadow-[0_0_20px_rgba(245,245,220,0.4)] opacity-90">
        Parcours
      </h2>

      <div className="relative w-full max-w-5xl flex flex-col items-center gap-24">
        
        {/* Le Chemin brisé (Style Vectoriel) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ transform: 'translateZ(-100px)' }}>
          <path 
            d="M 400 0 L 450 150 L 300 300 L 500 450 L 400 650" 
            fill="none" 
            stroke="#f5f5dc" 
            strokeWidth="1.5" 
            strokeDasharray="12 6"
          />
        </svg>

        {loreFiles.map((file, index) => (
          <div 
            key={file.id}
            className={`relative transition-all duration-700 ease-out group ${file.pos} ${file.rotation}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* LA DALLE DE VERRE 3D */}
            <div className="
              relative w-full max-w-md p-10 
              bg-white/5 backdrop-blur-[25px] 
              border border-white/20 
              shadow-[20px_20px_50px_rgba(0,0,0,0.5)]
              group-hover:border-white/50 group-hover:bg-white/10
              transition-all duration-500
            "
            style={{ 
              transform: 'translateZ(50px)',
              boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)' 
            }}>
              
              {/* Reflet de brillance sur le verre */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>

              {/* Badge d'index flottant (Effet 3D décalé) */}
              <div className="absolute -top-6 -left-6 bg-[#f5f5dc] text-black px-4 py-1 text-[12px] font-bold shadow-[6px_6px_0px_rgba(0,0,0,0.3)] transform translate-z-10">
                LOG_0{index + 1}
              </div>

              <h3 className="text-2xl text-[#f5f5dc] mb-4 uppercase tracking-widest drop-shadow-md">
                {file.title}
              </h3>
              
              <p className="text-lg text-gray-200/80 font-sans italic leading-relaxed">
                "{file.desc}"
              </p>

              {/* HUD Décoration */}
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="w-1 h-1 bg-white/20"></div>
                <div className="w-1 h-1 bg-white/40"></div>
              </div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#f5f5dc]/20"></div>
            </div>

            {/* Ombre portée flottante */}
            <div className="absolute inset-0 bg-black/40 blur-3xl -z-10 translate-y-12 translate-z-[-20px] scale-90 opacity-50"></div>
          </div>
        ))}
      </div>

      {/* Bio de fin - Plaque de verre centrée */}
      <div className="mt-48 relative max-w-3xl transform hover:scale-105 transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 bg-[#f5f5dc]/5 blur-[80px]"></div>
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-[40px] p-12 text-center shadow-2xl">
          <p className="text-[#f5f5dc]/90 font-sans text-xl italic leading-relaxed">
            Passionné par l'informatique, Rayan aime également les jeux vidéo, les mangas et le sport. 
            On pourrait en parler des heures, mais tenons-nous en à l'essentiel !
          </p>
          <div className="mt-6 text-[10px] uppercase tracking-[0.8em] text-[#f5f5dc]/30">End_Transmission</div>
        </div>
      </div>

      <style jsx>{`
        .rotate-y-12 { transform: rotateY(12deg) rotateX(2deg); }
        .rotate-x-6 { transform: rotateX(6deg) rotateY(2deg); }
        .-rotate-y-12 { transform: rotateY(-12deg) rotateX(-2deg); }
        .-rotate-x-6 { transform: rotateX(-6deg) rotateY(-2deg); }
        .rotate-y-6 { transform: rotateY(6deg) rotateZ(1deg); }
        .rotate-x-12 { transform: rotateX(12deg); }
        .rotate-x-3 { transform: rotateX(3deg) rotateY(-5deg); }
        
        @media (max-width: 768px) {
          .md\:-translate-x-20, .md\:translate-x-16, .md\:-translate-x-10, .md\:translate-x-24 {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}