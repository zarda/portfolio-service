import { Skill } from './Skill';

export class SkillCategory {
  constructor(
    public readonly category: string,
    private readonly _skills: Skill[]
  ) {}

  get skills(): Skill[] {
    return [...this._skills];
  }
}
