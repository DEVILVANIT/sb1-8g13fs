import { Part } from './mime';

export class MessageBody {
  private content: Part | Uint8Array;

  constructor(content: Part | Uint8Array) {
    this.content = content;
  }

  isMime(): boolean {
    return this.content instanceof Part;
  }

  format(out: Uint8Array): void {
    if (this.isMime()) {
      (this.content as Part).format(out);
    } else {
      out.set([13, 10]); // \r\n
      out.set(this.content as Uint8Array);
    }
  }
}