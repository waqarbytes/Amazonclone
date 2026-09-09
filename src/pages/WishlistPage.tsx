import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { products, getProductById } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { formatCurrency } from '../utils/checkout';
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { success, info } = useToast();

  const savedProducts = wishlist
    .map(id => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const handleAddToCart = (product: typeof savedProducts[0]) => {
    addToCart(product, 1);
    success(`Added ${product.title.slice(0, 32)}... to your cart`);
  };

  const handleMoveToCart = (product: typeof savedProducts[0]) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
    success(`Moved ${product.title.slice(0, 32)}... to your cart`);
  };

  const handleRemove = (product: typeof savedProducts[0]) => {
    toggleWishlist(product.id);
    info(`Removed ${product.title.slice(0, 32)}... from your Wishlist`);
  };

  // Recommended products for empty state
  const recommended = products.filter(p => p.isBestSeller).slice(0, 4);

  if (savedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50 pb-20 text-left">
        <Container size="md" className="py-16 text-center space-y-6">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-xs border border-rose-100">
            <Heart className="w-10 h-10" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-black text-amazon-text tracking-tight">
              Your list is waiting
            </h1>
            <p className="text-xs sm:text-sm text-amazon-muted leading-relaxed">
              Save items you want to keep track of, compare prices, or purchase later. Click the heart icon on any product to add it here.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Link to="/search">
              <Button variant="primary" size="lg" className="font-bold">
                <Sparkles className="w-4 h-4 mr-2" /> Explore Products
              </Button>
            </Link>
          </div>

          {/* Discovery Grid */}
          <div className="pt-12 border-t border-gray-200 text-left space-y-4">
            <h2 className="text-lg font-bold text-amazon-text">
              Popular Items to Add
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recommended.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 text-left">
      <Container size="lg" className="py-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-amazon-text tracking-tight flex items-center gap-2.5">
              <Heart className="w-7 h-7 text-rose-500 fill-current" />
              Your Wishlist ({savedProducts.length})
            </h1>
            <p className="text-xs text-amazon-muted mt-0.5">
              Private list saved locally in your browser
            </p>
          </div>

          <Link to="/search" className="text-xs font-semibold text-amazon-link hover:underline flex items-center gap-1">
            <span>Discover more items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Wishlist Items List */}
        <Card className="p-5 divide-y divide-gray-100 bg-white">
          {savedProducts.map((product) => {
            const discountPercent = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-xs"
              >
                {/* Image & Main Info */}
                <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
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

                  <div className="space-y-1.5 min-w-0">
                    <span className="text-[10px] font-bold text-amazon-muted uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm sm:text-base font-bold text-amazon-text hover:text-amazon-link transition line-clamp-2"
                    >
                      {product.title}
                    </Link>

                    {/* Ratings */}
                    <div className="flex items-center gap-1 text-amazon-amber text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-gray-700">{product.rating}</span>
                      <span className="text-gray-400">({product.reviewCount.toLocaleString()} reviews)</span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      {product.isPrime && (
                        <span className="font-extrabold text-amazon-prime italic text-xs">prime</span>
                      )}
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                      </span>
                      {discountPercent > 0 && (
                        <Badge variant="deal">Save {discountPercent}%</Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 flex-shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                  <div className="sm:text-right">
                    <div className="text-xl font-black text-amazon-text">
                      {formatCurrency(product.price)}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-xs text-gray-400 line-through">
                        {formatCurrency(product.originalPrice)}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap sm:flex-col gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleMoveToCart(product)}
                      className="font-bold shadow-2xs whitespace-nowrap"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Move to Cart
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="font-semibold whitespace-nowrap"
                    >
                      Add to Cart
                    </Button>

                    <button
                      type="button"
                      onClick={() => handleRemove(product)}
                      className="text-gray-400 hover:text-red-600 text-xs flex items-center justify-center gap-1 py-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </Container>
    </div>
  );
};
