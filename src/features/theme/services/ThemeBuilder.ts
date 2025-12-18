/**
 * ThemeBuilder - Builder Pattern for creating custom themes
 * Allows step-by-step construction of themes with validation
 */

import { Theme, ThemeProps, ThemeMode, ThemePresetId } from '../models/Theme';
import { ColorPalette, ColorPaletteProps } from '../models/ColorPalette';
import { Typography, TypographyProps, FontFamily } from '../models/Typography';

let idCounter = 0;
function generateId(): string {
  return `theme-${Date.now()}-${++idCounter}`;
}

export class ThemeBuilder {
  private _id: string;
  private _name: string = 'Custom Theme';
  private _presetId: ThemePresetId = 'custom';
  private _mode: ThemeMode = 'light';
  private _colors: Partial<ColorPaletteProps> = {};
  private _typography: Partial<TypographyProps> = {};
  private _customCSS?: string;
  private _customBackground?: string;

  constructor() {
    this._id = generateId();
  }

  /**
   * Set the theme ID (usually for editing existing themes)
   */
  setId(id: string): ThemeBuilder {
    this._id = id;
    return this;
  }

  /**
   * Set the theme name
   */
  setName(name: string): ThemeBuilder {
    this._name = name;
    return this;
  }

  /**
   * Set the preset ID
   */
  setPresetId(presetId: ThemePresetId): ThemeBuilder {
    this._presetId = presetId;
    return this;
  }

  /**
   * Set the theme mode (light/dark)
   */
  setMode(mode: ThemeMode): ThemeBuilder {
    this._mode = mode;
    return this;
  }

  /**
   * Set primary color - automatically generates light/dark variants
   */
  setPrimaryColor(color: string): ThemeBuilder {
    this._colors.primary = color;
    return this;
  }

  /**
   * Set accent color - automatically generates light/dark variants
   */
  setAccentColor(color: string): ThemeBuilder {
    this._colors.accent = color;
    return this;
  }

  /**
   * Set background color - automatically generates alt/elevated variants
   */
  setBackgroundColor(color: string): ThemeBuilder {
    this._customBackground = color;
    return this;
  }

  /**
   * Set full color palette (overrides auto-generation)
   */
  setColors(colors: ColorPaletteProps): ThemeBuilder {
    this._colors = { ...colors };
    return this;
  }

  /**
   * Set heading font
   */
  setHeadingFont(font: FontFamily): ThemeBuilder {
    this._typography.headingFont = font;
    return this;
  }

  /**
   * Set body font
   */
  setBodyFont(font: FontFamily): ThemeBuilder {
    this._typography.bodyFont = font;
    return this;
  }

  /**
   * Set full typography (overrides individual settings)
   */
  setTypography(typography: TypographyProps): ThemeBuilder {
    this._typography = { ...typography };
    return this;
  }

  /**
   * Set custom CSS overrides
   */
  setCustomCSS(css: string): ThemeBuilder {
    this._customCSS = css;
    return this;
  }

  /**
   * Start from an existing theme
   */
  fromTheme(theme: Theme): ThemeBuilder {
    this._id = theme.id;
    this._name = theme.name;
    this._presetId = theme.presetId;
    this._mode = theme.mode;
    this._colors = theme.colors.toJSON();
    this._typography = theme.typography.toJSON();
    this._customCSS = theme.customCSS;
    return this;
  }

  /**
   * Start from a theme preset
   */
  fromPreset(preset: Theme): ThemeBuilder {
    this._id = generateId(); // New ID for new theme
    this._name = `${preset.name} (Custom)`;
    this._presetId = preset.presetId;
    this._mode = preset.mode;
    this._colors = preset.colors.toJSON();
    this._typography = preset.typography.toJSON();
    return this;
  }

  /**
   * Build the theme
   */
  build(): Theme {
    // Generate full color palette if only primary/accent provided
    let colors: ColorPaletteProps;

    if (this._colors.primary && this._colors.accent && !this._colors.background) {
      // Auto-generate from primary, accent, and optional background
      const palette = ColorPalette.fromPrimaryAndAccent(
        this._colors.primary,
        this._colors.accent,
        this._mode,
        this._customBackground
      );
      colors = palette.toJSON();
    } else if (this.isCompleteColorPalette(this._colors)) {
      colors = this._colors as ColorPaletteProps;
    } else {
      // Use default colors with optional custom background
      const defaultPalette = ColorPalette.fromPrimaryAndAccent(
        '#6366f1',
        '#ec4899',
        this._mode,
        this._customBackground
      );
      colors = {
        ...defaultPalette.toJSON(),
        ...this._colors,
      };
    }

    // Build typography with defaults
    const defaultTypo = Typography.default().toJSON();
    const typography: TypographyProps = {
      ...defaultTypo,
      ...this._typography,
    };

    const props: ThemeProps = {
      id: this._id,
      name: this._name,
      presetId: this._presetId,
      mode: this._mode,
      colors,
      typography,
      customCSS: this._customCSS,
    };

    return new Theme(props);
  }

  /**
   * Check if the color palette is complete
   */
  private isCompleteColorPalette(colors: Partial<ColorPaletteProps>): colors is ColorPaletteProps {
    const requiredKeys: (keyof ColorPaletteProps)[] = [
      'primary',
      'primaryLight',
      'primaryDark',
      'primaryRgb',
      'accent',
      'accentLight',
      'accentDark',
      'secondary',
      'secondaryLight',
      'background',
      'backgroundAlt',
      'backgroundElevated',
      'text',
      'textLight',
      'textMuted',
      'border',
      'success',
      'warning',
      'error',
    ];

    return requiredKeys.every((key) => key in colors);
  }
}
