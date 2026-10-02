import React, { useState, useMemo } from 'react';
import { Search, Flame, ShieldCheck, Clock, Plus, SlidersHorizontal, Check } from 'lucide-react';
import { MenuItem, FoodCategory, SpiceLevel } from '../types';

interface MenuCatalogProps {
  items: MenuItem[];
  onOpenItemModal: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, spice: SpiceLevel) => void;
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({
  items,
  onOpenItemModal,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterReadyOnly, setFilterReadyOnly] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories: { id: FoodCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Dishes & Cuts', count: items.length },
    { id: 'meat', label: 'Halal Meat & Butchery', count: items.filter((i) => i.category === 'meat').length },
    { id: 'seafood', label: 'Coastal Seafood', count: items.filter((i) => i.category === 'seafood').length },
    { id: 'vegetarian', label: 'Swahili Vegetarian', count: items.filter((i) => i.category === 'vegetarian').length },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Ready now filter
      if (filterReadyOnly && !item.isReadyNow) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesPortion = item.portion.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesPortion) {
          return false;
        }
      }
      return true;
    });
  }, [items, selectedCategory, filterReadyOnly, searchQuery]);

  const handleQuickAddFeedback = (item: MenuItem) => {
    onQuickAdd(item, item.defaultSpice);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
          Full Butchery Cuts & Gourmet Kitchen Menu
        </h2>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Carefully categorized into premium Halal meats, fresh coastal seafood, and authentic Swahili vegetarian dishes. Order cooked or raw cuts to prepare at home.
        </p>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl">
        {/* Category Tabs (Segmented Buttons) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Search & Ready Only Toggle */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search cuts, mbuzi, fish, pilau..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400/80"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={() => setFilterReadyOnly(!filterReadyOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              filterReadyOnly
                ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Ready Now Only</span>
          </button>
        </div>
      </div>

      {/* Grid of Menu Items */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-neutral-900/40 rounded-xl border border-neutral-800 space-y-3">
          <SlidersHorizontal className="w-8 h-8 mx-auto text-neutral-600" />
          <h3 className="text-base font-semibold text-neutral-300">No dishes match your selection</h3>
          <p className="text-xs text-neutral-500">
            Try adjusting your search keywords or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setFilterReadyOnly(false);
            }}
            className="px-4 py-2 text-xs font-semibold text-neutral-900 bg-amber-400 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isAdded = !!addedItemIds[item.id];

            return (
              <div
                key={item.id}
                className="group flex flex-col bg-neutral-900/90 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-200"
              >
                {/* Image */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />

                  {/* Corner Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {item.isReadyNow ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 bg-neutral-950/90 rounded border border-emerald-500/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Ready in Counter
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-300 bg-neutral-950/90 rounded border border-neutral-700">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        Cooked to Order
                      </span>
                    )}

                    {item.isTrending && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300 bg-neutral-950/90 rounded border border-amber-500/40">
                        <Flame className="w-3 h-3 text-amber-400" />
                        Trending
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                    <span className="text-[11px] font-medium text-neutral-300">
                      {item.prepTimeMinutes} mins prep
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Halal Certified
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] uppercase tracking-wider text-amber-400/90 font-semibold">
                      {item.category === 'meat' ? 'Halal Meat' : item.category === 'seafood' ? 'Seafood' : 'Vegetarian'}
                      <span className="text-neutral-500 font-normal"> · {item.portion}</span>
                    </div>

                    <h3
                      onClick={() => onOpenItemModal(item)}
                      className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Price</span>
                      <span className="text-base font-bold text-white font-mono tabular-nums">
                        KES {item.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenItemModal(item)}
                        className="px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                      >
                        Customize
                      </button>

                      <button
                        onClick={() => handleQuickAddFeedback(item)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
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
                            <span>Add</span>
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
      )}
    </section>
  );
};
