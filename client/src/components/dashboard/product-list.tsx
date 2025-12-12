'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  isNew: boolean
  colors?: string[]
  image: string
  category: string
}

interface ProductListingProps {
  className?: string
}

export default function ProductListing({ className = '' }: ProductListingProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')

  const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']

  const products: Product[] = [
    {
      id: 1,
      name: 'Fahrenheit Front Open Shirt',
      price: 1795.00,
      originalPrice: 2395.00,
      isNew: true,
      image: 'dark-blue',
      category: 'shirt'
    },
    {
      id: 2,
      name: 'Fahrenheit Front Open Shirt',
      price: 1795.00,
      originalPrice: 2395.00,
      isNew: true,
      image: 'cream',
      category: 'shirt'
    },
    {
      id: 3,
      name: 'Fahrenheit Front Open Shirt',
      price: 0,
      isNew: true,
      colors: ['Navy', 'Cream', 'Black'],
      image: 'navy',
      category: 'shirt'
    },
    {
      id: 4,
      name: 'Fahrenheit Half Zip Polo',
      price: 1695.00,
      originalPrice: 2295.00,
      isNew: true,
      image: 'mustard',
      category: 'polo'
    },
    {
      id: 5,
      name: 'Fahrenheit Half Zip Polo',
      price: 1695.00,
      originalPrice: 2295.00,
      isNew: true,
      image: 'teal',
      category: 'polo'
    },
    {
      id: 6,
      name: 'Straight Fit Cargo Pants',
      price: 1995.00,
      originalPrice: 2695.00,
      isNew: true,
      image: 'brown',
      category: 'pants'
    },
    {
      id: 7,
      name: 'Fahrenheit Jockey Collar',
      price: 1495.00,
      originalPrice: 1995.00,
      isNew: true,
      image: 'olive',
      category: 'polo'
    },
    {
      id: 8,
      name: 'Fahrenheit Jockey Collar',
      price: 1495.00,
      originalPrice: 1995.00,
      isNew: true,
      image: 'cream-polo',
      category: 'polo'
    },
    {
      id: 9,
      name: 'Fahrenheit Jockey Collar',
      price: 1495.00,
      originalPrice: 1995.00,
      isNew: true,
      image: 'black',
      category: 'polo'
    },
    {
      id: 10,
      name: 'Fahrenheit Jockey Collar',
      price: 1495.00,
      originalPrice: 1995.00,
      isNew: true,
      image: 'brown-polo',
      category: 'polo'
    },
    {
      id: 11,
      name: 'Vertical Stripe Pique Polo',
      price: 1195.00,
      originalPrice: 1595.00,
      isNew: true,
      image: 'yellow-stripe',
      category: 'polo'
    },
    {
      id: 12,
      name: 'Vertical Stripe Pique Polo',
      price: 1195.00,
      originalPrice: 1595.00,
      isNew: true,
      image: 'white-stripe',
      category: 'polo'
    }
  ]

  const getProductImage = (imageType: string) => {
    const imageMap: { [key: string]: string } = {
      'dark-blue': 'bg-slate-700',
      'cream': 'bg-stone-200',
      'navy': 'bg-slate-800',
      'mustard': 'bg-yellow-600',
      'teal': 'bg-teal-600',
      'brown': 'bg-amber-800',
      'olive': 'bg-green-700',
      'cream-polo': 'bg-stone-300',
      'black': 'bg-black',
      'brown-polo': 'bg-amber-700',
      'yellow-stripe': 'bg-gradient-to-r from-yellow-400 to-orange-400',
      'white-stripe': 'bg-gradient-to-r from-gray-200 to-blue-200'
    }
    return imageMap[imageType] || 'bg-gray-300'
  }

  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`
  }

  return (
    <div className={`bg-white ${className}`}>
      {/* Size Selector Section */}
      <div className="bg-slate-700 text-white py-12 mb-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-sm font-medium text-slate-300 mb-2">Celebrating Size</h2>
          <h3 className="text-3xl font-bold mb-3">All things great & small.</h3>
          <p className="text-orange-400 underline mb-6 cursor-pointer">Shop by size.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 rounded border-2 font-medium transition-colors ${
                  selectedSize === size
                    ? 'border-orange-400 bg-orange-400 text-slate-700'
                    : 'border-slate-500 hover:border-slate-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-slate-600 mb-1">Just In</p>
          <h2 className="text-2xl font-bold text-slate-900">New In Store</h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative bg-stone-100 rounded-lg overflow-hidden mb-3 aspect-[3/4]">
                {/* Product Image Placeholder */}
                <div className={`w-full h-full ${getProductImage(product.image)} flex items-center justify-center`}>
                  <div className="w-24 h-32 bg-white/20 rounded-lg"></div>
                </div>
                
                {/* New Badge */}
                {product.isNew && (
                  <Badge className="absolute top-3 left-3 bg-white text-slate-700 hover:bg-white">
                    New!
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <h3 className="font-medium text-slate-900 text-sm leading-tight">
                  {product.name}
                </h3>
                
                {product.colors ? (
                  <p className="text-sm text-slate-600">Select options</p>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Shop All Button */}
        <div className="text-center">
          <Button 
            className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-2 font-medium"
          >
            SHOP ALL
          </Button>
        </div>
      </div>
    </div>
  )
}

