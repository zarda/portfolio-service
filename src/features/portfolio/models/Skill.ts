export interface SkillProps {
  name: string;
  level: number; // 0-100
}

export class Skill {
  constructor(private readonly props: SkillProps) {
    if (props.level < 0 || props.level > 100) {
      throw new Error('Skill level must be between 0 and 100');
    }
  }

  get name(): string {
    return this.props.name;
  }

  get level(): number {
    return this.props.level;
  }
}
