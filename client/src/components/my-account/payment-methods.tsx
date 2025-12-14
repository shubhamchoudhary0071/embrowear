"use client"
import { Search, Filter, CreditCard, Smartphone, Wallet, Plus, MoreVertical, Shield, Star, ChevronRight, Edit, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

const PaymentMethods = () => {
  const [typeFilter, setTypeFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const typeOptions = ['All', 'Credit Cards', 'Debit Cards', 'UPI', 'Digital Wallets', 'Net Banking']

  const paymentMethods = [
    {
      id: 'card-001',
      type: 'Credit Card',
      name: 'HDFC Bank Credit Card',
      details: '**** **** **** 1234',
      expiry: 'Expires 12/26',
      isDefault: true,
      provider: 'Visa',
      addedDate: 'Added on 15 Mar 2024',
      lastUsed: 'Last used: 2 days ago',
      verified: true
    },
    {
      id: 'card-002',
      type: 'Debit Card',
      name: 'SBI Debit Card',
      details: '**** **** **** 5678',
      expiry: 'Expires 08/25',
      isDefault: false,
      provider: 'Mastercard',
      addedDate: 'Added on 22 Jan 2024',
      lastUsed: 'Last used: 1 week ago',
      verified: true
    },
    {
      id: 'upi-001',
      type: 'UPI',
      name: 'Google Pay',
      details: 'john.doe@oksbi',
      expiry: null,
      isDefault: false,
      provider: 'UPI',
      addedDate: 'Added on 10 Apr 2024',
      lastUsed: 'Last used: Yesterday',
      verified: true
    },
    {
      id: 'upi-002',
      type: 'UPI',
      name: 'PhonePe',
      details: 'john.doe@ybl',
      expiry: null,
      isDefault: false,
      provider: 'UPI',
      addedDate: 'Added on 5 Feb 2024',
      lastUsed: 'Last used: 3 days ago',
      verified: true
    },
    {
      id: 'wallet-001',
      type: 'Digital Wallet',
      name: 'Paytm Wallet',
      details: '+91 98765 43210',
      expiry: null,
      isDefault: false,
      provider: 'Paytm',
      addedDate: 'Added on 18 Mar 2024',
      lastUsed: 'Last used: 5 days ago',
      verified: false
    },
    {
      id: 'netbank-001',
      type: 'Net Banking',
      name: 'ICICI Bank',
      details: 'Net Banking Account',
      expiry: null,
      isDefault: false,
      provider: 'ICICI',
      addedDate: 'Added on 12 Apr 2024',
      lastUsed: 'Last used: 1 month ago',
      verified: true
    }
  ]

  const getPaymentIcon = (type:string) => {
    switch (type) {
      case 'Credit Card':
      case 'Debit Card':
        return <CreditCard className="h-5 w-5 text-blue-600" />
      case 'UPI':
        return <Smartphone className="h-5 w-5 text-green-600" />
      case 'Digital Wallet':
        return <Wallet className="h-5 w-5 text-purple-600" />
      case 'Net Banking':
        return <CreditCard className="h-5 w-5 text-orange-600" />
      default:
        return <CreditCard className="h-5 w-5 text-gray-600" />
    }
  }

  const getProviderLogo = (provider:string) => {
    // In a real app, you'd return actual provider logos
    const colors = {
      'Visa': 'bg-blue-600',
      'Mastercard': 'bg-red-600',
      'UPI': 'bg-green-600',
      'Paytm': 'bg-blue-500',
      'ICICI': 'bg-orange-600'
    }
    
    return (
        <div className={`w-8 h-5 ${colors[provider as keyof typeof colors] || 'bg-gray-600'} text-white text-xs flex items-center justify-center font-bold`}>
          {provider?.substring(0, 2).toUpperCase()}
        </div>
      )
  }

  const filteredMethods = paymentMethods.filter(method => {
    const matchesType = typeFilter === 'All' || method.type === typeFilter
    const matchesSearch = method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         method.details.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
            <p className="text-sm text-gray-500">Manage your saved payment options</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search payment methods"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            FILTER
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-3 p-3 bg-gray-50 border border-gray-200">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Payment Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 text-sm"
              >
                {typeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Payment Methods List */}
      <div className="bg-gray-50">
        {filteredMethods.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No payment methods found</p>
            <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
              Add your first payment method
            </button>
          </div>
        ) : (
          filteredMethods.map((method) => (
            <div key={method.id} className="bg-white mb-3 mx-4 border border-gray-200">
              {/* Payment Method Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getPaymentIcon(method.type)}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">{method.name}</span>
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium">
                            Default
                          </span>
                        )}
                        {method.verified && (
                          <Shield className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{method.details}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getProviderLogo(method.provider)}
                    <div className="relative">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === method.id ? null : method.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeMenu === method.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg border border-gray-200 z-10">
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Edit className="h-4 w-4" />
                            Edit Details
                          </button>
                          {!method.isDefault && (
                            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Star className="h-4 w-4" />
                              Set as Default
                            </button>
                          )}
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            Remove Method
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Details */}
              <div className="p-4 hover:bg-gray-50 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      {method.expiry && (
                        <div className="text-sm text-gray-600">{method.expiry}</div>
                      )}
                      {!method.verified && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium">
                          Verification Required
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <div className="w-2 h-2 bg-gray-400"></div>
                      <span>{method.addedDate}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-400"></div>
                      <span>{method.lastUsed}</span>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                </div>
              </div>

              {/* Quick Actions */}
              {!method.verified && (
                <div className="p-4 border-t border-gray-100 bg-yellow-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-yellow-800">
                      Verify this payment method to use it for purchases
                    </div>
                    <button className="text-sm text-yellow-700 hover:text-yellow-800 font-medium">
                      Verify Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Click outside handler for dropdown menus */}
      {activeMenu && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  )
}

export default PaymentMethods