import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ShippingAddress } from '../types';
import { getSavedAddresses, saveAddress, deleteAddress } from '../utils/orderStorage';
import { getOrders } from '../utils/orderStorage';
import { useWishlist } from '../hooks/useWishlist';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useToast } from '../context/ToastContext';
import { getProductById } from '../data/products';
import { AddressForm } from '../components/checkout/AddressForm';
import { OrderCard } from '../components/order/OrderCard';
import { ProductCard } from '../components/product/ProductCard';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Clock, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Product } from '../types';

export const AccountPage: React.FC = () => {
  const { wishlist } = useWishlist();
  const { recentProducts } = useRecentlyViewed();
  const { success } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses' | 'payments' | 'recent'>('profile');

  // Address management state
  const [addresses, setAddresses] = useState<ShippingAddress[]>(getSavedAddresses);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddr, setEditingAddr] = useState<ShippingAddress | null>(null);

  const orders = getOrders();
  const wishlistProducts = wishlist
    .map(id => getProductById(id))
    .filter((p): p is Product => p !== undefined);

  const handleSaveAddress = (addr: ShippingAddress) => {
    saveAddress(addr);
    setAddresses(getSavedAddresses());
    setIsEditingAddress(false);
    setEditingAddr(null);
    success('Address saved to your account');
  };

  const handleDeleteAddress = (id?: string) => {
    if (!id) return;
    deleteAddress(id);
    setAddresses(getSavedAddresses());
    success('Address removed');
  };

  const handleSetDefault = (addr: ShippingAddress) => {
    saveAddress({ ...addr, isDefault: true });
    setAddresses(getSavedAddresses());
    success('Default address updated');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 text-left">
      <Container size="lg" className="py-8 space-y-8">
        {/* Profile Banner */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amazon-amber to-amber-400 text-amazon-dark font-black text-xl flex items-center justify-center shadow-xs border-2 border-white">
              AJ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-amazon-text tracking-tight">
                  Alex Johnson
                </h1>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current text-amazon-prime" /> Prime Member
                </span>
              </div>
              <p className="text-xs text-amazon-muted">
                alex@example.com • Member since November 2021
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <Link to="/orders">
              <Button variant="secondary" size="sm">
                <Package className="w-3.5 h-3.5 mr-1" /> Your Orders ({orders.length})
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button variant="secondary" size="sm">
                <Heart className="w-3.5 h-3.5 mr-1 text-rose-500" /> Wishlist ({wishlist.length})
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'orders', label: 'Orders', icon: Package, badge: orders.length },
            { id: 'wishlist', label: 'Wishlist', icon: Heart, badge: wishlist.length },
            { id: 'addresses', label: 'Addresses', icon: MapPin, badge: addresses.length },
            { id: 'payments', label: 'Payments', icon: CreditCard },
            { id: 'recent', label: 'Recently Viewed', icon: Clock, badge: recentProducts.length },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as any)}
                className={`
                  p-3.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all text-center
                  ${isActive 
                    ? 'border-amazon-amber bg-amber-50/70 text-amazon-dark shadow-xs ring-2 ring-amazon-amber/20' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amazon-amber' : 'text-gray-500'}`} />
                <span className="leading-tight">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-gray-100 text-gray-700 rounded-full font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Tabs */}

        {/* 1. Profile Section */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <h2 className="text-base font-bold text-amazon-text border-b border-gray-100 pb-2">
                Personal Information
              </h2>
              <div className="space-y-3 text-xs text-gray-600">
                <div>
                  <label className="block font-bold text-gray-400 uppercase text-[10px]">Name</label>
                  <p className="font-semibold text-amazon-text text-sm">Alex Johnson</p>
                </div>
                <div>
                  <label className="block font-bold text-gray-400 uppercase text-[10px]">Email</label>
                  <p className="font-semibold text-amazon-text text-sm">alex@example.com</p>
                </div>
                <div>
                  <label className="block font-bold text-gray-400 uppercase text-[10px]">Mobile Phone</label>
                  <p className="font-semibold text-amazon-text text-sm">+1 (555) 019-2834</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-base font-bold text-amazon-text border-b border-gray-100 pb-2 flex items-center justify-between">
                <span>Prime Membership</span>
                <span className="text-xs font-extrabold text-amazon-prime italic">prime</span>
              </h2>
              <div className="space-y-2 text-xs text-gray-600">
                <p className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active Prime Annual Plan
                </p>
                <p>Next renewal: November 14, 2026 ($139.00/year)</p>
                <p className="text-[11px] text-gray-400 pt-1">
                  Enjoy Unlimited Fast, FREE Two-Day & One-Day Delivery on millions of items.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* 2. Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-amazon-text">Your Orders</h2>
              <Link to="/orders" className="text-xs font-semibold text-amazon-link hover:underline">
                View dedicated orders page
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 3).map(order => (
                  <OrderCard key={order.orderId} order={order} />
                ))}
              </div>
            ) : (
              <Card className="p-10 text-center space-y-3">
                <Package className="w-10 h-10 text-gray-300 mx-auto" />
                <p className="text-sm font-semibold text-gray-600">No orders placed yet</p>
                <Link to="/search">
                  <Button variant="primary" size="md">Start Shopping</Button>
                </Link>
              </Card>
            )}
          </div>
        )}

        {/* 3. Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-amazon-text">Your Saved Items</h2>
              <Link to="/wishlist" className="text-xs font-semibold text-amazon-link hover:underline">
                Open full Wishlist page
              </Link>
            </div>

            {wishlistProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {wishlistProducts.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <Card className="p-10 text-center space-y-3">
                <Heart className="w-10 h-10 text-gray-300 mx-auto" />
                <p className="text-sm font-semibold text-gray-600">Your wishlist is currently empty</p>
                <Link to="/search">
                  <Button variant="primary" size="md">Discover Products</Button>
                </Link>
              </Card>
            )}
          </div>
        )}

        {/* 4. Address Book Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-amazon-text">Your Addresses</h2>
                <p className="text-xs text-amazon-muted">Manage shipping locations for fast 1-click checkout</p>
              </div>

              {!isEditingAddress && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAddr(null);
                    setIsEditingAddress(true);
                  }}
                  className="text-xs font-bold text-amazon-link hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Address
                </button>
              )}
            </div>

            {isEditingAddress ? (
              <Card className="p-6">
                <h3 className="text-base font-bold text-amazon-text mb-2">
                  {editingAddr ? 'Edit Address' : 'Add New Address'}
                </h3>
                <AddressForm
                  initialAddress={editingAddr}
                  onSave={handleSaveAddress}
                  onCancel={() => {
                    setIsEditingAddress(false);
                    setEditingAddr(null);
                  }}
                />
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map(addr => (
                  <Card key={addr.id || addr.street} className="p-5 flex flex-col justify-between text-xs space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-amazon-text">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                            Default Address
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {addr.street}{addr.apt ? `, ${addr.apt}` : ''}<br />
                        {addr.city}, {addr.state} {addr.zipCode}<br />
                        {addr.country}
                      </p>
                      <p className="text-gray-500 font-medium">Phone: {addr.phone}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px]">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAddr(addr);
                            setIsEditingAddress(true);
                          }}
                          className="text-amazon-link hover:underline font-semibold flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        {addresses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-gray-400 hover:text-red-600 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        )}
                      </div>

                      {!addr.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(addr)}
                          className="text-gray-600 hover:text-amazon-dark font-semibold text-[11px]"
                        >
                          Set as default
                        </button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. Payment Methods Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-amazon-text">Your Payment Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-sm text-amazon-text">Amazon Prime Rewards Visa</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Default
                  </span>
                </div>
                <p className="text-gray-700">Ending in <strong>4242</strong> • Exp: 12/28</p>
                <p className="text-gray-500">Cardholder: Alex Johnson</p>
              </Card>

              <Card className="p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-sm text-amazon-text">Verified UPI ID</span>
                  </div>
                </div>
                <p className="text-gray-700 font-mono">alex@okhdfcbank</p>
                <p className="text-gray-500">Linked to Primary Bank Account</p>
              </Card>
            </div>
          </div>
        )}

        {/* 6. Recently Viewed Tab */}
        {activeTab === 'recent' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-amazon-text">Recently Viewed Products</h2>
            {recentProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recentProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <Card className="p-10 text-center space-y-3">
                <Clock className="w-10 h-10 text-gray-300 mx-auto" />
                <p className="text-sm font-semibold text-gray-600">No recently viewed items recorded yet</p>
                <Link to="/search">
                  <Button variant="primary" size="md">Start Browsing</Button>
                </Link>
              </Card>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};
