import sys
from pathlib import Path

import pytest

from harness import use_solutions


def write(path: Path, content: str = "") -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)


@pytest.fixture
def fake_package(tmp_path: Path, monkeypatch: pytest.MonkeyPatch):
    write(tmp_path / "fakeds" / "__init__.py")
    write(tmp_path / "fakeds" / "done" / "__init__.py")
    write(tmp_path / "fakeds" / "done" / "starter.py", "KIND = 'starter'\n")
    write(tmp_path / "fakeds" / "done" / "solution.py", "KIND = 'solution'\n")
    write(tmp_path / "fakeds" / "wip" / "__init__.py")
    write(tmp_path / "fakeds" / "wip" / "starter.py", "KIND = 'starter'\n")
    monkeypatch.syspath_prepend(str(tmp_path))
    yield "fakeds"
    for name in [n for n in sys.modules if n == "fakeds" or n.startswith("fakeds.")]:
        del sys.modules[name]


def test_redirects_starter_imports_to_the_solution(fake_package: str) -> None:
    use_solutions(fake_package)

    from fakeds.done.starter import KIND

    assert KIND == "solution"


def test_leaves_structures_without_a_solution_untouched(fake_package: str) -> None:
    redirected = use_solutions(fake_package)

    from fakeds.wip.starter import KIND

    assert redirected == ["done"]
    assert KIND == "starter"
