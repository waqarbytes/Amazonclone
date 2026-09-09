import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  MapPin, 
  Menu, 
  User, 
  Package, 
  X,
  ChevronDown,
  Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SearchAutocomplete } from '../components/search/SearchAutocomplete';

export const Header: React.FC = () => {
  const { itemCount: cartItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);

  return (
    <header className="w-full text-white select-none sticky top-0 z-50">
      {/* Top Main Navigation */}
      <div className="bg-amazon-dark px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4">
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

        {/* Center: Search Bar with Autocomplete (Desktop & Tablet) */}
        <div className="hidden md:block flex-1 max-w-3xl">
          <SearchAutocomplete />
        </div>

        {/* Right Nav Options */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Account / Sign In Dropdown Popover */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setAccountMenuOpen(prev => !prev)}
              className="flex flex-col py-1 px-2 border border-transparent hover:border-white rounded transition text-left text-xs cursor-pointer focus:outline-none focus:border-white"
              aria-expanded={accountMenuOpen}
              aria-haspopup="true"
            >
              <span className="text-gray-300 text-[11px] leading-none">
                {isSignedIn ? 'Hello, Alex' : 'Hello, Sign in'}
              </span>
              <span className="font-bold text-white flex items-center gap-0.5">
                Account & Lists <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>

            {/* Popover Menu */}
            {accountMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setAccountMenuOpen(false)} 
                />
                <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 text-amazon-text p-3 text-xs space-y-3 animate-in fade-in zoom-in-95 duration-100 text-left">
                  <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-bold text-amazon-text">
                        {isSignedIn ? 'Alex Johnson' : 'Demo Customer'}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {isSignedIn ? 'alex@example.com' : 'Signed out'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsSignedIn(prev => !prev)}
                      className="text-[11px] font-bold text-amazon-link hover:underline"
                    >
                      {isSignedIn ? 'Sign Out' : 'Sign In'}
                    </button>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2">
                      Your Account
                    </span>
                    <Link
                      to="/account"
                      onClick={() => setAccountMenuOpen(false)}
                      className="block px-2 py-1.5 rounded-lg hover:bg-gray-100 font-semibold transition"
                    >
                      Your Account Dashboard
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setAccountMenuOpen(false)}
                      className="block px-2 py-1.5 rounded-lg hover:bg-gray-100 font-semibold transition"
                    >
                      Your Orders & Purchases
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setAccountMenuOpen(false)}
                      className="block px-2 py-1.5 rounded-lg hover:bg-gray-100 font-semibold transition flex items-center justify-between"
                    >
                      <span>Your Wishlist</span>
                      <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-1.5 py-0.5 rounded-full">
                        Saved
                      </span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Wishlist Icon Nav */}
          <Link
            to="/wishlist"
            className="hidden md:flex flex-col py-1 px-2 border border-transparent hover:border-white rounded transition text-left text-xs"
            title="Your Wishlist"
          >
            <span className="text-gray-300 text-[11px] leading-none">Saved</span>
            <span className="font-bold text-white flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Wishlist
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
      <div className="md:hidden bg-amazon-dark px-3 pb-2.5 pt-0.5">
        <SearchAutocomplete isMobile />
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
                <span className="font-bold text-base">{isSignedIn ? 'Hello, Alex' : 'Hello, Sign In'}</span>
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
                  <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1 text-gray-800 hover:text-amazon-link">
                    <User className="w-4 h-4 text-gray-500" /> Your Account & Profile
                  </Link>
                  <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1 text-gray-800 hover:text-amazon-link">
                    <Package className="w-4 h-4 text-gray-500" /> Your Orders
                  </Link>
                  <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1 text-gray-800 hover:text-amazon-link">
                    <Heart className="w-4 h-4 text-gray-500" /> Your Wishlist
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
