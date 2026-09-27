"""Reference solution for the Stack starter."""

from collections.abc import Iterator


class _Node[T]:
    __slots__ = ("value", "next")

    def __init__(self, value: T, next: "_Node[T] | None") -> None:
        self.value = value
        self.next = next


class Stack[T]:
    def __init__(self) -> None:
        self._top: _Node[T] | None = None
        self._size = 0

    def push(self, value: T) -> None:
        self._top = _Node(value, self._top)
        self._size += 1

    def pop(self) -> T:
        if self._top is None:
            raise IndexError("pop from empty stack")
        node = self._top
        self._top = node.next
        self._size -= 1
        return node.value

    def peek(self) -> T:
        if self._top is None:
            raise IndexError("peek from empty stack")
        return self._top.value

    def is_empty(self) -> bool:
        return self._size == 0

    def __len__(self) -> int:
        return self._size

    def __iter__(self) -> Iterator[T]:
        node = self._top
        while node is not None:
            yield node.value
            node = node.next
