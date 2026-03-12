import { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, Gift, Heart, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function Account() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-12 container-content">
        <div className="max-w-md mx-auto card p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In to Your Account</h1>
          <form className="space-y-4">
            <input type="email" placeholder="Email address" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <button type="submit" className="btn-primary w-full">Sign In</button>
          </form>
          <p className="text-center mt-4 text-text-secondary">
            Don't have an account? <a href="#" className="text-primary">Sign up</a>
          </p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: User, label: 'Profile', path: '/account/profile' },
    { icon: MapPin, label: 'Addresses', path: '/account/addresses' },
    { icon: CreditCard, label: 'Payment Methods', path: '/account/payment' },
    { icon: Gift, label: 'Loyalty Points', path: '/account/rewards' },
    { icon: Heart, label: 'Favorites', path: '/account/favorites' },
    { icon: Settings, label: 'Settings', path: '/account/settings' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-content">
        <h1 className="text-2xl font-bold mb-8">My Account</h1>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="card p-4">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                  <p className="text-sm text-text-secondary">{user?.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <item.icon className="w-5 h-5 text-text-secondary" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-error w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Loyalty Points</h2>
              <div className="bg-gradient-to-r from-nigerian-orange to-nigerian-jollof rounded-2xl p-6 text-white mb-6">
                <p className="text-sm opacity-80">Your Points</p>
                <p className="text-4xl font-bold">{user?.loyaltyPoints || 0}</p>
                <p className="text-sm mt-2">{user?.loyaltyTier || 'Bronze'} Member</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-text-secondary">Orders</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">₦0</p>
                  <p className="text-sm text-text-secondary">Spent</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-text-secondary">Referrals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
