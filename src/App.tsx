import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { MedAIChat } from './components/MedAIChat';
import { DoctorMatch, Doctor } from './components/DoctorMatch';
import { AppointmentsManager } from './components/AppointmentsManager';
import { MedicalRecordsView } from './components/MedicalRecordsView';
import { SpectralPharmacy } from './components/SpectralPharmacy';
import { LiveQueue } from './components/LiveQueue';
import { AuthModal, UserSession } from './components/AuthModal';
import { GhostAnimation } from './components/GhostAnimation';
import { NotificationsModal, NotificationItem } from './components/NotificationsModal';
import { Footer } from './components/Footer';
import { soundEngine } from './utils/audio';
import { Sparkles, Calendar, Pill, Users, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [preSelectedDoctor, setPreSelectedDoctor] = useState<string>('Dr. Hansraj Hathi, M.D.');
  
  // Real User Session State
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Dr. Hathi approved your Lab Report',
      message: 'Comprehensive Metabolic Panel and Lipid Profile are within healthy target ranges.',
      time: '15m ago',
      read: false,
      type: 'doctor',
    },
    {
      id: 'notif-2',
      title: 'Upcoming Appointment Reminder',
      message: 'Consultation with Dr. Hansraj Hathi scheduled for tomorrow at 10:30 AM.',
      time: '2h ago',
      read: false,
      type: 'appointment',
    },
    {
      id: 'notif-3',
      title: 'Prescription Refill Ready',
      message: 'Your prescribed Vitamin D3 and Multivitamin pack is ready for pickup at Smart Pharmacy.',
      time: '5h ago',
      read: true,
      type: 'pharmacy',
    },
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Restore authenticated session from backend on load
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch((err) => console.warn('Session check failed:', err));
  }, []);

  const handleLoginSuccess = (user: UserSession) => {
    setCurrentUser(user);
    showToast(`✓ Welcome, ${user.name}! Authenticated as ${user.role}.`);
    if (user.role === 'DOCTOR') {
      setCurrentTab('doctor-dashboard');
    } else {
      setCurrentTab('patient-dashboard');
    }
  };

  const handleLogout = async () => {
    soundEngine.playGlitch();
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (_) {}
    setCurrentUser(null);
    showToast('Signed out of Hathi Clinic.');
    setCurrentTab('landing');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleBookDoctorFromMatch = (doctor: Doctor) => {
    setPreSelectedDoctor(doctor.name);
    setCurrentTab('appointments');
  };

  const handleBookDoctorFromAI = (doctorName?: string) => {
    if (doctorName) setPreSelectedDoctor(doctorName);
    setCurrentTab('appointments');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#050706] text-[#E4ECE7] flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      
      {/* Global Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={unreadCount}
      />

      {/* Floating Ghost Animation Mascot (As requested: "only add the ghost animation") */}
      <GhostAnimation />

      {/* Clinical Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#0B130E] border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Viewport Router */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* LANDING PAGE OVERVIEW */}
        {currentTab === 'landing' && (
          <LandingHero
            onEnterPatientPortal={() => setCurrentTab('patient-dashboard')}
            onEnterDoctorDesk={() => setCurrentTab('doctor-dashboard')}
          />
        )}

        {/* DEDICATED PATIENT DASHBOARD */}
        {currentTab === 'patient-dashboard' && (
          currentUser?.role === 'DOCTOR' ? (
            <div className="p-6 rounded-2xl glass-panel text-center space-y-3">
              <p className="text-sm font-bold text-white">Currently logged in as Doctor ({currentUser.name})</p>
              <button
                onClick={() => setCurrentTab('doctor-dashboard')}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs"
              >
                Go to Physician Desk
              </button>
            </div>
          ) : (
            <PatientDashboard
              user={currentUser || {
                id: 'user-patient-1',
                name: 'Rahul Sharma',
                email: 'patient@hathiclinic.com',
                role: 'PATIENT',
                age: 34,
                gender: 'Male',
                bloodGroup: 'A+',
                metrics: {
                  bloodPressure: '120/80 mmHg',
                  heartRate: 72,
                  spo2: 99,
                  temperature: '98.6 °F',
                  bmi: 22.4,
                  weight: '68 kg',
                  height: '175 cm',
                  lastCheckup: '18 September 2026',
                }
              }}
              onNavigate={setCurrentTab}
              onBookDoctor={handleBookDoctorFromAI}
            />
          )
        )}

        {/* DEDICATED DOCTOR DASHBOARD */}
        {currentTab === 'doctor-dashboard' && (
          <DoctorDashboard />
        )}

        {/* MEDICAL RECORDS */}
        {currentTab === 'records' && (
          <div className="animate-in fade-in duration-300">
            <MedicalRecordsView onTriggerClue={() => {}} />
          </div>
        )}

        {/* APPOINTMENTS */}
        {currentTab === 'appointments' && (
          <div className="animate-in fade-in duration-300">
            <AppointmentsManager initialDoctor={preSelectedDoctor} />
          </div>
        )}

        {/* SMART PHARMACY */}
        {currentTab === 'pharmacy' && (
          <div className="animate-in fade-in duration-300">
            <SpectralPharmacy onTriggerClue={() => {}} />
          </div>
        )}

        {/* MEDAI CLINICAL ASSISTANT */}
        {currentTab === 'aidoctor' && (
          <div className="animate-in fade-in duration-300">
            <MedAIChat onBookDoctor={handleBookDoctorFromAI} />
          </div>
        )}

        {/* OUTPATIENT QUEUE */}
        {currentTab === 'queue' && (
          <div className="animate-in fade-in duration-300">
            <LiveQueue />
          </div>
        )}

      </main>

      {/* Real Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Global Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />

    </div>
  );
}
