//go:build !solution

package stack

import "iter"

// Stack is a last-in, first-out (LIFO) collection.
//
// Build it on linked nodes: do not use a slice as storage, because that
// would be using Go's built-in dynamic array.
//
// Target complexity: O(1) for Push, Pop, Peek, Len and IsEmpty.
type Stack[T any] struct{}

// New returns an empty stack.
func New[T any]() *Stack[T] {
	panic("TODO: not implemented")
}

// Push adds v on top of the stack.
func (s *Stack[T]) Push(v T) {
	panic("TODO: not implemented")
}

// Pop removes and returns the top value. The boolean is false, and the value
// is the zero value of T, when the stack is empty.
func (s *Stack[T]) Pop() (T, bool) {
	panic("TODO: not implemented")
}

// Peek returns the top value without removing it. The boolean is false, and
// the value is the zero value of T, when the stack is empty.
func (s *Stack[T]) Peek() (T, bool) {
	panic("TODO: not implemented")
}

// Len returns the number of values in the stack.
func (s *Stack[T]) Len() int {
	panic("TODO: not implemented")
}

// IsEmpty reports whether the stack has no values.
func (s *Stack[T]) IsEmpty() bool {
	panic("TODO: not implemented")
}

// All returns an iterator over the values from top to bottom. Iterating does
// not modify the stack, and it stops as soon as the loop body breaks.
func (s *Stack[T]) All() iter.Seq[T] {
	panic("TODO: not implemented")
}
