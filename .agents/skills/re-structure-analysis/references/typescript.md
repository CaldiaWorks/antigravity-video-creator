# TypeScript Language Reference — Structure Analysis

## Entry Point Patterns

```typescript
// Node.js script entry
const app = express();           // Express
const app = new Hono();          // Hono
export default defineConfig({})  // Vite/Nuxt config

// React/Next.js
export default function Page()   // Next.js page
export default function App()    // React root component
ReactDOM.createRoot(...)         // React entry

// Angular
@NgModule({ bootstrap: [...] }) // Angular root module
bootstrapApplication(...)       // Angular standalone
```

Grep patterns:
- `createRoot\|render\|hydrate` — React/client entry
- `app\.listen\|createServer` — server entry
- `export default function\|export default class` — module exports
- `@Module\|@Controller\|@Injectable` — NestJS decorators

## Project Configuration Files

| File | Purpose |
|:-----|:--------|
| `package.json` | Dependencies, scripts, project metadata |
| `tsconfig.json` | TypeScript compiler options |
| `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` | Lock files |
| `.env` / `.env.local` | Environment variables |
| `next.config.js` / `vite.config.ts` | Framework config |

## Class and Function Definition Patterns

Grep patterns:
- `^export (default )?(class\|function\|const\|interface\|type\|enum)` — exported definitions
- `^(class\|function\|const\|interface\|type\|enum) ` — local definitions
- `@\w+\(` — decorators (NestJS, Angular, TypeORM)
- `^\s+async \w+\(` — async methods

## Import and Dependency Patterns

```typescript
import { Name } from 'module';          // Named import
import Default from 'module';           // Default import
import * as Module from 'module';       // Namespace import
import type { Type } from 'module';     // Type-only import
const module = require('module');        // CommonJS
```

Grep patterns:
- `^import ` — ES module imports
- `require\(` — CommonJS imports
- Path prefix `./` or `../` — relative (internal) imports
- `@/` or `~/` — aliased internal imports

## Framework-Specific Patterns

### React / Next.js
- `useState\|useEffect\|useContext` — hooks (functional components)
- `getServerSideProps\|getStaticProps` — Next.js data fetching
- `app/` directory with `page.tsx`, `layout.tsx` — Next.js App Router

### NestJS
- `@Controller()` — HTTP controllers
- `@Injectable()` — services
- `@Module()` — module definitions
- `@Get\|@Post\|@Put\|@Delete` — route handlers

### Express
- `router.get\|router.post` — route handlers
- `app.use` — middleware registration

## Version Detection

| Indicator | Version |
|:----------|:--------|
| `satisfies` keyword | TypeScript 4.9+ |
| `using` declarations | TypeScript 5.2+ |
| `const` type parameters | TypeScript 5.0+ |
| `"type": "module"` in package.json | ESM mode |
| `"module": "NodeNext"` in tsconfig | Node.js ESM |
