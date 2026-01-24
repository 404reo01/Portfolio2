import React from 'react';
import ProjectCard from './ProjectCard/ProjectCard';

const projects = [
  {
    title: 'Reo Bonnes Idées',
    description:
      "Un chatbot qui propose des idées de projets en fonction du profil de l'utilisateur. Il peut même analyser un GitHub pour affiner ses suggestions.",
    github: 'https://github.com/404reo01/reo-bonnes-idees',
    live: 'https://reobonneidees.netlify.app/',
  },
  {
    title: 'Live Cursor / Messagerie instantanée',
    description:
      "Application de chat en temps réel avec WebSocket et partage de curseur, inspirée de l'expérience collaborative de Canva.",
    github: 'https://github.com/404reo01/Live-cursor_chatBox',
  },
  {
    title: 'TrackStar App mobile recommandation musique',
    description:
      "Application mobile de recommandation musicale développée en Dart/Flutter. Utilise un espace vectoriel pour représenter les données musicales et implémente un système de recommandation intelligent.",
    github: 'https://github.com/YannMKD/sae-but3-eco-mobile',
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
    <div className="text-gray-200 font-pixel px-4 py-8 flex flex-col items-center" style={{
      backgroundColor: 'transparent'
    }}>
      <h2 className="text-3xl pixel-border mb-6">Quêtes (projets)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
