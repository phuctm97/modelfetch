---
description: Generate version plans, format, type check, lint, commit all changes, push to remote, and create a pull request
allowed-tools: Bash(pnpm -w format), Bash(pnpm exec nx run-many -t typecheck:*), Bash(pnpm exec nx run-many -t lint:*), Bash(pnpm exec nx run-many -t lint --args=--fix), Bash(git status:*), Bash(git diff:*), Bash(git branch:*), Bash(git merge-base:*), Bash(git log:*), Bash(git checkout:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(gh pr create:*), Read(.nx/version-plans/**), Edit(.nx/version-plans/**)
---

Generate Nx version plans, run the pre-commit workflow, create a git commit with all changes, push to the remote repository, and create a pull request.

Execute the following steps in order:

1. **Check current branch**: Run `git branch --show-current` to check the current branch
   - If on `main` branch, create a new feature branch:
     - Generate a branch name based on the changes (e.g., `update-documentation`, `fix-type-errors`, `add-new-feature`)
     - Create and switch to the new branch with `git checkout -b <branch-name>`
   - If on a feature branch, continue to the next step

2. **Generate version plans**: Analyze all changes in the current branch (including committed, uncommitted, staged, and unstaged changes) compared to `origin/main` and generate one or more Nx version plan files as needed
   - Find the merge base: `git merge-base HEAD origin/main`
   - Get all commits in the branch: `git log --oneline <merge-base>..HEAD`
   - Get the full diff of all changes: `git diff <merge-base>..HEAD`
   - Also check for any uncommitted changes: `git status` and `git diff`
   - If there are no changes at all (neither in commits nor uncommitted), skip version plan generation
   - Check existing version plans in `.nx/version-plans/` to ensure you're not creating duplicate or similar plans
   - Analyze the changes to determine if they should be grouped into one or multiple version plans:
     - Group related changes together (e.g., all changes for a single feature)
     - Create separate plans for unrelated changes (e.g., a bug fix and a new feature)
     - Consider the scope and impact of changes when deciding how to group them
   - For each version plan needed:
     - Determine the appropriate semantic version bump:
       - **patch**: Bug fixes, typo corrections, documentation changes, internal refactors that don't affect functionality
       - **minor**: New features, enhancements, non-breaking improvements
       - **major**: Breaking changes, API modifications, removal of features
     - Create a concise, single-line changelog entry
     - Generate a descriptive filename (using kebab-case)
   - Create the version plan file(s) in `.nx/version-plans/` with format:
     ```markdown
     ---
     __default__: version-type
     ---

     Single line changelog entry describing the changes
     ```
   - Important considerations:
     - Always use `__default__` since this repository releases the same version for all projects
     - The changelog entry must be a single line without bullet points or multiple paragraphs
     - Create separate version plans for unrelated changes (don't combine a bug fix with a new feature)
     - Each filename should be descriptive, unique, and clearly indicate what changed
     - Avoid creating plans for changes that already have similar plans in the directory

3. **Format code**: Run `pnpm -w format` to format all files

4. **Type check**: Run `pnpm exec nx run-many -t typecheck` to check TypeScript types

5. **Lint and auto-fix issues**: Run `pnpm exec nx run-many -t lint --args=--fix` to lint and auto-fix issues

6. **Stage all changes**: Run `git add -A` to stage all changes (including any fixes from the above steps)

7. **Review changes**: Run `git status` and `git diff` to review what will be committed

8. **Create commit**: Generate an appropriate commit message based on the changes and create the commit

9. **Push to remote**: Push the current branch to the remote repository with `git push`

10. **Create pull request**: Create a GitHub pull request with `gh pr create`

For the commit message:
- Keep it concise and descriptive
- Focus on the "why" rather than the "what"
- DO NOT use conventional commit prefixes (no "fix:", "feat:", "chore:", etc.)

If any of the formatting, type checking, or linting steps fail, attempt to fix the issues. After fixing the issues or making any changes manually, repeat the entire process from step 3 to ensure everything is in order before committing.

If the push fails (e.g., due to remote changes), report the errors to the user for resolution.
