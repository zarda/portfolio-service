import { Entity } from '../../../core/models/Entity';

export interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string | null;
  liveUrl: string;
  githubUrl?: string;
}

export class Project extends Entity<ProjectProps> {
  constructor(props: ProjectProps, id: string) {
    super(props, id);
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get tags(): string[] {
    return [...this.props.tags];
  }

  get imageUrl(): string | null {
    return this.props.imageUrl;
  }

  get liveUrl(): string {
    return this.props.liveUrl;
  }

  get githubUrl(): string | undefined {
    return this.props.githubUrl;
  }

  get hasGithub(): boolean {
    return Boolean(this.props.githubUrl);
  }
}
