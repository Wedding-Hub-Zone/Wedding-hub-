import React from 'react';
import { ScratchToReveal } from './ScratchToReveal';
import { Calendar, Clock } from 'lucide-react';
import { WEDDING_DATE, WEDDING_DAY, WEDDING_MONTH, WEDDING_YEAR, WEDDING_TIME } from '../data';

export const InvitationCard: React.FC = () => {
  const revealContent = (
    <div className="text-center flex flex-col items-center justify-center space-y-2 py-4 w-full h-full bg-[#fdfbf7] border-2 border-[#d4af37]/40 rounded-xl shadow-inner">
      <span className="font-display text-[10px] tracking-[0.3em] text-[#b38220] uppercase font-bold">The Sacred Date</span>
      <div className="h-[1px] w-8 bg-[#b38220]/30 my-0.5" />
      
      <p className="font-display text-2xl font-bold bg-gradient-to-r from-[#b38220] via-[#d4af37] to-[#b38220] bg-clip-text text-transparent tracking-wider">
        {WEDDING_MONTH.toUpperCase()} 21, {WEDDING_YEAR}
      </p>
      
      <p className="font-serif text-sm text-[#4d3412] italic flex items-center gap-1.5 justify-center mt-1 font-semibold">
        <Calendar size={13} className="text-[#b38220]" />
        <span>{WEDDING_DAY}</span>
      </p>
      
      <p className="font-sans text-[10px] tracking-widest text-[#593c18] uppercase flex items-center gap-1.5 justify-center font-medium">
        <Clock size={12} className="text-[#b38220]" />
        <span>{WEDDING_TIME}</span>
      </p>
    </div>
  );

  return (
    <div className="relative w-full py-8 px-4 flex flex-col items-center" id="invitation-card-reveal-section">
      <div className="text-center mb-6">
        <span className="font-display text-[10px] tracking-[0.3em] text-[#b38220] block mb-1 uppercase font-bold">Interactive Secret</span>
        <h3 className="font-display text-lg text-[#4d3412] tracking-wider font-bold">The Sacred Date</h3>
        <p className="font-serif text-xs text-[#593c18] italic mt-1 font-medium">Scratch the gold card to reveal date & time</p>
      </div>

      <ScratchToReveal revealContent={revealContent} width={310} height={180} />
    </div>
  );
};
