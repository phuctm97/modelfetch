# `@modelfetch/bun`

[![npm version](https://img.shields.io/npm/v/@modelfetch/bun)](https://www.npmjs.com/package/@modelfetch/bun)
[![npm license](https://img.shields.io/npm/l/@modelfetch/bun)](https://www.npmjs.com/package/@modelfetch/bun)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/bun)

Run lightning-fast MCP servers with Bun.

## Installation

```bash
bun add @modelfetch/bun
```

## Usage

### Start The Server

```typescript
import handle from "@modelfetch/bun";
import server from "./server.ts"; // Import your McpServer

// Run as a Bun HTTP server
handle(server);
```

### Log The Endpoint

```typescript
import handle, { getEndpoint } from "@modelfetch/bun";
import server from "./server.ts"; // Import your McpServer

// Run as a Bun HTTP server
const bunServer = handle(server);

// Log the endpoint when the server starts listening
console.log(`MCP server is available at ${getEndpoint(bunServer)}`);
```

### Specify Custom Port

```typescript
import handle, { getEndpoint } from "@modelfetch/bun";
import server from "./server.ts"; // Import your McpServer

// Run as a Bun HTTP server
const bunServer = handle(server, {
  // Customize server options
  port: 8080,
});

console.log(`MCP server is available at ${getEndpoint(bunServer)}`);
```

## API Reference

### `handle(server, options?)`

Starts the MCP server

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)
- **options**: Optional [`Bun.ServeOptions`](https://bun.sh/reference/bun/ServeOptions)

### `getEndpoint(server)`

Gets the MCP server endpoint from the [`Bun.Server`](https://bun.sh/reference/bun/Server) instance

- **server**: Required [`Bun.Server`](https://bun.sh/reference/bun/Server) instance returned by the `handle()` function
