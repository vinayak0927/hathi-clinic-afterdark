import React, { useState } from 'react';

export const GhostAnimation: React.FC = () => {
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const tips = [
    "Boo! Friendly night-shift mascot here: stay hydrated!",
    "Dr. Hathi says: A 20-minute daily walk keeps your heart smiling!",
    "Your blood pressure looks great today. Keep up the good habits!",
    "Working late? Don't forget to blink and rest your eyes!",
    "Sahi baat hai! Even at night, Dr. Hathi's clinic is here for you!"
  ];

  const handleClickGhost = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setBubbleMessage(randomTip);
    setTimeout(() => {
      setBubbleMessage(null);
    }, 4500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-2.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 shadow-xl text-xs flex items-center gap-1.5 transition-all"
        title="Show Night-Shift Ghost Companion"
      >
        <span className="text-base select-none">👻</span>
        <span className="text-[11px] font-medium hidden sm:inline">Mascot</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-auto select-none">
      
      {/* Speech Bubble */}
      {bubbleMessage && (
        <div className="mb-2 max-w-[220px] p-3 rounded-2xl bg-[#0B130E]/95 border border-emerald-500/40 text-emerald-200 text-xs shadow-2xl animate-in fade-in slide-in-from-bottom-2 relative">
          <p className="font-medium leading-relaxed">{bubbleMessage}</p>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0B130E] border-r border-b border-emerald-500/40 transform rotate-45" />
        </div>
      )}

      {/* Floating Ghost Container */}
      <div className="relative group flex items-center gap-2">
        <button
          onClick={() => setIsOpen(false)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-neutral-400 hover:text-white bg-black/60 px-2 py-0.5 rounded-md"
          title="Minimize mascot"
        >
          Hide
        </button>

        <div
          onClick={handleClickGhost}
          className="w-16 h-16 cursor-pointer filter drop-shadow-[0_0_15px_rgba(16,185,129,0.35)] animate-ghost-float hover:scale-110 transition-transform active:scale-95"
          title="Click the night-shift mascot for a wellness tip!"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="ghostGlow" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#D1FAE5" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.4" />
              </radialGradient>
              <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>

            {/* Glowing Ethereal Body */}
            <path
              d="M50 18 
                 C32 18, 22 34, 22 55 
                 C22 72, 28 80, 24 88 
                 C30 84, 38 90, 44 85 
                 C50 90, 56 85, 62 88 
                 C68 85, 74 90, 78 85 
                 C75 78, 78 72, 78 55 
                 C78 34, 68 18, 50 18 Z"
              fill="url(#ghostGlow)"
              stroke="#A7F3D0"
              strokeWidth="1.5"
            />

            {/* Straw Hat (From Reference Image 12) */}
            <ellipse cx="50" cy="22" rx="24" ry="6" fill="url(#hatGrad)" />
            <path d="M38 22 C38 14 62 14 62 22 Z" fill="#D97706" />

            {/* Ghost Friendly Happy Eyes */}
            <ellipse cx="42" cy="45" rx="3.5" ry="5.5" fill="#064E3B" />
            <ellipse cx="58" cy="45" rx="3.5" ry="5.5" fill="#064E3B" />
            <circle cx="41" cy="43" r="1.5" fill="#FFFFFF" />
            <circle cx="57" cy="43" r="1.5" fill="#FFFFFF" />

            {/* Cheerful Mouth */}
            <path d="M44 56 Q50 63 56 56" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" fill="#EF4444" />

            {/* Rosy Cheeks */}
            <circle cx="36" cy="52" r="3" fill="#F472B6" opacity="0.6" />
            <circle cx="64" cy="52" r="3" fill="#F472B6" opacity="0.6" />

            {/* Small Green Sprout in hand (From Reference Image 12) */}
            <path d="M72 60 Q76 56 74 52 Q71 49 68 53" fill="#10B981" />
            <line x1="72" y1="60" x2="70" y2="65" stroke="#047857" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

    </div>
  );
};
