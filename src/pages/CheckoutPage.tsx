import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Lock, ArrowLeft } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handlePlaceOrder = () => {
    // Navigate to simulated confirmation with unique order ID
    const randomOrderId = '114-' + Math.floor(1000000 + Math.random() * 9000000);
    navigate(`/order-confirmation/${randomOrderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Streamlined Checkout Header with Security Badge */}
      <div className="bg-white border-b border-gray-200 py-3 mb-8">
        <Container size="md" className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-black text-amazon-dark tracking-tight">
            amazon<span className="text-amazon-amber text-xs font-normal">.checkout</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <Lock className="w-4 h-4" /> 256-bit Secure Checkout
          </div>
        </Container>
      </div>

      <Container size="md" className="space-y-6">
        {/* Step Indicator */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
          <div className={`p-2 rounded border ${step >= 1 ? 'border-amazon-amber bg-amber-50 text-amazon-dark' : 'border-gray-200 bg-white text-gray-400'}`}>
            1. Shipping Address
          </div>
          <div className={`p-2 rounded border ${step >= 2 ? 'border-amazon-amber bg-amber-50 text-amazon-dark' : 'border-gray-200 bg-white text-gray-400'}`}>
            2. Payment Method
          </div>
          <div className={`p-2 rounded border ${step >= 3 ? 'border-amazon-amber bg-amber-50 text-amazon-dark' : 'border-gray-200 bg-white text-gray-400'}`}>
            3. Review & Place
          </div>
        </div>

        {/* Wizard Card */}
        <Card className="text-left space-y-6 p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-amazon-text">Enter your shipping address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue="John Doe" />
                <Input label="Phone Number" defaultValue="+1 (555) 234-5678" />
                <div className="sm:col-span-2">
                  <Input label="Street Address" defaultValue="123 Broadway, Suite 400" />
                </div>
                <Input label="City" defaultValue="New York" />
                <Input label="State" defaultValue="NY" />
                <Input label="ZIP Code" defaultValue="10001" />
              </div>
              <div className="pt-2 flex justify-end">
                <Button variant="primary" size="md" onClick={() => setStep(2)}>
                  Use this address & continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-amazon-text">Select payment method</h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 border border-amazon-amber rounded-lg bg-amber-50/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" defaultChecked className="text-amazon-amber" />
                    <span className="text-xs font-bold text-amazon-text">Amazon Prime Rewards Visa Card ending in 4242</span>
                  </div>
                  <span className="text-xs text-amazon-muted">Exp 12/28</span>
                </label>
                <label className="flex items-center justify-between p-3.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="text-amazon-amber" />
                    <span className="text-xs font-semibold text-amazon-text">Credit or Debit Card</span>
                  </div>
                </label>
              </div>
              <div className="pt-2 flex justify-between">
                <Button variant="outline" size="md" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                </Button>
                <Button variant="primary" size="md" onClick={() => setStep(3)}>
                  Review order details
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-amazon-text">Review and place your order</h2>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 text-xs space-y-2">
                <div className="flex justify-between"><span>Items (1):</span><span>$348.00</span></div>
                <div className="flex justify-between"><span>Shipping & handling:</span><span className="text-emerald-700 font-semibold">$0.00 (Prime Free)</span></div>
                <div className="flex justify-between"><span>Estimated tax to be collected:</span><span>$27.84</span></div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-bold text-base text-amazon-deal">
                  <span>Order total:</span><span>$375.84</span>
                </div>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <Button variant="outline" size="md" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={handlePlaceOrder}>
                  Place your order
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};
