import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ArrowLeft, Check, ShieldCheck, Star } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container className="py-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-amazon-muted">
        <Link to="/" className="hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <span>/</span>
        <Link to="/search?category=electronics" className="hover:underline">Electronics</Link>
        <span>/</span>
        <span className="text-amazon-text font-medium truncate max-w-xs">Product Details ({id})</span>
      </nav>

      {/* 3-Column PDP Layout: Gallery | Information | Buy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        {/* Left: Gallery Skeleton (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80" 
              alt="Premium Headphones" 
              className="w-full h-full object-contain p-6"
            />
          </div>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="w-16 h-16 border-2 border-amazon-amber rounded-md overflow-hidden p-1 cursor-pointer bg-gray-50">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80" 
                  alt={`Thumbnail ${n}`} 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center: Product Information (4 cols) */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <div>
            <span className="text-xs text-amazon-link font-semibold uppercase tracking-wider">Sony Store</span>
            <h1 className="text-xl sm:text-2xl font-bold text-amazon-text mt-1">
              Sony WH-1000XM5 Wireless Noise-Cancelling Headphones
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center text-amazon-amber">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-amazon-link hover:underline font-medium">4.8 (12,482 ratings)</span>
          </div>

          <hr className="border-gray-100" />

          {/* Price Box */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-amazon-text">$348.00</span>
              <span className="text-xs text-amazon-muted line-through">$399.99</span>
              <Badge variant="deal">Save 13%</Badge>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-700">
              <Badge variant="prime">Prime</Badge>
              <span>One-Day FREE Delivery</span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Bullets */}
          <div className="space-y-2 text-xs text-gray-700">
            <h3 className="font-bold text-sm text-amazon-text">About this item</h3>
            <ul className="space-y-1.5 list-disc pl-4">
              <li>Industry Leading noise cancellation with two processors and 8 microphones.</li>
              <li>Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback).</li>
              <li>Crystal clear hands-free calling with 4 beamforming microphones.</li>
              <li>Multipoint connection allows you to quickly switch between devices.</li>
            </ul>
          </div>
        </div>

        {/* Right: Amazon Buy Box (3 cols) */}
        <div className="lg:col-span-3">
          <Card className="border-2 border-gray-200 p-5 space-y-4 shadow-buybox text-left">
            <div className="text-2xl font-bold text-amazon-text">$348.00</div>
            <div className="text-xs text-gray-700 space-y-1">
              <div className="flex items-center gap-1 text-amazon-link font-semibold">
                <Badge variant="prime">Prime</Badge>
                <span>FREE delivery <strong>Tomorrow</strong></span>
              </div>
              <p className="text-gray-500">Order within 4 hrs 12 mins</p>
            </div>

            <div className="text-emerald-700 font-bold text-sm flex items-center gap-1">
              <Check className="w-4 h-4" /> In Stock
            </div>

            {/* Quantity Selector */}
            <div className="text-xs space-y-1">
              <label htmlFor="qty" className="font-semibold text-amazon-muted">Quantity:</label>
              <select 
                id="qty" 
                className="w-full bg-gray-50 border border-gray-300 rounded p-1.5 text-xs font-semibold focus:ring-1 focus:ring-amazon-amber"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              <Link to="/cart">
                <Button variant="secondary" fullWidth size="md">
                  Add to Cart
                </Button>
              </Link>
              <Link to="/checkout">
                <Button variant="primary" fullWidth size="md">
                  Buy Now
                </Button>
              </Link>
            </div>

            <div className="pt-2 text-[11px] text-gray-500 space-y-1 border-t border-gray-100">
              <div className="flex justify-between"><span>Ships from</span><span>Amazon</span></div>
              <div className="flex justify-between"><span>Sold by</span><span>Amazon.com</span></div>
              <div className="flex items-center gap-1 text-emerald-700 font-semibold pt-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Return policy: 30-day refund
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
};
