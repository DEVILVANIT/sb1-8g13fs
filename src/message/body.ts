import { ContentTransferEncoding } from './headers/content';

export class Body {
  private encoded: Uint8Array;
  private transferEncoding: ContentTransferEncoding;

  constructor(content: string | Uint8Array) {
    const rawContent = typeof content === 'string' 
      ? new TextEncoder().encode(content)
      : content;
    
    [this.encoded, this.transferEncoding] = this.determineEncoding(rawContent);
  }

  private determineEncoding(content: Uint8Array): [Uint8Array, ContentTransferEncoding] {
    // Simple encoding determination - could be more sophisticated
    if (this.isSevenBit(content)) {
      return [content, ContentTransferEncoding.SEVEN_BIT];
    }
    return [this.base64Encode(content), ContentTransferEncoding.BASE64];
  }

  private isSevenBit(content: Uint8Array): boolean {
    return content.every(byte => byte < 128);
  }

  private base64Encode(content: Uint8Array): Uint8Array {
    const base64 = btoa(String.fromCharCode(...content));
    return new TextEncoder().encode(base64);
  }

  encoding(): ContentTransferEncoding {
    return this.transferEncoding;
  }

  content(): Uint8Array {
    return this.encoded;
  }
}

export interface IntoBody {
  into_body(encoding?: ContentTransferEncoding): Body;
}