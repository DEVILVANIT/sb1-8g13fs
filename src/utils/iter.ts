export function repeat<T>(fn: () => T): Iterator<T> {
  return {
    next(): IteratorResult<T> {
      return { value: fn(), done: false };
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}

export interface Iterator<T> {
  next(): IteratorResult<T>;
  [Symbol.iterator](): Iterator<T>;
  take(n: number): T[];
}

Iterator.prototype.take = function<T>(n: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    result.push(this.next().value);
  }
  return result;
};