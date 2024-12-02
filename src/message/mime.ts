import { Header } from './headers';
import { Body } from './body';

export class Part {
  static Multi(part: MultiPart): Part {
    return new Part('multi', part);
  }

  static Single(part: SinglePart): Part {
    return new Part('single', part);
  }

  private constructor(
    private type: 'multi' | 'single',
    private content: MultiPart | SinglePart
  ) {}

  format(out: Uint8Array): void {
    this.content.format(out);
  }
}

export class MultiPart {
  constructor(
    private parts: Part[],
    private boundary: string = generateBoundary()
  ) {}

  static alternative(): MultiPart {
    return new MultiPart([]);
  }

  format(out: Uint8Array): void {
    // Implementation
  }
}

export class SinglePart {
  constructor(
    private headers: Header[],
    private body: Body
  ) {}

  static builder(): SinglePartBuilder {
    return new SinglePartBuilder();
  }

  format(out: Uint8Array): void {
    // Implementation
  }
}

class SinglePartBuilder {
  private headers: Header[] = [];

  header(header: Header): SinglePartBuilder {
    this.headers.push(header);
    return this;
  }

  body(content: string | Uint8Array): SinglePart {
    return new SinglePart(
      this.headers,
      new Body(content)
    );
  }
}

function generateBoundary(): string {
  return '---boundary' + Math.random().toString(36).slice(2);
}