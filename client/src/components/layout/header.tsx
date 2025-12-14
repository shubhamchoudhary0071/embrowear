"use client"
import { Menu, Search, ShoppingBag, User, X, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const router=useRouter();

  const navigationItems = [
    {
      name: 'Polos',
      submenu: [
        'Bahama Polo',
        'Classic Solid Polo',
        'Cotton Lycra Polo',
        'Print Polo',
        'Collar Variation Polo',
        'Colour Block Polo',
        'Jacquard Polo',
        'Rugby Polo',
        'Stand-Up Collar Polo',
        'Stripe Polo',
        'Long Sleeve Polo',
        'Structured Polo',
        'Flatknit',
        'View All'
      ]
    },
    {
      name: 'Round Neck T-Shirts',
      submenu: [
        'Basic Round Neck',
        'Graphic Tees',
        'Striped Tees',
        'Solid Colors',
        'Long Sleeve',
        'View All'
      ]
    },
    {
      name: 'Shirts',
      submenu: [
        'Formal Shirts',
        'Casual Shirts',
        'Linen Shirts',
        'Cotton Shirts',
        'View All'
      ]
    },
    {
      name: 'Sale',
      submenu: []
    }
  ]

  const EagleLogo = () => (
    <div className="flex items-center space-x-2 group cursor-pointer">
      <div className="relative">
        <div className="h-8 w-12  rounded flex items-center justify-center  transition-all duration-300" onClick={()=>router.push("/")}>
          <img src="/logos/without-bg/logo.png" className="text-white font-bold text-sm"/>
        </div>
      </div>
      <div className="hidden sm:block" onClick={()=>router.push("/")}>
        <h1 className="text-lg lg:text-xl font-black text-slate-800 tracking-tight leading-tight">
          EMBROWEAR
        </h1>
        <p className="text-[10px] lg:text-xs text-slate-500 tracking-wider font-medium uppercase leading-none">
          Premium Apparel
        </p>
      </div>
    </div>
  );

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <EagleLogo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                  onClick={()=>router.push("/product-category")}

              >
                <div
                  onClick={()=>router.push("/product-category")}
                  className="relative px-3 py-2 text-slate-700 hover:text-slate-900 text-sm font-bold transition-all duration-200 flex items-center gap-1 rounded hover:bg-slate-50"
                >
                  <span className="relative">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-600 to-slate-800 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  {item.submenu.length > 0 && (
                    <ChevronDown className="h-3 w-3 text-slate-500 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </div>

                {/* Dropdown Menu */}
                {item.submenu.length > 0 && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-xl rounded-lg border border-slate-200 z-50 overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                      <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                    </div>
                    <div className="py-1 max-h-80 overflow-y-auto">
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem}
                          href="#"
                          className={`block px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors duration-150 ${
                            subItem === 'View All' 
                              ? 'border-t border-slate-200 mt-1 bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 font-bold' 
                              : 'text-slate-600 hover:text-slate-800'
                          }`}
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Search Icon */}
            <button className="group p-1.5 rounded hover:bg-slate-100 transition-all duration-200">
              <Search className="h-5 w-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
            </button>
            
            {/* User Icon */}
            <button className="group p-1.5 rounded hover:bg-slate-100 transition-all duration-200" onClick={()=>router.push('/my-account')}>
              <User className="h-5 w-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
            </button>
            
            {/* Shopping Bag */}
            <button className="group relative p-1.5 rounded hover:bg-slate-100 transition-all duration-200">
              <ShoppingBag className="h-5 w-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md ring-2 ring-white">
                0
              </span>
            </button>
            
            {/* Mobile menu button */}
            <button
              className="lg:hidden group p-1.5 rounded hover:bg-slate-100 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
              ) : (
                <Menu className="h-5 w-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="rounded overflow-hidden" onClick={()=>router.push("/product-category")}>
                  <div
                    className="flex items-center justify-between px-3 py-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-sm font-bold transition-all duration-200 rounded"
                    onClick={(e) => {
                      if (item.submenu.length > 0) {
                        e.preventDefault()
                        setActiveDropdown(activeDropdown === item.name ? null : item.name)
                      }
                    }}
                  >
                    <span className="flex items-center">
                      {item.name}
                    </span>
                    {item.submenu.length > 0 && (
                      <ChevronDown 
                        className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </div>
                  
                  {/* Mobile Submenu */}
                  {item.submenu.length > 0 && activeDropdown === item.name && (
                    <div className="bg-slate-50 rounded mx-1 mt-1 overflow-hidden">
                      <div className="space-y-1 p-1">
                        {item.submenu.map((subItem) => (
                          <a
                            key={subItem}
                            href="#"
                            className={`block px-3 py-2 rounded text-sm font-medium transition-colors duration-150 ${
                              subItem === 'View All' 
                                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold mt-2' 
                                : 'text-slate-600 hover:text-slate-800 hover:bg-white'
                            }`}
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header