# Python Language Reference — Structure Analysis

## Entry Point Patterns

```
# Script entry point
if __name__ == "__main__":

# Framework entry points
app = Flask(__name__)         # Flask
app = FastAPI()               # FastAPI
application = get_wsgi_application()  # Django
```

Grep patterns:
- `if __name__` — script entry points
- `app = Flask\|app = FastAPI\|urlpatterns` — web framework entry
- `@click.command\|@app.command` — CLI frameworks (Click, Typer)
- `def main` — conventional main function

## Project Configuration Files

| File | Purpose |
|:-----|:--------|
| `pyproject.toml` | Modern project metadata, dependencies, build config |
| `setup.py` / `setup.cfg` | Legacy project metadata |
| `requirements.txt` | Pinned dependencies |
| `Pipfile` | Pipenv dependencies |
| `poetry.lock` | Poetry lock file |
| `tox.ini` / `noxfile.py` | Test automation config |

## Class and Function Definition Patterns

Grep patterns for component detection:
- `^class \w+` — class definitions
- `^def \w+\|^    def \w+` — top-level and method definitions
- `^\w+ = ` — module-level constants (ALL_CAPS convention)
- `@dataclass\|@attrs` — data classes
- `@property` — property definitions

## Import and Dependency Patterns

```python
import module                    # Standard import
from module import name          # Selective import
from . import module             # Relative import (package internal)
from ..package import module     # Parent package import
```

Grep patterns:
- `^import \|^from .* import` — all imports
- `^from \.\|^from \.\.` — relative imports (internal dependencies)

## Framework-Specific Patterns

### Django
- `models.py` — ORM models
- `views.py` / `viewsets.py` — request handlers
- `urls.py` — URL routing
- `serializers.py` — API serialization
- `admin.py` — admin interface registration
- `migrations/` — database migrations

### Flask / FastAPI
- `@app.route` / `@router.get` — route definitions
- `Blueprint` / `APIRouter` — route grouping

### SQLAlchemy
- `Base = declarative_base()` — ORM base
- `class Model(Base):` — ORM models

## Version Detection

| Indicator | Version |
|:----------|:--------|
| `match` statement | Python 3.10+ |
| `X \| Y` type union | Python 3.10+ |
| `:=` walrus operator | Python 3.8+ |
| `f"string"` | Python 3.6+ |
| Type hints without `from __future__` | Python 3.9+ (builtin generics) |
| Shebang `#!/usr/bin/env python3` | Python 3.x |
