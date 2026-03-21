import React from 'react';

/**
 * Carte glassmorphism réutilisable
 *
 * @param {'light'|'dark'|'strong'} variant  - Intensité du verre           [défaut: 'light']
 * @param {boolean}                 shine     - Overlay reflet (gradient)    [défaut: false]
 * @param {string}                  className - Classes additionnelles
 * @param {ReactNode}               children
 */

const VARIANTS = {
  // bg-white/5 — verre clair (Quests carousel, Lore)
  light:  'bg-white/5 backdrop-blur-2xl border border-white/20',
  // bg-black/40 — verre foncé (Sidequests contenu)
  dark:   'bg-black/40 backdrop-blur-[40px] border border-white/10',
  // bg-black/60 — verre très opaque (Quests panneau détail)
  strong: 'bg-black/60 backdrop-blur-[30px] border border-white/10',
};

export default function GlassCard({
  variant = 'light',
  shine = false,
  className = '',
  children,
  ...props
}) {
  return (
    <div
      className={`relative ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {shine && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      )}
      {children}
    </div>
  );
}
