import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, MapPin, Phone, MessageCircle, Navigation, ShieldCheck, Flame } from 'lucide-react';
import { WHATSAPP_PHONE, LOCATION_NAME } from '../data/menuData';

interface DeliveryTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
  destinationAddress?: string;
  itemsSummary?: string;
}

export const DeliveryTrackerModal: React.FC<DeliveryTrackerModalProps> = ({
  isOpen,
  onClose,
  orderId = 'AMN-9104',
  destinationAddress = 'Lavington, Greenview Villas, Apt 4B',
  itemsSummary = '1x Prime Mbuzi Choma, 2x Fragrant Pilau Rice, 1x Fresh Kachumbari',
}) => {
  if (!isOpen) return null;

  // Active tracking stage: 1 = Confirmed, 2 = Butchery prep, 3 = Grill & Packing, 4 = Out with courier, 5 = Delivered
  const [currentStep, setCurrentStep] = useState<number>(4);
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(18);

  const steps = [
    {
      step: 1,
      title: 'Order Confirmed',
      desc: 'Received at Legend Valley Business Park counter',
      time: '18 mins ago'
    },
    {
      step: 2,
      title: 'Butcher Trim & Seasoning',
      desc: 'Prime cuts trimmed & marinated with requested spice level',
      time: '12 mins ago'
    },
    {
      step: 3,
      title: 'Charcoal Grill & Packing',
      desc: 'Slow roasted on acacia charcoal & thermal sealed',
      time: '6 mins ago'
    },
    {
      step: 4,
      title: 'Out for Express Delivery',
      desc: 'Rider Juma is en route with thermal hot bag',
      time: 'In transit'
    },
    {
      step: 5,
      title: 'Delivered Hot & Steaming',
      desc: 'Direct handoff at your doorstep in Lavington',
      time: 'Pending'
    },
  ];

  // WhatsApp quick update text
  const whatsappUpdateUrl = `https://wa.me/${WHATSAPP_PHONE.replace('+', '')}?text=Habari!%20Could%20you%20please%20give%20me%20a%20live%20update%20on%20my%20Amana%20order%20%23${orderId}?%20Delivery%20to%20${encodeURIComponent(destinationAddress)}.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="p-6 bg-neutral-950 border-b border-neutral-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Real-Time Order Tracking</span>
            </div>
            <h2 className="text-xl font-bold text-white font-serif mt-1">
              Order #{orderId}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Dispatched from {LOCATION_NAME}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Estimated ETA Banner */}
          <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs text-amber-300 font-semibold uppercase tracking-wide">
                Estimated Delivery Arrival
              </div>
              <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
                {currentStep === 5 ? 'Delivered!' : `${estimatedMinutes} Minutes`}
              </div>
              <div className="text-xs text-neutral-300">
                Delivering to: <span className="font-semibold text-white">{destinationAddress}</span>
              </div>
            </div>

            <a
              href={whatsappUpdateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Instant Update</span>
            </a>
          </div>

          {/* Simulated Interactive Map Display */}
          <div className="relative h-44 w-full bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col justify-between p-4">
            {/* Map styling grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#amber-400_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-neutral-300 bg-neutral-900/90 px-2.5 py-1 rounded-md border border-neutral-800">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Legend Valley Park, Lavington</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-300 bg-neutral-900/90 px-2.5 py-1 rounded-md border border-neutral-800">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Rider Route</span>
              </div>
            </div>

            {/* Simulated route road line */}
            <div className="relative z-10 w-full flex items-center justify-between px-6 py-2">
              <div className="w-4 h-4 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
              <div className="flex-1 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500 mx-2 relative">
                {/* Pulsing rider pin */}
                <div
                  className="absolute -top-3 transition-all duration-500 flex flex-col items-center"
                  style={{ left: currentStep === 5 ? '95%' : currentStep === 4 ? '60%' : '15%' }}
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center font-bold text-[10px] shadow-lg animate-bounce">
                    🛵
                  </div>
                </div>
              </div>
              <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Kitchen & Butchery</span>
              <span className="text-white font-medium">Lavington Express Courier</span>
              <span>Your Doorstep</span>
            </div>
          </div>

          {/* Assigned Rider Info */}
          {currentStep >= 4 && (
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-lg">
                  👨🏾‍🍳
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Juma Mwangi (Amana Express Rider)</div>
                  <div className="text-[11px] text-neutral-400">
                    Motorbike: <span className="font-mono text-neutral-200">KMDG 832X</span> · Insulated Hot Box
                  </div>
                </div>
              </div>

              <a
                href={`tel:${WHATSAPP_PHONE}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-300 bg-neutral-900 hover:text-white rounded-lg border border-neutral-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Rider</span>
              </a>
            </div>
          )}

          {/* Timeline Stages */}
          <div className="space-y-4 pt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Kitchen & Delivery Stages
            </div>

            <div className="space-y-3">
              {steps.map((st) => {
                const isCompleted = currentStep > st.step;
                const isCurrent = currentStep === st.step;

                return (
                  <div
                    key={st.step}
                    className={`flex items-start gap-3.5 p-3 rounded-xl border transition-colors ${
                      isCurrent
                        ? 'bg-amber-400/10 border-amber-400/40 text-white'
                        : isCompleted
                        ? 'bg-neutral-950/60 border-neutral-800/80 text-neutral-300'
                        : 'bg-neutral-950/20 border-neutral-800/40 text-neutral-500'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full border-2 border-amber-400 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-neutral-700 flex items-center justify-center text-[10px] font-mono text-neutral-600">
                          {st.step}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{st.title}</span>
                        <span className="text-[11px] font-mono text-neutral-400">{st.time}</span>
                      </div>
                      <p className="text-xs text-neutral-400">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Simulation Controls for Demo */}
          <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Test Simulator Stage:</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setCurrentStep(s);
                    setEstimatedMinutes(s === 5 ? 0 : (5 - s) * 7);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono rounded ${
                    currentStep === s
                      ? 'bg-amber-400 text-neutral-950 font-bold'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Step {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            For urgent updates, call or WhatsApp <span className="text-emerald-400 font-semibold">+254 705 124404</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
