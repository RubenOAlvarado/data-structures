package ds.stack;

import java.util.Iterator;

/**
 * A last-in, first-out (LIFO) collection.
 *
 * <p>Build it on linked nodes: do not use arrays or {@code java.util} collections as storage,
 * because that would be using Java's built-in structures.
 *
 * <p>Target complexity: O(1) for push, pop, peek, size and isEmpty.
 */
public final class Stack<T> implements Iterable<T> {

  /** Adds {@code value} on top of the stack. */
  public void push(T value) {
    throw new UnsupportedOperationException("TODO: not implemented");
  }

  /**
   * Removes and returns the top value.
   *
   * @throws java.util.NoSuchElementException if the stack is empty
   */
  public T pop() {
    throw new UnsupportedOperationException("TODO: not implemented");
  }

  /**
   * Returns the top value without removing it.
   *
   * @throws java.util.NoSuchElementException if the stack is empty
   */
  public T peek() {
    throw new UnsupportedOperationException("TODO: not implemented");
  }

  /** Returns the number of values in the stack. */
  public int size() {
    throw new UnsupportedOperationException("TODO: not implemented");
  }

  /** Returns {@code true} if the stack has no values. */
  public boolean isEmpty() {
    throw new UnsupportedOperationException("TODO: not implemented");
  }

  /** Iterates over the values from top to bottom without modifying the stack. */
  @Override
  public Iterator<T> iterator() {
    throw new UnsupportedOperationException("TODO: not implemented");
  }
}
