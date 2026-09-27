package stack

import (
	"slices"
	"testing"

	"github.com/RubenOAlvarado/data-structures/go/internal/testutil"
)

func TestStack(t *testing.T) {
	testutil.Run(t, "starts empty", func(t *testing.T) {
		s := New[int]()
		if got := s.Len(); got != 0 {
			t.Fatalf("Len() = %d, want 0", got)
		}
		if !s.IsEmpty() {
			t.Fatal("IsEmpty() = false, want true")
		}
	})

	testutil.Run(t, "grows with each push", func(t *testing.T) {
		s := New[int]()
		s.Push(1)
		s.Push(2)
		if got := s.Len(); got != 2 {
			t.Fatalf("Len() = %d, want 2", got)
		}
		if s.IsEmpty() {
			t.Fatal("IsEmpty() = true, want false")
		}
	})

	testutil.Run(t, "peeks at the last pushed value without removing it", func(t *testing.T) {
		s := New[int]()
		s.Push(1)
		s.Push(2)
		if v, ok := s.Peek(); v != 2 || !ok {
			t.Fatalf("Peek() = (%d, %t), want (2, true)", v, ok)
		}
		if got := s.Len(); got != 2 {
			t.Fatalf("Len() = %d, want 2", got)
		}
	})

	testutil.Run(t, "pops values in LIFO order", func(t *testing.T) {
		s := New[int]()
		s.Push(1)
		s.Push(2)
		s.Push(3)
		for _, want := range []int{3, 2, 1} {
			if v, ok := s.Pop(); v != want || !ok {
				t.Fatalf("Pop() = (%d, %t), want (%d, true)", v, ok, want)
			}
		}
		if got := s.Len(); got != 0 {
			t.Fatalf("Len() = %d, want 0", got)
		}
	})

	testutil.Run(t, "reports absence from Pop and Peek when empty", func(t *testing.T) {
		s := New[int]()
		if v, ok := s.Pop(); v != 0 || ok {
			t.Fatalf("Pop() = (%d, %t), want (0, false)", v, ok)
		}
		if v, ok := s.Peek(); v != 0 || ok {
			t.Fatalf("Peek() = (%d, %t), want (0, false)", v, ok)
		}
		if got := s.Len(); got != 0 {
			t.Fatalf("Len() = %d, want 0", got)
		}
	})

	testutil.Run(t, "can be reused after being emptied", func(t *testing.T) {
		s := New[int]()
		s.Push(1)
		s.Pop()
		if !s.IsEmpty() {
			t.Fatal("IsEmpty() = false, want true")
		}
		s.Push(2)
		if v, ok := s.Peek(); v != 2 || !ok {
			t.Fatalf("Peek() = (%d, %t), want (2, true)", v, ok)
		}
		if got := s.Len(); got != 1 {
			t.Fatalf("Len() = %d, want 1", got)
		}
	})

	testutil.Run(t, "keeps LIFO order when Push and Pop are interleaved", func(t *testing.T) {
		s := New[int]()
		s.Push(1)
		s.Push(2)
		if v, _ := s.Pop(); v != 2 {
			t.Fatalf("Pop() = %d, want 2", v)
		}
		s.Push(3)
		if v, _ := s.Pop(); v != 3 {
			t.Fatalf("Pop() = %d, want 3", v)
		}
		if v, _ := s.Pop(); v != 1 {
			t.Fatalf("Pop() = %d, want 1", v)
		}
	})

	testutil.Run(t, "iterates from top to bottom without modifying the stack", func(t *testing.T) {
		s := New[int]()
		s.Push(1)
		s.Push(2)
		s.Push(3)
		want := []int{3, 2, 1}
		if got := slices.Collect(s.All()); !slices.Equal(got, want) {
			t.Fatalf("All() = %v, want %v", got, want)
		}
		if got := slices.Collect(s.All()); !slices.Equal(got, want) {
			t.Fatalf("second All() = %v, want %v", got, want)
		}
		if got := s.Len(); got != 3 {
			t.Fatalf("Len() = %d, want 3", got)
		}
	})

	testutil.Run(t, "stops iterating when the loop breaks", func(t *testing.T) {
		s := New[int]()
		s.Push(1)
		s.Push(2)
		s.Push(3)
		var got []int
		for v := range s.All() {
			got = append(got, v)
			if len(got) == 2 {
				break
			}
		}
		if want := []int{3, 2}; !slices.Equal(got, want) {
			t.Fatalf("got %v, want %v", got, want)
		}
	})

	testutil.Run(t, "works with non-numeric values", func(t *testing.T) {
		s := New[string]()
		s.Push("a")
		s.Push("b")
		if v, _ := s.Pop(); v != "b" {
			t.Fatalf("Pop() = %q, want %q", v, "b")
		}
		if v, _ := s.Peek(); v != "a" {
			t.Fatalf("Peek() = %q, want %q", v, "a")
		}
	})

	testutil.Run(t, "stores zero values like any other value", func(t *testing.T) {
		s := New[any]()
		s.Push(0)
		s.Push("")
		s.Push(false)
		s.Push(nil)
		if got := s.Len(); got != 4 {
			t.Fatalf("Len() = %d, want 4", got)
		}
		for _, want := range []any{nil, false, ""} {
			if v, ok := s.Pop(); v != want || !ok {
				t.Fatalf("Pop() = (%v, %t), want (%v, true)", v, ok, want)
			}
		}
		if v, ok := s.Peek(); v != 0 || !ok {
			t.Fatalf("Peek() = (%v, %t), want (0, true)", v, ok)
		}
		if s.IsEmpty() {
			t.Fatal("IsEmpty() = true, want false")
		}
	})

	testutil.Run(t, "handles many values", func(t *testing.T) {
		s := New[int]()
		const count = 100_000
		for i := range count {
			s.Push(i)
		}
		if got := s.Len(); got != count {
			t.Fatalf("Len() = %d, want %d", got, count)
		}
		iterated := slices.Collect(s.All())
		if len(iterated) != count {
			t.Fatalf("All() yielded %d values, want %d", len(iterated), count)
		}
		if iterated[0] != count-1 || iterated[count-1] != 0 {
			t.Fatalf("All() went from %d to %d, want from %d to 0", iterated[0], iterated[count-1], count-1)
		}
		for want := count - 1; want >= 0; want-- {
			if v, ok := s.Pop(); v != want || !ok {
				t.Fatalf("Pop() = (%d, %t), want (%d, true)", v, ok, want)
			}
		}
		if !s.IsEmpty() {
			t.Fatal("IsEmpty() = false, want true")
		}
	})
}
