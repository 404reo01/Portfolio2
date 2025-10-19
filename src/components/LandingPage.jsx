import React from 'react';
import moon from '../assets/moon.jpg';

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center font-pixel px-4 text-gray-200"
      style={{
        backgroundImage: `url(${moon})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-5xl pixel-border text-red-700 mb-6 bg-black">
        Rayan EL OUAZZANI
      </h1>

      <p className="text-xl text-center max-w-2xl mb-4 ">
        Bienvenue sur mon portfolio.
      </p>

      <div className="flex gap-4 mt-6">
        <a href="#projects" className="pixel-button">Projets</a>
        <a href="#skills" className="pixel-button">Compétences</a>
        <a href="#contact" className="pixel-button">Contact</a>
      </div>
    </div>
  );
}