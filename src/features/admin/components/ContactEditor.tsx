import { useState } from 'react'
import { usePortfolioEditor } from '../hooks/usePortfolioEditor'
import { SocialPlatform } from '@/features/portfolio/models'
import { DraftSocialLink, DraftContactField } from '../services/PortfolioEditorService'
import { SocialIcon, SOCIAL_PLATFORMS } from './SocialIcons'

const defaultNewLink: DraftSocialLink = {
  platform: 'github',
  url: '',
  label: '',
}

const defaultNewField: DraftContactField = {
  label: '',
  value: '',
  icon: '',
}

export function ContactEditor() {
  const {
    draft,
    hasUnsavedChanges,
    updateContact,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    addContactField,
    updateContactField,
    removeContactField,
    saveCurrentVersion,
    discardChanges,
  } = usePortfolioEditor()

  const [newLink, setNewLink] = useState<DraftSocialLink | null>(null)
  const [newField, setNewField] = useState<DraftContactField | null>(null)

  if (!draft) {
    return (
      <div className="editor-section">
        <div className="editor-section__content">
          <p className="text-light">No portfolio loaded. Please select a version from the dashboard.</p>
        </div>
      </div>
    )
  }

  const { contact } = draft

  const handleAddLink = () => {
    setNewLink({ ...defaultNewLink })
  }

  const handleSaveNewLink = () => {
    if (!newLink) return
    if (!newLink.url.trim() || !newLink.label.trim()) {
      alert('URL and Label are required')
      return
    }
    addSocialLink(newLink)
    setNewLink(null)
  }

  const handleAddField = () => {
    setNewField({ ...defaultNewField })
  }

  const handleSaveNewField = () => {
    if (!newField) return
    if (!newField.label.trim() || !newField.value.trim()) {
      alert('Label and Value are required')
      return
    }
    addContactField(newField)
    setNewField(null)
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Edit Contact Info</h1>
        <p className="admin-dashboard__subtitle">
          Update your contact information and social links
        </p>
      </header>

      {/* Basic Contact Info */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Contact Information</h2>
          <button className="btn btn-outline btn-sm" onClick={handleAddField}>
            + Add Field
          </button>
        </div>
        <div className="editor-section__content">
          <div className="editor-form">
            <div className="editor-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-input"
                  value={contact.email}
                  onChange={(e) => updateContact({ email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-location">
                  Location
                </label>
                <input
                  type="text"
                  id="contact-location"
                  className="form-input"
                  value={contact.location}
                  onChange={(e) => updateContact({ location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* New Custom Field Form */}
            {newField && (
              <div className="list-editor__item mt-lg" style={{ background: 'var(--color-background-alt)' }}>
                <div className="list-editor__item-content">
                  <div className="editor-row">
                    <div className="form-group mb-sm">
                      <label className="form-label text-sm">Icon (emoji)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newField.icon || ''}
                        onChange={(e) => setNewField({ ...newField, icon: e.target.value })}
                        placeholder="e.g., 📞"
                        style={{ width: '80px' }}
                      />
                    </div>
                    <div className="form-group mb-sm">
                      <label className="form-label text-sm">Label</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newField.label}
                        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                        placeholder="e.g., Phone"
                      />
                    </div>
                    <div className="form-group mb-sm">
                      <label className="form-label text-sm">Value</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newField.value}
                        onChange={(e) => setNewField({ ...newField, value: e.target.value })}
                        placeholder="e.g., +1 234 567 8900"
                      />
                    </div>
                  </div>
                  <div className="flex gap-sm mt-md">
                    <button className="btn btn-primary btn-sm" onClick={handleSaveNewField}>
                      Add Field
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setNewField(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Fields List */}
            {contact.customFields && contact.customFields.length > 0 && (
              <div className="list-editor mt-lg">
                {contact.customFields.map((field, index) => (
                  <div key={index} className="list-editor__item">
                    <div className="list-editor__item-content">
                      <div className="editor-row">
                        <div className="form-group mb-sm">
                          <label className="form-label text-sm">Icon</label>
                          <input
                            type="text"
                            className="form-input"
                            value={field.icon || ''}
                            onChange={(e) => updateContactField(index, { icon: e.target.value })}
                            placeholder="📞"
                            style={{ width: '80px' }}
                          />
                        </div>
                        <div className="form-group mb-sm">
                          <label className="form-label text-sm">Label</label>
                          <input
                            type="text"
                            className="form-input"
                            value={field.label}
                            onChange={(e) => updateContactField(index, { label: e.target.value })}
                            placeholder="Label"
                          />
                        </div>
                        <div className="form-group mb-sm">
                          <label className="form-label text-sm">Value</label>
                          <input
                            type="text"
                            className="form-input"
                            value={field.value}
                            onChange={(e) => updateContactField(index, { value: e.target.value })}
                            placeholder="Value"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="list-editor__item-actions">
                      <span className="text-xl mr-sm">{field.icon || '📋'}</span>
                      <button
                        type="button"
                        className="btn-icon btn-icon--danger"
                        onClick={() => {
                          if (confirm(`Remove "${field.label}"?`)) {
                            removeContactField(index)
                          }
                        }}
                        aria-label="Remove field"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Social Links</h2>
          <button className="btn btn-outline btn-sm" onClick={handleAddLink}>
            + Add Link
          </button>
        </div>
        <div className="editor-section__content">
          <div className="list-editor">
            {/* New Link Form */}
            {newLink && (
              <div className="list-editor__item" style={{ background: 'var(--color-background-alt)' }}>
                <div className="list-editor__item-content">
                  <div className="editor-row">
                    <div className="form-group mb-sm">
                      <label className="form-label text-sm">Platform</label>
                      <select
                        className="form-input version-selector__select"
                        value={newLink.platform}
                        onChange={(e) =>
                          setNewLink({ ...newLink, platform: e.target.value as SocialPlatform })
                        }
                      >
                        {SOCIAL_PLATFORMS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mb-sm">
                      <label className="form-label text-sm">Label</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newLink.label}
                        onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                        placeholder="e.g., My GitHub"
                      />
                    </div>
                    <div className="form-group mb-sm">
                      <label className="form-label text-sm">URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  {newLink.platform === 'custom' && (
                    <div className="form-group mb-sm">
                      <label className="form-label text-sm">Custom Icon (emoji or URL)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newLink.customIcon || ''}
                        onChange={(e) => setNewLink({ ...newLink, customIcon: e.target.value })}
                        placeholder="e.g., 🔗 or https://example.com/icon.png"
                      />
                      <p className="text-sm text-muted mt-xs">
                        Enter an emoji or image URL for your custom platform icon
                      </p>
                    </div>
                  )}
                  <div className="flex gap-sm mt-md">
                    <button className="btn btn-primary btn-sm" onClick={handleSaveNewLink}>
                      Add Link
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setNewLink(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Links */}
            {contact.socialLinks.map((link, index) => {
              const platformInfo = SOCIAL_PLATFORMS.find((p) => p.value === link.platform)

              return (
                <div key={index} className="list-editor__item">
                  <div className="list-editor__item-content">
                    <div className="editor-row">
                      <div className="form-group mb-sm">
                        <label className="form-label text-sm">Platform</label>
                        <select
                          className="form-input version-selector__select"
                          value={link.platform}
                          onChange={(e) =>
                            updateSocialLink(index, { platform: e.target.value as SocialPlatform })
                          }
                        >
                          {SOCIAL_PLATFORMS.map((p) => (
                            <option key={p.value} value={p.value}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mb-sm">
                        <label className="form-label text-sm">Label</label>
                        <input
                          type="text"
                          className="form-input"
                          value={link.label}
                          onChange={(e) => updateSocialLink(index, { label: e.target.value })}
                          placeholder="Display label"
                        />
                      </div>
                      <div className="form-group mb-sm">
                        <label className="form-label text-sm">URL</label>
                        <input
                          type="url"
                          className="form-input"
                          value={link.url}
                          onChange={(e) => updateSocialLink(index, { url: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    {link.platform === 'custom' && (
                      <div className="form-group mb-sm">
                        <label className="form-label text-sm">Custom Icon (emoji or URL)</label>
                        <input
                          type="text"
                          className="form-input"
                          value={link.customIcon || ''}
                          onChange={(e) => updateSocialLink(index, { customIcon: e.target.value })}
                          placeholder="e.g., 🔗 or https://example.com/icon.png"
                        />
                      </div>
                    )}
                  </div>
                  <div className="list-editor__item-actions">
                    <span className="mr-sm" title={platformInfo?.label || 'Custom'}>
                      <SocialIcon
                        platform={link.platform}
                        customIcon={link.customIcon}
                        size={24}
                      />
                    </span>
                    <button
                      type="button"
                      className="btn-icon btn-icon--danger"
                      onClick={() => {
                        if (confirm(`Remove ${link.label}?`)) {
                          removeSocialLink(index)
                        }
                      }}
                      aria-label="Remove link"
                    >
                      X
                    </button>
                  </div>
                </div>
              )
            })}

            {contact.socialLinks.length === 0 && !newLink && (
              <p className="text-light text-center">
                No social links added. Click "Add Link" to get started.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {hasUnsavedChanges && (
        <div className="editor-actions">
          <button className="btn btn-primary" onClick={saveCurrentVersion}>
            Save Changes
          </button>
          <button className="btn btn-ghost" onClick={discardChanges}>
            Discard Changes
          </button>
        </div>
      )}
    </div>
  )
}
