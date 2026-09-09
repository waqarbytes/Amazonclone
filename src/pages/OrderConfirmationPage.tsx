import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CheckCircle, Package, Truck, ArrowRight } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container size="md" className="py-10 space-y-6">
      <Card className="text-left space-y-6 p-8 border-t-4 border-t-emerald-600 shadow-md">
        {/* Success Banner */}
        <div className="flex items-start gap-4">
          <CheckCircle className="w-10 h-10 text-emerald-600 flex-shrink-0" />
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-amazon-text">
              Order placed, thank you!
            </h1>
            <p className="text-xs text-amazon-muted">
              Confirmation will be sent to your email. Order #{id || '114-8921820-38192'}
            </p>
          </div>
        </div>

        {/* Delivery Promise Timeline Card */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-amazon-text">
            <Truck className="w-5 h-5 text-amazon-amber" />
            <span>Guaranteed Delivery: <strong>Tomorrow by 8 PM</strong></span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div className="bg-amazon-amber h-full w-1/4 rounded-full"></div>
          </div>
          <div className="flex justify-between text-[11px] text-amazon-muted font-medium">
            <span className="text-amazon-amber font-bold">Ordered</span>
            <span>Shipped</span>
            <span>Out for delivery</span>
            <span>Delivered</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <Link to="/orders">
            <Button variant="outline" size="md">
              <Package className="w-4 h-4 mr-1.5" /> View your orders
            </Button>
          </Link>
          <Link to="/">
            <Button variant="primary" size="md">
              Continue Shopping <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};
