# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains the source code of ModelFetch: a TypeScript/JavaScript SDK for building MCP (Model Context Protocol) servers with a delightful developer experience and deploying them anywhere TypeScript/JavaScript runs.

The SDK is built as a thin wrapper on top of `hono` and `@hono/mcp`, leveraging Hono's runtime-agnostic capabilities. The SDK provides multiple packages, each optimized for specific platforms/runtimes:

- `@modelfetch/node` - Node.js runtime support (work in progress)
- `@modelfetch/deno` - Deno runtime support (planned)
- `@modelfetch/bun` - Bun runtime support (planned)
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
- TypeScript configurations: @tsconfig.base.json @tsconfig.common.json
- TypeScript project references are used to improve the performance of TypeScript-related features
  - All TypeScript projects are referenced in the root @tsconfig.json
  - When adding or removing a TypeScript project as a local dependency to another TypeScript project, update the target project's `tsconfig.json` to add or remove the dependency project in its `references`
- Only TypeScript projects have ESLint configurations
- All JavaScript projects have no ESLint configurations
- All local dependencies use `workspace:^` version specifier

### Core Applications

- `@modelfetch/website`: ModelFetch website (work in progress)

### Example Applications

- `example-ts`: Example ModelFetch application (TypeScript)
- `example-js`: Example ModelFetch application (JavaScript)

### Core Libraries

- `modelfetch`: ModelFetch CLI tools (work in progress)
- `@modelfetch/core`: ModelFetch core utilities (work in progress)
- `@modelfetch/node`: Node.js runtime support (work in progress)
- `@modelfetch/deno` - Deno runtime support (planned)
- `@modelfetch/bun` - Bun runtime support (planned)
- `@modelfetch/cloudflare` - Cloudflare Workers support (planned)
- `@modelfetch/vercel` - Vercel Functions support (planned)

### Supporting Libraries

- `nx-10x`: Custom Nx plugin for internal Nx generators, executors, projects, targets, and configurations
- `create-eslint-config`, `eslint-config-import-paths`, `eslint-config-react`: Shared ESLint utilities and configurations

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
