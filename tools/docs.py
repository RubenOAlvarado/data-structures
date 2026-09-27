#!/usr/bin/env python3
"""Generate and validate the generated parts of the documentation.

Usage (from the repository root):
    python tools/docs.py          regenerate the catalog and exercise tables
    python tools/docs.py --check  fail if the data is invalid or a table is out of date

Requires Python 3.11+ and nothing outside the standard library.
"""

import argparse
import os
import re
import sys
import tomllib
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LANGUAGES = ("en", "es")
README = {"en": "README.md", "es": "README.es.md"}
DIFFICULTIES = ("easy", "medium", "hard")
SLUG = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
SKIPPED_DIRS = {"node_modules", "build", "dist", "target"}

DIFFICULTY_LABELS = {
    "en": {"easy": "Easy", "medium": "Medium", "hard": "Hard"},
    "es": {"easy": "Fácil", "medium": "Media", "hard": "Difícil"},
}
EXERCISE_HEADERS = {
    "en": ("#", "Exercise", "Difficulty", "Practices", "Solution"),
    "es": ("#", "Ejercicio", "Dificultad", "Qué practica", "Solución"),
}
SOLUTION_LINK = {"en": "Solution", "es": "Solución"}
LANGUAGE_COLUMNS = ("TypeScript", "Python", "Java", "Go")
CATALOG_HEADERS = {
    "en": ("#", "Structure", *LANGUAGE_COLUMNS),
    "es": ("#", "Estructura", *LANGUAGE_COLUMNS),
}


class DocsError(Exception):
    """A problem in the documentation sources."""


@dataclass(frozen=True)
class Structure:
    slug: str
    name: dict[str, str]


@dataclass(frozen=True)
class Exercise:
    id: str
    title: str
    difficulty: str
    url: str
    focus: dict[str, str]
    solution: str


def rel(root: Path, path: Path) -> str:
    return path.relative_to(root).as_posix()


def load_toml(root: Path, path: Path, errors: list[str]) -> dict:
    try:
        with path.open("rb") as file:
            return tomllib.load(file)
    except tomllib.TOMLDecodeError as error:
        errors.append(f"{rel(root, path)}: invalid TOML: {error}")
        return {}


def check_keys(
    table: object, required: set[str], optional: set[str], where: str, errors: list[str]
) -> bool:
    if not isinstance(table, dict):
        errors.append(f"{where}: expected a table")
        return False
    for key in sorted(required - table.keys()):
        errors.append(f"{where}: missing key '{key}'")
    for key in sorted(table.keys() - required - optional):
        errors.append(f"{where}: unknown key '{key}'")
    return required <= table.keys()


def check_text(table: dict, key: str, where: str, errors: list[str]) -> bool:
    value = table[key]
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{where}: '{key}' must be non-empty text")
        return False
    return True


def check_localized(table: dict, key: str, where: str, errors: list[str]) -> bool:
    value = table[key]
    valid = (
        isinstance(value, dict)
        and set(value) == set(LANGUAGES)
        and all(isinstance(text, str) and text.strip() for text in value.values())
    )
    if not valid:
        errors.append(f"{where}: '{key}' must have non-empty 'en' and 'es' texts and nothing else")
    return valid


def check_url(table: dict, key: str, where: str, errors: list[str]) -> bool:
    if not check_text(table, key, where, errors):
        return False
    if not table[key].startswith("https://"):
        errors.append(f"{where}: '{key}' must start with https://")
        return False
    return True


def load_catalog(root: Path, errors: list[str]) -> list[Structure]:
    path = root / "structures" / "catalog.toml"
    if not path.is_file():
        errors.append("structures/catalog.toml: file not found")
        return []
    data = load_toml(root, path, errors)
    check_keys(data, set(), {"structure"}, rel(root, path), errors)
    structures: list[Structure] = []
    for number, entry in enumerate(data.get("structure", []), start=1):
        where = f"{rel(root, path)}: structure #{number}"
        if not check_keys(entry, {"slug", "name"}, set(), where, errors):
            continue
        if not isinstance(entry["slug"], str) or not SLUG.match(entry["slug"]):
            errors.append(f"{where}: 'slug' must be kebab-case, like 'linked-list'")
            continue
        if not check_localized(entry, "name", where, errors):
            continue
        if any(structure.slug == entry["slug"] for structure in structures):
            errors.append(f"{where}: slug '{entry['slug']}' is listed twice")
            continue
        structures.append(Structure(entry["slug"], entry["name"]))
    return structures


def load_exercises(root: Path, path: Path, errors: list[str]) -> list[Exercise]:
    data = load_toml(root, path, errors)
    check_keys(data, set(), {"exercise"}, rel(root, path), errors)
    exercises: list[Exercise] = []
    for number, entry in enumerate(data.get("exercise", []), start=1):
        where = f"{rel(root, path)}: exercise #{number}"
        required = {"id", "title", "difficulty", "url", "focus"}
        if not check_keys(entry, required, {"solution"}, where, errors):
            continue
        valid = all(
            [
                check_text(entry, "id", where, errors),
                check_text(entry, "title", where, errors),
                check_url(entry, "url", where, errors),
                check_localized(entry, "focus", where, errors),
            ]
        )
        if isinstance(entry["id"], str) and not SLUG.match(entry["id"]):
            errors.append(f"{where}: 'id' must be kebab-case, like 'valid-parentheses'")
            valid = False
        if entry["difficulty"] not in DIFFICULTIES:
            errors.append(f"{where}: 'difficulty' must be one of {', '.join(DIFFICULTIES)}")
            valid = False
        solution = entry.get("solution", "")
        if solution and not check_url(entry, "solution", where, errors):
            valid = False
        if valid:
            exercises.append(
                Exercise(
                    id=entry["id"],
                    title=entry["title"],
                    difficulty=entry["difficulty"],
                    url=entry["url"],
                    focus=entry["focus"],
                    solution=solution,
                )
            )
    return exercises


def row(cells: tuple[str, ...] | list[str]) -> str:
    return "| " + " | ".join(cell.replace("|", "\\|") for cell in cells) + " |"


def render_exercises(exercises: list[Exercise], lang: str) -> str:
    lines = [row(EXERCISE_HEADERS[lang]), row(["---"] * len(EXERCISE_HEADERS[lang]))]
    for number, exercise in enumerate(exercises, start=1):
        solution = f"[{SOLUTION_LINK[lang]}]({exercise.solution})" if exercise.solution else "—"
        lines.append(
            row(
                [
                    str(number),
                    f"[{exercise.title}]({exercise.url})",
                    DIFFICULTY_LABELS[lang][exercise.difficulty],
                    exercise.focus[lang],
                    solution,
                ]
            )
        )
    return "\n".join(lines)


def solution_status(root: Path, slug: str) -> tuple[bool, bool, bool, bool]:
    """Whether each language (TypeScript, Python, Java, Go) has a solution for `slug`."""
    snake = slug.replace("-", "_")
    package = slug.replace("-", "")
    java_dir = root / "java" / "src" / "solution" / "java" / "ds" / package
    return (
        (root / "typescript" / "src" / slug / "solution.ts").is_file(),
        (root / "python" / "ds" / snake / "solution.py").is_file(),
        java_dir.is_dir() and any(java_dir.glob("*.java")),
        (root / "go" / package / "solution.go").is_file(),
    )


def render_catalog(root: Path, structures: list[Structure], lang: str) -> str:
    lines = [row(CATALOG_HEADERS[lang]), row(["---"] * len(CATALOG_HEADERS[lang]))]
    for number, structure in enumerate(structures, start=1):
        readme = f"structures/{structure.slug}/{README[lang]}"
        name = structure.name[lang]
        if (root / readme).is_file():
            name = f"[{name}]({readme})"
        marks = ["✅" if done else "🚧" for done in solution_status(root, structure.slug)]
        lines.append(row([str(number), name, *marks]))
    return "\n".join(lines)


def replace_block(text: str, block: str, content: str) -> str:
    start, end = f"<!-- {block}:start -->", f"<!-- {block}:end -->"
    pattern = re.compile(re.escape(start) + ".*?" + re.escape(end), re.DOTALL)
    if len(pattern.findall(text)) != 1:
        raise DocsError(f"expected exactly one '{start}' ... '{end}' block")
    return pattern.sub(lambda _: f"{start}\n{content}\n{end}", text)


def find_unpaired_readmes(root: Path) -> list[str]:
    errors = []
    for directory, subdirectories, files in os.walk(root):
        subdirectories[:] = sorted(
            name for name in subdirectories if not name.startswith(".") and name not in SKIPPED_DIRS
        )
        for lang, other in (("en", "es"), ("es", "en")):
            if README[lang] in files and README[other] not in files:
                path = Path(directory) / README[lang]
                errors.append(f"{rel(root, path)}: missing its pair {README[other]}")
    return errors


def render_into(
    root: Path, path: Path, block: str, content: str, outputs: dict[Path, str], errors: list[str]
) -> None:
    if not path.is_file():
        errors.append(f"{rel(root, path)}: file not found")
        return
    current = outputs.get(path, path.read_text(encoding="utf-8"))
    try:
        outputs[path] = replace_block(current, block, content)
    except DocsError as error:
        errors.append(f"{rel(root, path)}: {error}")


def build(root: Path) -> tuple[dict[Path, str], list[str]]:
    """Return the expected content of every generated file and the problems found."""
    errors: list[str] = []
    outputs: dict[Path, str] = {}
    structures = load_catalog(root, errors)
    listed = {structure.slug for structure in structures}
    structures_dir = root / "structures"
    folders = sorted(path for path in structures_dir.glob("*") if path.is_dir())
    owners: dict[str, str] = {}
    for folder in folders:
        if folder.name not in listed:
            errors.append(f"structures/{folder.name}: not listed in structures/catalog.toml")
        exercises_path = folder / "exercises.toml"
        if not exercises_path.is_file():
            errors.append(f"structures/{folder.name}: missing exercises.toml")
            continue
        exercises = load_exercises(root, exercises_path, errors)
        seen: set[str] = set()
        for exercise in exercises:
            if exercise.id in seen:
                errors.append(
                    f"structures/{folder.name}/exercises.toml: exercise id '{exercise.id}'"
                    " is listed twice"
                )
                continue
            seen.add(exercise.id)
            owner = owners.setdefault(exercise.id, folder.name)
            if owner != folder.name:
                errors.append(
                    f"structures/{folder.name}/exercises.toml: exercise id '{exercise.id}'"
                    f" is already used in structures/{owner}"
                )
        for lang in LANGUAGES:
            content = render_exercises(exercises, lang)
            render_into(root, folder / README[lang], "exercises", content, outputs, errors)
    for lang in LANGUAGES:
        content = render_catalog(root, structures, lang)
        render_into(root, root / README[lang], "catalog", content, outputs, errors)
    errors.extend(find_unpaired_readmes(root))
    return outputs, errors


def main(argv: list[str] | None = None, root: Path = ROOT) -> int:
    parser = argparse.ArgumentParser(description="Generate and validate the documentation tables.")
    parser.add_argument(
        "--check",
        action="store_true",
        help="do not write anything; fail if the data is invalid or a table is out of date",
    )
    args = parser.parse_args(argv)
    outputs, errors = build(root)
    stale = [path for path, text in outputs.items() if path.read_text(encoding="utf-8") != text]
    if args.check and not errors:
        errors = [f"{rel(root, path)}: out of date, run `python tools/docs.py`" for path in stale]
    if errors:
        for error in errors:
            print(f"error: {error}", file=sys.stderr)
        return 1
    if not args.check:
        for path in stale:
            path.write_text(outputs[path], encoding="utf-8", newline="\n")
            print(f"updated {rel(root, path)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
