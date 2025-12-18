import { useState } from 'react'
import { usePortfolioEditor } from '../hooks/usePortfolioEditor'
import { ProjectProps } from '@/features/portfolio/models'

interface ProjectFormData {
  title: string
  description: string
  tags: string
  imageUrl: string
  liveUrl: string
  githubUrl: string
}

const emptyProject: ProjectFormData = {
  title: '',
  description: '',
  tags: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
}

export function ProjectsEditor() {
  const {
    draft,
    hasUnsavedChanges,
    addProject,
    updateProject,
    removeProject,
    reorderProjects,
    saveCurrentVersion,
    discardChanges,
  } = usePortfolioEditor()

  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [newProject, setNewProject] = useState<ProjectFormData | null>(null)

  if (!draft) {
    return (
      <div className="editor-section">
        <div className="editor-section__content">
          <p className="text-light">No portfolio loaded. Please select a version from the dashboard.</p>
        </div>
      </div>
    )
  }

  const { projects } = draft

  const handleAddProject = () => {
    setNewProject(emptyProject)
    setEditingProject(null)
  }

  const handleSaveNewProject = () => {
    if (!newProject) return
    if (!newProject.title.trim() || !newProject.liveUrl.trim()) {
      alert('Title and Live URL are required')
      return
    }
    addProject({
      title: newProject.title,
      description: newProject.description,
      tags: newProject.tags.split(',').map((t) => t.trim()).filter(Boolean),
      imageUrl: newProject.imageUrl || null,
      liveUrl: newProject.liveUrl,
      githubUrl: newProject.githubUrl || undefined,
    })
    setNewProject(null)
  }

  const handleUpdateProject = (id: string, data: ProjectFormData) => {
    updateProject(id, {
      title: data.title,
      description: data.description,
      tags: data.tags.split(',').map((t) => t.trim()).filter(Boolean),
      imageUrl: data.imageUrl || null,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl || undefined,
    })
    setEditingProject(null)
  }

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderProjects(index, index - 1)
    }
  }

  const handleMoveDown = (index: number) => {
    if (index < projects.length - 1) {
      reorderProjects(index, index + 1)
    }
  }

  const projectToFormData = (project: typeof projects[0]): ProjectFormData => ({
    title: project.title,
    description: project.description,
    tags: project.tags.join(', '),
    imageUrl: project.imageUrl || '',
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl || '',
  })

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div className="flex-between">
          <div>
            <h1 className="admin-dashboard__title">Edit Projects</h1>
            <p className="admin-dashboard__subtitle">
              Add, edit, or remove projects from your portfolio
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleAddProject}>
            + Add Project
          </button>
        </div>
      </header>

      {/* New Project Form */}
      {newProject && (
        <div className="editor-section">
          <div className="editor-section__header">
            <h2 className="editor-section__title">New Project</h2>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setNewProject(null)}
            >
              Cancel
            </button>
          </div>
          <div className="editor-section__content">
            <ProjectForm
              data={newProject}
              onChange={setNewProject}
              onSave={handleSaveNewProject}
              onCancel={() => setNewProject(null)}
            />
          </div>
        </div>
      )}

      {/* Existing Projects */}
      <div className="list-editor">
        {projects.map((project, index) => (
          <div key={project.id} className="editor-section">
            <div className="editor-section__header">
              <div className="flex items-center gap-md">
                <div className="flex flex-col gap-xs">
                  <button
                    type="button"
                    className="btn-icon btn-sm"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    aria-label="Move up"
                    style={{ padding: '2px 6px', height: 'auto' }}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn-icon btn-sm"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === projects.length - 1}
                    aria-label="Move down"
                    style={{ padding: '2px 6px', height: 'auto' }}
                  >
                    ↓
                  </button>
                </div>
                <div>
                  <h3 className="fw-semibold">{project.title}</h3>
                  <p className="text-sm text-muted">{project.tags.join(', ')}</p>
                </div>
              </div>
              <div className="flex gap-sm">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() =>
                    setEditingProject(editingProject === project.id ? null : project.id)
                  }
                >
                  {editingProject === project.id ? 'Close' : 'Edit'}
                </button>
                <button
                  type="button"
                  className="btn-icon btn-icon--danger"
                  onClick={() => {
                    if (confirm(`Delete project "${project.title}"?`)) {
                      removeProject(project.id)
                    }
                  }}
                  aria-label="Remove project"
                >
                  X
                </button>
              </div>
            </div>

            {editingProject === project.id && (
              <div className="editor-section__content">
                <ProjectForm
                  data={projectToFormData(project)}
                  onChange={(data) => handleUpdateProject(project.id, data)}
                  onSave={() => setEditingProject(null)}
                  onCancel={() => setEditingProject(null)}
                  isEditing
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {projects.length === 0 && !newProject && (
        <div className="editor-section">
          <div className="editor-section__content text-center">
            <p className="text-light mb-md">No projects yet. Add your first project!</p>
            <button className="btn btn-outline" onClick={handleAddProject}>
              + Add Project
            </button>
          </div>
        </div>
      )}

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

interface ProjectFormProps {
  data: ProjectFormData
  onChange: (data: ProjectFormData) => void
  onSave: () => void
  onCancel: () => void
  isEditing?: boolean
}

function ProjectForm({ data, onChange, onSave, onCancel, isEditing }: ProjectFormProps) {
  const handleChange = (field: keyof ProjectFormData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="editor-form">
      <div className="editor-row">
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            className="form-input"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Project Title"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Live URL *</label>
          <input
            type="url"
            className="form-input"
            value={data.liveUrl}
            onChange={(e) => handleChange('liveUrl', e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input form-textarea"
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          placeholder="Describe your project..."
        />
      </div>

      <div className="editor-row">
        <div className="form-group">
          <label className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            className="form-input"
            value={data.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            placeholder="React, TypeScript, Node.js"
          />
        </div>
        <div className="form-group">
          <label className="form-label">GitHub URL (optional)</label>
          <input
            type="url"
            className="form-input"
            value={data.githubUrl}
            onChange={(e) => handleChange('githubUrl', e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Image URL (optional)</label>
        <input
          type="url"
          className="form-input"
          value={data.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          placeholder="https://..."
        />
        {data.imageUrl && (
          <div className="mt-md">
            <img
              src={data.imageUrl}
              alt="Project preview"
              style={{
                maxWidth: '200px',
                maxHeight: '150px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
              }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-md">
        <button type="button" className="btn btn-primary" onClick={onSave}>
          {isEditing ? 'Update Project' : 'Add Project'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}
