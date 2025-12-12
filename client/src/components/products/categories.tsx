"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

const CategoriesNavigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Polo Shirts');
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
    'Polo Shirts',
    'Bahama Polo',
    'Cotton Lycra Polo',
    'Flatknit',
    'Structured Polo',
    'Classic Solid Polo',
    'Print Polo',
    'Stripe Polo',
    'Stand-Up Collar Polo',
    'Jacquard Polo',
    'Collar Variation Polo',
    'Colour Block Polo',
    'Rugby Polo'
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Auto-collapse on mobile after selection
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Desktop & Tablet Navigation (md and up) */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Back Button */}
            <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap group">
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:translate-x-[-2px] transition-transform duration-200" />
              <span className="text-sm font-medium">Back</span>
            </button>

            {/* Categories - Horizontal Scroll */}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center space-x-4 lg:space-x-6 overflow-x-auto scrollbar-hide pb-1">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`whitespace-nowrap text-sm font-medium transition-all duration-200 pb-2 border-b-2 hover:scale-105 ${
                      activeCategory === category
                        ? 'text-green-600 border-green-600 scale-105'
                        : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (sm and below) */}
      <div className="md:hidden">
        <div className="px-4 sm:px-6">
          {/* Back Button */}
          <div className="flex items-center py-3 border-b border-gray-100">
            <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 active:scale-95">
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>

          {/* Categories Collapsible Header */}
          <button
            onClick={toggleCollapse}
            className="w-full flex items-center justify-between py-4 text-left active:scale-[0.98] transition-transform duration-150"
          >
            <div className="flex items-center min-w-0 flex-1">
              <span className="text-base sm:text-lg font-semibold text-gray-900">Categories</span>
              <span className="ml-2 text-xs sm:text-sm text-gray-500 truncate">({activeCategory})</span>
            </div>
            <div className="flex-shrink-0 ml-2">
              {isCollapsed ? (
                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
              ) : (
                <ChevronUp className="w-5 h-5 text-gray-400 transition-transform duration-200" />
              )}
            </div>
          </button>

          {/* Collapsible Categories List */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[400px] opacity-100'
          }`}>
            <div className="pb-4 space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full text-left px-3 sm:px-4 py-3 rounded-lg transition-all duration-200 text-sm sm:text-base active:scale-[0.98] ${
                    activeCategory === category
                      ? 'bg-green-50 text-green-700 font-medium shadow-sm border border-green-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth scroll behavior */
        .scrollbar-hide {
          scroll-behavior: smooth;
        }
        
        /* Enhanced mobile touch interactions */
        @media (max-width: 767px) {
          button {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </div>
  );
};

export default CategoriesNavigation;