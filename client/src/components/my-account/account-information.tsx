import { Crown, Edit3 } from 'lucide-react'
import React from 'react'

const AccountInformation = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Account Information</h3>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
          <Edit3 className="h-4 w-4" />
          <span className="text-sm">Edit</span>
        </button>
      </div>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-800">John</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-800">Smith</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-800">john.smith@email.com</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Mobile Phone</label>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-800">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Account Status</p>
            <p className="text-sm text-gray-600">Premium Member since 2022</p>
          </div>
          <div className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-600" />
            <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">VIP</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AccountInformation
