import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { DialogBox } from '../ui';
import character from '../../assets/rayan-character.png';

const IDLE_TIMEOUT = 20_000;

const DIALOGUES = {
  Accueil:     "Bienvenue dans mon portfolio ! Je suis Rayan, développeur full-stack passionné.",
  Experiences: "Voici mes stats et mon parcours. Je suis un développeur plutôt équilibré.",
  Lore:        "Mon journal de bord... On y voit tout mon parcours.",
  Projets:     "Voici mes quêtes principales, mes projets les plus passionants.",
  Sidequests:  "Mes quêtes annexes. Karaté, Mangas... c'est ce qui me booste.",
  Contact:     "N'hésite pas à me contacter pour collaborer !",
};

const IDLE_DIALOGUES = [
  "T'es encore là ? Tu t'es endormi ou quoi ?",
  "... je commence à m'inquiéter.",
  "Sys_Idle // En attente de mission.",
];

export default function Avatar({ accueilRef, projetsRef, experiencesRef, contactRef, loreRef, sidequestsRef }) {
  const [currentDialogue, setCurrentDialogue] = useState(DIALOGUES.Accueil);
  const [isIdle, setIsIdle]                   = useState(false);
  const [idleIndex, setIdleIndex]             = useState(0);

  // Ref pour accéder à la section active sans provoquer de re-render dans les effets
  const activeSectionRef = useRef('Accueil');

  const isAccueilVisible     = useIntersectionObserver(accueilRef,     { threshold: 0.5 });
  const isExperiencesVisible = useIntersectionObserver(experiencesRef, { threshold: 0.5 });
  const isLoreVisible        = useIntersectionObserver(loreRef,        { threshold: 0.5 });
  const isProjetsVisible     = useIntersectionObserver(projetsRef,     { threshold: 0.5 });
  const isSidequestsVisible  = useIntersectionObserver(sidequestsRef,  { threshold: 0.5 });
  const isContactVisible     = useIntersectionObserver(contactRef,     { threshold: 0.5 });

  /* 1 — Dialogue selon section visible (sauf si idle) */
  useEffect(() => {
    if (isIdle) return;

    let section = 'Accueil';
    if (isContactVisible)        section = 'Contact';
    else if (isSidequestsVisible) section = 'Sidequests';
    else if (isProjetsVisible)    section = 'Projets';
    else if (isLoreVisible)       section = 'Lore';
    else if (isExperiencesVisible) section = 'Experiences';

    activeSectionRef.current = section;
    setCurrentDialogue(DIALOGUES[section]);
  }, [isAccueilVisible, isExperiencesVisible, isLoreVisible, isProjetsVisible, isSidequestsVisible, isContactVisible, isIdle]);

  /* 2 — Détection inactivité — effect monté une seule fois */
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      setIsIdle(false);
      timer = setTimeout(() => {
        setIsIdle(true);
        setIdleIndex(0);
      }, IDLE_TIMEOUT);
    };

    const events = ['mousemove', 'scroll', 'keydown', 'click', 'touchstart'];
    events.forEach(ev => window.addEventListener(ev, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach(ev => window.removeEventListener(ev, resetTimer));
    };
  }, []); // montage unique — pas de dépendances pour éviter les resets circulaires

  /* 3 — Reprendre le dialogue normal quand l'idle s'arrête */
  useEffect(() => {
    if (!isIdle) {
      setCurrentDialogue(DIALOGUES[activeSectionRef.current]);
    }
  }, [isIdle]);

  /* 4 — Cycle des dialogues idle */
  useEffect(() => {
    if (!isIdle) return;

    setCurrentDialogue(IDLE_DIALOGUES[idleIndex]);

    const timer = setTimeout(() => {
      setIdleIndex(prev => (prev + 1) % IDLE_DIALOGUES.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isIdle, idleIndex]);

  return (
    <div className="fixed bottom-5 right-4 md:bottom-8 md:right-8
                    flex flex-col items-end gap-2
                    z-[1000] pointer-events-none">

      <div className="pointer-events-auto">
        <DialogBox text={currentDialogue} tail="down" />
      </div>

      <div className="w-[80px] md:w-[120px] pointer-events-auto">
        <img
          src={character}
          alt="Rayan"
          className="w-full object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}
