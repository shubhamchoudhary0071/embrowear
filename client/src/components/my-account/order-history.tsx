"use client"
import { Search, Filter, CheckCircle, Truck, XCircle, RotateCcw, ChevronRight, Star } from 'lucide-react'
import React, { useState } from 'react'

const OrderHistory = () => {
  const [statusFilter, setStatusFilter] = useState('All')
  const [timeFilter, setTimeFilter] = useState('Anytime')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const statusOptions = ['All', 'On the way', 'Delivered', 'Cancelled', 'Returned']
  const timeOptions = ['Anytime', 'Last 30 days', 'Last 6 months', 'Last year']

  const orders = [
    {
      id: 'ORD-2024-001',
      date: 'On Wed, 21 May',
      status: 'Delivered',
      items: [{
        name: 'Roadster',
        description: 'Unisex Hard Sided Large Trolley Suitcase',
        size: 'Size: L',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop'
      }],
      exchangeReturn: 'Exchange/Return window closed on Wed, 28 May',
      canReview: true
    },
    {
      id: 'ORD-2024-002',
      date: 'On Fri, 16 Feb 2024',
      status: 'Delivered',
      items: [{
        name: 'Red Tape',
        description: 'Men Colourblocked Contrast Sole Sneakers',
        size: 'Size: 9',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop'
      }],
      exchangeReturn: 'Exchange/Return window closed on Fri, 1 Mar 2024',
      canReview: true
    },
    {
      id: 'ORD-2024-003',
      date: 'On Mon, 10 Jun',
      status: 'On the way',
      items: [{
        name: 'Nike',
        description: 'Air Max 270 Running Shoes',
        size: 'Size: 10',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop'
      }],
      exchangeReturn: null,
      canReview: false
    },
    {
      id: 'ORD-2024-004',
      date: 'On Tue, 5 Jun',
      status: 'Cancelled',
      items: [{
        name: 'Adidas',
        description: 'Ultraboost 22 Running Shoes',
        size: 'Size: 9',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=80&h=80&fit=crop'
      }],
      exchangeReturn: null,
      canReview: false
    }
  ]

  const getStatusIcon = (status:string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'On the way':
        return <Truck className="h-5 w-5 text-blue-600" />
      case 'Cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'Returned':
        return <RotateCcw className="h-5 w-5 text-orange-600" />
      default:
        return null
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter
    const matchesSearch = order.items.some(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return matchesStatus && matchesSearch
  })

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">All orders</h2>
            <p className="text-sm text-gray-500">from anytime</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in orders"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 text-sm"
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 text-sm"
                >
                  {timeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Orders List */}
      <div className="bg-gray-50">
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No orders found matching your criteria</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white mb-3 mx-4 border border-gray-200">
              {/* Order Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <div className="font-medium text-green-600 text-sm">{order.status}</div>
                    <div className="text-sm text-gray-600">{order.date}</div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              {order.items.map((item, index) => (
                <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer group">
                  <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm mb-1">{item.name}</div>
                    <div className="text-sm text-gray-600 mb-1">{item.description}</div>
                    <div className="text-sm text-gray-500">{item.size}</div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                </div>
              ))}

              {/* Order Footer */}
              <div className="p-4 border-t border-gray-100">
                {order.exchangeReturn && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <div className="w-2 h-2 bg-gray-400"></div>
                    <span>{order.exchangeReturn}</span>
                  </div>
                )}

                {order.canReview && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Rate & Review to earn Myntra Credit
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrderHistory