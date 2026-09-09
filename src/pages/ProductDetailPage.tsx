import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { getProductById } from '../data/products';
import { getProductImages } from '../utils/productImages';
import { ProductBreadcrumbs } from '../components/pdp/ProductBreadcrumbs';
import { ProductGallery } from '../components/pdp/ProductGallery';
import { ProductInfo } from '../components/pdp/ProductInfo';
import { BuyBox } from '../components/pdp/BuyBox';
import { ProductSpecs } from '../components/pdp/ProductSpecs';
import { ProductReviews } from '../components/pdp/ProductReviews';
import { ProductComparison } from '../components/pdp/ProductComparison';
import { ProductRecommendations } from '../components/pdp/ProductRecommendations';
import { MobileStickyBuyBar } from '../components/pdp/MobileStickyBuyBar';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { AlertCircle, Search } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addRecentlyViewed } = useRecentlyViewed();

  // Scroll to top and record in recently viewed when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (id) {
      addRecentlyViewed(id);
    }
  }, [id, addRecentlyViewed]);

  const handleReviewsClick = () => {
    const el = document.getElementById('customer-reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Graceful 404 / Product Not Found
  if (!product) {
    return (
      <Container size="md" className="py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-amber-100 text-amazon-amber rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">
            Looking for something?
          </h1>
          <p className="text-sm text-amazon-muted max-w-md mx-auto">
            We're sorry. The Web address you entered is not a functioning page on our site.
            (Product ID <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">{id}</code> not found).
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="secondary" size="md">
              Return to Homepage
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="primary" size="md">
              <Search className="w-4 h-4 mr-1.5" /> Browse All Products
            </Button>
          </Link>
        </div>

        {/* Popular Categories */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-xs font-bold uppercase tracking-wider text-amazon-muted mb-3">
            Explore Popular Departments
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Electronics', cat: 'electronics' },
              { label: 'Computers', cat: 'computers' },
              { label: 'Home & Kitchen', cat: 'home' },
              { label: 'Fashion', cat: 'fashion' },
              { label: 'Books', cat: 'books' },
              { label: 'Beauty', cat: 'beauty' }
            ].map(dept => (
              <Link
                key={dept.cat}
                to={`/search?category=${dept.cat}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
              >
                {dept.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    );
  }

  const galleryImages = getProductImages(product);

  return (
    <div className="min-h-screen bg-gray-50/40 pb-24 sm:pb-12 text-left">
      <Container className="py-4 space-y-6">
        {/* Clickable Breadcrumbs */}
        <ProductBreadcrumbs product={product} />

        {/* Main Product Section: Gallery, Info & Buy Box */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Image Gallery (5 cols) */}
            <div className="lg:col-span-5">
              <ProductGallery images={galleryImages} title={product.title} />
            </div>

            {/* Center Column: Product Information Hierarchy (4 cols) */}
            <div className="lg:col-span-4">
              <ProductInfo 
                product={product} 
                onReviewsClick={handleReviewsClick} 
              />
            </div>

            {/* Right Column: Desktop Buy Box (3 cols) */}
            <div className="lg:col-span-3">
              <BuyBox product={product} />
            </div>
          </div>
        </div>

        {/* Structured Technical Specifications */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7">
          <ProductSpecs product={product} />
        </div>

        {/* Side-by-Side Product Comparison */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7">
          <ProductComparison currentProduct={product} />
        </div>

        {/* Customer Reviews & Ratings */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7">
          <ProductReviews product={product} />
        </div>

        {/* Recommendations: Customers Also Viewed */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7">
          <ProductRecommendations currentProduct={product} />
        </div>
      </Container>

      {/* Mobile Sticky Purchase Bar */}
      <MobileStickyBuyBar product={product} />
    </div>
  );
};
