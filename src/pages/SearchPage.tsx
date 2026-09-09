import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/product/ProductCard';
import { searchProducts, products as allProducts } from '../data/products';
import { ProductCategory } from '../types';
import { 
  Filter, 
  SlidersHorizontal, 
  Search as SearchIcon, 
  RotateCcw,
  Check
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = (searchParams.get('category') as ProductCategory) || 'all';

  // Local faceted filters
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(categoryParam);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [dealsOnly, setDealsOnly] = useState(false);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category param
  React.useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let list = searchProducts(query, selectedCategory);

    if (primeOnly) {
      list = list.filter(p => p.isPrime);
    }
    if (dealsOnly) {
      list = list.filter(p => p.isDeal);
    }
    if (minRating) {
      list = list.filter(p => p.rating >= minRating);
    }

    // Sort
    const sorted = [...list];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [query, selectedCategory, primeOnly, dealsOnly, minRating, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setPrimeOnly(false);
    setDealsOnly(false);
    setMinRating(null);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <Container className="py-6 space-y-6">
      {/* Header Results Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <nav className="text-xs text-amazon-muted flex items-center gap-1.5 mb-1">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Search</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="capitalize font-medium text-amazon-text">{selectedCategory}</span>
              </>
            )}
          </nav>
          <h1 className="text-xl sm:text-2xl font-bold text-amazon-text">
            {query ? `Results for "${query}"` : selectedCategory !== 'all' ? `Department: ${selectedCategory.toUpperCase()}` : 'All Products'}
          </h1>
          <p className="text-xs text-amazon-muted mt-0.5">
            Showing <strong className="text-amazon-text">{filteredProducts.length}</strong> of {allProducts.length} products
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-xs font-semibold text-amazon-text"
          >
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-amazon-muted hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 font-semibold text-amazon-text focus:outline-none focus:ring-1 focus:ring-amazon-amber cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Avg. Customer Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Filter Sidebar */}
        <aside className={`
          ${mobileFilterOpen ? 'block' : 'hidden md:block'}
          col-span-1 bg-white p-5 rounded-xl border border-gray-200 space-y-6 text-left h-fit
        `}>
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-bold text-sm text-amazon-text flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-amazon-amber" /> Filters
            </h2>
            {(selectedCategory !== 'all' || primeOnly || dealsOnly || minRating !== null) && (
              <button
                onClick={resetFilters}
                className="text-xs text-amazon-link hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Department */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amazon-muted">Department</h3>
            <div className="space-y-1 text-xs">
              {(['all', 'electronics', 'computers', 'home', 'fashion', 'books', 'beauty'] as ProductCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    w-full text-left py-1 px-2 rounded font-medium capitalize flex items-center justify-between transition
                    ${selectedCategory === cat ? 'bg-amber-50 text-amazon-dark font-bold' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <span>{cat === 'all' ? 'All Departments' : cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-amazon-amber" />}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Shipping & Deals */}
          <div className="space-y-2.5 text-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amazon-muted">Shipping & Offers</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={primeOnly}
                onChange={(e) => setPrimeOnly(e.target.checked)}
                className="rounded text-amazon-amber focus:ring-amazon-amber h-4 w-4"
              />
              <span className="font-extrabold text-amazon-prime italic">prime</span>
              <span className="text-gray-700">Eligible for Next-Day</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={dealsOnly}
                onChange={(e) => setDealsOnly(e.target.checked)}
                className="rounded text-amazon-amber focus:ring-amazon-amber h-4 w-4"
              />
              <Badge variant="deal" size="sm">Deals & Discounts</Badge>
            </label>
          </div>

          <hr className="border-gray-100" />

          {/* Customer Reviews */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amazon-muted">Customer Rating</h3>
            <div className="space-y-1">
              {[4, 3, 2].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setMinRating(minRating === stars ? null : stars)}
                  className={`
                    w-full text-left py-1 px-2 rounded flex items-center justify-between transition
                    ${minRating === stars ? 'bg-amber-50 font-bold' : 'hover:bg-gray-50'}
                  `}
                >
                  <span className="text-amazon-amber">
                    {'★'.repeat(stars)}{'☆'.repeat(5 - stars)} <span className="text-gray-700 font-normal">& Up</span>
                  </span>
                  {minRating === stars && <Check className="w-3.5 h-3.5 text-amazon-amber" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Product Grid */}
        <main className="col-span-1 md:col-span-3 space-y-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-16 space-y-4">
              <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
                <SearchIcon className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-amazon-text">No products found</h3>
                <p className="text-xs text-amazon-muted max-w-sm mx-auto">
                  We couldn't find any items matching your active search or filters.
                </p>
              </div>
              <Button variant="primary" size="md" onClick={resetFilters}>
                Clear All Filters & View All
              </Button>
            </Card>
          )}
        </main>
      </div>
    </Container>
  );
};
