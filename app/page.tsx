'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { QuoteFormData, US_STATES } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();
  const { setQuoteData, setQuoteResults } = useApp();
  const [showAddress, setShowAddress] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'M',
    address: {
      street: '',
      apt: '',
      city: '',
      state: '',
      zip: '',
    },
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save quote data
    setQuoteData(formData);
    
    // Calculate mock premium based on age and gender
    const age = calculateAge(formData.dateOfBirth);
    const basePremium = formData.gender === 'F' ? 9.95 : 12.95;
    const ageFactor = Math.max(1, (age - 50) * 0.1);
    const monthlyPremium = Number((basePremium * ageFactor).toFixed(2));
    
    setQuoteResults({
      monthlyPremium,
      coverageAmount: 9950,
      product: 'Guaranteed Acceptance Whole Life',
    });
    
    // Navigate to results
    router.push('/quote/results');
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Product Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-[#003DA5] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Guaranteed Acceptance Whole Life Insurance
              </h2>
              <p className="text-sm text-gray-600 font-semibold mb-4">
                Your acceptance is guaranteed!
              </p>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-start">
                <span className="text-[#003DA5] mr-2">✓</span>
                Ages 50-85 in most states
              </p>
              <p className="flex items-start">
                <span className="text-[#003DA5] mr-2">✓</span>
                No medical exam or health questions
              </p>
              <p className="flex items-start">
                <span className="text-[#003DA5] mr-2">✓</span>
                Two-year limited benefit period
              </p>
              <p className="flex items-start">
                <span className="text-[#003DA5] mr-2">✓</span>
                Lifetime coverage
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-start">
                <span className="text-[#003DA5] mr-2">✓</span>
                Locked-in premium rate
              </p>
              <p className="flex items-start">
                <span className="text-[#003DA5] mr-2">✓</span>
                Benefit amounts vary based on age, gender and state
              </p>
              <p className="flex items-start">
                <span className="text-[#003DA5] mr-2">✓</span>
                30 Day Try-It-On Period
              </p>
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Get a Guaranteed Acceptance Whole Life Insurance Quote
          </h1>
          <p className="text-gray-600 mb-8">
            Complete the form below to get your instant quote and start building your coverage.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                />
              </div>
            </div>

            {/* Address Toggle */}
            <button
              type="button"
              onClick={() => setShowAddress(!showAddress)}
              className="flex items-center text-[#003DA5] hover:text-blue-800 font-medium"
            >
              {showAddress ? (
                <span className="mr-2">−</span>
              ) : (
                <span className="mr-2">+</span>
              )}
              {showAddress ? 'Hide address' : 'Add your address'}
            </button>

            {/* Address Fields */}
            {showAddress && (
              <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    required
                    value={formData.address.street}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apt, Suite or Unit
                  </label>
                  <input
                    type="text"
                    name="address.apt"
                    value={formData.address.apt}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      required
                      value={formData.address.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="address.state"
                      required
                      value={formData.address.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      {US_STATES.map(state => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address.zip"
                      required
                      pattern="[0-9]{5}"
                      value={formData.address.zip}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={formData.gender === 'F'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={formData.gender === 'M'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 50)).toISOString().split('T')[0]}
                min={new Date(new Date().setFullYear(new Date().getFullYear() - 85)).toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9]{10}"
                placeholder="1234567890"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#003DA5] text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-800 transition-colors"
            >
              Get a Quote
            </button>

            {/* Consent Text */}
            <p className="text-xs text-gray-600 leading-relaxed">
              By providing your information above and clicking the "Get a Quote" button, you electronically sign and consent to receive information about Colonial Penn life insurance at the email address, postal address and/or telephone number you provided.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
