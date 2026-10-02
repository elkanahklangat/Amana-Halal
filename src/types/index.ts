export type FoodCategory = 'all' | 'ready_now' | 'meat' | 'seafood' | 'vegetarian' | 'bundles';

export type SpiceLevel = 'Mild' | 'Medium' | 'Spicy' | 'Extra Hot';

export type PrepStyle = 'Cooked & Ready to Eat' | 'Raw Butchery Cut (Chilled)' | 'Marinated BBQ Cut';

export interface MenuItem {
  id: string;
  name: string;
  category: 'meat' | 'seafood' | 'vegetarian';
  price: number; // in KES
  description: string;
  image: string;
  isReadyNow: boolean; // currently on the hot display counter
  isTrending: boolean;
  trendingCount?: number; // e.g. "24 ordered today"
  prepTimeMinutes: number;
  availableCuts?: string[];
  defaultSpice: SpiceLevel;
  allowCustomSpice: boolean;
  portion: string; // e.g. "1 kg", "Per portion", "500g"
  halalCertified: boolean;
}

export interface FamilyBundle {
  id: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  savingsPercent: number;
  serves: string; // e.g. "4 - 6 people"
  description: string;
  itemsIncluded: string[];
  image: string;
  tag: string;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  spiceLevel: SpiceLevel;
  prepStyle: PrepStyle;
  cutPreference?: string;
  specialInstructions?: string;
  image: string;
  isBundle?: boolean;
}

export interface VideoStory {
  id: string;
  title: string;
  subtitle: string;
  updatedAgo: string; // e.g. "Updated 5 mins ago"
  thumbnail: string;
  category: string;
  durationSeconds: number;
  dishId?: string;
  dishName?: string;
  dishPrice?: number;
  description: string;
}

export interface PastOrder {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  totalKES: number;
  status: 'Delivered' | 'In Progress' | 'Preparing';
  deliveryAddress: string;
}

export interface DeliverySchedule {
  type: 'asap' | 'scheduled';
  date: string; // YYYY-MM-DD
  timeSlot: string;
  neighborhood: string;
  address: string;
  customerName: string;
  phoneNumber: string;
  whatsappUpdates: boolean;
  notes?: string;
}

export interface LoyaltyProfile {
  name: string;
  phone: string;
  tier: 'Bronze' | 'Silver' | 'Gold Halal VIP';
  points: number;
  pointsToNextTier: number;
  totalSavedKES: number;
  pastOrdersCount: number;
}
