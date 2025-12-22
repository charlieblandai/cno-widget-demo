'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';

export default function QuoteResultsPage() {
  const router = useRouter();
  const { applicationData } = useApp();

  useEffect(() => {
    if (!applicationData?.results) {
      router.push('/');
    }
  }, [applicationData, router]);

  if (!applicationData?.results) {
    return null;
  }

  const { results, quote } = applicationData;

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
            <div className="w-16 h-1 bg-[#003DA5]"></div>
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

        {/* Results Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Your Quote Results
          </h1>

          {/* Premium Display */}
          <div className="bg-gradient-to-r from-[#003DA5] to-blue-700 rounded-lg p-8 mb-8">
            <div className="text-center text-white">
              <div className="text-sm font-medium mb-2">Your Monthly Premium</div>
              <div className="text-5xl font-bold mb-2">
                ${results.monthlyPremium}
              </div>
              <div className="text-lg">
                Coverage Amount: ${results.coverageAmount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Application Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Application Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">
                  {quote.firstName} {quote.lastName}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Date of Birth:</span>
                <span className="ml-2 font-medium">{quote.dateOfBirth}</span>
              </div>
              <div>
                <span className="text-gray-600">Gender:</span>
                <span className="ml-2 font-medium">
                  {quote.gender === 'M' ? 'Male' : 'Female'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <span className="ml-2 font-medium">{quote.phone}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{quote.email}</span>
              </div>
            </div>
          </div>

          {/* Product Benefits */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Coverage Includes:
            </h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>No Health Questions</strong> - Guaranteed acceptance for ages 50-85
                </span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Locked-in Rate</strong> - Your premium will never increase
                </span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>30-Day Try-It-On Period</strong> - Cancel anytime within 30 days for a full refund
                </span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">
                  <strong>Lifetime Coverage</strong> - Coverage lasts your entire life
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push('/enrollment/beneficiary')}
              className="flex-1 bg-[#003DA5] text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-800 transition-colors"
            >
              Continue to Enrollment
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 border-2 border-[#003DA5] text-[#003DA5] py-3 px-6 rounded-md font-semibold hover:bg-blue-50 transition-colors"
            >
              Modify Quote
            </button>
          </div>

          {/* Important Notice */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> During the first two years, if death results from natural causes, we'll return premiums paid plus 10% interest. After two years, full coverage applies regardless of cause.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
