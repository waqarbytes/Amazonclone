import { Product, ProductCategory } from '../types';
import { products, getProductById } from '../data/products';

// Category relationships for deterministic cross-category discovery
const COMPLEMENTARY_CATEGORIES: Record<ProductCategory, ProductCategory[]> = {
  electronics: ['computers', 'home'],
  computers: ['electronics'],
  home: ['electronics', 'beauty'],
  fashion: ['beauty'],
  books: ['electronics'],
  beauty: ['fashion', 'home'],
  all: ['electronics', 'computers', 'home', 'fashion', 'books', 'beauty']
};

export function getPersonalizedRecommendations(options: {
  currentProductId?: string;
  recentlyViewedIds?: string[];
  cartProductIds?: string[];
  limit?: number;
}): Product[] {
  const { currentProductId, recentlyViewedIds = [], cartProductIds = [], limit = 4 } = options;

  const excludedIds = new Set([
    ...(currentProductId ? [currentProductId] : []),
    ...cartProductIds
  ]);

  // If we have a current product or recently viewed products, prioritize their categories
  let primaryCategories: ProductCategory[] = [];
  if (currentProductId) {
    const current = getProductById(currentProductId);
    if (current) {
      primaryCategories.push(current.category);
    }
  }

  recentlyViewedIds.forEach(id => {
    const p = getProductById(id);
    if (p && !primaryCategories.includes(p.category)) {
      primaryCategories.push(p.category);
    }
  });

  if (primaryCategories.length === 0) {
    // Default to bestsellers across electronics & computers
    primaryCategories = ['electronics', 'computers', 'home'];
  }

  // Score products deterministically
  const scored = products
    .filter(p => !excludedIds.has(p.id))
    .map(p => {
      let score = 0;

      // Category match
      if (primaryCategories.includes(p.category)) {
        score += 50;
      } else {
        const isComplementary = primaryCategories.some(cat => 
          COMPLEMENTARY_CATEGORIES[cat]?.includes(p.category)
        );
        if (isComplementary) {
          score += 25;
        }
      }

      // High rating
      if (p.rating >= 4.7) score += 20;
      else if (p.rating >= 4.5) score += 10;

      // Deals and best sellers
      if (p.isBestSeller) score += 15;
      if (p.isDeal) score += 10;
      if (p.isPrime) score += 5;

      return { product: p, score };
    });

  // Sort descending by deterministic score, then by review count
  scored.sort((a, b) => b.score - a.score || b.product.reviewCount - a.product.reviewCount);

  return scored.slice(0, limit).map(s => s.product);
}

export function getBecauseYouViewed(recentId?: string, limit: number = 4): { anchorProduct: Product | null; recommendations: Product[] } {
  if (!recentId) {
    return { anchorProduct: null, recommendations: [] };
  }
  const anchor = getProductById(recentId);
  if (!anchor) {
    return { anchorProduct: null, recommendations: [] };
  }

  const recs = products
    .filter(p => p.id !== anchor.id && p.category === anchor.category)
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, limit);

  return { anchorProduct: anchor, recommendations: recs };
}

export function getSetupRecommendations(recentId?: string, limit: number = 4): { title: string; subtitle: string; products: Product[] } {
  const anchor = recentId ? getProductById(recentId) : null;
  
  if (anchor?.category === 'computers') {
    const setupItems = products
      .filter(p => p.id !== anchor.id && (p.category === 'computers' || p.category === 'electronics'))
      .filter(p => p.title.toLowerCase().includes('monitor') || 
                   p.title.toLowerCase().includes('mouse') || 
                   p.title.toLowerCase().includes('keyboard') || 
                   p.title.toLowerCase().includes('ssd') ||
                   p.title.toLowerCase().includes('headset') ||
                   p.title.toLowerCase().includes('audio'))
      .slice(0, limit);

    return {
      title: 'Complete Your Workstation Setup',
      subtitle: `Curated hardware and peripherals to pair with your ${anchor.brand} ${anchor.title.slice(0, 25)}...`,
      products: setupItems.length > 0 ? setupItems : products.filter(p => p.category === 'computers').slice(0, limit)
    };
  }

  if (anchor?.category === 'electronics') {
    const setupItems = products
      .filter(p => p.id !== anchor.id && (p.category === 'electronics' || p.category === 'computers'))
      .slice(0, limit);

    return {
      title: 'Complete Your Audio & Entertainment Setup',
      subtitle: `Recommended accessories and gear to accompany your recent audio searches`,
      products: setupItems
    };
  }

  // Default setup picks
  const defaultSetup = products
    .filter(p => p.category === 'computers' || p.category === 'electronics')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

  return {
    title: 'Complete Your Setup',
    subtitle: 'Essential monitors, high-speed storage, and premium peripherals for peak productivity',
    products: defaultSetup
  };
}
