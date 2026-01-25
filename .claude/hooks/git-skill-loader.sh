#!/bin/bash

# Load git-related skill when git operations are detected in user prompt
# This hook reads the user prompt from stdin and checks for git-related keywords

PROMPT=$(cat)
SKILL_FILE="$CLAUDE_PROJECT_DIR/.claude/skills/caldia-works-default/rules/git-commit.md"

# Check if prompt contains git-related keywords
if echo "$PROMPT" | grep -qiE "(commit|コミット|push|プッシュ|git)"; then
  if [ -f "$SKILL_FILE" ]; then
    echo "=== Git Skill Loaded ==="
    cat "$SKILL_FILE"
    echo "=== End of Git Skill ==="
  fi
fi

exit 0
