# TypeScript

[Read in English](README.md)

## Requisitos

- Node.js 22.13 o superior (incluye npm).

## Instalación

Desde esta carpeta:

```bash
npm install
```

Instala TypeScript, Vitest, ESLint y Prettier en `typescript/node_modules`. No se instala nada en ningún otro lugar.

## Estructura

Cada estructura tiene su propia carpeta en `src/`:

```
src/stack/
├── starter.ts      ← aquí va tu implementación
├── solution.ts     ← solución de referencia
└── stack.test.ts   ← tests (importan el starter)
```

## Flujo de trabajo

```bash
npm test -- stack                  # tests de stack contra tu starter, en modo watch
npm run test:solution              # todos los tests contra las soluciones de referencia
npm run test:solution -- stack     # solo los tests de stack contra la solución
```

Todos los tests fallan con `Error: TODO: not implemented` hasta que implementes el starter. El modo watch vuelve a correr los tests cada vez que guardas un archivo.

## Convenciones

- La ausencia, como hacer `pop` en una pila vacía, devuelve `undefined`.
- Un índice inválido lanza un `RangeError`.
- Las estructuras son genéricas (`Stack<T>`) e iterables con `for...of`.

## Controles de calidad

```bash
npm run typecheck      # tsc --noEmit
npm run lint           # ESLint
npm run format         # Prettier; format:check solo comprueba
```
