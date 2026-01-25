# Codebase Structure

## Root Directory
```
remotion/
├── src/                    # Source code
├── public/                 # Static assets
├── docs/                   # Documentation
├── node_modules/           # Dependencies
├── .claude/                # Claude Code skills
├── .cursor/                # Cursor IDE skills
├── .gemini/                # Gemini skills
├── .agents/                # Agent skills
├── .agent/                 # Agent skills (alternate)
├── .codex/                 # Codex skills
├── .serena/                # Serena config
├── .vscode/                # VS Code settings
├── .git/                   # Git repository
├── package.json            # Project manifest
├── package-lock.json       # Dependency lock file
├── tsconfig.json           # TypeScript config
├── eslint.config.js        # ESLint config (flat config)
├── .prettierrc             # Prettier config
├── .gitignore              # Git ignore rules
├── .mcp.json               # MCP configuration
├── README.md               # Project documentation
└── out.mp4                 # Rendered output video
```

## Source Code (src/)
```
src/
├── index.ts               # Entry point - registers Root
├── Root.tsx               # Root component - defines compositions
└── Composition.tsx        # Main composition component
```

### File Roles
- **index.ts**: Remotion entry point, imports and registers the Root component
- **Root.tsx**: Defines compositions using `<Composition>` component with props like `fps`, `durationInFrames`, `width`, `height`
- **Composition.tsx**: The actual video content - receives `useCurrentFrame()` and `useVideoConfig()` to build frame-by-frame animations

## Skills Directory Structure
Each AI agent has its own skills directory with the same structure:
```
.claude/skills/remotion-best-practices/
├── SKILL.md               # Skill overview and usage
└── rules/                 # Individual rule files
    ├── animations.md
    ├── audio.md
    ├── videos.md
    └── ... (30+ rule files)
```

## Documentation (docs/)
```
docs/
├── report.md              # Progress report
├── memo/                  # Memos (user notes)
│   └── README.md
└── requirements/          # Requirements specifications
    ├── README.md          # ID numbering rules
    └── template.md        # Requirement template
```

## Key Patterns

### Composition Registration
Compositions are registered in `Root.tsx` and referenced by ID:
```typescript
<Composition
  id="MyComp"
  component={MyComposition}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
/>
```

### Animation Pattern
Components use `useCurrentFrame()` to animate:
```typescript
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1]);
```
