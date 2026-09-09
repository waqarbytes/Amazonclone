import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Filter, SlidersHorizontal, ArrowLeft } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';

  return (
    <Container className="py-6 space-y-6">
      {/* Search Header Bar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-amazon-muted uppercase font-semibold tracking-wider">Results for:</span>
          <h1 className="text-xl sm:text-2xl font-bold text-amazon-text">
            {query ? `"${query}"` : `Category: ${category.toUpperCase()}`}
          </h1>
          <p className="text-xs text-amazon-muted">Showing foundation catalog results</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-xs font-semibold text-amazon-text bg-gray-50">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <div className="flex items-center gap-2 text-xs font-medium text-amazon-muted">
            <SlidersHorizontal className="w-4 h-4 hidden sm:inline" />
            <span>Sort by: <strong className="text-amazon-text">Featured</strong></span>
          </div>
        </div>
      </div>

      {/* Catalog Grid Structure */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Filter Sidebar Skeleton */}
        <div className="hidden md:block col-span-1 space-y-6 bg-white p-5 rounded-lg border border-gray-200 h-fit text-xs">
          <div>
            <h3 className="font-bold text-sm text-amazon-text mb-2.5">Amazon Prime</h3>
            <label className="flex items-center gap-2 cursor-pointer text-gray-700">
              <input type="checkbox" className="rounded text-amazon-amber focus:ring-amazon-amber" />
              <Badge variant="prime">Prime</Badge>
              <span>Eligible for Free Delivery</span>
            </label>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="font-bold text-sm text-amazon-text mb-2.5">Customer Reviews</h3>
            <div className="space-y-1.5 text-gray-600">
              <div className="hover:text-amazon-amber cursor-pointer">★★★★☆ & Up</div>
              <div className="hover:text-amazon-amber cursor-pointer">★★★☆☆ & Up</div>
              <div className="hover:text-amazon-amber cursor-pointer">★★☆☆☆ & Up</div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="font-bold text-sm text-amazon-text mb-2.5">Price</h3>
            <div className="space-y-1.5 text-gray-600">
              <div className="hover:text-amazon-link cursor-pointer">Under $25</div>
              <div className="hover:text-amazon-link cursor-pointer">$25 to $50</div>
              <div className="hover:text-amazon-link cursor-pointer">$50 to $100</div>
              <div className="hover:text-amazon-link cursor-pointer">$100 & Above</div>
            </div>
          </div>
        </div>

        {/* Right Product Grid Placeholder */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <Card className="text-center py-12 space-y-3">
            <h3 className="text-lg font-bold text-amazon-text">Product Catalog Foundation Ready</h3>
            <p className="text-xs text-amazon-muted max-w-md mx-auto">
              Search routing and faceted catalog layout configured. Full product dataset, filtering state, and interactive cards will be populated in Milestone 3.
            </p>
            <div className="pt-2">
              <Link 
                to="/product/prod-1" 
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amazon-link hover:text-amazon-linkHover underline"
              >
                Preview Product Detail Page Route <ArrowLeft className="w-3 h-3 rotate-180" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
};
