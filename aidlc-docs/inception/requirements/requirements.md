# Requirements Analysis

## Intent Analysis Summary
- **User Request**: Create a reusable PNGtuber (Animated Avatar) component for Remotion videos.
- **Request Type**: New Feature
- **Scope Estimate**: Single Component (`src/components/Avatar.tsx`)
- **Complexity Estimate**: Moderate

## Functional Requirements
1. **Audio Reactivity & Visual States (veadotube mini style)**:
   - Use `@remotion/media-utils` (`useAudioData` & `visualizeAudio`) internally.
   - Analyze audio volume per frame based on an `audioSrc` prop.
   - Switch between **4 complete pre-rendered PNG states** based on a volume threshold and deterministic blink timing:
     - `Idle` (Eyes Open + Mouth Closed)
     - `Speaking` (Eyes Open + Mouth Open)
     - `Blink-Idle` (Eyes Closed + Mouth Closed)
     - `Blink-Speaking` (Eyes Closed + Mouth Open)
2. **Visual Asset Configuration**:
   - **CRITICAL**: The component must switch between complete, pre-merged images for each of the 4 states, matching the veadotube mini architecture. It does NOT use runtime individual part (eyes/mouth) layering.
3. **Idle Animations**:
   - Deterministic blinking implemented by switching from the base images (`idle`, `speaking`) to their blinking variants (`blinkIdle`, `blinkSpeaking`) using a pseudo-random interval mechanism based on `useCurrentFrame()`.
   - Continuous breathing loop animated by a Sine curve via `useCurrentFrame()` applied to the entire character image.
4. **Reactions**:
   - A visual "bounce" (跳ね) reaction effect triggered when the audio volume crosses the speaking threshold.
5. **Future Scalability (Expression Variations)**:
   - The component architecture must be designed to easily support future expression variations (e.g., joy, anger, sadness) without requiring substantial structural rewrites.
5. **Encapsulation & Multiple Characters**:
   - Self-contained component architecture.
   - Accept a "character definition" via Props (e.g., passing a specific character's image set) to seamlessly switch between multiple character setups.
   - Capable of correctly handling multiple instances/characters onscreen simultaneously reacting to individual audio sources.
6. **Asset Constraints**:
   - Formulate asset creation rules (e.g., all parts must be exported with the exact same canvas size and anchor point to ensure zero alignment issues during composition).

## Non-Functional Requirements & Technical Constraints
1. **Animation Rules**:
   - **CRITICAL**: CSS transitions, CSS animations, Tailwind animation classes, and SVG native animations are STRICTLY FORBIDDEN.
   - All animations must be driven strictly by `useCurrentFrame()`, `useVideoConfig().fps`, and `interpolate()` or `spring()`.
   - Animations must be deterministic. Frame 150 must always look exactly the same regardless of playback speed or jumps.
2. **Performance**:
   - Avoid excessive audio sampling sizes; standard optimization using a small number of samples (e.g., `numberOfSamples: 16`) for volume averaging.
   - Avoid creating new object instances unnecessarily in the render loop to prevent re-rendering performance hits during video generation.

## Key Requirements Summary
Develop a deterministic, self-contained Remotion `Avatar` (PNGtuber) component that automatically syncs mouth movements to an audio file and adds lively idle animations using functional frame-based logic (no CSS animations), supporting future asset expansions.
