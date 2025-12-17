import { ContactInfo, SocialLink } from '../../../models';

export const contactInfo = new ContactInfo(
  'hengtaijan@gmail.com',
  'Taiwan',
  'https://wa.me/886928796022',
  [
    new SocialLink('github', 'https://github.com/zarda', 'GitHub'),
    new SocialLink('whatsapp', 'https://wa.me/886928796022', 'WhatsApp'),
    new SocialLink(
      'linkedin',
      'https://linkedin.com/in/hengtai-jan-188793b8/',
      'LinkedIn'
    ),
    new SocialLink(
      'scholar',
      'https://scholar.google.com/citations?hl=zh-TW&user=HFZCbFwAAAAJ',
      'Google Scholar'
    ),
  ]
);
