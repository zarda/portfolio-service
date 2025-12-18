import {
  Portfolio,
  PortfolioProps,
  Profile,
  ProfileProps,
  ProfileStat,
  SkillCategory,
  Skill,
  SkillProps,
  Project,
  ProjectProps,
  ContactInfo,
  SocialLink,
  SocialPlatform,
} from '@/features/portfolio/models'
import { PortfolioRegistry, PortfolioVersion } from '@/features/portfolio/data/PortfolioRegistry'

const STORAGE_KEY = 'portfolio-editor-draft'
const STORAGE_VERSIONS_KEY = 'portfolio-custom-versions'

export interface DraftSocialLink {
  platform: SocialPlatform
  url: string
  label: string
  customIcon?: string
}

export interface DraftContactField {
  label: string
  value: string
  icon?: string
}

export interface DraftPortfolio {
  version: string
  profile: ProfileProps
  skillCategories: Array<{
    category: string
    skills: SkillProps[]
  }>
  projects: Array<ProjectProps & { id: string }>
  contact: {
    email: string
    location: string
    customFields: DraftContactField[]
    socialLinks: DraftSocialLink[]
  }
}

type SubscriberCallback = () => void

export class PortfolioEditorService {
  private static instance: PortfolioEditorService | null = null
  private draft: DraftPortfolio | null = null
  private currentVersion: PortfolioVersion = 'default'
  private isDirty = false
  private subscribers: Set<SubscriberCallback> = new Set()

  private constructor() {
    this.loadFromStorage()
  }

  static getInstance(): PortfolioEditorService {
    if (!PortfolioEditorService.instance) {
      PortfolioEditorService.instance = new PortfolioEditorService()
    }
    return PortfolioEditorService.instance
  }

  static reset(): void {
    PortfolioEditorService.instance = null
  }

  subscribe(callback: SubscriberCallback): () => void {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  private notify(): void {
    this.subscribers.forEach((callback) => callback())
  }

  // Sync draft to registry for preview
  private syncDraftToRegistry(): void {
    if (!this.draft) return
    const previewPortfolio = this.draftToPortfolio(this.draft, 'preview')
    PortfolioRegistry.register('preview', previewPortfolio)
  }

  loadVersion(version: PortfolioVersion): void {
    const portfolio = PortfolioRegistry.get(version)
    this.currentVersion = version
    this.draft = this.portfolioToDraft(portfolio)
    this.isDirty = false
    // Sync to registry so preview page can read the current state
    this.syncDraftToRegistry()
    this.notify()
  }

  private portfolioToDraft(portfolio: Portfolio): DraftPortfolio {
    const profile = portfolio.profile
    const contact = portfolio.contactInfo

    return {
      version: portfolio.version,
      profile: {
        name: profile.name,
        title: profile.title,
        greeting: profile.greeting,
        description: profile.description,
        aboutParagraphs: [...profile.aboutParagraphs],
        photoUrl: profile.photoUrl,
        stats: profile.stats.map((s) => ({ ...s })),
      },
      skillCategories: portfolio.skillCategories.map((cat) => ({
        category: cat.category,
        skills: cat.skills.map((s) => ({ name: s.name, level: s.level })),
      })),
      projects: portfolio.projects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        tags: [...p.tags],
        imageUrl: p.imageUrl,
        liveUrl: p.liveUrl,
        githubUrl: p.githubUrl,
      })),
      contact: {
        email: contact.email,
        location: contact.location,
        customFields: contact.customFields.map((f) => ({ ...f })),
        socialLinks: contact.socialLinks.map((l) => ({
          platform: l.platform,
          url: l.url,
          label: l.label,
          customIcon: l.customIcon,
        })),
      },
    }
  }

  private draftToPortfolio(draft: DraftPortfolio, id: string): Portfolio {
    const profile = new Profile(draft.profile)

    const skillCategories = draft.skillCategories.map(
      (cat) => new SkillCategory(cat.category, cat.skills.map((s) => new Skill(s)))
    )

    const projects = draft.projects.map((p) => new Project(
      {
        title: p.title,
        description: p.description,
        tags: p.tags,
        imageUrl: p.imageUrl,
        liveUrl: p.liveUrl,
        githubUrl: p.githubUrl,
      },
      p.id
    ))

    const contactInfo = new ContactInfo(
      draft.contact.email,
      draft.contact.location,
      draft.contact.socialLinks.map((l) => new SocialLink(l)),
      draft.contact.customFields
    )

    const props: PortfolioProps = {
      version: draft.version,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return new Portfolio(props, id, profile, skillCategories, projects, contactInfo)
  }

  getCurrentVersion(): PortfolioVersion {
    return this.currentVersion
  }

  getDraft(): DraftPortfolio | null {
    return this.draft
  }

  hasDraft(): boolean {
    return this.draft !== null
  }

  hasUnsavedChanges(): boolean {
    return this.isDirty
  }

  // Profile mutations
  updateProfile(updates: Partial<ProfileProps>): void {
    if (!this.draft) return
    this.draft.profile = { ...this.draft.profile, ...updates }
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  updateProfileStat(index: number, updates: Partial<ProfileStat>): void {
    if (!this.draft || index < 0 || index >= this.draft.profile.stats.length) return
    this.draft.profile.stats[index] = { ...this.draft.profile.stats[index], ...updates }
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  addProfileStat(stat: ProfileStat): void {
    if (!this.draft) return
    this.draft.profile.stats.push(stat)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  removeProfileStat(index: number): void {
    if (!this.draft || index < 0 || index >= this.draft.profile.stats.length) return
    this.draft.profile.stats.splice(index, 1)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  updateAboutParagraph(index: number, text: string): void {
    if (!this.draft || index < 0 || index >= this.draft.profile.aboutParagraphs.length) return
    this.draft.profile.aboutParagraphs[index] = text
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  addAboutParagraph(text: string): void {
    if (!this.draft) return
    this.draft.profile.aboutParagraphs.push(text)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  removeAboutParagraph(index: number): void {
    if (!this.draft || index < 0 || index >= this.draft.profile.aboutParagraphs.length) return
    this.draft.profile.aboutParagraphs.splice(index, 1)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  // Skills mutations
  addSkillCategory(category: string): void {
    if (!this.draft) return
    this.draft.skillCategories.push({ category, skills: [] })
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  updateSkillCategory(index: number, category: string): void {
    if (!this.draft || index < 0 || index >= this.draft.skillCategories.length) return
    this.draft.skillCategories[index].category = category
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  removeSkillCategory(index: number): void {
    if (!this.draft || index < 0 || index >= this.draft.skillCategories.length) return
    this.draft.skillCategories.splice(index, 1)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  addSkill(categoryIndex: number, skill: SkillProps): void {
    if (!this.draft || categoryIndex < 0 || categoryIndex >= this.draft.skillCategories.length) return
    this.draft.skillCategories[categoryIndex].skills.push(skill)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  updateSkill(categoryIndex: number, skillIndex: number, updates: Partial<SkillProps>): void {
    if (!this.draft || categoryIndex < 0 || categoryIndex >= this.draft.skillCategories.length) return
    const category = this.draft.skillCategories[categoryIndex]
    if (skillIndex < 0 || skillIndex >= category.skills.length) return
    category.skills[skillIndex] = { ...category.skills[skillIndex], ...updates }
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  removeSkill(categoryIndex: number, skillIndex: number): void {
    if (!this.draft || categoryIndex < 0 || categoryIndex >= this.draft.skillCategories.length) return
    const category = this.draft.skillCategories[categoryIndex]
    if (skillIndex < 0 || skillIndex >= category.skills.length) return
    category.skills.splice(skillIndex, 1)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  // Project mutations
  addProject(project: Omit<ProjectProps, 'id'> & { id?: string }): void {
    if (!this.draft) return
    const id = project.id || `project-${Date.now()}`
    this.draft.projects.push({
      id,
      title: project.title,
      description: project.description,
      tags: project.tags,
      imageUrl: project.imageUrl,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
    })
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  updateProject(id: string, updates: Partial<ProjectProps>): void {
    if (!this.draft) return
    const index = this.draft.projects.findIndex((p) => p.id === id)
    if (index === -1) return
    this.draft.projects[index] = { ...this.draft.projects[index], ...updates }
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  removeProject(id: string): void {
    if (!this.draft) return
    const index = this.draft.projects.findIndex((p) => p.id === id)
    if (index === -1) return
    this.draft.projects.splice(index, 1)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  reorderProjects(fromIndex: number, toIndex: number): void {
    if (!this.draft) return
    if (fromIndex < 0 || fromIndex >= this.draft.projects.length) return
    if (toIndex < 0 || toIndex >= this.draft.projects.length) return
    const [removed] = this.draft.projects.splice(fromIndex, 1)
    this.draft.projects.splice(toIndex, 0, removed)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  // Contact mutations
  updateContact(updates: Partial<{ email: string; location: string }>): void {
    if (!this.draft) return
    this.draft.contact = { ...this.draft.contact, ...updates }
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  addSocialLink(link: DraftSocialLink): void {
    if (!this.draft) return
    this.draft.contact.socialLinks.push({ ...link })
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  updateSocialLink(index: number, updates: Partial<DraftSocialLink>): void {
    if (!this.draft || index < 0 || index >= this.draft.contact.socialLinks.length) return
    this.draft.contact.socialLinks[index] = {
      ...this.draft.contact.socialLinks[index],
      ...updates,
    }
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  removeSocialLink(index: number): void {
    if (!this.draft || index < 0 || index >= this.draft.contact.socialLinks.length) return
    this.draft.contact.socialLinks.splice(index, 1)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  // Custom contact field mutations
  addContactField(field: DraftContactField): void {
    if (!this.draft) return
    this.draft.contact.customFields.push({ ...field })
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  updateContactField(index: number, updates: Partial<DraftContactField>): void {
    if (!this.draft || index < 0 || index >= this.draft.contact.customFields.length) return
    this.draft.contact.customFields[index] = {
      ...this.draft.contact.customFields[index],
      ...updates,
    }
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  removeContactField(index: number): void {
    if (!this.draft || index < 0 || index >= this.draft.contact.customFields.length) return
    this.draft.contact.customFields.splice(index, 1)
    this.isDirty = true
    this.persistDraftToStorage()
    this.notify()
  }

  // Version operations
  saveCurrentVersion(): void {
    if (!this.draft) return
    const portfolio = this.draftToPortfolio(this.draft, this.currentVersion)
    PortfolioRegistry.register(this.currentVersion, portfolio)
    this.isDirty = false
    this.persistVersionToStorage(this.currentVersion)
    // Keep draft in localStorage for preview
    this.persistDraftToStorage()
    this.notify()
  }

  saveAsNewVersion(versionName: string): void {
    if (!this.draft) return
    this.draft.version = versionName
    const portfolio = this.draftToPortfolio(this.draft, versionName)
    PortfolioRegistry.register(versionName, portfolio)
    this.currentVersion = versionName
    this.isDirty = false
    this.persistVersionToStorage(versionName)
    // Keep draft in localStorage for preview
    this.persistDraftToStorage()
    this.notify()
  }

  discardChanges(): void {
    if (!this.currentVersion) return
    this.loadVersion(this.currentVersion)
    this.clearDraftStorage()
  }

  publishVersion(version: PortfolioVersion): void {
    // If publishing the current version with unsaved changes, save them first
    if (version === this.currentVersion && this.isDirty && this.draft) {
      const portfolio = this.draftToPortfolio(this.draft, this.currentVersion)
      PortfolioRegistry.register(this.currentVersion, portfolio)
      this.isDirty = false
      this.persistVersionToStorage(this.currentVersion)
      this.persistDraftToStorage()
    }
    PortfolioRegistry.setDefault(version)
    this.persistPublishedVersion(version)
    this.notify()
  }

  // Persistence
  private persistDraftToStorage(): void {
    if (!this.draft) return
    try {
      const dataToStore = {
        version: this.currentVersion,
        draft: this.draft,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore))
      // Sync to registry so preview page can read the changes
      this.syncDraftToRegistry()
    } catch (e) {
      console.error('Failed to persist draft to storage:', e)
    }
  }

  private persistVersionToStorage(version: string): void {
    if (!this.draft) return
    try {
      const existingVersions = this.getStoredVersions()
      existingVersions[version] = this.draft
      localStorage.setItem(STORAGE_VERSIONS_KEY, JSON.stringify(existingVersions))
      // Don't clear draft storage - keep it for preview functionality
      // The draft will be cleared when loading a new version
    } catch (e) {
      console.error('Failed to persist version to storage:', e)
    }
  }

  private persistPublishedVersion(version: string): void {
    try {
      localStorage.setItem('portfolio-published-version', version)
    } catch (e) {
      console.error('Failed to persist published version:', e)
    }
  }

  private getStoredVersions(): Record<string, DraftPortfolio> {
    try {
      const stored = localStorage.getItem(STORAGE_VERSIONS_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  }

  private clearDraftStorage(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error('Failed to clear draft storage:', e)
    }
  }

  private loadFromStorage(): void {
    try {
      const storedDraft = localStorage.getItem(STORAGE_KEY)
      if (storedDraft) {
        const { version, draft } = JSON.parse(storedDraft)
        this.currentVersion = version
        this.draft = draft
        this.isDirty = true
        // Sync the loaded draft to registry for preview
        this.syncDraftToRegistry()
      }

      const storedVersions = this.getStoredVersions()
      for (const [version, draftData] of Object.entries(storedVersions)) {
        if (!PortfolioRegistry.getAvailableVersions().includes(version)) {
          const portfolio = this.draftToPortfolio(draftData, version)
          PortfolioRegistry.register(version, portfolio)
        }
      }

      const publishedVersion = localStorage.getItem('portfolio-published-version')
      if (publishedVersion && PortfolioRegistry.getAvailableVersions().includes(publishedVersion)) {
        PortfolioRegistry.setDefault(publishedVersion)
      }
    } catch (e) {
      console.error('Failed to load from storage:', e)
    }
  }
}
