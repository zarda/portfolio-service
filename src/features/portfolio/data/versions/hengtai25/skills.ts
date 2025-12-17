import { Skill, SkillCategory } from '../../../models';

export const skillCategories: SkillCategory[] = [
  new SkillCategory('Frontend', [
    new Skill({ name: 'Angular', level: 90 }),
    new Skill({ name: 'React', level: 80 }),
    new Skill({ name: 'TypeScript', level: 90 }),
    new Skill({ name: 'HTML/CSS', level: 80 }),
    new Skill({ name: 'Material UI', level: 75 }),
  ]),
  new SkillCategory('Backend & Infrastructure', [
    new Skill({ name: 'Node.js', level: 70 }),
    new Skill({ name: 'Python', level: 95 }),
    new Skill({ name: 'C++', level: 90 }),
    new Skill({ name: 'RESTful APIs', level: 75 }),
    new Skill({ name: 'gRPC', level: 70 }),
    new Skill({ name: 'WebSocket', level: 70 }),
    new Skill({ name: 'GCP', level: 70 }),
  ]),
  new SkillCategory('Testing & Tools', [
    new Skill({ name: 'E2E Testing', level: 80 }),
    new Skill({ name: 'CI/CD', level: 70 }),
    new Skill({ name: 'Git', level: 80 }),
    new Skill({ name: 'I18n/A11y', level: 85 }),
  ]),
];
