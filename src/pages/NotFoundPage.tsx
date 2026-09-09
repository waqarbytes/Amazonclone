import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { HelpCircle, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <Container size="md" className="py-20 text-center space-y-6">
      <div className="w-16 h-16 bg-amber-50 text-amazon-amber rounded-full flex items-center justify-center mx-auto">
        <HelpCircle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-amazon-text">Looking for something?</h1>
        <p className="text-sm text-amazon-muted max-w-md mx-auto">
          We couldn't find the page you were looking for. Try searching for products or return to the Amazon home page.
        </p>
      </div>
      <div>
        <Link to="/">
          <Button variant="primary" size="md">
            <Home className="w-4 h-4 mr-1.5" /> Return to Amazon Home
          </Button>
        </Link>
      </div>
    </Container>
  );
};
