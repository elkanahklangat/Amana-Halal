import { MenuItem, FamilyBundle, VideoStory, PastOrder, LoyaltyProfile } from '../types';

import heroImg from '../assets/images/hero_amana_grill_1790918466763.jpg';
import mbuziImg from '../assets/images/dish_mbuzi_choma_1790918478629.jpg';
import steaksImg from '../assets/images/dish_halal_steaks_1790918489371.jpg';
import seafoodImg from '../assets/images/dish_swahili_seafood_1790918499933.jpg';
import veggieImg from '../assets/images/dish_veggie_platter_1790918511332.jpg';

export const HERO_IMAGE = heroImg;

export const MENU_ITEMS: MenuItem[] = [
  // MEAT - Halal Butchery & Grill
  {
    id: 'mbuzi-choma-prime',
    name: 'Prime Mbuzi Choma (Roasted Goat Ribs)',
    category: 'meat',
    price: 1850,
    portion: '1 kg (Serves 2-3)',
    description: 'Tender highland goat slow-roasted over acacia charcoal with sea salt and garlic crust. Served with fresh kachumbari.',
    image: mbuziImg,
    isReadyNow: true,
    isTrending: true,
    trendingCount: 38,
    prepTimeMinutes: 15,
    availableCuts: ['Ribs & Flank', 'Shoulder Cut', 'Leg Roast', 'Mixed Choma'],
    defaultSpice: 'Medium',
    allowCustomSpice: true,
    halalCertified: true,
  },
  {
    id: 'aged-ribeye-steak',
    name: 'Halal Aged Beef Ribeye Steak',
    category: 'meat',
    price: 1650,
    portion: '500g (Prime cut)',
    description: 'Grain-fed 21-day dry aged halal beef ribeye with rich marbling. Available freshly cut or charcoal-seared to order.',
    image: steaksImg,
    isReadyNow: false,
    isTrending: true,
    trendingCount: 24,
    prepTimeMinutes: 25,
    availableCuts: ['Thick Cut (1.5 inch)', 'Standard Cut', 'Bone-in Cowboy', 'Boneless Medallions'],
    defaultSpice: 'Mild',
    allowCustomSpice: true,
    halalCertified: true,
  },
  {
    id: 'swahili-beef-biryani',
    name: 'Amana Dum Beef Biryani',
    category: 'meat',
    price: 950,
    portion: 'Single generous portion',
    description: 'Fragrant basmati rice layered with caramelized onions, saffron, and tender halal beef chunks slow-simmered in yoghurt curry.',
    image: heroImg,
    isReadyNow: true,
    isTrending: true,
    trendingCount: 42,
    prepTimeMinutes: 10,
    availableCuts: ['Standard Portion', 'Double Meat'],
    defaultSpice: 'Medium',
    allowCustomSpice: true,
    halalCertified: true,
  },
  {
    id: 'charcoal-beef-kebab',
    name: 'Charcoal Halal Kebab Skewers',
    category: 'meat',
    price: 650,
    portion: '4 Large Skewers',
    description: 'Hand-minced prime beef infused with fresh coriander, ginger, cumin, and mild green chillies grilled over red-hot coals.',
    image: steaksImg,
    isReadyNow: true,
    isTrending: false,
    trendingCount: 19,
    prepTimeMinutes: 12,
    availableCuts: ['Minced Beef', 'Minced Goat / Mbuzi'],
    defaultSpice: 'Spicy',
    allowCustomSpice: true,
    halalCertified: true,
  },
  {
    id: 'whole-halal-chicken-roast',
    name: 'Tandoori-Marinated Whole Spring Chicken',
    category: 'meat',
    price: 1400,
    portion: 'Whole chicken (approx 1.3kg)',
    description: 'Juicy halal spring chicken marinated for 12 hours in fresh lemon, garlic, ginger, and Kashmiri spices.',
    image: heroImg,
    isReadyNow: false,
    isTrending: false,
    trendingCount: 15,
    prepTimeMinutes: 35,
    availableCuts: ['Spatchcock Charcoal Grilled', 'Cut into 8 Pieces', 'Raw Butchery Pack (Marinated)'],
    defaultSpice: 'Medium',
    allowCustomSpice: true,
    halalCertified: true,
  },
  {
    id: 'prime-halal-beef-mince',
    name: 'Lean Ground Beef (Keema) - Raw Butchery Cut',
    category: 'meat',
    price: 980,
    portion: '1 kg vacuum pack',
    description: 'Freshly minced 85/15 lean halal beef cut prepared on-demand by our butcher block at Legend Valley. Clean & sealed.',
    image: steaksImg,
    isReadyNow: true,
    isTrending: false,
    trendingCount: 12,
    prepTimeMinutes: 10,
    availableCuts: ['Extra Fine Mince', 'Coarse Burger Grind', 'Double Mince'],
    defaultSpice: 'Mild',
    allowCustomSpice: false,
    halalCertified: true,
  },

  // SEAFOOD
  {
    id: 'swahili-garlic-king-prawns',
    name: 'Grilled Swahili Jumbo King Prawns',
    category: 'seafood',
    price: 2400,
    portion: '500g (Approx 8-10 jumbo prawns)',
    description: 'Fresh ocean catch split and seared in crushed garlic butter, fresh coriander, lime juice, and coastal black pepper.',
    image: seafoodImg,
    isReadyNow: false,
    isTrending: true,
    trendingCount: 29,
    prepTimeMinutes: 20,
    availableCuts: ['Butterfly Shell-on', 'Peeled & Deveined', 'Raw Chilled Pack'],
    defaultSpice: 'Medium',
    allowCustomSpice: true,
    halalCertified: true,
  },
  {
    id: 'mombasa-coconut-tilapia',
    name: 'Samaki wa Kupaka (Whole Tilapia in Coconut Curry)',
    category: 'seafood',
    price: 1600,
    portion: 'Whole Fish (approx 800g)',
    description: 'Charcoal-grilled Lake Victoria tilapia bathed in rich coconut cream spiced with tamarind, turmeric, and green chilies.',
    image: seafoodImg,
    isReadyNow: true,
    isTrending: true,
    trendingCount: 31,
    prepTimeMinutes: 15,
    availableCuts: ['Whole Grilled with Gravy', 'Crispy Dry Fried', 'Raw Scaled & Cleaned'],
    defaultSpice: 'Medium',
    allowCustomSpice: true,
    halalCertified: true,
  },
  {
    id: 'red-snapper-steaks',
    name: 'Red Snapper Steaks with Herb Butter',
    category: 'seafood',
    price: 1950,
    portion: '600g (2 thick center-cut steaks)',
    description: 'Deep-sea red snapper steak with tender flaky meat pan-seared with rosemary butter and capers.',
    image: seafoodImg,
    isReadyNow: false,
    isTrending: false,
    trendingCount: 11,
    prepTimeMinutes: 25,
    availableCuts: ['Pan-seared Cooked', 'Fresh Raw Butchery Cut'],
    defaultSpice: 'Mild',
    allowCustomSpice: true,
    halalCertified: true,
  },

  // VEGETARIAN
  {
    id: 'aromatic-swahili-pilau',
    name: 'Fragrant Swahili Vegetable Pilau Rice',
    category: 'vegetarian',
    price: 450,
    portion: 'Generous side portion',
    description: 'Long-grain basmati simmered in browned onions, whole cumin, cardamom pods, cinnamon, and vegetable broth.',
    image: veggieImg,
    isReadyNow: true,
    isTrending: true,
    trendingCount: 46,
    prepTimeMinutes: 5,
    availableCuts: ['Regular Plate', 'Family Bowl'],
    defaultSpice: 'Mild',
    allowCustomSpice: true,
    halalCertified: true,
  },
  {
    id: 'golden-crispy-samosas',
    name: 'Golden Spiced Vegetable Samosas',
    category: 'vegetarian',
    price: 350,
    portion: '4 crisp pastries',
    description: 'Flaky handmade triangular pastry filled with spiced green peas, potatoes, coriander, and sweet cumin.',
    image: veggieImg,
    isReadyNow: true,
    isTrending: true,
    trendingCount: 54,
    prepTimeMinutes: 5,
    availableCuts: ['Ready Hot & Crispy', 'Frozen Box of 12 for Home Fry'],
    defaultSpice: 'Medium',
    allowCustomSpice: false,
    halalCertified: true,
  },
  {
    id: 'fresh-kachumbari-salad',
    name: 'Lavington Fresh Kachumbari with Avocado',
    category: 'vegetarian',
    price: 300,
    portion: 'Bowl',
    description: 'Diced sweet red onions, ripe farm tomatoes, fresh Hass avocado, green chili peppers, and freshly squeezed lemon juice.',
    image: veggieImg,
    isReadyNow: true,
    isTrending: false,
    trendingCount: 22,
    prepTimeMinutes: 5,
    availableCuts: ['Mild (no chili)', 'Spicy (with fresh pili pili)'],
    defaultSpice: 'Medium',
    allowCustomSpice: true,
    halalCertified: true,
  },
  {
    id: 'layered-soft-chapati',
    name: 'Handmade Layered Chapatis',
    category: 'vegetarian',
    price: 240,
    portion: 'Pack of 4 warm chapatis',
    description: 'Traditional Kenyan soft layered flatbread prepared daily on the hot tava with pure vegetable ghee.',
    image: veggieImg,
    isReadyNow: true,
    isTrending: false,
    trendingCount: 37,
    prepTimeMinutes: 5,
    availableCuts: ['Hot & Ready', 'Pre-rolled Dough Pack'],
    defaultSpice: 'Mild',
    allowCustomSpice: false,
    halalCertified: true,
  },
  {
    id: 'maharagwe-coconut-beans',
    name: 'Swahili Maharagwe ya Nazi (Coconut Beans)',
    category: 'vegetarian',
    price: 480,
    portion: 'Bowl with 2 Chapatis',
    description: 'Red kidney beans gently stewed in thick coconut cream, garlic, onions, and mild ginger turmeric masala.',
    image: veggieImg,
    isReadyNow: true,
    isTrending: false,
    trendingCount: 16,
    prepTimeMinutes: 10,
    availableCuts: ['Standard Portion'],
    defaultSpice: 'Mild',
    allowCustomSpice: true,
    halalCertified: true,
  }
];

export const FAMILY_BUNDLES: FamilyBundle[] = [
  {
    id: 'bundle-lavington-feast',
    title: 'Lavington Weekend Family Choma Feast',
    originalPrice: 5100,
    discountedPrice: 4200,
    savingsPercent: 18,
    serves: '4 - 6 People',
    description: 'Our signature weekend feast prepared hot over glowing charcoal embers at Legend Valley. Complete with traditional sides.',
    itemsIncluded: [
      '1.5kg Prime Mbuzi Choma (Roasted Goat Ribs)',
      '4 Charcoal Grilled Halal Beef Kebabs',
      'Large Platter Fragrant Swahili Pilau Rice',
      'Fresh Avocado Kachumbari Bowl',
      '4 Warm Handmade Chapatis',
      'House Chili & Tamarind Dip Sauces'
    ],
    image: mbuziImg,
    tag: 'Best Seller for Families'
  },
  {
    id: 'bundle-bbq-butchery-box',
    title: 'Jambo BBQ Butchery Master Pack',
    originalPrice: 4600,
    discountedPrice: 3850,
    savingsPercent: 16,
    serves: 'Family BBQ (5 - 8 People)',
    description: 'Raw butchery cuts seasoned and vacuum-sealed for your home grill or weekend cookout.',
    itemsIncluded: [
      '1kg Aged Halal Ribeye Steaks (Pre-marinated or Plain)',
      '1kg Lean Ground Keema Mince',
      '1kg Seasoned Chicken Drumsticks & Thighs',
      'Amana House Secret BBQ Rub Shaker Jar'
    ],
    image: steaksImg,
    tag: 'Weekend Cookout Pick'
  },
  {
    id: 'bundle-coastal-seafood-pack',
    title: 'Swahili Coastal Seafood Gathering Pack',
    originalPrice: 5400,
    discountedPrice: 4500,
    savingsPercent: 17,
    serves: '3 - 4 People',
    description: 'A luxurious coastal feast featuring fresh wild catch and ocean king prawns seasoned Swahili-style.',
    itemsIncluded: [
      '1 Whole Mombasa Coconut Tilapia (Samaki wa Kupaka)',
      '500g Jumbo Garlic Butter King Prawns',
      'Aromatic Coconut Rice Platter',
      'Fresh Lime Kachumbari & Tamarind Chutney'
    ],
    image: seafoodImg,
    tag: 'Chef Special'
  },
  {
    id: 'bundle-halal-weekly-saver',
    title: 'Halal Weekday Kitchen Saver Box',
    originalPrice: 4800,
    discountedPrice: 3900,
    savingsPercent: 19,
    serves: 'Weekly Family Meal Prep',
    description: 'Fresh prime cuts trimmed and portioned by our master butchers for family stews, stir fries, and roasts.',
    itemsIncluded: [
      '1.5kg Premium Beef Stew Cuts (Bone-in or Boneless)',
      '1kg Diced Tender Goat Meat (Mbuzi)',
      '1kg Fresh Skinless Halal Chicken Breast Fillets',
      'Complimentary Garlic & Herb Marinade Bag'
    ],
    image: steaksImg,
    tag: '19% Family Savings'
  }
];

export const VIDEO_STORIES: VideoStory[] = [
  {
    id: 'story-mbuzi-charcoal',
    title: 'Acacia Charcoal Sizzle',
    subtitle: 'Mbuzi Choma roasting on the open pit',
    updatedAgo: 'Updated 5 mins ago',
    thumbnail: mbuziImg,
    category: 'Live Pit',
    durationSeconds: 15,
    dishId: 'mbuzi-choma-prime',
    dishName: 'Prime Mbuzi Choma',
    dishPrice: 1850,
    description: 'Live from our Legend Valley butchery pit: Watch the butcher flip fresh goat ribs glazed with salted sea butter and garlic oil.'
  },
  {
    id: 'story-butcher-block',
    title: 'Master Butcher Ribeye Cut',
    subtitle: 'Hand-trimming 21-day dry aged beef',
    updatedAgo: 'Updated 12 mins ago',
    thumbnail: steaksImg,
    category: 'Butcher Block',
    durationSeconds: 18,
    dishId: 'aged-ribeye-steak',
    dishName: 'Aged Beef Ribeye Steak',
    dishPrice: 1650,
    description: 'Our head butcher sharpening the Damascus steel blade and hand-carving thick marble ribeye steaks for dinner orders.'
  },
  {
    id: 'story-swahili-curry',
    title: 'Coastal Coconut Pot',
    subtitle: 'Whole Tilapia simmered in coconut milk',
    updatedAgo: 'Updated 22 mins ago',
    thumbnail: seafoodImg,
    category: 'Gourmet Kitchen',
    durationSeconds: 20,
    dishId: 'mombasa-coconut-tilapia',
    dishName: 'Samaki wa Kupaka',
    dishPrice: 1600,
    description: 'Bubbling freshly grated coastal coconut cream blended with turmeric, tamarind, and grilled fresh tilapia fish.'
  },
  {
    id: 'story-fresh-samosas',
    title: 'Hot Counter Rolling',
    subtitle: 'Golden samosas & hot chapatis ready',
    updatedAgo: 'Updated 34 mins ago',
    thumbnail: veggieImg,
    category: 'Hot Counter',
    durationSeconds: 14,
    dishId: 'golden-crispy-samosas',
    dishName: 'Golden Spiced Samosas',
    dishPrice: 350,
    description: 'Golden-brown crispiness coming out of the fryer right now onto our hot display shelf ready for instant dispatch.'
  }
];

export const DEMO_PAST_ORDERS: PastOrder[] = [
  {
    id: 'AMN-8942',
    date: 'Yesterday, 7:15 PM',
    items: [
      { name: 'Prime Mbuzi Choma (1 kg, Medium Spice)', quantity: 1, price: 1850 },
      { name: 'Fragrant Swahili Vegetable Pilau Rice', quantity: 2, price: 900 },
      { name: 'Fresh Kachumbari with Avocado', quantity: 1, price: 300 }
    ],
    totalKES: 3050,
    status: 'Delivered',
    deliveryAddress: 'Lavington, Greenview Villas, Apt 4B'
  },
  {
    id: 'AMN-8720',
    date: 'Sep 27, 2026',
    items: [
      { name: 'Halal Aged Beef Ribeye Steak (Raw Chilled)', quantity: 2, price: 3300 },
      { name: 'Handmade Layered Chapatis', quantity: 1, price: 240 }
    ],
    totalKES: 3540,
    status: 'Delivered',
    deliveryAddress: 'Kilimani, Dennis Pritt Rd'
  }
];

export const DEMO_LOYALTY: LoyaltyProfile = {
  name: 'Elkanah',
  phone: '+254 705 124404',
  tier: 'Gold Halal VIP',
  points: 680,
  pointsToNextTier: 320,
  totalSavedKES: 2450,
  pastOrdersCount: 6
};

export const NAIROBI_NEIGHBORHOODS = [
  { name: 'Lavington (Legend Valley & nearby)', feeKES: 150, estimateMins: '25-35 mins' },
  { name: 'Kilimani & Hurlingham', feeKES: 200, estimateMins: '30-40 mins' },
  { name: 'Kileleshwa', feeKES: 200, estimateMins: '30-40 mins' },
  { name: 'Riverside & Westlands', feeKES: 250, estimateMins: '35-45 mins' },
  { name: 'Valley Arcade & Gitanga', feeKES: 150, estimateMins: '25-35 mins' },
  { name: 'Karen & Langata', feeKES: 350, estimateMins: '45-60 mins' },
  { name: 'Pick-Up at Legend Valley Butchery Counter', feeKES: 0, estimateMins: 'Ready in 15 mins' }
];

export const WHATSAPP_PHONE = '+254705124404';
export const WHATSAPP_DISPLAY = '+254 705 124404';
export const LOCATION_NAME = 'Legend Valley Business Park, Lavington, Nairobi';
