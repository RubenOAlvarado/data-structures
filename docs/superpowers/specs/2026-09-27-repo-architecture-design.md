# Arquitectura del repositorio `data-structures`

- **Fecha:** 2026-09-27
- **Estado:** diseño aprobado en brainstorming; pendiente de revisión de la spec escrita
- **Alcance de implementación inmediata:** Fase 0 (fundación + piloto `stack`)

## 1. Contexto y objetivo

Repositorio público que se reinicia desde cero. Su propósito es que cualquier persona que prepara
entrevistas técnicas o repasa conceptos:

1. **entienda** cada estructura de datos (modelo mental, operaciones, complejidad),
2. conozca sus **usos** y cuándo elegirla,
3. la **construya** en su lenguaje preferido, guiada por tests,
4. y después practique con **ejercicios sugeridos** relacionados.

El repositorio es **exclusivamente de estructuras de datos**. Los algoritmos y la resolución de
ejercicios viven en un repositorio aparte, que se alimentará de los ejercicios listados aquí.

### Fuera de alcance

- Algoritmos: ordenamientos, búsquedas, recorridos de grafos (BFS/DFS), caminos mínimos,
  técnicas (sliding window, two pointers, monotonic stack, bit manipulation).
- Soluciones a ejercicios (van al repo de algoritmos).
- Estructuras descartadas: Balanced BST (AVL/Red-Black), Segment Tree, Fenwick Tree, Skip List,
  Bloom Filter.
- Tests de rendimiento: la complejidad se documenta, no se verifica automáticamente.

## 2. Decisiones clave

| Tema | Decisión |
|---|---|
| Lenguajes | TypeScript, Python, Java, Go |
| Proyectos | **Uno por lenguaje**, nunca uno por estructura. Quien usa un lenguaje no instala ni ve el tooling de los demás |
| Modelo didáctico | Taller: por estructura × lenguaje existe un **starter** (lo implementa quien estudia) y una **solución**, en la misma rama; los mismos tests validan ambos |
| Layout | **Lenguaje primero**: una carpeta-proyecto por lenguaje + `structures/` para teoría y ejercicios |
| Ejercicios | `exercises.toml` por estructura como fuente de verdad; tablas generadas en los README |
| Idioma | Documentación en prosa bilingüe (`README.md` EN + `README.es.md` ES). Código, comentarios de starters y nombres de tests solo en inglés |
| Licencia | MIT |

## 3. Estructura y convenciones

### 3.1 Árbol del repositorio

```
data-structures/
├── README.md · README.es.md            # portada, ciclo de aprendizaje, catálogo generado
├── CONTRIBUTING.md · CONTRIBUTING.es.md
├── LICENSE                             # MIT
├── docs/superpowers/specs/             # specs de diseño (mantenimiento)
├── structures/
│   ├── catalog.toml                    # orden + nombres EN/ES de las 15 estructuras
│   └── <slug>/
│       ├── README.md · README.es.md    # teoría
│       └── exercises.toml
├── typescript/                         # proyecto npm único
│   ├── package.json · tsconfig.json · vitest.config.ts · eslint.config.js · .prettierrc
│   ├── README.md · README.es.md
│   └── src/<slug>/{starter.ts, solution.ts, <slug>.test.ts}
├── python/                             # proyecto Python único
│   ├── pyproject.toml · conftest.py
│   ├── README.md · README.es.md
│   └── ds/
│       ├── __init__.py
│       └── <slug_snake>/{__init__.py, starter.py, solution.py, test_<slug_snake>.py}
├── java/                               # build Gradle único (Kotlin DSL + wrapper)
│   ├── settings.gradle.kts · build.gradle.kts · gradlew · gradlew.bat · gradle/wrapper/
│   ├── README.md · README.es.md
│   └── src/{starter,solution,test}/java/ds/<pkg>/
├── go/                                 # módulo Go único
│   ├── go.mod
│   ├── README.md · README.es.md
│   └── <pkg>/{starter.go, solution.go, <pkg>_test.go}
├── tools/docs.py                       # generador/validador de docs (Python stdlib)
└── .github/workflows/{typescript,python,java,go,docs}.yml
```

### 3.2 Nombres

Cada estructura tiene un **slug canónico** en kebab-case y singular, que cada lenguaje adapta a su
convención:

| Slug | TypeScript | Python | Java (paquete) | Go (paquete) |
|---|---|---|---|---|
| `linked-list` | `src/linked-list/` | `ds/linked_list/` | `ds.linkedlist` | `linkedlist/` |
| `stack` | `src/stack/` | `ds/stack/` | `ds.stack` | `stack/` |

Archivos de test: TS `<slug>.test.ts`, Python `test_<slug_snake>.py`, Java `<Clase>Test.java`,
Go `<pkg>_test.go`.

Módulo Go: `github.com/RubenOAlvarado/data-structures/go`.

### 3.3 Catálogo

El orden es la ruta de aprendizaje recomendada.

| # | Slug | Qué se implementa |
|---|---|---|
| 1 | `array` | `DynamicArray` (crece sobre un arreglo de tamaño fijo) |
| 2 | `string` | `StringBuilder` (buffer mutable; enseña inmutabilidad y coste de concatenar) |
| 3 | `linked-list` | `SinglyLinkedList`, `DoublyLinkedList` |
| 4 | `stack` | `Stack` |
| 5 | `queue` | `Queue`, `CircularQueue` (ring buffer) |
| 6 | `deque` | `Deque` |
| 7 | `hash-table` | `HashMap` (separate chaining + rehash por load factor), `HashSet` |
| 8 | `binary-tree` | `BinaryTree` |
| 9 | `binary-search-tree` | `BinarySearchTree` |
| 10 | `heap` | `PriorityQueue` (binary heap con comparador) |
| 11 | `trie` | `Trie` |
| 12 | `graph` | `Graph` (lista de adyacencia; dirigido o no; ponderado) |
| 13 | `union-find` | `UnionFind` (path compression + union by rank) |
| 14 | `lru-cache` | `LRUCache` |
| 15 | `lfu-cache` | `LFUCache` |

La API detallada de cada estructura se decide en su propio ciclo (ver §7), salvo `stack`, que se
fija en §8 por ser el piloto.

### 3.4 Reglas de contenido

- **Qué entra:** las operaciones que forman parte de la interfaz de la estructura (su ADT).
  **Qué no entra:** los problemas que se resuelven *usando* la estructura.
  - `Graph` expone `addVertex`, `addEdge`, `removeEdge`, `neighbors`… pero no BFS, DFS ni Dijkstra.
  - `BinaryTree` y `BinarySearchTree` exponen sus recorridos (pre-order, in-order, post-order,
    level-order) **como iteradores**, porque es la forma de leer la estructura.
- **Primitivas permitidas:** arreglos de tamaño fijo, variables, referencias/punteros. Está
  prohibido usar la versión nativa de lo que se construye (p. ej. `DynamicArray` no puede usar
  `push`/`append` de la lista nativa; `Stack` no puede apoyarse en el arreglo dinámico nativo).
- **Diseños compuestos** (`lru-cache`, `lfu-cache`): se permite el map nativo; la lista doblemente
  enlazada se escribe a mano.
- **Genéricos** en los 4 lenguajes.
- **Errores idiomáticos** por lenguaje, para aprender el estilo que se usará en la entrevista:

| Lenguaje | Ausencia / colección vacía | Índice inválido | Protocolos |
|---|---|---|---|
| TypeScript | devuelve `undefined` | lanza `RangeError` | `Iterable<T>` (`[Symbol.iterator]`) |
| Python | lanza `IndexError` (vacío) / `KeyError` (clave) | lanza `IndexError` | `__len__`, `__iter__`, `__contains__` |
| Java | lanza `NoSuchElementException` | lanza `IndexOutOfBoundsException` | `Iterable<T>` |
| Go | devuelve `(T, bool)` | `panic` (como los slices) | `iter.Seq[T]` |

## 4. Starter, solución y tests

### 4.1 Contrato común

- Quien estudia **solo edita el starter**.
- El starter declara la **API pública completa**: firmas y doc comments con el contrato de cada
  operación y su complejidad objetivo. Los cuerpos lanzan `"TODO: not implemented"`, de modo que el
  starter **siempre compila** y quien estudia ve tests en rojo con un mensaje claro, no errores de
  compilación.
- La representación interna queda a criterio de quien estudia, salvo cuando la estructura la impone
  (en ese caso se indica en el doc comment del starter).
- Los tests se escriben **siempre contra el starter**. Un flag nativo de cada lenguaje los redirige a
  la solución. No se usan variables de entorno, para que los comandos funcionen igual en Windows.
- **Los tests son la especificación**: cubren los mismos casos en los 4 lenguajes (los del
  "API contract" del README de la estructura), ordenados de lo básico a los casos límite.
- La paridad de API entre starter y solución se garantiza porque los mismos tests corren contra ambos.

### 4.2 Mecanismo por lenguaje

| | Cambio a la solución | Comandos de quien estudia | Dependencias |
|---|---|---|---|
| **TypeScript** | `vitest.config.ts` exporta una función de config; con `--mode solution` registra un plugin de Vite cuyo `resolveId` reescribe los imports `./starter` a `./solution` del mismo directorio | `npm test -- stack` (watch) · `npm run test:solution` | `typescript`, `vitest` (dev) |
| **Python** | `conftest.py` en la raíz de `python/` añade la opción `--solution`; en `pytest_configure` importa cada `ds.<x>.solution` y lo registra en `sys.modules` como `ds.<x>.starter`. Los tests importan `from ds.stack.starter import Stack` | `pytest ds/stack` · `pytest --solution` | `pytest` (grupo dev; `uv run` o `pip`). `pythonpath = ["."]`, sin instalar el paquete |
| **Java** | Gradle define source sets `starter` y `solution` con el mismo paquete; el source set `test` compila contra `starter`, o contra `solution` si se pasa `-Psolution`. `check` compila ambos | `./gradlew test --tests 'ds.stack.*'` · `./gradlew test -Psolution` | JUnit 5 (Gradle wrapper) |
| **Go** | Mismo paquete; `starter.go` con `//go:build !solution` y `solution.go` con `//go:build solution` | `go test ./stack` · `go test -tags solution ./...` | ninguna (stdlib) |

Todos los comandos se ejecutan desde la carpeta del lenguaje (`typescript/`, `python/`, `java/`, `go/`).

TypeScript usa ESM (`"type": "module"`), `moduleResolution: "bundler"` e imports sin extensión.

### 4.3 Versiones mínimas

Node 22 · Python 3.12 (sintaxis de genéricos `class Stack[T]`) · Java 21 (toolchain de Gradle) ·
Go 1.24 (`maphash.Comparable`, necesario para `HashMap` genérico).

### 4.4 Linters y formato

| Lenguaje | Formato | Lint | Comandos |
|---|---|---|---|
| TypeScript | Prettier | ESLint flat config + `typescript-eslint` (strict) | `npm run lint` · `npm run format` · `npm run typecheck` |
| Python | Ruff format | Ruff check | `ruff check` · `ruff format` |
| Java | Spotless (google-java-format) | `javac -Xlint:all -Werror` | `./gradlew spotlessApply` (`spotlessCheck` dentro de `check`) |
| Go | gofmt | `go vet` + staticcheck (solo en CI, no en `go.mod`) | `gofmt -w .` · `go vet ./...` |

Las reglas de "unused" (parámetros sin usar) se relajan **únicamente** en los archivos `starter.*`,
para que los starters también pasen el lint.

## 5. Documentación y ejercicios

### 5.1 README de cada estructura

`structures/<slug>/README.md` y su espejo `README.es.md` siguen la misma plantilla:

1. Título, definición en una línea y enlace al otro idioma.
2. **Mental model**: intuición y diagrama en Mermaid.
3. **Operations & complexity**: tabla de tiempo y espacio (promedio y peor caso).
4. **Variants**.
5. **When to use it**: usos reales y señales en entrevistas.
6. **Trade-offs** frente a las alternativas.
7. **API contract**: cada operación con su semántica y sus casos límite. Es lo que verifican los tests.
8. **Build it**: tabla por lenguaje con enlaces a starter, solución y tests, y el comando para correrlos.
9. **Exercises**: tabla generada entre `<!-- exercises:start -->` y `<!-- exercises:end -->`.

### 5.2 `exercises.toml`

```toml
[[exercise]]
id = "valid-parentheses"       # kebab-case, único en todo el repo; clave estable para el repo de algoritmos
title = "Valid Parentheses"
difficulty = "easy"            # easy | medium | hard
url = "https://leetcode.com/problems/valid-parentheses/"
focus = { en = "Match open/close pairs in LIFO order", es = "Emparejar aperturas y cierres en orden LIFO" }
solution = ""                  # opcional: enlace a la solución en el repo de algoritmos
```

- Solo se guarda título, enlace y un `focus` redactado por nosotros. **Nunca se copian enunciados.**
- Guía: 3 a 8 ejercicios por estructura, ordenados por dificultad.
- Tabla generada, columnas: `#`, ejercicio (enlazado), dificultad, qué practica (`focus` en el idioma
  del README), solución (enlace si `solution` no está vacío; si no, `—`).

### 5.3 `structures/catalog.toml` y catálogo generado

```toml
[[structure]]
slug = "stack"
name = { en = "Stack", es = "Pila" }
```

- Una entrada por estructura, en el orden de §3.3.
- La tabla del README raíz (entre `<!-- catalog:start -->` y `<!-- catalog:end -->`) tiene las
  columnas `#`, estructura (enlazada a su README), TS, Python, Java, Go.
- El estado por lenguaje se **detecta**: ✅ si existe el archivo de solución, 🚧 si no.
  - TS: `typescript/src/<slug>/solution.ts`
  - Python: `python/ds/<slug_snake>/solution.py`
  - Java: al menos un `.java` en `java/src/solution/java/ds/<pkg>/`
  - Go: `go/<pkg>/solution.go`
- Si una estructura aún no tiene carpeta en `structures/`, su nombre aparece sin enlace.

### 5.4 `tools/docs.py`

Python ≥ 3.11, solo stdlib (`tomllib`), sin dependencias.

- `python tools/docs.py`: regenera las tablas de ejercicios y de catálogo.
- `python tools/docs.py --check`: no escribe nada; termina con código ≠ 0 si:
  - algún `exercises.toml` o `catalog.toml` no cumple el esquema (campos obligatorios, `difficulty`
    fuera de `easy|medium|hard`, `focus` sin `en` o `es`);
  - hay `id` de ejercicio o slugs repetidos;
  - algún `README.md` no tiene su `README.es.md` (o al revés);
  - alguna carpeta de `structures/` no está en el catálogo;
  - alguna tabla generada no coincide con lo que se generaría.

### 5.5 Resto de la documentación

- **README raíz (EN/ES):** qué es el repo, a quién va dirigido, ciclo de aprendizaje
  (teoría → starter → tests → comparar con la solución → ejercicios), enlaces al setup de cada
  lenguaje y catálogo generado.
- **README de cada lenguaje (EN/ES):** requisitos, instalación, comandos (tests en modo starter y
  solución, lint, formato), convenciones de errores y genéricos, consejos de editor (incluye cómo
  configurar gopls con `-tags=solution` para navegar las soluciones en Go).
- **CONTRIBUTING (EN/ES):** checklist para añadir una estructura (teoría EN/ES, `exercises.toml`,
  entrada en el catálogo, starter + solución + tests en los 4 lenguajes, `tools/docs.py`) y para
  añadir un lenguaje; reglas de contenido de §3.4.

## 6. CI

GitHub Actions, runners Ubuntu. Cada workflow de lenguaje se dispara en push a `main` y en PRs
cuando cambia su carpeta o el propio workflow; `docs.yml` corre en todo push/PR.

| Workflow | Pasos |
|---|---|
| `typescript.yml` | `npm ci` → `npm run lint` → `prettier --check .` → `tsc --noEmit` → `vitest run --mode solution` |
| `python.yml` | `ruff check` → `ruff format --check` → `pytest --collect-only` (los starters importan) → `pytest --solution` |
| `java.yml` | `./gradlew check -Psolution` |
| `go.yml` | `gofmt -l .` vacío → `go vet ./...` y `go vet -tags solution ./...` → staticcheck con y sin tag → `go test -tags solution ./...` |
| `docs.yml` | `python tools/docs.py --check` |

Garantías: todas las soluciones pasan los tests; todos los starters compilan y pasan el lint; la
documentación generada está al día.

El repo es público, así que los runners estándar no consumen minutos. Si Actions no está disponible
(p. ej. por un bloqueo de facturación), la verificación se hace en local con los mismos comandos.

## 7. Hoja de ruta

- **Fase 0 — Fundación + piloto `stack`** (siguiente plan de implementación):
  1. Commit que confirma el borrado del código anterior (ya eliminado en el working tree).
  2. `.gitignore` reescrito para los 4 lenguajes. El actual ignora `*.mod` y `*.sum`, lo que
     excluiría `go.mod`/`go.sum`; además le faltan Python (`__pycache__/`, `.venv/`,
     `.pytest_cache/`, `.ruff_cache/`) y Gradle (`.gradle/`, `build/`).
  3. README raíz, LICENSE y CONTRIBUTING (EN/ES).
  4. Los 4 proyectos con el mecanismo starter/solución y los linters.
  5. `structures/catalog.toml` (15 entradas) y `tools/docs.py`.
  6. Los 5 workflows.
  7. Piloto `stack` completo: teoría EN/ES, `exercises.toml`, starter + solución + tests × 4.
- **Fases 1–14 — Contenido:** una estructura por ciclo en el orden del catálogo
  (`array` → `lfu-cache`, saltando `stack`). Cada ciclo es acotado: decidir API y casos límite,
  y luego implementarla siguiendo la plantilla y el CONTRIBUTING.

## 8. Piloto `stack`

La solución usa **nodos enlazados** (no el arreglo dinámico nativo). Iterar recorre de la cima a la
base, sin consumir la pila.

| Lenguaje | API |
|---|---|
| TypeScript | `class Stack<T> implements Iterable<T>`: `push(value: T): void`, `pop(): T \| undefined`, `peek(): T \| undefined`, `get size(): number`, `isEmpty(): boolean`, `[Symbol.iterator]()` |
| Python | `class Stack[T]`: `push(value: T) -> None`, `pop() -> T` (`IndexError` si está vacía), `peek() -> T` (`IndexError` si está vacía), `is_empty() -> bool`, `__len__`, `__iter__` |
| Java | `public final class Stack<T> implements Iterable<T>`: `void push(T value)`, `T pop()` y `T peek()` (`NoSuchElementException` si está vacía), `int size()`, `boolean isEmpty()`, `Iterator<T> iterator()` |
| Go | `type Stack[T any] struct`, `func New[T any]() *Stack[T]`, `Push(v T)`, `Pop() (T, bool)`, `Peek() (T, bool)`, `Len() int`, `IsEmpty() bool`, `All() iter.Seq[T]` |

Casos del API contract (idénticos en los 4 lenguajes):

1. Una pila nueva está vacía (tamaño 0, `isEmpty` verdadero).
2. `push` incrementa el tamaño y la pila deja de estar vacía.
3. `peek` devuelve el último elemento insertado sin quitarlo.
4. `pop` devuelve los elementos en orden LIFO y decrementa el tamaño.
5. `pop` y `peek` sobre una pila vacía señalan ausencia según la convención del lenguaje (§3.4).
6. Tras vaciar la pila con `pop`, vuelve a estar vacía y se puede reutilizar.
7. `push`/`pop` intercalados mantienen el orden LIFO.
8. La iteración recorre de la cima a la base y no modifica la pila.
9. Funciona con tipos no numéricos (p. ej. cadenas).

## 9. Criterios de aceptación de la Fase 0

- En cada lenguaje, en modo starter, los tests de `stack` compilan/cargan y **fallan** con
  `TODO: not implemented`.
- En cada lenguaje, en modo solución, todos los tests de `stack` **pasan**
  (`npm run test:solution`, `uv run pytest --solution`, `./gradlew check -Psolution`,
  `go test -tags solution ./...`).
- Linters y type-check limpios en los 4 proyectos (starter y solución).
- `python tools/docs.py --check` pasa; si se modifica un `exercises.toml` sin regenerar, falla.
- El catálogo del README raíz muestra `stack` con ✅ en los 4 lenguajes y el resto con 🚧.
- Ningún lenguaje requiere tooling de otro (p. ej. no hay `node_modules` fuera de `typescript/`).
