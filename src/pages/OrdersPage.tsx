import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Order } from '../types';
import { getOrders } from '../utils/orderStorage';
import { OrderCard } from '../components/order/OrderCard';
import { Package, Search, ShoppingBag } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'buy_again' | 'in_transit' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const filteredOrders = orders.filter(order => {
    // Filter by tab
    if (activeTab === 'in_transit' && (order.status === 'delivered')) return false;
    if (activeTab === 'delivered' && order.status !== 'delivered') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesId = order.orderId.toLowerCase().includes(q);
      const matchesItem = order.items.some(i => 
        i.product.title.toLowerCase().includes(q) || i.product.brand.toLowerCase().includes(q)
      );
      return matchesId || matchesItem;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 text-left">
      <Container size="lg" className="py-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-amazon-text tracking-tight">
              Your Orders
            </h1>
            <p className="text-xs text-amazon-muted mt-0.5">
              Track packages, buy items again, or review order history
            </p>
          </div>

          {/* Order Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all orders..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-amazon-amber focus:border-amazon-amber shadow-2xs"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-4 sm:gap-6 border-b border-gray-200 text-xs font-semibold text-amazon-muted overflow-x-auto hide-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`pb-3 transition relative whitespace-nowrap ${
              activeTab === 'all' 
                ? 'text-amazon-text font-bold border-b-2 border-amazon-amber' 
                : 'hover:text-amazon-text'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('buy_again')}
            className={`pb-3 transition relative whitespace-nowrap ${
              activeTab === 'buy_again' 
                ? 'text-amazon-text font-bold border-b-2 border-amazon-amber' 
                : 'hover:text-amazon-text'
            }`}
          >
            Buy Again
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('in_transit')}
            className={`pb-3 transition relative whitespace-nowrap ${
              activeTab === 'in_transit' 
                ? 'text-amazon-text font-bold border-b-2 border-amazon-amber' 
                : 'hover:text-amazon-text'
            }`}
          >
            Not Yet Delivered
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('delivered')}
            className={`pb-3 transition relative whitespace-nowrap ${
              activeTab === 'delivered' 
                ? 'text-amazon-text font-bold border-b-2 border-amazon-amber' 
                : 'hover:text-amazon-text'
            }`}
          >
            Delivered
          </button>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <OrderCard key={order.orderId} order={order} />
            ))}
          </div>
        ) : (
          <div className="p-12 bg-white rounded-2xl border border-gray-200 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 bg-amber-50 text-amazon-amber rounded-full flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-amazon-text">
                {orders.length === 0 ? 'No orders placed yet' : 'No matching orders found'}
              </h2>
              <p className="text-xs text-amazon-muted max-w-sm mx-auto">
                {orders.length === 0
                  ? "Looking for past orders? Browse our catalog and place your first order today!"
                  : "We couldn't find any orders matching your search or active filter."}
              </p>
            </div>
            <div className="pt-2">
              <Link to="/search">
                <Button variant="primary" size="md">
                  <ShoppingBag className="w-4 h-4 mr-1.5" /> Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
