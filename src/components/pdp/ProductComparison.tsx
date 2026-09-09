import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Star, Check, ShoppingCart, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

interface ProductComparisonProps {
  currentProduct: Product;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({ currentProduct }) => {
  const { addToCart } = useCart();
  const { success } = useToast();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Compatible items in same category (excluding current)
  const categoryAlternatives = products.filter(
    p => p.id !== currentProduct.id && p.category === currentProduct.category
  );

  // Allow selecting up to 2 items to compare alongside currentProduct
  const [selectedAltIds, setSelectedAltIds] = useState<string[]>(() => {
    return categoryAlternatives.slice(0, 2).map(p => p.id);
  });

  if (categoryAlternatives.length === 0) return null;

  const selectedAlts = selectedAltIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);

  const compareList: Product[] = [currentProduct, ...selectedAlts];

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    success(`Added ${product.title.slice(0, 28)}... to cart!`);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleSwapAlternative = (index: number, newId: string) => {
    setSelectedAltIds(prev => {
      const next = [...prev];
      next[index] = newId;
      return next;
    });
  };

  // Helper to extract spec value with fallbacks
  const getSpecValue = (item: Product, keys: string[]): string => {
    if (!item.specs) return '—';
    for (const k of keys) {
      const found = Object.entries(item.specs).find(([key]) => 
        key.toLowerCase().includes(k.toLowerCase())
      );
      if (found) return found[1];
    }
    return '—';
  };

  return (
    <section className="space-y-4 pt-6 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amazon-amber uppercase tracking-wider mb-1">
            <ArrowLeftRight className="w-3.5 h-3.5" /> Side-by-Side Comparison
          </div>
          <h2 className="text-xl font-bold text-amazon-text tracking-tight">
            Compare Similar {currentProduct.category.toUpperCase()}
          </h2>
          <p className="text-xs text-amazon-muted mt-0.5">
            Compare specifications, battery, connectivity, and value across compatible {currentProduct.category} models.
          </p>
        </div>
      </div>

      {/* Responsive Comparison Table Container */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs border-collapse min-w-[660px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/80">
              <th className="py-4 px-4 font-bold text-gray-500 uppercase text-[11px] w-1/4">
                Product
              </th>
              {compareList.map((item, idx) => (
                <th key={item.id} className="py-4 px-4 w-1/4 text-center align-top">
                  <div className="flex flex-col items-center space-y-2">
                    {/* Switcher for alternatives */}
                    {idx > 0 && (
                      <div className="w-full mb-1">
                        <select
                          value={item.id}
                          onChange={(e) => handleSwapAlternative(idx - 1, e.target.value)}
                          className="w-full text-[11px] py-1 px-1.5 border border-gray-300 rounded bg-white font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-amazon-amber"
                          aria-label={`Select product for comparison slot ${idx + 1}`}
                        >
                          {categoryAlternatives.map(alt => (
                            <option key={alt.id} value={alt.id}>
                              {alt.brand}: {alt.title.slice(0, 22)}...
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="w-20 h-20 bg-white p-2 rounded-lg border border-gray-200 flex items-center justify-center">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="font-semibold text-amazon-text line-clamp-2 max-w-[170px] h-9">
                      {item.title}
                    </div>
                    {idx === 0 ? (
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        This Product
                      </span>
                    ) : (
                      <Link
                        to={`/product/${item.id}`}
                        className="text-[11px] text-amazon-link hover:underline font-semibold"
                      >
                        View Details
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
              <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50/50">Price & Value</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center font-bold text-sm text-amazon-text">
                  <div>${item.price.toFixed(2)}</div>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <div className="text-[10px] font-normal text-amazon-deal line-through">
                      ${item.originalPrice.toFixed(2)}
                    </div>
                  )}
                </td>
              ))}
            </tr>

            {/* Customer Rating row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50/50">Customer Rating</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-amazon-amber font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{item.rating}</span>
                    <span className="text-gray-400 font-normal text-[11px]">
                      ({item.reviewCount.toLocaleString()})
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Brand row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50/50">Brand</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center font-medium text-gray-800">
                  {item.brand}
                </td>
              ))}
            </tr>

            {/* Prime Delivery row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50/50">Prime Delivery</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center">
                  {item.isPrime ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> FREE One-Day
                    </span>
                  ) : (
                    <span className="text-gray-500 font-medium">Standard (2-4 Days)</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Battery / Power Life row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50/50">Battery / Power</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center text-gray-700">
                  {getSpecValue(item, ['battery', 'power', 'capacity'])}
                </td>
              ))}
            </tr>

            {/* Connectivity row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50/50">Connectivity</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center text-gray-700">
                  {getSpecValue(item, ['connectivity', 'wireless', 'bluetooth', 'interface'])}
                </td>
              ))}
            </tr>

            {/* Noise Cancellation / Key Tech row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50/50">Noise Cancellation / Audio</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center text-gray-700">
                  {getSpecValue(item, ['noise', 'anc', 'audio', 'chip'])}
                </td>
              ))}
            </tr>

            {/* Weight / Dimensions row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50/50">Weight / Size</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center text-gray-700">
                  {getSpecValue(item, ['weight', 'dimensions', 'size'])}
                </td>
              ))}
            </tr>

            {/* Stock status row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50/50">Availability</td>
              {compareList.map(item => (
                <td key={item.id} className="py-3 px-4 text-center font-medium">
                  {item.inStock ? (
                    <span className="text-emerald-700">In Stock ({item.stockCount} left)</span>
                  ) : (
                    <span className="text-rose-600">Backordered</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Add to Cart Action row */}
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-700 bg-gray-50/50">Add to Cart</td>
              {compareList.map(item => {
                const isAdded = addedIds[item.id];
                return (
                  <td key={item.id} className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`
                        inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition
                        ${isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-dark shadow-xs active:scale-95'}
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
