import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Order, Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/checkout';
import { OrderTimeline } from './OrderTimeline';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Truck, Check, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { addToCart } = useCart();
  const [showTracking, setShowTracking] = useState(false);
  const [boughtAgainId, setBoughtAgainId] = useState<string | null>(null);

  const handleBuyAgain = (product: Product) => {
    addToCart(product, 1);
    setBoughtAgainId(product.id);
    setTimeout(() => {
      setBoughtAgainId(null);
    }, 2000);
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card className="p-0 overflow-hidden border border-gray-200/90 shadow-2xs text-left">
      {/* Order Header Bar */}
      <div className="bg-gray-100/80 px-5 py-3.5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-amazon-muted">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold">
              Order Placed
            </span>
            <span className="font-semibold text-amazon-text">{formattedDate}</span>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold">
              Total
            </span>
            <span className="font-black text-amazon-text">{formatCurrency(order.total)}</span>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold">
              Ship To
            </span>
            <span className="font-semibold text-amazon-link" title={order.shippingAddress.street}>
              {order.shippingAddress.fullName}
            </span>
          </div>
        </div>

        <div>
          <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold">
            Order #{order.orderId}
          </span>
          <Link 
            to={`/order-confirmation/${order.orderId}`}
            className="text-amazon-link hover:underline font-semibold text-[11px]"
          >
            View confirmation
          </Link>
        </div>
      </div>

      {/* Order Content Body */}
      <div className="p-5 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-bold text-sm text-amazon-text">
              Estimated Delivery: {order.deliveryDate || order.estimatedDeliveryDate || 'Tomorrow by 8 PM'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowTracking(prev => !prev)}
            className="text-xs font-bold text-amazon-link hover:underline flex items-center gap-1"
          >
            <Truck className="w-4 h-4 text-amazon-amber" />
            {showTracking ? 'Hide Tracking Details' : 'Track Package'}
            {showTracking ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Tracking Timeline */}
        {showTracking && (
          <div className="pt-1">
            <OrderTimeline order={order} />
          </div>
        )}

        {/* Products in this Order */}
        <div className="space-y-4">
          {order.items.map((item, idx) => {
            const product = item.product;
            const quantity = item.quantity;
            const isBought = boughtAgainId === product.id;

            return (
              <div 
                key={idx} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <Link
                    to={`/product/${product.id}`}
                    className="w-20 h-20 bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-center flex-shrink-0 hover:opacity-90 transition"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </Link>

                  <div className="space-y-1 min-w-0">
                    <Link
                      to={`/product/${product.id}`}
                      className="font-bold text-xs sm:text-sm text-amazon-text hover:text-amazon-link transition line-clamp-2"
                    >
                      {product.title}
                    </Link>
                    <p className="text-xs text-gray-500">
                      Brand: <span className="font-semibold text-gray-700">{product.brand}</span> • Qty: {quantity}
                    </p>
                    <p className="text-xs font-black text-amazon-text">
                      {formatCurrency(('priceAtPurchase' in item ? item.priceAtPurchase : product.price) * quantity)}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 w-full sm:w-36 flex-shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => handleBuyAgain(product)}
                    className="font-bold shadow-2xs"
                  >
                    {isBought ? (
                      <span className="flex items-center justify-center gap-1 text-emerald-950">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Added to Cart
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <RotateCcw className="w-3.5 h-3.5" /> Buy it again
                      </span>
                    )}
                  </Button>

                  <Link to={`/product/${product.id}`} className="w-full">
                    <Button variant="outline" size="sm" fullWidth>
                      View item
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
