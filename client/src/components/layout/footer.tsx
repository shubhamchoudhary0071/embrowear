'use client'

import { Mail, Phone, Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const router=useRouter();

  return (
    <footer className={`bg-slate-700 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Shipping & Payments
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Exchange & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Business Enquiries</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-slate-300 hover:text-white transition-colors">
                    Retail Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-white transition-colors">
                    Corporate Enquiries
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Shop By Category Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Shop By Category</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Polo Shirts
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Round Neck Tees
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Shorts
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Knit Pants
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Trousers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Jackets
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Sweatshirts
                </a>
              </li>
            </ul>

            <div className="mt-8 cursor-pointer" onClick={()=>router.push("/product-category")}>
              
                Shop All
              
            </div>
          </div>

          {/* My Account Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">My Account</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Account Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  My Orders
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  My Addresses
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  My Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Change Password
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Track Your Order</h4>
            </div>
          </div>

          {/* Help & Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Help & Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>

            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <a 
                  href="mailto:customerservice@fahrenheit.in" 
                  className="text-slate-300 hover:text-white transition-colors underline"
                >
                  customerservice@fahrenheit.in
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <a 
                  href="tel:+919781926318" 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  +91 97819 26318
                </a>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-slate-400 mb-1">
                Business Hours: <span className="text-white font-medium">Monday - Saturday</span>
              </p>
              <p className="text-sm text-slate-400 mb-2">
                <span className="text-white font-medium">10am to 6pm</span>
              </p>
              <p className="text-xs text-slate-500">
                Enquiries will be answered during business hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo and Copyright */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <h2 className="text-2xl font-bold tracking-wide">°Fahrenheit</h2>
              <p className="text-slate-400 text-sm">
                © 2025 Fahrenheit Clothing. All Rights Reserved.
              </p>
            </div>

            {/* Social Media and Scroll to Top */}
            <div className="flex items-center space-x-4">
              {/* Social Media Icons */}
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>

              {/* Scroll to Top Button */}
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 bg-white hover:bg-slate-100 border-white text-slate-700"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

