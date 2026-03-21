# Python Language Reference — Logic Visualization

## Control Flow Patterns

```python
# Conditional
if condition:
elif other:
else:

# Match (3.10+)
match value:
    case Pattern():
    case _:

# Loops
for item in iterable:
while condition:

# Comprehensions (single-expression, often no diagram needed)
[x for x in items if cond]

# Context managers
with open(path) as f:
async with aiohttp.ClientSession() as session:
```

## Error Handling Patterns

```python
try:
    ...
except SpecificError as e:
    ...
except (TypeError, ValueError):
    ...
except Exception:       # Broad catch
    ...
else:                   # No exception path
    ...
finally:                # Always executed
    ...
```

Diagram note: `else` after `try` is the no-exception path (not an `if/else`).

## Side Effect Patterns

### File I/O
- `open(path, mode)` — file read/write
- `Path.read_text()` / `Path.write_text()` — pathlib file ops
- `shutil.copy` / `shutil.move` — file operations
- `os.makedirs` / `Path.mkdir` — directory creation
- `json.dump` / `json.load` — JSON serialization

### Network I/O
- `requests.get` / `requests.post` — HTTP client
- `urllib.request.urlopen` — stdlib HTTP
- `aiohttp.ClientSession` — async HTTP
- `socket.connect` — raw socket

### Database
- `cursor.execute(sql)` — DB-API
- `session.query(Model)` — SQLAlchemy ORM
- `Model.objects.filter()` — Django ORM

### Logging
- `logging.debug\|info\|warning\|error\|critical` — stdlib logging
- `logger.\w+\(` — logger instance calls
- `print(` — stdout output (often used as informal logging)

### State Mutations
- `self.\w+ =` — instance attribute mutation
- `global \w+` / `nonlocal \w+` — scope-crossing mutations
- `list.append\|list.extend\|dict.update\|dict\[.*\] =` — collection mutation

### Process Control
- `sys.exit(` — process termination
- `subprocess.run\|subprocess.Popen` — child process
- `os.exec` — process replacement

## Common Patterns Affecting Logic Flow

### Decorators
Decorators wrap function behavior. Check if the decorator adds retry logic, caching, authentication, or error handling:
- `@retry` / `@backoff` — retry logic (adds invisible loop)
- `@lru_cache` / `@cache` — memoization (adds invisible early return)
- `@login_required` / `@permission_required` — auth check (adds invisible guard)

### Generators / Iterators
- `yield` — generator function (lazy evaluation, complex control flow)
- `yield from` — delegated generator
- `async for` / `async with` — async iteration
