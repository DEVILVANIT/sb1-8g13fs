export class Mailbox {
  constructor(
    private name: string | null,
    private address: string
  ) {}

  static parse(input: string): Mailbox {
    const match = input.match(/^(?:"?([^"]*)"?\s+)?<?([^>]+)>?$/);
    if (!match) {
      throw new Error('Invalid mailbox format');
    }
    return new Mailbox(match[1] || null, match[2]);
  }

  toString(): string {
    if (this.name) {
      return `"${this.name}" <${this.address}>`;
    }
    return `<${this.address}>`;
  }
}

export class Mailboxes {
  constructor(private boxes: Mailbox[]) {}

  static from(mailbox: Mailbox): Mailboxes {
    return new Mailboxes([mailbox]);
  }

  toString(): string {
    return this.boxes.map(box => box.toString()).join(', ');
  }
}