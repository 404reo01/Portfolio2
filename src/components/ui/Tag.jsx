import React from 'react';

/**
 * Pill badge générique — style HUD pixel
 *
 * @param {ReactNode} children
 * @param {string}    className - Classes additionnelles (taille, opacité, bg...)
 */
export default function Tag({ children, className = '' }) {
  return (
    <span
      className={`
        tracking-wider uppercase transition-colors duration-200 cursor-default
        border border-[#f5f5dc]/15 text-[#f5f5dc]/65 px-3 py-1.5
        hover:border-[#f5f5dc]/40 hover:text-[#f5f5dc]/90
        ${className}
      `}
    >
      {children}
    </span>
  );
}
