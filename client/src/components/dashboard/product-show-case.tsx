'use client'

import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation';

interface ProductShowcaseProps {
  className?: string
}

export default function ProductShowcase({ className = '' }: ProductShowcaseProps) {
  const router=useRouter();
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
          <div
          onClick={()=>router.push("/product-category")}
           className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-teal-100 to-teal-200 aspect-[4/4]">
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
          <div
          onClick={()=>router.push("/product-category")}
           className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-sky-100 to-sky-200 aspect-[4/4]">
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
           <div
          onClick={()=>router.push("/product-category")}
           className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-teal-100 to-teal-200 aspect-[4/4]">
            <div className="absolute inset-0">
              {/* Simulated product image background */}
              <div className="w-full h-full flex items-center justify-center">
               <img src="/images/round-neck.jpg" className='w-full h-full object-cover' />
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6">
              <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-300">
                ROUND NECK T-SHIRTS
              </Badge>
            </div>
          </div>

          {/* Tropical Shirts */}
           <div
          onClick={()=>router.push("/product-category")}
           className="group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-teal-100 to-teal-200 aspect-[4/4]">
            <div className="absolute inset-0">
              {/* Simulated product image background */}
              <div className="w-full h-full flex items-center justify-center">
               <img src="/images/tropical.jpg" className='w-full h-full object-cover' />
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6">
              <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-300">
                TROPICAL SHIRTS
              </Badge>
            </div>
          </div>
        </div>

        {/* Bottom Row - Three Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shorts */}
        <div
          onClick={() => router.push("/product-category")}
          className="group cursor-pointer relative overflow-hidden rounded-lg aspect-[3/3] bg-gradient-to-br from-blue-100 to-cyan-200"
        >
          <img
            src="/images/shorts.jpg"
            alt="Shorts"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Optional: subtle overlay for better hover effect */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
        </div>

        {/* Trousers */}
        <div
          onClick={() => router.push("/product-category")}
          className="group cursor-pointer relative overflow-hidden rounded-lg aspect-[3/3] bg-gradient-to-br from-amber-100 to-orange-200"
        >
          <img
            src="/images/trousers.jpg"
            alt="Trousers"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
        </div>

        {/* Winterwear */}
        <div
          onClick={() => router.push("/product-category")}
          className="group cursor-pointer relative overflow-hidden rounded-lg aspect-[3/3] bg-gradient-to-br from-green-100 to-yellow-200"
        >
          <img
            src="/images/winter.jpg"
            alt="Winterwear"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
        </div>
      </div>
      </div>
    </section>
  )
}

