# Python

[Leer en español](README.es.md)

## Requirements

- Python 3.12 or newer.
- [uv](https://docs.astral.sh/uv/) (recommended) or pip.

## Setup

From this folder, with uv:

```bash
uv sync
```

Or with pip:

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install pytest ruff
```

The tools are installed in `python/.venv`. Nothing is installed anywhere else.

## Layout

Each structure is a package inside `ds/`:

```
ds/stack/
├── starter.py      ← your implementation goes here
├── solution.py     ← reference solution
└── test_stack.py   ← tests (they import the starter)
```

## Workflow

```bash
uv run pytest ds/stack                 # stack tests against your starter
uv run pytest --solution               # every test against the reference solutions
uv run pytest --solution ds/stack      # only the stack tests against the solution
```

Without uv, activate the virtual environment and drop the `uv run` prefix.

Every test fails with `NotImplementedError: TODO: not implemented` until you implement the starter.

## Conventions

- An empty structure raises `IndexError`, and a missing key raises `KeyError`.
- Structures support `len()`, iteration and, when it makes sense, `in`.
- Generics use the Python 3.12 syntax: `class Stack[T]:`.

## Quality checks

```bash
uv run ruff check .
uv run ruff format .
```
