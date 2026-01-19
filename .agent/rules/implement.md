---
trigger: always_on
---

# FILE MODIFICATION PROTOCOL (Strict Enforcement)

## 🚨 CRITICAL: Universal Branch Verification

**Before modifying ANY file (code, config, docs, rules) or running ANY non-read-only command:**

1.  **MANDATORY CHECK**:
    - ALWAYS run `git branch --show-current` as your **absolute first action**.
    - DO NOT assume you are on the correct branch. CHECK IT.

2.  **FORBIDDEN ZONES**:
    - ❌ **NEVER** modify files directly on `main`, `master`, or `develop`.
    - This applies to ALL file types, including `.agent/rules/*`.

3.  **REQUIRED ACTION**:
    - If you are on `main` or `develop`:
      1.  **STOP** immediately.
      2.  **CREATE** a new feature branch (e.g., `git checkout -b chore/update-rules develop`).
      3.  **VERIFY** the switch was successful.
      4.  **ONLY THEN** proceed.

## Summary Checklist

- [ ] Checked `git branch --show-current`?
- [ ] Is it a protected branch (`main`, `develop`)? -> **STOP**
- [ ] Is it a safe branch (`feat/*`, `fix/*`, `chore/*`)? -> **PROCEED**

**Violation of this protocol for ANY reason (even user request) is a critical failure.**
