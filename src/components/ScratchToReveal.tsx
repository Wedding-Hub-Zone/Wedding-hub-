import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ScratchToRevealProps {
  revealContent: React.ReactNode;
  width?: number;
  height?: number;
}

interface Petal {
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
}

export const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  revealContent,
  width = 300,
  height = 180,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const showerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [showFlowerShower, setShowFlowerShower] = useState(false);
  const scratchStartedRef = useRef(false);

  // Initialize and paint the Scratch Card
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // 1. Draw Royal Velvet Rose-Gold / Pink-Gold Foil Scratch Layer
    ctx.fillStyle = '#852245'; // Velvet Rose Burgundy (Premium Pink-Gold theme)
    ctx.fillRect(0, 0, width, height);

    // Overlay gold metallic foil sheen
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, 'rgba(212, 175, 55, 0.45)');
    goldGrad.addColorStop(0.3, 'rgba(133, 34, 69, 0.1)'); // reveal underlying velvet rose
    goldGrad.addColorStop(0.5, 'rgba(253, 251, 247, 0.7)'); // bright gold hot foil shine
    goldGrad.addColorStop(0.7, 'rgba(133, 34, 69, 0.1)');
    goldGrad.addColorStop(1, 'rgba(179, 130, 32, 0.5)');

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // Add a textured brushed-metal/grain effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 400; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      ctx.fillRect(px, py, Math.random() * 2 + 1, 1);
    }

    // 2. Draw Decorative Double Gold Borders
    ctx.strokeStyle = '#d4af37'; // Antique yellow gold
    ctx.lineWidth = 2.5;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.strokeStyle = '#f3e5ab'; // Soft light gold
    ctx.lineWidth = 1;
    ctx.strokeRect(9, 9, width - 18, height - 18);

    // Draw Ornate Corner Filigree Accents
    ctx.fillStyle = '#d4af37';
    const drawCornerOrnament = (cx: number, cy: number, dx: number, dy: number) => {
      ctx.fillRect(cx, cy, dx * 10, dy * 2);
      ctx.fillRect(cx, cy, dx * 2, dy * 10);
      // Small dot
      ctx.beginPath();
      ctx.arc(cx + dx * 14, cy + dy * 14, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    drawCornerOrnament(12, 12, 1, 1); // Top Left
    drawCornerOrnament(width - 12, 12, -1, 1); // Top Right
    drawCornerOrnament(12, height - 12, 1, -1); // Bottom Left
    drawCornerOrnament(width - 12, height - 12, -1, -1); // Bottom Right

    // 3. Draw Beautiful Typographic Scratch Text and Blossom Emblem
    ctx.fillStyle = '#f3e5ab'; // Premium soft light gold text
    ctx.font = 'bold 11.5px "Cinzel", "Montserrat", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH WITH LOVE', width / 2, height / 2 - 20);

    // Draw central gorgeous blossom icon
    ctx.fillStyle = '#ebd49d';
    ctx.font = '28px serif';
    ctx.fillText('🌸', width / 2, height / 2 + 8);

    // Tap cue
    ctx.fillStyle = '#fdfbf7';
    ctx.font = 'italic 9.5px "Playfair Display", serif';
    ctx.fillText('Reveal the Sacred Date & Time', width / 2, height / 2 + 38);
  }, [width, height]);

  // Full-Screen Flower Shower Animation when scratched is complete
  useEffect(() => {
    if (!showFlowerShower) return;

    const canvas = showerCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fit canvas to fullscreen viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 80 beautiful rose and jasmine petals
    const petals: Petal[] = [];
    const colors = [
      'rgba(244, 227, 230, 0.9)', // Soft blush pink rose
      'rgba(226, 164, 177, 0.95)', // Deep rose pink
      'rgba(253, 251, 247, 0.95)', // Royal white jasmine
      'rgba(255, 255, 255, 0.95)', // Pure white
      'rgba(235, 212, 157, 0.85)', // Light gold petal flakes
    ];

    for (let i = 0; i < 75; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height - 50, // start above screen
        size: Math.random() * 14 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 2 + 1.5,
        speedX: (Math.random() - 0.5) * 1.5,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 360,
        spinSpeed: (Math.random() - 0.5) * 4,
        opacity: Math.random() * 0.4 + 0.6,
      });
    }

    let animationFrameId: number;
    let fadeOutProgress = 0; // fade out the shower after 9 seconds

    const animateShower = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fadeOutProgress += 1;

      let activePetals = 0;

      petals.forEach((p) => {
        // Move petal
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y / 30) * 0.5; // gentle swaying
        p.spin += p.spinSpeed;

        // Fade out at end of life cycle or when falling off screen
        let finalOpacity = p.opacity;
        if (fadeOutProgress > 450) { // fade out after ~7.5 seconds
          finalOpacity *= Math.max(0, 1 - (fadeOutProgress - 450) / 100);
        }

        if (p.y < canvas.height + 50 && finalOpacity > 0) {
          activePetals++;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.spin * Math.PI) / 180);
          ctx.globalAlpha = finalOpacity;

          // Draw an elegant organic curved flower petal shape
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.moveTo(0, -p.size / 2);
          ctx.quadraticCurveTo(p.size / 2, -p.size / 2, p.size / 2, 0);
          ctx.quadraticCurveTo(p.size / 2, p.size / 2, 0, p.size);
          ctx.quadraticCurveTo(-p.size / 2, p.size / 2, -p.size / 2, 0);
          ctx.quadraticCurveTo(-p.size / 2, -p.size / 2, 0, -p.size / 2);
          ctx.closePath();
          ctx.fill();

          // Delicate interior highlight line
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 4);
          ctx.quadraticCurveTo(0, p.size / 4, 0, p.size / 2);
          ctx.stroke();

          ctx.restore();
        }
      });

      // Stop animation once all faded or 10 seconds pass
      if (activePetals > 0 && fadeOutProgress < 580) {
        animationFrameId = requestAnimationFrame(animateShower);
      } else {
        setShowFlowerShower(false);
      }
    };

    animationFrameId = requestAnimationFrame(animateShower);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [showFlowerShower]);

  // Coordinates helper
  const getCoordinates = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const draw = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isScratched) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    // Scratch away the surface
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2); // thicker cursor path
    ctx.fill();

    scratchStartedRef.current = true;

    // Check scratch percentage occasionally
    if (Math.random() < 0.2) {
      checkScratchPercentage();
    }
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;

    // Scan alpha channel
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const percent = (transparentCount / (canvas.width * canvas.height)) * 100;
    setScratchPercent(percent);

    // CRITICAL REQUIREMENT: Smooth auto-reveal after 20%
    if (percent > 20) {
      triggerFullReveal();
    }
  };

  const triggerFullReveal = () => {
    setIsScratched(true);
    setShowFlowerShower(true); // Trigger the premium full-screen flower shower!

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div className="relative flex flex-col items-center" id="scratch-reveal-widget-wrapper">
      {/* Dynamic Instruction Header */}
      <div className="text-center mb-3 flex flex-col items-center gap-1">
        <span className="font-serif text-[11px] italic text-[#593c18]/80 font-medium tracking-wide">
          {isScratched ? '✨ Auspicious Date Revealed ✨' : 'Scratch the Pink Gold Card'}
        </span>
        <span className="text-[#b38220] animate-pulse text-xs">✿</span>
      </div>

      <div 
        className="relative overflow-hidden rounded-2xl border border-[#d4af37]/40 shadow-[0_15px_30px_rgba(179,130,32,0.15)]" 
        style={{ width: `${width}px`, height: `${height}px` }}
        id="scratch-card-box"
      >
        {/* Underneath Revealed Content */}
        <div className="absolute inset-0 bg-[#fdfbf7] flex flex-col items-center justify-center p-4">
          {revealContent}
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleStart}
          onMouseMove={draw}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={draw}
          onTouchEnd={handleEnd}
          className={`absolute inset-0 cursor-pointer z-20 touch-none transition-opacity duration-700 ease-out ${
            isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ width: '100%', height: '100%' }}
        />

        {/* Sparkles visual on complete reveal */}
        {isScratched && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.5, 1.2], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5 }}
              className="text-[#b38220] flex gap-2"
            >
              <Sparkles size={26} className="animate-spin-slow" />
              <Sparkles size={18} />
            </motion.div>
          </div>
        )}
      </div>

      {/* Full screen canvas flower shower layer when complete */}
      {showFlowerShower && (
        <canvas
          ref={showerCanvasRef}
          className="fixed inset-0 pointer-events-none z-50 w-full h-full"
          id="fullscreen-flower-shower-canvas"
        />
      )}
    </div>
  );
};
