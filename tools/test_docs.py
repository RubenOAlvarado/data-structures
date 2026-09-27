"""Tests for tools/docs.py. Run with: python -m unittest discover -s tools -v"""

import contextlib
import io
import tempfile
import unittest
from pathlib import Path

import docs

CATALOG = """\
[[structure]]
slug = "stack"
name = { en = "Stack", es = "Pila" }

[[structure]]
slug = "linked-list"
name = { en = "Linked List", es = "Lista enlazada" }
"""

EXERCISES = """\
[[exercise]]
id = "valid-parentheses"
title = "Valid Parentheses"
difficulty = "easy"
url = "https://leetcode.com/problems/valid-parentheses/"
focus = { en = "Match pairs in LIFO order", es = "Emparejar pares en orden LIFO" }

[[exercise]]
id = "min-stack"
title = "Min Stack"
difficulty = "medium"
url = "https://leetcode.com/problems/min-stack/"
focus = { en = "Track the minimum", es = "Seguir el mínimo" }
solution = "https://github.com/RubenOAlvarado/algorithms/tree/main/min-stack"
"""

ROOT_README = "# Data Structures\n\n<!-- catalog:start -->\n<!-- catalog:end -->\n"
STACK_README = "# Stack\n\n<!-- exercises:start -->\n<!-- exercises:end -->\n"


def write(path: Path, content: str = "") -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


class DocsTest(unittest.TestCase):
    def setUp(self) -> None:
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        write(self.root / "structures" / "catalog.toml", CATALOG)
        write(self.root / "README.md", ROOT_README)
        write(self.root / "README.es.md", ROOT_README)
        write(self.root / "structures" / "stack" / "exercises.toml", EXERCISES)
        write(self.root / "structures" / "stack" / "README.md", STACK_README)
        write(self.root / "structures" / "stack" / "README.es.md", STACK_README)
        write(self.root / "typescript" / "src" / "stack" / "solution.ts")
        write(self.root / "python" / "ds" / "stack" / "solution.py")
        write(self.root / "go" / "stack" / "solution.go")

    def run_docs(self, *args: str) -> tuple[int, str]:
        stderr = io.StringIO()
        with contextlib.redirect_stderr(stderr), contextlib.redirect_stdout(io.StringIO()):
            code = docs.main(list(args), root=self.root)
        return code, stderr.getvalue()

    def read(self, relative: str) -> str:
        return (self.root / relative).read_text(encoding="utf-8")

    def test_renders_the_exercise_tables_in_both_languages(self) -> None:
        self.assertEqual(self.run_docs(), (0, ""))
        self.assertIn(
            "| # | Exercise | Difficulty | Practices | Solution |\n"
            "| --- | --- | --- | --- | --- |\n"
            "| 1 | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)"
            " | Easy | Match pairs in LIFO order | — |\n"
            "| 2 | [Min Stack](https://leetcode.com/problems/min-stack/) | Medium"
            " | Track the minimum"
            " | [Solution](https://github.com/RubenOAlvarado/algorithms/tree/main/min-stack) |\n"
            "<!-- exercises:end -->",
            self.read("structures/stack/README.md"),
        )
        self.assertIn(
            "| # | Ejercicio | Dificultad | Qué practica | Solución |",
            self.read("structures/stack/README.es.md"),
        )
        self.assertIn(
            "| 1 | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)"
            " | Fácil | Emparejar pares en orden LIFO | — |",
            self.read("structures/stack/README.es.md"),
        )

    def test_renders_the_catalog_with_the_detected_status(self) -> None:
        self.assertEqual(self.run_docs(), (0, ""))
        readme = self.read("README.md")
        self.assertIn("| # | Structure | TypeScript | Python | Java | Go |", readme)
        self.assertIn("| 1 | [Stack](structures/stack/README.md) | ✅ | ✅ | 🚧 | ✅ |", readme)
        self.assertIn("| 2 | Linked List | 🚧 | 🚧 | 🚧 | 🚧 |", readme)
        self.assertIn(
            "| 1 | [Pila](structures/stack/README.es.md) | ✅ | ✅ | 🚧 | ✅ |",
            self.read("README.es.md"),
        )

    def test_adapts_the_slug_to_each_language_when_detecting_solutions(self) -> None:
        write(self.root / "typescript" / "src" / "linked-list" / "solution.ts")
        write(self.root / "python" / "ds" / "linked_list" / "solution.py")
        write(self.root / "java" / "src" / "solution" / "java" / "ds" / "linkedlist" / "A.java")
        write(self.root / "go" / "linkedlist" / "solution.go")
        self.assertEqual(self.run_docs(), (0, ""))
        self.assertIn("| 2 | Linked List | ✅ | ✅ | ✅ | ✅ |", self.read("README.md"))

    def test_java_needs_a_java_file_to_count_as_done(self) -> None:
        (self.root / "java" / "src" / "solution" / "java" / "ds" / "stack").mkdir(parents=True)
        self.assertEqual(self.run_docs(), (0, ""))
        self.assertIn("| ✅ | ✅ | 🚧 | ✅ |", self.read("README.md"))

    def test_check_passes_after_generating(self) -> None:
        self.run_docs()
        self.assertEqual(self.run_docs("--check"), (0, ""))

    def test_check_fails_without_writing_when_a_table_is_out_of_date(self) -> None:
        self.run_docs()
        exercises = self.root / "structures" / "stack" / "exercises.toml"
        write(exercises, EXERCISES.replace("Min Stack", "Minimum Stack"))
        before = self.read("structures/stack/README.md")
        code, errors = self.run_docs("--check")
        self.assertEqual(code, 1)
        self.assertIn("structures/stack/README.md: out of date", errors)
        self.assertEqual(self.read("structures/stack/README.md"), before)

    def test_check_accepts_windows_line_endings(self) -> None:
        self.run_docs()
        readme = self.root / "structures" / "stack" / "README.md"
        readme.write_bytes(readme.read_bytes().replace(b"\n", b"\r\n"))
        self.assertEqual(self.run_docs("--check"), (0, ""))

    def test_rejects_unknown_keys(self) -> None:
        exercises = self.root / "structures" / "stack" / "exercises.toml"
        write(exercises, EXERCISES.replace('difficulty = "easy"', 'dificulty = "easy"'))
        code, errors = self.run_docs()
        self.assertEqual(code, 1)
        self.assertIn(
            "structures/stack/exercises.toml: exercise #1: unknown key 'dificulty'", errors
        )
        self.assertIn(
            "structures/stack/exercises.toml: exercise #1: missing key 'difficulty'", errors
        )

    def test_rejects_an_invalid_difficulty(self) -> None:
        exercises = self.root / "structures" / "stack" / "exercises.toml"
        write(exercises, EXERCISES.replace('"easy"', '"trivial"'))
        code, errors = self.run_docs("--check")
        self.assertEqual(code, 1)
        self.assertIn("'difficulty' must be one of easy, medium, hard", errors)

    def test_rejects_focus_without_both_languages(self) -> None:
        exercises = self.root / "structures" / "stack" / "exercises.toml"
        write(exercises, EXERCISES.replace(', es = "Seguir el mínimo"', ""))
        code, errors = self.run_docs("--check")
        self.assertEqual(code, 1)
        self.assertIn("exercise #2: 'focus' must have non-empty 'en' and 'es' texts", errors)

    def test_rejects_invalid_toml(self) -> None:
        write(self.root / "structures" / "stack" / "exercises.toml", "[[exercise]\n")
        code, errors = self.run_docs("--check")
        self.assertEqual(code, 1)
        self.assertIn("structures/stack/exercises.toml: invalid TOML", errors)

    def test_rejects_an_exercise_id_used_by_two_structures(self) -> None:
        write(self.root / "structures" / "linked-list" / "exercises.toml", EXERCISES)
        write(self.root / "structures" / "linked-list" / "README.md", STACK_README)
        write(self.root / "structures" / "linked-list" / "README.es.md", STACK_README)
        code, errors = self.run_docs("--check")
        self.assertEqual(code, 1)
        self.assertIn(
            "structures/stack/exercises.toml: exercise id 'valid-parentheses'"
            " is already used in structures/linked-list",
            errors,
        )

    def test_rejects_a_structure_folder_missing_from_the_catalog(self) -> None:
        write(self.root / "structures" / "queue" / "exercises.toml", "")
        write(self.root / "structures" / "queue" / "README.md", STACK_README)
        write(self.root / "structures" / "queue" / "README.es.md", STACK_README)
        code, errors = self.run_docs("--check")
        self.assertEqual(code, 1)
        self.assertIn("structures/queue: not listed in structures/catalog.toml", errors)

    def test_requires_every_readme_to_have_its_translation(self) -> None:
        write(self.root / "typescript" / "README.md", "# TypeScript\n")
        code, errors = self.run_docs("--check")
        self.assertEqual(code, 1)
        self.assertIn("typescript/README.md: missing its pair README.es.md", errors)

    def test_ignores_readmes_inside_dependency_and_hidden_folders(self) -> None:
        write(self.root / "typescript" / "node_modules" / "vitest" / "README.md", "# vitest\n")
        write(self.root / "python" / ".venv" / "lib" / "README.md", "# lib\n")
        self.run_docs()
        self.assertEqual(self.run_docs("--check"), (0, ""))

    def test_requires_the_generated_block_markers(self) -> None:
        write(self.root / "structures" / "stack" / "README.es.md", "# Pila\n")
        code, errors = self.run_docs()
        self.assertEqual(code, 1)
        self.assertIn(
            "structures/stack/README.es.md: expected exactly one '<!-- exercises:start -->'",
            errors,
        )


if __name__ == "__main__":
    unittest.main()
