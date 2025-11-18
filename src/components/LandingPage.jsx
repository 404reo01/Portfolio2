import React from 'react';

// Fonction de gestion du clic
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
      const size = Math.random() * 2 + 1; // 1px à 3px
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = Math.random() * 3 + 2; // 2 à 5s
      const delay = Math.random() * 5; // 0 à 5s
      stars.push(
        <div
          key={i}
          className="absolute rounded-full bg-white"
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
        /* Scanlines */
        .scanline-layer {
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,0.1) 0px,
            rgba(0,0,0,0.1) 3px,
            transparent 3px,
            transparent 6px
          );
          mix-blend-mode: soft-light;
        }

        /* Glow traversant */
        @keyframes sweepGlow {
          0%   { transform: translateY(-150%); opacity: 0; }
          30%  { opacity: 0.5; }
          50%  { opacity: 0.8; }
          70%  { opacity: 0.5; }
          100% { transform: translateY(150%); opacity: 0; }
        }

        .glow-layer {
          animation: sweepGlow 8s ease-in-out infinite;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255,255,255,0.15) 50%,
            transparent 100%
          );
          filter: blur(12px);
        }

        /* Pixel noise */
        .pixel-noise {
          background-image: url("data:image/svg+xml;utf8,\
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'>\
              <rect width='1' height='1' x='0' y='0' fill='#2d2d30'/>\
              <rect width='1' height='1' x='8' y='4' fill='#2a2a2d'/>\
              <rect width='1' height='1' x='4' y='10' fill='#303033'/>\
              <rect width='1' height='1' x='12' y='12' fill='#262628'/>\
            </svg>");
          background-size: 32px;
          opacity: 0.25;
          mix-blend-mode: overlay;
        }

        /* Etoiles filantes */
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateX(100px) translateY(200px) scale(0.5); opacity: 0; }
        }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center font-pixel px-4 text-gray-200 overflow-hidden">

        {/* Fond #28282B */}
        <div className="absolute inset-0 bg-[#28282B]"></div>

        {/* Pixel noise */}
        <div className="absolute inset-0 pixel-noise"></div>

        {/* Scanlines */}
        <div className="absolute inset-0 scanline-layer pointer-events-none"></div>

        {/* Glow traversant */}
        <div className="absolute inset-0 glow-layer pointer-events-none"></div>

        {/* Etoiles filantes */}
        {generateStars()}

        {/* Contenu */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen">
          <h1 className="text-5xl pixel-border text-amber-100 mb-6 bg-black/40 px-4 py-2 rounded-lg">
            Rayan EL OUAZZANI
          </h1>

          <p className="text-xl text-center max-w-2xl mb-4">
            Bienvenue sur mon portfolio.
          </p>

          <div className="flex gap-4 mt-6">
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