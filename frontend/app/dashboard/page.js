'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../../store/slices/orderSlice';
import { fetchUserWishlist } from '../../store/slices/wishlistSlice';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardOverview from '../../components/dashboard/DashboardOverview';
import OrderHistory from '../../components/dashboard/OrderHistory';
import UserProfile from '../../components/dashboard/UserProfile';
import Wishlist from '../../components/dashboard/Wishlist';
import { FiHome, FiPackage, FiUser, FiHeart, FiSettings } from 'react-icons/fi';

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
  const { items: wishlistItems, loading: wishlistLoading } = useSelector((state) => state.wishlist);

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login?redirect=/dashboard');
      return;
    }

    dispatch(fetchUserOrders());
    dispatch(fetchUserWishlist());
  }, [user, router, dispatch]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FiHome },
    { id: 'orders', name: 'Orders', icon: FiPackage },
    { id: 'wishlist', name: 'Wishlist', icon: FiHeart },
    { id: 'profile', name: 'Profile', icon: FiUser },
    { id: 'settings', name: 'Settings', icon: FiSettings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <DashboardOverview 
            user={user}
            orders={orders}
            wishlistItems={wishlistItems}
          />
        );
      case 'orders':
        return (
          <OrderHistory 
            orders={orders}
            loading={ordersLoading}
          />
        );
      case 'wishlist':
        return (
          <Wishlist 
            items={wishlistItems}
            loading={wishlistLoading}
          />
        );
      case 'profile':
        return (
          <UserProfile 
            user={user}
          />
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
            <p className="text-gray-600">Settings functionality coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="container-custom py-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <DashboardSidebar 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                user={user}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 