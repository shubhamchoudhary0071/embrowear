'use client'


import ProductShowcase from '@/components/dashboard/product-show-case'
import ProductListing from '@/components/dashboard/product-list'
import Hero from '@/components/dashboard/hero'

export default function FahrenheitPage() {


  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section */}
      <Hero />

      {/* Product Show case */}
      <ProductShowcase />

      {/* Product List */}
      <ProductListing />


   
    </div>
  )
}