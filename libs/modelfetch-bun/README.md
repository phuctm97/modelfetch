# @modelfetch/bun

[![npm version](https://img.shields.io/npm/v/@modelfetch/bun.svg)](https://www.npmjs.com/package/@modelfetch/bun)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-modelfetch-blue)](https://github.com/phuctm97/modelfetch)

Bun runtime adapter for building MCP (Model Context Protocol) servers with ModelFetch.

## Installation

```bash
bun add @modelfetch/bun
```

## Quick Start

```typescript
// server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  title: "My Bun MCP Server",
  name: "my-bun-server",
  version: "1.0.0",
});

server.registerTool(
  "roll_dice",
  {
    title: "Roll Dice",
    description: "Rolls an N-sided dice",
    inputSchema: { sides: z.number().int().min(2) },
  },
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
import handle, { getEndpoint } from "@modelfetch/bun";
import server from "./server";

// Start the server
const bunServer = handle(server);
console.log(`Server running at: ${getEndpoint(bunServer)}`);
```

## API Reference

### `handle(server, options?)`

Starts the MCP server with Bun-specific optimizations and returns a `Bun.Server` instance.

- **server**: The MCP server instance from `@modelcontextprotocol/sdk`
- **options**: Optional `Bun.ServeOptions` (excluding the fetch handler)

Returns: `Bun.Server`

```typescript
const bunServer = handle(server, {
  port: 3000,
  hostname: "localhost",
});
```

### `getEndpoint(server)`

Gets the MCP server endpoint URL for connecting clients.

- **server**: The `Bun.Server` instance returned by `handle()`

Returns: `string` - The complete endpoint URL

```typescript
const endpoint = getEndpoint(bunServer); // "http://localhost:3000/mcp"
```

## TypeScript Configuration

Bun works with TypeScript out of the box. Recommended `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "types": ["bun-types"],
    "strict": true,
    "skipLibCheck": true
  }
}
```

## Running Your Server

```bash
# Development
bun run index.ts

# Production (bundled)
bun build index.ts --target=bun --outdir=dist
bun run dist/index.js
```

## Documentation

For complete documentation, examples, and guides, visit [preview.modelfetch.com/docs/runtimes/bun](https://preview.modelfetch.com/docs/runtimes/bun).

## License

MIT
