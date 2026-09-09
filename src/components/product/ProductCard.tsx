import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Badge } from '../common/Badge';
import { Star, ShoppingCart, Check } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <article 
      aria-labelledby={`product-title-${product.id}`}
      className={`
        group relative flex flex-col justify-between bg-white rounded-lg border border-gray-200/90 
        hover:border-gray-300 hover:shadow-card-hover transition-all duration-200 p-4 text-left select-none
        ${className}
      `}
    >
      <Link to={`/product/${product.id}`} className="block flex-1 flex flex-col">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-1 mb-2 h-5">
          {product.isDeal && discountPercent > 0 ? (
            <Badge variant="deal" size="sm">Limited Time Deal</Badge>
          ) : product.isBestSeller ? (
            <Badge variant="bestseller" size="sm">#1 Best Seller</Badge>
          ) : (
            <span />
          )}
          {product.isPrime && (
            <span className="text-[11px] font-extrabold text-amazon-prime tracking-wider italic">
              prime
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="relative aspect-square w-full bg-gray-50/50 rounded-md overflow-hidden mb-3 flex items-center justify-center p-3 border border-gray-100">
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
            }}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Brand & Title */}
        <div className="space-y-1 mb-2">
          <span className="text-[11px] font-semibold text-amazon-muted uppercase tracking-wider block">
            {product.brand}
          </span>
          <h2 id={`product-title-${product.id}`} className="text-sm font-semibold text-amazon-text line-clamp-2 leading-snug group-hover:text-amazon-link transition-colors">
            {product.title}
          </h2>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center text-amazon-amber" aria-label={`Rating: ${product.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-amazon-text">{product.rating}</span>
          <span className="text-[11px] text-amazon-muted">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price & Savings */}
        <div className="mt-auto pt-2 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-amazon-text">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xs text-amazon-muted line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-amazon-deal">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Delivery Promise */}
          <div className="text-[11px] text-gray-600">
            {product.isPrime ? (
              <span>FREE delivery <strong>Tomorrow</strong></span>
            ) : (
              <span>FREE delivery on orders over $35</span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="pt-3 mt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`
            w-full py-2 px-3 rounded-full text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-amazon-amber focus:ring-offset-1 active:scale-[0.98]
            ${isAdded 
              ? 'bg-emerald-600 text-white border border-emerald-700' 
              : 'bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-dark border border-[#fcd200]'}
          `}
          aria-label={`Add ${product.title} to cart`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5 text-amazon-dark" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
};
