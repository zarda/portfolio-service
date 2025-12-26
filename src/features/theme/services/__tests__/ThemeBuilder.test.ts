import { describe, it, expect } from 'vitest';
import { ThemeBuilder } from '../ThemeBuilder';
import { Theme } from '../../models/Theme';
import { ColorPaletteProps } from '../../models/ColorPalette';
import { TypographyProps } from '../../models/Typography';

describe('ThemeBuilder', () => {
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
    headingFont: 'Montserrat',
    bodyFont: 'Roboto',
    monoFont: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
    baseFontSize: 16,
    lineHeight: 1.6,
    headingLineHeight: 1.1,
    headingWeight: 700,
    bodyWeight: 400,
  };

  describe('Constructor and ID Generation', () => {
    it('should generate a unique ID by default', () => {
      const builder1 = new ThemeBuilder();
      const builder2 = new ThemeBuilder();

      const theme1 = builder1.build();
      const theme2 = builder2.build();

      expect(theme1.id).not.toBe(theme2.id);
    });

    it('should generate ID with timestamp prefix', () => {
      const builder = new ThemeBuilder();
      const theme = builder.build();

      expect(theme.id).toMatch(/^theme-\d+-\d+$/);
    });
  });

  describe('Basic Property Setters', () => {
    it('should set custom ID', () => {
      const theme = new ThemeBuilder()
        .setId('my-custom-id')
        .build();

      expect(theme.id).toBe('my-custom-id');
    });

    it('should set name', () => {
      const theme = new ThemeBuilder()
        .setName('My Custom Theme')
        .build();

      expect(theme.name).toBe('My Custom Theme');
    });

    it('should default name to "Custom Theme"', () => {
      const theme = new ThemeBuilder().build();

      expect(theme.name).toBe('Custom Theme');
    });

    it('should set presetId', () => {
      const theme = new ThemeBuilder()
        .setPresetId('spring')
        .build();

      expect(theme.presetId).toBe('spring');
    });

    it('should default presetId to "custom"', () => {
      const theme = new ThemeBuilder().build();

      expect(theme.presetId).toBe('custom');
    });

    it('should set mode to light', () => {
      const theme = new ThemeBuilder()
        .setMode('light')
        .build();

      expect(theme.mode).toBe('light');
      expect(theme.isDark).toBe(false);
    });

    it('should set mode to dark', () => {
      const theme = new ThemeBuilder()
        .setMode('dark')
        .build();

      expect(theme.mode).toBe('dark');
      expect(theme.isDark).toBe(true);
    });

    it('should default mode to light', () => {
      const theme = new ThemeBuilder().build();

      expect(theme.mode).toBe('light');
    });
  });

  describe('Color Methods', () => {
    it('should set primary color and auto-generate variants', () => {
      const theme = new ThemeBuilder()
        .setPrimaryColor('#ff0000')
        .setAccentColor('#00ff00')
        .build();

      expect(theme.colors.primary).toBe('#ff0000');
      expect(theme.colors.primaryLight).toBeDefined();
      expect(theme.colors.primaryDark).toBeDefined();
    });

    it('should set accent color and auto-generate variants', () => {
      const theme = new ThemeBuilder()
        .setPrimaryColor('#ff0000')
        .setAccentColor('#00ff00')
        .build();

      expect(theme.colors.accent).toBe('#00ff00');
      expect(theme.colors.accentLight).toBeDefined();
      expect(theme.colors.accentDark).toBeDefined();
    });

    it('should generate light mode colors by default', () => {
      const theme = new ThemeBuilder()
        .setPrimaryColor('#6366f1')
        .setAccentColor('#ec4899')
        .build();

      expect(theme.colors.background).toBe('#ffffff');
      expect(theme.colors.text).toBe('#1e293b');
    });

    it('should generate dark mode colors when mode is dark', () => {
      const theme = new ThemeBuilder()
        .setMode('dark')
        .setPrimaryColor('#6366f1')
        .setAccentColor('#ec4899')
        .build();

      expect(theme.colors.background).toBe('#0f172a');
      expect(theme.colors.text).toBe('#f1f5f9');
    });

    it('should use custom background color', () => {
      const theme = new ThemeBuilder()
        .setPrimaryColor('#6366f1')
        .setAccentColor('#ec4899')
        .setBackgroundColor('#f0f0f0')
        .build();

      expect(theme.colors.background).toBe('#f0f0f0');
    });

    it('should use full color palette when provided', () => {
      const theme = new ThemeBuilder()
        .setColors(validColorProps)
        .build();

      expect(theme.colors.primary).toBe('#6366f1');
      expect(theme.colors.accent).toBe('#ec4899');
      expect(theme.colors.background).toBe('#ffffff');
    });

    it('should use default colors when none provided', () => {
      const theme = new ThemeBuilder().build();

      // Default primary and accent
      expect(theme.colors.primary).toBe('#6366f1');
      expect(theme.colors.accent).toBe('#ec4899');
    });
  });

  describe('Typography Methods', () => {
    it('should set heading font', () => {
      const theme = new ThemeBuilder()
        .setHeadingFont('Montserrat')
        .build();

      expect(theme.typography.headingFont).toBe('Montserrat');
    });

    it('should set body font', () => {
      const theme = new ThemeBuilder()
        .setBodyFont('Roboto')
        .build();

      expect(theme.typography.bodyFont).toBe('Roboto');
    });

    it('should use default typography for unset properties', () => {
      const theme = new ThemeBuilder()
        .setHeadingFont('Montserrat')
        .build();

      expect(theme.typography.headingFont).toBe('Montserrat');
      expect(theme.typography.bodyFont).toBe('Inter'); // Default
      expect(theme.typography.baseFontSize).toBe(16); // Default
    });

    it('should use full typography when provided', () => {
      const theme = new ThemeBuilder()
        .setTypography(validTypographyProps)
        .build();

      expect(theme.typography.headingFont).toBe('Montserrat');
      expect(theme.typography.bodyFont).toBe('Roboto');
    });
  });

  describe('Custom CSS', () => {
    it('should set custom CSS', () => {
      const theme = new ThemeBuilder()
        .setCustomCSS('.custom { color: red; }')
        .build();

      expect(theme.customCSS).toBe('.custom { color: red; }');
    });

    it('should have undefined customCSS by default', () => {
      const theme = new ThemeBuilder().build();

      expect(theme.customCSS).toBeUndefined();
    });
  });

  describe('fromTheme', () => {
    it('should copy all properties from existing theme', () => {
      const original = new Theme({
        id: 'original-id',
        name: 'Original Theme',
        presetId: 'spring',
        mode: 'dark',
        colors: validColorProps,
        typography: validTypographyProps,
        customCSS: '.custom {}',
      });

      const copy = new ThemeBuilder()
        .fromTheme(original)
        .build();

      expect(copy.id).toBe('original-id');
      expect(copy.name).toBe('Original Theme');
      expect(copy.presetId).toBe('spring');
      expect(copy.mode).toBe('dark');
      expect(copy.colors.primary).toBe(original.colors.primary);
      expect(copy.customCSS).toBe('.custom {}');
    });

    it('should allow modifications after fromTheme', () => {
      const original = new Theme({
        id: 'original-id',
        name: 'Original Theme',
        presetId: 'default',
        mode: 'light',
        colors: validColorProps,
        typography: validTypographyProps,
      });

      const modified = new ThemeBuilder()
        .fromTheme(original)
        .setName('Modified Theme')
        .setMode('dark')
        .build();

      expect(modified.id).toBe('original-id');
      expect(modified.name).toBe('Modified Theme');
      expect(modified.mode).toBe('dark');
    });
  });

  describe('fromPreset', () => {
    it('should create new theme based on preset with new ID', () => {
      const preset = new Theme({
        id: 'preset-id',
        name: 'Spring',
        presetId: 'spring',
        mode: 'light',
        colors: validColorProps,
        typography: validTypographyProps,
      });

      const newTheme = new ThemeBuilder()
        .fromPreset(preset)
        .build();

      expect(newTheme.id).not.toBe('preset-id');
      expect(newTheme.name).toBe('Spring (Custom)');
      expect(newTheme.presetId).toBe('spring');
    });

    it('should allow modifications after fromPreset', () => {
      const preset = new Theme({
        id: 'preset-id',
        name: 'Summer',
        presetId: 'summer',
        mode: 'light',
        colors: validColorProps,
        typography: validTypographyProps,
      });

      const customized = new ThemeBuilder()
        .fromPreset(preset)
        .setName('My Summer Theme')
        .setHeadingFont('Poppins')
        .build();

      expect(customized.name).toBe('My Summer Theme');
      expect(customized.typography.headingFont).toBe('Poppins');
    });
  });

  describe('Fluent API (Method Chaining)', () => {
    it('should support full method chaining', () => {
      const theme = new ThemeBuilder()
        .setId('chained-theme')
        .setName('Chained Theme')
        .setPresetId('custom')
        .setMode('light')
        .setPrimaryColor('#ff0000')
        .setAccentColor('#00ff00')
        .setBackgroundColor('#f0f0f0')
        .setHeadingFont('Poppins')
        .setBodyFont('Open Sans')
        .setCustomCSS('.test {}')
        .build();

      expect(theme.id).toBe('chained-theme');
      expect(theme.name).toBe('Chained Theme');
      expect(theme.mode).toBe('light');
      expect(theme.colors.primary).toBe('#ff0000');
      expect(theme.typography.headingFont).toBe('Poppins');
      expect(theme.customCSS).toBe('.test {}');
    });

    it('should return ThemeBuilder instance from each setter', () => {
      const builder = new ThemeBuilder();

      expect(builder.setId('id')).toBe(builder);
      expect(builder.setName('name')).toBe(builder);
      expect(builder.setPresetId('custom')).toBe(builder);
      expect(builder.setMode('light')).toBe(builder);
      expect(builder.setPrimaryColor('#000000')).toBe(builder);
      expect(builder.setAccentColor('#ffffff')).toBe(builder);
      expect(builder.setBackgroundColor('#cccccc')).toBe(builder);
      expect(builder.setHeadingFont('Inter')).toBe(builder);
      expect(builder.setBodyFont('Inter')).toBe(builder);
      expect(builder.setCustomCSS('')).toBe(builder);
    });
  });

  describe('Build Output', () => {
    it('should return a valid Theme instance', () => {
      const theme = new ThemeBuilder().build();

      expect(theme).toBeInstanceOf(Theme);
      expect(theme.id).toBeDefined();
      expect(theme.name).toBeDefined();
      expect(theme.colors).toBeDefined();
      expect(theme.typography).toBeDefined();
    });

    it('should create immutable theme', () => {
      const builder = new ThemeBuilder()
        .setName('Original');

      const theme1 = builder.build();
      builder.setName('Modified');
      const theme2 = builder.build();

      expect(theme1.name).toBe('Original');
      expect(theme2.name).toBe('Modified');
    });
  });
});
