# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This workspace follows Nx best practices as outlined in @.cursor/rules/nx-rules.mdc

### Repository Configurations

- Node.js version: @.nvmrc
- Workspace configurations: @package.json @pnpm-workspace.yaml
- TypeScript configurations: @tsconfig.json @tsconfig.base.json @tsconfig.common.json
- Only TypeScript projects have ESLint configurations
- All JavaScript projects have no ESLint configurations

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
