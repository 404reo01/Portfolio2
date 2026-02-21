import React, { useRef } from 'react';
import { useCheatCode } from './hooks/useCheatCode';
import LandingPage from './components/LandingPage';
import CharacterIntro from './components/CharacterIntro';
import Lore from './components/Lore';
import Quests from './components/Quests';
import Contact from './components/Contact';
import Avatar from './components/Avatar/Avatar';
import PhysicsEngine from './utils/physics/PhysicsEngine';
import StarCursor from './components/StarCursor';
import Sidequests from './components/Sidequests';

function App() {
  // On initialise toutes les refs, y compris pour Lore et Sidequests
  const accueilRef = useRef(null);
  const projetsRef = useRef(null);
  const experiencesRef = useRef(null);
  const loreRef = useRef(null);
  const sidequestsRef = useRef(null);
  const contactRef = useRef(null);

  const isCheatActivated = useCheatCode();

  return (
    <div className="relative">
      <StarCursor />
      
      <div ref={accueilRef}>
        <LandingPage />
      </div>

      <div ref={experiencesRef}>
        <CharacterIntro />
      </div>

      {/* On ajoute bien la ref ici pour le Lore */}
      <div ref={loreRef}>
        <Lore />
      </div>

      <div ref={projetsRef}>
        <Quests />
      </div>

      {/* On ajoute bien la ref ici pour les Sidequests */}
      <div ref={sidequestsRef}>
        <Sidequests />
      </div>

      <div ref={contactRef}>
        <Contact />
      </div>

      {/* On passe l'ensemble des 6 refs à l'Avatar */}
      <Avatar
        accueilRef={accueilRef}
        projetsRef={projetsRef}
        experiencesRef={experiencesRef}
        contactRef={contactRef}
        loreRef={loreRef}
        sidequestsRef={sidequestsRef}
      />

      <PhysicsEngine isActive={isCheatActivated} />
    </div>
  );
}

export default App;