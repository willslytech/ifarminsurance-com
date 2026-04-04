// Risk Assessment Engine
// Calculates risk scores based on user profile data

import { UserRiskProfile, RiskMultipliers } from './types';

export class RiskAssessmentEngine {
  /**
   * Calculate overall risk score (0-100, higher = more risky)
   */
  calculateRiskScore(profile: UserRiskProfile): number {
    let riskScore = 50; // Base risk score

    // Age factor
    riskScore += this.calculateAgeRisk(profile.age);

    // Claims history
    riskScore += this.calculateClaimsRisk(profile.claimsInLast5Years, profile.atFaultAccidentsInLast3Years);

    // Credit score (where available and permitted)
    if (profile.creditScore) {
      riskScore += this.calculateCreditRisk(profile.creditScore);
    }

    // Location risk
    riskScore += this.calculateLocationRisk(profile.state, profile.zipCode);

    // Usage risk
    riskScore += this.calculateUsageRisk(profile.annualMileage, profile.businessUse);

    // Previous insurance
    riskScore -= this.calculateInsuranceHistoryBonus(profile.hasPreviousInsurance, profile.yearsWithCurrentInsurer);

    // Clamp to 0-100 range
    return Math.max(0, Math.min(100, riskScore));
  }

  /**
   * Calculate age-based risk factor
   */
  private calculateAgeRisk(age: number): number {
    if (age < 21) return 30; // Very young drivers
    if (age < 25) return 15; // Young adults
    if (age >= 21 && age < 65) return -10; // Prime age - lower risk
    if (age >= 65 && age < 75) return 0; // Seniors - average risk
    return 10; // 75+ - slightly higher risk
  }

  /**
   * Calculate claims history risk
   */
  private calculateClaimsRisk(claims: number, accidents: number): number {
    return (claims * 15) + (accidents * 20);
  }

  /**
   * Calculate credit score risk (where permitted by law)
   */
  private calculateCreditRisk(creditScore: number): number {
    if (creditScore >= 780) return -15; // Excellent
    if (creditScore >= 740) return -10; // Very good
    if (creditScore >= 700) return -5; // Good
    if (creditScore >= 650) return 5; // Fair
    if (creditScore >= 600) return 15; // Poor
    return 25; // Very poor
  }

  /**
   * Calculate location-based risk
   */
  private calculateLocationRisk(state: string, zipCode: string): number {
    // High-risk states (examples - in production, use real data)
    const highRiskStates = ['FL', 'CA', 'TX', 'NY', 'NJ'];
    const lowRiskStates = ['VT', 'ME', 'NH', 'ID', 'WY'];

    if (highRiskStates.includes(state)) return 10;
    if (lowRiskStates.includes(state)) return -10;

    // ZIP code-based risk (simplified - use real crime/accident data in production)
    const zipNum = parseInt(zipCode.substring(0, 3));
    if (zipNum >= 900 && zipNum <= 999) return 5; // West Coast urban
    if (zipNum >= 100 && zipNum <= 199) return 8; // Northeast urban

    return 0;
  }

  /**
   * Calculate usage-based risk
   */
  private calculateUsageRisk(mileage?: number, businessUse?: boolean): number {
    let risk = 0;

    if (mileage) {
      if (mileage > 20000) risk += 15;
      else if (mileage > 15000) risk += 10;
      else if (mileage > 12000) risk += 5;
      else if (mileage < 5000) risk -= 5;
    }

    if (businessUse) risk += 10;

    return risk;
  }

  /**
   * Calculate bonus for having continuous insurance
   */
  private calculateInsuranceHistoryBonus(hasInsurance: boolean, years: number): number {
    if (!hasInsurance) return 10;
    if (years >= 5) return -10;
    if (years >= 3) return -5;
    if (years >= 1) return -2;
    return 0;
  }

  /**
   * Calculate risk multipliers for a specific insurer
   */
  calculateRiskMultipliers(profile: UserRiskProfile): RiskMultipliers {
    const riskScore = this.calculateRiskScore(profile);

    return {
      ageFactor: this.getAgeFactor(profile.age),
      creditFactor: profile.creditScore ? this.getCreditFactor(profile.creditScore) : 1,
      claimsFactor: this.getClaimsFactor(profile.claimsInLast5Years, profile.atFaultAccidentsInLast3Years),
      locationFactor: this.getLocationFactor(profile.state),
      usageFactor: this.getUsageFactor(profile.annualMileage, profile.businessUse),
      safetyFactor: this.getSafetyFactor(profile.vehicleYear, profile.homeYearBuilt),
    };
  }

  private getAgeFactor(age: number): number {
    if (age < 21) return 2.5;
    if (age < 25) return 1.5;
    if (age >= 21 && age < 65) return 0.9;
    if (age >= 65 && age < 75) return 1.0;
    return 1.2;
  }

  private getCreditFactor(creditScore: number): number {
    if (creditScore >= 780) return 0.7;
    if (creditScore >= 740) return 0.8;
    if (creditScore >= 700) return 0.9;
    if (creditScore >= 650) return 1.1;
    if (creditScore >= 600) return 1.3;
    return 1.5;
  }

  private getClaimsFactor(claims: number, accidents: number): number {
    return 1 + (claims * 0.2) + (accidents * 0.3);
  }

  private getLocationFactor(state: string): number {
    const stateFactors: Record<string, number> = {
      FL: 1.3, CA: 1.2, TX: 1.2, NY: 1.25, NJ: 1.3,
      VT: 0.8, ME: 0.85, NH: 0.85, ID: 0.9, WY: 0.9,
    };
    return stateFactors[state] || 1.0;
  }

  private getUsageFactor(mileage?: number, businessUse?: boolean): number {
    let factor = 1.0;
    if (mileage) {
      factor = 1 + (mileage / 20000 - 0.5) * 0.3;
    }
    if (businessUse) factor *= 1.15;
    return Math.max(0.8, Math.min(1.5, factor));
  }

  private getSafetyFactor(vehicleYear?: number, homeYear?: number): number {
    let safetyScore = 1.0;

    if (vehicleYear) {
      const currentYear = new Date().getFullYear();
      const vehicleAge = currentYear - vehicleYear;
      if (vehicleAge <= 3) safetyScore *= 0.9;
      else if (vehicleAge <= 7) safetyScore *= 0.95;
      else if (vehicleAge > 15) safetyScore *= 1.2;
    }

    if (homeYear) {
      const currentYear = new Date().getFullYear();
      const homeAge = currentYear - homeYear;
      if (homeAge <= 10) safetyScore *= 0.9;
      else if (homeAge > 50) safetyScore *= 1.1;
    }

    return safetyScore;
  }
}
