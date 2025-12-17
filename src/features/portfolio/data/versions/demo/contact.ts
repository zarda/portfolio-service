import { ContactInfo, SocialLink } from '../../../models';

/**
 * Demo Contact Data
 *
 * ContactInfo contains:
 * - email: Primary contact email
 * - location: Geographic location
 * - whatsappUrl: WhatsApp contact link
 * - socialLinks: Array of SocialLink objects
 *
 * SocialLink defines:
 * - platform: Type-safe platform identifier (github, linkedin, whatsapp, scholar, email)
 * - url: Link URL
 * - label: Accessible label for screen readers
 *
 * The socialLinks getter returns a copy of the array (immutability pattern).
 */
export const contactInfo = new ContactInfo(
  'demo@example.com',
  'San Francisco, CA',
  'https://wa.me/1234567890',
  [
    new SocialLink('github', 'https://github.com/demo-user', 'GitHub'),
    new SocialLink('linkedin', 'https://linkedin.com/in/demo-user', 'LinkedIn'),
    new SocialLink('whatsapp', 'https://wa.me/1234567890', 'WhatsApp'),
  ]
);
