import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Heart, Clock, Calendar, MapPin, Phone, Mail, Instagram, 
  Gift, Users, Volume2, VolumeX, ChevronLeft, ChevronRight, 
  ExternalLink, Sparkle, Sun, Moon
} from 'lucide-react';

import { 
  BRIDE_NAME, GROOM_NAME, WEDDING_DATE_RAW, WEDDING_DATE, 
  WEDDING_DAY, WEDDING_MONTH, WEDDING_YEAR, WEDDING_TIME, 
  VENUE_NAME, FULL_ADDRESS, GOOGLE_MAPS_LINK, PHONE, WHATSAPP, 
  EMAIL, INSTAGRAM, WEBSITE, INTRO_PARAGRAPH, GALLERY_ITEMS, 
  FAMILY_MEMBERS 
} from './data';

import { 
  GoldDivider, 
  GoldCornerOrnament, 
  RoyalCrest, 
  GoldScrollBanner, 
  GoldPinstripes 
} from './components/GoldOrnaments';
import { SparkleBackground } from './components/SparkleBackground';
import { InvitationCard } from './components/InvitationCard';
import { Timeline } from './components/Timeline';
import { BlessingsBoard } from './components/BlessingsBoard';
import { RoyalDoors } from './components/RoyalDoors';
import { InteractiveFlowerShower } from './components/InteractiveFlowerShower';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // Initialize and update countdown timer
  useEffect(() => {
    const target = new Date(WEDDING_DATE_RAW).getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;
      
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clear audio fade interval on component unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Smooth Volume Fading Mechanism (using smooth setInterval)
  const animateVolume = (targetVolume: number, durationMs: number, onComplete?: () => void) => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const startVolume = audioRef.current.volume;
    const volumeDelta = targetVolume - startVolume;
    const intervalTime = 50; // smooth 50ms intervals
    const totalSteps = durationMs / intervalTime;
    let currentStep = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      currentStep++;
      const progress = currentStep / totalSteps;
      const newVolume = startVolume + volumeDelta * progress;

      // Clamp volume safely
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));

      if (currentStep >= totalSteps) {
        audioRef.current.volume = targetVolume;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        if (onComplete) onComplete();
      }
    }, intervalTime);
  };

  // Play audio with premium 2-second fade-in
  const playAudioWithFadeIn = () => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      
      // If paused or starting fresh, initialize volume to 0
      if (audioRef.current.paused && !fadeIntervalRef.current) {
        audioRef.current.volume = 0;
      }

      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          animateVolume(0.4, 2000); // 40% Volume, 2 seconds fade-in
        })
        .catch((err) => {
          console.log("Audio play failed or blocked by autoplay policies", err);
        });
    }
  };

  // Pause audio with premium 2-second fade-out
  const pauseAudioWithFadeOut = () => {
    if (audioRef.current) {
      animateVolume(0, 2000, () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      });
    }
  };

  // Play audio synchronously inside the click handler context to guarantee compliance with browser security models
  const handlePlayAudioSynchronously = () => {
    playAudioWithFadeIn();
  };

  // Handle Loading Screen Open
  const handleOpenInvitation = () => {
    setIsOpened(true);
    // Audio playback is already started synchronously on initial touch trigger
  };

  // Toggle Background Music
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        setIsPlaying(false);
        pauseAudioWithFadeOut();
      } else {
        playAudioWithFadeIn();
      }
    }
  };

  // Next/Prev Photo in Slider
  const nextSlide = () => {
    setGalleryIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };
  const prevSlide = () => {
    setGalleryIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <div className={`min-h-screen bg-[#faf8f5] flex items-center justify-center font-sans overflow-x-hidden text-[#4d3412] selection:bg-[#ebd49d] selection:text-[#4d3412] transition-colors duration-500 ${isDarkMode ? "dark-mode" : ""}`} id="wedding-invitation-root">
      
      {/* Background Classical Audio Player (Jane Tamanna Jane Ada) */}
      <audio 
        ref={audioRef}
        src="/assets/audio/wedding-theme.mp3" 
        loop 
        preload="auto"
        id="bgMusic"
      />

      {/* Main Container simulating high-fidelity responsive vertical viewport */}
      <div className="w-full max-w-md min-h-screen bg-[#fdfbf7] relative flex flex-col shadow-2xl border-x border-[#ebd49d]/40 overflow-x-hidden" id="applet-viewport">
        
        {/* Elegant Gold Pinstripes wrapping the vertical 9:16 layout */}
        <GoldPinstripes />

        {/* Ambient background layers */}
        <div className="absolute inset-0 bg-[#fdfbf7] opacity-95 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ebd49d]/30 via-transparent to-transparent opacity-60 pointer-events-none z-0" />
        <SparkleBackground />

        {/* Global Interactive Touch Flower Shower */}
        <InteractiveFlowerShower />

        {/* SECTION 1: ROYAL DOORS OPENING LOADING COVER */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              key="doors-overlay"
              className="absolute inset-0 z-50 overflow-hidden"
              exit={{ 
                opacity: 0, 
                transition: { duration: 0.8, ease: "easeInOut" } 
              }}
            >
              <RoyalDoors 
                onOpen={handleOpenInvitation} 
                onStartOpening={handlePlayAudioSynchronously}
                brideName={BRIDE_NAME} 
                groomName={GROOM_NAME} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* FLOATING CONTROLS: Combined Premium Action Dock */}
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/95 dark:bg-[#1a0b10]/95 border border-[#ebd49d] dark:border-[#d4af37]/40 shadow-lg backdrop-blur-md transition-all duration-300"
            id="royal-floating-dock"
          >
            {/* 1. MUSIC TOGGLE */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMusic}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#b38220] dark:text-[#ebd49d] hover:bg-[#ebd49d]/20 transition-all duration-300 relative"
              title={isPlaying ? "Pause Music" : "Play Music"}
              id="sticky-music-toggle"
            >
              {isPlaying && (
                <span className="absolute inset-0 rounded-full border border-[#ebd49d]/50 animate-ping opacity-60" />
              )}
              <div className="flex items-center justify-center">
                {isPlaying ? (
                  <div className="flex items-end gap-[1.5px] h-2.5 w-3" id="audio-wave-visualizer">
                    <motion.span 
                      animate={{ height: ["2px", "9px", "2px"] }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                      className="w-[1.8px] bg-gradient-to-t from-[#b38220] to-[#ebd49d] rounded-full" 
                    />
                    <motion.span 
                      animate={{ height: ["2px", "11px", "2px"] }} 
                      transition={{ repeat: Infinity, duration: 0.8, delay: 0.15, ease: "easeInOut" }}
                      className="w-[1.8px] bg-gradient-to-t from-[#b38220] to-[#ebd49d] rounded-full" 
                    />
                    <motion.span 
                      animate={{ height: ["2px", "8px", "2px"] }} 
                      transition={{ repeat: Infinity, duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                      className="w-[1.8px] bg-gradient-to-t from-[#b38220] to-[#ebd49d] rounded-full" 
                    />
                  </div>
                ) : (
                  <VolumeX size={14} className="text-[#b38220] dark:text-[#ebd49d] opacity-75" />
                )}
              </div>
            </motion.button>

            {/* Subtle Divider */}
            <div className="w-[1px] h-4 bg-[#ebd49d]/40 dark:bg-[#d4af37]/30" />

            {/* 2. THEME MODE TOGGLE (Light/Dark) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#b38220] dark:text-[#ebd49d] hover:bg-[#ebd49d]/20 transition-all duration-300"
              title={isDarkMode ? "Switch to Day Light Mode" : "Switch to Night Light Mode"}
              id="sticky-theme-toggle"
            >
              {isDarkMode ? (
                <Sun size={14} className="animate-spin-slow text-[#ebd49d]" />
              ) : (
                <Moon size={14} className="text-[#b38220]" />
              )}
            </motion.button>

            {/* Subtle Divider */}
            <div className="w-[1px] h-4 bg-[#ebd49d]/40 dark:bg-[#d4af37]/30" />

            {/* 3. INSTAGRAM FOLLOW */}
            <motion.a
              href="https://instagram.com/weddinghubzone"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-sm transition-all duration-300"
              title="Follow us on Instagram"
              id="sticky-instagram-follow"
            >
              <Instagram size={13} className="drop-shadow-sm" />
            </motion.a>
          </motion.div>
        )}

        {/* MAIN WEBSITE CONTENT (Scrollable layout) */}
        {isOpened && (
          <div className="flex flex-col flex-grow z-10 text-[#4d3412]" id="main-invitation-scroller">
            
            {/* SECTION 2: WELCOME */}
            <section className="min-h-screen flex flex-col justify-between items-center py-16 px-6 relative text-center" id="section-2-welcome">
              <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#b38220]/20 rounded-tl-xl" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#b38220]/20 rounded-tr-xl" />

              <span className="font-display text-[10px] tracking-[0.45em] text-[#b38220] uppercase mt-4 block font-bold">Shubh Vivah</span>

              <div className="my-auto flex flex-col items-center gap-1 w-full">
                {/* Vintage Scroll Banner Header */}
                <GoldScrollBanner className="mb-6 text-[#b38220]" />

                <span className="font-sans text-[10px] tracking-[0.35em] text-[#593c18] block uppercase font-bold">TOGETHER WITH THEIR FAMILIES</span>
                
                <h2 className="font-royal-script text-6xl md:text-7xl font-bold gold-text-shimmer drop-shadow-sm select-none py-2 leading-none mt-6">
                  {BRIDE_NAME.split(" ")[0]}
                </h2>
                
                <div className="my-1">
                  <span className="font-script text-4xl text-[#ebd49d] block opacity-90">&</span>
                </div>

                <h2 className="font-royal-script text-6xl md:text-7xl font-bold gold-text-shimmer drop-shadow-sm select-none py-2 leading-none mb-6">
                  {GROOM_NAME.split(" ")[0]}
                </h2>

                <p className="font-serif text-[13px] text-[#593c18] italic max-w-xs leading-relaxed mb-6 font-semibold">
                  request the honour of your presence<br />
                  at the marriage of their beloved children
                </p>

                {/* Vintage Scroll Banner Footer Flipped */}
                <GoldScrollBanner flipped={true} className="mt-2 text-[#b38220]" />
              </div>

              <div className="mb-4">
                <span className="font-serif text-[11px] tracking-[0.2em] text-[#b38220] block italic font-bold">on Saturday, November 21st, 2026</span>
                <span className="font-sans text-[8.5px] tracking-[0.25em] text-[#593c18] uppercase block mt-1 font-semibold">Udaipur, Rajasthan</span>
              </div>
            </section>

            {/* SECTION 3: COUNTDOWN */}
            <section className="py-12 px-6 text-center border-y border-neutral-100 bg-[#fdfbf7]" id="section-3-countdown">
              <span className="font-display text-[10px] tracking-[0.3em] text-[#b38220] uppercase block mb-1 font-bold">The Grand Beginning</span>
              <h3 className="font-display text-lg text-[#4d3412] tracking-wider font-bold">Wedding Begins In</h3>
              
              <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mt-6" id="countdown-grid">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Minutes" },
                  { value: timeLeft.seconds, label: "Seconds" }
                ].map((item, i) => (
                  <div key={i} className="royal-glass-card rounded-xl p-3 flex flex-col items-center justify-center">
                    <span className="font-display text-xl font-extrabold bg-gradient-to-b from-[#b38220] via-[#d4af37] to-[#b38220] bg-clip-text text-transparent">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[8px] text-[#b38220] uppercase tracking-widest mt-1 font-bold">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4: INTERACTIVE DATE REVEAL CARD */}
            <section id="section-4-date">
              <InvitationCard />
            </section>

            {/* SECTION 5: INVITATION MESSAGE */}
            <section className="py-14 px-8 text-center relative" id="section-5-message">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#b38220_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
              
              <div className="max-w-xs mx-auto space-y-6">
                <Sparkle size={18} className="text-[#b38220] mx-auto opacity-75 animate-spin-slow" />
                <span className="font-display text-[10px] tracking-[0.3em] text-[#b38220] uppercase block font-bold">Our Love Story</span>
                <p className="font-serif text-base italic text-[#593c18] leading-relaxed font-medium">
                  {INTRO_PARAGRAPH}
                </p>
                <div className="h-[1px] w-12 bg-[#b38220]/30 mx-auto" />
                <span className="font-display text-[10px] tracking-[0.3em] text-[#b38220]/60 block uppercase font-bold">Save Our Date</span>
              </div>
            </section>

            {/* SECTION 6: COUPLE GALLERY PORTRAIT */}
            <section className="py-10 px-4" id="section-6-portrait">
              <div className="max-w-md mx-auto text-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 group shadow-[0_15px_35px_rgba(179,130,32,0.1)]" id="portrait-frame">
                  {/* Glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-10" />
                  
                  <img 
                    src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800&auto=format&fit=crop" 
                    alt="Aarav and Meera Wedding Portrait" 
                    referrerPolicy="no-referrer"
                    className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  
                  {/* Subtle fade overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  
                  {/* Caption */}
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <span className="font-royal-script text-3xl font-bold gold-text-shimmer block mb-1">Aarav & Meera</span>
                    <p className="font-serif text-xs italic text-neutral-200">Bound by Fate, United by Love</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: PARENTS & FAMILY */}
            <section className="py-12 px-6 relative bg-gradient-to-b from-transparent to-[#fdfbf7]/90 border-t border-neutral-100" id="section-7-family">
              <div className="text-center mb-8">
                <span className="font-display text-xs tracking-[0.25em] text-[#b38220] block mb-2 uppercase font-bold">The Royal Families</span>
                <h3 className="font-display text-xl text-[#4d3412] tracking-wider font-bold">Parents & Ancestors</h3>
                <p className="font-serif text-sm text-[#593c18] italic mt-1 font-medium">With the love and support of our dear families</p>
                <GoldDivider className="my-4" />
              </div>

              <div className="max-w-md mx-auto space-y-4" id="parents-columns">
                {FAMILY_MEMBERS.filter(f => f.photoUrl !== "").map((member) => (
                  <div key={member.id} className="royal-glass-card rounded-xl p-4 flex items-center gap-4 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#b38220]/40 shrink-0">
                      <img 
                        src={member.photoUrl} 
                        alt={member.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-sans text-[10px] tracking-widest text-[#b38220] uppercase block font-bold">{member.relation}</span>
                      <h4 className="font-display text-sm text-[#4d3412] font-bold tracking-wide mt-0.5">{member.name}</h4>
                    </div>
                  </div>
                ))}

                {/* Grandparents list */}
                <div className="royal-glass-card rounded-xl p-5 space-y-4" id="grandparents-ledger">
                  <div className="text-center border-b border-[#ebd49d]/40 pb-2">
                    <span className="font-sans text-[10px] tracking-widest text-[#b38220] uppercase font-bold">With the Blessings of Grandparents</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <span className="font-sans text-[9px] text-[#b38220]/70 uppercase block font-bold">Bride's Side</span>
                      <p className="font-serif text-[11.5px] text-[#593c18] italic mt-1 font-semibold">Late Sh. Shanti Prasad</p>
                      <p className="font-serif text-[11.5px] text-[#593c18] italic font-semibold">Smt. Kamla Devi</p>
                    </div>
                    <div className="border-l border-[#ebd49d]/40 pl-4">
                      <span className="font-sans text-[9px] text-[#b38220]/70 uppercase block font-bold">Groom's Side</span>
                      <p className="font-serif text-[11.5px] text-[#593c18] italic mt-1 font-semibold">Sh. Hari Om</p>
                      <p className="font-serif text-[11.5px] text-[#593c18] italic font-semibold">Smt. Krishna Malhotra</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: EVENTS (Timeline) */}
            <section id="section-8-timeline">
              <Timeline />
            </section>

            {/* SECTION 9: PHOTO GALLERY SLIDER */}
            <section className="py-12 px-4 bg-[#fdfbf7] border-y border-neutral-100" id="section-9-slider">
              <div className="text-center mb-8">
                <span className="font-display text-xs tracking-[0.25em] text-[#b38220] block mb-2 uppercase font-bold">Captured Moments</span>
                <h3 className="font-display text-xl text-[#4d3412] tracking-wider font-bold">Pre-Wedding Gallery</h3>
                <p className="font-serif text-sm text-[#5c4044] italic mt-1 font-medium">A glimpse into our beautiful journey of love</p>
                <GoldDivider className="my-4" />
              </div>

              {/* Slider Container */}
              <div className="relative w-full max-w-[340px] mx-auto" id="interactive-gallery-slider">
                <div className="relative h-[250px] rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-xl">
                  
                  {/* Image render with cross-fade animate */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={galleryIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <img 
                        src={GALLERY_ITEMS[galleryIndex].url} 
                        alt={GALLERY_ITEMS[galleryIndex].caption} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <p className="font-serif text-xs italic text-white tracking-wider font-medium">
                          {GALLERY_ITEMS[galleryIndex].caption}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Left / Right Nav Arrows */}
                  <button 
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 border border-[#b38220]/30 text-[#b38220] flex items-center justify-center hover:bg-[#b38220] hover:text-white transition-all duration-300 z-20 cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 border border-[#b38220]/30 text-[#b38220] flex items-center justify-center hover:bg-[#b38220] hover:text-white transition-all duration-300 z-20 cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Slider indicators */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {GALLERY_ITEMS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === galleryIndex ? 'w-4 bg-[#b38220]' : 'w-1.5 bg-[#d4af37]/30 hover:bg-[#b38220]/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 10: VENUE & CUSTOM ROYAL MAP */}
            <section className="py-14 px-6 relative" id="section-10-venue">
              <div className="text-center mb-8">
                <MapPin size={24} className="text-[#b38220] mx-auto mb-2 opacity-95" />
                <span className="font-display text-xs tracking-[0.25em] text-[#b38220] block mb-2 uppercase font-bold">The Destination</span>
                <h3 className="font-display text-xl text-[#4d3412] tracking-wider font-bold">The Wedding Venue</h3>
                <p className="font-serif text-sm text-[#593c18] italic mt-1 font-medium">Udaipur, The City of Lakes</p>
                <GoldDivider className="my-4" />
              </div>

              <div className="max-w-md mx-auto text-center space-y-6" id="venue-details-card">
                <div className="royal-glass-card rounded-xl p-5">
                  <h4 className="font-display text-base font-extrabold text-[#4d3412] tracking-wider">
                    {VENUE_NAME}
                  </h4>
                  <p className="font-serif text-xs text-[#593c18] italic mt-2 max-w-xs mx-auto leading-relaxed font-semibold">
                    {FULL_ADDRESS}
                  </p>
                </div>

                {/* Highly Stylized Royal Vector Map representation */}
                <div className="relative h-[220px] rounded-xl overflow-hidden border-2 border-[#d4af37]/30 bg-[#fdfbf7] p-4 flex flex-col justify-between shadow-inner" id="vector-map-overlay">
                  {/* SVG map visual */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 text-[#b38220]/20" xmlns="http://www.w3.org/2000/svg">
                    {/* Lake lines */}
                    <path d="M 0 120 Q 80 100, 160 140 T 320 110 T 400 130" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 50 180 Q 150 160, 250 190 T 450 170" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    {/* Palace outlines */}
                    <rect x="180" y="80" width="40" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="200" cy="80" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
                    <text x="200" y="65" fill="#b38220" fontSize="8" fontFamily="'Cinzel', serif" textAnchor="middle" opacity="0.8" fontWeight="bold">Lake Pichola</text>
                    <text x="200" y="125" fill="#4d3412" fontSize="8" fontFamily="'Cinzel', serif" textAnchor="middle" opacity="0.8" fontWeight="bold">Taj Lake Palace</text>
                  </svg>

                  <div className="flex justify-between items-start z-10">
                    <span className="font-sans text-[8px] text-[#b38220] uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded border border-[#ebd49d]/40 font-bold">UDAIPUR ROYALTY ZONE</span>
                    <span className="font-sans text-[8px] text-[#b38220] uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded border border-[#ebd49d]/40 font-bold">100% SECURE ACCESS</span>
                  </div>

                  {/* Pulsing Marker */}
                  <div className="absolute top-[80px] left-[200px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10">
                    <span className="relative flex h-3 w-3 mb-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b38220] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d4af37]"></span>
                    </span>
                    <span className="font-display text-[9px] font-bold text-[#b38220] bg-white border border-[#b38220]/30 px-2 py-1 rounded shadow-lg whitespace-nowrap">
                      The Grand Heritage Palace
                    </span>
                  </div>

                  <div className="text-left z-10">
                    <p className="font-sans text-[9px] text-[#b38220]/80 font-bold">TAP BUTTON BELOW FOR DIRECT NAVIGATION</p>
                  </div>
                </div>

                {/* Google Maps Deep-Link Trigger */}
                <a 
                  href={GOOGLE_MAPS_LINK}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#b38220] via-[#d4af37] to-[#b38220] hover:from-[#d4af37] hover:to-[#b38220] text-white font-semibold text-xs tracking-[0.2em] rounded-xl shadow-lg transition-all duration-300 hover:scale-102 active:scale-98 uppercase font-sans cursor-pointer"
                >
                  <MapPin size={13} />
                  <span>Open Location</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </section>

            {/* SECTION 11 & 12: BLESSINGS & RSVP */}
            <section id="section-11-12-blessings-rsvp">
              <BlessingsBoard />
            </section>

            {/* SECTION 13: CONTACT PORTAL */}
            <section className="py-12 px-6 border-t border-neutral-100 bg-[#fdfbf7]" id="section-13-contact">
              <div className="text-center mb-8">
                <span className="font-display text-xs tracking-[0.25em] text-[#b38220] block mb-2 uppercase font-bold">Help & Inquiries</span>
                <h3 className="font-display text-xl text-[#4d3412] tracking-wider font-bold">Contact Details</h3>
                <p className="font-serif text-sm text-[#593c18] italic mt-1 font-medium">Please reach out for any travel assistance or queries</p>
                <GoldDivider className="my-4" />
              </div>

              <div className="max-w-md mx-auto grid grid-cols-2 gap-3" id="contact-portal-grid">
                
                {/* Phone Call */}
                <a 
                  href={`tel:${PHONE}`}
                  className="royal-glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:border-[#b38220]/40 transition-colors duration-300"
                >
                  <Phone size={18} className="text-[#b38220]" />
                  <span className="font-display text-[10px] tracking-widest text-[#b38220] uppercase font-bold">Call Registry</span>
                  <span className="font-sans text-[9px] text-[#593c18] font-bold">{PHONE}</span>
                </a>

                {/* WhatsApp Chat */}
                <a 
                  href={`https://wa.me/${WHATSAPP.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="royal-glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:border-[#b38220]/40 transition-colors duration-300"
                >
                  <Heart size={18} className="text-[#b38220]" />
                  <span className="font-display text-[10px] tracking-widest text-[#b38220] uppercase font-bold">WhatsApp RSVP</span>
                  <span className="font-sans text-[9px] text-[#593c18] font-bold">Click to chat</span>
                </a>

                {/* Email */}
                <a 
                  href={`mailto:${EMAIL}`}
                  className="royal-glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:border-[#b38220]/40 transition-colors duration-300 col-span-2"
                >
                  <Mail size={18} className="text-[#b38220]" />
                  <span className="font-display text-[10px] tracking-widest text-[#b38220] uppercase font-bold">Email Concierge</span>
                  <span className="font-sans text-[10px] text-[#593c18] font-bold">{EMAIL}</span>
                </a>
              </div>
            </section>

            {/* SECTION 14: THANK YOU */}
            <section className="py-20 px-6 text-center relative overflow-hidden bg-gradient-to-b from-[#fdfbf7] to-[#fcfaf7]" id="section-14-thankyou">
              
              {/* Symmetrical framing ornament */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#b38220]/20 rounded-tl" />
              <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#b38220]/20 rounded-tr" />
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#b38220]/20 rounded-bl" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#b38220]/20 rounded-br" />

              <div className="max-w-xs mx-auto space-y-6">
                <Heart size={28} className="text-[#b38220] mx-auto opacity-95 animate-pulse" />
                <h3 className="font-display text-2xl font-extrabold text-[#b38220] tracking-widest uppercase">THANK YOU</h3>
                <p className="font-serif text-sm italic text-[#593c18] leading-relaxed font-semibold">
                  "We look forward with joy and excitement to celebrating this sacred and royal union in Udaipur with all of you!"
                </p>
                
                <GoldDivider className="my-6" />
                
                <span className="font-royal-script text-5xl font-bold gold-text-shimmer block py-2">Meera & Aarav</span>
              </div>
            </section>

            {/* ENDING SCREEN: Wedding Hub™ Branding */}
            <footer className="bg-[#fdfbf7] py-12 px-6 text-center border-t border-neutral-100 relative" id="ending-screen-branding">
              
              <div className="max-w-xs mx-auto space-y-6">
                
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#ebd49d]/40 to-transparent" />
                
                <div className="space-y-1.5">
                  <span className="font-sans text-[9px] tracking-[0.25em] text-[#b38220]/60 uppercase block font-bold">Designed & Developed By</span>
                  <span className="font-display text-sm font-extrabold tracking-widest bg-gradient-to-r from-[#b38220] via-[#d4af37] to-[#b38220] bg-clip-text text-transparent block">
                    Wedding Hub™
                  </span>
                  <span className="font-sans text-[8.5px] tracking-widest text-[#b38220] uppercase block font-semibold">Premium Digital Invitations</span>
                </div>

                <div className="space-y-2">
                  <span className="font-sans text-[8px] tracking-[0.15em] text-[#b38220]/50 uppercase block font-bold">Follow Us On Instagram</span>
                  
                  {/* Clickable Instagram Link */}
                  <a 
                    href="https://instagram.com/weddinghubzone" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#4d3412] hover:text-[#b38220] transition-colors duration-300 bg-[#ebd49d]/10 px-4 py-2 rounded-full border border-[#ebd49d]/40 cursor-pointer"
                  >
                    <Instagram size={12} className="text-[#b38220]" />
                    <span className="font-sans text-[11px] font-bold tracking-wide">@weddinghubzone</span>
                  </a>
                </div>

                <div className="pt-4 space-y-2 text-[#b38220]/50 font-sans text-[8px] leading-relaxed font-medium">
                  <p>© 2026 Wedding Hub. All Rights Reserved.</p>
                  <p className="max-w-xs mx-auto px-4 opacity-50">
                    Wedding Hub™ is the creator and owner of this original invitation design, branding, animations, UI/UX, templates, and website implementation.
                  </p>
                </div>
              </div>
            </footer>

          </div>
        )}

      </div>
    </div>
  );
}
