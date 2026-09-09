import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CheckCircle, X } from 'lucide-react';

export const CartToast: React.FC = () => {
  const { lastAddedProduct, dismissToast, itemCount, subtotal } = useCart();

  if (!lastAddedProduct) return null;

  return (
    <aside 
      aria-label="Shopping Cart Notifications"
      className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white rounded-lg shadow-2xl border border-gray-200 p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Added to Cart</div>
            <p className="text-xs font-semibold text-amazon-text line-clamp-1 mt-0.5">
              {lastAddedProduct.title}
            </p>
            <div className="text-[11px] text-amazon-muted mt-1">
              Cart subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}): <strong className="text-amazon-text">${subtotal.toFixed(2)}</strong>
            </div>
          </div>
        </div>
        <button 
          onClick={dismissToast}
          className="text-gray-400 hover:text-gray-600 p-1 rounded focus:outline-none"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
        <Link 
          to="/cart" 
          onClick={dismissToast}
          className="flex-1 text-center py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-amazon-text rounded-full text-xs font-semibold transition"
        >
          View Cart
        </Link>
        <Link 
          to="/checkout" 
          onClick={dismissToast}
          className="flex-1 text-center py-1.5 px-3 bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-dark rounded-full text-xs font-bold transition border border-[#fcd200]"
        >
          Checkout
        </Link>
      </div>
    </aside>
  );
};
