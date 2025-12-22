'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ApplicationData, QuoteFormData, QuoteResults, BeneficiaryFormData, PaymentFormData } from './types';

interface AppContextType {
  applicationData: ApplicationData | null;
  setQuoteData: (data: QuoteFormData) => void;
  setQuoteResults: (results: QuoteResults) => void;
  setBeneficiaryData: (data: BeneficiaryFormData) => void;
  setPaymentData: (data: PaymentFormData) => void;
  setPolicyNumber: (policyNumber: string) => void;
  resetApplication: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);

  const setQuoteData = (data: QuoteFormData) => {
    setApplicationData(prev => ({
      ...prev,
      quote: data,
    } as ApplicationData));
  };

  const setQuoteResults = (results: QuoteResults) => {
    setApplicationData(prev => ({
      ...prev!,
      results,
    }));
  };

  const setBeneficiaryData = (data: BeneficiaryFormData) => {
    setApplicationData(prev => ({
      ...prev!,
      beneficiary: data,
    }));
  };

  const setPaymentData = (data: PaymentFormData) => {
    setApplicationData(prev => ({
      ...prev!,
      payment: data,
    }));
  };

  const setPolicyNumber = (policyNumber: string) => {
    setApplicationData(prev => ({
      ...prev!,
      policyNumber,
    }));
  };

  const resetApplication = () => {
    setApplicationData(null);
  };

  return (
    <AppContext.Provider
      value={{
        applicationData,
        setQuoteData,
        setQuoteResults,
        setBeneficiaryData,
        setPaymentData,
        setPolicyNumber,
        resetApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
