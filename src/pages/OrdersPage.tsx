import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Truck } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  return (
    <Container className="py-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text text-left">Your Orders</h1>

      {/* Orders Filter Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 text-xs font-semibold text-amazon-muted text-left">
        <span className="text-amazon-text border-b-2 border-amazon-amber pb-2 cursor-pointer">Orders</span>
        <span className="hover:text-amazon-text pb-2 cursor-pointer">Buy Again</span>
        <span className="hover:text-amazon-text pb-2 cursor-pointer">Not Yet Shipped</span>
        <span className="hover:text-amazon-text pb-2 cursor-pointer">Cancelled Orders</span>
      </div>

      {/* Sample Order Card */}
      <Card className="text-left p-0 overflow-hidden border border-gray-200">
        {/* Order Header */}
        <div className="bg-gray-100/80 px-5 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-amazon-muted">
          <div className="flex items-center gap-6">
            <div>
              <span className="block text-[11px] uppercase tracking-wider">Order Placed</span>
              <span className="font-semibold text-amazon-text">September 9, 2026</span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider">Total</span>
              <span className="font-semibold text-amazon-text">$375.84</span>
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-wider">Ship To</span>
              <span className="font-semibold text-amazon-link hover:underline cursor-pointer">John Doe</span>
            </div>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-wider">Order # 114-8921820-38192</span>
            <span className="text-amazon-link hover:underline cursor-pointer text-xs">View invoice</span>
          </div>
        </div>

        {/* Order Content */}
        <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded p-1 flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80" 
                alt="Product" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                <Truck className="w-4 h-4" /> Arriving Tomorrow by 8 PM
              </div>
              <h3 className="text-sm font-bold text-amazon-text">Sony WH-1000XM5 Wireless Headphones</h3>
              <p className="text-xs text-amazon-muted">Sold by: Amazon.com Services LLC</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <Link to="/product/prod-1">
              <Button variant="primary" size="sm" fullWidth>
                Buy it again
              </Button>
            </Link>
            <Button variant="outline" size="sm" fullWidth>
              Track package
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
};
