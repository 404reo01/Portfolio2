import React from 'react';
import AI from '../assets/AI.jpg';

const projects = [
  {
    title: 'Reo Bonnes Idées',
    description:
      "Un chatbot qui propose des idées de projets en fonction du profil de l'utilisateur. Il peut même analyser un GitHub pour affiner ses suggestions.",
    github: 'https://github.com/404reo01/reo-bonnes-idees',
    live: 'https://reobonneidees.netlify.app/',
  },
  {
    title: 'Live Cursos - Messagerie instantanée',
    description:
      "Application de chat en temps réel avec WebSocket et partage de curseur, inspirée de l'expérience collaborative de Canva.",
    github: 'https://github.com/404reo01/Live-cursor_chatBox',
  },
  {
    title: 'Système de recommandation de films',
    description:
      "Exploration des systèmes de recommandation avec un moteur basé sur TF-IDF, entraîné sur un dataset de 10 000 films.",
    github: 'https://github.com/404reo01/systeme-de-recommandation',
  },
  {
    title: 'Bot de recherche de stage',
    description:
      "Outil de scraping sur Welcome to the Jungle pour générer un fichier CSV d'offres de stage filtrées selon des critères personnalisés.",
    github: 'https://github.com/404reo01/bot-recherche-stage',
  },
];

export default function Quests() {
  return (
    <div className="bg-black text-gray-200 font-pixel px-4 py-8 flex flex-col items-center">
      <h2 className="text-3xl pixel-border mb-6">Quêtes (projets)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {projects.map((project, index) => (
          <div key={index} className="quest-card">
            <h3 className="quest-title">{project.title}</h3>
            <p className="quest-description mb-4">{project.description}</p>
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-button"
              >
                GitHub
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-button"
                >
                  En ligne
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}