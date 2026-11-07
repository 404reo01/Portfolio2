import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, HudCorners, PulsingDot, LinkCard } from './ui';
import { CONTACT_LINKS } from '../constants';

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
        <div className="relative bg-black/72 backdrop-blur-md border border-[#f5f5dc]/20 p-8 md:p-12 overflow-hidden">
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
                Ouvert aux échanges
              </span>
            </div>

            {/* Phrase accroche */}
            <p className="text-center text-base md:text-lg font-sans text-[#f5f5dc]/70 leading-relaxed">
              Un projet, une question tech, une opportunité ?
              Écrivez-moi directement.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-4">
              {CONTACT_LINKS.map((link, i) => (
                <LinkCard key={link.label} {...link} delay={0.15 + i * 0.1} />
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
