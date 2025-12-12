"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus, Facebook, Twitter, Instagram, Heart, Share2, RotateCcw, Truck, Shield, Users } from 'lucide-react';

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    '/api/placeholder/600/700', // Main product image
    '/api/placeholder/600/700', // Alternative views
    '/api/placeholder/600/700',
    '/api/placeholder/600/700',
    '/api/placeholder/600/700',
    '/api/placeholder/600/700',
    '/api/placeholder/600/700'
  ];

  const sizes = ['M', 'L', 'XL', '2XL'];

  const thumbnails = Array(7).fill(null).map((_, index) => (
    <div
      key={index}
      className={`w-16 h-20 bg-yellow-100 rounded-lg cursor-pointer border-2 transition-all ${
        selectedImage === index ? 'border-yellow-400' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => setSelectedImage(index)}
    >
      <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-md flex items-center justify-center">
        <div className="text-white text-xs font-medium">{index + 1}</div>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">Home</span>
            <span>/</span>
            <span className="hover:text-gray-900 cursor-pointer">Hawaiian Shirts</span>
            <span>/</span>
            <span className="text-gray-400">Seagull Print Knit Shirt</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 flex items-center justify-center">
                  {/* Seagull silhouettes */}
                  <div className="absolute inset-0 opacity-20">
                    {Array(12).fill(null).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-8 h-6 bg-white transform rotate-12"
                        style={{
                          left: `${20 + (i % 4) * 20}%`,
                          top: `${15 + Math.floor(i / 4) * 25}%`,
                          clipPath: 'polygon(20% 0%, 0% 20%, 30% 50%, 70% 50%, 100% 20%, 80% 0%)'
                        }}
                      />
                    ))}
                  </div>
                  {/* Person silhouette */}
                  <div className="w-48 h-64 bg-gray-300 rounded-lg opacity-40"></div>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {thumbnails}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Seagull Print Knit Shirt</h1>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-green-600">₹1,495.00</span>
                <span className="text-sm text-gray-500">Inc of Tax</span>
              </div>
            </div>

            <div className="prose text-gray-600">
              <p>
                Wrap yourself in comfort with our Seagull print Knit Shirt is the perfect blend of comfort and sophistication. Elevate your wardrobe with a touch of coastal charm and let your style take flight with this timeless piece.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Specifications :</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Regular fit.</li>
                <li>• Short Sleeve Button Up Shirt.</li>
                <li>• Flying Seagull Print.</li>
                <li>• Main fabric: Cotton (94%), Lycra (6%).</li>
              </ul>
            </div>

            {/* Size Chart */}
            <div className="border-t pt-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Users className="w-4 h-4" />
                <span className="text-sm">Size Chart</span>
              </button>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">Size</label>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 border rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">
                Colour: <span className="font-normal">Gold Honey</span>
              </label>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-gray-400 text-white py-4 rounded-lg font-medium text-lg hover:bg-gray-500 transition-colors">
              Choose Size
            </button>

            {/* Care Instructions */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Care</h3>
              <div className="flex space-x-4">
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <Truck className="w-4 h-4 text-gray-600" />
                </div>
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <RotateCcw className="w-4 h-4 text-gray-600" />
                </div>
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <Heart className="w-4 h-4 text-gray-600" />
                </div>
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <Shield className="w-4 h-4 text-gray-600" />
                </div>
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </div>
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-600" />
                </div>
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex space-x-4 pt-4">
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600">
                <Instagram className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;