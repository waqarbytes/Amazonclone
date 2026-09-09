import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { calculateCheckoutTotals, formatCurrency, FREE_SHIPPING_THRESHOLD } from '../utils/checkout';
import { 
  CheckCircle2, 
  ArrowRight, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Truck,
  Bookmark,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Lock,
  Star
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    items, 
    savedForLater, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    saveForLater, 
    moveToCart, 
    removeFromSaved, 
    itemCount 
  } = useCart();

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const totals = calculateCheckoutTotals(items);
  const progressPct = Math.min(100, Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Contextual recommendations: products from the same categories as items in cart, or bestsellers
  const cartCategories = Array.from(new Set(items.map(i => i.product.category)));
  const cartProductIds = new Set(items.map(i => i.product.id));

  const recommendedProducts = products
    .filter(p => !cartProductIds.has(p.id))
    .filter(p => cartCategories.length === 0 || cartCategories.includes(p.category) || p.isBestSeller)
    .slice(0, 4);

  // Empty cart view
  if (items.length === 0 && savedForLater.length === 0) {
    return (
      <Container size="md" className="py-16 text-center space-y-8">
        <div className="w-20 h-20 bg-amber-50 text-amazon-amber rounded-full flex items-center justify-center mx-auto shadow-xs border border-amber-100">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amazon-text tracking-tight">
            Your Shopping Cart is empty
          </h1>
          <p className="text-xs sm:text-sm text-amazon-muted leading-relaxed">
            Your shopping cart is waiting. Give it purpose — fill it with electronics, fashion, books, and daily essentials.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/search">
            <Button variant="primary" size="lg" className="font-bold shadow-xs">
              <Sparkles className="w-4 h-4 mr-2" /> Explore Today's Deals
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" size="lg" className="font-semibold">
              Return to Homepage
            </Button>
          </Link>
        </div>

        {/* Recommended Products in Empty State */}
        {recommendedProducts.length > 0 && (
          <div className="pt-12 border-t border-gray-200 text-left space-y-4">
            <h2 className="text-lg font-bold text-amazon-text">
              Recommended for you
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recommendedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 sm:pb-12 text-left">
      <Container className="py-6 space-y-6">
        {/* Cart Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-amazon-text tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs text-amazon-muted mt-0.5">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link 
              to="/search" 
              className="text-amazon-link hover:underline flex items-center gap-1"
            >
              Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {items.length > 0 && (
              <>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="text-gray-500 hover:text-red-600 transition"
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>
        </div>

        {/* Clear Cart Confirmation Prompt */}
        {showClearConfirm && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center justify-between text-xs text-red-800">
            <span>Are you sure you want to remove all items from your cart?</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1 bg-white border border-gray-300 rounded font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="px-3 py-1 bg-red-600 text-white rounded font-bold hover:bg-red-700"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items & Saved for Later (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Delivery Progress Meter */}
            <Card className="p-4 space-y-2 border-emerald-100 bg-gradient-to-r from-emerald-50/70 to-white">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-gray-800">
                  <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  {totals.isFreeShippingEligible ? (
                    <span className="text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Your order qualifies for <strong>FREE Delivery!</strong>
                    </span>
                  ) : (
                    <span>
                      Add <strong>{formatCurrency(totals.remainingForFreeShipping)}</strong> more of eligible items to get <strong>FREE Delivery</strong>
                    </span>
                  )}
                </div>
                <span className="font-bold text-[11px] text-gray-500">
                  {progressPct}%
                </span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </Card>

            {/* Active Cart Items */}
            {items.length > 0 ? (
              <Card className="p-5 divide-y divide-gray-100 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
                  <span>Price</span>
                </div>

                {items.map(({ product, quantity }) => {
                  const maxStock = product.stockCount || 15;
                  const discountPercent = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;

                  return (
                    <div key={product.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row gap-4 items-start">
                      {/* Thumbnail */}
                      <Link
                        to={`/product/${product.id}`}
                        className="w-24 h-24 sm:w-28 sm:h-28 bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-center flex-shrink-0 hover:opacity-90 transition"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <Link
                            to={`/product/${product.id}`}
                            className="text-sm sm:text-base font-bold text-amazon-text hover:text-amazon-link transition line-clamp-2"
                          >
                            {product.title}
                          </Link>
                          <div className="text-right flex-shrink-0">
                            <span className="text-base sm:text-lg font-black text-amazon-text">
                              {formatCurrency(product.price * quantity)}
                            </span>
                            {quantity > 1 && (
                              <p className="text-[11px] text-amazon-muted">
                                ({formatCurrency(product.price)} each)
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Brand & Rating */}
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="font-semibold text-amazon-text">{product.brand}</span>
                          <span>•</span>
                          <div className="flex items-center text-amazon-amber gap-0.5">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="font-bold text-gray-700">{product.rating}</span>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          {product.isPrime && (
                            <span className="font-extrabold text-amazon-prime italic text-xs">prime</span>
                          )}
                          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                          </span>
                          {discountPercent > 0 && (
                            <Badge variant="deal">Save {discountPercent}%</Badge>
                          )}
                        </div>

                        <p className="text-[11px] text-gray-500 pt-0.5">
                          FREE delivery <strong>Tomorrow</strong> with Prime
                        </p>

                        {/* Quantity Stepper & Actions */}
                        <div className="flex flex-wrap items-center gap-3 pt-3">
                          {/* Stepper */}
                          <div className="inline-flex items-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1.5 hover:bg-gray-200 text-gray-700 transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-amazon-text">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              disabled={quantity >= maxStock}
                              className="p-1.5 hover:bg-gray-200 text-gray-700 disabled:opacity-40 transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-gray-300">|</span>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="text-xs text-amazon-link hover:underline text-gray-600 hover:text-red-600 flex items-center gap-1 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>

                          <span className="text-gray-300">|</span>

                          {/* Save for later */}
                          <button
                            type="button"
                            onClick={() => saveForLater(product.id)}
                            className="text-xs text-amazon-link hover:underline text-gray-600 flex items-center gap-1 transition"
                          >
                            <Bookmark className="w-3.5 h-3.5" /> Save for later
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card>
            ) : (
              <Card className="p-8 text-center space-y-3">
                <p className="text-sm font-semibold text-gray-600">
                  No active items in your cart. Check your saved items below or continue shopping.
                </p>
                <Link to="/search">
                  <Button variant="primary" size="md">
                    Explore Catalog
                  </Button>
                </Link>
              </Card>
            )}

            {/* Save for Later Section */}
            {savedForLater.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <h2 className="text-lg font-bold text-amazon-text">
                    Saved for Later ({savedForLater.length} {savedForLater.length === 1 ? 'item' : 'items'})
                  </h2>
                  <p className="text-xs text-amazon-muted">
                    Items moved here will remain saved in your browser until you are ready to buy.
                  </p>
                </div>

                <Card className="p-5 divide-y divide-gray-100">
                  {savedForLater.map(({ product }) => (
                    <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start">
                      <Link
                        to={`/product/${product.id}`}
                        className="w-20 h-20 bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center flex-shrink-0"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </Link>

                      <div className="flex-1 space-y-1">
                        <Link
                          to={`/product/${product.id}`}
                          className="text-xs sm:text-sm font-bold text-amazon-text hover:text-amazon-link line-clamp-1"
                        >
                          {product.title}
                        </Link>
                        <div className="text-sm font-black text-amazon-text">
                          {formatCurrency(product.price)}
                        </div>
                        <p className="text-[11px] text-emerald-700 font-semibold">In Stock</p>

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => moveToCart(product.id)}
                            className="text-xs font-bold bg-amazon-btn-sec hover:bg-amazon-btn-sec-hover text-amazon-text px-3 py-1 rounded border border-gray-300 transition"
                          >
                            Move to Cart
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromSaved(product.id)}
                            className="text-xs text-gray-500 hover:text-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            )}

            {/* Cart Recommendations ("Complete Your Setup") */}
            {recommendedProducts.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div>
                  <h2 className="text-lg font-bold text-amazon-text">
                    Complete Your Setup
                  </h2>
                  <p className="text-xs text-amazon-muted">
                    Frequently purchased alongside products currently in your cart
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {recommendedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Cart Order Summary (4 cols) */}
          <div className="lg:col-span-4">
            <Card className="p-6 space-y-4 border-2 border-gray-200/90 shadow-sm sticky top-24">
              <h2 className="text-base font-bold text-amazon-text border-b border-gray-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):</span>
                  <span className="font-semibold text-amazon-text">{formatCurrency(totals.subtotal)}</span>
                </div>

                {totals.savings > 0 && (
                  <div className="flex justify-between text-amazon-deal font-semibold">
                    <span>Total Savings:</span>
                    <span>-{formatCurrency(totals.savings)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping & handling:</span>
                  <span className={totals.shipping === 0 ? 'text-emerald-700 font-semibold' : 'font-semibold text-amazon-text'}>
                    {totals.shipping === 0 ? 'FREE' : formatCurrency(totals.shipping)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8.875%):</span>
                  <span className="font-semibold text-amazon-text">{formatCurrency(totals.tax)}</span>
                </div>

                <hr className="border-gray-200/80 my-2" />

                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-base font-bold text-amazon-text">Order Total:</span>
                  <span className="text-2xl font-black text-amazon-deal">
                    {formatCurrency(totals.total)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => navigate('/checkout')}
                disabled={items.length === 0}
                className="py-3 font-bold text-sm shadow-xs hover:shadow-sm"
              >
                Proceed to Checkout ({itemCount})
              </Button>

              {/* Trust Badges in Summary */}
              <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <Lock className="w-3.5 h-3.5" /> 256-bit Bank-grade Encryption
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-gray-400" /> 30-day hassle-free returns
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gray-400" /> Amazon Buyer Protection
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>

      {/* Mobile Sticky Bottom Checkout Bar */}
      {items.length > 0 && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-gray-500">Subtotal ({itemCount} items)</div>
            <div className="text-lg font-black text-amazon-deal leading-none">
              {formatCurrency(totals.total)}
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/checkout')}
            className="font-bold px-5"
          >
            Checkout ({itemCount})
          </Button>
        </div>
      )}
    </div>
  );
};
