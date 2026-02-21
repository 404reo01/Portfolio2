import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import DialogBox from '../DialogBox/DialogBox';
import character from '../../assets/rayan-character.png';

const dialogues = {
  Accueil: "Bienvenue dans mon portfolio ! Je suis Rayan, développeur full-stack passionné.",
  Experiences: "Voici mes stats et mon parcours. Je suis un développeur plutôt équilibré.",
  Lore: "Mon journal de bord... On y voit tout mon parcours.",
  Projets: "Voici mes quêtes principales, mes projets les plus passionants.",
  Sidequests: "Mes quêtes annexes. Karaté, Mangas... c'est ce qui me booste.",
  Contact: "N'hésite pas à me contacter pour collaborer !"
};

export default function Avatar({ accueilRef, projetsRef, experiencesRef, contactRef, loreRef, sidequestsRef }) {
  const [currentDialogue, setCurrentDialogue] = useState(dialogues.Accueil);

  // Détection de visibilité
  const isAccueilVisible = useIntersectionObserver(accueilRef, { threshold: 0.5 });
  const isExperiencesVisible = useIntersectionObserver(experiencesRef, { threshold: 0.5 });
  const isLoreVisible = useIntersectionObserver(loreRef, { threshold: 0.5 });
  const isProjetsVisible = useIntersectionObserver(projetsRef, { threshold: 0.5 });
  const isSidequestsVisible = useIntersectionObserver(sidequestsRef, { threshold: 0.5 });
  const isContactVisible = useIntersectionObserver(contactRef, { threshold: 0.5 });

  useEffect(() => {
    let newDialogue = dialogues.Accueil;

    if (isContactVisible) newDialogue = dialogues.Contact;
    else if (isSidequestsVisible) newDialogue = dialogues.Sidequests;
    else if (isProjetsVisible) newDialogue = dialogues.Projets;
    else if (isLoreVisible) newDialogue = dialogues.Lore;
    else if (isExperiencesVisible) newDialogue = dialogues.Experiences;
    else if (isAccueilVisible) newDialogue = dialogues.Accueil;

    if (newDialogue !== currentDialogue) {
      setCurrentDialogue(newDialogue);
    }
  }, [
    isAccueilVisible, 
    isExperiencesVisible, 
    isLoreVisible, 
    isProjetsVisible, 
    isSidequestsVisible, 
    isContactVisible, 
    currentDialogue
  ]);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center z-[1000] pointer-events-none md:bottom-8 md:right-8">
      {/* Conteneur de l'image (ton personnage) */}
      <div className="w-[100px] h-[130px] md:w-[150px] md:h-[200px] border-2 border-[#f5f5dc] rounded bg-[#28282b] overflow-hidden pointer-events-auto shadow-lg">
        <img 
          src={character} 
          alt="Rayan" 
          className="w-full h-full object-cover" 
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* La boîte de dialogue (gérée par ton composant DialogBox) */}
      <div className="mt-2 pointer-events-auto">
        <DialogBox text={currentDialogue} />
      </div>
    </div>
  );
}