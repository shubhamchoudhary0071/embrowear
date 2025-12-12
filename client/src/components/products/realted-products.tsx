import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  alt: string;
}

const RelatedProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Leaf Print Knit Shirt",
      price: 1495.00,
      image: "/api/placeholder/300/400",
      alt: "Man wearing green leaf print knit shirt"
    },
    {
      id: 2,
      name: "Floral Print Knit Shirt",
      price: 1495.00,
      image: "/api/placeholder/300/400",
      alt: "Man wearing black floral print knit shirt"
    },
    {
      id: 3,
      name: "Nautical Print Knit Shirt",
      price: 1495.00,
      image: "/api/placeholder/300/400",
      alt: "Man wearing teal nautical print knit shirt"
    },
    {
      id: 4,
      name: "Nautical Print Knit Shirt",
      price: 1495.00,
      image: "/api/placeholder/300/400",
      alt: "Man wearing light blue nautical print knit shirt"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Related products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group cursor-pointer border-0 shadow-none hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900 leading-tight">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">
                    Inc of Tax
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;