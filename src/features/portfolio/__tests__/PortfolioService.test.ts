import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PortfolioService } from '../services/PortfolioService';
import { PortfolioRegistry } from '../data/PortfolioRegistry';

describe('PortfolioService', () => {
  describe('Version Management', () => {
    it('should be initialized with default version (hengtai25)', () => {
      const service = PortfolioService.getInstance();
      expect(service.getCurrentVersion()).toBe('hengtai25');
    });

    it('should list all available versions', () => {
      const service = PortfolioService.getInstance();
      const versions = service.getAvailableVersions();

      expect(versions).toContain('hengtai25');
      expect(versions).toContain('demo');
      expect(versions.length).toBe(2);
    });

    it('should switch between versions', () => {
      const service = PortfolioService.getInstance();

      // Start with default
      expect(service.getCurrentVersion()).toBe('hengtai25');

      // Switch to demo
      service.switchVersion('demo');
      expect(service.getCurrentVersion()).toBe('demo');

      // Verify demo data is returned
      const profile = service.getProfile();
      expect(profile.name).toBe('Demo User');

      // Switch back to hengtai25
      service.switchVersion('hengtai25');
      expect(service.getCurrentVersion()).toBe('hengtai25');

      // Verify hengtai25 data is returned
      const hengtaiProfile = service.getProfile();
      expect(hengtaiProfile.name).toBe('Hengtai Jan');
    });

    it('should return different data for different versions', () => {
      const service = PortfolioService.getInstance();

      // Get hengtai25 data
      service.switchVersion('hengtai25');
      const hengtaiProfile = service.getProfile();
      const hengtaiProjects = service.getProjects();

      // Get demo data
      service.switchVersion('demo');
      const demoProfile = service.getProfile();
      const demoProjects = service.getProjects();

      // Verify data is different
      expect(hengtaiProfile.name).not.toBe(demoProfile.name);
      expect(hengtaiProjects[0].title).not.toBe(demoProjects[0].title);

      // Reset to default for other tests
      service.switchVersion('hengtai25');
    });
  });

  describe('Data Access', () => {
    it('should return profile data', () => {
      const service = PortfolioService.getInstance();
      const profile = service.getProfile();

      expect(profile.name).toBeDefined();
      expect(profile.title).toBeDefined();
      expect(profile.aboutParagraphs.length).toBeGreaterThan(0);
      expect(profile.stats.length).toBeGreaterThan(0);
    });

    it('should return skill categories', () => {
      const service = PortfolioService.getInstance();
      const skillCategories = service.getSkillCategories();

      expect(skillCategories.length).toBeGreaterThan(0);
      skillCategories.forEach((category) => {
        expect(category.category).toBeDefined();
        expect(category.skills.length).toBeGreaterThan(0);
        category.skills.forEach((skill) => {
          expect(skill.name).toBeDefined();
          expect(skill.level).toBeGreaterThanOrEqual(0);
          expect(skill.level).toBeLessThanOrEqual(100);
        });
      });
    });

    it('should return projects', () => {
      const service = PortfolioService.getInstance();
      const projects = service.getProjects();

      expect(projects.length).toBeGreaterThan(0);
      projects.forEach((project) => {
        expect(project.title).toBeDefined();
        expect(project.description).toBeDefined();
        expect(project.tags.length).toBeGreaterThan(0);
        expect(project.liveUrl).toBeDefined();
      });
    });

    it('should return contact info', () => {
      const service = PortfolioService.getInstance();
      const contactInfo = service.getContactInfo();

      expect(contactInfo.email).toBeDefined();
      expect(contactInfo.location).toBeDefined();
      expect(contactInfo.socialLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Theme Management', () => {
    it('should return current theme state', () => {
      const service = PortfolioService.getInstance();
      const theme = service.getTheme();

      expect(theme.season).toBeDefined();
      expect(theme.mode).toBeDefined();
      expect(['spring', 'summer', 'autumn', 'winter']).toContain(theme.season);
      expect(['light', 'dark']).toContain(theme.mode);
    });

    it('should get season and mode separately', () => {
      const service = PortfolioService.getInstance();

      const season = service.getSeason();
      const mode = service.getMode();

      expect(['spring', 'summer', 'autumn', 'winter']).toContain(season);
      expect(['light', 'dark']).toContain(mode);
    });

    it('should toggle mode between light and dark', () => {
      const service = PortfolioService.getInstance();
      const initialMode = service.getMode();

      service.toggleMode();
      const toggledMode = service.getMode();

      expect(toggledMode).not.toBe(initialMode);
      expect(['light', 'dark']).toContain(toggledMode);

      // Toggle back
      service.toggleMode();
      expect(service.getMode()).toBe(initialMode);
    });

    it('should set mode directly', () => {
      const service = PortfolioService.getInstance();
      const initialMode = service.getMode();

      service.setMode('dark');
      expect(service.getMode()).toBe('dark');

      service.setMode('light');
      expect(service.getMode()).toBe('light');

      // Restore initial mode
      service.setMode(initialMode);
    });

    it('should set season directly', () => {
      const service = PortfolioService.getInstance();
      const initialSeason = service.getSeason();

      service.setSeason('spring');
      expect(service.getSeason()).toBe('spring');

      service.setSeason('winter');
      expect(service.getSeason()).toBe('winter');

      // Restore initial season
      service.setSeason(initialSeason);
    });

    it('should notify listeners on theme change', () => {
      const service = PortfolioService.getInstance();
      const listener = vi.fn();

      const unsubscribe = service.subscribeToThemeChanges(listener);

      service.toggleMode();
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(service.getTheme());

      service.setSeason('summer');
      expect(listener).toHaveBeenCalledTimes(2);

      unsubscribe();

      // Should not be called after unsubscribe
      service.toggleMode();
      expect(listener).toHaveBeenCalledTimes(2);

      // Clean up
      service.toggleMode(); // restore original mode
    });
  });
});

describe('PortfolioRegistry', () => {
  it('should throw error for non-existent version', () => {
    expect(() => {
      PortfolioRegistry.get('non-existent-version');
    }).toThrow('Portfolio version "non-existent-version" not found');
  });

  it('should return correct default version', () => {
    expect(PortfolioRegistry.getDefaultVersion()).toBe('hengtai25');
  });

  it('should throw error when setting non-existent version as default', () => {
    expect(() => {
      PortfolioRegistry.setDefault('invalid-version');
    }).toThrow('Cannot set default: version "invalid-version" not registered');
  });
});
