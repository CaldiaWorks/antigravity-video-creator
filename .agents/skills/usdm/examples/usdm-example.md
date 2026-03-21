# USDM Example: Ambiguous Request to Structured Requirements

## Source (Ambiguous User Request)

> "We need a user login feature. It should be secure and fast. Also handle errors properly."

## Analysis: Hidden Verb Discovery

| Fragment | Technique | Discovered Verbs |
|----------|-----------|-----------------|
| "login feature" | Nominalization | authenticate, redirect, create session |
| "secure" | Adjective expansion | encrypt, validate credentials, lock on failure |
| "fast" | Adjective expansion | respond within threshold |
| "handle errors properly" | Passive + adjective | display error message, log error, limit attempts |

## USDM Decomposition

---

### REQ-001: User Authentication

**Reason**: Users must prove their identity before accessing protected resources, in order to prevent unauthorized data access.

**Description**: The login feature allows registered users to authenticate using email and password via the web application's login page. This requirement decomposes into credential input, session management, and post-login navigation.

#### REQ-001-1: Credential Input and Validation

**Reason**: The system needs to collect user credentials in a structured way, in order to pass them to the authentication backend.

**Description**: The login form UI and client-side input handling.

##### SPEC-001: Login Form

The system shall provide a login form that accepts an email address and a password.

#### REQ-001-2: Session Management

**Reason**: Authenticated state must persist across requests, in order to avoid requiring re-authentication on every page.

**Description**: Session creation and token lifecycle after successful authentication.

##### SPEC-002: Authentication Processing

WHEN the user submits valid credentials, the system shall authenticate the user and create a session within 500 ms.

##### SPEC-003: Session Token

WHEN authentication succeeds, the system shall issue a session token with a 24-hour expiry.

#### SPEC-004: Redirect After Login

WHEN authentication succeeds, the system shall redirect the user to the dashboard page.

---

### REQ-002: Authentication Security

**Reason**: Credentials must be protected from interception and brute-force attacks, in order to comply with security best practices and protect user data.

**Description**: Security measures applied to the authentication process.

#### SPEC-005: Password Encryption

The system shall transmit passwords over TLS 1.2 or higher.

#### SPEC-006: Password Hashing

The system shall store passwords hashed with bcrypt (cost factor >= 12).

#### SPEC-007: Account Lockout

IF the user fails authentication 5 consecutive times, THEN the system shall lock the account for 15 minutes.

#### SPEC-008: Lockout Notification

WHEN an account is locked due to failed attempts, the system shall send a notification email to the registered address.

---

### REQ-003: Authentication Error Handling

**Reason**: Users need clear feedback when login fails, in order to take corrective action without exposing security-sensitive details.

**Description**: Error behavior for various authentication failure scenarios.

#### SPEC-009: Invalid Credentials Message

IF the user submits invalid credentials, THEN the system shall display "Invalid email or password" without indicating which field is incorrect.

#### SPEC-010: Empty Field Validation

IF the user submits the login form with an empty email or password field, THEN the system shall display a validation error on the empty field before sending a request to the server.

#### SPEC-011: Server Error

IF the authentication service is unavailable, THEN the system shall display "Service temporarily unavailable. Please try again later." and log the error with a timestamp and correlation ID.

---

## Traceability Matrix

| Source Fragment | REQ | SPEC |
|----------------|-----|------|
| "login feature" | REQ-001 → REQ-001-1 | SPEC-001 |
| "login feature" | REQ-001 → REQ-001-2 | SPEC-002, SPEC-003 |
| "login feature" | REQ-001 | SPEC-004 |
| "secure" | REQ-002 | SPEC-005, SPEC-006, SPEC-007, SPEC-008 |
| "handle errors properly" | REQ-003 | SPEC-009, SPEC-010, SPEC-011 |
| "fast" | REQ-001 → REQ-001-2 | SPEC-002 (500ms threshold) |
