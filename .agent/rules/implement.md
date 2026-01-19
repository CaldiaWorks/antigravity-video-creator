---
trigger: always_on
---

# IMPLEMENTATION START PROTOCOL (Strict Enforcement)

## 🚨 CRITICAL: Branch Verification First

**Before editing ANY file, creating ANY artifact, or running ANY code modification command:**

1.  **CHECK CURRENT BRANCH**:
    - ALWAYS run `git branch --show-current` as your **very first action** when starting an implementation task.
2.  **FORBIDDEN BRANCHES**:
    - ❌ **NEVER** edit files directly on `main`, `master`, or `develop`.
    - ❌ **NEVER** run build commands or tests that generate artifacts on `main`, `master`, or `develop` if it risks dirtying the workspace (unless explicitly for verification of that branch).

3.  **REQUIRED ACTION**:
    - If you are on `main` or `develop`:
      1.  **STOP** immediately.
      2.  **CREATE** a new feature branch (e.g., `git checkout -b feat/task-name develop`).
      3.  **VERIFY** the switch was successful.
      4.  **ONLY THEN** proceed with editing or creating files.

## Summary Checklist

- [ ] Checked `git branch --show-current`?
- [ ] Is it a feature branch (`feat/*`, `fix/*`, `chore/*`)?
- [ ] If `main` or `develop` -> **ABORT AND SWITCH**.

**Adhere to this protocol to prevent accidental pollution of protected branches.**
