# Java

[Leer en español](README.es.md)

## Requirements

- A JDK, version 17 or newer, to run Gradle. The code targets Java 21: if JDK 21 is not installed, Gradle downloads it the first time it runs.
- Nothing else. The Gradle wrapper (`gradlew`) downloads Gradle itself.

## Setup

There is no separate install step. The first time you run `./gradlew`, it downloads Gradle, JUnit and, if needed, JDK 21 into your user folder (`~/.gradle`).

On Windows, write `.\gradlew` instead of `./gradlew` in PowerShell, or just `gradlew` in cmd.

## Layout

```
src/
├── starter/java/ds/stack/Stack.java     ← your implementation goes here
├── solution/java/ds/stack/Stack.java    ← reference solution
└── test/java/ds/stack/StackTest.java    ← tests
```

The starter and the solution declare the same class, `ds.stack.Stack`. The tests compile against the starter unless you pass `-Psolution`.

## Workflow

```bash
./gradlew test --tests "ds.stack.*"                # stack tests against your starter
./gradlew test -Psolution                          # every test against the reference solutions
./gradlew test -Psolution --tests "ds.stack.*"     # only the stack tests against the solution
```

Every test fails with `UnsupportedOperationException: TODO: not implemented` until you implement the starter.

## Conventions

- An empty structure throws `NoSuchElementException`, and an invalid index throws `IndexOutOfBoundsException`.
- Structures are generic (`Stack<T>`) and implement `Iterable<T>`.

## Quality checks

```bash
./gradlew spotlessApply         # format the code with google-java-format
./gradlew check -Psolution      # compile both implementations, check the format and run the tests
```

The compiler runs with `-Xlint:all -Werror`, so any warning fails the build.

## Editor

Open the `java/` folder, not the root of the repository. IntelliJ IDEA and VS Code (with the Java extensions) import the project from `build.gradle.kts`.
