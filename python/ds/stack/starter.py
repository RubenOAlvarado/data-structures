"""Stack: a last-in, first-out (LIFO) collection.

Build it on linked nodes: do not use a Python list as storage, because that
would be using Python's built-in stack.

Target complexity: O(1) for push, pop, peek, is_empty and len().
"""

from collections.abc import Iterator


class Stack[T]:
    def push(self, value: T) -> None:
        """Add `value` on top of the stack."""
        raise NotImplementedError("TODO: not implemented")

    def pop(self) -> T:
        """Remove and return the top value. Raise IndexError if the stack is empty."""
        raise NotImplementedError("TODO: not implemented")

    def peek(self) -> T:
        """Return the top value without removing it. Raise IndexError if the stack is empty."""
        raise NotImplementedError("TODO: not implemented")

    def is_empty(self) -> bool:
        """Return True if the stack has no values."""
        raise NotImplementedError("TODO: not implemented")

    def __len__(self) -> int:
        """Return the number of values in the stack."""
        raise NotImplementedError("TODO: not implemented")

    def __iter__(self) -> Iterator[T]:
        """Yield the values from top to bottom without modifying the stack."""
        raise NotImplementedError("TODO: not implemented")
