import { Header } from './index';
import { Mailbox, Mailboxes } from '../mailbox';

export abstract class MailboxHeader implements Header {
  constructor(protected mailboxes: Mailboxes) {}

  abstract name(): string;

  value(): string {
    return this.mailboxes.toString();
  }
}

export class From extends MailboxHeader {
  name(): string {
    return 'From';
  }
}

export class To extends MailboxHeader {
  name(): string {
    return 'To';
  }
}

export class Cc extends MailboxHeader {
  name(): string {
    return 'Cc';
  }
}

export class Bcc extends MailboxHeader {
  name(): string {
    return 'Bcc';
  }
}