import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { 
  CheckCircle, 
  ArrowRight, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ShoppingBag,
  Truck
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, itemCount } = useCart();

  const freeShippingThreshold = 35.0;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <Container size="md" className="py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-amber-50 text-amazon-amber rounded-full flex items-center justify-center mx-auto shadow-sm">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amazon-text">
            Your Amazon Cart is empty
          </h1>
          <p className="text-xs sm:text-sm text-amazon-muted max-w-sm mx-auto">
            Check out today's deals or continue exploring our catalog of tech, home, and fashion essentials.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/search">
            <Button variant="primary" size="lg">
              <ShoppingBag className="w-4 h-4 mr-2" /> Explore Products
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-6 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-black text-amazon-text">
          Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-amazon-link hover:underline hover:text-amazon-deal transition"
        >
          Deselect all items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Cart Items (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="space-y-4 p-5">
            {/* Free Shipping Meter */}
            <div className={`
              p-3.5 rounded-lg border text-xs flex items-center gap-2.5 transition
              ${isFreeShipping 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-amber-50 border-amber-200 text-amber-900'}
            `}>
              {isFreeShipping ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Your order qualifies for <strong>FREE Delivery</strong> at checkout.</span>
                </>
              ) : (
                <>
                  <Truck className="w-5 h-5 text-amazon-amber flex-shrink-0" />
                  <span>
                    Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> of eligible items to get <strong>FREE delivery</strong>.
                  </span>
                </>
              )}
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-gray-200">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="py-5 flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <Link 
                      to={`/product/${product.id}`}
                      className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-lg p-2 flex-shrink-0 hover:opacity-90 transition flex items-center justify-center"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </Link>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <Link 
                        to={`/product/${product.id}`}
                        className="text-sm font-bold text-amazon-text hover:text-amazon-link transition line-clamp-2"
                      >
                        {product.title}
                      </Link>

                      <div className="flex items-center gap-2">
                        {product.isPrime && (
                          <span className="text-[11px] font-extrabold text-amazon-prime italic">
                            prime
                          </span>
                        )}
                        <span className="text-xs text-emerald-700 font-semibold">In Stock</span>
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center gap-4 pt-2">
                        {/* Stepper */}
                        <div className="inline-flex items-center border border-gray-300 rounded-md bg-gray-50 overflow-hidden shadow-sm">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1.5 hover:bg-gray-200 text-gray-700 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-amazon-text">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1.5 hover:bg-gray-200 text-gray-700 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-gray-300">|</span>

                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="text-xs text-amazon-link hover:underline hover:text-amazon-deal flex items-center gap-1 font-medium"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price Column */}
                  <div className="text-right sm:text-right sm:self-start w-full sm:w-auto">
                    <span className="text-lg font-bold text-amazon-text">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                    {quantity > 1 && (
                      <span className="block text-[11px] text-amazon-muted">
                        (${product.price.toFixed(2)} each)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal line */}
            <div className="text-right pt-4 border-t border-gray-200 text-sm">
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):{' '}
              <strong className="text-xl font-black text-amazon-text">${subtotal.toFixed(2)}</strong>
            </div>
          </Card>
        </div>

        {/* Right: Checkout Sticky Summary (4 cols) */}
        <div className="lg:col-span-4 sticky top-20">
          <Card className="p-5 space-y-4 shadow-buybox border-2 border-gray-200">
            <div className="space-y-1">
              <div className="text-sm text-gray-700">
                Subtotal ({itemCount} items):
              </div>
              <div className="text-2xl font-black text-amazon-text">
                ${subtotal.toFixed(2)}
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer pt-1">
              <input type="checkbox" className="rounded text-amazon-amber focus:ring-amazon-amber h-4 w-4" />
              <span>This order contains a gift</span>
            </label>

            <Link to="/checkout" className="block pt-2">
              <Button variant="primary" fullWidth size="lg">
                Proceed to checkout <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>

            <div className="text-[11px] text-amazon-muted text-center pt-2">
              Free 30-day returns and 256-bit encrypted checkout.
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
};
