# TypeScript Language Reference — Requirements Extraction

## EARS Pattern Detection Guide

### Ubiquitous — Unconditional behavior
- Constructor body — always runs on instantiation
- Module-level side effects (top-level `await`, immediate function calls)
- Unconditional `return` in main flow
- Default parameter values: `function fn(x = 10)` implies default behavior
- Default exports with fixed configuration

### Event-driven — Triggered by input
- `app.get('/path', handler)` / `router.post(...)` — HTTP route handlers
- `addEventListener('event', handler)` — DOM event handlers
- `socket.on('event', handler)` — WebSocket/Socket.io events
- `@Get()` / `@Post()` — NestJS decorators
- `export async function GET(request)` — Next.js App Router handlers
- `onChange` / `onClick` / `onSubmit` — React event props

### Unwanted — Error/validation conditions
- `if (!condition) throw new Error(...)` — validation with exception
- `if (value === null || value === undefined)` — nullish guard
- `try { } catch (e) { }` — error handling
- `.catch(err => ...)` — promise rejection handling
- Zod/Joi/Yup schema validation — declarative validation
- Type guards returning `false` — type validation

### State-driven — Background/stateful behavior
- `setInterval(fn, ms)` — periodic execution
- `useEffect(() => { ... }, [deps])` — React lifecycle
- `new Observable(subscriber => { ... })` — RxJS streams
- `while (true) { await ... }` — polling loops
- WebSocket `onmessage` handlers — continuous listening

### Optional — Configurable behavior
- `process.env.KEY` — environment variables
- `config.get('key')` — configuration libraries
- Feature flags: `if (features.enabled('flag'))`
- Optional parameters: `function fn(opts?: Options)`
- `.env` file values

## Concrete Value Extraction

### Thresholds and Constants
- `const MAX_RETRIES = 3` — named constants (UPPER_CASE convention)
- `const DEFAULT_TIMEOUT = 5000` — default values
- `enum` definitions — fixed value sets
- `as const` assertions — literal types

### Error Messages
- `new Error('message')` / `throw new Error(...)` — error constructors
- `console.error('...')` — error logging
- `res.status(400).json({ error: '...' })` — API error responses
- HTTP status codes in response handlers

### Configuration Keys
- `process.env.KEY` — env variable names
- Keys in `config/` files — configuration structure
- CLI argument names (`yargs`, `commander`)
- `.env.example` file — documented config keys

## Validation Patterns

- `typeof x === 'string'` — type checking
- `Array.isArray(x)` — array validation
- `z.object({ ... }).parse(input)` — Zod schema validation
- `Joi.object({ ... }).validate(input)` — Joi validation
- `if (x < 0 || x > max)` — range validation
- Regex `.test(value)` — format validation
