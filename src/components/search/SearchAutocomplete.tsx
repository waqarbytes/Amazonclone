import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductCategory } from '../../types';
import { products } from '../../data/products';
import { getAutocompleteSuggestions } from '../../utils/searchFilter';
import { Search, ChevronDown, X, ArrowRight, Sparkles } from 'lucide-react';

export interface SearchAutocompleteProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({ 
  isMobile = false,
  onNavigate 
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced suggestion update
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      const results = getAutocompleteSuggestions(products, query, 5);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside and Escape key handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (onNavigate) onNavigate();

    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);

    navigate(`/search?${params.toString()}`);
  };

  const handleSelectSuggestion = (productId: string) => {
    setIsOpen(false);
    if (onNavigate) onNavigate();
    navigate(`/product/${productId}`);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

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
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            placeholder={isMobile ? 'Search Amazon products...' : 'Search Amazon products, brands, and categories...'}
            className="w-full h-full px-3 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none"
            aria-label="Search products"
            aria-autocomplete="list"
            aria-expanded={isOpen}
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
      {isOpen && suggestions.length > 0 && (
        <div
          role="listbox"
          aria-label="Search suggestions"
          className="absolute top-full left-0 right-0 mt-1 bg-white text-amazon-text rounded-lg shadow-2xl border border-gray-200 divide-y divide-gray-100 z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="px-3 py-1.5 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-amazon-muted flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amazon-amber" /> Suggested Products
            </span>
            <span className="text-[10px] lowercase text-gray-400 font-normal">esc to close</span>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {suggestions.map((item) => (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected="false"
                onClick={() => handleSelectSuggestion(item.id)}
                className="w-full p-2.5 flex items-center gap-3 hover:bg-amber-50/70 transition text-left focus:bg-amber-50/70 focus:outline-none group"
              >
                <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded p-1 flex-shrink-0 flex items-center justify-center">
                  <img src={item.images[0]} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-amazon-text truncate group-hover:text-amazon-link">
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
            ))}
          </div>

          {/* Bottom "View all matching results" */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-2.5 bg-gray-50 hover:bg-gray-100 text-amazon-link hover:text-amazon-linkHover text-xs font-semibold flex items-center justify-center gap-1 transition"
          >
            <span>Search for "<strong>{query}</strong>"</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      )}
    </div>
  );
};
