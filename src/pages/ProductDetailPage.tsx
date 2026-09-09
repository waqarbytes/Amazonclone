import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  ArrowLeft, 
  Check, 
  Star, 
  ShoppingCart, 
  Zap, 
  Truck,
  RotateCcw,
  Lock
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = id ? getProductById(id) : undefined;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <Container size="md" className="py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-amazon-text">Product Not Found</h1>
        <p className="text-xs text-amazon-muted">The product you requested (ID: {id}) could not be found.</p>
        <Link to="/search">
          <Button variant="primary" size="md">
            Browse All Products
          </Button>
        </Link>
      </Container>
    );
  }

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <Container className="py-6 space-y-6 text-left">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-amazon-muted">
        <Link to="/" className="hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <Link to={`/search?category=${product.category}`} className="hover:underline capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-amazon-text font-medium truncate max-w-sm">{product.title}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm">
        {/* Left: Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-gray-50/50 border border-gray-100 rounded-xl flex items-center justify-center p-6 overflow-hidden">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`
                    w-16 h-16 rounded-lg overflow-hidden p-1 bg-gray-50 border-2 transition
                    ${selectedImageIndex === idx ? 'border-amazon-amber ring-2 ring-amazon-amber/30' : 'border-gray-200 hover:border-gray-400'}
                  `}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Details & Specifications (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div>
            <span className="text-xs font-bold text-amazon-link tracking-wider uppercase">
              Brand: {product.brand}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-amazon-text mt-1 leading-snug">
              {product.title}
            </h1>
          </div>

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
            <span className="text-amazon-link hover:underline">({product.reviewCount.toLocaleString()} ratings)</span>
          </div>

          <hr className="border-gray-100" />

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-amazon-text">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-amazon-muted line-through">${product.originalPrice.toFixed(2)}</span>
                  <Badge variant="deal">Save {discountPercent}%</Badge>
                </>
              )}
            </div>
            {product.isPrime && (
              <div className="flex items-center gap-1.5 text-xs text-gray-700">
                <span className="font-extrabold text-amazon-prime italic text-sm">prime</span>
                <span>Fast, FREE Next-Day Delivery</span>
              </div>
            )}
          </div>

          <hr className="border-gray-100" />

          {/* Description */}
          <p className="text-xs text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Key Features */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amazon-muted">Key Features</h3>
            <ul className="space-y-1.5 text-xs text-gray-700 list-disc pl-4">
              {product.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </div>

          {/* Specifications Table */}
          <div className="space-y-2 pt-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-amazon-muted">Technical Specifications</h3>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-xs divide-y divide-gray-200">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1.5">
                  <span className="text-amazon-muted">{key}</span>
                  <span className="font-semibold text-amazon-text text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Amazon Buy Box (3 cols) */}
        <div className="lg:col-span-3">
          <Card className="border-2 border-gray-200 p-5 space-y-4 shadow-buybox">
            <div className="text-2xl font-black text-amazon-text">
              ${(product.price * quantity).toFixed(2)}
            </div>

            <div className="text-xs text-gray-700 space-y-1">
              {product.isPrime ? (
                <div className="text-emerald-700 font-bold flex items-center gap-1">
                  <Truck className="w-4 h-4 text-amazon-amber" />
                  <span>FREE delivery <strong>Tomorrow</strong></span>
                </div>
              ) : (
                <div className="text-gray-600">Standard Delivery available</div>
              )}
              <p className="text-[11px] text-amazon-muted">Order within 4 hrs 15 mins</p>
            </div>

            {product.inStock ? (
              <div className="text-emerald-700 font-bold text-sm flex items-center gap-1">
                <Check className="w-4 h-4" /> In Stock ({product.stockCount} available)
              </div>
            ) : (
              <div className="text-amazon-deal font-bold text-sm">Currently Unavailable</div>
            )}

            {/* Quantity Selector */}
            <div className="text-xs space-y-1">
              <label htmlFor="pdp-qty" className="font-bold text-amazon-muted">Quantity:</label>
              <select
                id="pdp-qty"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-xs font-semibold focus:ring-1 focus:ring-amazon-amber cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <Button
                variant="secondary"
                fullWidth
                size="md"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 mr-1" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
                  </>
                )}
              </Button>

              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                <Zap className="w-4 h-4 mr-1 fill-current" /> Buy Now
              </Button>
            </div>

            {/* Trust Details */}
            <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 space-y-1.5">
              <div className="flex justify-between">
                <span>Ships from</span>
                <span className="font-medium text-amazon-text">Amazon Fulfillment</span>
              </div>
              <div className="flex justify-between">
                <span>Sold by</span>
                <span className="font-medium text-amazon-text">{product.brand} Official</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-700 font-semibold pt-1">
                <RotateCcw className="w-3.5 h-3.5" /> 30-day return policy
              </div>
              <div className="flex items-center gap-1 text-blue-700 font-semibold">
                <Lock className="w-3.5 h-3.5" /> Secure transaction
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
};
