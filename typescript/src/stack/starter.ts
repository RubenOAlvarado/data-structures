/**
 * A last-in, first-out (LIFO) collection.
 *
 * Build it on linked nodes: do not use a native array as storage, because that
 * would be using JavaScript's built-in stack.
 *
 * Target complexity: O(1) for push, pop, peek, size and isEmpty.
 */
export class Stack<T> implements Iterable<T> {
  /** Adds `value` on top of the stack. */
  push(value: T): void {
    throw new Error("TODO: not implemented");
  }

  /** Removes and returns the top value, or returns `undefined` if the stack is empty. */
  pop(): T | undefined {
    throw new Error("TODO: not implemented");
  }

  /** Returns the top value without removing it, or `undefined` if the stack is empty. */
  peek(): T | undefined {
    throw new Error("TODO: not implemented");
  }

  /** Number of values in the stack. */
  get size(): number {
    throw new Error("TODO: not implemented");
  }

  /** Whether the stack has no values. */
  isEmpty(): boolean {
    throw new Error("TODO: not implemented");
  }

  /** Yields the values from top to bottom without modifying the stack. */
  [Symbol.iterator](): Iterator<T> {
    throw new Error("TODO: not implemented");
  }
}
