export class EmailError extends Error {
  static readonly MISSING_FROM = new EmailError('Missing From header');
  static readonly TOO_MANY_FROM = new EmailError('Multiple From headers require a Sender header');

  constructor(message: string) {
    super(message);
    this.name = 'EmailError';
  }
}