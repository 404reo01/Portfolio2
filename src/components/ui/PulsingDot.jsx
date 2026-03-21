import React from 'react';

/**
 * Point pulsant style HUD (utilise l'animation .badge-pulse de index.css)
 *
 * @param {string} className - Classes additionnelles (couleur, taille...)
 */
export default function PulsingDot({ className = '' }) {
  return (
    <span
      className={`badge-pulse w-2 h-2 rounded-full bg-[#f5f5dc]/70 shrink-0 ${className}`}
    />
  );
}
