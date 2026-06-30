import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { SkyPortal } from './SkyPortal';

interface RoyalDoorsProps {
  onOpen: () => void;
  onStartOpening?: () => void;
  brideName: string;
  groomName: string;
}

export const RoyalDoors: React.FC<RoyalDoorsProps> = ({ 
  onOpen, 
  onStartOpening, 
  brideName, 
  groomName 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    onStartOpening?.(); // Trigger synchronous playback for browser autoplay policies
    setIsOpen(true);
    // Delay triggering onOpen to let the opening animation play out beautifully
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  // Get initials
  const brideInitial = brideName ? brideName.charAt(0) : 'M';
  const groomInitial = groomName ? groomName.charAt(0) : 'A';

  return (
    <div 
      className="absolute inset-0 z-50 overflow-hidden bg-[#fcfaf7] flex items-center justify-center"
      style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
      id="royal-doors-viewport"
    >
      {/* 3D Celestial Portal (Sky and Clouds) rendered directly behind the doors */}
      <SkyPortal />

      {/* Decorative Top Palace Arch Header Overlay (Inspired by the baroque crown molding) */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#f5e3e6] via-[#fdfbf7]/80 to-transparent z-30 pointer-events-none flex flex-col items-center justify-start pt-4 select-none">
        {/* Intricate top arch crown svg */}
        <div className="text-[#b38220] opacity-80 mb-1">
          <svg width="180" height="30" viewBox="0 0 180 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 25 Q 90 -10, 170 25" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M20 23 Q 90 2, 160 23" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <circle cx="90" cy="8" r="4" fill="currentColor" />
            <path d="M80 8 Q 90 18, 100 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <span className="font-display text-[9px] tracking-[0.45em] text-[#b38220] font-bold uppercase block">Royal Palace Gates</span>
      </div>

      {/* LEFT DOOR PANEL (Dusty Rose & Gold Filigree) */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#fdfbf7] border-r-4 border-r-[#b38220] shadow-[12px_0_35px_rgba(0,0,0,0.22)] flex flex-col justify-between py-12 px-4 select-none z-20"
        style={{ 
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          backgroundImage: `
            linear-gradient(to right, #ebdcc2 0%, #fdfbf7 15%, #ffffff 40%, #fdfbf7 85%, #aa7c11 96%, #78510d 100%)
          `
        }}
        animate={isOpen ? {
          rotateY: -115,
          z: -50,
          transition: { duration: 1.8, ease: [0.25, 1, 0.5, 1] }
        } : { rotateY: 0, z: 0 }}
        id="royal-door-left"
      >
        {/* Outer Door Recess Panel (Ivory molding) */}
        <div className="absolute inset-4 border-[3px] border-[#ebd49d] rounded-t-[120px] rounded-b-xl pointer-events-none bg-[#fdfbf7] shadow-inner">
          <div className="absolute inset-1.5 border border-[#d4af37]/45 rounded-t-[115px] rounded-b-lg" />
          
          {/* Inner DUSTY ROSE Panel (As seen in the uploaded reference photo) */}
          <div 
            className="absolute inset-3.5 rounded-t-[105px] rounded-b-md border-2 border-[#b38220]/30 shadow-md"
            style={{
              backgroundColor: '#e2a4b1', // Soft dusty pink panel color matching the reference photo
              backgroundImage: 'radial-gradient(circle at 100% 50%, rgba(255, 255, 255, 0.15), transparent 70%)'
            }}
          >
            {/* Top Ornate Arch Line (Left Door) */}
            <div className="absolute top-8 right-4 text-[#ebd49d] opacity-80">
              <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1]">
                <path d="M0 0 C15 5, 30 15, 35 30 C38 38, 40 45, 40 45" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              </svg>
            </div>

            {/* Climbing Gold Flourish / Vines from bottom-left corner (High Fidelity to reference photo) */}
            <div className="absolute bottom-4 left-3 text-[#f3e5ab] opacity-90 select-none">
              <svg width="105" height="135" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Scroll 1 */}
                <path d="M5 125 C 20 125, 40 100, 30 70 C 20 40, 50 20, 85 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Branch 2 */}
                <path d="M22 95 Q 60 90, 75 110" stroke="currentColor" strokeWidth="1.2" fill="none" />
                {/* Branch 3 */}
                <path d="M30 65 Q 10 50, 15 30" stroke="currentColor" strokeWidth="1.2" fill="none" />
                {/* Floral buds */}
                <circle cx="85" cy="15" r="3.5" fill="currentColor" />
                <circle cx="75" cy="110" r="3" fill="currentColor" />
                <circle cx="15" cy="30" r="3" fill="currentColor" />
                {/* Leaves */}
                <path d="M45 45 C40 38, 32 40, 45 45 Z" fill="currentColor" />
                <path d="M60 30 C55 24, 48 26, 60 30 Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* Vintage Carved Latch/Pull Handle - Left side of center seam */}
        <div className="absolute right-1 top-[55%] -translate-y-1/2 w-4 h-24 bg-gradient-to-b from-[#aa7c11] via-[#d4af37] to-[#78510d] rounded-l border border-[#f3e5ab]/50 flex flex-col items-center justify-between py-3 shadow-lg z-30">
          <div className="w-[2px] h-full bg-[#4d3412]/40 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-[#78510d] border border-white/20" />
        </div>
      </motion.div>

      {/* RIGHT DOOR PANEL (Dusty Rose & Gold Filigree) */}
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#fdfbf7] border-l-4 border-l-[#b38220] shadow-[-12px_0_35px_rgba(0,0,0,0.22)] flex flex-col justify-between py-12 px-4 select-none z-20"
        style={{ 
          transformOrigin: 'right center',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          backgroundImage: `
            linear-gradient(to left, #ebdcc2 0%, #fdfbf7 15%, #ffffff 40%, #fdfbf7 85%, #aa7c11 96%, #78510d 100%)
          `
        }}
        animate={isOpen ? {
          rotateY: 115,
          z: -50,
          transition: { duration: 1.8, ease: [0.25, 1, 0.5, 1] }
        } : { rotateY: 0, z: 0 }}
        id="royal-door-right"
      >
        {/* Outer Door Recess Panel (Ivory molding) */}
        <div className="absolute inset-4 border-[3px] border-[#ebd49d] rounded-t-[120px] rounded-b-xl pointer-events-none bg-[#fdfbf7] shadow-inner">
          <div className="absolute inset-1.5 border border-[#d4af37]/45 rounded-t-[115px] rounded-b-lg" />
          
          {/* Inner DUSTY ROSE Panel (As seen in reference photo) */}
          <div 
            className="absolute inset-3.5 rounded-t-[105px] rounded-b-md border-2 border-[#b38220]/30 shadow-md"
            style={{
              backgroundColor: '#e2a4b1', // Matching soft dusty pink
              backgroundImage: 'radial-gradient(circle at 0% 50%, rgba(255, 255, 255, 0.15), transparent 70%)'
            }}
          >
            {/* Top Ornate Arch Line (Right Door) */}
            <div className="absolute top-8 left-4 text-[#ebd49d] opacity-80">
              <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0 C15 5, 30 15, 35 30 C38 38, 40 45, 40 45" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              </svg>
            </div>

            {/* Climbing Gold Flourish / Vines from bottom-right corner (Symmetrical) */}
            <div className="absolute bottom-4 right-3 text-[#f3e5ab] opacity-90 select-none">
              <svg width="105" height="135" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1]">
                {/* Scroll 1 */}
                <path d="M5 125 C 20 125, 40 100, 30 70 C 20 40, 50 20, 85 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Branch 2 */}
                <path d="M22 95 Q 60 90, 75 110" stroke="currentColor" strokeWidth="1.2" fill="none" />
                {/* Branch 3 */}
                <path d="M30 65 Q 10 50, 15 30" stroke="currentColor" strokeWidth="1.2" fill="none" />
                {/* Floral buds */}
                <circle cx="85" cy="15" r="3.5" fill="currentColor" />
                <circle cx="75" cy="110" r="3" fill="currentColor" />
                <circle cx="15" cy="30" r="3" fill="currentColor" />
                {/* Leaves */}
                <path d="M45 45 C40 38, 32 40, 45 45 Z" fill="currentColor" />
                <path d="M60 30 C55 24, 48 26, 60 30 Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* Vintage Carved Latch/Pull Handle - Right side of center seam */}
        <div className="absolute left-1 top-[55%] -translate-y-1/2 w-4 h-24 bg-gradient-to-b from-[#aa7c11] via-[#d4af37] to-[#78510d] rounded-r border border-[#f3e5ab]/50 flex flex-col items-center justify-between py-3 shadow-lg z-30">
          <div className="w-[2px] h-full bg-[#4d3412]/40 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-[#78510d] border border-white/20" />
        </div>
      </motion.div>

      {/* CENTRAL MONOGRAM EMBOSSED MEDALLION (Midnight Black & Gold Filigree - Matches uploaded photo exactly!) */}
      <motion.div
        className="absolute w-44 h-44 rounded-full z-40 flex items-center justify-center cursor-pointer"
        animate={isOpen ? {
          scale: 0.75,
          opacity: 0,
          transition: { duration: 0.9, ease: 'easeIn' }
        } : { scale: 1, opacity: 1 }}
        onClick={handleOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        id="royal-monogram-medallion"
      >
        {/* Glow halo aura rings */}
        <div className="absolute inset-[-12px] rounded-full border border-[#e2a4b1]/30 animate-pulse" />
        <div className="absolute inset-[-6px] rounded-full border border-[#d4af37]/35 animate-spin-slow" style={{ animationDuration: '24s' }} />

        {/* Heavy baroque relief golden frame */}
        <div 
          className="absolute inset-0 rounded-full p-1 shadow-[0_15px_35px_rgba(77,52,18,0.25)] bg-gradient-to-br from-[#b38220] via-[#f3e5ab] to-[#78510d]"
          style={{ border: '4px double rgba(120, 81, 13, 0.7)' }}
        >
          {/* Midnight Black Inner Medallion Background (Matching user's reference) */}
          <div className="w-full h-full rounded-full bg-[#111111] border-2 border-[#b38220] flex flex-col items-center justify-center p-2 relative overflow-hidden shadow-inner">
            
            {/* Ornate gold decorative vine rings inside black medallion */}
            <div className="absolute inset-2.5 rounded-full border border-[#b38220]/25 pointer-events-none" />
            
            <div className="absolute top-4 text-[#ebd49d]/80"><Sparkles size={11} /></div>
            
            {/* Elegant Calligraphy Initials */}
            <span className="font-royal-script text-4xl font-bold gold-text-shimmer select-none mt-1">
              {brideInitial} & {groomInitial}
            </span>

            {/* Tap cue subtitle with subtle fade pulse */}
            <span className="font-sans text-[7.5px] tracking-[0.3em] text-[#ebd49d] uppercase font-bold mt-3.5 animate-pulse select-none">
              TAP TO ENTER
            </span>

            <div className="absolute bottom-4 text-[#ebd49d]/80"><Sparkles size={9} /></div>
          </div>
        </div>
      </motion.div>

      {/* Symmetrical framing borders on the outer viewport */}
      <div className="absolute inset-y-0 left-0 w-2.5 bg-[#ebd49d] z-30 shadow-md border-r border-[#d4af37]/40" />
      <div className="absolute inset-y-0 right-0 w-2.5 bg-[#ebd49d] z-30 shadow-md border-l border-[#d4af37]/40" />
    </div>
  );
};
