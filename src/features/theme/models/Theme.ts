/**
 * Theme Entity
 * Combines ColorPalette and Typography into a complete theme
 */

import { ColorPalette, ColorPaletteProps } from './ColorPalette';
import { Typography, TypographyProps, loadGoogleFont } from './Typography';

export type ThemeMode = 'light' | 'dark';
export type ThemePresetId =
  | 'default'
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter'
  | 'professional'
  | 'creative'
  | 'ocean'
  | 'forest'
  | 'sunset'
  | 'midnight'
  | 'neon'
  | 'custom';

export interface ThemeProps {
  id: string;
  name: string;
  presetId: ThemePresetId;
  mode: ThemeMode;
  colors: ColorPaletteProps;
  typography: TypographyProps;
  customCSS?: string;
}

export class Theme {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _presetId: ThemePresetId;
  private readonly _mode: ThemeMode;
  private readonly _colors: ColorPalette;
  private readonly _typography: Typography;
  private readonly _customCSS?: string;

  constructor(props: ThemeProps) {
    this._id = props.id;
    this._name = props.name;
    this._presetId = props.presetId;
    this._mode = props.mode;
    this._colors = new ColorPalette(props.colors);
    this._typography = new Typography(props.typography);
    this._customCSS = props.customCSS;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get presetId(): ThemePresetId {
    return this._presetId;
  }

  get mode(): ThemeMode {
    return this._mode;
  }

  get colors(): ColorPalette {
    return this._colors;
  }

  get typography(): Typography {
    return this._typography;
  }

  get customCSS(): string | undefined {
    return this._customCSS;
  }

  get isCustom(): boolean {
    return this._presetId === 'custom';
  }

  get isDark(): boolean {
    return this._mode === 'dark';
  }

  /**
   * Convert theme to CSS custom properties object
   */
  toCSSVariables(): Record<string, string> {
    return {
      ...this._colors.toCSSVariables(),
      ...this._typography.toCSSVariables(),
    };
  }

  /**
   * Apply theme to the document
   */
  apply(): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const vars = this.toCSSVariables();

    // Remove old theme classes that might override CSS variables
    document.body.classList.remove(
      'theme-spring',
      'theme-summer',
      'theme-autumn',
      'theme-winter',
      'dark-mode'
    );

    // Load Google Fonts for heading and body fonts
    loadGoogleFont(this._typography.headingFont);
    loadGoogleFont(this._typography.bodyFont);

    // Apply CSS variables to root
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply mode class for dark mode specific styles (shadows, glass effects, etc.)
    if (this._mode === 'dark') {
      document.body.classList.add('dark-mode');
    }

    // Apply custom CSS if present
    if (this._customCSS) {
      let styleEl = document.getElementById('theme-custom-css');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'theme-custom-css';
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = this._customCSS;
    }
  }

  /**
   * Create a new theme with updated properties
   */
  withUpdates(updates: Partial<Omit<ThemeProps, 'id'>>): Theme {
    return new Theme({
      id: this._id,
      name: updates.name ?? this._name,
      presetId: updates.presetId ?? this._presetId,
      mode: updates.mode ?? this._mode,
      colors: updates.colors ?? this._colors.toJSON(),
      typography: updates.typography ?? this._typography.toJSON(),
      customCSS: updates.customCSS ?? this._customCSS,
    });
  }

  /**
   * Serialize to plain object for persistence
   */
  toJSON(): ThemeProps {
    return {
      id: this._id,
      name: this._name,
      presetId: this._presetId,
      mode: this._mode,
      colors: this._colors.toJSON(),
      typography: this._typography.toJSON(),
      customCSS: this._customCSS,
    };
  }

  /**
   * Create from plain object
   */
  static fromJSON(json: ThemeProps): Theme {
    return new Theme(json);
  }

  /**
   * Check equality with another theme
   */
  equals(other: Theme): boolean {
    return this._id === other._id;
  }
}
