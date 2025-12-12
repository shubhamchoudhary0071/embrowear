'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ProductShowcaseProps {
  className?: string
}

export default function ProductShowcase({ className = '' }: ProductShowcaseProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Depth in every thread.
          </h2>
          <p className="text-lg text-gray-600">
            Designed for comfort, made to turn heads.
          </p>
        </div>

        {/* Main Product Grid - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Classic Polo Shirts */}
          <div className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-teal-100 to-teal-200 aspect-[4/4]">
            <div className="absolute inset-0">
              {/* Simulated product image background */}
              <div className="w-full h-full flex items-center justify-center">
               <img src="/images/polo.jpg" className='w-full h-full object-cover' />
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6">
              <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-300">
                CLASSIC POLO SHIRTS
              </Badge>
            </div>
          </div>

          {/* Long Sleeve Polo Shirts */}
          <div className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-sky-100 to-sky-200 aspect-[4/4]">
            <div className="absolute inset-0">
              {/* Simulated product image background */}
              <div className="w-full h-full flex items-center justify-center">
               <img src="/images/long.jpg" className='w-full h-full object-cover' />
              </div>
            </div>
           
            <div className="absolute bottom-6 right-6">
              <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-300">
                LONG SLEEVE POLO SHIRTS
              </Badge>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Round Neck T-Shirts */}
          <div className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-orange-100 to-red-200 aspect-[4/3]">
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-300 flex items-center justify-center">
                <div className="flex space-x-4">
                  <div className="w-20 h-32 bg-red-600 rounded-lg shadow-lg"></div>
                  <div className="w-20 h-32 bg-gray-800 rounded-lg shadow-lg"></div>
                </div>
              </div>
            </div>
            <div className="absolute top-6 left-6">
              <h3 className="text-2xl font-bold text-white mb-1">Round Neck</h3>
              <h3 className="text-2xl font-bold text-white">T-Shirts</h3>
            </div>
            <div className="absolute bottom-6 left-6">
              <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-300">
                ROUND NECK T-SHIRTS
              </Badge>
            </div>
          </div>

          {/* Tropical Shirts */}
          <div className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-cyan-100 to-teal-200 aspect-[4/3]">
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-br from-cyan-200 to-teal-300 flex items-center justify-center">
                <div className="flex space-x-4">
                  <div className="w-20 h-32 bg-cyan-500 rounded-lg shadow-lg"></div>
                  <div className="w-20 h-32 bg-red-500 rounded-lg shadow-lg"></div>
                </div>
              </div>
            </div>
            <div className="absolute top-6 left-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Tropical</h3>
              <h3 className="text-2xl font-bold text-gray-900">Shirts</h3>
            </div>
            <div className="absolute bottom-6 right-6">
              <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-300">
                TROPICAL SHIRTS
              </Badge>
            </div>
          </div>
        </div>

        {/* Bottom Row - Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Shorts */}
          <div className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-cyan-200 aspect-[4/3]">
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-br from-blue-200 to-cyan-300 flex items-center justify-center">
                <div className="flex space-x-2">
                  <div className="w-12 h-20 bg-yellow-500 rounded-lg shadow-lg"></div>
                  <div className="w-12 h-20 bg-teal-600 rounded-lg shadow-lg"></div>
                  <div className="w-12 h-20 bg-red-500 rounded-lg shadow-lg"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-yellow-700 mb-3">SHORTS</h3>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-700 border-gray-300"
              >
                SHOP NOW
              </Button>
            </div>
          </div>

          {/* Trousers */}
          <div className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-100 to-orange-200 aspect-[4/3]">
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                <div className="w-16 h-24 bg-white rounded-lg shadow-lg"></div>
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-orange-700 mb-3">TROUSERS</h3>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-700 border-gray-300"
              >
                SHOP NOW
              </Button>
            </div>
          </div>

          {/* Winterwear */}
          <div className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-green-100 to-yellow-200 aspect-[4/3]">
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-br from-green-200 to-yellow-300 flex items-center justify-center">
                <div className="flex space-x-2">
                  <div className="w-12 h-20 bg-orange-600 rounded-lg shadow-lg"></div>
                  <div className="w-12 h-20 bg-green-700 rounded-lg shadow-lg"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-orange-700 mb-3">WINTERWEAR</h3>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-700 border-gray-300"
              >
                SHOP NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

