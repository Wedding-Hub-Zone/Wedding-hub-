import React from 'react';

// Symmetrical gold floral scrollwork header/footer banner
export const GoldScrollBanner: React.FC<{ className?: string; flipped?: boolean }> = ({ className = "", flipped = false }) => {
  return (
    <div className={`flex justify-center w-full max-w-[280px] mx-auto text-[#d4af37] ${className} ${flipped ? 'rotate-180' : ''}`} id="gold-scroll-banner">
      <svg
        width="280"
        height="32"
        viewBox="0 0 280 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-95"
      >
        {/* Filigree center scroll motif */}
        <path
          d="M140 16 C125 4, 115 12, 105 16 C95 20, 85 8, 70 12 C55 16, 40 4, 20 16 M140 16 C155 4, 165 12, 175 16 C185 20, 195 8, 210 12 C225 16, 240 4, 260 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M140 8 C140 8, 137 2, 132 4 C127 6, 128 12, 134 10 C140 8, 140 16, 140 16 M140 8 C140 8, 143 2, 148 4 C153 6, 152 12, 146 10 C140 8, 140 16, 140 16"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Decorative central star burst */}
        <polygon points="140,0 142,6 148,8 142,10 140,16 138,10 132,8 138,6" fill="currentColor" />
        {/* Drops / buds */}
        <circle cx="105" cy="16" r="2.5" fill="currentColor" />
        <circle cx="175" cy="16" r="2.5" fill="currentColor" />
        <circle cx="70" cy="12" r="2" fill="currentColor" />
        <circle cx="210" cy="12" r="2" fill="currentColor" />
      </svg>
    </div>
  );
};

// Slim dual vertical gold borders on left and right edges (gives the premium 9:16 frame vibe)
export const GoldPinstripes: React.FC = () => {
  return (
    <div className="absolute inset-y-0 inset-x-0 pointer-events-none z-30" id="gold-pinstripes-frame">
      {/* Left Double Pinstripe */}
      <div className="absolute left-3 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#78510d]/40 via-[#d4af37]/60 to-[#78510d]/40 opacity-70" />
      <div className="absolute left-4 top-5 bottom-5 w-[1px] bg-gradient-to-b from-[#78510d]/20 via-[#d4af37]/30 to-[#78510d]/20 opacity-40" />

      {/* Right Double Pinstripe */}
      <div className="absolute right-3 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#78510d]/40 via-[#d4af37]/60 to-[#78510d]/40 opacity-70" />
      <div className="absolute right-4 top-5 bottom-5 w-[1px] bg-gradient-to-b from-[#78510d]/20 via-[#d4af37]/30 to-[#78510d]/20 opacity-40" />
    </div>
  );
};

// Symmetrical, premium filigree divider
export const GoldDivider: React.FC<{ className?: string }> = ({ className = "my-6" }) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} id="gold-divider-container">
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-70" />
      <svg
        width="60"
        height="16"
        viewBox="0 0 60 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#d4af37]"
        id="gold-divider-svg"
      >
        <path
          d="M30 1L33 6L38 4L35 9L40 10L34 11L30 15L26 11L20 10L25 9L22 4L27 6L30 1Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
        <circle cx="15" cy="8" r="2" fill="currentColor" />
        <circle cx="45" cy="8" r="2" fill="currentColor" />
        <circle cx="5" cy="8" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="55" cy="8" r="1" fill="currentColor" opacity="0.5" />
      </svg>
      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-[#d4af37] to-transparent opacity-70" />
    </div>
  );
};

// Corner ornaments for borders
export const GoldCornerOrnament: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = "" }) => {
  const rotationClass = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-left': '-rotate-90',
    'bottom-right': 'rotate-180',
  }[position];

  return (
    <div className={`absolute ${className} ${rotationClass} pointer-events-none`} id={`corner-ornament-${position}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#d4af37]/80"
      >
        {/* Elegant luxury corner scroll ornament */}
        <path
          d="M2 2H46V4H6V46H2V2Z"
          fill="currentColor"
        />
        <path
          d="M8 8H36V10H10V36H8V8Z"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M12 12C12 12 24 13 24 18C24 23 18 24 18 28C18 32 23 34 23 34"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
      </svg>
    </div>
  );
};

// Royal Crest Emblem
export const RoyalCrest: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`} id="royal-crest-emblem">
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#d4af37] animate-pulse"
      >
        {/* Symmetrical luxury wedding crest frame */}
        <path
          d="M50 5C40 5 30 15 30 30C30 45 42 60 50 75C58 60 70 45 70 30C70 15 60 5 50 5ZM50 65C45 55 35 42 35 30C35 20 42 10 50 10C58 10 65 20 65 30C65 42 55 55 50 65Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
        {/* Monogram A & M initials overlapping beautifully */}
        <text
          x="50"
          y="42"
          fontFamily="'Cinzel', serif"
          fontSize="18"
          fontWeight="bold"
          fill="currentColor"
          textAnchor="middle"
          className="tracking-tighter"
        >
          A & M
        </text>
        <path
          d="M50 68V85"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M40 85H60"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M45 80C35 75 25 80 25 80"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M55 80C65 75 75 80 75 80"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};
