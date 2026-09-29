import React, { useState } from 'react';
import { Stethoscope, User, Calendar, CheckCircle2, FileText, Plus, Clock, Activity, AlertCircle, Pill, Search } from 'lucide-react';
import { DrHathiAvatar } from './DrHathiAvatar';
import { soundEngine } from '../utils/audio';

export const DoctorDashboard: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('p-1');
  const [activeTab, setActiveTab] = useState<'schedule' | 'exam' | 'rx'>('exam');
  const [doctorNotes, setDoctorNotes] = useState('Patient Rahul Sharma presents with optimal vital signs. Blood pressure stable at 120/80 mmHg. Advised continuation of balanced diet and regular hydration.');
  const [prescriptionForm, setPrescriptionForm] = useState({
    medication: 'Vitamin D3 60,000 IU Oral Solution',
    dosage: '1 bottle once weekly with milk',
    duration: '8 weeks',
    instructions: 'Consume post-dinner with warm milk. Re-test 25-OH Vitamin D after 2 months.'
  });
  const [rxSuccess, setRxSuccess] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  const patientsList = [
    {
      id: 'p-1',
      name: 'Rahul Sharma',
      age: 34,
      gender: 'Male',
      bloodGroup: 'A+',
      bp: '120/80 mmHg',
      heartRate: 72,
      spo2: 99,
      allergies: ['Penicillin', 'Dust Mites'],
      symptoms: 'Executive health evaluation & ECG follow-up',
      room: 'Suite 101',
      status: 'In Consultation',
      time: '10:30 AM'
    },
    {
      id: 'p-2',
      name: 'Vikram Mehta',
      age: 42,
      gender: 'Male',
      bloodGroup: 'B+',
      bp: '135/88 mmHg',
      heartRate: 84,
      spo2: 98,
      allergies: ['Sulfa drugs'],
      symptoms: 'Acute lumbar muscle spasm post-lifting',
      room: 'Suite 108',
      status: 'Queued',
      time: '11:00 AM'
    },
    {
      id: 'p-3',
      name: 'Mrs. Sunita Verma',
      age: 58,
      gender: 'Female',
      bloodGroup: 'O+',
      bp: '142/90 mmHg',
      heartRate: 76,
      spo2: 98,
      allergies: ['None'],
      symptoms: 'Hypertension checkup & mild morning dizziness',
      room: 'Suite 102',
      status: 'Waiting in Triage',
      time: '11:30 AM'
    }
  ];

  const currentExamPatient = patientsList.find(p => p.id === selectedPatientId) || patientsList[0];

  const handleIssuePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playChime();
    setRxSuccess(true);
    setTimeout(() => {
      setRxSuccess(false);
    }, 2500);
  };

  const handleSaveNotes = () => {
    soundEngine.playChime();
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      
      {/* Doctor Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel-glow border-emerald-500/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5 text-center md:text-left">
            <DrHathiAvatar size="lg" withGlow={true} />
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-700/50">
                  CHIEF MEDICAL DIRECTOR
                </span>
                <span className="text-xs text-neutral-400 font-mono-nums">OPD Suite 101</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                Dr. Hansraj Hathi, M.D.
              </h2>
              <p className="text-xs text-emerald-300 italic mt-0.5">
                "Swasth Gokuldham, Khush Gokuldham! Your Health, Our Priority."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-[#060907] border border-white/5 text-xs text-emerald-300 font-mono-nums flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Consultation Suite Active</span>
            </div>
          </div>
        </div>

        {/* Operational Practice Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-emerald-900/40 text-center">
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Today's Patients</span>
            <p className="text-xl font-bold text-white font-mono-nums mt-0.5">27</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Waiting in OPD</span>
            <p className="text-xl font-bold text-amber-400 font-mono-nums mt-0.5">6</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Confirmed Visits</span>
            <p className="text-xl font-bold text-emerald-400 font-mono-nums mt-0.5">18</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5">
            <span className="text-[10px] text-neutral-400 uppercase">Emergency Triage</span>
            <p className="text-xl font-bold text-red-400 font-mono-nums mt-0.5">2</p>
          </div>
          <div className="p-3 rounded-xl bg-[#060A08] border border-white/5 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-neutral-400 uppercase">Scans to Review</span>
            <p className="text-xl font-bold text-cyan-400 font-mono-nums mt-0.5">14</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-emerald-900/30 pb-2">
        <button
          onClick={() => setActiveTab('exam')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'exam'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Patient Examination Suite
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'schedule'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Today's Outpatient Schedule
        </button>
        <button
          onClick={() => setActiveTab('rx')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'rx'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Issue Clinical Prescription
        </button>
      </div>

      {/* Tab 1: Patient Examination Suite (Inspired by Reference 5) */}
      {activeTab === 'exam' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Patient Selection Queue (Left) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
              Queued for Examination:
            </span>

            {patientsList.map((pt) => {
              const isSelected = pt.id === selectedPatientId;
              return (
                <div
                  key={pt.id}
                  onClick={() => {
                    setSelectedPatientId(pt.id);
                    soundEngine.playChime();
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-emerald-950/50 border-emerald-500/50 shadow-md'
                      : 'glass-panel border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white font-display">{pt.name}</span>
                    <span className="text-xs text-neutral-400 font-mono-nums">{pt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                    <span>{pt.age} yrs, {pt.gender}</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-bold">{pt.bloodGroup}</span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-2 truncate">
                    {pt.symptoms}
                  </p>
                  <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {pt.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Patient Clinical Examination & Telemetry (Right) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Patient Header Box */}
            <div className="p-6 rounded-2xl glass-panel space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/30 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {currentExamPatient.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Age: {currentExamPatient.age} · Gender: {currentExamPatient.gender} · Blood Group: <strong className="text-emerald-400">{currentExamPatient.bloodGroup}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    {currentExamPatient.status}
                  </span>
                </div>
              </div>

              {/* Vitals Telemetry */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-[#060907] rounded-xl border border-white/5">
                  <span className="text-[10px] text-neutral-400 uppercase">Blood Pressure</span>
                  <p className="text-lg font-bold text-white font-mono-nums mt-0.5">{currentExamPatient.bp}</p>
                </div>
                <div className="p-3 bg-[#060907] rounded-xl border border-white/5">
                  <span className="text-[10px] text-neutral-400 uppercase">Heart Rate</span>
                  <p className="text-lg font-bold text-emerald-400 font-mono-nums mt-0.5">{currentExamPatient.heartRate} BPM</p>
                </div>
                <div className="p-3 bg-[#060907] rounded-xl border border-white/5">
                  <span className="text-[10px] text-neutral-400 uppercase">Oxygen SpO2</span>
                  <p className="text-lg font-bold text-cyan-400 font-mono-nums mt-0.5">{currentExamPatient.spo2}%</p>
                </div>
              </div>

              {/* Allergies & Presenting Complaints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 text-red-200">
                  <span className="font-bold text-red-400 block mb-0.5">Documented Allergies:</span>
                  {currentExamPatient.allergies.join(', ') || 'No known drug allergies'}
                </div>
                <div className="p-3 rounded-xl bg-[#060907] border border-white/5 text-neutral-300">
                  <span className="font-bold text-white block mb-0.5">Presenting Symptoms:</span>
                  {currentExamPatient.symptoms}
                </div>
              </div>

              {/* Clinical Notes Input */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Dr. Hathi's Clinical Findings & Physician Notes:
                </label>
                <textarea
                  rows={4}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-emerald-500"
                />

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-emerald-400">
                    {noteSaved ? '✓ Note saved to electronic health record' : ''}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('rx')}
                      className="px-4 py-2 rounded-xl bg-[#0B0F0D] hover:bg-[#121A15] border border-white/5 text-xs text-emerald-300 font-semibold flex items-center gap-1.5"
                    >
                      <Pill className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Write Prescription</span>
                    </button>
                    <button
                      onClick={handleSaveNotes}
                      className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-md transition-colors"
                    >
                      Save Clinical Note
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Outpatient Schedule */}
      {activeTab === 'schedule' && (
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-lg font-bold text-white font-display">
            Today's Outpatient Appointments ({patientsList.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {patientsList.map((pt) => (
              <div key={pt.id} className="p-4 rounded-xl bg-[#070B09] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{pt.name}</span>
                  <span className="text-xs text-emerald-400 font-mono-nums">{pt.time}</span>
                </div>
                <p className="text-xs text-neutral-300">{pt.symptoms}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-neutral-400">
                  <span>Room: {pt.room}</span>
                  <span className="text-emerald-400 font-medium">{pt.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Issue Prescription */}
      {activeTab === 'rx' && (
        <form onSubmit={handleIssuePrescription} className="p-6 sm:p-8 rounded-2xl glass-panel space-y-5 max-w-2xl">
          <div className="border-b border-emerald-900/30 pb-3">
            <h3 className="text-lg font-bold text-white font-display">
              Prescription Order Form
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Patient: <strong className="text-white">{currentExamPatient.name}</strong> · Attending: Dr. Hansraj Hathi, M.D.
            </p>
          </div>

          {rxSuccess ? (
            <div className="p-6 text-center space-y-2 bg-emerald-950/40 rounded-xl border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
              <p className="text-sm font-bold text-white">Prescription Signed & Transmitted to Smart Pharmacy!</p>
              <p className="text-xs text-neutral-400">The patient can collect their medication from the pharmacy counter.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Medication Name & Strength:
                </label>
                <select
                  value={prescriptionForm.medication}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, medication: e.target.value })}
                  className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Amoxicillin & Clavulanate 625mg">Amoxicillin & Clavulanate 625mg (Augmentin Duo)</option>
                  <option value="Atorvastatin 10mg Tablets">Atorvastatin 10mg Tablets (Lipitor)</option>
                  <option value="Paracetamol & Aceclofenac 500/100mg">Paracetamol & Aceclofenac 500/100mg (Zerodol-P)</option>
                  <option value="Metformin Hydrochloride ER 500mg">Metformin Hydrochloride ER 500mg (Glycomet-SR)</option>
                  <option value="Montelukast & Levocetirizine 10/5mg">Montelukast & Levocetirizine 10/5mg (Montair-LC)</option>
                  <option value="Vitamin D3 60,000 IU Oral Solution">Vitamin D3 60,000 IU Oral Solution (Calcirol)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Dosage Frequency:</label>
                  <input
                    type="text"
                    required
                    value={prescriptionForm.dosage}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, dosage: e.target.value })}
                    className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Duration:</label>
                  <input
                    type="text"
                    required
                    value={prescriptionForm.duration}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, duration: e.target.value })}
                    className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Specific Patient Instructions & Diet Directives:
                </label>
                <textarea
                  rows={3}
                  required
                  value={prescriptionForm.instructions}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, instructions: e.target.value })}
                  className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
              >
                Sign & Authorize Prescription
              </button>
            </>
          )}
        </form>
      )}

    </div>
  );
};
