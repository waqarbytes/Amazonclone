import { Product, ProductCategory } from '../types';

export interface FilterOptions {
  query?: string;
  category?: ProductCategory;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  primeOnly?: boolean;
  dealsOnly?: boolean;
}

export type SortOption = 
  | 'featured' 
  | 'price-asc' 
  | 'price-desc' 
  | 'rating' 
  | 'discount' 
  | 'newest';

export interface SearchResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  availableBrands: { name: string; count: number }[];
}

export const filterProducts = (allProducts: Product[], filters: FilterOptions): Product[] => {
  return allProducts.filter(product => {
    // Category filter
    if (filters.category && filters.category !== 'all') {
      if (product.category !== filters.category) return false;
    }

    // Text search query matching (title, brand, category, description, features)
    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchFeatures = product.features.some(f => f.toLowerCase().includes(q));

      if (!matchTitle && !matchBrand && !matchCategory && !matchDesc && !matchFeatures) {
        return false;
      }
    }

    // Brands filter (multi-select)
    if (filters.brands && filters.brands.length > 0) {
      if (!filters.brands.includes(product.brand)) return false;
    }

    // Prime only
    if (filters.primeOnly && !product.isPrime) {
      return false;
    }

    // Deals only
    if (filters.dealsOnly && !product.isDeal) {
      return false;
    }

    // Min Rating
    if (filters.minRating && product.rating < filters.minRating) {
      return false;
    }

    // Price range
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }

    return true;
  });
};

export const sortProducts = (productsList: Product[], sortBy: SortOption = 'featured'): Product[] => {
  const list = [...productsList];
  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case 'discount':
      return list.sort((a, b) => {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      });
    case 'newest':
      // Return reverse order or stable deterministic id sort
      return list.reverse();
    case 'featured':
    default:
      // Featured: Bestsellers & deals first, then by rating
      return list.sort((a, b) => {
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        if (a.isDeal && !b.isDeal) return -1;
        if (!a.isDeal && b.isDeal) return 1;
        return b.rating - a.rating;
      });
  }
};

export const paginateProducts = (
  items: Product[],
  page: number = 1,
  pageSize: number = 12
): { paginatedItems: Product[]; totalPages: number; startIndex: number; endIndex: number } => {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    paginatedItems,
    totalPages,
    startIndex: total > 0 ? startIndex + 1 : 0,
    endIndex,
  };
};

export const getAvailableBrands = (
  items: Product[]
): { name: string; count: number }[] => {
  const brandMap = new Map<string, number>();
  items.forEach(item => {
    brandMap.set(item.brand, (brandMap.get(item.brand) || 0) + 1);
  });

  return Array.from(brandMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};

export const getAutocompleteSuggestions = (
  allProducts: Product[],
  rawQuery: string,
  limit: number = 6
): Product[] => {
  if (!rawQuery || rawQuery.trim().length < 2) return [];
  const q = rawQuery.toLowerCase().trim();

  return allProducts
    .filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
    .slice(0, limit);
};
