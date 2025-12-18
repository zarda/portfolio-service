import { useState } from 'react'
import { usePortfolioEditor } from '../hooks/usePortfolioEditor'

export function SkillsEditor() {
  const {
    draft,
    hasUnsavedChanges,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addSkill,
    updateSkill,
    removeSkill,
    saveCurrentVersion,
    discardChanges,
  } = usePortfolioEditor()

  const [newCategoryName, setNewCategoryName] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([0]))

  if (!draft) {
    return (
      <div className="editor-section">
        <div className="editor-section__content">
          <p className="text-light">No portfolio loaded. Please select a version from the dashboard.</p>
        </div>
      </div>
    )
  }

  const { skillCategories } = draft

  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addSkillCategory(newCategoryName.trim())
      setNewCategoryName('')
      setExpandedCategories((prev) => new Set([...prev, skillCategories.length]))
    }
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Edit Skills</h1>
        <p className="admin-dashboard__subtitle">
          Manage your skill categories and proficiency levels
        </p>
      </header>

      {/* Skill Categories */}
      <div className="list-editor">
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex} className="editor-section">
            <div
              className="editor-section__header"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleCategory(catIndex)}
            >
              <div className="flex items-center gap-md">
                <span style={{ transform: expandedCategories.has(catIndex) ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  ▶
                </span>
                <input
                  type="text"
                  className="form-input"
                  value={category.category}
                  onChange={(e) => {
                    e.stopPropagation()
                    updateSkillCategory(catIndex, e.target.value)
                  }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxWidth: '300px' }}
                />
                <span className="text-muted text-sm">
                  ({category.skills.length} skills)
                </span>
              </div>
              <button
                type="button"
                className="btn-icon btn-icon--danger"
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm(`Delete category "${category.category}" and all its skills?`)) {
                    removeSkillCategory(catIndex)
                  }
                }}
                aria-label="Remove category"
              >
                X
              </button>
            </div>

            {expandedCategories.has(catIndex) && (
              <div className="editor-section__content">
                <div className="list-editor">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="list-editor__item">
                      <div className="list-editor__item-content">
                        <div className="editor-row">
                          <div className="form-group mb-sm">
                            <label className="form-label text-sm">Skill Name</label>
                            <input
                              type="text"
                              className="form-input"
                              value={skill.name}
                              onChange={(e) =>
                                updateSkill(catIndex, skillIndex, { name: e.target.value })
                              }
                              placeholder="e.g., React"
                            />
                          </div>
                          <div className="form-group mb-sm">
                            <label className="form-label text-sm">
                              Proficiency Level ({skill.level}%)
                            </label>
                            <input
                              type="range"
                              className="form-input"
                              min="0"
                              max="100"
                              value={skill.level}
                              onChange={(e) =>
                                updateSkill(catIndex, skillIndex, {
                                  level: parseInt(e.target.value, 10),
                                })
                              }
                              style={{ padding: '0' }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="list-editor__item-actions">
                        <button
                          type="button"
                          className="btn-icon btn-icon--danger"
                          onClick={() => removeSkill(catIndex, skillIndex)}
                          aria-label="Remove skill"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="list-editor__add"
                    onClick={() => addSkill(catIndex, { name: '', level: 75 })}
                  >
                    + Add Skill to {category.category}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add New Category */}
        <div className="editor-section">
          <div className="editor-section__content">
            <div className="flex gap-md items-end">
              <div className="form-group mb-sm" style={{ flex: 1 }}>
                <label className="form-label">New Category Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                  placeholder="e.g., Programming Languages"
                />
              </div>
              <button
                type="button"
                className="btn btn-outline mb-sm"
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
              >
                + Add Category
              </button>
            </div>
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
