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

## Naming Conventions & Content Rules

1. **Branches**: Use `type/kebab-case-description`
   - `feat/user-login`, `fix/memory-leak`, `chore/setup`, `docs/readme`
2. **Commits**: Use Conventional Commits (`type: subject`)
   - **Subject (Line 1)**: Max 50 chars. Use imperative mood (e.g., "Add", not "Added").
   - **Body (Line 3+)**: Required for non-trivial changes.
     - Explain **WHAT** changed and **WHY** (context/intent), not just "updated files".
     - Reference issues at the end (e.g., "Closes #123").

## Workflow

1. Start work: Create a feature branch from `develop`.
2. Save work (WIP): Commit changes IMMEDIATELY after modification.
   - ✅ Rule: NEVER leave a file in a modified state across multiple turns.
   - ✅ Trigger: Before answering user questions or executing the next step, EXECUTE `git commit`.
   - ✅ Format: Use Conventional Commits. For incomplete work, use `wip: ...`.
3. Submit: Create PR to `develop` **ONLY when explicitly requested by the user**.
   - ❌ DO NOT auto-create PRs after commits. Wait for user confirmation.
   - ✅ PR title must follow conventional commits.
   - ✅ PR body should reference related issues.
   - ⚠️ **Formatting**: When creating PRs via CLI, NEVER use literal `\n` in the string. Use `printf` or a body file to ensure newlines are rendered correctly.
4. Verify: Merge to `main` via PR after `develop` verification.

## Agent Behavior

- **PROHIBITED ACTIONS**: The Agent MUST NOT execute destructive git commands (`git reset`, `git clean`, `git checkout .`, `git restore`) without explicit user command.
- The Agent MUST NOT attempt to commit directly to `main` or `develop`.
- If requested to do so, the Agent MUST STOP and ask for a feature branch.
- The Agent SHOULD strictly follow the naming conventions and document the "WHY" in commit bodies.
- When generating PRs via CLI, the Agent MUST ensure multi-line bodies are correctly formatted (e.g. using `gh pr create --body "$(printf 'Line 1\nLine 2')"` or `--body-file`).
