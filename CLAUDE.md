# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains the source code of ModelFetch: a TypeScript/JavaScript SDK for building MCP (Model Context Protocol) servers with a delightful developer experience and deploying them anywhere TypeScript/JavaScript runs.

The SDK is built as a thin wrapper on top of `hono` and `@hono/mcp`, leveraging Hono's runtime-agnostic capabilities. The SDK provides runtime-specific packages to handle all runtime-specific details:

- `@modelfetch/node` - Node.js runtime support
- `@modelfetch/next` - Next.js runtime support
- `@modelfetch/bun` - Bun runtime support
- `@modelfetch/deno` - Deno runtime support
- `@modelfetch/vercel` - Vercel runtime support
- `@modelfetch/cloudflare` - Cloudflare runtime support
- `@modelfetch/netlify` - Netlify runtime support
- `@modelfetch/fastly` - Fastly runtime support
- `@modelfetch/supabase` - Supabase runtime support
- `@modelfetch/gcore` - Gcore runtime support
- `@modelfetch/aws-lambda` - AWS Lambda runtime support
- `@modelfetch/azure-functions` - Azure Functions runtime support

Each package acts as a thin wrapper around the equivalent Hono package, ensuring optimal performance and compatibility. Additionally, each package maintains a consistent API across different runtimes.

The `modelfetch` CLI provides an exceptional developer experience with:

- `dev` command for running MCP servers in development mode with live reload
- Integration with the MCP inspector for a seamless testing and debugging experience

**Goal**: To become the world's most popular TypeScript/JavaScript SDK for building MCP servers.

## Workspace Overview

This workspace follows Nx best practices as outlined in @.cursor/rules/nx-rules.mdc

### Workspace Configurations

- Node.js version: @.nvmrc
- TypeScript configurations: @tsconfig.base.json @tsconfig.node.json @tsconfig.next.json @tsconfig.bun.json @tsconfig.deno.json
- TypeScript project references are used to improve the performance of TypeScript-related features
  - All TypeScript projects are referenced in the root @tsconfig.json
  - When adding or removing a TypeScript project as a local dependency to another TypeScript project, update the target project's `tsconfig.json` to add or remove the dependency project in its `references`
- Only TypeScript projects have ESLint configurations
- All JavaScript projects have no ESLint configurations
- All Nx projects use automatic configuration provided by Nx plugins instead of individual `project.json` files
- All local dependencies use `workspace:^` version specifier
- `dependencies` and `devDependencies` that are already available in the root @package.json should NOT be included in individual project package.json files. This includes common dependencies like `typescript`, `@types/node`, `eslint`, `prettier`, `nx`, `@nx/*`, `@swc/*`, etc.

### Core Applications

- `@modelfetch/website`: ModelFetch website built with Next.js v15, Tailwind CSS v4, Fumadocs v15, and Fumadocs MDX

### Example Applications

These projects are example applications powered by ModelFetch:

- `example-node-js`: Node.js application (JavaScript)
- `example-node-ts`: Node.js application (TypeScript)
- `example-next-js`: Next.js application (JavaScript)
- `example-next-ts`: Next.js application (TypeScript)
- `example-bun-js`: Bun application (JavaScript)
- `example-bun-ts`: Bun application (TypeScript)
- `example-deno-js`: Deno application (JavaScript)
- `example-deno-ts`: Deno application (TypeScript)
- `example-vercel-js`: Vercel application (JavaScript)
- `example-vercel-ts`: Vercel application (TypeScript)
- `example-cloudflare-js`: Cloudflare application (JavaScript)
- `example-cloudflare-ts`: Cloudflare application (TypeScript)
- `example-netlify-js`: Netlify application (JavaScript)
- `example-netlify-ts`: Netlify application (TypeScript)
- `example-fastly-js`: Fastly application (JavaScript)
- `example-fastly-ts`: Fastly application (TypeScript)
- `example-supabase-js`: Supabase application (JavaScript)
- `example-supabase-ts`: Supabase application (TypeScript)
- `example-gcore-js`: Gcore application (JavaScript)
- `example-gcore-ts`: Gcore application (TypeScript)
- `example-aws-lambda-js`: AWS Lambda application (JavaScript)
- `example-aws-lambda-ts`: AWS Lambda application (TypeScript)
- `example-azure-functions-js`: Azure Functions application (JavaScript)
- `example-azure-functions-ts`: Azure Functions application (TypeScript)

### Core Libraries

- `modelfetch`: ModelFetch CLI tools (work in progress)
- `@modelfetch/core`: ModelFetch core utilities
- `@modelfetch/node`: Node.js runtime support
- `@modelfetch/next`: Next.js runtime support
- `@modelfetch/bun`: Bun runtime support
- `@modelfetch/deno`: Deno runtime support
- `@modelfetch/vercel`: Vercel runtime support
- `@modelfetch/cloudflare`: Cloudflare runtime support
- `@modelfetch/netlify`: Netlify runtime support
- `@modelfetch/fastly`: Fastly runtime support
- `@modelfetch/supabase`: Supabase runtime support
- `@modelfetch/gcore`: Gcore runtime support
- `@modelfetch/aws-lambda`: AWS Lambda runtime support
- `@modelfetch/azure-functions`: Azure Functions runtime support

### Supporting Libraries

- `nx-10x`: Custom Nx plugin for internal Nx generators, executors, projects, targets, and configurations
- `create-eslint-config`, `eslint-config-import-paths`, `eslint-config-react`: Shared ESLint utilities and configurations

## Best Practices

### CSS Module Imports

When importing CSS modules, always name the import `css`:

```typescript
import css from "./page.module.css";
```

### Client Components in Next.js

When working with Next.js components, minimize client-side JavaScript by extracting only the parts that need client APIs into separate client components. Keep the parent components server-friendly (neutral) whenever possible.

Example: If only a button needs `onClick` or hooks like `useTheme`, extract just the button into a client component while keeping the wrapper/layout as a server component.

### Component Organization

When a component has internal sub-components that are only used by that component (e.g., extracted client components to minimize client-side JS), organize them as follows:

1. Create a folder in `lib/` with the main component's name
2. Place the main component and all its internal sub-components in this folder
3. Only export the main component from the folder's index file

This ensures internal components won't be imported by other parts of the codebase.

Example structure:

```
lib/
  theme-switch/
    index.tsx        # Main component (server-friendly)
    button.tsx       # Internal client component
```

### Naming Conventions

All file/folder names and their primary exports must always match using the following convention:

- Kebab-case for files/folders → PascalCase or camelCase for exports
- Examples:
  - `theme-switch` folder/file → `ThemeSwitch` component
  - `button.tsx` → `Button` component
  - `do-something.ts` → `doSomething` function

All constants and variables use camelCase, not CONSTANT_CASE:

- Examples:
  - Use `packageVersions` instead of `PACKAGE_VERSIONS`
  - Use `apiUrl` instead of `API_URL`

### Type Definitions

Never inline types for component props or function parameters. Always define types separately:

```typescript
// ❌ Bad
function Component({ text, delay = 50 }: { text: string; delay?: number }) {
  // ...
}

// ✅ Good
type ComponentProps = {
  text: string;
  delay?: number;
};

function Component({ text, delay = 50 }: ComponentProps) {
  // ...
}
```

### Async/Await Patterns

Always use top-level awaits for cleaner and more readable asynchronous code. This workspace targets modern environments that support this feature:

```typescript
// ✅ Good - Use top-level await in module scope
const config = await loadConfig();
const server = await createServer(config);

// ❌ Bad - Unnecessary wrapper function
async function main() {
  const config = await loadConfig();
  const server = await createServer(config);
}
main();

// ❌ Bad - Promise chains at top level
loadConfig()
  .then((config) => createServer(config))
  .then((server) => {
    // ...
  });

// ❌ Bad - IIFE wrapper (not needed in this workspace)
(async () => {
  const config = await loadConfig();
  const server = await createServer(config);
})();
```

### JSON Imports

When importing JSON files in TypeScript/JavaScript, use the ES module import syntax with the `with { type: "json" }` assertion:

```typescript
// ✅ Good - Direct JSON import
import packageJson from "../package.json" with { type: "json" };

// ❌ Bad - Using fs.readFileSync
import { readFileSync } from "node:fs";
const packageJson = JSON.parse(readFileSync("../package.json", "utf-8"));
```

### Nx Sync Generators

When writing Nx sync generators, follow this important principle:

- **Do not** compare files or check if changes are necessary
- **Simply write** files to their desired state
- Nx automatically handles tree comparison and determines if the workspace is out of sync

Example:

```typescript
// ✅ Good - Just write the desired state
export default async function mySyncGenerator(
  tree: Tree,
): Promise<SyncGeneratorResult> {
  const content = generateContent();
  tree.write(targetPath, content);

  await formatFiles(tree);
  return {
    outOfSyncMessage: "Some files are out of sync.",
  };
}

// ❌ Bad - Don't compare before writing
export default async function mySyncGenerator(
  tree: Tree,
): Promise<SyncGeneratorResult> {
  const newContent = generateContent();
  const oldContent = tree.read(targetPath, "utf8");

  if (newContent !== oldContent) {
    // Unnecessary!
    tree.write(targetPath, newContent);
  }
  // ...
}
```

This approach is more efficient, simpler, and reliable since Nx's tree comparison is battle-tested.

### Error Handling

Avoid using try-catch blocks unless absolutely necessary. Let errors fail naturally so they're visible and can be properly debugged:

```typescript
// ✅ Good - Let errors fail naturally
const serverModule = (await import(serverUrl)) as { connect?: unknown };
if (!serverModule.connect) {
  console.error("error: missing connect export");
  process.exit(1);
}

// ❌ Bad - Unnecessary try-catch
try {
  const serverModule = await import(serverUrl);
  // ...
} catch (error) {
  console.error("error loading server");
  process.exit(1);
}
```

## Development Commands

### Building Projects

```bash
# Build a specific project
pnpm exec nx build modelfetch

# Build all projects
pnpm exec nx run-many -t build
```

### Adding Dependencies

When adding new dependencies to a project, always use `pnpm add` instead of manually editing package.json:

```bash
# ✅ Good - Use pnpm add for adding dependencies
pnpm add commander
pnpm add -D some-dev-package

# ❌ Bad - Manually editing package.json
# Don't manually add dependencies to package.json then run pnpm install
```

### Running `modelfetch` CLI

When testing the `modelfetch` CLI, use the Nx run command instead of executing the binary directly:

```bash
# ✅ Good - Use Nx run command
pnpm exec nx run modelfetch:modelfetch -- dev
pnpm exec nx run modelfetch:modelfetch -- --help
pnpm exec nx run modelfetch:modelfetch -- --version

# ❌ Bad - Running the binary directly
node libs/modelfetch/bin/index.js dev
```

### Code Quality

```bash
# Type check a specific project
pnpm exec nx typecheck modelfetch

# Type check all projects
pnpm exec nx run-many -t typecheck

# Lint a specific project
pnpm exec nx lint modelfetch
pnpm exec nx lint modelfetch --args=--fix # with autofix

# Lint all projects
pnpm exec nx run-many -t lint
pnpm exec nx run-many -t lint --args=--fix # with autofix

# Format everything
pnpm -w format
```

### Git Workflow

Before committing changes or creating a pull request, always run the following commands:

```bash
pnpm -w format
pnpm exec nx run-many -t typecheck
pnpm exec nx run-many -t lint --args=--fix
```

This ensures code quality and consistency across the entire workspace.

Note: If `nx sync` (which runs within `pnpm -w format`) reports files are out of date, simply run `pnpm -w format` again to resolve the issue.

### Commit Messages

This project does NOT use conventional commits. Write clear, descriptive commit messages without prefixes like `fix:`, `feat:`, `chore:`, etc.

### Nx Generators

When creating applications or libraries, always prefer using the custom generators provided by `nx-10x` over the built-in Nx generators. The `nx-10x` generators are specifically tailored for this workspace's conventions and requirements.

### External Documentation

When working with external libraries and frameworks, use `context7-mcp` to access up-to-date documentation. This ensures you're using the latest APIs and best practices.

For example, to learn about Hono APIs, use `mcp__context7-mcp__resolve-library-id` with "hono" to find the library, then `mcp__context7-mcp__get-library-docs` to read the documentation.

Always prefer reading official documentation through `context7-mcp` over making assumptions about APIs or implementation details. If `context7-mcp` doesn't have relevant documentation for a particular library or framework, search the web for the most current official documentation.
