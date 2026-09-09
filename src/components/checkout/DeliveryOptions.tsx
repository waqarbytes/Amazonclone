import React from 'react';
import { DeliverySpeed } from '../../types';
import { DELIVERY_OPTIONS, formatCurrency } from '../../utils/checkout';
import { Truck, Zap, Calendar, CheckCircle2 } from 'lucide-react';

interface DeliveryOptionsProps {
  selectedSpeed: DeliverySpeed;
  onSelectSpeed: (speed: DeliverySpeed) => void;
}

export const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  selectedSpeed,
  onSelectSpeed
}) => {
  return (
    <div className="space-y-4 pt-4 border-t border-gray-200">
      <div>
        <h3 className="text-base font-bold text-amazon-text flex items-center gap-2">
          <Truck className="w-5 h-5 text-amazon-amber" /> Choose your delivery option
        </h3>
        <p className="text-xs text-amazon-muted">
          Select how fast you want your items delivered.
        </p>
      </div>

      <div className="space-y-2.5">
        {DELIVERY_OPTIONS.map((opt) => {
          const isSelected = selectedSpeed === opt.id;
          return (
            <label
              key={opt.id}
              onClick={() => onSelectSpeed(opt.id)}
              className={`
                flex items-center justify-between p-4 rounded-xl border-2 transition cursor-pointer text-xs
                ${isSelected 
                  ? 'border-amazon-amber bg-amber-50/50 shadow-xs ring-1 ring-amazon-amber/20' 
                  : 'border-gray-200 bg-white hover:border-gray-300'}
              `}
            >
              <div className="flex items-center gap-3.5">
                <input
                  type="radio"
                  name="delivery_speed"
                  checked={isSelected}
                  onChange={() => onSelectSpeed(opt.id)}
                  className="text-amazon-amber focus:ring-amazon-amber h-4 w-4"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-amazon-text">
                      {opt.title}
                    </span>
                    {opt.id === 'free_prime' && (
                      <span className="font-extrabold text-amazon-prime italic text-xs">prime</span>
                    )}
                    {opt.id === 'priority' && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-current" /> Fastest
                      </span>
                    )}
                  </div>
                  <div className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{opt.speedText} ({opt.estimatedDate})</span>
                  </div>
                </div>
              </div>

              <div className="text-right font-black text-sm text-amazon-text">
                {opt.price === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  formatCurrency(opt.price)
                )}
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 inline-block ml-2" />
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
