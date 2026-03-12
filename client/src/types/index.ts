// Cuisine Types
export type CuisineType = 'nigerian' | 'continental' | 'fastfood';

// Menu Item Types
export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'nut-free' | 'halal';
export type SpiceLevel = 1 | 2 | 3;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  cuisine: CuisineType;
  images: string[];
  thumbnail: string;
  spiceLevel?: SpiceLevel;
  dietary: DietaryTag[];
  available: boolean;
  preparationTime: number; // in minutes
  calories?: number;
  popular?: boolean;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  allergens?: string[];
  ingredients?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  cuisine: CuisineType;
  description?: string;
  image?: string;
  itemCount: number;
}

// Cart Types
export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  customizations?: {
    name: string;
    price: number;
  }[];
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode?: string;
}

// Order Types
export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'on_the_way' 
  | 'delivered' 
  | 'cancelled';

export type PaymentMethod = 'card' | 'bank_transfer' | 'ussd';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface DeliveryAddress {
  id?: string;
  label?: string;
  street: string;
  city: string;
  state: string;
  zipCode?: string;
  landmark?: string;
  instructions?: string;
  lat?: number;
  lng?: number;
}

export interface DeliveryTimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  guestEmail?: string;
  guestPhone?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  deliveryAddress: DeliveryAddress;
  deliveryTime?: DeliveryTimeSlot;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  rider?: {
    name: string;
    phone: string;
    photo?: string;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  addresses: DeliveryAddress[];
  loyaltyPoints: number;
  loyaltyTier: LoyaltyTier;
  createdAt: Date;
  birthday?: Date;
  referrerId?: string;
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  discountPercent?: number;
  discountAmount?: number;
  freeItem?: MenuItem;
  expiresAt?: Date;
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  menuItemId: string;
  rating: number;
  comment: string;
  photos?: string[];
  createdAt: Date;
  helpful: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface CheckoutFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  deliveryAddress: DeliveryAddress;
  deliveryTime?: DeliveryTimeSlot;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'order' | 'feedback' | 'complaint';
}

// UI State Types
export interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  currentCuisine: CuisineType;
  selectedLocation: string;
}

// Animation Variants
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
}

export const cuisineThemes = {
  nigerian: {
    colors: {
      primary: '#E64A19',
      secondary: '#8B4513',
      accent: '#E67E22',
    },
    font: 'african',
    animation: 'steam',
  },
  continental: {
    colors: {
      primary: '#0B1E33',
      secondary: '#BF9E7B',
      accent: '#722F37',
    },
    font: 'elegant',
    animation: 'elegant-fade',
  },
  fastfood: {
    colors: {
      primary: '#D32F2F',
      secondary: '#FBC02D',
      accent: '#F57C00',
    },
    font: 'fun',
    animation: 'bounce-gentle',
  },
} as const;
