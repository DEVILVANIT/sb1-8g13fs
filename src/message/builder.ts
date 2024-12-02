import { SystemTime } from '../utils/time';
import { Headers, Header, MailboxesHeader } from './headers';
import { Mailbox, Mailboxes } from './mailbox';
import { MessageBody } from './message-body';
import { Message } from './message';
import { Envelope } from '../address/envelope';
import { ContentTransferEncoding } from './headers/content';
import { EmailError } from '../errors';
import { Body, IntoBody } from './body';
import { MultiPart, SinglePart, Part } from './mime';
import { MessageValidator } from './validation';
import { DkimConfig } from './dkim/config';

export class MessageBuilder {
  private headers: Headers;
  private envelope: Envelope | null;
  private dropBcc: boolean;
  private dkimConfig: DkimConfig | null;

  constructor() {
    this.headers = new Headers();
    this.envelope = null;
    this.dropBcc = true;
    this.dkimConfig = null;
  }

  from(mbox: Mailbox): MessageBuilder {
    return this.mailbox(new From(Mailboxes.from(mbox)));
  }

  to(mbox: Mailbox): MessageBuilder {
    return this.mailbox(new To(Mailboxes.from(mbox))); 
  }

  subject(subject: string): MessageBuilder {
    return this.header(new Subject(subject));
  }

  dkim(config: DkimConfig): MessageBuilder {
    this.dkimConfig = config;
    return this;
  }

  private build(body: MessageBody): Message {
    MessageValidator.validate(this.headers);
    
    const message = new Message(
      this.headers,
      body,
      this.envelope || Envelope.fromHeaders(this.headers)
    );

    if (this.dkimConfig) {
      message.sign(this.dkimConfig);
    }

    return message;
  }

  body<T extends IntoBody>(body: T): Message {
    const maybeEncoding = this.headers.get<ContentTransferEncoding>('Content-Transfer-Encoding');
    const messageBody = body.into_body(maybeEncoding);
    this.headers.set(messageBody.encoding());
    return this.build(new MessageBody(messageBody.content()));
  }

  multipart(part: MultiPart): Message {
    return this.mime1_0().build(new MessageBody(Part.Multi(part)));
  }

  singlepart(part: SinglePart): Message {
    return this.mime1_0().build(new MessageBody(Part.Single(part)));
  }

  private mime1_0(): MessageBuilder {
    return this.header(MIME_VERSION_1_0);
  }
}