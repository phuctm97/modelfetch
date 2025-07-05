# @modelfetch/netlify

Netlify runtime adapter for building MCP servers with ModelFetch.

## Installation

```bash
npm install @modelfetch/netlify
```

## Usage

Create your MCP server using the official MCP TypeScript SDK:

```typescript
// server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  title: "My MCP Server",
  name: "my-server",
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

Then run it with ModelFetch's Netlify runtime:

```typescript
// netlify/functions/mcp.ts
import handle from "@modelfetch/netlify";
import server from "../../server";

export default handle(server);
```

## Configuration

The Netlify adapter automatically configures your MCP server to run as a Netlify Function. The MCP endpoint will be available at:

- Development: `http://localhost:8888/api/mcp`
- Production: `https://your-site.netlify.app/api/mcp`

## Example

For a complete example, check out our [Netlify example repository](https://github.com/phuctm97/modelfetch/tree/main/apps/example-netlify-ts).
