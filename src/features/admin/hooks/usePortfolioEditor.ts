import { useState, useEffect, useCallback } from 'react'
import { PortfolioEditorService, DraftSocialLink, DraftContactField } from '../services/PortfolioEditorService'
import { PortfolioVersion } from '@/features/portfolio/data/PortfolioRegistry'
import { ProfileProps, ProfileStat, SkillProps, ProjectProps } from '@/features/portfolio/models'

export function usePortfolioEditor() {
  const [, forceUpdate] = useState({})
  const service = PortfolioEditorService.getInstance()

  useEffect(() => {
    const unsubscribe = service.subscribe(() => {
      forceUpdate({})
    })
    return unsubscribe
  }, [service])

  const loadVersion = useCallback(
    (version: PortfolioVersion) => {
      service.loadVersion(version)
    },
    [service]
  )

  const draft = service.getDraft()
  const currentVersion = service.getCurrentVersion()
  const hasDraft = service.hasDraft()
  const hasUnsavedChanges = service.hasUnsavedChanges()

  // Profile operations
  const updateProfile = useCallback(
    (updates: Partial<ProfileProps>) => {
      service.updateProfile(updates)
    },
    [service]
  )

  const updateProfileStat = useCallback(
    (index: number, updates: Partial<ProfileStat>) => {
      service.updateProfileStat(index, updates)
    },
    [service]
  )

  const addProfileStat = useCallback(
    (stat: ProfileStat) => {
      service.addProfileStat(stat)
    },
    [service]
  )

  const removeProfileStat = useCallback(
    (index: number) => {
      service.removeProfileStat(index)
    },
    [service]
  )

  const updateAboutParagraph = useCallback(
    (index: number, text: string) => {
      service.updateAboutParagraph(index, text)
    },
    [service]
  )

  const addAboutParagraph = useCallback(
    (text: string) => {
      service.addAboutParagraph(text)
    },
    [service]
  )

  const removeAboutParagraph = useCallback(
    (index: number) => {
      service.removeAboutParagraph(index)
    },
    [service]
  )

  // Skills operations
  const addSkillCategory = useCallback(
    (category: string) => {
      service.addSkillCategory(category)
    },
    [service]
  )

  const updateSkillCategory = useCallback(
    (index: number, category: string) => {
      service.updateSkillCategory(index, category)
    },
    [service]
  )

  const removeSkillCategory = useCallback(
    (index: number) => {
      service.removeSkillCategory(index)
    },
    [service]
  )

  const addSkill = useCallback(
    (categoryIndex: number, skill: SkillProps) => {
      service.addSkill(categoryIndex, skill)
    },
    [service]
  )

  const updateSkill = useCallback(
    (categoryIndex: number, skillIndex: number, updates: Partial<SkillProps>) => {
      service.updateSkill(categoryIndex, skillIndex, updates)
    },
    [service]
  )

  const removeSkill = useCallback(
    (categoryIndex: number, skillIndex: number) => {
      service.removeSkill(categoryIndex, skillIndex)
    },
    [service]
  )

  // Project operations
  const addProject = useCallback(
    (project: Omit<ProjectProps, 'id'>) => {
      service.addProject(project)
    },
    [service]
  )

  const updateProject = useCallback(
    (id: string, updates: Partial<ProjectProps>) => {
      service.updateProject(id, updates)
    },
    [service]
  )

  const removeProject = useCallback(
    (id: string) => {
      service.removeProject(id)
    },
    [service]
  )

  const reorderProjects = useCallback(
    (fromIndex: number, toIndex: number) => {
      service.reorderProjects(fromIndex, toIndex)
    },
    [service]
  )

  // Contact operations
  const updateContact = useCallback(
    (updates: Partial<{ email: string; location: string }>) => {
      service.updateContact(updates)
    },
    [service]
  )

  const addSocialLink = useCallback(
    (link: DraftSocialLink) => {
      service.addSocialLink(link)
    },
    [service]
  )

  const updateSocialLink = useCallback(
    (index: number, updates: Partial<DraftSocialLink>) => {
      service.updateSocialLink(index, updates)
    },
    [service]
  )

  const removeSocialLink = useCallback(
    (index: number) => {
      service.removeSocialLink(index)
    },
    [service]
  )

  // Custom contact field operations
  const addContactField = useCallback(
    (field: DraftContactField) => {
      service.addContactField(field)
    },
    [service]
  )

  const updateContactField = useCallback(
    (index: number, updates: Partial<DraftContactField>) => {
      service.updateContactField(index, updates)
    },
    [service]
  )

  const removeContactField = useCallback(
    (index: number) => {
      service.removeContactField(index)
    },
    [service]
  )

  // Version operations
  const saveCurrentVersion = useCallback(() => {
    service.saveCurrentVersion()
  }, [service])

  const saveAsNewVersion = useCallback(
    (versionName: string) => {
      service.saveAsNewVersion(versionName)
    },
    [service]
  )

  const discardChanges = useCallback(() => {
    service.discardChanges()
  }, [service])

  const publishVersion = useCallback(
    (version: PortfolioVersion) => {
      service.publishVersion(version)
    },
    [service]
  )

  return {
    // State
    draft,
    currentVersion,
    hasDraft,
    hasUnsavedChanges,

    // Version operations
    loadVersion,
    saveCurrentVersion,
    saveAsNewVersion,
    discardChanges,
    publishVersion,

    // Profile operations
    updateProfile,
    updateProfileStat,
    addProfileStat,
    removeProfileStat,
    updateAboutParagraph,
    addAboutParagraph,
    removeAboutParagraph,

    // Skills operations
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addSkill,
    updateSkill,
    removeSkill,

    // Project operations
    addProject,
    updateProject,
    removeProject,
    reorderProjects,

    // Contact operations
    updateContact,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    addContactField,
    updateContactField,
    removeContactField,
  }
}

export type UsePortfolioEditorReturn = ReturnType<typeof usePortfolioEditor>
