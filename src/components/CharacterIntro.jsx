import React from 'react';
import { motion } from 'framer-motion';
import character from '../assets/rayan-character.png';
import { HudCorners, SectionHeader, SectionDivider, Tag, PulsingDot } from './ui';

/* ── Données ─────────────────────────────────────────────── */

const IDENTITY = [
  { key: 'Classe', value: 'Développeur Full Stack' },
  { key: 'Rang',   value: 'BUT Informatique · 3e année' },
  { key: 'Guilde', value: 'Président BDE' },
];

const EXPERIENCES = [
  {
    id: 'ransau',
    status: 'EN COURS',
    pulse: true,
    company: 'Ransau Système',
    role: 'Développeur IA Full Stack',
    stack: ['Next.js', 'Tailwind', 'Cloud'],
    description:
      "Développement du site vitrine en Next.js et Tailwind. Conception complète d'un SaaS — de la charte graphique jusqu'au code et à l'infrastructure cloud.",
  },
  {
    id: 'epetitpas',
    status: '2025 · 2 mois',
    pulse: false,
    company: 'e-petitpas',
    role: 'Développeur Full Stack',
    stack: ['React', 'Node.js', 'WebSocket'],
    description:
      "Développement d'une messagerie instantanée temps réel, d'un système de facturation automatique et d'un module de gestion de devis.",
  },
];

const SKILL_GROUPS = [
  { label: 'Frontend',   tags: ['React', 'React Native', 'Vue.js', 'Next.js', 'Nuxt.js', 'Tailwind'] },
  { label: 'Backend',    tags: ['Node.js', 'NestJS', 'Fastify', 'Express', 'PHP', 'Python', 'WebSocket'] },
  { label: 'BDD & Data', tags: ['Supabase', 'PostgreSQL', 'MySQL', 'Prisma', 'Pandas', 'Scikit-learn'] },
];

/* ── Carte XP ────────────────────────────────────────────── */

function XPCard({ status, pulse, company, role, stack, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="relative flex flex-col gap-5 border border-[#f5f5dc]/20 bg-black/30
                 p-6 cursor-default group transition-colors duration-300
                 hover:border-[#f5f5dc]/35 hover:bg-black/40 h-full"
    >
      <HudCorners
        size="sm"
        color="border-[#f5f5dc]/30"
        hover="group-hover:border-[#f5f5dc]/55 transition-colors duration-300"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="text-lg tracking-[0.08em] uppercase text-[#f5f5dc] leading-tight">
          {company}
        </span>
        <span className="flex items-center gap-1.5 shrink-0 mt-0.5">
          {pulse && <PulsingDot />}
          <span className="text-xs tracking-[0.22em] uppercase text-[#f5f5dc]/55">{status}</span>
        </span>
      </div>

      <p className="text-sm tracking-[0.18em] uppercase text-[#f5f5dc]/55">{role}</p>

      <p className="text-base text-[#f5f5dc]/75 leading-relaxed border-t border-[#f5f5dc]/10 pt-4">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {stack.map(s => (
          <Tag key={s} className="text-xs bg-black/20">{s}</Tag>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Carte compétences ───────────────────────────────────── */

function SkillCard({ label, tags, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
      className="border border-[#f5f5dc]/15 bg-black/20 p-5 flex flex-col gap-4"
    >
      <span className="text-xs tracking-[0.35em] uppercase text-[#f5f5dc]/45">{label}</span>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Tag key={tag} className="text-sm text-[#f5f5dc]/70 hover:text-[#f5f5dc]/90">{tag}</Tag>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Composant principal ─────────────────────────────────── */

export default function CharacterIntro() {
  return (
    <section
      id="CharacterIntro"
      className="relative font-pixel px-4 py-20 flex flex-col items-center overflow-x-hidden"
    >
      <SectionHeader
        label="◈ character select ◈"
        title="Sélection du personnage"
        className="mb-12"
      />

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">

        {/* ── Panneau identité ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative lg:w-64 shrink-0 flex flex-row lg:flex-col items-center
                     border border-[#f5f5dc]/20 bg-black/30 px-7 py-8 gap-6 lg:gap-0"
        >
          <HudCorners color="border-[#f5f5dc]/35" />

          <div className="flex flex-col items-center shrink-0">
            <p className="text-[9px] tracking-[0.2em] text-[#f5f5dc]/25 uppercase mb-3 text-center">
              / pour ouvrir le terminal
            </p>
            <img src={character} alt="Rayan pixel character" className="w-32 lg:w-44 object-contain" />
          </div>

          <div className="lg:mt-6 w-full lg:border-t lg:border-[#f5f5dc]/15 lg:pt-5 space-y-4 min-w-0">
            {IDENTITY.map(({ key, value }) => (
              <div key={key} className="flex flex-col gap-1 min-w-0">
                <span className="text-[10px] tracking-widest text-[#f5f5dc]/35 uppercase">{key}</span>
                <span className="text-base text-[#f5f5dc]/85 leading-tight break-words">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Contenu principal ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">

          <div>
            <SectionDivider label="Expériences" delay={0.1} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <XPCard {...EXPERIENCES[0]} delay={0.15} />
              </div>
              <div className="md:col-span-1">
                <XPCard {...EXPERIENCES[1]} delay={0.25} />
              </div>
            </div>
          </div>

          <div>
            <SectionDivider label="Compétences" delay={0.3} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SKILL_GROUPS.map((g, i) => (
                <SkillCard key={g.label} {...g} delay={0.35 + i * 0.07} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
