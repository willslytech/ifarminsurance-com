// Main Insurance Quote Engine
// Orchestrates the entire quote calculation process

import { RiskAssessmentEngine } from './riskAssessment';
import { AnomalyDetectionEngine } from './anomalyDetection';
import { DataAnonymizationEngine } from './anonymization';
import {
  QuoteRequest,
  QuoteResponse,
  RawQuote,
  NormalizedQuote,
  Insurer,
  CoverageDetails,
} from './types';

export class QuoteEngine {
  private riskEngine: RiskAssessmentEngine;
  private anomalyEngine: AnomalyDetectionEngine;
  private anonymizationEngine: DataAnonymizationEngine;
  private insurers: Insurer[];

  constructor() {
    this.riskEngine = new RiskAssessmentEngine();
    this.anomalyEngine = new AnomalyDetectionEngine();
    this.anonymizationEngine = new DataAnonymizationEngine();
    this.insurers = this.loadInsurers();
  }

  /**
   * Main method to generate quotes
   */
  async generateQuotes(request: QuoteRequest): Promise<QuoteResponse> {
    console.log(`[${this.generateRequestId()}] Generating quotes for user`, {
      insuranceType: request.insuranceType,
      zipCode: request.riskProfile.zipCode,
      state: request.riskProfile.state,
    });

    // Step 1: Calculate risk multipliers
    const riskMultipliers = this.riskEngine.calculateRiskMultipliers(
      request.riskProfile
    );

    // Step 2: Generate raw quotes from all insurers
    const rawQuotes = await this.generateRawQuotes(request, riskMultipliers);

    // Step 3: Validate and filter invalid quotes
    const validQuotes = this.validateQuotes(rawQuotes);

    console.log(`[${this.generateRequestId()}] Received ${rawQuotes.length} quotes, ${validQuotes.length} valid`);

    // Step 4: Remove duplicates
    const uniqueQuotes = this.anomalyEngine.detectDuplicates(validQuotes);

    // Step 5: Detect and remove anomalies
    const anomalyResult = this.anomalyEngine.detectAnomalies(uniqueQuotes);

    console.log(`[${this.generateRequestId()}] Removed ${anomalyResult.outliersRemoved} anomalous quotes`);

    // Step 6: Normalize and rank quotes
    const normalizedQuotes = this.normalizeAndRankQuotes(
      anomalyResult.filteredQuotes,
      request.riskProfile
    );

    // Step 7: Anonymize user data for analytics
    const anonymizedData = this.anonymizationEngine.anonymizeUser(request.riskProfile);
    this.storeAnonymizedData(anonymizedData, normalizedQuotes);

    // Step 8: Return response
    return this.buildResponse(normalizedQuotes, anomalyResult);
  }

  /**
   * Generate raw quotes from all insurers
   * In production, this would call real carrier APIs
   */
  private async generateRawQuotes(
    request: QuoteRequest,
    riskMultipliers: any
  ): Promise<RawQuote[]> {
    const quotes: RawQuote[] = [];

    for (const insurer of this.insurers) {
      try {
        const quote = await this.getQuoteFromInsurer(
          insurer,
          request,
          riskMultipliers
        );
        quotes.push(quote);
      } catch (error) {
        console.error(`Error getting quote from ${insurer.name}:`, error);
        // Continue with other insurers
      }
    }

    return quotes;
  }

  /**
   * Get quote from a single insurer
   * In production, this would be an API call to the carrier
   */
  private async getQuoteFromInsurer(
    insurer: Insurer,
    request: QuoteRequest,
    riskMultipliers: any
  ): Promise<RawQuote> {
    // Simulate API delay
    await this.simulateDelay(50 + Math.random() * 200);

    // Calculate base premium
    const basePremium = this.calculateBasePremium(
      request.insuranceType,
      request.riskProfile
    );

    // Apply insurer-specific multipliers
    let premium = basePremium * insurer.baseRateMultiplier;

    // Apply risk factors
    premium *= riskMultipliers.ageFactor;
    premium *= riskMultipliers.creditFactor;
    premium *= riskMultipliers.claimsFactor;
    premium *= riskMultipliers.locationFactor;
    premium *= riskMultipliers.usageFactor;
    premium *= riskMultipliers.safetyFactor;

    // Apply coverage level adjustment
    premium *= this.getCoverageLevelMultiplier(request.riskProfile.coverageLevel);

    // Apply deductible discount
    premium *= this.getDeductibleMultiplier(request.riskProfile.deductible);

    // Add some randomization (simulates carrier-specific pricing)
    premium *= (0.95 + Math.random() * 0.1); // ±5%

    // Generate coverage details
    const coverageDetails = this.generateCoverageDetails(request);

    return {
      insurerId: insurer.id,
      premium: Math.round(premium),
      coverageDetails,
      providerName: insurer.name,
      timestamp: new Date(),
    };
  }

  /**
   * Calculate base premium for insurance type
   */
  private calculateBasePremium(
    insuranceType: string,
    profile: any
  ): number {
    const baseRates: Record<string, number> = {
      auto: 150,
      home: 120,
      farm: 200,
      renters: 40,
      life: 80,
    };

    let base = baseRates[insuranceType] || 100;

    // Adjust for state
    const stateMultipliers: Record<string, number> = {
      FL: 1.3, CA: 1.25, TX: 1.2, NY: 1.25, NJ: 1.3,
      VT: 0.85, ME: 0.85, NH: 0.85, ID: 0.9, WY: 0.9,
    };
    base *= stateMultipliers[profile.state] || 1.0;

    // Adjust for value (if applicable)
    if (profile.vehicleValue) {
      base *= (profile.vehicleValue / 30000);
    }
    if (profile.homeValue) {
      base *= (profile.homeValue / 250000);
    }

    return base;
  }

  /**
   * Get coverage level multiplier
   */
  private getCoverageLevelMultiplier(level: string): number {
    const multipliers: Record<string, number> = {
      basic: 0.7,
      standard: 1.0,
      premium: 1.4,
    };
    return multipliers[level] || 1.0;
  }

  /**
   * Get deductible multiplier (higher deductible = lower premium)
   */
  private getDeductibleMultiplier(deductible: number): number {
    // Base deductible is $500
    const baseDeductible = 500;
    const ratio = deductible / baseDeductible;
    return Math.pow(ratio, -0.15); // Diminishing returns
  }

  /**
   * Generate coverage details based on request
   */
  private generateCoverageDetails(request: QuoteRequest): CoverageDetails {
    const profile = request.riskProfile;

    let liability = 'Standard';
    if (profile.liabilityLimit >= 500000) liability = 'High';
    else if (profile.liabilityLimit >= 250000) liability = 'Above Standard';

    return {
      liability,
      comprehensive: request.insuranceType !== 'life',
      collision: request.insuranceType === 'auto',
      medical: request.insuranceType !== 'life',
      uninsuredMotorist: request.insuranceType === 'auto',
      deductible: profile.deductible,
    };
  }

  /**
   * Validate quotes
   */
  private validateQuotes(quotes: RawQuote[]): RawQuote[] {
    return quotes.filter(quote => {
      const validation = this.anomalyEngine.validateQuote(quote);
      if (!validation.valid) {
        console.warn(`Invalid quote from ${quote.providerName}:`, validation.errors);
      }
      return validation.valid;
    });
  }

  /**
   * Normalize and rank quotes
   */
  private normalizeAndRankQuotes(
    quotes: RawQuote[],
    profile: any
  ): NormalizedQuote[] {
    if (quotes.length === 0) return [];

    const averagePremium = quotes.reduce((sum, q) => sum + q.premium, 0) / quotes.length;

    const normalizedQuotes: NormalizedQuote[] = quotes.map((quote, index) => {
      const insurer = this.insurers.find(i => i.id === quote.insurerId);
      const normalizedPremium = this.normalizePremium(quote.premium, quote.coverageDetails);

      // Calculate rank score (lower is better)
      const priceScore = (quote.premium - averagePremium) / averagePremium;
      const reputationScore = insurer ? (1 - insurer.reputationScore / 100) : 0.5;

      const rankScore = (priceScore * 0.6) + (reputationScore * 0.4);

      return {
        ...quote,
        normalizedPremium,
        rankScore,
        savingsVsAverage: ((averagePremium - quote.premium) / averagePremium) * 100,
        isBestValue: index < 3, // Top 3 are "Best Value"
      };
    });

    // Sort by rank score
    normalizedQuotes.sort((a, b) => a.rankScore - b.rankScore);

    return normalizedQuotes;
  }

  /**
   * Normalize premium to monthly rate
   */
  private normalizePremium(premium: number, coverage: CoverageDetails): number {
    // Assume premium is monthly
    return premium;
  }

  /**
   * Store anonymized data for analytics
   */
  private storeAnonymizedData(
    anonymizedData: any,
    quotes: NormalizedQuote[]
  ): void {
    // In production, store in analytics database
    const analytics = this.anonymizationEngine.aggregateQuotes(quotes);
    console.log('Analytics data:', {
      anonymizedUser: anonymizedData,
      quoteAnalytics: analytics,
    });
  }

  /**
   * Build response
   */
  private buildResponse(
    quotes: NormalizedQuote[],
    anomalyResult: any
  ): QuoteResponse {
    if (quotes.length === 0) {
      return {
        quotes: [],
        averagePremium: 0,
        lowestPremium: 0,
        highestPremium: 0,
        totalQuotesReceived: 0,
        quotesAfterFiltering: 0,
        requestId: this.generateRequestId(),
        timestamp: new Date(),
      };
    }

    const premiums = quotes.map(q => q.premium);

    return {
      quotes,
      averagePremium: Math.round(
        premiums.reduce((sum, p) => sum + p, 0) / premiums.length
      ),
      lowestPremium: Math.min(...premiums),
      highestPremium: Math.max(...premiums),
      totalQuotesReceived: quotes.length + anomalyResult.outliersRemoved,
      quotesAfterFiltering: quotes.length,
      requestId: this.generateRequestId(),
      timestamp: new Date(),
    };
  }

  /**
   * Load insurers from configuration or database
   * In production, this would come from a database
   */
  private loadInsurers(): Insurer[] {
    return [
      {
        id: 'state-farm',
        name: 'State Farm',
        baseRateMultiplier: 1.05,
        riskFactorMultipliers: {
          ageFactor: 1.0,
          creditFactor: 1.0,
          claimsFactor: 1.0,
          locationFactor: 1.0,
          usageFactor: 1.0,
          safetyFactor: 1.0,
        },
        reputationScore: 92,
        marketShare: 16,
      },
      {
        id: 'geico',
        name: 'Geico',
        baseRateMultiplier: 0.95,
        riskFactorMultipliers: {
          ageFactor: 1.0,
          creditFactor: 1.0,
          claimsFactor: 1.0,
          locationFactor: 1.0,
          usageFactor: 1.0,
          safetyFactor: 1.0,
        },
        reputationScore: 89,
        marketShare: 14,
      },
      {
        id: 'progressive',
        name: 'Progressive',
        baseRateMultiplier: 0.98,
        riskFactorMultipliers: {
          ageFactor: 1.0,
          creditFactor: 1.0,
          claimsFactor: 1.0,
          locationFactor: 1.0,
          usageFactor: 1.0,
          safetyFactor: 1.0,
        },
        reputationScore: 88,
        marketShare: 12,
      },
      {
        id: 'allstate',
        name: 'Allstate',
        baseRateMultiplier: 1.1,
        riskFactorMultipliers: {
          ageFactor: 1.0,
          creditFactor: 1.0,
          claimsFactor: 1.0,
          locationFactor: 1.0,
          usageFactor: 1.0,
          safetyFactor: 1.0,
        },
        reputationScore: 87,
        marketShare: 9,
      },
      {
        id: 'usaa',
        name: 'USAA',
        baseRateMultiplier: 0.85,
        riskFactorMultipliers: {
          ageFactor: 1.0,
          creditFactor: 1.0,
          claimsFactor: 1.0,
          locationFactor: 1.0,
          usageFactor: 1.0,
          safetyFactor: 1.0,
        },
        reputationScore: 95,
        marketShare: 6,
      },
      {
        id: 'liberty-mutual',
        name: 'Liberty Mutual',
        baseRateMultiplier: 1.08,
        riskFactorMultipliers: {
          ageFactor: 1.0,
          creditFactor: 1.0,
          claimsFactor: 1.0,
          locationFactor: 1.0,
          usageFactor: 1.0,
          safetyFactor: 1.0,
        },
        reputationScore: 85,
        marketShare: 5,
      },
      {
        id: 'farmers',
        name: 'Farmers Insurance',
        baseRateMultiplier: 1.12,
        riskFactorMultipliers: {
          ageFactor: 1.0,
          creditFactor: 1.0,
          claimsFactor: 1.0,
          locationFactor: 1.0,
          usageFactor: 1.0,
          safetyFactor: 1.0,
        },
        reputationScore: 84,
        marketShare: 4,
      },
      {
        id: 'nationwide',
        name: 'Nationwide',
        baseRateMultiplier: 1.06,
        riskFactorMultipliers: {
          ageFactor: 1.0,
          creditFactor: 1.0,
          claimsFactor: 1.0,
          locationFactor: 1.0,
          usageFactor: 1.0,
          safetyFactor: 1.0,
        },
        reputationScore: 86,
        marketShare: 4,
      },
    ];
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `REQ-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Simulate API delay
   */
  private async simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
