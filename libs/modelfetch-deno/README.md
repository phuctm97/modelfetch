# @modelfetch/deno

[![npm version](https://img.shields.io/npm/v/@modelfetch/deno.svg)](https://www.npmjs.com/package/@modelfetch/deno)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-modelfetch-blue)](https://github.com/phuctm97/modelfetch)

Deno runtime adapter for building MCP (Model Context Protocol) servers with ModelFetch.

## Installation

```bash
deno add npm:@modelfetch/deno
```

## Quick Start

```typescript
// server.ts
import { McpServer } from "npm:@modelcontextprotocol/sdk@^0.7.0/server/mcp.js";
import { z } from "npm:zod@^3.24.1";

const server = new McpServer({
  title: "My Deno MCP Server",
  name: "my-deno-server",
  version: "1.0.0",
});

server.tool(
  "roll_dice",
  "Rolls an N-sided dice",
  { sides: z.number().int().min(2) },
  ({ sides }) => ({
    content: [
      {
        type: "text",
        text: `🎲 You rolled a ${1 + Math.floor(Math.random() * sides)}!`,
      },
    ],
  }),
);

export default server;
```

```typescript
// index.ts
import handle, { getEndpoint } from "npm:@modelfetch/deno";
import server from "./server.ts";

// Start the server
const httpServer = handle(server);
httpServer.finished.then(() => {
  console.log("Server stopped");
});

// Get the server address
const address = httpServer.addr;
if (address) {
  console.log(`Server running at: ${getEndpoint(address)}`);
}
```

## API Reference

### `handle(server, options?)`

Starts the MCP server with Deno-specific optimizations and returns a `Deno.HttpServer` instance.

- **server**: The MCP server instance from `@modelcontextprotocol/sdk`
- **options**: Optional `Deno.ServeOptions` for configuring the HTTP server

Returns: `Deno.HttpServer`

```typescript
const httpServer = handle(server, {
  port: 3000,
  hostname: "localhost",
});
```

### `getEndpoint(address)`

Gets the MCP server endpoint URL for connecting clients.

- **address**: A `Deno.Addr` object from the HTTP server

Returns: `string` - The complete endpoint URL

```typescript
const endpoint = getEndpoint(httpServer.addr); // "http://localhost:3000/mcp"
```

## Running Your Server

```bash
# Development (with all permissions)
deno run -A index.ts

# Production (with specific permissions)
deno run --allow-net index.ts

# Compiled executable
deno compile -A index.ts -o mcp-server
./mcp-server
```

## Permissions

Deno requires explicit permissions. For MCP servers, you typically need:

- `--allow-net`: For the HTTP server
- `--allow-read`: If reading files
- `--allow-write`: If writing files
- `--allow-env`: For environment variables
- `-A`: Allow all (development only)

## Configuration

Optional `deno.json`:

```json
{
  "compilerOptions": {
    "strict": true
  },
  "imports": {
    "@modelfetch/deno": "npm:@modelfetch/deno",
    "@modelcontextprotocol/sdk": "npm:@modelcontextprotocol/sdk@^0.7.0",
    "zod": "npm:zod@^3.24.1"
  },
  "tasks": {
    "dev": "deno run -A index.ts",
    "build": "deno compile -A index.ts"
  }
}
```

## Documentation

For complete documentation, examples, and guides, visit [modelfetch.com/docs/runtimes/deno](https://modelfetch.com/docs/runtimes/deno).

## License

MIT
