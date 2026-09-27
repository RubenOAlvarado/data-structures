# Go

[Leer en español](README.es.md)

## Requirements

- Go 1.24 or newer.

## Setup

There is no install step: the module has no dependencies.

## Layout

Each structure is a package:

```
stack/
├── doc.go          ← package documentation
├── starter.go      ← your implementation goes here (build tag !solution)
├── solution.go     ← reference solution (build tag solution)
└── stack_test.go   ← tests
```

The starter and the solution are two versions of the same package. Build tags choose which one is compiled: the starter by default, the solution with `-tags solution`.

## Workflow

```bash
go test ./stack                          # stack tests against your starter
go test -tags solution ./...             # every test against the reference solutions
go test -tags solution ./stack           # only the stack tests against the solution
go test ./stack -run "TestStack/pops"    # a single case
```

Every case fails with `panic: TODO: not implemented` until you implement the starter. A panic only fails its own case, so you always see the full list.

## Conventions

- Absence returns the zero value and `false`: `v, ok := s.Pop()`.
- An invalid index panics, like indexing a slice.
- Iteration uses Go iterators: `for v := range s.All()`. Your iterator must stop as soon as `yield` returns `false`, which happens when the loop breaks.
- Constructors are called `New`: `stack.New[int]()`.

## Quality checks

```bash
gofmt -w .
go vet ./...
go vet -tags solution ./...
go run honnef.co/go/tools/cmd/staticcheck@2026.2.1 ./...
```

`staticcheck` needs Go 1.26 or newer; with an older Go, `go run` downloads a newer toolchain automatically.

## Editor

gopls analyzes the starter by default and reports `solution.go` as excluded by build tags. To browse the solutions with full editor support, add `-tags=solution` to the build flags of gopls. In VS Code: `"gopls": { "buildFlags": ["-tags=solution"] }`.
