import { useEffect, useRef } from 'react';

export default function PhysicsEngine({ isActive }) {
  const physicsElementsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      // Get all interactive elements
      const elements = document.querySelectorAll('h1, h2, h3, h4, p, .pixel-button, .pixel-border, .quest-card, .project-card, img');
      const physicsElements = [];

      elements.forEach((el, index) => {
        // Skip elements that are already in physics or in avatar
        if (el.classList.contains('physics-active') || el.closest('.avatar-container')) {
          return;
        }

        const rect = el.getBoundingClientRect();

        // Store original styles and position
        const originalStyles = {
          position: el.style.position,
          transform: el.style.transform,
          zIndex: el.style.zIndex,
          willChange: el.style.willChange,
          backfaceVisibility: el.style.backfaceVisibility,
          transformStyle: el.style.transformStyle
        };

        // Apply GPU acceleration properties to prevent layout issues
        el.style.position = 'relative';
        el.style.willChange = 'transform';
        el.style.backfaceVisibility = 'hidden';
        el.style.transformStyle = 'preserve-3d';
        el.style.zIndex = '10';

        // Ensure parent containers maintain their background
        let parent = el.parentElement;
        while (parent && parent !== document.body) {
          if (!parent.style.backgroundColor && getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)') {
            parent.style.backgroundColor = '#28282B'; // Match the main background
          }
          parent = parent.parentElement;
        }

        const elementData = {
          element: el,
          originalStyles,
          velocityX: 0,
          velocityY: 0,
          angle: 0,
          angularVelocity: 0,
          originalX: rect.left,
          originalY: rect.top
        };

        physicsElements.push(elementData);
        el.classList.add('physics-active');
      });

      physicsElementsRef.current = physicsElements;

      // Physics animation loop using CSS transforms for GPU acceleration
      const animate = () => {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        physicsElements.forEach((item) => {
          const { element, originalX, originalY } = item;
          const rect = element.getBoundingClientRect();
          const elementHeight = rect.height;
          const elementWidth = rect.width;

          // Gentle floating motion
          item.velocityX += (Math.random() - 0.5) * 0.1;
          item.velocityY += (Math.random() - 0.5) * 0.1;

          // Spring back to original position (relative to viewport)
          const currentRect = element.getBoundingClientRect();
          const dx = (originalX - currentRect.left) * 0.002;
          const dy = (originalY - currentRect.top) * 0.002;

          item.velocityX += dx;
          item.velocityY += dy;

          // Damping
          item.velocityX *= 0.98;
          item.velocityY *= 0.98;

          // Viewport constraints to prevent elements from going out of bounds
          const maxY = viewportHeight - elementHeight - 20; // 20px margin from bottom
          const minY = 20; // 20px margin from top
          const maxX = viewportWidth - elementWidth - 20; // 20px margin from right
          const minX = 20; // 20px margin from left

          // Calculate new position
          let newX = item.velocityX;
          let newY = item.velocityY;

          // Apply constraints - bounce back if hitting viewport edges
          if (currentRect.top + newY < minY) {
            newY = minY - currentRect.top;
            item.velocityY *= -0.3; // Bounce with reduced velocity
          } else if (currentRect.top + newY > maxY) {
            newY = maxY - currentRect.top;
            item.velocityY *= -0.3; // Bounce with reduced velocity
          }

          if (currentRect.left + newX < minX) {
            newX = minX - currentRect.left;
            item.velocityX *= -0.3; // Bounce with reduced velocity
          } else if (currentRect.left + newX > maxX) {
            newX = maxX - currentRect.left;
            item.velocityX *= -0.3; // Bounce with reduced velocity
          }

          // Update velocities with constraints
          item.velocityX = newX;
          item.velocityY = newY;

          // Gentle rotation
          item.angularVelocity += (Math.random() - 0.5) * 0.005;
          item.angularVelocity *= 0.95;
          item.angle += item.angularVelocity;

          // Apply GPU-accelerated transform
          element.style.transform = `translate3d(${item.velocityX}px, ${item.velocityY}px, 0) rotate(${item.angle}rad)`;
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();

    } else {
      // Clean up animations
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Reset all elements to their original state
      physicsElementsRef.current.forEach(({ element, originalStyles }) => {
        Object.assign(element.style, originalStyles);
        element.classList.remove('physics-active');
      });

      physicsElementsRef.current = [];
    }
  }, [isActive]);

  return null; // This component manages existing DOM elements
}
