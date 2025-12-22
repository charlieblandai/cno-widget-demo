'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { PaymentFormData } from '@/lib/types';

export default function PaymentPage() {
  const router = useRouter();
  const { applicationData, setPaymentData, setPolicyNumber } = useApp();
  const [formData, setFormData] = useState<PaymentFormData>({
    paymentMethod: 'bank',
    bankAccount: {
      accountType: 'checking',
      routingNumber: '',
      accountNumber: '',
    },
    frequency: 'monthly',
    agreedToTerms: false,
  });

  useEffect(() => {
    if (!applicationData?.beneficiary) {
      router.push('/');
    }
  }, [applicationData, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate mock policy number
    const policyNumber = `CP-${Date.now().toString().slice(-8)}`;
    
    setPaymentData(formData);
    setPolicyNumber(policyNumber);
    router.push('/enrollment/confirmation');
  };

  const handlePaymentMethodChange = (method: 'bank' | 'card') => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method,
      bankAccount: method === 'bank' ? {
        accountType: 'checking',
        routingNumber: '',
        accountNumber: '',
      } : undefined,
      creditCard: method === 'card' ? {
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        billingZip: '',
      } : undefined,
    }));
  };

  if (!applicationData?.beneficiary) {
    return null;
  }

  const monthlyPremium = applicationData.results?.monthlyPremium || 0;

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
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                ✓
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700">Beneficiary</div>
            </div>
            <div className="w-16 h-1 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#003DA5] rounded-full flex items-center justify-center text-white font-semibold">
                3
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700">Payment</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Information
          </h1>
          <p className="text-gray-600 mb-8">
            Set up your payment method to complete your application.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Premium Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Your Monthly Premium
                  </h3>
                  <p className="text-sm text-gray-600">
                    Guaranteed never to increase
                  </p>
                </div>
                <div className="text-3xl font-bold text-[#003DA5]">
                  ${monthlyPremium}
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('bank')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    formData.paymentMethod === 'bank'
                      ? 'border-[#003DA5] bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-medium">Bank Account (ACH)</span>
                    </div>
                    {formData.paymentMethod === 'bank' && (
                      <div className="w-5 h-5 bg-[#003DA5] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('card')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#003DA5] bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                    {formData.paymentMethod === 'card' && (
                      <div className="w-5 h-5 bg-[#003DA5] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Bank Account Fields */}
            {formData.paymentMethod === 'bank' && formData.bankAccount && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Bank Account Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="checking"
                        checked={formData.bankAccount.accountType === 'checking'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          bankAccount: {
                            ...prev.bankAccount!,
                            accountType: 'checking',
                          },
                        }))}
                        className="mr-2"
                        required
                      />
                      Checking
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="savings"
                        checked={formData.bankAccount.accountType === 'savings'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          bankAccount: {
                            ...prev.bankAccount!,
                            accountType: 'savings',
                          },
                        }))}
                        className="mr-2"
                        required
                      />
                      Savings
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Routing Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{9}"
                    placeholder="9 digits"
                    value={formData.bankAccount.routingNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      bankAccount: {
                        ...prev.bankAccount!,
                        routingNumber: e.target.value,
                      },
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{4,17}"
                    placeholder="4-17 digits"
                    value={formData.bankAccount.accountNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      bankAccount: {
                        ...prev.bankAccount!,
                        accountNumber: e.target.value,
                      },
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Credit Card Fields */}
            {formData.paymentMethod === 'card' && formData.creditCard && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Credit/Debit Card Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{13,19}"
                    placeholder="1234 5678 9012 3456"
                    value={formData.creditCard.cardNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      creditCard: {
                        ...prev.creditCard!,
                        cardNumber: e.target.value,
                      },
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiration <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                      placeholder="MM/YY"
                      value={formData.creditCard.expirationDate}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        creditCard: {
                          ...prev.creditCard!,
                          expirationDate: e.target.value,
                        },
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{3,4}"
                      placeholder="123"
                      value={formData.creditCard.cvv}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        creditCard: {
                          ...prev.creditCard!,
                          cvv: e.target.value,
                        },
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing ZIP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{5}"
                      placeholder="12345"
                      value={formData.creditCard.billingZip}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        creditCard: {
                          ...prev.creditCard!,
                          billingZip: e.target.value,
                        },
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Frequency <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.frequency}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  frequency: e.target.value as 'monthly' | 'quarterly' | 'annually',
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003DA5] focus:border-transparent"
              >
                <option value="monthly">Monthly - ${monthlyPremium}</option>
                <option value="quarterly">Quarterly - ${(monthlyPremium * 3).toFixed(2)}</option>
                <option value="annually">Annually - ${(monthlyPremium * 12).toFixed(2)}</option>
              </select>
            </div>

            {/* Terms and Conditions */}
            <div className="border-t pt-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    agreedToTerms: e.target.checked,
                  }))}
                  className="mt-1 mr-3"
                />
                <span className="text-sm text-gray-700">
                  I authorize Colonial Penn to charge my payment method on file for my premium. I understand that my coverage will begin after my first premium payment is processed. I have read and agree to the <a href="#" className="text-[#003DA5] underline">Terms and Conditions</a> and <a href="#" className="text-[#003DA5] underline">Privacy Policy</a>. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Secure Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-800">Your information is secure</p>
                <p className="text-sm text-gray-600 mt-1">
                  We use bank-level encryption to protect your personal and payment information.
                </p>
              </div>
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
                Complete Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
