import CategoriesNavigation from '@/components/products/categories'
import ProductFilter from '@/components/products/filters'
import ProductGrid from '@/components/products/product-listing'
import React from 'react'

const ProductCategory = () => {
  return (
    <div>
      <CategoriesNavigation />
      <ProductFilter />
      <ProductGrid />
    </div>
  )
}

export default ProductCategory
