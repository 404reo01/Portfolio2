import React from 'react';

const quests = [
  {
    title: 'BUT 1 GEII',
    description: 'Electronique et systèmes embarqués.',
  },
  {
    title: 'Licence Économie-Gestion',
    description: 'Parcours langues renforcées (anglais, coréen).',
  },
  {
    title: 'BUT Passerelle TI Info-Data science',
    description: 'Transition vers l\'informatique et la data science.',
  },
  {
    title: 'BUT 3 Informatique',
    description: 'Développement d\'applications web et data science.',
  },
];

export default function Lore() {
  return (
    <div className=" text-white font-pixel px-4 py-8 flex flex-col items-center" style={{
      backgroundColor: 'transparent'
    }}>
      <h2 className="text-3xl pixel-border  mb-6">Lore et parcours du personnage</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
  {quests.map((quest, index) => (
    <div key={index} className="quest-card">
      <h3 className="quest-title">{quest.title}</h3>
      <p className="quest-description">{quest.description}</p>
    </div>
  ))}
</div>

      <div className="mt-8 pixel-border p-4 max-w-3xl text-center">
        Passionné par l'informatique Rayan aime également les jeux vidéo, surtout ceux de strategie et d'aventure,
         les mangas et le sport. De part son affinité avec ces domaines il pourrait vous en parler des heures,
          mais nous allons nous en tenir à l'essentiel ici !
      </div>
    </div>
  );
}