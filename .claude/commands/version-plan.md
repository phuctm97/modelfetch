---
description: Generate Nx version plans based on all changes in the current branch
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git branch:*), Bash(git merge-base:*), Bash(git log:*), Read(.nx/version-plans/**), Edit(.nx/version-plans/**)
---

Analyze all changes in the current branch (including committed, uncommitted, staged, and unstaged changes) compared to `origin/main` and generate one or more Nx version plan files as needed.

First, determine the current branch and find all changes compared to `origin/main`:
1. Check the current branch with `git branch --show-current`
2. If on `main` branch, compare against `origin/main` to include unpushed commits:
   - Get unpushed commits: `git log --oneline origin/main..HEAD`
   - Get the full diff: `git diff origin/main..HEAD`
   - Also check for any uncommitted changes: `git status` and `git diff`
3. If on a feature branch:
   - Find the merge base: `git merge-base HEAD origin/main`
   - Get all commits in the branch: `git log --oneline <merge-base>..HEAD`
   - Get the full diff of all changes: `git diff <merge-base>..HEAD`
   - Also check for any uncommitted changes: `git status` and `git diff`

If there are no changes at all (neither in commits nor uncommitted), inform the user that no version plan is needed.

Then, check existing version plans in `.nx/version-plans/` to ensure you're not creating duplicate or similar plans.

Analyze the changes to determine if they should be grouped into one or multiple version plans:
- Group related changes together (e.g., all changes for a single feature)
- Create separate plans for unrelated changes (e.g., a bug fix and a new feature)
- Consider the scope and impact of changes when deciding how to group them

For each version plan needed:
1. Determine the appropriate semantic version bump:
   - **patch**: Bug fixes, typo corrections, documentation changes, internal refactors that don't affect functionality
   - **minor**: New features, enhancements, non-breaking improvements
   - **major**: Breaking changes, API modifications, removal of features
2. Create a concise, single-line changelog entry
3. Generate a descriptive filename (using kebab-case)

Create the version plan file(s) in `.nx/version-plans/` for each distinct change or group of related changes.

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
- Create separate version plans for unrelated changes (don't combine a bug fix with a new feature)
- Each filename should be descriptive, unique, and clearly indicate what changed
- Avoid creating plans for changes that already have similar plans in the directory
- Consider creating multiple plans when:
  - Changes affect different areas of the codebase
  - Changes have different semantic version impacts
  - Changes represent distinct features or fixes
