import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Theme, ThemeProps } from '../Theme';
import { ColorPaletteProps } from '../ColorPalette';
import { TypographyProps } from '../Typography';

describe('Theme', () => {
  const validColorProps: ColorPaletteProps = {
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

  const validTypographyProps: TypographyProps = {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    monoFont: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
    baseFontSize: 16,
    lineHeight: 1.6,
    headingLineHeight: 1.1,
    headingWeight: 700,
    bodyWeight: 400,
  };

  const validThemeProps: ThemeProps = {
    id: 'theme-1',
    name: 'Default Light',
    presetId: 'default',
    mode: 'light',
    colors: validColorProps,
    typography: validTypographyProps,
  };

  describe('Constructor', () => {
    it('should create a Theme with valid props', () => {
      const theme = new Theme(validThemeProps);

      expect(theme.id).toBe('theme-1');
      expect(theme.name).toBe('Default Light');
      expect(theme.presetId).toBe('default');
      expect(theme.mode).toBe('light');
    });

    it('should create ColorPalette and Typography instances', () => {
      const theme = new Theme(validThemeProps);

      expect(theme.colors.primary).toBe('#6366f1');
      expect(theme.typography.headingFont).toBe('Inter');
    });

    it('should handle customCSS property', () => {
      const propsWithCSS = { ...validThemeProps, customCSS: '.custom { color: red; }' };
      const theme = new Theme(propsWithCSS);

      expect(theme.customCSS).toBe('.custom { color: red; }');
    });

    it('should have undefined customCSS when not provided', () => {
      const theme = new Theme(validThemeProps);

      expect(theme.customCSS).toBeUndefined();
    });
  });

  describe('Getters', () => {
    const theme = new Theme(validThemeProps);

    it('should return id', () => {
      expect(theme.id).toBe('theme-1');
    });

    it('should return name', () => {
      expect(theme.name).toBe('Default Light');
    });

    it('should return presetId', () => {
      expect(theme.presetId).toBe('default');
    });

    it('should return mode', () => {
      expect(theme.mode).toBe('light');
    });

    it('should return colors as ColorPalette instance', () => {
      expect(theme.colors.primary).toBe('#6366f1');
      expect(theme.colors.accent).toBe('#ec4899');
    });

    it('should return typography as Typography instance', () => {
      expect(theme.typography.headingFont).toBe('Inter');
      expect(theme.typography.baseFontSize).toBe(16);
    });
  });

  describe('Computed Properties', () => {
    it('should return isCustom true for custom preset', () => {
      const customProps = { ...validThemeProps, presetId: 'custom' as const };
      const theme = new Theme(customProps);

      expect(theme.isCustom).toBe(true);
    });

    it('should return isCustom false for non-custom preset', () => {
      const theme = new Theme(validThemeProps);

      expect(theme.isCustom).toBe(false);
    });

    it('should return isDark true for dark mode', () => {
      const darkProps = { ...validThemeProps, mode: 'dark' as const };
      const theme = new Theme(darkProps);

      expect(theme.isDark).toBe(true);
    });

    it('should return isDark false for light mode', () => {
      const theme = new Theme(validThemeProps);

      expect(theme.isDark).toBe(false);
    });
  });

  describe('toCSSVariables', () => {
    it('should return combined CSS variables from colors and typography', () => {
      const theme = new Theme(validThemeProps);
      const cssVars = theme.toCSSVariables();

      // Color variables
      expect(cssVars['--color-primary']).toBe('#6366f1');
      expect(cssVars['--color-accent']).toBe('#ec4899');
      expect(cssVars['--color-background']).toBe('#ffffff');

      // Typography variables
      expect(cssVars['--font-heading']).toContain('Inter');
      expect(cssVars['--font-size-base']).toBe('16px');
      expect(cssVars['--line-height']).toBe('1.6');
    });

    it('should include gradient variables', () => {
      const theme = new Theme(validThemeProps);
      const cssVars = theme.toCSSVariables();

      expect(cssVars['--gradient-primary']).toContain('linear-gradient');
    });
  });

  describe('withUpdates', () => {
    it('should create a new theme with updated name', () => {
      const theme = new Theme(validThemeProps);
      const updated = theme.withUpdates({ name: 'Updated Theme' });

      expect(updated.name).toBe('Updated Theme');
      expect(updated.id).toBe(theme.id); // ID should stay the same
      expect(theme.name).toBe('Default Light'); // Original unchanged
    });

    it('should create a new theme with updated mode', () => {
      const theme = new Theme(validThemeProps);
      const updated = theme.withUpdates({ mode: 'dark' });

      expect(updated.mode).toBe('dark');
      expect(updated.isDark).toBe(true);
    });

    it('should create a new theme with updated colors', () => {
      const theme = new Theme(validThemeProps);
      const newColors = { ...validColorProps, primary: '#ff0000' };
      const updated = theme.withUpdates({ colors: newColors });

      expect(updated.colors.primary).toBe('#ff0000');
      expect(theme.colors.primary).toBe('#6366f1'); // Original unchanged
    });

    it('should preserve unchanged properties', () => {
      const theme = new Theme(validThemeProps);
      const updated = theme.withUpdates({ name: 'New Name' });

      expect(updated.presetId).toBe(theme.presetId);
      expect(updated.mode).toBe(theme.mode);
      expect(updated.colors.primary).toBe(theme.colors.primary);
    });

    it('should update customCSS', () => {
      const theme = new Theme(validThemeProps);
      const updated = theme.withUpdates({ customCSS: '.test { color: blue; }' });

      expect(updated.customCSS).toBe('.test { color: blue; }');
    });
  });

  describe('Serialization', () => {
    it('should serialize to JSON', () => {
      const theme = new Theme(validThemeProps);
      const json = theme.toJSON();

      expect(json.id).toBe('theme-1');
      expect(json.name).toBe('Default Light');
      expect(json.presetId).toBe('default');
      expect(json.mode).toBe('light');
      expect(json.colors).toEqual(validColorProps);
      expect(json.typography).toEqual(validTypographyProps);
    });

    it('should include customCSS in JSON when present', () => {
      const propsWithCSS = { ...validThemeProps, customCSS: '.custom {}' };
      const theme = new Theme(propsWithCSS);
      const json = theme.toJSON();

      expect(json.customCSS).toBe('.custom {}');
    });

    it('should deserialize from JSON', () => {
      const theme = Theme.fromJSON(validThemeProps);

      expect(theme.id).toBe('theme-1');
      expect(theme.name).toBe('Default Light');
      expect(theme.colors.primary).toBe('#6366f1');
    });

    it('should round-trip serialize/deserialize', () => {
      const original = new Theme(validThemeProps);
      const json = original.toJSON();
      const restored = Theme.fromJSON(json);

      expect(restored.toJSON()).toEqual(original.toJSON());
    });
  });

  describe('equals', () => {
    it('should return true for themes with same id', () => {
      const theme1 = new Theme(validThemeProps);
      const theme2 = new Theme(validThemeProps);

      expect(theme1.equals(theme2)).toBe(true);
    });

    it('should return false for themes with different id', () => {
      const theme1 = new Theme(validThemeProps);
      const theme2 = new Theme({ ...validThemeProps, id: 'theme-2' });

      expect(theme1.equals(theme2)).toBe(false);
    });

    it('should only compare by id, not other properties', () => {
      const theme1 = new Theme(validThemeProps);
      const theme2 = new Theme({ ...validThemeProps, name: 'Different Name', mode: 'dark' });

      expect(theme1.equals(theme2)).toBe(true);
    });
  });

  describe('apply', () => {
    beforeEach(() => {
      // Reset document mocks
      vi.restoreAllMocks();
    });

    it('should not throw when document is undefined (SSR)', () => {
      const originalDocument = global.document;
      // @ts-expect-error - Testing SSR environment
      global.document = undefined;

      const theme = new Theme(validThemeProps);
      expect(() => theme.apply()).not.toThrow();

      global.document = originalDocument;
    });
  });
});
