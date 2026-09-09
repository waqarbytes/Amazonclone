import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Star, ShoppingCart, Check, ArrowRight } from 'lucide-react';

export interface ProductListItemProps {
  product: Product;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
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
    <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-card-hover transition-all duration-200 p-5 text-left flex flex-col md:flex-row gap-6 items-start">
      {/* Image Container */}
      <Link 
        to={`/product/${product.id}`}
        className="w-full md:w-56 aspect-square bg-gray-50 rounded-lg border border-gray-100 p-3 flex-shrink-0 flex items-center justify-center overflow-hidden group"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
          }}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Middle Information Column */}
      <div className="flex-1 min-w-0 space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {product.isDeal && discountPercent > 0 && (
            <Badge variant="deal" size="sm">Limited Time Deal</Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="bestseller" size="sm">#1 Best Seller</Badge>
          )}
          <span className="text-xs font-semibold text-amazon-muted uppercase tracking-wider">
            {product.brand} • <span className="capitalize">{product.category}</span>
          </span>
        </div>

        <Link to={`/product/${product.id}`} className="block group">
          <h2 className="text-base sm:text-lg font-bold text-amazon-text group-hover:text-amazon-link transition-colors leading-snug">
            {product.title}
          </h2>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center text-amazon-amber">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="font-bold text-amazon-text">{product.rating}</span>
          <span className="text-amazon-muted">({product.reviewCount.toLocaleString()} ratings)</span>
        </div>

        {/* Description & Features for comparison */}
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <ul className="hidden sm:block space-y-1 text-xs text-gray-700 list-disc pl-4 pt-1">
          {product.features.slice(0, 2).map((feat, idx) => (
            <li key={idx} className="line-clamp-1">{feat}</li>
          ))}
        </ul>
      </div>

      {/* Right Pricing & Actions Column */}
      <div className="w-full md:w-52 md:border-l md:border-gray-100 md:pl-6 space-y-3.5 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amazon-text">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-amazon-muted line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {discountPercent > 0 && (
            <span className="text-xs font-bold text-amazon-deal block">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Delivery Details */}
        <div className="text-xs text-gray-700 space-y-1">
          {product.isPrime ? (
            <div className="flex items-center gap-1 font-semibold text-emerald-800">
              <span className="font-black text-amazon-prime italic">prime</span>
              <span>FREE delivery <strong>Tomorrow</strong></span>
            </div>
          ) : (
            <div className="text-amazon-muted">Standard Delivery</div>
          )}
          <span className="text-xs font-semibold text-emerald-700 block">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <Button
            variant="secondary"
            fullWidth
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Add to Cart
              </>
            )}
          </Button>

          <Link to={`/product/${product.id}`} className="block">
            <Button variant="outline" fullWidth size="sm">
              View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
