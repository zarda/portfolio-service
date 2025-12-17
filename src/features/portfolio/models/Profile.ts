export interface ProfileStat {
  value: string;
  label: string;
  link?: string;
}

export interface ProfileProps {
  name: string;
  title: string;
  greeting: string;
  description: string;
  aboutParagraphs: string[];
  photoUrl: string;
  stats: ProfileStat[];
}

export class Profile {
  constructor(private readonly props: ProfileProps) {}

  get name(): string {
    return this.props.name;
  }

  get title(): string {
    return this.props.title;
  }

  get greeting(): string {
    return this.props.greeting;
  }

  get description(): string {
    return this.props.description;
  }

  get aboutParagraphs(): string[] {
    return [...this.props.aboutParagraphs];
  }

  get photoUrl(): string {
    return this.props.photoUrl;
  }

  get stats(): ProfileStat[] {
    return [...this.props.stats];
  }
}
