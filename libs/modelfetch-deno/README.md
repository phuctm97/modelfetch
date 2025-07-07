# @modelfetch/deno

[![npm version](https://img.shields.io/npm/v/@modelfetch/deno.svg)](https://www.npmjs.com/package/@modelfetch/deno)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-modelfetch-blue)](https://github.com/phuctm97/modelfetch)

Run secure MCP servers with Deno.

## Installation

```bash title="Terminal"
deno add npm:@modelfetch/deno
```

## Usage

### Start The Server

```typescript
import handle from "npm:@modelfetch/deno";
import server from "./server.ts"; // Import your McpServer

// Run as a Deno HTTP server
handle(server);
```

### Log The Endpoint

```typescript
import handle, { getEndpoint } from "npm:@modelfetch/deno";
import server from "./server.ts"; // Import your McpServer

// Run as a Deno HTTP server
handle(server, {
  onListen: (address) => {
    // Log the endpoint when the server starts listening
    console.log(`MCP server is available at ${getEndpoint(address)}`);
  },
});
```

### Specify Custom Port

```typescript
import handle, { getEndpoint } from "npm:@modelfetch/deno";
import server from "./server.ts"; // Import your McpServer

// Run as a Deno HTTP server
handle(server, {
  // Customize server options
  port: 8080,
  onListen: (address) => {
    console.log(`MCP server is available at ${getEndpoint(address)}`);
  },
});
```

## API Reference

### `handle(server, options?)`

Starts the MCP server

- **server**: Required [`McpServer`](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#server) instance from [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk)
- **options**: Optional [`Deno.ServeOptions`](https://docs.deno.com/api/deno/~/Deno.ServeOptions)

### `getEndpoint(address)`

Gets the MCP server endpoint from the server [`Deno.Addr`](https://docs.deno.com/api/deno/~/Deno.Addr)

- **address**: Required server [`Deno.Addr`](https://docs.deno.com/api/deno/~/Deno.Addr) from the `onListen` callback

## Documentation

For complete documentation, examples, and guides, visit [www.modelfetch.com/docs/runtimes/deno](https://www.modelfetch.com/docs/runtimes/deno).

## License

MIT
