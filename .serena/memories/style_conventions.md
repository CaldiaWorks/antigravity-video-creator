# Code Style and Conventions

## TypeScript Configuration

### Key Settings (tsconfig.json)
- `strict: true` - Enable all strict type-checking options
- `module: "esnext"` - Use latest ES modules
- `moduleResolution: "bundler"` - Bundler-compatible resolution
- `jsx: "react-jsx"` - Use React 17+ JSX transform (no React import needed)
- `noUncheckedIndexedAccess: true` - Safer array/object access
- `exactOptionalPropertyTypes: true` - Stricter optional properties
- `verbatimModuleSyntax: true` - Enforce explicit type imports

## Prettier Settings (.prettierrc)
- `semi: true` - Always use semicolons
- `singleQuote: true` - Use single quotes
- `tabWidth: 2` - 2-space indentation
- `trailingComma: "es5"` - Trailing commas where valid in ES5
- `printWidth: 80` - Max line length of 80 characters

## ESLint Configuration (eslint.config.js)
- Uses ESLint Flat Config (v9)
- TypeScript-ESLint for type-aware linting
- React and React Hooks plugins
- `react/react-in-jsx-scope: 'off'` - No need to import React (JSX transform)
- Prettier config disabled to avoid conflicts

## Naming Conventions
- **Files**: PascalCase for React components (e.g., `Composition.tsx`)
- **Files**: camelCase for non-component files (e.g., `index.ts`)
- **Components**: PascalCase (e.g., `MyComp`)
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE for true constants

## Code Comments
- Comments must be written in **English** unless specified otherwise
- Comments should be based on actual implementation, not speculation
- Avoid unnecessary comments for self-explanatory code

## Module System
- Use ESM (`import`/`export`) - project uses `"type": "module"`
- Use explicit type imports: `import type { Foo } from './module'`

## React Patterns
- Functional components only
- Use hooks for state and effects
- Follow React Hooks rules (enforced by eslint-plugin-react-hooks)
