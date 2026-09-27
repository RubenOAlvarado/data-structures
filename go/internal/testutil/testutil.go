// Package testutil holds helpers shared by the structure tests.
package testutil

import "testing"

// Run runs fn as a subtest named name. A panic inside fn, such as the
// "TODO: not implemented" panic of an unfinished starter method, is reported
// as a failure of that subtest only, so the remaining subtests still run.
func Run(t *testing.T, name string, fn func(t *testing.T)) {
	t.Helper()
	t.Run(name, func(t *testing.T) {
		t.Helper()
		defer func() {
			if r := recover(); r != nil {
				t.Fatalf("panic: %v", r)
			}
		}()
		fn(t)
	})
}
