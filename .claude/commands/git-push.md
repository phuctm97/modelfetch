---
description: Format, type check, lint, commit all changes, and push to remote
allowed-tools: Bash(pnpm -w format), Bash(pnpm exec nx run-many -t typecheck:*), Bash(pnpm exec nx run-many -t lint:*), Bash(pnpm exec nx run-many -t lint --args=--fix), Bash(git status:*), Bash(git diff:*), Bash(git branch:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*)
---

Run the pre-commit workflow, create a git commit with all changes, and push to the remote repository.

Execute the following steps in order:

1. **Format code**: Run `pnpm -w format` to format all files
2. **Type check**: Run `pnpm exec nx run-many -t typecheck` to check TypeScript types
3. **Lint and auto-fix issues**: Run `pnpm exec nx run-many -t lint --args=--fix` to lint and auto-fix issues
4. **Stage all changes**: Run `git add -A` to stage all changes (including any fixes from the above steps)
5. **Review changes**: Run `git status` and `git diff` to review what will be committed
6. **Create commit**: Generate an appropriate commit message based on the changes and create the commit
7. **Push to remote**: Push the current branch to the remote repository with `git push`

For the commit message:
- Keep it concise and descriptive
- Focus on the "why" rather than the "what"
- DO NOT use conventional commit prefixes (no "fix:", "feat:", "chore:", etc.)

If any of the formatting, type checking, or linting steps fail, attempt to fix the issues. After fixing the issues or making any changes manually, repeat the entire process from step 1 to ensure everything is in order before committing.

If the push fails (e.g., due to remote changes), report the errors to the user for resolution.
