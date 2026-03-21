import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HudCorners } from './index';

/**
 * Bulle de dialogue RPG — typewriter effect
 *
 * @param {string} text     - Texte à afficher lettre par lettre
 * @param {'up'|'down'} tail - Direction de la queue [défaut: 'down']
 */
export default function DialogBox({ text, tail = 'down' }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Boîte principale */}
      <div
        className="relative max-w-[240px] px-4 py-3
                   bg-black/85 backdrop-blur-md
                   border border-[#f5f5dc]/30
                   font-pixel text-[#f5f5dc] text-sm leading-snug"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,245,220,0.012) 2px, rgba(245,245,220,0.012) 4px)',
        }}
      >
        <HudCorners size="sm" color="border-[#f5f5dc]/25" />

        <span className="text-[#f5f5dc]/40 select-none mr-1">▶</span>
        {displayedText}
        {isTyping && (
          <span className="inline-block w-[2px] h-[0.9em] bg-[#f5f5dc]/70 align-middle ml-[2px] animate-[blink-cursor_1s_step-end_infinite]" />
        )}
      </div>

      {/* Queue vers le bas (pointe vers le perso en-dessous) */}
      {tail === 'down' && (
        <div className="absolute -bottom-[9px] right-5 w-0 h-0
                        border-l-[9px] border-l-transparent
                        border-r-[9px] border-r-transparent
                        border-t-[9px] border-t-[#f5f5dc]/30" />
      )}
      {/* Queue vers le haut (pointe vers le perso au-dessus) */}
      {tail === 'up' && (
        <div className="absolute -top-[9px] right-5 w-0 h-0
                        border-l-[9px] border-l-transparent
                        border-r-[9px] border-r-transparent
                        border-b-[9px] border-b-[#f5f5dc]/30" />
      )}
    </motion.div>
  );
}
