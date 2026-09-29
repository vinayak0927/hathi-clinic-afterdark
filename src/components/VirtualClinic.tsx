import React, { useState } from 'react';
import { Building2, MapPin, Stethoscope, Shield, Lock, Unlock, ArrowRight, Sparkles, Activity } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface ClinicRoom {
  id: string;
  name: string;
  code: string;
  level: string;
  doctorInCharge: string;
  description: string;
  specialty: string;
  status: 'Active' | 'Occupied' | 'Emergency Priority' | 'SEALED VAULT';
  color: string;
  isSecret?: boolean;
}

interface VirtualClinicProps {
  onSelectTab: (tab: string) => void;
  secretUnlocked: boolean;
  cluesCount: number;
}

export const VirtualClinic: React.FC<VirtualClinicProps> = ({
  onSelectTab,
  secretUnlocked,
  cluesCount,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('room-13');

  const rooms: ClinicRoom[] = [
    {
      id: 'reception',
      name: 'Central Reception & Ethereal Triage',
      code: 'WING-01',
      level: 'Ground Level',
      doctorInCharge: 'Nurse Phantom Maya',
      description: 'First checkpoint for newly departed souls and wandering phantoms. Measures initial aura radiance and allocates consultation tokens.',
      specialty: 'Patient Admission & Dimensional Orientation',
      status: 'Active',
      color: '#10B981',
    },
    {
      id: 'room-13',
      name: "Dr. Hathi's Consultation Suite (Room 13)",
      code: 'ROOM-13',
      level: 'Executive Floor',
      doctorInCharge: 'Dr. Hansraj Hathi',
      description: 'The heartbeat of Hathi Afterdark. Rich velvet mahogany chairs, ancient herbal jars, and a warm aroma of spectral clove chai where Dr. Hathi counsels troubled spirits.',
      specialty: 'Spirit Medicine & Astral Harmony',
      status: 'Active',
      color: '#34D399',
    },
    {
      id: 'ghost-ward',
      name: 'Ghost Ward (Restoration Chambers)',
      code: 'WARD-G',
      level: '2nd Floor',
      doctorInCharge: 'Dr. Archibald Bones',
      description: 'Zero-gravity vapor hammocks for spirits suffering from acute ectoplasm depletion and wall-phasing exhaustion.',
      specialty: 'Ectoplasm Infusion & Re-Densification',
      status: 'Occupied',
      color: '#06B6D4',
    },
    {
      id: 'memory-lab',
      name: 'Memory MRI & Nostalgia Lab',
      code: 'LAB-M',
      level: '3rd Floor',
      doctorInCharge: 'Dr. Moira O’Banshee',
      description: 'Acoustically insulated chambers running magnetic resonance sweeps to de-tangle repetitive memory loops and mortal regrets.',
      specialty: 'Acoustic Soul Decompression',
      status: 'Active',
      color: '#A855F7',
    },
    {
      id: 'possession-unit',
      name: 'Possession Inversion Care Unit',
      code: 'UNIT-P',
      level: 'Basement Level -1',
      doctorInCharge: 'Dr. Bhootnath',
      description: 'Specialized facility for extricating over-enthusiastic poltergeists trapped inside modern refrigerators, television antennas, and smart thermostats.',
      specialty: 'Device Inversion & Poltergeist Calming',
      status: 'Active',
      color: '#F59E0B',
    },
    {
      id: 'pharmacy-wing',
      name: 'Apothecary & Spectral Pharmacy',
      code: 'APOTH-01',
      level: 'Ground Level East',
      doctorInCharge: 'Master Pharmacist Vlad',
      description: 'Bioluminescent vials of Ecto-Z, MoonRest, and Bone-Aid prepared freshly each moonrise according to Dr. Hathi recipes.',
      specialty: 'Ghost Pharmacy & Remedy Dispensing',
      status: 'Active',
      color: '#EC4899',
    },
    {
      id: 'emergency-ward',
      name: 'Afterlife Emergency & Exorcism Trauma',
      code: 'EMERG-00',
      level: 'Rapid Transit Wing',
      doctorInCharge: 'Dr. Elysia Soulcraft',
      description: 'High-intensity stabilizer containment fields for spirits assaulted by salt circles, blessed water, or unexpected holy incantations.',
      specialty: 'Critical Aura Resuscitation',
      status: 'Emergency Priority',
      color: '#EF4444',
    },
    {
      id: 'room-000',
      name: 'Restricted Vault // Room 000',
      code: 'VAULT-000',
      level: 'Sub-Basement Omega',
      doctorInCharge: 'CLASSIFIED // DR. HATHI',
      description: 'Heavy steel reinforced blast doors sealed before official hospital records began. Displays anomalous vital readings of a patient who never ceased living.',
      specialty: 'Temporal Paradox & Original Patient',
      status: 'SEALED VAULT',
      color: '#DC2626',
      isSecret: true,
    }
  ];

  const activeRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[1];

  const handleRoomClick = (room: ClinicRoom) => {
    setSelectedRoomId(room.id);
    if (room.isSecret) {
      soundEngine.playGlitch();
    } else {
      soundEngine.playChime();
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white font-display">
              Virtual Clinic Directory
            </h2>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Explore the departments, laboratories, and specialized wards of Hathi Afterdark.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>8 Operational Wings · 24/7 Afterlife Duty</span>
        </div>
      </div>

      {/* Main Grid: Interactive Room Selector (Left) + Detailed Chamber Viewport (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Rooms List / Floor Directory */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
          {rooms.map((room) => {
            const isSelected = room.id === selectedRoomId;
            const isSecret = room.isSecret;

            return (
              <button
                key={room.id}
                onClick={() => handleRoomClick(room)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between gap-3 ${
                  isSelected
                    ? isSecret
                      ? 'bg-red-950/70 border border-red-500/60 shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                      : 'bg-[#0E1511] border border-emerald-500/50 shadow-md'
                    : isSecret
                    ? 'bg-[#120707] border border-red-900/40 hover:border-red-500/40 text-red-300'
                    : 'glass-panel hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold shadow"
                    style={{
                      backgroundColor: `${room.color}20`,
                      color: room.color,
                      border: `1px solid ${room.color}40`,
                    }}
                  >
                    {isSecret ? '🔒' : room.code.split('-')[0]}
                  </div>

                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${isSecret ? 'text-red-300' : 'text-white'}`}>
                      {room.name}
                    </p>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                      {room.doctorInCharge}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded font-mono-nums ${
                    isSecret
                      ? 'bg-red-950 text-red-300 border border-red-800'
                      : room.status === 'Emergency Priority'
                      ? 'bg-red-950 text-red-300 border border-red-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {room.code}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Room Details Stage */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden border border-emerald-500/30 min-h-[480px]">
          
          {/* Subtle Chamber Ambient Light */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: activeRoom.color }}
          />

          <div>
            {/* Room Tag & Floor */}
            <div className="flex items-center justify-between gap-2 border-b border-emerald-900/30 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono-nums"
                  style={{
                    backgroundColor: `${activeRoom.color}20`,
                    color: activeRoom.color,
                    border: `1px solid ${activeRoom.color}50`,
                  }}
                >
                  {activeRoom.code}
                </span>
                <span className="text-xs text-neutral-400 font-mono-nums">
                  Floor: {activeRoom.level}
                </span>
              </div>

              <span className={`text-xs font-semibold ${
                activeRoom.isSecret ? 'text-red-400 font-mono-nums animate-pulse' : 'text-emerald-400'
              }`}>
                {activeRoom.status}
              </span>
            </div>

            {/* Room Name */}
            <h3 className={`text-2xl font-bold font-display mb-3 ${activeRoom.isSecret ? 'text-red-300' : 'text-white'}`}>
              {activeRoom.name}
            </h3>

            {/* Doctor in charge */}
            <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-[#060907] border border-white/5">
              <Stethoscope className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="text-neutral-400">Attending Specialist: </span>
                <span className="font-bold text-white">{activeRoom.doctorInCharge}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {activeRoom.description}
            </p>

            {/* Specialty tag */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-xs text-emerald-300">
              <span className="font-bold text-white block mb-0.5">Primary Clinical Specialty:</span>
              {activeRoom.specialty}
            </div>
          </div>

          {/* Action Trigger based on Room */}
          <div className="pt-6 border-t border-emerald-900/30 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            {activeRoom.isSecret ? (
              <button
                onClick={() => onSelectTab('archive')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                {secretUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>{secretUnlocked ? 'Breach Room 000 Vault' : `Room 000 (${cluesCount}/5 Clues)`}</span>
              </button>
            ) : activeRoom.id === 'room-13' ? (
              <button
                onClick={() => onSelectTab('appointments')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <span>Book Consultation with Dr. Hathi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : activeRoom.id === 'pharmacy-wing' ? (
              <button
                onClick={() => onSelectTab('pharmacy')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <span>Visit Apothecary Counter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onSelectTab('aidoctor')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0E1511] hover:bg-[#142019] text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Triage Symptoms for this Ward</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <span className="text-[11px] text-neutral-500 font-mono-nums">
              Ref: AFTERDARK-{activeRoom.code}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
