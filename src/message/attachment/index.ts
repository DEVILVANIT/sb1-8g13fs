import { lookup } from 'mime-types';
import { ContentType, ContentDisposition } from '../headers/content';
import { SinglePart } from '../mime';
import { Body } from '../body';

export class Attachment {
  private filename: string;
  private content: Body;
  private contentType: ContentType;

  constructor(filename: string, content: string | Uint8Array) {
    this.filename = filename;
    this.content = new Body(content);
    this.contentType = new ContentType(
      lookup(filename) || 'application/octet-stream'
    );
  }

  static new(filename: string): AttachmentBuilder {
    return new AttachmentBuilder(filename, false);
  }

  static newInline(contentId: string): AttachmentBuilder {
    return new AttachmentBuilder(contentId, true);
  }

  toSinglePart(): SinglePart {
    return SinglePart.builder()
      .header(this.contentType)
      .header(new ContentDisposition(this.filename))
      .body(this.content);
  }
}

class AttachmentBuilder {
  private filename: string;
  private inline: boolean;

  constructor(filename: string, inline: boolean) {
    this.filename = filename;
    this.inline = inline;
  }

  body(content: string | Uint8Array, contentType?: string): SinglePart {
    const attachment = new Attachment(this.filename, content);
    return attachment.toSinglePart();
  }
}