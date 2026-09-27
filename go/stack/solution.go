//go:build solution

package stack

import "iter"

type node[T any] struct {
	value T
	next  *node[T]
}

// Stack is a last-in, first-out (LIFO) collection.
type Stack[T any] struct {
	top  *node[T]
	size int
}

// New returns an empty stack.
func New[T any]() *Stack[T] {
	return &Stack[T]{}
}

// Push adds v on top of the stack.
func (s *Stack[T]) Push(v T) {
	s.top = &node[T]{value: v, next: s.top}
	s.size++
}

// Pop removes and returns the top value. The boolean is false, and the value
// is the zero value of T, when the stack is empty.
func (s *Stack[T]) Pop() (T, bool) {
	if s.top == nil {
		var zero T
		return zero, false
	}
	v := s.top.value
	s.top = s.top.next
	s.size--
	return v, true
}

// Peek returns the top value without removing it. The boolean is false, and
// the value is the zero value of T, when the stack is empty.
func (s *Stack[T]) Peek() (T, bool) {
	if s.top == nil {
		var zero T
		return zero, false
	}
	return s.top.value, true
}

// Len returns the number of values in the stack.
func (s *Stack[T]) Len() int {
	return s.size
}

// IsEmpty reports whether the stack has no values.
func (s *Stack[T]) IsEmpty() bool {
	return s.size == 0
}

// All returns an iterator over the values from top to bottom. Iterating does
// not modify the stack, and it stops as soon as the loop body breaks.
func (s *Stack[T]) All() iter.Seq[T] {
	return func(yield func(T) bool) {
		for n := s.top; n != nil; n = n.next {
			if !yield(n.value) {
				return
			}
		}
	}
}
