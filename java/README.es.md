# Java

[Read in English](README.md)

## Requisitos

- Un JDK, versión 17 o superior, para ejecutar Gradle. El código usa Java 21: si no tienes el JDK 21, Gradle lo descarga la primera vez que se ejecuta.
- Nada más. El wrapper de Gradle (`gradlew`) descarga Gradle por su cuenta.

## Instalación

No hay un paso de instalación aparte. La primera vez que ejecutas `./gradlew`, descarga Gradle, JUnit y, si hace falta, el JDK 21 en tu carpeta de usuario (`~/.gradle`).

En Windows, escribe `.\gradlew` en lugar de `./gradlew` en PowerShell, o solo `gradlew` en cmd.

## Estructura

```
src/
├── starter/java/ds/stack/Stack.java     ← aquí va tu implementación
├── solution/java/ds/stack/Stack.java    ← solución de referencia
└── test/java/ds/stack/StackTest.java    ← tests
```

El starter y la solución declaran la misma clase, `ds.stack.Stack`. Los tests compilan contra el starter salvo que pases `-Psolution`.

## Flujo de trabajo

```bash
./gradlew test --tests "ds.stack.*"                # tests de stack contra tu starter
./gradlew test -Psolution                          # todos los tests contra las soluciones de referencia
./gradlew test -Psolution --tests "ds.stack.*"     # solo los tests de stack contra la solución
```

Todos los tests fallan con `UnsupportedOperationException: TODO: not implemented` hasta que implementes el starter.

## Convenciones

- Una estructura vacía lanza `NoSuchElementException`, y un índice inválido lanza `IndexOutOfBoundsException`.
- Las estructuras son genéricas (`Stack<T>`) e implementan `Iterable<T>`.

## Controles de calidad

```bash
./gradlew spotlessApply         # formatea el código con google-java-format
./gradlew check -Psolution      # compila las dos implementaciones, revisa el formato y corre los tests
```

El compilador se ejecuta con `-Xlint:all -Werror`, así que cualquier warning hace fallar el build.

## Editor

Abre la carpeta `java/`, no la raíz del repositorio. IntelliJ IDEA y VS Code (con las extensiones de Java) importan el proyecto desde `build.gradle.kts`.
