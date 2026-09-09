export type ProductCategory = 
  | 'all' 
  | 'electronics' 
  | 'computers' 
  | 'home' 
  | 'fashion' 
  | 'books' 
  | 'beauty';

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number; // e.g. 4.6
  reviewCount: number;
  isPrime: boolean;
  isBestSeller?: boolean;
  isDeal?: boolean;
  inStock: boolean;
  stockCount?: number;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface ShippingAddress {
  id?: string;
  fullName: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export type DeliverySpeed = 'free_prime' | 'standard' | 'priority';

export interface DeliveryOption {
  id: DeliverySpeed;
  title: string;
  speedText: string;
  price: number;
  estimatedDate: string;
}

export type PaymentType = 'card' | 'upi' | 'cod' | 'prime_store_card';

export interface PaymentMethodInfo {
  type: PaymentType;
  lastFour?: string;
  cardHolder?: string;
  cardBrand?: string;
  expiry?: string;
  upiId?: string;
}

export interface PurchasedItem {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  orderId: string;
  createdAt: string;
  items: CartItem[] | PurchasedItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodInfo;
  deliveryOption?: DeliveryOption;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount?: number;
  total: number;
  deliveryDate: string;
  estimatedDeliveryDate?: string;
  trackingNumber?: string;
  status: 'ordered' | 'preparing' | 'shipped' | 'out_for_delivery' | 'delivered';
}

export interface FilterState {
  category: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  primeOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}
