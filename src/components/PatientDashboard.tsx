import React, { useState } from 'react';
import { Activity, Heart, Shield, Calendar, Pill, Users, FileText, ArrowRight, CheckCircle2, Clock, MapPin, Sparkles, Plus } from 'lucide-react';
import { HumanAnatomyScanner } from './HumanAnatomyScanner';
import { UserSession } from './AuthModal';
import { soundEngine } from '../utils/audio';

interface PatientDashboardProps {
  user: UserSession;
  onNavigate: (tab: string) => void;
  onBookDoctor: (doctorName?: string) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  user,
  onNavigate,
  onBookDoctor,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Patient Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-900/30 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800/40">
              PATIENT HEALTH PORTAL
            </span>
            <span className="text-xs text-neutral-400 font-mono-nums">
              ID: #{user.id.slice(-6).toUpperCase()} · Blood Group: {user.bloodGroup || 'A+'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display mt-1">
            Welcome back, {user.name}.
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Your physiological wellness overview · Primary Physician: <span className="text-emerald-300 font-semibold">Dr. Hansraj Hathi, M.D.</span>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              onBookDoctor('Dr. Hansraj Hathi, M.D.');
              soundEngine.playChime();
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Consultation</span>
          </button>
          
          <button
            onClick={() => {
              onNavigate('aidoctor');
              soundEngine.playChime();
            }}
            className="px-3.5 py-2.5 rounded-xl bg-[#0B0F0D] hover:bg-[#121A15] border border-white/5 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>MedAI Triage</span>
          </button>
        </div>
      </div>

      {/* Real Human Vital Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl glass-panel border-white/5 text-center">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Blood Pressure</span>
          <p className="text-xl font-bold text-white font-mono-nums mt-1">{user.metrics?.bloodPressure || '120/80'}</p>
          <span className="text-[10px] text-emerald-400 font-medium">Optimal</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border-white/5 text-center">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Heart Rate</span>
          <p className="text-xl font-bold text-emerald-400 font-mono-nums mt-1">{user.metrics?.heartRate || 72} <span className="text-xs">BPM</span></p>
          <span className="text-[10px] text-emerald-400 font-medium">Normal Sinus</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border-white/5 text-center">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Blood Oxygen (SpO2)</span>
          <p className="text-xl font-bold text-cyan-400 font-mono-nums mt-1">{user.metrics?.spo2 || 99}%</p>
          <span className="text-[10px] text-emerald-400 font-medium">Excellent</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border-white/5 text-center">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Body Temp</span>
          <p className="text-xl font-bold text-white font-mono-nums mt-1">{user.metrics?.temperature || '98.6 °F'}</p>
          <span className="text-[10px] text-emerald-400 font-medium">Afebrile</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border-white/5 text-center">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">BMI Index</span>
          <p className="text-xl font-bold text-purple-400 font-mono-nums mt-1">{user.metrics?.bmi || 22.4}</p>
          <span className="text-[10px] text-emerald-400 font-medium">Normal Range</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border-white/5 text-center">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Weight</span>
          <p className="text-xl font-bold text-amber-400 font-mono-nums mt-1">{user.metrics?.weight || '68 kg'}</p>
          <span className="text-[10px] text-neutral-400 font-mono-nums">{user.metrics?.height || '175 cm'}</span>
        </div>
      </div>

      {/* Central 3D Human Anatomy Biomonitor */}
      <HumanAnatomyScanner />

      {/* Feature Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Upcoming Clinic Consultation */}
        <div
          onClick={() => {
            onNavigate('appointments');
            soundEngine.playChime();
          }}
          className="p-6 rounded-2xl glass-panel hover:border-emerald-500/40 cursor-pointer transition-all group flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-display">
                Next In-Person Visit
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono-nums">
                Confirmed
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-display">
              Consultation with Dr. Hansraj Hathi
            </h3>
            <div className="space-y-1 text-xs text-neutral-300 mt-2 bg-[#060907] p-3 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tomorrow · 10:30 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Consultation Suite 101 (Director Suite)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center text-xs font-bold text-emerald-400 gap-1.5 pt-2">
            <span>Manage Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: OPD Live Queue Status */}
        <div
          onClick={() => {
            onNavigate('queue');
            soundEngine.playChime();
          }}
          className="p-6 rounded-2xl glass-panel hover:border-cyan-500/40 cursor-pointer transition-all group flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-display">
                Live Outpatient Queue
              </span>
              <span className="text-xs text-neutral-400 font-mono-nums">OPD Floor 1</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
              Token #A-104 · Position 03
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Now calling: <strong className="text-white font-mono-nums">Token #A-102</strong>. Estimated wait time is approximately 14 minutes.
            </p>
          </div>

          <div className="flex items-center text-xs font-bold text-cyan-400 gap-1.5 pt-2">
            <span>View Full Queue Status</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: AI Clinical Symptom Checker */}
        <div
          onClick={() => {
            onNavigate('aidoctor');
            soundEngine.playChime();
          }}
          className="p-6 rounded-2xl glass-panel hover:border-purple-500/40 cursor-pointer transition-all group flex flex-col justify-between space-y-4"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider font-display">
                MedAI Assistant
              </span>
              <span className="text-[10px] text-emerald-400 font-mono-nums">Online 24/7</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors font-display">
              Instant Symptom Evaluation
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Ask questions regarding medications, mild symptoms, preventive nutrition, and direct specialist match with Dr. Hathi's team.
            </p>
          </div>

          <div className="flex items-center text-xs font-bold text-purple-400 gap-1.5 pt-2">
            <span>Launch MedAI Assistant</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

    </div>
  );
};
