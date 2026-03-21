import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, HudCorners, PulsingDot, PixelButton } from './ui';

const LINKS = [
  {
    label: 'Email',
    symbol: '✉',
    value: 'rayan.el.ouazzani01@gmail.com',
    href: 'mailto:rayan.el.ouazzani01@gmail.com',
    hint: 'Envoyer un message direct',
  },
  {
    label: 'LinkedIn',
    symbol: 'in',
    value: 'linkedin.com/in/rayan-el-ouazzani',
    href: 'https://www.linkedin.com/in/rayan-el-ouazzani-529a86214/',
    hint: 'Voir le profil complet',
  },
];

export default function Contact() {
  return (
    <section
      id="Contact"
      className="relative min-h-[70vh] flex flex-col items-center justify-center font-pixel px-4 py-24"
    >
      <SectionHeader
        label="◈ contact ◈"
        title="Travaillons ensemble"
        titleClassName="text-3xl md:text-4xl tracking-[0.25em]"
        className="mb-16"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-xl"
      >
        {/* Lueur ambiante */}
        <div className="absolute -inset-2 bg-[#f5f5dc]/5 blur-3xl rounded-3xl -z-10" />

        {/* Carte principale */}
        <div className="relative bg-black/60 backdrop-blur-md border border-[#f5f5dc]/20 p-8 md:p-12 overflow-hidden">
          <HudCorners color="border-[#f5f5dc]/35" thickness={2} />

          {/* Scan balayage */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
            <div className="w-full h-1/3 bg-gradient-to-b from-transparent via-[#f5f5dc] to-transparent contact-scan" />
          </div>

          <div className="relative z-10 flex flex-col gap-10">

            {/* Statut disponibilité */}
            <div className="flex items-center justify-center gap-3 border border-[#f5f5dc]/15 bg-[#f5f5dc]/5 px-6 py-3">
              <PulsingDot />
              <span className="text-sm tracking-[0.25em] uppercase text-[#f5f5dc]/85">
                Disponible en alternance
              </span>
            </div>

            {/* Phrase accroche */}
            <p className="text-center text-base md:text-lg font-sans text-[#f5f5dc]/70 leading-relaxed">
              Ouvert à toute opportunité.
              N'hésitez pas à me contacter directement.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-4">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
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
                    {link.symbol}
                  </span>

                  {/* Texte */}
                  <div className="relative z-10 flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#f5f5dc]/40">
                      {link.label}
                    </span>
                    <span className="text-sm md:text-base text-[#f5f5dc]/80 group-hover:text-[#f5f5dc] transition-colors duration-300 break-all">
                      {link.value}
                    </span>
                  </div>

                  {/* Flèche */}
                  <span className="relative z-10 ml-auto text-[#f5f5dc]/20 group-hover:text-[#f5f5dc]/60
                                   group-hover:translate-x-1 transition-all duration-300 shrink-0">
                    →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 pt-2 opacity-30">
              <div className="h-px flex-1 bg-[#f5f5dc]" />
              <span className="text-[9px] tracking-[0.4em] uppercase whitespace-nowrap">
                Mission Accomplished
              </span>
              <div className="h-px flex-1 bg-[#f5f5dc]" />
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
