import React, { useState } from 'react';
import { Volume2, VolumeX, Bell, LogIn, LogOut, Menu, X, Shield, Clock, Stethoscope, User } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { UserSession } from './AuthModal';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: UserSession | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenNotifications,
  unreadCount,
}) => {
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const active = soundEngine.toggleSound();
    setSoundActive(active);
  };

  const navLinks = [
    { id: 'landing', label: 'Overview' },
    { id: 'patient-dashboard', label: 'Patient Portal' },
    { id: 'doctor-dashboard', label: 'Doctor Desk' },
    { id: 'records', label: 'Medical Records' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'pharmacy', label: 'Smart Pharmacy' },
    { id: 'aidoctor', label: 'AI Assistant' },
    { id: 'queue', label: 'OPD Queue' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050706]/90 backdrop-blur-md border-b border-emerald-900/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentTab('landing');
              soundEngine.playChime();
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <span className="text-2xl transform group-hover:scale-110 transition-transform select-none">
              🐘
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white font-display flex items-center gap-1.5">
                HATHI CLINIC
                <span className="text-[10px] text-emerald-400 font-mono-nums font-normal hidden sm:inline">
                  24/7
                </span>
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-neutral-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentTab(link.id);
                soundEngine.playChime();
              }}
              className={`relative py-1 transition-colors hover:text-emerald-300 ${
                currentTab === link.id
                  ? 'text-emerald-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400'
                  : 'text-neutral-400'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions Zone */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Sound Toggle (Off by default) */}
          <button
            onClick={toggleSound}
            title={soundActive ? 'Sound Synthesizer: ON' : 'Sound Synthesizer: OFF'}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-all ${
              soundActive
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                : 'bg-[#0B0F0D] border-white/5 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden xl:inline text-[11px] font-medium">
              {soundActive ? 'Sound ON' : 'Sound OFF'}
            </span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => {
              onOpenNotifications();
              soundEngine.playChime();
            }}
            className="relative p-2 rounded-lg bg-[#0B0F0D] border border-white/5 text-neutral-300 hover:text-emerald-300 transition-colors"
            title="Clinical Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black font-bold text-[10px] rounded-full flex items-center justify-center font-mono-nums">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Authentication Badge / Sign In Button */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-800">
              <button
                onClick={() => setCurrentTab(currentUser.role === 'DOCTOR' ? 'doctor-dashboard' : 'patient-dashboard')}
                className="flex items-center gap-2 text-left group"
                title={`Active user: ${currentUser.name} (${currentUser.role})`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-xs text-emerald-300 font-bold group-hover:border-emerald-400">
                  {currentUser.role === 'DOCTOR' ? <Stethoscope className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-neutral-200 leading-tight truncate max-w-[110px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono-nums">
                    {currentUser.role}
                  </span>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#0B0F0D] border border-white/5 text-neutral-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070A08] border-b border-emerald-900/30 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentTab(link.id);
                setMobileMenuOpen(false);
                soundEngine.playChime();
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                currentTab === link.id
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          {!currentUser && (
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-bold text-emerald-400"
            >
              Sign In / Register
            </button>
          )}
        </div>
      )}
    </header>
  );
};
