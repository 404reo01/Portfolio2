import React from 'react';
import { motion } from 'framer-motion';

/**
 * Séparateur HUD : label texte + ligne horizontale
 *
 * @param {string} label  - Texte du séparateur
 * @param {number} delay  - Délai d'animation (défaut: 0)
 */
export default function SectionDivider({ label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 mb-5"
    >
      <span className="text-xs tracking-[0.4em] uppercase text-[#f5f5dc]/45 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-[#f5f5dc]/10" />
    </motion.div>
  );
}
