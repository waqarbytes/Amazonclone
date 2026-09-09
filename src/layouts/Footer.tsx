import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full text-white mt-16 select-none">
      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-full bg-amazon-lightSlate hover:bg-[#485769] text-center py-3.5 text-xs font-semibold text-gray-200 hover:text-white transition tracking-wide"
      >
        Back to top
      </button>

      {/* Primary Links Grid */}
      <div className="bg-amazon-slate py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-gray-300">
          <div>
            <h4 className="font-bold text-sm text-white mb-3 tracking-wide">Get to Know Us</h4>
            <ul className="space-y-2">
              <li><a href="#careers" className="hover:underline">Careers</a></li>
              <li><a href="#blog" className="hover:underline">Amazon Newsletter</a></li>
              <li><a href="#about" className="hover:underline">About Amazon Rebuild</a></li>
              <li><a href="#accessibility" className="hover:underline">Accessibility</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-3 tracking-wide">Make Money with Us</h4>
            <ul className="space-y-2">
              <li><a href="#sell" className="hover:underline">Sell products on Amazon</a></li>
              <li><a href="#affiliate" className="hover:underline">Become an Affiliate</a></li>
              <li><a href="#advertise" className="hover:underline">Advertise Your Products</a></li>
              <li><a href="#publish" className="hover:underline">Self-Publish with Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-3 tracking-wide">Amazon Payment Products</h4>
            <ul className="space-y-2">
              <li><a href="#card" className="hover:underline">Amazon Prime Rewards Visa</a></li>
              <li><a href="#storecard" className="hover:underline">Amazon Store Card</a></li>
              <li><a href="#points" className="hover:underline">Shop with Points</a></li>
              <li><a href="#reload" className="hover:underline">Reload Your Balance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white mb-3 tracking-wide">Let Us Help You</h4>
            <ul className="space-y-2">
              <li><Link to="/orders" className="hover:underline">Your Account & Orders</Link></li>
              <li><a href="#rates" className="hover:underline">Shipping Rates & Policies</a></li>
              <li><a href="#returns" className="hover:underline">Returns & Replacements</a></li>
              <li><a href="#help" className="hover:underline">Customer Service & Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer & Rebuild Disclaimer */}
      <div className="bg-amazon-dark py-8 px-4 border-t border-gray-800 text-center text-xs text-gray-400">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-black tracking-tight text-white">
              amazon<span className="text-amazon-amber text-xs font-normal">.rebuild</span>
            </span>
          </div>
          <p className="text-[11px] text-gray-400">
            Educational assignment implementation created for speed, product judgment, and UX quality evaluation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] pt-1">
            <a href="#conditions" className="hover:underline">Conditions of Use</a>
            <a href="#privacy" className="hover:underline">Privacy Notice</a>
            <a href="#ads" className="hover:underline">Your Ads Privacy Choices</a>
            <span>© 2026 Amazon Rebuild. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
