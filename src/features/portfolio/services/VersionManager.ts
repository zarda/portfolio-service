import { PortfolioRegistry, PortfolioVersion } from '../data/PortfolioRegistry';
import { Profile, SkillCategory, Project, ContactInfo, Portfolio } from '../models';

export interface IVersionManager {
  getCurrentVersion(): PortfolioVersion;
  getAvailableVersions(): PortfolioVersion[];
  switchVersion(version: PortfolioVersion): void;
  getPortfolio(): Portfolio;
  getProfile(): Profile;
  getSkillCategories(): SkillCategory[];
  getProjects(): Project[];
  getContactInfo(): ContactInfo;
}

export class VersionManager implements IVersionManager {
  private currentVersion: PortfolioVersion;

  constructor(version?: PortfolioVersion) {
    this.currentVersion =
      version ?? PortfolioRegistry.getVersionFromUrl() ?? PortfolioRegistry.getDefaultVersion();
  }

  getCurrentVersion(): PortfolioVersion {
    return this.currentVersion;
  }

  getAvailableVersions(): PortfolioVersion[] {
    return PortfolioRegistry.getAvailableVersions();
  }

  switchVersion(version: PortfolioVersion): void {
    this.currentVersion = version;
  }

  private get portfolio(): Portfolio {
    return PortfolioRegistry.get(this.currentVersion);
  }

  getPortfolio(): Portfolio {
    return this.portfolio;
  }

  getProfile(): Profile {
    return this.portfolio.profile;
  }

  getSkillCategories(): SkillCategory[] {
    return this.portfolio.skillCategories;
  }

  getProjects(): Project[] {
    return this.portfolio.projects;
  }

  getContactInfo(): ContactInfo {
    return this.portfolio.contactInfo;
  }
}
