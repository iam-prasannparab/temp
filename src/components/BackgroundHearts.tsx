import React, { useMemo } from 'react';

interface BackgroundHeartsProps {
  isPaused?: boolean;
}

export const BackgroundHearts: React.FC<BackgroundHeartsProps> = ({ isPaused = false }) => {
  const heartParticles = useMemo(() => {
    const emojis = ['💖', '💋', '💗', '😘', '💕', '✨', '🌹', '❤️', '💌'];
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${(i * 4.5 + Math.sin(i) * 3) % 96}%`,
      animationDuration: `${7 + (i % 6) * 2.2}s`,
      animationDelay: `${(i % 5) * 1.5}s`,
      fontSize: `${18 + (i % 5) * 8}px`,
      opacity: 0.35 + (i % 4) * 0.12,
    }));
  }, []);

  if (isPaused) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {heartParticles.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up select-none"
          style={{
            left: heart.left,
            bottom: '-50px',
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
            fontSize: heart.fontSize,
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};
