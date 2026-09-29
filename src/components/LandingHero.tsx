import React, { useState } from 'react';
import { ArrowRight, Sparkles, Shield, HeartPulse, Clock, Stethoscope, UserCheck } from 'lucide-react';
import { DrHathiAvatar } from './DrHathiAvatar';
import { soundEngine } from '../utils/audio';

interface LandingHeroProps {
  onEnterPatientPortal: () => void;
  onEnterDoctorDesk: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onEnterPatientPortal,
  onEnterDoctorDesk,
}) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const hathiQuotes = [
    "Swasth Gokuldham, Khush Gokuldham! Your health is our highest priority. Sahi baat hai!",
    "Health is true wealth. Whether it's a routine checkup or an emergency, our clinic doors are open 24/7.",
    "A 20-minute brisk walk and a balanced meal keep your heart smiling. Take care of yourself!",
    "Modern medicine works best with compassion and accurate diagnostics. Welcome to Hathi Clinic."
  ];

  const handleNextQuote = () => {
    soundEngine.playChime();
    setDialogueIndex((prev) => (prev + 1) % hathiQuotes.length);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Top Kicker Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium tracking-wide mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>24/7 Advanced Human Healthcare & Clinical Excellence</span>
        </div>

        {/* Dr. Hathi Character Representation with Interactive Monologue */}
        <div 
          onClick={handleNextQuote}
          className="cursor-pointer group flex flex-col items-center mb-6 relative"
          title="Click to hear Dr. Hathi speak"
        >
          <DrHathiAvatar size="hero" withGlow={true} />
          
          {/* Speech Bubble */}
          <div className="mt-4 px-5 py-3 rounded-2xl bg-[#0B0F0D]/90 border border-emerald-500/30 max-w-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all group-hover:border-emerald-400/60">
            <div className="flex items-center gap-2 justify-center mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Dr. Hansraj Hathi, M.D.
              </span>
              <span className="text-[10px] text-neutral-400 font-mono-nums">
                · Chief Medical Director
              </span>
            </div>
            <p className="text-sm sm:text-base text-neutral-200 italic font-medium">
              "{hathiQuotes[dialogueIndex]}"
            </p>
            <span className="text-[10px] text-emerald-500/60 tracking-wider uppercase block mt-1">
              (click to change quote)
            </span>
          </div>
        </div>

        {/* Cinematic Title & Tagline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display mb-4 text-balance">
          HATHI CLINIC
        </h1>

        <p className="text-xl sm:text-2xl text-emerald-300 font-display italic font-medium mb-3">
          "Your Health, Our Priority."
        </p>

        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-8">
          The premier 24/7 healthcare platform for individuals and families. Complete with 3D anatomical biomonitoring, dedicated Patient & Doctor portals, electronic health records, and AI-guided clinical triage.
        </p>

        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md">
          <button
            onClick={() => {
              soundEngine.playChime();
              onEnterPatientPortal();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#050706] font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)] active:scale-95"
          >
            <span>PATIENT PORTAL</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundEngine.playChime();
              onEnterDoctorDesk();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0B0F0D] hover:bg-[#111713] text-neutral-200 hover:text-white border border-emerald-500/20 font-semibold text-sm sm:text-base tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Stethoscope className="w-4 h-4 text-cyan-400" />
            <span>PHYSICIAN DESK</span>
          </button>
        </div>

        {/* Practice Highlights */}
        <div className="mt-14 pt-8 border-t border-emerald-950/50 grid grid-cols-2 md:grid-cols-4 gap-6 text-center w-full">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white font-mono-nums">26+</p>
            <p className="text-xs text-neutral-400 mt-1">Years Clinical Experience</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono-nums">34,000+</p>
            <p className="text-xs text-neutral-400 mt-1">Patients Treated</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-white font-mono-nums">24 / 7</p>
            <p className="text-xs text-neutral-400 mt-1">Emergency & OPD Care</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono-nums">98.4%</p>
            <p className="text-xs text-neutral-400 mt-1">Diagnostic Accuracy</p>
          </div>
        </div>

      </div>
    </div>
  );
};
