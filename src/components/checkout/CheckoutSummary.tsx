import React from 'react';
import { PriceBreakdown, formatCurrency } from '../../utils/checkout';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Lock, RotateCcw, ShieldCheck } from 'lucide-react';

interface CheckoutSummaryProps {
  totals: PriceBreakdown;
  itemCount: number;
  currentStep: 1 | 2 | 3;
  isPlacingOrder: boolean;
  onPlaceOrder?: () => void;
  onNextStep?: () => void;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  totals,
  itemCount,
  currentStep,
  isPlacingOrder,
  onPlaceOrder,
  onNextStep
}) => {
  return (
    <Card className="p-6 space-y-4 border-2 border-gray-200/90 shadow-sm sticky top-24 text-left">
      {/* Primary Action Button at Top of Summary */}
      {currentStep === 3 ? (
        <Button
          variant="primary"
          fullWidth
          size="lg"
          disabled={isPlacingOrder}
          onClick={onPlaceOrder}
          className="font-black text-sm py-3 shadow-xs hover:shadow-sm"
        >
          {isPlacingOrder ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            'Place your order'
          )}
        </Button>
      ) : (
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={onNextStep}
          className="font-bold text-sm py-3 shadow-xs hover:shadow-sm"
        >
          Continue to Step {currentStep + 1}
        </Button>
      )}

      <p className="text-[11px] text-gray-500 text-center">
        By placing your order, you agree to Amazon's privacy notice and conditions of use.
      </p>

      <hr className="border-gray-100" />

      {/* Order Totals Breakdown */}
      <div>
        <h3 className="text-sm font-bold text-amazon-text mb-3">Order Summary</h3>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Items ({itemCount}):</span>
            <span className="font-semibold text-amazon-text">{formatCurrency(totals.subtotal)}</span>
          </div>

          {totals.savings > 0 && (
            <div className="flex justify-between text-amazon-deal font-semibold">
              <span>Total Savings:</span>
              <span>-{formatCurrency(totals.savings)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Shipping & handling:</span>
            <span className={totals.shipping === 0 ? 'text-emerald-700 font-semibold' : 'font-semibold text-amazon-text'}>
              {totals.shipping === 0 ? 'FREE' : formatCurrency(totals.shipping)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Estimated tax to be collected:</span>
            <span className="font-semibold text-amazon-text">{formatCurrency(totals.tax)}</span>
          </div>

          <hr className="border-gray-200/80 my-2" />

          <div className="flex justify-between items-baseline pt-1">
            <span className="text-base font-bold text-amazon-text">Order Total:</span>
            <span className="text-2xl font-black text-amazon-deal">
              {formatCurrency(totals.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Trust guarantees */}
      <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-2">
        <div className="flex items-center gap-2 text-emerald-700 font-semibold">
          <Lock className="w-3.5 h-3.5" /> 256-bit Secure Checkout
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-3.5 h-3.5 text-gray-400" /> 30-day return policy
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-gray-400" /> A-to-z Guarantee protection
        </div>
      </div>
    </Card>
  );
};
