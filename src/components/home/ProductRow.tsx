import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export interface ProductRowProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  viewAllText?: string;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
  viewAllText = 'See all deals',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm space-y-4 text-left">
      {/* Header Row */}
      <div className="flex items-end justify-between gap-4 border-b border-gray-100 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-amazon-text tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-amazon-muted mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-xs font-semibold text-amazon-link hover:text-amazon-linkHover flex items-center gap-1 hover:underline whitespace-nowrap"
            >
              {viewAllText} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}

          {/* Navigation Controls */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-amazon-amber"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-amazon-amber"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-4 overflow-x-auto hide-scrollbar pb-2 pt-1 scroll-smooth snap-x"
        tabIndex={0}
        aria-label={`${title} product carousel`}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[240px] sm:w-[270px] flex-shrink-0 snap-start flex flex-col"
          >
            <ProductCard product={product} className="h-full" />
          </div>
        ))}
      </div>
    </section>
  );
};
