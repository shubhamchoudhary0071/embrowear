"use client"
import { Plus, Upload, Download, X, Eye } from 'lucide-react';
import React, { useState } from 'react';

// Define TypeScript interfaces for type safety

const AdminProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk' | 'manage'>('single');
  const [categories, setCategories] = useState<string[]>(['T-Shirts', 'Hoodies', 'Accessories', 'Custom Designs']);
  const [features, setFeatures] = useState<string[]>(['Waterproof', 'Breathable', 'UV Protection', 'Anti-Bacterial']);
  const [newCategory, setNewCategory] = useState<string>('');
  const [newFeature, setNewFeature] = useState<string>('');
  const [showCsvPreview, setShowCsvPreview] = useState<boolean>(false);

  const sampleCsvData = `product_name,description,category,sku,lot_id,listed_price,sale_price,discount_percentage,stock_quantity,available_sizes,available_colors,features,material,care_instructions,brand,weight,dimensions,tags,status,images
"Eagle Spirit T-Shirt","Premium cotton tee with eagle logo","T-Shirts","ETS001","LOT2024001",29.99,24.99,16.67,150,"S,M,L,XL,XXL","Black,White,Navy,Gray","Breathable,Anti-Bacterial","100% Cotton","Machine wash cold","EMBROWEAR","200g","Standard","casual,logo,premium","active","image1.jpg,image2.jpg"
"Freedom Hoodie","Comfortable hoodie with embroidered eagle","Hoodies","EFH002","LOT2024002",59.99,49.99,16.67,80,"S,M,L,XL","Black,Gray,Navy","Waterproof,Breathable","Cotton Blend","Machine wash warm","EMBROWEAR","600g","Oversized","hoodie,embroidered,comfort","active","hoodie1.jpg,hoodie2.jpg"
"Eagle Cap","Adjustable cap with 3D eagle emblem","Accessories","EEC003","LOT2024003",24.99,19.99,20.01,200,"One Size","Black,White,Camo","UV protection","Cotton/Polyester","Hand wash","EMBROWEAR","150g","Adjustable","cap,3d-text,outdoor","active","cap1.jpg"`;

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  const downloadSampleCsv = () => {
    const blob = new Blob([sampleCsvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_products.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Expanded color options
  const colors = [
    { name: 'White', class: 'bg-white border-2 border-gray-300' },
    { name: 'Black', class: 'bg-black' },
    { name: 'Red', class: 'bg-red-600' },
    { name: 'Blue', class: 'bg-blue-600' },
    { name: 'Green', class: 'bg-green-600' },
    { name: 'Yellow', class: 'bg-yellow-500' },
    { name: 'Purple', class: 'bg-purple-600' },
    { name: 'Gray', class: 'bg-gray-500' },
    { name: 'Navy', class: 'bg-blue-800' },
    { name: 'Orange', class: 'bg-orange-500' },
    { name: 'Pink', class: 'bg-pink-500' },
    { name: 'Teal', class: 'bg-teal-500' },
    { name: 'Brown', class: 'bg-brown-600' },
    { name: 'Beige', class: 'bg-beige-200' },
    { name: 'Maroon', class: 'bg-red-800' },
    { name: 'Turquoise', class: 'bg-turquoise-500' },
    { name: 'Olive', class: 'bg-green-700' },
    { name: 'Coral', class: 'bg-coral-500' },
    { name: 'Indigo', class: 'bg-indigo-600' },
    { name: 'Violet', class: 'bg-violet-500' },
    { name: 'Gold', class: 'bg-yellow-600' },
    { name: 'Silver', class: 'bg-gray-300' },
    { name: 'Mint', class: 'bg-green-300' },
    { name: 'Lavender', class: 'bg-purple-300' },
    { name: 'Crimson', class: 'bg-red-700' },
    { name: 'Cyan', class: 'bg-cyan-500' },
    { name: 'Magenta', class: 'bg-magenta-500' },
    { name: 'Charcoal', class: 'bg-gray-700' },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-4 py-3 text-sm font-medium border-b transition-colors ${
              activeTab === 'single'
                ? 'border-gray-700 text-gray-800 bg-gray-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Single Product Entry
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`px-4 py-3 text-sm font-medium border-b transition-colors ${
              activeTab === 'bulk'
                ? 'border-gray-700 text-gray-800 bg-gray-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Bulk Upload
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-3 text-sm font-medium border-b transition-colors ${
              activeTab === 'manage'
                ? 'border-gray-700 text-gray-800 bg-gray-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Manage Categories & Features
          </button>
        </div>
      </div>

      {/* Single Product Entry */}
      {activeTab === 'single' && (
        <div className="bg-white p-4 shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-100 pb-2">Add New Product</h3>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700 border-l-2 border-gray-600 pl-2">Basic Information</h4>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Product Name *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description *</label>
                <textarea
                  className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors h-20 text-sm"
                  placeholder="Product description"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">SKU *</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                    placeholder="SKU001"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Lot ID</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                    placeholder="LOT2024001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
                <select className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm">
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Brand</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                    placeholder="EMBROWEAR"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Material</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                    placeholder="100% Cotton"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700 border-l-2 border-gray-600 pl-2">Pricing & Inventory</h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Listed Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Sale Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Discount %</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Available Sizes</label>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <label key={size} className="flex items-center p-1 border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs">
                      <input type="checkbox" className="mr-1 scale-75" />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Available Colors</label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <label
                      key={color.name}
                      className="flex flex-col items-center p-1 border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      <input type="checkbox" className="mb-1 scale-75" />
                      <div className={`w-4 h-4 ${color.class} border border-gray-300`} />
                      <span className="text-xs mt-1">{color.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Weight (g)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                    placeholder="200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Dimensions</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                    placeholder="Standard"
                  />
                </div>
              </div>
            </div>

            {/* Media & Features */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700 border-l-2 border-gray-600 pl-2">Media & Features</h4>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Product Images *</label>
                <div className="border border-dashed border-gray-200 p-4 text-center hover:border-gray-400 transition-colors">
                  <Plus className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Upload images</p>
                  <p className="text-xs text-gray-400 mt-1">Drag & drop or click</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Product Features</label>
                <div className="grid grid-cols-2 gap-2">
                  {features.map((feature) => (
                    <label key={feature} className="flex items-center p-1 border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs">
                      <input type="checkbox" className="mr-1 scale-75" />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Care Instructions</label>
                <textarea
                  className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors h-16 text-sm"
                  placeholder="Machine wash cold, tumble dry low"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm"
                  placeholder="casual, logo, premium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select className="w-full p-2 border border-gray-200 focus:border-gray-500 focus:outline-none transition-colors text-sm">
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-3 border-t border-gray-100">
            <button className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors">
              Save as Draft
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-800 text-sm font-medium transition-colors">
              Publish Product
            </button>
          </div>
        </div>
      )}

      {/* Bulk Upload */}
      {activeTab === 'bulk' && (
        <div className="bg-white p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4">Bulk Product Upload</h3>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">CSV Upload Instructions</h4>
              <p className="text-gray-600 mb-4">Upload products in bulk using a CSV file. Make sure your CSV follows the required format.</p>

              <div className="flex space-x-4">
                <button
                  onClick={downloadSampleCsv}
                  className="flex items-center px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 font-semibold transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Sample CSV
                </button>
                <button
                  onClick={() => setShowCsvPreview(!showCsvPreview)}
                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showCsvPreview ? 'Hide' : 'View'} CSV Format
                </button>
              </div>
            </div>

            {showCsvPreview && (
              <div className="bg-gray-50 p-6 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3">Required CSV Columns:</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">• product_name</p>
                    <p className="font-medium">• description</p>
                    <p className="font-medium">• category</p>
                    <p className="font-medium">• sku</p>
                    <p>• lot_id</p>
                    <p className="font-medium">• listed_price</p>
                    <p>• sale_price</p>
                  </div>
                  <div className="space-y-1">
                    <p>• discount_percentage</p>
                    <p className="font-medium">• stock_quantity</p>
                    <p>• available_sizes</p>
                    <p>• available_colors</p>
                    <p>• features</p>
                    <p>• material</p>
                    <p>• care_instructions</p>
                  </div>
                  <div className="space-y-1">
                    <p>• brand</p>
                    <p>• weight</p>
                    <p>• dimensions</p>
                    <p>• tags</p>
                    <p>• status</p>
                    <p>• images</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  * Bold fields are required. For multiple values (sizes, colors, features, images), separate with commas.
                </p>
              </div>
            )}

            <div className="border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-800 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Upload CSV File</h4>
              <p className="text-gray-600 mb-4">Drag and drop your CSV file here, or click to browse</p>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                id="csv-upload"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    console.log('File uploaded:', e.target.files[0]);
                  }
                }}
              />
              <label
                htmlFor="csv-upload"
                className="px-6 py-3 bg-gray-800 text-white hover:bg-gray-900 font-semibold cursor-pointer transition-colors inline-block"
              >
                Choose File
              </label>
            </div>

            <div className="flex justify-end">
              <button className="px-8 py-3 bg-gray-800 text-white hover:bg-gray-900 font-semibold transition-colors">
                Process Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Categories & Features */}
      {activeTab === 'manage' && (
        <div className="bg-white p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4">Manage Categories & Features</h3>

          <div className="grid grid-cols-1 lg:grid-cols-8 gap-2">
            {/* Categories */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-4 border-1-4 border-1 border-gray-800 pl-3">Product Categories</h4>

              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 focus:border-gray-600 focus:outline-none transition-colors"
                  placeholder="Add new category"
                />
                <button
                  onClick={addCategory}
                  className="px-4 py-3 bg-gray-800 text-white hover:bg-gray-900 transition-colors"
                >
                  <Plus className="h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center justify-between p-3 border border-gray-200 hover:bg-gray-50">
                    <span className="font-medium">{category}</span>
                    <button
                      onClick={() => removeCategory(category)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-gray-800 pl-3">Product Features</h4>

              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFeature(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 focus:border-gray-800 focus:outline-none transition-colors"
                  placeholder="Add new feature"
                />
                <button
                  onClick={addFeature}
                  className="px-4 py-3 bg-gray-800 text-white hover:bg-gray-900 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center justify-between p-3 border border-gray-200 hover:bg-gray-50">
                    <span className="font-medium">{feature}</span>
                    <button
                      onClick={() => removeFeature(feature)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
