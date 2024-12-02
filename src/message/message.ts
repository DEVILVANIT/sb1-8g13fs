import { Headers } from './headers';
import { MessageBody } from './message-body';
import { Envelope } from '../address/envelope';
import { MessageBuilder } from './builder';
import { DkimConfig } from './dkim';

export class Message {
  private headers: Headers;
  private body: MessageBody;
  private envelope: Envelope;

  constructor(headers: Headers, body: MessageBody, envelope: Envelope) {
    this.headers = headers;
    this.body = body;
    this.envelope = envelope;
  }

  static builder(): MessageBuilder {
    return new MessageBuilder();
  }

  headers(): Headers {
    return this.headers;
  }

  envelope(): Envelope {
    return this.envelope;
  }

  formatted(): Uint8Array {
    // Implementation
  }

  sign(dkimConfig: DkimConfig): void {
    // Implementation
  }
}