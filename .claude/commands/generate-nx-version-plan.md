---
description: Generate an Nx version plan based on current git changes
allowed-tools:
  - Bash
  - Write
---

Analyze the current git changes (both staged and unstaged) and generate a new Nx version plan file.

First, check the git status and diff to understand what has changed:
!`git status --short`
!`git diff HEAD --stat`

Then analyze the changes to determine:
1. The appropriate semantic version bump (patch, minor, or major)
2. A concise, single-line changelog entry

Create the version plan file in `.nx/version-plans/` with a filename that briefly summarizes the change (using kebab-case).

The file format should be:
```markdown
---
__default__: version-type
---

Single line changelog entry describing the changes
```

For example, if adding a new feature for authentication:
- Filename: `add-authentication-feature.md`
- Content:
```markdown
---
__default__: minor
---

Add authentication feature with OAuth support
```

Important:
- Always use `__default__` since this repository releases the same version for all projects
- The changelog entry must be a single line without bullet points or multiple paragraphs
- If there are multiple change entries, create separate version plans
- The filename should be descriptive and unique (e.g., `fix-memory-leak.md`, `update-dependencies.md`, `add-claude-command.md`)
