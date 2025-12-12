"use client"
import { X, Heart, ShoppingBag, Grid, List, Search, SlidersHorizontal, Star, Shield } from 'lucide-react'
import React, { useState } from 'react'

const Wishlist = () => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const wishlistItems = [
    {
      id: 1,
      name: 'Campus MIKE (N) Men Lace-Up Sneakers',
      brand: 'Campus',
      price: 1999,
      originalPrice: null,
      discount: null,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      available: true,
      rating: 4.2,
      assured: false
    },
    {
      id: 2,
      name: 'ASIAN Men Mesh Running Lightweight Shoes',
      brand: 'Asian',
      price: 959,
      originalPrice: 1599,
      discount: 40,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      available: true,
      rating: 4.1,
      assured: true
    },
    {
      id: 3,
      name: 'ADIDAS Men Terrex Anyland Hiking Shoes',
      brand: 'Adidas',
      price: 5073,
      originalPrice: 8599,
      discount: 41,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop',
      available: true,
      rating: 4.5,
      assured: false
    },
    {
      id: 4,
      name: 'New Balance Men More Fresh Foam Running Shoes',
      brand: 'New Balance',
      price: 11899,
      originalPrice: 16999,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
      available: true,
      rating: 4.3,
      assured: true
    },
    {
      id: 5,
      name: 'JUGULAR Printed Men Round Neck Black T-Shirt',
      brand: 'Jugular',
      price: 262,
      originalPrice: 800,
      discount: 70,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      available: true,
      rating: 3.8,
      assured: true
    },
    {
      id: 6,
      name: 'FARBOT Solid Men Round Neck Black T-Shirt',
      brand: 'Farbot',
      price: null,
      originalPrice: null,
      discount: null,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=300&h=300&fit=crop',
      available: false,
      rating: null,
      assured: false
    },
    {
      id: 7,
      name: 'TRIPR Full Sleeve Graphic Print Men Sweatshirt',
      brand: 'Tripr',
      price: null,
      originalPrice: null,
      discount: null,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop',
      available: false,
      rating: null,
      assured: false
    }
  ]

  const removeFromWishlist = (id:number) => {
    // Remove item logic would go here
    console.log('Remove item:', id)
  }

  const moveToCart = (id:number) => {
    // Move to cart logic would go here
    console.log('Move to cart:', id)
  }

  const filteredItems = wishlistItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredItems.map((item) => (
        <div key={item.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-2 right-2 w-8 h-8 bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
            {item.discount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-medium">
                {item.discount}% OFF
              </div>
            )}
            {!item.available && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white px-3 py-1 text-sm font-medium text-gray-700">
                  Currently unavailable
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 h-10">
              {item.name}
            </div>
            
            {item.assured && (
              <div className="flex items-center gap-1 mb-2">
                <Shield className="h-3 w-3 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">Assured</span>
              </div>
            )}
            
            {item.rating && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-600">{item.rating}</span>
              </div>
            )}
            
            <div className="mb-3">
              {item.available ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">₹{item.price?.toLocaleString()}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              ) : (
                <div className="text-sm text-gray-500">Price: Not Available</div>
              )}
            </div>
            
            {item.available ? (
              <button
                onClick={() => moveToCart(item.id)}
                className="w-full bg-red-500 text-white py-2 text-sm font-medium hover:bg-red-600 transition-colors"
              >
                MOVE TO BAG
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-200 text-gray-500 py-2 text-sm font-medium cursor-not-allowed"
              >
                CURRENTLY UNAVAILABLE
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const ListView = () => (
    <div className="space-y-4">
      {filteredItems.map((item) => (
        <div key={item.id} className="bg-white border border-gray-200 p-4 flex gap-4 hover:shadow-md transition-shadow">
          <div className="relative w-24 h-24 flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {!item.available && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white px-2 py-1 text-xs font-medium text-gray-700">
                  Currently unavailable
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
                
                <div className="flex items-center gap-4 mb-2">
                  {item.assured && (
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-blue-600 font-medium">Assured</span>
                    </div>
                  )}
                  
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{item.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-2">
                  {item.available ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">₹{item.price?.toLocaleString()}</span>
                      {item.originalPrice && (
                        <>
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                          <span className="text-sm text-green-600 font-medium">{item.discount}% off</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Price: Not Available</div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex gap-2">
              {item.available ? (
                <button
                  onClick={() => moveToCart(item.id)}
                  className="px-4 py-2 bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  MOVE TO BAG
                </button>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-200 text-gray-500 text-sm font-medium cursor-not-allowed"
                >
                  CURRENTLY UNAVAILABLE
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
            <span className="text-gray-500">({filteredItems.length} items)</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in wishlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500">Add items you love to your wishlist. Review them anytime and easily move them to your bag.</p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? <GridView /> : <ListView />}
          </>
        )}
      </div>
    </div>
  )
}

export default Wishlist