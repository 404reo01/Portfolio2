import React from 'react';
// Import de l'image de fond
import bgImage from '../assets/bg.jpg'; 

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function LandingPage() {
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 5;
      stars.push(
        <div
          key={i}
          className="absolute rounded-full bg-white z-10"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animation: `shoot ${duration}s linear ${delay}s infinite`,
          }}
        ></div>
      );
    }
    return stars;
  };

  return (
    <>
      <style>{`
        
        

        /* Etoiles filantes */
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 50; }
          10% { opacity: 100; }
          100% { transform: translateX(100px) translateY(200px) scale(1.5); opacity: 50; }
        }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center font-pixel px-4 text-gray-200 overflow-hidden">
        
        {/* COUCHE 1 : L'image de fond (tout en bas) */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

     
        {/* COUCHE 3 : Étoiles filantes */}
        <div className="absolute inset-0 pointer-events-none z-[3]">
          {generateStars()}
        </div>

        {/* COUCHE 4 : Contenu textuel (au premier plan) */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-5xl pixel-border text-amber-100 mb-6 bg-black/50 px-6 py-3 rounded-lg backdrop-blur-sm shadow-2xl">
            Rayan EL OUAZZANI
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Bienvenue sur mon portfolio.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button onClick={() => scrollToSection('Quests')} className="pixel-button">
              Projets
            </button>
            <button onClick={() => scrollToSection('CharacterIntro')} className="pixel-button">
              Compétences
            </button>
            <button onClick={() => scrollToSection('Contact')} className="pixel-button">
              Contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
}