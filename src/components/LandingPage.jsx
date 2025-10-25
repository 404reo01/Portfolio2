import React from 'react';
import moon from '../assets/moon.jpg';
import bgVideo from '../assets/bg.mp4'; 
import bg2 from '../assets/bg2.mp4';

// Fonction de gestion du clic
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center font-pixel px-4 text-gray-200">
      {/* Vidéo de fond */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={bg2}
        autoPlay
        muted
        loop
        playsInline
        poster={moon} /* image de secours / affichée avant lecture */
      />

      {/* Contenu au-dessus de la vidéo */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen">
        <h1 className="text-5xl pixel-border text-amber-100 mb-6 bg-black">
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
  );
}