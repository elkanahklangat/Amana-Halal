import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Tag, MessageCircle, Gift, ArrowRight, ShieldCheck, Check, Plus } from 'lucide-react';
import { CartItem, FamilyBundle, DeliverySchedule, LoyaltyProfile } from '../types';
import { FAMILY_BUNDLES, NAIROBI_NEIGHBORHOODS, WHATSAPP_PHONE, WHATSAPP_DISPLAY, LOCATION_NAME } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddBundleToCart: (bundle: FamilyBundle) => void;
  onOrderSuccess: (orderId: string, schedule: DeliverySchedule, totalKES: number) => void;
  loyalty: LoyaltyProfile;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onAddBundleToCart,
  onOrderSuccess,
  loyalty,
}) => {
  if (!isOpen) return null;

  // Delivery Scheduling state
  const [scheduleType, setScheduleType] = useState<'asap' | 'scheduled'>('asap');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('6:00 PM - 7:30 PM (Dinner Roast)');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(NAIROBI_NEIGHBORHOODS[0].name);
  const [deliveryAddress, setDeliveryAddress] = useState('Greenview Villas, Apt 4B, James Gichuru Rd');
  const [customerName, setCustomerName] = useState(loyalty.name || 'Elkanah');
  const [customerPhone, setCustomerPhone] = useState(loyalty.phone || '+254 705 124404');
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [deliveryNotes, setDeliveryNotes] = useState('Gate code 412, ring buzzer when downstairs');

  // Loyalty Points Redemption
  const [redeemOption, setRedeemOption] = useState<'none' | '250' | '500'>('none');

  // Time slots for scheduling
  const timeSlots = [
    '12:00 PM - 1:30 PM (Lunch Rush)',
    '2:30 PM - 4:00 PM (Afternoon Prep)',
    '6:00 PM - 7:30 PM (Dinner Roast)',
    '8:00 PM - 9:30 PM (Late Dinner Choma)',
    'Tomorrow 1:00 PM (Weekend Family BBQ)'
  ];

  // Price calculations
  const itemsSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const neighborhoodFee = NAIROBI_NEIGHBORHOODS.find((n) => n.name === selectedNeighborhood)?.feeKES || 150;

  const loyaltyDiscount = redeemOption === '250' ? 200 : redeemOption === '500' ? 350 : 0;
  const totalAmount = Math.max(0, itemsSubtotal + neighborhoodFee - loyaltyDiscount);
  const pointsToEarn = Math.floor(totalAmount / 10);

  const handleSubmitOrder = (viaWhatsApp: boolean) => {
    const generatedOrderId = `AMN-${Math.floor(1000 + Math.random() * 9000)}`;
    const schedule: DeliverySchedule = {
      type: scheduleType,
      date: selectedDate,
      timeSlot: scheduleType === 'asap' ? 'ASAP (25-35 mins)' : selectedTimeSlot,
      neighborhood: selectedNeighborhood,
      address: deliveryAddress,
      customerName,
      phoneNumber: customerPhone,
      whatsappUpdates,
      notes: deliveryNotes,
    };

    if (viaWhatsApp) {
      const itemsList = cartItems
        .map((i) => `• ${i.quantity}x ${i.name} [${i.spiceLevel} Spice / ${i.prepStyle}] - KES ${(i.price * i.quantity).toLocaleString()}`)
        .join('\n');

      const message = `Habari Amana Halal Butchery! I would like to place an order:
*Order #${generatedOrderId}*
Name: ${customerName}
Phone: ${customerPhone}
Schedule: ${schedule.type === 'asap' ? 'Express ASAP' : `${schedule.date} at ${schedule.timeSlot}`}
Delivery To: ${selectedNeighborhood}, ${deliveryAddress}
Notes: ${deliveryNotes || 'None'}

*Items Ordered:*
${itemsList}

Subtotal: KES ${itemsSubtotal.toLocaleString()}
Delivery Fee: KES ${neighborhoodFee.toLocaleString()}
${loyaltyDiscount > 0 ? `Loyalty Discount: -KES ${loyaltyDiscount.toLocaleString()}\n` : ''}*Total to Pay: KES ${totalAmount.toLocaleString()}*

Please confirm preparation and dispatch from Legend Valley Business Park. Asante!`;

      const waUrl = `https://wa.me/${WHATSAPP_PHONE.replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    }

    onOrderSuccess(generatedOrderId, schedule, totalAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Express Checkout & Delivery Scheduling</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif mt-0.5">
              Complete Your Amana Order
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* HIGHLIGHTED SECTION: DISCOUNTED FAMILY BUNDLES (Explicitly required on checkout page!) */}
          <div className="bg-gradient-to-r from-amber-950/40 via-neutral-900 to-amber-950/30 border border-amber-500/40 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Discounted Family Bundles · Add to this order & Save 18%
                </h3>
              </div>
              <span className="text-[11px] text-neutral-400">Special Checkout Deal</span>
            </div>

            <p className="text-xs text-neutral-300">
              Cooking for friends or family in Lavington? Add one of our signature discounted bundle packs directly to your delivery.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {FAMILY_BUNDLES.slice(0, 2).map((bundle) => {
                const isAlreadyInCart = cartItems.some((i) => i.name.includes(bundle.title));

                return (
                  <div
                    key={bundle.id}
                    className="flex items-center justify-between gap-3 p-3 bg-neutral-950/90 rounded-lg border border-neutral-800 hover:border-amber-400/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={bundle.image}
                        alt={bundle.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-white line-clamp-1">
                          {bundle.title}
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          {bundle.serves}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-amber-400 font-mono">
                            KES {bundle.discountedPrice.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-neutral-500 line-through">
                            KES {bundle.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddBundleToCart(bundle)}
                      disabled={isAlreadyInCart}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                        isAlreadyInCart
                          ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/40 cursor-default'
                          : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold'
                      }`}
                    >
                      {isAlreadyInCart ? '✓ Added' : '+ Add Deal'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2-Column Layout: Left = Scheduling & Address; Right = Order Summary & WhatsApp */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Delivery Scheduling & Destination (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery Schedule Options */}
              <div className="space-y-3 bg-neutral-950/70 p-4 rounded-xl border border-neutral-800">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Delivery Scheduling</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setScheduleType('asap')}
                    className={`p-3 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                      scheduleType === 'asap'
                        ? 'bg-amber-400/10 border-amber-400 text-white font-semibold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Express ASAP
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">25 - 35 mins in Lavington</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScheduleType('scheduled')}
                    className={`p-3 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                      scheduleType === 'scheduled'
                        ? 'bg-amber-400/10 border-amber-400 text-white font-semibold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      Schedule For Later
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">Pick date & time slot</div>
                  </button>
                </div>

                {/* Scheduled details if selected */}
                {scheduleType === 'scheduled' && (
                  <div className="pt-2 space-y-3 border-t border-neutral-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Select Date</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Preferred Time Slot</label>
                        <select
                          value={selectedTimeSlot}
                          onChange={(e) => setSelectedTimeSlot(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Destination & Contact Details */}
              <div className="space-y-4 bg-neutral-950/70 p-4 rounded-xl border border-neutral-800">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Delivery Address in Nairobi</span>
                </label>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Neighborhood Area</label>
                    <select
                      value={selectedNeighborhood}
                      onChange={(e) => setSelectedNeighborhood(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                    >
                      {NAIROBI_NEIGHBORHOODS.map((n) => (
                        <option key={n.name} value={n.name}>
                          {n.name} — KES {n.feeKES} ({n.estimateMins})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Street Address / Estate / Apartment</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. Legend Valley Rd, Sunset Court, Villa 12"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Phone Number (M-Pesa / Calls)</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Delivery Notes */}
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Delivery Instructions for Rider</label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Call upon reaching gate, leave with security..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary, Loyalty Redemption & WhatsApp Integration (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Order Items List */}
              <div className="bg-neutral-950/70 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Order Summary ({cartItems.length} items)
                </div>

                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-2 text-xs border-b border-neutral-800/60 pb-2">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-white">
                          {item.quantity}x {item.name}
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          {item.spiceLevel} Spice · {item.prepStyle}
                        </div>
                      </div>
                      <div className="font-mono text-neutral-200 tabular-nums">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Loyalty Points Redemption Box */}
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                      <Gift className="w-3.5 h-3.5 text-amber-400" />
                      Amana Club Points
                    </span>
                    <span className="font-bold text-white tabular-nums">{loyalty.points} pts available</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setRedeemOption(redeemOption === '250' ? 'none' : '250')}
                      className={`p-2 rounded text-[11px] text-left border transition-colors ${
                        redeemOption === '250'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div>Redeem 250 pts</div>
                      <div className="text-emerald-400 font-mono">-KES 200</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRedeemOption(redeemOption === '500' ? 'none' : '500')}
                      className={`p-2 rounded text-[11px] text-left border transition-colors ${
                        redeemOption === '500'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div>Redeem 500 pts</div>
                      <div className="text-emerald-400 font-mono">-KES 350</div>
                    </button>
                  </div>
                </div>

                {/* Pricing Totals */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-800 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Food Subtotal</span>
                    <span className="font-mono">KES {itemsSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Delivery ({selectedNeighborhood})</span>
                    <span className="font-mono">KES {neighborhoodFee.toLocaleString()}</span>
                  </div>
                  {loyaltyDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Loyalty Redemption</span>
                      <span className="font-mono">-KES {loyaltyDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                    <span>Total Amount</span>
                    <span className="font-mono text-amber-400 tabular-nums">
                      KES {totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 text-right">
                    + You will earn {pointsToEarn} Amana Club Points
                  </div>
                </div>
              </div>

              {/* WhatsApp Instant Integration Toggle */}
              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/50 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatsappUpdates}
                    onChange={(e) => setWhatsappUpdates(e.target.checked)}
                    className="mt-0.5 rounded border-emerald-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-emerald-300">
                      Send Instant Updates to WhatsApp ({WHATSAPP_DISPLAY})
                    </span>
                    <p className="text-[11px] text-neutral-300 mt-0.5">
                      Get real-time butcher status, live rider updates, and order receipt sent to your phone.
                    </p>
                  </div>
                </label>
              </div>

              {/* Order Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={() => handleSubmitOrder(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Order via WhatsApp (+254 705 124404)</span>
                </button>

                <button
                  onClick={() => handleSubmitOrder(false)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-colors cursor-pointer"
                >
                  <span>Place Order & Open Live Tracker</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
