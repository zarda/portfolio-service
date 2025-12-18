import { usePortfolioEditor } from '../hooks/usePortfolioEditor'

export function ProfileEditor() {
  const {
    draft,
    hasUnsavedChanges,
    updateProfile,
    updateProfileStat,
    addProfileStat,
    removeProfileStat,
    updateAboutParagraph,
    addAboutParagraph,
    removeAboutParagraph,
    saveCurrentVersion,
    discardChanges,
  } = usePortfolioEditor()

  if (!draft) {
    return (
      <div className="editor-section">
        <div className="editor-section__content">
          <p className="text-light">No portfolio loaded. Please select a version from the dashboard.</p>
        </div>
      </div>
    )
  }

  const { profile } = draft

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Edit Profile</h1>
        <p className="admin-dashboard__subtitle">
          Update your personal information and bio
        </p>
      </header>

      {/* Basic Info */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Basic Information</h2>
        </div>
        <div className="editor-section__content">
          <div className="editor-form">
            <div className="editor-row">
              <div className="form-group">
                <label className="form-label" htmlFor="profile-name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="profile-name"
                  className="form-input"
                  value={profile.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="profile-title">
                  Professional Title
                </label>
                <input
                  type="text"
                  id="profile-title"
                  className="form-input"
                  value={profile.title}
                  onChange={(e) => updateProfile({ title: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="profile-greeting">
                Greeting
              </label>
              <input
                type="text"
                id="profile-greeting"
                className="form-input"
                value={profile.greeting}
                onChange={(e) => updateProfile({ greeting: e.target.value })}
                placeholder="e.g., Hello, I'm"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="profile-description">
                Short Description (for hero section)
              </label>
              <textarea
                id="profile-description"
                className="form-input form-textarea"
                value={profile.description}
                onChange={(e) => updateProfile({ description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="profile-photo">
                Photo URL
              </label>
              <input
                type="text"
                id="profile-photo"
                className="form-input"
                value={profile.photoUrl}
                onChange={(e) => updateProfile({ photoUrl: e.target.value })}
                placeholder="URL to your profile photo"
              />
              {profile.photoUrl && (
                <div className="mt-md">
                  <img
                    src={profile.photoUrl}
                    alt="Profile preview"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-lg)',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Paragraphs */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">About Section</h2>
        </div>
        <div className="editor-section__content">
          <div className="list-editor">
            {profile.aboutParagraphs.map((paragraph, index) => (
              <div key={index} className="list-editor__item">
                <div className="list-editor__item-content">
                  <textarea
                    className="form-input form-textarea"
                    value={paragraph}
                    onChange={(e) => updateAboutParagraph(index, e.target.value)}
                    rows={3}
                    placeholder={`Paragraph ${index + 1}`}
                  />
                </div>
                <div className="list-editor__item-actions">
                  <button
                    type="button"
                    className="btn-icon btn-icon--danger"
                    onClick={() => removeAboutParagraph(index)}
                    aria-label="Remove paragraph"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="list-editor__add"
              onClick={() => addAboutParagraph('')}
            >
              + Add Paragraph
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Profile Stats</h2>
        </div>
        <div className="editor-section__content">
          <div className="list-editor">
            {profile.stats.map((stat, index) => (
              <div key={index} className="list-editor__item">
                <div className="list-editor__item-content">
                  <div className="editor-row">
                    <div className="form-group mb-sm">
                      <label className="form-label text-sm">Value</label>
                      <input
                        type="text"
                        className="form-input"
                        value={stat.value}
                        onChange={(e) =>
                          updateProfileStat(index, { value: e.target.value })
                        }
                        placeholder="e.g., 5+"
                      />
                    </div>
                    <div className="form-group mb-sm">
                      <label className="form-label text-sm">Label</label>
                      <input
                        type="text"
                        className="form-input"
                        value={stat.label}
                        onChange={(e) =>
                          updateProfileStat(index, { label: e.target.value })
                        }
                        placeholder="e.g., Years Experience"
                      />
                    </div>
                    <div className="form-group mb-sm">
                      <label className="form-label text-sm">Link (optional)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={stat.link || ''}
                        onChange={(e) =>
                          updateProfileStat(index, { link: e.target.value || undefined })
                        }
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
                <div className="list-editor__item-actions">
                  <button
                    type="button"
                    className="btn-icon btn-icon--danger"
                    onClick={() => removeProfileStat(index)}
                    aria-label="Remove stat"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="list-editor__add"
              onClick={() => addProfileStat({ value: '', label: '' })}
            >
              + Add Stat
            </button>
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
