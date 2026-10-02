import React from 'react';
import { X, Award, Gift, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { LoyaltyProfile } from '../types';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  loyalty: LoyaltyProfile;
}

export const LoyaltyModal: React.FC<LoyaltyModalProps> = ({
  isOpen,
  onClose,
  loyalty,
}) => {
  if (!isOpen) return null;

  const rewards = [
    { points: 250, title: 'Free Spiced Samosas (3 pcs)', desc: 'Golden crispy pastry with hot chili dip', unlocked: loyalty.points >= 250 },
    { points: 400, title: 'Free Express Delivery in Lavington', desc: 'No delivery fee on your next order', unlocked: loyalty.points >= 400 },
    { points: 500, title: 'KES 350 Instant Voucher', desc: 'Deducted directly at checkout', unlocked: loyalty.points >= 500 },
    { points: 800, title: '500g Marinated BBQ Chicken Wings', desc: 'Vacuum-sealed ready to grill at home', unlocked: loyalty.points >= 800 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-amber-950/50 via-neutral-900 to-neutral-950 border-b border-neutral-800 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Amana Halal Club</span>
            </div>
            <h2 className="text-xl font-bold text-white font-serif">
              {loyalty.name}&apos;s Member Rewards
            </h2>
            <div className="text-xs text-neutral-300">
              Tier Status: <span className="font-bold text-amber-300">{loyalty.tier}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-white"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Points Balance Card */}
          <div className="p-5 bg-neutral-950 rounded-xl border border-amber-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-400">Available Points</div>
              <div className="text-3xl font-bold text-amber-400 font-mono tabular-nums">
                {loyalty.points}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                {loyalty.pointsToNextTier} points to unlock Platinum Butchery VIP
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-neutral-400">Lifetime Saved</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">
                KES {loyalty.totalSavedKES.toLocaleString()}
              </div>
              <div className="text-[11px] text-neutral-500">
                Across {loyalty.pastOrdersCount} orders
              </div>
            </div>
          </div>

          {/* Progress Bar to next tier */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-neutral-400">
              <span>{loyalty.tier}</span>
              <span>Platinum VIP (1,000 pts)</span>
            </div>
            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (loyalty.points / 1000) * 100)}%` }}
              />
            </div>
          </div>

          {/* Rewards List */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Redeemable Perks at Checkout</span>
            </h3>

            <div className="space-y-2.5">
              {rewards.map((r, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                    r.unlocked
                      ? 'bg-neutral-950 border-amber-500/40 text-white'
                      : 'bg-neutral-950/40 border-neutral-800 text-neutral-500'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{r.title}</span>
                      {r.unlocked && (
                        <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400">{r.desc}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold font-mono text-amber-400">
                      {r.points} pts
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to earn */}
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1 text-xs text-neutral-300">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How You Earn Points</span>
            </div>
            <p className="text-neutral-400">
              Earn 10 points for every KES 100 spent on butchery cuts, hot counter dishes, and family bundles. Points never expire.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
