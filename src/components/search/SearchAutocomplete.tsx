import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCategory } from '../../types';
import { products } from '../../data/products';
import { getRichAutocompleteSuggestions, RichAutocompleteResult } from '../../utils/searchFilter';
import { Search, ChevronDown, X, ArrowRight, Sparkles, Tag, Layers } from 'lucide-react';

export interface SearchAutocompleteProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

type FlatItem = 
  | { type: 'category'; label: string; value: ProductCategory }
  | { type: 'brand'; brand: string }
  | { type: 'product'; id: string; title: string; price: number; brand: string; category: string; image: string; isPrime: boolean };

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({ 
  isMobile = false,
  onNavigate 
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [isOpen, setIsOpen] = useState(false);
  const [richResults, setRichResults] = useState<RichAutocompleteResult>({ categories: [], brands: [], products: [] });
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced suggestion update
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setRichResults({ categories: [], brands: [], products: [] });
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    const timer = setTimeout(() => {
      const results = getRichAutocompleteSuggestions(products, query);
      setRichResults(results);
      const hasAny = results.categories.length > 0 || results.brands.length > 0 || results.products.length > 0;
      setIsOpen(hasAny);
      setActiveIndex(-1);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Build flattened list of navigable items
  const flatItems: FlatItem[] = [
    ...richResults.categories.map(c => ({ type: 'category' as const, label: c.label, value: c.value })),
    ...richResults.brands.map(b => ({ type: 'brand' as const, brand: b })),
    ...richResults.products.map(p => ({
      type: 'product' as const,
      id: p.id,
      title: p.title,
      price: p.price,
      brand: p.brand,
      category: p.category,
      image: p.images[0],
      isPrime: p.isPrime
    }))
  ];

  const handleSelectItem = (item: FlatItem) => {
    setIsOpen(false);
    setActiveIndex(-1);
    if (onNavigate) onNavigate();

    if (item.type === 'category') {
      navigate(`/search?category=${item.value}`);
    } else if (item.type === 'brand') {
      navigate(`/search?q=${encodeURIComponent(item.brand)}`);
    } else if (item.type === 'product') {
      navigate(`/product/${item.id}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || flatItems.length === 0) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < flatItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : flatItems.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < flatItems.length) {
        e.preventDefault();
        handleSelectItem(flatItems[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && activeIndex < flatItems.length) {
      handleSelectItem(flatItems[activeIndex]);
      return;
    }

    setIsOpen(false);
    setActiveIndex(-1);
    if (onNavigate) onNavigate();

    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);

    navigate(`/search?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery('');
    setRichResults({ categories: [], brands: [], products: [] });
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  let globalIndexCounter = 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className={`
          flex items-stretch rounded-md overflow-hidden bg-white shadow-sm border border-transparent
          focus-within:ring-2 focus-within:ring-amazon-amber focus-within:border-transparent
          ${isMobile ? 'h-10' : 'h-10'}
        `}
      >
        {/* Category Dropdown (Desktop only) */}
        {!isMobile && (
          <div className="relative bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center border-r border-gray-300 transition">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProductCategory)}
              className="bg-transparent pl-3 pr-6 py-2 appearance-none cursor-pointer focus:outline-none text-gray-800"
              aria-label="Select search category"
            >
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="computers">Computers</option>
              <option value="home">Home & Kitchen</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
              <option value="beauty">Beauty</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-1.5 pointer-events-none text-gray-600" />
          </div>
        )}

        {/* Input */}
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (flatItems.length > 0) setIsOpen(true);
            }}
            placeholder={isMobile ? 'Search products, brands...' : 'Search Amazon products, brands, and categories...'}
            className="w-full h-full px-3 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none"
            aria-label="Search products"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls="autocomplete-dropdown"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-amazon-amber hover:bg-[#f3a847] text-gray-900 px-4 flex items-center justify-center transition flex-shrink-0"
          aria-label="Submit search"
        >
          <Search className="w-5 h-5 text-gray-800" />
        </button>
      </form>

      {/* Autocomplete Dropdown Suggestions Panel */}
      {isOpen && flatItems.length > 0 && (
        <div
          id="autocomplete-dropdown"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute top-full left-0 right-0 mt-1 bg-white text-amazon-text rounded-lg shadow-2xl border border-gray-200 divide-y divide-gray-100 z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Categories Section */}
          {richResults.categories.length > 0 && (
            <div className="p-2 bg-gray-50/70">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amazon-muted flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-amazon-link" /> Categories
              </div>
              <div className="space-y-1 mt-0.5">
                {richResults.categories.map((cat) => {
                  const itemIndex = globalIndexCounter++;
                  const isSelected = activeIndex === itemIndex;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectItem({ type: 'category', label: cat.label, value: cat.value })}
                      className={`w-full px-3 py-1.5 rounded text-xs flex items-center justify-between text-left transition ${
                        isSelected ? 'bg-amber-100 text-amazon-dark font-bold' : 'hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>in <strong>{cat.label}</strong></span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Brands Section */}
          {richResults.brands.length > 0 && (
            <div className="p-2 bg-white">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amazon-muted flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-amazon-amber" /> Brands
              </div>
              <div className="flex flex-wrap gap-1.5 p-1">
                {richResults.brands.map((brand) => {
                  const itemIndex = globalIndexCounter++;
                  const isSelected = activeIndex === itemIndex;
                  return (
                    <button
                      key={brand}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectItem({ type: 'brand', brand })}
                      className={`px-2.5 py-1 rounded-full text-xs transition border ${
                        isSelected 
                          ? 'bg-amazon-amber text-amazon-dark border-amazon-amber font-bold' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200'
                      }`}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Products Section */}
          {richResults.products.length > 0 && (
            <div className="bg-white">
              <div className="px-3 py-1.5 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-amazon-muted flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amazon-amber" /> Matching Products
                </span>
                <span className="text-[10px] lowercase text-gray-400 font-normal">Use ↑↓ keys</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                {richResults.products.map((item) => {
                  const itemIndex = globalIndexCounter++;
                  const isSelected = activeIndex === itemIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectItem({
                        type: 'product',
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        brand: item.brand,
                        category: item.category,
                        image: item.images[0],
                        isPrime: item.isPrime
                      })}
                      className={`w-full p-2.5 flex items-center gap-3 transition text-left ${
                        isSelected ? 'bg-amber-50 ring-1 ring-inset ring-amazon-amber' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded p-1 flex-shrink-0 flex items-center justify-center">
                        <img src={item.images[0]} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-amazon-text truncate">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-amazon-muted">
                          <span className="font-semibold">{item.brand}</span>
                          <span>•</span>
                          <span className="capitalize">{item.category}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-bold text-amazon-text">${item.price.toFixed(2)}</span>
                        {item.isPrime && (
                          <span className="block text-[10px] font-extrabold text-amazon-prime italic">
                            prime
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom "View all matching results" */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-2.5 bg-gray-50 hover:bg-gray-100 text-amazon-link hover:text-amazon-linkHover text-xs font-semibold flex items-center justify-center gap-1 transition"
          >
            <span>Search all results for "<strong>{query}</strong>"</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      )}
    </div>
  );
};
