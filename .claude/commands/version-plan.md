---
description: Generate an Nx version plan based on current git changes
allowed-tools: Bash(git status:*), Bash(git diff:*), Read(.nx/version-plans/**), Edit(.nx/version-plans/**)
---

Analyze the current git changes (both staged and unstaged) and generate a new Nx version plan file.

First, check `git status` and `git diff` to understand what has changed. If there are no changes, inform the user that no version plan is needed.

Then, check existing version plans in `.nx/version-plans/` to ensure you're not creating a duplicate or similar plan.

Analyze the changes to determine:
1. The appropriate semantic version bump:
   - **patch**: Bug fixes, typo corrections, internal refactors that don't affect functionality
   - **minor**: New features, enhancements, non-breaking improvements
   - **major**: Breaking changes, API modifications, removal of features
2. A concise, single-line changelog entry

Create the version plan file in `.nx/version-plans/` with a filename that briefly summarizes the change (using kebab-case).

The file format should be:
```markdown
---
__default__: version-type
---

Single line changelog entry describing the changes
```

Examples:

1. Bug fix (patch):
   - Filename: `fix-memory-leak-in-parser.md`
   - Content:
   ```markdown
   ---
   __default__: patch
   ---

   Fix memory leak in parser when handling large files
   ```

2. New feature (minor):
   - Filename: `add-authentication-feature.md`
   - Content:
   ```markdown
   ---
   __default__: minor
   ---

   Add authentication feature with OAuth support
   ```

3. Breaking change (major):
   - Filename: `remove-deprecated-api-methods.md`
   - Content:
   ```markdown
   ---
   __default__: major
   ---

   Remove deprecated API methods from v1.x
   ```

Important:
- Always use `__default__` since this repository releases the same version for all projects
- The changelog entry must be a single line without bullet points or multiple paragraphs
- If there are multiple unrelated changes, create separate version plans for each
- The filename should be descriptive, unique, and clearly indicate what changed
- Avoid creating plans for changes that already have similar plans in the directory
