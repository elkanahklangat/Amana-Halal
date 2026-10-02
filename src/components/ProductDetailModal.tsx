import React, { useState } from 'react';
import { X, Clock, ShieldCheck, Flame, Plus, Minus, Check } from 'lucide-react';
import { MenuItem, SpiceLevel, PrepStyle } from '../types';

interface ProductDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    spice: SpiceLevel,
    prepStyle: PrepStyle,
    cutPref: string,
    notes: string
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>(item.defaultSpice);
  const [selectedPrepStyle, setSelectedPrepStyle] = useState<PrepStyle>('Cooked & Ready to Eat');
  const [selectedCut, setSelectedCut] = useState<string>(item.availableCuts?.[0] || 'Standard Cut');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const spiceDescriptions: Record<SpiceLevel, string> = {
    Mild: 'Kawaida: Rich garlic, rosemary, cumin & sea salt with no chili heat',
    Medium: 'Pilipili Kiasi: Balanced warmth with aromatic green peppers',
    Spicy: 'Pilipili Kali: Authentic Swahili kick with habanero & red chillies',
    'Extra Hot': 'Moto Sana: Fiery bird’s eye chili marinade for true heat lovers'
  };

  const handleConfirm = () => {
    onAddToCart(item, quantity, selectedSpice, selectedPrepStyle, selectedCut, specialNotes);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-950/70 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-56 sm:h-64 w-full bg-neutral-950">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                <span className="text-amber-400 font-semibold uppercase tracking-wider">{item.category}</span>
                <span aria-hidden="true">·</span>
                <span>{item.portion}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-serif mt-0.5">
                {item.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-400 block">Item Price</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-400 font-mono tabular-nums">
                KES {item.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description & Halal Guarantee */}
          <div className="space-y-2">
            <p className="text-sm text-neutral-300 leading-relaxed">
              {item.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                100% Halal Verified
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-neutral-500" />
                Est. Prep Time: {item.prepTimeMinutes} mins
              </span>
              {item.isReadyNow && (
                <span className="text-emerald-400 font-medium">
                  Currently on the Hot Display Counter
                </span>
              )}
            </div>
          </div>

          {/* Prep Style (Cooked vs Raw Butchery Cut) */}
          <div className="space-y-2 pt-2 border-t border-neutral-800">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Select Preparation Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['Cooked & Ready to Eat', 'Raw Butchery Cut (Chilled)', 'Marinated BBQ Cut'] as PrepStyle[]).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setSelectedPrepStyle(style)}
                  className={`p-3 text-left rounded-xl border text-xs transition-colors cursor-pointer ${
                    selectedPrepStyle === style
                      ? 'bg-amber-400/10 border-amber-400 text-white font-semibold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <div className="font-medium">{style}</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    {style.includes('Cooked')
                      ? 'Hot from charcoal'
                      : style.includes('Raw')
                      ? 'Vacuum packed chilled'
                      : 'Spiced ready to grill'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cut Preference */}
          {item.availableCuts && item.availableCuts.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Butchery Cut / Portion Preference
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.availableCuts.map((cut) => (
                  <button
                    key={cut}
                    type="button"
                    onClick={() => setSelectedCut(cut)}
                    className={`px-3 py-2 text-xs rounded-lg border text-left transition-colors ${
                      selectedCut === cut
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-semibold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cut}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spice Level Adjustment */}
          {item.allowCustomSpice && (
            <div className="space-y-2.5 pt-2 border-t border-neutral-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Custom Spice Level Adjustment</span>
                </label>
                <span className="text-xs text-amber-400 font-semibold">{selectedSpice}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Mild', 'Medium', 'Spicy', 'Extra Hot'] as SpiceLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedSpice(level)}
                    className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedSpice === level
                        ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs">{level}</div>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-neutral-400 italic">
                {spiceDescriptions[selectedSpice]}
              </p>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2 pt-2 border-t border-neutral-800">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Special Butcher or Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Cut into small curry pieces, extra kachumbari, less oil..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Modal Footer with Quantity and Total Price */}
        <div className="p-6 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <div className="text-xs text-neutral-400">
              Quantity:
            </div>
            <div className="inline-flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center text-xs font-bold text-white font-mono tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-right sm:text-left ml-auto sm:ml-4">
              <div className="text-[11px] text-neutral-400">Total</div>
              <div className="text-lg font-bold text-amber-400 font-mono tabular-nums">
                KES {(item.price * quantity).toLocaleString()}
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold rounded-lg transition-all shadow-md cursor-pointer ${
              isSuccess
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
            }`}
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Order</span>
              </>
            ) : (
              <span>Add to Order · KES {(item.price * quantity).toLocaleString()}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
