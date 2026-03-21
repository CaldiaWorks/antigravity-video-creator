# EARS Patterns Reference

EARS (Easy Approach to Requirements Syntax) defines 6 sentence patterns that eliminate ambiguity in specifications. Each pattern uses specific keywords to make the trigger condition and expected behavior explicit.

---

## Pattern 1: Ubiquitous

**Template**: `The <system> shall <response>.`

**When to use**: The behavior is always active with no trigger or condition. Applies universally.

**Keywords**: None (no WHEN/WHILE/IF/WHERE).

**Examples**:
- The system shall encrypt all data at rest using AES-256.
- The API shall return responses in JSON format.
- The system shall log all authentication attempts with a timestamp, user ID, and result.

**Common mistakes**:
- Using ubiquitous when a trigger actually exists → use Event-driven instead.
- Combining multiple behaviors in one statement → split into separate specifications.

---

## Pattern 2: Event-Driven

**Template**: `WHEN <trigger>, the <system> shall <response>.`

**When to use**: The behavior is triggered by a specific, detectable event.

**Keywords**: `WHEN`

**Examples**:
- WHEN the user clicks the "Submit" button, the system shall validate all form fields.
- WHEN a new order is placed, the system shall send a confirmation email to the customer.
- WHEN the session token expires, the system shall redirect the user to the login page.
- WHEN the file upload completes, the system shall display a success notification for 5 seconds.

**Common mistakes**:
- Confusing events with states (events are instantaneous; states are sustained) → use State-driven for continuous conditions.
- Omitting the specific trigger → "WHEN something happens" is too vague.

---

## Pattern 3: State-Driven

**Template**: `WHILE <state>, the <system> shall <response>.`

**When to use**: The behavior applies continuously as long as a condition holds.

**Keywords**: `WHILE`

**Examples**:
- WHILE the system is in maintenance mode, the system shall display a maintenance page to all users.
- WHILE the battery level is below 20%, the device shall disable background sync.
- WHILE the user is on a free plan, the system shall limit file uploads to 10 MB per file.
- WHILE network connectivity is unavailable, the application shall queue outgoing requests locally.

**Common mistakes**:
- Using WHILE for one-time events → use WHEN for discrete triggers.
- Ambiguous state definition → clearly define state entry/exit conditions.

---

## Pattern 4: Unwanted Behavior

**Template**: `IF <condition>, THEN the <system> shall <response>.`

**When to use**: Handling error conditions, failures, edge cases, or undesired situations.

**Keywords**: `IF ... THEN`

**Examples**:
- IF the database connection fails, THEN the system shall retry the connection 3 times at 5-second intervals.
- IF the user enters an invalid email format, THEN the system shall display "Please enter a valid email address."
- IF the payment gateway returns an error, THEN the system shall cancel the order and notify the user.
- IF available disk space falls below 1 GB, THEN the system shall send an alert to the operations team.

**Common mistakes**:
- Using IF-THEN for normal flows → use WHEN for expected events.
- Omitting the specific recovery action → "handle the error" is not a valid response.

---

## Pattern 5: Optional Feature

**Template**: `WHERE <feature>, the <system> shall <response>.`

**When to use**: The behavior only applies when a specific feature or configuration is enabled.

**Keywords**: `WHERE`

**Examples**:
- WHERE two-factor authentication is enabled, the system shall require a one-time code after password entry.
- WHERE the premium plan is active, the system shall allow unlimited file uploads.
- WHERE the accessibility mode is enabled, the system shall provide screen reader descriptions for all images.
- WHERE the audit logging module is installed, the system shall record all data modification events.

**Common mistakes**:
- Using WHERE when the feature is always present → use Ubiquitous instead.
- Confusing with WHILE (WHERE = feature flag; WHILE = runtime state).

---

## Pattern 6: Complex

**Template**: Combination of keywords from patterns 2–5.

**When to use**: The behavior requires multiple conditions (event + state, event + feature, etc.).

**Examples**:

**WHILE + WHEN**:
- WHILE the system is in offline mode, WHEN the user creates a new record, the system shall store the record locally and queue it for synchronization.

**IF + WHEN**:
- IF the user has exceeded the rate limit, THEN WHEN the user sends a new API request, the system shall return HTTP 429 with a Retry-After header.

**WHERE + WHEN**:
- WHERE push notifications are enabled, WHEN a new message arrives, the system shall display a push notification with the sender name and message preview.

**WHERE + IF**:
- WHERE the auto-save feature is enabled, IF the application crashes, THEN the system shall recover the last auto-saved version on restart.

**Common mistakes**:
- Over-complicating by combining too many keywords → if more than 2 keywords are needed, consider splitting into separate specifications.
- Incorrect keyword ordering → maintain logical flow: WHERE/WHILE → WHEN/IF → shall.

---

## Pattern Selection Flowchart

```
Is there a trigger event?
├── Yes: Is there also a sustained condition?
│   ├── Yes → Complex (WHILE + WHEN)
│   └── No → Event-driven (WHEN)
├── No: Is there a sustained condition?
│   ├── Yes → State-driven (WHILE)
│   └── No: Is it an error/failure scenario?
│       ├── Yes → Unwanted behavior (IF-THEN)
│       └── No: Is it tied to an optional feature?
│           ├── Yes → Optional feature (WHERE)
│           └── No → Ubiquitous
```

## Keyword Summary

| Keyword | Meaning | Trigger Type |
|---------|---------|-------------|
| (none) | Always applies | Unconditional |
| WHEN | On event occurrence | Discrete event |
| WHILE | During state | Continuous condition |
| IF...THEN | On unwanted condition | Error / edge case |
| WHERE | Feature/config active | Feature flag |
| Combined | Multiple conditions | Compound |
