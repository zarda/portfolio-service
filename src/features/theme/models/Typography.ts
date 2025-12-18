/**
 * Typography Value Object
 * Represents font settings for a theme
 */

export type FontFamily =
  | 'Inter'
  | 'Roboto'
  | 'Open Sans'
  | 'Lato'
  | 'Montserrat'
  | 'Poppins'
  | 'Source Sans Pro'
  | 'Raleway'
  | 'Nunito'
  | 'Playfair Display'
  | 'Merriweather'
  | 'system-ui';

export interface TypographyProps {
  headingFont: FontFamily;
  bodyFont: FontFamily;
  monoFont: string;
  baseFontSize: number; // in pixels
  lineHeight: number;
  headingLineHeight: number;
  headingWeight: 600 | 700 | 800;
  bodyWeight: 400 | 500;
}

// Font stacks for fallbacks
const FONT_STACKS: Record<FontFamily, string> = {
  Inter: "'Inter', system-ui, -apple-system, sans-serif",
  Roboto: "'Roboto', system-ui, -apple-system, sans-serif",
  'Open Sans': "'Open Sans', system-ui, -apple-system, sans-serif",
  Lato: "'Lato', system-ui, -apple-system, sans-serif",
  Montserrat: "'Montserrat', system-ui, -apple-system, sans-serif",
  Poppins: "'Poppins', system-ui, -apple-system, sans-serif",
  'Source Sans Pro': "'Source Sans Pro', system-ui, -apple-system, sans-serif",
  Raleway: "'Raleway', system-ui, -apple-system, sans-serif",
  Nunito: "'Nunito', system-ui, -apple-system, sans-serif",
  'Playfair Display': "'Playfair Display', Georgia, serif",
  Merriweather: "'Merriweather', Georgia, serif",
  'system-ui': "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

// Google Fonts URL mapping
const GOOGLE_FONT_URLS: Record<FontFamily, string | null> = {
  Inter: 'Inter:wght@400;500;600;700;800',
  Roboto: 'Roboto:wght@400;500;700',
  'Open Sans': 'Open+Sans:wght@400;500;600;700',
  Lato: 'Lato:wght@400;700',
  Montserrat: 'Montserrat:wght@400;500;600;700;800',
  Poppins: 'Poppins:wght@400;500;600;700',
  'Source Sans Pro': 'Source+Sans+Pro:wght@400;600;700',
  Raleway: 'Raleway:wght@400;500;600;700',
  Nunito: 'Nunito:wght@400;600;700',
  'Playfair Display': 'Playfair+Display:wght@400;600;700',
  Merriweather: 'Merriweather:wght@400;700',
  'system-ui': null, // No need to load system fonts
};

// Track loaded fonts to avoid duplicate loading
const loadedFonts = new Set<FontFamily>();

/**
 * Load a Google Font dynamically
 */
export function loadGoogleFont(fontFamily: FontFamily): void {
  if (typeof document === 'undefined') return;
  if (fontFamily === 'system-ui') return;
  if (loadedFonts.has(fontFamily)) return;

  const fontUrl = GOOGLE_FONT_URLS[fontFamily];
  if (!fontUrl) return;

  // Check if already loaded via existing link tag
  const existingLink = document.querySelector(`link[href*="${fontUrl.split(':')[0]}"]`);
  if (existingLink) {
    loadedFonts.add(fontFamily);
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontUrl}&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(fontFamily);
}

export class Typography {
  private readonly props: TypographyProps;

  constructor(props: TypographyProps) {
    // Validate font size
    if (props.baseFontSize < 12 || props.baseFontSize > 24) {
      throw new Error('Base font size must be between 12 and 24 pixels');
    }

    // Validate line height
    if (props.lineHeight < 1.2 || props.lineHeight > 2.0) {
      throw new Error('Line height must be between 1.2 and 2.0');
    }

    if (props.headingLineHeight < 1.0 || props.headingLineHeight > 1.6) {
      throw new Error('Heading line height must be between 1.0 and 1.6');
    }

    this.props = { ...props };
  }

  get headingFont(): FontFamily {
    return this.props.headingFont;
  }

  get bodyFont(): FontFamily {
    return this.props.bodyFont;
  }

  get monoFont(): string {
    return this.props.monoFont;
  }

  get baseFontSize(): number {
    return this.props.baseFontSize;
  }

  get lineHeight(): number {
    return this.props.lineHeight;
  }

  get headingLineHeight(): number {
    return this.props.headingLineHeight;
  }

  get headingWeight(): number {
    return this.props.headingWeight;
  }

  get bodyWeight(): number {
    return this.props.bodyWeight;
  }

  /**
   * Get the full font stack for a font family
   */
  getHeadingFontStack(): string {
    return FONT_STACKS[this.props.headingFont] || FONT_STACKS['system-ui'];
  }

  getBodyFontStack(): string {
    return FONT_STACKS[this.props.bodyFont] || FONT_STACKS['system-ui'];
  }

  /**
   * Convert typography to CSS custom properties
   */
  toCSSVariables(): Record<string, string> {
    return {
      '--font-heading': this.getHeadingFontStack(),
      '--font-body': this.getBodyFontStack(),
      '--font-mono': this.props.monoFont,
      '--font-size-base': `${this.props.baseFontSize}px`,
      '--line-height': this.props.lineHeight.toString(),
      '--line-height-heading': this.props.headingLineHeight.toString(),
      '--font-weight-heading': this.props.headingWeight.toString(),
      '--font-weight-body': this.props.bodyWeight.toString(),
    };
  }

  /**
   * Create default typography settings
   */
  static default(): Typography {
    return new Typography({
      headingFont: 'Inter',
      bodyFont: 'Inter',
      monoFont: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
      baseFontSize: 16,
      lineHeight: 1.6,
      headingLineHeight: 1.1,
      headingWeight: 700,
      bodyWeight: 400,
    });
  }

  /**
   * Serialize to plain object for persistence
   */
  toJSON(): TypographyProps {
    return { ...this.props };
  }

  /**
   * Create from plain object
   */
  static fromJSON(json: TypographyProps): Typography {
    return new Typography(json);
  }
}

/**
 * Available font families for the theme editor
 */
export const AVAILABLE_FONTS: { value: FontFamily; label: string; category: 'sans' | 'serif' }[] = [
  { value: 'Inter', label: 'Inter', category: 'sans' },
  { value: 'Roboto', label: 'Roboto', category: 'sans' },
  { value: 'Open Sans', label: 'Open Sans', category: 'sans' },
  { value: 'Lato', label: 'Lato', category: 'sans' },
  { value: 'Montserrat', label: 'Montserrat', category: 'sans' },
  { value: 'Poppins', label: 'Poppins', category: 'sans' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro', category: 'sans' },
  { value: 'Raleway', label: 'Raleway', category: 'sans' },
  { value: 'Nunito', label: 'Nunito', category: 'sans' },
  { value: 'Playfair Display', label: 'Playfair Display', category: 'serif' },
  { value: 'Merriweather', label: 'Merriweather', category: 'serif' },
  { value: 'system-ui', label: 'System Default', category: 'sans' },
];
