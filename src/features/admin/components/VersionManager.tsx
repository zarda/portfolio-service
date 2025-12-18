import { useState } from 'react'
import { usePortfolioEditor } from '../hooks/usePortfolioEditor'
import { PortfolioRegistry } from '@/features/portfolio/data/PortfolioRegistry'

export function VersionManager() {
  const {
    currentVersion,
    hasUnsavedChanges,
    loadVersion,
    saveAsNewVersion,
    publishVersion,
    discardChanges,
  } = usePortfolioEditor()

  // Get all versions except 'preview' (internal version for previewing)
  const versions = PortfolioRegistry.getAvailableVersions().filter((v) => v !== 'preview')
  // Get the actual published version from registry
  const publishedVersion = PortfolioRegistry.getDefaultVersion()

  const [newVersionName, setNewVersionName] = useState('')
  const [showNewVersionForm, setShowNewVersionForm] = useState(false)

  const handleVersionChange = (version: string) => {
    if (hasUnsavedChanges) {
      const confirmSwitch = confirm(
        'You have unsaved changes. Are you sure you want to switch versions? Your changes will be lost.'
      )
      if (!confirmSwitch) return
    }
    loadVersion(version)
  }

  const handleCreateVersion = () => {
    if (!newVersionName.trim()) {
      alert('Please enter a version name')
      return
    }
    if (versions.includes(newVersionName.trim())) {
      alert('A version with this name already exists')
      return
    }
    saveAsNewVersion(newVersionName.trim())
    setNewVersionName('')
    setShowNewVersionForm(false)
  }

  const handlePublish = (version: string) => {
    if (confirm(`Publish "${version}" as the default portfolio version?`)) {
      publishVersion(version)
      alert('Published successfully! Please refresh the Live Site to see your changes.')
    }
  }

  const handleDeleteVersion = (version: string) => {
    if (version === publishedVersion) {
      alert('Cannot delete the published version. Please publish a different version first.')
      return
    }
    if (versions.length <= 1) {
      alert('Cannot delete the only version.')
      return
    }
    alert(`Delete feature coming soon. For now, versions are preserved for safety.`)
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Version Manager</h1>
        <p className="admin-dashboard__subtitle">
          Create, switch, and publish portfolio versions
        </p>
      </header>

      {/* Current Version */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Current Version</h2>
          {hasUnsavedChanges && (
            <span className="badge badge-primary">Unsaved Changes</span>
          )}
        </div>
        <div className="editor-section__content">
          <div className="flex items-center gap-lg">
            <div>
              <h3 className="text-xl fw-semibold text-gradient">{currentVersion}</h3>
              {currentVersion === publishedVersion && (
                <span className="text-sm text-success">Published (Default)</span>
              )}
            </div>
            {currentVersion !== publishedVersion && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handlePublish(currentVersion)}
              >
                Publish This Version
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Available Versions */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">Available Versions</h2>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setShowNewVersionForm(true)}
          >
            + Create New Version
          </button>
        </div>
        <div className="editor-section__content">
          {/* New Version Form */}
          {showNewVersionForm && (
            <div className="list-editor__item mb-lg" style={{ background: 'var(--color-background-alt)' }}>
              <div className="list-editor__item-content">
                <div className="flex gap-md items-end">
                  <div className="form-group mb-sm" style={{ flex: 1 }}>
                    <label className="form-label">Version Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newVersionName}
                      onChange={(e) => setNewVersionName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateVersion()}
                      placeholder="e.g., v2024, tech-focus, draft"
                    />
                    <p className="text-sm text-muted mt-xs">
                      This will create a copy of the current version with your changes
                    </p>
                  </div>
                  <div className="flex gap-sm mb-sm">
                    <button className="btn btn-primary btn-sm" onClick={handleCreateVersion}>
                      Create
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        setShowNewVersionForm(false)
                        setNewVersionName('')
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Version List */}
          <div className="list-editor">
            {versions.map((version) => (
              <div
                key={version}
                className={`list-editor__item ${version === currentVersion ? 'gradient-border' : ''}`}
              >
                <div className="list-editor__item-content">
                  <div className="flex items-center gap-md">
                    <div>
                      <h4 className="fw-semibold">{version}</h4>
                      <div className="flex gap-sm">
                        {version === publishedVersion && (
                          <span className="badge badge-primary text-sm">Published</span>
                        )}
                        {version === currentVersion && (
                          <span className="badge text-sm">Editing</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-editor__item-actions flex gap-sm">
                  {version !== currentVersion && (
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleVersionChange(version)}
                    >
                      Edit
                    </button>
                  )}
                  {(version !== publishedVersion || (version === currentVersion && hasUnsavedChanges)) && (
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handlePublish(version)}
                    >
                      {version === publishedVersion ? 'Re-publish' : 'Publish'}
                    </button>
                  )}
                  <a
                    href={`/preview?version=${version}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    Preview
                  </a>
                  {version !== publishedVersion && versions.length > 1 && (
                    <button
                      className="btn-icon btn-icon--danger"
                      onClick={() => handleDeleteVersion(version)}
                      aria-label="Delete version"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="editor-section">
        <div className="editor-section__header">
          <h2 className="editor-section__title">About Versions</h2>
        </div>
        <div className="editor-section__content">
          <div className="text-light">
            <p className="mb-md">
              Versions allow you to maintain different variations of your portfolio:
            </p>
            <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
              <li className="mb-sm">
                <strong>Time-based</strong>: Keep historical snapshots (e.g., "2023", "2024")
              </li>
              <li className="mb-sm">
                <strong>Audience-based</strong>: Tech-focused vs. general audience
              </li>
              <li className="mb-sm">
                <strong>A/B testing</strong>: Compare different presentations
              </li>
              <li className="mb-sm">
                <strong>Safe editing</strong>: Make changes without affecting the live version
              </li>
            </ul>
            <p className="mt-md">
              The <strong>published</strong> version is what visitors see by default at your
              portfolio URL. Use the <code>?version=name</code> URL parameter to preview any
              version.
            </p>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="editor-actions">
          <p className="text-warning">
            You have unsaved changes in the current version.
          </p>
          <button className="btn btn-ghost" onClick={discardChanges}>
            Discard Changes
          </button>
        </div>
      )}
    </div>
  )
}
