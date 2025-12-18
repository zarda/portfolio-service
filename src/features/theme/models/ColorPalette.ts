/**
 * ColorPalette Value Object
 * Represents a complete color scheme for a theme
 */

export interface ColorPaletteProps {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryRgb: string; // RGB values for opacity usage, e.g., "99, 102, 241"

  accent: string;
  accentLight: string;
  accentDark: string;

  secondary: string;
  secondaryLight: string;

  background: string;
  backgroundAlt: string;
  backgroundElevated: string;

  text: string;
  textLight: string;
  textMuted: string;

  border: string;

  success: string;
  warning: string;
  error: string;
}

// Helper functions for color manipulation
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function lighten(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = percent / 100;
  return rgbToHex(
    rgb.r + (255 - rgb.r) * factor,
    rgb.g + (255 - rgb.g) * factor,
    rgb.b + (255 - rgb.b) * factor
  );
}

function darken(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = 1 - percent / 100;
  return rgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
}

function toRgbString(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '0, 0, 0';
  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

export class ColorPalette {
  private readonly props: ColorPaletteProps;

  constructor(props: ColorPaletteProps) {
    // Validate hex colors
    const colorKeys: (keyof ColorPaletteProps)[] = [
      'primary',
      'primaryLight',
      'primaryDark',
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

    for (const key of colorKeys) {
      const color = props[key];
      if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
        throw new Error(`Invalid color for ${key}: ${color}. Must be a 6-digit hex color.`);
      }
    }

    this.props = { ...props };
  }

  // Getters for all colors
  get primary(): string {
    return this.props.primary;
  }
  get primaryLight(): string {
    return this.props.primaryLight;
  }
  get primaryDark(): string {
    return this.props.primaryDark;
  }
  get primaryRgb(): string {
    return this.props.primaryRgb;
  }

  get accent(): string {
    return this.props.accent;
  }
  get accentLight(): string {
    return this.props.accentLight;
  }
  get accentDark(): string {
    return this.props.accentDark;
  }

  get secondary(): string {
    return this.props.secondary;
  }
  get secondaryLight(): string {
    return this.props.secondaryLight;
  }

  get background(): string {
    return this.props.background;
  }
  get backgroundAlt(): string {
    return this.props.backgroundAlt;
  }
  get backgroundElevated(): string {
    return this.props.backgroundElevated;
  }

  get text(): string {
    return this.props.text;
  }
  get textLight(): string {
    return this.props.textLight;
  }
  get textMuted(): string {
    return this.props.textMuted;
  }

  get border(): string {
    return this.props.border;
  }

  get success(): string {
    return this.props.success;
  }
  get warning(): string {
    return this.props.warning;
  }
  get error(): string {
    return this.props.error;
  }

  /**
   * Create a full color palette from primary, accent, and optional background color
   * Auto-generates light/dark variants and complementary colors
   */
  static fromPrimaryAndAccent(
    primary: string,
    accent: string,
    mode: 'light' | 'dark' = 'light',
    customBackground?: string
  ): ColorPalette {
    if (mode === 'light') {
      const bg = customBackground || '#ffffff';
      const bgAlt = customBackground ? darken(customBackground, 3) : '#f8fafc';
      const bgElevated = customBackground ? lighten(customBackground, 2) : '#ffffff';
      const borderColor = customBackground ? darken(customBackground, 12) : '#e2e8f0';

      return new ColorPalette({
        primary,
        primaryLight: lighten(primary, 20),
        primaryDark: darken(primary, 15),
        primaryRgb: toRgbString(primary),

        accent,
        accentLight: lighten(accent, 20),
        accentDark: darken(accent, 15),

        secondary: '#64748b',
        secondaryLight: '#94a3b8',

        background: bg,
        backgroundAlt: bgAlt,
        backgroundElevated: bgElevated,

        text: '#1e293b',
        textLight: '#64748b',
        textMuted: '#94a3b8',

        border: borderColor,

        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      });
    } else {
      // Dark mode
      const lightPrimary = lighten(primary, 15);
      const bg = customBackground || '#0f172a';
      const bgAlt = customBackground ? lighten(customBackground, 8) : '#1e293b';
      const bgElevated = customBackground ? lighten(customBackground, 15) : '#334155';
      const borderColor = customBackground ? lighten(customBackground, 15) : '#334155';

      return new ColorPalette({
        primary: lightPrimary,
        primaryLight: lighten(primary, 30),
        primaryDark: primary,
        primaryRgb: toRgbString(lightPrimary),

        accent: lighten(accent, 15),
        accentLight: lighten(accent, 30),
        accentDark: accent,

        secondary: '#94a3b8',
        secondaryLight: '#cbd5e1',

        background: bg,
        backgroundAlt: bgAlt,
        backgroundElevated: bgElevated,

        text: '#f1f5f9',
        textLight: '#94a3b8',
        textMuted: '#64748b',

        border: borderColor,

        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      });
    }
  }

  /**
   * Convert the color palette to CSS custom properties
   */
  toCSSVariables(): Record<string, string> {
    return {
      '--color-primary': this.props.primary,
      '--color-primary-light': this.props.primaryLight,
      '--color-primary-dark': this.props.primaryDark,
      '--color-primary-rgb': this.props.primaryRgb,

      '--color-accent': this.props.accent,
      '--color-accent-light': this.props.accentLight,
      '--color-accent-dark': this.props.accentDark,

      '--color-secondary': this.props.secondary,
      '--color-secondary-light': this.props.secondaryLight,

      '--color-background': this.props.background,
      '--color-background-alt': this.props.backgroundAlt,
      '--color-background-elevated': this.props.backgroundElevated,
      '--color-background-rgb': toRgbString(this.props.background),

      '--color-text': this.props.text,
      '--color-text-light': this.props.textLight,
      '--color-text-muted': this.props.textMuted,

      '--color-border': this.props.border,

      '--color-success': this.props.success,
      '--color-warning': this.props.warning,
      '--color-error': this.props.error,

      // Computed gradients
      '--gradient-primary': `linear-gradient(135deg, ${this.props.primary} 0%, ${this.props.accent} 100%)`,
      '--gradient-primary-reverse': `linear-gradient(135deg, ${this.props.accent} 0%, ${this.props.primary} 100%)`,
      '--gradient-subtle': `linear-gradient(135deg, ${this.props.background} 0%, ${this.props.backgroundAlt} 100%)`,
      '--gradient-text': `linear-gradient(135deg, ${this.props.primary} 0%, ${this.props.accent} 100%)`,
      '--gradient-glow': `radial-gradient(circle at center, rgba(${this.props.primaryRgb}, 0.15) 0%, transparent 70%)`,
    };
  }

  /**
   * Serialize to plain object for persistence
   */
  toJSON(): ColorPaletteProps {
    return { ...this.props };
  }

  /**
   * Create from plain object
   */
  static fromJSON(json: ColorPaletteProps): ColorPalette {
    return new ColorPalette(json);
  }
}
