import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-[#030504] border-t border-emerald-950/60 mt-16 pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl select-none">🐘</span>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                HATHI AFTERDARK
              </span>
            </div>
            <p className="text-sm text-emerald-400 font-display italic">
              "Even ghosts need a doctor."
            </p>
            <p className="text-xs text-neutral-400">
              24/7 supernatural healthcare for everything that haunts you.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-neutral-400">
            <button onClick={() => onSelectTab('clinic')} className="hover:text-emerald-400 transition-colors">Clinic</button>
            <button onClick={() => onSelectTab('doctors')} className="hover:text-emerald-400 transition-colors">Doctors</button>
            <button onClick={() => onSelectTab('aidoctor')} className="hover:text-emerald-400 transition-colors">H.A.U.N.T. AI</button>
            <button onClick={() => onSelectTab('pharmacy')} className="hover:text-emerald-400 transition-colors">Pharmacy</button>
            <button onClick={() => onSelectTab('appointments')} className="hover:text-emerald-400 transition-colors">Appointments</button>
            <button onClick={() => onSelectTab('drhathi')} className="hover:text-emerald-400 transition-colors">About Dr. Hathi</button>
            <button onClick={() => onSelectTab('queue')} className="hover:text-emerald-400 transition-colors">Afterlife Queue</button>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="text-center sm:text-left max-w-2xl text-[11px] leading-relaxed">
            Disclaimer: Hathi Afterdark is an original fictional supernatural simulation created for entertainment and creative showcase purposes. It does not offer real-world medical advice, human diagnosis, or medical treatment.
          </p>

          <p className="text-right text-[11px] font-mono-nums shrink-0">
            © 2026 Hathi Afterdark · All Dimensions Reserved
          </p>
        </div>

      </div>
    </footer>
  );
};
