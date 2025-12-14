import { ChevronRight, MessageCircle } from 'lucide-react'
import React from 'react'

const FAQSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Frequently Asked Questions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg">
                    <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-800">How do I track my order?</span>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </button>
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      You can track your order by going to &quot;Order History&quot; in your account menu or using the tracking link in your confirmation email.
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg">
                    <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-800">What is your return policy?</span>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </button>
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      We offer 30-day returns for unworn items with tags. Custom designed items are non-returnable unless defective.
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg">
                    <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-800">How do I use my loyalty points?</span>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </button>
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      Visit the &quot;Loyalty Program&quot; section to redeem points for discounts, free shipping, or exclusive products.
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg">
                    <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-800">Can I modify my custom t-shirt design?</span>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </button>
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      You can modify your design until you place the order. Once ordered, changes are not possible as production begins immediately.
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg">
                    <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-800">Do you offer international shipping?</span>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </button>
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      Yes, we ship worldwide. Shipping costs and delivery times vary by location. Check our shipping page for details.
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-600 mb-3">Still have questions?</p>
                  <button className="inline-flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Contact Support</span>
                  </button>
                </div>
              </div>
            </div>
  )
}

export default FAQSection
