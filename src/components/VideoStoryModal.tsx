import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Play, Pause, ShoppingBag, Clock, Sparkles } from 'lucide-react';
import { VideoStory, MenuItem } from '../types';

interface VideoStoryModalProps {
  story: VideoStory | null;
  onClose: () => void;
  onOrderDish: (dishId: string) => void;
}

export const VideoStoryModal: React.FC<VideoStoryModalProps> = ({
  story,
  onClose,
  onOrderDish,
}) => {
  if (!story) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-progress bar simulation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // loop or could close
        }
        return prev + (100 / (story.durationSeconds * 10));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, story]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col aspect-[9/16] max-h-[85vh]">
        {/* Progress Bar Header */}
        <div className="absolute top-0 inset-x-0 z-20 p-3 bg-gradient-to-b from-black/80 to-transparent">
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-2">
            <div
              className="bg-amber-400 h-full transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wide">
                Live Kitchen Feed
              </span>
              <span className="text-[11px] text-amber-300 font-mono">
                {story.updatedAgo}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                aria-label="Close story"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Video / Visual Layer with simulated sizzle animation */}
        <div className="relative flex-1 w-full bg-neutral-950 overflow-hidden flex items-center justify-center">
          <img
            src={story.thumbnail}
            alt={story.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 animate-pulse duration-[4000ms]"
          />
          {/* Subtle warm ember light gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />

          {/* Sizzle / Live overlay badge */}
          <div className="absolute top-16 left-4 right-4 flex items-center justify-between text-xs text-amber-300 bg-neutral-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Legend Valley Butchery Pit
            </span>
            <span className="text-[10px] text-neutral-300 font-mono">
              Recorded in 4K HDR
            </span>
          </div>

          {/* Center Play/Pause toggle overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer group"
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            )}
          </button>
        </div>

        {/* Story Footer with Dish Details and CTA */}
        <div className="relative z-20 p-5 bg-neutral-950 border-t border-neutral-800 space-y-3">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              {story.category} · Legend Valley Kitchen
            </div>
            <h3 className="text-base font-bold text-white font-serif">
              {story.title}
            </h3>
            <p className="text-xs text-neutral-300 line-clamp-2">
              {story.description}
            </p>
          </div>

          {story.dishName && (
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
              <div>
                <div className="text-xs font-semibold text-white">
                  {story.dishName}
                </div>
                {story.dishPrice && (
                  <div className="text-sm font-bold text-amber-400 font-mono">
                    KES {story.dishPrice.toLocaleString()}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (story.dishId) {
                    onOrderDish(story.dishId);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order This Dish</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
