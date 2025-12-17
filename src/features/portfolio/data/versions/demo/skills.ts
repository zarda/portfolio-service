import { Skill, SkillCategory } from '../../../models';

/**
 * Demo Skills Data
 *
 * Skills are organized into categories, each containing multiple skill items.
 * Each skill has a name and a proficiency level (0-100).
 *
 * The Skill model validates that levels are between 0-100.
 * SkillCategory groups related skills together.
 */
export const skillCategories: SkillCategory[] = [
  new SkillCategory('Frontend Development', [
    new Skill({ name: 'React', level: 85 }),
    new Skill({ name: 'Vue.js', level: 75 }),
    new Skill({ name: 'TypeScript', level: 80 }),
    new Skill({ name: 'CSS/Sass', level: 90 }),
  ]),
  new SkillCategory('Backend Development', [
    new Skill({ name: 'Node.js', level: 80 }),
    new Skill({ name: 'Python', level: 75 }),
    new Skill({ name: 'PostgreSQL', level: 70 }),
    new Skill({ name: 'REST APIs', level: 85 }),
  ]),
  new SkillCategory('DevOps & Tools', [
    new Skill({ name: 'Docker', level: 70 }),
    new Skill({ name: 'Git', level: 90 }),
    new Skill({ name: 'CI/CD', level: 65 }),
    new Skill({ name: 'AWS', level: 60 }),
  ]),
];
