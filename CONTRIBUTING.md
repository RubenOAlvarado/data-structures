# Contributing

[Leer en español](CONTRIBUTING.es.md)

Thank you for helping! This guide explains the rules of the repository and the steps to add a structure or a language.

## Content rules

- **Only data structures.** A structure exposes the operations of its interface (its abstract data type). Problems solved *with* a structure, such as sorting, graph searches (BFS, DFS), shortest paths, sliding window or two pointers, belong to the algorithms repository.
- Tree traversals (pre-order, in-order, post-order and level-order) are part of the interface of a tree, and they are exposed as iterators.
- **Allowed building blocks:** fixed-size arrays, variables and references or pointers. Do not use the native version of what you are building. Composite designs (the LRU and LFU caches) may use the native map, but their doubly linked list is written by hand.
- **Generic** structures in every language.
- **Idiomatic errors** in each language:

| Language | Absence / empty structure | Invalid index | Protocols |
|---|---|---|---|
| TypeScript | returns `undefined` | throws `RangeError` | `Iterable<T>` |
| Python | raises `IndexError` / `KeyError` | raises `IndexError` | `__len__`, `__iter__`, `__contains__` |
| Java | throws `NoSuchElementException` | throws `IndexOutOfBoundsException` | `Iterable<T>` |
| Go | returns `(T, bool)` | panics | `iter.Seq[T]` |

- Code, comments and test names are written in English. Prose documentation is written in English (`README.md`) and in Spanish (`README.es.md`).
- **Never copy the statement of an exercise.** `exercises.toml` only stores the title, the link and a `focus` that we write ourselves.

## Adding a structure

Use `structures/stack` and the `stack` folder of each language as the model.

1. **Theory:** create `structures/<slug>/README.md` and `README.es.md` with these sections: definition, mental model (with a Mermaid diagram), operations and complexity (a table with average time, worst-case time and extra space), variants, when to use it, trade-offs, API contract, build it and exercises. Keep the `<!-- exercises:start -->` and `<!-- exercises:end -->` markers.
2. **Exercises:** create `structures/<slug>/exercises.toml` with 3 to 8 exercises ordered by difficulty.
3. **Code, in every language:**
   - the **starter**: the complete public API with doc comments (the contract and the target complexity), where every body throws `TODO: not implemented`;
   - the **solution**, with the same public API;
   - the **tests**, written against the starter. They cover every rule of the API contract, from the basic cases to the edge cases, and they are the same cases in every language.

   | Language | Location |
   |---|---|
   | TypeScript | `typescript/src/<slug>/`: `starter.ts`, `solution.ts`, `<slug>.test.ts` |
   | Python | `python/ds/<slug_with_underscores>/`: empty `__init__.py`, `starter.py`, `solution.py`, `test_<slug_with_underscores>.py` |
   | Java | `java/src/{starter,solution,test}/java/ds/<slugwithoutdashes>/` |
   | Go | `go/<slugwithoutdashes>/`: `doc.go`, `starter.go` (`//go:build !solution`), `solution.go` (`//go:build solution`), `<slugwithoutdashes>_test.go`. Wrap every case with `testutil.Run` so that a panic only fails its own case |

4. **Generated tables:** from the root of the repository, run `python tools/docs.py`. The catalog marks the structure with ✅ in every language that has a solution.
5. **Checks:** run the quality checks below.

## Adding a language

1. Create a folder with a single, self-contained project and its `README.md` and `README.es.md`.
2. Switch between starter and solution with a native flag of the language, not with environment variables, so that the same tests run against both.
3. In `tools/docs.py`, add the language to `LANGUAGE_COLUMNS` and the path of its solutions to `solution_status`. Then add a workflow in `.github/workflows/`.

## Quality checks

The CI runs these commands. Run them locally before you open a pull request, each one from its folder:

| Folder | Commands |
|---|---|
| repository root | `python -m unittest discover -s tools` · `python tools/docs.py --check` |
| `typescript/` | `npm run lint` · `npm run format:check` · `npm run typecheck` · `npm run test:solution` |
| `python/` | `uv run ruff check .` · `uv run ruff format --check .` · `uv run pytest --solution` |
| `java/` | `./gradlew check -Psolution` |
| `go/` | `gofmt -l .` (no output) · `go vet ./...` · `go vet -tags solution ./...` · `go test -tags solution ./...` |
