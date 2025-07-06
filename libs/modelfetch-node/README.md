# @modelfetch/node

[![npm version](https://img.shields.io/npm/v/@modelfetch/node.svg)](https://www.npmjs.com/package/@modelfetch/node)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-modelfetch-blue)](https://github.com/phuctm97/modelfetch)

Node.js runtime adapter for building MCP (Model Context Protocol) servers with ModelFetch.

## Installation

```bash
npm install @modelfetch/node
```

## Quick Start

```typescript
// server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  title: "My Node.js MCP Server",
  name: "my-node-server",
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
import handle, { getEndpoint } from "@modelfetch/node";
import server from "./server";

// Start the server
const nodeServer = handle(server);
console.log(`Server running at: ${getEndpoint(nodeServer)}`);
```

## API Reference

### `handle(server, options?)`

Starts the MCP server with Node.js-specific optimizations and returns a `http.Server` instance.

- **server**: The MCP server instance from `@modelcontextprotocol/sdk`
- **options**: Optional server options
  - **port**: Port number (default: 3000)
  - **hostname**: Hostname (default: "localhost")

Returns: `http.Server`

```typescript
const nodeServer = handle(server, {
  port: 3000,
  hostname: "localhost",
});
```

### `getEndpoint(server)`

Gets the MCP server endpoint URL for connecting clients.

- **server**: The `http.Server` instance returned by `handle()`

Returns: `string` - The complete endpoint URL

```typescript
const endpoint = getEndpoint(nodeServer); // "http://localhost:3000/mcp"
```

## TypeScript Configuration

Recommended `tsconfig.json` for Node.js:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Running Your Server

```bash
# Development with TypeScript
npm install -D typescript @types/node tsx
npx tsx index.ts

# Production (compiled)
npx tsc
node dist/index.js
```

## Documentation

For complete documentation, examples, and guides, visit [www.modelfetch.com/docs/runtimes/node](https://www.modelfetch.com/docs/runtimes/node).

## License

MIT
