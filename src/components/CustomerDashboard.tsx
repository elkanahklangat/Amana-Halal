import React from 'react';
import { Play, RotateCcw, Clock, Sparkles, MapPin, Award, ArrowRight } from 'lucide-react';
import { VIDEO_STORIES, DEMO_PAST_ORDERS, DEMO_LOYALTY, LOCATION_NAME } from '../data/menuData';
import { VideoStory, PastOrder } from '../types';

interface CustomerDashboardProps {
  onSelectStory: (story: VideoStory) => void;
  onReorder: (order: PastOrder) => void;
  onOpenLoyalty: () => void;
  onNavigateToReady: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  onSelectStory,
  onReorder,
  onOpenLoyalty,
  onNavigateToReady,
}) => {
  return (
    <section className="bg-neutral-900/60 border-b border-neutral-800/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Personalized Greeting Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{LOCATION_NAME}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-semibold">Kitchen & Butchery Live</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
              Karibu tena, {DEMO_LOYALTY.name}
            </h1>
            <p className="text-sm text-neutral-300 max-w-2xl">
              Fresh halal butcher cuts trimmed daily, hot Mbuzi Choma on the coals, and express delivery across Lavington.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Loyalty Quick Pill -> now styled cleanly as interactive action card */}
            <button
              onClick={onOpenLoyalty}
              className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-neutral-400">Amana Rewards Club</div>
                <div className="text-sm font-bold text-amber-400 tabular-nums">
                  {DEMO_LOYALTY.points} Points <span className="text-xs font-normal text-neutral-400">({DEMO_LOYALTY.tier})</span>
                </div>
              </div>
            </button>

            <button
              onClick={onNavigateToReady}
              className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>See Hot Counter Dishes</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Video Stories / Kitchen Feeds: "Updated 5 minutes ago" */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-200">
                Live Kitchen Stories & Butcher Cuts
              </h2>
            </div>
            <span className="text-xs text-neutral-400">
              Updated 5 mins ago at Legend Valley
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VIDEO_STORIES.map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 hover:border-amber-500/50 transition-all duration-200 aspect-[4/3] flex flex-col justify-end p-3"
              >
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                <div className="relative z-10 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-amber-300 font-medium">
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3 fill-amber-300" />
                      {story.category}
                    </span>
                    <span className="text-neutral-300 font-mono text-[10px]">{story.updatedAgo}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-[11px] text-neutral-300 line-clamp-1">
                    {story.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Order History with 1-Click Reorder */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-200">
              Your Recent Orders in Lavington
            </h2>
            <span className="text-xs text-neutral-400">Re-order your favorite cuts instantly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_PAST_ORDERS.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span className="font-mono text-neutral-300">{order.id}</span>
                    <span aria-hidden="true">·</span>
                    <Clock className="w-3 h-3 text-neutral-500" />
                    <span>{order.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-medium">{order.status}</span>
                  </div>
                  <div className="text-xs text-neutral-200 font-medium line-clamp-2">
                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                  <div className="text-xs text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{order.deliveryAddress}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
                  <div className="text-sm font-bold text-amber-400 font-mono tabular-nums">
                    KES {order.totalKES.toLocaleString()}
                  </div>
                  <button
                    onClick={() => onReorder(order)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-Order (1-Click)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
