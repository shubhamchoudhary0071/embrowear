"use client"
import React, { useState } from 'react';

import AccountInformation from '@/components/my-account/account-information';
import FAQSection from '../../../components/my-account/faq-section';
import Customize from '../../../components/my-account/customize';
import AdminProducts from '../../../components/my-account/admin-products';
import Sidebar from '../../../components/my-account/sidebar';
import OrderHistory from '@/components/my-account/order-history';
import Wishlist from '@/components/my-account/wishlist';
import AddressManager from '@/components/my-account/address';
import PaymentMethods from '@/components/my-account/payment-methods';
import ReviewSection from '@/components/my-account/reviews';
import NotificationsSection from '@/components/my-account/notifications';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSidebar, setShowSidebar] = useState(true);

  const handleTabChange = (tab:string) => {
    setActiveTab(tab);
    // Hide sidebar on mobile when a tab is selected
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    }
  };

  const handleBackToSidebar = () => {
    setShowSidebar(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Account Information */}
           <AccountInformation />

            {/* FAQs Section */}
            <FAQSection />
          </div>
        );

      case 'customize':
        return (
          <Customize />
        );

      case 'wishlist':
        return (
          <Wishlist />
        );

      case 'payment':
        return (
          <PaymentMethods />
        );
      case 'reviews':
        return (
          <ReviewSection />
        );
      case 'notifications':
        return (
          <NotificationsSection />
        );

      case 'addresses':
        return (
          <AddressManager />
        );

      case 'orders':
        return (
          <OrderHistory />
        );

      case 'admin-products':
        return (
         <AdminProducts />
        );

      default:
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Coming Soon</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F6F0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Sidebar - Hidden on mobile when content is shown */}
          <div className={`${showSidebar ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
          </div>

          {/* Main Content - Full width on mobile when sidebar is hidden */}
          <div className={`${!showSidebar ? 'col-span-1' : 'hidden'} lg:block lg:col-span-3`}>
            {/* Mobile back button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={handleBackToSidebar}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back to Menu</span>
              </button>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;