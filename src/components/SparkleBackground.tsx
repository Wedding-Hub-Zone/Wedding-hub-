import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const SparkleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 35 premium glowing gold particles
    const generated: Particle[] = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random left percentage
      y: Math.random() * 100 + 100, // start below the screen
      size: Math.random() * 3 + 1, // 1px to 4px
      duration: Math.random() * 12 + 8, // slow drift, 8s to 20s
      delay: Math.random() * -15, // start at different points in their animation
      opacity: Math.random() * 0.6 + 0.2, // soft glow
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" id="sparkle-particles-layer">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-tr from-[#aa7c11] via-[#d4af37] to-[#f3e5ab] shadow-[0_0_8px_rgba(212,175,55,0.8)]"
          style={{
            left: `${p.x}%`,
            top: `-10%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationName: 'floatUp',
            animationDuration: `${p.duration}s`,
            animationTimingFunction: 'linear',
            animationDelay: `${p.delay}s`,
            animationIterationCount: 'infinite',
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(110vh) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: var(--p-opacity, 0.6);
          }
          50% {
            transform: translateY(50vh) translateX(25px) scale(1.2);
          }
          90% {
            opacity: var(--p-opacity, 0.6);
          }
          100% {
            transform: translateY(-10vh) translateX(-15px) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export const LuxuryConfetti: React.FC<{ active: boolean }> = ({ active }) => {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; delay: number; rotate: number; scale: number }>>([]);

  useEffect(() => {
    if (active) {
      const arr = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        rotate: Math.random() * 360,
        scale: Math.random() * 0.8 + 0.4,
      }));
      setPieces(arr);
    } else {
      setPieces([]);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50" id="luxury-confetti-layer">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] rounded-sm"
          style={{
            left: `${p.left}%`,
            top: `-5%`,
            width: '8px',
            height: '14px',
            transform: `rotate(${p.rotate}deg) scale(${p.scale})`,
            animation: `confettiFall 4s ease-out forwards`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% {
            top: -5%;
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 1;
          }
          100% {
            top: 105%;
            transform: translateY(100vh) rotate(720deg) translateX(50px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
