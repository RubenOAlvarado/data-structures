# Contribuir

[Read in English](CONTRIBUTING.md)

¡Gracias por ayudar! Esta guía explica las reglas del repositorio y los pasos para añadir una estructura o un lenguaje.

## Reglas de contenido

- **Solo estructuras de datos.** Una estructura expone las operaciones de su interfaz (su tipo abstracto de datos). Los problemas que se resuelven *con* una estructura, como ordenar, las búsquedas en grafos (BFS, DFS), los caminos mínimos, sliding window o two pointers, van al repositorio de algoritmos.
- Los recorridos de árbol (pre-order, in-order, post-order y por niveles) forman parte de la interfaz de un árbol y se exponen como iteradores.
- **Piezas permitidas:** arreglos de tamaño fijo, variables y referencias o punteros. No uses la versión nativa de lo que estás construyendo. Los diseños compuestos (las cachés LRU y LFU) pueden usar el map nativo, pero su lista doblemente enlazada se escribe a mano.
- Estructuras **genéricas** en todos los lenguajes.
- **Errores idiomáticos** en cada lenguaje:

| Lenguaje | Ausencia / estructura vacía | Índice inválido | Protocolos |
|---|---|---|---|
| TypeScript | devuelve `undefined` | lanza `RangeError` | `Iterable<T>` |
| Python | lanza `IndexError` / `KeyError` | lanza `IndexError` | `__len__`, `__iter__`, `__contains__` |
| Java | lanza `NoSuchElementException` | lanza `IndexOutOfBoundsException` | `Iterable<T>` |
| Go | devuelve `(T, bool)` | panic | `iter.Seq[T]` |

- El código, los comentarios y los nombres de los tests se escriben en inglés. La documentación en prosa se escribe en inglés (`README.md`) y en español (`README.es.md`).
- **Nunca copies el enunciado de un ejercicio.** `exercises.toml` solo guarda el título, el enlace y un `focus` que redactamos nosotros.

## Añadir una estructura

Usa `structures/stack` y la carpeta `stack` de cada lenguaje como modelo.

1. **Teoría:** crea `structures/<slug>/README.md` y `README.es.md` con estas secciones: definición, modelo mental (con un diagrama Mermaid), operaciones y complejidad (una tabla con tiempo promedio, tiempo en el peor caso y espacio extra), variantes, cuándo usarla, trade-offs, contrato de la API, constrúyela y ejercicios. Conserva los marcadores `<!-- exercises:start -->` y `<!-- exercises:end -->`.
2. **Ejercicios:** crea `structures/<slug>/exercises.toml` con 3 a 8 ejercicios ordenados por dificultad.
3. **Código, en todos los lenguajes:**
   - el **starter**: la API pública completa con doc comments (el contrato y la complejidad objetivo), donde cada cuerpo lanza `TODO: not implemented`;
   - la **solución**, con la misma API pública;
   - los **tests**, escritos contra el starter. Cubren todas las reglas del contrato de la API, de los casos básicos a los casos límite, y son los mismos casos en todos los lenguajes.

   | Lenguaje | Ubicación |
   |---|---|
   | TypeScript | `typescript/src/<slug>/`: `starter.ts`, `solution.ts`, `<slug>.test.ts` |
   | Python | `python/ds/<slug_con_guiones_bajos>/`: `__init__.py` vacío, `starter.py`, `solution.py`, `test_<slug_con_guiones_bajos>.py` |
   | Java | `java/src/{starter,solution,test}/java/ds/<slugsinguiones>/` |
   | Go | `go/<slugsinguiones>/`: `doc.go`, `starter.go` (`//go:build !solution`), `solution.go` (`//go:build solution`), `<slugsinguiones>_test.go`. Envuelve cada caso con `testutil.Run` para que un panic solo haga fallar su propio caso |

4. **Tablas generadas:** desde la raíz del repositorio, ejecuta `python tools/docs.py`. El catálogo marca la estructura con ✅ en cada lenguaje que tenga solución.
5. **Controles:** corre los controles de calidad de abajo.

## Añadir un lenguaje

1. Crea una carpeta con un único proyecto autocontenido y su `README.md` y `README.es.md`.
2. Cambia entre starter y solución con un flag nativo del lenguaje, no con variables de entorno, para que los mismos tests corran contra ambos.
3. En `tools/docs.py`, añade el lenguaje a `LANGUAGE_COLUMNS` y la ruta de sus soluciones a `solution_status`. Después añade un workflow en `.github/workflows/`.

## Controles de calidad

El CI corre estos comandos. Córrelos en local antes de abrir un pull request, cada uno desde su carpeta:

| Carpeta | Comandos |
|---|---|
| raíz del repositorio | `python -m unittest discover -s tools` · `python tools/docs.py --check` |
| `typescript/` | `npm run lint` · `npm run format:check` · `npm run typecheck` · `npm run test:solution` |
| `python/` | `uv run ruff check .` · `uv run ruff format --check .` · `uv run pytest --solution` |
| `java/` | `./gradlew check -Psolution` |
| `go/` | `gofmt -l .` (sin salida) · `go vet ./...` · `go vet -tags solution ./...` · `go test -tags solution ./...` |
