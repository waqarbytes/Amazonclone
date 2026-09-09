import React from 'react';
import { Order } from '../../types';
import { Check, Clock, Truck, Package, Home } from 'lucide-react';

interface OrderTimelineProps {
  order: Order;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ order }) => {
  const steps = [
    {
      id: 'ordered',
      title: 'Order Placed',
      description: new Date(order.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      }),
      icon: Check
    },
    {
      id: 'preparing',
      title: 'Preparing for Shipment',
      description: 'Items packed & verified at fulfillment center',
      icon: Clock
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: order.trackingNumber ? `Carrier: Amazon Logistics (${order.trackingNumber})` : 'In transit with carrier',
      icon: Truck
    },
    {
      id: 'out_for_delivery',
      title: 'Out for Delivery',
      description: 'Package is in the delivery vehicle',
      icon: Package
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: `Delivery by ${order.deliveryDate || order.estimatedDeliveryDate || 'Tomorrow'}`,
      icon: Home
    }
  ];

  const statusHierarchy = ['ordered', 'preparing', 'shipped', 'out_for_delivery', 'delivered'];
  const currentIdx = statusHierarchy.indexOf(order.status || 'ordered');

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-xs space-y-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div>
          <span className="text-xs font-bold text-amazon-muted uppercase tracking-wider">
            Tracking Package
          </span>
          <h3 className="text-base sm:text-lg font-bold text-amazon-text flex items-center gap-2">
            <Truck className="w-5 h-5 text-amazon-amber" />
            Estimated Delivery: {order.deliveryDate || order.estimatedDeliveryDate || 'Tomorrow by 8 PM'}
          </h3>
        </div>

        {order.trackingNumber && (
          <div className="text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 font-mono">
            Tracking #: <span className="font-bold text-amazon-text">{order.trackingNumber}</span>
          </div>
        )}
      </div>

      {/* Visual Timeline Stepper */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
        {steps.map((step, idx) => {
          const isDone = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex items-start gap-4">
              {/* Circle indicator */}
              <div className={`
                absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs
                ${isDone 
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-50' 
                  : 'bg-white border-2 border-gray-300 text-gray-400'}
              `}>
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-3.5 h-3.5" />}
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className={`text-xs sm:text-sm font-bold ${isDone ? 'text-amazon-text' : 'text-gray-400'}`}>
                    {step.title}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">
                      Active Stage
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
