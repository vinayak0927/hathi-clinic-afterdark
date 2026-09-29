import React, { useState, useEffect, useRef } from 'react';
import { Activity, Heart, Shield, RefreshCw, Zap, Eye, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface AnatomicalPoint {
  id: string;
  name: string;
  category: string;
  status: 'Normal' | 'Optimal' | 'Stable' | 'Good';
  metric: string;
  findings: string;
  doctorNote: string;
  cx: number;
  cy: number;
  color: string;
}

export const HumanAnatomyScanner: React.FC = () => {
  const [activePointId, setActivePointId] = useState<string>('heart');
  const [viewMode, setViewMode] = useState<'cardio' | 'neuro' | 'ortho'>('cardio');
  const [isScanning, setIsScanning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const points: AnatomicalPoint[] = [
    {
      id: 'brain',
      name: 'Brain MRI & Neurovascular Telemetry',
      category: 'Neurological Scan',
      status: 'Normal',
      metric: 'Cerebral Perfusion: 99%',
      findings: 'Ventricular symmetry normal. No intracranial hemorrhage, vascular occlusion, or mass lesions detected.',
      doctorNote: 'Dr. James Paul: "Optimum cognitive baseline. Good sleep hygiene and adequate hydration reflected in scans."',
      cx: 150,
      cy: 62,
      color: '#06B6D4',
    },
    {
      id: 'lungs',
      name: 'Thoracic Cavity & Chest Radiography',
      category: 'Pulmonary Assessment',
      status: 'Optimal',
      metric: 'SpO2: 99% · Clear Bilateral Fields',
      findings: 'Lungs fully expanded bilaterally with no infiltrates, consolidations, or effusions. Normal cardiothoracic ratio.',
      doctorNote: 'Dr. Hansraj Hathi: "Lungs are completely clear. Excellent respiratory expansion!"',
      cx: 150,
      cy: 135,
      color: '#10B981',
    },
    {
      id: 'heart',
      name: '12-Lead Electrocardiogram (ECG)',
      category: 'Cardiovascular Telemetry',
      status: 'Stable',
      metric: 'Heart Rate: 72 BPM · Sinus Rhythm',
      findings: 'Regular normal sinus rhythm. Normal PR interval (148ms), normal QRS duration (86ms), no ST changes or ischemia.',
      doctorNote: 'Dr. Devid Johnson: "Healthy electrical conduction. Blood pressure tightly controlled at 120/80 mmHg."',
      cx: 162,
      cy: 165,
      color: '#34D399',
    },
    {
      id: 'abdomen',
      name: 'Abdominal & Hepatic Ultrasound',
      category: 'Internal Medicine',
      status: 'Normal',
      metric: 'Hepato-Renal Density: Normal',
      findings: 'Normal homogenous liver parenchyma. Gallbladder, kidneys, and spleen show zero calculi or structural pathology.',
      doctorNote: 'Dr. Hansraj Hathi: "Metabolic and digestive organs in balanced equilibrium. Sahi baat hai!"',
      cx: 150,
      cy: 220,
      color: '#F59E0B',
    },
    {
      id: 'knee',
      name: 'Orthopedic Knee & Joint Integrity',
      category: 'Musculoskeletal Biomechanics',
      status: 'Good',
      metric: 'Joint Space: Preserved Bilaterally',
      findings: 'No joint space narrowing, osteophytes, or patellar subluxation. Ligaments intact with full range of motion.',
      doctorNote: 'Dr. John Smith: "Cartilage and load-bearing joints well preserved. Continue active walking routine."',
      cx: 132,
      cy: 315,
      color: '#3B82F6',
    },
  ];

  const activePoint = points.find((p) => p.id === activePointId) || points[2];

  // Draw real human 12-lead ECG waveform on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
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

      // ECG wave line
      ctx.beginPath();
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.9)';
      ctx.shadowBlur = 8;

      const midY = canvas.height / 2;
      const width = canvas.width;

      for (let x = 0; x < width; x++) {
        const offset = (x + step) % 130;
        let y = midY;

        // P-Q-R-S-T human clinical wave
        if (offset > 40 && offset < 50) {
          y -= Math.sin(((offset - 40) / 10) * Math.PI) * 7; // P wave
        } else if (offset >= 50 && offset < 55) {
          y += 5; // Q
        } else if (offset >= 55 && offset < 63) {
          y -= 34; // R spike
        } else if (offset >= 63 && offset < 68) {
          y += 12; // S dip
        } else if (offset >= 75 && offset < 95) {
          y -= Math.sin(((offset - 75) / 20) * Math.PI) * 11; // T wave
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      step += 1.6;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activePoint]);

  const handlePointClick = (pt: AnatomicalPoint) => {
    setActivePointId(pt.id);
    soundEngine.playHeartbeat();
  };

  const handleRecalibrate = () => {
    setIsScanning(true);
    soundEngine.playChime();
    setTimeout(() => setIsScanning(false), 1600);
  };

  return (
    <div className="w-full relative rounded-2xl glass-panel p-4 sm:p-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/30 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-lg font-semibold tracking-wide text-white font-display">
              3D Anatomical Biomonitor
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time human physiological telemetry · Patient: Rahul Sharma (34 yrs, A+)
          </p>
        </div>

        {/* View Mode Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="p-1 bg-[#0B0F0D] border border-white/5 rounded-lg flex items-center text-xs">
            <button
              onClick={() => { setViewMode('cardio'); soundEngine.playChime(); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${viewMode === 'cardio' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' : 'text-neutral-400 hover:text-white'}`}
            >
              Cardiopulmonary
            </button>
            <button
              onClick={() => { setViewMode('neuro'); soundEngine.playChime(); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${viewMode === 'neuro' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-neutral-400 hover:text-white'}`}
            >
              Neurological
            </button>
            <button
              onClick={() => { setViewMode('ortho'); soundEngine.playChime(); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${viewMode === 'ortho' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm' : 'text-neutral-400 hover:text-white'}`}
            >
              Orthopedic
            </button>
          </div>

          <button
            onClick={handleRecalibrate}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md active:scale-95 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Updating...' : 'Sync Vitals'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Anatomical Figure (Left) + Clinical Diagnostic Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Anatomical Model Viewport */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-b from-[#090E0B] to-[#040605] rounded-xl border border-emerald-500/20 p-4 overflow-hidden">
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />

          {/* Active scanning sweep bar */}
          {isScanning && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-[bounce_1.6s_ease-in-out_infinite] z-20 pointer-events-none" />
          )}

          {/* Human Body SVG Simulation (Inspired by Reference 1 & 5) */}
          <div className="relative w-64 h-80 sm:w-72 sm:h-96">
            <svg
              viewBox="0 0 300 400"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.25)] select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="humanBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#0F172A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0.7" />
                </linearGradient>
                <radialGradient id="humanHoloPedestal" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#047857" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#050706" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Pedestal */}
              <ellipse cx="150" cy="380" rx="90" ry="16" fill="url(#humanHoloPedestal)" />
              <ellipse cx="150" cy="380" rx="90" ry="16" stroke="#10B981" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              <ellipse cx="150" cy="380" rx="60" ry="10" stroke="#06B6D4" strokeWidth="1" opacity="0.3" />

              {/* Muscular Human Silhouette Outline (From Reference 1 & 5) */}
              <g>
                {/* Head */}
                <ellipse cx="150" cy="55" rx="20" ry="24" fill="url(#humanBodyGrad)" stroke="#10B981" strokeWidth="1.5" />
                {/* Neck & Trapezius */}
                <path d="M140 76 L130 92 L170 92 L160 76 Z" fill="url(#humanBodyGrad)" stroke="#10B981" strokeWidth="1" />
                
                {/* Torso & Shoulders */}
                <path
                  d="M130 92 
                     C105 95, 95 110, 95 130 
                     C95 145, 100 160, 105 180 
                     C110 200, 115 220, 115 240 
                     L185 240 
                     C185 220, 190 200, 195 180 
                     C200 160, 205 145, 205 130 
                     C205 110, 195 95, 170 92 Z"
                  fill="url(#humanBodyGrad)"
                  stroke="#10B981"
                  strokeWidth="1.5"
                />

                {/* Chest & Rib lines */}
                <path d="M125 125 Q150 135 175 125" stroke="#34D399" strokeWidth="1.5" opacity="0.7" />
                <path d="M128 145 Q150 155 172 145" stroke="#34D399" strokeWidth="1.5" opacity="0.6" />
                <path d="M132 165 Q150 172 168 165" stroke="#34D399" strokeWidth="1.5" opacity="0.5" />

                {/* Abdomen structure */}
                <rect x="138" y="185" width="24" height="40" rx="4" stroke="#06B6D4" strokeWidth="1" opacity="0.5" />
                <line x1="150" y1="185" x2="150" y2="225" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />

                {/* Arms */}
                <path d="M95 115 C80 140, 75 180, 70 230" stroke="#10B981" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
                <path d="M205 115 C220 140, 225 180, 230 230" stroke="#10B981" strokeWidth="10" strokeLinecap="round" opacity="0.6" />

                {/* Pelvis & Legs */}
                <path d="M115 240 L135 370" stroke="#10B981" strokeWidth="14" strokeLinecap="round" opacity="0.65" />
                <path d="M185 240 L165 370" stroke="#10B981" strokeWidth="14" strokeLinecap="round" opacity="0.65" />

                {/* Interactive Points on Anatomy */}
                {points.map((pt) => {
                  const isSelected = pt.id === activePointId;

                  return (
                    <g
                      key={pt.id}
                      onClick={() => handlePointClick(pt)}
                      className="cursor-pointer transition-transform hover:scale-125"
                    >
                      {/* Pulse Ring */}
                      {isSelected && (
                        <circle
                          cx={pt.cx}
                          cy={pt.cy}
                          r="16"
                          fill="none"
                          stroke={pt.color}
                          strokeWidth="1.5"
                          opacity="0.8"
                        >
                          <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}

                      {/* Main Node */}
                      <circle
                        cx={pt.cx}
                        cy={pt.cy}
                        r={isSelected ? "8" : "6"}
                        fill={pt.color}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      />

                      {/* Connector Line */}
                      {isSelected && (
                        <line
                          x1={pt.cx}
                          y1={pt.cy}
                          x2={pt.cx > 150 ? pt.cx + 35 : pt.cx - 35}
                          y2={pt.cy - 10}
                          stroke={pt.color}
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

          <span className="text-[11px] text-emerald-400/80 tracking-widest uppercase font-mono-nums mt-2 z-10">
            [ Click anatomical nodes to inspect vital systems ]
          </span>
        </div>

        {/* Clinical Diagnostic Panel */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Active Node Detail Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#090E0B] border border-emerald-500/30 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold font-display">
                {activePoint.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono-nums">
                Status: {activePoint.status}
              </span>
            </div>

            <h4 className="text-lg font-bold text-white mt-1 font-display">
              {activePoint.name}
            </h4>

            <div className="mt-2 text-sm text-emerald-300 font-mono-nums font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{activePoint.metric}</span>
            </div>

            <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
              {activePoint.findings}
            </p>

            <div className="mt-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/40 text-xs text-emerald-200 italic leading-relaxed">
              {activePoint.doctorNote}
            </div>
          </div>

          {/* Real-time ECG Waveform Canvas */}
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5 px-1 font-mono-nums">
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-medium">12-Lead Rhythm Telemetry</span>
              </div>
              <span>72 BPM · Sinus Rhythm · Lead II</span>
            </div>

            <canvas
              ref={canvasRef}
              width={420}
              height={90}
              className="w-full h-20 rounded-lg bg-black/70 border border-emerald-950/60"
            />
          </div>

          {/* Real Human Vitals Strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#0B0F0D] border border-white/5 text-center">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Blood Pressure</span>
              <p className="text-base sm:text-lg font-bold text-white font-mono-nums mt-0.5">120/80</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0F0D] border border-white/5 text-center">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Oxygen SpO2</span>
              <p className="text-base sm:text-lg font-bold text-emerald-400 font-mono-nums mt-0.5">99%</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0F0D] border border-white/5 text-center">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">BMI Index</span>
              <p className="text-base sm:text-lg font-bold text-cyan-400 font-mono-nums mt-0.5">22.4</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
