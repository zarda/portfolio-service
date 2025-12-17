import { useState, useEffect, useCallback } from 'react';
import { PortfolioService, ThemeState, ThemeMode, Season } from '../services/PortfolioService';

export interface UseThemeResult {
  theme: ThemeState;
  season: Season;
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setSeason: (season: Season) => void;
}

export function useTheme(): UseThemeResult {
  const service = PortfolioService.getInstance();
  const [theme, setTheme] = useState<ThemeState>(service.getTheme());

  useEffect(() => {
    // Subscribe to theme changes
    const unsubscribe = service.subscribeToThemeChanges((newTheme) => {
      setTheme(newTheme);
    });

    return unsubscribe;
  }, [service]);

  const toggleMode = useCallback(() => {
    service.toggleMode();
  }, [service]);

  const setMode = useCallback(
    (mode: ThemeMode) => {
      service.setMode(mode);
    },
    [service]
  );

  const setSeason = useCallback(
    (season: Season) => {
      service.setSeason(season);
    },
    [service]
  );

  return {
    theme,
    season: theme.season,
    mode: theme.mode,
    toggleMode,
    setMode,
    setSeason,
  };
}
