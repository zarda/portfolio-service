import { ContactInfo, SocialLink } from '../../../models'

export const contactInfo = new ContactInfo('hengtaijan@gmail.com', 'Taiwan', [
  new SocialLink({ platform: 'github', url: 'https://github.com/zarda', label: 'GitHub' }),
  new SocialLink({ platform: 'whatsapp', url: 'https://wa.me/886928796022', label: 'WhatsApp' }),
  new SocialLink({
    platform: 'linkedin',
    url: 'https://linkedin.com/in/hengtai-jan-188793b8/',
    label: 'LinkedIn',
  }),
  new SocialLink({
    platform: 'scholar',
    url: 'https://scholar.google.com/citations?hl=zh-TW&user=HFZCbFwAAAAJ',
    label: 'Google Scholar',
  }),
])
