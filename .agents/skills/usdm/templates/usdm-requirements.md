# Requirements Document: {Title}

## Metadata

| Field | Value |
|-------|-------|
| Document ID | REQ-DOC-{YYYYMMDD}-{NNN}-{short-name} |
| Version | 0.1.0 |
| Status | Draft |
| Author | {author} |
| Created | {YYYY-MM-DD} |
| Last Updated | {YYYY-MM-DD} |

## Ticket References

| Source | ID | Title |
|--------|-----|-------|
| {GitHub / Asana / Jira} | {ticket-id} | {ticket-title} |

## Stakeholders

| Role | Name / Team | Concern |
|------|------------|---------|
| {role} | {name} | {primary concern} |

## Glossary

| Term | Definition |
|------|-----------|
| {term} | {definition} |

---

## Requirements

### REQ-001: {Requirement Title}

**Reason**: {Why this requirement exists — business value, regulation, user need.}

**Description**: {Context, scope, and constraints for this requirement.}

<!-- Sub-requirements: use when REQ-001 is too broad and needs decomposition -->

#### REQ-001-1: {Sub-Requirement Title}

**Reason**: {Why this sub-requirement exists.}

**Description**: {Scope of this sub-requirement.}

##### SPEC-001: {Specification Title}

{EARS-formatted specification using "shall" for mandatory behavior.}

<!-- Direct specifications: use for behaviors that belong to REQ-001 without further decomposition -->

#### SPEC-002: {Specification Title}

{Specification.}

---

### REQ-002: {Requirement Title}

**Reason**: {Why.}

**Description**: {What context.}

#### SPEC-003: {Specification Title}

{Specification.}

---

## Traceability Matrix

| Source | REQ | SPEC | Verification Method |
|--------|-----|------|-------------------|
| {ticket/interview/regulation} | REQ-001 | SPEC-001, SPEC-002 | {Test / Inspection / Analysis / Demo} |
| {source} | REQ-002 | SPEC-003 | {method} |

## Open Questions

| # | Question | Raised By | Status |
|---|----------|-----------|--------|
| 1 | {question} | {name} | Open |

## Change History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 0.1.0 | {YYYY-MM-DD} | {author} | Initial draft |
