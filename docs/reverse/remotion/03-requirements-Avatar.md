# EARS Requirements: Avatar

**Analysis Date**: 2026-03-21
**Source File**: [src/components/Avatar.tsx](src/components/Avatar.tsx)
**Requirements Extracted**: 8
**Verification**: All requirements verified against source

## Requirements Table

| REQ-ID | EARS Type | Requirement | Source | Concrete Values | Notes |
|:-------|:----------|:------------|:-------|:----------------|:------|
| REQ-W001 | Unwanted | IF audioData is falsy, system SHALL return the `characterDef.idle` image with `objectFit: contain`. | [src/components/Avatar.tsx:56](src/components/Avatar.tsx:56) | null | |
| REQ-U002 | Ubiquitous | System SHALL calculate `currentVolume` by averaging 16 audio samples from the current frame. | [src/components/Avatar.tsx:61](src/components/Avatar.tsx:61) | 16 | |
| REQ-U003 | Ubiquitous | System SHALL identify the Avatar as `isSpeaking` when `currentVolume` exceeds `threshold` (default 0.05). | [src/components/Avatar.tsx:63](src/components/Avatar.tsx:63) | 0.05 | |
| REQ-U004 | Ubiquitous | System SHALL calculate `pastVolume` by sampling 16 audio samples from 5 frames prior (or frame 0, whichever is higher). | [src/components/Avatar.tsx:66](src/components/Avatar.tsx:66) | 5 | |
| REQ-S005 | State-driven | WHILE executing, system SHALL determine `isBlinking` state using a seeded random value per second, triggering for the first 4 frames if probability is < 0.3. | [src/components/Avatar.tsx:75](src/components/Avatar.tsx:75) | 4, 0.3 | |
| REQ-U006 | Ubiquitous | System SHALL assign `targetImage` exclusively from `{idle, speaking, blinkIdle, blinkSpeaking}` based on boolean states of `isSpeaking` and `isBlinking`. | [src/components/Avatar.tsx:80](src/components/Avatar.tsx:80) | veado states | |
| REQ-U007 | Ubiquitous | System SHALL apply continuous `breathingScaleY` using `(Math.sin(frame / 20) + 1) / 2` adding up to 0.07 scale. | [src/components/Avatar.tsx:87](src/components/Avatar.tsx:87) | 20, 0.07 | |
| REQ-W008 | Unwanted | IF `volumeDelta` > 0.06 AND `isSpeaking`, system SHALL interpolate a `jumpScale` bouncing expansion between 1.0 and 1.15. | [src/components/Avatar.tsx:94](src/components/Avatar.tsx:94) | 0.06, 0.15, 1.15 | |

## Detailed Requirements

### Ubiquitous Requirements

#### REQ-U002: Current Volume Calculation
**Statement**: System SHALL calculate `currentVolume` by averaging 16 audio samples from the current frame.
**Source**: [src/components/Avatar.tsx:61](src/components/Avatar.tsx:61)
**Verification**: ✅ Approved — Code verifies `.reduce(sum) / length` with 16 samples.

#### REQ-U003: Speech Detection
**Statement**: System SHALL identify the Avatar as `isSpeaking` when `currentVolume` exceeds `threshold` (default 0.05).
**Source**: [src/components/Avatar.tsx:63](src/components/Avatar.tsx:63)
**Verification**: ✅ Approved — `const isSpeaking = currentVolume > threshold;` matched.

#### REQ-U004: Past Volume Calculation
**Statement**: System SHALL calculate `pastVolume` by sampling 16 audio samples from 5 frames prior (or frame 0, whichever is higher).
**Source**: [src/components/Avatar.tsx:66](src/components/Avatar.tsx:66)
**Verification**: ✅ Approved — `Math.max(0, frame - 5)` matched.

#### REQ-U006: Target Image Selection
**Statement**: System SHALL assign `targetImage` exclusively from `{idle, speaking, blinkIdle, blinkSpeaking}` based on boolean states of `isSpeaking` and `isBlinking`.
**Source**: [src/components/Avatar.tsx:80](src/components/Avatar.tsx:80)
**Verification**: ✅ Approved — Strict if/else chain covers all 4 visual states.

#### REQ-U007: Breathing Scale Algorithm
**Statement**: System SHALL apply continuous `breathingScaleY` using `(Math.sin(frame / 20) + 1) / 2` adding up to 0.07 scale.
**Source**: [src/components/Avatar.tsx:87](src/components/Avatar.tsx:87)
**Verification**: ✅ Approved — Sine wave generation math is exact.

### State-driven Requirements

#### REQ-S005: Blink Probability
**Statement**: WHILE executing, system SHALL determine `isBlinking` state using a seeded random value per second, triggering for the first 4 frames if probability is < 0.3.
**Source**: [src/components/Avatar.tsx:75](src/components/Avatar.tsx:75)
**Verification**: ✅ Approved — `< 0.3` and `< 4` frames conditions verified.

### Unwanted Requirements

#### REQ-W001: Missing Audio handling
**Statement**: IF audioData is falsy, system SHALL return the `characterDef.idle` image with `objectFit: contain`.
**Source**: [src/components/Avatar.tsx:56](src/components/Avatar.tsx:56)
**Verification**: ✅ Approved — Fast exit logic on `!audioData` block.

#### REQ-W008: Bounce Activation Math
**Statement**: IF `volumeDelta` > 0.06 AND `isSpeaking`, system SHALL interpolate a `jumpScale` bouncing expansion between 1.0 and 1.15.
**Source**: [src/components/Avatar.tsx:94](src/components/Avatar.tsx:94)
**Verification**: ✅ Approved — `isSpeaking && volumeDelta > 0.06` condition matched with clamp parameters `[0.06, 0.15], [1, 1.15]`.

## Verification Log

| REQ-ID | Verdict | Issue | Corrective Action | Evidence |
|:-------|:--------|:------|:-------------------|:---------|
| REQ-W001 | ✅ Approved | — | — | Line 56 |
| REQ-U002 | ✅ Approved | — | — | Line 61 |
| REQ-U003 | ✅ Approved | — | — | Line 63 |
| REQ-U004 | ✅ Approved | — | — | Line 66 |
| REQ-S005 | ✅ Approved | — | — | Line 75 |
| REQ-U006 | ✅ Approved | — | — | Line 80 |
| REQ-U007 | ✅ Approved | — | — | Line 87 |
| REQ-W008 | ✅ Approved | — | — | Line 94 |

## Concrete Values Summary

### Thresholds and Constants
| Value Type | Value | Source | Context |
|:-----------|:------|:-------|:--------|
| Default Threshold | 0.05 | L28 | Audio activity floor |
| Samples count | 16 | L61 | Audio granularity |
| Bounce Threshold | 0.06 | L94 | Sharp audio increase trigger |

## Question List

### Suspected Bugs
- None

### Unclear Logic
- None
