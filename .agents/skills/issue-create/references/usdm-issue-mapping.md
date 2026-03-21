# USDM to GitHub Issues Mapping Guide

Map USDM requirements hierarchy to GitHub Issues using sub-issues.

## Element Mapping

| USDM Element | GitHub Representation |
|-------------|----------------------|
| Requirement (REQ-NNN) | Issue with label `usdm:req`, as sub-issue of parent issue |
| Sub-requirement (REQ-NNN-N) | Issue with label `usdm:req`, as sub-issue of parent REQ issue |
| Reason | Section in issue body |
| Description | Section in issue body |
| Specification (SPEC-NNN) | Table row in parent requirement's issue body |

Specifications are **not** created as separate issues. They are included in the requirement issue body as a table, making each issue self-contained.

## Label Convention

| Label | Color | Description |
|-------|-------|-------------|
| `usdm:req` | `#0075ca` | USDM Requirement |

Create the label if it does not exist:

```bash
gh label create "usdm:req" --color 0075ca --description "USDM Requirement"
```

## Title Convention

| Element | Format | Example |
|---------|--------|---------|
| Top-level requirement | `REQ-{NNN}: {Title}` | `REQ-001: User Authentication` |
| Sub-requirement | `REQ-{NNN}-{N}: {Title}` | `REQ-001-1: Session Management` |

## Issue Body Template

```markdown
## Reason

{Why this requirement exists -- business value, regulation, user need.}

## Description

{Context, scope, and constraints.}

## Specifications

| SPEC ID | Specification |
|---------|--------------|
| SPEC-NNN | {Specification text using "shall".} |

## Source

- Document: [{REQ-DOC-ID}]({link-to-document-on-GitHub}) § {REQ-ID}
- Ticket: #{parent-issue-number}
```

## Hierarchy Construction

### Processing Order

Process the USDM document top-down: create parent issues before children because `gh sub-issue add` requires the parent issue number.

1. Create top-level REQ issues as sub-issues of the specified parent issue.
2. Create sub-requirement issues as sub-issues of their parent REQ issue.

### CLI Commands

Create a requirement issue:

```bash
gh issue create --title "REQ-001: User Authentication" --label "usdm:req" --body "$(cat <<'EOF'
## Reason
...
## Description
...
## Specifications
| SPEC ID | Specification |
|---------|--------------|
| SPEC-001 | The system shall ... |
## Source
- Document: [REQ-DOC-20260223-001](https://github.com/owner/repo/blob/main/.docs/REQ-DOC-20260223-001.md) § REQ-001
- Ticket: #41
EOF
)"
```

Link as sub-issue:

```bash
gh sub-issue add <parent-issue-number> <new-issue-number>
```

### Verification

After all issues are created, verify the hierarchy:

```bash
gh sub-issue list <parent-issue-number>
```
