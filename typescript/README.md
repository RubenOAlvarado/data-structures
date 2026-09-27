# TypeScript

[Leer en español](README.es.md)

## Requirements

- Node.js 22.13 or newer (it includes npm).

## Setup

From this folder:

```bash
npm install
```

It installs TypeScript, Vitest, ESLint and Prettier in `typescript/node_modules`. Nothing is installed anywhere else.

## Layout

Each structure has its own folder in `src/`:

```
src/stack/
├── starter.ts      ← your implementation goes here
├── solution.ts     ← reference solution
└── stack.test.ts   ← tests (they import the starter)
```

## Workflow

```bash
npm test -- stack                  # stack tests against your starter, in watch mode
npm run test:solution              # every test against the reference solutions
npm run test:solution -- stack     # only the stack tests against the solution
```

Every test fails with `Error: TODO: not implemented` until you implement the starter. Watch mode runs the tests again each time you save a file.

## Conventions

- Absence, like `pop` on an empty stack, returns `undefined`.
- An invalid index throws a `RangeError`.
- Structures are generic (`Stack<T>`) and iterable with `for...of`.

## Quality checks

```bash
npm run typecheck      # tsc --noEmit
npm run lint           # ESLint
npm run format         # Prettier; format:check only checks
```
