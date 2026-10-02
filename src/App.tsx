/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CustomerDashboard } from './components/CustomerDashboard';
import { TrendingReadySection } from './components/TrendingReadySection';
import { MenuCatalog } from './components/MenuCatalog';
import { FamilyBundlesShowcase } from './components/FamilyBundlesShowcase';
import { ProductDetailModal } from './components/ProductDetailModal';
import { VideoStoryModal } from './components/VideoStoryModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { DeliveryTrackerModal } from './components/DeliveryTrackerModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { Footer } from './components/Footer';

import {
  MENU_ITEMS,
  HERO_IMAGE,
  DEMO_LOYALTY,
  WHATSAPP_PHONE,
  WHATSAPP_DISPLAY,
  LOCATION_NAME,
} from './data/menuData';
import {
  MenuItem,
  FamilyBundle,
  CartItem,
  SpiceLevel,
  PrepStyle,
  VideoStory,
  PastOrder,
  DeliverySchedule,
  LoyaltyProfile,
} from './types';
import { MessageCircle, ShieldCheck, Clock, Flame, Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation & section tracking
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-1',
      menuItemId: 'mbuzi-choma-prime',
      name: 'Prime Mbuzi Choma (Roasted Goat Ribs)',
      price: 1850,
      quantity: 1,
      spiceLevel: 'Medium',
      prepStyle: 'Cooked & Ready to Eat',
      cutPreference: 'Ribs & Flank',
      image: MENU_ITEMS[0].image,
    },
    {
      id: 'init-2',
      menuItemId: 'aromatic-swahili-pilau',
      name: 'Fragrant Swahili Vegetable Pilau Rice',
      price: 450,
      quantity: 2,
      spiceLevel: 'Mild',
      prepStyle: 'Cooked & Ready to Eat',
      cutPreference: 'Regular Plate',
      image: MENU_ITEMS[9].image,
    }
  ]);

  // Modals state
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [activeStory, setActiveStory] = useState<VideoStory | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);

  // Active tracked order info
  const [activeOrderId, setActiveOrderId] = useState<string>('AMN-9104');
  const [activeOrderAddress, setActiveOrderAddress] = useState<string>('Lavington, Greenview Villas, Apt 4B');
  const [loyalty, setLoyalty] = useState<LoyaltyProfile>(DEMO_LOYALTY);

  // Handlers for cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    spice: SpiceLevel,
    prepStyle: PrepStyle,
    cutPref: string,
    notes: string
  ) => {
    const newItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity,
      spiceLevel: spice,
      prepStyle,
      cutPreference: cutPref,
      specialInstructions: notes,
      image: item.image,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const handleQuickAdd = (item: MenuItem, spice: SpiceLevel) => {
    const existingIndex = cartItems.findIndex(
      (c) => c.menuItemId === item.id && c.spiceLevel === spice
    );

    if (existingIndex > -1) {
      setCartItems((prev) =>
        prev.map((c, idx) =>
          idx === existingIndex ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      const newItem: CartItem = {
        id: `${item.id}-${Date.now()}`,
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        spiceLevel: spice,
        prepStyle: item.isReadyNow ? 'Cooked & Ready to Eat' : 'Cooked & Ready to Eat',
        cutPreference: item.availableCuts?.[0],
        image: item.image,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
  };

  const handleAddBundle = (bundle: FamilyBundle) => {
    const newItem: CartItem = {
      id: `${bundle.id}-${Date.now()}`,
      menuItemId: bundle.id,
      name: bundle.title,
      price: bundle.discountedPrice,
      quantity: 1,
      spiceLevel: 'Medium',
      prepStyle: 'Cooked & Ready to Eat',
      cutPreference: bundle.serves,
      image: bundle.image,
      isBundle: true,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // 1-Click Reorder from Past Orders
  const handleReorder = (order: PastOrder) => {
    const reorderedItems: CartItem[] = order.items.map((i, idx) => {
      // Find matching item in menu if possible
      const matched = MENU_ITEMS.find((m) => i.name.includes(m.name)) || MENU_ITEMS[0];
      return {
        id: `reorder-${idx}-${Date.now()}`,
        menuItemId: matched.id,
        name: i.name,
        price: i.price / i.quantity,
        quantity: i.quantity,
        spiceLevel: 'Medium',
        prepStyle: 'Cooked & Ready to Eat',
        image: matched.image,
      };
    });

    setCartItems((prev) => [...prev, ...reorderedItems]);
    setIsCartOpen(true);
  };

  // Video story dish ordering
  const handleOrderStoryDish = (dishId: string) => {
    const dish = MENU_ITEMS.find((m) => m.id === dishId);
    if (dish) {
      setSelectedItemForModal(dish);
    }
  };

  // Order submission from Checkout
  const handleOrderSuccess = (orderId: string, schedule: DeliverySchedule, totalKES: number) => {
    setActiveOrderId(orderId);
    setActiveOrderAddress(`${schedule.neighborhood}, ${schedule.address}`);
    setIsCheckoutOpen(false);
    setCartItems([]); // clear basket
    // Update loyalty points (+10 per KES 100)
    const earnedPoints = Math.floor(totalKES / 10);
    setLoyalty((prev) => ({
      ...prev,
      points: prev.points + earnedPoints,
      pastOrdersCount: prev.pastOrdersCount + 1,
    }));
    // Open live tracker immediately
    setIsTrackerOpen(true);
  };

  // Smooth scroll helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* 3-Zone Compliant Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Storefront Hero Section */}
        <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
          <div className="absolute inset-0 z-0">
            <img
              src={HERO_IMAGE}
              alt="Amana Halal Butchery Grill Embers"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover opacity-25 brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-2xl space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Legend Valley Business Park, Lavington
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Halal Verified
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.1] text-balance">
                Artisanal Halal Butchery & Sizzling Charcoal Grill
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed text-balance">
                Fresh butcher cuts prepared to order, ready-to-eat hot counter dishes, coastal seafood, and Swahili vegetarian feasts. Delivered steaming hot to your doorstep in Lavington.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleNavigate('ready-now')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explore Ready Counter</span>
                </button>

                <button
                  onClick={() => handleNavigate('menu')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-neutral-200 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 rounded-xl transition-colors cursor-pointer"
                >
                  <span>View Online Menu & Cuts</span>
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_PHONE.replace('+', '')}?text=Habari%20Amana%20Halal%20Butchery!%20I'd%20like%20to%20order%20for%20delivery%20in%20Lavington.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-800/80 rounded-xl transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-neutral-400 border-t border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>25-35 Min Lavington Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Custom Spice Adjustments</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Strict Halal Standards</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Greeting Dashboard: Recent order history, loyalty, live stories updated 5 mins ago */}
        <CustomerDashboard
          onSelectStory={(story) => setActiveStory(story)}
          onReorder={handleReorder}
          onOpenLoyalty={() => setIsLoyaltyOpen(true)}
          onNavigateToReady={() => handleNavigate('ready-now')}
        />

        {/* What Food Is Ready Right Now & Trending Dishes */}
        <TrendingReadySection
          items={MENU_ITEMS}
          onOpenItemModal={(item) => setSelectedItemForModal(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Discounted Family Bundles Showcase */}
        <FamilyBundlesShowcase
          onAddBundle={handleAddBundle}
        />

        {/* Full Categorized Butchery & Kitchen Menu */}
        <MenuCatalog
          items={MENU_ITEMS}
          onOpenItemModal={(item) => setSelectedItemForModal(item)}
          onQuickAdd={handleQuickAdd}
        />
      </main>

      {/* Footer with Business Park address and WhatsApp */}
      <Footer
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
      />

      {/* Floating WhatsApp Action Button for Instant Inquiries */}
      <aside aria-label="WhatsApp quick contact">
        <a
          href={`https://wa.me/${WHATSAPP_PHONE.replace('+', '')}?text=Habari%20Amana%20Halal%20Butchery!%20I%20have%20an%20inquiry%20about%20your%20menu.`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all duration-200 hover:scale-105 cursor-pointer border border-emerald-400/40"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="text-xs font-bold hidden sm:inline">WhatsApp Order</span>
        </a>
      </aside>

      {/* MODALS */}
      {/* 1. Item Customization Modal */}
      <ProductDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Live Video Story Modal (Updated 5 mins ago) */}
      <VideoStoryModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onOrderDish={handleOrderStoryDish}
      />

      {/* 3. Slide-over Basket */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* 4. Express Checkout & Delivery Scheduling (With Highlighted Family Bundles) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onAddBundleToCart={handleAddBundle}
        onOrderSuccess={handleOrderSuccess}
        loyalty={loyalty}
      />

      {/* 5. Real-Time Delivery Tracker */}
      <DeliveryTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orderId={activeOrderId}
        destinationAddress={activeOrderAddress}
      />

      {/* 6. Loyalty Rewards Club Modal */}
      <LoyaltyModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        loyalty={loyalty}
      />
    </div>
  );
}
