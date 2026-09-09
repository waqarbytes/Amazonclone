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
  fullName: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Order {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: {
    type: 'card' | 'prime_store_card';
    lastFour: string;
    cardHolder: string;
  };
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  deliveryDate: string;
  status: 'ordered' | 'shipped' | 'out_for_delivery' | 'delivered';
}

export interface FilterState {
  category: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  primeOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}
