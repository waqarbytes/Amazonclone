import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Order } from '../types';
import { getOrderById } from '../utils/orderStorage';
import { formatCurrency } from '../utils/checkout';
import { OrderTimeline } from '../components/order/OrderTimeline';
import { 
  CheckCircle2, 
  Package, 
  ArrowRight, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Banknote,
  AlertCircle 
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | undefined>(() => {
    return id ? getOrderById(id) : undefined;
  });

  useEffect(() => {
    if (id) {
      setOrder(getOrderById(id));
    }
  }, [id]);

  if (!order) {
    return (
      <Container size="md" className="py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-amber-50 text-amazon-amber rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">
            Order Not Found
          </h1>
          <p className="text-xs text-amazon-muted max-w-sm mx-auto">
            We couldn't locate order #{id}. It may have been placed under a different session or removed.
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <Link to="/orders">
            <Button variant="secondary" size="md">
              View Order History
            </Button>
          </Link>
          <Link to="/">
            <Button variant="primary" size="md">
              Return Home
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16 text-left">
      <Container size="lg" className="py-8 space-y-8">
        {/* Success Banner Card */}
        <Card className="p-6 sm:p-8 border-t-4 border-t-emerald-600 shadow-sm bg-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-amazon-text tracking-tight">
                  Order placed, thank you!
                </h1>
                <p className="text-xs text-gray-600">
                  Confirmation has been sent to your email. Order <span className="font-bold text-amazon-text">#{order.orderId}</span>
                </p>
                <p className="text-xs text-emerald-700 font-semibold">
                  Estimated Delivery: {order.deliveryDate || order.estimatedDeliveryDate || 'Tomorrow'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link to="/orders">
                <Button variant="outline" size="sm" className="font-semibold">
                  <Package className="w-4 h-4 mr-1.5" /> View your orders
                </Button>
              </Link>
              <Link to="/">
                <Button variant="primary" size="sm" className="font-bold">
                  Continue shopping <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Tracking Timeline */}
        <OrderTimeline order={order} />

        {/* Order Details & Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Shipping Address */}
          <Card className="p-5 space-y-2 text-xs">
            <h3 className="font-bold text-sm text-amazon-text flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <MapPin className="w-4 h-4 text-amazon-amber" /> Shipping Address
            </h3>
            <p className="font-bold text-amazon-text">{order.shippingAddress.fullName}</p>
            <p className="text-gray-600 leading-relaxed">
              {order.shippingAddress.street}{order.shippingAddress.apt ? `, ${order.shippingAddress.apt}` : ''}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
              {order.shippingAddress.country}
            </p>
            <p className="text-gray-500 pt-1">Phone: {order.shippingAddress.phone}</p>
          </Card>

          {/* Payment Method */}
          <Card className="p-5 space-y-2 text-xs">
            <h3 className="font-bold text-sm text-amazon-text flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <CreditCard className="w-4 h-4 text-amazon-amber" /> Payment Method
            </h3>
            {order.paymentMethod.type === 'card' && (
              <div className="space-y-1">
                <p className="font-bold text-amazon-text flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  {order.paymentMethod.cardBrand || 'Card'} ending in {order.paymentMethod.lastFour || '4242'}
                </p>
                <p className="text-gray-500">Exp: {order.paymentMethod.expiry || '12/28'}</p>
                <p className="text-gray-500">Name: {order.paymentMethod.cardHolder || order.shippingAddress.fullName}</p>
              </div>
            )}
            {order.paymentMethod.type === 'upi' && (
              <div className="space-y-1">
                <p className="font-bold text-amazon-text flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" /> UPI Transfer
                </p>
                <p className="text-gray-600">{order.paymentMethod.upiId}</p>
              </div>
            )}
            {order.paymentMethod.type === 'cod' && (
              <div className="space-y-1">
                <p className="font-bold text-amazon-text flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-amber-600" /> Cash on Delivery (COD)
                </p>
                <p className="text-gray-600">Pay upon package delivery</p>
              </div>
            )}
          </Card>

          {/* Order Totals Summary */}
          <Card className="p-5 space-y-2 text-xs">
            <h3 className="font-bold text-sm text-amazon-text border-b border-gray-100 pb-2">
              Order Summary
            </h3>
            <div className="space-y-1.5 text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-amazon-text">{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount && order.discount > 0 && (
                <div className="flex justify-between text-amazon-deal font-semibold">
                  <span>Savings:</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className={order.shippingCost === 0 ? 'text-emerald-700 font-semibold' : 'font-semibold text-amazon-text'}>
                  {order.shippingCost === 0 ? 'FREE' : formatCurrency(order.shippingCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax:</span>
                <span className="font-semibold text-amazon-text">{formatCurrency(order.tax)}</span>
              </div>
              <hr className="border-gray-100 my-1" />
              <div className="flex justify-between items-baseline font-bold text-sm text-amazon-text pt-1">
                <span>Grand Total:</span>
                <span className="text-base font-black text-amazon-deal">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Ordered Items Breakdown */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-base font-bold text-amazon-text">
              Purchased Items ({order.items.length})
            </h2>
            <span className="text-xs text-gray-500">Order Placed on {orderDate}</span>
          </div>

          <div className="divide-y divide-gray-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4 min-w-0">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-16 h-16 bg-white border border-gray-200 rounded-lg p-1.5 flex items-center justify-center flex-shrink-0 hover:opacity-90"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </Link>

                  <div className="space-y-0.5 min-w-0">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-bold text-sm text-amazon-text hover:text-amazon-link transition line-clamp-1"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-gray-500">
                      Brand: <span className="font-semibold text-gray-700">{item.product.brand}</span>
                    </p>
                    <p className="text-gray-500">
                      Qty: <strong>{item.quantity}</strong> • Price at purchase: {formatCurrency(('priceAtPurchase' in item ? item.priceAtPurchase : item.product.price))}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 font-bold text-sm text-amazon-text">
                  {formatCurrency(('priceAtPurchase' in item ? item.priceAtPurchase : item.product.price) * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Container>
    </div>
  );
};
