import React, { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CharacterIntro from './components/CharacterIntro';
import Lore from './components/Lore';
import Quests from './components/Quests';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Avatar from './components/Avatar/Avatar';
import PhysicsEngine from './utils/physics/PhysicsEngine';
import StarCursor from './components/StarCursor';
import Sidequests from './components/Sidequests';
import Terminal from './components/Terminal';
import Achievement from './components/Achievement';
import bgImage from './assets/bg.jpg';

function App() {
  const accueilRef     = useRef(null);
  const projetsRef     = useRef(null);
  const experiencesRef = useRef(null);
  const loreRef        = useRef(null);
  const sidequestsRef  = useRef(null);
  const contactRef     = useRef(null);

  const [isPhysicsActive, setIsPhysicsActive] = useState(false);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage})` }}
    >
      <Navbar />
      <StarCursor />

      <div ref={accueilRef}>
        <LandingPage />
      </div>

      <div ref={experiencesRef}>
        <CharacterIntro />
      </div>

      <div ref={loreRef}>
        <Lore />
      </div>

      <div ref={projetsRef}>
        <Quests />
      </div>

      <div ref={sidequestsRef}>
        <Sidequests />
      </div>

      <div ref={contactRef}>
        <Contact />
      </div>

      <Footer />

      <Avatar
        accueilRef={accueilRef}
        projetsRef={projetsRef}
        experiencesRef={experiencesRef}
        contactRef={contactRef}
        loreRef={loreRef}
        sidequestsRef={sidequestsRef}
      />

      <Terminal onPhysics={() => setIsPhysicsActive(true)} />
      <PhysicsEngine isActive={isPhysicsActive} />
      <Achievement
        accueilRef={accueilRef}
        experiencesRef={experiencesRef}
        loreRef={loreRef}
        projetsRef={projetsRef}
        sidequestsRef={sidequestsRef}
        contactRef={contactRef}
      />
    </div>
  );
}

export default App;
