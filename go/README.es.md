# Go

[Read in English](README.md)

## Requisitos

- Go 1.24 o superior.

## Instalación

No hay paso de instalación: el módulo no tiene dependencias.

## Estructura

Cada estructura es un paquete:

```
stack/
├── doc.go          ← documentación del paquete
├── starter.go      ← aquí va tu implementación (build tag !solution)
├── solution.go     ← solución de referencia (build tag solution)
└── stack_test.go   ← tests
```

El starter y la solución son dos versiones del mismo paquete. Los build tags eligen cuál se compila: el starter por defecto y la solución con `-tags solution`.

## Flujo de trabajo

```bash
go test ./stack                          # tests de stack contra tu starter
go test -tags solution ./...             # todos los tests contra las soluciones de referencia
go test -tags solution ./stack           # solo los tests de stack contra la solución
go test ./stack -run "TestStack/pops"    # un solo caso
```

Todos los casos fallan con `panic: TODO: not implemented` hasta que implementes el starter. Un panic solo hace fallar su propio caso, así que siempre ves la lista completa.

## Convenciones

- La ausencia devuelve el valor cero y `false`: `v, ok := s.Pop()`.
- Un índice inválido provoca un panic, igual que indexar un slice.
- La iteración usa iteradores de Go: `for v := range s.All()`. Tu iterador debe detenerse en cuanto `yield` devuelve `false`, que es lo que pasa cuando el bucle hace `break`.
- Los constructores se llaman `New`: `stack.New[int]()`.

## Controles de calidad

```bash
gofmt -w .
go vet ./...
go vet -tags solution ./...
go run honnef.co/go/tools/cmd/staticcheck@2026.2.1 ./...
```

`staticcheck` necesita Go 1.26 o superior; con un Go más antiguo, `go run` descarga automáticamente un toolchain más nuevo.

## Editor

gopls analiza el starter por defecto y muestra `solution.go` como excluido por build tags. Para navegar las soluciones con todo el soporte del editor, añade `-tags=solution` a los build flags de gopls. En VS Code: `"gopls": { "buildFlags": ["-tags=solution"] }`.
