import React from 'react';
import { ShoppingBag, MessageCircle, Clock, Gift } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/menuData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenLoyalty: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenTracker,
  onOpenLoyalty,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single element brand wordmark */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-xl md:text-2xl font-bold tracking-tight text-amber-50 font-serif hover:text-amber-400 transition-colors text-left"
        >
          Amana Halal Butchery
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <button
            onClick={() => onNavigate('ready-now')}
            className={`transition-colors hover:text-amber-400 ${
              activeSection === 'ready-now' ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-400/60' : ''
            }`}
          >
            Ready Now
          </button>
          <button
            onClick={() => onNavigate('menu')}
            className={`transition-colors hover:text-amber-400 ${
              activeSection === 'menu' ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-400/60' : ''
            }`}
          >
            Butchery & Menu
          </button>
          <button
            onClick={() => onNavigate('bundles')}
            className={`transition-colors hover:text-amber-400 ${
              activeSection === 'bundles' ? 'text-amber-400 font-semibold underline underline-offset-8 decoration-amber-400/60' : ''
            }`}
          >
            Family Bundles
          </button>
          <button
            onClick={onOpenTracker}
            className="flex items-center gap-1.5 transition-colors hover:text-amber-400"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Track Order</span>
          </button>
          <button
            onClick={onOpenLoyalty}
            className="flex items-center gap-1.5 transition-colors hover:text-amber-400"
          >
            <Gift className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rewards</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE.replace('+', '')}?text=Habari%20Amana%20Halal%20Butchery!%20I%20would%20like%20to%20inquire%20about%20today's%20fresh%20cuts%20and%20ready%20dishes.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-lg transition-colors whitespace-nowrap"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>+254 705 124404</span>
          </a>

          <button
            onClick={onOpenCart}
            aria-label={`Shopping Cart with ${cartCount} items`}
            className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-neutral-950" />
            <span>Cart</span>
            <span className="inline-flex items-center justify-center ml-1 px-1.5 py-0.5 text-xs font-bold bg-neutral-950 text-amber-400 rounded-full tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
