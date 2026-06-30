import React, { useRef, useEffect } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  angle: number;
  spin: number;
  spinSpeed: number;
  opacity: number;
  swingRange: number;
  swingSpeed: number;
  swingOffset: number;
}

export const InteractiveFlowerShower: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const petalIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to fit viewport
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Color choices for premium fresh rose petals and royal jasmine leaves
    const colors = [
      'rgba(244, 227, 230, 0.92)', // Velvet blush pink
      'rgba(226, 164, 177, 0.95)', // Deep ceremonial rose
      'rgba(186, 60, 83, 0.88)',   // Elegant ruby rose (royal shade)
      'rgba(253, 251, 247, 0.96)', // Royal white jasmine petal
      'rgba(255, 255, 255, 0.98)', // Premium pearl white
      'rgba(212, 175, 55, 0.75)',  // Royal gold leaf particle
    ];

    // Listen to touch and click events globally
    const handleSpawnPetals = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      // Spawn 6 beautiful organic drifting petals on tap
      const count = 7;
      const newPetals: Petal[] = [];

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 12 + 8; // realistic size 8px to 20px
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Spawn with organic spray velocity
        const angle = Math.random() * Math.PI * 2;
        const force = Math.random() * 3 + 1;
        const speedX = Math.cos(angle) * force;
        const speedY = Math.sin(angle) * force - 1.5; // slight upward pop first!

        newPetals.push({
          id: petalIdRef.current++,
          x: clientX,
          y: clientY,
          size,
          color,
          speedY: Math.random() * 1.5 + 1.2, // normal descent speed
          speedX,
          angle: Math.random() * Math.PI * 2,
          spin: Math.random() * 360,
          spinSpeed: (Math.random() - 0.5) * 5,
          opacity: 1.0,
          swingRange: Math.random() * 20 + 10,
          swingSpeed: Math.random() * 0.05 + 0.02,
          swingOffset: Math.random() * Math.PI,
        });
      }

      petalsRef.current = [...petalsRef.current, ...newPetals].slice(-150); // limit to 150 petals for optimal performance
    };

    window.addEventListener('click', handleSpawnPetals);
    window.addEventListener('touchstart', handleSpawnPetals, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current = petalsRef.current.filter((p) => {
        // Apply physics
        p.y += p.speedY;
        // Dampen initial tap velocity over time and blend with natural wind swaying
        p.speedX *= 0.96;
        const swing = Math.sin(p.y * p.swingSpeed + p.swingOffset) * 0.3;
        p.x += p.speedX + swing;
        p.spin += p.spinSpeed;
        p.opacity -= 0.007; // slowly fade out as it falls down

        if (p.y > canvas.height + 20 || p.opacity <= 0) {
          return false;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.spin * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        // Draw extremely organic curved leaf/petal shape
        ctx.beginPath();
        ctx.fillStyle = p.color;
        
        // Let's draw a beautiful 3D folded organic petal
        ctx.moveTo(0, -p.size / 2);
        ctx.quadraticCurveTo(p.size * 0.6, -p.size * 0.4, p.size * 0.5, p.size * 0.2);
        ctx.quadraticCurveTo(0, p.size * 0.9, -p.size * 0.5, p.size * 0.2);
        ctx.quadraticCurveTo(-p.size * 0.6, -p.size * 0.4, 0, -p.size / 2);
        ctx.closePath();
        ctx.fill();

        // Elegant gold/white leaf spine detail
        ctx.strokeStyle = p.color.includes('212') ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.55)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.3);
        ctx.quadraticCurveTo(0, 0, 0, p.size * 0.4);
        ctx.stroke();

        ctx.restore();
        return true;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleSpawnPetals);
      window.removeEventListener('touchstart', handleSpawnPetals);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100] w-full h-full"
      id="global-interactive-flower-shower"
    />
  );
};
