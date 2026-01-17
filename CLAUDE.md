# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VS Code extension that integrates Remotion video editing library into VS Code. The extension provides a video editor interface within VS Code using a Webview powered by React and Remotion Player.

## Architecture

This is a monorepo with two main components:

1. **Extension Host** (`/src/`) - TypeScript code running in VS Code's extension host
   - `extension.ts` - Main entry point, command registration, webview HTML management
   - `SidebarProvider.ts` - Activity bar sidebar webview provider
   - `RemotionTreeDataProvider.ts` - Tree data provider for navigation

2. **Webview UI** (`/webview-ui/`) - React + Vite application displayed in VS Code webview
   - `App.tsx` - Main component with Remotion Player integration
   - Communicates with extension host via postMessage API

**Build Output:**
- Extension compiles to `/out/extension.js`
- Webview builds to `/out/webview/`

## Commands

### Build & Package
```bash
npm run package        # Full build: webview + extension (for publishing)
npm run compile        # Compile extension TypeScript only
npm run build:webview  # Build webview-ui with Vite only
npm run watch          # Watch mode for extension development
```

### Lint
```bash
npm run lint                      # Lint extension (src/)
cd webview-ui && npm run lint     # Lint webview-ui
```

### Test
```bash
npm run test     # Run extension tests (includes compile + lint)
npm run pretest  # Just compile and lint
```

### Webview Development
```bash
cd webview-ui
npm run dev      # Vite dev server
npm run preview  # Preview production build
```

## Tech Stack

- **Extension:** TypeScript 5.3, VS Code API 1.85
- **Webview:** React 19, Vite 7.2, Remotion 4.0
- **Testing:** Mocha, @vscode/test-electron
- **Linting:** ESLint with TypeScript plugins

## Development Workflow

1. Open in VS Code
2. Run `npm run watch` in terminal
3. Press F5 to launch Extension Development Host
4. Extension activates via Activity Bar sidebar (`remotion.main` view)

## Key Points

- Extension and webview communicate via `postMessage` API
- Content Security Policy is configured in `extension.ts` for webview security
- URIs for local resources must be rewritten using `webview.asWebviewUri()`
- TypeScript strict mode is enabled in both packages
