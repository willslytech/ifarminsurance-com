// Data Anonymization Engine
// Anonymizes personal data for privacy compliance

import crypto from 'crypto';
import { UserRiskProfile, AnonymizedUserData } from './types';

export class DataAnonymizationEngine {
  private salt: string;

  constructor(salt?: string) {
    this.salt = salt || process.env.ANONYMIZATION_SALT || 'default-salt-change-in-production';
  }

  /**
   * Anonymize user profile data
   */
  anonymizeUser(profile: UserRiskProfile): AnonymizedUserData {
    const userIdHash = this.hashString(profile.zipCode + Date.now().toString());

    return {
      userIdHash,
      zipCode: profile.zipCode,
      state: profile.state,
      ageRange: this.getAgeRange(profile.age),
      riskScore: this.calculateBasicRiskScore(profile),
      timestamp: new Date(),
    };
  }

  /**
   * Hash sensitive string data
   */
  hashString(data: string): string {
    return crypto
      .createHash('sha256')
      .update(data + this.salt)
      .digest('hex');
  }

  /**
   * Hash phone number
   */
  hashPhone(phone: string): string {
    // Remove formatting
    const cleanPhone = phone.replace(/\D/g, '');
    return this.hashString(cleanPhone);
  }

  /**
   * Hash email address
   */
  hashEmail(email: string): string {
    return this.hashString(email.toLowerCase().trim());
  }

  /**
   * Generalize address to ZIP code level only
   */
  generalizeAddress(fullAddress: string, zipCode: string): string {
    // Only return ZIP code and city (if available)
    const zipMatch = zipCode.match(/^\d{5}/);
    return zipMatch ? zipMatch[0] : '';
  }

  /**
   * Get age range instead of exact age
   */
  getAgeRange(age: number): string {
    if (age < 21) return '18-20';
    if (age < 25) return '21-24';
    if (age < 30) return '25-29';
    if (age < 35) return '30-34';
    if (age < 40) return '35-39';
    if (age < 45) return '40-44';
    if (age < 50) return '45-49';
    if (age < 55) return '50-54';
    if (age < 60) return '55-59';
    if (age < 65) return '60-64';
    if (age < 70) return '65-69';
    if (age < 75) return '70-74';
    return '75+';
  }

  /**
   * Calculate basic risk score for analytics
   */
  private calculateBasicRiskScore(profile: UserRiskProfile): number {
    let score = 50;

    // Claims history
    score += profile.claimsInLast5Years * 10;
    score += profile.atFaultAccidentsInLast3Years * 15;

    // Previous insurance bonus
    if (profile.hasPreviousInsurance) {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Mask credit score (use ranges instead of exact)
   */
  maskCreditScore(creditScore: number): string {
    if (creditScore >= 780) return '780+ (Excellent)';
    if (creditScore >= 740) return '740-779 (Very Good)';
    if (creditScore >= 700) return '700-739 (Good)';
    if (creditScore >= 650) return '650-699 (Fair)';
    if (creditScore >= 600) return '600-649 (Poor)';
    return '<600 (Very Poor)';
  }

  /**
   * Remove PII from log messages
   */
  sanitizeLogMessage(message: string): string {
    // Remove potential email addresses
    message = message.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL_REDACTED]');

    // Remove phone numbers (US format)
    message = message.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE_REDACTED]');

    // Remove SSN-like patterns
    message = message.replace(/\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g, '[SSN_REDACTED]');

    return message;
  }

  /**
   * Generate synthetic user ID for analytics
   */
  generateSyntheticId(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Check if data is properly anonymized
   */
  validateAnonymization(data: any): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Check for potential emails
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    if (emailRegex.test(JSON.stringify(data))) {
      issues.push('Potential email addresses found in data');
    }

    // Check for phone numbers
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
    if (phoneRegex.test(JSON.stringify(data))) {
      issues.push('Potential phone numbers found in data');
    }

    // Check for SSN-like patterns
    const ssnRegex = /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g;
    if (ssnRegex.test(JSON.stringify(data))) {
      issues.push('Potential SSN-like patterns found in data');
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  }

  /**
   * Create aggregated analytics data
   */
  aggregateQuotes(quotes: any[]): {
    totalQuotes: number;
    averagePremium: number;
    premiumRange: { min: number; max: number };
    stateDistribution: Record<string, number>;
    averageRiskScore: number;
  } {
    const premiums = quotes.map(q => q.premium);
    const stateCounts: Record<string, number> = {};
    let totalRiskScore = 0;

    quotes.forEach(quote => {
      if (quote.state) {
        stateCounts[quote.state] = (stateCounts[quote.state] || 0) + 1;
      }
      if (quote.riskScore) {
        totalRiskScore += quote.riskScore;
      }
    });

    return {
      totalQuotes: quotes.length,
      averagePremium: this.calculateMean(premiums),
      premiumRange: {
        min: Math.min(...premiums),
        max: Math.max(...premiums),
      },
      stateDistribution: stateCounts,
      averageRiskScore: quotes.length > 0 ? totalRiskScore / quotes.length : 0,
    };
  }

  private calculateMean(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }
}
