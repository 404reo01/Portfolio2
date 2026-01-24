import { useEffect, useState } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export function useCheatCode() {
  const [isActivated, setIsActivated] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      // Désactiver avec Échap et recharger la page
      if (key === 'Escape') {
        setIsActivated(false);
        setKeySequence([]);
        // Small delay to ensure state changes are applied before reload
        setTimeout(() => {
          window.location.reload();
        }, 100);
        return;
      }

      setKeySequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length);
        if (newSequence.join(',') === KONAMI_CODE.join(',')) {
          setIsActivated(true);
          return [];
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return isActivated;
}
