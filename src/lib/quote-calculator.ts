/**
 * Simplified Insurance Quote Calculator
 *
 * This is a beta version using industry averages and risk factors.
 * For production, this will be replaced with real-time API integrations
 * with insurance carriers and Quadrant Information Services data.
 */

// Insurance provider database with base rates and multipliers
const INSURANCE_PROVIDERS = {
  auto: [
    { name: 'Progressive Farm & Auto', baseRate: 85, rating: 4.5, tier: 'premium' },
    { name: 'State Farm Rural', baseRate: 92, rating: 4.6, tier: 'premium' },
    { name: 'Farmers Insurance', baseRate: 78, rating: 4.3, tier: 'standard' },
    { name: 'Allstate Farm Protection', baseRate: 95, rating: 4.2, tier: 'premium' },
    { name: 'Country Financial', baseRate: 88, rating: 4.4, tier: 'standard' },
    { name: 'Nationwide Farm', baseRate: 82, rating: 4.3, tier: 'standard' },
    { name: 'American Family', baseRate: 90, rating: 4.4, tier: 'premium' },
    { name: 'Liberty Mutual Agriculture', baseRate: 86, rating: 4.1, tier: 'standard' },
    { name: 'Geico Farm & Auto', baseRate: 75, rating: 4.0, tier: 'budget' },
    { name: 'Travelers Farm', baseRate: 94, rating: 4.2, tier: 'premium' },
  ],
  farm: [
    { name: 'Farmers Insurance', baseRate: 180, rating: 4.5, tier: 'premium' },
    { name: 'Country Financial', baseRate: 165, rating: 4.6, tier: 'standard' },
    { name: 'Nationwide Agribusiness', baseRate: 175, rating: 4.4, tier: 'premium' },
    { name: 'American Family Farm', baseRate: 190, rating: 4.3, tier: 'premium' },
    { name: 'Progressive Agribusiness', baseRate: 155, rating: 4.2, tier: 'standard' },
    { name: 'State Farm Farm & Ranch', baseRate: 185, rating: 4.5, tier: 'premium' },
    { name: 'Chubb Agribusiness', baseRate: 210, rating: 4.7, tier: 'premium' },
    { name: 'The Hartford Farm', baseRate: 170, rating: 4.3, tier: 'standard' },
    { name: 'Zurich Agricultural', baseRate: 195, rating: 4.4, tier: 'premium' },
    { name: 'QBE Farm & Ranch', baseRate: 160, rating: 4.1, tier: 'standard' },
  ],
  home: [
    { name: 'State Farm Home', baseRate: 110, rating: 4.6, tier: 'premium' },
    { name: 'Allstate Home', baseRate: 115, rating: 4.3, tier: 'premium' },
    { name: 'Farmers Home', baseRate: 105, rating: 4.4, tier: 'standard' },
    { name: 'Liberty Mutual', baseRate: 108, rating: 4.2, tier: 'standard' },
    { name: 'American Family', baseRate: 112, rating: 4.5, tier: 'premium' },
    { name: 'Nationwide Home', baseRate: 102, rating: 4.3, tier: 'standard' },
    { name: 'Travelers Home', baseRate: 118, rating: 4.2, tier: 'premium' },
    { name: 'Chubb Home', baseRate: 140, rating: 4.7, tier: 'premium' },
    { name: 'USAA', baseRate: 95, rating: 4.8, tier: 'premium' },
    { name: 'Amica Mutual', baseRate: 100, rating: 4.6, tier: 'premium' },
  ],
  renters: [
    { name: 'Lemonade Renters', baseRate: 15, rating: 4.5, tier: 'budget' },
    { name: 'State Farm Renters', baseRate: 18, rating: 4.6, tier: 'standard' },
    { name: 'Allstate Renters', baseRate: 20, rating: 4.3, tier: 'standard' },
    { name: 'Farmers Renters', baseRate: 17, rating: 4.2, tier: 'standard' },
    { name: 'Liberty Mutual Renters', baseRate: 19, rating: 4.1, tier: 'standard' },
    { name: 'Nationwide Renters', baseRate: 16, rating: 4.3, tier: 'standard' },
    { name: 'Geico Renters', baseRate: 14, rating: 4.0, tier: 'budget' },
    { name: 'American Family Renters', baseRate: 18, rating: 4.4, tier: 'standard' },
    { name: 'Travelers Renters', baseRate: 21, rating: 4.2, tier: 'premium' },
    { name: 'USAA Renters', baseRate: 12, rating: 4.8, tier: 'premium' },
  ],
  life: [
    { name: 'Northwestern Mutual', baseRate: 45, rating: 4.8, tier: 'premium' },
    { name: 'State Farm Life', baseRate: 42, rating: 4.6, tier: 'premium' },
    { name: 'New York Life', baseRate: 48, rating: 4.7, tier: 'premium' },
    { name: 'MassMutual', baseRate: 50, rating: 4.6, tier: 'premium' },
    { name: 'Guardian Life', baseRate: 44, rating: 4.5, tier: 'premium' },
    { name: 'Prudential', baseRate: 43, rating: 4.4, tier: 'standard' },
    { name: 'MetLife', baseRate: 46, rating: 4.3, tier: 'standard' },
    { name: 'AIG Life', baseRate: 52, rating: 4.2, tier: 'premium' },
    { name: 'Transamerica', baseRate: 41, rating: 4.1, tier: 'standard' },
    { name: 'Lincoln Financial', baseRate: 47, rating: 4.3, tier: 'standard' },
  ],
}

// Risk factor multipliers based on ZIP code
const getRiskFactorByZip = (zipCode: string): number => {
  const firstDigit = parseInt(zipCode.charAt(0))

  // Simplified risk assessment by region (first digit of ZIP)
  // 0: Northeast (CT, MA, ME, NH, RI, VT) - Higher rates
  // 1: Northeast/Mid-Atlantic (NY, PA, NJ) - Higher rates
  // 2: Southeast (DC, MD, VA, WV, NC, SC, GA, FL) - Moderate rates
  // 3: Southeast (AL, MS, TN, KY) - Moderate rates
  // 4: Midwest (OH, IN, IL, MI, WI, MN, IA, MO) - Lower rates
  // 5: Midwest/Plains (ND, SD, NE, KS, MT, WY) - Lowest rates
  // 6: Central/South (AR, LA, OK, TX) - Moderate rates
  // 7: Southwest (NM, CO, UT, AZ, NV, ID) - Moderate rates
  // 8: Mountain West (WY, CO, NM, MT, ID, UT, AZ, NV) - Moderate rates
  // 9: West Coast (WA, OR, CA, AK, HI) - Higher rates

  const riskFactors: Record<number, number> = {
    0: 1.15, // Northeast
    1: 1.12, // Mid-Atlantic
    2: 1.05, // Southeast
    3: 1.03, // Southeast
    4: 0.95, // Midwest
    5: 0.90, // Plains (rural farming areas)
    6: 1.02, // South Central
    7: 1.04, // Southwest
    8: 1.03, // Mountain
    9: 1.10, // West Coast
  }

  return riskFactors[firstDigit] || 1.0
}

// Driver age factor for auto insurance
const getDriverAgeFactor = (age: number): number => {
  if (age < 18) return 1.8 // High risk
  if (age < 21) return 1.5 // Very high risk
  if (age < 25) return 1.3 // High risk
  if (age < 30) return 1.1 // Slightly elevated
  if (age < 50) return 1.0 // Standard
  if (age < 65) return 0.95 // Preferred
  if (age < 75) return 1.05 // Slightly elevated
  return 1.15 // Higher risk for seniors
}

// Vehicle type factor for auto insurance
const getVehicleTypeFactor = (vehicleType: string): number => {
  const factors: Record<string, number> = {
    'sedan': 1.0,
    'suv': 1.05,
    'truck': 1.15,
    'van': 1.08,
    'sports': 1.35,
    'luxury': 1.25,
    'hybrid': 0.95,
    'electric': 0.92,
    'motorcycle': 1.45,
    'commercial': 1.40,
  }
  return factors[vehicleType.toLowerCase()] || 1.0
}

// Farm size factor
const getFarmSizeFactor = (acres: number): number => {
  if (acres < 50) return 1.2 // Small hobby farms - higher risk per acre
  if (acres < 200) return 1.0 // Standard family farm
  if (acres < 500) return 0.95 // Larger operations - economies of scale
  if (acres < 1000) return 0.90 // Commercial farms
  return 0.85 // Very large operations - lower per-unit risk
}

// Home value factor
const getHomeValueFactor = (homeValue: number): number => {
  if (homeValue < 100000) return 0.90 // Lower value
  if (homeValue < 200000) return 1.0 // Average
  if (homeValue < 400000) return 1.1 // Above average
  if (homeValue < 750000) return 1.25 // High value
  return 1.45 // Luxury
}

// Coverage level factor
const getCoverageLevelFactor = (coverageLevel: string): number => {
  const factors: Record<string, number> = {
    'minimum': 0.70,
    'basic': 0.85,
    'standard': 1.0,
    'enhanced': 1.25,
    'premium': 1.50,
  }
  return factors[coverageLevel.toLowerCase()] || 1.0
}

// Deductible factor (higher deductible = lower premium)
const getDeductibleFactor = (deductible: number): number => {
  if (deductible <= 250) return 1.15
  if (deductible <= 500) return 1.05
  if (deductible <= 1000) return 1.0 // Standard
  if (deductible <= 2000) return 0.92
  return 0.85 // High deductible
}

// Claims history factor
const getClaimsHistoryFactor = (claimsInPast5Years: number): number => {
  if (claimsInPast5Years === 0) return 0.90 // Claims-free discount
  if (claimsInPast5Years === 1) return 1.0
  if (claimsInPast5Years === 2) return 1.15
  return 1.35 // 3+ claims - high risk
}

// Anomaly detection - filter out quotes that are statistically significant outliers
const detectAndFilterAnomalies = (quotes: Quote[]): Quote[] => {
  if (quotes.length === 0) return quotes

  // Calculate mean and standard deviation
  const premiums = quotes.map(q => q.premium)
  const mean = premiums.reduce((a, b) => a + b, 0) / premiums.length
  const variance = premiums.reduce((sum, premium) => sum + Math.pow(premium - mean, 2), 0) / premiums.length
  const stdDev = Math.sqrt(variance)

  // Filter quotes outside 2 standard deviations (95% confidence interval)
  // This removes anomalous quotes that are either too low or too high
  const filteredQuotes = quotes.filter(quote => {
    const zScore = Math.abs((quote.premium - mean) / stdDev)
    return zScore <= 2.0
  })

  return filteredQuotes
}

// Data anonymization - remove personally identifiable information
const anonymizeData = (data: any): any => {
  // In a real implementation, this would hash or encrypt PII
  // For beta, we simply don't store PII in the quote results
  return {
    ...data,
    // Remove any PII fields
    email: undefined,
    phone: undefined,
    firstName: undefined,
    lastName: undefined,
    address: undefined,
  }
}

// Main quote calculation function
export interface Quote {
  provider: string
  premium: number
  deductible: number
  rating: number
  tier: string
  coverageDetails: string
}

export interface QuoteRequest {
  zipCode: string
  insuranceType: string
  email: string
  phoneNumber?: string
  // Auto-specific fields
  driverAge?: number
  vehicleType?: string
  vehicleYear?: number
  // Farm-specific fields
  farmSize?: number
  farmType?: string
  equipmentValue?: number
  // Home-specific fields
  homeValue?: number
  homeAge?: number
  // Common fields
  coverageLevel?: string
  deductible?: number
  claimsInPast5Years?: number
}

export const calculateQuotes = (request: QuoteRequest): Quote[] => {
  const { insuranceType, zipCode } = request

  // Get providers for this insurance type
  const providers = INSURANCE_PROVIDERS[insuranceType as keyof typeof INSURANCE_PROVIDERS]

  if (!providers) {
    throw new Error(`Invalid insurance type: ${insuranceType}`)
  }

  // Get base risk factor from ZIP code
  const zipRiskFactor = getRiskFactorByZip(zipCode)

  // Calculate quotes for each provider
  let quotes: Quote[] = providers.map(provider => {
    let premium = provider.baseRate
    let deductible = request.deductible || 500

    // Apply insurance type specific adjustments
    if (insuranceType === 'auto') {
      // Auto insurance calculations
      const driverAgeFactor = request.driverAge ? getDriverAgeFactor(request.driverAge) : 1.0
      const vehicleTypeFactor = request.vehicleType ? getVehicleTypeFactor(request.vehicleType) : 1.0
      const coverageFactor = getCoverageLevelFactor(request.coverageLevel || 'standard')
      const deductibleFactor = getDeductibleFactor(deductible)
      const claimsFactor = getClaimsHistoryFactor(request.claimsInPast5Years || 0)

      premium = provider.baseRate * zipRiskFactor * driverAgeFactor * vehicleTypeFactor * coverageFactor * deductibleFactor * claimsFactor
    } else if (insuranceType === 'farm') {
      // Farm insurance calculations
      const farmSizeFactor = request.farmSize ? getFarmSizeFactor(request.farmSize) : 1.0
      const coverageFactor = getCoverageLevelFactor(request.coverageLevel || 'standard')
      const deductibleFactor = getDeductibleFactor(deductible)
      const claimsFactor = getClaimsHistoryFactor(request.claimsInPast5Years || 0)

      // Equipment value adds additional premium
      const equipmentFactor = request.equipmentValue ? 1 + (request.equipmentValue / 500000) * 0.3 : 1.0

      premium = provider.baseRate * zipRiskFactor * farmSizeFactor * coverageFactor * deductibleFactor * claimsFactor * equipmentFactor

      // Farm insurance typically has higher deductibles
      deductible = Math.max(deductible, 1000)
    } else if (insuranceType === 'home') {
      // Home insurance calculations
      const homeValueFactor = request.homeValue ? getHomeValueFactor(request.homeValue) : 1.0
      const homeAgeFactor = request.homeAge ? (request.homeAge < 20 ? 0.95 : request.homeAge > 50 ? 1.15 : 1.0) : 1.0
      const coverageFactor = getCoverageLevelFactor(request.coverageLevel || 'standard')
      const deductibleFactor = getDeductibleFactor(deductible)
      const claimsFactor = getClaimsHistoryFactor(request.claimsInPast5Years || 0)

      premium = provider.baseRate * zipRiskFactor * homeValueFactor * homeAgeFactor * coverageFactor * deductibleFactor * claimsFactor
    } else if (insuranceType === 'renters') {
      // Renters insurance calculations
      const coverageFactor = getCoverageLevelFactor(request.coverageLevel || 'standard')
      const deductibleFactor = getDeductibleFactor(deductible)
      const claimsFactor = getClaimsHistoryFactor(request.claimsInPast5Years || 0)

      premium = provider.baseRate * zipRiskFactor * coverageFactor * deductibleFactor * claimsFactor

      // Renters insurance has lower deductibles
      deductible = Math.min(deductible, 500)
    } else if (insuranceType === 'life') {
      // Life insurance calculations (simplified)
      const ageFactor = request.driverAge ? getDriverAgeFactor(request.driverAge) : 1.0
      const coverageFactor = getCoverageLevelFactor(request.coverageLevel || 'standard')

      premium = provider.baseRate * ageFactor * coverageFactor

      // Life insurance doesn't use deductibles
      deductible = 0
    }

    // Round to nearest dollar
    premium = Math.round(premium)

    // Build coverage details string
    const coverageDetails = JSON.stringify({
      liability: request.coverageLevel || 'Standard',
      comprehensive: insuranceType !== 'life' && insuranceType !== 'renters',
      collision: insuranceType === 'auto',
      medical: insuranceType === 'auto',
      uninsuredMotorist: insuranceType === 'auto',
      personalProperty: ['home', 'renters'].includes(insuranceType),
      liabilityProtection: ['farm', 'home', 'renters'].includes(insuranceType),
      equipmentCoverage: insuranceType === 'farm',
      dwelling: insuranceType === 'home',
    })

    return {
      provider: provider.name,
      premium,
      deductible,
      rating: provider.rating,
      tier: provider.tier,
      coverageDetails,
    }
  })

  // Apply anomaly detection to filter out outliers
  quotes = detectAndFilterAnomalies(quotes)

  // Sort by premium (lowest first)
  quotes.sort((a, b) => a.premium - b.premium)

  // Return top 3-5 quotes
  return quotes.slice(0, 5)
}

// Generate a mock detailed quote for a specific provider
export const generateDetailedQuote = (providerName: string, insuranceType: string, request: QuoteRequest) => {
  const quotes = calculateQuotes({ ...request, insuranceType })
  const quote = quotes.find(q => q.provider === providerName)

  if (!quote) {
    throw new Error('Provider not found')
  }

  return {
    ...quote,
    coverageDetails: JSON.parse(quote.coverageDetails),
    requestId: crypto.randomUUID(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
  }
}
