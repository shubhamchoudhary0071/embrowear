'use client'


import ProductShowcase from '@/components/dashboard/product-show-case'
import ProductListing from '@/components/dashboard/product-list'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Hero from '@/components/dashboard/hero'
import Banner from '@/components/layout/banner'

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