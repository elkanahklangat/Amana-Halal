import React from 'react';
import { Users, CheckCircle, Tag, Plus, ShoppingBag } from 'lucide-react';
import { FAMILY_BUNDLES } from '../data/menuData';
import { FamilyBundle } from '../types';

interface FamilyBundlesShowcaseProps {
  onAddBundle: (bundle: FamilyBundle) => void;
}

export const FamilyBundlesShowcase: React.FC<FamilyBundlesShowcaseProps> = ({
  onAddBundle,
}) => {
  return (
    <section id="bundles" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Tag className="w-3.5 h-3.5" />
            <span>Exclusive Family Savings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif mt-1">
            Discounted Family & Group Bundles
          </h2>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Generous portions designed for weekend family cookouts, home BBQs, and gatherings in Lavington. Save up to 20% compared to individual cuts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {FAMILY_BUNDLES.map((bundle) => (
          <div
            key={bundle.id}
            className="flex flex-col sm:flex-row bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-amber-500/40 transition-all duration-200"
          >
            {/* Image */}
            <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-neutral-950">
              <img
                src={bundle.image}
                alt={bundle.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-neutral-950 bg-amber-400 rounded">
                  Save {bundle.savingsPercent}%
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-neutral-200 font-medium">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>{bundle.serves}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                  {bundle.tag}
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {bundle.title}
                </h3>
                <p className="text-xs text-neutral-400">
                  {bundle.description}
                </p>

                {/* Items list */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">
                    Bundle Includes:
                  </div>
                  <ul className="space-y-1 text-xs text-neutral-300">
                    {bundle.itemsIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-500 line-through font-mono">
                    KES {bundle.originalPrice.toLocaleString()}
                  </div>
                  <div className="text-xl font-bold text-amber-400 font-mono tabular-nums">
                    KES {bundle.discountedPrice.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => onAddBundle(bundle)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Bundle to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
