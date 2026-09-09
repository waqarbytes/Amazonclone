import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Star, Check, ShoppingCart } from 'lucide-react';

interface ProductComparisonProps {
  currentProduct: Product;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({ currentProduct }) => {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Find 2 alternatives in the same category
  const alternatives = products
    .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
    .slice(0, 2);

  if (alternatives.length === 0) return null;

  const compareList = [currentProduct, ...alternatives];

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section className="space-y-4 pt-4 border-t border-gray-200">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-amazon-text">
          Compare Similar Products
        </h2>
        <p className="text-xs text-amazon-muted">
          Compare side-by-side features, ratings, and pricing across the {currentProduct.category} category
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="py-4 px-4 font-bold text-gray-500 uppercase text-[11px] w-1/4">
                Attribute
              </th>
              {compareList.map((item, idx) => (
                <th key={item.id} className="py-4 px-4 w-1/4 text-center align-top">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-24 h-24 bg-white p-2 rounded-lg border border-gray-200 flex items-center justify-center">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="font-semibold text-amazon-text line-clamp-2 max-w-[180px] h-9">
                      {item.title}
                    </div>
                    {idx === 0 ? (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Current Product
                      </span>
                    ) : (
                      <Link
                        to={`/product/${item.id}`}
                        className="text-[11px] text-amazon-link hover:underline font-semibold"
                      >
                        View Product
                      </Link>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Price row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-600 bg-gray-50/50">Price</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center font-bold text-sm text-amazon-text">
                  ${item.price.toFixed(2)}
                </td>
              ))}
            </tr>

            {/* Rating row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-600 bg-gray-50/50">Customer Rating</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-amazon-amber font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{item.rating}</span>
                    <span className="text-gray-400 font-normal">({item.reviewCount.toLocaleString()})</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Brand row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-600 bg-gray-50/50">Brand</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center font-medium text-gray-800">
                  {item.brand}
                </td>
              ))}
            </tr>

            {/* Prime row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-600 bg-gray-50/50">Prime Delivery</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center font-semibold">
                  {item.isPrime ? (
                    <span className="text-emerald-700">✓ Fast & Free</span>
                  ) : (
                    <span className="text-gray-500">Standard</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Action button row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-600 bg-gray-50/50">Action</td>
              {compareList.map(item => {
                const isAdded = addedIds[item.id];
                return (
                  <td key={item.id} className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`
                        inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition
                        ${isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amazon-btn-sec hover:bg-amazon-btn-sec-hover text-amazon-text shadow-2xs'}
                      `}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </>
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
