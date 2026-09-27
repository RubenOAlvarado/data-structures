"""Test harness that lets the same tests run against the starters or the solutions."""

import importlib
import importlib.util
import pkgutil
import sys


def use_solutions(package_name: str) -> list[str]:
    """Make every `<package>.<structure>.starter` import load `<package>.<structure>.solution`.

    Structures that do not have a `solution.py` yet are left untouched.
    Returns the names of the structures that were redirected.
    """
    package = importlib.import_module(package_name)
    redirected = []
    for module in pkgutil.iter_modules(package.__path__):
        if not module.ispkg:
            continue
        base = f"{package_name}.{module.name}"
        if importlib.util.find_spec(f"{base}.solution") is None:
            continue
        sys.modules[f"{base}.starter"] = importlib.import_module(f"{base}.solution")
        redirected.append(module.name)
    return sorted(redirected)
