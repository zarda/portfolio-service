export abstract class Entity<T extends object> {
  protected constructor(
    protected readonly props: T,
    public readonly id: string
  ) {}

  equals(other: Entity<T>): boolean {
    return this.id === other.id;
  }

  toJSON(): T & { id: string } {
    return { ...this.props, id: this.id };
  }
}
