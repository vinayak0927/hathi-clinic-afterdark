import React, { useState, useEffect } from 'react';
import { Users, Clock, AlertTriangle, ShieldCheck, UserCheck, Plus, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface QueuePatient {
  id: string;
  ghostId: string;
  name: string;
  ghostType: string;
  symptom: string;
  doctor: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Spectral Emergency';
  waitTimeMinutes: number;
  position: number;
  enteredAt: string;
}

export const LiveQueue: React.FC = () => {
  const [queueData, setQueueData] = useState<{
    currentCalling: string;
    currentUserToken: string;
    currentPosition: number;
    estimatedWaitMins: number;
    patientsWaiting: number;
    list: QueuePatient[];
  }>({
    currentCalling: 'Ghost #102',
    currentUserToken: 'Ghost #427',
    currentPosition: 3,
    estimatedWaitMins: 14,
    patientsWaiting: 5,
    list: []
  });

  const [inQueue, setInQueue] = useState(true);

  const fetchQueue = () => {
    fetch('/api/queue')
      .then((res) => res.json())
      .then((data) => setQueueData(data))
      .catch((err) => console.error('Failed to load queue:', err));
  };

  useEffect(() => {
    fetchQueue();
    // Simulate live queue progression every 30 seconds
    const interval = setInterval(() => {
      fetchQueue();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinQueue = async () => {
    soundEngine.playChime();
    try {
      const res = await fetch('/api/queue/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptom: 'Soul energy fluctuation & wall friction' }),
      });
      const data = await res.json();
      if (data.success) {
        setInQueue(true);
        fetchQueue();
      }
    } catch (_) {}
  };

  const handleLeaveQueue = () => {
    soundEngine.playGlitch();
    setInQueue(false);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white font-display">
              Afterlife Patient Queue
            </h2>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Real-time outpatient triage and ethereal waiting room tracking.
          </p>
        </div>

        {inQueue ? (
          <button
            onClick={handleLeaveQueue}
            className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
          >
            Step Out of Queue
          </button>
        ) : (
          <button
            onClick={handleJoinQueue}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Take Queuing Token</span>
          </button>
        )}
      </div>

      {/* Your Queue Ticket Hero Box */}
      {inQueue ? (
        <div className="p-6 rounded-2xl glass-panel-glow border-emerald-500/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/50">
                ACTIVE QUEUE TICKET
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                {queueData.currentUserToken} · Casper Vale
              </h3>
              <p className="text-xs text-neutral-400">
                Attending: <span className="text-emerald-300 font-semibold">Dr. Hansraj Hathi</span> (Consultation Room 13)
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-8">
              <div className="text-center">
                <span className="text-[10px] uppercase text-neutral-400 tracking-wider">Your Position</span>
                <p className="text-3xl font-bold text-emerald-400 font-mono-nums mt-0.5">
                  0{queueData.currentPosition}
                </p>
              </div>

              <div className="h-10 w-px bg-emerald-900/60" />

              <div className="text-center">
                <span className="text-[10px] uppercase text-neutral-400 tracking-wider">Estimated Wait</span>
                <p className="text-3xl font-bold text-cyan-400 font-mono-nums mt-0.5">
                  {queueData.estimatedWaitMins}m
                </p>
              </div>

              <div className="h-10 w-px bg-emerald-900/60" />

              <div className="text-center">
                <span className="text-[10px] uppercase text-neutral-400 tracking-wider">Now Calling</span>
                <p className="text-2xl font-bold text-white font-mono-nums mt-0.5 animate-pulse">
                  {queueData.currentCalling}
                </p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl glass-panel text-center space-y-2">
          <p className="text-sm font-semibold text-white">You are not currently in the afterlife queue.</p>
          <p className="text-xs text-neutral-400">
            Click "Take Queuing Token" to register for consultation with Dr. Hathi.
          </p>
        </div>
      )}

      {/* Waiting Room Patient Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
          <span className="font-semibold text-white font-display">
            Currently Waiting Spirits ({queueData.list.length})
          </span>
          <span className="font-mono-nums">Triage Priority: Automated</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {queueData.list.map((patient) => {
            const isUser = patient.ghostId === queueData.currentUserToken;

            return (
              <div
                key={patient.id}
                className={`p-4 rounded-xl flex items-center justify-between gap-4 transition-all ${
                  isUser
                    ? 'bg-emerald-950/40 border border-emerald-500/50 shadow-md'
                    : 'glass-panel border-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isUser
                        ? 'bg-emerald-500 text-black shadow-md'
                        : 'bg-[#111A14] text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    #{patient.position}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white truncate">
                        {patient.name}
                      </p>
                      {isUser && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500 text-black font-bold uppercase">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 truncate">
                      {patient.symptom}
                    </p>
                    <span className="text-[10px] text-emerald-400/80 font-mono-nums">
                      Dr: {patient.doctor}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded font-mono-nums ${
                      patient.urgency === 'High'
                        ? 'bg-red-950 text-red-300 border border-red-800'
                        : patient.urgency === 'Medium'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {patient.urgency}
                  </span>
                  <p className="text-[11px] text-neutral-400 mt-1 font-mono-nums">
                    ~{patient.waitTimeMinutes}m wait
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
