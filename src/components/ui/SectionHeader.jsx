import React from 'react';
import { motion } from 'framer-motion';

/**
 * En-tête de section avec animation whileInView
 *
 * @param {string} title           - Titre principal (h2)
 * @param {string} label           - Sous-label décoratif au-dessus (optionnel)
 * @param {string} titleClassName  - Classes supplémentaires sur le h2
 * @param {string} className       - Classes sur le wrapper (ex: mb-12)
 */
export default function SectionHeader({
  title,
  label,
  titleClassName = 'text-2xl md:text-3xl tracking-[0.15em]',
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`text-center ${className}`}
    >
      {label && (
        <p className="text-[9px] tracking-[0.45em] uppercase text-[#f5f5dc]/30 mb-2">
          {label}
        </p>
      )}
      <h2 className={`uppercase text-[#f5f5dc] ${titleClassName}`}>
        {title}
      </h2>
    </motion.div>
  );
}
