/**
 * ThemeService - Strategy Pattern for theme management
 * Handles theme switching, persistence, and application
 */

import { Theme, ThemeMode, ThemePresetId, ThemeProps } from '../models/Theme';
import { getPreset, PRESET_INFO, PresetInfo } from '../presets';
import { ThemeBuilder } from './ThemeBuilder';

const STORAGE_KEY = 'portfolio-theme';
const CUSTOM_THEMES_KEY = 'portfolio-custom-themes';
const CUSTOM_THEME_PAIRS_KEY = 'portfolio-custom-theme-pairs';
const SEASONAL_THEMES_KEY = 'portfolio-seasonal-themes';

type ThemeChangeListener = (theme: Theme) => void;

// Maps a custom theme ID to its paired theme ID for the opposite mode
type ThemePairMap = Record<string, string>;

// Maps season to preferred theme preset ID
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type SeasonalThemeMap = Record<Season, ThemePresetId>;

const DEFAULT_SEASONAL_THEMES: SeasonalThemeMap = {
  spring: 'spring',
  summer: 'summer',
  autumn: 'autumn',
  winter: 'winter',
};

export interface IThemeService {
  getCurrentTheme(): Theme;
  getPresetId(): ThemePresetId;
  getMode(): ThemeMode;
  setPreset(presetId: ThemePresetId): void;
  setMode(mode: ThemeMode): void;
  toggleMode(): void;
  setTheme(theme: Theme): void;
  getAvailablePresets(): PresetInfo[];
  getCustomThemes(): Theme[];
  saveCustomTheme(theme: Theme): void;
  deleteCustomTheme(themeId: string): void;
  pairCustomThemes(lightThemeId: string, darkThemeId: string): void;
  unpairCustomTheme(themeId: string): void;
  getPairedThemeId(themeId: string): string | null;
  getSeasonalThemes(): SeasonalThemeMap;
  setSeasonalTheme(season: Season, presetId: ThemePresetId): void;
  subscribe(listener: ThemeChangeListener): () => void;
}

export class ThemeService implements IThemeService {
  private static instance: ThemeService | null = null;

  private currentTheme: Theme;
  private customThemes: Map<string, Theme> = new Map();
  private themePairs: ThemePairMap = {}; // Maps theme ID -> paired theme ID
  private seasonalThemes: SeasonalThemeMap = { ...DEFAULT_SEASONAL_THEMES };
  private listeners: Set<ThemeChangeListener> = new Set();

  private constructor() {
    // Load saved state
    this.loadCustomThemes();
    this.loadThemePairs();
    this.loadSeasonalThemes();
    this.currentTheme = this.resolveInitialTheme();
    this.applyTheme();
  }

  static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }

  static reset(): void {
    ThemeService.instance = null;
  }

  // ============ Theme Resolution ============

  private resolveInitialTheme(): Theme {
    // 1. Check URL params
    const urlTheme = this.getThemeFromUrl();
    if (urlTheme) return urlTheme;

    // 2. Check localStorage
    const storedTheme = this.getStoredTheme();
    if (storedTheme) return storedTheme;

    // 3. Auto-detect based on season and system preference
    return this.getAutoDetectedTheme();
  }

  private getThemeFromUrl(): Theme | null {
    if (typeof window === 'undefined') return null;

    const params = new URLSearchParams(window.location.search);

    // Check for preset ID
    const presetId = params.get('theme') as ThemePresetId | null;
    if (presetId && this.isValidPresetId(presetId)) {
      const mode = this.getSystemMode();
      return getPreset(presetId, mode);
    }

    // Check for season - use the configured seasonal theme
    const season = params.get('season')?.toLowerCase() as Season | undefined;
    if (season && ['spring', 'summer', 'autumn', 'winter'].includes(season)) {
      const mode = this.getSystemMode();
      const seasonalPresetId = this.seasonalThemes[season];
      return getPreset(seasonalPresetId, mode);
    }

    return null;
  }

  private getStoredTheme(): Theme | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const data = JSON.parse(stored) as { presetId: ThemePresetId; mode: ThemeMode; customThemeId?: string };

      // Check if it's a custom theme
      if (data.customThemeId) {
        const customTheme = this.customThemes.get(data.customThemeId);
        if (customTheme) return customTheme;
      }

      // Return preset theme
      return getPreset(data.presetId, data.mode);
    } catch {
      return null;
    }
  }

  private getAutoDetectedTheme(): Theme {
    const season = this.getCurrentSeason();
    const themePreset = this.seasonalThemes[season];
    const mode = this.getSystemMode();
    return getPreset(themePreset, mode);
  }

  private getCurrentSeason(): Season {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  }

  private getSystemMode(): ThemeMode {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private isValidPresetId(id: string): id is ThemePresetId {
    return [
      'default',
      'spring',
      'summer',
      'autumn',
      'winter',
      'professional',
      'creative',
      'ocean',
      'forest',
      'sunset',
      'midnight',
      'neon',
      'custom',
    ].includes(id);
  }

  // ============ Theme Application ============

  private applyTheme(): void {
    this.currentTheme.apply();
    this.storeTheme();
    this.notifyListeners();
  }

  private storeTheme(): void {
    if (typeof window === 'undefined') return;

    const data = {
      presetId: this.currentTheme.presetId,
      mode: this.currentTheme.mode,
      customThemeId: this.currentTheme.isCustom ? this.currentTheme.id : undefined,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.currentTheme));
  }

  // ============ Public API ============

  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  getPresetId(): ThemePresetId {
    return this.currentTheme.presetId;
  }

  getMode(): ThemeMode {
    return this.currentTheme.mode;
  }

  /**
   * Strategy Pattern: Switch to a different preset theme
   */
  setPreset(presetId: ThemePresetId): void {
    const mode = this.currentTheme.mode;
    this.currentTheme = getPreset(presetId, mode);
    this.applyTheme();
  }

  /**
   * Strategy Pattern: Switch between light and dark mode
   */
  setMode(mode: ThemeMode): void {
    if (this.currentTheme.isCustom) {
      // For custom themes, first check if there's a paired theme for this mode
      const pairedTheme = this.getPairedTheme(this.currentTheme.id, mode);
      if (pairedTheme) {
        this.currentTheme = pairedTheme;
      } else {
        // No paired custom theme - regenerate the theme for the new mode
        // This preserves the primary/accent colors but regenerates other colors for the new mode
        this.currentTheme = new ThemeBuilder()
          .setId(this.currentTheme.id)
          .setName(this.currentTheme.name)
          .setPresetId('custom')
          .setMode(mode)
          .setPrimaryColor(this.currentTheme.colors.primary)
          .setAccentColor(this.currentTheme.colors.accent)
          .setHeadingFont(this.currentTheme.typography.headingFont)
          .setBodyFont(this.currentTheme.typography.bodyFont)
          .build();
      }
    } else {
      this.currentTheme = getPreset(this.currentTheme.presetId, mode);
    }
    this.applyTheme();
  }

  /**
   * Get the paired theme for a different mode
   */
  private getPairedTheme(themeId: string, targetMode: ThemeMode): Theme | null {
    const pairedId = this.themePairs[themeId];
    if (pairedId) {
      const pairedTheme = this.customThemes.get(pairedId);
      if (pairedTheme && pairedTheme.mode === targetMode) {
        return pairedTheme;
      }
    }
    return null;
  }

  toggleMode(): void {
    const newMode = this.currentTheme.mode === 'light' ? 'dark' : 'light';
    this.setMode(newMode);
  }

  /**
   * Set a fully custom theme
   */
  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.applyTheme();
  }

  /**
   * Get available preset info for UI
   */
  getAvailablePresets(): PresetInfo[] {
    return [...PRESET_INFO];
  }

  // ============ Custom Theme Management ============

  private loadCustomThemes(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(CUSTOM_THEMES_KEY);
      if (!stored) return;

      const themes = JSON.parse(stored) as ThemeProps[];
      themes.forEach((props) => {
        const theme = Theme.fromJSON(props);
        this.customThemes.set(theme.id, theme);
      });
    } catch {
      // Ignore parse errors
    }
  }

  private saveCustomThemesToStorage(): void {
    if (typeof window === 'undefined') return;

    const themes = Array.from(this.customThemes.values()).map((t) => t.toJSON());
    localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(themes));
  }

  getCustomThemes(): Theme[] {
    return Array.from(this.customThemes.values());
  }

  saveCustomTheme(theme: Theme): void {
    this.customThemes.set(theme.id, theme);
    this.saveCustomThemesToStorage();
  }

  deleteCustomTheme(themeId: string): void {
    this.customThemes.delete(themeId);
    this.unpairCustomTheme(themeId);
    this.saveCustomThemesToStorage();

    // If currently using this theme, switch to default
    if (this.currentTheme.id === themeId) {
      this.setPreset('default');
    }
  }

  // ============ Theme Pairing ============

  private loadThemePairs(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(CUSTOM_THEME_PAIRS_KEY);
      if (!stored) return;
      this.themePairs = JSON.parse(stored) as ThemePairMap;
    } catch {
      // Ignore parse errors
    }
  }

  private saveThemePairsToStorage(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CUSTOM_THEME_PAIRS_KEY, JSON.stringify(this.themePairs));
  }

  /**
   * Pair two custom themes together (one light, one dark)
   * When switching modes, the paired theme will be used
   */
  pairCustomThemes(lightThemeId: string, darkThemeId: string): void {
    const lightTheme = this.customThemes.get(lightThemeId);
    const darkTheme = this.customThemes.get(darkThemeId);

    if (!lightTheme || !darkTheme) {
      throw new Error('Both themes must exist to pair them');
    }

    if (lightTheme.mode !== 'light' || darkTheme.mode !== 'dark') {
      throw new Error('Must pair a light theme with a dark theme');
    }

    // Create bidirectional pairing
    this.themePairs[lightThemeId] = darkThemeId;
    this.themePairs[darkThemeId] = lightThemeId;
    this.saveThemePairsToStorage();
  }

  /**
   * Remove pairing for a theme
   */
  unpairCustomTheme(themeId: string): void {
    const pairedId = this.themePairs[themeId];
    if (pairedId) {
      delete this.themePairs[pairedId];
    }
    delete this.themePairs[themeId];
    this.saveThemePairsToStorage();
  }

  /**
   * Get the paired theme ID for a given theme
   */
  getPairedThemeId(themeId: string): string | null {
    return this.themePairs[themeId] || null;
  }

  // ============ Seasonal Themes ============

  private loadSeasonalThemes(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(SEASONAL_THEMES_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<SeasonalThemeMap>;
      this.seasonalThemes = { ...DEFAULT_SEASONAL_THEMES, ...parsed };
    } catch {
      // Ignore parse errors
    }
  }

  private saveSeasonalThemesToStorage(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SEASONAL_THEMES_KEY, JSON.stringify(this.seasonalThemes));
  }

  /**
   * Get the current seasonal theme configuration
   */
  getSeasonalThemes(): SeasonalThemeMap {
    return { ...this.seasonalThemes };
  }

  /**
   * Set the theme for a specific season
   * Also applies the theme as a preview so user can see the change
   */
  setSeasonalTheme(season: Season, presetId: ThemePresetId): void {
    this.seasonalThemes[season] = presetId;
    this.saveSeasonalThemesToStorage();

    // Apply the theme as a preview so user can see it
    const mode = this.currentTheme.mode;
    this.currentTheme = getPreset(presetId, mode);
    this.applyTheme();
  }

  // ============ Subscription ============

  subscribe(listener: ThemeChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}
