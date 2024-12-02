export class Envelope {
  constructor(
    private from: string,
    private recipients: string[]
  ) {}

  static fromHeaders(headers: any): Envelope {
    // Implementation
    return new Envelope('', []);
  }
}