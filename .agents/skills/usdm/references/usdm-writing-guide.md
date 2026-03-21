# USDM Writing Guide

## ID Naming Convention

| Level        | Format       | Example   |
|-------------|-------------|-----------|
| Requirement | REQ-{NNN}   | REQ-001   |
| Reason      | (inline)    | —         |
| Description | (inline)    | —         |
| Specification | SPEC-{NNN} | SPEC-001  |

- ID is sequential within a single document.
- Sub-requirements use hierarchical IDs: REQ-001 → REQ-001-1, REQ-001-2, etc.
- Child specifications reference their parent requirement: SPEC-001 belongs to REQ-001's scope if defined under it.

## Hierarchy Rules

```
Requirement (REQ)
├── Reason       — WHY this requirement exists
├── Description  — WHAT context / scope / constraints
├── Requirement (REQ) — sub-requirement (recursive decomposition)
│   ├── Reason
│   ├── Description
│   ├── Requirement ...
│   └── Specification (SPEC)
└── Specification (SPEC)
    ├── Specification (SPEC) ...  — nested allowed up to 2 levels
    └── ...
```

1. Every requirement MUST have at least one reason.
2. Every requirement MUST have at least one specification, either directly or via sub-requirements.
3. A requirement MAY contain sub-requirements for recursive decomposition.
4. When a requirement is decomposed into sub-requirements, each sub-requirement MUST have its own reason and at least one specification.
5. A specification MAY have child specifications, but avoid nesting beyond 2 levels.
6. Reason answers "why"; specification answers "how" in verifiable terms.

## Decomposition Criteria

When a requirement is too broad, apply these 4 criteria **in order** to decompose it into sub-requirements. Start with temporal to establish the normal flow, then use the remaining criteria to fill gaps.

| # | Criterion | Focus | When to Use |
|---|-----------|-------|-------------|
| 1 | **Temporal** | Verbs and process steps along the time axis | First pass — extract the happy-path sequence (input → process → output). |
| 2 | **Structural** | UI elements, physical components, data entities | Second pass — capture component variations outside the main flow. |
| 3 | **State-based** | System states and transitions (idle, active, error) | Third pass — cover error handling, constraints, and edge cases. |
| 4 | **Common** | Processing shared across multiple requirements | Final pass — extract cross-cutting concerns (logging, auth, validation). |

**Strategy**: "Establish the normal flow with temporal decomposition first, then cover abnormal flows exhaustively with the remaining three criteria."

## Ambiguity Blacklist

The following words are **prohibited** in specifications. Replace them with measurable, verifiable expressions.

| Banned Word | Problem | Replace With |
|------------|---------|-------------|
| appropriate / suitable | Subjective | Specific criteria or threshold |
| fast / slow | Relative | Concrete metric (e.g., "within 200ms") |
| easy / simple | Subjective | Specific steps or measurable usability metric |
| etc. / and so on | Incomplete | Exhaustive list or explicit scope |
| some / several | Vague quantity | Exact number or range |
| as needed / if necessary | Undefined trigger | Explicit condition (use EARS WHEN/IF) |
| user-friendly | Subjective | Measurable usability criteria |
| flexible | Undefined scope | Specific extension points |
| support | Ambiguous action | Concrete behavior (accept, process, output) |
| handle | Ambiguous action | Specific error response or processing step |
| properly / correctly | Tautological | Expected output or success criteria |
| reasonable | Subjective | Quantified bounds |
| efficiently | Relative | Concrete performance metric |
| should (in specs) | Weak obligation | "shall" (mandatory) or "may" (optional) |

## Quality Criteria

### Requirement Level
- [ ] States a stakeholder need, not a solution
- [ ] Has at least one documented reason
- [ ] Reason is NOT tautological (e.g., "to implement this feature" is prohibited — state business value or user benefit)
- [ ] Is traceable to a source (ticket, interview, regulation)
- [ ] Uses domain vocabulary consistently

### Specification Level
- [ ] Is verifiable (test, inspection, analysis, or demonstration)
- [ ] Contains no ambiguity blacklist words
- [ ] Uses "shall" for mandatory, "may" for optional
- [ ] Specifies a single behavior (one "shall" per specification)
- [ ] Follows EARS pattern when applicable
- [ ] Includes measurable acceptance criteria where possible

### Document Level
- [ ] All requirements have unique IDs
- [ ] Traceability matrix is complete (REQ ↔ SPEC ↔ Source)
- [ ] No orphan specifications (every SPEC belongs to a REQ)
- [ ] No orphan requirements (every REQ has at least one SPEC)
- [ ] Cross-references are valid
- [ ] Stakeholder review sign-off fields are present

## Review Checklist

When reviewing a USDM document, check:

1. **Completeness**: Are all known requirements captured?
2. **Consistency**: Do requirements contradict each other?
3. **Correctness**: Do specifications accurately reflect requirements?
4. **Traceability**: Can every specification trace back to a requirement and source?
5. **Verifiability**: Can every specification be tested?
6. **Ambiguity**: Are any blacklisted words present?
7. **Granularity**: Are specifications atomic (one behavior each)?

## Writing Tips

- Start requirements from the stakeholder's perspective: "The user needs to..."
- Write reasons as causal statements: "Because... / In order to..."
- Write specifications in EARS format where applicable.
- Prefer active voice: "The system shall display..." not "The message is displayed..."
- One specification = one testable behavior.

## Derivative Development (XDDP)

When using USDM for derivative development (modifying existing systems), apply additional practices from XDDP (eXtreme Derivative Development Process).

### Risks Specific to Derivative Development

Developers work under **partial understanding** — they cannot read the entire existing codebase. This causes:
- Misidentification of change locations and missed impact areas.
- Degradation (regression) of existing functionality.
- Divergent understanding across team members.

### XDDP 3-Document Set

USDM is one part of a 3-document set in XDDP:

| # | Document | Role |
|---|----------|------|
| 1 | **Change Request Specification (USDM)** | WHAT to change — requirements and specifications |
| 2 | **Traceability Matrix (TM)** | WHERE to change — maps SPEC to source code functions |
| 3 | **Change Design Document** | HOW to change — detailed modification design |

The TM in XDDP maps specifications to **specific function names** (e.g., `xxx_xxx_xxx()`), not just modules.

### Before / After Specification Format

For change specifications in derivative development, describe changes using Before/After contrast:

```
**Before**: The system displays error code only.
**After**: The system shall display error code and a user-readable message describing the cause.
```

Benefits:
- Change scope becomes quantifiable (lines changed, difficulty, impact spread).
- Specifications directly serve as test expected-values for QA.
