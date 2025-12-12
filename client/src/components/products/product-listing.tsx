"use client"
import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';

const ProductGrid = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Glass Print Knit Shirt',
      price: null,
      priceText: 'Select options',
      image: '/api/placeholder/600/800',
      isLarge: true,
      pattern: 'geometric'
    },
    {
      id: 2,
      name: 'Tribal Print Knit Shirt',
      price: 1495.00,
      priceText: '₹1,495.00',
      taxText: 'Inc of Tax',
      image: '/api/placeholder/400/500',
      isLarge: false,
      pattern: 'tribal'
    },
    {
      id: 3,
      name: 'Leaf Print Knit Shirt',
      price: 1495.00,
      priceText: '₹1,495.00',
      taxText: 'Inc of Tax',
      image: '/api/placeholder/400/500',
      isLarge: false,
      pattern: 'leaf'
    },
    {
      id: 4,
      name: 'Floral Print Knit Shirt',
      price: 1495.00,
      priceText: '₹1,495.00',
      taxText: 'Inc of Tax',
      image: '/api/placeholder/400/500',
      isLarge: false,
      pattern: 'floral'
    },
    {
      id: 5,
      name: 'Nautical Print Knit Shirt',
      price: 1495.00,
      priceText: '₹1,495.00',
      taxText: 'Inc of Tax',
      image: '/api/placeholder/400/500',
      isLarge: false,
      pattern: 'nautical'
    }
  ];

  const getPatternStyles = (pattern) => {
    const patterns = {
      geometric: 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300',
      tribal: 'bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-300',
      leaf: 'bg-gradient-to-br from-green-100 via-green-200 to-green-300',
      floral: 'bg-gradient-to-br from-pink-100 via-purple-200 to-pink-300',
      nautical: 'bg-gradient-to-br from-cyan-100 via-blue-200 to-cyan-300'
    };
    return patterns[pattern] || 'bg-gray-200';
  };

  const ProductCard = ({ product, className = '' }) => {
    const isHovered = hoveredProduct === product.id;

    return (
      <div 
        className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        {/* Product Image */}
        <div className={`relative overflow-hidden ${product.isLarge ? 'aspect-[3/4]' : 'aspect-square'}`}>
          <div className={`w-full h-full ${getPatternStyles(product.pattern)} flex items-center justify-center`}>
            {/* Simulated model/shirt */}
            <div className="relative">
              {/* Person silhouette for large card */}
              {product.isLarge && (
                <div className="w-32 h-48 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full opacity-60"></div>
              )}
              
              {/* Shirt representation */}
              <div className={`${product.isLarge ? 'w-28 h-20 absolute top-8 left-2' : 'w-16 h-12'} bg-gradient-to-br ${
                product.pattern === 'geometric' ? 'from-blue-600 to-blue-800' :
                product.pattern === 'tribal' ? 'from-amber-600 to-amber-800' :
                product.pattern === 'leaf' ? 'from-green-600 to-green-800' :
                product.pattern === 'floral' ? 'from-purple-600 to-pink-700' :
                'from-cyan-600 to-blue-800'
              } rounded-lg shadow-lg`}>
                {/* Pattern overlay */}
                <div className="w-full h-full opacity-30 bg-white rounded-lg" style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                   radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
                  backgroundSize: '8px 8px'
                }}></div>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
              <Eye className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            {product.price ? (
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-900">
                  {product.priceText}
                </span>
                <span className="text-sm text-gray-500">
                  {product.taxText}
                </span>
              </div>
            ) : (
              <span className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer">
                {product.priceText}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
        {/* Large featured product - spans 2 columns on large screens, 2 columns on mobile */}
        <div className="col-span-2 lg:row-span-2">
          <ProductCard product={products[0]} className="h-full" />
        </div>

        {/* Smaller products in grid */}
        {products.slice(1).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Additional grid for more products if needed */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
        {/* You can add more products here */}
      </div>
    </div>
  );
};

export default ProductGrid;