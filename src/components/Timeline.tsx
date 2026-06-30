import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { TIMELINE_EVENTS } from '../data';
import { GoldDivider } from './GoldOrnaments';

// Helper to resolve icon by string name
const getIcon = (name: string) => {
  const IconComponent = (Icons as any)[name];
  if (IconComponent) {
    return <IconComponent size={18} className="text-[#d4af37]" />;
  }
  return <Icons.Calendar size={18} className="text-[#d4af37]" />;
};

export const Timeline: React.FC = () => {
  return (
    <div className="relative w-full py-10 px-4" id="timeline-events-section">
      <div className="text-center mb-10">
        <span className="font-display text-xs tracking-[0.25em] text-[#b38220] block mb-2 uppercase font-bold">The Festivities</span>
        <h3 className="font-display text-xl text-[#4d3412] tracking-wider font-bold">Program Timeline</h3>
        <p className="font-serif text-sm text-[#593c18] italic mt-1 font-medium">Join us in celebrating every sacred ceremony</p>
        <GoldDivider className="my-4" />
      </div>

      {/* The Timeline Line */}
      <div className="relative w-full max-w-md mx-auto" id="timeline-flow-container">
        <div className="absolute left-6 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#d4af37]/20 via-[#d4af37]/60 to-[#d4af37]/20" />

        {/* Timeline Events List */}
        <div className="space-y-8">
          {TIMELINE_EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              className="relative pl-14"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Event Circular Icon Node */}
              <div className="absolute left-2.5 top-0.5 -translate-x-1/2 w-8 h-8 rounded-full bg-[#fdfbf7] border border-[#d4af37] flex items-center justify-center z-10 shadow-[0_0_10px_rgba(212,175,55,0.25)]">
                {getIcon(event.iconName)}
              </div>

              {/* Event Card Content */}
              <div className="royal-glass-card rounded-xl p-4 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-[#b38220]/60 transition-all duration-300">
                {/* Subtle side gold highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#d4af37]/50 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="font-sans text-[10px] tracking-wider font-bold text-[#b38220] uppercase bg-[#b38220]/10 px-2 py-0.5 rounded border border-[#b38220]/20">
                      {event.date}
                    </span>
                    <span className="font-sans text-[10px] text-[#593c18] font-semibold italic">
                      {event.time}
                    </span>
                  </div>

                  <h4 className="font-display text-sm font-bold text-[#4d3412] tracking-wide mt-1.5 group-hover:text-[#b38220] transition-colors duration-300">
                    {event.title}
                  </h4>

                  <span className="font-sans text-[10.5px] text-[#593c18] flex items-center gap-1 mt-0.5 font-medium">
                    <Icons.MapPin size={10} className="text-[#b38220]" />
                    <span>{event.location}</span>
                  </span>

                  <p className="font-serif text-[11.5px] text-[#593c18] mt-2 leading-relaxed font-medium">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
