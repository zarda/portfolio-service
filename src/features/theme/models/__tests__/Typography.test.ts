import { describe, it, expect } from 'vitest';
import { Typography, TypographyProps, AVAILABLE_FONTS } from '../Typography';

describe('Typography', () => {
  const validTypographyProps: TypographyProps = {
    headingFont: 'Inter',
    bodyFont: 'Roboto',
    monoFont: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
    baseFontSize: 16,
    lineHeight: 1.6,
    headingLineHeight: 1.1,
    headingWeight: 700,
    bodyWeight: 400,
  };

  describe('Constructor', () => {
    it('should create Typography with valid props', () => {
      const typography = new Typography(validTypographyProps);

      expect(typography.headingFont).toBe('Inter');
      expect(typography.bodyFont).toBe('Roboto');
      expect(typography.baseFontSize).toBe(16);
    });

    it('should be immutable - props are copied', () => {
      const props = { ...validTypographyProps };
      const typography = new Typography(props);

      props.baseFontSize = 20;
      expect(typography.baseFontSize).toBe(16);
    });
  });

  describe('Validation', () => {
    it('should throw error when baseFontSize is less than 12', () => {
      const invalidProps = { ...validTypographyProps, baseFontSize: 10 };

      expect(() => new Typography(invalidProps)).toThrow(
        'Base font size must be between 12 and 24 pixels'
      );
    });

    it('should throw error when baseFontSize is greater than 24', () => {
      const invalidProps = { ...validTypographyProps, baseFontSize: 28 };

      expect(() => new Typography(invalidProps)).toThrow(
        'Base font size must be between 12 and 24 pixels'
      );
    });

    it('should accept baseFontSize at minimum boundary (12)', () => {
      const props = { ...validTypographyProps, baseFontSize: 12 };
      const typography = new Typography(props);

      expect(typography.baseFontSize).toBe(12);
    });

    it('should accept baseFontSize at maximum boundary (24)', () => {
      const props = { ...validTypographyProps, baseFontSize: 24 };
      const typography = new Typography(props);

      expect(typography.baseFontSize).toBe(24);
    });

    it('should throw error when lineHeight is less than 1.2', () => {
      const invalidProps = { ...validTypographyProps, lineHeight: 1.0 };

      expect(() => new Typography(invalidProps)).toThrow(
        'Line height must be between 1.2 and 2.0'
      );
    });

    it('should throw error when lineHeight is greater than 2.0', () => {
      const invalidProps = { ...validTypographyProps, lineHeight: 2.5 };

      expect(() => new Typography(invalidProps)).toThrow(
        'Line height must be between 1.2 and 2.0'
      );
    });

    it('should throw error when headingLineHeight is less than 1.0', () => {
      const invalidProps = { ...validTypographyProps, headingLineHeight: 0.8 };

      expect(() => new Typography(invalidProps)).toThrow(
        'Heading line height must be between 1.0 and 1.6'
      );
    });

    it('should throw error when headingLineHeight is greater than 1.6', () => {
      const invalidProps = { ...validTypographyProps, headingLineHeight: 1.8 };

      expect(() => new Typography(invalidProps)).toThrow(
        'Heading line height must be between 1.0 and 1.6'
      );
    });
  });

  describe('Getters', () => {
    const typography = new Typography(validTypographyProps);

    it('should return font properties', () => {
      expect(typography.headingFont).toBe('Inter');
      expect(typography.bodyFont).toBe('Roboto');
      expect(typography.monoFont).toBe(
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace"
      );
    });

    it('should return size properties', () => {
      expect(typography.baseFontSize).toBe(16);
      expect(typography.lineHeight).toBe(1.6);
      expect(typography.headingLineHeight).toBe(1.1);
    });

    it('should return weight properties', () => {
      expect(typography.headingWeight).toBe(700);
      expect(typography.bodyWeight).toBe(400);
    });
  });

  describe('Font Stacks', () => {
    it('should return heading font stack', () => {
      const typography = new Typography(validTypographyProps);
      const stack = typography.getHeadingFontStack();

      expect(stack).toContain('Inter');
      expect(stack).toContain('sans-serif');
    });

    it('should return body font stack', () => {
      const typography = new Typography(validTypographyProps);
      const stack = typography.getBodyFontStack();

      expect(stack).toContain('Roboto');
      expect(stack).toContain('sans-serif');
    });

    it('should return serif fallback for serif fonts', () => {
      const props = { ...validTypographyProps, headingFont: 'Playfair Display' as const };
      const typography = new Typography(props);
      const stack = typography.getHeadingFontStack();

      expect(stack).toContain('Playfair Display');
      expect(stack).toContain('Georgia');
      expect(stack).toContain('serif');
    });

    it('should return system-ui stack for system-ui font', () => {
      const props = { ...validTypographyProps, bodyFont: 'system-ui' as const };
      const typography = new Typography(props);
      const stack = typography.getBodyFontStack();

      expect(stack).toContain('system-ui');
      expect(stack).toContain('BlinkMacSystemFont');
    });
  });

  describe('toCSSVariables', () => {
    it('should return all CSS custom properties', () => {
      const typography = new Typography(validTypographyProps);
      const cssVars = typography.toCSSVariables();

      expect(cssVars['--font-heading']).toContain('Inter');
      expect(cssVars['--font-body']).toContain('Roboto');
      expect(cssVars['--font-mono']).toBe(validTypographyProps.monoFont);
      expect(cssVars['--font-size-base']).toBe('16px');
      expect(cssVars['--line-height']).toBe('1.6');
      expect(cssVars['--line-height-heading']).toBe('1.1');
      expect(cssVars['--font-weight-heading']).toBe('700');
      expect(cssVars['--font-weight-body']).toBe('400');
    });
  });

  describe('default', () => {
    it('should create default typography settings', () => {
      const typography = Typography.default();

      expect(typography.headingFont).toBe('Inter');
      expect(typography.bodyFont).toBe('Inter');
      expect(typography.baseFontSize).toBe(16);
      expect(typography.lineHeight).toBe(1.6);
      expect(typography.headingLineHeight).toBe(1.1);
      expect(typography.headingWeight).toBe(700);
      expect(typography.bodyWeight).toBe(400);
    });

    it('should return a valid Typography instance', () => {
      const typography = Typography.default();

      expect(typography).toBeInstanceOf(Typography);
      expect(typography.getHeadingFontStack()).toBeDefined();
    });
  });

  describe('Serialization', () => {
    it('should serialize to JSON', () => {
      const typography = new Typography(validTypographyProps);
      const json = typography.toJSON();

      expect(json).toEqual(validTypographyProps);
    });

    it('should return a copy of props in toJSON', () => {
      const typography = new Typography(validTypographyProps);
      const json1 = typography.toJSON();
      const json2 = typography.toJSON();

      expect(json1).not.toBe(json2);
      expect(json1).toEqual(json2);
    });

    it('should deserialize from JSON', () => {
      const typography = Typography.fromJSON(validTypographyProps);

      expect(typography.headingFont).toBe('Inter');
      expect(typography.bodyFont).toBe('Roboto');
    });

    it('should round-trip serialize/deserialize', () => {
      const original = new Typography(validTypographyProps);
      const json = original.toJSON();
      const restored = Typography.fromJSON(json);

      expect(restored.toJSON()).toEqual(original.toJSON());
    });
  });

  describe('AVAILABLE_FONTS', () => {
    it('should contain all font families', () => {
      const fontNames = AVAILABLE_FONTS.map((f) => f.value);

      expect(fontNames).toContain('Inter');
      expect(fontNames).toContain('Roboto');
      expect(fontNames).toContain('Playfair Display');
      expect(fontNames).toContain('system-ui');
    });

    it('should have correct categories', () => {
      const inter = AVAILABLE_FONTS.find((f) => f.value === 'Inter');
      const playfair = AVAILABLE_FONTS.find((f) => f.value === 'Playfair Display');

      expect(inter?.category).toBe('sans');
      expect(playfair?.category).toBe('serif');
    });

    it('should have labels for all fonts', () => {
      AVAILABLE_FONTS.forEach((font) => {
        expect(font.label).toBeDefined();
        expect(font.label.length).toBeGreaterThan(0);
      });
    });
  });
});
