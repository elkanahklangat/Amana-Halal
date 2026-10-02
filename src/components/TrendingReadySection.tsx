import React, { useState } from 'react';
import { Flame, Clock, Plus, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { MenuItem, SpiceLevel } from '../types';

interface TrendingReadySectionProps {
  items: MenuItem[];
  onOpenItemModal: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, spice: SpiceLevel) => void;
}

export const TrendingReadySection: React.FC<TrendingReadySectionProps> = ({
  items,
  onOpenItemModal,
  onQuickAdd,
}) => {
  const [activeTab, setActiveTab] = useState<'ready' | 'trending'>('ready');
  const [selectedSpices, setSelectedSpices] = useState<Record<string, SpiceLevel>>({});
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const readyItems = items.filter((item) => item.isReadyNow);
  const trendingItems = items.filter((item) => item.isTrending);

  const displayList = activeTab === 'ready' ? readyItems : trendingItems;

  const handleSpiceChange = (itemId: string, spice: SpiceLevel) => {
    setSelectedSpices((prev) => ({ ...prev, [itemId]: spice }));
  };

  const handleAddWithFeedback = (item: MenuItem) => {
    const spice = selectedSpices[item.id] || item.defaultSpice;
    onQuickAdd(item, spice);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="ready-now" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Section Header with Segmented Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Kitchen & Hot Display</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif mt-1">
            {activeTab === 'ready' ? 'What Food Is Ready Right Now' : 'Trending Dishes in Lavington'}
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            {activeTab === 'ready'
              ? 'Hot in the counter at Legend Valley Business Park. Prepared and ready for immediate pickup or 25-min express delivery.'
              : 'Our most-ordered halal dishes this week across Lavington, Kilimani, and Westlands.'}
          </p>
        </div>

        {/* Segmented Filter Control */}
        <div className="inline-flex p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
          <button
            onClick={() => setActiveTab('ready')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'ready'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Hot Ready Counter ({readyItems.length})
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'trending'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Trending Now ({trendingItems.length})
          </button>
        </div>
      </div>

      {/* Grid of Dishes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayList.map((item) => {
          const currentSpice = selectedSpices[item.id] || item.defaultSpice;
          const isAdded = !!addedItemIds[item.id];

          return (
            <div
              key={item.id}
              className="group flex flex-col bg-neutral-900/80 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-200"
            >
              {/* Product Image */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 cursor-pointer"
                onClick={() => onOpenItemModal(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

                {/* Status indicators */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {item.isReadyNow && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 bg-neutral-950/80 backdrop-blur-md rounded border border-emerald-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Ready in Counter
                    </span>
                  )}
                  {item.isTrending && item.trendingCount && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-amber-300 bg-neutral-950/80 backdrop-blur-md rounded border border-amber-500/40">
                      <Flame className="w-3 h-3 text-amber-400" />
                      {item.trendingCount} ordered today
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                  <span className="flex items-center gap-1 text-[11px] font-medium text-neutral-300">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    {item.prepTimeMinutes} mins prep
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% Halal
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      onClick={() => onOpenItemModal(item)}
                      className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="text-[11px] text-neutral-400">
                    Portion: <span className="text-neutral-300">{item.portion}</span>
                  </div>
                </div>

                {/* Spice Level Adjustment Selector */}
                {item.allowCustomSpice && (
                  <div className="space-y-1.5 pt-2 border-t border-neutral-800">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400 font-medium">Spice Level:</span>
                      <span className="text-amber-400 font-semibold">{currentSpice}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 p-0.5 bg-neutral-950 rounded-lg border border-neutral-800">
                      {(['Mild', 'Medium', 'Spicy', 'Extra Hot'] as SpiceLevel[]).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleSpiceChange(item.id, level)}
                          className={`py-1 text-[10px] font-semibold rounded transition-colors whitespace-nowrap ${
                            currentSpice === level
                              ? 'bg-amber-400 text-neutral-950 font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price and Action Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                  <div>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider block">Price</span>
                    <span className="text-lg font-bold text-white font-mono tabular-nums">
                      KES {item.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenItemModal(item)}
                      className="px-2.5 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                      Customize
                    </button>

                    <button
                      onClick={() => handleAddWithFeedback(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Quick Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
