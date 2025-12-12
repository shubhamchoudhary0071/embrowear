"use client"
import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Settings } from 'lucide-react';

interface Color {
  name: string;
  value: string;
  color: string;
}

type FilterType = 'color' | 'size' | 'sale';

const ProductFilter: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('Default');
  const [showOnSale, setShowOnSale] = useState<boolean>(false);
  const [resultCount] = useState<number>(12);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const colors: Color[] = [
    { name: 'Gray', value: 'gray', color: 'bg-gray-400' },
    { name: 'Brown', value: 'brown', color: 'bg-amber-700' },
    { name: 'White', value: 'white', color: 'bg-white border-2 border-gray-300' },
    { name: 'Light Gray', value: 'light-gray', color: 'bg-gray-200' },
    { name: 'Pink', value: 'pink', color: 'bg-pink-200' },
    { name: 'Light Blue', value: 'light-blue', color: 'bg-blue-200' },
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Cream', value: 'cream', color: 'bg-yellow-100' },
    { name: 'Yellow', value: 'yellow', color: 'bg-yellow-400' },
    { name: 'Green', value: 'green', color: 'bg-green-400' },
    { name: 'Black', value: 'black', color: 'bg-black' }
  ];

  const sizes: string[] = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
  
  const sortOptions: string[] = [
    'Default',
    'Popularity',
    'Newness',
    'Price: low to high',
    'Price: high to low'
  ];

  const handleColorToggle = (colorValue: string): void => {
    setSelectedColors(prev => 
      prev.includes(colorValue) 
        ? prev.filter(c => c !== colorValue)
        : [...prev, colorValue]
    );
  };

  const handleSizeToggle = (size: string): void => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const removeFilter = (type: FilterType, value?: string): void => {
    if (type === 'color' && value) {
      setSelectedColors(prev => prev.filter(c => c !== value));
    } else if (type === 'size' && value) {
      setSelectedSizes(prev => prev.filter(s => s !== value));
    } else if (type === 'sale') {
      setShowOnSale(false);
    }
  };

  const clearAllFilters = (): void => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedSort('Default');
    setShowOnSale(false);
  };

  const getActiveFiltersCount = (): number => {
    return selectedColors.length + selectedSizes.length + (showOnSale ? 1 : 0);
  };

  const getColorName = (value: string): string => {
    return colors.find(c => c.value === value)?.name || value;
  };

  const toggleFilter = (): void => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Filter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <button
            onClick={toggleFilter}
            className="flex items-center space-x-2 text-green-600 font-medium hover:text-green-700 transition-colors duration-200 active:scale-95 sm:active:scale-100"
          >
            <Filter className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm sm:text-base">Filter products</span>
            <span className="text-gray-500 text-xs sm:text-sm hidden sm:inline">
              / Showing all {resultCount} results
            </span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                {getActiveFiltersCount()}
              </span>
            )}
            {isFilterOpen ? (
              <ChevronUp className="w-4 h-4 ml-auto sm:ml-2 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-auto sm:ml-2 flex-shrink-0" />
            )}
          </button>

          {/* Mobile result count */}
          <div className="sm:hidden text-xs text-gray-500">
            Showing all {resultCount} results
          </div>

          {getActiveFiltersCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-xs sm:text-sm transition-colors duration-200 active:scale-95 sm:active:scale-100"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>CLEAR ALL</span>
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {selectedColors.map(color => (
              <div key={color} className="flex items-center bg-gray-100 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <span className="mr-1 sm:mr-2 truncate max-w-20 sm:max-w-none">{getColorName(color)}</span>
                <button
                  onClick={() => removeFilter('color', color)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex-shrink-0"
                  aria-label={`Remove ${getColorName(color)} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {selectedSizes.map(size => (
              <div key={size} className="flex items-center bg-gray-100 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <span className="mr-1 sm:mr-2">Size {size}</span>
                <button
                  onClick={() => removeFilter('size', size)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex-shrink-0"
                  aria-label={`Remove size ${size} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {showOnSale && (
              <div className="flex items-center bg-gray-100 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <span className="mr-1 sm:mr-2">On Sale</span>
                <button
                  onClick={() => removeFilter('sale')}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex-shrink-0"
                  aria-label="Remove on sale filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Collapsible Filter Content */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isFilterOpen ? 'max-h-[800px] sm:max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-4 sm:space-y-6 pb-4">
            {/* Filter by Color */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-3">Filter by Colour</h3>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-11 gap-2 sm:gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorToggle(color.value)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${color.color} border-2 transition-all duration-200 hover:scale-110 active:scale-95 ${
                      selectedColors.includes(color.value)
                        ? 'border-gray-800 ring-2 ring-green-500 ring-offset-1 sm:ring-offset-2 scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    title={color.name}
                    aria-label={`Filter by ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Filter by Size */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-3">Filter by Size</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 sm:px-4 py-2 border rounded-md text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 ${
                      selectedSizes.includes(size)
                        ? 'border-green-500 bg-green-50 text-green-700 scale-105 shadow-sm'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 hover:scale-105'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-3">Sort By</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedSort(option)}
                    className={`px-3 sm:px-4 py-2 border rounded-md text-xs sm:text-sm font-medium transition-all duration-200 text-left active:scale-95 ${
                      selectedSort === option
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Show only products on sale */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-start sm:items-center space-x-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5 sm:mt-0">
                  <input
                    type="checkbox"
                    checked={showOnSale}
                    onChange={(e) => setShowOnSale(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 border-2 rounded transition-all duration-200 group-hover:scale-110 ${
                    showOnSale ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-gray-400'
                  }`}>
                    {showOnSale && (
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-start sm:items-center space-x-2 min-w-0">
                  <Settings className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">
                    Show only products on sale
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Touch Styles */}
      <style jsx>{`
        @media (max-width: 767px) {
          button {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductFilter;