# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains the source code of ModelFetch: a TypeScript/JavaScript SDK for building MCP (Model Context Protocol) servers with a delightful developer experience and deploying them anywhere TypeScript/JavaScript runs.

The SDK is built as a thin wrapper on top of `hono` and `@hono/mcp`, leveraging Hono's runtime-agnostic capabilities. The SDK provides multiple packages, each optimized for specific platforms/runtimes:

- `@modelfetch/node` - Node.js runtime support (work in progress)
- `@modelfetch/deno` - Deno runtime support (work in progress)
- `@modelfetch/bun` - Bun runtime support (work in progress)
- `@modelfetch/cloudflare` - Cloudflare Workers support (planned)
- `@modelfetch/vercel` - Vercel Functions support (planned)

Each package acts as a thin wrapper around the equivalent Hono package, ensuring optimal performance and compatibility.

The `modelfetch` CLI provides an exceptional developer experience with:

- `dev` command for running MCP servers in development mode with live reload
- Integration with the MCP inspector for a seamless testing and debugging experience

**Goal**: To become the world's most popular TypeScript/JavaScript SDK for building MCP servers.

## Workspace Overview

This workspace follows Nx best practices as outlined in @.cursor/rules/nx-rules.mdc

### Global Configurations

- Node.js version: @.nvmrc
- Workspace configurations: @package.json @pnpm-workspace.yaml
- TypeScript configurations: @tsconfig.base.json @tsconfig.deno.json @tsconfig.bun.json
- TypeScript project references are used to improve the performance of TypeScript-related features
  - All TypeScript projects are referenced in the root @tsconfig.json
  - When adding or removing a TypeScript project as a local dependency to another TypeScript project, update the target project's `tsconfig.json` to add or remove the dependency project in its `references`
- Only TypeScript projects have ESLint configurations
- All JavaScript projects have no ESLint configurations
- All Nx projects use automatic configuration provided by Nx plugins instead of individual `project.json` files
- All local dependencies use `workspace:^` version specifier

### Core Applications

- `@modelfetch/website`: ModelFetch website (work in progress)

### Example Applications

These projects are example applications powered by ModelFetch:

- `example-node-js`: Node.js application (JavaScript)
- `example-node-ts`: Node.js application (TypeScript)
- `example-deno-js`: Deno application (JavaScript)
- `example-deno-ts`: Deno application (TypeScript)
- `example-bun-js`: Bun application (JavaScript)
- `example-bun-ts`: Bun application (TypeScript)

### Core Libraries

- `modelfetch`: ModelFetch CLI tools (work in progress)
- `@modelfetch/core`: ModelFetch core utilities (work in progress)
- `@modelfetch/node`: Node.js runtime support (work in progress)
- `@modelfetch/deno`: Deno runtime support (work in progress)
- `@modelfetch/bun`: Bun runtime support (work in progress)
- `@modelfetch/cloudflare`: Cloudflare Workers support (planned)
- `@modelfetch/vercel`: Vercel Functions support (planned)

### Supporting Libraries

- `nx-10x`: Custom Nx plugin for internal Nx generators, executors, projects, targets, and configurations
- `create-eslint-config`, `eslint-config-import-paths`, `eslint-config-react`: Shared ESLint utilities and configurations

## Nx Generators

When creating applications or libraries, always prefer using the custom generators provided by `nx-10x` over the built-in Nx generators. The `nx-10x` generators are specifically tailored for this workspace's conventions and requirements.

## Development Commands

### Building Projects

```bash
# Build a specific project
pnpm exec nx build modelfetch

# Build all projects
pnpm exec nx run-many -t build
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

### External Documentation

When working with external libraries and frameworks, use `context7-mcp` to access up-to-date documentation. This ensures you're using the latest APIs and best practices.

For example, to learn about Hono APIs, use `mcp__context7-mcp__resolve-library-id` with "hono" to find the library, then `mcp__context7-mcp__get-library-docs` to read the documentation.

Always prefer reading official documentation through `context7-mcp` over making assumptions about APIs or implementation details. If `context7-mcp` doesn't have relevant documentation for a particular library or framework, search the web for the most current official documentation.
