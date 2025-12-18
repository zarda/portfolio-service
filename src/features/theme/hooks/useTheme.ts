/**
 * useTheme Hook
 * React hook for accessing and managing theme state
 */

import { useState, useEffect, useCallback } from 'react';
import { ThemeService, Season, SeasonalThemeMap } from '../services/ThemeService';
import { Theme, ThemeMode, ThemePresetId } from '../models/Theme';
import { PresetInfo } from '../presets';

export interface UseThemeResult {
  theme: Theme;
  presetId: ThemePresetId;
  mode: ThemeMode;
  isDark: boolean;
  availablePresets: PresetInfo[];
  customThemes: Theme[];
  seasonalThemes: SeasonalThemeMap;
  setPreset: (presetId: ThemePresetId) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setTheme: (theme: Theme) => void;
  saveCustomTheme: (theme: Theme) => void;
  deleteCustomTheme: (themeId: string) => void;
  pairCustomThemes: (lightThemeId: string, darkThemeId: string) => void;
  unpairCustomTheme: (themeId: string) => void;
  getPairedThemeId: (themeId: string) => string | null;
  setSeasonalTheme: (season: Season, presetId: ThemePresetId) => void;
}

export function useTheme(): UseThemeResult {
  const service = ThemeService.getInstance();
  const [theme, setThemeState] = useState<Theme>(service.getCurrentTheme());
  const [customThemes, setCustomThemes] = useState<Theme[]>(service.getCustomThemes());
  const [seasonalThemes, setSeasonalThemesState] = useState<SeasonalThemeMap>(
    service.getSeasonalThemes()
  );

  useEffect(() => {
    // Subscribe to theme changes
    const unsubscribe = service.subscribe((newTheme) => {
      setThemeState(newTheme);
    });

    return unsubscribe;
  }, [service]);

  const setPreset = useCallback(
    (presetId: ThemePresetId) => {
      service.setPreset(presetId);
    },
    [service]
  );

  const setMode = useCallback(
    (mode: ThemeMode) => {
      service.setMode(mode);
    },
    [service]
  );

  const toggleMode = useCallback(() => {
    service.toggleMode();
  }, [service]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      service.setTheme(newTheme);
    },
    [service]
  );

  const saveCustomTheme = useCallback(
    (newTheme: Theme) => {
      service.saveCustomTheme(newTheme);
      setCustomThemes(service.getCustomThemes());
    },
    [service]
  );

  const deleteCustomTheme = useCallback(
    (themeId: string) => {
      service.deleteCustomTheme(themeId);
      setCustomThemes(service.getCustomThemes());
    },
    [service]
  );

  // Force re-render counter for pairing changes
  const [, forceUpdate] = useState(0);

  const pairCustomThemes = useCallback(
    (lightThemeId: string, darkThemeId: string) => {
      service.pairCustomThemes(lightThemeId, darkThemeId);
      forceUpdate((n) => n + 1);
    },
    [service]
  );

  const unpairCustomTheme = useCallback(
    (themeId: string) => {
      service.unpairCustomTheme(themeId);
      forceUpdate((n) => n + 1);
    },
    [service]
  );

  const getPairedThemeId = useCallback(
    (themeId: string) => {
      return service.getPairedThemeId(themeId);
    },
    [service]
  );

  const setSeasonalTheme = useCallback(
    (season: Season, presetId: ThemePresetId) => {
      service.setSeasonalTheme(season, presetId);
      setSeasonalThemesState(service.getSeasonalThemes());
    },
    [service]
  );

  return {
    theme,
    presetId: theme.presetId,
    mode: theme.mode,
    isDark: theme.isDark,
    availablePresets: service.getAvailablePresets(),
    customThemes,
    seasonalThemes,
    setPreset,
    setMode,
    toggleMode,
    setTheme,
    saveCustomTheme,
    deleteCustomTheme,
    pairCustomThemes,
    unpairCustomTheme,
    getPairedThemeId,
    setSeasonalTheme,
  };
}
