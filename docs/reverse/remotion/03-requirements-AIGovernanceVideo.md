# EARS Requirements: AIGovernanceVideo

**Analysis Date**: 2026-03-21
**Source File**: [src/AIGovernanceVideo.tsx](src/AIGovernanceVideo.tsx)
**Requirements Extracted**: 3
**Verification**: All requirements verified against source

## Requirements Table

| REQ-ID | EARS Type | Requirement | Source | Concrete Values | Notes |
|:-------|:----------|:------------|:-------|:----------------|:------|
| REQ-U001 | Ubiquitous | System SHALL calculate individual scene duration boundaries by computing `Math.ceil(sec * FPS) + 15` frames. | [src/AIGovernanceVideo.tsx:30](src/AIGovernanceVideo.tsx:30) | 30 FPS, 15 frames | |
| REQ-U002 | Ubiquitous | System SHALL calculate total frame duration by reducing the sum of all padded scene frame limits. | [src/AIGovernanceVideo.tsx:34](src/AIGovernanceVideo.tsx:34) | | |
| REQ-U003 | Ubiquitous | System SHALL yield consecutive `Sequence` elements mapping continuous frames according to the defined `sceneDurationFrames`. | [src/AIGovernanceVideo.tsx:82](src/AIGovernanceVideo.tsx:82) | | |

## Detailed Requirements

### Ubiquitous Requirements

#### REQ-U001: Scene Duration Computation
**Statement**: System SHALL calculate individual scene duration boundaries by computing `Math.ceil(sec * FPS) + 15` frames.
**Source**: [src/AIGovernanceVideo.tsx:30](src/AIGovernanceVideo.tsx:30)
**Verification**: ✅ Approved — Math matches code definition mapping base seconds.

#### REQ-U002: Total Master Duration
**Statement**: System SHALL calculate total frame duration by reducing the sum of all padded scene frame limits.
**Source**: [src/AIGovernanceVideo.tsx:34](src/AIGovernanceVideo.tsx:34)
**Verification**: ✅ Approved — `(a, b) => a + b` on `sceneDurationFrames`.

#### REQ-U003: Continuous Sequence Mapping
**Statement**: System SHALL yield consecutive `Sequence` elements mapping continuous frames according to the defined `sceneDurationFrames`.
**Source**: [src/AIGovernanceVideo.tsx:82](src/AIGovernanceVideo.tsx:82)
**Verification**: ✅ Approved — `from={from}` tracks iteratively via `currentFrame += duration`.

## Verification Log

| REQ-ID | Verdict | Issue | Corrective Action | Evidence |
|:-------|:--------|:------|:-------------------|:---------|
| REQ-U001 | ✅ Approved | — | — | Line 30 |
| REQ-U002 | ✅ Approved | — | — | Line 34 |
| REQ-U003 | ✅ Approved | — | — | Line 82 |

## Concrete Values Summary

### Thresholds and Constants
| Value Type | Value | Source | Context |
|:-----------|:------|:-------|:--------|
| FPS | 30 | L25 | Global Remotion FPS |
| PADDING_FRAMES | 15 | L27 | End padding logic |

## Question List
- None
