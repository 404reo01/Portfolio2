import React from 'react';
import { motion } from 'framer-motion';
import { HudCorners, SectionHeader, Tag, PulsingDot } from './ui';

/* ── Données ─────────────────────────────────────────────── */

const CHAPTERS = [
  {
    roman: 'I',
    year: '2021-2022',
    title: 'BUT GEII',
    subtitle: 'Génie Électrique & Informatique Industrielle',
    description:
      "Première approche technique. Découverte des systèmes embarqués, de l'électronique et de la programmation bas niveau.",
    tags: ['Électronique', 'C', 'Arduino'],
    active: false,
  },
  {
    roman: 'II',
    year: '2022-2024',
    title: 'Licence Éco-Gestion',
    subtitle: 'Business & Langues renforcées',
    description:
      "Virage stratégique vers le business avec parcours langue renforcée — anglais et coréen. Formation au raisonnement économique et à la gestion.",
    tags: ['Économie', 'Gestion', 'Anglais', 'Coréen'],
    active: false,
  },
  {
    roman: 'III',
    year: '2024-2025',
    title: 'BUT Passerelle TI',
    subtitle: 'Transition Informatique & Data',
    description:
      "Pivot décisif vers l'informatique. Consolidation des fondamentaux en développement web, Python et data science.",
    tags: ['Python', 'Web', 'Data', 'SQL'],
    active: false,
  },
  {
    roman: 'IV',
    year: '2025 - 2026',
    title: 'BUT 3 Informatique',
    subtitle: 'Full Stack & Ingénierie logicielle',
    description:
      "Spécialisation full stack. Architecture d'applications, notions en cloud computing, et immersion dans les technologies modernes du web.",
    tags: ['React', 'Node.js', 'Cloud', 'IA'],
    active: true,
  },
];

/* ── Carte chapitre ──────────────────────────────────────── */

function ChapterCard({ roman, year, title, subtitle, description, tags, active, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden group cursor-default
                  border transition-all duration-300
                  min-h-[260px] md:min-h-[310px]
                  ${active
                    ? 'border-[#f5f5dc]/25 bg-black/58'
                    : 'border-[#f5f5dc]/10 bg-black/42 opacity-80 hover:opacity-100'
                  }`}
    >
      <HudCorners
        color={active ? 'border-[#f5f5dc]/40' : 'border-[#f5f5dc]/15'}
        hover="group-hover:border-[#f5f5dc]/55 transition-colors duration-300"
      />

      {/* Lueur ambiante carte active */}
      {active && (
        <div className="absolute -inset-px bg-[#f5f5dc]/[0.03] blur-xl -z-10 pointer-events-none" />
      )}

      {/* Numéro romain en filigrane */}
      <span
        aria-hidden
        className="absolute -bottom-3 -right-2 font-pixel text-[#f5f5dc] opacity-15 
                  leading-none select-none pointer-events-none mr-3"
        style={{ fontSize: 'clamp(72px, 10vw, 120px)' }}
      >
        {roman}
      </span>

      {/* ── Resting state ── */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between
                      min-h-[260px] md:min-h-[310px]">

        {/* Header : année + badge EN COURS */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs tracking-[0.3em] uppercase text-[#f5f5dc]/60">
            {year}
          </span>
          {active && (
            <span className="flex items-center gap-1.5 shrink-0">
              <PulsingDot />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#f5f5dc]/65">
                En cours
              </span>
            </span>
          )}
        </div>

        {/* Titre + sous-titre */}
        <div className="mt-auto pt-8">
          <h3
            className={`text-2xl md:text-3xl tracking-[0.08em] uppercase leading-tight mb-2
                        ${active ? 'text-[#f5f5dc]' : 'text-[#f5f5dc]/85'}`}
          >
            {title}
          </h3>
          <p className="text-xs tracking-[0.18em] uppercase text-[#f5f5dc]/55">
            {subtitle}
          </p>
        </div>

        {/* Description + tags — toujours visibles sur mobile */}
        <div className="md:hidden mt-5 space-y-3">
          <p className="text-base text-[#f5f5dc]/75 leading-relaxed font-sans">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <Tag key={tag} className="text-xs">{tag}</Tag>
            ))}
          </div>
        </div>
      </div>

      {/* ── Overlay hover (desktop) ── */}
      <div
        className="hidden md:flex absolute inset-0 z-20
                   bg-black/85 backdrop-blur-sm
                   flex-col justify-between p-8
                   translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-out"
      >
        <p className="text-base text-[#f5f5dc]/90 leading-relaxed font-sans">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Tag key={tag} className="text-sm">{tag}</Tag>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Composant principal ─────────────────────────────────── */

export default function Lore() {
  return (
    <section
      id="Lore"
      className="relative font-pixel px-4 py-24 flex flex-col items-center overflow-x-hidden"
    >
      <SectionHeader
        label="◈ lore file ◈"
        title="Parcours"
        titleClassName="text-2xl md:text-4xl tracking-[0.3em]"
        className="mb-16"
      />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHAPTERS.map((chapter, i) => (
          <ChapterCard key={chapter.roman} {...chapter} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
