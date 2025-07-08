---
description: Format, type check, lint, commit all changes, push to remote, and create a pull request
allowed-tools: Bash(pnpm -w format), Bash(pnpm exec nx run-many -t typecheck:*), Bash(pnpm exec nx run-many -t lint:*), Bash(pnpm exec nx run-many -t lint --args=--fix), Bash(git status:*), Bash(git diff:*), Bash(git branch:*), Bash(git checkout:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(gh pr create:*)
---

Run the pre-commit workflow, create a git commit with all changes, push to the remote repository, and create a pull request.

Execute the following steps in order:

1. **Check current branch**: Run `git branch --show-current` to check the current branch
   - If on `main`, create a new feature branch:
     - Generate a branch name based on the changes (e.g., `update-documentation`, `fix-type-errors`, `add-new-feature`)
     - Create and switch to the new branch with `git checkout -b <branch-name>`
   - If NOT on `main, continue to the next step
2. **Format code**: Run `pnpm -w format` to format all files
3. **Type check**: Run `pnpm exec nx run-many -t typecheck` to check TypeScript types
4. **Lint and auto-fix issues**: Run `pnpm exec nx run-many -t lint --args=--fix` to lint and auto-fix issues
5. **Stage all changes**: Run `git add -A` to stage all changes (including any fixes from the above steps)
6. **Review changes**: Run `git status` and `git diff` to review what will be committed
7. **Create commit**: Generate an appropriate commit message based on the changes and create the commit
8. **Push to remote**: Push the current branch to the remote repository with `git push`
9. **Create pull request**: Create a GitHub pull request with `gh pr create`

For the commit message:
- Keep it concise and descriptive
- Focus on the "why" rather than the "what"
- DO NOT use conventional commit prefixes (no "fix:", "feat:", "chore:", etc.)

If any of the formatting, type checking, or linting steps fail, attempt to fix the issues. After fixing the issues or making any changes manually, repeat the entire process from step 1 to ensure everything is in order before committing.

If the push fails (e.g., due to remote changes), report the errors to the user for resolution.
