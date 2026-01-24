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

function App() {
  const accueilRef = useRef(null);
  const projetsRef = useRef(null);
  const experiencesRef = useRef(null);
  const contactRef = useRef(null);

  const isCheatActivated = useCheatCode();

  return (
    <div className="relative">
      {/* Global visual effects */}
      <StarCursor />
      
      

      <div ref={accueilRef}>
        <LandingPage />
      </div>
      <div ref={experiencesRef}>
        <CharacterIntro />
      </div>
      <Lore />
      <div ref={projetsRef}>
        <Quests />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>

      <Avatar
        accueilRef={accueilRef}
        projetsRef={projetsRef}
        experiencesRef={experiencesRef}
        contactRef={contactRef}
      />

      <PhysicsEngine isActive={isCheatActivated} />
    </div>
  );
}

export default App;
