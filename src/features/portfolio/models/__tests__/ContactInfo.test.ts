import { describe, it, expect } from 'vitest'
import { ContactInfo, ContactField } from '../ContactInfo'
import { SocialLink } from '../SocialLink'

describe('ContactInfo', () => {
  describe('Constructor with props object', () => {
    it('should create ContactInfo with props and social links', () => {
      const socialLinks = [
        new SocialLink({ platform: 'github', url: 'https://github.com/test', label: 'GitHub' }),
      ]

      const contact = new ContactInfo(
        { email: 'test@example.com', location: 'New York' },
        socialLinks
      )

      expect(contact.email).toBe('test@example.com')
      expect(contact.location).toBe('New York')
      expect(contact.socialLinks).toHaveLength(1)
      expect(contact.customFields).toEqual([])
    })

    it('should create ContactInfo with custom fields', () => {
      const socialLinks = [
        new SocialLink({ platform: 'linkedin', url: 'https://linkedin.com/in/test', label: 'LinkedIn' }),
      ]

      const customFields: ContactField[] = [
        { label: 'Phone', value: '+1 234 567 8900', icon: '📞' },
      ]

      const contact = new ContactInfo(
        { email: 'test@example.com', location: 'London', customFields },
        socialLinks
      )

      expect(contact.customFields).toHaveLength(1)
      expect(contact.customFields[0].label).toBe('Phone')
      expect(contact.customFields[0].value).toBe('+1 234 567 8900')
      expect(contact.customFields[0].icon).toBe('📞')
    })
  })

  describe('Constructor with individual parameters', () => {
    it('should create ContactInfo with individual parameters', () => {
      const socialLinks = [
        new SocialLink({ platform: 'twitter', url: 'https://twitter.com/test', label: 'Twitter' }),
      ]

      const contact = new ContactInfo('email@test.com', 'San Francisco', socialLinks)

      expect(contact.email).toBe('email@test.com')
      expect(contact.location).toBe('San Francisco')
      expect(contact.socialLinks).toHaveLength(1)
      expect(contact.customFields).toEqual([])
    })

    it('should create ContactInfo with custom fields via individual params', () => {
      const socialLinks = [
        new SocialLink({ platform: 'email', url: 'mailto:test@example.com', label: 'Email' }),
      ]

      const customFields: ContactField[] = [
        { label: 'Fax', value: '+1 234 567 8901' },
        { label: 'Office', value: 'Building A, Room 101', icon: '🏢' },
      ]

      const contact = new ContactInfo('test@example.com', 'Tokyo', socialLinks, customFields)

      expect(contact.customFields).toHaveLength(2)
      expect(contact.customFields[0].label).toBe('Fax')
      expect(contact.customFields[1].icon).toBe('🏢')
    })
  })

  describe('Social Links', () => {
    it('should return a copy of social links (immutability)', () => {
      const socialLinks = [
        new SocialLink({ platform: 'github', url: 'https://github.com/test', label: 'GitHub' }),
      ]

      const contact = new ContactInfo('test@example.com', 'Berlin', socialLinks)
      const retrievedLinks = contact.socialLinks

      // Should be a different array reference
      expect(retrievedLinks).not.toBe(socialLinks)
      // But with same content
      expect(retrievedLinks).toHaveLength(1)
      expect(retrievedLinks[0].platform).toBe('github')
    })

    it('should handle multiple social links', () => {
      const socialLinks = [
        new SocialLink({ platform: 'github', url: 'https://github.com/test', label: 'GitHub' }),
        new SocialLink({ platform: 'linkedin', url: 'https://linkedin.com/in/test', label: 'LinkedIn' }),
        new SocialLink({ platform: 'twitter', url: 'https://twitter.com/test', label: 'Twitter' }),
        new SocialLink({ platform: 'custom', url: 'https://custom.com', label: 'Custom', customIcon: '🔗' }),
      ]

      const contact = new ContactInfo('test@example.com', 'Paris', socialLinks)

      expect(contact.socialLinks).toHaveLength(4)
      expect(contact.socialLinks[3].customIcon).toBe('🔗')
    })

    it('should handle empty social links', () => {
      const contact = new ContactInfo('test@example.com', 'Sydney', [])

      expect(contact.socialLinks).toHaveLength(0)
    })
  })

  describe('Custom Fields', () => {
    it('should default to empty array when not provided', () => {
      const contact = new ContactInfo(
        { email: 'test@example.com', location: 'Madrid' },
        []
      )

      expect(contact.customFields).toEqual([])
    })

    it('should handle custom fields without icon', () => {
      const customFields: ContactField[] = [
        { label: 'Extension', value: '1234' },
      ]

      const contact = new ContactInfo(
        { email: 'test@example.com', location: 'Rome', customFields },
        []
      )

      expect(contact.customFields[0].icon).toBeUndefined()
    })
  })
})

describe('SocialLink', () => {
  describe('Constructor with props object', () => {
    it('should create SocialLink with props', () => {
      const link = new SocialLink({
        platform: 'github',
        url: 'https://github.com/test',
        label: 'My GitHub',
      })

      expect(link.platform).toBe('github')
      expect(link.url).toBe('https://github.com/test')
      expect(link.label).toBe('My GitHub')
      expect(link.customIcon).toBeUndefined()
    })

    it('should create SocialLink with custom icon', () => {
      const link = new SocialLink({
        platform: 'custom',
        url: 'https://custom.com',
        label: 'Custom Link',
        customIcon: '🎮',
      })

      expect(link.platform).toBe('custom')
      expect(link.customIcon).toBe('🎮')
    })
  })

  describe('Constructor with individual parameters', () => {
    it('should create SocialLink with individual params', () => {
      const link = new SocialLink('linkedin', 'https://linkedin.com/in/test', 'LinkedIn Profile')

      expect(link.platform).toBe('linkedin')
      expect(link.url).toBe('https://linkedin.com/in/test')
      expect(link.label).toBe('LinkedIn Profile')
    })

    it('should create SocialLink with custom icon via params', () => {
      const link = new SocialLink('custom', 'https://example.com', 'My Site', 'https://example.com/icon.png')

      expect(link.customIcon).toBe('https://example.com/icon.png')
    })
  })

  describe('Platform Types', () => {
    it('should support all platform types', () => {
      const platforms = [
        'github', 'linkedin', 'twitter', 'facebook', 'instagram',
        'youtube', 'tiktok', 'discord', 'slack', 'medium',
        'dev', 'stackoverflow', 'dribbble', 'behance', 'figma',
        'codepen', 'whatsapp', 'telegram', 'scholar', 'researchgate',
        'orcid', 'email', 'website', 'custom',
      ] as const

      platforms.forEach((platform) => {
        const link = new SocialLink({ platform, url: `https://${platform}.com`, label: platform })
        expect(link.platform).toBe(platform)
      })
    })
  })
})
