# @modelfetch/vercel

[![npm version](https://img.shields.io/npm/v/@modelfetch/vercel.svg)](https://www.npmjs.com/package/@modelfetch/vercel)
[![npm license](https://img.shields.io/npm/l/@modelfetch/vercel.svg)](https://www.npmjs.com/package/@modelfetch/vercel)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtimes/vercel)

Deploy MCP servers to Vercel Functions.

## Installation

```npm
npm install @modelfetch/vercel
```

## Usage

### Next.js App Router

```typescript
import handle from "@modelfetch/vercel";
import server from "./server"; // Import your McpServer

const handler = handle(server);

// Export as Next.js App Router API route handlers
export const GET = handler;
export const POST = handler;
export const DELETE = handler;
```

### Use Node.js or Fluid Compute

```typescript
import handle from "@modelfetch/vercel";
import server from "./server"; // Import your McpServer

const handler = handle(server);

// Export as Next.js App Router API route handlers
export const GET = handler;
export const POST = handler;
export const DELETE = handler;

// Use Node.js or Fluid Compute (default)
export const runtime = "nodejs";
```

### Use Edge Runtime

```typescript
import handle from "@modelfetch/vercel";
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

Creates a Vercel-compatible Next.js App Router API route handler from an [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server)

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)
