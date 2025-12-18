/**
 * Theme Presets
 * Pre-defined themes using the Strategy pattern
 */

import { Theme, ThemeProps, ThemePresetId } from '../models/Theme';
import { Typography } from '../models/Typography';

const defaultTypography = Typography.default().toJSON();

/**
 * Default Theme (Indigo/Pink)
 */
export const defaultLightPreset: ThemeProps = {
  id: 'preset-default-light',
  name: 'Default',
  presetId: 'default',
  mode: 'light',
  colors: {
    primary: '#6366f1',
    primaryLight: '#818cf8',
    primaryDark: '#4f46e5',
    primaryRgb: '99, 102, 241',

    accent: '#ec4899',
    accentLight: '#f472b6',
    accentDark: '#db2777',

    secondary: '#64748b',
    secondaryLight: '#94a3b8',

    background: '#ffffff',
    backgroundAlt: '#f8fafc',
    backgroundElevated: '#ffffff',

    text: '#1e293b',
    textLight: '#64748b',
    textMuted: '#94a3b8',

    border: '#e2e8f0',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const defaultDarkPreset: ThemeProps = {
  id: 'preset-default-dark',
  name: 'Default Dark',
  presetId: 'default',
  mode: 'dark',
  colors: {
    primary: '#818cf8',
    primaryLight: '#a5b4fc',
    primaryDark: '#6366f1',
    primaryRgb: '129, 140, 248',

    accent: '#f472b6',
    accentLight: '#f9a8d4',
    accentDark: '#ec4899',

    secondary: '#94a3b8',
    secondaryLight: '#cbd5e1',

    background: '#0f172a',
    backgroundAlt: '#1e293b',
    backgroundElevated: '#334155',

    text: '#f1f5f9',
    textLight: '#94a3b8',
    textMuted: '#64748b',

    border: '#334155',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Spring Theme - Cherry blossoms, fresh greens
 */
export const springLightPreset: ThemeProps = {
  id: 'preset-spring-light',
  name: 'Spring',
  presetId: 'spring',
  mode: 'light',
  colors: {
    primary: '#ec4899',
    primaryLight: '#f472b6',
    primaryDark: '#db2777',
    primaryRgb: '236, 72, 153',

    accent: '#22c55e',
    accentLight: '#4ade80',
    accentDark: '#16a34a',

    secondary: '#a78bfa',
    secondaryLight: '#c4b5fd',

    background: '#ffffff',
    backgroundAlt: '#fdf2f8',
    backgroundElevated: '#ffffff',

    text: '#1e293b',
    textLight: '#64748b',
    textMuted: '#94a3b8',

    border: '#fce7f3',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const springDarkPreset: ThemeProps = {
  id: 'preset-spring-dark',
  name: 'Spring Dark',
  presetId: 'spring',
  mode: 'dark',
  colors: {
    primary: '#f472b6',
    primaryLight: '#f9a8d4',
    primaryDark: '#ec4899',
    primaryRgb: '244, 114, 182',

    accent: '#4ade80',
    accentLight: '#86efac',
    accentDark: '#22c55e',

    secondary: '#c4b5fd',
    secondaryLight: '#ddd6fe',

    background: '#1a0f1e',
    backgroundAlt: '#2d1f33',
    backgroundElevated: '#3d2a45',

    text: '#f1f5f9',
    textLight: '#94a3b8',
    textMuted: '#64748b',

    border: '#3d2a45',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Summer Theme - Coral, teal, sunny vibes
 */
export const summerLightPreset: ThemeProps = {
  id: 'preset-summer-light',
  name: 'Summer',
  presetId: 'summer',
  mode: 'light',
  colors: {
    primary: '#f97316',
    primaryLight: '#fb923c',
    primaryDark: '#ea580c',
    primaryRgb: '249, 115, 22',

    accent: '#06b6d4',
    accentLight: '#22d3ee',
    accentDark: '#0891b2',

    secondary: '#eab308',
    secondaryLight: '#facc15',

    background: '#ffffff',
    backgroundAlt: '#fff7ed',
    backgroundElevated: '#ffffff',

    text: '#1e293b',
    textLight: '#64748b',
    textMuted: '#94a3b8',

    border: '#fed7aa',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const summerDarkPreset: ThemeProps = {
  id: 'preset-summer-dark',
  name: 'Summer Dark',
  presetId: 'summer',
  mode: 'dark',
  colors: {
    primary: '#fb923c',
    primaryLight: '#fdba74',
    primaryDark: '#f97316',
    primaryRgb: '251, 146, 60',

    accent: '#22d3ee',
    accentLight: '#67e8f9',
    accentDark: '#06b6d4',

    secondary: '#facc15',
    secondaryLight: '#fde047',

    background: '#0c1929',
    backgroundAlt: '#1a2d3d',
    backgroundElevated: '#2a3d4d',

    text: '#f1f5f9',
    textLight: '#94a3b8',
    textMuted: '#64748b',

    border: '#2a3d4d',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Autumn Theme - Amber, rust, warm browns
 */
export const autumnLightPreset: ThemeProps = {
  id: 'preset-autumn-light',
  name: 'Autumn',
  presetId: 'autumn',
  mode: 'light',
  colors: {
    primary: '#d97706',
    primaryLight: '#f59e0b',
    primaryDark: '#b45309',
    primaryRgb: '217, 119, 6',

    accent: '#dc2626',
    accentLight: '#ef4444',
    accentDark: '#b91c1c',

    secondary: '#78350f',
    secondaryLight: '#92400e',

    background: '#ffffff',
    backgroundAlt: '#fffbeb',
    backgroundElevated: '#ffffff',

    text: '#1e293b',
    textLight: '#64748b',
    textMuted: '#94a3b8',

    border: '#fde68a',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const autumnDarkPreset: ThemeProps = {
  id: 'preset-autumn-dark',
  name: 'Autumn Dark',
  presetId: 'autumn',
  mode: 'dark',
  colors: {
    primary: '#f59e0b',
    primaryLight: '#fbbf24',
    primaryDark: '#d97706',
    primaryRgb: '245, 158, 11',

    accent: '#ef4444',
    accentLight: '#f87171',
    accentDark: '#dc2626',

    secondary: '#92400e',
    secondaryLight: '#a16207',

    background: '#1c1412',
    backgroundAlt: '#2d2420',
    backgroundElevated: '#3d342f',

    text: '#f1f5f9',
    textLight: '#94a3b8',
    textMuted: '#64748b',

    border: '#3d342f',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Winter Theme - Ice blue, silver, cool tones
 */
export const winterLightPreset: ThemeProps = {
  id: 'preset-winter-light',
  name: 'Winter',
  presetId: 'winter',
  mode: 'light',
  colors: {
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    primaryDark: '#2563eb',
    primaryRgb: '59, 130, 246',

    accent: '#8b5cf6',
    accentLight: '#a78bfa',
    accentDark: '#7c3aed',

    secondary: '#64748b',
    secondaryLight: '#94a3b8',

    background: '#ffffff',
    backgroundAlt: '#f0f9ff',
    backgroundElevated: '#ffffff',

    text: '#1e293b',
    textLight: '#64748b',
    textMuted: '#94a3b8',

    border: '#bfdbfe',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const winterDarkPreset: ThemeProps = {
  id: 'preset-winter-dark',
  name: 'Winter Dark',
  presetId: 'winter',
  mode: 'dark',
  colors: {
    primary: '#60a5fa',
    primaryLight: '#93c5fd',
    primaryDark: '#3b82f6',
    primaryRgb: '96, 165, 250',

    accent: '#a78bfa',
    accentLight: '#c4b5fd',
    accentDark: '#8b5cf6',

    secondary: '#94a3b8',
    secondaryLight: '#cbd5e1',

    background: '#0c1222',
    backgroundAlt: '#1a2535',
    backgroundElevated: '#2a3545',

    text: '#f1f5f9',
    textLight: '#94a3b8',
    textMuted: '#64748b',

    border: '#2a3545',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Professional Theme - Slate, minimal
 */
export const professionalLightPreset: ThemeProps = {
  id: 'preset-professional-light',
  name: 'Professional',
  presetId: 'professional',
  mode: 'light',
  colors: {
    primary: '#475569',
    primaryLight: '#64748b',
    primaryDark: '#334155',
    primaryRgb: '71, 85, 105',

    accent: '#0ea5e9',
    accentLight: '#38bdf8',
    accentDark: '#0284c7',

    secondary: '#64748b',
    secondaryLight: '#94a3b8',

    background: '#ffffff',
    backgroundAlt: '#f8fafc',
    backgroundElevated: '#ffffff',

    text: '#1e293b',
    textLight: '#64748b',
    textMuted: '#94a3b8',

    border: '#e2e8f0',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const professionalDarkPreset: ThemeProps = {
  id: 'preset-professional-dark',
  name: 'Professional Dark',
  presetId: 'professional',
  mode: 'dark',
  colors: {
    primary: '#94a3b8',
    primaryLight: '#cbd5e1',
    primaryDark: '#64748b',
    primaryRgb: '148, 163, 184',

    accent: '#38bdf8',
    accentLight: '#7dd3fc',
    accentDark: '#0ea5e9',

    secondary: '#94a3b8',
    secondaryLight: '#cbd5e1',

    background: '#0f172a',
    backgroundAlt: '#1e293b',
    backgroundElevated: '#334155',

    text: '#f1f5f9',
    textLight: '#94a3b8',
    textMuted: '#64748b',

    border: '#334155',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Creative Theme - Vibrant purple/pink
 */
export const creativeLightPreset: ThemeProps = {
  id: 'preset-creative-light',
  name: 'Creative',
  presetId: 'creative',
  mode: 'light',
  colors: {
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    primaryDark: '#7c3aed',
    primaryRgb: '139, 92, 246',

    accent: '#f43f5e',
    accentLight: '#fb7185',
    accentDark: '#e11d48',

    secondary: '#06b6d4',
    secondaryLight: '#22d3ee',

    background: '#ffffff',
    backgroundAlt: '#faf5ff',
    backgroundElevated: '#ffffff',

    text: '#1e293b',
    textLight: '#64748b',
    textMuted: '#94a3b8',

    border: '#e9d5ff',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const creativeDarkPreset: ThemeProps = {
  id: 'preset-creative-dark',
  name: 'Creative Dark',
  presetId: 'creative',
  mode: 'dark',
  colors: {
    primary: '#a78bfa',
    primaryLight: '#c4b5fd',
    primaryDark: '#8b5cf6',
    primaryRgb: '167, 139, 250',

    accent: '#fb7185',
    accentLight: '#fda4af',
    accentDark: '#f43f5e',

    secondary: '#22d3ee',
    secondaryLight: '#67e8f9',

    background: '#1a1625',
    backgroundAlt: '#2d2438',
    backgroundElevated: '#3d344a',

    text: '#f1f5f9',
    textLight: '#94a3b8',
    textMuted: '#64748b',

    border: '#3d344a',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Ocean Theme - Deep blues and teals
 */
export const oceanLightPreset: ThemeProps = {
  id: 'preset-ocean-light',
  name: 'Ocean',
  presetId: 'ocean',
  mode: 'light',
  colors: {
    primary: '#0891b2',
    primaryLight: '#22d3ee',
    primaryDark: '#0e7490',
    primaryRgb: '8, 145, 178',

    accent: '#0d9488',
    accentLight: '#2dd4bf',
    accentDark: '#0f766e',

    secondary: '#64748b',
    secondaryLight: '#94a3b8',

    background: '#ffffff',
    backgroundAlt: '#ecfeff',
    backgroundElevated: '#ffffff',

    text: '#164e63',
    textLight: '#0e7490',
    textMuted: '#67e8f9',

    border: '#a5f3fc',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const oceanDarkPreset: ThemeProps = {
  id: 'preset-ocean-dark',
  name: 'Ocean Dark',
  presetId: 'ocean',
  mode: 'dark',
  colors: {
    primary: '#22d3ee',
    primaryLight: '#67e8f9',
    primaryDark: '#0891b2',
    primaryRgb: '34, 211, 238',

    accent: '#2dd4bf',
    accentLight: '#5eead4',
    accentDark: '#0d9488',

    secondary: '#94a3b8',
    secondaryLight: '#cbd5e1',

    background: '#083344',
    backgroundAlt: '#0c4a5e',
    backgroundElevated: '#155e75',

    text: '#ecfeff',
    textLight: '#a5f3fc',
    textMuted: '#67e8f9',

    border: '#155e75',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Forest Theme - Natural greens and earth tones
 */
export const forestLightPreset: ThemeProps = {
  id: 'preset-forest-light',
  name: 'Forest',
  presetId: 'forest',
  mode: 'light',
  colors: {
    primary: '#15803d',
    primaryLight: '#22c55e',
    primaryDark: '#166534',
    primaryRgb: '21, 128, 61',

    accent: '#ca8a04',
    accentLight: '#eab308',
    accentDark: '#a16207',

    secondary: '#57534e',
    secondaryLight: '#78716c',

    background: '#ffffff',
    backgroundAlt: '#f0fdf4',
    backgroundElevated: '#ffffff',

    text: '#14532d',
    textLight: '#166534',
    textMuted: '#86efac',

    border: '#bbf7d0',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const forestDarkPreset: ThemeProps = {
  id: 'preset-forest-dark',
  name: 'Forest Dark',
  presetId: 'forest',
  mode: 'dark',
  colors: {
    primary: '#22c55e',
    primaryLight: '#4ade80',
    primaryDark: '#15803d',
    primaryRgb: '34, 197, 94',

    accent: '#eab308',
    accentLight: '#facc15',
    accentDark: '#ca8a04',

    secondary: '#a8a29e',
    secondaryLight: '#d6d3d1',

    background: '#14532d',
    backgroundAlt: '#166534',
    backgroundElevated: '#15803d',

    text: '#f0fdf4',
    textLight: '#bbf7d0',
    textMuted: '#86efac',

    border: '#15803d',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Sunset Theme - Warm oranges, pinks, and purples
 */
export const sunsetLightPreset: ThemeProps = {
  id: 'preset-sunset-light',
  name: 'Sunset',
  presetId: 'sunset',
  mode: 'light',
  colors: {
    primary: '#ea580c',
    primaryLight: '#f97316',
    primaryDark: '#c2410c',
    primaryRgb: '234, 88, 12',

    accent: '#db2777',
    accentLight: '#ec4899',
    accentDark: '#be185d',

    secondary: '#78716c',
    secondaryLight: '#a8a29e',

    background: '#ffffff',
    backgroundAlt: '#fff7ed',
    backgroundElevated: '#ffffff',

    text: '#431407',
    textLight: '#9a3412',
    textMuted: '#fdba74',

    border: '#fed7aa',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const sunsetDarkPreset: ThemeProps = {
  id: 'preset-sunset-dark',
  name: 'Sunset Dark',
  presetId: 'sunset',
  mode: 'dark',
  colors: {
    primary: '#fb923c',
    primaryLight: '#fdba74',
    primaryDark: '#ea580c',
    primaryRgb: '251, 146, 60',

    accent: '#f472b6',
    accentLight: '#f9a8d4',
    accentDark: '#db2777',

    secondary: '#a8a29e',
    secondaryLight: '#d6d3d1',

    background: '#431407',
    backgroundAlt: '#7c2d12',
    backgroundElevated: '#9a3412',

    text: '#fff7ed',
    textLight: '#fed7aa',
    textMuted: '#fdba74',

    border: '#9a3412',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Midnight Theme - Deep purples and blues with gold accents
 */
export const midnightLightPreset: ThemeProps = {
  id: 'preset-midnight-light',
  name: 'Midnight',
  presetId: 'midnight',
  mode: 'light',
  colors: {
    primary: '#4c1d95',
    primaryLight: '#7c3aed',
    primaryDark: '#3b0764',
    primaryRgb: '76, 29, 149',

    accent: '#ca8a04',
    accentLight: '#eab308',
    accentDark: '#a16207',

    secondary: '#64748b',
    secondaryLight: '#94a3b8',

    background: '#ffffff',
    backgroundAlt: '#faf5ff',
    backgroundElevated: '#ffffff',

    text: '#2e1065',
    textLight: '#4c1d95',
    textMuted: '#c4b5fd',

    border: '#e9d5ff',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const midnightDarkPreset: ThemeProps = {
  id: 'preset-midnight-dark',
  name: 'Midnight Dark',
  presetId: 'midnight',
  mode: 'dark',
  colors: {
    primary: '#a78bfa',
    primaryLight: '#c4b5fd',
    primaryDark: '#7c3aed',
    primaryRgb: '167, 139, 250',

    accent: '#fbbf24',
    accentLight: '#fcd34d',
    accentDark: '#f59e0b',

    secondary: '#94a3b8',
    secondaryLight: '#cbd5e1',

    background: '#0f0720',
    backgroundAlt: '#1e1033',
    backgroundElevated: '#2e1a4a',

    text: '#f5f3ff',
    textLight: '#c4b5fd',
    textMuted: '#a78bfa',

    border: '#2e1a4a',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * Neon Theme - Vibrant cyberpunk colors
 */
export const neonLightPreset: ThemeProps = {
  id: 'preset-neon-light',
  name: 'Neon',
  presetId: 'neon',
  mode: 'light',
  colors: {
    primary: '#d946ef',
    primaryLight: '#e879f9',
    primaryDark: '#c026d3',
    primaryRgb: '217, 70, 239',

    accent: '#06b6d4',
    accentLight: '#22d3ee',
    accentDark: '#0891b2',

    secondary: '#64748b',
    secondaryLight: '#94a3b8',

    background: '#ffffff',
    backgroundAlt: '#fdf4ff',
    backgroundElevated: '#ffffff',

    text: '#701a75',
    textLight: '#a21caf',
    textMuted: '#f0abfc',

    border: '#f5d0fe',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

export const neonDarkPreset: ThemeProps = {
  id: 'preset-neon-dark',
  name: 'Neon Dark',
  presetId: 'neon',
  mode: 'dark',
  colors: {
    primary: '#e879f9',
    primaryLight: '#f0abfc',
    primaryDark: '#d946ef',
    primaryRgb: '232, 121, 249',

    accent: '#22d3ee',
    accentLight: '#67e8f9',
    accentDark: '#06b6d4',

    secondary: '#94a3b8',
    secondaryLight: '#cbd5e1',

    background: '#0a0a0a',
    backgroundAlt: '#171717',
    backgroundElevated: '#262626',

    text: '#fdf4ff',
    textLight: '#f5d0fe',
    textMuted: '#d946ef',

    border: '#262626',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  typography: defaultTypography,
};

/**
 * All available presets
 */
export const ALL_PRESETS: ThemeProps[] = [
  defaultLightPreset,
  defaultDarkPreset,
  springLightPreset,
  springDarkPreset,
  summerLightPreset,
  summerDarkPreset,
  autumnLightPreset,
  autumnDarkPreset,
  winterLightPreset,
  winterDarkPreset,
  professionalLightPreset,
  professionalDarkPreset,
  creativeLightPreset,
  creativeDarkPreset,
  oceanLightPreset,
  oceanDarkPreset,
  forestLightPreset,
  forestDarkPreset,
  sunsetLightPreset,
  sunsetDarkPreset,
  midnightLightPreset,
  midnightDarkPreset,
  neonLightPreset,
  neonDarkPreset,
];

/**
 * Get preset by ID
 */
export function getPresetById(id: string): ThemeProps | undefined {
  return ALL_PRESETS.find((preset) => preset.id === id);
}

/**
 * Get presets by preset ID (both light and dark)
 */
export function getPresetsByPresetId(presetId: ThemePresetId): ThemeProps[] {
  return ALL_PRESETS.filter((preset) => preset.presetId === presetId);
}

/**
 * Get preset by preset ID and mode
 */
export function getPreset(presetId: ThemePresetId, mode: 'light' | 'dark'): Theme {
  const preset = ALL_PRESETS.find((p) => p.presetId === presetId && p.mode === mode);
  if (!preset) {
    // Fallback to default
    const fallback = mode === 'light' ? defaultLightPreset : defaultDarkPreset;
    return new Theme(fallback);
  }
  return new Theme(preset);
}

/**
 * Get all light presets
 */
export function getLightPresets(): ThemeProps[] {
  return ALL_PRESETS.filter((preset) => preset.mode === 'light');
}

/**
 * Get all dark presets
 */
export function getDarkPresets(): ThemeProps[] {
  return ALL_PRESETS.filter((preset) => preset.mode === 'dark');
}

/**
 * Preset metadata for UI display
 */
export interface PresetInfo {
  id: ThemePresetId;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  lightBackground: string;
  darkBackground: string;
}

export const PRESET_INFO: PresetInfo[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Modern indigo and pink gradient',
    primaryColor: '#6366f1',
    accentColor: '#ec4899',
    lightBackground: '#f8fafc', // backgroundAlt from defaultLightPreset
    darkBackground: '#0f172a',
  },
  {
    id: 'spring',
    name: 'Spring',
    description: 'Cherry blossoms and fresh greens',
    primaryColor: '#ec4899',
    accentColor: '#22c55e',
    lightBackground: '#fdf2f8', // backgroundAlt - light pink tint
    darkBackground: '#1a0f1e',
  },
  {
    id: 'summer',
    name: 'Summer',
    description: 'Warm coral and cool teal',
    primaryColor: '#f97316',
    accentColor: '#06b6d4',
    lightBackground: '#fff7ed', // backgroundAlt - warm orange tint
    darkBackground: '#0c1929',
  },
  {
    id: 'autumn',
    name: 'Autumn',
    description: 'Amber and warm rust tones',
    primaryColor: '#d97706',
    accentColor: '#dc2626',
    lightBackground: '#fffbeb', // backgroundAlt - amber tint
    darkBackground: '#1c1412',
  },
  {
    id: 'winter',
    name: 'Winter',
    description: 'Ice blue and silver',
    primaryColor: '#3b82f6',
    accentColor: '#8b5cf6',
    lightBackground: '#f0f9ff', // backgroundAlt - ice blue tint
    darkBackground: '#0c1222',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Minimal and corporate',
    primaryColor: '#475569',
    accentColor: '#0ea5e9',
    lightBackground: '#f8fafc', // backgroundAlt - neutral gray
    darkBackground: '#0f172a',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant purple and pink',
    primaryColor: '#8b5cf6',
    accentColor: '#f43f5e',
    lightBackground: '#faf5ff',
    darkBackground: '#1a1625',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep blues and teals',
    primaryColor: '#0891b2',
    accentColor: '#0d9488',
    lightBackground: '#ecfeff',
    darkBackground: '#083344',
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural greens and earth tones',
    primaryColor: '#15803d',
    accentColor: '#ca8a04',
    lightBackground: '#f0fdf4',
    darkBackground: '#14532d',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm oranges and pinks',
    primaryColor: '#ea580c',
    accentColor: '#db2777',
    lightBackground: '#fff7ed',
    darkBackground: '#431407',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep purples with gold accents',
    primaryColor: '#4c1d95',
    accentColor: '#ca8a04',
    lightBackground: '#faf5ff',
    darkBackground: '#0f0720',
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Vibrant cyberpunk colors',
    primaryColor: '#d946ef',
    accentColor: '#06b6d4',
    lightBackground: '#fdf4ff',
    darkBackground: '#0a0a0a',
  },
];
