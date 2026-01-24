import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import DialogBox from '../DialogBox/DialogBox';
import character from '../../assets/rayan-character.png';
import './Avatar.css';

const dialogues = {
  Accueil: "Bienvenue dans mon portfolio ! Je suis Rayan, développeur full-stack passionné.",
  Projets: "Voici mes projets. Clique dessus pour en savoir plus !",
  Expériences: "Mes compétences et expériences professionnelles. Prêt à coder ensemble ?",
  Contact: "N'hésite pas à me contacter pour collaborer !"
};

export default function Avatar({ accueilRef, projetsRef, experiencesRef, contactRef }) {
  const [currentDialogue, setCurrentDialogue] = useState(dialogues.Accueil || "Bienvenue dans mon portfolio !");

  const isAccueilVisible = useIntersectionObserver(accueilRef, { threshold: 0.5 });
  const isProjetsVisible = useIntersectionObserver(projetsRef, { threshold: 0.5 });
  const isExperiencesVisible = useIntersectionObserver(experiencesRef, { threshold: 0.5 });
  const isContactVisible = useIntersectionObserver(contactRef, { threshold: 0.5 });

  useEffect(() => {
    let newDialogue = dialogues.Accueil;
    if (isContactVisible) newDialogue = dialogues.Contact;
    else if (isExperiencesVisible) newDialogue = dialogues.Expériences;
    else if (isProjetsVisible) newDialogue = dialogues.Projets;

    if (newDialogue !== currentDialogue) {
      setCurrentDialogue(newDialogue);
    }
  }, [isAccueilVisible, isProjetsVisible, isExperiencesVisible, isContactVisible, currentDialogue]);

  return (
    <div className="avatar-container">
      <img src={character} alt="Rayan" className="avatar-image" />
      <DialogBox text={currentDialogue} />
    </div>
  );
}
