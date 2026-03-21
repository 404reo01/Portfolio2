import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative w-full flex flex-col items-center overflow-hidden pb-0 pt-16 select-none">

      {/* Ligne séparatrice */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#f5f5dc]/20 to-transparent mb-10 origin-center"
      />

      {/* Meta ligne */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-pixel text-[9px] tracking-[0.45em] uppercase text-[#f5f5dc]/30 mb-8"
      >
        ◈ rayan el ouazzani · 2025 · full stack developer ◈
      </motion.p>

      {/* Signature monumentale */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
        aria-hidden
        className="font-pixel text-[#f5f5dc] leading-none tracking-[0.15em] uppercase
                   pointer-events-none"
        style={{
          fontSize: 'clamp(110px, 20vw, 220px)',
          opacity: 0.05,
          lineHeight: 0.85,
        }}
      >
        reo
      </motion.span>

    </footer>
  );
}
