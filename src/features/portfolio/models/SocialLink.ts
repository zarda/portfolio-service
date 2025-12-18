export type SocialPlatform =
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'discord'
  | 'slack'
  | 'medium'
  | 'dev'
  | 'stackoverflow'
  | 'dribbble'
  | 'behance'
  | 'figma'
  | 'codepen'
  | 'whatsapp'
  | 'telegram'
  | 'scholar'
  | 'researchgate'
  | 'orcid'
  | 'email'
  | 'website'
  | 'custom'

export interface SocialLinkProps {
  platform: SocialPlatform
  url: string
  label: string
  customIcon?: string // For custom platform, user can provide an emoji or icon URL
}

export class SocialLink {
  public readonly platform: SocialPlatform
  public readonly url: string
  public readonly label: string
  public readonly customIcon?: string

  constructor(props: SocialLinkProps)
  constructor(platform: SocialPlatform, url: string, label: string, customIcon?: string)
  constructor(
    propsOrPlatform: SocialLinkProps | SocialPlatform,
    url?: string,
    label?: string,
    customIcon?: string
  ) {
    if (typeof propsOrPlatform === 'object') {
      this.platform = propsOrPlatform.platform
      this.url = propsOrPlatform.url
      this.label = propsOrPlatform.label
      this.customIcon = propsOrPlatform.customIcon
    } else {
      this.platform = propsOrPlatform
      this.url = url!
      this.label = label!
      this.customIcon = customIcon
    }
  }
}
