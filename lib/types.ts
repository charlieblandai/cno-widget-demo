// Colonial Penn Form Types

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  address: {
    street: string;
    apt?: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
}

export interface QuoteResults {
  monthlyPremium: number;
  coverageAmount: number;
  product: string;
}

export interface BeneficiaryFormData {
  primary: {
    firstName: string;
    lastName: string;
    relationship: string;
    dateOfBirth: string;
    ssn: string;
  };
  contingent?: {
    firstName: string;
    lastName: string;
    relationship: string;
    dateOfBirth: string;
    ssn: string;
  };
}

export interface PaymentFormData {
  paymentMethod: 'bank' | 'card';
  bankAccount?: {
    accountType: 'checking' | 'savings';
    routingNumber: string;
    accountNumber: string;
  };
  creditCard?: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    billingZip: string;
  };
  frequency: 'monthly' | 'quarterly' | 'annually';
  agreedToTerms: boolean;
}

export interface ApplicationData {
  quote: QuoteFormData;
  results?: QuoteResults;
  beneficiary?: BeneficiaryFormData;
  payment?: PaymentFormData;
  policyNumber?: string;
}

// US States
export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'D.C.' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

// Relationships for beneficiaries
export const RELATIONSHIPS = [
  'Spouse',
  'Child',
  'Parent',
  'Sibling',
  'Grandchild',
  'Other',
];
