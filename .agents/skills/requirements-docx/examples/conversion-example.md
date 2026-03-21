# Conversion Example: USDM Markdown to Word

## Input (Markdown excerpt)

```markdown
# Requirements Document: User Authentication

## Metadata

| Field | Value |
|-------|-------|
| Document ID | REQ-DOC-20260215-001-user-auth |
| Version | 0.1.0 |
| Status | Draft |
| Author | John Smith |
| Created | 2026-02-15 |
| Last Updated | 2026-02-15 |

## Stakeholders

| Role | Name / Team | Concern |
|------|------------|---------|
| Product Owner | Jane Doe | Secure and fast login experience |

## Glossary

| Term | Definition |
|------|-----------|
| USDM | Universal Specification Describing Manner |

## Requirements

### REQ-001: User Authentication

**Reason**: Users must prove their identity before accessing protected resources.

**Description**: The login feature allows registered users to authenticate using email and password.

#### REQ-001-1: Credential Input and Validation

**Reason**: The system needs to collect user credentials in a structured way.

**Description**: The login form UI and client-side input handling.

##### SPEC-001: Login Form

The system shall provide a login form that accepts an email address and a password.

##### SPEC-002: Authentication Processing

WHEN the user submits valid credentials, the system shall authenticate the user and create a session within 500 ms.

### REQ-002: Authentication Security

**Reason**: Credentials must be protected from interception and brute-force attacks.

**Description**: Security measures applied to the authentication process.

#### SPEC-003: Account Lockout

IF the user fails authentication 5 consecutive times, THEN the system shall lock the account for 15 minutes.

## Traceability Matrix

| Source | REQ | SPEC | Verification Method |
|--------|-----|------|-------------------|
| Requirement | REQ-001 | SPEC-001, SPEC-002 | Test |
| Requirement | REQ-002 | SPEC-003 | Test |

## Change History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 0.1.0 | 2026-02-15 | John Smith | Initial draft |
```

## Output Word Document Structure

### Page 1: Cover Page

- **Logo placeholder**: Gray-bordered rectangle at top center
- **Title**: "Requirements Document: User Authentication" — 28pt bold, centered
- **Metadata table**: 2-column table with Document ID, Version, Status, Author, dates
- **Confidentiality**: "CONFIDENTIAL" at bottom center

### Page 2: Table of Contents

- Auto-generated TOC referencing:
  - Heading 1: Stakeholders, Glossary, Requirements, Traceability Matrix, Change History
  - Heading 2: REQ-001, REQ-002
  - Heading 3: REQ-001-1, SPEC-003
  - Heading 4: SPEC-001, SPEC-002

### Page 3+: Main Content

#### Heading Level Hierarchy

```
[Heading 1] Stakeholders
  └─ Stakeholders table (header: light blue background)

[Heading 1] Glossary
  └─ Glossary table (Term column bold)

[Heading 1] Requirements

  [Heading 2] REQ-001: User Authentication
    Reason: Users must prove their identity...
    Description: The login feature allows...

    [Heading 3] REQ-001-1: Credential Input and Validation
      Reason: The system needs to collect...
      Description: The login form UI and...

      [Heading 4] SPEC-001: Login Form
        The system **shall** provide a login form that accepts an email address and a password.

      [Heading 4] SPEC-002: Authentication Processing
        **WHEN** the user submits valid credentials, the system **shall** authenticate the user and create a session within 500 ms.

  [Heading 2] REQ-002: Authentication Security
    Reason: Credentials must be protected...
    Description: Security measures applied...

    [Heading 3] SPEC-003: Account Lockout
      **IF** the user fails authentication 5 consecutive times, **THEN** the system **shall** lock the account for 15 minutes.

[Heading 1] Traceability Matrix
  └─ 4-column table

[Heading 1] Change History
  └─ 4-column table
```

#### EARS Keyword Formatting Detail

In SPEC-002:
- "**WHEN**" → Bold TextRun
- " the user submits valid credentials, the system " → Normal TextRun
- "**shall**" → Bold TextRun
- " authenticate the user and create a session within 500 ms." → Normal TextRun

In SPEC-003:
- "**IF**" → Bold TextRun
- " the user fails authentication 5 consecutive times, " → Normal TextRun
- "**THEN**" → Bold TextRun
- " the system " → Normal TextRun
- "**shall**" → Bold TextRun
- " lock the account for 15 minutes." → Normal TextRun

### Headers and Footers (Main Content)

- **Header**: "REQ-DOC-20260215-001-user-auth" (left) + "User Authentication" (right)
- **Footer**: "Page X of Y" (center)
