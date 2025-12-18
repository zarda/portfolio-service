import { ContactInfo, SocialLink } from '../../../models'

export const contactInfo = new ContactInfo('demo@example.com', 'San Francisco, CA', [
  new SocialLink({ platform: 'github', url: 'https://github.com/demo-user', label: 'GitHub' }),
  new SocialLink({ platform: 'linkedin', url: 'https://linkedin.com/in/demo-user', label: 'LinkedIn' }),
  new SocialLink({ platform: 'whatsapp', url: 'https://wa.me/1234567890', label: 'WhatsApp' }),
])
