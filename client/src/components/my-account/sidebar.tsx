import { Bell, CreditCard, Gift, Heart, LogOut, MapPin, Package,  Plus, Settings, Shield, Star, User } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props{
    activeTab: string;
    setActiveTab: (data: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: Props) => {
  const isAdmin = true;
  const router=useRouter();

  const menuItems = [
    { id: 'overview', icon: User, label: 'Account Overview' },
    { id: 'orders', icon: Package, label: 'Order History' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'addresses', icon: MapPin, label: 'Addresses' },
    { id: 'payment', icon: CreditCard, label: 'Payment Methods' },
    // { id: 'customize', icon: Palette, label: 'T-Shirt Designer' },
    { id: 'loyalty', icon: Gift, label: 'Loyalty Program' },
    { id: 'reviews', icon: Star, label: 'My Reviews' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  if (isAdmin) {
    menuItems.splice(5, 0, { 
      id: 'admin-products', 
      icon: Plus, 
      label: 'Add Products'
    });
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="p-4 sm:p-6 bg-gray-800 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm sm:text-base truncate">John Smith</h3>
              <p className="text-xs sm:text-sm text-gray-300">Member since 2022</p>
            </div>
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="p-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-gray-100 text-gray-800'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium truncate">{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Sign Out Button */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
            onClick={()=>router.push("/login")}
             className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar