import { SocialLink } from './SocialLink';

export class ContactInfo {
  constructor(
    public readonly email: string,
    public readonly location: string,
    public readonly whatsappUrl: string,
    private readonly _socialLinks: SocialLink[]
  ) {}

  get socialLinks(): SocialLink[] {
    return [...this._socialLinks];
  }
}
