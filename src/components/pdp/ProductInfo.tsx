import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Badge } from '../common/Badge';
import { Star, CheckCircle2 } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
  onReviewsClick: () => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, onReviewsClick }) => {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const dollarSavings = product.originalPrice 
    ? (product.originalPrice - product.price).toFixed(2)
    : null;

  return (
    <div className="space-y-4">
      {/* Brand & SKU header */}
      <div className="flex items-center justify-between text-xs">
        <Link 
          to={`/search?category=${product.category}&brand=${encodeURIComponent(product.brand)}`}
          className="text-amazon-link hover:underline font-semibold tracking-wide uppercase"
        >
          Brand: {product.brand} Store
        </Link>
        <span className="text-gray-400 font-mono text-[11px]">
          SKU: {product.id.toUpperCase()}
        </span>
      </div>

      {/* Main Product Title */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amazon-text leading-snug tracking-tight">
        {product.title}
      </h1>

      {/* Ratings & Badges Row */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <button
          type="button"
          onClick={onReviewsClick}
          className="flex items-center gap-1.5 group cursor-pointer"
        >
          <div className="flex items-center text-amazon-amber">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
              />
            ))}
          </div>
          <span className="font-bold text-amazon-text">{product.rating.toFixed(1)}</span>
          <span className="text-amazon-link group-hover:underline">
            ({product.reviewCount.toLocaleString()} verified ratings)
          </span>
        </button>

        {product.isBestSeller && (
          <Badge variant="bestseller">#1 Best Seller in {product.category}</Badge>
        )}
        {product.isDeal && (
          <Badge variant="deal">Limited-Time Deal</Badge>
        )}
      </div>

      <hr className="border-gray-200/80" />

      {/* Pricing Hierarchy */}
      <div className="space-y-1.5">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <span className="text-3xl sm:text-4xl font-black text-amazon-text tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-amazon-muted line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="bg-red-50 text-amazon-deal text-xs font-bold px-2 py-0.5 rounded-full border border-red-200">
                Save {discountPercent}% (${dollarSavings})
              </span>
            </div>
          )}
        </div>

        {product.isPrime && (
          <div className="flex items-center gap-2 pt-1 text-xs text-gray-700">
            <span className="font-extrabold text-amazon-prime italic text-base">prime</span>
            <span>Fast, FREE Next-Day Delivery available for eligible addresses</span>
          </div>
        )}
      </div>

      <hr className="border-gray-200/80" />

      {/* Overview Description */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-amazon-muted mb-1.5">
          About this item
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Key Features Bullet Points */}
      <div className="space-y-2 pt-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amazon-muted">
          Key Features & Highlights
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
