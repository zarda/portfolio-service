export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  season: Season;
  mode: ThemeMode;
}

type ThemeChangeListener = (theme: ThemeState) => void;

export interface IThemeManager {
  getTheme(): ThemeState;
  getSeason(): Season;
  getMode(): ThemeMode;
  setSeason(season: Season): void;
  setMode(mode: ThemeMode): void;
  toggleMode(): void;
  subscribe(listener: ThemeChangeListener): () => void;
}

export class ThemeManager implements IThemeManager {
  private season: Season;
  private mode: ThemeMode;
  private listeners: Set<ThemeChangeListener> = new Set();

  constructor(season?: Season, mode?: ThemeMode) {
    this.season = season ?? this.resolveInitialSeason();
    this.mode = mode ?? this.resolveInitialMode();
    this.applyToDOM();
  }

  private resolveInitialSeason(): Season {
    const urlSeason = this.getSeasonFromUrl();
    if (urlSeason) return urlSeason;

    const storedSeason = this.getStoredSeason();
    if (storedSeason) return storedSeason;

    return this.getCurrentSeasonByDate();
  }

  private resolveInitialMode(): ThemeMode {
    const storedMode = this.getStoredMode();
    if (storedMode) return storedMode;

    return this.getSystemThemeMode();
  }

  private getSeasonFromUrl(): Season | null {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const season = params.get('season')?.toLowerCase();
    if (season === 'spring' || season === 'summer' || season === 'autumn' || season === 'winter') {
      return season as Season;
    }
    return null;
  }

  private getCurrentSeasonByDate(): Season {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  }

  private getStoredSeason(): Season | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('theme-season') as Season | null;
  }

  private getStoredMode(): ThemeMode | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('theme-mode') as ThemeMode | null;
  }

  private getSystemThemeMode(): ThemeMode {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private storePreferences(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme-season', this.season);
    localStorage.setItem('theme-mode', this.mode);
  }

  private applyToDOM(): void {
    if (typeof document === 'undefined') return;

    document.body.classList.remove(
      'theme-spring',
      'theme-summer',
      'theme-autumn',
      'theme-winter',
      'dark-mode'
    );

    document.body.classList.add(`theme-${this.season}`);
    if (this.mode === 'dark') {
      document.body.classList.add('dark-mode');
    }

    this.storePreferences();
  }

  private notifyListeners(): void {
    const theme = this.getTheme();
    this.listeners.forEach((listener) => listener(theme));
  }

  getTheme(): ThemeState {
    return {
      season: this.season,
      mode: this.mode,
    };
  }

  getSeason(): Season {
    return this.season;
  }

  getMode(): ThemeMode {
    return this.mode;
  }

  setSeason(season: Season): void {
    this.season = season;
    this.applyToDOM();
    this.notifyListeners();
  }

  setMode(mode: ThemeMode): void {
    this.mode = mode;
    this.applyToDOM();
    this.notifyListeners();
  }

  toggleMode(): void {
    this.setMode(this.mode === 'light' ? 'dark' : 'light');
  }

  subscribe(listener: ThemeChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}
