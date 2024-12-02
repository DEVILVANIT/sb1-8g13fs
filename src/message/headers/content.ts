import { Header } from './index';

export class ContentTransferEncoding implements Header {
  static readonly SEVEN_BIT = new ContentTransferEncoding('7bit');
  static readonly QUOTED_PRINTABLE = new ContentTransferEncoding('quoted-printable');
  static readonly BASE64 = new ContentTransferEncoding('base64');

  constructor(private encoding: string) {}

  name(): string {
    return 'Content-Transfer-Encoding';
  }

  value(): string {
    return this.encoding;
  }
}

export class ContentType implements Header {
  static readonly TEXT_PLAIN = new ContentType('text/plain', { charset: 'utf-8' });
  static readonly TEXT_HTML = new ContentType('text/html', { charset: 'utf-8' });

  constructor(
    private mediaType: string,
    private parameters: Record<string, string> = {}
  ) {}

  name(): string {
    return 'Content-Type';
  }

  value(): string {
    const params = Object.entries(this.parameters)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');
    return params ? `${this.mediaType}; ${params}` : this.mediaType;
  }
}

export class ContentDisposition implements Header {
  constructor(
    private filename: string,
    private inline: boolean = false
  ) {}

  name(): string {
    return 'Content-Disposition';
  }

  value(): string {
    const type = this.inline ? 'inline' : 'attachment';
    return `${type}; filename="${this.filename}"`;
  }
}