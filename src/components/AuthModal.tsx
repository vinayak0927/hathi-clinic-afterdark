import React, { useState } from 'react';
import { User, Lock, Mail, Phone, Calendar, CheckCircle2, Shield, X, ArrowRight, Stethoscope } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  age?: number;
  gender?: string;
  bloodGroup?: string;
  phone?: string;
  allergies?: string[];
  medicalHistory?: string;
  metrics?: {
    bloodPressure: string;
    heartRate: number;
    spo2: number;
    temperature: string;
    bmi: number;
    weight: string;
    height: string;
    lastCheckup: string;
  };
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserSession) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'PATIENT' | 'DOCTOR'>('PATIENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('34');
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDemoLogin = async (targetRole: 'PATIENT' | 'DOCTOR') => {
    setIsLoading(true);
    soundEngine.playChime();
    setErrorMsg(null);

    const demoEmail = targetRole === 'DOCTOR' ? 'dr.hathi@hathiclinic.com' : 'patient@hathiclinic.com';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail, role: targetRole }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setErrorMsg(data.error || 'Authentication failed');
      }
    } catch (_) {
      setErrorMsg('Network error connecting to clinic server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    soundEngine.playChime();

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = mode === 'login'
      ? { email, password, role }
      : { name, email, password, role, age, gender, bloodGroup, phone };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setErrorMsg(data.error || 'Operation failed');
      }
    } catch (_) {
      setErrorMsg('Failed to reach healthcare authentication gateway');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#090E0B] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Banner */}
        <div className="text-center mb-6">
          <span className="text-3xl select-none">🐘</span>
          <h3 className="text-xl font-bold text-white font-display mt-2">
            HATHI CLINIC ACCESS
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            24/7 Secure Healthcare Management Portal
          </p>
        </div>

        {/* Quick Demo Login Buttons */}
        <div className="mb-6 p-3 rounded-2xl bg-[#060907] border border-white/5 space-y-2">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block text-center font-medium">
            Fast Track Access (1-Click Demo):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('PATIENT')}
              disabled={isLoading}
              className="px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Patient (Rahul)</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('DOCTOR')}
              disabled={isLoading}
              className="px-3 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Dr. Hathi (MD)</span>
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs (Login / Register) */}
        <div className="flex rounded-xl bg-[#050806] p-1 border border-white/5 mb-5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              mode === 'login' ? 'bg-emerald-500 text-black font-bold shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              mode === 'register' ? 'bg-emerald-500 text-black font-bold shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Register Patient
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Role selector for login */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">
              Select Portal Type:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label
                className={`flex items-center justify-center gap-2 p-2 rounded-xl border cursor-pointer transition-colors ${
                  role === 'PATIENT'
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-semibold'
                    : 'bg-[#060907] border-white/5 text-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="authRole"
                  value="PATIENT"
                  checked={role === 'PATIENT'}
                  onChange={() => setRole('PATIENT')}
                  className="hidden"
                />
                <span>Patient Portal</span>
              </label>

              <label
                className={`flex items-center justify-center gap-2 p-2 rounded-xl border cursor-pointer transition-colors ${
                  role === 'DOCTOR'
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-semibold'
                    : 'bg-[#060907] border-white/5 text-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="authRole"
                  value="DOCTOR"
                  checked={role === 'DOCTOR'}
                  onChange={() => setRole('DOCTOR')}
                  className="hidden"
                />
                <span>Physician Desk</span>
              </label>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                Full Legal Name:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#050806] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">
              Email Address:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-[#050806] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">
              Secure Password:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#050806] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-neutral-400 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-[#050806] border border-white/10 rounded-xl p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-400 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-[#050806] border border-white/10 rounded-xl p-2 text-xs text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-neutral-400 mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full bg-[#050806] border border-white/10 rounded-xl p-2 text-xs text-white"
                >
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="O-">O-</option>
                  <option value="A-">A-</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 mt-4"
          >
            {isLoading ? 'Verifying Credentials...' : mode === 'login' ? 'Authenticate & Enter' : 'Complete Registration'}
          </button>
        </form>

      </div>
    </div>
  );
};
