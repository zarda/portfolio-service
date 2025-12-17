import { Portfolio } from '../models';

export type PortfolioVersion = 'default' | 'v2024' | string;

export class PortfolioRegistry {
  private static portfolios: Map<PortfolioVersion, Portfolio> = new Map();
  private static defaultVersion: PortfolioVersion = 'default';

  static register(version: PortfolioVersion, portfolio: Portfolio): void {
    this.portfolios.set(version, portfolio);
  }

  static get(version?: PortfolioVersion): Portfolio {
    const v = version ?? this.defaultVersion;
    const portfolio = this.portfolios.get(v);
    if (!portfolio) {
      throw new Error(`Portfolio version "${v}" not found`);
    }
    return portfolio;
  }

  static setDefault(version: PortfolioVersion): void {
    if (!this.portfolios.has(version)) {
      throw new Error(`Cannot set default: version "${version}" not registered`);
    }
    this.defaultVersion = version;
  }

  static getAvailableVersions(): PortfolioVersion[] {
    return Array.from(this.portfolios.keys());
  }

  static getVersionFromUrl(): PortfolioVersion | null {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('version') as PortfolioVersion | null;
  }

  static getDefaultVersion(): PortfolioVersion {
    return this.defaultVersion;
  }
}
