# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This workspace follows Nx best practices as outlined in @.cursor/rules/nx-rules.mdc

### Repository Configurations

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

- **modelfetch-website**: ModelFetch website (work in progress)

### Example Applications

- **example-ts**: Example TypeScript application powered by ModelFetch SDK
- **example-js**: Example JavaScript application powered by ModelFetch SDK

### Core Libraries

- **modelfetch**: ModelFetch library (work in progress)

### Supporting Libraries

- **nx-10x**: Custom Nx plugin for internal Nx generators, executors, projects, targets, and configurations
- **create-eslint-config**, **eslint-config-import-paths**, **eslint-config-react**: Shared ESLint utilities and configurations

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
