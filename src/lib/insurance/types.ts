// Insurance Quote Algorithm - Type Definitions

export interface UserRiskProfile {
  // Demographics
  age: number;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';

  // Location
  zipCode: string;
  state: string;
  city?: string;

  // Coverage History
  hasPreviousInsurance: boolean;
  yearsWithCurrentInsurer: number;
  claimsInLast5Years: number;
  atFaultAccidentsInLast3Years: number;

  // Credit Score (where permitted)
  creditScore?: number;

  // Vehicle/Property Details
  vehicleYear?: number;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleValue?: number;

  // Home Details
  homeYearBuilt?: number;
  homeSquareFootage?: number;
  homeValue?: number;
  homeType?: 'house' | 'condo' | 'townhouse' | 'mobile';

  // Coverage Preferences
  coverageLevel: 'basic' | 'standard' | 'premium';
  deductible: number;
  liabilityLimit: number;

  // Usage
  annualMileage?: number;
  businessUse: boolean;
}

export interface Insurer {
  id: string;
  name: string;
  baseRateMultiplier: number;
  riskFactorMultipliers: RiskMultipliers;
  reputationScore: number;
  marketShare: number;
}

export interface RiskMultipliers {
  ageFactor: number;
  creditFactor: number;
  claimsFactor: number;
  locationFactor: number;
  usageFactor: number;
  safetyFactor: number;
}

export interface RawQuote {
  insurerId: string;
  premium: number;
  coverageDetails: CoverageDetails;
  providerName: string;
  timestamp: Date;
}

export interface CoverageDetails {
  liability: string;
  comprehensive: boolean;
  collision: boolean;
  medical: boolean;
  uninsuredMotorist: boolean;
  deductible: number;
}

export interface NormalizedQuote extends RawQuote {
  normalizedPremium: number;
  rankScore: number;
  savingsVsAverage: number;
  isBestValue: boolean;
}

export interface QuoteRequest {
  userId: string;
  insuranceType: 'auto' | 'home' | 'farm' | 'renters' | 'life';
  riskProfile: UserRiskProfile;
}

export interface QuoteResponse {
  quotes: NormalizedQuote[];
  averagePremium: number;
  lowestPremium: number;
  highestPremium: number;
  totalQuotesReceived: number;
  quotesAfterFiltering: number;
  requestId: string;
  timestamp: Date;
}

export interface AnomalyDetectionResult {
  outliersRemoved: number;
  outliers: RawQuote[];
  filteredQuotes: RawQuote[];
  method: 'iqr' | 'zscore' | 'mad';
}

export interface AnonymizedUserData {
  userIdHash: string;
  zipCode: string;
  state: string;
  ageRange: string;
  riskScore: number;
  timestamp: Date;
}
