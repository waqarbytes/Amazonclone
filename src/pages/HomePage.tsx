import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ArrowRight, Zap, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full pb-12">
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-b from-amazon-slate to-amazon-bg pt-6 pb-20 px-4 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amazon-dark/80 px-3 py-1 rounded-full text-xs font-semibold text-amazon-amber border border-amazon-amber/30">
              <Zap className="w-3.5 h-3.5" /> Prime Big Spring Deals Now Live
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              A cleaner, faster Amazon shopping experience.
            </h1>
            <p className="text-sm sm:text-base text-gray-200">
              Discover top-rated tech, home essentials, and fashion with instant search, transparent pricing, and streamlined checkout.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <Link 
                to="/search?category=electronics" 
                className="bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-dark font-bold text-sm px-6 py-3 rounded-full transition shadow-md"
              >
                Shop Electronics Deals
              </Link>
              <Link 
                to="/search?category=all" 
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-full transition border border-white/20"
              >
                Explore All Categories
              </Link>
            </div>
          </div>

          {/* Value props showcase */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm text-xs">
            <div className="bg-amazon-dark/60 backdrop-blur-sm p-3.5 rounded-lg border border-white/10 flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-amazon-amber flex-shrink-0" />
              <div>
                <span className="font-bold block text-white">Fast Delivery</span>
                <span className="text-gray-300 text-[11px]">Free Prime shipping</span>
              </div>
            </div>
            <div className="bg-amazon-dark/60 backdrop-blur-sm p-3.5 rounded-lg border border-white/10 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="font-bold block text-white">Buyer Trust</span>
                <span className="text-gray-300 text-[11px]">Verified purchases</span>
              </div>
            </div>
            <div className="bg-amazon-dark/60 backdrop-blur-sm p-3.5 rounded-lg border border-white/10 flex items-center gap-2.5">
              <RefreshCw className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <span className="font-bold block text-white">Easy Returns</span>
                <span className="text-gray-300 text-[11px]">30-day guarantee</span>
              </div>
            </div>
            <div className="bg-amazon-dark/60 backdrop-blur-sm p-3.5 rounded-lg border border-white/10 flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-amazon-amber flex-shrink-0" />
              <div>
                <span className="font-bold block text-white">Instant Checkout</span>
                <span className="text-gray-300 text-[11px]">Frictionless flow</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Storefront Grid */}
      <Container className="-mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Electronics */}
          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg text-amazon-text">Top Deals in Tech</h2>
                <Badge variant="deal">Up to 40% off</Badge>
              </div>
              <p className="text-xs text-amazon-muted mb-4">Noise-cancelling headphones, 4K displays, and accessories.</p>
              <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80" 
                  alt="Tech items" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </div>
            <Link 
              to="/search?category=electronics" 
              className="text-amazon-link hover:text-amazon-linkHover text-xs font-semibold flex items-center gap-1 hover:underline"
            >
              See all deals <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          {/* Card 2: Computers */}
          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg text-amazon-text">Laptops & Workspaces</h2>
                <Badge variant="prime">Prime</Badge>
              </div>
              <p className="text-xs text-amazon-muted mb-4">High-performance ultrabooks and productivity essentials.</p>
              <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80" 
                  alt="Computers" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </div>
            <Link 
              to="/search?category=computers" 
              className="text-amazon-link hover:text-amazon-linkHover text-xs font-semibold flex items-center gap-1 hover:underline"
            >
              Shop computers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          {/* Card 3: Home */}
          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg text-amazon-text">Home & Kitchen</h2>
                <Badge variant="bestseller">Popular</Badge>
              </div>
              <p className="text-xs text-amazon-muted mb-4">Smart kitchen appliances, cookware, and modern decor.</p>
              <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80" 
                  alt="Kitchen and home" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </div>
            <Link 
              to="/search?category=home" 
              className="text-amazon-link hover:text-amazon-linkHover text-xs font-semibold flex items-center gap-1 hover:underline"
            >
              Explore home essentials <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          {/* Card 4: Fashion */}
          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg text-amazon-text">Seasonal Fashion</h2>
                <Badge variant="deal">New Season</Badge>
              </div>
              <p className="text-xs text-amazon-muted mb-4">Wardrobe updates, outerwear, and everyday apparel.</p>
              <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=80" 
                  alt="Fashion" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </div>
            <Link 
              to="/search?category=fashion" 
              className="text-amazon-link hover:text-amazon-linkHover text-xs font-semibold flex items-center gap-1 hover:underline"
            >
              Discover fashion <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>
      </Container>
    </div>
  );
};
