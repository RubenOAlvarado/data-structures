plugins {
    java
    id("com.diffplug.spotless") version "8.10.3"
}

repositories {
    mavenCentral()
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

// Learners implement `src/starter`; `src/solution` holds the reference answers.
// Both declare the same classes, and the tests compile against the starter
// unless the build runs with `-Psolution`.
val starter: SourceSet = sourceSets.create("starter")
val solution: SourceSet = sourceSets.create("solution")
val implementation = if (providers.gradleProperty("solution").isPresent) solution else starter

sourceSets {
    test {
        compileClasspath += implementation.output
        runtimeClasspath += implementation.output
    }
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:6.1.3"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<JavaCompile>().configureEach {
    options.compilerArgs.addAll(listOf("-Xlint:all", "-Werror"))
}

tasks.test {
    useJUnitPlatform()
    testLogging {
        events("passed", "failed")
        exceptionFormat = org.gradle.api.tasks.testing.logging.TestExceptionFormat.FULL
    }
}

// `check` always compiles both implementations, whichever one the tests use.
tasks.check {
    dependsOn(starter.classesTaskName, solution.classesTaskName)
}

spotless {
    java {
        target("src/**/*.java")
        googleJavaFormat("1.36.1")
    }
}
