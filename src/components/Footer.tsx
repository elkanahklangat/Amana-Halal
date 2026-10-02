import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, Mail } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY, LOCATION_NAME } from '../data/menuData';

interface FooterProps {
  onOpenTracker: () => void;
  onOpenLoyalty: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracker, onOpenLoyalty }) => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Halal Guarantee */}
          <div className="space-y-3 md:col-span-1">
            <h3 className="text-lg font-bold text-white font-serif tracking-tight">
              Amana Halal Butchery
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Premium artisanal halal butchery cuts, glowing charcoal grill dishes, and authentic Swahili coastal dining at Legend Valley Business Park, Lavington.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Halal Certified Kitchen</span>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Location & Hours
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{LOCATION_NAME}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div>Monday – Sunday</div>
                  <div className="text-neutral-300">7:30 AM – 10:00 PM Daily</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Ordering */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Inquiries & WhatsApp
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE.replace('+', '')}?text=Habari%20Amana%20Halal%20Butchery!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-500" />
                <span>Phone: {WHATSAPP_DISPLAY}</span>
              </li>
              <li className="text-[11px] text-neutral-500">
                Instant order confirmation & rider tracking via WhatsApp.
              </li>
            </ul>
          </div>

          {/* Quick Customer Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenTracker}
                  className="text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Real-Time Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLoyalty}
                  className="text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Amana Halal Club & Points
                </button>
              </li>
              <li>
                <span className="text-neutral-500">
                  Lavington · Kilimani · Kileleshwa · Westlands · Karen Delivery
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Amana Halal Butchery & Grill. Legend Valley Business Park, Lavington. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Strict Halal Slaughter Standards</span>
            <span aria-hidden="true">·</span>
            <span>Acacia Charcoal Kitchen</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
