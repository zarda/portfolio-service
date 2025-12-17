export type SocialPlatform = 'github' | 'linkedin' | 'whatsapp' | 'scholar' | 'email';

export class SocialLink {
  constructor(
    public readonly platform: SocialPlatform,
    public readonly url: string,
    public readonly label: string
  ) {}
}
