import React from 'react';
import { Product } from '../../types';

interface ProductSpecsProps {
  product: Product;
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({ product }) => {
  // Combine custom specs with essential standardized specs
  const allSpecs: Record<string, string> = {
    'Brand': product.brand,
    'Model / Item ID': product.id.toUpperCase(),
    'Department': product.category.charAt(0).toUpperCase() + product.category.slice(1),
    ...product.specs,
    'Customer Rating': `${product.rating} / 5.0 (${product.reviewCount.toLocaleString()} reviews)`,
    'Prime Eligible': product.isPrime ? 'Yes (Fast & Free Delivery)' : 'Standard Shipping',
    'Warranty': '1 Year Manufacturer Limited Warranty'
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-2">
        <h2 className="text-lg font-bold text-amazon-text">
          Technical Specifications
        </h2>
        <p className="text-xs text-amazon-muted">
          Detailed technical specifications and hardware information provided by {product.brand}.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100/80 border-b border-gray-200 text-amazon-muted uppercase font-bold text-[11px] tracking-wider">
              <th className="py-2.5 px-4 w-1/3 sm:w-1/4">Specification</th>
              <th className="py-2.5 px-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Object.entries(allSpecs).map(([key, val], idx) => (
              <tr 
                key={key} 
                className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-amber-50/40`}
              >
                <td className="py-3 px-4 font-semibold text-gray-600 align-top">
                  {key}
                </td>
                <td className="py-3 px-4 text-amazon-text font-medium align-top">
                  {val}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
