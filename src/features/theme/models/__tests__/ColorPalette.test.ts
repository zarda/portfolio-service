import { describe, it, expect } from 'vitest';
import { ColorPalette, ColorPaletteProps } from '../ColorPalette';

describe('ColorPalette', () => {
  const validColorPaletteProps: ColorPaletteProps = {
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
  };

  describe('Constructor', () => {
    it('should create a ColorPalette with valid props', () => {
      const palette = new ColorPalette(validColorPaletteProps);

      expect(palette.primary).toBe('#6366f1');
      expect(palette.accent).toBe('#ec4899');
      expect(palette.background).toBe('#ffffff');
    });

    it('should throw an error for invalid hex color', () => {
      const invalidProps = { ...validColorPaletteProps, primary: 'invalid' };

      expect(() => new ColorPalette(invalidProps)).toThrow(
        'Invalid color for primary: invalid. Must be a 6-digit hex color.'
      );
    });

    it('should throw an error for 3-digit hex color', () => {
      const invalidProps = { ...validColorPaletteProps, accent: '#fff' };

      expect(() => new ColorPalette(invalidProps)).toThrow(
        'Invalid color for accent: #fff. Must be a 6-digit hex color.'
      );
    });

    it('should throw an error for hex without hash', () => {
      const invalidProps = { ...validColorPaletteProps, background: 'ffffff' };

      expect(() => new ColorPalette(invalidProps)).toThrow(
        'Invalid color for background: ffffff. Must be a 6-digit hex color.'
      );
    });

    it('should be immutable - props are copied', () => {
      const props = { ...validColorPaletteProps };
      const palette = new ColorPalette(props);

      props.primary = '#000000';
      expect(palette.primary).toBe('#6366f1');
    });
  });

  describe('Getters', () => {
    const palette = new ColorPalette(validColorPaletteProps);

    it('should return primary color values', () => {
      expect(palette.primary).toBe('#6366f1');
      expect(palette.primaryLight).toBe('#818cf8');
      expect(palette.primaryDark).toBe('#4f46e5');
      expect(palette.primaryRgb).toBe('99, 102, 241');
    });

    it('should return accent color values', () => {
      expect(palette.accent).toBe('#ec4899');
      expect(palette.accentLight).toBe('#f472b6');
      expect(palette.accentDark).toBe('#db2777');
    });

    it('should return secondary color values', () => {
      expect(palette.secondary).toBe('#64748b');
      expect(palette.secondaryLight).toBe('#94a3b8');
    });

    it('should return background color values', () => {
      expect(palette.background).toBe('#ffffff');
      expect(palette.backgroundAlt).toBe('#f8fafc');
      expect(palette.backgroundElevated).toBe('#ffffff');
    });

    it('should return text color values', () => {
      expect(palette.text).toBe('#1e293b');
      expect(palette.textLight).toBe('#64748b');
      expect(palette.textMuted).toBe('#94a3b8');
    });

    it('should return other color values', () => {
      expect(palette.border).toBe('#e2e8f0');
      expect(palette.success).toBe('#10b981');
      expect(palette.warning).toBe('#f59e0b');
      expect(palette.error).toBe('#ef4444');
    });
  });

  describe('fromPrimaryAndAccent', () => {
    it('should generate a light mode palette', () => {
      const palette = ColorPalette.fromPrimaryAndAccent('#6366f1', '#ec4899', 'light');

      expect(palette.primary).toBe('#6366f1');
      expect(palette.accent).toBe('#ec4899');
      expect(palette.background).toBe('#ffffff');
      expect(palette.text).toBe('#1e293b');
    });

    it('should generate a dark mode palette', () => {
      const palette = ColorPalette.fromPrimaryAndAccent('#6366f1', '#ec4899', 'dark');

      expect(palette.background).toBe('#0f172a');
      expect(palette.text).toBe('#f1f5f9');
    });

    it('should generate lighter primary color in dark mode', () => {
      const palette = ColorPalette.fromPrimaryAndAccent('#6366f1', '#ec4899', 'dark');

      // In dark mode, primary should be lightened
      expect(palette.primary).not.toBe('#6366f1');
      expect(palette.primaryDark).toBe('#6366f1'); // Original is stored as dark variant
    });

    it('should use custom background in light mode', () => {
      const palette = ColorPalette.fromPrimaryAndAccent('#6366f1', '#ec4899', 'light', '#f0f0f0');

      expect(palette.background).toBe('#f0f0f0');
    });

    it('should use custom background in dark mode', () => {
      const palette = ColorPalette.fromPrimaryAndAccent('#6366f1', '#ec4899', 'dark', '#1a1a2e');

      expect(palette.background).toBe('#1a1a2e');
    });

    it('should default to light mode when mode is not specified', () => {
      const palette = ColorPalette.fromPrimaryAndAccent('#6366f1', '#ec4899');

      expect(palette.background).toBe('#ffffff');
    });
  });

  describe('toCSSVariables', () => {
    it('should return all CSS custom properties', () => {
      const palette = new ColorPalette(validColorPaletteProps);
      const cssVars = palette.toCSSVariables();

      expect(cssVars['--color-primary']).toBe('#6366f1');
      expect(cssVars['--color-primary-light']).toBe('#818cf8');
      expect(cssVars['--color-primary-dark']).toBe('#4f46e5');
      expect(cssVars['--color-primary-rgb']).toBe('99, 102, 241');

      expect(cssVars['--color-accent']).toBe('#ec4899');
      expect(cssVars['--color-accent-light']).toBe('#f472b6');
      expect(cssVars['--color-accent-dark']).toBe('#db2777');

      expect(cssVars['--color-background']).toBe('#ffffff');
      expect(cssVars['--color-background-alt']).toBe('#f8fafc');
      expect(cssVars['--color-text']).toBe('#1e293b');
      expect(cssVars['--color-border']).toBe('#e2e8f0');
    });

    it('should include gradient CSS variables', () => {
      const palette = new ColorPalette(validColorPaletteProps);
      const cssVars = palette.toCSSVariables();

      expect(cssVars['--gradient-primary']).toContain('linear-gradient');
      expect(cssVars['--gradient-primary']).toContain('#6366f1');
      expect(cssVars['--gradient-primary']).toContain('#ec4899');

      expect(cssVars['--gradient-primary-reverse']).toContain('#ec4899');
      expect(cssVars['--gradient-subtle']).toContain('#ffffff');
      expect(cssVars['--gradient-glow']).toContain('radial-gradient');
    });

    it('should include background RGB variable', () => {
      const palette = new ColorPalette(validColorPaletteProps);
      const cssVars = palette.toCSSVariables();

      expect(cssVars['--color-background-rgb']).toBeDefined();
    });
  });

  describe('Serialization', () => {
    it('should serialize to JSON', () => {
      const palette = new ColorPalette(validColorPaletteProps);
      const json = palette.toJSON();

      expect(json).toEqual(validColorPaletteProps);
    });

    it('should return a copy of props in toJSON', () => {
      const palette = new ColorPalette(validColorPaletteProps);
      const json1 = palette.toJSON();
      const json2 = palette.toJSON();

      expect(json1).not.toBe(json2);
      expect(json1).toEqual(json2);
    });

    it('should deserialize from JSON', () => {
      const palette = ColorPalette.fromJSON(validColorPaletteProps);

      expect(palette.primary).toBe('#6366f1');
      expect(palette.accent).toBe('#ec4899');
    });

    it('should round-trip serialize/deserialize', () => {
      const original = new ColorPalette(validColorPaletteProps);
      const json = original.toJSON();
      const restored = ColorPalette.fromJSON(json);

      expect(restored.toJSON()).toEqual(original.toJSON());
    });
  });
});
