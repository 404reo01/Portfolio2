import React from 'react';
import character from '../assets/rayan-character.png';

export default function CharacterIntro() {
  return (
    <div className="bg-black text-gray-200 font-pixel px-4 py-8 flex flex-col items-center">
      <h2 className="text-3xl pixel-border mb-4">Sélection du personnage</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <img src={character} alt="Rayan pixel character" className="w-64 pixel-border" />

        <div className="pixel-border p-4 w-full max-w-xl">
          <p className="text-lg text-beige mb-2">
            <strong>Étudiant en 3e année de BUT Informatique</strong>
          </p>

          <h3 className="text-xl text-beige mb-2">COMPÉTENCES</h3>

          <div className="text-beige space-y-4">
            <div>
              <p className="text-red-500 font-bold">Développement Web</p>
              <ul className="list-none ml-4">
                <li>• <span className="text-yellow-400">Front :</span> ReactJS, VueJS, TailwindCSS</li>
                <li>• <span className="text-yellow-400">Back :</span> NodeJS, PHP, SQL/NoSQL, Supabase, Prisma, Express, WebSocket, Python</li>
              </ul>
            </div>

            <div>
              <p className="text-red-500 font-bold">Data Science</p>
              <ul className="list-none ml-4">
                <li>• Python : Pandas, Matplotlib, Scikit-learn, Streamlit</li>
                <li>• Modélisation, nettoyage, traitement, interprétation de données</li>
              </ul>
            </div>

            <div>
              <p className="text-red-500 font-bold">Outils & Environnement</p>
              <ul className="list-none ml-4">
                <li>• Git, Bash, PowerBI</li>
              </ul>
            </div>

            <div>
              <p className="text-red-500 font-bold">Expérience</p>
              <ul className="list-none ml-4">
                <li>
                  • Développeur full stack chez <strong>e-petitpas</strong> :
                  messagerie pour une plateforme e-learning, système de facturation automatique,
                  et suivi de devis au sein d’une équipe de développement.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}