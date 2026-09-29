import React from 'react';
import { Calendar, Award, Star, Quote, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { DrHathiAvatar } from './DrHathiAvatar';
import { soundEngine } from '../utils/audio';

interface DrHathiProfileProps {
  onBookAppointment: () => void;
}

export const DrHathiProfile: React.FC<DrHathiProfileProps> = ({ onBookAppointment }) => {
  const reviews = [
    {
      spirit: 'Lady Eleanor (Victorian Ghost)',
      comment: 'I was fading into complete invisibility after 140 years. Dr. Hathi prescribed Ecto-Z and within two days I was happily haunting my manor ballroom again.',
      rating: 5,
      date: 'Aug 2026'
    },
    {
      spirit: 'Captain Ironbeard (Phantom Pirate)',
      comment: 'My spectral wooden leg kept phasing through my ship deck! Dr. Hathi realigned my phantom marrow. Best doctor in this life or the next.',
      rating: 5,
      date: 'July 2026'
    },
    {
      spirit: 'Barnaby Spook (Poltergeist)',
      comment: 'Treated my violent plate-throwing impulses with genuine warmth and samosa philosophy. 10/10.',
      rating: 5,
      date: 'June 2026'
    }
  ];

  return (
    <div className="w-full space-y-8 max-w-5xl mx-auto">
      
      {/* Hero Card */}
      <div className="rounded-3xl glass-panel-glow border-emerald-500/40 p-6 sm:p-10 relative overflow-hidden">
        
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          
          {/* Avatar representation */}
          <div className="shrink-0 flex flex-col items-center">
            <DrHathiAvatar size="xl" withGlow={true} />
            <span className="mt-3 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold tracking-wider font-mono-nums">
              Chief Physician
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                  DR. HANSRAJ HATHI
                </h2>
                <p className="text-base text-emerald-400 font-medium">
                  "Doctor of the Afterlife" · Founder of Hathi Afterdark
                </p>
              </div>

              <button
                onClick={() => {
                  soundEngine.playChime();
                  onBookAppointment();
                }}
                className="self-center md:self-start px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl pt-2">
              Legendary healer across both the physical universe and astral plane. With a warm heart, sharp clinical insight, and an unshakeable belief that health never ends with mortal life, Dr. Hathi has guided over forty thousand spirits to supernatural equilibrium.
            </p>

            <div className="p-3.5 rounded-xl bg-[#060907] border border-emerald-900/40 text-xs text-emerald-300/90 italic flex items-start gap-2.5">
              <Quote className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                "Being dead does not mean you stop getting sick. Sahi baat hai! Whether you are suffering from cold-spot fatigue or memory mist, our doors in Room 13 are always open."
              </span>
            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-emerald-900/30 text-center">
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Experience</span>
            <p className="text-xl sm:text-2xl font-bold text-white font-mono-nums mt-0.5">127 Years</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Patients Treated</span>
            <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono-nums mt-0.5">42,891</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Primary Specialty</span>
            <p className="text-base sm:text-lg font-bold text-cyan-300 font-display mt-1">Spirit Medicine</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Availability</span>
            <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono-nums mt-0.5">24 / 7</p>
          </div>
        </div>

      </div>

      {/* Philosophy & Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Core Specializations */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Clinical Specializations</span>
          </h3>

          <ul className="space-y-3 text-xs text-neutral-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Ectoplasmic Density Restoration: </span>
                Preventing soul thinning, fading, and unintentional dissipation across dimensional boundaries.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Poltergeist Temper Inversion: </span>
                Channeling aggressive kinetic phantom energy into peaceful household warmth and gentle candle flickers.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Soul Rhythm Harmonization: </span>
                Stabilizing 432 Hz astral flutter and relieving subconscious nostalgia loops from mortal decades.
              </div>
            </li>
          </ul>
        </div>

        {/* Supernatural Accolades */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>Honors & Dimensional Awards</span>
          </h3>

          <div className="space-y-3 text-xs text-neutral-300">
            <div className="p-3 rounded-xl bg-[#070B09] border border-white/5">
              <span className="font-bold text-emerald-300 block">Order of the Golden Stethoscope (1998)</span>
              <p className="text-neutral-400 mt-0.5">Awarded by the Grand Council of Spirits for eradicating the 19th-century graveyard damp.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#070B09] border border-white/5">
              <span className="font-bold text-emerald-300 block">Master of Astral Harmony (2012)</span>
              <p className="text-neutral-400 mt-0.5">Recognized for authoring "Ectoplasm & Peace: A Doctor's Guide to the Afterlife".</p>
            </div>
            <div className="p-3 rounded-xl bg-[#070B09] border border-white/5">
              <span className="font-bold text-emerald-300 block">Director's Seal of Room 13</span>
              <p className="text-neutral-400 mt-0.5">Founder and permanent resident physician of Hathi Afterdark Clinic.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Patient Reviews */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>Patient Testimonials from the Other Side</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((rev, i) => (
            <div key={i} className="p-5 rounded-2xl glass-panel flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] text-neutral-400 flex items-center justify-between">
                <span className="font-semibold text-emerald-400">{rev.spirit}</span>
                <span className="font-mono-nums">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
