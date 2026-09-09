import { Order, ShippingAddress } from '../types';

const ORDERS_KEY = 'amazon_rebuild_orders_v1';
const ADDRESSES_KEY = 'amazon_rebuild_addresses_v1';

export const DEFAULT_ADDRESS: ShippingAddress = {
  id: 'addr-default-1',
  fullName: 'John Doe',
  street: '123 Main Street',
  apt: 'Apt 4B',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'United States',
  phone: '(555) 123-4567',
  isDefault: true
};

export function getSavedAddresses(): ShippingAddress[] {
  try {
    const raw = localStorage.getItem(ADDRESSES_KEY);
    if (!raw) {
      // Seed with default address directly without recursive saveAddress call
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify([DEFAULT_ADDRESS]));
      return [DEFAULT_ADDRESS];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [DEFAULT_ADDRESS];
  } catch (e) {
    console.warn('Could not read saved addresses, falling back to default', e);
    return [DEFAULT_ADDRESS];
  }
}

export function saveAddress(address: ShippingAddress): void {
  try {
    const addresses = getSavedAddresses();
    const existingIndex = addresses.findIndex(a => a.id === address.id);
    let updated: ShippingAddress[];

    if (existingIndex > -1) {
      updated = [...addresses];
      updated[existingIndex] = address;
    } else {
      const newAddr = {
        ...address,
        id: address.id || `addr-${Date.now()}`
      };
      updated = [newAddr, ...addresses];
    }

    // If marked default, unmark others
    if (address.isDefault) {
      updated = updated.map(a => ({
        ...a,
        isDefault: a.id === address.id
      }));
    }

    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save address', e);
  }
}

export function deleteAddress(addressId: string): void {
  try {
    const addresses = getSavedAddresses();
    const filtered = addresses.filter(a => a.id !== addressId);
    // Ensure at least one address remains
    const final = filtered.length > 0 ? filtered : [DEFAULT_ADDRESS];
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(final));
  } catch (e) {
    console.error('Failed to delete address', e);
  }
}

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) 
      ? parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : [];
  } catch (e) {
    console.warn('Could not read orders from localStorage', e);
    return [];
  }
}

export function getOrderById(orderId: string): Order | undefined {
  const orders = getOrders();
  return orders.find(o => o.orderId.toLowerCase() === orderId.toLowerCase());
}

export function saveOrder(order: Order): void {
  try {
    const orders = getOrders();
    const exists = orders.some(o => o.orderId === order.orderId);
    if (!exists) {
      const updated = [order, ...orders];
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
}
