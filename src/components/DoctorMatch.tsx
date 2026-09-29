import React, { useState, useEffect } from 'react';
import { Search, Star, MessageSquare, Calendar, Sparkles, CheckCircle2, User } from 'lucide-react';
import { DrHathiAvatar } from './DrHathiAvatar';
import { soundEngine } from '../utils/audio';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  category: 'spirit' | 'possession' | 'memory' | 'ectoplasm' | 'haunting' | 'soul';
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  patientsTreated: number;
  room: string;
  availability: 'Available Now' | 'In Surgery' | 'On Call' | 'Wandering';
  quote: string;
  bio: string;
  avatarColor: string;
  featured?: boolean;
}

interface DoctorMatchProps {
  onBookDoctor: (doctor: Doctor) => void;
}

export const DoctorMatch: React.FC<DoctorMatchProps> = ({ onBookDoctor }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMessageDoctor, setActiveMessageDoctor] = useState<Doctor | null>(null);
  const [messageText, setMessageText] = useState<string>('');
  const [messageSentSuccess, setMessageSentSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/doctors')
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error('Failed to load doctors:', err));
  }, []);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'spirit', label: 'Spirit' },
    { id: 'possession', label: 'Possession' },
    { id: 'memory', label: 'Memory' },
    { id: 'ectoplasm', label: 'Ectoplasm' },
    { id: 'haunting', label: 'Haunting' },
    { id: 'soul', label: 'Soul' },
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesQuery =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    soundEngine.playChime();
    setMessageSentSuccess(true);
    setTimeout(() => {
      setMessageSentSuccess(false);
      setMessageText('');
      setActiveMessageDoctor(null);
    }, 2000);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white font-display">
              Afterlife Doctor Match
            </h2>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Connect with board-certified supernatural physicians and ethereal specialists.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search supernatural specialists..."
            className="w-full bg-[#0B0F0D] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              soundEngine.playChime();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-[#0B0F0D] text-neutral-400 hover:text-white border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDoctors.map((doc) => {
          const isHathi = doc.id === 'doc-hathi';

          return (
            <div
              key={doc.id}
              className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative ${
                isHathi
                  ? 'glass-panel-glow border-emerald-500/40'
                  : 'glass-panel hover:border-emerald-500/30'
              }`}
            >
              {isHathi && (
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-emerald-500 text-[#050706] text-[10px] font-bold uppercase tracking-wider shadow-md">
                  Chief Physician
                </div>
              )}

              <div>
                {/* Doctor Header: Avatar + Name + Rating */}
                <div className="flex items-start gap-4 mb-4">
                  {isHathi ? (
                    <DrHathiAvatar size="md" withGlow={true} />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md shrink-0 border border-white/10"
                      style={{ backgroundColor: `${doc.avatarColor}20`, color: doc.avatarColor }}
                    >
                      {doc.category === 'possession' ? '🔮' : doc.category === 'ectoplasm' ? '🦴' : doc.category === 'haunting' ? '🧛' : doc.category === 'memory' ? '📜' : '✨'}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate font-display">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-emerald-400/90 font-medium truncate mt-0.5">
                      {doc.specialty}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-neutral-300">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold ml-1 font-mono-nums">{doc.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-neutral-500">·</span>
                      <span className="text-neutral-400 text-[11px] font-mono-nums">
                        {doc.patientsTreated.toLocaleString()} treated
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote / Bio */}
                <div className="mb-4">
                  <p className="text-xs text-neutral-300 leading-relaxed italic bg-[#060A08]/60 p-2.5 rounded-xl border border-white/5">
                    "{doc.quote}"
                  </p>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                    {doc.bio}
                  </p>
                </div>

                {/* Room & Availability */}
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-5 pt-3 border-t border-white/5">
                  <span>{doc.room}</span>
                  <span
                    className={`font-medium ${
                      doc.availability === 'Available Now'
                        ? 'text-emerald-400'
                        : doc.availability === 'In Surgery'
                        ? 'text-amber-400'
                        : 'text-cyan-400'
                    }`}
                  >
                    ● {doc.availability}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-950/40">
                <button
                  onClick={() => {
                    setActiveMessageDoctor(doc);
                    soundEngine.playChime();
                  }}
                  className="px-3 py-2 rounded-xl bg-[#0E1511] hover:bg-[#152019] text-neutral-300 hover:text-white border border-white/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Message</span>
                </button>

                <button
                  onClick={() => {
                    onBookDoctor(doc);
                    soundEngine.playChime();
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#050706] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Message Doctor Modal */}
      {activeMessageDoctor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#090E0B] border border-emerald-500/40 rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Send Ethereal Dispatch to {activeMessageDoctor.name}
            </h3>
            <p className="text-xs text-emerald-400 mb-4">
              {activeMessageDoctor.specialty} · {activeMessageDoctor.room}
            </p>

            {messageSentSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <p className="text-sm font-semibold text-white">
                  Dispatch transmitted through the astral telegraph!
                </p>
                <p className="text-xs text-neutral-400">
                  {activeMessageDoctor.name} will respond during next dimensional rounds.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Symptoms / Clinical Inquiry:
                  </label>
                  <textarea
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="e.g., Doctor, my phantom joints have been creaking whenever it rains in the mortal realm..."
                    required
                    className="w-full bg-[#040605] border border-emerald-900/50 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveMessageDoctor(null)}
                    className="px-4 py-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white text-xs font-medium"
                  >
                    Dismiss
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-md transition-colors"
                  >
                    Send Astral Dispatch
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
