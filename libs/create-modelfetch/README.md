# create-modelfetch

[![npm version](https://img.shields.io/npm/v/create-modelfetch.svg)](https://www.npmjs.com/package/create-modelfetch)
[![npm license](https://img.shields.io/npm/l/create-modelfetch.svg)](https://www.npmjs.com/package/create-modelfetch)

> CLI for scaffolding a new MCP server with ModelFetch

## Overview

`create-modelfetch` is a command-line tool that helps you quickly scaffold a new MCP server using the ModelFetch SDK. It provides an interactive setup experience with support for multiple runtimes, languages, and package managers.

## Usage

Using **npx**:

```bash
npx -y create-modelfetch@latest
```

Using **npm init**:

```bash
npm init modelfetch@latest
```

Using **npm create**:

```bash
npm create modelfetch@latest
```

Using **pnpm dlx**:

```bash
pnpm dlx create-modelfetch@latest
```

Using **pnpm create**:

```bash
pnpm create modelfetch@latest
```

Using **bun x**:

```bash
bun x create-modelfetch@latest
```

Using **bun create**:

```bash
bun create modelfetch@latest
```

Using **deno**:

```bash
deno run -A npm:create-modelfetch@latest
```

Using **yarn**:

```bash
yarn create modelfetch
```

## Features

- **Multiple Runtimes**: Node.js, Bun, Deno, Cloudflare Workers, and Vercel Functions
- **Multiple Languages**: TypeScript and JavaScript
- **Multiple Package Managers**: `npm`, `pnpm`, `bun`, and `yarn`
- **Multiple CLI Initializers**: `npx`, `npm init`, `npm create`, `pnpm dlx`, `pnpm create`, `bun x`, `bun create`, `deno`, and `yarn`
- **Interactive Setup**: Interactively creates and configures your project based on your preferences
- **Automatic Detection**: Automatically detects and suggests your preferred package manager
- **Automatic Installation**: Automatically installs dependencies using your preferred package manager
