import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { ShippingAddress, PaymentMethodInfo, DeliverySpeed, Order, PurchasedItem } from '../types';
import { getSavedAddresses, saveOrder, DEFAULT_ADDRESS } from '../utils/orderStorage';
import { 
  calculateCheckoutTotals, 
  generateOrderId, 
  generateTrackingNumber, 
  DELIVERY_OPTIONS, 
  formatCurrency 
} from '../utils/checkout';
import { CheckoutStepper } from '../components/checkout/CheckoutStepper';
import { AddressSelector } from '../components/checkout/AddressSelector';
import { DeliveryOptions } from '../components/checkout/DeliveryOptions';
import { PaymentMethods } from '../components/checkout/PaymentMethods';
import { OrderReview } from '../components/checkout/OrderReview';
import { CheckoutSummary } from '../components/checkout/CheckoutSummary';
import { ShoppingCart, ShieldCheck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart, itemCount } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [addresses] = useState<ShippingAddress[]>(getSavedAddresses);
  const [selectedAddress, setSelectedAddress] = useState<ShippingAddress>(() => {
    return addresses[0] || DEFAULT_ADDRESS;
  });

  const [deliverySpeed, setDeliverySpeed] = useState<DeliverySpeed>('free_prime');

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodInfo>({
    type: 'card',
    cardBrand: 'Visa',
    lastFour: '4242',
    cardHolder: 'John Doe',
    expiry: '12/28'
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const selectedDeliveryOption = DELIVERY_OPTIONS.find(o => o.id === deliverySpeed) || DELIVERY_OPTIONS[0];
  const totals = calculateCheckoutTotals(items, deliverySpeed);

  // Empty cart guard
  if (items.length === 0 && !isPlacingOrder) {
    return (
      <Container size="md" className="py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-amber-50 text-amazon-amber rounded-full flex items-center justify-center mx-auto">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">
            Your Cart is Empty
          </h1>
          <p className="text-xs text-amazon-muted max-w-sm mx-auto">
            You don't have any items in your shopping cart to checkout. Add some products to begin.
          </p>
        </div>
        <Link to="/search">
          <Button variant="primary" size="md">
            Start Shopping
          </Button>
        </Link>
      </Container>
    );
  }

  const handlePlaceOrder = () => {
    if (isPlacingOrder || items.length === 0) return;
    setIsPlacingOrder(true);

    const orderId = generateOrderId();
    const trackingNumber = generateTrackingNumber();

    const purchasedItems: PurchasedItem[] = items.map(item => ({
      product: item.product,
      quantity: item.quantity,
      priceAtPurchase: item.product.price
    }));

    const newOrder: Order = {
      orderId,
      createdAt: new Date().toISOString(),
      items: purchasedItems,
      shippingAddress: selectedAddress,
      paymentMethod: selectedPayment,
      deliveryOption: selectedDeliveryOption,
      subtotal: totals.subtotal,
      shippingCost: totals.shipping,
      tax: totals.tax,
      discount: totals.savings,
      total: totals.total,
      deliveryDate: selectedDeliveryOption.estimatedDate,
      estimatedDeliveryDate: selectedDeliveryOption.estimatedDate,
      trackingNumber,
      status: 'ordered'
    };

    // Save order and clear purchased items from cart
    saveOrder(newOrder);
    clearCart();

    // Brief realistic processing feedback
    setTimeout(() => {
      navigate(`/order-confirmation/${orderId}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50/60 pb-24 sm:pb-12 text-left">
      {/* Checkout Security Header */}
      <header className="bg-white border-b border-gray-200 py-3 sticky top-0 z-30 shadow-2xs">
        <Container size="lg" className="flex items-center justify-between">
          <Link to="/" className="flex items-baseline gap-1">
            <span className="text-2xl font-black tracking-tight text-amazon-dark">
              amazon<span className="text-amazon-amber text-xs font-semibold">.checkout</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">256-bit Bank Grade</span> Encryption
            </div>
            <Link to="/cart" className="text-xs text-amazon-link hover:underline font-semibold flex items-center gap-1">
              <ShoppingCart className="w-3.5 h-3.5" /> Cart ({itemCount})
            </Link>
          </div>
        </Container>
      </header>

      <Container size="lg" className="py-6 space-y-6">
        {/* Step Progression Bar */}
        <CheckoutStepper currentStep={step} onStepClick={(s) => setStep(s)} />

        {/* Main Grid: Wizard on Left (8 cols), Summary on Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Active Wizard Step (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-6 space-y-6 bg-white border border-gray-200/90 shadow-xs">
              {step === 1 && (
                <div className="space-y-6">
                  <AddressSelector
                    selectedAddress={selectedAddress}
                    onSelectAddress={setSelectedAddress}
                    onContinue={() => setStep(2)}
                  />

                  <DeliveryOptions
                    selectedSpeed={deliverySpeed}
                    onSelectSpeed={setDeliverySpeed}
                  />
                </div>
              )}

              {step === 2 && (
                <PaymentMethods
                  selectedPayment={selectedPayment}
                  onSelectPayment={setSelectedPayment}
                  onBack={() => setStep(1)}
                  onContinue={() => setStep(3)}
                />
              )}

              {step === 3 && (
                <OrderReview
                  items={items}
                  address={selectedAddress}
                  payment={selectedPayment}
                  deliveryOption={selectedDeliveryOption}
                  totals={totals}
                  isPlacingOrder={isPlacingOrder}
                  onEditStep={(s) => setStep(s)}
                  onPlaceOrder={handlePlaceOrder}
                />
              )}
            </Card>
          </div>

          {/* Right: Sticky Order Summary (4 cols) */}
          <div className="lg:col-span-4">
            <CheckoutSummary
              totals={totals}
              itemCount={itemCount}
              currentStep={step}
              isPlacingOrder={isPlacingOrder}
              onPlaceOrder={handlePlaceOrder}
              onNextStep={() => setStep(prev => Math.min(3, prev + 1) as 1 | 2 | 3)}
            />
          </div>
        </div>
      </Container>

      {/* Mobile Sticky Place Order Bar */}
      {step === 3 && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-gray-500">Total Amount</div>
            <div className="text-lg font-black text-amazon-deal leading-none">
              {formatCurrency(totals.total)}
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            disabled={isPlacingOrder}
            onClick={handlePlaceOrder}
            className="font-bold px-6"
          >
            {isPlacingOrder ? 'Placing...' : 'Place Order'}
          </Button>
        </div>
      )}
    </div>
  );
};
