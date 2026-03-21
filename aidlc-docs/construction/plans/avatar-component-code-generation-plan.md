# Code Generation Plan - Avatar Component

## Unit Context
- **Unit**: Avatar Component (`Avatar.tsx`)
- **Stories**: [Skipped] Requirements dictate a self-contained Remotion PNGtuber component reading an audio file and responding deterministically to volume.
- **Dependencies**: React, Remotion (`useCurrentFrame`, `useVideoConfig`, `Img`, `AbsoluteFill`, etc.), `@remotion/media-utils` (`useAudioData`, `visualizeAudio`).
- **Interfaces**:
  - `audioSrc`: string
  - `characterDef`: Object defining the 4 complete full-frame PNG assets:
    - `idle`: string (Eyes Open + Mouth Closed)
    - `speaking`: string (Eyes Open + Mouth Open)
    - `blinkIdle`: string (Eyes Closed + Mouth Closed)
    - `blinkSpeaking`: string (Eyes Closed + Mouth Open)
  - `threshold`: number (default: 0.1)

## Generation Steps

### [ ] Step 1: Install Dependencies (if necessary)
- Check if `@remotion/media-utils` is installed. If not, run installation command.

### [ ] Step 2: Create Avatar Component Skeleton
- Target: `src/components/Avatar.tsx`
- Setup component properties and basic Remotion hooks implementation (`useCurrentFrame`, etc.)

### [ ] Step 3: Implement Audio Visualization Logic
- Target: `src/components/Avatar.tsx`
- Add `useAudioData` and `visualizeAudio` logic to compute frame-by-frame volume.

### [ ] Step 4: Implement Idle & Reaction Animations
- Target: `src/components/Avatar.tsx`
- Add deterministic blinking (using frame modulus).
- Add Sine wave breathing effect logic (if applicable via transforms).
- Add bounce reaction when speech state changes, adhering to CSS animation prohibition rules.

### [ ] Step 5: Generate Mock Assets & Test Composition Integration
- Target: Workspace (Assets) & `src/Root.tsx` (or new demo file)
- Ensure 4 mock PNG files (representing the 4 states: idle, speaking, blinkIdle, blinkSpeaking) and a mock audio file are generated or placed so physical output can be tested.
- Create a demonstration composition to visualize the Avatar component using these mock assets.

### [ ] Step 6: Visual Verification (Critic)
- Target: System Terminal
- Run preview build to ensure no visual breakages and no console errors.
