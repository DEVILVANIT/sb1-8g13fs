import { repeat } from './iter';
import { alphanumeric } from 'fastrand';

export function makeMessageId(): string {
  return repeat(() => String.fromCharCode(alphanumeric()))
    .take(36)
    .join('');
}