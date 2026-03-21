# As-Is Specification: remotion

**Document Version**: 1.0
**Analysis Date**: 2026-03-21
**Target System**: React-based programmatic video generation application using Remotion
**Language**: typescript
**Framework**: React 19.2.3, Remotion 4.0.409
**Analysis Scope**: `src/` directory files and codebase components

---

## Executive Summary

### System Overview

**System Type**: Programmatic Video Generation Engine

**Primary Functions**:
- Render pre-configured React component compositions into MP4 output using Remotion.
- Synchronize dynamically timed sequences with multiple audio tracks.
- Render an audio-reactive, rule-based 2D Avatar with lip-sync, blinking, and breathing idle animations.

**Technology Stack**:
- **Language**: typescript ^5.9.3
- **Framework**: React ^19.2.3, Remotion ^4.0.409
- **Media**: @remotion/media, @remotion/media-utils
- **Styling**: tailwindcss ^4.1.18

### Analysis Scope

**Files Analyzed**: 27 source files
**Components Analyzed**: 28 components documented, 2 components deeply traced
**Requirements Extracted**: 11 EARS requirements
**Coverage**: 100% of core control components (`Avatar`, `AIGovernanceVideo`)

### Key Findings

- **Technical Debt**: 2 suspected issues
  - 🔴 Critical: 0
  - 🟡 Important: 1
  - 🟢 Informational: 1

---

## Technology Stack

| Component | Version | Source |
|:----------|:--------|:-------|
| typescript | ^5.9.3 | package.json:30 |
| React | ^19.2.3 | package.json:26 |
| Remotion | ^4.0.409 | package.json:29 |
| @remotion/cli | ^4.0.409 | package.json:18 |
| @remotion/media | ^4.0.409 | package.json:19 |
| @remotion/media-utils | ^4.0.438 | package.json:20 |
| chart.js | ^4.5.1 | package.json:25 |
| tailwindcss | ^4.1.18 | package.json:45 |

---

## Module Catalog

| Category | Component | Description | Reference |
|:---------|:----------|:------------|:----------|
| Core | `RemotionRoot` | Root component registering all Remotion compositions | src/Root.tsx:11 |
| Core | `WorkflowVideo` | Composition tying together `Slide01` to `Slide07` for a workflow presentation | src/WorkflowVideo.tsx:11 |
| Core | `AvatarTestVideo` | Test composition specifically for rendering the `Avatar` component with audio thresholds | src/AvatarTestVideo.tsx:21 |
| Core | `AIGovernanceVideo` | Composition assembling `Scene01` to `Scene08` with an audio-backed slideshow | src/AIGovernanceVideo.tsx:63 |
| Core | `AI_GOVERNANCE_TOTAL_FRAMES` | Calculates and exports total frame duration for the AI Governance video | src/AIGovernanceVideo.tsx:33 |
| Core | `MyComposition` | Test composition displaying CaldiaWorks and Introduction | src/Composition.tsx:6 |
| Shared | `CharacterDef` | Interface defining 4 specific states of Avatar images | src/components/Avatar.tsx:11 |
| Shared | `AvatarProps` | Interface for feeding audio and states to the Avatar | src/components/Avatar.tsx:18 |
| Shared | `Avatar` | A Remotion component rendering an audio-responsive speaking avatar | src/components/Avatar.tsx:25 |
| Slide | `Slide01_Hero` | Slide template for project/workflow Hero | src/slides/Slide01_Hero.tsx:4 |
| Slide | `Slide02_Process` | Slide defining the generic process flow | src/slides/Slide02_Process.tsx:4 |
| Slide | `Slide03_Hearing` | Presentation slide regarding the 'Hearing' stage | src/slides/Slide03_Hearing.tsx:23 |
| Slide | `Slide04_Resource` | Slide regarding resource requirements | src/slides/Slide04_Resource.tsx:13 |
| Slide | `Slide05_Narrative` | Narrative flow discussion slide | src/slides/Slide05_Narrative.tsx:21 |
| Slide | `Slide06_Timeline` | Development timeline presentation slide | src/slides/Slide06_Timeline.tsx:21 |
| Slide | `Slide07_Footer` | Footer or conclusion slide | src/slides/Slide07_Footer.tsx:4 |
| Slide | `CodeFlow` | Code flow architecture demonstration slide | src/slides/CodeFlow.tsx:4 |
| Slide | `CaldiaWorks` | Brand introduction slide | src/slides/CaldiaWorks.tsx:4 |
| Slide | `Introduction` | Standard introduction slide | src/slides/Introduction.tsx:4 |
| Scene | `Scene01_Intro` | Intro video scene | src/slides/ai-governance/Scene01_Intro.tsx:52 |
| Scene | `Scene02_Temptation` | Video scene concerning Temptation/Failure paths | src/slides/ai-governance/Scene02_Temptation.tsx:83 |
| Scene | `Scene03_Rule` | Video scene detailing project rules | src/slides/ai-governance/Scene03_Rule.tsx:66 |
| Scene | `Scene04_Translator` | Scene describing the "Translator" paradigm | src/slides/ai-governance/Scene04_Translator.tsx:82 |
| Scene | `Scene05_ReviewMiss` | Scene detailing Review/Mistake workflows | src/slides/ai-governance/Scene05_ReviewMiss.tsx:63 |
| Scene | `Scene06_Signal` | Video scene about traffic-light signaling concepts | src/slides/ai-governance/Scene06_Signal.tsx:75 |
| Scene | `Scene07_Conclusion` | Video scene concluding the AI governance points | src/slides/ai-governance/Scene07_Conclusion.tsx:83 |
| Scene | `Scene08_CTA` | Call to action for the Governance video | src/slides/ai-governance/Scene08_CTA.tsx:11 |
| Scene | `CyberBackground` | Cyber/tech themed dynamic SVG background unit | src/slides/ai-governance/components/CyberBackground.tsx:4 |

---

## Requirements Catalog (EARS)

### By Module

**Module: Avatar**
- REQ-W001: IF audioData is falsy, system SHALL return the `characterDef.idle` image with `objectFit: contain`.
- REQ-U002: System SHALL calculate `currentVolume` by averaging 16 audio samples from the current frame.
- REQ-U003: System SHALL identify the Avatar as `isSpeaking` when `currentVolume` exceeds `threshold` (default 0.05).
- REQ-U004: System SHALL calculate `pastVolume` by sampling 16 audio samples from 5 frames prior.
- REQ-S005: WHILE executing, system SHALL determine `isBlinking` state using a seeded random value per second, triggering for the first 4 frames if probability is < 0.3.
- REQ-U006: System SHALL assign `targetImage` exclusively from `{idle, speaking, blinkIdle, blinkSpeaking}` based on boolean states of `isSpeaking` and `isBlinking`.
- REQ-U007: System SHALL apply continuous `breathingScaleY` using `(Math.sin(frame / 20) + 1) / 2` adding up to 0.07 scale.
- REQ-W008: IF `volumeDelta` > 0.06 AND `isSpeaking`, system SHALL interpolate a `jumpScale` bouncing expansion between 1.0 and 1.15.

**Module: AIGovernanceVideo**
- REQ-U009: System SHALL calculate individual scene duration boundaries by computing `Math.ceil(sec * FPS) + 15` frames.
- REQ-U010: System SHALL calculate total frame duration by reducing the sum of all padded scene frame limits.
- REQ-U011: System SHALL yield consecutive `Sequence` elements mapping continuous frames according to the defined `sceneDurationFrames`.

### By EARS Type

| EARS Type | Count | Percentage |
|:----------|:------|:-----------|
| Ubiquitous | 8 | 72.7% |
| Event-driven | 0 | 0.0% |
| Unwanted | 2 | 18.2% |
| State-driven | 1 | 9.1% |
| Optional | 0 | 0.0% |
| **Total** | **11** | **100%** |

---

## Appendix A: Traceability Matrix

| Module | REQ-ID | EARS Type | Requirement | Source File:Line | Evidence Strength |
|:-------|:-------|:----------|:------------|:-----------------|:------------------|
| Avatar | REQ-W001 | Unwanted | IF audioData is falsy, return idle config | src/components/Avatar.tsx:56 | ✅ Strong |
| Avatar | REQ-U002 | Ubiquitous | Avg 16 samples for volume | src/components/Avatar.tsx:61 | ✅ Strong |
| Avatar | REQ-U003 | Ubiquitous | `isSpeaking` threshold mapping | src/components/Avatar.tsx:63 | ✅ Strong |
| Avatar | REQ-U004 | Ubiquitous | 5 Frame past history snapshot | src/components/Avatar.tsx:66 | ✅ Strong |
| Avatar | REQ-S005 | State | Segmented random blinking math | src/components/Avatar.tsx:75 | ✅ Strong |
| Avatar | REQ-U006 | Ubiquitous | 4 State Veadotube-style matching | src/components/Avatar.tsx:80 | ✅ Strong |
| Avatar | REQ-U007 | Ubiquitous | Root Sine breathing scaling | src/components/Avatar.tsx:87 | ✅ Strong |
| Avatar | REQ-W008 | Unwanted | Positive volume delta triggers bounce | src/components/Avatar.tsx:94 | ✅ Strong |
| AIGov | REQ-U009 | Ubiquitous | Constant FPS timestamp translation + 15 frames | src/AIGovernanceVideo.tsx:30 | ✅ Strong |
| AIGov | REQ-U010 | Ubiquitous | Sequence sum for parent duration calculation | src/AIGovernanceVideo.tsx:34 | ✅ Strong |
| AIGov | REQ-U011 | Ubiquitous | Render looped sequence instances with advancing frame offets | src/AIGovernanceVideo.tsx:82 | ✅ Strong |

---

## Appendix B: Question List (Prioritized)

### 🔴 Critical
None

### 🟡 Important
- **Bounce Jump Math Filtering** — [src/components/Avatar.tsx:94](src/components/Avatar.tsx:94)
  Does limiting `volumeDelta` to positive-only rising slopes cleanly handle audio peak ringing vs sharp plosives? Requires audio edge-case testing to confirm if Avatar chatters unnaturally.

### 🟢 Informational
- **CodeFlow.tsx usage** — [src/slides/CodeFlow.tsx:4](src/slides/CodeFlow.tsx:4)
  `CodeFlow.tsx` exists as a slide but runs under its own isolated `Composition` within `Root.tsx`. Actual usage relative to standard workflow presentation flows is ambiguous and might be legacy cleanup metadata.

---

## Appendix C: Analysis Constraints

### Confidence Factors
- **Code comments**: moderate
- **Test coverage**: No dedicated `*.test.tsx` present. Visual test `AvatarTestVideo` exists.
- **Architecture patterns**: Compositions as roots, Slides as child sequences.

### Evidence Strength Distribution
| Strength | Count | Percentage |
|:---------|:------|:-----------|
| ✅ Strong | 11 | 100% |
| ⚠️ Medium | 0 | 0% |
| ❌ Weak | 0 | 0% |

---

**Document Control**

| Version | Date | Description |
|:--------|:-----|:------------|
| 1.0 | 2026-03-21 | Initial As-Is specification |
