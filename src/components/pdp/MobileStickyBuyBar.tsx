import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Zap, Check } from 'lucide-react';

interface MobileStickyBuyBarProps {
  product: Product;
}

export const MobileStickyBuyBar: React.FC<MobileStickyBuyBarProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
      {/* Price & Stock info */}
      <div className="flex-shrink-0">
        <div className="text-lg font-black text-amazon-text leading-none">
          ${product.price.toFixed(2)}
        </div>
        <div className="text-[11px] text-emerald-700 font-bold">
          {product.isPrime ? 'Prime Free Delivery' : 'In Stock'}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 flex-1 justify-end max-w-[240px]">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          aria-label="Add to cart"
          className={`
            flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all
            ${isAdded 
              ? 'bg-emerald-600 text-white' 
              : 'bg-amazon-btn-sec hover:bg-amazon-btn-sec-hover text-amazon-text shadow-2xs active:scale-95'}
          `}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" /> Cart
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!product.inStock}
          aria-label="Buy now"
          className="flex-1 py-2 px-3 rounded-lg bg-amazon-btn-pri hover:bg-amazon-btn-pri-hover text-amazon-text text-xs font-bold flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all"
        >
          <Zap className="w-3.5 h-3.5 fill-current" /> Buy
        </button>
      </div>
    </div>
  );
};
