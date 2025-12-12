"use client"
import React, { useState } from 'react';
import { MapPin, MoreVertical, Plus, Edit, Trash2 } from 'lucide-react';

const AddressManager = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'HOME',
      name: 'Shubham Choudhary',
      phone: '9877443177',
      address: 'Near ravidass dharmshaala, Nandpur, Opposite side gurudwara rehru sahib, Sahnewal, Punjab - 141120'
    },
    {
      id: 2,
      type: 'HOME',
      name: 'Shubham Choudhary',
      phone: '9877443177',
      address: 'One college, Gill road, Ludhiana, Punjab - 141006'
    },
    {
      id: 3,
      type: 'HOME',
      name: 'Shubham Choudhary',
      phone: '9877443177',
      address: 'Near ravidaas Dharmshala Nandpur sahnewal, LUDHIANA, Punjab - 141120'
    },
    {
      id: 4,
      type: 'WORK',
      name: 'Shubham Choudhary',
      phone: '9877443177',
      address: 'Room no. 112 , Brindavan Residency, Near Tom\'s Diner, Opposite VIT, Road, Vaibhav Nagar, Katpadi, Vellore, Tamil Nadu - 632014'
    },
    {
      id: 5,
      type: 'WORK',
      name: 'Shubham Choudhary',
      phone: '9877443177',
      address: 'VIT Gate no. 3 , Katpadi, VIT Gate No 3, VIT University, Vellore, Tamil Nadu - 632014'
    },
    {
      id: 6,
      type: 'WORK',
      name: 'Pratap',
      phone: '9843771331',
      address: 'Equanimity Threads LLP 54, Sannathi Street, Selvam Nagar, Solai Nagar Katpadi, Vellore, Vellore, Tamil Nadu - 632006'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alternatePhone: '',
    type: 'Home'
  });

  const [activeDropdown, setActiveDropdown] = useState(null);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? { 
              ...addr, 
              name: formData.name,
              phone: formData.phone,
              address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
              type: formData.type.toUpperCase()
            }
          : addr
      ));
      setEditingAddress(null);
    } else {
      const newAddress = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        type: formData.type.toUpperCase()
      };
      setAddresses(prev => [...prev, newAddress]);
    }
    
    setFormData({
      name: '',
      phone: '',
      pincode: '',
      locality: '',
      address: '',
      city: '',
      state: '',
      landmark: '',
      alternatePhone: '',
      type: 'Home'
    });
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    setFormData({
      name: '',
      phone: '',
      pincode: '',
      locality: '',
      address: '',
      city: '',
      state: '',
      landmark: '',
      alternatePhone: '',
      type: 'Home'
    });
  };

  const handleEdit = (address) => {
    const addressParts = address.address.split(', ');
    const stateAndPin = addressParts[addressParts.length - 1].split(' - ');
    
    setFormData({
      name: address.name,
      phone: address.phone,
      pincode: stateAndPin[1] || '',
      locality: '',
      address: addressParts.slice(0, -2).join(', '),
      city: addressParts[addressParts.length - 2] || '',
      state: stateAndPin[0] || '',
      landmark: '',
      alternatePhone: '',
      type: address.type === 'HOME' ? 'Home' : 'Work'
    });
    setEditingAddress(address);
    setShowAddForm(true);
    setActiveDropdown(null);
  };

  const handleDelete = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    setActiveDropdown(null);
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          alert('Location accessed! In a real app, this would populate the address fields.');
        },
        (error) => {
          alert('Unable to access location. Please enter address manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  if (showAddForm) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Addresses</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-600 mb-4">
            {editingAddress ? 'EDIT ADDRESS' : 'ADD A NEW ADDRESS'}
          </h3>
          
          <div className="space-y-4">
            <button
              type="button"
              onClick={useCurrentLocation}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <MapPin size={16} />
              Use my current location
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="locality"
                placeholder="Locality"
                value={formData.locality}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              name="address"
              placeholder="Address (Area and Street)"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City/District/Town"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">--Select State--</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="landmark"
                placeholder="Landmark (Optional)"
                value={formData.landmark}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                name="alternatePhone"
                placeholder="Alternate Phone (Optional)"
                value={formData.alternatePhone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Home"
                    checked={formData.type === 'Home'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Home
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Work"
                    checked={formData.type === 'Work'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Work
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                SAVE
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition-colors font-medium"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Addresses</h2>
      
      <button
        onClick={() => setShowAddForm(true)}
        className="flex items-center gap-2 text-blue-600 border border-gray-300 rounded-lg px-4 py-3 mb-6 hover:bg-blue-50 transition-colors w-full justify-center"
      >
        <Plus size={20} />
        ADD A NEW ADDRESS
      </button>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {address.type}
                  </span>
                </div>
                <div className="font-medium text-gray-900 mb-1">
                  {address.name} {address.phone}
                </div>
                <div className="text-gray-600 text-sm leading-relaxed">
                  {address.address}
                </div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === address.id ? null : address.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
                
                {activeDropdown === address.id && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                    <button
                      onClick={() => handleEdit(address)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-red-600"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressManager;