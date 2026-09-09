import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../hooks/useWishlist';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { 
  ShoppingCart, 
  Zap, 
  Truck, 
  MapPin, 
  Lock, 
  Heart, 
  Share2, 
  Plus, 
  Minus, 
  Check 
} from 'lucide-react';

interface BuyBoxProps {
  product: Product;
}

export const BuyBox: React.FC<BuyBoxProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [zipCode, setZipCode] = useState(() => {
    return localStorage.getItem('amazon_zip') || 'New York 10001';
  });
  const [isEditingZip, setIsEditingZip] = useState(false);
  const [tempZip, setTempZip] = useState(zipCode);

  const isSaved = isInWishlist(product.id);
  const maxQty = product.stockCount ? Math.min(product.stockCount, 15) : 10;
  const totalPrice = product.price * quantity;

  const handleDecrease = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity(prev => Math.min(maxQty, prev + 1));
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title} on Amazon Rebuild`,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSaveZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempZip.trim()) {
      setZipCode(tempZip.trim());
      localStorage.setItem('amazon_zip', tempZip.trim());
      setIsEditingZip(false);
    }
  };

  return (
    <Card className="border-2 border-gray-200/90 p-5 space-y-4 shadow-sm bg-white sticky top-24">
      {/* Price header */}
      <div>
        <div className="text-2xl sm:text-3xl font-black text-amazon-text tracking-tight">
          ${totalPrice.toFixed(2)}
        </div>
        {quantity > 1 && (
          <p className="text-[11px] text-amazon-muted">
            (${product.price.toFixed(2)} each × {quantity})
          </p>
        )}
      </div>

      {/* Delivery & Prime details */}
      <div className="space-y-1.5 text-xs text-gray-700 bg-gray-50/70 p-3 rounded-lg border border-gray-100">
        {product.isPrime ? (
          <div className="text-emerald-700 font-bold flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-amazon-amber" />
            <span>FREE delivery <strong>Tomorrow</strong></span>
          </div>
        ) : (
          <div className="text-gray-700 flex items-center gap-1.5 font-medium">
            <Truck className="w-4 h-4 text-gray-400" />
            <span>Standard Shipping ($5.99)</span>
          </div>
        )}

        <p className="text-[11px] text-amazon-muted pl-5.5">
          Order within <strong className="text-amazon-text">4 hrs 18 mins</strong> for fastest dispatch
        </p>

        {/* Location selector */}
        <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1 text-gray-600 truncate">
            <MapPin className="w-3.5 h-3.5 text-amazon-muted flex-shrink-0" />
            <span className="truncate">Deliver to {zipCode}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditingZip(prev => !prev)}
            className="text-amazon-link hover:underline font-semibold ml-2 flex-shrink-0"
          >
            {isEditingZip ? 'Cancel' : 'Change'}
          </button>
        </div>

        {isEditingZip && (
          <form onSubmit={handleSaveZip} className="flex items-center gap-1.5 pt-2">
            <input
              type="text"
              value={tempZip}
              onChange={(e) => setTempZip(e.target.value)}
              placeholder="City, State or Zip"
              className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-amazon-amber"
              autoFocus
            />
            <button
              type="submit"
              className="bg-amazon-btn-sec hover:bg-amazon-btn-sec-hover px-2.5 py-1 rounded text-xs font-semibold"
            >
              Update
            </button>
          </form>
        )}
      </div>

      {/* In Stock status */}
      <div>
        {product.inStock ? (
          <div className="space-y-0.5">
            <div className="text-emerald-700 font-bold text-sm flex items-center gap-1.5">
              <Check className="w-4 h-4 stroke-[3]" /> In Stock
            </div>
            {product.stockCount && product.stockCount <= 10 && (
              <p className="text-xs text-amazon-deal font-semibold">
                Only {product.stockCount} left in stock - order soon.
              </p>
            )}
          </div>
        ) : (
          <div className="text-amazon-deal font-bold text-sm">
            Currently Unavailable
          </div>
        )}
      </div>

      {/* Quantity Selector */}
      {product.inStock && (
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-amazon-muted">
            Quantity:
          </label>
          <div className="flex items-center w-full max-w-[150px] border border-gray-300 rounded-lg overflow-hidden bg-gray-50/50">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-10 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <div className="flex-1 text-center font-bold text-sm text-amazon-text">
              {quantity}
            </div>
            <button
              type="button"
              onClick={handleIncrease}
              disabled={quantity >= maxQty}
              aria-label="Increase quantity"
              className="w-10 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Primary Action Buttons */}
      <div className="space-y-2.5 pt-1">
        <Button
          variant="secondary"
          fullWidth
          size="md"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="relative py-2.5 font-bold shadow-xs hover:shadow-sm transition-all"
        >
          {isAdded ? (
            <span className="flex items-center justify-center gap-1.5 text-emerald-800">
              <Check className="w-4 h-4 stroke-[3]" /> Added to Cart
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </span>
          )}
        </Button>

        <Button
          variant="primary"
          fullWidth
          size="md"
          onClick={handleBuyNow}
          disabled={!product.inStock}
          className="py-2.5 font-bold shadow-xs hover:shadow-sm transition-all"
        >
          <span className="flex items-center justify-center gap-1.5">
            <Zap className="w-4 h-4 fill-current" /> Buy Now
          </span>
        </Button>
      </div>

      {/* Secondary Actions: Wishlist & Share */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`
            flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border text-xs font-semibold transition
            ${isSaved 
              ? 'bg-rose-50 border-rose-200 text-rose-700' 
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'}
          `}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-rose-600' : ''}`} />
          <span>{isSaved ? 'In Wishlist' : 'Add to List'}</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Trust & Seller Metadata */}
      <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-2">
        <div className="flex justify-between">
          <span>Ships from</span>
          <span className="font-semibold text-amazon-text">Amazon Fulfillment</span>
        </div>
        <div className="flex justify-between">
          <span>Sold by</span>
          <span className="font-semibold text-amazon-text">{product.brand} Official</span>
        </div>
        <div className="flex justify-between">
          <span>Returns</span>
          <span className="font-semibold text-amazon-text">30-day refund/replacement</span>
        </div>
        <div className="flex justify-between">
          <span>Payment</span>
          <span className="font-semibold text-emerald-700 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Secure transaction
          </span>
        </div>
      </div>
    </Card>
  );
};
