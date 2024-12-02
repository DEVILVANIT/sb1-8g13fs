import { Headers } from '../headers';
import { EmailError } from '../../errors';

export class MessageValidator {
  static validate(headers: Headers): void {
    this.validateFrom(headers);
    this.validateRecipients(headers);
    this.validateDate(headers);
  }

  private static validateFrom(headers: Headers): void {
    const from = headers.get('From');
    if (!from) {
      throw EmailError.MISSING_FROM;
    }

    const fromAddresses = from.value().split(',').length;
    const hasSender = headers.get('Sender') !== undefined;

    if (fromAddresses > 1 && !hasSender) {
      throw EmailError.TOO_MANY_FROM;
    }
  }

  private static validateRecipients(headers: Headers): void {
    const to = headers.get('To');
    const cc = headers.get('Cc');
    const bcc = headers.get('Bcc');

    if (!to && !cc && !bcc) {
      throw new EmailError('At least one recipient is required');
    }
  }

  private static validateDate(headers: Headers): void {
    const date = headers.get('Date');
    if (!date) {
      throw new EmailError('Date header is required');
    }
  }
}