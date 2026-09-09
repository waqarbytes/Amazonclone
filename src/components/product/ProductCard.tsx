import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../hooks/useWishlist';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../common/Badge';
import { QuickViewModal } from './QuickViewModal';
import { Star, ShoppingCart, Check, Eye, Heart } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success, info } = useToast();

  const [isAdded, setIsAdded] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const isSaved = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    success(`Added ${product.title.slice(0, 32)}... to your cart`);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isSaved) {
      success(`Saved ${product.title.slice(0, 28)}... to your Wishlist`);
    } else {
      info(`Removed ${product.title.slice(0, 28)}... from your Wishlist`);
    }
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <article 
        data-testid="product-card"
        aria-labelledby={`product-title-${product.id}`}
        className={`
          group relative flex flex-col justify-between bg-white rounded-xl border border-gray-200/90 
          hover:border-gray-300 hover:shadow-md transition-all duration-200 p-4 text-left select-none
          ${className}
        `}
      >
        <Link to={`/product/${product.id}`} className="block flex-1 flex flex-col">
          {/* Top Badges & Wishlist Heart */}
          <div className="flex items-center justify-between gap-1 mb-2 h-5">
            <div className="flex items-center gap-1.5">
              {product.isDeal && discountPercent > 0 ? (
                <Badge variant="deal" size="sm">Limited Deal</Badge>
              ) : product.isBestSeller ? (
                <Badge variant="bestseller" size="sm">#1 Best Seller</Badge>
              ) : (
                <span />
              )}
            </div>

            <div className="flex items-center gap-1">
              {product.isPrime && (
                <span className="text-[11px] font-extrabold text-amazon-prime tracking-wider italic">
                  prime
                </span>
              )}
              <button
                type="button"
                onClick={handleToggleWishlist}
                aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                className={`
                  p-1 rounded-full hover:bg-gray-100 transition
                  ${isSaved ? 'text-rose-600' : 'text-gray-400 hover:text-gray-600'}
                `}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Product Image & Quick View Trigger */}
          <div className="relative aspect-square w-full bg-gray-50/50 rounded-lg overflow-hidden mb-3 flex items-center justify-center p-3 border border-gray-100 group/img">
            <img
              src={product.images[0]}
              alt={product.title}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
              }}
              className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-300"
            />

            {/* Quick View Button */}
            <button
              type="button"
              onClick={handleOpenQuickView}
              className="absolute bottom-2 inset-x-3 bg-white/90 hover:bg-white text-gray-800 text-xs font-bold py-1.5 px-2 rounded-lg shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all flex items-center justify-center gap-1.5 backdrop-blur-xs"
            >
              <Eye className="w-3.5 h-3.5 text-gray-500" />
              <span>Quick View</span>
            </button>
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
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-amazon-text">{product.rating}</span>
            <span className="text-[11px] text-amazon-muted">({product.reviewCount.toLocaleString()})</span>
          </div>

          {/* Price & Savings */}
          <div className="mt-auto pt-2 space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-amazon-text">
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
              w-full py-2 px-3 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 shadow-2xs
              focus:outline-none focus:ring-2 focus:ring-amazon-amber focus:ring-offset-1 active:scale-[0.98]
              ${isAdded 
                ? 'bg-emerald-600 text-white' 
                : 'bg-amazon-btn-pri hover:bg-amazon-btn-pri-hover text-amazon-dark'}
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

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
};
