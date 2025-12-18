import { SocialLink } from './SocialLink'

export interface ContactField {
  label: string
  value: string
  icon?: string // emoji or URL
}

export interface ContactInfoProps {
  email: string
  location: string
  customFields?: ContactField[]
}

export class ContactInfo {
  public readonly email: string
  public readonly location: string
  public readonly customFields: ContactField[]
  private readonly _socialLinks: SocialLink[]

  constructor(props: ContactInfoProps, socialLinks: SocialLink[])
  constructor(email: string, location: string, socialLinks: SocialLink[], customFields?: ContactField[])
  constructor(
    propsOrEmail: ContactInfoProps | string,
    locationOrSocialLinks: string | SocialLink[],
    socialLinksOrCustomFields?: SocialLink[] | ContactField[],
    customFields?: ContactField[]
  ) {
    if (typeof propsOrEmail === 'object') {
      this.email = propsOrEmail.email
      this.location = propsOrEmail.location
      this.customFields = propsOrEmail.customFields || []
      this._socialLinks = locationOrSocialLinks as SocialLink[]
    } else {
      this.email = propsOrEmail
      this.location = locationOrSocialLinks as string
      this._socialLinks = socialLinksOrCustomFields as SocialLink[]
      this.customFields = customFields || []
    }
  }

  get socialLinks(): SocialLink[] {
    return [...this._socialLinks]
  }
}
