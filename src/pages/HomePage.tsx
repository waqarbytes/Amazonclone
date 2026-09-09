import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { ProductRow } from '../components/home/ProductRow';
import { 
  products, 
  getDealProducts, 
  getBestSellerProducts 
} from '../data/products';
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Lock,
  Headphones,
  Laptop,
  Home as HomeIcon,
  Shirt,
  BookOpen,
  Sparkle
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const dealProducts = getDealProducts();
  const trendingProducts = getBestSellerProducts();
  // Curated picks: sample 8 products across categories
  const topPicks = products.slice(6, 14);

  const categories = [
    {
      id: 'electronics',
      title: 'Electronics',
      subtitle: 'Audio, cameras & 4K TVs',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
      badge: 'Up to 35% off',
      icon: Headphones
    },
    {
      id: 'computers',
      title: 'Computers',
      subtitle: 'Laptops, SSDs & monitors',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80',
      badge: 'Prime Delivery',
      icon: Laptop
    },
    {
      id: 'home',
      title: 'Home & Kitchen',
      subtitle: 'Espresso, air fryers & cookware',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80',
      badge: 'Popular',
      icon: HomeIcon
    },
    {
      id: 'fashion',
      title: 'Fashion',
      subtitle: 'Denim, sneakers & eyewear',
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=500&auto=format&fit=crop&q=80',
      badge: 'Trending',
      icon: Shirt
    },
    {
      id: 'books',
      title: 'Books',
      subtitle: 'Bestsellers, biogs & finance',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
      badge: 'Top Rated',
      icon: BookOpen
    },
    {
      id: 'beauty',
      title: 'Beauty & Care',
      subtitle: 'Hair styling, serums & fragrance',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80',
      badge: 'New Deals',
      icon: Sparkle
    },
  ];

  return (
    <div className="w-full pb-16 space-y-8">
      {/* ==================== A. HERO SECTION ==================== */}
      <section className="relative bg-gradient-to-b from-amazon-dark via-amazon-slate to-amazon-bg pt-8 pb-20 px-4 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amazon-dark/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amazon-amber border border-amazon-amber/30 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Spring Deals Now Live • Save up to 40% on top tech</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Everything you love. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amazon-amber to-amber-200">
                Faster & cleaner.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Explore 36+ handpicked products across tech, home, fashion, books, and beauty with instantaneous search and zero checkout friction.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/search?category=all"
                className="bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-dark font-bold text-sm px-6 py-3 rounded-full transition shadow-lg flex items-center gap-1.5 active:scale-95"
              >
                Shop Today's Deals <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/search?category=electronics"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-3 rounded-full transition border border-white/20 backdrop-blur-sm active:scale-95"
              >
                Browse Electronics
              </Link>
            </div>
          </div>

          {/* Right Featured Hero Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-2xl text-left">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="bg-amazon-deal text-white font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
                  Spotlight Deal
                </span>
                <span className="text-amazon-amber font-extrabold italic text-sm">prime</span>
              </div>
              <div className="aspect-[4/3] bg-white rounded-xl overflow-hidden p-4 mb-3 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                  alt="Sony WH-1000XM5 Headphones"
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-gray-300 font-semibold uppercase tracking-wider">Sony</span>
                <h3 className="font-bold text-base text-white line-clamp-1">
                  Sony WH-1000XM5 Wireless Headphones
                </h3>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-2xl font-black text-white">$328.00</span>
                  <span className="text-xs text-gray-400 line-through">$399.99</span>
                  <span className="text-xs font-bold text-emerald-400">Save 18%</span>
                </div>
              </div>
              <Link
                to="/product/prod-elec-1"
                className="mt-3 block w-full text-center py-2 bg-amazon-amber hover:bg-[#f3a847] text-amazon-dark font-bold text-xs rounded-full transition shadow"
              >
                View Deal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== B. CATEGORY DISCOVERY (6 CARDS) ==================== */}
      <Container className="-mt-14 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/search?category=${cat.id}`}
              className="group bg-white rounded-xl border border-gray-200/90 hover:border-amazon-amber hover:shadow-card-hover transition-all duration-200 p-3.5 flex flex-col justify-between text-left"
            >
              <div>
                <div className="relative aspect-square w-full bg-gray-50 rounded-lg overflow-hidden mb-2.5 p-2 border border-gray-100 flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 right-1.5">
                    <Badge variant={cat.id === 'electronics' || cat.id === 'fashion' ? 'deal' : 'prime'} size="sm">
                      {cat.badge}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="font-bold text-sm text-amazon-text group-hover:text-amazon-link transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-amazon-muted line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-amazon-link group-hover:text-amazon-linkHover">
                <span>Shop now</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* ==================== C. TODAY'S DEALS ROW ==================== */}
      <Container>
        <ProductRow
          title="Today's Deals"
          subtitle="Handpicked limited-time discounts with verified Prime shipping"
          products={dealProducts}
          viewAllLink="/search?category=all"
          viewAllText="Explore all 18 deals"
        />
      </Container>

      {/* ==================== D. TRENDING NOW / BEST SELLERS ==================== */}
      <Container>
        <ProductRow
          title="Trending Now & Best Sellers"
          subtitle="Most purchased products across tech, home, and fashion this week"
          products={trendingProducts}
          viewAllLink="/search?category=all"
          viewAllText="See trending catalog"
        />
      </Container>

      {/* ==================== E. RECOMMENDED / TOP PICKS ==================== */}
      <Container>
        <ProductRow
          title="Top Picks for Your Next Order"
          subtitle="Curated high-rating customer favorites with 4.7+ stars"
          products={topPicks}
          viewAllLink="/search?category=all"
          viewAllText="View recommendations"
        />
      </Container>

      {/* ==================== F. SHOP BY CATEGORY SPOTLIGHT ==================== */}
      <Container>
        <section className="bg-white rounded-xl border border-gray-200/90 p-6 shadow-sm text-left">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-amazon-text tracking-tight">
                Explore by Department
              </h2>
              <p className="text-xs text-amazon-muted mt-0.5">
                Browse our complete multi-category catalog
              </p>
            </div>
            <Link
              to="/search?category=all"
              className="text-xs font-semibold text-amazon-link hover:underline flex items-center gap-1"
            >
              Browse all 36 items <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={`/search?category=${cat.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-amazon-amber hover:bg-gray-50/70 transition group"
                >
                  <div className="w-16 h-16 rounded-lg bg-gray-100 p-2 flex-shrink-0 flex items-center justify-center border border-gray-200">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition duration-200"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs text-amazon-muted mb-0.5">
                      <Icon className="w-3.5 h-3.5 text-amazon-amber" />
                      <span className="capitalize">{cat.id}</span>
                    </div>
                    <h3 className="font-bold text-sm text-amazon-text group-hover:text-amazon-link truncate">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-amazon-muted truncate">
                      {cat.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amazon-link group-hover:translate-x-1 transition flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>
      </Container>

      {/* ==================== G. TRUST / VALUE PROPOSITION ==================== */}
      <Container>
        <section className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amazon-amber flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amazon-text">Free Prime Delivery</h4>
                <p className="text-xs text-amazon-muted mt-0.5">Fast, free shipping on thousands of items tomorrow.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amazon-text">30-Day Free Returns</h4>
                <p className="text-xs text-amazon-muted mt-0.5">Hassle-free refunds and prepaid drop-off returns.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-amazon-prime flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amazon-text">Secure Transactions</h4>
                <p className="text-xs text-amazon-muted mt-0.5">256-bit encrypted checkout protecting your payment.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amazon-text">Verified Customer Reviews</h4>
                <p className="text-xs text-amazon-muted mt-0.5">Authentic feedback from real purchasers you can trust.</p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};
