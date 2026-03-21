# GitHub Issues USDM Mapping Guide

Map USDM hierarchy to GitHub Issues using sub-issues and labels.

## Element Mapping

| USDM Element | GitHub Issue Representation |
|-------------|---------------------------|
| Requirement (REQ) | Issue with label `usdm:req` |
| Reason | Section in Issue body |
| Description | Section in Issue body |
| Specification (SPEC) | Issue with label `usdm:spec`, as sub-issue of its parent REQ |
| REQ → REQ (decomposition) | Sub-issue relationship between REQ Issues |
| REQ → SPEC | Sub-issue relationship |

## Label Convention

| Label | Color | Description |
|-------|-------|-------------|
| `usdm:req` | `#0075ca` | Requirement |
| `usdm:spec` | `#e4e669` | Specification |

## Title Convention

| Element | Format | Example |
|---------|--------|---------|
| Requirement | `REQ-{NNN}: {Title}` | `REQ-001: User Authentication` |
| Sub-requirement | `REQ-{NNN}-{N}: {Title}` | `REQ-001-1: Session Management` |
| Specification | `SPEC-{NNN}: {Title}` | `SPEC-001: Login Form` |

## Issue Body Templates

### REQ Issue

```markdown
## Reason

{Why this requirement exists — business value, regulation, user need.}

## Description

{Context, scope, and constraints.}

## Source

- Document: {REQ-DOC-YYYYMMDD-NNN-short-name}
- Ticket: {original ticket reference, if any}
```

### SPEC Issue

```markdown
## Specification

{EARS-formatted specification using "shall".}

## EARS Pattern

{Ubiquitous / Event-driven / State-driven / Unwanted behavior / Optional feature / Complex}

## Verification Method

{Test / Inspection / Analysis / Demonstration}

## Parent Requirement

{REQ-NNN}: {Title}
```

## CLI Commands

### Create labels (one-time setup)

```bash
gh label create "usdm:req" --color 0075ca --description "USDM Requirement"
gh label create "usdm:spec" --color e4e669 --description "USDM Specification"
```

### Create a REQ Issue

```bash
gh issue create --title "REQ-001: User Authentication" --label "usdm:req" --body "$(cat <<'EOF'
## Reason

Users must prove their identity before accessing protected resources.

## Description

The login feature allows registered users to authenticate using email and password.

## Source

- Document: REQ-DOC-20260215-001-user-auth
EOF
)"
```

### Create a SPEC Issue as sub-issue of a REQ

```bash
gh sub-issue create --parent <REQ-ISSUE-NUMBER> --title "SPEC-001: Login Form" --label "usdm:spec" --body "$(cat <<'EOF'
## Specification

The system shall provide a login form that accepts an email address and a password.

## EARS Pattern

Ubiquitous

## Verification Method

Test

## Parent Requirement

REQ-001: User Authentication
EOF
)"
```

### Create a sub-requirement as sub-issue of a parent REQ

```bash
gh sub-issue create --parent <PARENT-REQ-ISSUE-NUMBER> --title "REQ-001-1: Session Management" --label "usdm:req" --body "$(cat <<'EOF'
## Reason

Authenticated state must persist across requests.

## Description

Session creation and token lifecycle after successful authentication.

## Source

- Document: REQ-DOC-20260215-001-user-auth
EOF
)"
```

### Add an existing Issue as sub-issue

```bash
gh sub-issue add <PARENT-ISSUE-NUMBER> <CHILD-ISSUE-NUMBER>
```

### List sub-issues of an Issue

```bash
gh sub-issue list <ISSUE-NUMBER>
```

## Conversion Workflow: USDM Document to GitHub Issues

1. **Create labels** if they do not exist yet.
2. **Create top-level REQ Issues** for each root requirement.
3. **Create sub-requirement Issues** as sub-issues of their parent REQ.
4. **Create SPEC Issues** as sub-issues of their parent REQ (or sub-REQ).
5. **Verify** the hierarchy with `gh sub-issue list`.

### Ordering

Process the USDM document top-down: create parent Issues before children, since `gh sub-issue create` requires the parent Issue number.
