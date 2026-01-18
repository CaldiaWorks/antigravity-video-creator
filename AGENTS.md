# Repository Guidelines

## Project Structure & Module Organization

- `src/`: VS Code extension host (TypeScript). Key entry points: `src/extension.ts`, `src/SidebarProvider.ts`.
- `webview-ui/`: Webview UI (React + Vite + Remotion). Main files: `webview-ui/src/main.tsx`, `webview-ui/src/App.tsx`.
- `media/`: Extension assets (icons, CSS).
- `out/`: Build output (generated). Webview build lands in `out/webview/`; extension compiles to `out/*.js`.
- `.vscode/`: Local dev tasks/launch config (F5 “Run Extension”).

## Build, Test, and Development Commands

```bash
npm install
npm run compile        # Compile extension TypeScript -> out/
npm run build:webview  # Build webview-ui -> out/webview/
npm run package        # Full build (webview + extension)
npm run watch          # Build webview once + tsc --watch (use with F5)
```

Webview-only workflow:

```bash
cd webview-ui
npm install
npm run dev            # Vite dev server (for UI iteration)
npm run build          # Production build -> ../out/webview
```

## Coding Style & Naming Conventions

- TypeScript is `strict` (see `tsconfig.json`); keep types explicit at module boundaries.
- Match the existing file style: extension code uses 2-space indentation and double quotes; webview code commonly uses tabs and single quotes.
- Naming: `PascalCase` for classes/components, `camelCase` for functions/variables, `kebab-case` for npm scripts.

Linting:

- `webview-ui` uses ESLint flat config (`webview-ui/eslint.config.js`): `cd webview-ui && npm run lint`.
- Root `npm run lint` currently fails because no ESLint config exists for `src/` yet—add one before enforcing extension lint in CI.

## Testing Guidelines

- Dependencies include Mocha + `@vscode/test-electron`, but a test harness is not checked in yet (the root `npm run test` expects `out/test/runTest.js`).
- If adding tests, prefer `src/test/` (VS Code extension pattern) and keep them deterministic (no network, no timing-sensitive UI assertions).

## Commit & Pull Request Guidelines

- **Workflow**:
  - **main**: Protected. NO direct commits. Merge via PR from `develop` only.
  - **develop**: Protected. NO direct commits. Merge via PR from feature branches only.
  - **Feature Branches**: Create for all changes.
- **Commits**: Prefer Conventional Commits (e.g., `feat: …`, `fix: …`, `chore: …`).
- PRs should include: a brief summary, how to validate (e.g., `npm run watch` + F5), and screenshots/GIFs for webview UI changes.
- When changing dependencies, update the appropriate lockfile(s): root `package-lock.json` and/or `webview-ui/package-lock.json`.
