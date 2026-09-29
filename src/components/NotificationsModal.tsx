import React from 'react';
import { Bell, X, Check, Activity, Calendar, Pill } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#090E0B] border border-emerald-500/40 rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        
        <div className="flex items-center justify-between border-b border-emerald-900/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-display">
              Supernatural Notifications
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                n.read
                  ? 'bg-[#050806] border-white/5 text-neutral-400'
                  : 'bg-emerald-950/30 border-emerald-500/30 text-neutral-200'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#0E1511] flex items-center justify-center shrink-0 text-emerald-400">
                {n.type === 'doctor' ? (
                  <Activity className="w-4 h-4" />
                ) : n.type === 'appointment' ? (
                  <Calendar className="w-4 h-4" />
                ) : (
                  <Pill className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{n.title}</p>
                <p className="text-[11px] text-neutral-300 mt-0.5 leading-relaxed">{n.message}</p>
                <span className="text-[10px] text-neutral-500 block mt-1 font-mono-nums">{n.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-emerald-900/30 mt-4 flex items-center justify-between">
          <button
            onClick={() => {
              onMarkAllRead();
              soundEngine.playChime();
            }}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
