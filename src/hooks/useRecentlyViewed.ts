import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { products, getProductById } from '../data/products';

const RECENTLY_VIEWED_KEY = 'amazon_recently_viewed';
const MAX_RECENT_ITEMS = 10;

interface RecentItem {
  id: string;
  timestamp: number;
}

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useState<RecentItem[]>(() => {
    try {
      const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentIds));
    } catch (e) {
      console.warn('Failed to save recently viewed to localStorage', e);
    }
  }, [recentIds]);

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentIds(prev => {
      const filtered = prev.filter(item => item.id !== productId);
      const updated = [{ id: productId, timestamp: Date.now() }, ...filtered];
      return updated.slice(0, MAX_RECENT_ITEMS);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentIds([]);
    try {
      localStorage.removeItem(RECENTLY_VIEWED_KEY);
    } catch {
      // Ignored
    }
  }, []);

  // Map IDs to actual active product objects from catalog
  const recentProducts: Product[] = recentIds
    .map(item => getProductById(item.id))
    .filter((p): p is Product => p !== undefined);

  return {
    recentProducts,
    recentIds,
    addRecentlyViewed,
    clearRecentlyViewed
  };
}

export function getRecentlyViewedFromStorage(): Product[] {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!raw) return [];
    const parsed: RecentItem[] = JSON.parse(raw);
    return parsed
      .map(item => products.find(p => p.id === item.id))
      .filter((p): p is Product => p !== undefined)
      .slice(0, MAX_RECENT_ITEMS);
  } catch {
    return [];
  }
}
