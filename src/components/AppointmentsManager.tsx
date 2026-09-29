import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, Trash2, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  doctorId: string;
  specialty: string;
  date: string;
  time: string;
  clinicRoom: string;
  condition: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

interface AppointmentsManagerProps {
  initialDoctor?: string;
  onAppointmentBooked?: () => void;
}

export const AppointmentsManager: React.FC<AppointmentsManagerProps> = ({
  initialDoctor,
  onAppointmentBooked,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [confirmedCard, setConfirmedCard] = useState<Appointment | null>(null);

  // Form State
  const [doctorName, setDoctorName] = useState(initialDoctor || 'Dr. Hansraj Hathi');
  const [date, setDate] = useState('29 September 2026');
  const [time, setTime] = useState('12:00 AM (Midnight)');
  const [clinicRoom, setClinicRoom] = useState('Afterdark Clinic — Room 13');
  const [condition, setCondition] = useState('Routine Ectoplasmic Density Inspection');

  const doctorRooms: Record<string, { specialty: string; room: string }> = {
    'Dr. Hansraj Hathi': {
      specialty: 'Spirit Medicine & Astral Harmony',
      room: 'Afterdark Clinic — Room 13 (Director Suite)',
    },
    'Dr. Bhootnath': {
      specialty: 'Possession Therapy',
      room: 'Possession Ward — Bay 4',
    },
    'Dr. Archibald Bones': {
      specialty: 'Skeletal Resonance',
      room: 'Relic Radiology Lab',
    },
    'Dr. Vladislav Night': {
      specialty: 'Bloodless Medicine',
      room: 'Spectral Hematology Ward',
    },
    'Dr. Moira O’Banshee': {
      specialty: 'Wailing Trauma',
      room: 'Soundproof Memory Suite',
    },
  };

  const fetchAppointments = () => {
    fetch('/api/appointments')
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error('Error loading appointments:', err));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (initialDoctor && doctorRooms[initialDoctor]) {
      setDoctorName(initialDoctor);
      setClinicRoom(doctorRooms[initialDoctor].room);
      setShowBookingForm(true);
    }
  }, [initialDoctor]);

  const handleDoctorChange = (doc: string) => {
    setDoctorName(doc);
    if (doctorRooms[doc]) {
      setClinicRoom(doctorRooms[doc].room);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playChime();

    const selectedDocInfo = doctorRooms[doctorName] || {
      specialty: 'General Afterlife Care',
      room: clinicRoom,
    };

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorName,
          specialty: selectedDocInfo.specialty,
          date,
          time,
          clinicRoom: selectedDocInfo.room,
          condition,
        }),
      });

      const newApt = await res.json();
      setConfirmedCard(newApt);
      setShowBookingForm(false);
      fetchAppointments();
      if (onAppointmentBooked) onAppointmentBooked();
    } catch (err) {
      console.error('Failed to book appointment:', err);
    }
  };

  const handleCancelAppointment = async (id: string) => {
    soundEngine.playGlitch();
    try {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      if (confirmedCard?.id === id) setConfirmedCard(null);
    } catch (err) {
      console.error('Cancel error:', err);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white font-display">
              Spectral Appointments
            </h2>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Book afterlife consultations with Dr. Hathi and the supernatural clinical board.
          </p>
        </div>

        <button
          onClick={() => {
            setShowBookingForm(!showBookingForm);
            soundEngine.playChime();
          }}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#050706] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{showBookingForm ? 'Close Form' : 'Book New Consultation'}</span>
        </button>
      </div>

      {/* Confirmed Banner Card if recently booked */}
      {confirmedCard && (
        <div className="p-6 rounded-2xl glass-panel-glow border-emerald-500/50 relative overflow-hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/50">
                  ✓ APPOINTMENT CONFIRMED
                </span>
                <h3 className="text-xl font-bold text-white mt-1 font-display">
                  Consultation with {confirmedCard.doctorName}
                </h3>
              </div>
            </div>
            <button
              onClick={() => setConfirmedCard(null)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 pt-4 border-t border-emerald-900/40 text-xs text-neutral-300">
            <div>
              <span className="text-neutral-500 block">Date & Time</span>
              <p className="font-semibold text-white mt-0.5">{confirmedCard.date} · {confirmedCard.time}</p>
            </div>
            <div>
              <span className="text-neutral-500 block">Clinic Wing</span>
              <p className="font-semibold text-emerald-300 mt-0.5">{confirmedCard.clinicRoom}</p>
            </div>
            <div>
              <span className="text-neutral-500 block">Condition Treated</span>
              <p className="font-semibold text-white mt-0.5">{confirmedCard.condition}</p>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal / Collapsible */}
      {showBookingForm && (
        <form
          onSubmit={handleSubmitBooking}
          className="p-6 rounded-2xl glass-panel border-emerald-500/30 space-y-5 animate-in fade-in zoom-in-95"
        >
          <div className="flex items-center gap-2 border-b border-emerald-900/30 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-display">
              Schedule Afterlife Consultation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Select Supernatural Physician:
              </label>
              <select
                value={doctorName}
                onChange={(e) => handleDoctorChange(e.target.value)}
                className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {Object.keys(doctorRooms).map((doc) => (
                  <option key={doc} value={doc}>
                    {doc} — {doctorRooms[doc].specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Assigned Clinic Suite:
              </label>
              <input
                type="text"
                disabled
                value={doctorRooms[doctorName]?.room || clinicRoom}
                className="w-full bg-[#030504] border border-white/5 rounded-xl px-3 py-2 text-xs text-emerald-400 font-medium cursor-not-allowed"
              >
              </input>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Consultation Date:
              </label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="29 September 2026">29 September 2026 (Tomorrow Night)</option>
                <option value="30 September 2026">30 September 2026 (Full Moon Eve)</option>
                <option value="01 October 2026">01 October 2026 (Spectral Shift)</option>
                <option value="03 October 2026">03 October 2026 (Cemetery Hour)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Astral Time Slot:
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="12:00 AM (Midnight)">12:00 AM (Midnight)</option>
                <option value="01:15 AM (Witching Hour)">01:15 AM (Witching Hour)</option>
                <option value="02:30 AM (Cold Hour)">02:30 AM (Cold Hour)</option>
                <option value="03:45 AM (Twilight)">03:45 AM (Twilight)</option>
                <option value="04:30 AM (Pre-Dawn Mist)">04:30 AM (Pre-Dawn Mist)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Supernatural Condition / Reason for Visit:
            </label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="e.g. Floating hiccups, low ectoplasm density, memory fog..."
              required
              className="w-full bg-[#050806] border border-emerald-900/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowBookingForm(false)}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg transition-colors"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      )}

      {/* Appointments List */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-white font-display">
          Scheduled Appointments ({appointments.length})
        </h3>

        {appointments.length === 0 ? (
          <div className="p-8 text-center rounded-2xl glass-panel text-neutral-400 text-xs">
            No upcoming consultations. Click "Book New Consultation" to schedule with Dr. Hathi.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-5 rounded-2xl glass-panel border-emerald-900/20 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-white font-display">
                      {apt.doctorName}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-mono-nums">
                      {apt.status}
                    </span>
                  </div>

                  <p className="text-xs text-emerald-400/90 font-medium mb-3">
                    {apt.specialty}
                  </p>

                  <div className="space-y-1.5 text-xs text-neutral-300 mb-4 bg-[#070B09] p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{apt.date} · {apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{apt.clinicRoom}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 italic">
                    Reason: "{apt.condition}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500 font-mono-nums">
                    Ref: {apt.id}
                  </span>
                  <button
                    onClick={() => handleCancelAppointment(apt.id)}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
