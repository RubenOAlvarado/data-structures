"""Pytest configuration shared by every structure.

`pytest --solution` runs the same tests against the reference solutions.
"""

import pytest

from harness import use_solutions


def pytest_addoption(parser: pytest.Parser) -> None:
    parser.addoption(
        "--solution",
        action="store_true",
        help="run the tests against the reference solutions instead of the starters",
    )


def pytest_configure(config: pytest.Config) -> None:
    if config.getoption("--solution"):
        use_solutions("ds")
