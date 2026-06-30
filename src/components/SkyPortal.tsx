import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  opacity: number;
  type: 'petal' | 'sparkle';
  rotation: number;
  rotationSpeed: number;
}

export const SkyPortal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  // Parallax effect on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
      
      // Smooth parallax damping
      setParallax({ x: x * 25, y: y * 25 });
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      // For mobile device tilt parallax
      if (e.beta === null || e.gamma === null) return;
      const x = Math.min(Math.max(e.gamma / 30, -1), 1) * 15; // capped at tilt 30deg
      const y = Math.min(Math.max((e.beta - 45) / 30, -1), 1) * 15;
      setParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  // Handle click to spawn premium flower petals and sparkles
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Only spawn if click is within the viewport bounds
      if (clickX < 0 || clickX > rect.width || clickY < 0 || clickY > rect.height) {
        return;
      }

      const newParticles: Particle[] = [];
      const particleCount = 12; // spawn multiple particles on each click

      for (let i = 0; i < particleCount; i++) {
        const type = Math.random() > 0.4 ? 'petal' : 'sparkle';
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        const size = type === 'petal' ? Math.random() * 12 + 8 : Math.random() * 6 + 3;
        
        // Soft pink rose or ivory jasmine petal colors
        const colors = [
          '#f4e3e6', // Soft pink petal
          '#ebd49d', // Gold sparkle
          '#ffffff', // White jasmine petal
          '#e2a4b1', // Deep rose petal
          '#fdfbf7', // Royal cream
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        newParticles.push({
          id: particleIdRef.current++,
          x: clickX,
          y: clickY,
          size,
          color,
          angle,
          speed,
          opacity: 1,
          type,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 5,
        });
      }

      setParticles((prev) => [...prev, ...newParticles].slice(-100)); // cap at max 100 particles for performance
    };

    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Animate particles
  useEffect(() => {
    const timer = setInterval(() => {
      setParticles((prev) => 
        prev
          .map((p) => {
            // Apply physics: gravity/drift
            const dx = Math.cos(p.angle) * p.speed + (p.type === 'petal' ? 0.3 : 0); // slight wind for petals
            const dy = Math.sin(p.angle) * p.speed + (p.type === 'petal' ? 1.5 : 0.4); // gravity
            
            return {
              ...p,
              x: p.x + dx,
              y: p.y + dy,
              rotation: p.rotation + p.rotationSpeed,
              opacity: p.opacity - 0.02, // fade out
            };
          })
          .filter((p) => p.opacity > 0 && p.y < 900 && p.x > -50 && p.x < 550)
      );
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#b9e2f6] via-[#e0f2fe] to-[#fdfbf7] pointer-events-none select-none"
      id="3d-sky-portal-container"
    >
      {/* 3D Moving Celestial Sky Sunbeam Glow */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(253,251,247,0.7)_0%,_rgba(255,255,255,0)_70%)] opacity-80"
        style={{
          top: '-50px',
          left: '10%',
          transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Background Cloud Layer (Slowest) */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          transform: `translate(${parallax.x * 0.2}px, ${parallax.y * 0.2}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className="absolute top-[10%] -left-10 w-64 h-24 bg-white rounded-full blur-2xl animate-drift-slow" style={{ animationDuration: '45s' }} />
        <div className="absolute top-[35%] -right-16 w-80 h-28 bg-white rounded-full blur-3xl animate-drift-reverse" style={{ animationDuration: '60s' }} />
      </div>

      {/* Midground Clouds (Interactive & Modifying parallax) */}
      <div 
        className="absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          transform: `translate(${parallax.x * 0.6}px, ${parallax.y * 0.6}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="absolute top-[20%] right-4 w-72 h-20 bg-[#fdfaf2] rounded-full blur-xl animate-drift-slow" style={{ animationDuration: '30s' }} />
        <div className="absolute top-[50%] left-[15%] w-96 h-28 bg-[#f5faff] rounded-full blur-2xl animate-drift-slow" style={{ animationDuration: '40s' }} />
      </div>

      {/* Foreground Majestic Clouds (Fastest drift & maximum parallax) */}
      <div 
        className="absolute inset-0 opacity-80 mix-blend-normal pointer-events-none"
        style={{
          transform: `translate(${parallax.x * 1.2}px, ${parallax.y * 1.2}px)`,
          transition: 'transform 0.08s ease-out',
        }}
      >
        {/* Soft, gorgeous vector clouds floating */}
        <div className="absolute bottom-[15%] -left-20 w-80 h-32 bg-white rounded-full blur-xl animate-drift-slow" style={{ animationDuration: '22s' }} />
        <div className="absolute bottom-[5%] -right-10 w-[450px] h-36 bg-gradient-to-t from-white to-[#fcfaf5] rounded-full blur-lg animate-drift-reverse" style={{ animationDuration: '28s' }} />
      </div>

      {/* Ambient Celestial Light Beams */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay pointer-events-none" />

      {/* Interactive Click-Spawned Petals & Sparkles Canvas Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-55 overflow-visible">
        {particles.map((p) => {
          if (p.type === 'petal') {
            return (
              <g 
                key={p.id}
                transform={`translate(${p.x}, ${p.y}) rotate(${p.rotation})`}
                style={{ opacity: p.opacity }}
              >
                {/* Organic curved shape for a flower petal */}
                <path 
                  d="M0,0 C-8,-12 -12,-4 -2,8 C4,14 12,10 8,-2 Z" 
                  fill={p.color}
                  className="shadow-sm filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                  style={{ transform: `scale(${p.size / 10})` }}
                />
              </g>
            );
          } else {
            return (
              <g 
                key={p.id}
                transform={`translate(${p.x}, ${p.y}) rotate(${p.rotation})`}
                style={{ opacity: p.opacity }}
              >
                {/* 4-point golden sparkle star */}
                <path 
                  d="M0,-8 Q0,0 8,0 Q0,0 0,8 Q0,0 -8,0 Q0,0 0,-8" 
                  fill={p.color}
                  style={{ transform: `scale(${p.size / 4})` }}
                />
              </g>
            );
          }
        })}
      </svg>
    </div>
  );
};
