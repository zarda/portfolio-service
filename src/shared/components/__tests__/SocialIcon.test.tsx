import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SocialIcon, SOCIAL_PLATFORMS } from '../SocialIcon'

describe('SocialIcon', () => {
  describe('Platform Icons', () => {
    it('should render GitHub icon', () => {
      const { container } = render(<SocialIcon platform="github" size={24} />)
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
    })

    it('should render LinkedIn icon', () => {
      const { container } = render(<SocialIcon platform="linkedin" size={24} />)
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
    })

    it('should render Twitter icon', () => {
      const { container } = render(<SocialIcon platform="twitter" size={24} />)
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
    })

    it('should render all defined platform icons', () => {
      const platforms = [
        'github', 'linkedin', 'twitter', 'facebook', 'instagram',
        'youtube', 'tiktok', 'whatsapp', 'telegram', 'discord',
        'slack', 'medium', 'dev', 'stackoverflow', 'codepen',
        'dribbble', 'behance', 'figma', 'scholar', 'researchgate',
        'orcid', 'email', 'website',
      ] as const

      platforms.forEach((platform) => {
        const { container } = render(<SocialIcon platform={platform} size={24} />)
        const svg = container.querySelector('svg')
        expect(svg).toBeTruthy()
      })
    })
  })

  describe('Custom Icons', () => {
    it('should render emoji for custom platform with emoji icon', () => {
      render(<SocialIcon platform="custom" customIcon="🎮" size={24} />)
      expect(screen.getByText('🎮')).toBeTruthy()
    })

    it('should render image for custom platform with URL icon', () => {
      const { container } = render(
        <SocialIcon platform="custom" customIcon="https://example.com/icon.png" size={24} />
      )
      const img = container.querySelector('img')
      expect(img).toBeTruthy()
      expect(img?.getAttribute('src')).toBe('https://example.com/icon.png')
    })

    it('should render default custom icon when no customIcon provided', () => {
      const { container } = render(<SocialIcon platform="custom" size={24} />)
      // Custom platform without customIcon renders the default custom SVG icon
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
    })
  })

  describe('Size Prop', () => {
    it('should apply size to icon container', () => {
      const { container } = render(<SocialIcon platform="github" size={32} />)
      const span = container.querySelector('span')
      expect(span?.style.width).toBe('32px')
      expect(span?.style.height).toBe('32px')
    })

    it('should apply size to custom emoji', () => {
      const { container } = render(<SocialIcon platform="custom" customIcon="🎮" size={48} />)
      const span = container.querySelector('span')
      expect(span?.style.fontSize).toBe('48px')
    })

    it('should apply size to custom image', () => {
      const { container } = render(
        <SocialIcon platform="custom" customIcon="https://example.com/icon.png" size={36} />
      )
      const img = container.querySelector('img')
      expect(img?.style.width).toBe('36px')
      expect(img?.style.height).toBe('36px')
    })
  })

  describe('Class Name Prop', () => {
    it('should apply className to icon', () => {
      const { container } = render(<SocialIcon platform="github" className="custom-class" />)
      const span = container.querySelector('.custom-class')
      expect(span).toBeTruthy()
    })
  })

  describe('Unknown Platform', () => {
    it('should render fallback icon for unknown platform', () => {
      // @ts-expect-error - Testing unknown platform
      render(<SocialIcon platform="unknown-platform" size={24} />)
      expect(screen.getByText('🔗')).toBeTruthy()
    })
  })
})

describe('SOCIAL_PLATFORMS', () => {
  it('should contain all expected platforms', () => {
    const expectedPlatforms = [
      'github', 'codepen', 'stackoverflow', 'dev',
      'linkedin', 'email', 'website',
      'twitter', 'facebook', 'instagram', 'youtube', 'tiktok',
      'whatsapp', 'telegram', 'discord', 'slack',
      'dribbble', 'behance', 'figma',
      'medium',
      'scholar', 'researchgate', 'orcid',
      'custom',
    ]

    expectedPlatforms.forEach((platform) => {
      const found = SOCIAL_PLATFORMS.find((p) => p.value === platform)
      expect(found).toBeDefined()
    })
  })

  it('should have labels for all platforms', () => {
    SOCIAL_PLATFORMS.forEach((platform) => {
      expect(platform.label).toBeDefined()
      expect(platform.label.length).toBeGreaterThan(0)
    })
  })

  it('should include custom as the last option', () => {
    const lastPlatform = SOCIAL_PLATFORMS[SOCIAL_PLATFORMS.length - 1]
    expect(lastPlatform.value).toBe('custom')
  })
})
