import React from 'react';
import { motion } from 'framer-motion';

/**
 * Lien HUD : symbole encadré, label + valeur, flèche — remplissage au hover
 *
 * @param {string}  label    - Petit label au-dessus (ex: 'LinkedIn')
 * @param {string}  symbol   - Symbole dans le carré de gauche
 * @param {string}  value    - Texte principal du lien
 * @param {string}  href     - Destination (http → nouvel onglet)
 * @param {boolean} download - Télécharge le fichier au lieu de l'ouvrir [défaut: false]
 * @param {number}  delay    - Délai d'animation d'entrée                [défaut: 0]
 */
export default function LinkCard({ label, symbol, value, href, download = false, delay = 0 }) {
  const isExternal = href.startsWith('http');

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      download={download || undefined}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="group relative flex items-center gap-5 border border-[#f5f5dc]/15
                 bg-white/[0.03] hover:bg-white/[0.07] hover:border-[#f5f5dc]/35
                 px-6 py-5 transition-all duration-300 overflow-hidden"
    >
      {/* Hover fill */}
      <div className="absolute inset-0 bg-[#f5f5dc]/[0.04] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />

      {/* Symbole */}
      <span className="relative z-10 shrink-0 w-10 h-10 flex items-center justify-center
                       border border-[#f5f5dc]/20 text-[#f5f5dc]/60 text-base
                       group-hover:border-[#f5f5dc]/50 group-hover:text-[#f5f5dc]
                       transition-all duration-300">
        {symbol}
      </span>

      {/* Texte */}
      <div className="relative z-10 flex flex-col gap-0.5 min-w-0">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#f5f5dc]/40">
          {label}
        </span>
        <span className="text-sm md:text-base text-[#f5f5dc]/80 group-hover:text-[#f5f5dc] transition-colors duration-300 break-all">
          {value}
        </span>
      </div>

      {/* Flèche */}
      <span className="relative z-10 ml-auto text-[#f5f5dc]/20 group-hover:text-[#f5f5dc]/60
                       group-hover:translate-x-1 transition-all duration-300 shrink-0">
        →
      </span>
    </motion.a>
  );
}
