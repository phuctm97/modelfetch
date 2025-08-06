# `@modelfetch/deno`

[![npm version](https://img.shields.io/npm/v/@modelfetch/deno)](https://www.npmjs.com/package/@modelfetch/deno)
[![jsr version](https://img.shields.io/jsr/v/@modelfetch/deno)](https://jsr.io/@modelfetch/deno)
[![npm license](https://img.shields.io/npm/l/@modelfetch/deno)](https://www.npmjs.com/package/@modelfetch/deno)
[![docs](https://img.shields.io/badge/docs-modelfetch.com-blue)](https://www.modelfetch.com/docs/runtime/deno)

Run secure MCP servers with Deno.

## Installation

```bash
deno add jsr:@modelfetch/deno
```

## Usage

### Start The Server

```typescript
import handle from "@modelfetch/deno";
import server from "./server.ts"; // Import your McpServer

// Run as a Deno HTTP server
handle(server);
```

### Get Listening Address

```typescript
import handle, { getListeningAddress } from "@modelfetch/deno";
import server from "./server.ts"; // Import your McpServer

// Run as a Deno HTTP server
handle(server, {
  onListen: (addr) => {
    // Print listening address
    console.log(`The MCP server is listening at ${getListeningAddress(addr)}`);
  },
});
```

### Specify Custom Port

```typescript
import handle, { getListeningAddress } from "@modelfetch/deno";
import server from "./server.ts"; // Import your McpServer

// Run as a Deno HTTP server
handle(server, {
  // Customize server options
  port: 8080, // Customize server port
  onListen: (addr) => {
    // Print listening address
    console.log(`The MCP server is listening at ${getListeningAddress(addr)}`);
  },
});
```

## API Reference

### `handle(server, options?)`

Starts the MCP server

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)
- **options**: Optional [`Deno.ServeOptions`](https://docs.deno.com/api/deno/~/Deno.ServeOptions)

### `getListeningAddress(addr)`

Gets listening address from the server [`Deno.Addr`](https://docs.deno.com/api/deno/~/Deno.Addr)

- **addr**: Required server [`Deno.Addr`](https://docs.deno.com/api/deno/~/Deno.Addr) from the `onListen` callback
