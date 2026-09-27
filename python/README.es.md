# Python

[Read in English](README.md)

## Requisitos

- Python 3.12 o superior.
- [uv](https://docs.astral.sh/uv/) (recomendado) o pip.

## Instalación

Desde esta carpeta, con uv:

```bash
uv sync
```

O con pip:

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install pytest ruff
```

Las herramientas se instalan en `python/.venv`. No se instala nada en ningún otro lugar.

## Estructura

Cada estructura es un paquete dentro de `ds/`:

```
ds/stack/
├── starter.py      ← aquí va tu implementación
├── solution.py     ← solución de referencia
└── test_stack.py   ← tests (importan el starter)
```

## Flujo de trabajo

```bash
uv run pytest ds/stack                 # tests de stack contra tu starter
uv run pytest --solution               # todos los tests contra las soluciones de referencia
uv run pytest --solution ds/stack      # solo los tests de stack contra la solución
```

Sin uv, activa el entorno virtual y quita el prefijo `uv run`.

Todos los tests fallan con `NotImplementedError: TODO: not implemented` hasta que implementes el starter.

## Convenciones

- Una estructura vacía lanza `IndexError`, y una clave que no existe lanza `KeyError`.
- Las estructuras soportan `len()`, iteración y, cuando tiene sentido, `in`.
- Los genéricos usan la sintaxis de Python 3.12: `class Stack[T]:`.

## Controles de calidad

```bash
uv run ruff check .
uv run ruff format .
```
