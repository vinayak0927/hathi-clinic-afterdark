import React, { useState, useEffect } from 'react';
import { FileText, Eye, ShieldAlert, Sparkles, X, Activity, CheckCircle, Lock } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  scanType: 'SOUL SCAN' | 'ECTOPLASM X-RAY' | 'SPIRIT ECG' | 'MEMORY MRI' | 'POSSESSION SCAN' | 'HAUNTING ANALYSIS' | 'RESTRICTED SCAN';
  date: string;
  status: 'Stable' | 'Critical' | 'Fluctuating' | 'Dissipating' | 'Normal' | 'CLASSIFIED';
  doctor: string;
  description: string;
  details: {
    soulEnergy?: string;
    ectoplasmLevel?: string;
    spiritBpm?: string;
    possessionRisk?: string;
    hauntingFrequency?: string;
    spectralDensity?: string;
    notes?: string;
    warning?: string;
  };
  isRestricted?: boolean;
}

interface MedicalRecordsViewProps {
  onTriggerClue: (clueId: string) => void;
}

export const MedicalRecordsView: React.FC<MedicalRecordsViewProps> = ({ onTriggerClue }) => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  useEffect(() => {
    fetch('/api/records')
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error('Failed to load records:', err));
  }, []);

  const handleOpenRecord = async (rec: MedicalRecord) => {
    soundEngine.playChime();
    setSelectedRecord(rec);

    // If viewing the classified record, trigger Secret Clue 2
    if (rec.isRestricted) {
      soundEngine.playGlitch();
      onTriggerClue('clue2_medical_record');
    }

    try {
      const res = await fetch(`/api/records/${rec.id}`);
      const freshData = await res.json();
      setSelectedRecord(freshData);
    } catch (_) {}
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white font-display">
              Supernatural Medical Records
            </h2>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Archived soul scans, ectoplasmic radiography, and spectral resonance evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
          <Activity className="w-3.5 h-3.5" />
          <span>Patient Ledger: Casper Vale (#427)</span>
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {records.map((rec) => {
          const isSecret = rec.isRestricted;

          return (
            <div
              key={rec.id}
              className={`rounded-2xl p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
                isSecret
                  ? 'glass-panel-danger border-red-500/40 hover:border-red-400 cursor-pointer'
                  : 'glass-panel hover:border-emerald-500/30'
              }`}
            >
              {isSecret && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold px-3 py-0.5 uppercase tracking-widest font-mono-nums">
                  CLASSIFIED // CLEARANCE 000
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSecret
                        ? 'bg-red-950 text-red-300 border border-red-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                    }`}
                  >
                    {rec.scanType}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono-nums">
                    {rec.date}
                  </span>
                </div>

                <h3 className={`text-base font-bold mb-1 font-display ${isSecret ? 'text-red-300' : 'text-white'}`}>
                  {rec.title}
                </h3>

                <p className="text-xs text-emerald-400/90 font-medium mb-3">
                  Physician: {rec.doctor}
                </p>

                <p className="text-xs text-neutral-300 leading-relaxed mb-4 line-clamp-2">
                  {rec.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className={`text-xs font-semibold ${
                  rec.status === 'Stable' || rec.status === 'Normal'
                    ? 'text-emerald-400'
                    : rec.status === 'CLASSIFIED'
                    ? 'text-red-400 font-mono-nums'
                    : 'text-amber-400'
                }`}>
                  Status: {rec.status}
                </span>

                <button
                  onClick={() => handleOpenRecord(rec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isSecret
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-md'
                      : 'bg-[#0E1511] hover:bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {isSecret ? <Lock className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isSecret ? 'Inspect File' : 'View Report'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Record Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#080D0A] border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dossier Header */}
            <div className="border-b border-emerald-900/40 pb-4 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono-nums ${
                  selectedRecord.isRestricted
                    ? 'bg-red-950 text-red-300 border border-red-700'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                }`}>
                  {selectedRecord.scanType}
                </span>
                <span className="text-xs text-neutral-400 font-mono-nums">
                  Date: {selectedRecord.date}
                </span>
              </div>
              <h3 className={`text-xl font-bold font-display ${selectedRecord.isRestricted ? 'text-red-300' : 'text-white'}`}>
                {selectedRecord.title}
              </h3>
              <p className="text-xs text-emerald-400 font-medium mt-1">
                Attending Specialist: {selectedRecord.doctor}
              </p>
            </div>

            {/* Clue Warning Banner if Secret */}
            {selectedRecord.isRestricted && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs mb-5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-red-400">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>WILDCARD CLUE DISCOVERED: RESTRICTED ARCHIVE DOSSIER</span>
                </div>
                <p className="text-[11px] text-red-300/80">
                  You discovered Patient ████████ with admission date 13/13/????. Notice that Dr. Hathi is listed as both primary physician and patient.
                </p>
              </div>
            )}

            {/* Content Details */}
            <div className="space-y-4 text-xs">
              <div className="bg-[#050706] p-4 rounded-xl border border-white/5 space-y-2">
                <span className="text-neutral-400 font-semibold uppercase tracking-wider block text-[10px]">
                  Clinical Findings
                </span>
                <p className="text-neutral-200 leading-relaxed text-sm">
                  {selectedRecord.description}
                </p>
              </div>

              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                {selectedRecord.details.soulEnergy && (
                  <div className="p-3 bg-[#0B0F0D] rounded-xl border border-white/5">
                    <span className="text-[10px] text-neutral-400 uppercase">Soul Energy</span>
                    <p className="text-sm font-bold text-emerald-400 font-mono-nums mt-0.5">
                      {selectedRecord.details.soulEnergy}
                    </p>
                  </div>
                )}
                {selectedRecord.details.ectoplasmLevel && (
                  <div className="p-3 bg-[#0B0F0D] rounded-xl border border-white/5">
                    <span className="text-[10px] text-neutral-400 uppercase">Ectoplasm Viscosity</span>
                    <p className="text-sm font-bold text-cyan-400 font-mono-nums mt-0.5">
                      {selectedRecord.details.ectoplasmLevel}
                    </p>
                  </div>
                )}
                {selectedRecord.details.spiritBpm && (
                  <div className="p-3 bg-[#0B0F0D] rounded-xl border border-white/5">
                    <span className="text-[10px] text-neutral-400 uppercase">Spirit Rhythm</span>
                    <p className="text-sm font-bold text-white font-mono-nums mt-0.5">
                      {selectedRecord.details.spiritBpm}
                    </p>
                  </div>
                )}
                {selectedRecord.details.possessionRisk && (
                  <div className="p-3 bg-[#0B0F0D] rounded-xl border border-white/5">
                    <span className="text-[10px] text-neutral-400 uppercase">Possession Risk</span>
                    <p className="text-sm font-bold text-amber-400 font-mono-nums mt-0.5">
                      {selectedRecord.details.possessionRisk}
                    </p>
                  </div>
                )}
              </div>

              {/* Physician Notes */}
              {selectedRecord.details.notes && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-emerald-200/90 leading-relaxed">
                  <span className="font-semibold text-emerald-400 block mb-1">
                    Physician Directive:
                  </span>
                  "{selectedRecord.details.notes}"
                </div>
              )}

              {/* Official Seal / Signature Stamp */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-neutral-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified by Supernatural Medical Council</span>
                </div>
                <div className="font-display italic text-emerald-300 font-semibold">
                  Dr. Hansraj Hathi, M.D. (Afterlife)
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
