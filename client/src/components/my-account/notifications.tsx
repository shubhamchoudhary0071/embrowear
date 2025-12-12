"use client"
import React, { useState } from 'react'
import { Bell, Package, Truck, CreditCard, Gift, Star, ChevronRight, X, Settings } from 'lucide-react'

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order for Nike Air Max 270 Running Shoes has been delivered successfully.',
      time: '2 hours ago',
      isRead: false,
      icon: Package,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&h=60&fit=crop',
      actionText: 'View Order'
    },
    {
      id: 2,
      type: 'shipping',
      title: 'Out for Delivery',
      message: 'Your order ORD-2024-005 is out for delivery and will reach you today.',
      time: '4 hours ago',
      isRead: false,
      icon: Truck,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop',
      actionText: 'Track Order'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of ₹2,499 for order ORD-2024-004 has been processed successfully.',
      time: '1 day ago',
      isRead: true,
      icon: CreditCard,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      image: null,
      actionText: 'View Receipt'
    },
    {
      id: 4,
      type: 'offer',
      title: 'Special Offer for You!',
      message: 'Get 40% off on all footwear. Limited time offer ending soon!',
      time: '1 day ago',
      isRead: true,
      icon: Gift,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      image: null,
      actionText: 'Shop Now'
    },
    {
      id: 5,
      type: 'review',
      title: 'Rate Your Recent Purchase',
      message: 'How was your experience with Red Tape Men Colourblocked Sneakers?',
      time: '2 days ago',
      isRead: true,
      icon: Star,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=60&h=60&fit=crop',
      actionText: 'Write Review'
    },
    {
      id: 6,
      type: 'shipping',
      title: 'Order Shipped',
      message: 'Your order ORD-2024-003 has been shipped and is on its way to you.',
      time: '3 days ago',
      isRead: true,
      icon: Truck,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=60&h=60&fit=crop',
      actionText: 'Track Package'
    }
  ])

  const filterOptions = ['All', 'Orders', 'Payments', 'Offers', 'Reviews'] as const;
  type Filter = typeof filterOptions[number];
  
  const [filter, setFilter] = useState<Filter>('All');
  const markAsRead = (notificationId:number) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ))
  }

  const deleteNotification = (notificationId:number) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })))
  }

  const getFilteredNotifications = () => {
    if (filter === 'All') return notifications
    
    const typeMap = {
      'Orders': ['order', 'shipping'],
      'Payments': ['payment'],
      'Offers': ['offer'],
      'Reviews': ['review']
    }
    
    return notifications.filter(notification => 
      typeMap[filter]?.includes(notification.type)
    )
  }

  const unreadCount = notifications.filter(n => !n.isRead).length
  const filteredNotifications = getFilteredNotifications()

  return (
    <div className="bg-white max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-gray-700" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-500">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Mark all as read
              </button>
            )}
            <button className="p-2 hover:bg-gray-100 rounded">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 overflow-x-auto">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                filter === option
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-gray-50">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const IconComponent = notification.icon
            return (
              <div 
                key={notification.id} 
                className={`bg-white mb-3 mx-4 border border-gray-200 hover:shadow-sm transition-shadow ${
                  !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-2 rounded-full ${notification.bgColor} flex-shrink-0`}>
                      <IconComponent className={`h-5 w-5 ${notification.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-sm font-medium ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {notification.time}
                          </span>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      <p className={`text-sm mb-3 ${
                        !notification.isRead ? 'text-gray-800' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>

                      {/* Product Image and Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {notification.image && (
                            <div className="w-10 h-10 bg-gray-100 rounded flex-shrink-0">
                              <img 
                                src={notification.image} 
                                alt="Product"
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          )}
                          <button 
                            onClick={() => markAsRead(notification.id)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                          >
                            {notification.actionText}
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>

                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default NotificationsSection