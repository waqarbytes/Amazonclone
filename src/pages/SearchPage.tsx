import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/product/ProductCard';
import { ProductListItem } from '../components/product/ProductListItem';
import { products as allProducts } from '../data/products';
import { 
  filterProducts, 
  sortProducts, 
  paginateProducts, 
  getAvailableBrands,
  SortOption,
  FilterOptions
} from '../utils/searchFilter';
import { ProductCategory } from '../types';
import { 
  Filter, 
  SlidersHorizontal, 
  Search as SearchIcon, 
  RotateCcw,
  Check,
  X,
  LayoutGrid,
  List as ListIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL search params
  const query = searchParams.get('q') || '';
  const categoryParam = (searchParams.get('category') as ProductCategory) || 'all';
  const brandsParam = searchParams.getAll('brand');
  const primeParam = searchParams.get('prime') === 'true';
  const dealsParam = searchParams.get('deals') === 'true';
  const minRatingParam = searchParams.get('rating') ? Number(searchParams.get('rating')) : null;
  const minPriceParam = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPriceParam = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const sortParam = (searchParams.get('sort') as SortOption) || 'featured';
  const pageParam = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const viewParam = searchParams.get('view') === 'list' ? 'list' : 'grid';

  // Local state initialized from URL
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(viewParam);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [customMin, setCustomMin] = useState(minPriceParam !== undefined ? String(minPriceParam) : '');
  const [customMax, setCustomMax] = useState(maxPriceParam !== undefined ? String(maxPriceParam) : '');

  // Helper to update URL params
  const updateParams = (updater: (params: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams);
    updater(next);
    // Reset to page 1 on filter changes unless page is explicitly updated
    if (!next.has('page') || next.get('page') === searchParams.get('page')) {
      next.delete('page');
    }
    setSearchParams(next);
  };

  // Sync viewMode with URL
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    const next = new URLSearchParams(searchParams);
    if (mode === 'list') {
      next.set('view', 'list');
    } else {
      next.delete('view');
    }
    setSearchParams(next);
  };

  // Escape listener for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileDrawerOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileDrawerOpen]);

  // Filter options object
  const currentFilters: FilterOptions = useMemo(() => ({
    query,
    category: categoryParam,
    brands: brandsParam,
    primeOnly: primeParam,
    dealsOnly: dealsParam,
    minRating: minRatingParam !== null ? minRatingParam : undefined,
    minPrice: minPriceParam,
    maxPrice: maxPriceParam,
  }), [query, categoryParam, brandsParam, primeParam, dealsParam, minRatingParam, minPriceParam, maxPriceParam]);

  // Compute filtered & sorted products
  const filteredList = useMemo(() => {
    return filterProducts(allProducts, currentFilters);
  }, [currentFilters]);

  // Available brands derived dynamically from the category/query subset
  const availableBrands = useMemo(() => {
    const baseList = filterProducts(allProducts, { query, category: categoryParam });
    return getAvailableBrands(baseList);
  }, [query, categoryParam]);

  const sortedList = useMemo(() => {
    return sortProducts(filteredList, sortParam);
  }, [filteredList, sortParam]);

  const pageSize = 12;
  const { paginatedItems, totalPages, startIndex, endIndex } = useMemo(() => {
    return paginateProducts(sortedList, pageParam, pageSize);
  }, [sortedList, pageParam, pageSize]);

  // Handlers
  const handleCategorySelect = (cat: ProductCategory) => {
    updateParams((params) => {
      if (cat === 'all') {
        params.delete('category');
      } else {
        params.set('category', cat);
      }
      params.delete('brand'); // clear brands on category switch
    });
  };

  const handleBrandToggle = (brandName: string) => {
    updateParams((params) => {
      const current = params.getAll('brand');
      params.delete('brand');
      if (current.includes(brandName)) {
        current.filter(b => b !== brandName).forEach(b => params.append('brand', b));
      } else {
        [...current, brandName].forEach(b => params.append('brand', b));
      }
    });
  };

  const handlePrimeToggle = () => {
    updateParams((params) => {
      if (primeParam) {
        params.delete('prime');
      } else {
        params.set('prime', 'true');
      }
    });
  };

  const handleDealsToggle = () => {
    updateParams((params) => {
      if (dealsParam) {
        params.delete('deals');
      } else {
        params.set('deals', 'true');
      }
    });
  };

  const handleRatingSelect = (stars: number | null) => {
    updateParams((params) => {
      if (stars === null || minRatingParam === stars) {
        params.delete('rating');
      } else {
        params.set('rating', String(stars));
      }
    });
  };

  const handlePricePreset = (min?: number, max?: number) => {
    updateParams((params) => {
      if (min !== undefined) params.set('minPrice', String(min)); else params.delete('minPrice');
      if (max !== undefined) params.set('maxPrice', String(max)); else params.delete('maxPrice');
    });
    setCustomMin(min !== undefined ? String(min) : '');
    setCustomMax(max !== undefined ? String(max) : '');
  };

  const handleCustomPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams((params) => {
      const minNum = parseFloat(customMin);
      const maxNum = parseFloat(customMax);
      if (!isNaN(minNum)) params.set('minPrice', String(minNum)); else params.delete('minPrice');
      if (!isNaN(maxNum)) params.set('maxPrice', String(maxNum)); else params.delete('maxPrice');
    });
  };

  const handleSortChange = (newSort: SortOption) => {
    const next = new URLSearchParams(searchParams);
    next.set('sort', newSort);
    setSearchParams(next);
  };

  const handlePageChange = (newPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(newPage));
    setSearchParams(next);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setCustomMin('');
    setCustomMax('');
  };

  // Check if any filters are active
  const hasActiveFilters = categoryParam !== 'all' || 
    brandsParam.length > 0 || 
    primeParam || 
    dealsParam || 
    minRatingParam !== null || 
    minPriceParam !== undefined || 
    maxPriceParam !== undefined;

  return (
    <Container className="py-6 space-y-5 text-left">
      {/* ==================== BREADCRUMBS & HEADING ==================== */}
      <nav className="flex items-center gap-1.5 text-xs text-amazon-muted">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span>Search</span>
        {categoryParam !== 'all' && (
          <>
            <span>/</span>
            <span className="capitalize text-amazon-text font-semibold">{categoryParam}</span>
          </>
        )}
      </nav>

      {/* Results Header Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-amazon-text tracking-tight">
            {query 
              ? `Results for "${query}"` 
              : categoryParam !== 'all' 
                ? `Department: ${categoryParam.toUpperCase()}` 
                : 'All Products Catalog'}
          </h1>
          <p className="text-xs text-amazon-muted mt-0.5">
            Showing <strong className="text-amazon-text">{startIndex}–{endIndex}</strong> of <strong className="text-amazon-text">{sortedList.length}</strong> results
          </p>
        </div>

        {/* View Toggle & Sorting Controls */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Mobile Filter Trigger Button */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-xs font-bold text-amazon-text transition"
            aria-label="Open filter options"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-amazon-amber" />
            )}
          </button>

          {/* Grid / List View Toggle (Desktop) */}
          <div className="hidden sm:flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50 p-0.5">
            <button
              type="button"
              onClick={() => handleViewModeChange('grid')}
              className={`p-1.5 rounded transition ${viewMode === 'grid' ? 'bg-white shadow text-amazon-dark' : 'text-gray-500 hover:text-gray-900'}`}
              aria-label="Grid view"
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleViewModeChange('list')}
              className={`p-1.5 rounded transition ${viewMode === 'list' ? 'bg-white shadow text-amazon-dark' : 'text-gray-500 hover:text-gray-900'}`}
              aria-label="List view"
              title="List view"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Select Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-amazon-muted hidden lg:inline font-medium">Sort by:</span>
            <select
              value={sortParam}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 font-semibold text-amazon-text focus:outline-none focus:ring-2 focus:ring-amazon-amber cursor-pointer transition text-xs"
              aria-label="Sort products by"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Avg. Customer Review</option>
              <option value="discount">Biggest Discount</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* ==================== ACTIVE FILTER CHIPS ROW ==================== */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1" aria-label="Active filters">
          <span className="text-xs font-semibold text-amazon-muted">Active Filters:</span>

          {categoryParam !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-gray-300 text-amazon-text shadow-sm">
              <span className="capitalize">Dept: {categoryParam}</span>
              <button 
                onClick={() => handleCategorySelect('all')}
                className="text-gray-400 hover:text-amazon-deal focus:outline-none"
                aria-label={`Remove category filter ${categoryParam}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {brandsParam.map((brand) => (
            <span key={brand} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-gray-300 text-amazon-text shadow-sm">
              <span>Brand: {brand}</span>
              <button 
                onClick={() => handleBrandToggle(brand)}
                className="text-gray-400 hover:text-amazon-deal focus:outline-none"
                aria-label={`Remove brand filter ${brand}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {primeParam && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-gray-300 text-amazon-prime shadow-sm">
              <span className="font-extrabold italic">prime</span>
              <button 
                onClick={handlePrimeToggle}
                className="text-gray-400 hover:text-amazon-deal focus:outline-none"
                aria-label="Remove Prime filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {dealsParam && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 border border-red-200 text-amazon-deal shadow-sm">
              <span>Deals Only</span>
              <button 
                onClick={handleDealsToggle}
                className="text-red-400 hover:text-red-700 focus:outline-none"
                aria-label="Remove deals filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {minRatingParam !== null && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-gray-300 text-amazon-text shadow-sm">
              <span className="text-amazon-amber">{'★'.repeat(minRatingParam)} & Up</span>
              <button 
                onClick={() => handleRatingSelect(null)}
                className="text-gray-400 hover:text-amazon-deal focus:outline-none"
                aria-label="Remove rating filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {(minPriceParam !== undefined || maxPriceParam !== undefined) && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-gray-300 text-amazon-text shadow-sm">
              <span>
                Price: {minPriceParam !== undefined ? `$${minPriceParam}` : '$0'} – {maxPriceParam !== undefined ? `$${maxPriceParam}` : 'Any'}
              </span>
              <button 
                onClick={() => handlePricePreset(undefined, undefined)}
                className="text-gray-400 hover:text-amazon-deal focus:outline-none"
                aria-label="Remove price filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-bold text-amazon-link hover:underline hover:text-amazon-deal ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ==================== MAIN CATALOG LAYOUT ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden md:block col-span-1 bg-white p-5 rounded-xl border border-gray-200/90 shadow-sm space-y-6 text-left h-fit sticky top-24">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-bold text-sm text-amazon-text flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-amazon-amber" /> Filters
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-amazon-link hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amazon-muted">Department</h3>
            <div className="space-y-1 text-xs">
              {(['all', 'electronics', 'computers', 'home', 'fashion', 'books', 'beauty'] as ProductCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`
                    w-full text-left py-1.5 px-2 rounded-md font-medium capitalize flex items-center justify-between transition
                    ${categoryParam === cat ? 'bg-amber-50 text-amazon-dark font-bold' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <span>{cat === 'all' ? 'All Departments' : cat}</span>
                  {categoryParam === cat && <Check className="w-3.5 h-3.5 text-amazon-amber" />}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Prime & Deals */}
          <div className="space-y-2.5 text-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amazon-muted">Programs & Deals</h3>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={primeParam}
                onChange={handlePrimeToggle}
                className="rounded text-amazon-amber focus:ring-amazon-amber h-4 w-4"
              />
              <span className="font-extrabold text-amazon-prime italic">prime</span>
              <span className="text-gray-700">Eligible for Next-Day</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dealsParam}
                onChange={handleDealsToggle}
                className="rounded text-amazon-amber focus:ring-amazon-amber h-4 w-4"
              />
              <Badge variant="deal" size="sm">Deals & Discounts</Badge>
            </label>
          </div>

          {/* Brand Filter (Dynamic from active catalog) */}
          {availableBrands.length > 0 && (
            <>
              <hr className="border-gray-100" />
              <div className="space-y-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-amazon-muted">Brand</h3>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {availableBrands.map(({ name, count }) => (
                    <label key={name} className="flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:text-amazon-text select-none">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={brandsParam.includes(name)}
                          onChange={() => handleBrandToggle(name)}
                          className="rounded text-amazon-amber focus:ring-amazon-amber h-4 w-4"
                        />
                        <span>{name}</span>
                      </div>
                      <span className="text-[11px] text-gray-400">({count})</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <hr className="border-gray-100" />

          {/* Customer Reviews */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amazon-muted">Customer Reviews</h3>
            <div className="space-y-1.5">
              {[4, 3, 2].map((stars) => (
                <button
                  key={stars}
                  type="button"
                  onClick={() => handleRatingSelect(stars)}
                  className={`
                    w-full text-left py-1.5 px-2 rounded-md flex items-center justify-between transition
                    ${minRatingParam === stars ? 'bg-amber-50 font-bold' : 'hover:bg-gray-50'}
                  `}
                >
                  <span className="text-amazon-amber flex items-center gap-1">
                    {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
                    <span className="text-gray-700 font-normal ml-1">& Up</span>
                  </span>
                  {minRatingParam === stars && <Check className="w-3.5 h-3.5 text-amazon-amber" />}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Price Filtering */}
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amazon-muted">Price Range</h3>
            <div className="space-y-1.5 text-gray-700">
              <button
                type="button"
                onClick={() => handlePricePreset(0, 25)}
                className={`block w-full text-left py-1 px-2 rounded ${minPriceParam === 0 && maxPriceParam === 25 ? 'bg-amber-50 font-bold' : 'hover:bg-gray-50'}`}
              >
                Under $25
              </button>
              <button
                type="button"
                onClick={() => handlePricePreset(25, 50)}
                className={`block w-full text-left py-1 px-2 rounded ${minPriceParam === 25 && maxPriceParam === 50 ? 'bg-amber-50 font-bold' : 'hover:bg-gray-50'}`}
              >
                $25 to $50
              </button>
              <button
                type="button"
                onClick={() => handlePricePreset(50, 100)}
                className={`block w-full text-left py-1 px-2 rounded ${minPriceParam === 50 && maxPriceParam === 100 ? 'bg-amber-50 font-bold' : 'hover:bg-gray-50'}`}
              >
                $50 to $100
              </button>
              <button
                type="button"
                onClick={() => handlePricePreset(100, 250)}
                className={`block w-full text-left py-1 px-2 rounded ${minPriceParam === 100 && maxPriceParam === 250 ? 'bg-amber-50 font-bold' : 'hover:bg-gray-50'}`}
              >
                $100 to $250
              </button>
              <button
                type="button"
                onClick={() => handlePricePreset(250, undefined)}
                className={`block w-full text-left py-1 px-2 rounded ${minPriceParam === 250 && maxPriceParam === undefined ? 'bg-amber-50 font-bold' : 'hover:bg-gray-50'}`}
              >
                $250 & Above
              </button>
            </div>

            {/* Custom Min / Max Price Inputs */}
            <form onSubmit={handleCustomPriceSubmit} className="pt-2 flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2 top-2 text-gray-400">$</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={customMin}
                  onChange={(e) => setCustomMin(e.target.value)}
                  className="w-full pl-5 pr-1 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-amazon-amber focus:outline-none"
                />
              </div>
              <span className="text-gray-400">–</span>
              <div className="relative flex-1">
                <span className="absolute left-2 top-2 text-gray-400">$</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={customMax}
                  onChange={(e) => setCustomMax(e.target.value)}
                  className="w-full pl-5 pr-1 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-amazon-amber focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded font-semibold text-xs"
              >
                Go
              </button>
            </form>
          </div>
        </aside>

        {/* ==================== PRODUCT RESULTS CONTAINER ==================== */}
        <main className="col-span-1 md:col-span-3 space-y-6">
          {paginatedItems.length > 0 ? (
            <>
              {/* Grid View */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                /* List View for Comparison */
                <div className="space-y-4">
                  {paginatedItems.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* ==================== PAGINATION CONTROLS ==================== */}
              {totalPages > 1 && (
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handlePageChange(pageParam - 1)}
                    disabled={pageParam <= 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-amazon-text hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  <div className="flex items-center gap-1.5">
                    {[...Array(totalPages)].map((_, i) => {
                      const p = i + 1;
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePageChange(p)}
                          className={`
                            w-8 h-8 rounded-lg text-xs font-bold transition
                            ${pageParam === p ? 'bg-amazon-amber text-amazon-dark shadow-sm' : 'hover:bg-gray-100 text-gray-700'}
                          `}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(pageParam + 1)}
                    disabled={pageParam >= totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-amazon-text hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* ==================== PHASE 11: HELPFUL EMPTY SEARCH EXPERIENCE ==================== */
            <Card className="text-center py-16 space-y-6 p-8">
              <div className="w-16 h-16 bg-amber-50 text-amazon-amber rounded-full flex items-center justify-center mx-auto shadow-sm">
                <SearchIcon className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-amazon-text">
                  No matching products found
                </h2>
                <p className="text-xs sm:text-sm text-amazon-muted max-w-md mx-auto">
                  {query 
                    ? `We couldn't find anything matching "${query}" with your active filters.` 
                    : 'No products matched the selected filters.'}
                </p>
              </div>

              {/* Helpful Recovery Suggestions */}
              <div className="max-w-md mx-auto pt-2 space-y-4">
                <Button variant="primary" size="md" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>

                <div className="pt-4 border-t border-gray-100 text-xs">
                  <span className="font-bold text-amazon-muted block mb-3 uppercase tracking-wider">
                    Or explore popular departments:
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button onClick={() => handleCategorySelect('electronics')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold text-amazon-text">Electronics</button>
                    <button onClick={() => handleCategorySelect('computers')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold text-amazon-text">Computers</button>
                    <button onClick={() => handleCategorySelect('home')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold text-amazon-text">Home & Kitchen</button>
                    <button onClick={() => handleCategorySelect('fashion')} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold text-amazon-text">Fashion</button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </main>
      </div>

      {/* ==================== PHASE 10: MOBILE FILTER DRAWER ==================== */}
      {mobileDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 flex md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filter products"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-sm ml-auto bg-white text-amazon-text h-full shadow-2xl flex flex-col z-10">
            {/* Header */}
            <div className="p-4 bg-amazon-slate text-white flex items-center justify-between">
              <h2 className="font-bold text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amazon-amber" /> Filter Products
              </h2>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded text-gray-300 hover:text-white"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters Content */}
            <div className="p-5 flex-1 overflow-y-auto space-y-6 text-xs text-left">
              {/* Department */}
              <div className="space-y-2">
                <h3 className="font-bold uppercase tracking-wider text-amazon-muted">Department</h3>
                <div className="space-y-1">
                  {(['all', 'electronics', 'computers', 'home', 'fashion', 'books', 'beauty'] as ProductCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full text-left py-1.5 px-2 rounded capitalize font-medium ${categoryParam === cat ? 'bg-amber-50 font-bold' : 'hover:bg-gray-50'}`}
                    >
                      {cat === 'all' ? 'All Departments' : cat}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Prime & Deals */}
              <div className="space-y-2.5">
                <h3 className="font-bold uppercase tracking-wider text-amazon-muted">Offers</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={primeParam} onChange={handlePrimeToggle} className="rounded text-amazon-amber" />
                  <span className="font-extrabold text-amazon-prime italic">prime</span>
                  <span>Free Next-Day Delivery</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={dealsParam} onChange={handleDealsToggle} className="rounded text-amazon-amber" />
                  <span>Deals & Discounts Only</span>
                </label>
              </div>

              {/* Brands */}
              {availableBrands.length > 0 && (
                <>
                  <hr className="border-gray-100" />
                  <div className="space-y-2">
                    <h3 className="font-bold uppercase tracking-wider text-amazon-muted">Brands</h3>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {availableBrands.map(({ name, count }) => (
                        <label key={name} className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={brandsParam.includes(name)}
                              onChange={() => handleBrandToggle(name)}
                              className="rounded text-amazon-amber"
                            />
                            <span>{name}</span>
                          </div>
                          <span className="text-gray-400 text-[11px]">({count})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <hr className="border-gray-100" />

              {/* Ratings */}
              <div className="space-y-2">
                <h3 className="font-bold uppercase tracking-wider text-amazon-muted">Customer Rating</h3>
                <div className="space-y-1">
                  {[4, 3, 2].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => handleRatingSelect(stars)}
                      className={`w-full text-left py-1.5 px-2 rounded ${minRatingParam === stars ? 'bg-amber-50 font-bold' : ''}`}
                    >
                      <span className="text-amazon-amber">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span> & Up
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Drawer Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center gap-3">
              <Button variant="outline" size="md" fullWidth onClick={clearAllFilters}>
                Clear
              </Button>
              <Button variant="primary" size="md" fullWidth onClick={() => setMobileDrawerOpen(false)}>
                Show ({sortedList.length}) Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
