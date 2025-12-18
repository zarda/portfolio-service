import { useState } from 'react';
import {
  useTheme,
  ThemePresetId,
  ThemeBuilder,
  AVAILABLE_FONTS,
  FontFamily,
  Theme,
  Season,
} from '../../theme';

const SEASONS: { id: Season; label: string; months: string }[] = [
  { id: 'spring', label: 'Spring', months: 'Mar - May' },
  { id: 'summer', label: 'Summer', months: 'Jun - Aug' },
  { id: 'autumn', label: 'Autumn', months: 'Sep - Nov' },
  { id: 'winter', label: 'Winter', months: 'Dec - Feb' },
];

export function ThemeEditor() {
  const {
    theme,
    presetId,
    mode,
    isDark,
    availablePresets,
    customThemes,
    seasonalThemes,
    setPreset,
    setMode,
    toggleMode,
    setTheme,
    saveCustomTheme,
    deleteCustomTheme,
    pairCustomThemes,
    unpairCustomTheme,
    getPairedThemeId,
    setSeasonalTheme,
  } = useTheme();

  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [customName, setCustomName] = useState('My Custom Theme');
  const [customPrimary, setCustomPrimary] = useState(theme.colors.primary);
  const [customAccent, setCustomAccent] = useState(theme.colors.accent);
  const [customBackground, setCustomBackground] = useState(theme.colors.background);
  const [customHeadingFont, setCustomHeadingFont] = useState<FontFamily>(
    theme.typography.headingFont
  );
  const [customBodyFont, setCustomBodyFont] = useState<FontFamily>(theme.typography.bodyFont);

  const handlePresetChange = (newPresetId: ThemePresetId) => {
    setPreset(newPresetId);
  };

  const handleCreateCustomTheme = () => {
    const newTheme = new ThemeBuilder()
      .setName(customName)
      .setPresetId('custom')
      .setMode(mode)
      .setPrimaryColor(customPrimary)
      .setAccentColor(customAccent)
      .setBackgroundColor(customBackground)
      .setHeadingFont(customHeadingFont)
      .setBodyFont(customBodyFont)
      .build();

    saveCustomTheme(newTheme);
    setTheme(newTheme);
    setIsCreatingCustom(false);
  };

  const handleApplyCustomTheme = (customTheme: Theme) => {
    setTheme(customTheme);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Theme Settings</h1>
        <p className="admin-dashboard__subtitle">
          Customize the appearance of your portfolio
        </p>
      </header>

      {/* Current Theme Info */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Current Theme</h2>
          <div className="flex gap-md items-center">
            <span className="text-light text-sm">
              {theme.name} ({mode} mode)
            </span>
            <button
              className="btn btn-sm btn-outline"
              onClick={toggleMode}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
        <div className="editor-section__content">
          <div className="flex gap-lg flex-wrap">
            <div className="flex gap-sm items-center">
              <span className="text-sm text-light">Primary:</span>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 'var(--radius-sm)',
                  background: theme.colors.primary,
                  border: '1px solid var(--color-border)',
                }}
              />
              <code className="text-sm">{theme.colors.primary}</code>
            </div>
            <div className="flex gap-sm items-center">
              <span className="text-sm text-light">Accent:</span>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 'var(--radius-sm)',
                  background: theme.colors.accent,
                  border: '1px solid var(--color-border)',
                }}
              />
              <code className="text-sm">{theme.colors.accent}</code>
            </div>
            <div className="flex gap-sm items-center">
              <span className="text-sm text-light">Font:</span>
              <span className="text-sm">{theme.typography.headingFont}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Mode Toggle */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Theme Mode</h2>
        </div>
        <div className="editor-section__content">
          <div className="flex gap-md">
            <label className="flex items-center gap-sm">
              <input
                type="radio"
                name="mode"
                value="light"
                checked={mode === 'light'}
                onChange={() => setMode('light')}
              />
              <span>Light</span>
            </label>
            <label className="flex items-center gap-sm">
              <input
                type="radio"
                name="mode"
                value="dark"
                checked={mode === 'dark'}
                onChange={() => setMode('dark')}
              />
              <span>Dark</span>
            </label>
          </div>
        </div>
      </div>

      {/* Seasonal Themes */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Seasonal Defaults</h2>
        </div>
        <div className="editor-section__content">
          <p className="text-light text-sm mb-md">
            Choose which theme to use for each season when no saved preference exists.
          </p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
            {SEASONS.map((season) => {
              const currentPreset = availablePresets.find(p => p.id === seasonalThemes[season.id]);
              return (
                <div
                  key={season.id}
                  style={{
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-background-alt)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div className="fw-semibold mb-sm">{season.label}</div>
                  <div className="text-light text-sm mb-md">{season.months}</div>
                  <select
                    className="form-input"
                    value={seasonalThemes[season.id]}
                    onChange={(e) => setSeasonalTheme(season.id, e.target.value as ThemePresetId)}
                    style={{ width: '100%' }}
                  >
                    {availablePresets.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.name}
                      </option>
                    ))}
                  </select>
                  {currentPreset && (
                    <div
                      style={{
                        marginTop: 'var(--space-sm)',
                        height: 8,
                        borderRadius: 4,
                        background: `linear-gradient(90deg, ${currentPreset.primaryColor} 0%, ${currentPreset.accentColor} 100%)`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Preset Themes */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Preset Themes</h2>
        </div>
        <div className="editor-section__content">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
            {availablePresets.map((preset) => {
              const bgColor = isDark ? preset.darkBackground : preset.lightBackground;
              const textColor = isDark ? '#f1f5f9' : '#1e293b';
              const textMuted = isDark ? '#94a3b8' : '#64748b';
              const isSelected = presetId === preset.id && !theme.isCustom;

              return (
                <div
                  key={preset.id}
                  onClick={() => handlePresetChange(preset.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handlePresetChange(preset.id)}
                  className="theme-card"
                  style={{
                    cursor: 'pointer',
                    border: `2px solid ${isSelected ? preset.primaryColor : 'transparent'}`,
                    borderRadius: 'var(--radius-lg)',
                    background: bgColor,
                    color: textColor,
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  {/* Gradient header */}
                  <div
                    style={{
                      height: 48,
                      background: `linear-gradient(135deg, ${preset.primaryColor} 0%, ${preset.accentColor} 100%)`,
                    }}
                  />
                  {/* Content */}
                  <div style={{ padding: 'var(--space-md)' }}>
                    <div className="fw-semibold" style={{ color: textColor, marginBottom: 4 }}>
                      {preset.name}
                    </div>
                    <p style={{ fontSize: '0.75rem', color: textMuted, margin: 0 }}>
                      {preset.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Themes */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Custom Themes</h2>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setIsCreatingCustom(!isCreatingCustom)}
          >
            {isCreatingCustom ? 'Cancel' : '+ Create Custom'}
          </button>
        </div>
        <div className="editor-section__content">
          {isCreatingCustom && (
            <div className="mb-xl" style={{ padding: 'var(--space-lg)', background: 'var(--color-background-alt)', borderRadius: 'var(--radius-lg)' }}>
              <h3 className="fw-semibold mb-md">Create Custom Theme</h3>

              <div className="editor-form">
                <div className="form-group">
                  <label className="form-label">Theme Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="My Custom Theme"
                  />
                </div>

                <div className="editor-row">
                  <div className="form-group">
                    <label className="form-label">Primary Color</label>
                    <div className="flex gap-sm items-center">
                      <input
                        type="color"
                        value={customPrimary}
                        onChange={(e) => setCustomPrimary(e.target.value)}
                        style={{ width: 48, height: 40, cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        className="form-input"
                        value={customPrimary}
                        onChange={(e) => setCustomPrimary(e.target.value)}
                        placeholder="#6366f1"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Accent Color</label>
                    <div className="flex gap-sm items-center">
                      <input
                        type="color"
                        value={customAccent}
                        onChange={(e) => setCustomAccent(e.target.value)}
                        style={{ width: 48, height: 40, cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        className="form-input"
                        value={customAccent}
                        onChange={(e) => setCustomAccent(e.target.value)}
                        placeholder="#ec4899"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Background Color</label>
                    <div className="flex gap-sm items-center">
                      <input
                        type="color"
                        value={customBackground}
                        onChange={(e) => setCustomBackground(e.target.value)}
                        style={{ width: 48, height: 40, cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        className="form-input"
                        value={customBackground}
                        onChange={(e) => setCustomBackground(e.target.value)}
                        placeholder={mode === 'light' ? '#ffffff' : '#0f172a'}
                      />
                    </div>
                  </div>
                </div>

                <div className="editor-row">
                  <div className="form-group">
                    <label className="form-label">Heading Font</label>
                    <select
                      className="form-input"
                      value={customHeadingFont}
                      onChange={(e) => setCustomHeadingFont(e.target.value as FontFamily)}
                    >
                      {AVAILABLE_FONTS.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Body Font</label>
                    <select
                      className="form-input"
                      value={customBodyFont}
                      onChange={(e) => setCustomBodyFont(e.target.value as FontFamily)}
                    >
                      {AVAILABLE_FONTS.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-md mt-lg">
                  <button className="btn btn-primary" onClick={handleCreateCustomTheme}>
                    Save Custom Theme
                  </button>
                  <button className="btn btn-ghost" onClick={() => setIsCreatingCustom(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {customThemes.length > 0 ? (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
              {customThemes.map((customTheme) => {
                const pairedId = getPairedThemeId(customTheme.id);
                const pairedTheme = pairedId ? customThemes.find(t => t.id === pairedId) : null;
                const oppositeMode = customTheme.mode === 'light' ? 'dark' : 'light';
                const availableForPairing = customThemes.filter(t => t.mode === oppositeMode);
                const isCurrentTheme = theme.id === customTheme.id;

                return (
                  <div
                    key={customTheme.id}
                    className="theme-card"
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      border: `2px solid ${isCurrentTheme ? customTheme.colors.primary : 'transparent'}`,
                      background: customTheme.colors.background,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    {/* Gradient header */}
                    <div
                      style={{
                        height: 40,
                        background: `linear-gradient(135deg, ${customTheme.colors.primary} 0%, ${customTheme.colors.accent} 100%)`,
                      }}
                    />
                    {/* Content */}
                    <div style={{ padding: 'var(--space-md)' }}>
                      <div
                        className="fw-semibold"
                        style={{ color: customTheme.colors.text, marginBottom: 4 }}
                      >
                        {customTheme.name}
                        <span
                          style={{
                            marginLeft: 'var(--space-sm)',
                            fontSize: '0.75rem',
                            opacity: 0.7,
                            fontWeight: 'normal',
                          }}
                        >
                          ({customTheme.mode})
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: customTheme.colors.textMuted,
                          margin: 0,
                          marginBottom: 8,
                        }}
                      >
                        {customTheme.typography.headingFont} / {customTheme.typography.bodyFont}
                      </p>

                      {/* Theme Pairing */}
                      <div className="flex gap-sm items-center" style={{ marginBottom: 12 }}>
                        <span style={{ fontSize: '0.7rem', color: customTheme.colors.textMuted }}>
                          Pair:
                        </span>
                        <select
                          style={{
                            padding: '2px 6px',
                            fontSize: '0.7rem',
                            borderRadius: 'var(--radius-sm)',
                            border: `1px solid ${customTheme.colors.border}`,
                            background: customTheme.colors.backgroundAlt,
                            color: customTheme.colors.text,
                            minWidth: 100,
                          }}
                          value={pairedId || ''}
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            if (selectedId) {
                              if (customTheme.mode === 'light') {
                                pairCustomThemes(customTheme.id, selectedId);
                              } else {
                                pairCustomThemes(selectedId, customTheme.id);
                              }
                            } else {
                              unpairCustomTheme(customTheme.id);
                            }
                          }}
                        >
                          <option value="">None</option>
                          {availableForPairing.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                        {pairedTheme && (
                          <span style={{ fontSize: '0.7rem', color: customTheme.colors.textMuted }}>
                            🔗
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-sm">
                        <button
                          style={{
                            flex: 1,
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            border: `1px solid ${customTheme.colors.primary}`,
                            background: 'transparent',
                            color: customTheme.colors.primary,
                            cursor: 'pointer',
                          }}
                          onClick={() => handleApplyCustomTheme(customTheme)}
                        >
                          Apply
                        </button>
                        <button
                          style={{
                            padding: '6px 10px',
                            fontSize: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            border: `1px solid ${customTheme.colors.border}`,
                            background: 'transparent',
                            color: customTheme.colors.error,
                            cursor: 'pointer',
                          }}
                          onClick={() => deleteCustomTheme(customTheme.id)}
                          aria-label="Delete theme"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            !isCreatingCustom && (
              <p className="text-light text-sm">
                No custom themes yet. Click "Create Custom" to design your own theme.
              </p>
            )
          )}
        </div>
      </div>

      {/* Live Preview Info */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Preview</h2>
        </div>
        <div className="editor-section__content">
          <p className="text-light text-sm mb-md">
            Changes are applied instantly. View your portfolio to see the current theme in action.
          </p>
          <div
            style={{
              padding: 'var(--space-xl)',
              background: 'var(--gradient-primary)',
              borderRadius: 'var(--radius-lg)',
              color: 'white',
            }}
          >
            <h3
              style={{
                fontFamily: theme.typography.headingFont,
                fontWeight: theme.typography.headingWeight,
                fontSize: '1.5rem',
                marginBottom: 'var(--space-sm)',
              }}
            >
              Theme Preview
            </h3>
            <p
              style={{
                fontFamily: theme.typography.bodyFont,
                fontWeight: theme.typography.bodyWeight,
              }}
            >
              This is how your gradient and typography will look.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
