# `@modelfetch/next`

[![npm version](https://img.shields.io/npm/v/@modelfetch/next.svg)](https://www.npmjs.com/package/@modelfetch/next)
[![npm license](https://img.shields.io/npm/l/@modelfetch/next.svg)](https://www.npmjs.com/package/@modelfetch/next)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/next)

Run flexible MCP servers with Next.js.

## Installation

```npm
npm install @modelfetch/next
```

## Usage

### Next.js App Router

```typescript
import handle from "@modelfetch/next";
import server from "./server"; // Import your McpServer

const handler = handle(server);

// Export as Next.js App Router API route handlers
export const GET = handler;
export const POST = handler;
export const DELETE = handler;
```

### Use Node.js Runtime

```typescript
import handle from "@modelfetch/next";
import server from "./server"; // Import your McpServer

const handler = handle(server);

// Export as Next.js App Router API route handlers
export const GET = handler;
export const POST = handler;
export const DELETE = handler;

// Use Node.js runtime (default)
export const runtime = "nodejs";
```

### Use Edge Runtime

```typescript
import handle from "@modelfetch/next";
import server from "./server"; // Import your McpServer

const handler = handle(server);

// Export as Next.js App Router API route handlers
export const GET = handler;
export const POST = handler;
export const DELETE = handler;

// Use Edge runtime
export const runtime = "edge";
```

## API Reference

### `handle(server)`

Creates a Next.js App Router API route handler from an [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)
