---
trigger: always_on
---

# GIT WORKFLOW RULES (Strict Enforcement)

## Branch Rules

1. **main**: Production release branch.
   - ❌ NO direct commits allowed.
   - ✅ Merge via Pull Request from `develop` ONLY.
2. **develop**: Integration branch.
   - ❌ NO direct commits allowed.
   - ✅ Merge via Pull Request from feature branches ONLY.
3. **Feature Branches**: For all work (features/fixes).
   - ✅ Create new branch from `develop`.

## Workflow

1. Start work: Create a feature branch from `develop`.
2. Finish work: Create PR to `develop`.
3. Verify: Merge to `main` via PR after `develop` verification.

## Agent Behavior

- The Agent MUST NOT attempt to commit directly to `main` or `develop`.
- If requested to do so, the Agent MUST STOP and ask for a feature branch.
