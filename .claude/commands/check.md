---
description: Format, type check, and lint all code
allowed-tools: Bash(pnpm -w format), Bash(pnpm exec nx run-many -t typecheck), Bash(pnpm exec nx run-many -t lint), Bash(pnpm exec nx run-many -t lint --args=--fix), Bash(pnpm exec nx run-many -t typecheck lint), Bash(pnpm exec nx typecheck:*), Bash(pnpm exec nx lint:*)
---

Run code quality checks including formatting, type checking, linting, and auto-fixing.

Execute the following steps in order:

1. **Format code**: Run `pnpm -w format` to format all files
2. **Type check**: Run `pnpm exec nx run-many -t typecheck` to check TypeScript types
3. **Lint and auto-fix issues**: Run `pnpm exec nx run-many -t lint --args=--fix` to lint and auto-fix issues

If any of the formatting, type checking, or linting steps fail, attempt to fix the issues. After fixing the issues or making any changes manually, repeat the entire process from step 1 to ensure all checks still pass and no new issues were introduced.
