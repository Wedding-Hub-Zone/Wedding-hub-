import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift, Send, Check, Phone, Users, MessageSquare, Plus, RefreshCw } from 'lucide-react';
import { DEFAULT_BLESSINGS } from '../data';
import { Blessing, RSVPData } from '../types';
import { GoldDivider } from './GoldOrnaments';
import { LuxuryConfetti } from './SparkleBackground';

export const BlessingsBoard: React.FC = () => {
  // Blessings states
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [newBlessingName, setNewBlessingName] = useState('');
  const [newBlessingMsg, setNewBlessingMsg] = useState('');
  const [newBlessingRelation, setNewBlessingRelation] = useState('');
  const [blessingsSubmitted, setBlessingsSubmitted] = useState(false);

  // RSVP states
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpAttending, setRsvpAttending] = useState('yes');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load and seed default blessings
  useEffect(() => {
    const saved = localStorage.getItem('wedding_blessings');
    if (saved) {
      try {
        setBlessings(JSON.parse(saved));
      } catch (e) {
        setBlessings(DEFAULT_BLESSINGS);
      }
    } else {
      setBlessings(DEFAULT_BLESSINGS);
      localStorage.setItem('wedding_blessings', JSON.stringify(DEFAULT_BLESSINGS));
    }
  }, []);

  const handleAddBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlessingName.trim() || !newBlessingMsg.trim()) return;

    const newBlessing: Blessing = {
      id: `blessing_${Date.now()}`,
      name: newBlessingName.trim(),
      message: newBlessingMsg.trim(),
      relation: newBlessingRelation.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    localStorage.setItem('wedding_blessings', JSON.stringify(updated));

    // Reset Form
    setNewBlessingName('');
    setNewBlessingMsg('');
    setNewBlessingRelation('');
    setBlessingsSubmitted(true);
    
    setTimeout(() => {
      setBlessingsSubmitted(false);
    }, 3000);
  };

  const handleAddRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpPhone.trim()) return;

    const rsvp: RSVPData = {
      id: `rsvp_${Date.now()}`,
      name: rsvpName.trim(),
      phone: rsvpPhone.trim(),
      guestsCount: rsvpGuests,
      attending: rsvpAttending,
      message: rsvpMessage.trim(),
      submittedAt: new Date().toISOString()
    };

    // Save RSVP to local ledger
    const existingRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    localStorage.setItem('wedding_rsvps', JSON.stringify([rsvp, ...existingRsvps]));

    // Also auto-post RSVP message as a blessing if attending
    if (rsvpAttending === 'yes') {
      const autoBlessing: Blessing = {
        id: `blessing_rsvp_${Date.now()}`,
        name: rsvpName.trim(),
        message: rsvpMessage.trim() || "So thrilled to attend this beautiful celebration! Sending you all our love and blessings.",
        relation: "Guest",
        createdAt: new Date().toISOString()
      };
      const updatedBlessings = [autoBlessing, ...blessings];
      setBlessings(updatedBlessings);
      localStorage.setItem('wedding_blessings', JSON.stringify(updatedBlessings));
    }

    setRsvpSubmitted(true);
    setShowConfetti(true);

    if (navigator.vibrate) {
      navigator.vibrate([100, 100, 100]);
    }

    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <div className="relative w-full flex flex-col gap-14" id="blessings-rsvp-module">
      <LuxuryConfetti active={showConfetti} />

      {/* SECTION 11: BLESSINGS */}
      <div className="py-10 px-4 relative bg-gradient-to-b from-transparent to-[#fdfbf7]/40" id="section-11-blessings">
        <div className="text-center mb-8">
          <Gift size={24} className="text-[#b38220] mx-auto mb-2 opacity-90" />
          <span className="font-display text-xs tracking-[0.25em] text-[#b38220] block mb-1 uppercase font-bold">Warm Wishes</span>
          <h3 className="font-display text-xl text-[#4d3412] tracking-wider font-bold">Guest Blessings</h3>
          <p className="font-serif text-sm text-[#593c18] italic mt-1 font-medium">"Your Presence Is Our Greatest Gift"</p>
          <GoldDivider className="my-4" />
        </div>

        {/* Existing Blessings Ledger (Scrollable glassmorphism list) */}
        <div className="max-w-md mx-auto h-[240px] overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-amber-900/30 mb-8" id="blessings-scroller">
          <AnimatePresence initial={false}>
            {blessings.map((b) => (
              <motion.div
                key={b.id}
                className="royal-glass-card rounded-xl p-4 shadow-md relative"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display text-xs font-bold text-[#4d3412]">{b.name}</span>
                  {b.relation && (
                    <span className="font-sans text-[9px] tracking-wider text-[#b38220] bg-[#b38220]/10 px-2 py-0.5 rounded border border-[#b38220]/20 uppercase font-bold">
                      {b.relation}
                    </span>
                  )}
                </div>
                <p className="font-serif text-[11.5px] text-[#593c18] italic leading-relaxed font-medium">
                  "{b.message}"
                </p>
                <span className="font-sans text-[8px] text-[#b38220]/70 block text-right mt-1.5 font-bold">
                  {new Date(b.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick Blessing Poster */}
        <div className="max-w-md mx-auto royal-glass-card rounded-xl p-5 shadow-xl backdrop-blur-md" id="post-blessing-form">
          <span className="font-display text-xs tracking-wider text-[#4d3412] font-bold mb-3 block">Send Love & Blessings</span>
          <form onSubmit={handleAddBlessing} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={newBlessingName}
                onChange={(e) => setNewBlessingName(e.target.value)}
                required
                className="w-full bg-[#fdfbf7] border border-[#d4af37]/40 focus:border-[#b38220] rounded-lg px-3 py-2 text-xs text-[#4d3412] placeholder-[#9e8870] focus:outline-none transition-all duration-300 font-sans font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Relation (e.g. Friend, Cousin)"
                value={newBlessingRelation}
                onChange={(e) => setNewBlessingRelation(e.target.value)}
                className="w-full bg-[#fdfbf7] border border-[#d4af37]/40 focus:border-[#b38220] rounded-lg px-3 py-2 text-xs text-[#4d3412] placeholder-[#9e8870] focus:outline-none transition-all duration-300 font-sans font-medium"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#aa7c11] to-[#d4af37] hover:from-[#d4af37] hover:to-[#f3e5ab] text-black font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95"
              >
                {blessingsSubmitted ? <Check size={12} /> : <Send size={11} />}
                <span>{blessingsSubmitted ? "Blessing Posted!" : "Post Blessing"}</span>
              </button>
            </div>
            <div>
              <textarea
                placeholder="Write your wishes & blessings here..."
                value={newBlessingMsg}
                onChange={(e) => setNewBlessingMsg(e.target.value)}
                required
                rows={2}
                className="w-full bg-[#fdfbf7] border border-[#d4af37]/40 focus:border-[#b38220] rounded-lg px-3 py-2 text-xs text-[#4d3412] placeholder-[#9e8870] focus:outline-none transition-all duration-300 font-serif font-medium"
              />
            </div>
          </form>
        </div>
      </div>

      {/* SECTION 12: RSVP FORM */}
      <div className="py-10 px-4 relative bg-[#fdfbf7] border-y border-neutral-100" id="section-12-rsvp">
        {/* Subtle decorative corners inside section */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#b38220]/20 rounded-tl" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#b38220]/20 rounded-tr" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#b38220]/20 rounded-bl" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#b38220]/20 rounded-br" />

        <div className="text-center mb-8">
          <span className="font-display text-xs tracking-[0.25em] text-[#b38220] block mb-1 uppercase font-bold">RSVP Registration</span>
          <h3 className="font-display text-xl text-[#4d3412] tracking-wider font-bold">Are You Attending?</h3>
          <p className="font-serif text-sm text-[#593c18] italic mt-1 font-medium">Please kindly respond by November 10, 2026</p>
          <GoldDivider className="my-4" />
        </div>

        <div className="max-w-md mx-auto" id="rsvp-form-container">
          <AnimatePresence mode="wait">
            {!rsvpSubmitted ? (
              <motion.form
                key="rsvp-form"
                onSubmit={handleAddRSVP}
                className="space-y-4"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Attending Checkbox / Radio Selection */}
                <div className="grid grid-cols-2 gap-3 mb-2" id="rsvp-attendance-selector">
                  <label className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    rsvpAttending === 'yes'
                      ? 'bg-[#ebd49d]/20 border-[#b38220] shadow-[0_0_15px_rgba(179,130,32,0.15)]'
                      : 'bg-[#fdfbf7] border-[#d4af37]/20 hover:border-[#b38220]/40'
                  }`}>
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={rsvpAttending === 'yes'}
                      onChange={() => setRsvpAttending('yes')}
                      className="sr-only"
                    />
                    <Heart size={18} className={rsvpAttending === 'yes' ? 'text-[#b38220]' : 'text-neutral-400'} />
                    <span className="font-display text-xs font-bold text-[#4d3412] mt-1.5">Yes, Attending</span>
                    <span className="font-sans text-[8px] text-[#593c18] mt-0.5 font-medium">Can't wait to celebrate!</span>
                  </label>

                  <label className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    rsvpAttending === 'no'
                      ? 'bg-[#ebd49d]/10 border-neutral-300 shadow-sm'
                      : 'bg-[#fdfbf7] border-[#d4af37]/20 hover:border-[#b38220]/40'
                  }`}>
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={rsvpAttending === 'no'}
                      onChange={() => setRsvpAttending('no')}
                      className="sr-only"
                    />
                    <Gift size={18} className={rsvpAttending === 'no' ? 'text-[#b38220]' : 'text-neutral-400'} />
                    <span className="font-display text-xs font-bold text-[#4d3412] mt-1.5">Regretfully Decline</span>
                    <span className="font-sans text-[8px] text-[#593c18] mt-0.5 font-medium">Celebrating from afar</span>
                  </label>
                </div>

                {/* Name */}
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-neutral-400">
                    <Users size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    required
                    className="w-full bg-[#fdfbf7] border border-[#d4af37]/40 focus:border-[#b38220] rounded-xl pl-10 pr-3 py-3 text-xs text-[#4d3412] placeholder-[#9e8870] focus:outline-none transition-all duration-300 font-sans font-medium"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-neutral-400">
                    <Phone size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Your Phone Number"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    required
                    className="w-full bg-[#fdfbf7] border border-[#d4af37]/40 focus:border-[#b38220] rounded-xl pl-10 pr-3 py-3 text-xs text-[#4d3412] placeholder-[#9e8870] focus:outline-none transition-all duration-300 font-sans font-medium"
                  />
                </div>

                {/* Guests count (Only if attending) */}
                {rsvpAttending === 'yes' && (
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-neutral-400">
                      <Users size={14} />
                    </span>
                    <select
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(Number(e.target.value))}
                      className="w-full bg-[#fdfbf7] border border-[#d4af37]/40 focus:border-[#b38220] rounded-xl pl-10 pr-3 py-3 text-xs text-[#4d3412] focus:outline-none transition-all duration-300 font-sans font-medium appearance-none"
                    >
                      <option value={1} className="bg-white">1 Guest</option>
                      <option value={2} className="bg-white">2 Guests</option>
                      <option value={3} className="bg-white">3 Guests</option>
                      <option value={4} className="bg-white">4 Guests</option>
                      <option value={5} className="bg-white">5+ Guests</option>
                    </select>
                    <div className="absolute right-3 top-4 pointer-events-none border-l border-neutral-200 pl-2">
                      <span className="text-[9px] text-[#b38220] font-bold">Number of Guests</span>
                    </div>
                  </div>
                )}

                {/* Message */}
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-neutral-400">
                    <MessageSquare size={14} />
                  </span>
                  <textarea
                    placeholder={rsvpAttending === 'yes' ? "Write your beautiful wishes or diet preferences..." : "Send a sweet message to the couple..."}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    rows={3}
                    className="w-full bg-[#fdfbf7] border border-[#d4af37]/40 focus:border-[#b38220] rounded-xl pl-10 pr-3 py-3 text-xs text-[#4d3412] placeholder-[#9e8870] focus:outline-none transition-all duration-300 font-serif font-medium"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#78510d] via-[#d4af37] to-[#aa7c11] hover:from-[#d4af37] hover:to-[#f3e5ab] text-black font-semibold text-xs tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 shadow-[0_5px_20px_rgba(212,175,55,0.2)] transition-all duration-300 active:scale-98 uppercase"
                >
                  <Sparkles size={14} className="animate-spin-slow" />
                  <span>Send RSVP Registration</span>
                </button>
              </motion.form>
            ) : (
              /* Success visual overlay state */
              <motion.div
                key="rsvp-success"
                className="royal-glass-card rounded-2xl p-6 text-center space-y-4 shadow-2xl backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <div className="w-14 h-14 rounded-full bg-[#ebd49d]/20 border border-[#b38220] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(179,130,32,0.2)]">
                  <Heart className="text-[#b38220] animate-pulse" size={24} />
                </div>
                <h4 className="font-display text-base text-[#b38220] tracking-wider uppercase font-bold">RSVP Submitted!</h4>
                <p className="font-serif text-xs text-[#593c18] italic leading-relaxed font-semibold">
                  {rsvpAttending === 'yes'
                    ? `Thank you so much, ${rsvpName}! We have saved your seat for ${rsvpGuests} guest(s). Your blessings have been posted to our guestbook. We look forward to celebrating together in Udaipur!`
                    : `We will miss you dearly, ${rsvpName}. Thank you for your heartfelt blessings, we will hold them close to our hearts.`}
                </p>
                <button
                  onClick={() => setRsvpSubmitted(false)}
                  className="mx-auto mt-2 font-sans text-[10px] text-neutral-500 hover:text-neutral-800 underline cursor-pointer flex items-center gap-1 justify-center font-bold"
                >
                  <RefreshCw size={9} />
                  <span>Modify Response</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
