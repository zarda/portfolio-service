export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type ThemeMode = 'light' | 'dark';

export interface SeasonConfig {
    name: string;
    emoji: string;
    months: number[]; // 1-12
}

export const SEASONS: Record<Season, SeasonConfig> = {
    spring: {
        name: 'Spring',
        emoji: '🌸',
        months: [3, 4, 5], // March, April, May
    },
    summer: {
        name: 'Summer',
        emoji: '☀️',
        months: [6, 7, 8], // June, July, August
    },
    autumn: {
        name: 'Autumn',
        emoji: '🍂',
        months: [9, 10, 11], // September, October, November
    },
    winter: {
        name: 'Winter',
        emoji: '❄️',
        months: [12, 1, 2], // December, January, February
    },
};

/**
 * Get the current season based on the current month (Northern Hemisphere)
 */
export function getCurrentSeason(): Season {
    const month = new Date().getMonth() + 1; // getMonth() returns 0-11

    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
}

/**
 * Get season from URL parameter (?season=spring|summer|autumn|winter)
 * Used for testing different seasonal themes
 */
export function getSeasonFromUrl(): Season | null {
    if (typeof window === 'undefined') return null;

    const params = new URLSearchParams(window.location.search);
    const season = params.get('season')?.toLowerCase();

    if (season === 'spring' || season === 'summer' || season === 'autumn' || season === 'winter') {
        return season as Season;
    }

    return null;
}

/**
 * Get the CSS class for the current theme
 */
export function getThemeClass(season: Season, mode: ThemeMode): string {
    const classes = [`theme-${season}`];
    if (mode === 'dark') {
        classes.push('dark-mode');
    }
    return classes.join(' ');
}

/**
 * Get stored theme preferences from localStorage
 */
export function getStoredThemePreferences(): { season: Season | null; mode: ThemeMode | null } {
    if (typeof window === 'undefined') {
        return { season: null, mode: null };
    }

    const storedSeason = localStorage.getItem('theme-season') as Season | null;
    const storedMode = localStorage.getItem('theme-mode') as ThemeMode | null;

    return { season: storedSeason, mode: storedMode };
}

/**
 * Store theme preferences to localStorage
 */
export function storeThemePreferences(season: Season, mode: ThemeMode): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem('theme-season', season);
    localStorage.setItem('theme-mode', mode);
}

/**
 * Get the initial theme mode based on system preference
 */
export function getSystemThemeMode(): ThemeMode {
    if (typeof window === 'undefined') return 'light';

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
