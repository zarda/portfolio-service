import { describe, it, expect, beforeEach, vi } from 'vitest'
import { PortfolioEditorService } from '../services/PortfolioEditorService'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

describe('PortfolioEditorService', () => {
  beforeEach(() => {
    // Reset singleton and localStorage before each test
    PortfolioEditorService.reset()
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = PortfolioEditorService.getInstance()
      const instance2 = PortfolioEditorService.getInstance()
      expect(instance1).toBe(instance2)
    })

    it('should create new instance after reset', () => {
      const instance1 = PortfolioEditorService.getInstance()
      PortfolioEditorService.reset()
      const instance2 = PortfolioEditorService.getInstance()
      expect(instance1).not.toBe(instance2)
    })
  })

  describe('Version Loading', () => {
    it('should load a version from registry', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('hengtai25')

      expect(service.getCurrentVersion()).toBe('hengtai25')
      expect(service.hasDraft()).toBe(true)
      expect(service.hasUnsavedChanges()).toBe(false)
    })

    it('should load different versions', () => {
      const service = PortfolioEditorService.getInstance()

      service.loadVersion('hengtai25')
      const hengtaiDraft = service.getDraft()
      expect(hengtaiDraft?.profile.name).toBe('Hengtai Jan')

      service.loadVersion('demo')
      const demoDraft = service.getDraft()
      expect(demoDraft?.profile.name).toBe('Demo User')
    })
  })

  describe('Profile Operations', () => {
    it('should update profile fields', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      service.updateProfile({ name: 'Updated Name' })

      const draft = service.getDraft()
      expect(draft?.profile.name).toBe('Updated Name')
      expect(service.hasUnsavedChanges()).toBe(true)
    })

    it('should add profile stat', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.profile.stats.length || 0
      service.addProfileStat({ label: 'New Stat', value: '100' })

      const draft = service.getDraft()
      expect(draft?.profile.stats.length).toBe(initialLength + 1)
      expect(draft?.profile.stats[initialLength].label).toBe('New Stat')
    })

    it('should update profile stat', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      service.updateProfileStat(0, { value: 'Updated Value' })

      const draft = service.getDraft()
      expect(draft?.profile.stats[0].value).toBe('Updated Value')
    })

    it('should remove profile stat', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.profile.stats.length || 0
      service.removeProfileStat(0)

      const draft = service.getDraft()
      expect(draft?.profile.stats.length).toBe(initialLength - 1)
    })

    it('should add about paragraph', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.profile.aboutParagraphs.length || 0
      service.addAboutParagraph('New paragraph')

      const draft = service.getDraft()
      expect(draft?.profile.aboutParagraphs.length).toBe(initialLength + 1)
    })

    it('should update about paragraph', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      service.updateAboutParagraph(0, 'Updated paragraph')

      const draft = service.getDraft()
      expect(draft?.profile.aboutParagraphs[0]).toBe('Updated paragraph')
    })

    it('should remove about paragraph', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.profile.aboutParagraphs.length || 0
      service.removeAboutParagraph(0)

      const draft = service.getDraft()
      expect(draft?.profile.aboutParagraphs.length).toBe(initialLength - 1)
    })
  })

  describe('Skills Operations', () => {
    it('should add skill category', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.skillCategories.length || 0
      service.addSkillCategory('New Category')

      const draft = service.getDraft()
      expect(draft?.skillCategories.length).toBe(initialLength + 1)
      expect(draft?.skillCategories[initialLength].category).toBe('New Category')
      expect(draft?.skillCategories[initialLength].skills).toEqual([])
    })

    it('should update skill category name', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      service.updateSkillCategory(0, 'Updated Category')

      const draft = service.getDraft()
      expect(draft?.skillCategories[0].category).toBe('Updated Category')
    })

    it('should remove skill category', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.skillCategories.length || 0
      service.removeSkillCategory(0)

      const draft = service.getDraft()
      expect(draft?.skillCategories.length).toBe(initialLength - 1)
    })

    it('should add skill to category', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.skillCategories[0].skills.length || 0
      service.addSkill(0, { name: 'New Skill', level: 75 })

      const draft = service.getDraft()
      expect(draft?.skillCategories[0].skills.length).toBe(initialLength + 1)
      expect(draft?.skillCategories[0].skills[initialLength].name).toBe('New Skill')
    })

    it('should update skill', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      service.updateSkill(0, 0, { level: 100 })

      const draft = service.getDraft()
      expect(draft?.skillCategories[0].skills[0].level).toBe(100)
    })

    it('should remove skill', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.skillCategories[0].skills.length || 0
      service.removeSkill(0, 0)

      const draft = service.getDraft()
      expect(draft?.skillCategories[0].skills.length).toBe(initialLength - 1)
    })
  })

  describe('Project Operations', () => {
    it('should add project', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.projects.length || 0
      service.addProject({
        title: 'New Project',
        description: 'Description',
        tags: ['tag1'],
        imageUrl: '/img.jpg',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
      })

      const draft = service.getDraft()
      expect(draft?.projects.length).toBe(initialLength + 1)
      expect(draft?.projects[initialLength].title).toBe('New Project')
      expect(draft?.projects[initialLength].id).toBeDefined()
    })

    it('should update project', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const projectId = service.getDraft()?.projects[0].id || ''
      service.updateProject(projectId, { title: 'Updated Title' })

      const draft = service.getDraft()
      expect(draft?.projects[0].title).toBe('Updated Title')
    })

    it('should remove project', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.projects.length || 0
      const projectId = service.getDraft()?.projects[0].id || ''
      service.removeProject(projectId)

      const draft = service.getDraft()
      expect(draft?.projects.length).toBe(initialLength - 1)
    })

    it('should reorder projects', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const draft = service.getDraft()
      if (!draft || draft.projects.length < 2) return

      const firstProjectId = draft.projects[0].id
      const secondProjectId = draft.projects[1].id

      service.reorderProjects(0, 1)

      const updatedDraft = service.getDraft()
      expect(updatedDraft?.projects[0].id).toBe(secondProjectId)
      expect(updatedDraft?.projects[1].id).toBe(firstProjectId)
    })
  })

  describe('Contact Operations', () => {
    it('should update contact info', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      service.updateContact({ email: 'new@email.com' })

      const draft = service.getDraft()
      expect(draft?.contact.email).toBe('new@email.com')
    })

    it('should add social link', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.contact.socialLinks.length || 0
      service.addSocialLink({
        platform: 'twitter',
        url: 'https://twitter.com/test',
        label: 'Twitter',
      })

      const draft = service.getDraft()
      expect(draft?.contact.socialLinks.length).toBe(initialLength + 1)
      expect(draft?.contact.socialLinks[initialLength].platform).toBe('twitter')
    })

    it('should update social link', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      service.updateSocialLink(0, { label: 'Updated Label' })

      const draft = service.getDraft()
      expect(draft?.contact.socialLinks[0].label).toBe('Updated Label')
    })

    it('should remove social link', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.contact.socialLinks.length || 0
      service.removeSocialLink(0)

      const draft = service.getDraft()
      expect(draft?.contact.socialLinks.length).toBe(initialLength - 1)
    })

    it('should add custom contact field', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const initialLength = service.getDraft()?.contact.customFields.length || 0
      service.addContactField({
        label: 'Phone',
        value: '+1 234 567 8900',
        icon: '📞',
      })

      const draft = service.getDraft()
      expect(draft?.contact.customFields.length).toBe(initialLength + 1)
      expect(draft?.contact.customFields[initialLength].label).toBe('Phone')
    })

    it('should update custom contact field', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      // First add a field
      service.addContactField({
        label: 'Phone',
        value: '+1 234 567 8900',
        icon: '📞',
      })

      service.updateContactField(0, { value: '+1 999 888 7777' })

      const draft = service.getDraft()
      expect(draft?.contact.customFields[0].value).toBe('+1 999 888 7777')
    })

    it('should remove custom contact field', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      // First add a field
      service.addContactField({
        label: 'Phone',
        value: '+1 234 567 8900',
        icon: '📞',
      })

      service.removeContactField(0)

      const draft = service.getDraft()
      expect(draft?.contact.customFields.length).toBe(0)
    })
  })

  describe('Subscription', () => {
    it('should notify subscribers on changes', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const callback = vi.fn()
      const unsubscribe = service.subscribe(callback)

      service.updateProfile({ name: 'Test' })
      expect(callback).toHaveBeenCalledTimes(1)

      service.addSkillCategory('New')
      expect(callback).toHaveBeenCalledTimes(2)

      unsubscribe()

      service.updateProfile({ name: 'Another' })
      expect(callback).toHaveBeenCalledTimes(2) // Should not be called after unsubscribe
    })
  })

  describe('Version Operations', () => {
    it('should save current version', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      service.updateProfile({ name: 'Saved Name' })
      expect(service.hasUnsavedChanges()).toBe(true)

      service.saveCurrentVersion()
      expect(service.hasUnsavedChanges()).toBe(false)
    })

    it('should discard changes', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      const originalName = service.getDraft()?.profile.name
      service.updateProfile({ name: 'Changed Name' })
      expect(service.getDraft()?.profile.name).toBe('Changed Name')

      service.discardChanges()
      expect(service.getDraft()?.profile.name).toBe(originalName)
      expect(service.hasUnsavedChanges()).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should not update when no draft exists', () => {
      const service = PortfolioEditorService.getInstance()
      // Don't load any version

      service.updateProfile({ name: 'Test' })
      expect(service.getDraft()).toBeNull()
    })

    it('should handle invalid indices gracefully', () => {
      const service = PortfolioEditorService.getInstance()
      service.loadVersion('demo')

      // These should not throw
      service.updateProfileStat(-1, { value: 'test' })
      service.updateProfileStat(999, { value: 'test' })
      service.removeSkillCategory(-1)
      service.updateSkill(-1, 0, { level: 50 })
      service.updateSkill(0, -1, { level: 50 })
    })
  })
})
