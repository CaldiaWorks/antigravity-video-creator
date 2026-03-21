# Hidden Verb Discovery Techniques

Stakeholder requests often hide real requirements behind vague or nominalized language. This guide provides systematic techniques to uncover hidden verbs—actionable behaviors buried in abstract statements.

## Technique 1: Nominalization Detection

Nominalizations convert verbs into nouns, hiding the action.

| Nominalization | Hidden Verb | Recovered Requirement |
|---------------|------------|----------------------|
| "authentication" | authenticate | The system shall authenticate the user with... |
| "data management" | create, read, update, delete | The system shall allow the user to create/read/update/delete... |
| "notification" | notify | The system shall notify the user when... |
| "validation" | validate | The system shall validate the input against... |
| "configuration" | configure | The administrator shall be able to configure... |
| "migration" | migrate | The system shall migrate data from... |
| "integration" | send, receive, transform | The system shall send/receive data to/from... |

**Detection rule**: If a noun can be rephrased as "the act of [verb]-ing", it is likely a nominalization.

## Technique 2: Compound Statement Splitting

A single statement containing "and" or "or" often hides multiple requirements.

**Before** (1 vague requirement):
> The system manages user accounts and sends notifications.

**After** (2+ specific requirements):
> - REQ-001: The system shall allow administrators to create user accounts.
> - REQ-002: The system shall allow administrators to deactivate user accounts.
> - REQ-003: The system shall send email notifications when an account status changes.

**Rule**: Split at every "and" / "or" and evaluate each clause independently.

## Technique 3: Passive Voice to Active Voice

Passive voice hides the actor (who/what performs the action).

| Passive | Active (Actor Recovered) |
|---------|------------------------|
| "Data is stored" | The system shall store data in... |
| "Errors are handled" | The system shall display an error message when... |
| "Reports are generated" | The system shall generate a report containing... |
| "Access is controlled" | The system shall restrict access based on... |

**Detection rule**: Look for "is/are [past participle]" patterns without an explicit subject.

## Technique 4: Adjective Expansion

Adjectives often conceal entire behavioral requirements.

| Adjective | Hidden Requirements |
|-----------|-------------------|
| "secure" | encrypt data, authenticate users, authorize actions, audit access |
| "fast" | respond within N ms, process N transactions/sec |
| "reliable" | retry on failure, failover to backup, achieve N% uptime |
| "scalable" | handle N concurrent users, auto-scale when load exceeds threshold |
| "user-friendly" | complete task in N steps, provide contextual help, follow accessibility guidelines |

**Rule**: Replace every adjective with concrete, measurable behaviors.

## Technique 5: Implied Exception Discovery

Happy-path descriptions hide error/edge-case requirements.

For each requirement, ask:
1. **What if the input is invalid?** → Validation specification
2. **What if the external service is unavailable?** → Timeout / retry specification
3. **What if the user cancels midway?** → Rollback / cleanup specification
4. **What if the data already exists?** → Conflict resolution specification
5. **What if permissions are insufficient?** → Authorization error specification

Use EARS "Unwanted behavior" pattern (`IF <condition>, THEN the system shall...`) for these cases.

## Technique 6: Temporal Verb Discovery

Words expressing time or sequence often hide event-driven or state-driven requirements.

| Temporal Phrase | EARS Pattern | Example |
|----------------|-------------|---------|
| "after login" | Event-driven (WHEN) | WHEN the user logs in, the system shall... |
| "during processing" | State-driven (WHILE) | WHILE the system is processing, the system shall... |
| "before submission" | Event-driven (WHEN) | WHEN the user initiates submission, the system shall first... |
| "periodically" | Event-driven (WHEN) | WHEN the scheduled interval elapses, the system shall... |

## Application Workflow

1. Read the source text (ticket, interview notes, email).
2. Highlight all nouns, adjectives, and passive constructions.
3. Apply techniques 1–6 systematically.
4. For each discovered verb, draft a requirement-specification pair.
5. Validate: does the specification cover the original intent?
6. Check for implied exceptions (Technique 5) on every requirement.
