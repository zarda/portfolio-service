import { PortfolioVersion } from '../data/PortfolioRegistry';
import { Profile, SkillCategory, Project, ContactInfo, Portfolio } from '../models';
import { ThemeManager, IThemeManager, ThemeState, Season, ThemeMode } from './ThemeManager';
import { VersionManager, IVersionManager } from './VersionManager';

// Re-export types for backwards compatibility
export type { Season, ThemeMode, ThemeState } from './ThemeManager';

type ThemeChangeListener = (theme: ThemeState) => void;

export interface PortfolioServiceConfig {
  version?: PortfolioVersion;
  season?: Season;
  mode?: ThemeMode;
  themeManager?: IThemeManager;
  versionManager?: IVersionManager;
}

export class PortfolioService {
  private static instance: PortfolioService | null = null;

  private readonly themeManager: IThemeManager;
  private readonly versionManager: IVersionManager;

  private constructor(config: PortfolioServiceConfig = {}) {
    this.themeManager = config.themeManager ?? new ThemeManager(config.season, config.mode);
    this.versionManager = config.versionManager ?? new VersionManager(config.version);
  }

  static initialize(config: PortfolioServiceConfig = {}): void {
    PortfolioService.instance = new PortfolioService(config);
  }

  static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      throw new Error('PortfolioService not initialized. Call PortfolioService.initialize() first.');
    }
    return PortfolioService.instance;
  }

  static isInitialized(): boolean {
    return PortfolioService.instance !== null;
  }

  // For testing: allows resetting the singleton
  static reset(): void {
    PortfolioService.instance = null;
  }

  // ============ Version Management (delegated) ============

  switchVersion(version: PortfolioVersion): void {
    this.versionManager.switchVersion(version);
  }

  getCurrentVersion(): PortfolioVersion {
    return this.versionManager.getCurrentVersion();
  }

  getAvailableVersions(): PortfolioVersion[] {
    return this.versionManager.getAvailableVersions();
  }

  // ============ Portfolio Data (delegated) ============

  getProfile(): Profile {
    return this.versionManager.getProfile();
  }

  getSkillCategories(): SkillCategory[] {
    return this.versionManager.getSkillCategories();
  }

  getProjects(): Project[] {
    return this.versionManager.getProjects();
  }

  getContactInfo(): ContactInfo {
    return this.versionManager.getContactInfo();
  }

  getPortfolio(): Portfolio {
    return this.versionManager.getPortfolio();
  }

  // ============ Theme Management (delegated) ============

  getTheme(): ThemeState {
    return this.themeManager.getTheme();
  }

  getSeason(): Season {
    return this.themeManager.getSeason();
  }

  getMode(): ThemeMode {
    return this.themeManager.getMode();
  }

  setSeason(season: Season): void {
    this.themeManager.setSeason(season);
  }

  setMode(mode: ThemeMode): void {
    this.themeManager.setMode(mode);
  }

  toggleMode(): void {
    this.themeManager.toggleMode();
  }

  subscribeToThemeChanges(listener: ThemeChangeListener): () => void {
    return this.themeManager.subscribe(listener);
  }
}
