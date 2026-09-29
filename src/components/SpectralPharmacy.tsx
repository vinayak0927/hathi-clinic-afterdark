import React, { useState, useEffect } from 'react';
import { Pill, ShoppingBag, Sparkles, Check, AlertTriangle, ShieldCheck, Plus, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export interface PharmacyItem {
  id: string;
  name: string;
  fictionalCondition: string;
  category: 'Stabilizers' | 'Sedatives' | 'Restoratives' | 'Relics';
  price: string;
  availability: 'In Stock' | 'Rare Batch' | 'Brewing';
  drHathiNote: string;
  dosage: string;
  glowColor: string;
  isRestrictedClue?: boolean;
}

interface SpectralPharmacyProps {
  onTriggerClue: (clueId: string) => void;
}

export const SpectralPharmacy: React.FC<SpectralPharmacyProps> = ({ onTriggerClue }) => {
  const [items, setItems] = useState<PharmacyItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bag, setBag] = useState<PharmacyItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    fetch('/api/pharmacy')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Failed to load pharmacy:', err));
  }, []);

  const categories = ['all', 'Stabilizers', 'Sedatives', 'Restoratives', 'Relics'];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleAddToBag = (item: PharmacyItem) => {
    soundEngine.playChime();
    setBag((prev) => [...prev, item]);

    // If adding or inspecting the restricted medicine, trigger Clue 5
    if (item.isRestrictedClue) {
      soundEngine.playGlitch();
      onTriggerClue('clue5_restricted_rx');
    }
  };

  const handleRemoveFromBag = (index: number) => {
    soundEngine.playGlitch();
    setBag((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    soundEngine.playChime();
    setOrderConfirmed(true);
    setTimeout(() => {
      setBag([]);
      setOrderConfirmed(false);
      setIsBagOpen(false);
    }, 2400);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white font-display">
              Spectral Pharmacy
            </h2>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            "Prescriptions for everything that haunts you." · Compound Apothecary Wing
          </p>
        </div>

        {/* Prescription Bag Trigger */}
        <button
          onClick={() => {
            setIsBagOpen(true);
            soundEngine.playChime();
          }}
          className="relative px-4 py-2.5 rounded-xl bg-[#0B0F0D] hover:bg-[#111713] text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
        >
          <ShoppingBag className="w-4 h-4 text-emerald-400" />
          <span>Prescription Dispenser</span>
          {bag.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-black font-bold text-[10px] flex items-center justify-center font-mono-nums">
              {bag.length}
            </span>
          )}
        </button>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              soundEngine.playChime();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-[#0B0F0D] text-neutral-400 hover:text-white border border-white/5'
            }`}
          >
            {cat === 'all' ? 'All Formulations' : cat}
          </button>
        ))}
      </div>

      {/* Medication Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => {
          const isSecret = item.isRestrictedClue;

          return (
            <div
              key={item.id}
              className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative ${
                isSecret
                  ? 'glass-panel-danger border-red-500/50 hover:border-red-400'
                  : 'glass-panel hover:border-emerald-500/40'
              }`}
            >
              <div>
                {/* Bottle Visual Simulation */}
                <div
                  className="w-full h-32 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-white/5"
                  style={{
                    background: `radial-gradient(circle, ${item.glowColor}25 0%, #050706 75%)`,
                  }}
                >
                  <div className="text-4xl filter drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] animate-ghost-float">
                    {isSecret ? '☣️' : item.category === 'Sedatives' ? '🧪' : item.category === 'Restoratives' ? '🏺' : '💊'}
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] text-neutral-400 font-mono-nums">
                    {item.price}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className={`text-base font-bold font-display ${isSecret ? 'text-red-300' : 'text-white'}`}>
                    {item.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#0D1410] text-emerald-400 font-mono-nums border border-white/5">
                    {item.availability}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 font-medium mb-3">
                  For: {item.fictionalCondition}
                </p>

                <div className="p-3 rounded-xl bg-[#060907] border border-white/5 text-xs text-emerald-300/90 italic mb-4 leading-relaxed">
                  "{item.drHathiNote}"
                </div>

                <p className="text-[11px] text-neutral-400 mb-4">
                  <span className="text-neutral-500">Dosage: </span>
                  {item.dosage}
                </p>
              </div>

              <button
                onClick={() => handleAddToBag(item)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
                  isSecret
                    ? 'bg-red-600 hover:bg-red-500 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isSecret ? 'Examine Prescription' : 'Add to Prescription'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Prescription Dispenser Drawer */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#090E0B] border border-emerald-500/40 rounded-2xl p-6 shadow-2xl relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  Prescription Dispenser
                </h3>
              </div>
              <button
                onClick={() => setIsBagOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderConfirmed ? (
              <div className="p-8 text-center space-y-3 my-auto">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white font-display">
                  Prescription Teleported to Ghost Ward!
                </h4>
                <p className="text-xs text-neutral-400">
                  Your tinctures will materialize beside your gravestone or designated haunting spot shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {bag.length === 0 ? (
                    <div className="p-8 text-center text-xs text-neutral-400">
                      No supernatural medications added. Select a tincture from the apothecary.
                    </div>
                  ) : (
                    bag.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#050806] border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-[11px] text-neutral-400">{item.fictionalCondition}</p>
                          <span className="text-[10px] text-emerald-400 font-mono-nums">{item.price}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveFromBag(idx)}
                          className="text-red-400 hover:text-red-300 text-xs px-2 py-1"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {bag.length > 0 && (
                  <div className="pt-4 border-t border-emerald-900/40 mt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-neutral-300">
                      <span>Total Formulas:</span>
                      <span className="font-bold text-emerald-400 font-mono-nums">{bag.length} Items</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase transition-colors shadow-lg active:scale-95"
                    >
                      Authorize Spectral Dispensation
                    </button>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
