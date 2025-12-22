'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import Link from 'next/link';

export default function ConfirmationPage() {
  const router = useRouter();
  const { applicationData, resetApplication } = useApp();

  useEffect(() => {
    if (!applicationData?.policyNumber) {
      router.push('/');
    }
  }, [applicationData, router]);

  if (!applicationData?.policyNumber) {
    return null;
  }

  const { quote, results, beneficiary, policyNumber } = applicationData;

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 mb-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Congratulations!
          </h1>
          <p className="text-xl">
            Your application has been successfully submitted
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Policy Number */}
          <div className="text-center mb-8 pb-8 border-b">
            <p className="text-sm text-gray-600 mb-2">Your Policy Number</p>
            <p className="text-3xl font-bold text-[#003DA5]">{policyNumber}</p>
            <p className="text-sm text-gray-600 mt-4">
              Please save this number for your records
            </p>
          </div>

          {/* What Happens Next */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              What Happens Next?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#003DA5] rounded-full flex items-center justify-center text-white font-semibold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Confirmation Email
                  </h3>
                  <p className="text-gray-600">
                    You'll receive a confirmation email at {quote?.email} within the next few minutes with your policy details.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#003DA5] rounded-full flex items-center justify-center text-white font-semibold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Policy Documents
                  </h3>
                  <p className="text-gray-600">
                    Your policy documents will be mailed to you within 5-7 business days. Please review them carefully.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#003DA5] rounded-full flex items-center justify-center text-white font-semibold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    First Payment
                  </h3>
                  <p className="text-gray-600">
                    Your first premium payment of ${results?.monthlyPremium} will be processed within 24-48 hours. Your coverage begins once payment is received.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#003DA5] rounded-full flex items-center justify-center text-white font-semibold mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    30-Day Try-It-On Period
                  </h3>
                  <p className="text-gray-600">
                    Remember, you have 30 days to review your policy. If you're not satisfied for any reason, you can cancel for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Policy Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Insured:</span>
                <span className="ml-2 font-medium">
                  {quote?.firstName} {quote?.lastName}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Coverage Amount:</span>
                <span className="ml-2 font-medium">
                  ${results?.coverageAmount.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Monthly Premium:</span>
                <span className="ml-2 font-medium">
                  ${results?.monthlyPremium}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Primary Beneficiary:</span>
                <span className="ml-2 font-medium">
                  {beneficiary?.primary.firstName} {beneficiary?.primary.lastName}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Questions or Need Assistance?
            </h2>
            <p className="text-gray-700 mb-4">
              Our customer service team is here to help you Monday through Friday, 8:00 AM to 8:00 PM ET.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:1-877-469-5128"
                className="flex items-center justify-center bg-[#003DA5] text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 1-877-469-5128
              </a>
              <button
                onClick={() => {
                  // This would open the Bland chat widget
                  if (typeof window !== 'undefined' && (window as any).Bland) {
                    (window as any).Bland('open');
                  }
                }}
                className="flex items-center justify-center border-2 border-[#003DA5] text-[#003DA5] py-3 px-6 rounded-md font-semibold hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Chat with Us
              </button>
            </div>
          </div>

          {/* Important Reminders */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Important Reminders
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-[#003DA5] mr-2">•</span>
                Your coverage is effective once your first premium payment is processed
              </li>
              <li className="flex items-start">
                <span className="text-[#003DA5] mr-2">•</span>
                During the first two years, if death results from natural causes, premiums paid plus 10% interest will be returned
              </li>
              <li className="flex items-start">
                <span className="text-[#003DA5] mr-2">•</span>
                After two years, full coverage applies regardless of cause
              </li>
              <li className="flex items-start">
                <span className="text-[#003DA5] mr-2">•</span>
                You can update your beneficiaries at any time by contacting us
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
            <Link
              href="/"
              onClick={() => resetApplication()}
              className="flex-1 text-center bg-gray-100 text-gray-700 py-3 px-6 rounded-md font-semibold hover:bg-gray-200 transition-colors"
            >
              Return to Home
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1 border-2 border-[#003DA5] text-[#003DA5] py-3 px-6 rounded-md font-semibold hover:bg-blue-50 transition-colors"
            >
              Print Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
