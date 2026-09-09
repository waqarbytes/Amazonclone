import React, { useState } from 'react';
import { PaymentMethodInfo, PaymentType } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { CreditCard, Smartphone, Banknote, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface PaymentMethodsProps {
  selectedPayment: PaymentMethodInfo;
  onSelectPayment: (payment: PaymentMethodInfo) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedPayment,
  onSelectPayment,
  onBack,
  onContinue
}) => {
  const [activeType, setActiveType] = useState<PaymentType>(selectedPayment.type || 'card');

  // Card form state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState(selectedPayment.cardHolder || 'John Doe');
  const [expiry, setExpiry] = useState(selectedPayment.expiry || '12/28');
  const [cvv, setCvv] = useState('•••');
  const [cardError, setCardError] = useState('');

  // UPI state
  const [upiId, setUpiId] = useState(selectedPayment.upiId || 'johndoe@okaxis');
  const [upiError, setUpiError] = useState('');

  // Formatting helpers
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted || val);
    setCardError('');
  };

  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setExpiry(raw);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeType === 'card') {
      if (!cardHolder.trim()) {
        setCardError('Cardholder name is required');
        return;
      }
      const rawDigits = cardNumber.replace(/\D/g, '');
      const lastFour = rawDigits.length >= 4 ? rawDigits.slice(-4) : '4242';
      
      onSelectPayment({
        type: 'card',
        cardBrand: 'Visa',
        lastFour,
        cardHolder: cardHolder.trim(),
        expiry: expiry || '12/28'
      });
      onContinue();
    } else if (activeType === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        setUpiError('Enter a valid UPI ID (e.g. username@bank)');
        return;
      }
      onSelectPayment({
        type: 'upi',
        upiId: upiId.trim()
      });
      onContinue();
    } else {
      // Cash on Delivery
      onSelectPayment({
        type: 'cod'
      });
      onContinue();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-amazon-text flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-amazon-amber" /> Select a payment method
        </h2>
        <p className="text-xs text-amazon-muted">
          All transactions are encrypted with 256-bit bank-grade SSL security.
        </p>
      </div>

      {/* Payment Method Selector Cards */}
      <div className="space-y-3">
        {/* Option 1: Credit or Debit Card */}
        <div className={`
          border-2 rounded-xl transition overflow-hidden text-xs
          ${activeType === 'card' 
            ? 'border-amazon-amber bg-amber-50/30 ring-1 ring-amazon-amber/20' 
            : 'border-gray-200 bg-white hover:border-gray-300'}
        `}>
          <label 
            onClick={() => setActiveType('card')}
            className="flex items-center justify-between p-4 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment_type"
                checked={activeType === 'card'}
                onChange={() => setActiveType('card')}
                className="text-amazon-amber focus:ring-amazon-amber h-4 w-4"
              />
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-600" />
                <span className="font-bold text-sm text-amazon-text">Credit or Debit Card</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-semibold">
              <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">VISA</span>
              <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">MC</span>
              <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">AMEX</span>
            </div>
          </label>

          {activeType === 'card' && (
            <div className="p-4 pt-1 border-t border-amber-100/60 bg-white/70 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <Input
                    label="Card Number"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                  />
                  {cardError && <p className="text-red-600 text-[11px] mt-1">{cardError}</p>}
                </div>

                <div>
                  <Input
                    label="Name on Card"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      label="Expires"
                      value={expiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Input
                      label="Security Code (CVV)"
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.slice(0, 4))}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 flex items-center gap-1 pt-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                Raw card numbers are never stored in your browser or sent over non-encrypted channels.
              </p>
            </div>
          )}
        </div>

        {/* Option 2: UPI */}
        <div className={`
          border-2 rounded-xl transition overflow-hidden text-xs
          ${activeType === 'upi' 
            ? 'border-amazon-amber bg-amber-50/30 ring-1 ring-amazon-amber/20' 
            : 'border-gray-200 bg-white hover:border-gray-300'}
        `}>
          <label 
            onClick={() => setActiveType('upi')}
            className="flex items-center justify-between p-4 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment_type"
                checked={activeType === 'upi'}
                onChange={() => setActiveType('upi')}
                className="text-amazon-amber focus:ring-amazon-amber h-4 w-4"
              />
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-sm text-amazon-text">UPI / Instant Pay</span>
              </div>
            </div>
            <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Fast & Direct
            </span>
          </label>

          {activeType === 'upi' && (
            <div className="p-4 pt-1 border-t border-amber-100/60 bg-white/70 space-y-3">
              <div>
                <Input
                  label="Enter UPI ID / VPA"
                  value={upiId}
                  onChange={(e) => {
                    setUpiId(e.target.value);
                    setUpiError('');
                  }}
                  placeholder="username@okaxis or mobile@upi"
                />
                {upiError && <p className="text-red-600 text-[11px] mt-1">{upiError}</p>}
              </div>
              <p className="text-[11px] text-gray-500">
                A collect request will be simulated upon placing your order.
              </p>
            </div>
          )}
        </div>

        {/* Option 3: Cash on Delivery (COD) */}
        <div className={`
          border-2 rounded-xl transition overflow-hidden text-xs
          ${activeType === 'cod' 
            ? 'border-amazon-amber bg-amber-50/30 ring-1 ring-amazon-amber/20' 
            : 'border-gray-200 bg-white hover:border-gray-300'}
        `}>
          <label 
            onClick={() => setActiveType('cod')}
            className="flex items-center justify-between p-4 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment_type"
                checked={activeType === 'cod'}
                onChange={() => setActiveType('cod')}
                className="text-amazon-amber focus:ring-amazon-amber h-4 w-4"
              />
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-sm text-amazon-text">Cash on Delivery (COD)</span>
              </div>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">Pay at door</span>
          </label>
        </div>
      </div>

      {/* Security row */}
      <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>Your payment information is encrypted and secure with Amazon 256-bit SSL protection.</span>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-2 flex items-center justify-between">
        <Button variant="outline" size="md" type="button" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Address
        </Button>
        <Button variant="primary" size="lg" type="submit" className="font-bold px-8">
          Use this payment method
        </Button>
      </div>
    </form>
  );
};
