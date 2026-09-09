import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/checkout';
import { X, Star, ShoppingCart, Check, ExternalLink, Plus, Minus, CheckCircle2 } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { success } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
  }, [product]);

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const maxStock = product.stockCount || 15;
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    success(`Added ${quantity} × ${product.title.slice(0, 32)}... to your cart`);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full overflow-hidden text-left animate-in zoom-in-95 duration-150"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Quick View"
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="aspect-square bg-gray-50/70 border border-gray-200 rounded-xl p-4 flex items-center justify-center relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
            {product.isBestSeller && (
              <div className="absolute top-2.5 left-2.5">
                <Badge variant="bestseller">#1 Best Seller</Badge>
              </div>
            )}
          </div>

          {/* Product Summary */}
          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amazon-link tracking-wide uppercase">
                {product.brand}
              </span>

              <h2 id="quickview-title" className="text-base sm:text-lg font-bold text-amazon-text line-clamp-2 leading-snug">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 text-xs text-amazon-amber">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-700">{product.rating}</span>
                <span className="text-gray-400">({product.reviewCount.toLocaleString()})</span>
              </div>

              {/* Price & Savings */}
              <div className="pt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amazon-text">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xs text-gray-400 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                      <span className="bg-red-50 text-amazon-deal text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-red-200">
                        -{discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                {product.isPrime && (
                  <p className="text-[11px] text-gray-600 flex items-center gap-1 mt-0.5">
                    <span className="font-extrabold text-amazon-prime italic text-xs">prime</span>
                    <span>FREE Delivery Tomorrow</span>
                  </p>
                )}
              </div>

              {/* Key Features Bullets */}
              <div className="pt-2 border-t border-gray-100">
                <ul className="space-y-1 text-xs text-gray-600">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions: Stepper + Add to Cart + View Full Details */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="p-1.5 hover:bg-gray-200 text-gray-700 disabled:opacity-40 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-amazon-text">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.min(maxStock, prev + 1))}
                    disabled={quantity >= maxStock}
                    aria-label="Increase quantity"
                    className="p-1.5 hover:bg-gray-200 text-gray-700 disabled:opacity-40 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  size="md"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdded}
                  className="font-bold py-2 shadow-2xs"
                >
                  {isAdded ? (
                    <span className="flex items-center justify-center gap-1 text-emerald-950">
                      <Check className="w-4 h-4 stroke-[3]" /> Added to Cart
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </span>
                  )}
                </Button>
              </div>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="text-xs font-semibold text-amazon-link hover:underline flex items-center justify-center gap-1 pt-1"
              >
                <span>View full product details</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
