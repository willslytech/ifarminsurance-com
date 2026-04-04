// Anomaly Detection Engine
// Identifies and removes outlier quotes using statistical methods

import { RawQuote, AnomalyDetectionResult } from './types';

export class AnomalyDetectionEngine {
  /**
   * Detect and remove anomalies using multiple methods
   */
  detectAnomalies(quotes: RawQuote[]): AnomalyDetectionResult {
    if (quotes.length < 3) {
      return {
        outliersRemoved: 0,
        outliers: [],
        filteredQuotes: quotes,
        method: 'iqr',
      };
    }

    // Use IQR method as primary
    const iqrResult = this.detectUsingIQR(quotes);

    // If too many quotes removed, try Z-score method
    if (iqrResult.filteredQuotes.length < 3) {
      return this.detectUsingZScore(quotes);
    }

    return iqrResult;
  }

  /**
   * Interquartile Range (IQR) Method
   * Robust to outliers, works well with non-normal distributions
   */
  private detectUsingIQR(quotes: RawQuote[]): AnomalyDetectionResult {
    const premiums = quotes.map(q => q.premium).sort((a, b) => a - b);

    const q1 = this.calculatePercentile(premiums, 25);
    const q3 = this.calculatePercentile(premiums, 75);
    const iqr = q3 - q1;

    const iqrMultiplier = 1.5; // Configurable
    const lowerBound = q1 - (iqrMultiplier * iqr);
    const upperBound = q3 + (iqrMultiplier * iqr);

    const filteredQuotes = quotes.filter(q =>
      q.premium >= lowerBound && q.premium <= upperBound
    );

    const outliers = quotes.filter(q =>
      q.premium < lowerBound || q.premium > upperBound
    );

    return {
      outliersRemoved: outliers.length,
      outliers,
      filteredQuotes,
      method: 'iqr',
    };
  }

  /**
   * Z-Score Method
   * Good for normally distributed data
   */
  private detectUsingZScore(quotes: RawQuote[]): AnomalyDetectionResult {
    const premiums = quotes.map(q => q.premium);
    const mean = this.calculateMean(premiums);
    const stdDev = this.calculateStandardDeviation(premiums, mean);

    const zScoreThreshold = 3.0; // Configurable

    const filteredQuotes = quotes.filter(q => {
      const zScore = Math.abs((q.premium - mean) / stdDev);
      return zScore <= zScoreThreshold;
    });

    const outliers = quotes.filter(q => {
      const zScore = Math.abs((q.premium - mean) / stdDev);
      return zScore > zScoreThreshold;
    });

    return {
      outliersRemoved: outliers.length,
      outliers,
      filteredQuotes,
      method: 'zscore',
    };
  }

  /**
   * Median Absolute Deviation (MAD) Method
   * Very robust to outliers
   */
  detectUsingMAD(quotes: RawQuote[]): AnomalyDetectionResult {
    const premiums = quotes.map(q => q.premium);
    const median = this.calculateMedian(premiums);

    const deviations = premiums.map(p => Math.abs(p - median));
    const mad = this.calculateMedian(deviations);

    const madThreshold = 3.5; // Configurable

    const filteredQuotes = quotes.filter(q => {
      const modifiedZ = 0.6745 * (q.premium - median) / mad;
      return Math.abs(modifiedZ) <= madThreshold;
    });

    const outliers = quotes.filter(q => {
      const modifiedZ = 0.6745 * (q.premium - median) / mad;
      return Math.abs(modifiedZ) > madThreshold;
    });

    return {
      outliersRemoved: outliers.length,
      outliers,
      filteredQuotes,
      method: 'mad',
    };
  }

  /**
   * Calculate percentile
   */
  private calculatePercentile(sortedArray: number[], percentile: number): number {
    const index = (percentile / 100) * (sortedArray.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;

    if (upper >= sortedArray.length) {
      return sortedArray[sortedArray.length - 1];
    }

    return sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight;
  }

  /**
   * Calculate mean
   */
  private calculateMean(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  /**
   * Calculate median
   */
  private calculateMedian(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
  }

  /**
   * Calculate standard deviation
   */
  private calculateStandardDeviation(values: number[], mean: number): number {
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    return Math.sqrt(avgSquaredDiff);
  }

  /**
   * Detect duplicates or very similar quotes
   */
  detectDuplicates(quotes: RawQuote[], similarityThreshold: number = 0.05): RawQuote[] {
    const uniqueQuotes: RawQuote[] = [];
    const seenPremiums: number[] = [];

    for (const quote of quotes) {
      const isDuplicate = seenPremiums.some(seen =>
        Math.abs((quote.premium - seen) / seen) < similarityThreshold
      );

      if (!isDuplicate) {
        uniqueQuotes.push(quote);
        seenPremiums.push(quote.premium);
      }
    }

    return uniqueQuotes;
  }

  /**
   * Validate quote data integrity
   */
  validateQuote(quote: RawQuote): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!quote.insurerId || quote.insurerId.trim() === '') {
      errors.push('Missing insurer ID');
    }

    if (!quote.providerName || quote.providerName.trim() === '') {
      errors.push('Missing provider name');
    }

    if (quote.premium <= 0 || quote.premium > 10000) {
      errors.push(`Invalid premium: ${quote.premium}`);
    }

    if (!quote.coverageDetails) {
      errors.push('Missing coverage details');
    }

    if (!quote.timestamp || isNaN(quote.timestamp.getTime())) {
      errors.push('Invalid timestamp');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
