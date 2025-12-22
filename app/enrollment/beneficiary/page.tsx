'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { BeneficiaryFormData, RELATIONSHIPS } from '@/lib/types';

export default function BeneficiaryPage() {
  const router = useRouter();
  const { applicationData, setBeneficiaryData } = useApp();
  const [addContingent, setAddContingent] = useState(false);
  const [formData, setFormData] = useState<BeneficiaryFormData>({
    primary: {
      firstName: '',
      lastName: '',
      relationship: '',
      dateOfBirth: '',
      ssn: '',
    },
  });

  useEffect(() => {
    if (!applicationData?.results) {
      router.push('/');
    }
  }, [applicationData, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBeneficiaryData(formData);
    router.push('/enrollment/payment');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    beneficiaryType: 'primary' | 'contingent',
    field: string
  ) => {
    const { value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [beneficiaryType]: {
        ...prev[beneficiaryType],
        [field]: value,
      },
    }));
  };

  if (!applicationData?.results) {
    return null;
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                ✓
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700">Quote</div>
            </div>
            <div className="w-16 h-1 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#003DA5] rounded-full flex items-center justify-center text-white font-semibold">
                2
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700">Beneficiary</div>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                3
              </div>
              <div className="ml-2 text-sm font-medium text-gray-500">Payment</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Beneficiary Information
          </h1>
          <p className="text-gray-600 mb-8">
            Please provide information about who should receive your life insurance benefit.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Primary Beneficiary */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-[#003DA5] text-white rounded-full flex items-center justify-center text-sm mr-3">
                  1
                </span>
                Primary Beneficiary
              </h2>
              
              <div className="space-y-4 pl-11">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.primary.firstName}
                      onChange={(e) => handleChange(e, 'primary', 'firstName')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.primary.lastName}
                      onChange={(e) => handleChange(e, 'primary', 'lastName')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.primary.relationship}
                      onChange={(e) => handleChange(e, 'primary', 'relationship')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    >
                      <option value="">Select Relationship</option>
                      {RELATIONSHIPS.map(rel => (
                        <option key={rel} value={rel}>{rel}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.primary.dateOfBirth}
                      onChange={(e) => handleChange(e, 'primary', 'dateOfBirth')}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Security Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
                    placeholder="XXX-XX-XXXX"
                    value={formData.primary.ssn}
                    onChange={(e) => handleChange(e, 'primary', 'ssn')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Required for tax reporting purposes
                  </p>
                </div>
              </div>
            </div>

            {/* Add Contingent Beneficiary Toggle */}
            <div className="border-t pt-6">
              <button
                type="button"
                onClick={() => {
                  setAddContingent(!addContingent);
                  if (!addContingent) {
                    setFormData(prev => ({
                      ...prev,
                      contingent: {
                        firstName: '',
                        lastName: '',
                        relationship: '',
                        dateOfBirth: '',
                        ssn: '',
                      },
                    }));
                  } else {
                    const { contingent, ...rest } = formData;
                    setFormData(rest);
                  }
                }}
                className="text-[#003DA5] hover:text-blue-800 font-medium flex items-center"
              >
                {addContingent ? (
                  <>
                    <span className="mr-2">−</span>
                    Remove Contingent Beneficiary
                  </>
                ) : (
                  <>
                    <span className="mr-2">+</span>
                    Add Contingent Beneficiary (Optional)
                  </>
                )}
              </button>
            </div>

            {/* Contingent Beneficiary */}
            {addContingent && formData.contingent && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm mr-3">
                    2
                  </span>
                  Contingent Beneficiary
                </h2>
                
                <div className="space-y-4 pl-11">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.contingent.firstName}
                        onChange={(e) => handleChange(e, 'contingent', 'firstName')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.contingent.lastName}
                        onChange={(e) => handleChange(e, 'contingent', 'lastName')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship
                      </label>
                      <select
                        value={formData.contingent.relationship}
                        onChange={(e) => handleChange(e, 'contingent', 'relationship')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                      >
                        <option value="">Select Relationship</option>
                        {RELATIONSHIPS.map(rel => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={formData.contingent.dateOfBirth}
                        onChange={(e) => handleChange(e, 'contingent', 'dateOfBirth')}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Security Number
                    </label>
                    <input
                      type="text"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
                      placeholder="XXX-XX-XXXX"
                      value={formData.contingent.ssn}
                      onChange={(e) => handleChange(e, 'contingent', 'ssn')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> A contingent beneficiary will receive the death benefit only if your primary beneficiary predeceases you. You can update your beneficiaries at any time.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-md font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#003DA5] text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-800 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
