import React from 'react';

/**
 * Bouton pixel générique — polymorphique (button ou a)
 *
 * @param {'ghost'|'primary'|'nav'} variant  - Style visuel             [défaut: 'ghost']
 * @param {string|React.ElementType} as      - Tag HTML rendu            [défaut: 'button']
 * @param {string}                  className - Classes additionnelles
 * @param {ReactNode}               children
 */

const VARIANTS = {
  // Fond transparent, bordure blanche — liens secondaires (SRC_CODE)
  ghost:   'border border-white/10 bg-white/5 hover:bg-white/10 text-[#f5f5dc]/60 hover:text-[#f5f5dc] tracking-[0.3em]',
  // Fond beige translucide — action principale (EXECUTE_SYS, live)
  primary: 'bg-[#f5f5dc]/10 border border-[#f5f5dc]/30 hover:bg-[#f5f5dc]/20 text-[#f5f5dc] tracking-[0.3em] shadow-[0_0_30px_rgba(245,245,220,0.1)]',
  // Juste un border-bottom — navigation discrète (Précédent / Suivant)
  nav:     'border-b border-[#f5f5dc]/20 text-[#f5f5dc]/60 hover:text-[#f5f5dc] tracking-widest',
};

export default function PixelButton({
  variant = 'ghost',
  as: Tag = 'button',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      className={`font-pixel uppercase transition-all duration-200 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
