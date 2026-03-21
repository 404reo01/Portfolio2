import React from 'react';

// Lookup complet pour que Tailwind JIT détecte toutes les classes
const BORDERS = {
  1: { t: 'border-t',   b: 'border-b',   l: 'border-l',   r: 'border-r'   },
  2: { t: 'border-t-2', b: 'border-b-2', l: 'border-l-2', r: 'border-r-2' },
  4: { t: 'border-t-4', b: 'border-b-4', l: 'border-l-4', r: 'border-r-4' },
};

const SIZES = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
};

/**
 * Coins HUD — 4 brackets absolus sur les coins du parent (doit avoir position: relative)
 *
 * @param {string}  size      - 'sm' (w-3 h-3) | 'md' (w-4 h-4)  [défaut: 'md']
 * @param {string}  color     - classe Tailwind border-color        [défaut: 'border-[#f5f5dc]/30']
 * @param {number}  thickness - 1 | 2 | 4                          [défaut: 1]
 * @param {string}  hover     - classes ajoutées pour le hover      [défaut: '']
 */
export default function HudCorners({
  size = 'md',
  color = 'border-[#f5f5dc]/30',
  thickness = 1,
  hover = '',
}) {
  const s = SIZES[size] ?? size;
  const b = BORDERS[thickness] ?? BORDERS[1];
  const base = `absolute ${s} ${color} ${hover}`;

  return (
    <>
      <span className={`${base} top-0 left-0  ${b.t} ${b.l}`} />
      <span className={`${base} top-0 right-0 ${b.t} ${b.r}`} />
      <span className={`${base} bottom-0 left-0  ${b.b} ${b.l}`} />
      <span className={`${base} bottom-0 right-0 ${b.b} ${b.r}`} />
    </>
  );
}
