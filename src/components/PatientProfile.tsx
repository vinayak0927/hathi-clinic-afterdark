import React from 'react';
import { User, Activity, ShieldCheck, Heart, Clock, Award, Shuffle } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface PatientProfileProps {
  onSwitchPerspective: (role: 'patient' | 'doctor') => void;
  activeRole: 'patient' | 'doctor';
}

export const PatientProfile: React.FC<PatientProfileProps> = ({
  onSwitchPerspective,
  activeRole,
}) => {
  return (
    <div className="w-full space-y-6 max-w-4xl mx-auto">
      
      {/* Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel-glow border-emerald-500/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
          
          <div className="w-24 h-24 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-5xl shadow-xl shrink-0">
            👻
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/50">
                  REGISTERED OUTPATIENT
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                  Casper Vale
                </h2>
              </div>

              {/* Perspective Switcher */}
              <button
                onClick={() => {
                  soundEngine.playChime();
                  onSwitchPerspective(activeRole === 'patient' ? 'doctor' : 'patient');
                }}
                className="self-center sm:self-start px-3.5 py-1.5 rounded-xl bg-[#0F1712] hover:bg-[#16231b] border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Shuffle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Switch to {activeRole === 'patient' ? "Dr. Hathi's View" : "Patient's View"}</span>
              </button>
            </div>

            <p className="text-xs text-neutral-300">
              Ghost Token: <span className="font-mono-nums text-emerald-400 font-bold">#427</span> · Classification: <span className="text-white font-medium">Classic Ethereal Spirit</span>
            </p>
            <p className="text-xs text-neutral-400">
              Assigned Physician: <span className="text-emerald-300 font-semibold">Dr. Hansraj Hathi</span> (Consultation Room 13)
            </p>
          </div>

        </div>

        {/* Vital Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-900/40 text-center">
          <div className="p-3 bg-[#060A08] rounded-xl border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Soul Energy</span>
            <p className="text-lg font-bold text-emerald-400 font-mono-nums mt-0.5">72%</p>
          </div>
          <div className="p-3 bg-[#060A08] rounded-xl border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Ectoplasm</span>
            <p className="text-lg font-bold text-cyan-400 font-mono-nums mt-0.5">84%</p>
          </div>
          <div className="p-3 bg-[#060A08] rounded-xl border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Haunting Level</span>
            <p className="text-lg font-bold text-emerald-300 font-mono-nums mt-0.5">LOW</p>
          </div>
          <div className="p-3 bg-[#060A08] rounded-xl border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Spirit Rhythm</span>
            <p className="text-lg font-bold text-white font-mono-nums mt-0.5">98 BPM</p>
          </div>
        </div>
      </div>

      {/* Supernatural History & Hospital Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Afterlife Health Dossier</span>
          </h3>
          <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
            <p>
              • <strong className="text-white">First Admitted: </strong> 12 September 2026 for acute wall-phasing friction and slight nostalgia fog.
            </p>
            <p>
              • <strong className="text-white">Active Prescription: </strong> Ecto-Z Ultra (10ml mist daily), MoonRest Elixir (as needed).
            </p>
            <p>
              • <strong className="text-white">Allergies: </strong> Involuntary allergy to exorcism salt and 5000K daylight LED bulbs.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Supernatural Patient Rights</span>
          </h3>
          <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
            <p>
              • Guaranteed 24/7 access to Dr. Hathi's Consultation Suite (Room 13).
            </p>
            <p>
              • Right to peaceful afterlife rest without harassment by amateur ghost hunters.
            </p>
            <p>
              • Full clearance for cemetery moonbathing and non-destructive levitation.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
