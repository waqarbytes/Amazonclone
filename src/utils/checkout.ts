import { CartItem, DeliverySpeed, DeliveryOption } from '../types';

export const FREE_SHIPPING_THRESHOLD = 35.0;
export const TAX_RATE = 0.08875; // 8.875% NYC sales tax

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'free_prime',
    title: 'FREE Prime Delivery',
    speedText: 'Arrives Tomorrow',
    price: 0,
    estimatedDate: 'Tomorrow by 8 PM'
  },
  {
    id: 'standard',
    title: 'FREE Standard Shipping',
    speedText: 'Arrives in 3–5 business days',
    price: 0,
    estimatedDate: '3–5 business days'
  },
  {
    id: 'priority',
    title: 'Priority Express Delivery',
    speedText: 'Arrives Today',
    price: 14.99,
    estimatedDate: 'Today by 10 PM'
  }
];

export interface PriceBreakdown {
  subtotal: number;
  originalSubtotal: number;
  savings: number;
  shipping: number;
  tax: number;
  total: number;
  isFreeShippingEligible: boolean;
  remainingForFreeShipping: number;
}

export function calculateCheckoutTotals(
  items: CartItem[],
  deliverySpeed: DeliverySpeed = 'free_prime'
): PriceBreakdown {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const originalSubtotal = items.reduce(
    (sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const savings = Math.max(0, Math.round((originalSubtotal - subtotal) * 100) / 100);

  const isFreeShippingEligible = subtotal >= FREE_SHIPPING_THRESHOLD || items.every(i => i.product.isPrime);
  const remainingForFreeShipping = Math.max(0, Math.round((FREE_SHIPPING_THRESHOLD - subtotal) * 100) / 100);

  let shipping = 0;
  if (deliverySpeed === 'priority') {
    shipping = 14.99;
  } else if (deliverySpeed === 'standard' && !isFreeShippingEligible) {
    shipping = 5.99;
  } else {
    shipping = 0;
  }

  // Deterministic 2-decimal rounded tax
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    originalSubtotal: Math.round(originalSubtotal * 100) / 100,
    savings,
    shipping,
    tax,
    total,
    isFreeShippingEligible,
    remainingForFreeShipping
  };
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function generateOrderId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randStr = '';
  for (let i = 0; i < 6; i++) {
    randStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AMZ-${dateStr}-${randStr}`;
}

export function generateTrackingNumber(): string {
  const digits = Math.floor(1000000000 + Math.random() * 9000000000);
  return `TBA${digits}`;
}
