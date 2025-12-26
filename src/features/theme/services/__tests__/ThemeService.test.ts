import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ThemeService, Season, SeasonalThemeMap } from '../ThemeService';
import { ThemeBuilder } from '../ThemeBuilder';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get store() {
      return store;
    },
  };
})();

// Mock matchMedia
const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
  matches: query === '(prefers-color-scheme: dark)' ? false : false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock document
const documentMock = {
  documentElement: {
    style: {
      setProperty: vi.fn(),
    },
  },
  body: {
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
    },
  },
  getElementById: vi.fn().mockReturnValue(null),
  createElement: vi.fn().mockReturnValue({
    id: '',
    rel: '',
    href: '',
    textContent: '',
  }),
  head: {
    appendChild: vi.fn(),
  },
  querySelector: vi.fn().mockReturnValue(null),
};

describe('ThemeService', () => {
  beforeEach(() => {
    // Setup mocks
    Object.defineProperty(global, 'localStorage', { value: localStorageMock, writable: true });
    Object.defineProperty(global, 'window', {
      value: {
        localStorage: localStorageMock,
        matchMedia: matchMediaMock,
        location: { search: '' },
      },
      writable: true,
    });
    Object.defineProperty(global, 'document', { value: documentMock, writable: true });

    // Reset before each test
    ThemeService.reset();
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    ThemeService.reset();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = ThemeService.getInstance();
      const instance2 = ThemeService.getInstance();

      expect(instance1).toBe(instance2);
    });

    it('should create new instance after reset', () => {
      const instance1 = ThemeService.getInstance();
      ThemeService.reset();
      const instance2 = ThemeService.getInstance();

      expect(instance1).not.toBe(instance2);
    });
  });

  describe('Theme Retrieval', () => {
    it('should return current theme', () => {
      const service = ThemeService.getInstance();
      const theme = service.getCurrentTheme();

      expect(theme).toBeDefined();
      expect(theme.id).toBeDefined();
      expect(theme.name).toBeDefined();
    });

    it('should return preset ID', () => {
      const service = ThemeService.getInstance();
      const presetId = service.getPresetId();

      expect(presetId).toBeDefined();
    });

    it('should return mode', () => {
      const service = ThemeService.getInstance();
      const mode = service.getMode();

      expect(['light', 'dark']).toContain(mode);
    });
  });

  describe('Theme Switching', () => {
    it('should switch to a preset theme', () => {
      const service = ThemeService.getInstance();

      service.setPreset('ocean');

      expect(service.getPresetId()).toBe('ocean');
    });

    it('should preserve mode when switching preset', () => {
      const service = ThemeService.getInstance();
      service.setMode('dark');

      service.setPreset('forest');

      expect(service.getPresetId()).toBe('forest');
      expect(service.getMode()).toBe('dark');
    });

    it('should switch to light mode', () => {
      const service = ThemeService.getInstance();

      service.setMode('light');

      expect(service.getMode()).toBe('light');
    });

    it('should switch to dark mode', () => {
      const service = ThemeService.getInstance();

      service.setMode('dark');

      expect(service.getMode()).toBe('dark');
    });

    it('should toggle mode from light to dark', () => {
      const service = ThemeService.getInstance();
      service.setMode('light');

      service.toggleMode();

      expect(service.getMode()).toBe('dark');
    });

    it('should toggle mode from dark to light', () => {
      const service = ThemeService.getInstance();
      service.setMode('dark');

      service.toggleMode();

      expect(service.getMode()).toBe('light');
    });

    it('should set a custom theme', () => {
      const service = ThemeService.getInstance();
      const customTheme = new ThemeBuilder()
        .setId('custom-1')
        .setName('My Custom')
        .setPresetId('custom')
        .setPrimaryColor('#ff0000')
        .setAccentColor('#00ff00')
        .build();

      service.setTheme(customTheme);

      expect(service.getCurrentTheme().id).toBe('custom-1');
      expect(service.getCurrentTheme().name).toBe('My Custom');
    });
  });

  describe('Available Presets', () => {
    it('should return list of available presets', () => {
      const service = ThemeService.getInstance();
      const presets = service.getAvailablePresets();

      expect(presets).toBeInstanceOf(Array);
      expect(presets.length).toBeGreaterThan(0);
    });

    it('should include preset info with id, name, and description', () => {
      const service = ThemeService.getInstance();
      const presets = service.getAvailablePresets();
      const firstPreset = presets[0];

      expect(firstPreset.id).toBeDefined();
      expect(firstPreset.name).toBeDefined();
      expect(firstPreset.description).toBeDefined();
    });
  });

  describe('Custom Theme Management', () => {
    it('should save a custom theme', () => {
      const service = ThemeService.getInstance();
      const customTheme = new ThemeBuilder()
        .setId('custom-save-1')
        .setName('Saved Theme')
        .build();

      service.saveCustomTheme(customTheme);
      const customThemes = service.getCustomThemes();

      expect(customThemes).toHaveLength(1);
      expect(customThemes[0].id).toBe('custom-save-1');
    });

    it('should return empty array when no custom themes', () => {
      const service = ThemeService.getInstance();
      const customThemes = service.getCustomThemes();

      expect(customThemes).toEqual([]);
    });

    it('should delete a custom theme', () => {
      const service = ThemeService.getInstance();
      const customTheme = new ThemeBuilder()
        .setId('custom-delete-1')
        .setName('To Delete')
        .build();

      service.saveCustomTheme(customTheme);
      expect(service.getCustomThemes()).toHaveLength(1);

      service.deleteCustomTheme('custom-delete-1');
      expect(service.getCustomThemes()).toHaveLength(0);
    });

    it('should switch to default when deleting current custom theme', () => {
      const service = ThemeService.getInstance();
      const customTheme = new ThemeBuilder()
        .setId('custom-current')
        .setName('Current')
        .build();

      service.saveCustomTheme(customTheme);
      service.setTheme(customTheme);
      expect(service.getCurrentTheme().id).toBe('custom-current');

      service.deleteCustomTheme('custom-current');
      expect(service.getPresetId()).toBe('default');
    });

    it('should persist custom themes to localStorage', () => {
      const service = ThemeService.getInstance();
      const customTheme = new ThemeBuilder()
        .setId('custom-persist')
        .setName('Persisted')
        .build();

      service.saveCustomTheme(customTheme);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio-custom-themes',
        expect.any(String)
      );
    });
  });

  describe('Theme Pairing', () => {
    it('should pair light and dark custom themes', () => {
      const service = ThemeService.getInstance();

      const lightTheme = new ThemeBuilder()
        .setId('light-pair')
        .setMode('light')
        .build();
      const darkTheme = new ThemeBuilder()
        .setId('dark-pair')
        .setMode('dark')
        .build();

      service.saveCustomTheme(lightTheme);
      service.saveCustomTheme(darkTheme);

      service.pairCustomThemes('light-pair', 'dark-pair');

      expect(service.getPairedThemeId('light-pair')).toBe('dark-pair');
      expect(service.getPairedThemeId('dark-pair')).toBe('light-pair');
    });

    it('should throw error when pairing non-existent themes', () => {
      const service = ThemeService.getInstance();

      expect(() => {
        service.pairCustomThemes('non-existent', 'also-non-existent');
      }).toThrow('Both themes must exist to pair them');
    });

    it('should throw error when pairing themes with wrong modes', () => {
      const service = ThemeService.getInstance();

      const theme1 = new ThemeBuilder()
        .setId('wrong-1')
        .setMode('light')
        .build();
      const theme2 = new ThemeBuilder()
        .setId('wrong-2')
        .setMode('light')
        .build();

      service.saveCustomTheme(theme1);
      service.saveCustomTheme(theme2);

      expect(() => {
        service.pairCustomThemes('wrong-1', 'wrong-2');
      }).toThrow('Must pair a light theme with a dark theme');
    });

    it('should unpair themes', () => {
      const service = ThemeService.getInstance();

      const lightTheme = new ThemeBuilder()
        .setId('light-unpair')
        .setMode('light')
        .build();
      const darkTheme = new ThemeBuilder()
        .setId('dark-unpair')
        .setMode('dark')
        .build();

      service.saveCustomTheme(lightTheme);
      service.saveCustomTheme(darkTheme);
      service.pairCustomThemes('light-unpair', 'dark-unpair');

      service.unpairCustomTheme('light-unpair');

      expect(service.getPairedThemeId('light-unpair')).toBeNull();
      expect(service.getPairedThemeId('dark-unpair')).toBeNull();
    });

    it('should return null for unpaired theme', () => {
      const service = ThemeService.getInstance();

      expect(service.getPairedThemeId('non-existent')).toBeNull();
    });
  });

  describe('Seasonal Themes', () => {
    it('should return default seasonal themes', () => {
      const service = ThemeService.getInstance();
      const seasonal = service.getSeasonalThemes();

      expect(seasonal.spring).toBe('spring');
      expect(seasonal.summer).toBe('summer');
      expect(seasonal.autumn).toBe('autumn');
      expect(seasonal.winter).toBe('winter');
    });

    it('should set seasonal theme', () => {
      const service = ThemeService.getInstance();

      service.setSeasonalTheme('summer', 'neon');
      const seasonal = service.getSeasonalThemes();

      expect(seasonal.summer).toBe('neon');
    });

    it('should apply theme as preview when setting seasonal theme', () => {
      const service = ThemeService.getInstance();

      service.setSeasonalTheme('winter', 'midnight');

      expect(service.getPresetId()).toBe('midnight');
    });

    it('should persist seasonal themes to localStorage', () => {
      const service = ThemeService.getInstance();

      service.setSeasonalTheme('autumn', 'forest');

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio-seasonal-themes',
        expect.any(String)
      );
    });

    it('should return a copy of seasonal themes', () => {
      const service = ThemeService.getInstance();
      const seasonal1 = service.getSeasonalThemes();
      const seasonal2 = service.getSeasonalThemes();

      expect(seasonal1).not.toBe(seasonal2);
      expect(seasonal1).toEqual(seasonal2);
    });
  });

  describe('Subscription', () => {
    it('should notify subscribers on theme change', () => {
      const service = ThemeService.getInstance();
      const callback = vi.fn();

      service.subscribe(callback);
      service.setPreset('ocean');

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(service.getCurrentTheme());
    });

    it('should allow unsubscribe', () => {
      const service = ThemeService.getInstance();
      const callback = vi.fn();

      const unsubscribe = service.subscribe(callback);
      service.setPreset('forest');
      expect(callback).toHaveBeenCalledTimes(1);

      unsubscribe();
      service.setPreset('sunset');
      expect(callback).toHaveBeenCalledTimes(1); // Should not increase
    });

    it('should support multiple subscribers', () => {
      const service = ThemeService.getInstance();
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      service.subscribe(callback1);
      service.subscribe(callback2);
      service.setPreset('midnight');

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });

    it('should notify on mode change', () => {
      const service = ThemeService.getInstance();
      const callback = vi.fn();

      service.subscribe(callback);
      service.toggleMode();

      expect(callback).toHaveBeenCalled();
    });
  });

  describe('localStorage Persistence', () => {
    it('should store theme on change', () => {
      const service = ThemeService.getInstance();

      service.setPreset('neon');

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio-theme',
        expect.any(String)
      );
    });

    it('should load custom themes on initialization', () => {
      const customThemes = [
        new ThemeBuilder()
          .setId('preloaded-1')
          .setName('Preloaded Theme')
          .build()
          .toJSON(),
      ];
      localStorageMock.store['portfolio-custom-themes'] = JSON.stringify(customThemes);

      ThemeService.reset();
      const service = ThemeService.getInstance();

      expect(service.getCustomThemes()).toHaveLength(1);
      expect(service.getCustomThemes()[0].id).toBe('preloaded-1');
    });

    it('should load seasonal themes on initialization', () => {
      const seasonalThemes: SeasonalThemeMap = {
        spring: 'ocean',
        summer: 'neon',
        autumn: 'forest',
        winter: 'midnight',
      };
      localStorageMock.store['portfolio-seasonal-themes'] = JSON.stringify(seasonalThemes);

      ThemeService.reset();
      const service = ThemeService.getInstance();
      const loaded = service.getSeasonalThemes();

      expect(loaded.spring).toBe('ocean');
      expect(loaded.summer).toBe('neon');
    });
  });
});
