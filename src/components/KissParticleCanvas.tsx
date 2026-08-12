import React, { useEffect, useState } from 'react';
import { ClickParticle } from '../types';
import { soundManager } from '../utils/audioSynth';

export const KissParticleCanvas: React.FC = () => {
  const [particles, setParticles] = useState<ClickParticle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      // Don't trigger if target is an interactive button or input
      const target = e.target as HTMLElement;
      if (target.closest('button, input, textarea, a, .interactive-card')) {
        return;
      }

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const emojis = ['💋', '😘', '💖', '💕', '🌹', '✨', '💌'];
      const count = 3 + Math.floor(Math.random() * 3);
      const newBatch: ClickParticle[] = [];

      for (let i = 0; i < count; i++) {
        newBatch.push({
          id: `${Date.now()}-${Math.random()}`,
          x: clientX + (Math.random() * 40 - 20),
          y: clientY + (Math.random() * 40 - 20),
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          size: 20 + Math.random() * 18,
          rotation: Math.random() * 40 - 20,
        });
      }

      soundManager.playPopSound();

      setParticles((prev) => [...prev.slice(-25), ...newBatch]);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Clean up old particles automatically
  useEffect(() => {
    if (particles.length === 0) return;

    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 1200);

    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none transition-all duration-1000 ease-out transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            opacity: 0.9,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};
