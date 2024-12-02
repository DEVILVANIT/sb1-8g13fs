export class SystemTime {
  private timestamp: number;

  constructor(timestamp?: number) {
    this.timestamp = timestamp ?? Date.now();
  }

  static now(): SystemTime {
    return new SystemTime();
  }

  toRFC2822(): string {
    return new Date(this.timestamp).toUTCString();
  }
}