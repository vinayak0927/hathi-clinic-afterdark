import React, { useState } from 'react';
import { Stethoscope, User, Calendar, CheckCircle2, FileText, Plus, Clock, Activity, MessageSquare } from 'lucide-react';
import { DrHathiAvatar } from './DrHathiAvatar';
import { soundEngine } from '../utils/audio';

export const DoctorDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'notes' | 'prescribe'>('appointments');
  const [prescribeNote, setPrescribeNote] = useState('');
  const [rxIssued, setRxIssued] = useState(false);
  const [doctorNoteText, setDoctorNoteText] = useState('Patient Casper Vale shows stable ethereal density. Soul flutter has decreased by 12% following cemetery rest.');
  const [noteSaved, setNoteSaved] = useState(false);

  const [drAppointments, setDrAppointments] = useState([
    {
      id: 'dr-apt-1',
      patient: 'Casper Vale',
      type: 'Classic Spirit',
      time: '12:00 AM Midnight',
      condition: 'Soul Energy & Wall Phase Inspection',
      status: 'Ready in Room 13',
    },
    {
      id: 'dr-apt-2',
      patient: 'Countess Beatrix',
      type: 'Victorian Wraith',
      time: '01:15 AM Witching Hour',
      condition: 'Ectoplasm Loss around corset line',
      status: 'Queued',
    },
    {
      id: 'dr-apt-3',
      patient: 'Archibald the Rattler',
      type: 'Poltergeist',
      time: '02:30 AM Twilight',
      condition: 'Aggressive plate levitation & temper flare',
      status: 'Waiting in Triage',
    },
  ]);

  const handleAcceptAppointment = (id: string) => {
    soundEngine.playChime();
    setDrAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'In Consultation with Dr. Hathi' } : a))
    );
  };

  const handleIssueRx = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playChime();
    setRxIssued(true);
    setTimeout(() => {
      setRxIssued(false);
      setPrescribeNote('');
    }, 2000);
  };

  const handleSaveNote = () => {
    soundEngine.playChime();
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Doctor Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel-glow border-emerald-500/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-center md:text-left">
            <DrHathiAvatar size="lg" withGlow={true} />
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-700/50">
                CHIEF PHYSICIAN WORKSTATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                Good evening, Doctor Hathi.
              </h2>
              <p className="text-xs text-neutral-300">
                "Sahi baat hai! Let us see what is haunting Gokuldham and the afterlife tonight."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-[#060907] border border-white/5 text-emerald-300 font-mono-nums flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Room 13 Live Telemetry
            </span>
          </div>
        </div>

        {/* Doctor Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-emerald-900/40 text-center">
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Today's Patients</span>
            <p className="text-xl font-bold text-white font-mono-nums mt-0.5">27</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Waiting Queue</span>
            <p className="text-xl font-bold text-amber-400 font-mono-nums mt-0.5">6</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Appointments</span>
            <p className="text-xl font-bold text-emerald-400 font-mono-nums mt-0.5">18</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Emergency</span>
            <p className="text-xl font-bold text-red-400 font-mono-nums mt-0.5">2</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-neutral-400 uppercase">Soul Scans</span>
            <p className="text-xl font-bold text-cyan-400 font-mono-nums mt-0.5">14</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-emerald-900/30 pb-2">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'appointments'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Consultation Schedule
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'notes'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Clinical Notes
        </button>
        <button
          onClick={() => setActiveTab('prescribe')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'prescribe'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Issue Spectral Prescription
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Today's Outpatient Consultations</span>
            <span className="font-mono-nums">Active Shift: Midnight to Eternity</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {drAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-5 rounded-2xl glass-panel border-emerald-500/20 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white font-display">{apt.patient}</span>
                    <span className="text-[10px] text-emerald-400 font-mono-nums">{apt.time}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">{apt.type}</p>
                  <p className="text-xs text-neutral-300 mt-2 bg-[#050806] p-2.5 rounded-lg border border-white/5">
                    "{apt.condition}"
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-medium font-mono-nums">
                    {apt.status}
                  </span>
                  <button
                    onClick={() => handleAcceptAppointment(apt.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md active:scale-95"
                  >
                    Examine Spirit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="p-6 rounded-2xl glass-panel space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-white font-display">
            Physician Clinical Ledger
          </h3>
          <p className="text-xs text-neutral-400">
            Record confidential observations for Patient Casper Vale (#427):
          </p>

          <textarea
            rows={5}
            value={doctorNoteText}
            onChange={(e) => setDoctorNoteText(e.target.value)}
            className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400">
              {noteSaved ? '✓ Note recorded into astral vault' : ''}
            </span>
            <button
              onClick={handleSaveNote}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-md transition-colors"
            >
              Save Clinical Note
            </button>
          </div>
        </div>
      )}

      {activeTab === 'prescribe' && (
        <form onSubmit={handleIssueRx} className="p-6 rounded-2xl glass-panel space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-white font-display">
            Issue Fictional Supernatural Prescription
          </h3>
          <p className="text-xs text-neutral-400">
            Formulate official Dr. Hathi directive for delivery through the Spectral Pharmacy:
          </p>

          {rxIssued ? (
            <div className="p-6 text-center space-y-2 bg-emerald-950/40 rounded-xl border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
              <p className="text-sm font-bold text-white">Prescription Sealed by Dr. Hathi!</p>
              <p className="text-xs text-neutral-400">Transferred to Apothecary Wing for dispensing.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Recipient Patient:
                </label>
                <input
                  type="text"
                  disabled
                  value="Casper Vale (Ghost #427)"
                  className="w-full bg-[#050806] border border-white/5 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Dosage Directive & Dietary Philosophy:
                </label>
                <textarea
                  rows={3}
                  required
                  value={prescribeNote}
                  onChange={(e) => setPrescribeNote(e.target.value)}
                  placeholder="e.g. 15ml of Ecto-Z with warm phantom clove water at moonrise. Sahi baat hai!"
                  className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-md transition-colors"
              >
                Seal & Dispense Rx
              </button>
            </>
          )}
        </form>
      )}

    </div>
  );
};
