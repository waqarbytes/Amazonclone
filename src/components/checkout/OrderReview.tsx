import React from 'react';
import { CartItem, ShippingAddress, PaymentMethodInfo, DeliveryOption } from '../../types';
import { PriceBreakdown, formatCurrency } from '../../utils/checkout';
import { Button } from '../common/Button';
import { MapPin, CreditCard, Truck, Smartphone, Banknote, Edit2, ShieldCheck, Lock } from 'lucide-react';

interface OrderReviewProps {
  items: CartItem[];
  address: ShippingAddress;
  payment: PaymentMethodInfo;
  deliveryOption: DeliveryOption;
  totals: PriceBreakdown;
  isPlacingOrder: boolean;
  onEditStep: (step: 1 | 2) => void;
  onPlaceOrder: () => void;
}

export const OrderReview: React.FC<OrderReviewProps> = ({
  items,
  address,
  payment,
  deliveryOption,
  totals,
  isPlacingOrder,
  onEditStep,
  onPlaceOrder
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-amazon-text">
          Review your order
        </h2>
        <p className="text-xs text-amazon-muted">
          Please confirm your delivery address, payment method, and purchased items before placing your order.
        </p>
      </div>

      {/* Review Information Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Shipping Address */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-gray-500 font-bold uppercase text-[10px]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amazon-amber" /> Shipping Address
              </span>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-amazon-link hover:underline font-semibold flex items-center gap-0.5 normal-case"
              >
                <Edit2 className="w-3 h-3" /> Change
              </button>
            </div>
            <p className="font-bold text-sm text-amazon-text">{address.fullName}</p>
            <p className="text-gray-600 leading-relaxed">
              {address.street}{address.apt ? `, ${address.apt}` : ''}<br />
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p className="text-gray-500">Phone: {address.phone}</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-gray-500 font-bold uppercase text-[10px]">
              <span className="flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-amazon-amber" /> Payment Method
              </span>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="text-amazon-link hover:underline font-semibold flex items-center gap-0.5 normal-case"
              >
                <Edit2 className="w-3 h-3" /> Change
              </button>
            </div>

            {payment.type === 'card' && (
              <div>
                <p className="font-bold text-sm text-amazon-text flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  {payment.cardBrand || 'Visa'} ending in {payment.lastFour || '4242'}
                </p>
                <p className="text-gray-500 pt-0.5">Exp: {payment.expiry || '12/28'}</p>
                <p className="text-gray-500">Cardholder: {payment.cardHolder || address.fullName}</p>
              </div>
            )}

            {payment.type === 'upi' && (
              <div>
                <p className="font-bold text-sm text-amazon-text flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  UPI / Instant Transfer
                </p>
                <p className="text-gray-600 pt-0.5">{payment.upiId}</p>
              </div>
            )}

            {payment.type === 'cod' && (
              <div>
                <p className="font-bold text-sm text-amazon-text flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-amber-600" />
                  Cash on Delivery (COD)
                </p>
                <p className="text-gray-600 pt-0.5">Pay in cash or UPI upon delivery</p>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Speed */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-gray-500 font-bold uppercase text-[10px]">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amazon-amber" /> Delivery Speed
              </span>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-amazon-link hover:underline font-semibold flex items-center gap-0.5 normal-case"
              >
                <Edit2 className="w-3 h-3" /> Change
              </button>
            </div>
            <p className="font-bold text-sm text-amazon-text">{deliveryOption.title}</p>
            <p className="text-emerald-700 font-semibold">{deliveryOption.speedText}</p>
            <p className="text-gray-500">Estimated: {deliveryOption.estimatedDate}</p>
          </div>
        </div>
      </div>

      {/* Items Review List */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <h3 className="text-sm font-bold text-amazon-text border-b border-gray-100 pb-2">
          Items to be shipped ({items.length})
        </h3>

        <div className="divide-y divide-gray-100">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-14 h-14 object-contain rounded-lg border border-gray-200 p-1 bg-gray-50 flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-bold text-amazon-text line-clamp-1">{product.title}</p>
                  <p className="text-gray-500">Quantity: <strong>{quantity}</strong></p>
                  <p className="text-emerald-700 font-semibold text-[11px]">In Stock</p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="font-bold text-sm text-amazon-text">
                  {formatCurrency(product.price * quantity)}
                </span>
                {quantity > 1 && (
                  <p className="text-[11px] text-gray-400">({formatCurrency(product.price)} each)</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Place Order CTA Banner */}
      <div className="p-4 bg-amber-50/60 border border-amazon-amber/40 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-left text-xs">
          <p className="font-bold text-sm text-amazon-text flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-700" /> By placing your order, you agree to Amazon's conditions of use.
          </p>
          <p className="text-gray-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Your order is covered by Amazon Buyer Guarantee and 30-day returns.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          disabled={isPlacingOrder}
          onClick={onPlaceOrder}
          className="w-full sm:w-auto font-black text-sm px-8 py-3.5 shadow-md hover:shadow-lg whitespace-nowrap"
        >
          {isPlacingOrder ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Placing Your Order...
            </span>
          ) : (
            `Place Your Order (${formatCurrency(totals.total)})`
          )}
        </Button>
      </div>
    </div>
  );
};
