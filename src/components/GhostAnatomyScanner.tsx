import React, { useState, useEffect, useRef } from 'react';
import { Activity, Brain, ShieldAlert, Sparkles, HeartPulse, RefreshCw } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface AnatomicalNode {
  id: string;
  name: string;
  category: string;
  status: 'Stable' | 'Mild' | 'Normal' | 'Fluctuating' | 'Warning';
  metric: string;
  detail: string;
  doctorNote: string;
  cx: number;
  cy: number;
  color: string;
}

export const GhostAnatomyScanner: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('heart');
  const [scanMode, setScanMode] = useState<'soul' | 'ectoplasm' | 'resonance'>('soul');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const nodes: AnatomicalNode[] = [
    {
      id: 'head',
      name: 'Memory Cortex & Third Eye',
      category: 'Memory MRI',
      status: 'Mild',
      metric: 'Memory Fog: 18%',
      detail: 'Slight nostalgic reverberation detected from the 1920s decade. Minor translucent hazing in occipital ether.',
      doctorNote: 'Dr. Hathi: "A little memory mist is normal after a century. Prescribed 2 drops of Memory Balm."',
      cx: 150,
      cy: 65,
      color: '#A855F7', // Violet
    },
    {
      id: 'chest',
      name: 'Ectoplasmic Astral Lungs',
      category: 'Ectoplasm X-Ray',
      status: 'Stable',
      metric: 'Vapor Viscosity: 84%',
      detail: 'Atmospheric cold-spot emission is uniform. Zero wall-friction drag during rapid phase shifts.',
      doctorNote: 'Dr. Hathi: "Lungs are floating with excellent buoyancy. Sahi baat hai!"',
      cx: 150,
      cy: 135,
      color: '#06B6D4', // Cyan
    },
    {
      id: 'heart',
      name: 'Soul Core & Astral Flutter',
      category: 'Spirit ECG',
      status: 'Stable',
      metric: 'Soul Rhythm: 98 BPM',
      detail: 'Regular sinusoidal phantom resonance. Spectral harmonic frequency locked at 432 Hz afterlife pitch.',
      doctorNote: 'Dr. Hathi: "Strong spiritual rhythm. The pulse of the afterlife is steady."',
      cx: 160,
      cy: 165,
      color: '#10B981', // Emerald
    },
    {
      id: 'stomach',
      name: 'Spectral Digestion & Core Plexus',
      category: 'Soul Scan',
      status: 'Normal',
      metric: 'Soul Energy: 72%',
      detail: 'Energy absorption nominal. No traces of toxic cursed silver or exorcism salt abrasions.',
      doctorNote: 'Dr. Hathi: "Remember, ghosts can savor the scent of hot samosas without calorie guilt."',
      cx: 150,
      cy: 220,
      color: '#F59E0B', // Amber
    },
    {
      id: 'limbs',
      name: 'Phantasm Density Anchors',
      category: 'Possession Scan',
      status: 'Stable',
      metric: 'Possession Risk: 12%',
      detail: 'Dimensional grounding anchors securely tethered to floor level. Zero risk of uncontrolled floating out into stratosphere.',
      doctorNote: 'Dr. Hathi: "Anchor stabilizers working nicely. Good ground contact."',
      cx: 120,
      cy: 310,
      color: '#3B82F6', // Blue
    }
  ];

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[2];

  // Draw real-time animated Spirit ECG on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // ECG wave
      ctx.beginPath();
      ctx.strokeStyle = activeNode.id === 'heart' ? '#10B981' : '#06B6D4';
      ctx.lineWidth = 2;
      ctx.shadowColor = activeNode.id === 'heart' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(6, 182, 212, 0.8)';
      ctx.shadowBlur = 8;

      const midY = canvas.height / 2;
      const width = canvas.width;

      for (let x = 0; x < width; x++) {
        const offset = (x + step) % 120;
        let y = midY;

        // ECG P-Q-R-S-T wave simulation
        if (offset > 40 && offset < 50) {
          y -= Math.sin(((offset - 40) / 10) * Math.PI) * 6; // P wave
        } else if (offset >= 50 && offset < 55) {
          y += 4; // Q dip
        } else if (offset >= 55 && offset < 63) {
          y -= 32; // R spike
        } else if (offset >= 63 && offset < 68) {
          y += 12; // S dip
        } else if (offset >= 75 && offset < 95) {
          y -= Math.sin(((offset - 75) / 20) * Math.PI) * 10; // T wave
        }

        // Add subtle harmonic flutter
        y += Math.sin((x + step * 2) * 0.05) * 1.5;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      step += 1.5;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeNode]);

  const handleNodeClick = (node: AnatomicalNode) => {
    setActiveNodeId(node.id);
    soundEngine.playHeartbeat();
  };

  const handleTriggerScan = () => {
    setIsScanning(true);
    soundEngine.playChime();
    setTimeout(() => {
      setIsScanning(false);
    }, 1800);
  };

  return (
    <div className="w-full relative rounded-2xl glass-panel p-4 sm:p-6 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/30 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-lg font-semibold tracking-wide text-white font-display">
              Spectral Anatomy Telemetry
            </h3>
          </div>
          <p className="text-xs text-emerald-400/70 mt-0.5">
            Real-time ethereal biomonitoring · Patient: Casper Vale (#427)
          </p>
        </div>

        {/* Scan Mode Selector & Action */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="p-1 bg-[#0B0F0D] border border-white/5 rounded-lg flex items-center text-xs">
            <button
              onClick={() => { setScanMode('soul'); soundEngine.playChime(); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${scanMode === 'soul' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' : 'text-neutral-400 hover:text-white'}`}
            >
              Soul Radiance
            </button>
            <button
              onClick={() => { setScanMode('ectoplasm'); soundEngine.playChime(); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${scanMode === 'ectoplasm' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-neutral-400 hover:text-white'}`}
            >
              Ectoplasm
            </button>
            <button
              onClick={() => { setScanMode('resonance'); soundEngine.playChime(); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${scanMode === 'resonance' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm' : 'text-neutral-400 hover:text-white'}`}
            >
              Resonance
            </button>
          </div>

          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-emerald-900/30 transition-all active:scale-95 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Recalibrate'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Ghost Interactive Silhouette (Left) + Diagnostic Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Silhouette Viewport */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[380px] bg-gradient-to-b from-[#080D0A] to-[#040605] rounded-xl border border-emerald-500/20 p-4 overflow-hidden">
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />

          {/* Active scanning sweep bar */}
          {isScanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-[bounce_1.8s_ease-in-out_infinite] z-20 pointer-events-none" />
          )}

          {/* Ghost SVG Silhouette */}
          <div className="relative w-64 h-80 sm:w-72 sm:h-96">
            <svg
              viewBox="0 0 300 400"
              className="w-full h-full drop-shadow-[0_0_25px_rgba(16,185,129,0.3)] select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="ghostSoulGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.75" />
                  <stop offset="40%" stopColor="#34D399" stopOpacity="0.45" />
                  <stop offset="80%" stopColor="#065F46" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#022C22" stopOpacity="0.05" />
                </linearGradient>
                <radialGradient id="pedestalGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                  <stop offset="70%" stopColor="#064E3B" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#050706" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Pedestal / Holo-base */}
              <ellipse cx="150" cy="370" rx="90" ry="20" fill="url(#pedestalGrad)" />
              <ellipse cx="150" cy="370" rx="90" ry="20" stroke="#10B981" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
              <ellipse cx="150" cy="370" rx="60" ry="12" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />

              {/* Glowing Ghost Body Silhouette */}
              <g className="animate-ghost-float">
                {/* Outer ethereal halo */}
                <path
                  d="M150 40 
                     C110 40, 80 70, 80 120 
                     C80 160, 95 180, 90 220 
                     C85 260, 75 300, 105 340 
                     C120 360, 140 330, 150 350 
                     C160 330, 180 360, 195 340 
                     C225 300, 215 260, 210 220 
                     C205 180, 220 160, 220 120 
                     C220 70, 190 40, 150 40 Z"
                  fill="url(#ghostSoulGrad)"
                  stroke="#34D399"
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />

                {/* Internal astral skeleton / flow lines */}
                <path
                  d="M150 75 L150 250"
                  stroke="#67E8F9"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  opacity="0.5"
                />
                <path
                  d="M120 135 Q150 150 180 135"
                  stroke="#67E8F9"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
                <path
                  d="M125 175 Q150 190 175 175"
                  stroke="#67E8F9"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
                <path
                  d="M130 215 Q150 225 170 215"
                  stroke="#67E8F9"
                  strokeWidth="1.5"
                  opacity="0.3"
                />

                {/* Ghost Friendly Face Features (Translucent) */}
                <ellipse cx="132" cy="90" rx="5" ry="8" fill="#042F2E" opacity="0.75" />
                <ellipse cx="168" cy="90" rx="5" ry="8" fill="#042F2E" opacity="0.75" />
                <path d="M142 108 Q150 114 158 108" stroke="#042F2E" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />

                {/* Clickable Anatomical Node Markers */}
                {nodes.map((node) => {
                  const isSelected = node.id === activeNodeId;
                  return (
                    <g
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      className="cursor-pointer transition-transform hover:scale-125"
                    >
                      {/* Pulse ring for active */}
                      {isSelected && (
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r="16"
                          fill="none"
                          stroke={node.color}
                          strokeWidth="1.5"
                          opacity="0.8"
                        >
                          <animate attributeName="r" values="10;22;10" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}

                      {/* Main node dot */}
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={isSelected ? "8" : "6"}
                        fill={node.color}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      />

                      {/* Line connector to label */}
                      {isSelected && (
                        <line
                          x1={node.cx}
                          y1={node.cy}
                          x2={node.cx > 150 ? node.cx + 35 : node.cx - 35}
                          y2={node.cy - 10}
                          stroke={node.color}
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="text-center mt-2 z-10">
            <span className="text-[11px] text-emerald-400/80 tracking-widest uppercase font-mono-nums">
              [ Tap nodes to inspect soul sectors ]
            </span>
          </div>
        </div>

        {/* Right Diagnostic Panel */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Active Node Detail Card */}
          <div className="p-4 rounded-xl bg-[#090D0B] border border-emerald-500/30 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                {activeNode.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono-nums">
                Status: {activeNode.status}
              </span>
            </div>

            <h4 className="text-lg font-semibold text-white mt-1 font-display">
              {activeNode.name}
            </h4>

            <div className="mt-2 text-sm text-emerald-200/90 font-mono-nums font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{activeNode.metric}</span>
            </div>

            <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
              {activeNode.detail}
            </p>

            <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/40 text-xs text-emerald-300/90 italic">
              {activeNode.doctorNote}
            </div>
          </div>

          {/* Real-time Waveform Canvas */}
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5 px-1 font-mono-nums">
              <div className="flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Live Spirit Frequency</span>
              </div>
              <span>98 BPM · 432 Hz</span>
            </div>

            <canvas
              ref={canvasRef}
              width={420}
              height={90}
              className="w-full h-20 rounded-lg bg-black/60 border border-emerald-950/60"
            />
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#0B0F0D] border border-white/5 text-center">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Soul Energy</span>
              <p className="text-lg font-bold text-emerald-400 font-mono-nums mt-0.5">72%</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0F0D] border border-white/5 text-center">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Ectoplasm</span>
              <p className="text-lg font-bold text-cyan-400 font-mono-nums mt-0.5">84%</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0F0D] border border-white/5 text-center">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Possession Risk</span>
              <p className="text-lg font-bold text-amber-400 font-mono-nums mt-0.5">12%</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
