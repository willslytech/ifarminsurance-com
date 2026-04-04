// Advanced Insurance Quote API
// Uses the new quote engine with risk assessment and anomaly detection

import { NextResponse } from 'next/server';
import { QuoteEngine } from '@/lib/insurance/quoteEngine';
import { QuoteRequest, UserRiskProfile } from '@/lib/insurance/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { insuranceType, zipCode, email } = body;

    if (!insuranceType || !zipCode || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: insuranceType, zipCode, and email are required' },
        { status: 400 }
      );
    }

    // Build user risk profile from form data
    const riskProfile: UserRiskProfile = {
      // Demographics
      age: parseInt(body.age) || 35,
      gender: body.gender || 'other',
      maritalStatus: body.maritalStatus || 'single',

      // Location
      zipCode: zipCode,
      state: body.state || 'SC',
      city: body.city,

      // Coverage History
      hasPreviousInsurance: body.hasPreviousInsurance === 'true' || false,
      yearsWithCurrentInsurer: parseInt(body.yearsWithCurrentInsurer) || 0,
      claimsInLast5Years: parseInt(body.claimsInLast5Years) || 0,
      atFaultAccidentsInLast3Years: parseInt(body.atFaultAccidentsInLast3Years) || 0,

      // Credit Score (optional)
      creditScore: body.creditScore ? parseInt(body.creditScore) : undefined,

      // Vehicle Details (for auto insurance)
      vehicleYear: body.vehicleYear ? parseInt(body.vehicleYear) : undefined,
      vehicleMake: body.vehicleMake,
      vehicleModel: body.vehicleModel,
      vehicleValue: body.vehicleValue ? parseInt(body.vehicleValue) : undefined,

      // Home Details (for home/farm insurance)
      homeYearBuilt: body.homeYearBuilt ? parseInt(body.homeYearBuilt) : undefined,
      homeSquareFootage: body.homeSquareFootage ? parseInt(body.homeSquareFootage) : undefined,
      homeValue: body.homeValue ? parseInt(body.homeValue) : undefined,
      homeType: body.homeType || 'house',

      // Coverage Preferences
      coverageLevel: body.coverageLevel || 'standard',
      deductible: parseInt(body.deductible) || 500,
      liabilityLimit: parseInt(body.liabilityLimit) || 100000,

      // Usage
      annualMileage: body.annualMileage ? parseInt(body.annualMileage) : undefined,
      businessUse: body.businessUse === 'true' || false,
    };

    // Create quote request
    const quoteRequest: QuoteRequest = {
      userId: `user-${Date.now()}`,
      insuranceType: insuranceType as any,
      riskProfile,
    };

    // Initialize quote engine
    const quoteEngine = new QuoteEngine();

    // Generate quotes
    console.log(`[${new Date().toISOString()}] Processing quote request for ${insuranceType} insurance`);
    const response = await quoteEngine.generateQuotes(quoteRequest);

    console.log(`[${new Date().toISOString()}] Generated ${response.quotes.length} quotes`);

    return NextResponse.json(
      {
        success: true,
        ...response,
        userInput: {
          insuranceType,
          zipCode,
          email,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Quote generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate quotes. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Advanced Insurance Quote API',
    version: '2.0.0',
    features: [
      'Risk Assessment Engine',
      'Multi-Carrier Quote Aggregation',
      'Anomaly Detection',
      'Data Anonymization',
      'Quote Normalization',
    ],
  });
}
