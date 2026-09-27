import pytest

from ds.stack.starter import Stack


def test_starts_empty() -> None:
    stack = Stack[int]()
    assert len(stack) == 0
    assert stack.is_empty()


def test_grows_with_each_push() -> None:
    stack = Stack[int]()
    stack.push(1)
    stack.push(2)
    assert len(stack) == 2
    assert not stack.is_empty()


def test_peeks_at_the_last_pushed_value_without_removing_it() -> None:
    stack = Stack[int]()
    stack.push(1)
    stack.push(2)
    assert stack.peek() == 2
    assert len(stack) == 2


def test_pops_values_in_lifo_order() -> None:
    stack = Stack[int]()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    assert stack.pop() == 3
    assert stack.pop() == 2
    assert stack.pop() == 1
    assert len(stack) == 0


def test_pop_and_peek_raise_index_error_when_empty() -> None:
    stack = Stack[int]()
    with pytest.raises(IndexError):
        stack.pop()
    with pytest.raises(IndexError):
        stack.peek()
    assert len(stack) == 0


def test_can_be_reused_after_being_emptied() -> None:
    stack = Stack[int]()
    stack.push(1)
    stack.pop()
    assert stack.is_empty()
    stack.push(2)
    assert stack.peek() == 2
    assert len(stack) == 1


def test_keeps_lifo_order_when_push_and_pop_are_interleaved() -> None:
    stack = Stack[int]()
    stack.push(1)
    stack.push(2)
    assert stack.pop() == 2
    stack.push(3)
    assert stack.pop() == 3
    assert stack.pop() == 1


def test_iterates_from_top_to_bottom_without_modifying_the_stack() -> None:
    stack = Stack[int]()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    assert list(stack) == [3, 2, 1]
    assert list(stack) == [3, 2, 1]
    assert len(stack) == 3


def test_works_with_non_numeric_values() -> None:
    stack = Stack[str]()
    stack.push("a")
    stack.push("b")
    assert stack.pop() == "b"
    assert stack.peek() == "a"


def test_stores_falsy_values_like_any_other_value() -> None:
    stack = Stack[object]()
    stack.push(0)
    stack.push("")
    stack.push(False)
    stack.push(None)
    assert len(stack) == 4
    assert stack.pop() is None
    assert stack.pop() is False
    assert stack.pop() == ""
    assert stack.peek() == 0
    assert not stack.is_empty()


def test_handles_many_values() -> None:
    stack = Stack[int]()
    count = 100_000
    for i in range(count):
        stack.push(i)
    assert len(stack) == count
    iterated = list(stack)
    assert len(iterated) == count
    assert (iterated[0], iterated[-1]) == (count - 1, 0)
    popped = [stack.pop() for _ in range(count)]
    assert popped == list(range(count - 1, -1, -1))
    assert stack.is_empty()
