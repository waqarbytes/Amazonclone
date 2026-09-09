import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  Menu, 
  User, 
  Package, 
  X,
  ChevronDown
} from 'lucide-react';
import { ProductCategory } from '../types';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = 0; // Will be connected to CartContext in M5

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&category=${selectedCategory}`);
    } else {
      navigate(`/search?category=${selectedCategory}`);
    }
  };

  return (
    <header className="w-full text-white select-none sticky top-0 z-50">
      {/* Top Main Navigation */}
      <div className="bg-amazon-dark px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile Menu Trigger + Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded text-gray-200 hover:text-white hover:bg-amazon-slate focus:outline-none focus:ring-1 focus:ring-amazon-amber"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-1.5 py-1 px-2 border border-transparent hover:border-white rounded transition"
            aria-label="Amazon Home"
          >
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                amazon<span className="text-amazon-amber font-normal text-xs ml-0.5">.rebuild</span>
              </span>
            </div>
          </Link>

          {/* Location Delivery Selector (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 py-1 px-2 border border-transparent hover:border-white rounded cursor-pointer transition text-left">
            <MapPin className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0" />
            <div className="text-xs leading-tight">
              <span className="text-gray-300 block text-[11px]">Deliver to</span>
              <span className="font-bold text-white block">New York 10001</span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar (Desktop & Tablet) */}
        <form 
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-3xl items-stretch h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-amazon-amber shadow-sm"
        >
          {/* Category Dropdown */}
          <div className="relative bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium flex items-center border-r border-gray-300 transition">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProductCategory)}
              className="bg-transparent pl-3 pr-6 py-2 appearance-none cursor-pointer focus:outline-none text-gray-800"
              aria-label="Select search category"
            >
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="computers">Computers</option>
              <option value="home">Home & Kitchen</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
              <option value="beauty">Beauty</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-1.5 pointer-events-none text-gray-600" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Amazon products, brands, and deals..."
            className="flex-1 px-3 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none"
            aria-label="Search products"
          />

          {/* Search Submit Button */}
          <button
            type="submit"
            className="bg-amazon-amber hover:bg-[#f3a847] text-gray-900 px-4 flex items-center justify-center transition"
            aria-label="Submit search"
          >
            <Search className="w-5 h-5 text-gray-800" />
          </button>
        </form>

        {/* Right Nav Options */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Account / Sign In */}
          <Link
            to="/orders"
            className="hidden sm:flex flex-col py-1 px-2 border border-transparent hover:border-white rounded transition text-left text-xs"
          >
            <span className="text-gray-300 text-[11px] leading-none">Hello, Sign in</span>
            <span className="font-bold text-white flex items-center gap-0.5">
              Account & Lists <ChevronDown className="w-3 h-3 text-gray-400" />
            </span>
          </Link>

          {/* Returns & Orders */}
          <Link
            to="/orders"
            className="hidden md:flex flex-col py-1 px-2 border border-transparent hover:border-white rounded transition text-left text-xs"
          >
            <span className="text-gray-300 text-[11px] leading-none">Returns</span>
            <span className="font-bold text-white">& Orders</span>
          </Link>

          {/* Cart Trigger */}
          <Link
            to="/cart"
            className="flex items-center py-1 px-2.5 border border-transparent hover:border-white rounded transition relative gap-1"
            aria-label={`Shopping cart with ${cartItemCount} items`}
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7 text-white" />
              <span className="absolute -top-1.5 -right-1.5 bg-amazon-amber text-amazon-dark font-extrabold text-xs rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center border-2 border-amazon-dark">
                {cartItemCount}
              </span>
            </div>
            <span className="hidden sm:inline font-bold text-xs mt-2">Cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search Row (Mobile screens only) */}
      <div className="md:hidden bg-amazon-dark px-3 pb-2.5 pt-1">
        <form 
          onSubmit={handleSearchSubmit}
          className="flex items-stretch h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-amazon-amber shadow-sm"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Amazon products..."
            className="flex-1 px-3 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none"
            aria-label="Search products on mobile"
          />
          <button
            type="submit"
            className="bg-amazon-amber hover:bg-[#f3a847] text-gray-900 px-4 flex items-center justify-center transition"
            aria-label="Submit search mobile"
          >
            <Search className="w-5 h-5 text-gray-800" />
          </button>
        </form>
      </div>

      {/* Secondary Sub-Navigation Bar */}
      <div className="bg-amazon-slate text-xs font-medium px-3 sm:px-4 py-1.5 flex items-center justify-between overflow-x-auto hide-scrollbar gap-4 text-gray-200 border-t border-amazon-lightSlate">
        <div className="flex items-center gap-3 sm:gap-5 whitespace-nowrap">
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-1.5 font-bold text-white py-1 px-1.5 rounded hover:border hover:border-white transition"
          >
            <Menu className="w-4 h-4" /> All
          </button>
          <Link to="/search?category=all" className="hover:text-white py-1 px-1.5 rounded hover:border hover:border-white transition">Today's Deals</Link>
          <Link to="/search?category=electronics" className="hover:text-white py-1 px-1.5 rounded hover:border hover:border-white transition">Electronics</Link>
          <Link to="/search?category=computers" className="hover:text-white py-1 px-1.5 rounded hover:border hover:border-white transition">Computers</Link>
          <Link to="/search?category=home" className="hover:text-white py-1 px-1.5 rounded hover:border hover:border-white transition">Home & Kitchen</Link>
          <Link to="/search?category=fashion" className="hidden sm:inline hover:text-white py-1 px-1.5 rounded hover:border hover:border-white transition">Fashion</Link>
          <Link to="/search?category=books" className="hidden md:inline hover:text-white py-1 px-1.5 rounded hover:border hover:border-white transition">Books</Link>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-amazon-amber font-semibold text-xs whitespace-nowrap">
          <span>Fast, FREE Delivery with Prime</span>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white text-amazon-text h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="bg-amazon-slate text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-amazon-amber" />
                <span className="font-bold text-base">Hello, Sign In</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white p-1"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="p-4 space-y-4 text-sm font-medium">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">Shop by Category</h3>
                <div className="space-y-2">
                  <Link to="/search?category=electronics" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-amazon-link">Electronics</Link>
                  <Link to="/search?category=computers" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-amazon-link">Computers</Link>
                  <Link to="/search?category=home" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-amazon-link">Home & Kitchen</Link>
                  <Link to="/search?category=fashion" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-amazon-link">Fashion</Link>
                  <Link to="/search?category=books" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-amazon-link">Books</Link>
                  <Link to="/search?category=beauty" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-800 hover:text-amazon-link">Beauty</Link>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">Your Account</h3>
                <div className="space-y-2">
                  <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1 text-gray-800 hover:text-amazon-link">
                    <Package className="w-4 h-4 text-gray-500" /> Your Orders
                  </Link>
                  <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1 text-gray-800 hover:text-amazon-link">
                    <ShoppingCart className="w-4 h-4 text-gray-500" /> Your Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
