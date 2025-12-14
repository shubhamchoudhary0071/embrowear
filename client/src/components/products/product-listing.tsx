"use client";

import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  price: number | null;
  priceText: string;
  taxText?: string; // Optional, since not all products have it
  image: string;
  isLarge: boolean;
  pattern: 'geometric' | 'tribal' | 'leaf' | 'floral' | 'nautical';
};

const ProductGrid: React.FC = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: 'Glass Print Knit Shirt',
      price: null,
      priceText: 'Select options',
      image: '/images/sample1.jpg',
      isLarge: true,
      pattern: 'geometric'
    },
    {
      id: 2,
      name: 'Tribal Print Knit Shirt',
      price: 1495.00,
      priceText: '₹1,495.00',
      taxText: 'Inc of Tax',
      image: '/images/sample2.jpg',
      isLarge: false,
      pattern: 'tribal'
    },
    {
      id: 3,
      name: 'Leaf Print Knit Shirt',
      price: 1495.00,
      priceText: '₹1,495.00',
      taxText: 'Inc of Tax',
      image: '/images/sample3.jpg',
      isLarge: false,
      pattern: 'leaf'
    },
    {
      id: 4,
      name: 'Floral Print Knit Shirt',
      price: 1495.00,
      priceText: '₹1,495.00',
      taxText: 'Inc of Tax',
      image: '/images/sample4.jpg',
      isLarge: false,
      pattern: 'floral'
    },
    {
      id: 5,
      name: 'Nautical Print Knit Shirt',
      price: 1495.00,
      priceText: '₹1,495.00',
      taxText: 'Inc of Tax',
      image: '/images/sample5.jpg',
      isLarge: false,
      pattern: 'nautical'
    }
  ];


  const ProductCard: React.FC<{ product: Product; className?: string }> = ({ product, className = '' }) => {
    const isHovered = hoveredProduct === product.id;

    return (
      <div 
        className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        {/* Product Image */}
        <div className={`relative overflow-hidden ${product.isLarge ? 'aspect-[3/4]' : 'aspect-square'}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
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
            {product.price !== null ? (
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-900">
                  {product.priceText}
                </span>
                {product.taxText && (
                  <span className="text-sm text-gray-500">
                    {product.taxText}
                  </span>
                )}
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