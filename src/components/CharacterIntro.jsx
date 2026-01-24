import React from 'react';
import character from '../assets/rayan-character.png';

export default function CharacterIntro() {
  return (
    <div
      id="CharacterIntro"
      className="text-gray-200 font-pixel px-4 py-8 flex flex-col items-center relative"
      style={{
      backgroundColor: 'transparent'
      }}
    >
      <h2 className="text-3xl pixel-border mb-4">Sélection du personnage</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Petite bulle de cheat code */}
        <div className="relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-[#28282B] border border-[#f5f5dc] rounded-lg px-3 py-1 text-xs text-[#f5f5dc] font-pixel whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity z-20">
            Essaye ce cheat code: ↑↓←→<br />
            <span className="text-xs opacity-60">Appuie sur Échap pour désactiver</span>
          </div>
          <img src={character} alt="Rayan pixel character" className="w-64 pixel-border" />
        </div>

        <div className="pixel-border p-4 w-full max-w-xl">
          <p className="text-lg text-beige mb-2">
            <strong>Étudiant en 3e année de BUT Informatique</strong>
          </p>

          <h3 className="text-xl text-beige mb-2">COMPÉTENCES</h3>

          <div className="text-beige space-y-4">
            <div>
              <p className="font-bold">Développement Web</p>
              <ul className="list-none ml-4 space-y-1">
                <li>• <span className="text-yellow-400">Front :</span> ReactJS, VueJS, TailwindCSS</li>
                <li>• <span className="text-yellow-400">Back :</span> NodeJS, PHP, Python, Express, WebSocket</li>
                <li>• <span className="text-yellow-400">Full Stack :</span> Next.js (SSR, SSG, API Routes), Nuxt.js (Vue.js ecosystem)</li>
                <li>• <span className="text-yellow-400">Base de données :</span> Supabase (PostgreSQL, Auth), MySQL, SQLite, Prisma</li>
              </ul>
            </div>

            <div>
              <p className="font-bold">Data Science</p>
              <ul className="list-none ml-4">
                <li>• Python : Pandas, Matplotlib, Scikit-learn, Streamlit</li>
                <li>• Modélisation, nettoyage, traitement, interprétation de données</li>
              </ul>
            </div>

            <div>
              <p className="font-bold">Outils & Environnement</p>
              <ul className="list-none ml-4">
                <li>• Git, Bash, PowerBI</li>
              </ul>
            </div>

            <div>
              <p className="font-bold">Expérience</p>
              <ul className="list-none ml-4">
                <li>
                  • Développeur full stack chez <strong>e-petitpas</strong> :
                  messagerie pour une plateforme e-learning, système de facturation automatique,
                  et suivi de devis au sein d’une équipe de développement.
                </li>
              </ul>
            </div>
          </div>

          <p className="text-lg text-beige mt-4 text-center">
            Prêt à coder ensemble ?
          </p>
        </div>
      </div>
    </div>
  );
}
