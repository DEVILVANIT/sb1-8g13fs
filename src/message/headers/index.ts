export * from './content';
export * from './mailbox';
export * from './mime';
export * from './date';
export * from './subject';

export interface Header {
  name(): string;
  value(): string;
}

export class Headers {
  private headers: Map<string, Header>;

  constructor() {
    this.headers = new Map();
  }

  set(header: Header): void {
    this.headers.set(header.name(), header);
  }

  get<T extends Header>(type: new () => T): T | undefined {
    return this.headers.get(type.name) as T;
  }

  remove<T extends Header>(type: new () => T): void {
    this.headers.delete(type.name);
  }
}