import React, { useState, useEffect } from 'react';
import { Lock, Unlock, AlertTriangle, ShieldAlert, Sparkles, Terminal, FileCheck, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DrHathiAvatar } from './DrHathiAvatar';
import { soundEngine } from '../utils/audio';

interface SecretArchiveViewProps {
  secretStatus: {
    unlocked: boolean;
    cluesFound: string[];
    totalClues: number;
    discoveredAt: string | null;
    secretLevel: number;
  };
  onTriggerClue: (clueId: string) => void;
  onUnlockSecret: () => void;
  onReturnToClinic: () => void;
}

export const SecretArchiveView: React.FC<SecretArchiveViewProps> = ({
  secretStatus,
  onTriggerClue,
  onUnlockSecret,
  onReturnToClinic,
}) => {
  const [fileOpened, setFileOpened] = useState(false);
  const [dialogueStep, setDialogueStep] = useState(0);
  const [isAttemptingBreach, setIsAttemptingBreach] = useState(false);

  const cluesList = [
    {
      id: 'clue1_ai_glitch',
      title: 'Neural Transmission Flutter',
      hint: 'Ask H.A.U.N.T. AI why Dr. Hathi works alone or inquire about Room 000.',
      location: 'AI Doctor Console',
    },
    {
      id: 'clue2_medical_record',
      title: 'Classified Admission Dossier',
      hint: 'Inspect the redacted medical record for Patient ████████ with date 13/13/????.',
      location: 'Medical Records',
    },
    {
      id: 'clue3_clock_1313',
      title: 'Spectral Clock Singularity',
      hint: 'Click on the hospital clock in the navigation bar when it synchronizes.',
      location: 'Hospital Top Bar',
    },
    {
      id: 'clue4_hathi_logo_tap',
      title: 'Elephant Sigil Resonance',
      hint: 'Tap the Dr. Hathi elephant brand sigil 5 times in rapid succession.',
      location: 'Top Brand Logo',
    },
    {
      id: 'clue5_restricted_rx',
      title: 'Classified Apothecary Formula',
      hint: 'Examine the prohibited prescription bottle in the pharmacy: "Do not open Room 000".',
      location: 'Spectral Pharmacy',
    },
  ];

  const handleBreachVault = async () => {
    setIsAttemptingBreach(true);
    soundEngine.playSecretUnlock();
    try {
      const res = await fetch('/api/archive/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forceUnlock: secretStatus.cluesFound.length >= 2 }),
      });
      const data = await res.json();
      if (data.success) {
        onUnlockSecret();
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#EF4444', '#10B981', '#06B6D4'],
          });
        } catch (_) {}
      }
    } catch (err) {
      console.error('Breach error:', err);
    } finally {
      setIsAttemptingBreach(false);
    }
  };

  const handleOpenFile = () => {
    soundEngine.playGlitch();
    setFileOpened(true);
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#10B981', '#34D399', '#EF4444'],
      });
    } catch (_) {}
  };

  return (
    <div className="w-full min-h-[85vh] flex flex-col justify-center items-center px-4 py-8 relative">
      
      {/* Darkened Emergency Background Ambience */}
      <div className="absolute inset-0 bg-[#040202] -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none" />

      {/* When Vault is Unlocked & File is Opened: The Final Revelation */}
      {secretStatus.unlocked && fileOpened ? (
        <div className="max-w-2xl w-full bg-[#080303] border border-red-500/50 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(239,68,68,0.25)] relative animate-in fade-in zoom-in-95 space-y-6">
          
          <div className="flex items-center justify-between border-b border-red-900/50 pb-4">
            <div className="flex items-center gap-2 text-red-500 font-mono-nums text-xs font-bold tracking-widest uppercase">
              <Terminal className="w-4 h-4" />
              <span>TERMINAL OMEGA // LEVEL 000 DECLASSIFIED</span>
            </div>
            <span className="text-[10px] text-red-400 font-mono-nums">
              STATUS: ZERO ERROR
            </span>
          </div>

          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest font-mono-nums">
              HATHI AFTERDARK · RESTRICTED ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              PATIENT: UNKNOWN
            </h2>
          </div>

          {/* Dossier Data Block */}
          <div className="bg-[#0D0505] p-5 rounded-2xl border border-red-900/60 font-mono-nums text-xs space-y-2.5 text-neutral-300">
            <div className="flex justify-between border-b border-red-950 pb-1.5">
              <span className="text-red-400/80">MORTAL STATUS:</span>
              <span className="font-bold text-red-300">NOT DECEASED (NEVER DIED)</span>
            </div>
            <div className="flex justify-between border-b border-red-950 pb-1.5">
              <span className="text-red-400/80">RECORDED AGE:</span>
              <span className="font-bold text-white">████ (TIME OVERFLOW)</span>
            </div>
            <div className="flex justify-between border-b border-red-950 pb-1.5">
              <span className="text-red-400/80">FIRST ADMISSION:</span>
              <span className="font-bold text-white">BEFORE THE CLINIC EXISTED</span>
            </div>
            <div className="flex justify-between border-b border-red-950 pb-1.5">
              <span className="text-red-400/80">TREATING DOCTOR:</span>
              <span className="font-bold text-emerald-400">DR. HANSRAJ HATHI</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-400/80">REGISTERED PATIENT:</span>
              <span className="font-bold text-emerald-400">DR. HANSRAJ HATHI</span>
            </div>
          </div>

          {/* System Revelation Notice */}
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-200 text-center font-mono-nums">
            <p className="font-bold tracking-wider">SYSTEM LOG: 13:13:00</p>
            <p className="mt-1 text-sm font-semibold text-white">
              "Doctor Hathi is listed as both primary physician and patient."
            </p>
          </div>

          {/* Dr. Hathi Cinematic Dialogue Stage */}
          <div className="flex flex-col items-center pt-2 space-y-4">
            <DrHathiAvatar size="lg" withGlow={true} />

            <div className="p-5 rounded-2xl bg-[#0F0808] border border-emerald-500/40 text-center space-y-2 max-w-lg shadow-xl">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                Dr. Hansraj Hathi
              </span>
              <p className="text-base sm:text-lg text-white font-medium italic font-display">
                "You found the truth."
              </p>
              <p className="text-sm text-neutral-300 leading-relaxed">
                "The clinic wasn't built for ghosts. <br />
                <span className="text-emerald-400 font-bold">It was built for me.</span>"
              </p>
              <p className="text-xs text-neutral-400 italic pt-1">
                "When a doctor refuses to pass on, he builds a hospital between dimensions to keep every lost soul warm."
              </p>
            </div>

            <button
              onClick={onReturnToClinic}
              className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95"
            >
              CONTINUE THE JOURNEY
            </button>
          </div>

        </div>
      ) : secretStatus.unlocked ? (
        // Vault Unlocked, Ready to Open File
        <div className="max-w-xl w-full text-center space-y-6 bg-[#090404] border border-red-500/40 rounded-3xl p-8 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-950 border border-red-500/60 mx-auto flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse">
            <Unlock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono-nums">
              RESTRICTED ARCHIVE // ROOM 000
            </span>
            <h2 className="text-3xl font-bold text-white font-display">
              ACCESS GRANTED
            </h2>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              The biometric and spectral seals have dissolved. An uncatalogued patient dossier is waiting inside the vault.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#110606] border border-red-900/50 text-xs text-red-300 font-mono-nums">
            WARNING: THIS PATIENT SHOULD NOT EXIST.
          </div>

          <button
            onClick={handleOpenFile}
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>OPEN CLASSIFIED DOSSIER</span>
          </button>
        </div>
      ) : (
        // Vault Locked: Clue Discovery Progress
        <div className="max-w-2xl w-full bg-[#080D0A] border border-emerald-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-emerald-900/30 pb-4">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white font-display">
                Room 000 — Secret Archive Vault
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono-nums bg-[#050706] px-3 py-1 rounded-lg border border-white/5">
              <span className="text-neutral-400">Discovered:</span>
              <span className="text-emerald-400 font-bold">
                {secretStatus.cluesFound.length} / {secretStatus.totalClues} Clues
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>WILDCARD CHALLENGE: DISCOVER THE CLINIC MYSTERY</span>
            </div>
            <p className="text-[11px] text-amber-300/80 leading-relaxed">
              Dr. Hathi keeps a sealed record in Room 000. Five subtle anomalies are hidden across Hathi Afterdark. Uncover at least 2 clues to breach the vault.
            </p>
          </div>

          {/* Clues Tracker List */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
              Supernatural Investigation Checklist:
            </span>

            {cluesList.map((clue, idx) => {
              const found = secretStatus.cluesFound.includes(clue.id);

              return (
                <div
                  key={clue.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                    found
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-[#050806] border-white/5 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 font-mono-nums ${
                        found ? 'bg-emerald-500 text-black' : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {found ? '✓' : `0${idx + 1}`}
                    </div>

                    <div>
                      <p className={`font-semibold ${found ? 'text-white' : 'text-neutral-300'}`}>
                        {clue.title}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {clue.hint}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-neutral-400 shrink-0 font-mono-nums">
                    {clue.location}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Breach Trigger Button */}
          <div className="pt-2 border-t border-emerald-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onReturnToClinic}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Return to Clinic Dashboard
            </button>

            <button
              onClick={handleBreachVault}
              disabled={secretStatus.cluesFound.length < 2 || isAttemptingBreach}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Unlock className="w-4 h-4" />
              <span>
                {secretStatus.cluesFound.length >= 2
                  ? 'Breach Room 000 Vault'
                  : `Need ${2 - secretStatus.cluesFound.length} more clue(s)`}
              </span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
