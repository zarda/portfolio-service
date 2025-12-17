import { Portfolio } from '../../../models';
import { profile } from './profile';
import { skillCategories } from './skills';
import { projects } from './projects';
import { contactInfo } from './contact';

export const hengtai25Portfolio = new Portfolio(
  {
    version: 'hengtai25',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  'portfolio-hengtai25',
  profile,
  skillCategories,
  projects,
  contactInfo
);
