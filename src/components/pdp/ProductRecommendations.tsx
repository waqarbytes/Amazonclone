import React from 'react';
import { Product } from '../../types';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

interface ProductRecommendationsProps {
  currentProduct: Product;
}

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ currentProduct }) => {
  // Find products in the same category first, then fallback to other popular items
  const sameCategory = products.filter(
    p => p.id !== currentProduct.id && p.category === currentProduct.category
  );

  const fallbackItems = products.filter(
    p => p.id !== currentProduct.id && p.category !== currentProduct.category
  );

  const recommendations = [...sameCategory, ...fallbackItems].slice(0, 4);

  if (recommendations.length === 0) return null;

  return (
    <section className="space-y-4 pt-4 border-t border-gray-200">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-amazon-text">
            Customers Also Viewed
          </h2>
          <p className="text-xs text-amazon-muted">
            Popular alternatives and related discoveries in {currentProduct.category}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
