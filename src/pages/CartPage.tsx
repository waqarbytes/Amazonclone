import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const CartPage: React.FC = () => {
  return (
    <Container className="py-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text text-left">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="text-left space-y-4">
            {/* Free Shipping Progress Indicator */}
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-md flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Your order qualifies for <strong>FREE Delivery</strong>. Choose this option at checkout.</span>
            </div>

            {/* Sample Cart Item Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded p-1 flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80" 
                    alt="Headphones" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amazon-text">Sony WH-1000XM5 Wireless Headphones</h3>
                  <div className="flex items-center gap-2 my-1">
                    <Badge variant="prime">Prime</Badge>
                    <span className="text-xs text-emerald-700 font-semibold">In Stock</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-amazon-link pt-1">
                    <span>Qty: 1</span>
                    <span className="text-gray-300">|</span>
                    <button className="hover:underline">Delete</button>
                    <span className="text-gray-300">|</span>
                    <button className="hover:underline">Save for later</button>
                  </div>
                </div>
              </div>
              <div className="text-right sm:self-center font-bold text-lg text-amazon-text">
                $348.00
              </div>
            </div>

            {/* Subtotal line */}
            <div className="text-right pt-2 text-sm">
              Subtotal (1 item): <strong className="text-lg text-amazon-text">$348.00</strong>
            </div>
          </Card>
        </div>

        {/* Right: Checkout Action Panel (4 cols) */}
        <div className="lg:col-span-4">
          <Card className="text-left space-y-4 shadow-buybox">
            <div className="text-sm text-gray-700">
              Subtotal (1 item): <strong className="text-xl text-amazon-text">$348.00</strong>
            </div>
            <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
              <input type="checkbox" className="rounded text-amazon-amber" />
              <span>This order contains a gift</span>
            </label>
            <Link to="/checkout" className="block">
              <Button variant="primary" fullWidth size="lg">
                Proceed to checkout <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </Container>
  );
};
