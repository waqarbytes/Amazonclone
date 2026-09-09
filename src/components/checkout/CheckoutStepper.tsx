import React from 'react';
import { Check, MapPin, CreditCard, ShoppingBag } from 'lucide-react';

interface CheckoutStepperProps {
  currentStep: 1 | 2 | 3;
  onStepClick?: (step: 1 | 2 | 3) => void;
}

export const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, label: 'Delivery Address', icon: MapPin },
    { number: 2, label: 'Payment Method', icon: CreditCard },
    { number: 3, label: 'Review & Place', icon: ShoppingBag },
  ];

  return (
    <nav aria-label="Checkout Progress" className="w-full">
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs font-semibold">
        {steps.map(s => {
          const isDone = currentStep > s.number;
          const isCurrent = currentStep === s.number;
          const Icon = s.icon;

          return (
            <button
              key={s.number}
              type="button"
              disabled={s.number > currentStep && !onStepClick}
              onClick={() => onStepClick && s.number < currentStep && onStepClick(s.number as 1 | 2 | 3)}
              className={`
                flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl border transition-all text-left
                ${isCurrent 
                  ? 'border-amazon-amber bg-amber-50/70 text-amazon-dark ring-2 ring-amazon-amber/20 shadow-xs' 
                  : isDone
                    ? 'border-emerald-200 bg-emerald-50/50 text-emerald-800 cursor-pointer hover:bg-emerald-50'
                    : 'border-gray-200 bg-white text-gray-400 cursor-not-allowed'}
              `}
            >
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold
                ${isDone 
                  ? 'bg-emerald-600 text-white' 
                  : isCurrent
                    ? 'bg-amazon-amber text-amazon-dark'
                    : 'bg-gray-100 text-gray-400'}
              `}>
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.number}
              </div>
              <div className="hidden sm:block truncate">
                <span className="block text-[10px] uppercase text-gray-400 font-bold leading-tight">
                  Step {s.number}
                </span>
                <span className="truncate">{s.label}</span>
              </div>
              <Icon className="w-4 h-4 sm:hidden flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
