import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ChevronRight, Home } from 'lucide-react';

interface ProductBreadcrumbsProps {
  product: Product;
}

export const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({ product }) => {
  const categoryName = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center flex-wrap gap-1.5 text-xs text-amazon-muted py-1"
    >
      <Link 
        to="/" 
        className="hover:text-amazon-link flex items-center gap-1 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />

      <Link 
        to={`/search?category=${product.category}`} 
        className="hover:text-amazon-link transition-colors"
      >
        {categoryName}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />

      <Link 
        to={`/search?category=${product.category}&brand=${encodeURIComponent(product.brand)}`} 
        className="hover:text-amazon-link transition-colors"
      >
        {product.brand}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />

      <span 
        className="text-amazon-text font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md"
        title={product.title}
      >
        {product.title}
      </span>
    </nav>
  );
};
