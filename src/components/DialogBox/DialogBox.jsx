import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './DialogBox.css';

export default function DialogBox({ text }) {
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
    }, 30); // Slightly faster for better readability

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      className="dialog-box"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dialog-content">
        {displayedText}
        {isTyping && <span className="cursor">|</span>}
      </div>
      <div className="dialog-tail"></div>
    </motion.div>
  );
}