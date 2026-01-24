import { useEffect, useRef, useState } from 'react';

export default function StarCursor() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [particles, setParticles] = useState([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add new particle
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        createdAt: Date.now(),
        size: Math.random() * 3 + 2,
        brightness: 1
      };

      setParticles(prev => [...prev.slice(-15), newParticle]); // Keep max 15 particles
    };

    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        brightness: Math.max(0, particle.brightness - 0.02) // Fade out over ~500ms
      })).filter(particle => particle.brightness > 0));

      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isEnabled]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className="fixed top-4 right-4 z-50 pixel-button text-xs"
        title={isEnabled ? "Désactiver la traînée d'étoiles" : "Activer la traînée d'étoiles"}
      >
        {isEnabled ? "✨ OFF" : "✨ ON"}
      </button>

      {/* Particles */}
      {isEnabled && particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-10"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: '#f5f5dc',
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size * 2}px #f5f5dc`,
            opacity: particle.brightness,
            transform: 'translateZ(0)', // Force GPU acceleration
          }}
        />
      ))}
    </>
  );
}