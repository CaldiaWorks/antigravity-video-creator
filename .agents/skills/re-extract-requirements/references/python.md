# Python Language Reference — Requirements Extraction

## EARS Pattern Detection Guide

### Ubiquitous — Unconditional behavior
Look for code that always executes without conditions:
- Module-level initialization
- `__init__` method body (always runs on instantiation)
- Unconditional `return` statements in main flow
- Always-executed logging or persistence calls
- Default parameter values: `def func(x=10)` implies "system SHALL use 10 as default"

### Event-driven — Triggered by input
- `@app.route` / `@router.get` — HTTP request triggers
- `def handle_*` / `def on_*` — event handler naming conventions
- `signal.signal(SIGTERM, handler)` — OS signal handlers
- `@receiver(post_save)` — Django signals
- `if __name__ == "__main__":` — script invocation trigger
- CLI argument parsing (`argparse`, `click`, `sys.argv`) — user command triggers

### Unwanted — Error/validation conditions
- `if not condition: raise` — validation with exception
- `if value is None: return error` — null guard
- `try/except` blocks — error handling behavior
- `assert` statements — invariant checks
- `if len(items) == 0:` — empty input guard
- `isinstance(x, type)` checks — type validation

### State-driven — Background/stateful behavior
- `while True:` / `while self.running:` — service loops
- `async for event in stream:` — event stream processing
- `schedule.every(interval)` — scheduled tasks
- `threading.Timer` / `asyncio.create_task` — background tasks

### Optional — Configurable behavior
- `os.environ.get('KEY', default)` — environment-based config
- `if config.get('feature_flag'):` — feature toggles
- `settings.DEBUG` — Django settings
- `logging.getLogger(...).setLevel(...)` — configurable logging level
- Default parameters that change behavior: `def func(verbose=False)`

## Concrete Value Extraction

### Thresholds and Constants
- `ALL_CAPS_NAMES = value` — module-level constants
- `max_retries = 3` / `timeout = 30` — hardcoded limits
- `DEFAULT_*` prefix — named defaults

### Error Messages
- String arguments to `raise Exception("...")` — exception messages
- `logging.error("...")` — error log messages
- `sys.stderr.write("...")` — stderr output
- `print("Error: ...")` — informal error messages

### Configuration Keys
- `os.environ['KEY']` / `os.environ.get('KEY')` — env var names
- `config['section']['key']` — config file keys
- `argparse.add_argument('--name')` — CLI argument names

## Validation Patterns

- `if not isinstance(x, expected_type):` — type checking
- `if x < 0 or x > max:` — range validation
- `if not re.match(pattern, value):` — format validation
- `if key not in allowed_keys:` — whitelist validation
- `Path(x).exists()` — filesystem validation
