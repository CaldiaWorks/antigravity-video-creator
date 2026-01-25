# Project Overview

## Purpose
This is a Remotion-based video creation project that combines React video generation framework with AI agents (Antigravity) to autonomously create and edit videos through conversational interaction.

## Key Goals
- Intuitive video creation through AI chat
- Implementation of advanced video effects based on Remotion best practices via Remotion Skill
- Building automated rendering pipelines

## Tech Stack
- **Remotion** (v4.0.409): React-based programmatic video framework
- **React** (v19.2.3): UI library
- **TypeScript** (v5.9.3): Type-safe JavaScript
- **ESLint** (v9.39.2): Linting
- **Prettier** (v3.8.1): Code formatting
- **Node.js**: Runtime environment
- **ESM**: Module system (type: "module" in package.json)

## Remotion Skill
The project includes `remotion-best-practices` skill which provides domain-specific knowledge for:
- Animations (spring, easing)
- Sequencing (timing, delay, clipping)
- Asset management (images, video, audio, Lottie)
- Typography (Google Fonts, text wrapping)
- Data visualization (charts, graphs)
- Caption generation (subtitle from audio, TikTok-style highlighting)
- 3D / Maps (React Three Fiber, Mapbox)

## Entry Point
- Main: `src/index.ts`
- Preview: `npm start` (opens browser preview)
- Build: `npm run build` (renders to `out.mp4`)
