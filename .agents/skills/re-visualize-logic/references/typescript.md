# TypeScript Language Reference — Logic Visualization

## Control Flow Patterns

```typescript
// Conditional
if (condition) { } else if (other) { } else { }

// Switch
switch (value) {
    case 'a': ...; break;
    case 'b': ...; break;
    default: ...;
}

// Ternary (single-expression, often no diagram needed)
const result = condition ? a : b;

// Optional chaining (implicit null check)
obj?.method()?.property

// Nullish coalescing
const value = input ?? defaultValue;
```

## Error Handling Patterns

```typescript
try {
    ...
} catch (error) {
    if (error instanceof SpecificError) { ... }
    ...
} finally {
    ...
}

// Promise rejection
promise.catch(err => ...)

// Async/await with try-catch
async function fn() {
    try { await someOp(); }
    catch (e) { ... }
}
```

## Side Effect Patterns

### File I/O (Node.js)
- `fs.readFile` / `fs.writeFile` — async file ops
- `fs.readFileSync` / `fs.writeFileSync` — sync file ops
- `fs.promises.readFile` — promise-based file ops
- `createReadStream` / `createWriteStream` — streaming

### Network I/O
- `fetch(url)` — HTTP client (browser and Node.js 18+)
- `axios.get` / `axios.post` — Axios HTTP client
- `http.request` / `https.request` — Node.js stdlib
- `WebSocket` — WebSocket connections

### Database
- `prisma.model.findMany()` — Prisma ORM
- `getRepository(Entity).find()` — TypeORM
- `knex('table').select()` — Knex query builder
- `mongoose.model.find()` — Mongoose ODM
- `pool.query(sql)` — raw SQL (pg, mysql2)

### Logging
- `console.log\|warn\|error\|debug` — console output
- `logger.info\|warn\|error` — logging libraries (winston, pino)

### State Mutations
- `this.\w+ =` — class property mutation
- `setState` / `dispatch` — React state updates
- `store.commit` / `store.dispatch` — Vuex/Pinia mutations
- Array/object spread with reassignment — immutable-style updates

### Process Control
- `process.exit(` — Node.js process termination
- `child_process.spawn\|exec` — child process

## Common Patterns Affecting Logic Flow

### Middleware
Express/Koa middleware chains create implicit control flow:
- `next()` — pass to next middleware
- `return` without `next()` — short-circuit the chain
- Error middleware: `(err, req, res, next) => { ... }`

### Async Patterns
- `Promise.all` — parallel execution
- `Promise.race` — first-to-complete
- `Promise.allSettled` — all results regardless of rejection
- `for await (const item of stream)` — async iteration

### Type Guards
Type narrowing affects control flow. Document the narrowed type in each branch:
- `if (typeof x === 'string')` — typeof guard
- `if (x instanceof Class)` — instanceof guard
- `if ('property' in obj)` — in guard
- Custom: `function isType(x): x is Type` — user-defined guard
