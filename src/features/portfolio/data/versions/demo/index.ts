import { Portfolio } from '../../../models';
import { profile } from './profile';
import { skillCategories } from './skills';
import { projects } from './projects';
import { contactInfo } from './contact';

/**
 * Demo Portfolio Version
 *
 * This version contains explanatory placeholder data for testing
 * and understanding the portfolio architecture.
 *
 * Access via URL: http://localhost:5173/?version=demo
 *
 * Portfolio is the aggregate root that combines:
 * - Profile (personal info, about paragraphs, stats)
 * - SkillCategory[] (grouped skills with proficiency levels)
 * - Project[] (portfolio projects with links and tags)
 * - ContactInfo (email, location, social links)
 */
export const demoPortfolio = new Portfolio(
  {
    version: 'demo',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  'portfolio-demo',
  profile,
  skillCategories,
  projects,
  contactInfo
);
