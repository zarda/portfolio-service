import { Entity } from '../../../core/models/Entity';
import { Profile } from './Profile';
import { SkillCategory } from './SkillCategory';
import { Project } from './Project';
import { ContactInfo } from './ContactInfo';

export interface PortfolioProps {
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Portfolio extends Entity<PortfolioProps> {
  constructor(
    props: PortfolioProps,
    id: string,
    private readonly _profile: Profile,
    private readonly _skillCategories: SkillCategory[],
    private readonly _projects: Project[],
    private readonly _contactInfo: ContactInfo
  ) {
    super(props, id);
  }

  get version(): string {
    return this.props.version;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get profile(): Profile {
    return this._profile;
  }

  get skillCategories(): SkillCategory[] {
    return [...this._skillCategories];
  }

  get projects(): Project[] {
    return [...this._projects];
  }

  get contactInfo(): ContactInfo {
    return this._contactInfo;
  }
}
